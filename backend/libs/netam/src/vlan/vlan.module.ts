import { Module } from '@nestjs/common';
import { VlanResolver } from './vlan.resolver';
import { DatabaseModule } from "../../../../src/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [VlanResolver],
})
export class VlanModule {}
