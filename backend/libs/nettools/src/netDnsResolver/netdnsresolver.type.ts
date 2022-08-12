import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MxType {
  @Field(() => Int)
  priority: number;

  @Field()
  exchange: string;
}

@ObjectType()
export class CaaType {
  @Field(() => Int)
  critical: number;

  @Field({ nullable: true })
  issue?: string;

  @Field({ nullable: true })
  issuewild?: string;

  @Field({ nullable: true })
  iodef?: string;

  @Field({ nullable: true })
  contactemail?: string;

  @Field({ nullable: true })
  contactphone?: string;
}

@ObjectType()
export class NaptrType {
  @Field()
  flags: string;

  @Field()
  service: string;

  @Field()
  regexp: string;

  @Field()
  replacement: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  preference: number;
}

@ObjectType()
export class SoaType {
  @Field()
  nsname: string;

  @Field()
  hostmaster: string;

  @Field(() => Int)
  serial: number;

  @Field(() => Int)
  refresh: number;

  @Field(() => Int)
  retry: number;

  @Field(() => Int)
  expire: number;

  @Field(() => Int)
  minttl: number;
}

@ObjectType()
export class SrvType {
  @Field(() => Int)
  priority: number;

  @Field(() => Int)
  weight: number;

  @Field(() => Int)
  port: number;

  @Field()
  name: string;
}
