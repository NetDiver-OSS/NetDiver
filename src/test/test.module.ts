import { Module } from '@nestjs/common';
import { TestResolver } from './test.resolver';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TestResolver],
})
export class TestModule {}
