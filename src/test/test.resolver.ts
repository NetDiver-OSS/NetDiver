import { Query, Resolver } from '@nestjs/graphql';
import { NetamService } from '../database/netam.service';
import { TestDTO } from './test.model';

@Resolver(() => TestDTO)
export class TestResolver {
  constructor(private prisma: NetamService) {}

  @Query(() => [TestDTO])
  async getTest(): Promise<TestDTO[]> {
    return await this.prisma.vlans.findMany();
  }
}
