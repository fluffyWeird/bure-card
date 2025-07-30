import { Schema, model, Document, Types } from "mongoose";

export interface Note {
  text: string;
  date: Date;
  addedBy: Types.ObjectId; 
}

export interface PatientDocument extends Document {
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  medicalHistory: string[];
  notes: Note[];
  createdBy: Types.ObjectId
}

const noteSchema = new Schema<Note>({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  addedBy: { type: Schema.Types.ObjectId, ref: "Staff", required: true }, 
});

const patientSchema = new Schema<PatientDocument>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    contact: { type: String, required: true },
    address: { type: String },
    medicalHistory: [{ type: String }], 
    notes: [noteSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
  },
  { timestamps: true }
);

export default model<PatientDocument>("Patient", patientSchema);