import { Args, Query, Resolver } from '@nestjs/graphql';
import { MacAddress } from './macaddress.model';
import { PrismaService } from "../../../../src/database/prisma.service";

@Resolver(() => MacAddress)
export class MacAddressResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [MacAddress])
  async getMacAddressesAndVendors(): Promise<MacAddress[]> {
    return this.prismaService.macAddresses.findMany({
      orderBy: [
        {
          mac: 'asc',
        },
        {
          vendor: 'asc',
        },
      ],
    });
  }

  @Query(() => [MacAddress])
  async getMacAddress(
    @Args('macprefix') macprefix: string,
  ): Promise<MacAddress[]> {
    return this.prismaService.macAddresses.findMany({
      orderBy: [
        {
          mac: 'asc',
        },
        {
          vendor: 'asc',
        },
      ],
      where: {
        mac: {
          contains: macprefix,
        },
      },
    });
  }

  @Query(() => [MacAddress])
  async getVendor(@Args('vendor') vendor: string): Promise<MacAddress[]> {
    return this.prismaService.macAddresses.findMany({
      orderBy: [
        {
          mac: 'asc',
        },
        {
          vendor: 'asc',
        },
      ],
      where: {
        vendor: {
          contains: vendor,
        },
      },
    });
  }
}
