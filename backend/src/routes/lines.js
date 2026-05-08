import express from 'express';
import * as linesController from '../controllers/linesController.js';

const router = express.Router();

router.get('/', linesController.getAllLines);
router.get('/:id', linesController.getLineById);
router.get('/search/:query', linesController.searchLines);
router.get('/:id/schedule', linesController.getLineSchedule);
router.get('/:id/next-departures', linesController.getNextDepartures);
router.get('/:id/stops', linesController.getLineStops);

export default router;
