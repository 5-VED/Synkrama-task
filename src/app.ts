import express, { Application } from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import RootRouter from './Routes';

const app:Application = express()

app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", RootRouter)


export default app