import { Router } from 'express';

import ContactController from '../controllers/contact.controller';

const router = Router();

router.get('/', ContactController.getAll);
router.get('/:id([0-9]+)', ContactController.getOneById);

export default router;
