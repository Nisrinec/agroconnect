import { AuthService } from './auth.service';
import { User } from './user.schema';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    register(email: string, password: string): Promise<User>;
}
