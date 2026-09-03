# Weather Dashboard API Documentation

## Authentication

Use JWT tokens in Authorization header:
```
Authorization: Bearer <token>
```

## Weather Endpoints

### Get Current Weather

**GET** `/api/weather/current/:city`

```bash
curl http://localhost:3001/api/weather/current/Mumbai
```

Response:
```json
{
  "success": true,
  "data": {
    "city": "Mumbai",
    "temperature": 28,
    "humidity": 75,
    "description": "Partly Cloudy",
    "windSpeed": 12,
    "pressure": 1013,
    "feelsLike": 30
  }
}
```

### Get Weather Forecast

**GET** `/api/weather/forecast/:city`

```bash
curl http://localhost:3001/api/weather/forecast/Delhi
```

### Get Historical Data

**GET** `/api/weather/history/:city?days=30`

## Location Endpoints

### Get Saved Locations

**GET** `/api/locations`

### Add Location

**POST** `/api/locations`

```json
{
  "name": "Mumbai",
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

### Delete Location

**DELETE** `/api/locations/:id`

## Analytics Endpoints

### Weather Trends

**GET** `/api/analytics/trends/:city`

### Weather Prediction

**GET** `/api/analytics/predict/:city`

### Air Quality

**GET** `/api/analytics/air-quality/:city`
