import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../../src/database/prisma.service';
import { Usage } from '@netdiver/netam/usage/usage.model';
import { UsageState } from './usage.type';
import { UsageInputCreation } from './usage.model';

@Resolver(() => Usage)
export class UsageResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Usage])
  async getUsages(): Promise<Usage[]> {
    return this.prismaService.usages.findMany();
  }

  @Query(() => Usage)
  async getUsageId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Usage> {
    return this.prismaService.usages.findFirst({
      orderBy: [{ id: 'asc' }],
      where: {
        id: id,
      },
    });
  }

  @Query(() => [Usage])
  async getUsageFqdn(@Args('fqdn') fqdn: string): Promise<Usage[]> {
    return this.prismaService.usages.findMany({
      orderBy: [{ fqdn: 'asc' }],
      where: {
        fqdn: {
          contains: fqdn,
        },
      },
    });
  }

  @Query(() => [Usage])
  async getUsageStatus(@Args('status') status: string): Promise<Usage[]> {
    return this.prismaService.usages.findMany({
      orderBy: [{ status: 'asc' }],
      where: {
        status: {
          equals: UsageState[status],
        },
      },
    });
  }
  @Query(() => Usage)
  async getUsageIdentifier(
    @Args('identifier') identifier: string,
  ): Promise<Usage> {
    return this.prismaService.usages.findFirst({
      where: {
        identifier: identifier,
      },
    });
  }

  @Mutation(() => Usage)
  async createUsage(@Args('usage') usage: UsageInputCreation): Promise<Usage> {
    const identifier = usage.ipUsed + '_' + usage.sectionId;
    await this.prismaService.usages.create({
      data: {
        ipUsed: usage.ipUsed,
        fqdn: usage.fqdn,
        description: usage.description,
        // status: usage.status in UsageState, //TODO : Add state management -> Enum
        identifier: identifier,
        sectionId: usage.sectionId,
      },
    });
    return this.getUsageIdentifier(identifier);
  }
  @Mutation(() => Usage)
  async updateUsage(
    @Args('id', { type: () => Int }) id: number,
    @Args('ipUsed', { nullable: true }) ipUsed: string,
    @Args('description', { nullable: true }) description: string,
    @Args('fqdn', { nullable: true }) fqdn: string,
    @Args('status', { nullable: true }) status: string,
    @Args('sectionId', { type: () => Int, nullable: true }) sectionId: number,
  ): Promise<Usage> {
    const usageData: Partial<UsageInputCreation> = {};
    if (sectionId || ipUsed) {
      const usageCurrentInfo = await this.prismaService.usages.findUnique({
        select: {
          ipUsed: true,
          sectionId: true,
        },
        where: {
          id: id,
        },
      });
      if (sectionId) {
        if (ipUsed) {
          usageData.identifier = ipUsed + '_' + sectionId;
        } else {
          usageData.sectionId = sectionId;
          usageData.identifier = usageCurrentInfo.ipUsed + '_' + sectionId;
        }
      } else if (ipUsed) {
        usageData.identifier = ipUsed + '_' + usageCurrentInfo.sectionId;
        usageData.ipUsed = ipUsed;
      }
    }

    if (description) usageData.description = description;
    if (fqdn) usageData.fqdn = fqdn;
    // if (status) usageData.status = status; //TODO : Add state management -> Enum

    await this.prismaService.usages.update({
      where: {
        id: id,
      },
      data: usageData,
    });
    return this.getUsageId(id);
  }

  @Mutation(() => Usage)
  async deleteUsage(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Usage> {
    const deletedUsage = await this.getUsageId(id);
    await this.prismaService.usages.delete({
      where: {
        id: id,
      },
    });
    return deletedUsage;
  }
}
