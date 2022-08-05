import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { NetCalculator } from './netcalculator.model';
import { Netmask } from 'netmask';

@Resolver(() => NetCalculator)
export class NetCalculatorResolver {
  @Query(() => NetCalculator)
  async getNetRange(@Args('network') network: string): Promise<string> {
    return new Netmask(network);
  }

  @Query(() => String)
  async getNetRangeMask(@Args('network') network: string): Promise<string> {
    return new Netmask(network).mask;
  }

  @Query(() => Int)
  async getNetRangeCIDR(@Args('network') network: string): Promise<number> {
    return new Netmask(network).bitmask;
  }

  @Query(() => Int)
  async getNetRangeSize(@Args('network') network: string): Promise<number> {
    return new Netmask(network).size;
  }

  @Query(() => NetCalculator)
  async getNetRangeNext(
    @Args('network') network: string,
  ): Promise<NetCalculator> {
    return new Netmask(network).next();
  }
}
