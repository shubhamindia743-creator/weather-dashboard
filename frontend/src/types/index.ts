export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  clouds: number;
  description: string;
  icon: string;
  visibility: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastData {
  timestamp: number;
  date: Date;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  clouds: number;
  description: string;
  icon: string;
  pop: number;
  rain: number;
}

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  aqi: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
