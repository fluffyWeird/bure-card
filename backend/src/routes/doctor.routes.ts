import express from 'express';
import * as doctorController from '../controller/doctor.controller';
import { doctorOnly } from '../middleware/role.middleware';

const router = express.Router();


router.post('/patient',doctorOnly,  doctorController.createPatientHistory);
router.post('/patient/:id/notes',doctorOnly,  doctorController.addNotesToPatient);
router.post('/prescribe/medication',doctorOnly,  doctorController.prescribeMedication);
router.post('/prescribe/test',doctorOnly,  doctorController.prescribeTest);

export default router;

