import React, { useState } from 'react'
import { formatArea } from '../utils/polygonUtils'
import '../styles/PolygonManager.css'

/**
 * PolygonManager component: UI for viewing and managing drawn boundaries
 */
export const PolygonManager = ({ 
  polygons, 
  isDrawingMode, 
  onToggleDrawMode, 
  onDeletePolygon,
  onSelectPolygon 
}) => {
  const [expandedId, setExpandedId] = useState(null)

  const handleToggleDraw = () => {
    onToggleDrawMode(!isDrawingMode)
  }

  const handleDelete = (polygonId) => {
    if (window.confirm('Delete this boundary?')) {
      onDeletePolygon(polygonId)
    }
  }

  return (
    <div className="polygon-manager">
      <h3 className="manager-title">🗺️ Farm Boundaries</h3>

      <div className="manager-content">
        {/* Draw Mode Toggle */}
        <button
          className={`draw-toggle-btn ${isDrawingMode ? 'active' : ''}`}
          onClick={handleToggleDraw}
          title={isDrawingMode ? 'Stop drawing' : 'Start drawing boundaries'}
        >
          <span className="draw-icon">✏️</span>
          {isDrawingMode ? 'Drawing Mode ON' : 'Draw Boundary'}
        </button>

        {isDrawingMode && (
          <div className="draw-mode-hint">
            Click on map to draw polygon or rectangle boundary
          </div>
        )}

        {/* Boundaries List */}
        <div className="boundaries-list">
          {polygons.length === 0 ? (
            <div className="empty-state">
              <p>No boundaries yet</p>
              <p className="empty-hint">Click "Draw Boundary" to start</p>
            </div>
          ) : (
            polygons.map((polygon) => (
              <div key={polygon.id} className="boundary-item">
                <div
                  className="boundary-header"
                  onClick={() => {
                    setExpandedId(expandedId === polygon.id ? null : polygon.id)
                    if (onSelectPolygon) {
                      onSelectPolygon(polygon)
                    }
                  }}
                >
                  <div className="boundary-info">
                    <div className="boundary-name">{polygon.name}</div>
                    <div className="boundary-area">
                      {formatArea(polygon.area)}
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(polygon.id)
                    }}
                    title="Delete boundary"
                  >
                    ✕
                  </button>
                </div>

                {expandedId === polygon.id && (
                  <div className="boundary-details">
                    <div className="detail-row">
                      <span className="detail-label">Center:</span>
                      <span className="detail-value">
                        {polygon.center?.lat.toFixed(4)}°N,{' '}
                        {polygon.center?.lng.toFixed(4)}°E
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Area:</span>
                      <span className="detail-value">{formatArea(polygon.area)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Created:</span>
                      <span className="detail-value">
                        {new Date(polygon.created).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Points:</span>
                      <span className="detail-value">
                        {polygon.coordinates?.[0]?.length || 0}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Stats Footer */}
        {polygons.length > 0 && (
          <div className="boundaries-stats">
            <div className="stat">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{polygons.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Area:</span>
              <span className="stat-value">
                {formatArea(
                  polygons.reduce((sum, p) => sum + p.area, 0)
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PolygonManager
