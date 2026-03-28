import React from 'react'
import { STATUS_COLORS, FARM_STATUS } from '../utils/constants'
import '../styles/Legend.css'

export const Legend = () => {
  const items = [
    { status: FARM_STATUS.ACTIVE, label: 'Active' },
    { status: FARM_STATUS.HARVESTING, label: 'Harvesting' },
    { status: FARM_STATUS.IDLE, label: 'Idle' }
  ]

  return (
    <div className="legend">
      <h3 className="legend-title">Farm Status</h3>
      <div className="legend-items">
        {items.map((item) => (
          <div key={item.status} className="legend-item">
            <div
              className="legend-dot"
              style={{ backgroundColor: STATUS_COLORS[item.status] }}
            ></div>
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Legend
