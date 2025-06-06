import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
export declare class AuthService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    register(username: string, email: string, password: string, role: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<User[]>;
}
