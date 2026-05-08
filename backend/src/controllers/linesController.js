import logger from '../utils/logger.js';

// Mock data
const mockLines = [
  {
    id: '1',
    number: '1',
    destination: 'Integração - Lamaçães',
    origin: 'Integração',
    operatorId: 'tub',
    description: 'Linha 1 - Integração to Lamaçães',
    weekdaySchedules: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00'],
    saturdaySchedules: ['07:00', '07:30', '08:00', '08:30', '09:00'],
    sundaySchedules: ['08:00', '08:30', '09:00', '09:30', '10:00'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    number: '2',
    destination: 'Integração - Celeirós',
    origin: 'Integração',
    operatorId: 'tub',
    description: 'Linha 2 - Integração to Celeirós',
    weekdaySchedules: ['05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30'],
    saturdaySchedules: ['06:30', '07:00', '07:30', '08:00'],
    sundaySchedules: ['07:30', '08:00', '08:30', '09:00'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    number: '3',
    destination: 'Integração - Guarda',
    origin: 'Integração',
    operatorId: 'tub',
    description: 'Linha 3 - Integração to Guarda',
    weekdaySchedules: ['06:15', '06:45', '07:15', '07:45', '08:15', '08:45'],
    saturdaySchedules: ['07:15', '07:45', '08:15'],
    sundaySchedules: ['08:15', '08:45', '09:15'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getAllLines = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const lines = mockLines.slice(offset, offset + limit);
    const total = mockLines.length;

    res.json({
      success: true,
      data: lines,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching lines:', error);
    next(error);
  }
};

export const getLineById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const line = mockLines.find(l => l.id === id);

    if (!line) {
      return res.status(404).json({
        success: false,
        message: 'Line not found'
      });
    }

    res.json({
      success: true,
      data: line
    });
  } catch (error) {
    logger.error('Error fetching line:', error);
    next(error);
  }
};

export const searchLines = async (req, res, next) => {
  try {
    const { query } = req.params;

    const results = mockLines.filter(
      line =>
        line.number.includes(query) ||
        line.destination.toLowerCase().includes(query.toLowerCase()) ||
        line.origin.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    logger.error('Error searching lines:', error);
    next(error);
  }
};

export const getLineSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const line = mockLines.find(l => l.id === id);

    if (!line) {
      return res.status(404).json({
        success: false,
        message: 'Line not found'
      });
    }

    res.json({
      success: true,
      data: {
        lineId: id,
        weekday: line.weekdaySchedules,
        saturday: line.saturdaySchedules,
        sunday: line.sundaySchedules
      }
    });
  } catch (error) {
    logger.error('Error fetching line schedule:', error);
    next(error);
  }
};

export const getNextDepartures = async (req, res, next) => {
  try {
    const { id } = req.params;
    const line = mockLines.find(l => l.id === id);

    if (!line) {
      return res.status(404).json({
        success: false,
        message: 'Line not found'
      });
    }

    const now = new Date();
    const nextDepartures = line.weekdaySchedules.slice(0, 5);

    res.json({
      success: true,
      data: {
        lineId: id,
        currentTime: now.toISOString(),
        nextDepartures
      }
    });
  } catch (error) {
    logger.error('Error fetching next departures:', error);
    next(error);
  }
};

export const getLineStops = async (req, res, next) => {
  try {
    const { id } = req.params;

    const stops = [
      { id: 's1', name: 'Integração', order: 1, lat: 41.5578, lng: -8.4298 },
      { id: 's2', name: 'Bombeiros', order: 2, lat: 41.5592, lng: -8.4320 },
      { id: 's3', name: 'Lamaçães', order: 3, lat: 41.5610, lng: -8.4350 }
    ];

    res.json({
      success: true,
      data: stops
    });
  } catch (error) {
    logger.error('Error fetching line stops:', error);
    next(error);
  }
};
