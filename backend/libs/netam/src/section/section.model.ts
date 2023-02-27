import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Vlan } from '@netdiver/netam/vlan/vlan.model';
import { Usage } from '../usage/usage.model';

@ObjectType()
export class Section {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  network: string;

  @Field()
  scantype: string;

  @Field({ nullable: true })
  schedule?: string;

  @Field(() => Vlan)
  vlan: Vlan;

  @Field(() => [Usage], { nullable: true })
  usages?: Usage[];

  @Field()
  createdAt: Date;
}

@InputType()
export class SectionInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  network: string;

  @Field()
  scantype: string;

  @Field({ nullable: true })
  schedule?: string;

  @Field(() => Int)
  vlanId: number;
}
