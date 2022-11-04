import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MacAddress {
  @Field(() => Int)
  id: number;

  @Field()
  mac: string;

  @Field({ nullable: true })
  vendor?: string;
}

@ObjectType()
export class OuiSync {
  @Field()
  result: boolean;
}
