import { Module } from '@nestjs/common';
import { NetamService } from './netam.service';
import { NettoolsService } from './nettools.service';

@Module({
  imports: [],
  providers: [NetamService, NettoolsService],
  exports: [NetamService, NettoolsService],
})
export class DatabaseModule {}
