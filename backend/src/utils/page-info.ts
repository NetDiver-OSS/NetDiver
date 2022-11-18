import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PageInfo {
  @Field({ nullable: true })
  cursor?: string;

  @Field({ nullable: true })
  size?: number;
}
