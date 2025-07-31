import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import staffRoute from './routes/staffs.routes'
import doctorRoute from './routes/doctor.routes'
import authRoute from './routes/auth.routes'
import medicalRecordRoute from './routes/medicalRecord.routes';
import { setupSwagger } from './utils/swagger';
const app = express();
setupSwagger(app);
app.use(cors(
    {
        origin: 'http://localhost:3000', // Adjust this to your frontend URL
        credentials: true, // Allow cookies to be sent with requests
    }
));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', authRoute);
app.use('/api/staff', staffRoute);
app.use('/api/docs',doctorRoute)
app.use('/api/records', medicalRecordRoute)


export default app;

