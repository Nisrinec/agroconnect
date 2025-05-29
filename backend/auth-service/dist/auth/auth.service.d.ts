import { Model } from 'mongoose';
import { User } from './user.schema';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<User>);
    register(email: string, password: string, role?: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
