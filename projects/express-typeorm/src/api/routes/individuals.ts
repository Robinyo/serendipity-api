import { Router } from 'express';

import { preAuthorise } from '../middleware/pre-authorise';

import IndividualController from '../controllers/individual.controller';

const router = Router();

router.get('/individuals', [preAuthorise], IndividualController.getAll);
// router.get('/individuals/:id([0-9]+)', [preAuthorise], IndividualController.getOneById);
router.get('/individuals/:id', [preAuthorise], IndividualController.getOneById);
router.post('/individuals', [preAuthorise], IndividualController.new);

export default router;

// router.get('/', [preAuthorise], IndividualController.getAll);
// router.get('/:id([0-9]+)', [preAuthorise], IndividualController.getOneById);
// router.post('/', [preAuthorise], IndividualController.new);
