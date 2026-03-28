# 🎨 Polygon Drawing Feature Guide

## Overview

The Bukidnon Pineapple GIS now includes **Leaflet Draw integration** for drawing polygon and rectangle boundaries for pineapple farm areas. Users can:

- ✅ Draw polygon boundaries on the map
- ✅ Draw rectangular boundaries
- ✅ Edit drawn boundaries
- ✅ Delete unwanted boundaries
- ✅ View boundary statistics (area, coordinates, etc.)
- ✅ Persist boundaries in localStorage

---

## Quick Start

### Enable Drawing Mode

1. **Open Control Panel** (right side)
2. **Scroll down** to "Farm Boundaries" section
3. **Click "Draw Boundary"** button (purple button)
4. Button turns red and map shows "Draw farm boundary on map"

### Draw a Polygon

1. Click on the map to create first point
2. Continue clicking to add more points
3. Double-click or press Enter to finish
4. Boundary appears on map automatically

### Draw a Rectangle

1. With drawing mode active, click Draw toolbar's rectangle button (top-left of map)
2. Click and drag on map to create rectangle
3. Release to complete
4. Rectangle appears on map

### Edit a Boundary

1. Click on drawn boundary
2. Yellow handles appear on vertices
3. Drag handles to adjust shape
4. Changes save automatically

### Delete a Boundary

1. **In Control Panel**: Click ✕ button next to boundary name
2. **Or on Map**: Select boundary and press Delete key
3. Confirm deletion when prompted

---

## Data Model

### Polygon Data Structure

```javascript
{
  id: 1,                                    // Unique ID
  farmId: null,                             // Optional link to farm
  name: "Farm Boundary 1",                  // Display name
  coordinates: [                            // GeoJSON coordinates
    [[lng, lat], [lng, lat], ...]          // Array of [lng, lat] pairs
  ],
  center: { lat: 8.25, lng: 124.75 },      // Centroid
  area: 2.45,                               // Square kilometers
  created: "2024-03-28T10:30:00Z",         // ISO timestamp
  updated: "2024-03-28T10:30:00Z",         // ISO timestamp
  color: "#22c55e",                         // Optional custom color
  fillColor: "#22c55e"                      // Fill color
}
```

### Storage

Polygons are stored in localStorage with key:
```javascript
localStorage['pineapple_polygons']
```

Example stored value:
```json
[
  {
    "id": 1,
    "farmId": null,
    "name": "Farm Boundary 1",
    "coordinates": [[[124.75, 8.25], [124.76, 8.25], ...]],
    "center": {"lat": 8.25, "lng": 124.75},
    "area": 2.45,
    "created": "2024-03-28T10:30:00Z",
    "updated": "2024-03-28T10:30:00Z"
  }
]
```

---

## UI Components

### Control Panel Section: "🗺️ Farm Boundaries"

Located in the Control Panel (right sidebar), below the color legend.

#### Elements:

1. **"Draw Boundary" Button** (Purple)
   - Normal state: Ready to draw
   - Active state: Red, pulsing animation
   - Toggles drawing mode on/off

2. **Drawing Hint** (Yellow)
   - Appears when drawing mode is active
   - Shows: "Click on map to draw polygon or rectangle boundary"

3. **Boundaries List**
   - Shows all saved boundaries
   - Each item displays:
     - Boundary name
     - Area in hectares or km²
     - Delete button (✕)
   - Click to expand and see details

4. **Expanded Boundary Details**
   - Center coordinates (latitude/longitude)
   - Total area
   - Created date
   - Number of boundary points

5. **Stats Footer** (when boundaries exist)
   - Total count of boundaries
   - Combined area of all boundaries

#### Empty State
If no boundaries exist:
- Shows message: "No boundaries yet"
- Hint: "Click 'Draw Boundary' to start"

---

## Features

### 1. Drawing Modes

#### Polygon Mode
- Click to create vertices
- Double-click or press Enter to finish
- Minimum 3 points required
- Area automatically calculated

#### Rectangle Mode
- Click and drag to create
- Creates 4-point rectangle
- Snap to grid enabled
- Perfect for rectangular farm plots

### 2. Editing

When drawn, boundaries can be edited:
- **Drag vertices**: Move individual points
- **Add vertices**: Ctrl+Click between points
- **Delete vertices**: Alt+Click on vertex
- **Changes persist**: Automatically saved to localStorage

### 3. Styling

