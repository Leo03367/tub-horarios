import logger from '../utils/logger.js';

const defaultSettings = {
  theme: 'light',
  language: 'pt',
  notifications: true,
  notificationTypes: {
    delays: true,
    updates: true,
    offers: false
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false
  },
  privacy: {
    shareLocation: false,
    shareHistory: false
  }
};

let userSettings = { ...defaultSettings };

export const getUserSettings = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: userSettings
    });
  } catch (error) {
    logger.error('Error fetching settings:', error);
    next(error);
  }
};

export const updateUserSettings = async (req, res, next) => {
  try {
    userSettings = { ...userSettings, ...req.body };

    res.json({
      success: true,
      data: userSettings
    });
  } catch (error) {
    logger.error('Error updating settings:', error);
    next(error);
  }
};

export const getAppConfig = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        version: '1.0.0',
        apiVersion: 'v1',
        features: {
          pwa: true,
          realtime: true,
          notifications: true,
          gps: true,
          offline: true
        },
        languages: [
          { code: 'pt', name: 'Português' },
          { code: 'en', name: 'English' }
        ],
        themes: ['light', 'dark']
      }
    });
  } catch (error) {
    logger.error('Error fetching app config:', error);
    next(error);
  }
};
