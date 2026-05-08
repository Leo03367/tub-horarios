import express from 'express';
import * as stopsController from '../controllers/stopsController.js';

const router = express.Router();

router.get('/', stopsController.getAllStops);
router.get('/:id', stopsController.getStopById);
router.get('/search/:query', stopsController.searchStops);
router.get('/nearest', stopsController.getNearestStops);
router.get('/:id/schedule', stopsController.getStopSchedule);
router.get('/:id/lines', stopsController.getStopLines);

export default router;
