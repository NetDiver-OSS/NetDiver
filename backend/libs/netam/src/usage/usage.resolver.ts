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
}
