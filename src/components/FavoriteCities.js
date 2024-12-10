import React, { useState } from "react";
import {
  Accordion,
  Card,
  Button,
  Row,
  Col,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaTrash, FaCloudSun, FaEdit } from "react-icons/fa";

const FavoriteCities = ({ favorites, onRemoveFavorite, onSearchCity }) => {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
      {favorites.map((fav, index) => (
        <Card key={fav.id} className="mb-4 shadow-lg rounded custom-card">
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header className="bg-gradient text-white">
              <FaCloudSun className="mr-2" />
              {fav.city}
            </Accordion.Header>
            <Accordion.Body className="bg-light p-4">
              <Row>
                <Col
                  md={4}
                  className="d-flex align-items-center justify-content-center"
                >
                  <div className="text-center">
                    <FaCloudSun
                      size={60}
                      color="#ff6f61"
                      className="weather-icon"
                    />
                    <h5 className="mt-3">
                      {fav.temp}°{fav.unit}
                    </h5>
                    <Badge pill bg="info">
                      {fav.description}
                    </Badge>
                  </div>
                </Col>
                <Col md={8}>
                  <h5 className="mt-3 text-dark">5-Day Forecast:</h5>
                  {fav.forecast.map((forecastItem, forecastIndex) => (
                    <Row key={forecastIndex} className="forecast-row mb-3">
                      <Col md={4} className="forecast-date">
                        <strong>{forecastItem.date}</strong>
                      </Col>
                      <Col md={4}>
                        <span className="forecast-temp">
                          {forecastItem.temp}°{fav.unit}
                        </span>
                      </Col>
                      <Col md={4}>
                        <span className="forecast-description">
                          {forecastItem.description}
                        </span>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>

              <div className="mt-4 text-center">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-remove">Remove from Favorites</Tooltip>
                  }
                >
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => onRemoveFavorite(index)}
                    className="mx-2"
                  >
                    <FaTrash className="mx-2" />
                    Remove
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip-edit">View Weather</Tooltip>}
                >
                  <Button
                    variant="info"
                    size="small"
                    className="mx-2"
                    onClick={() => onSearchCity(fav.city)}
                  >
                    <FaEdit className="mx-2" />
                    View Weather
                  </Button>
                </OverlayTrigger>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Card>
      ))}
    </Accordion>
  );
};

export default FavoriteCities;
