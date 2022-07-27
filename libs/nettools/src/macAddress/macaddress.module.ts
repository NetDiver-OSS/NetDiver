import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../../dist/database/database.module';
import { MacAddressResolver } from '@netdiver/nettools/macAddress/macaddress.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [MacAddressResolver],
})
export class MacAddressModule {}
