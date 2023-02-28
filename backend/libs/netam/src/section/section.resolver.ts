import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Section } from '@netdiver/netam/section/section.model';
import { PrismaService } from '../../../../src/database/prisma.service';
import { SectionInputCreation } from './section.model';

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
    @Args('section') section: SectionInputCreation,
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

  @Mutation(() => Section)
  async updateSection(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('network', { nullable: true }) network?: string,
    @Args('scantype', { nullable: true }) scantype?: string,
    @Args('schedule', { nullable: true }) schedule?: string,
    @Args('vlanId', { type: () => Int, nullable: true }) vlanId?: number,
  ): Promise<Section> {
    const sectionData: Partial<SectionInputCreation> = {};

    if (name) sectionData.name = name;
    if (description) sectionData.description = description;
    if (network) sectionData.network = network;
    if (scantype) sectionData.scantype = scantype;
    if (schedule) sectionData.schedule = schedule;

    if (vlanId) {
      const vlan = await this.prismaService.vlans.findUnique({
        select: {
          id: true,
        },
        where: {
          vlanId: vlanId,
        },
      });
      sectionData.vlanId = vlan.id;
    }
    await this.prismaService.sections.update({
      where: { id: id },
      data: sectionData,
    });
    return this.getSectionName(name);
  }
}
