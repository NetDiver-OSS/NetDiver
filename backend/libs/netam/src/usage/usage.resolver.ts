import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../../src/database/prisma.service';
import { Usage } from '@netdiver/netam/usage/usage.model';

@Resolver(() => Usage)
export class UsageResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Usage])
  async getUsages(): Promise<Usage[]> {
    return this.prismaService.usages.findMany();
  }
}
