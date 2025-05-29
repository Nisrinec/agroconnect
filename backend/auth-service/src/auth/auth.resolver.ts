import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.schema';
import { UserType } from './dto/user.type';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserType)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.register(email, password);
  }
}
