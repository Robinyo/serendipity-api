import { Router } from 'express';

import ContactController from '../controllers/contact.controller';

const router = Router();

router.get('/', ContactController.all);

export default router;
