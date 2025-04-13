import { AcUnit, Whatshot } from '@mui/icons-material';
import styles from './styles.module.scss';

const getTemperatureIcon = (temperature: number) => {
  if (temperature > 20) {
    return <Whatshot fontSize="medium" className={styles.hot}/>;
  } else if (temperature < 0) {
    return <AcUnit fontSize="medium" className={styles.cold}/>;
  }
};

export { getTemperatureIcon };
