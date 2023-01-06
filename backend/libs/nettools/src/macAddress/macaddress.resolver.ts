import { Args, Query, Resolver } from '@nestjs/graphql';
import { MacAddress, OuiSync, PaginatedMacAddress } from './macaddress.model';
import { PrismaService } from '../../../../src/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PageInfo } from '../../../../src/utils/page-info';
import { paginate } from '../../../../src/utils/paginate';

@Resolver(() => MacAddress)
export class MacAddressResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => PaginatedMacAddress)
  async getMacAddressesAndVendors(
    @Args('page', { type: () => PageInfo }) page: PageInfo,
  ): Promise<PaginatedMacAddress> {
    const { cursor, size } = page;

    const macAddresses = await this.prismaService.macAddresses.findMany({
      take: size,
      cursor: cursor !== undefined ? { id: Number(cursor) } : undefined,
      orderBy: [
        {
          mac: 'asc',
        },
        {
          vendor: 'asc',
        },
      ],
    });

    return paginate(macAddresses);
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

  @Query(() => OuiSync)
  async syncOuiDatabase(): Promise<OuiSync> {
    const httpService = new HttpService();
    const { data: rawDatas } = await firstValueFrom(
      httpService.get('https://standards-oui.ieee.org/oui/oui.txt'),
    );
    type ouiType = {
      mac: string;
      vendor: string;
    };
    const ouiDatas: ouiType[] = [];
    rawDatas.split('\n').forEach((line) => {
      if (line.match('(hex)')) {
        const lineData = line
          .match('(hex)')
          .input.replace('\t\t', '')
          .replace('\r', '')
          .split('(hex)');
        ouiDatas.push({
          mac: lineData[0].trim(),
          vendor: lineData[1]?.trim(),
        });
      }
    });
    try {
      await this.prismaService.$transaction([
        this.prismaService.$executeRawUnsafe(
          'TRUNCATE TABLE nettools_macaddresses',
        ),
        this.prismaService.macAddresses.createMany({ data: ouiDatas }),
      ]);
      return {
        result: true,
      };
    } catch (error) {
      return {
        result: false,
      };
    }
  }
}
