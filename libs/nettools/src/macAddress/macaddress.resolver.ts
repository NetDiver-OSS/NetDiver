import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../../dist/database/prisma.service';
import { MacAddress } from './macaddress.model';

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
          search: macprefix,
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
          search: vendor,
        },
      },
    });
  }
}
