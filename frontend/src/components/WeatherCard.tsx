import React from 'react';
import { WeatherData } from '@types/index';

interface WeatherCardProps {
  weather: WeatherData;
  onSelect?: (city: string) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onSelect }) => {
  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <div
      onClick={() => onSelect?.(weather.city)}
      className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{weather.city}</h2>
          <p className="text-blue-100">{weather.country}</p>
        </div>
        <img
          src={getWeatherIcon(weather.icon)}
          alt={weather.description}
          className="w-16 h-16"
        />
      </div>

      <p className="text-4xl font-bold text-white mb-2">{weather.temperature}°C</p>
      <p className="text-blue-100 mb-4 capitalize">{weather.description}</p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white bg-opacity-20 rounded p-2">
          <p className="text-blue-100">Feels Like</p>
          <p className="text-white font-semibold">{weather.feelsLike}°C</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded p-2">
          <p className="text-blue-100">Humidity</p>
          <p className="text-white font-semibold">{weather.humidity}%</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded p-2">
          <p className="text-blue-100">Wind</p>
          <p className="text-white font-semibold">{weather.windSpeed} m/s</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded p-2">
          <p className="text-blue-100">Pressure</p>
          <p className="text-white font-semibold">{weather.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
