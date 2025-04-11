'use client';

import { Box, CircularProgress, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchWeatherByCity } from '@/services/weather-api';
import styles from './styles.module.scss';
import { WeatherInfo } from './components/weather-info/weather-info';
import { WeatherBackground } from './components/weather-background/weather-background';
import { WeatherData } from '@/share/interface/weather-data.interface';
import { WeatherForm } from './components/weather-form/weather-form';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [showInput, setShowInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedWeatherData = JSON.parse(localStorage.getItem('weatherData') || 'null');
    if (storedWeatherData) {
      const now = new Date();
      const cachedTime = new Date(storedWeatherData.timestamp);

      if (now.getTime() - cachedTime.getTime() < 5 * 60 * 1000) {
        setWeatherData(storedWeatherData);
        setShowInput(false);
      } else {
        localStorage.removeItem('weatherData');
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCity(city.trim());

      if ('error' in data) {
        setError(data.error);
        return;
      }

      const weatherInfo = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].main,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem('weatherData', JSON.stringify(weatherInfo));
      setWeatherData(weatherInfo);
      setShowInput(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to load weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress color="inherit" size={16} />
      ) : (
        <>
          <WeatherBackground description={weatherData?.description || ''} />
          <Box className={styles.page}>
          <WeatherForm
                city={city}
                error={error}
                showInput={showInput}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />

            {weatherData && (
              <WeatherInfo
                city={weatherData.city}
                temperature={weatherData.temperature}
                description={weatherData.description}
                timestamp={weatherData.timestamp}
              />
            )}
          </Box>
        </>
      )}
    </Container>
  );
}
