import { Schema, model, Document, Types } from "mongoose";

export interface PrescriptionDocument extends Document {
  patient: Types.ObjectId; 
  doctor: Types.ObjectId; 
  medication: string;
  dosage: string;
  frequency: string;
  notes?: string;
  date: Date;
}

const prescriptionSchema = new Schema<PrescriptionDocument>(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    medication: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String },
    notes: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<PrescriptionDocument>("Prescription", prescriptionSchema);