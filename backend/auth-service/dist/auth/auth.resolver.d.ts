import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register-input.dto';
import { AuthPayload } from './dto/auth-payload.dto';
import { UserOutput } from './dto/user-output.dto';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    healthCheck(): string;
    register(input: RegisterInput): Promise<string>;
    login(username: string, password: string): Promise<AuthPayload>;
    users(): Promise<UserOutput[]>;
}
