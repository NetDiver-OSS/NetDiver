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

@Resolver(() => Vlan)
export class VlanResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Vlan])
  async getVlans(): Promise<Vlan[]> {
    return this.prismaService.vlans.findMany({
      orderBy: [{ id: 'asc' }],
    });
  }

  @Query(() => Vlan)
  async getVlanId(@Args('id', { type: () => Int }) id: number): Promise<Vlan> {
    return this.prismaService.vlans.findFirst({
      orderBy: [{ id: 'asc' }],
      where: { id: id },
    });
  }

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

  @Query(() => Vlan)
  async createVlan(
    @Args('name') name: string,
    @Args('vlan_id', { type: () => Int }) vlan_id: number,
    @Args('description', { defaultValue: null }) description: string,
  ): Promise<Vlan> {
    await this.prismaService.vlans.create({
      data: {
        name: name,
        description: description,
        vlanId: vlan_id,
      },
    });
    return this.prismaService.vlans.findFirst({
      orderBy: [{ id: 'asc' }],
      where: { vlanId: vlan_id },
    });
  }

  @ResolveField()
  async sections(@Parent() vlan: Vlan) {
    const { id } = vlan;
    return this.prismaService.sections.findMany({ where: { vlanId: id } });
  }
}
