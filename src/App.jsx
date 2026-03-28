import React, { useState, useEffect } from 'react'
import MapView from './components/MapView'
import ControlPanel from './components/ControlPanel'
import AddFarmButton from './components/AddFarmButton'
import AddFarmModal from './components/AddFarmModal'
import { useLocalStorage } from './hooks/useLocalStorage'
import { MOCK_FARMS } from './data/mockFarms'
import { STORAGE_KEYS, FILTERS } from './utils/constants'
import './styles/App.css'

function App() {
  // State management
  const [farms, setFarms] = useLocalStorage(STORAGE_KEYS.FARMS, MOCK_FARMS)
  const [filter, setFilter] = useLocalStorage(STORAGE_KEYS.FILTER, FILTERS.ALL)
  const [polygons, setPolygons] = useLocalStorage(STORAGE_KEYS.POLYGONS, [])
  const [isAddingFarm, setIsAddingFarm] = useState(false)
  const [isDrawingMode, setIsDrawingMode] = useState(false)
  const [selectedCoordinates, setSelectedCoordinates] = useState(null)
  const [selectedPolygon, setSelectedPolygon] = useState(null)

  // Initialize localStorage with mock data on first load if empty
  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEYS.FARMS)) {
      setFarms(MOCK_FARMS)
    }
  }, [])

  // Handle FAB click
  const handleAddFarmClick = () => {
    setIsAddingFarm(!isAddingFarm)
  }

  // Handle map click to add farm
  const handleMapClick = (latlng) => {
    setSelectedCoordinates({
      lat: latlng.lat,
      lng: latlng.lng
    })
  }

  // Handle save new farm
  const handleSaveFarm = (newFarm) => {
    setFarms([...farms, newFarm])
    setSelectedCoordinates(null)
    setIsAddingFarm(false)
  }

  // Handle cancel adding farm
  const handleCancelAddFarm = () => {
    setSelectedCoordinates(null)
  }

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  // Handle polygon drawing toggle
  const handleToggleDrawMode = (enabled) => {
    setIsDrawingMode(enabled)
  }

  // Handle polygon creation/update
  const handlePolygonComplete = (polygonData) => {
    // Check if polygon with same coordinates exists (edit)
    const existingIndex = polygons.findIndex(p =>
      JSON.stringify(p.coordinates) === JSON.stringify(polygonData.coordinates)
    )

    if (existingIndex >= 0) {
      // Update existing
      const updated = [...polygons]
      updated[existingIndex] = polygonData
      setPolygons(updated)
    } else {
      // Add new
      setPolygons([...polygons, polygonData])
    }
  }

  // Handle polygon deletion
  const handleDeletePolygon = (polygonId) => {
    setPolygons(polygons.filter(p => p.id !== polygonId))
    if (selectedPolygon?.id === polygonId) {
      setSelectedPolygon(null)
    }
  }

  // Handle polygon selection
  const handleSelectPolygon = (polygon) => {
    setSelectedPolygon(polygon)
  }

  // Calculate filtered farm count for display
  const filteredFarmCount =
    filter === FILTERS.ALL
      ? farms.length
      : farms.filter((farm) => farm.status === filter).length

  return (
    <div className="app">
      <MapView
        farms={farms}
        filter={filter}
        isAddingFarm={isAddingFarm}
        onMapClick={handleMapClick}
        onFarmClick={(farm) => console.log('Farm clicked:', farm)}
        polygons={polygons}
        isDrawingMode={isDrawingMode}
        onDrawComplete={handlePolygonComplete}
        onPolygonClick={handleSelectPolygon}
      />

      <ControlPanel
        filter={filter}
        onFilterChange={handleFilterChange}
        farmCount={farms.length}
        filteredFarmCount={filteredFarmCount}
        polygons={polygons}
        isDrawingMode={isDrawingMode}
        onToggleDrawMode={handleToggleDrawMode}
        onDeletePolygon={handleDeletePolygon}
        onSelectPolygon={handleSelectPolygon}
      />

      <AddFarmButton
        onAddClick={handleAddFarmClick}
        isActive={isAddingFarm}
      />

      {selectedCoordinates && (
        <AddFarmModal
          coordinates={selectedCoordinates}
          farms={farms}
          onSave={handleSaveFarm}
          onCancel={handleCancelAddFarm}
        />
      )}
    </div>
  )
}

export default App
