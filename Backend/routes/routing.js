const express = require('express');
const { spawn } = require('child_process');
const axios = require('axios');
const router = express.Router();

// Function to geocode a location name into coordinates
const geocodeLocation = async (location) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: location,
        format: 'json',
        limit: 1,
      },
      headers: {
        'User-Agent': 'SmartTrafficAI/1.0',
      },
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Geocoding error:', error.message);
    throw new Error('Failed to geocode location');
  }
};

// Endpoint to calculate a route
router.post('/calculate-route', async (req, res) => {
  const { start, destination } = req.body;

  if (!start || !destination) {
    return res.status(400).json({ error: 'Missing start or destination coordinates' });
  }

  try {
    // Parse or geocode start coordinates
    let startCoords;
    if (typeof start === 'string') {
      startCoords = await geocodeLocation(start);
    } else if (start.lat && start.lon) {
      startCoords = { lat: parseFloat(start.lat), lon: parseFloat(start.lon) };
    } else {
      throw new Error('Invalid start format');
    }

    // Parse or geocode destination coordinates
    let destinationCoords;
    if (typeof destination === 'string') {
      destinationCoords = await geocodeLocation(destination);
    } else if (destination.lat && destination.lon) {
      destinationCoords = { lat: parseFloat(destination.lat), lon: parseFloat(destination.lon) };
    } else {
      throw new Error('Invalid destination format');
    }

    // Call the Python script with coordinates
    const pythonProcess = spawn('python3', [
        "./scripts/calculate_route.py", // Relative path
      startCoords.lat,
      startCoords.lon,
      destinationCoords.lat,
      destinationCoords.lon,
    ]);

    let output='';
    let errorOutput='';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0 || errorOutput) {
        return res.status(500).json({ error: 'Failed to calculate route', details: errorOutput });
      }

      try {
        const routeData = JSON.parse(output);
        res.json(routeData);
      } catch (e) {
        console.error('JSON parse error:', e);
        res.status(500).json({ error: 'Failed to parse route data' });
      }
    });
  } catch (error) {
    console.error('Route calculation error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;