import dotenv from 'dotenv';
import app from './app';
import {connectdb} from './utils/db.connection';

dotenv.config();
connectdb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
