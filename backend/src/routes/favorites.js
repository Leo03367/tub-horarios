import express from 'express';
import * as favoritesController from '../controllers/favoritesController.js';

const router = express.Router();

router.get('/', favoritesController.getUserFavorites);
router.post('/', favoritesController.addFavorite);
router.delete('/:id', favoritesController.removeFavorite);
router.get('/check/:type/:itemId', favoritesController.checkFavorite);

export default router;
