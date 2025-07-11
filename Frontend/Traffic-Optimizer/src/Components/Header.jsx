import React from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Form,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const themeColors = {
  dark: {
    background: "#112240",
    accentGreen: "#64ffda",
    accentRed: "#f07178",
    text: "#ccd6f6",
    cardBackground: "rgba(255, 255, 255, 0.1)",
    cardBorder: "rgba(100, 255, 218, 0.5)",
    placeholder: "#ffffff !important",
  },
  light: {
    background: "#ffffff",
    accentGreen: "#00bcd4",
    accentRed: "#ff5252",
    text: "#333333",
    cardBackground: "rgba(0, 0, 0, 0.1)",
    cardBorder: "rgba(0, 188, 212, 0.5)",
    placeholder: "#757575 !important",
  },
};

function Header({ theme, toggleTheme }) {
  const colors = themeColors[theme];

  return (
    <div
      className="w-full mx-auto relative"
      style={{ backgroundColor: colors.background, zIndex: 1000 }}
    >
      <Navbar
        expand="lg"
        className="backdrop-blur-3xl border shadow-lg rounded-3xl transition-all duration-300"
        style={{ borderColor: colors.cardBorder }}
      >
        <Container fluid>
          <motion.div
            whileHover={{ scale: 1.05, rotateZ: -2 }}
            className="flex items-center"
          >
            <Navbar.Brand
              as={Link}
              to="/"
              className="text-3xl font-bold bg-clip-text"
              style={{ color: colors.accentGreen }}
            >
              Traveasy
            </Navbar.Brand>
          </motion.div>

          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{ filter: theme === "dark" ? "invert(1)" : "invert(0)" }}
          />

          <Navbar.Collapse id="navbarScroll" className="py-4 lg:py-0">
            <Nav className="me-auto my-2 my-lg-0 gap-3" navbarScroll>
              {[{ path: "/", label: "Home" }, { path: "/dashboard", label: "Dashboard" }].map(
                (item) => (
                  <motion.div key={item.path} whileHover={{ scale: 1.05 }}>
                    <Nav.Link
                      as={Link}
                      to={item.path}
                      style={{ color: colors.text }}
                      className="px-4 py-2 rounded-xl transition-all"
                    >
                      {item.label}
                    </Nav.Link>
                  </motion.div>
                )
              )}

              <motion.div whileHover={{ scale: 1.05 }} style={{ position: "relative", zIndex: 1001 }}>
                <NavDropdown
                  title={<span style={{ color: colors.text }}>Solutions</span>}
                  id="navbarScrollingDropdown"
                  style={{ zIndex: 1001 }}
                >
                  <div
                    style={{
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.cardBorder,
                      zIndex: 1001,
                    }}
                    className="backdrop-blur-3xl border rounded-xl p-2 shadow-xl"
                  >
                    {[
                      { path: "/check-route", label: "Check Route" },
                      { path: "/ai-predictions", label: "🤖 AI Predictions" },
                      { path: "/carpooling", label: "🗺️ Car Pooling" },
                      { path: "/navigate-me", label: "🧑‍🧭 Navigate Me" },
                    ].map((item) => (
                      <NavDropdown.Item
                        key={item.path}
                        as={Link}
                        to={item.path}
                        style={{ color: colors.text }}
                        className="rounded-lg p-3 transition-all group"
                      >
                        <span className="group-hover:translate-x-2 transition-transform">
                          {item.label}
                        </span>
                      </NavDropdown.Item>
                    ))}
                  </div>
                </NavDropdown>
              </motion.div>
            </Nav>

            <Form className="d-flex gap-3">
              <Form.Control
                type="search"
                placeholder="Search city..."
                style={{
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.cardBorder,
                  color: colors.text,
                  "::placeholder": { color: colors.placeholder },
                }}
                className="me-2 focus:ring-2 focus:ring-cyan-300 focus:border-transparent placeholder-white !important"
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline-light"
                  style={{
                    backgroundColor: colors.accentGreen,
                    color: colors.background,
                  }}
                  className="px-6 py-2 rounded-xl transition-all"
                >
                  Search
                </Button>
              </motion.div>
            </Form>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3"
            >
              <Button
                onClick={toggleTheme}
                style={{
                  backgroundColor: colors.accentRed,
                  color: colors.background,
                }}
                className="px-6 py-2 rounded-xl transition-all"
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </Button>
            </motion.div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
