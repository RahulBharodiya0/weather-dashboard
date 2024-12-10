import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { WiDaySunny, WiDayCloudy, WiDayRain, WiDaySnow } from "react-icons/wi"; // Use icons for weather

const WeatherDisplay = ({ weather, unit, onRemove }) => {
  if (!weather) {
    return (
      <div className="text-center">
        <h5>Search for a city to see the weather details.</h5>
      </div>
    );
  }

  const getWeatherIcon = (description) => {
    if (description.includes("cloud")) return <WiDayCloudy size={50} />;
    if (description.includes("rain")) return <WiDayRain size={50} />;
    if (description.includes("snow")) return <WiDaySnow size={50} />;
    return <WiDaySunny size={50} />;
  };

  return (
    <div
      className="weather-container"
      style={{
        backgroundColor: "#E3F2FD",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Card
        className="text-center shadow-lg"
        style={{ borderRadius: "10px", marginBottom: "20px", padding: "20px" }}
      >
        <Card.Body>
          <Button
            variant="danger"
            className="m-3"
            onClick={onRemove}
            style={{ backgroundColor: "#FF6F61", borderColor: "#FF6F61" }}
          >
            Remove
          </Button>
          <h3
            className="city-name"
            style={{ fontSize: "2rem", fontWeight: "700" }}
          >
            {weather.city}
          </h3>
          <div
            className="temperature"
            style={{ fontSize: "3rem", fontWeight: "bold", color: "#FF7043" }}
          >
            {unit === "C" ? weather.temp : (weather.temp * 9) / 5 + 32}°{unit}
          </div>
          <div
            className="weather-description"
            style={{ fontSize: "1.25rem", color: "#607D8B" }}
          >
            {weather.description}
          </div>
          <div className="weather-icon" style={{ marginTop: "20px" }}>
            {getWeatherIcon(weather.description)}
          </div>
        </Card.Body>
      </Card>

      <h5
        className="mt-4 text-center"
        style={{ fontSize: "2rem", color: "#42A5F5", fontWeight: "600" }}
      >
        5-day Forecast
      </h5>

      <Row className="justify-content-center">
        {weather.forecast.map((forecast, index) => (
          <Col key={index} sm={2} className="mb-4">
            <Card
              className="forecast-card"
              style={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Body
                className="forecast-body"
                style={{ padding: "15px", textAlign: "center" }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#1976D2",
                  }}
                >
                  {forecast.date}
                </p>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#FF7043",
                  }}
                >
                  {unit === "C" ? forecast.temp : (forecast.temp * 9) / 5 + 32}°
                  {unit}
                </div>
                <p style={{ fontSize: "1rem", color: "#78909C" }}>
                  {forecast.description}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WeatherDisplay;