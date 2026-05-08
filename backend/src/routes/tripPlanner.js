import express from 'express';
import * as tripPlannerController from '../controllers/tripPlannerController.js';

const router = express.Router();

router.post('/', tripPlannerController.planTrip);
router.get('/:tripId', tripPlannerController.getTripDetails);

export default router;
