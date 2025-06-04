import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(createUserInput: CreateUserInput): Promise<User> {
    const { email, password, role, username } = createUserInput;

    // Optionally, hash the password here before saving (recommended)
    const newUser = new this.userModel({
      email,
      password,
      role,
      username,
    });

    return newUser.save(); // Save user to MongoDB and return
  }
}
