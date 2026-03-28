import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { DRAW_OPTIONS, POLYGON_STYLES } from '../utils/constants'
import { createPolygonData } from '../utils/polygonUtils'

/**
 * DrawControl component: Manages Leaflet Draw functionality
 * Warning: Leaflet Draw must be loaded separately via script tag or proper npm import
 */
export const DrawControl = ({ isDrawing, onDrawComplete, onDrawCancel }) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !isDrawing) return

    // Check if Leaflet Draw is available
    if (!window.L || !window.L.Control || !window.L.Control.Draw) {
      console.warn('Leaflet Draw library not available. Ensure leaflet-draw is properly loaded.')
      return
    }

    try {
      const DrawLib = window.L.Control.Draw
      const featureGroup = window.L.featureGroup()
      map.addLayer(featureGroup)

      // Create draw control
      const drawControl = new DrawLib({
        position: 'topleft',
        draw: {
          polygon: DRAW_OPTIONS.polygon,
          polyline: false,
          rectangle: DRAW_OPTIONS.rectangle,
          circle: false,
          marker: false,
          circlemarker: false
        },
        edit: {
          featureGroup: featureGroup,
          remove: true
        }
      })

      map.addControl(drawControl)

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

      const handelDrawDeleted = (e) => {
        // Handle deletion
      }

      if (window.L.Draw && window.L.Draw.Event) {
        map.on(window.L.Draw.Event.CREATED, handleDrawCreated)
        map.on(window.L.Draw.Event.EDITED, handleDrawEdited)
        map.on(window.L.Draw.Event.DELETED, handelDrawDeleted)
      }

      return () => {
        if (drawControl) map.removeControl(drawControl)
        if (featureGroup) map.removeLayer(featureGroup)
        if (window.L.Draw && window.L.Draw.Event) {
          map.off(window.L.Draw.Event.CREATED, handleDrawCreated)
          map.off(window.L.Draw.Event.EDITED, handleDrawEdited)
          map.off(window.L.Draw.Event.DELETED, handelDrawDeleted)
        }
      }
    } catch (err) {
      console.error('Error initializing Leaflet Draw:', err)
      return
    }
  }, [map, isDrawing, onDrawComplete, onDrawCancel])

  return null
}

export default DrawControl
