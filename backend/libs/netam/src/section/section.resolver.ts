import { Query, Resolver } from '@nestjs/graphql';
import { Section } from '@netdiver/netam/section/section.model';
import { PrismaService } from "../../../../src/database/prisma.service";

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Section])
  async getSections(): Promise<Section[]> {
    return this.prismaService.sections.findMany({ include: { vlan: true } });
  }
}
