# Weather Dashboard - Development Guide

## Project Overview

Ultra Advanced Weather Dashboard with:
- Real-time weather data from OpenWeatherMap API
- AI-powered weather predictions using LSTM models
- Advanced weather analytics
- Interactive weather maps
- Air quality monitoring

## Tech Stack

### Frontend
- Next.js 14 + React 18
- TypeScript
- TailwindCSS
- Zustand (State Management)
- Recharts (Visualization)

### Backend
- Node.js + Express
- PostgreSQL
- Redis
- Socket.io
- OpenWeatherMap API

### Analytics
- Python FastAPI
- TensorFlow/Keras (LSTM)
- Scikit-learn

## API Keys Required

1. **OpenWeatherMap API**: https://openweathermap.org/api
   - Sign up for free tier
   - Get API key from dashboard

2. Set in `.env`:
   ```env
   OPENWEATHERMAP_API_KEY=your_key_here
   ```

## Setup Instructions

### Docker Setup (Recommended)

```bash
# Start all services
docker-compose up -d

# Access
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# Analytics: http://localhost:8000
```

### Manual Setup

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
npm install
cp ../env.example ../backend/.env
npm run dev
```

#### Analytics
```bash
cd analytics
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

## Testing

```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && npm test

# Analytics
cd analytics && pytest
```

## API Endpoints

### Weather
- `GET /api/weather/current/:city` - Current weather
- `GET /api/weather/forecast/:city` - 5-day forecast
- `GET /api/weather/history/:city?days=30` - Historical data

### Analytics
- `GET /api/analytics/predict/:city` - Weather prediction
- `GET /api/analytics/trends/:city` - Weather trends
- `GET /api/analytics/air-quality/:city` - Air quality data

## Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Write tests
5. Submit PR

---

Happy coding! 🌤️
