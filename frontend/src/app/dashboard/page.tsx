'use client';

import React, { useEffect, useState } from 'react';
import { useWeatherStore } from '@store/useWeatherStore';
import WeatherCard from '@components/WeatherCard';

export default function Dashboard() {
  const {
    currentWeather,
    forecast,
    selectedCity,
    setSelectedCity,
    fetchWeather,
    fetchForecast,
  } = useWeatherStore();
  const [cityInput, setCityInput] = useState('');

  useEffect(() => {
    fetchWeather(selectedCity);
    fetchForecast(selectedCity);
  }, [selectedCity]);

  const handleSearchCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setSelectedCity(cityInput);
      setCityInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-4">🌤️ Weather Dashboard</h1>
          <form onSubmit={handleSearchCity} className="flex gap-2">
            <input
              type="text"
              placeholder="Search city..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-lg font-semibold"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Current Weather */}
        {currentWeather && (
          <div className="mb-8">
            <WeatherCard weather={currentWeather} onSelect={setSelectedCity} />
          </div>
        )}

        {/* Weather Details Grid */}
        {currentWeather && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm mb-2">Temperature Range</p>
              <p className="text-2xl font-bold text-gray-900">
                {currentWeather.tempMin}° - {currentWeather.tempMax}°C
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm mb-2">Visibility</p>
              <p className="text-2xl font-bold text-gray-900">
                {(currentWeather.visibility / 1000).toFixed(1)} km
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm mb-2">Cloud Cover</p>
              <p className="text-2xl font-bold text-gray-900">{currentWeather.clouds}%</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm mb-2">Wind Direction</p>
              <p className="text-2xl font-bold text-gray-900">{currentWeather.windDeg}°</p>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {forecast.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5-Day Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {forecast.slice(0, 40).map((day, index) => {
                // Get one forecast per day (3-hour intervals, so every 8th item)
                if (index % 8 !== 0) return null;
                return (
                  <div key={index} className="bg-blue-50 rounded p-4 text-center">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      {new Date(day.date).toLocaleDateString()}
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt={day.description}
                      className="w-12 h-12 mx-auto mb-2"
                    />
                    <p className="text-lg font-bold text-gray-900 mb-1">{day.temperature}°C</p>
                    <p className="text-xs text-gray-600 capitalize mb-2">{day.description}</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>💧 {(day.pop * 100).toFixed(0)}%</p>
                      <p>💨 {day.windSpeed} m/s</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
