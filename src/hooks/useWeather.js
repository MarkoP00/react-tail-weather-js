import { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForecast,
} from "../services/weatherAPI";

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForecast(city),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch weather data."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError("GeoLocation is not supported by this browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await getCurrentWeatherByCoords(
            latitude,
            longitude
          );

          setCurrentWeather(weatherData);

          const forecastData = await getWeatherForecast(weatherData.name);
          setForecast(forecastData);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to fetch weather data."
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    fetchWeatherByCity(lastSearch ? lastSearch : "Belgrade");
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
  };
};
