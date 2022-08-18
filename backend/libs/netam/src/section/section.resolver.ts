import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../../dist/database/prisma.service';
import { Section } from '@netdiver/netam/section/section.model';

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Section])
  async getSections(): Promise<Section[]> {
    return this.prismaService.sections.findMany({ include: { vlan: true } });
  }
}
