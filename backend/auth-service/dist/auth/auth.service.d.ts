import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    register(createUserInput: CreateUserInput): Promise<User>;
}
