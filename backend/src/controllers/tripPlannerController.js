import logger from '../utils/logger.js';

export const planTrip = async (req, res, next) => {
  try {
    const { fromStopId, toStopId, departureTime } = req.body;

    if (!fromStopId || !toStopId) {
      return res.status(400).json({
        success: false,
        message: 'fromStopId and toStopId are required'
      });
    }

    const trip = {
      id: `trip_${Date.now()}`,
      fromStopId,
      toStopId,
      departureTime,
      routes: [
        {
          id: '1',
          line: '1',
          departure: departureTime || '14:30',
          arrival: '14:50',
          duration: '20 min',
          transfers: 0,
          stops: 3
        }
      ],
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      data: trip
    });
  } catch (error) {
    logger.error('Error planning trip:', error);
    next(error);
  }
};

export const getTripDetails = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    res.json({
      success: true,
      data: {
        id: tripId,
        routes: [
          {
            id: '1',
            line: '1',
            departure: '14:30',
            arrival: '14:50',
            duration: '20 min',
            stops: ['Stop A', 'Stop B', 'Stop C']
          }
        ]
      }
    });
  } catch (error) {
    logger.error('Error fetching trip details:', error);
    next(error);
  }
};
