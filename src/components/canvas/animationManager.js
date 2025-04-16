'use client'

import { create } from 'zustand'

// Animation manager store using Zustand for state management
export const useAnimationStore = create((set, get) => ({
  // Track objects and their positions
  objects: {},
  
  // Register a new object or update its position
  updateObjectPosition: (id, position, altitude) => {
    set((state) => ({
      objects: {
        ...state.objects,
        [id]: {
          ...state.objects[id],
          id,
          position,
          altitude,
          timestamp: Date.now()
        }
      }
    }))
  },
  
  // Remove an object
  removeObject: (id) => {
    set((state) => {
      const newObjects = { ...state.objects }
      delete newObjects[id]
      return { objects: newObjects }
    })
  },

  // Get all object data
  getObjects: () => get().objects,
  
  // Get a specific object
  getObject: (id) => get().objects[id]
}))

// Mock data generator for testing
export const generateMockData = () => {
  const animationStore = useAnimationStore.getState()
  
  // Sample mock data - simulates beacons being placed on the wall
  const mockObjects = [
    { id: 'star1', position: [0.2, 0.3], altitude: 0.1 }, // x, y as normalized coordinates (0-1)
    { id: 'flower1', position: [0.2, 0.7], altitude: 0.1 }, // x, y as normalized coordinates (0-1)
  ]
  
  // Register mock objects
  mockObjects.forEach(obj => {
    animationStore.updateObjectPosition(obj.id, obj.position, obj.altitude)
  })
  
  console.log('Mock data generated:', animationStore.getObjects())
} 