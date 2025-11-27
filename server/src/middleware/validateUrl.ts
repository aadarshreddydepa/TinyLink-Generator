import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const createSchema = z.object({
  url: z.string().url(),
  code: z.string().regex(/^[A-Za-z0-9]{6,8}$/).optional()
});

export function validateCreate(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = createSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid input', error: (err as any).errors ?? err });
  }
}
