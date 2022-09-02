import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Usage {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  ipUsed: string;

  @Field({ nullable: true })
  fqdn?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  identifier: string;

  @Field()
  status: string;
}
