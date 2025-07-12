const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

// Endpoint to fetch traffic heatmap data
router.get('/heatmap', (req, res) => {
  const pythonProcess = spawn('python3', ['scripts/process_gps_data.py']);

  let output = '';
  let errorOutput = '';

  pythonProcess.stdout.on('data', (data) => (output += data.toString()));
  pythonProcess.stderr.on('data', (data) => (errorOutput += data.toString()));

  pythonProcess.on('close', (code) => {
    if (code !== 0 || errorOutput) {
      return res.status(500).json({ error: 'Failed to generate heatmap', details: errorOutput });
    }

    try {
      const heatmapData = JSON.parse(output);
      res.json(heatmapData);
    } catch (e) {
      res.status(500).json({ error: 'Failed to parse heatmap data' });
    }
  });
});

module.exports = router;