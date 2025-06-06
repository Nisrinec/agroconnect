// src/auth/auth.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register-input.dto';
import { User } from './user.schema';

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

  // ✅ Add this to fetch users
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.authService.findAll();
  }
}
