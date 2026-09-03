import axios from 'axios';
import { logger } from '../utils/logger.js';

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHERMAP_API_KEY;
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(city) {
    try {
      const response = await axios.get(`${this.baseURL}/weather`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
        },
      });

      const data = response.data;
      return {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        clouds: data.clouds.all,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        visibility: data.visibility,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      };
    } catch (error) {
      logger.error(`Error fetching weather for ${city}:`, error.message);
      return null;
    }
  }

  async getForecast(city, days = 5) {
    try {
      const response = await axios.get(`${this.baseURL}/forecast`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
          cnt: days * 8,
        },
      });

      return response.data.list.map((item) => ({
        timestamp: item.dt,
        date: new Date(item.dt * 1000),
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: item.wind.speed,
        clouds: item.clouds.all,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        pop: item.pop,
        rain: item.rain?.['3h'] || 0,
      }));
    } catch (error) {
      logger.error(`Error fetching forecast for ${city}:`, error.message);
      return null;
    }
  }

  async getAirQuality(latitude, longitude) {
    try {
      const response = await axios.get(`${this.baseURL}/air_pollution`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
        },
      });

      const data = response.data.list[0].components;
      return {
        co: data.co,
        no2: data.no2,
        o3: data.o3,
        so2: data.so2,
        pm2_5: data.pm2_5,
        pm10: data.pm10,
        aqi: response.data.list[0].main.aqi,
      };
    } catch (error) {
      logger.error('Error fetching air quality:', error.message);
      return null;
    }
  }

  async getCoordinates(city) {
    try {
      const response = await axios.get(`${this.baseURL}/weather`, {
        params: {
          q: city,
          appid: this.apiKey,
        },
      });

      return {
        latitude: response.data.coord.lat,
        longitude: response.data.coord.lon,
      };
    } catch (error) {
      logger.error(`Error fetching coordinates for ${city}:`, error.message);
      return null;
    }
  }
}

export default new WeatherService();
