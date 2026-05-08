import logger from '../utils/logger.js';

const favorites = [];

export const getUserFavorites = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: favorites
    });
  } catch (error) {
    logger.error('Error fetching favorites:', error);
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { type, itemId, name } = req.body;

    if (!type || !itemId || !name) {
      return res.status(400).json({
        success: false,
        message: 'Type, itemId, and name are required'
      });
    }

    const favorite = {
      id: `fav_${Date.now()}`,
      type,
      itemId,
      name,
      createdAt: new Date()
    };

    favorites.push(favorite);

    res.status(201).json({
      success: true,
      data: favorite
    });
  } catch (error) {
    logger.error('Error adding favorite:', error);
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = favorites.findIndex(f => f.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    favorites.splice(index, 1);

    res.json({
      success: true,
      message: 'Favorite removed'
    });
  } catch (error) {
    logger.error('Error removing favorite:', error);
    next(error);
  }
};

export const checkFavorite = async (req, res, next) => {
  try {
    const { type, itemId } = req.params;

    const isFavorited = favorites.some(f => f.type === type && f.itemId === itemId);

    res.json({
      success: true,
      data: {
        type,
        itemId,
        isFavorited
      }
    });
  } catch (error) {
    logger.error('Error checking favorite:', error);
    next(error);
  }
};
