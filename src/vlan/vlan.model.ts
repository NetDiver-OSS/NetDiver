import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vlan {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  // @Field(() => []Sections)
  // sections: Sections[];

  @Field({ nullable: true })
  createdAt: Date;
}
