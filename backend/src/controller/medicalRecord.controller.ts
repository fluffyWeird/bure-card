import { Request, Response } from "express";
import { MedicalRecord } from "../models/medicalRecord.model";

export const getMedicalRecordsByPatient = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.patientId;
    const records = await MedicalRecord.find({ patientId }).sort({ visitDate: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch records", error });
  }
};

export const createMedicalRecord = async (req: Request, res: Response) => {
  try {
    const newRecord = new MedicalRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: "Failed to create record", error });
  }
};

export const getMedicalRecordById = async (req: Request, res: Response) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch record", error });
  }
};

export const updateMedicalRecord = async (req: Request, res: Response) => {
  try {
    const updated = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update record", error });
  }
};


export const deleteMedicalRecord = async (req: Request, res: Response) => {
  try {
    const deleted = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete record", error });
  }
};
