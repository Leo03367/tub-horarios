import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import logger from './utils/logger.js';
import errorHandler from './middleware/errorHandler.js';
import requestLogger from './middleware/requestLogger.js';
import linesRoutes from './routes/lines.js';
import stopsRoutes from './routes/stops.js';
import schedulesRoutes from './routes/schedules.js';
import favoritesRoutes from './routes/favorites.js';
import tripPlannerRoutes from './routes/tripPlanner.js';
import settingsRoutes from './routes/settings.js';

dotenv.config();

const app = express();
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging
app.use(requestLogger);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});
app.use(limiter);

// Routes
app.use(`${API_PREFIX}/lines`, linesRoutes);
app.use(`${API_PREFIX}/stops`, stopsRoutes);
app.use(`${API_PREFIX}/schedules`, schedulesRoutes);
app.use(`${API_PREFIX}/favorites`, favoritesRoutes);
app.use(`${API_PREFIX}/trip-planner`, tripPlannerRoutes);
app.use(`${API_PREFIX}/settings`, settingsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'TUB Horários API',
    version: '1.0.0',
    status: 'running'
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling
app.use(errorHandler);

export default app;
