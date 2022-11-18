import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../../src/utils/paginate';

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
export class PaginatedMacAddress extends Paginated(MacAddress) {}

@ObjectType()
export class OuiSync {
  @Field()
  result: boolean;
}
