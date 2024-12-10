import React, { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchCity = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <Form className="d-flex justify-content-center" onSubmit={handleSearch}>
      <InputGroup className="search-city-input-group">
        <FormControl
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <Button variant="primary" type="submit" className="search-btn">
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchCity;
