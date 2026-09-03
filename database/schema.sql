-- Weather Data
CREATE TABLE weather_data (
  id SERIAL PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100),
  temperature DECIMAL(5, 2),
  feels_like DECIMAL(5, 2),
  temp_min DECIMAL(5, 2),
  temp_max DECIMAL(5, 2),
  pressure INT,
  humidity INT,
  wind_speed DECIMAL(5, 2),
  wind_deg INT,
  clouds INT,
  description VARCHAR(255),
  icon VARCHAR(10),
  visibility INT,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(city, recorded_at)
);

-- Forecast Data
CREATE TABLE weather_forecast (
  id SERIAL PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  forecast_date DATE,
  temperature DECIMAL(5, 2),
  humidity INT,
  wind_speed DECIMAL(5, 2),
  description VARCHAR(255),
  precipitation_prob INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Locations
CREATE TABLE user_locations (
  id SERIAL PRIMARY KEY,
  user_id INT,
  city_name VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(10, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Weather Alerts
CREATE TABLE weather_alerts (
  id SERIAL PRIMARY KEY,
  user_id INT,
  city VARCHAR(100),
  alert_type VARCHAR(50),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  triggered_at TIMESTAMP
);

-- Air Quality Data
CREATE TABLE air_quality (
  id SERIAL PRIMARY KEY,
  city VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(10, 8),
  co DECIMAL(10, 4),
  no2 DECIMAL(10, 4),
  o3 DECIMAL(10, 4),
  so2 DECIMAL(10, 4),
  pm2_5 DECIMAL(5, 2),
  pm10 DECIMAL(5, 2),
  aqi INT,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_weather_city_date ON weather_data(city, recorded_at DESC);
CREATE INDEX idx_forecast_city_date ON weather_forecast(city, forecast_date);
CREATE INDEX idx_alerts_user ON weather_alerts(user_id);
CREATE INDEX idx_air_quality_city ON air_quality(city, recorded_at DESC);
