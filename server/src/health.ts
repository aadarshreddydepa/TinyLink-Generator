import { Router } from 'express';
export const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  const version = '1.0';
  res.json({ ok: true, version, uptime: process.uptime() });
});
