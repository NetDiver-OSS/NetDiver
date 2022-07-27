import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { VlanResolver } from './vlan.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [VlanResolver],
})
export class VlanModule {}
