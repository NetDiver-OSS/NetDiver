import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

export interface IPaginatedType<T> {
  data?: T[];
  total?: number;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    data?: T[];

    @Field({ nullable: true })
    total?: number;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}

export async function paginate<T>(data: T[]): Promise<IPaginatedType<T>> {
  return { data, total: data.length };
}
