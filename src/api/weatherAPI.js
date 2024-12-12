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

    const dailyForecasts = [];
    const seenDates = new Set();

    forecast.data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      const time = item.dt_txt.split(" ")[1];
      if (!seenDates.has(date) && time === "12:00:00") {
        seenDates.add(date);
        dailyForecasts.push({
          date,
          temp: item.main.temp,
          description: item.weather[0].description,
          windSpeed: item.wind.speed,
        });
      }
    });

    return {
      city: currentWeather.data.name,
      temp: currentWeather.data.main.temp,
      description: currentWeather.data.weather[0].description,
      windSpeed: currentWeather.data.wind.speed,
      forecast: dailyForecasts.slice(0, 5),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
