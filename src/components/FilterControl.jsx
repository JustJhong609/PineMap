import React from 'react'
import { FILTERS } from '../utils/constants'
import '../styles/FilterControl.css'

export const FilterControl = ({ activeFilter, onFilterChange }) => {
  const filterOptions = [
    { value: FILTERS.ALL, label: 'All Farms' },
    { value: FILTERS.ACTIVE, label: 'Active' },
    { value: FILTERS.HARVESTING, label: 'Harvesting' },
    { value: FILTERS.IDLE, label: 'Idle' }
  ]

  return (
    <div className="filter-control">
      <h3 className="filter-title">Filter by Status</h3>
      <div className="filter-buttons">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`filter-btn ${activeFilter === option.value ? 'active' : ''}`}
            onClick={() => onFilterChange(option.value)}
            title={`Filter to show ${option.label}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterControl
