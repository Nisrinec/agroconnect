// auth.resolver.ts

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.schema';
import { UserType } from './dto/user.type';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserType)
  async register(
    @Args('createUserInput') createUserInput: CreateUserInput
  ) {
    return this.authService.register(createUserInput);
  }
}
