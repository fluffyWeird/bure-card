import mongoose, { Schema, Document } from "mongoose";

interface IAddress {
  zone: string;
  woreda: string;
  region: string;
}

export interface IUser extends Document {
  faydaId: string;
  sub: string;
  name: string;
  email?: string;
  picture?: string;
  gender?: string;
  birthdate?: string;
  role: string;
  nationality?: string;
  phone_number?: string;
  address?: IAddress;
}

const addressSchema = new Schema<IAddress>({
  zone: { type: String },
  woreda: { type: String },
  region: { type: String }
}, { _id: false });

const userSchema = new Schema<IUser>({
  faydaId: { type: String, required: true, unique: true },
  sub: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  picture: { type: String },
  gender: { type: String },
  birthdate: { type: String },
  nationality: { type: String },
  phone_number: { type: String },
  address: { type: addressSchema },
  role: { type: String, default: 'patient' }
});

export const Users = mongoose.model<IUser>('User', userSchema);
