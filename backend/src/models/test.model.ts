import { Schema, model, Document, Types } from "mongoose";

export interface TestDocument extends Document {
  patient: Types.ObjectId; 
  doctor: Types.ObjectId;
  testName: string;
  status: "ordered" | "completed";
  result?: string;
  date: Date;
}

const testSchema = new Schema<TestDocument>(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    testName: { type: String, required: true },
    status: { type: String, enum: ["ordered", "completed"], default: "ordered" },
    result: { type: String }, 
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<TestDocument>("Test", testSchema);