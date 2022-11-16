import { Args, Query, Resolver } from '@nestjs/graphql';
import { MacAddress, OuiSync } from './macaddress.model';
import { PrismaService } from '../../../../src/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Resolver(() => MacAddress)
export class MacAddressResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [MacAddress])
  async getMacAddressesAndVendors(
    @Args('pageNumber') pageNumber: number,
    @Args('pageEntries') pageEntries: number,
  ): Promise<MacAddress[]> {
    const entries = pageNumber * pageEntries;
    let cursorOffset = entries - pageEntries;
    if (cursorOffset < 0) {
      cursorOffset = 0;
    }
    return this.prismaService.macAddresses.findMany({
      take: entries,
      skip: cursorOffset,
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
    @Args('pageNumber') pageNumber: number,
    @Args('pageEntries') pageEntries: number,
    @Args('macprefix') macprefix: string,
  ): Promise<MacAddress[]> {
    const entries = pageNumber * pageEntries;
    let cursorOffset = entries - pageEntries;
    if (cursorOffset < 0) {
      cursorOffset = 0;
    }
    return this.prismaService.macAddresses.findMany({
      take: entries,
      skip: cursorOffset,
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
  async getVendor(
    @Args('pageNumber') pageNumber: number,
    @Args('pageEntries') pageEntries: number,
    @Args('vendor') vendor: string,
  ): Promise<MacAddress[]> {
    const entries = pageNumber * pageEntries;
    let cursorOffset = entries - pageEntries;
    if (cursorOffset < 0) {
      cursorOffset = 0;
    }
    return this.prismaService.macAddresses.findMany({
      take: entries,
      skip: cursorOffset,
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
