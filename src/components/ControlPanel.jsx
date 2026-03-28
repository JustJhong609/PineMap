import React from 'react'
import FilterControl from './FilterControl'
import Legend from './Legend'
import PolygonManager from './PolygonManager'
import '../styles/ControlPanel.css'

export const ControlPanel = ({ 
  filter, 
  onFilterChange, 
  farmCount, 
  filteredFarmCount,
  polygons,
  isDrawingMode,
  onToggleDrawMode,
  onDeletePolygon,
  onSelectPolygon
}) => {
  return (
    <div className="control-panel">
      <div className="panel-header">
        <h1 className="panel-title">
          <span className="title-icon">🍍</span>
          Bukidnon Pineapple GIS
        </h1>
        <p className="panel-subtitle">Interactive Mapping System</p>
      </div>

      <div className="panel-content">
        <FilterControl activeFilter={filter} onFilterChange={onFilterChange} />

        <div className="farm-stats">
          <div className="stat-item">
            <span className="stat-label">Total Farms</span>
            <span className="stat-value">{farmCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Displayed</span>
            <span className="stat-value">{filteredFarmCount}</span>
          </div>
        </div>

        <Legend />

        <PolygonManager
          polygons={polygons}
          isDrawingMode={isDrawingMode}
          onToggleDrawMode={onToggleDrawMode}
          onDeletePolygon={onDeletePolygon}
          onSelectPolygon={onSelectPolygon}
        />

        <div className="panel-info">
          <p>
            <strong>💡 Tip:</strong> Click the <strong>+</strong> button to add a new farm marker to the map.
          </p>
        </div>
      </div>

      <div className="panel-footer">
        <p>v1.0 • Data persisted locally</p>
      </div>
    </div>
  )
}

export default ControlPanel
