import { Module } from '@nestjs/common';
import { MacAddressResolver } from '@netdiver/nettools/macAddress/macaddress.resolver';
import { DatabaseModule } from "../../../../src/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [MacAddressResolver],
})
export class MacAddressModule {}
