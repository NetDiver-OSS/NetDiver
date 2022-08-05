import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NetCalculator {
  @Field()
  base: string;

  @Field()
  mask: string;

  @Field(() => Int)
  bitmask: number;

  @Field()
  hostmask: string;

  @Field(() => Int)
  size: number;

  @Field()
  first: string;

  @Field()
  last: string;
}
