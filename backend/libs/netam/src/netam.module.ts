import { Module } from '@nestjs/common';
import { NetamService } from './netam.service';
import { VlanModule } from '@netdiver/netam/vlan/vlan.module';
import { SectionModule } from '@netdiver/netam/section/section.module';
import { UsageModule } from '@netdiver/netam/usage/usage.module';
import { DatabaseModule } from '../../../src/database/database.module';

@Module({
  imports: [DatabaseModule, SectionModule, VlanModule, UsageModule],
  providers: [NetamService],
  exports: [SectionModule, VlanModule, UsageModule],
})
export class NetamModule {}
