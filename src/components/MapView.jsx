import React, { useMemo, useRef } from 'react'
import { MapContainer, TileLayer, useMapEvent, useMap } from 'react-leaflet'
import L from 'leaflet'
import { BUKIDNON_CENTER, DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM } from '../utils/constants'
import FarmLayer from './FarmLayer'
import PolygonLayer from './PolygonLayer'
import DrawControl from './DrawControl'
import '../styles/MapView.css'

/**
 * Component to handle map click events for adding new farms
 */
const MapClickHandler = ({ isAddingFarm, onMapClick }) => {
  useMapEvent('click', (e) => {
    if (isAddingFarm) {
      onMapClick(e.latlng)
    }
  })
  return null
}

/**
 * MapView component: Main map container with Leaflet integration
 */
export const MapView = ({ 
  farms, 
  filter, 
  isAddingFarm, 
  onMapClick, 
  onFarmClick,
  polygons,
  isDrawingMode,
  onDrawComplete,
  onDrawCancel,
  onPolygonClick
}) => {
  const mapRef = useRef()

  const mapCenter = useMemo(
    () => [BUKIDNON_CENTER.lat, BUKIDNON_CENTER.lng],
    []
  )

  return (
    <div className={`map-view ${isAddingFarm ? 'adding-mode' : ''}`}>
      <MapContainer
        center={mapCenter}
        zoom={DEFAULT_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        className="map-container"
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {/* Farm markers layer */}
        <FarmLayer farms={farms} filter={filter} onFarmClick={onFarmClick} />

        {/* Polygon boundaries layer */}
        {polygons && polygons.length > 0 && (
          <PolygonLayer polygons={polygons} onPolygonClick={onPolygonClick} />
        )}

        {/* Draw control for creating boundaries */}
        <DrawControl 
          isDrawing={isDrawingMode} 
          onDrawComplete={onDrawComplete}
          onDrawCancel={onDrawCancel}
        />

        {/* Map click handler for adding farms */}
        <MapClickHandler isAddingFarm={isAddingFarm} onMapClick={onMapClick} />

        {/* Adding mode indicator */}
        {isAddingFarm && (
          <div className="map-mode-indicator">
            <div className="mode-badge">
              <span className="mode-pulse"></span>
              Click on map to add a new farm
            </div>
          </div>
        )}

        {/* Drawing mode indicator */}
        {isDrawingMode && (
          <div className="map-mode-indicator">
            <div className="mode-badge draw-badge">
              <span className="mode-pulse"></span>
              Draw farm boundary on map
            </div>
          </div>
        )}
      </MapContainer>
    </div>
  )
}

export default MapView
