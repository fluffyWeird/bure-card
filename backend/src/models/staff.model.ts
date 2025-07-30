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
        requird: true
    },
    role:{
        type: String,
        required: true,
        default: 'doc' // doc,nurse,lab,pharma
    }
})

export const Staffs = mongoose.model('Staff',staffSchema)