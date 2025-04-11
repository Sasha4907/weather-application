import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherResponse {
    name: string;
    main: {
      temp: number;
    };
    weather: {
      main: string;
    }[];
  }
  
  interface WeatherError {
    error: string;
  }

  type WeatherResult = WeatherResponse | WeatherError;

const fetchWeatherByCity = async (city: string): Promise<WeatherResult> => {
    try {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'en',
    },
  });

  return response.data;
} catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return { error: 'City not found. Please check the name.' };
      } else if (error.response) {
        return { error: `Server error: ${error.response.status}` };
      } else if (error.request) {
        return { error: 'No response from the server. Please check your internet connection.' };
      } else {
        return { error: 'Unexpected error occurred while making the request.' };
      }
    } else {
      return { error: 'An unknown error occurred.' };
    }
  }
};

export { fetchWeatherByCity };
