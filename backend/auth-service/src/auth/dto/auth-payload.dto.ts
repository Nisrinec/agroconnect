import { ObjectType, Field } from '@nestjs/graphql';
import { UserOutput } from './user-output.dto';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field(() => UserOutput)
  user: UserOutput;
}
