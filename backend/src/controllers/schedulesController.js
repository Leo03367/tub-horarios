import logger from '../utils/logger.js';

export const getLineSchedule = async (req, res, next) => {
  try {
    const { lineId } = req.params;

    res.json({
      success: true,
      data: {
        lineId,
        weekday: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00'],
        saturday: ['07:00', '07:30', '08:00', '08:30', '09:00'],
        sunday: ['08:00', '08:30', '09:00', '09:30', '10:00']
      }
    });
  } catch (error) {
    logger.error('Error fetching line schedule:', error);
    next(error);
  }
};

export const getStopSchedule = async (req, res, next) => {
  try {
    const { stopId } = req.params;

    res.json({
      success: true,
      data: {
        stopId,
        schedules: {
          line1: ['06:00', '06:30', '07:00', '07:30', '08:00'],
          line2: ['06:15', '06:45', '07:15', '07:45', '08:15']
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching stop schedule:', error);
    next(error);
  }
};

export const getNextDepartures = async (req, res, next) => {
  try {
    const { lineId, stopId } = req.body;

    res.json({
      success: true,
      data: {
        lineId,
        stopId,
        nextDepartures: [
          { time: '14:30', waitingTime: '5 min' },
          { time: '14:45', waitingTime: '20 min' },
          { time: '15:00', waitingTime: '35 min' }
        ]
      }
    });
  } catch (error) {
    logger.error('Error fetching next departures:', error);
    next(error);
  }
};

export const getScheduleBetween = async (req, res, next) => {
  try {
    const { fromStopId, toStopId } = req.body;

    res.json({
      success: true,
      data: {
        fromStopId,
        toStopId,
        routes: [
          {
            id: '1',
            line: '1',
            departure: '14:30',
            arrival: '14:50',
            duration: '20 min',
            stops: 3
          },
          {
            id: '2',
            line: '2',
            departure: '14:35',
            arrival: '14:55',
            duration: '20 min',
            stops: 2
          }
        ]
      }
    });
  } catch (error) {
    logger.error('Error fetching schedule between stops:', error);
    next(error);
  }
};
