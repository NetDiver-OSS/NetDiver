import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UsageState } from './usage.type';

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

  @Field(() => Int)
  sectionId: number;
}

@InputType()
export class UsageInputCreation {
  @Field()
  ipUsed: string;

  @Field({ nullable: true })
  fqdn?: string;

  @Field({ nullable: true })
  description?: string;

  //TODO: Add state management -> Enum
  // @Field()
  // status: string;

  @Field(() => Int)
  sectionId: number;

  @Field({ nullable: true })
  identifier?: string;
}
