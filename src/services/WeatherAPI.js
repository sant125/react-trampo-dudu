import { BASE_URL, APPID } from '../config/constants';
import { ForecastDay } from '../models/ForecastDay';

export async function getWeatherForecast(city, days) {
  const url = `${BASE_URL}?city=${encodeURIComponent(city)}&days=${days}&APPID=${APPID}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.days || !Array.isArray(data.days)) {
    throw new Error('Invalid response format');
  }

  const forecasts = data.days.map(day =>
    new ForecastDay(
      day.date,
      day.minTempC,
      day.maxTempC,
      day.description,
      day.humidity,
      day.icon
    )
  );

  return {
    city: data.city,
    forecasts: forecasts
  };
}
