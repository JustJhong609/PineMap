import React, { useState } from 'react'
import { FARM_STATUS } from '../utils/constants'
import '../styles/AddFarmModal.css'

export const AddFarmModal = ({ coordinates, farms, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: FARM_STATUS.ACTIVE,
    planted: '',
    expectedHarvest: ''
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Farm name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Create new farm object
    const newFarm = {
      id: Math.max(...farms.map((f) => f.id), 0) + 1,
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status,
      lat: coordinates.lat,
      lng: coordinates.lng,
      planted: formData.planted || null,
      expectedHarvest: formData.expectedHarvest || null
    }

    onSave(newFarm)
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Farm</h2>
          <button className="modal-close" onClick={onCancel} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="farm-form">
          <div className="form-group">
            <label htmlFor="coordinates" className="form-label">
              📍 Coordinates
            </label>
            <div className="coordinates-display">
              {coordinates.lat.toFixed(4)}°N, {coordinates.lng.toFixed(4)}°E
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Farm Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Golden Valley Farm"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your farm..."
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-input ${errors.description ? 'error' : ''}`}
            ></textarea>
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value={FARM_STATUS.ACTIVE}>Active</option>
                <option value={FARM_STATUS.HARVESTING}>Harvesting</option>
                <option value={FARM_STATUS.IDLE}>Idle</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="planted" className="form-label">
                Planted Date
              </label>
              <input
                type="date"
                id="planted"
                name="planted"
                value={formData.planted}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="expectedHarvest" className="form-label">
                Expected Harvest
              </label>
              <input
                type="date"
                id="expectedHarvest"
                name="expectedHarvest"
                value={formData.expectedHarvest}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Farm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFarmModal
