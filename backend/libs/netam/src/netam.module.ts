import { Module } from '@nestjs/common';
import { NetamService } from './netam.service';
import { VlanModule } from '@netdiver/netam/vlan/vlan.module';
import { SectionModule } from '@netdiver/netam/section/section.module';
import { DatabaseModule } from "../../../src/database/database.module";

@Module({
  imports: [DatabaseModule, SectionModule, VlanModule],
  providers: [NetamService],
  exports: [SectionModule, VlanModule],
})
export class NetamModule {}
