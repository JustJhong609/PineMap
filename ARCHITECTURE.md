# API & Component Reference

## Component Architecture

### Hierarchy
```
App (Main State Management)
├── MapView (Map Container & Interaction)
│   ├── TileLayer (OpenStreetMap)
│   ├── FarmLayer (Marker Rendering)
│   │   ├── Marker (Individual Farm)
│   │   └── FarmPopup (Marker Popup)
│   └── MapClickHandler (Add Farm Logic)
├── ControlPanel (Side Panel)
│   ├── FilterControl (Filter Buttons)
│   ├── Legend (Color Legend)
│   └── Farm Stats (Count Display)
├── AddFarmButton (FAB)
└── AddFarmModal (Form Modal)
```

---

## Core Components

### App.jsx
**Main Application Container**

**State:**
```javascript
farms[]              // Array of all farms
filter              // Current filter (all/active/harvesting/idle)
isAddingFarm        // Boolean for add mode
selectedCoordinates // {lat, lng} for new farm
```

**Props Passed:**
- `farms`: To MapView, ControlPanel
- `filter`: To MapView, ControlPanel
- `isAddingFarm`: To MapView, AddFarmButton
- `selectedCoordinates`: To AddFarmModal

---

### MapView.jsx
**Interactive Map Container**

**Props:**
```javascript
{
  farms: Array,           // Farm data array
  filter: String,         // Active filter
  isAddingFarm: Boolean,  // Add mode state
  onMapClick: Function,   // Callback when map clicked
  onFarmClick: Function   // Callback when marker clicked
}
```

**Features:**
- OpenStreetMap tile layer
- Centered on Bukidnon (8.1948°N, 124.7446°E)
- Zoom: 8-18 (default 10)
- Custom SVG markers
- Crosshair cursor in add mode

---

### FarmLayer.jsx
**Farm Markers Renderer**

**Props:**
```javascript
{
  farms: Array,       // All farms
  filter: String,     // Current filter
  onFarmClick: Function
}
```

**Returns:**
- Filtered list of Marker components
- Each with colored SVG icon
- Each with FarmPopup child

**Filter Logic:**
```javascript
filter === 'all' ? farms : farms.filter(f => f.status === filter)
```

---

### FarmPopup.jsx
**Marker Popup Display**

**Props:**
```javascript
{
  farm: Object  // {id, name, status, description, lat, lng, ...}
}
```

**Displays:**
- Farm name (title)
- Status badge (colored)
- Description
- Coordinates (lat/lng)
- Planted date
- Expected harvest date

---

### AddFarmModal.jsx
**Farm Creation Form**

**Props:**
```javascript
{
  coordinates: {lat, lng},  // Where user clicked
  farms: Array,             // Existing farms (for ID generation)
  onSave: Function,         // Save callback
  onCancel: Function        // Cancel callback
}
```

**Form Fields:**
- Coordinates (read-only, auto-filled)
- Farm Name (required, text)
- Description (required, textarea)
- Status (dropdown: active/harvesting/idle)
- Planted Date (optional, date picker)
- Expected Harvest (optional, date picker)

**Validation:**
- Name: Not empty
- Description: Not empty
- Coordinates: Auto-filled

---

### ControlPanel.jsx
**Side Control Panel**

**Props:**
```javascript
{
  filter: String,                    // Active filter
  onFilterChange: Function,          // Filter callback
  farmCount: Number,                 // Total farms
  filteredFarmCount: Number          // Displayed farms
}
```

**Children:**
- FilterControl
- Farm stats display
- Legend
- Info tooltip

---

### FilterControl.jsx
**Status Filter Buttons**

**Props:**
```javascript
{
  activeFilter: String,              // Current filter
  onFilterChange: Function(filter)   // Change handler
}
```

**Buttons:**
1. "All Farms" - Shows all
2. "Active" - Only status='active'
3. "Harvesting" - Only status='harvesting'
4. "Idle" - Only status='idle'

---

### Legend.jsx
**Marker Color Legend**

**Props:** None

