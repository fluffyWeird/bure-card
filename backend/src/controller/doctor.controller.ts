import { Request, Response } from "express";
import * as doctorService from "../services/doctor.service";

export const createPatientHistory = async (req: Request, res: Response) => {
  try {
    const patient = await doctorService.createPatientHistory(req.body);
    res.status(201).json({ message: "Patient history created", patient });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getPatientData = async (req: Request, res: Response) => {
  try {
    const patient = await doctorService.getPatientById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const addNotesToPatient = async (req: Request, res: Response) => {
  try {
    const updatedPatient = await doctorService.addNotes(req.params.id, req.body.note,'6889d0f6b7ff4fe17487d0f2');
    res.json({ message: "Note added", patient: updatedPatient });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const prescribeMedication = async (req: Request, res: Response) => {
  try {
    const prescription = await doctorService.prescribeMedication(req.body);
    res.status(201).json({ message: "Medication prescribed", prescription });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const prescribeTest = async (req: Request, res: Response) => {
  try {
    const test = await doctorService.prescribeTest(req.body);
    res.status(201).json({ message: "Test prescribed", test });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};