import { Router } from 'express';
import Link from '../models/Link';

const router = Router();

// Redirect route: GET /:code
router.get('/:code', async (req, res) => {
  const { code } = req.params;
  // disallow health route overlap, but healthz is at /healthz in app
  const link = await Link.findOne({ code });
  if (!link) return res.status(404).send('Not found');
  // increment atomically
  await Link.updateOne({ _id: link._id }, { $inc: { clicks: 1 }, $set: { lastClicked: new Date() } });
  return res.redirect(302, link.url);
});

export default router;
