import React, { useState } from 'react'
import '../styles/AddFarmButton.css'

export const AddFarmButton = ({ onAddClick, isActive }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="add-farm-container">
      <button
        className={`add-farm-fab ${isActive ? 'active' : ''}`}
        onClick={onAddClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        title="Click to add a new farm"
        aria-label="Add new farm"
      >
        <span className="fab-icon">+</span>
      </button>
      {showTooltip && (
        <div className="fab-tooltip">
          Click on map to add new farm
        </div>
      )}
    </div>
  )
}

export default AddFarmButton
