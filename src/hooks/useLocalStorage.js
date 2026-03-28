import { useState, useEffect } from 'react'

/**
 * Custom hook for managing state with localStorage persistence
 * @param {string} key - localStorage key
 * @param {*} initialValue - initial value if localStorage is empty
 * @returns {[*, Function]} - state value and setter
 */
export const useLocalStorage = (key, initialValue) => {
  // Initialize state from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading from localStorage [${key}]:`, error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error writing to localStorage [${key}]:`, error)
    }
  }

  return [storedValue, setValue]
}
