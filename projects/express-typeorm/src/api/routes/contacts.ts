import { Router } from 'express';

import { preAuthorise } from '../middleware/pre-authorise';

import IndividualController from '../controllers/individual.controller';

const router = Router();

router.get('/contacts', [preAuthorise], IndividualController.getAll);
// router.get('/contacts/:id([0-9]+)', [preAuthorise], IndividualController.getOneById);
router.get('/contacts/:id', [preAuthorise], IndividualController.getOneById);
router.post('/contacts', [preAuthorise], IndividualController.new);

export default router;
