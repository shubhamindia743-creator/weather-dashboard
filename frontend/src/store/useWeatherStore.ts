import create from 'zustand';
import { WeatherData, ForecastData, Location } from '@types/index';

interface WeatherStore {
  currentWeather: WeatherData | null;
  forecast: ForecastData[];
  locations: Location[];
  selectedCity: string;
  loading: boolean;
  error: string | null;

  setCurrentWeather: (weather: WeatherData | null) => void;
  setForecast: (forecast: ForecastData[]) => void;
  setLocations: (locations: Location[]) => void;
  setSelectedCity: (city: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  fetchWeather: (city: string) => Promise<void>;
  fetchForecast: (city: string) => Promise<void>;
  fetchLocations: () => Promise<void>;
  addLocation: (location: Location) => Promise<void>;
  removeLocation: (id: string) => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  currentWeather: null,
  forecast: [],
  locations: [],
  selectedCity: 'Mumbai',
  loading: false,
  error: null,

  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  setForecast: (forecast) => set({ forecast }),
  setLocations: (locations) => set({ locations }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchWeather: async (city) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/api/weather/current/${city}`);
      const data = await response.json();
      if (data.success) {
        set({ currentWeather: data.data, loading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchForecast: async (city) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/api/weather/forecast/${city}`);
      const data = await response.json();
      if (data.success) {
        set({ forecast: data.data, loading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchLocations: async () => {
    try {
      const response = await fetch(`${API_URL}/api/locations`);
      const data = await response.json();
      if (data.success) {
        set({ locations: data.data });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  addLocation: async (location) => {
    try {
      const response = await fetch(`${API_URL}/api/locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(location),
      });
      if (response.ok) {
        const { locations } = get();
        set({ locations: [...locations, location] });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  removeLocation: async (id) => {
    try {
      await fetch(`${API_URL}/api/locations/${id}`, { method: 'DELETE' });
      const { locations } = get();
      set({ locations: locations.filter((l) => l.id !== id) });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
