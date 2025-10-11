import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRouter.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API test
app.get('/', (req, res) => res.send('API is working...'));

// Auth routes
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));