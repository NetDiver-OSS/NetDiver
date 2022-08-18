import { Module } from '@nestjs/common';
import { NetamService } from './netam.service';
import { VlanModule } from '@netdiver/netam/vlan/vlan.module';
import { DatabaseModule } from '../../../dist/database/database.module';
import { SectionModule } from '@netdiver/netam/section/section.module';

@Module({
  imports: [DatabaseModule, SectionModule, VlanModule],
  providers: [NetamService],
  exports: [SectionModule, VlanModule],
})
export class NetamModule {}
