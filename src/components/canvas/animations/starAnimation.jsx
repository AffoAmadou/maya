'use client'

import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimationStore } from '../animationManager'

// Simple star animation that grows from zero to full size
export const StarAnimation = ({ objectId }) => {
  const starRef = useRef()
  const { viewport } = useThree()
  const [scale, setScale] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const targetScale = 1.0 // Target scale for the animation
  
  // Animation loop
  useFrame((state, delta) => {
    if (!starRef.current || !isAnimating) return
    
    // Get object data from the animation store
    const object = useAnimationStore.getState().getObject(objectId)
    if (!object) return
    
    // Convert normalized positions to viewport positions
    const x = (object.position[0] * 2 - 1) * (viewport.width / 2)
    const y = (1 - object.position[1] * 2) * (viewport.height / 2)
    
    // Set the star position to the beacon position
    starRef.current.position.x = x
    starRef.current.position.y = y
    starRef.current.position.z = object.altitude
    
    // Grow the star from 0 to target size
    if (scale < targetScale) {
      const newScale = scale + delta * 2 // Adjust the speed by changing the multiplier
      setScale(newScale > targetScale ? targetScale : newScale)
      
      // Apply the scale
      starRef.current.scale.set(newScale, newScale, newScale)
    } else {
      // Animation complete
      setIsAnimating(false)
    }
  })
  
  // Create a star shape geometry
  const starShape = () => {
    const shape = new THREE.Shape()
    const outerRadius = 0.5
    const innerRadius = 0.2
    const spikes = 5
    
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI / spikes) * i
      
      if (i === 0) {
        shape.moveTo(radius * Math.cos(angle), radius * Math.sin(angle))
      } else {
        shape.lineTo(radius * Math.cos(angle), radius * Math.sin(angle))
      }
    }
    
    shape.closePath()
    
    return shape
  }
  
  return (
    <mesh ref={starRef} scale={[0, 0, 0]}>
      <shapeGeometry args={[starShape()]} />
      <meshBasicMaterial color={'#FFD700'} side={THREE.DoubleSide} />
    </mesh>
  )
} 