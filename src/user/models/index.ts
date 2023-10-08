import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pin: string;

  @Prop({ required: true, unique: true })
  mnemonic: string;

  @Prop({ required: true })
  account: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
