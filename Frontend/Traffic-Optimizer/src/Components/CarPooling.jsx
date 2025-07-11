'use client';

import React, { useState } from "react";
import { Typography, Box, Button, TextField, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const colors = {
  dark: {
    background: "#112240",
    accentGreen: "#64ffda",
    accentRed: "#f07178",
    text: "#ccd6f6",
    cardBackground: "rgba(255, 255, 255, 0.1)",
    cardBorder: "rgba(100, 255, 218, 0.5)",
  },
  light: {
    background: "#ffffff",
    accentGreen: "#00bcd4",
    accentRed: "#ff5252",
    text: "#333333",
    cardBackground: "rgba(0, 0, 0, 0.1)",
    cardBorder: "rgba(0, 188, 212, 0.5)",
  },
};

const GlassmorphicCard = ({ children, theme }) => {
  const currentColors = colors[theme];
  return (
    <Box
      sx={{
        maxWidth: "800px",
        width: "100%",
        background: currentColors.cardBackground,
        borderRadius: "16px",
        padding: "2rem",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
        border: `2px solid ${currentColors.cardBorder}`,
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  );
};

const Carpooling = ({ theme }) => {
  const currentColors = colors[theme];
  const [location, setLocation] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setRides([]);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/carpooling/rides?location=${encodeURIComponent(location)}&organization=${encodeURIComponent(organization)}`
      );
      const data = await response.json();
      if (response.ok) {
        setRides(data);
      } else {
        setError(data.error || "Failed to fetch rides");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: currentColors.background,
        padding: { xs: "1rem", sm: "2rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <Typography variant="h3" align="center" sx={{ color: currentColors.accentGreen, mb: 3, fontWeight: "bold" }}>
          Carpooling
        </Typography>
      </motion.div>

      <GlassmorphicCard theme={theme}>
        <Typography variant="body1" sx={{ color: currentColors.text, mb: 2 }}>
          Find a carpool by entering your location and organization.
        </Typography>
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: "white", borderRadius: "4px" }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Organization"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: "white", borderRadius: "4px" }}
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            background: `linear-gradient(90deg, ${currentColors.accentGreen}, ${currentColors.accentRed})`,
            color: currentColors.background,
            fontWeight: "bold",
            paddingX: "2rem",
            paddingY: "1rem",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": {
              transform: "scale(1.05)",
              transition: "transform 0.2s ease-in-out",
            },
          }}
          onClick={handleSearch}
        >
          {loading ? <CircularProgress size={24} sx={{ color: currentColors.background }} /> : "Find Rides"}
        </Button>
      </GlassmorphicCard>

      {error && (
        <Typography variant="body2" sx={{ color: "red", mt: 2 }}>
          {error}
        </Typography>
      )}

      {rides.length > 0 && (
        <GlassmorphicCard theme={theme}>
          <Typography variant="h5" sx={{ color: currentColors.accentGreen, mb: 2 }}>
            Available Rides
          </Typography>
          {rides.map((ride, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, borderRadius: "8px", backgroundColor: currentColors.cardBackground }}>
              <Typography variant="body1" sx={{ color: currentColors.text }}>
                <strong>Pickup:</strong> {ride.pickup_location}
              </Typography>
              <Typography variant="body1" sx={{ color: currentColors.text }}>
                <strong>Destination:</strong> {ride.destination}
              </Typography>
              <Typography variant="body1" sx={{ color: currentColors.text }}>
                <strong>Driver:</strong> {ride.driver}
              </Typography>
            </Box>
          ))}
        </GlassmorphicCard>
      )}
    </Box>
  );
};

export default Carpooling;
