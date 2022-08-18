import { Args, Query, Resolver } from '@nestjs/graphql';
import { NetCalculator } from './netcalculator.model';
import {
  Validator,
  IPv4Prefix,
  IPv4CidrRange,
  IPv6CidrRange,
  IPv6Prefix,
} from 'ip-num';

@Resolver(() => NetCalculator)
export class NetCalculatorResolver {
  private validateAddress(network) {
    if (network.split('.').length < 1 || network.split(':').length < 1) {
      return;
    }
  }

  private getRangeData(ip: IPv4CidrRange | IPv6CidrRange): NetCalculator {
    const iprange = new NetCalculator();

    iprange.bitmask = ip.getPrefix().toString();
    iprange.mask = ip.getPrefix().toMask().toString();
    iprange.network = ip.getFirst().toString();
    iprange.broadcast = ip.getLast().toString();
    iprange.size = ip.getSize().toString();
    iprange.range = ip.toRangeString();
    iprange.first = ip.getFirst().nextIPNumber().toString();
    iprange.last = ip.getLast().previousIPNumber().toString();

    return iprange;
  }

  @Query(() => NetCalculator)
  async getNetRange(@Args('network') network: string): Promise<NetCalculator> {
    this.validateAddress(network);
    if (Validator.isValidIPv4CidrRange(network)[0]) {
      return this.getRangeData(IPv4CidrRange.fromCidr(network));
    } else if (Validator.isValidIPv6CidrRange(network)[0]) {
      return this.getRangeData(IPv6CidrRange.fromCidr(network));
    }
  }

  @Query(() => NetCalculator)
  async getNetRangePrevious(
    @Args('network') network: string,
  ): Promise<NetCalculator> {
    this.validateAddress(network);

    if (Validator.isValidIPv4CidrRange(network)[0]) {
      return this.getRangeData(
        IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).previousRange().toCidrString(),
        ),
      );
    } else if (Validator.isValidIPv6CidrRange(network)[0]) {
      return this.getRangeData(
        IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).previousRange().toCidrString(),
        ),
      );
    }
  }

  @Query(() => NetCalculator)
  async getNetRangeNext(
    @Args('network') network: string,
  ): Promise<NetCalculator> {
    this.validateAddress(network);
    if (Validator.isValidIPv4CidrRange(network)[0]) {
      return this.getRangeData(
        IPv4CidrRange.fromCidr(
          IPv4CidrRange.fromCidr(network).nextRange().toCidrString(),
        ),
      );
    } else if (Validator.isValidIPv6CidrRange(network)[0]) {
      return this.getRangeData(
        IPv6CidrRange.fromCidr(
          IPv6CidrRange.fromCidr(network).nextRange().toCidrString(),
        ),
      );
    }
  }

  @Query(() => NetCalculator)
  async getNetRangeSplit(
    @Args('network') network: string,
    @Args('into') into: string,
  ): Promise<NetCalculator> {
    const netRanges = new Array<string>();
    this.validateAddress(network);

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
    } else if (Validator.isValidIPv6CidrRange(network)[0]) {
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
