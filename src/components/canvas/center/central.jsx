'use client'

import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { useGameState } from '../../../hooks/useGameState'
import { useControls } from 'leva'
import { MovableObject } from './MovableObject'
import { Sun } from './elements/Sun'
import { Moon } from './elements/Moon'
import { Temple } from './elements/Temple'

export const Central = (props) => {
    const { viewport } = useThree()
    const { state, checkAssembling } = useGameState()
    const [objects, setObjects] = useState([])

    // Inizializza gli oggetti
    useEffect(() => {
        setObjects([
            { id: 'sun', x: -0.1, y: 0 },
            { id: 'moon', x: 0.1, y: 0 }
        ])
    }, [])

    // Gestisce il cambiamento di posizione degli oggetti
    const handlePositionChange = (updatedObject) => {
        setObjects(prevObjects => {
            const newObjects = prevObjects.map(obj =>
                obj.id === updatedObject.id ? updatedObject : obj
            )
            // Controlla immediatamente l'assemblaggio
            checkAssembling(newObjects)
            return newObjects
        })
    }

    return (
        <group position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
            {/* Sfondo */}
            <mesh position={[0, 0, -1]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color="#04042e" />
            </mesh>
            <Sun position={[-0.1, 0, 0]} />
            <Moon position={[0.1, 0, 0.6]} />
            <Temple position={[0, 0, -0.8]} />

            {/* Oggetti mobili */}
            {objects.map(obj => (
                <MovableObject
                    key={obj.id}
                    id={obj.id}
                    position={[obj.x, obj.y, 0]}
                    onPositionChange={handlePositionChange}
                />
            ))}
        </group>
    )
}
