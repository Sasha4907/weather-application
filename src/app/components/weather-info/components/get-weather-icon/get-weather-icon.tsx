import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrainIcon from '@mui/icons-material/Grain';
import CloudySnowingIcon from '@mui/icons-material/CloudySnowing';

const getWeatherIcon = (weather: string) => {
  switch (weather.toLowerCase()) {
    case 'clear':
      return <WbSunnyIcon color="primary" fontSize="large" />;
    case 'clouds':
      return <CloudIcon color="primary" fontSize="large" />;
    case 'thunderstorm':
      return <ThunderstormIcon color="primary" fontSize="large" />;
    case 'snow':
      return <AcUnitIcon color="primary" fontSize="large" />;
    case 'rain':
      return <CloudySnowingIcon color="primary" fontSize="large" />;
    case 'drizzle':
      return <GrainIcon color="primary" fontSize="large" />;
    default:
      return <CloudIcon color="primary" fontSize="large" />;
  }
};

export { getWeatherIcon };
