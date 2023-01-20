import { Injectable } from '@nestjs/common';
import { IAMAccessLevel } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class IamService {
  constructor(private readonly prismaService: PrismaService) {}

  async createIamRule(
    plugin: string,
    module: string,
    targetId: string,
    accessLevel: IAMAccessLevel,
  ): Promise<void> {
    await this.prismaService.iAM.create({
      data: {
        plugin,
        module,
        targetId,
        accessLevel,
      },
    });
  }
}
