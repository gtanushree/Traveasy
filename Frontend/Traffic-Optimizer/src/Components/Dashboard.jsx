import React from "react";
import { useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ theme }) => {
  const navigate = useNavigate();

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

  const currentColors = colors[theme];

  const options = [
    {
      title: "Smart Parking System",
      description:
        "Find and reserve parking spots in real time, reducing search time and easing congestion.",
      route: "/smart-parking",
      icon: "🚗",
    },
    {
      title: "Mobile Navigation Integration",
      description:
        "Get turn-by-turn navigation with live traffic updates directly on your mobile device.",
      route: "/navigate-me",
      icon: "🗺️",
    },
    {
      title: "Integrated Connectivity for Commuters",
      description:
        "Seamlessly connect various modes of transport to simplify your daily commute.",
      route: "/integrated-connectivity",
      icon: "🚌",
    },
    {
      title: "Carpooling & Ridesharing",
      description:
        "Join or organize carpools to save on travel costs and reduce your carbon footprint.",
      route: "/carpooling",
      icon: "🚘",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: currentColors.background,
        p: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: currentColors.accentGreen,
          fontWeight: "bold",
          mb: 6,
        }}
      >
        Dashboard
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 6,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        {options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(option.route)}
            style={{ cursor: "pointer" }}
          >
            <Card
              sx={{
                backgroundColor: currentColors.cardBackground,
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                p: 3,
                border: `3px solid ${currentColors.cardBorder}`,
                boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                transition: "transform 0.3s ease",
                height: "100%", // Ensuring equal height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h2"
                  sx={{ mb: 2, color: currentColors.accentRed }}
                >
                  {option.icon}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: currentColors.text,
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  {option.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: currentColors.text, fontSize: "1.2rem" }}
                >
                  {option.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;