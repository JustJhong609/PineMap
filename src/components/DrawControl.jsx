import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-draw'
import { DRAW_OPTIONS, POLYGON_STYLES } from '../utils/constants'
import { createPolygonData } from '../utils/polygonUtils'

/**
 * DrawControl component: Manages Leaflet Draw functionality
 * Uses a custom implementation since react-leaflet doesn't have direct DrawControl
 */
export const DrawControl = ({ isDrawing, onDrawComplete, onDrawCancel }) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    const featureGroup = L.featureGroup()
    map.addLayer(featureGroup)

    // Create draw control
    const drawControl = new L.Control.Draw({
      position: 'topleft',
      draw: {
        polygon: isDrawing && DRAW_OPTIONS.polygon,
        polyline: false,
        rectangle: isDrawing && DRAW_OPTIONS.rectangle,
        circle: false,
        marker: false,
        circlemarker: false
      },
      edit: {
        featureGroup: featureGroup,
        remove: true
      }
    })

    // Only add control if drawing is active
    if (isDrawing) {
      map.addControl(drawControl)
    }

    // Handle drawing events
    const handleDrawCreated = (e) => {
      const layer = e.layer
      const polygonData = createPolygonData(layer)
      featureGroup.addLayer(layer)
      
      if (onDrawComplete) {
        onDrawComplete(polygonData)
      }
    }

    const handleDrawEdited = (e) => {
      const layers = e.layers
      layers.eachLayer((layer) => {
        const polygonData = createPolygonData(layer)
        if (onDrawComplete) {
          onDrawComplete(polygonData)
        }
      })
    }

    const handleDrawDeleted = (e) => {
      // Can handle deletion if needed
    }

    if (isDrawing) {
      map.on(L.Draw.Event.CREATED, handleDrawCreated)
      map.on(L.Draw.Event.EDITED, handleDrawEdited)
      map.on(L.Draw.Event.DELETED, handleDrawDeleted)
    }

    return () => {
      // Cleanup
      if (isDrawing) {
        map.off(L.Draw.Event.CREATED, handleDrawCreated)
        map.off(L.Draw.Event.EDITED, handleDrawEdited)
        map.off(L.Draw.Event.DELETED, handleDrawDeleted)
        map.removeControl(drawControl)
      }
      map.removeLayer(featureGroup)
    }
  }, [map, isDrawing, onDrawComplete, onDrawCancel])

  return null
}

export default DrawControl
