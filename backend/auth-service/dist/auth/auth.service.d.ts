import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { AuthPayload } from './dto/auth-payload.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(username: string, email: string, password: string, role: string): Promise<void>;
    login(username: string, password: string): Promise<AuthPayload>;
    findAll(): Promise<User[]>;
}
