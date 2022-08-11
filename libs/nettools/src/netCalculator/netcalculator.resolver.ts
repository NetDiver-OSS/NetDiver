import { Args, Query, Resolver } from '@nestjs/graphql';
import { NetCalculator } from './netcalculator.model';
import {
  Validator,
  IPv4Prefix,
  IPv4CidrRange,
  IPv6CidrRange,
  IPv6Prefix,
  expandIPv6Number,
} from 'ip-num';

@Resolver(() => NetCalculator)
export class NetCalculatorResolver {
  @Query(() => NetCalculator)
  async getNetRange(@Args('network') network: string): Promise<NetCalculator> {
    const ipv4FormatValidator: string[] = network.split('.');
    const ipv6FormatValidator: string[] = network.split(':');
    const netRangeInfos = new NetCalculator();

    if (ipv4FormatValidator.length > 1) {
      if (Validator.isValidIPv4CidrRange(network)[0]) {
        netRangeInfos.bitmask = IPv4CidrRange.fromCidr(network)
          .getPrefix()
          .toString();
        netRangeInfos.mask = IPv4CidrRange.fromCidr(network)
          .getPrefix()
          .toMask()
          .toString();
        netRangeInfos.network = IPv4CidrRange.fromCidr(network)
          .getFirst()
          .toString();
        netRangeInfos.broadcast = IPv4CidrRange.fromCidr(network)
          .getLast()
          .toString();
        netRangeInfos.size = IPv4CidrRange.fromCidr(network)
          .getSize()
          .toString();
        netRangeInfos.range = IPv4CidrRange.fromCidr(network).toRangeString();
        netRangeInfos.first = IPv4CidrRange.fromCidr(network)
          .getFirst()
          .nextIPNumber()
          .toString();
        netRangeInfos.last = IPv4CidrRange.fromCidr(network)
          .getLast()
          .previousIPNumber()
          .toString();
      }
    } else if (ipv6FormatValidator.length > 1) {
      if (Validator.isValidIPv6CidrRange(network)[0]) {
        netRangeInfos.bitmask = IPv6CidrRange.fromCidr(network)
          .getPrefix()
          .toString();
        netRangeInfos.mask = IPv6CidrRange.fromCidr(network)
          .getPrefix()
          .toMask()
          .toString();
        netRangeInfos.network = IPv6CidrRange.fromCidr(network)
          .getFirst()
          .toString();
        netRangeInfos.broadcast = IPv6CidrRange.fromCidr(network)
          .getLast()
          .toString();
        netRangeInfos.size = IPv6CidrRange.fromCidr(network)
          .getSize()
          .toString();
        netRangeInfos.range = IPv6CidrRange.fromCidr(network).toRangeString();
        netRangeInfos.first = IPv6CidrRange.fromCidr(network)
          .getFirst()
          .nextIPNumber()
          .toString();
        netRangeInfos.last = IPv6CidrRange.fromCidr(network)
          .getLast()
          .previousIPNumber()
          .toString();
      }
    }
    return netRangeInfos;
  }

