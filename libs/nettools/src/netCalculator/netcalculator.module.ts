import { Module } from '@nestjs/common';
import { NetCalculatorResolver } from '@netdiver/nettools/netCalculator/netcalculator.resolver';

@Module({
  imports: [],
  providers: [NetCalculatorResolver],
})
export class NetCalculatorModule {}
