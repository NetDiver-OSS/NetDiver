import { Module } from '@nestjs/common';
import { NetamService } from './netam.service';

@Module({
  providers: [NetamService],
  exports: [NetamService],
})
export class NetamModule {}
