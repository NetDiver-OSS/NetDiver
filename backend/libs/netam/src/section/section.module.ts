import { Module } from '@nestjs/common';
import { SectionResolver } from './section.resolver';
import { DatabaseModule } from "../../../../src/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [SectionResolver],
})
export class SectionModule {}
