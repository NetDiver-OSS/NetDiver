import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../../src/database/prisma.service';
import { Usage } from '@netdiver/netam/usage/usage.model';
import { UsageState } from './usage.type';

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
}
