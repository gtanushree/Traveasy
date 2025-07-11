# Hackofiesta6.0
## * Traveasy

Traveasy is a next-generation traffic management and routing prototype that leverages real-time GPS data, historical traffic information, and predictive analytics to deliver dynamic routing, congestion heatmaps, and alternate route suggestions. Built during Hacko Fiesta, this project demonstrates a modern, responsive user interface.....

## Table of Contents

- [Features](#features)
- [Architecture & Implementation](#architecture--implementation)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [How to Use](#how-to-use)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Acknowledgements](#acknowledgements)

## Features

- **Real-Time Traffic Analysis:**  
  Aggregates and displays live traffic data from vehicles to assess congestion and vehicle density.
  
- **Dynamic Congestion Heatmaps:**  
  Visualizes real-time and historical traffic density as heatmaps to highlight congestion hotspots.
  
- **Alternate Routing:**  
  Provides optimal route calculations based on current congestion, helping users avoid bottlenecks.
  
- **Responsive and Modern UI:**  
  Features a glassmorphic interface with smooth animations and responsive design that works well on mobile and desktop devices.
  
- **Interactive Mapping:**  
  Uses React-Leaflet to display maps with route overlays, custom markers, and detailed congestion analysis.
  
- **Data Visualizations:**  
  Integrates charts (via Chart.js) for historical traffic flow analysis, displaying trends and vehicle counts.

## Architecture & Implementation

### Frontend
- **React & React Router:**  
  The UI is built in React with multiple pages (Home, Dashboard, Traffic Analysis, Route Optimization, Carpooling, AI Predictions) managed by React Router.
- **UI Libraries & Styling:**  
  Uses React-Bootstrap, Material UI, Tailwind CSS, and Framer Motion for a visually appealing and interactive user experience.
- **Mapping:**  
  The interactive map is implemented with React-Leaflet, displaying real-time routes and congestion heatmaps.

### Backend
- **Express.js & Node.js:**  
  The backend server, built on Express, handles API endpoints (traffic data retrieval, route calculation, predictions) and real-time communication via Socket.IO.
- **Python Integration:**  
  A Python script (`route_calculator.py`) calculates routes between start and destination points by querying external services (e.g., OSRM) and returns JSON-formatted route data.
- **WebSockets:**  
  Real-time traffic updates are pushed from the backend to the frontend using Socket.IO.

### Data Processing & Analytics
- **Traffic Data Aggregation:**  
  Data is aggregated from various sources (e.g., vehicle GPS, sensors) and processed to generate congestion metrics.
- **Predictive Analytics:**  
  Future traffic conditions are forecasted based on historical data and current trends (with room for future AI/ML enhancements).
- **Heatmap Generation:**  
  Clustering algorithms (e.g., DBSCAN) can be used to generate congestion heatmaps that visually represent traffic density.

## Technology Stack

- **Frontend:**  
  - React, React Router, React-Bootstrap, Material UI, Tailwind CSS, Framer Motion  
  - React-Leaflet, Chart.js (via react-chartjs-2)
- **Backend:**  
  - Node.js, Express.js, Socket.IO, Child Process (`spawn`) for Python integration  
  - Python (for route calculations with OSRM and geocoding)
- **Mapping Data:**  
  - OpenStreetMap (Nominatim, tile layers)

## Folder Structure
```bash
backend/ 
│ 
├── server.js                # Node.js server
├── routes/                  # API endpoints
│   ├── traffic.js
│   └── routing.js
├── scripts/                 # Python scripts
│   ├── process_gps_data.py
│   └── calculate_route.py
├── utils/                   # Utility functions
│   └── geoutils.js
├── data/                    # Store traffic data
│   └── traffic_data.json
├── package.json             # Node.js dependencies
└── requirements.txt         # Python dependencies
```

```bash
frontend/
│
├── public/
│   ├── index.html             # Main HTML file
│
├── src/
│   └── assets/                # Static assets folder
│   |    ├── images/            # Images, icons, etc.
│   |    │   └── marker-icon.png
│   |    └── styles/            # Custom stylesheets, fonts, etc.
│   |        └── custom.css
│   ├── Components/            # Reusable React components
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TrafficAnalysis.jsx
│   │   ├── SmartParking.jsx
│   │   ├── CarPooling.jsx
│   │   ├── AiPredictions.jsx
|   |   └── NotFound.jsx     # Additional pages (e.g., NotFound.jsx)              
│   │
│   │
│   ├── App.jsx                # Main application with routing
│   └── index.js               # Entry point for the React app
│
├── package.json               # Frontend dependencies
└── README.md                  # Frontend documentation

```
## How to Use

1. **Navigation:**  
   - Use the header links to move between pages: Home, Dashboard, Traffic Analysis, Route Optimization, Carpooling, and AI Predictions.
2. **Route Planning:**  
   - On the Traffic Analysis page, enter a start location and destination.  
   - The backend calculates the optimal route and returns the path along with markers for start and destination.  
   - The map updates to display the route, and real-time congestion data is overlaid on the map.
3. **Real-Time Traffic Updates:**  
   - Traffic data updates in real time via WebSockets, refreshing the congestion metrics and vehicle counts.
4. **Data Visualizations:**  
   - Historical traffic data and congestion trends are visualized using interactive charts.

## Setup & Installation

### Prerequisites
- **Node.js and npm:** Make sure you have Node.js installed.
- **Python 3:** Required to run `route_calculator.py` (install packages like `requests` using pip).

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
    cd frontend
    npm install --legacy-peer-deps
    npm run dev
    ```
2. Navigate to the backend directory:
    ```bash
    cd backend
    npm install --legacy-peer-deps
    npm start
    ```
