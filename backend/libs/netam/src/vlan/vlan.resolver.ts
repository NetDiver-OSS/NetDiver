import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Vlan } from './vlan.model';
import { PrismaService } from '../../../../src/database/prisma.service';
import { Iam } from '../../../../src/decorators/iam.decorator';

@Resolver(() => Vlan)
export class VlanResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Iam('netam', 'vlan', 'READ_ONLY')
  @Query(() => [Vlan])
  async getVlans(): Promise<Vlan[]> {
    return this.prismaService.vlans.findMany({
      orderBy: [{ id: 'asc' }],
    });
  }

  @Iam('netam', 'vlan', 'READ_ONLY')
  @Query(() => Vlan)
  async getVlanId(
    @Args('vlanId', { type: () => Int }) vlanId: number,
  ): Promise<Vlan> {
    return this.prismaService.vlans.findFirst({
      orderBy: [{ id: 'asc' }],
      where: { vlanId: vlanId },
    });
  }

  @Iam('netam', 'vlan', 'READ_ONLY')
  @Query(() => [Vlan])
  async getVlanName(@Args('name') name: string): Promise<Vlan[]> {
    return this.prismaService.vlans.findMany({
      orderBy: [{ name: 'asc' }],
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  @Iam('netam', 'vlan', 'READ_WRITE')
  @Query(() => Vlan)
  async createVlan(
    @Args('name') name: string,
    @Args('vlanId', { type: () => Int }) vlanId: number,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Vlan> {
    await this.prismaService.vlans.create({
      data: {
        name: name,
        description: description,
        vlanId: vlanId,
      },
    });
    return this.getVlanId(vlanId);
  }

  @Iam('netam', 'vlan', 'OWNER')
  @Query(() => Vlan)
  async deleteVlan(@Args('id', { type: () => Int }) id: number): Promise<Vlan> {
    const vlan: Vlan = await this.prismaService.vlans.findFirst({
      where: { id: id },
    });
    await this.prismaService.vlans.delete({
      where: {
        id: id,
      },
    });
    return vlan;
  }

  @Iam('netam', 'vlan', 'READ_WRITE')
  @Query(() => Vlan)
  async updateVlan(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('vlanId', { type: () => Int, nullable: true }) vlanId?: number,
  ): Promise<Vlan> {
    const vlanData: Partial<Vlan> = {};

    if (name) vlanData.name = name;
    if (description) vlanData.description = description;
    if (vlanId) vlanData.vlanId = vlanId;

    await this.prismaService.vlans.update({
      where: { id: id },
      data: vlanData,
    });
    return this.prismaService.vlans.findFirst({
      where: { id: id },
    });
  }

  @ResolveField()
  async sections(@Parent() vlan: Vlan) {
    const { id } = vlan;
    return this.prismaService.sections.findMany({ where: { vlanId: id } });
  }
}
