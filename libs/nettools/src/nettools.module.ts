import { Module } from '@nestjs/common';
import { NettoolsService } from './nettools.service';
import { MacAddressModule } from '@netdiver/nettools/macAddress/macaddress.module';
import { DatabaseModule } from '../../../dist/database/database.module';

@Module({
  providers: [NettoolsService],
  exports: [NettoolsService, MacAddressModule],
  imports: [DatabaseModule, MacAddressModule],
})
export class NettoolsModule {}
