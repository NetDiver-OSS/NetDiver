import { Module } from '@nestjs/common';
import { SectionResolver } from './section.resolver';
import { DatabaseModule } from '../../../../dist/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SectionResolver],
})
export class SectionModule {}
