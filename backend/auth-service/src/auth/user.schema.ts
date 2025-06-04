import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: string;

  @Prop()
  username: string;
}

// 👇 Add this line to export the document type
export type UserDocument = User & Document;

// 👇 And this to generate the schema
export const UserSchema = SchemaFactory.createForClass(User);
