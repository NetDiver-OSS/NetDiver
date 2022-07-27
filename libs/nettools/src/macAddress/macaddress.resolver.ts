import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../../dist/database/prisma.service';
import { MacAddress } from './macaddress.model';

@Resolver(() => MacAddress)
export class MacAddressResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [MacAddress])
  async getMacAddresses(): Promise<MacAddress[]> {
    return this.prismaService.macAddresses.findMany();
  }

  @Query(() => MacAddress)
  async getMacAddress(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<MacAddress> {
    return this.prismaService.macAddresses.findFirst({ where: { id: id } });
  }
}
