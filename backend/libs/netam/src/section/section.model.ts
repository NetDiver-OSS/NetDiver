import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Vlan } from '@netdiver/netam/vlan/vlan.model';

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

  // @Field(() => []Usages)
  // usages: Usages[];

  @Field()
  createdAt: Date;
}
