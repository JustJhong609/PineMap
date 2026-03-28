import React from 'react'
import { GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import { POLYGON_STYLES } from '../utils/constants'

/**
 * PolygonLayer component: Renders saved polygon boundaries on the map
 */
export const PolygonLayer = ({ polygons, onPolygonClick, onPolygonDelete }) => {
  const onEachFeature = (feature, layer) => {
    const polygon = polygons.find(p => p.id === feature.properties.polygonId)
    
    if (polygon) {
      // Bind popup
      const popupContent = `
        <div style="font-family: sans-serif; font-size: 12px;">
          <strong>${polygon.name}</strong><br/>
          Area: ${(polygon.area * 100).toFixed(2)} hectares<br/>
          Created: ${new Date(polygon.created).toLocaleDateString()}
        </div>
      `
      layer.bindPopup(popupContent)
    }

    // Add click handler
    layer.on('click', () => {
      if (onPolygonClick) {
        onPolygonClick(polygon)
      }
    })

    // Style the polygon
    layer.setStyle({
      ...POLYGON_STYLES,
      color: polygon?.color || POLYGON_STYLES.color,
      fillColor: polygon?.fillColor || POLYGON_STYLES.fillColor
    })
  }

  return (
    <>
      {polygons.map((polygon) => {
        // Convert polygon data to GeoJSON
        const geoJSONFeature = {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: polygon.coordinates
          },
          properties: {
            polygonId: polygon.id,
            name: polygon.name
          }
        }

        return (
          <GeoJSON
            key={polygon.id}
            data={geoJSONFeature}
            onEachFeature={onEachFeature}
          />
        )
      })}
    </>
  )
}

export default PolygonLayer
