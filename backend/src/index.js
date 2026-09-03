import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Weather Routes
app.get('/api/weather/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    logger.info(`Fetching current weather for ${city}`);
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/weather/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    logger.info(`Fetching forecast for ${city}`);
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/weather/history/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const { days = 30 } = req.query;
    logger.info(`Fetching ${days} days of history for ${city}`);
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Locations Routes
app.get('/api/locations', async (req, res) => {
  try {
    logger.info('Fetching saved locations');
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/locations', async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;
    logger.info(`Adding location: ${name}`);
    res.json({ success: true, data: { name, latitude, longitude } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/locations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Deleting location: ${id}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Analytics Routes
app.get('/api/analytics/trends/:city', async (req, res) => {
  try {
    const { city } = req.params;
    logger.info(`Analyzing trends for ${city}`);
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/analytics/predict/:city', async (req, res) => {
  try {
    const { city } = req.params;
    logger.info(`Predicting weather for ${city}`);
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/analytics/air-quality/:city', async (req, res) => {
  try {
    const { city } = req.params;
    logger.info(`Fetching air quality for ${city}`);
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// WebSocket
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('subscribe_city', (city) => {
    socket.join(`weather:${city}`);
    logger.info(`${socket.id} subscribed to ${city}`);
  });

  socket.on('unsubscribe_city', (city) => {
    socket.leave(`weather:${city}`);
    logger.info(`${socket.id} unsubscribed from ${city}`);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Error Handler
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ success: false, error: err.message });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  logger.info(`🌤️  Weather Dashboard API running on port ${PORT}`);
});

export { app, io };
