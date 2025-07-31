import express from "express";
import {
  getMedicalRecordsByPatient,
  createMedicalRecord,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord
} from "../controller/medicalRecord.controller";

const router = express.Router();


router.get("/patient/:patientId", getMedicalRecordsByPatient);


router.post("/", createMedicalRecord);


router.get("/:id", getMedicalRecordById);


router.put("/:id", updateMedicalRecord);

router.delete("/:id", deleteMedicalRecord);

export default router;
