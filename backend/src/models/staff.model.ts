import mongoose from 'mongoose'

interface IStaff extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    role: string
}

const staffSchema = new mongoose.Schema<IStaff>({
    username: {
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    role:{
        type: String,
        default: 'doc'
    }
})

export const Staffs = mongoose.model<IStaff>('Staff',staffSchema)