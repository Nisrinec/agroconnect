import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register-input.dto';
import { User } from './user.schema';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    healthCheck(): string;
    register(input: RegisterInput): Promise<string>;
    users(): Promise<User[]>;
}
