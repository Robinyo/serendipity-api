import { Router } from 'express';

// import { checkJwt } from '../middleware/check-jwt';
import { preAuthorise } from '../middleware/preAuthorise';

import IndividualController from '../controllers/individual.controller';

const router = Router();

// router.get('/', [preAuthorise], IndividualController.getAll);
// router.get('/:id([0-9]+)', [preAuthorise], IndividualController.getOneById);
// router.post('/', [preAuthorise], IndividualController.new);

router.get('/contacts', [preAuthorise], IndividualController.getAll);
router.get('/contacts/:id([0-9]+)', [preAuthorise], IndividualController.getOneById);
router.post('/contacts', [preAuthorise], IndividualController.new);

export default router;
