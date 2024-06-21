import express, { Request, Response } from 'express';
import { pool } from './db/config';
import { router } from './routes';
import errorHandlingMiddleware from './middlewares/errorHadlingMiddleware';
import cors from 'cors';
import authMiddleware from './middlewares/authMiddleware';
import cookieParser from 'cookie-parser';

pool.on('connect', () => {
  console.log('Connected to the database');
});

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    //frontend host
    origin: 'http://localhost:5173',
    //send cookies
    credentials: true
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandlingMiddleware);
app.use(authMiddleware);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

const server = app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}`)
});

export { app, server };
