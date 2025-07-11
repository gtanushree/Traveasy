import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import TrafficAnalysis from './Components/checkRoute';
import CarPooling from './Components/CarPooling';
import AiPredictions from './Components/AiPredictions';
import NavigateMe from './Components/NavigateMe';
import NotFound from './Components/NotFound';
import SmartParking from './Components/SmartParking';
import IntegratedConnectivity from './Components/IntegratedConnectivity';

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      return newTheme;
    });
  };

  return (
    <Router>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route
          path="/dashboard"
          element={<Dashboard key={theme} theme={theme} />}
        />
        <Route path="/check-route" element={<TrafficAnalysis theme={theme} />} />
        <Route path="/carpooling" element={<CarPooling theme={theme} />} />
        <Route path="/ai-predictions" element={<AiPredictions theme={theme} />} />
        <Route path="*" element={<NotFound theme={theme} />} />
        <Route path="/navigate-me" element={<NavigateMe theme={theme} />} />
        <Route path="/smart-parking" element={<SmartParking theme={theme} />} />
        <Route path="/integrated-connectivity" element={<IntegratedConnectivity theme={theme} />} />
      </Routes>
    </Router>
  );
}

export default App;