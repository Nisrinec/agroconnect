import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType() // This makes the class a GraphQL type
export class User {
  @Field(() => ID) // 'id' is a GraphQL ID type
  id: string;

  @Field() // username is a string field
  username: string;

  @Field() // email is a string field
  email: string;
}
