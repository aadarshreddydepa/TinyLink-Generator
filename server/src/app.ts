import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import apiLinks from './routes/api.links';
import redirectRouter from './routes/redirect';
import { errorHandler } from './middleware/errorHandler';
import { healthRouter } from './health';

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/links', apiLinks);
app.use('/', redirectRouter); // handles /:code redirect and healthz via /healthz
app.use('/healthz', healthRouter);

// error handler (must be last)
app.use(errorHandler);

export default app;
