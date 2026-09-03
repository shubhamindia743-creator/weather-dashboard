import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
import joblib
from datetime import datetime, timedelta

class WeatherPredictionModel:
    def __init__(self, lookback_period=30):
        self.lookback_period = lookback_period
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.model = None

    def prepare_data(self, temps):
        """Prepare temperature data for LSTM"""
        scaled = self.scaler.fit_transform(temps.reshape(-1, 1))
        X, y = [], []
        for i in range(len(scaled) - self.lookback_period):
            X.append(scaled[i:i + self.lookback_period])
            y.append(scaled[i + self.lookback_period])
        return np.array(X), np.array(y)

    def build_model(self, input_shape):
        """Build LSTM model for weather prediction"""
        self.model = Sequential([
            LSTM(50, return_sequences=True, input_shape=input_shape),
            Dropout(0.2),
            LSTM(50, return_sequences=True),
            Dropout(0.2),
            LSTM(50),
            Dropout(0.2),
            Dense(25),
            Dense(1)
        ])
        self.model.compile(optimizer=Adam(learning_rate=0.001), loss='mse')
        return self.model

    def train(self, temps, epochs=50, batch_size=32):
        """Train weather prediction model"""
        X, y = self.prepare_data(temps)
        if self.model is None:
            self.build_model((X.shape[1], 1))
        self.model.fit(X, y, epochs=epochs, batch_size=batch_size, verbose=1)

    def predict(self, recent_temps, days_ahead=5):
        """Predict future temperatures"""
        scaled = self.scaler.transform(recent_temps[-self.lookback_period:].reshape(-1, 1))
        predictions = []
        current_seq = scaled.reshape(1, -1, 1)
        
        for _ in range(days_ahead):
            next_pred = self.model.predict(current_seq, verbose=0)
            predictions.append(next_pred[0, 0])
            current_seq = np.append(current_seq[:, 1:, :], [[[next_pred[0, 0]]]], axis=1)
        
        return self.scaler.inverse_transform(np.array(predictions).reshape(-1, 1)).flatten()

class WeatherAnalytics:
    @staticmethod
    def calculate_aqi(pollutants):
        """Calculate Air Quality Index"""
        pm25 = pollutants.get('pm2_5', 0)
        pm10 = pollutants.get('pm10', 0)
        no2 = pollutants.get('no2', 0)
        
        # Simplified AQI calculation
        if pm25 > 35:
            aqi = 'Poor'
        elif pm25 > 27:
            aqi = 'Moderate'
        elif pm25 > 11:
            aqi = 'Fair'
        else:
            aqi = 'Good'
        return aqi

    @staticmethod
    def analyze_trends(historical_temps):
        """Analyze temperature trends"""
        df = pd.Series(historical_temps)
        return {
            'mean': df.mean(),
            'std': df.std(),
            'min': df.min(),
            'max': df.max(),
            'trend': 'rising' if df.iloc[-1] > df.iloc[0] else 'falling',
        }

    @staticmethod
    def detect_anomalies(temps, threshold=2):
        """Detect temperature anomalies"""
        mean = np.mean(temps)
        std = np.std(temps)
        anomalies = []
        for i, temp in enumerate(temps):
            if abs((temp - mean) / std) > threshold:
                anomalies.append((i, temp))
        return anomalies
