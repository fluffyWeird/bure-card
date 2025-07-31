import mongoose, { Schema, Document } from 'mongoose';

interface LabTest {
  testName: string;
  result: string;
  normalRange?: string;
  date: Date;
  uploadedBy?: string;
}

interface Treatment {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Attachment {
  fileName: string;
  url: string;
  uploadedAt: Date;
}

export interface MedicalRecordDocument extends Document {
  patientId: mongoose.Types.ObjectId;
  visitDate: Date;
  
  doctor: {
    name: string;
    doctorId?: mongoose.Types.ObjectId;
    specialization?: string;
  };
  purpose: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  diagnosis?: {
    description: string;
    icdCode?: string;
  };
  treatments?: Treatment[];
  labTests?: LabTest[];
  notes?: string;
  followUpDate?: Date;
  attachments?: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

const medicalRecordSchema = new Schema<MedicalRecordDocument>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    
    doctor: {
      name: { type: String, required: true },
      doctorId: { type: Schema.Types.ObjectId, ref: 'Staff' },
      specialization: String,
    },
    purpose: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
      default: 'Pending',
    },
    diagnosis: {
      description: { type: String },
      icdCode: { type: String },
    },
    treatments: [
      {
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],
    labTests: [
      {
        testName: String,
        result: String,
        normalRange: String,
        date: Date,
        uploadedBy: String,
      },
    ],
    notes: String,
    followUpDate: Date,
    attachments: [
      {
        fileName: String,
        url: String,
        uploadedAt: Date,
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export const MedicalRecord = mongoose.model<MedicalRecordDocument>(
  'MedicalRecord',
  medicalRecordSchema
);
