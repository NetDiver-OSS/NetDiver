import { SetMetadata } from '@nestjs/common';

export type IamDecorator = {
  plugin: string;
  module: string;
  accessLevel: 'READ_ONLY' | 'READ_WRITE' | 'OWNER';
};

export const Iam = (
  plugin: string,
  module: string,
  accessLevel: 'READ_ONLY' | 'READ_WRITE' | 'OWNER',
) => SetMetadata('iam', { plugin, module, accessLevel });
