import { AuthService } from './auth.service';
import { User } from './user.schema';
import { CreateUserInput } from './dto/create-user.input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    register(createUserInput: CreateUserInput): Promise<User>;
}
