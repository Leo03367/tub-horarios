import express from 'express';
import * as schedulesController from '../controllers/schedulesController.js';

const router = express.Router();

router.get('/line/:lineId', schedulesController.getLineSchedule);
router.get('/stop/:stopId', schedulesController.getStopSchedule);
router.post('/next-departures', schedulesController.getNextDepartures);
router.post('/between', schedulesController.getScheduleBetween);

export default router;
