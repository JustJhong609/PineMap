/* Farm Status */
export const FARM_STATUS = {
  ACTIVE: 'active',
  HARVESTING: 'harvesting',
  IDLE: 'idle'
}

/* Status Colors */
export const STATUS_COLORS = {
  active: '#22c55e',      // Green
  harvesting: '#f59e0b',  // Amber
  idle: '#ef4444'         // Red
}

/* Bukidnon Coordinates (center) */
export const BUKIDNON_CENTER = {
  lat: 8.1948,
  lng: 124.7446
}

/* Map Constants */
export const DEFAULT_ZOOM = 10
export const MIN_ZOOM = 8
export const MAX_ZOOM = 18

/* localStorage Keys */
export const STORAGE_KEYS = {
  FARMS: 'pineapple_farms',
  FILTER: 'pineapple_filter',
  POLYGONS: 'pineapple_polygons'
}

/* Filter Options */
export const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  HARVESTING: 'harvesting',
  IDLE: 'idle'
}

/* Polygon Styling */
export const POLYGON_STYLES = {
  fillColor: '#22c55e',
  color: '#15803d',
  weight: 3,
  opacity: 0.8,
  fillOpacity: 0.2,
  dashArray: '5, 5'
}

export const POLYGON_EDIT_STYLES = {
  fillColor: '#3b82f6',
  color: '#1e40af',
  weight: 3,
  opacity: 0.9,
  fillOpacity: 0.3
}

/* Draw Control Options */
export const DRAW_OPTIONS = {
  polygon: true,
  polyline: false,
  rectangle: true,
  circle: false,
  marker: false,
  circlemarker: false
}
