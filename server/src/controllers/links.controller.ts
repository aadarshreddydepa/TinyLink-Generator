import { Request, Response } from 'express';
import Link from '../models/Link';
import { randomCode } from '../utils/codeGen';

export async function createLink(req: Request, res: Response) {
  const { url, code } = req.body as { url: string; code?: string };
  let finalCode = code;
  if (!finalCode) {
    // try until unique (rare collision)
    for (let i=0;i<5;i++) {
      const candidate = randomCode(6);
      const exists = await Link.findOne({ code: candidate }).lean();
      if (!exists) { finalCode = candidate; break; }
    }
    if (!finalCode) finalCode = randomCode(7);
  }

  // check uniqueness
  const exists = await Link.findOne({ code: finalCode });
  if (exists) return res.status(409).json({ message: 'Code already exists' });

  const link = new Link({ code: finalCode, url });
  await link.save();

  return res.status(201).json({
    code: link.code,
    url: link.url,
    shortUrl: `${process.env.BASE_URL?.replace(/\/$/, '') || ''}/${link.code}`,
    clicks: link.clicks,
    createdAt: link.createdAt
  });
}

export async function listLinks(req: Request, res: Response) {
  const links = await Link.find().sort({ createdAt: -1 }).lean();
  return res.json(links.map(l => ({
    code: l.code,
    url: l.url,
    clicks: l.clicks,
    lastClicked: l.lastClicked,
    createdAt: l.createdAt
  })));
}

export async function getLink(req: Request, res: Response) {
  const { code } = req.params;
  const link = await Link.findOne({ code }).lean();
  if (!link) return res.status(404).json({ message: 'Not found' });
  return res.json(link);
}

export async function deleteLink(req: Request, res: Response) {
  const { code } = req.params;
  const deleted = await Link.findOneAndDelete({ code });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  return res.status(200).json({ ok: true });
}
