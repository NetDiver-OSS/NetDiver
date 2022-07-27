import { Module } from '@nestjs/common';
import { NettoolsService } from './nettools.service';

@Module({
  providers: [NettoolsService],
  exports: [NettoolsService],
})
export class NettoolsModule {}
