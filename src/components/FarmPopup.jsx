import React from 'react'
import { Popup } from 'react-leaflet'
import '../styles/FarmPopup.css'

export const FarmPopup = ({ farm }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Popup className="farm-popup" maxWidth={300}>
      <div className="popup-content">
        <h4 className="popup-title">{farm.name}</h4>
        
        <div className="popup-field">
          <span className="field-label">Status:</span>
          <span className={`status-badge status-${farm.status}`}>
            {farm.status.charAt(0).toUpperCase() + farm.status.slice(1)}
          </span>
        </div>

        <div className="popup-field">
          <span className="field-label">Description:</span>
          <p className="field-value">{farm.description}</p>
        </div>

        <div className="popup-field">
          <span className="field-label">Location:</span>
          <p className="field-value">{farm.lat.toFixed(4)}°N, {farm.lng.toFixed(4)}°E</p>
        </div>

        {farm.planted && (
          <div className="popup-field">
            <span className="field-label">Planted:</span>
            <p className="field-value">{formatDate(farm.planted)}</p>
          </div>
        )}

        {farm.expectedHarvest && (
          <div className="popup-field">
            <span className="field-label">Expected Harvest:</span>
            <p className="field-value">{formatDate(farm.expectedHarvest)}</p>
          </div>
        )}
      </div>
    </Popup>
  )
}

export default FarmPopup
