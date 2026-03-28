# 🍍 Bukidnon Pineapple GIS

A modern, web-based Geographic Information System (GIS) for visualizing and managing pineapple farms in Bukidnon, Philippines. Built as a frontend-only MVP with React, Leaflet, and OpenStreetMap.

## 🌟 Features

### Core Functionality
- **Interactive Map**: Centered on Bukidnon with full zoom and pan controls
- **Farm Markers**: Color-coded by status (Active/Harvesting/Idle) using Leaflet
- **Farm Details**: Click any marker to view comprehensive farm information
- **Real-time Filtering**: Filter farms by status with single-click buttons
- **Add Farms**: Click the FAB button, then click the map to add new farms
- **🎨 Draw Farm Boundaries**: Create polygon and rectangle boundaries using Leaflet Draw
- **📊 Boundary Statistics**: View area, coordinates, and creation date for boundaries
- **Local Persistence**: All data saved to localStorage automatically
- **Legend & Controls**: Clean GIS-style control panel with statistics

### Status Colors
- 🟢 **Active** (Green): Farms currently in production
- 🟠 **Harvesting** (Amber): Farms being harvested
- 🔴 **Idle** (Red): Farms in off-season or maintenance

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2 (Vite)
- **Mapping Library**: Leaflet 1.9.4 + react-leaflet 4.2.1
- **Drawing Tools**: Leaflet Draw 1.0.4 (polygon/rectangle boundaries)
- **Map Tiles**: OpenStreetMap
- **Storage**: localStorage (no backend)
- **Styling**: CSS 3 with gradients and animations
- **Build Tool**: Vite 4.3

## 📋 Prerequisites

- Node.js 16+ (LTS recommended)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### 1. Installation

```bash
# Navigate to project directory
cd PineMap

# Install dependencies
npm install

# Or with yarn
yarn install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open automatically at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

Output files will be in the `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
PineMap/
├── src/
│   ├── components/
│   │   ├── AddFarmButton.jsx      # Floating Action Button
│   │   ├── AddFarmModal.jsx       # Modal form for adding farms
│   │   ├── ControlPanel.jsx       # Side panel with filters & legend
│   │   ├── FarmLayer.jsx          # Renders farm markers
│   │   ├── FarmPopup.jsx          # Popup for farm details
│   │   ├── FilterControl.jsx      # Status filter buttons
│   │   ├── Legend.jsx             # Color legend
│   │   └── MapView.jsx            # Main map container
│   ├── data/
│   │   └── mockFarms.js           # Mock farm data
│   ├── hooks/
│   │   └── useLocalStorage.js     # localStorage persistence hook
│   ├── styles/
│   │   ├── AddFarmButton.css      # FAB styling
│   │   ├── AddFarmModal.css       # Modal styling
│   │   ├── App.css                # Main app styling
│   │   ├── ControlPanel.css       # Control panel styling
│   │   ├── FilterControl.css      # Filter buttons styling
│   │   ├── FarmPopup.css          # Popup styling
│   │   ├── Legend.css             # Legend styling
│   │   └── MapView.css            # Map styling
│   ├── utils/
│   │   └── constants.js           # Constants & configuration
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── public/
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

## 💾 Data Storage

### Mock Data
The app includes 8 pre-loaded sample pineapple farms representing real farms in Bukidnon:
- Sunshine Plains Farm
- Golden Valley Plantation
- Mindanao Fruit Orchard
- Tropical Crown Estate
- Pilipinas Gold Farm
- Mt. Valencia Plantation
- Bukidnon Agri-Hub
- Southern Harvest Farm

### localStorage Keys
- `pineapple_farms`: All farm data (overwritten from mock on first load)
- `pineapple_filter`: Active filter selection

### Clear All Data
To reset to mock data, open browser DevTools Console and run:
```javascript
localStorage.removeItem('pineapple_farms');
localStorage.removeItem('pineapple_filter');
location.reload();
```

## 🗺️ Map Configuration

### Bukidnon Center
- **Latitude**: 8.1948°N
- **Longitude**: 124.7446°E
- **Default Zoom**: 10
- **Min Zoom**: 8
- **Max Zoom**: 18

Edit these in `src/utils/constants.js`:
```javascript
export const BUKIDNON_CENTER = { lat: 8.1948, lng: 124.7446 }
export const DEFAULT_ZOOM = 10
```

## 🎨 Drawing Farm Boundaries

The app includes **Leaflet Draw** integration for creating polygon and rectangle boundaries.

### Quick Start
1. Open **Control Panel** (right side)
2. Scroll to **"🗺️ Farm Boundaries"** section
3. Click **"Draw Boundary"** button (purple)
4. Button turns red - now you can draw on the map
5. **Polygon**: Click map points, double-click to finish
6. **Rectangle**: Use rectangle tool, drag to create

### Features
- ✅ Draw polygons and rectangles on the map
- ✅ Edit boundaries by dragging vertices
- ✅ Delete boundaries with one click
- ✅ View boundary statistics (area, coordinates)
- ✅ Area automatically calculated in hectares
- ✅ All boundaries saved to localStorage
- ✅ Boundaries persist after page refresh

