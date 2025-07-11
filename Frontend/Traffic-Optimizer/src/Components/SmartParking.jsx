import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";

const SmartParking = ({ theme }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [parkingSlots, setParkingSlots] = useState([]); // ✅ Ensure it's an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define your color scheme for light and dark themes
  const colors = {
    dark: {
      background: "#16213e",
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

  // Get the current theme colors
  const currentColors = colors[theme];

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setParkingSlots([]); // ✅ Reset previous search results

    try {
      let queryParams = new URLSearchParams();

      if (searchQuery.trim()) {
        // ✅ Check if input is coordinates (lat,lon) or a location name
        const coords = searchQuery.split(",").map((val) => val.trim());
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
          queryParams.append("lat", parseFloat(coords[0]));
          queryParams.append("lon", parseFloat(coords[1]));
        } else {
          queryParams.append("location", searchQuery);
        }
      } else {
        // ✅ Get user's current geolocation if searchQuery is empty
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        queryParams.append("lat", position.coords.latitude);
        queryParams.append("lon", position.coords.longitude);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/parking/available?${queryParams}`
      );

      if (!response.ok) throw new Error("Failed to fetch parking slots.");

      const data = await response.json();

      // ✅ Fix incorrect response handling
      if (Array.isArray(data)) {
        setParkingSlots(data);
      } else {
        setError("No parking data available.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch parking slots.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: currentColors.background,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: currentColors.accentGreen,
          mb: 4,
          fontWeight: "bold",
        }}
      >
        Smart Parking System
      </Typography>
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          backgroundColor: currentColors.cardBackground,
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          p: 3,
          mb: 4,
          border: `2px solid ${currentColors.cardBorder}`,
        }}
      >
        <CardContent>
          <Typography variant="body1" sx={{ color: currentColors.text, mb: 2 }}>
            Enter your location or leave it empty to use your current location.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              variant="filled"
              label="Location"
              value={searchQuery}
              placeholder="current location"
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: currentColors.cardBackground,
                  color: currentColors.text,
                },
              }}
              InputLabelProps={{ style: { color: currentColors.text } }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: currentColors.accentGreen,
                color: currentColors.background,
                fontWeight: "bold",
                px: 3,
                borderRadius: "8px",
              }}
              disabled={loading}
            >
              {loading ? "Searching..." : "Find Parking"}
            </Button>
          </Box>
          {error && (
            <Typography
              variant="body2"
              sx={{ color: currentColors.accentRed, mt: 2 }}
            >
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Box sx={{ width: "100%", maxWidth: 600 }}>
        {loading ? (
          <Typography variant="body1" sx={{ color: currentColors.text }}>
            Searching for available parking slots...
          </Typography>
        ) : parkingSlots.length > 0 ? (
          parkingSlots.map((slot, index) => (
            <Card
              key={slot.id || `${slot.name}-${index}`} // ✅ Use unique key
              sx={{
                mb: 2,
                backgroundColor: currentColors.cardBackground,
                backdropFilter: "blur(6px)",
                borderRadius: "8px",
                p: 2,
                border: `1px solid ${currentColors.cardBorder}`,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: currentColors.text }}>
                  {slot.name}
                </Typography>
                <Typography variant="body2" sx={{ color: currentColors.text }}>
                  Location: {slot.area}
                </Typography>
                <Typography variant="body2" sx={{ color: currentColors.text }}>
                  Available Slots: {slot.available_slots} / {slot.total_slots}
                </Typography>
                <Typography variant="body2" sx={{ color: currentColors.text }}>
                  Hourly Rate: ₹{slot.hourly_rate}
                </Typography>
                <Typography variant="body2" sx={{ color: currentColors.text }}>
                  Security: {slot.security ? "Yes" : "No"}
                </Typography>
                <Typography variant="body2" sx={{ color: currentColors.text }}>
                  Valet Parking: {slot.valet_parking ? "Yes" : "No"}
                </Typography>
                <Typography variant="body2" sx={{ color: currentColors.text }}>
                  EV Charging: {slot.ev_charging ? "Yes" : "No"}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: currentColors.text }}>
            No available parking slots found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SmartParking;
