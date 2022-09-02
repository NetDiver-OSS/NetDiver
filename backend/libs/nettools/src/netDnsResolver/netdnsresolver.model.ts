import { Field, ObjectType } from '@nestjs/graphql';
import {
  CaaType,
  MxType,
  NaptrType,
  SoaType,
  SrvType,
} from './netdnsresolver.type';

@ObjectType()
export class NetDnsResolver {
  @Field(() => [String], { nullable: true })
  a?: string[];

  @Field(() => [String], { nullable: true })
  aaaa?: string[];

  @Field(() => [CaaType], { nullable: true })
  caa?: CaaType[];

  @Field(() => [String], { nullable: true })
  cname?: string[];

  @Field(() => [MxType], { nullable: true })
  mx?: MxType[];

  @Field(() => [NaptrType], { nullable: true })
  naptr?: NaptrType[];

  @Field(() => [String], { nullable: true })
  ns?: string[];

  @Field(() => [String], { nullable: true })
  ptr?: string[];

  @Field(() => SoaType, { nullable: true })
  soa?: SoaType;

  @Field(() => [SrvType], { nullable: true })
  srv?: SrvType[];

  @Field(() => [[String]], { nullable: true })
  txt?: string[][];
}
