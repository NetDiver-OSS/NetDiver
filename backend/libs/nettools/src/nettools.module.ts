import { Module } from '@nestjs/common';
import { NettoolsService } from './nettools.service';
import { MacAddressModule } from '@netdiver/nettools/macAddress/macaddress.module';
import { NetCalculatorModule } from '@netdiver/nettools/netCalculator/netcalculator.module';
import { DatabaseModule } from "../../../src/database/database.module";

@Module({
  providers: [NettoolsService],
  exports: [NettoolsService, MacAddressModule, NetCalculatorModule],
  imports: [DatabaseModule, MacAddressModule, NetCalculatorModule],
})
export class NettoolsModule {}
