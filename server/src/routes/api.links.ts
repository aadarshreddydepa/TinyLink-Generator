import { Router } from 'express';
import { createLink, listLinks, getLink, deleteLink } from '../controllers/links.controller';
import { validateCreate } from '../middleware/validateUrl';

const router = Router();

router.post('/', validateCreate, createLink);           // POST /api/links
router.get('/', listLinks);                             // GET /api/links
router.get('/:code', getLink);                          // GET /api/links/:code
router.delete('/:code', deleteLink);                    // DELETE /api/links/:code

export default router;
