import React from 'react'
import L from 'leaflet'
import { Marker } from 'react-leaflet'
import { STATUS_COLORS, FILTERS, FARM_STATUS } from '../utils/constants'
import FarmPopup from './FarmPopup'

/**
 * Create custom colored markers for different farm statuses
 */
const createColoredMarkerIcon = (color) => {
  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })
}

/**
 * FarmLayer component: Renders all farm markers on the map
 */
export const FarmLayer = ({ farms, filter, onFarmClick }) => {
  // Filter farms based on active filter
  const filteredFarms = farms.filter((farm) => {
    if (filter === FILTERS.ALL) return true
    return farm.status === filter
  })

  // Map farm statuses to colors
  const markerIcons = {
    [FARM_STATUS.ACTIVE]: createColoredMarkerIcon(STATUS_COLORS.active),
    [FARM_STATUS.HARVESTING]: createColoredMarkerIcon(STATUS_COLORS.harvesting),
    [FARM_STATUS.IDLE]: createColoredMarkerIcon(STATUS_COLORS.idle)
  }

  return (
    <>
      {filteredFarms.map((farm) => (
        <Marker
          key={farm.id}
          position={[farm.lat, farm.lng]}
          icon={markerIcons[farm.status]}
          eventHandlers={{
            click: () => onFarmClick && onFarmClick(farm)
          }}
        >
          <FarmPopup farm={farm} />
        </Marker>
      ))}
    </>
  )
}

export default FarmLayer