  @Query(() => NetCalculator)
  async getNetRangePrevious(
    @Args('network') network: string,
  ): Promise<NetCalculator> {
    const ipv4FormatValidator: string[] = network.split('.');
    const ipv6FormatValidator: string[] = network.split(':');
    const netRangeInfos = new NetCalculator();

    if (ipv4FormatValidator.length > 1) {
      if (Validator.isValidIPv4CidrRange(network)[0]) {
        netRangeInfos.size = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getSize()
          .toString();
        netRangeInfos.mask = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getPrefix()
          .toMask()
          .toString();
        netRangeInfos.bitmask = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getPrefix()
          .toString();
        netRangeInfos.network = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getFirst()
          .toString();
        netRangeInfos.broadcast = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getLast()
          .toString();
        netRangeInfos.range = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).previousRange().toCidrString(),
        ).toRangeString();
        netRangeInfos.first = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getFirst()
          .nextIPNumber()
          .toString();
        netRangeInfos.last = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getLast()
          .previousIPNumber()
          .toString();
      }
    } else if (ipv6FormatValidator.length > 1) {
      const netSplit: string[] = network.split('/');
      if (Validator.isValidIPv6CidrRange(network)) {
        netRangeInfos.size = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getSize()
          .toString();
        netRangeInfos.mask = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getPrefix()
          .toMask()
          .toString();
        netRangeInfos.bitmask = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getPrefix()
          .toString();
        netRangeInfos.network = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getFirst()
          .toString();
        netRangeInfos.broadcast = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getLast()
          .toString();
        netRangeInfos.range = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).previousRange().toCidrString(),
        ).toRangeString();
        netRangeInfos.first = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getFirst()
          .nextIPNumber()
          .toString();
        netRangeInfos.last = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).previousRange().toCidrString(),
        )
          .getLast()
          .previousIPNumber()
          .toString();
      }
    }
    return netRangeInfos;
  }

  @Query(() => NetCalculator)
  async getNetRangeNext(
    @Args('network') network: string,
  ): Promise<NetCalculator> {
    const ipv4FormatValidator: string[] = network.split('.');
    const ipv6FormatValidator: string[] = network.split(':');
    const netRangeInfos = new NetCalculator();

    if (ipv4FormatValidator.length > 1) {
      if (Validator.isValidIPv4CidrRange(network)[0]) {
        netRangeInfos.size = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getSize()
          .toString();
        netRangeInfos.mask = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getPrefix()
          .toMask()
          .toString();
        netRangeInfos.bitmask = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getPrefix()
          .toString();
        netRangeInfos.network = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getFirst()
          .toString();
        netRangeInfos.broadcast = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getLast()
          .toString();
        netRangeInfos.range = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).nextRange().toCidrString(),
        ).toRangeString();
        netRangeInfos.first = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getFirst()
          .nextIPNumber()
          .toString();
        netRangeInfos.last = IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getLast()
          .previousIPNumber()
          .toString();
      }
    } else if (ipv6FormatValidator.length > 1) {
      const netSplit: string[] = network.split('/');
      if (Validator.isValidIPv6CidrRange(network)) {
        netRangeInfos.size = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getSize()
          .toString();
        netRangeInfos.mask = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getPrefix()
          .toMask()
          .toString();
        netRangeInfos.bitmask = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getPrefix()
          .toString();
        netRangeInfos.network = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getFirst()
          .toString();
        netRangeInfos.broadcast = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getLast()
          .toString();
        netRangeInfos.range = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).nextRange().toCidrString(),
        ).toRangeString();
        netRangeInfos.first = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getFirst()
          .nextIPNumber()
          .toString();
        netRangeInfos.last = IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).nextRange().toCidrString(),
        )
          .getLast()
          .previousIPNumber()
          .toString();
      }
    }
    return netRangeInfos;
  }

  @Query(() => NetCalculator)
  async getNetRangeSplit(
    @Args('network') network: string,
    @Args('into') into: string,
  ): Promise<NetCalculator> {
    const netRanges = new Array<string>();
    const ipv4FormatValidator: string[] = network.split('.');
    const ipv6FormatValidator: string[] = network.split(':');

    if (ipv4FormatValidator.length > 1) {
      if (Validator.isValidIPv4CidrRange(network)[0]) {
        IPv4CidrRange.fromCidr(network)
          .splitInto(
            new IPv4Prefix(
              IPv4CidrRange.fromCidr(
                ''.concat('0.0.0.0/', into),
              ).getPrefix().value,
            ),
          )
          .forEach((element: IPv4CidrRange) => {
            netRanges.push(element.toCidrString());
          });
      }
    } else if (ipv6FormatValidator.length > 1) {
      const netSplit: string[] = network.split('/');
      IPv6CidrRange.fromCidr(network)
        .splitInto(
          new IPv6Prefix(
            IPv6CidrRange.fromCidr(''.concat('::/', into)).getPrefix().value,
          ),
        )
        .forEach((element: IPv6CidrRange) => {
          netRanges.push(element.toCidrString());
        });
    }
    const netSplits = new NetCalculator();
    netSplits.splited = netRanges;
    return netSplits;
  }
}
