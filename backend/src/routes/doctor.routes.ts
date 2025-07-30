import express from 'express';
import * as doctorController from '../controller/doctor.controller';
// import { doctorOnly } from '../middleware/role.middleware';

const router = express.Router();

router.post('/patient',  doctorController.createPatientHistory);
router.post('/patient/:id/notes',  doctorController.addNotesToPatient);
router.post('/prescribe/medication',  doctorController.prescribeMedication);
router.post('/prescribe/test',  doctorController.prescribeTest);

export default router;

