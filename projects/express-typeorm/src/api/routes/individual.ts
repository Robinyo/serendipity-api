import { Router } from 'express';

import IndividualController from '../controllers/individual.controller';

const router = Router();

router.get('/', IndividualController.getAll);
router.get('/:id([0-9]+)', IndividualController.getOneById);
router.post('/', IndividualController.new);

export default router;