### Boundary Data Model
```javascript
{
  id: 1,
  name: "Farm Boundary 1",
  coordinates: [[[lng, lat], [lng, lat], ...]],
  center: { lat: 8.25, lng: 124.75 },
  area: 2.45,                      // in km²
  created: "2024-03-28T10:30:00Z",
  updated: "2024-03-28T10:30:00Z"
}
```

### Customize Boundary Styling
Edit `src/utils/constants.js`:
```javascript
export const POLYGON_STYLES = {
  fillColor: '#22c55e',      // Fill color (green)
  color: '#15803d',          // Border color (dark green)
  weight: 3,                 // Border width
  opacity: 0.8,              // Border opacity
  fillOpacity: 0.2,          // Fill transparency
  dashArray: '5, 5'          // Dashed border pattern
}
```

### Clear All Boundaries
```javascript
// In browser console
localStorage.removeItem('pineapple_polygons')
location.reload()
```

**📚 For detailed guide**: See [POLYGON_DRAWING_GUIDE.md](POLYGON_DRAWING_GUIDE.md)

## 🎨 Customization

### Change Status Colors
Edit `src/utils/constants.js`:
```javascript
export const STATUS_COLORS = {
  active: '#22c55e',      // Green
  harvesting: '#f59e0b',  // Amber
  idle: '#ef4444'         // Red
}
```

### Add New Status Types
1. Add to `FARM_STATUS` in `src/utils/constants.js`
2. Update `STATUS_COLORS` with new color
3. Update mock data in `src/data/mockFarms.js`
4. Add filter button in `FILTERS`

### Modify Map Tiles
In `src/components/MapView.jsx`, change the TileLayer URL:
```jsx
<TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  // Try other providers...
/>
```

Other OSM-compatible providers:
```
https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png (Topographic)
https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x} (Satellite)
```

## 🔧 Development Tips

### Add a New Component
1. Create file in `src/components/ComponentName.jsx`
2. Create corresponding CSS in `src/styles/ComponentName.css`
3. Import in `App.jsx`
4. Add to layout

### Add a New Farm Field
1. Update mock data in `src/data/mockFarms.js`
2. Add field to form in `src/components/AddFarmModal.jsx`
3. Display in popup in `src/components/FarmPopup.jsx`

### Debug localStorage
```javascript
// In browser console:
JSON.parse(localStorage.getItem('pineapple_farms'))
```

## 🚀 Performance Optimization

### Current Optimizations
- SVG markers for custom colors (no image files)
- Component memoization ready
- CSS-only animations (GPU accelerated)
- Lazy filter computation

### Future Enhancements
- Add marker clustering (Leaflet.markercluster)
- Heatmap visualization
- Export farm data to CSV/GeoJSON
- Multi-select filtering
- Search by farm name
- Link boundaries to specific farms
- Boundary import/export functionality

## 📱 Responsive Design

The app is fully responsive:
- **Desktop** (>768px): Side panel + full map
- **Tablet** (≤768px): Stacked layout with scrollable panel
- **Mobile**: Touch-friendly controls, optimized gestures

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly

## 🐛 Known Limitations & TODOs

- [ ] No backend—data only persists on device
- [ ] No authentication or multi-user support
- [ ] No real-time sync capabilities
- [ ] Marker clustering not yet implemented
- [ ] Area calculation uses approximation (recommend Turf.js for production)
- [ ] No polygon drawing tool (basic boundaries)
- [ ] No server-side geocoding

## 🔄 Future Roadmap

### Phase 2 (Backend Integration)
- Node.js/Express backend with MongoDB
- User authentication and authorization
- Multi-user collaboration features
- Real-time data synchronization

### Phase 3 (Advanced GIS)
- Polygon boundaries for farm areas
- Heatmap visualization of yield data
- Historical data tracking
- Harvest prediction algorithms
- Weather integration (API)

### Phase 4 (Mobile App)
- React Native version
- Offline-first data sync
- Mobile-optimized interface
- Photo upload capabilities

## 📄 Environment Variables

Create `.env` if needed:
```
VITE_APP_TITLE=Bukidnon Pineapple GIS
VITE_MAP_CENTER_LAT=8.1948
VITE_MAP_CENTER_LNG=124.7446
```

Currently not required—all config is in `src/utils/constants.js`

## 🤝 Contributing

This is a solo project for now. For improvements:
1. Test thoroughly with real-world farm data
2. Ensure map accuracy with ground-truth locations
3. Optimize for slow network conditions
4. Test on various devices/browsers

## 📞 Support & Issues

For issues or questions:
1. Check the console for error messages (`F12`)
2. Clear browser cache if seeing stale data
3. Ensure LocalStorage is enabled in browser
4. Try incognito/private mode to isolate issues

## 📝 License

This project is created for agricultural mapping in Bukidnon, Philippines.

## 🙏 Credits

- **Map Data**: © OpenStreetMap contributors
- **Icons**: Unicode Emoji
- **Framework**: React & Vite
- **Mapping**: Leaflet & react-leaflet

## 🌾 About Bukidnon Pineapples

Bukidnon is one of the Philippines' leading pineapple producers, known for:
- High-altitude growing conditions (800-1,200m elevation)
- Premium quality due to climate
- Large-scale commercial operations
- Strong export market presence

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: MVP - Ready for Testing