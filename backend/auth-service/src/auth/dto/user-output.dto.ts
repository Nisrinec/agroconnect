import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field()
  _id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  role: string;
}
