import logger from '../utils/logger.js';

const mockStops = [
  {
    id: 's1',
    name: 'Integração',
    code: 'INT',
    city: 'Braga',
    district: 'Braga',
    latitude: 41.5578,
    longitude: -8.4298,
    lines: ['1', '2', '3', '4', '5'],
    facilities: ['shelter', 'bench', 'trash'],
    accessibility: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 's2',
    name: 'Bombeiros',
    code: 'BOM',
    city: 'Braga',
    district: 'Braga',
    latitude: 41.5592,
    longitude: -8.4320,
    lines: ['1', '2', '4'],
    facilities: ['shelter', 'bench'],
    accessibility: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 's3',
    name: 'Lamaçães',
    code: 'LAM',
    city: 'Braga',
    district: 'Braga',
    latitude: 41.5610,
    longitude: -8.4350,
    lines: ['1', '3', '5'],
    facilities: ['shelter', 'bench', 'trash', 'ticket_machine'],
    accessibility: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getAllStops = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const stops = mockStops.slice(offset, offset + limit);
    const total = mockStops.length;

    res.json({
      success: true,
      data: stops,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching stops:', error);
    next(error);
  }
};

export const getStopById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stop = mockStops.find(s => s.id === id);

    if (!stop) {
      return res.status(404).json({
        success: false,
        message: 'Stop not found'
      });
    }

    res.json({
      success: true,
      data: stop
    });
  } catch (error) {
    logger.error('Error fetching stop:', error);
    next(error);
  }
};

export const searchStops = async (req, res, next) => {
  try {
    const { query } = req.params;

    const results = mockStops.filter(
      stop =>
        stop.name.toLowerCase().includes(query.toLowerCase()) ||
        stop.code.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    logger.error('Error searching stops:', error);
    next(error);
  }
};

export const getNearestStops = async (req, res, next) => {
  try {
    const { lat, lng, radius = 500 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const radiusKm = parseFloat(radius) / 1000;

    const stops = mockStops
      .map(stop => {
        const latDiff = stop.latitude - userLat;
        const lngDiff = stop.longitude - userLng;
        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111;

        return { ...stop, distance };
      })
      .filter(stop => stop.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);

    res.json({
      success: true,
      data: stops
    });
  } catch (error) {
    logger.error('Error finding nearest stops:', error);
    next(error);
  }
};

export const getStopSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stop = mockStops.find(s => s.id === id);

    if (!stop) {
      return res.status(404).json({
        success: false,
        message: 'Stop not found'
      });
    }

    res.json({
      success: true,
      data: {
        stopId: id,
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

export const getStopLines = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stop = mockStops.find(s => s.id === id);

    if (!stop) {
      return res.status(404).json({
        success: false,
        message: 'Stop not found'
      });
    }

    res.json({
      success: true,
      data: stop.lines
    });
  } catch (error) {
    logger.error('Error fetching stop lines:', error);
    next(error);
  }
};
