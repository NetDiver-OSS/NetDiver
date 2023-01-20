import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { IamService } from './iam.service';

@Module({
  imports: [DatabaseModule],
  providers: [IamService],
})
export class IamModule {}
