import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IamDecorator } from '../decorators/iam.decorator';
import { PrismaService } from '../database/prisma.service';
import { extractRequest } from 'nest-keycloak-connect/util';

@Injectable()
export class IamGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const iam = this.reflector.get<IamDecorator>('iam', context.getHandler());
    if (!iam) {
      return true;
    }

    const { plugin, module, accessLevel } = iam;
    const [req] = extractRequest(context);

    const iamRule = await this.prismaService.iAM.findFirst({
      where: {
        plugin,
        module,
        targetId: req.user.sub,
      },
    });
    if (!iamRule) {
      return false;
    }

    if (accessLevel === 'READ_ONLY') {
      return true;
    }

    if (accessLevel === 'READ_WRITE') {
      return (
        iamRule.accessLevel === 'READ_WRITE' || iamRule.accessLevel === 'OWNER'
      );
    }

    return iamRule.accessLevel === 'OWNER';
  }
}
