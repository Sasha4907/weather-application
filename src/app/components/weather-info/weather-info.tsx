import React from 'react';
import { Box, Typography } from '@mui/material';
import { getWeatherIcon } from './components/get-weather-icon/get-weather-icon';
import styles from './styles.module.scss';
import { WeatherData } from '@/share/interface/weather-data.interface';
import { getTemperatureIcon } from './components/get-temperature-icon/get-temperature-icon';

const WeatherInfo: React.FC<WeatherData> = ({ city, temperature, description, timestamp }) => {
  const lastUpdated = new Date(timestamp).toLocaleString();

  return (
    <Box className={styles.weatherInfo}>
      <Typography variant="h5">{city}</Typography>
      <Box className={styles.infoContainer}>
        <Typography variant="h6" className={styles.temperature}>Temperature: {temperature.toFixed()}°C {getTemperatureIcon(temperature)}</Typography>
        <Typography variant="h6">Description: {description}</Typography>
        <Typography variant="body1">Last updated: {lastUpdated}</Typography>
      </Box>
      <Box className={styles.iconContainer}>{getWeatherIcon(description)}</Box>
    </Box>
  );
};

export { WeatherInfo };
