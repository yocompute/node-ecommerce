import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';

const { Schema } = mongoose;

export interface IUser extends Document{
    username: string,
    email: string,
    phone?: string,
    status: string,
    balance: number,
    roles: string[],
    createUTC: Date,
    updateUTC?: Date,
}

const UserSchema = new Schema({
    username: String,
    email: String,
    phone: String,
    status: String,
    balance: { Number, default: 0},
    roles: [String],
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const User: MongooseModel<IUser> = mongoose.model<IUser>('User', UserSchema, 'users');

