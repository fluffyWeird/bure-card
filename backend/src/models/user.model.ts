import mongoose, {Schema,Document} from "mongoose";

export interface IUser extends Document{
    faydaId: string,
    sub: string;
    name: string;
    email: string;
    picture?: string;
    gender?: string;
    birthdate?: string,
    role: string;
}

const userSchema = new Schema<IUser>({
    faydaId: {type: String, required: true, unique: true},
    sub:{type:String, required: true, unique: true},
    name: {type: String},
    email: {type: String},
    picture: {type : String},
    gender: {type: String},
    birthdate: {type: String},
    role: {type: String, default: 'patient'}
})

export const Users =  mongoose.model<IUser>('User',userSchema)