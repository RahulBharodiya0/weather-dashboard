import axios from "axios";

export const getWeatherData = async (city, unit) => {
  const API_KEY = process.env.REACT_APP_Weather_App_Key;
  const units = unit === "C" ? "metric" : "imperial";
  try {
    const currentWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
    );
    const forecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`
    );

    return {
      city: currentWeather.data.name,
      temp: currentWeather.data.main.temp,
      description: currentWeather.data.weather[0].description,
      forecast: forecast.data.list.slice(0, 5).map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
        description: item.weather[0].description,
      })),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
