import React, { useEffect, useState } from "react";
import { Button, Container, Card, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

function LocationMarker({ searchLocation }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
        map.setView([latitude, longitude], 13);
      },
      () => {
        setPosition([17.385044, 78.486671]); // Default location
        map.setView([17.385044, 78.486671], 13);
      }
    );
  }, [map]);

  useEffect(() => {
    if (searchLocation) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
            map.setView([parseFloat(lat), parseFloat(lon)], 13);
          }
        });
    }
  }, [searchLocation, map]);

  return position ? (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  ) : null;
}

function Home({ theme }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      setSearchLocation(searchQuery);
    }
  };

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const colors = {
    dark: {
      background: "#16213e",
      accentGreen: "#64ffda",
      accentRed: "#f07178",
      text: "#ccd6f6",
      cardBackground: "rgba(255, 255, 255, 0.1)",
      cardBorder: "rgba(100, 255, 218, 0.5)",
      placeholderText: "#ffffff",
      buttonText: "#000000"
    },
    light: {
      background: "#f8f9fa",
      accentGreen: "#00796b",
      accentRed: "#d32f2f",
      text: "#212121",
      cardbackground: "#ffffff",
      cardBorder: "rgba(0, 121, 107, 0.5)",
      placeholderText: "#6c757d",
      buttonText: "#ffffff"
    },
  };
  const features = [
    {
      title: "Real-Time Traffic",
      description: "Get up-to-the-minute traffic updates to navigate congestion and avoid delays.",
    },
    {
      title: "Smart Routing",
      description: "AI-powered route optimization ensures the fastest and most efficient travel paths.",
    },
    {
      title: "Parking Assistance",
      description: "Locate nearby parking spaces in real-time, reducing the hassle of searching.",
    },
    {
      title: "Public Transit",
      description: "Access schedules and optimize your journey with real-time public transport insights.",
    },
  ];

  const themeColors = theme === "dark" ? colors.dark : colors.light;

  return (
    <div style={{ backgroundColor: themeColors.background, minHeight: "100vh", padding: "2rem 0" }}>
      <Container>
        <motion.div className="text-center mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 style={{ color: themeColors.accentGreen }}>Smart Traffic Management System</h1>
          <p style={{ color: themeColors.text }}>Optimize urban mobility with real-time traffic insights and AI-powered routing</p>
        </motion.div>

        <Form className="mb-4 mx-auto" style={{ maxWidth: "600px" }}>
          <div className="input-group">
            <Form.Control
              type="search"
              placeholder="Search location..."
              className="form-control-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ backgroundColor: themeColors.cardBackground, borderColor: themeColors.accentGreen, color: themeColors.text }}
            />
            <style>
              {`
                ::placeholder {
                  color: ${themeColors.placeholderText} !important;
                  opacity: 1;
                }
              `}
            </style>
            <Button style={{ backgroundColor: themeColors.accentGreen, borderColor: themeColors.accentGreen, color: themeColors.buttonText }} onClick={handleSearch}>Search</Button>
          </div>
        </Form>

        <Card className="mb-4 border-0" style={{ backgroundColor: themeColors.cardBackground, borderRadius: "12px" }}>
          <Card.Body className="p-3">
            <MapContainer center={[17.385044, 78.486671]} zoom={13} style={{ height: "400px", borderRadius: "12px" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker searchLocation={searchLocation} />
            </MapContainer>
          </Card.Body>
        </Card>

        <div className="row g-4 mb-4">
          {["Real-Time Traffic", "Smart Routing", "Parking Assistance", "Public Transit"].map((title, i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <motion.div whileHover={{ y: -5 }} className="p-4 rounded-lg text-center" style={{ backgroundColor: themeColors.cardBackground, borderRadius: "12px" }}>
                <h5 style={{ color: themeColors.accentGreen }}>{title}</h5>
                <p style={{ color: themeColors.text }}>{features[i].description}</p>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" style={{ backgroundColor: themeColors.accentGreen, borderColor: themeColors.accentGreen, color: themeColors.buttonText }} onClick={handleGetStarted}>Get Started</Button>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
