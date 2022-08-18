import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Vlan } from './vlan.model';
import { PrismaService } from "../../../../src/database/prisma.service";

@Resolver(() => Vlan)
export class VlanResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Vlan])
  async getVlans(): Promise<Vlan[]> {
    return this.prismaService.vlans.findMany();
  }

  @Query(() => Vlan)
  async getVlan(@Args('id', { type: () => Int }) id: number): Promise<Vlan> {
    return this.prismaService.vlans.findFirst({ where: { id: id } });
  }

  @ResolveField()
  async sections(@Parent() vlan: Vlan) {
    const { id } = vlan;
    return this.prismaService.sections.findMany({ where: { vlanId: id } });
  }
}
