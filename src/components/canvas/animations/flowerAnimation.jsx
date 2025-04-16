'use client'

import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimationStore } from '../animationManager'
import { triggerFlowersAdded, triggerAssembling } from '../../../hooks/useGameState'

export const FlowerAnimation = ({ objectId }) => {
  const flowerGroupRef = useRef()
  const stemRef = useRef()
  // Create refs at the top level, not in a callback
  const petal1Ref = useRef()
  const petal2Ref = useRef()
  const petal3Ref = useRef()
  const petal4Ref = useRef()
  const petal5Ref = useRef()
  const petal6Ref = useRef()
  const petal7Ref = useRef()
  const petal8Ref = useRef()

  // Store all petal refs in an array for easier access
  const petalRefs = [petal1Ref, petal2Ref, petal3Ref, petal4Ref, petal5Ref, petal6Ref, petal7Ref, petal8Ref]

  const { viewport } = useThree()
  const [animationComplete, setAnimationComplete] = useState(false)
  const [hasTriggeredStateChange, setHasTriggeredStateChange] = useState(false)

  useEffect(() => {
    console.log(`FlowerAnimation mounted for object ${objectId}`);
    return () => {
      console.log(`FlowerAnimation unmounted for object ${objectId}`);
    }
  }, [objectId]);

  // Animation loop
  useFrame((state, delta) => {
    if (!flowerGroupRef.current || !stemRef.current || animationComplete) return

    // Get object data from the animation store
    const object = useAnimationStore.getState().getObject(objectId)
    if (!object) return

    // Convert normalized positions to viewport positions
    const x = (object.position[0] * 2 - 1) * (viewport.width / 2)
    const y = (1 - object.position[1] * 2) * (viewport.height / 2)

    // Position the flower group
    flowerGroupRef.current.position.set(x, y, object.altitude || 0)

    // Animation based on elapsed time for stability
    const elapsedTime = state.clock.getElapsedTime()

    // Stem growth (0-0.5 seconds)
    const stemPhase = Math.min(1, elapsedTime / 0.5)
    stemRef.current.scale.y = stemPhase * 1.5 // Grow to 1.5 units tall
    stemRef.current.visible = stemPhase > 0

    // Flower blooming (0.4-1.0 seconds) with overlap
    const flowerPhase = elapsedTime > 0.4 ? Math.min(1, (elapsedTime - 0.4) / 0.6) : 0

    // Animate each petal
    petalRefs.forEach((petalRef, i) => {
      if (!petalRef.current) return

      // Scale petals based on flower phase
      const scale = flowerPhase * 0.4 // Max petal size
      petalRef.current.scale.set(scale, scale, scale)

      // Make petals visible when they start to grow
      petalRef.current.visible = flowerPhase > 0
    })

    // Sway the whole flower slightly
    if (elapsedTime > 0.5) {
      flowerGroupRef.current.rotation.z = Math.sin(elapsedTime * 2) * 0.05
    }

    // Set animation as complete after 1 second
    if (elapsedTime > 1.0 && !animationComplete) {
      setAnimationComplete(true)
      console.log(`Flower animation complete for object ${objectId}`);

      // Trigger the state change only once
      if (!hasTriggeredStateChange) {
        // triggerFlowersAdded()
        triggerAssembling()
        setHasTriggeredStateChange(true)
      }
    }
  })

  return (
    <group ref={flowerGroupRef}>
      {/* Stem */}
      <mesh
        ref={stemRef}
        position={[0, -0.75, 0]}
        scale={[0.1, 0, 1]}
        visible={false}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#2E8B57" side={THREE.DoubleSide} />
      </mesh>

      {/* Flower petals */}
      {petalRefs.map((petalRef, i) => (
        <mesh
          key={i}
          ref={petalRef}
          position={[0, 0, 0.01]}
          rotation={[0, 0, (i * Math.PI) / 4]}
          visible={false}
        >
          <circleGeometry args={[1, 3]} />
          <meshBasicMaterial color="#FF69B4" side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Flower center */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[0.15, 32]} />
        <meshBasicMaterial color="#FFFF00" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
} 