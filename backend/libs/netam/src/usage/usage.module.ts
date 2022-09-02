import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../../src/database/database.module';
import { UsageResolver } from './usage.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [UsageResolver],
})
export class UsageModule {}
