import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { NetCalculator } from './netcalculator.model';
import { Netmask } from 'netmask';

@Resolver(() => NetCalculator)
export class NetCalculatorResolver {
  @Query(() => Int)
  async getNetRangeSize(@Args('network') network: string): Promise<number> {
    return new Netmask(network).size;
  }
}
