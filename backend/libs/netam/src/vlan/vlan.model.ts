import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Section } from '@netdiver/netam/section/section.model';

@ObjectType()
export class Vlan {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  vlanId: number;

  @Field(() => [Section], { nullable: true })
  sections?: Section[];

  @Field()
  createdAt: Date;
}
