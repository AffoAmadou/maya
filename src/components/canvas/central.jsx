'use client'

import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useAnimationStore, generateMockData } from './animationManager'
import { StarAnimation } from './animations/starAnimation'
import { FlowerAnimation } from './animations/flowerAnimation'

export const Central = (props) => {
    const centralRef = useRef()
    const { viewport } = useThree()

    // Initialize animation system with mock data on component mount
    useEffect(() => {
        // Generate mock data for testing
        generateMockData()

        // You would replace this with real beacon data in production
        // For example, connect to a WebSocket or API for real-time updates

        // Cleanup function
        return () => {
            // Any cleanup needed
        }
    }, [])

    // Get all objects from the animation store
    const objects = useAnimationStore((state) => state.objects)

    return (
        <group>
            {/* Background plane */}
            <mesh position={[0, 0, 0]} ref={centralRef} scale={[viewport.width, viewport.height, 1]}>
                <planeGeometry args={[0.57, 0.57]} />
                <meshBasicMaterial side={THREE.DoubleSide} />
            </mesh>

            {/* Render star animations for each star object */}
            {Object.keys(objects)
                .filter(id => id.startsWith('star'))
                .map(id => (
                    <StarAnimation key={id} objectId={id} />
                ))
            }

            {/* Render flower animations for each flower object */}
            {Object.keys(objects)
                .filter(id => id.startsWith('flower'))
                .map(id => (
                    <FlowerAnimation key={id} objectId={id} />
                ))
            }
        </group>
    )
}
