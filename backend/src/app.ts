import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import staffRoute from './routes/staffs.routes'
import doctorRoute from './routes/doctor.routes'
import authRoute from './routes/auth.routes'

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', authRoute);
app.use('/api/staff', staffRoute);
app.use('/api/docs',doctorRoute)


export default app;

