import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import SearchCity from "./SearchCity";
import WeatherDisplay from "./WeatherDisplay";
import { getWeatherData } from "../api/weatherAPI";
import FavoriteCities from "./FavoriteCities";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCloudSun } from "react-icons/fa";

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [favorites, setFavorites] = useState([]);
  const [previousCity, setPreviousCity] = useState(null);
  const handleGetForecast = async (city) => {
    if (!city) {
      toast.error("No city selected. Please search for a city first.");
      return;
    }
    const weatherData = await getWeatherData(city, unit);
    if (weatherData) {
      setWeather((prev) => ({ ...prev, forecast: weatherData.forecast }));
      toast.success(`5-Day forecast updated for ${city}.`);
    } else {
      toast.error("Failed to fetch forecast data. Please try again.");
    }
  };

  const handleSearch = async (city) => {
    const weatherData = await getWeatherData(city, unit);
    if (weatherData) {
      setWeather(weatherData);

      const savedPreviousCity = localStorage.getItem("previousCity");

      setPreviousCity(savedPreviousCity || null);

      localStorage.setItem("previousCity", city);
    } else {
      toast.error("City not found. Please try again.");
    }
  };

  useEffect(() => {
    const savedPreviousCity = localStorage.getItem("previousCity");
    if (savedPreviousCity) {
      setPreviousCity(savedPreviousCity);
    }
  }, []);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "F" : "C"));
    toast.info(`Switched to ${unit === "C" ? "Fahrenheit" : "Celsius"}`);
  };

  const handleAddFavorite = () => {
    if (weather && !favorites.some((fav) => fav.city === weather.city)) {
      setFavorites([...favorites, weather]);
      toast.success(`${weather.city} added to favorites!`);
    } else {
      toast.error("This city is already in your favorites.");
    }
  };

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((_, index) => index !== id));
    toast.success("City removed from favorites.");
  };

  const handleSearchPreviousCity = () => {
    if (previousCity) {
      handleSearch(previousCity);
    } else {
      toast.error("No previous city found.");
    }
  };

  return (
    <Container className="py-4">
      <ToastContainer />
      <h1 className="text-center mb-4">
        <FaCloudSun className="mr-2" /> Weather App
      </h1>
      <SearchCity onSearch={handleSearch} />

      <div className="text-center my-3">
        <Button className="toggle-btn" onClick={toggleUnit}>
          Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
        </Button>
        <Button
          className="btn-add-fav mx-3"
          onClick={handleAddFavorite}
          disabled={!weather}
        >
          Add to Favorites
        </Button>
      </div>

      {weather && (
        <Row className="mt-4">
          <Col lg={8} className="mx-auto">
            <WeatherDisplay
              weather={weather}
              unit={unit}
              onRemove={() => setWeather(null)}
            />
          </Col>
        </Row>
      )}

      {previousCity && (
        <Row className="mt-4">
          <Col lg={8} className="mx-auto">
            <h4>Previous Search City</h4>
            <div className="d-flex flex-wrap gap-2">
              <Button variant="secondary" onClick={handleSearchPreviousCity}>
                {previousCity}
              </Button>
            </div>
          </Col>
        </Row>
      )}

      <Row className="mt-4">
        <Col lg={8} className="mx-auto">
          <FavoriteCities
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
            onSearchCity={handleSearch}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherDashboard;