**Displays:**
- Active (Green #22c55e)
- Harvesting (Amber #f59e0b)
- Idle (Red #ef4444)

---

### AddFarmButton.jsx
**Floating Action Button**

**Props:**
```javascript
{
  onAddClick: Function,     // Toggle add mode
  isActive: Boolean         // Currently in add mode
}
```

**Features:**
- Position: bottom-right, 60px × 60px
- Icon: "+"
- Color: Blue (normal), Red (active)
- Tooltip: "Click to add a new farm"
- Hover animation: Scale up

---

## Hooks

### useLocalStorage.js
**Custom Hook for Persistent State**

**Usage:**
```javascript
const [value, setValue] = useLocalStorage(key, initialValue)
```

**Parameters:**
- `key`: String - localStorage key
- `initialValue`: Any - Default if key doesn't exist

**Returns:**
- `[value, setValue]`: Like useState but syncs with localStorage

**Example:**
```javascript
const [farms, setFarms] = useLocalStorage('pineapple_farms', MOCK_FARMS)
```

---

## Data Models

### Farm Object Structure
```javascript
{
  id: Number,                 // Unique identifier
  name: String,               // Farm name
  status: String,             // 'active' | 'harvesting' | 'idle'
  description: String,        // Farm description
  lat: Number,                // Latitude (decimal)
  lng: Number,                // Longitude (decimal)
  planted: String | null,     // Date planted (YYYY-MM-DD)
  expectedHarvest: String | null  // Expected harvest date
}
```

**Example:**
```javascript
{
  id: 1,
  name: "Sunshine Plains Farm",
  status: "active",
  description: "500 hectares of premium Del Monte pineapples",
  lat: 8.25,
  lng: 124.75,
  planted: "2023-01-15",
  expectedHarvest: "2024-06-15"
}
```

---

## Constants

### From `src/utils/constants.js`

**FARM_STATUS:**
```javascript
{ ACTIVE: 'active', HARVESTING: 'harvesting', IDLE: 'idle' }
```

**STATUS_COLORS:**
```javascript
{
  active: '#22c55e',      // Green
  harvesting: '#f59e0b',  // Amber
  idle: '#ef4444'         // Red
}
```

**BUKIDNON_CENTER:**
```javascript
{ lat: 8.1948, lng: 124.7446 }
```

**Map Zoom:**
```javascript
DEFAULT_ZOOM = 10
MIN_ZOOM = 8
MAX_ZOOM = 18
```

**localStorage Keys:**
```javascript
{
  FARMS: 'pineapple_farms',
  FILTER: 'pineapple_filter'
}
```

**FILTERS:**
```javascript
{
  ALL: 'all',
  ACTIVE: 'active',
  HARVESTING: 'harvesting',
  IDLE: 'idle'
}
```

---

## Data Flow

### Add New Farm Flow
```
User clicks FAB (+)
  ↓
AddFarmButton triggers onAddClick
  ↓
App sets isAddingFarm = true
  ↓
MapView shows add mode indicator
  ↓
User clicks map
  ↓
MapClickHandler calls onMapClick
  ↓
App sets selectedCoordinates
  ↓
AddFarmModal appears with form
  ↓
User fills form & clicks "Add Farm"
  ↓
AddFarmModal calls onSave(newFarm)
  ↓
App adds farm to farms array via setFarms
  ↓
useLocalStorage persists to browser storage
  ↓
FarmLayer re-renders with new marker
  ↓
Stats update automatically
```

### View Farm Details Flow
```
User clicks marker
  ↓
FarmLayer marker handler fires
  ↓
onFarmClick callback
  ↓
FarmPopup displays in Leaflet popup
  ↓
User sees farm details formatted
```

### Filter Flow
```
User clicks filter button
  ↓
FilterControl calls onFilterChange(newFilter)
  ↓
App calls setFilter(newFilter)
  ↓
useLocalStorage persists filter
  ↓
MapView re-renders with new filter
  ↓
FarmLayer re-calculates filtered farms
  ↓
Only matching markers display
  ↓
ControlPanel stats update
```

---

## Styling System

### CSS Organization
- **App.css**: Global styles, status badges
- **MapView.css**: Map container, zoom controls
- **ControlPanel.css**: Panel layout, scrolling
- **FilterControl.css**: Filter buttons, active state
- **Legend.css**: Legend items
- **AddFarmButton.css**: FAB and tooltip
- **FarmPopup.css**: Popup styling
- **AddFarmModal.css**: Modal, form, buttons

### Color Palette
```
Primary Green:    #22c55e
Primary Blue:     #3b82f6
Status Active:    #22c55e
Status Harvest:   #f59e0b
Status Idle:      #ef4444
Error Red:        #dc2626
Background:       #f8fafc
Border:           #e2e8f0
Text Dark:        #1e293b
Text Medium:      #475569
Text Light:       #64748b
```

### Responsive Breakpoints
```
Desktop:   > 768px  (Side panel layout)
Tablet:    ≤ 768px  (Stacked layout)
Mobile:    ≤ 480px  (Optimized touch)
```

---

## localStorage Structure

### What Gets Stored
```javascript
// Key: pineapple_farms
// Value: JSON string
[
  {
    id: 1,
    name: "Farm Name",
    status: "active",
    description: "...",
    lat: 8.25,
    lng: 124.75,
    planted: "2023-01-15",
    expectedHarvest: "2024-06-15"
  },
  // ... more farms
]

// Key: pineapple_filter
// Value: JSON string
"all"  // or "active", "harvesting", "idle"
```

### Access in Console
```javascript
// View all farms
JSON.parse(localStorage.getItem('pineapple_farms'))

// View current filter
JSON.parse(localStorage.getItem('pineapple_filter'))

// Clear all data
localStorage.clear()

// Set custom data
localStorage.setItem('pineapple_farms', JSON.stringify([...]))
```

---

## API Calls (Future Backend Integration)

### Planned Endpoints (Phase 2)

**Get Farms**
```typescript
GET /api/farms
Response: {
  success: boolean,
  data: Farm[],
  count: number
}
```

**Get Single Farm**
```typescript
GET /api/farms/:id
Response: {
  success: boolean,
  data: Farm
}
```

**Create Farm**
```typescript
POST /api/farms
Body: Omit<Farm, 'id'>
Response: {
  success: boolean,
  data: Farm
}
```

**Update Farm**
```typescript
PUT /api/farms/:id
Body: Partial<Farm>
Response: {
  success: boolean,
  data: Farm
}
```

**Delete Farm**
```typescript
DELETE /api/farms/:id
Response: {
  success: boolean,
  id: number
}
```

---

## Performance Tips

### Optimize renderingfor Large Datasets
1. Use `React.memo()` for FarmLayer
2. Implement marker clustering (Leaflet.markercluster)
3. Lazy load markers outside viewport
4. Debounce filter changes

### Optimize Bundle Size
```bash
npm run build
# Check dist/assets size
# Target: < 250KB
```

### Monitor Performance
```javascript
// In browser console
performance.mark('farm-add')
// ... add farm
performance.mark('farm-add-end')
performance.measure('farm-add', 'farm-add', 'farm-add-end')
```

---

## Testing (Future)

### Unit Tests Example
```javascript
describe('FarmLayer', () => {
  it('filters farms by status', () => {
    // Test farm filtering logic
  })
  
  it('renders correct marker count', () => {
    // Test marker rendering
  })
})
```

### Integration Tests Example
```javascript
describe('Add Farm Flow', () => {
  it('creates farm from modal form', () => {
    // Test full add flow
  })
})
```

---

## Debugging

### Common Issues & Solutions

**Markers not showing:**
```javascript
// Check farms array
console.log('Farms:', farms)
// Check filter
console.log('Filter:', filter)
// Check filtered farms
console.log('Filtered:', farms.filter(f => f.status === filter || filter === 'all'))
```

**Map not displaying:**
```javascript
// Check map container
console.log('Map ref:', mapRef.current)
// Check Leaflet loaded
console.log('L:', L)
console.log('MapContainer:', MapContainer)
```

**localStorage not persisting:**
```javascript
// Check storage enabled
console.log('Storage enabled:', typeof Storage !== "undefined")
// Check save
localStorage.setItem('test', 'value')
console.log('Saved:', localStorage.getItem('test'))
```

---

## Version History

- **1.0.0** (March 2026): Initial MVP Release
  - Interactive map
  - Farm markers and popups
  - Filtering by status
  - Add new farm functionality
  - localStorage persistence

---

**Last Updated**: March 2026  
**Maintained By**: GIS Development Team  
**Status**: Actively Maintained
