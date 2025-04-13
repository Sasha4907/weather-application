import { AcUnit, Cloud, CloudySnowing, Grain, Thunderstorm, WbSunny } from "@mui/icons-material";

const getWeatherIcon = (weather: string) => {
  switch (weather.toLowerCase()) {
    case 'clear':
      return <WbSunny color="primary" fontSize="large" />;
    case 'clouds':
      return <Cloud color="primary" fontSize="large" />;
    case 'thunderstorm':
      return <Thunderstorm color="primary" fontSize="large" />;
    case 'snow':
      return <AcUnit color="primary" fontSize="large" />;
    case 'rain':
      return <CloudySnowing color="primary" fontSize="large" />;
    case 'drizzle':
      return <Grain color="primary" fontSize="large" />;
    default:
      return <Cloud color="primary" fontSize="large" />;
  }
};

export { getWeatherIcon };
