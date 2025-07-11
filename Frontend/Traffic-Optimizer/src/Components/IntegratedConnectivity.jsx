import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent, TextField, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const IntegratedConnectivity = ({ theme }) => {
// Color Scheme
const colors = {
  dark: {
    background: "#0a192f",
    accentGreen: "#64ffda",
    accentRed: "#f07178",
    text: "#fff",
    cardBackground: "rgba(255, 255, 255, 0.1)",
    cardBorder: "rgba(100, 255, 218, 0.5)",
    heading: "#64ffda",
  },
  light: {
    background: "#ffffff",
    accentGreen: "#00bcd4",
    accentRed: "#ff5252",
    text: "#333333",
    cardBackground: "rgba(0, 0, 0, 0.1)",
    cardBorder: "rgba(0, 188, 212, 0.5)",
    heading: "#00bcd4",
  },
};

  const currentColors = colors[theme];

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastQuery, setLastQuery] = useState({ origin: "", destination: "" });

  const fetchRoute = async () => {
    if (!origin || !destination) {
      setError("Please enter both origin and destination.");
      return;
    }

    if (lastQuery.origin === origin && lastQuery.destination === destination) {
      return; // Prevent unnecessary re-fetch
    }

    setLoading(true);
    setError("");
    setRoute(null);
    setLastQuery({ origin, destination });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/commuter/get-route?origin=${origin}&destination=${destination}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch route");
      }

      setRoute(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: currentColors.background,
        minHeight: "100vh",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: currentColors.accentGreen,
            fontWeight: "bold",
            mb: 4,
          }}
        >
          Integrated Connectivity for Commuters
        </Typography>
      </motion.div>

      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          backgroundColor: currentColors.cardBackground,
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          p: 3,
          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          border: `2px solid ${currentColors.cardBorder}`,
          mb: 4,
        }}
      >
        <CardContent>
          <Typography variant="body1" sx={{ color: currentColors.text, mb: 2 }}>
            Our platform seamlessly connects various modes of transport—metro, bus, ride-sharing, bicycles, and walking—into one unified system. Plan your journey with integrated schedules, live updates, and shared rides to simplify your daily commute.
          </Typography>

          <TextField
            label="Origin"
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: "#fff", borderRadius: "8px" }}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <TextField
            label="Destination"
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: "#fff", borderRadius: "8px" }}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={fetchRoute}
            sx={{
              background: `linear-gradient(90deg, ${currentColors.accentGreen}, ${currentColors.accentRed})`,
              color: currentColors.background,
              fontWeight: "bold",
              px: 3,
              py: 1,
              borderRadius: "8px",
              "&:hover": {
                background: `linear-gradient(90deg, ${currentColors.accentGreen}, ${currentColors.accentRed})`,
              },
            }}
          >
            Get Route
          </Button>
        </CardContent>
      </Card>

      {loading && <CircularProgress sx={{ color: currentColors.accentGreen, mt: 2 }} />}
      {error && (
        <Typography sx={{ color: currentColors.accentRed, mt: 2 }}>
          {error}
        </Typography>
      )}

      {route && (
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            backgroundColor: currentColors.cardBackground,
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            border: `2px solid ${currentColors.cardBorder}`,
            mt: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ color: currentColors.text, mb: 2 }}>
              Suggested Route:
            </Typography>
            <Typography variant="body1" sx={{ color: currentColors.text }}>
              <strong style={{ color: currentColors.heading }}>Route:</strong> {route.Route.join(" → ")}
            </Typography>
            <Typography variant="body1" sx={{ color: currentColors.text }}>
              <strong style={{ color: currentColors.heading }}>Transport Modes:</strong> {route["Transport Modes"].join(", ")}
            </Typography>
            <Typography variant="body1" sx={{ color: currentColors.text }}>
              <strong style={{ color: currentColors.heading }}>Mode Changes:</strong> {route["Mode Changes"].length > 0 ? route["Mode Changes"].join(", ") : "No mode changes required"}
            </Typography>
            <Typography variant="body1" sx={{ color: currentColors.text }}>
              <strong style={{ color: currentColors.heading }}>Total Distance:</strong> {route["Total Distance"].toFixed(2)} km
            </Typography>
            <Typography variant="body1" sx={{ color: currentColors.text }}>
              <strong style={{ color: currentColors.heading }}>Total Fare:</strong> ₹{route["Total Fare"].toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ color: currentColors.text }}>
              <strong style={{ color: currentColors.heading }}>Total Time:</strong> {route["Total Time"].toFixed(2)} minutes
            </Typography>
          </CardContent>
        </Card>
      )}

      <Box sx={{ maxWidth: 600, width: "100%", mt: 2 }}>
        <Typography variant="h6" sx={{ color: currentColors.text }}>
          Experience a unified travel solution that links your metro, bus, bike, and ride-sharing options—all designed to make your commute more efficient and enjoyable.
        </Typography>
      </Box>
    </Box>
  );
};

export default IntegratedConnectivity;
