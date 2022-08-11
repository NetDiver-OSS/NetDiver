import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NetCalculator {
  @Field({ nullable: true })
  network: string | null;

  @Field({ nullable: true })
  broadcast: string | null;

  @Field({ nullable: true })
  range: string | null;

  @Field({ nullable: true })
  bitmask: string | null;

  @Field({ nullable: true })
  mask: string | null;

  @Field({ nullable: true })
  size: string | null;

  @Field({ nullable: true })
  first: string | null;

  @Field({ nullable: true })
  last: string | null;

  @Field(() => [String], { nullable: true })
  splited: string[];
}
