import express from 'express';
import * as settingsController from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', settingsController.getUserSettings);
router.put('/', settingsController.updateUserSettings);
router.get('/config', settingsController.getAppConfig);

export default router;
