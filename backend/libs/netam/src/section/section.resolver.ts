import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Section } from '@netdiver/netam/section/section.model';
import { PrismaService } from '../../../../src/database/prisma.service';
import { SectionInput } from './section.model';

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Section])
  async getSections(): Promise<Section[]> {
    return this.prismaService.sections.findMany({
      include: {
        vlan: true,
        usages: true,
      },
    });
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

  @Query(() => Section)
  async getSectionName(@Args('name') name: string): Promise<Section> {
    return this.prismaService.sections.findFirst({
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

  @Mutation(() => Section)
  async createSection(
    @Args('section') section: SectionInput,
  ): Promise<Section> {
    const vlan = await this.prismaService.vlans.findUnique({
      select: {
        id: true,
      },
      where: {
        vlanId: section.vlanId,
      },
    });
    await this.prismaService.sections.create({
      data: {
        name: section.name,
        description: section.description,
        scantype: section.scantype,
        network: section.network,
        schedule: section.schedule,
        vlanId: vlan.id,
      },
    });
    return this.getSectionName(section.name);
  }
}
