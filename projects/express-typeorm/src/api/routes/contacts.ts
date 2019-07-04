import { Router } from 'express';

import { preAuthorise } from '../middleware/preAuthorise';

import IndividualController from '../controllers/individual.controller';

const router = Router();

router.get('/individuals', [preAuthorise], IndividualController.getAll);
router.get('/individuals/:id([0-9]+)', [preAuthorise], IndividualController.getOneById);
router.post('/individuals', [preAuthorise], IndividualController.new);

export default router;
