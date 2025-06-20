import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register-input.dto';
import { LoginInput } from './dto/login-input.dto';
import { AuthPayload } from './dto/auth-payload.dto';
import { UserOutput } from './dto/user-output.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  healthCheck(): string {
    return 'Auth service is running';
  }

  @Mutation(() => String)
  async register(@Args('input') input: RegisterInput): Promise<string> {
    await this.authService.register(
      input.username,
      input.email,
      input.password,
      input.role,
    );
    return 'User registered successfully';
  }

  @Mutation(() => AuthPayload)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthPayload> {
    return this.authService.login(username, password);
  }

  @Query(() => [UserOutput])
  async users(): Promise<UserOutput[]> {
    return this.authService.findAll();
  }
}
