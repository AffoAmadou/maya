'use client'

import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useAnimationStore, generateMockData } from '../animationManager'
import { StarAnimation } from '../animations/starAnimation'
import { FlowerAnimation } from '../animations/flowerAnimation'
import { Sun } from './elements/sun'
import { Moon } from './elements/moon'
import { Temple } from './elements/temple'
import { useGameState } from '../../../hooks/useGameState'
import { useControls } from 'leva'

export const Central = (props) => {
    const centralRef = useRef()
    const { viewport } = useThree()
    const { state, addFlowers } = useGameState()

    const { planeColor } = useControls('Central', {
        planeColor: {
            value: '#04042e',
            label: 'Background Color'
        }
    })

    // Initialize animation system with mock data on component mount
    useEffect(() => {
        console.log('Central mounted, generating mock data...');
        generateMockData()
        console.log('Starting in Introduction state');
        addFlowers();
        return () => {
            console.log('Central unmounted');
        }
    }, [])

    // Log state changes
    useEffect(() => {
        console.log('Current state:', state.value);
        console.log('State context:', state.context);
    }, [state.value]);

    // Get all objects from the animation store
    const objects = useAnimationStore((state) => state.objects)

    return (
        <group position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
            <mesh position={[0, 0, -1]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color={planeColor} />
            </mesh>
            <Sun position={[-0.1, 0, 0]} />
            <Moon position={[0.1, 0, 0.6]} />
            <Temple position={[0, 0, -0.8]} />

            {/* State indicator */}
            <mesh position={[0, 0.8, 0]}>
                <planeGeometry args={[0.5, 0.1]} />
                <meshBasicMaterial color="black" />
            </mesh>

            {/* Render flower animations for each flower object */}
            {/* {Object.keys(objects)
                .filter(id => id.startsWith('flower'))
                .map(id => (
                    <FlowerAnimation key={id} objectId={id} />
                ))} */}
        </group>
    )
}
