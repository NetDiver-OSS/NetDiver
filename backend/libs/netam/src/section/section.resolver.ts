import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Section } from '@netdiver/netam/section/section.model';
import { PrismaService } from '../../../../src/database/prisma.service';

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Section])
  async getSections(): Promise<Section[]> {
    return this.prismaService.sections.findMany({ include: { vlan: true } });
  }

  @Query(() => Section)
  async getSectionId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Section> {
    return this.prismaService.sections.findFirst({
      orderBy: [{ id: 'asc' }],
      where: { id: id },
      include: { vlan: true },
    });
  }

  @Query(() => [Section])
  async getSectionName(@Args('name') name: string): Promise<Section[]> {
    return this.prismaService.sections.findMany({
      orderBy: [{ name: 'asc' }],
      where: {
        name: {
          contains: name,
        },
      },
      include: { vlan: true },
    });
  }

  @Query(() => [Section])
  async getSectionNetwork(
    @Args('network') network: string,
  ): Promise<Section[]> {
    return this.prismaService.sections.findMany({
      orderBy: [{ name: 'asc' }],
      where: {
        network: {
          contains: network,
        },
      },
      include: { vlan: true },
    });
  }

  @Query(() => [Section])
  async getSectionScanType(
    @Args('scantype') scantype: string,
  ): Promise<Section[]> {
    return this.prismaService.sections.findMany({
      orderBy: [{ name: 'asc' }],
      where: {
        scantype: {
          contains: scantype,
        },
      },
      include: { vlan: true },
    });
  }

  @Query(() => [Section])
  async getSectionByVlanName(@Args('vlan') vlan: string): Promise<Section[]> {
    return this.prismaService.sections.findMany({
      orderBy: [{ name: 'asc' }],
      where: {
        vlan: {
          name: vlan,
        },
      },
      include: { vlan: true },
    });
  }
}