Boundaries display with:
- **Border**: Dark green (#15803d) with dashed pattern
- **Fill**: Light green (#22c55e) at 20% opacity
- **Hover**: Increases border weight, brightens
- **Selection**: Shows edit handles (yellow circles)

### 4. Area Calculation

Area is automatically calculated using:
- Shoelace formula for mathematical accuracy
- Conversion from degrees² to km²
- 1° at equator ≈ 111 km
- Display in hectares for farm areas (1 km² = 100 hectares)

---

## Utilities

### polygonUtils.js

Utility functions for polygon operations:

```javascript
// Convert Leaflet layer to GeoJSON
leafletToGeoJSON(layer)

// Extract coordinates from layer
getLayerCoordinates(layer)

// Calculate polygon area in square km
calculatePolygonArea(coordinates)

// Get center point coordinates
getPolygonCenter(coordinates)

// Generate unique ID for new polygon
generatePolygonId(existingPolygons)

// Create polygon data object from layer
createPolygonData(layer, farmId)

// Update polygon with new coordinates
updatePolygonData(polygonData, layer)

// Format area for display
formatArea(areaKm2)  // Returns "X hectares" or "Y km²"

// Get polygon bounds (north/south/east/west)
getPolygonBounds(coordinates)
```

### Usage Example

```javascript
import { createPolygonData, formatArea } from '../utils/polygonUtils'

// When user completes drawing
const polygonData = createPolygonData(leafletLayer)
setPolygons([...polygons, polygonData])

// Display area
const areaText = formatArea(polygonData.area)
console.log(areaText)  // "245 hectares" or "2.45 km²"
```

---

## State Management (App.jsx)

### Polygon State

```javascript
// State
const [polygons, setPolygons] = useLocalStorage(STORAGE_KEYS.POLYGONS, [])
const [isDrawingMode, setIsDrawingMode] = useState(false)
const [selectedPolygon, setSelectedPolygon] = useState(null)

// Event Handlers
const handleToggleDrawMode = (enabled) => setIsDrawingMode(enabled)
const handlePolygonComplete = (polygonData) => setPolygons([...polygons, polygonData])
const handleDeletePolygon = (polygonId) => setPolygons(polygons.filter(p => p.id !== polygonId))
const handleSelectPolygon = (polygon) => setSelectedPolygon(polygon)
```

### Data Flow

```
User clicks "Draw Boundary"
    ↓
handleToggleDrawMode(true)
    ↓
isDrawingMode = true
    ↓
DrawControl enabled on map
    ↓
User draws on map
    ↓
L.Draw.Event.CREATED fired
    ↓
handlePolygonComplete(polygonData)
    ↓
setPolygons([...polygons, polygonData])
    ↓
PolygonLayer re-renders with new polygon
    ↓
PolygonManager list updates
    ↓
useLocalStorage persists to browser
```

---

## Component Integration

### MapView.jsx
- Receives polygon-related props
- Renders PolygonLayer (displays boundaries)
- Renders DrawControl (drawing functionality)
- Shows drawing mode indicator when active

### ControlPanel.jsx
- Displays PolygonManager component
- Passes polygon state and handlers

### PolygonManager.jsx
- UI for managing boundaries
- Draw mode toggle button
- List of boundaries with actions
- Statistics footer

### PolygonLayer.jsx
- Uses react-leaflet GeoJSON component
- Renders each polygon from data
- Provides click handlers for interaction

### DrawControl.jsx
- Manages Leaflet.Draw library
- Handles drawing events
- Converts to polygon data
- Integrates with map

---

## Installation

### Dependencies

```bash
npm install leaflet-draw@1.0.4
```

### HTML Requirements

Add to `index.html` head:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet-draw/1.0.4/leaflet.draw.min.css" />
```

This is already done in the setup.

---

## Configuration

### Customize Drawing Options

Edit `src/utils/constants.js`:

```javascript
export const DRAW_OPTIONS = {
  polygon: true,      // Enable polygon drawing
  polyline: false,    // Disable lines
  rectangle: true,    // Enable rectangle drawing
  circle: false,      // Disable circles
  marker: false,      // Disable markers
  circlemarker: false // Disable circle markers
}
```

### Customize Polygon Styling

Edit `src/utils/constants.js`:

```javascript
export const POLYGON_STYLES = {
  fillColor: '#22c55e',      // Fill color
  color: '#15803d',          // Border color
  weight: 3,                 // Border width
  opacity: 0.8,              // Border opacity
  fillOpacity: 0.2,          // Fill transparency
  dashArray: '5, 5'          // Dashed border
}

export const POLYGON_EDIT_STYLES = {
  fillColor: '#3b82f6',      // Editing fill color
  color: '#1e40af',          // Editing border color
  weight: 3,
  opacity: 0.9,
  fillOpacity: 0.3
}
```

---

## API Reference

### DrawControl Props

```javascript
<DrawControl
  isDrawing={boolean}           // Enable/disable drawing
  onDrawComplete={callback}     // Called when polygon created/edited
  onDrawCancel={callback}       // Called when drawing cancelled
/>
```

### PolygonLayer Props

```javascript
<PolygonLayer
  polygons={Array}              // Array of polygon data objects
  onPolygonClick={callback}     // Called when polygon clicked
  onPolygonDelete={callback}    // Called when polygon deleted
/>
```

### PolygonManager Props

```javascript
<PolygonManager
  polygons={Array}              // Array of boundary data
  isDrawingMode={boolean}       // Current drawing mode
  onToggleDrawMode={callback}   // Draw button clicked
  onDeletePolygon={callback}    // Delete button clicked
  onSelectPolygon={callback}    // Boundary selected
/>
```

---

## Advanced Usage

### Link Boundaries to Farms

```javascript
// When creating boundary, link to farm
const polygonData = {
  ...createPolygonData(layer),
  farmId: selectedFarm.id,      // Link to farm
  name: `${selectedFarm.name} Boundary`
}

setPolygons([...polygons, polygonData])
```

### Export to GeoJSON

```javascript
// Convert to GeoJSON FeatureCollection
const geoJSON = {
  type: 'FeatureCollection',
  features: polygons.map(polygon => ({
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: polygon.coordinates
    },
    properties: {
      name: polygon.name,
      area: polygon.area,
      created: polygon.created
    }
  }))
}

// Save to file
const dataStr = JSON.stringify(geoJSON, null, 2)
const dataBlob = new Blob([dataStr], { type: 'application/json' })
const url = URL.createObjectURL(dataBlob)
const link = document.createElement('a')
link.href = url
link.download = 'farm-boundaries.geojson'
link.click()
```

### Batch Operations

```javascript
// Delete all boundaries
const clearBoundaries = () => {
  if (window.confirm('Delete all boundaries?')) {
    setPolygons([])
  }
}

// Get total farm area
const getTotalArea = () => {
  return polygons.reduce((sum, p) => sum + p.area, 0)
}

// Get boundaries for specific farm
const getFarmBoundaries = (farmId) => {
  return polygons.filter(p => p.farmId === farmId)
}
```

---

## Troubleshooting

### Drawing Tools Not Visible

Check if leaflet-draw CSS is loaded:
1. Open DevTools (F12)
2. Check Application → Stylesheets
3. Look for `leaflet.draw.min.css`
4. If missing, add to `index.html`

### Polygons Not Displaying

```javascript
// In browser console
JSON.parse(localStorage.getItem('pineapple_polygons'))
// Should show array of polygons

// Clear and reload
localStorage.removeItem('pineapple_polygons')
location.reload()
```

### Area Calculations Wrong

The calculation is approximate because:
- Uses simple Shoelace formula
- Doesn't account for Earth's curvature
- For production: use Turf.js or server-side GIS library

### Draw Control Overlapping

Edit MapView.css to adjust position:
```css
/* In .leaflet-control-toolbar if needed */
margin-left: 50px !important; /* Adjust as needed */
```

---

## Best Practices

### 1. **Name Boundaries Descriptively**
```javascript
// Good
"MT. Valencia Plantation Boundary"
"Demonstration Farm Plot A"

// Avoid
"Boundary 1"
"Farm"
```

### 2. **Link to Farms When Possible**
```javascript
// Set farmId when drawing for known farm
polygonData.farmId = selectedFarm.id
polygonData.name = `${selectedFarm.name} Boundary`
```

### 3. **Regular Backup**
```javascript
// Backup polygons periodically
const backup = JSON.stringify(polygons)
localStorage.setItem('pineapple_polygons_backup', backup)
```

### 4. **Validate Polygons**
```javascript
// Check minimum requirements
if (polygon.coordinates[0].length < 3) {
  console.warn('Invalid polygon: needs at least 3 points')
}
```

---

## Performance Considerations

### For 100+ Boundaries
- Consider implementing polygon clustering
- Add search/filter functionality
- Implement virtualization for list rendering

### For Large Polygons
- Simplify geometry using Turf.js
- Use polygon simplification algorithm
- Store coordinates efficiently

---

## Future Enhancements

### Planned Features
- [ ] Polygon simplification (reduce points)
- [ ] Import GeoJSON files
- [ ] Export to GeoJSON/Shapefile
- [ ] Polygon templates (predefined shapes)
- [ ] Batch import from CSV
- [ ] Area-based filtering
- [ ] Boundary validation
- [ ] Polygon combining/splitting
- [ ] Measurement tools
- [ ] Heat maps on boundaries

### Phase 3 (Backend Integration)
- Store boundaries in database
- Share boundaries between users
- Historical boundary tracking
- Versioning and change log
- Geometry validation server-side

---

## References

- **Leaflet.draw**: https://leaflet.github.io/Leaflet.draw/
- **Leaflet**: https://leafletjs.com/
- **GeoJSON**: https://geojson.org/
- **Turf.js**: https://turfjs.org/ (advanced geometry)

---

**Version**: 1.0.0  
**Added**: March 28, 2026  
**Status**: Production Ready

Happy boundary drawing! 🎨🗺️
