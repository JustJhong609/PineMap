/**
 * Polygon utility functions for GeoJSON conversion and calculations
 */

/**
 * Convert Leaflet Draw polygon to GeoJSON
 */
export const leafletToGeoJSON = (layer) => {
  if (layer.toGeoJSON) {
    return layer.toGeoJSON()
  }
  return null
}

/**
 * Extract coordinates from Leaflet Draw layer
 */
export const getLayerCoordinates = (layer) => {
  const geoJSON = leafletToGeoJSON(layer)
  if (geoJSON && geoJSON.geometry && geoJSON.geometry.coordinates) {
    return geoJSON.geometry.coordinates
  }
  return null
}

/**
 * Calculate polygon area in square kilometers
 * Uses simple formula - for production use proper geospatial library
 */
export const calculatePolygonArea = (coordinates) => {
  if (!coordinates || !Array.isArray(coordinates[0])) {
    return 0
  }

  // Simple area calculation using shoelace formula
  let area = 0
  const polygon = coordinates[0]

  for (let i = 0; i < polygon.length - 1; i++) {
    const xi = polygon[i][0]
    const yi = polygon[i][1]
    const xi1 = polygon[i + 1][0]
    const yi1 = polygon[i + 1][1]

    area += (xi * yi1 - xi1 * yi)
  }

  area = Math.abs(area / 2)

  // Convert from degrees squared to approximate km²
  // This is a rough approximation: 1° at equator ≈ 111 km
  return area * 12321
}

/**
 * Get center point of polygon
 */
export const getPolygonCenter = (coordinates) => {
  if (!coordinates || !Array.isArray(coordinates[0])) {
    return null
  }

  const polygon = coordinates[0]
  let sumLat = 0
  let sumLng = 0

  for (const coord of polygon) {
    sumLng += coord[0]
    sumLat += coord[1]
  }

  return {
    lat: sumLat / polygon.length,
    lng: sumLng / polygon.length
  }
}

/**
 * Generate unique polygon ID
 */
export const generatePolygonId = (existingPolygons = []) => {
  const maxId = existingPolygons.length > 0
    ? Math.max(...existingPolygons.map(p => p.id || 0))
    : 0
  return maxId + 1
}

/**
 * Create polygon data object from Leaflet layer
 */
export const createPolygonData = (layer, farmId = null) => {
  const coordinates = getLayerCoordinates(layer)
  const center = getPolygonCenter(coordinates)
  const area = calculatePolygonArea(coordinates)

  return {
    id: generatePolygonId(),
    farmId: farmId,
    coordinates: coordinates,
    center: center,
    area: area, // in km²
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    name: `Farm Boundary ${farmId || 'Unknown'}`
  }
}

/**
 * Update polygon with new coordinates
 */
export const updatePolygonData = (polygonData, layer) => {
  const coordinates = getLayerCoordinates(layer)
  const center = getPolygonCenter(coordinates)
  const area = calculatePolygonArea(coordinates)

  return {
    ...polygonData,
    coordinates: coordinates,
    center: center,
    area: area,
    updated: new Date().toISOString()
  }
}

/**
 * Convert GeoJSON feature back to Leaflet format
 */
export const geoJSONToLeaflet = (geoJSONFeature) => {
  if (geoJSONFeature.geometry.type === 'Polygon') {
    const coords = geoJSONFeature.geometry.coordinates[0]
    return coords.map(c => [c[1], c[0]]) // Swap to [lat, lng]
  }
  return []
}

/**
 * Format area for display
 */
export const formatArea = (areaKm2) => {
  if (areaKm2 < 1) {
    const hectares = areaKm2 * 100
    return `${hectares.toFixed(2)} hectares`
  }
  return `${areaKm2.toFixed(2)} km²`
}

/**
 * Get polygon bounds (min/max coordinates)
 */
export const getPolygonBounds = (coordinates) => {
  if (!coordinates || !Array.isArray(coordinates[0])) {
    return null
  }

  const polygon = coordinates[0]
  let minLat = 90, maxLat = -90
  let minLng = 180, maxLng = -180

  for (const [lng, lat] of polygon) {
    minLat = Math.min(minLat, lat)
    maxLat = Math.max(maxLat, lat)
    minLng = Math.min(minLng, lng)
    maxLng = Math.max(maxLng, lng)
  }

  return {
    north: maxLat,
    south: minLat,
    east: maxLng,
    west: minLng
  }
}
