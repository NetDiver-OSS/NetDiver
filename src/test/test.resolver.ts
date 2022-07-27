import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../database/prisma.service';
import { TestDTO } from './test.model';

@Resolver(() => TestDTO)
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [TestDTO])
  async getTest(): Promise<TestDTO[]> {
    return await this.prisma.vlans.findMany();
  }
}
