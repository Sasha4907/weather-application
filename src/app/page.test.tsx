import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import { fetchWeatherByCity } from '@/services/weather-api';

jest.mock('@/services/weather-api');

describe('Home Page', () => {
  it('should show error message when city is not entered', () => {
    render(<Home />);

    const button = screen.getByText(/Check weather/i);
    fireEvent.click(button);

    const errorMessage = screen.getByText(/Please enter a city./i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display weather data when city is entered', async () => {
    const mockData = {
      name: 'Kyiv',
      main: {
        temp: 14,
      },
      weather: [
        {
          main: 'Clouds',
        },
      ],
    };

    (fetchWeatherByCity as jest.Mock).mockResolvedValue(mockData);

    render(<Home />);

    const input = screen.getByLabelText(/City/i);
    fireEvent.change(input, { target: { value: 'Kyiv' } });

    const button = screen.getByText(/Check weather/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Kyiv/i)).toBeInTheDocument();
      expect(screen.getByText(/Temperature:/i)).toHaveTextContent(/14°C/);
      expect(screen.getByText(/Description:/i)).toHaveTextContent(/Clouds/);
    });
  });
});
