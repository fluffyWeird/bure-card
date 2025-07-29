import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

export default app;
