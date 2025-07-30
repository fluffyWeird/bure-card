import { Types } from "mongoose";
import Patient from "../models/patient.model";
import Prescription from "../models/prescription.model";
import Test from "../models/test.model";

export const createPatientHistory = async (data: any) => {
  return await Patient.create(data);
};

export const getPatientById = async (id: string) => {
  return await Patient.findById(id).populate("notes.addedBy", "username role");
};

export const addNotes = async (patientId: string, note: string, staffId: string) => {
  const patient = await Patient.findById(patientId);
  if (!patient) throw new Error("Patient not found");

  patient.notes.push({
    text: note,
    date: new Date(),
    addedBy: new Types.ObjectId(staffId),
  });

  return await patient.save();
};

export const prescribeMedication = async (data: any) => {
  return await Prescription.create(data);
};

export const prescribeTest = async (data: any) => {
  return await Test.create(data);
};
