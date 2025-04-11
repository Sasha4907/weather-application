import React from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface WeatherFormProps {
  city: string;
  error: string | null;
  showInput: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ city, error, showInput, handleChange, handleSubmit }) => {
  return (
    <Box className={clsx(styles.card, showInput ? styles.bigCard : styles.smallCard)}>
      <Typography variant={showInput ? 'h4' : 'h6'}>City name</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <TextField size="small" label="City" type="text" value={city} onChange={handleChange} fullWidth required />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Check weather
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Box>
  );
};

export { WeatherForm };
