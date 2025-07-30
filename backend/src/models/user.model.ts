import mongoose, {Schema,Document} from "mongoose";

export interface IUser extends Document{
    sub: string;
    name: string;
    email: string;
    picture?: string;
    gender?: string;
    birthdate?: string
}

const userSchema = new Schema<IUser>({
    sub:{type:String, required: true, unique: true},
    name: {type: String},
    email: {type: String},
    picture: {type : String},
    gender: {type: String},
    birthdate: {type: String}
})

export const Users =  mongoose.model<IUser>('User',userSchema)