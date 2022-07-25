import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TestDTO {
  @Field()
  name: string;
}
