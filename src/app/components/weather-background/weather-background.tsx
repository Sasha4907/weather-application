'use client';

import { JSX, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import {
  AcUnit as SnowIcon,
  WaterDrop as RainIcon,
  Cloud as CloudIcon,
  Sunny as SunnyIcon,
  Bolt as BoltIcon,
} from '@mui/icons-material';

interface WeatherBackgroundProps {
  description: 'rain' | 'snow' | 'clouds' | 'clear' | 'thunderstorm' | string;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ description }) => {
  const [icons, setIcons] = useState<JSX.Element[]>([]);
  const weatherType = description.toLowerCase();
  const ICON_COUNT = 40;
  const CLOUD_COUNT = 20;

  useEffect(() => {
    const generateIcons = () => {
      const generatedIcons = Array.from({ length: ICON_COUNT }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 10}s`,
        };

        if (weatherType === 'snow') {
          return <SnowIcon key={i} className={styles.snowflake} style={style} />;
        } else if (weatherType === 'rain') {
          return <RainIcon key={i} className={styles.raindrop} style={style} />;
        } else if (weatherType === 'clouds') {
          return <BoltIcon key={i} className={styles.bolt} style={style} fontSize="large" />
        } else if (weatherType === 'clouds') {
          if (i < CLOUD_COUNT) {
            const cloudStyle = {
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${5 + Math.random() * 50}s`,
              width: '140px',
              height: 'auto',
            };
            return <CloudIcon key={i} className={styles.clouds} style={cloudStyle} />;
          }
          return null;
        }

        return null;
      });

      setIcons(generatedIcons.filter(Boolean) as JSX.Element[]);
    };

    generateIcons();
  }, [weatherType]);

  return (
    <div className={styles.background}>
      {weatherType === 'clear' && (
        <div className={styles.sun}>
          <SunnyIcon />
        </div>
      )}
      {icons}
    </div>
  );
};

export { WeatherBackground };
