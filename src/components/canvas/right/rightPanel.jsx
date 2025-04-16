'use client'

import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useControls } from 'leva'

export const RightPanel = (props) => {
    const rightPanelRef = useRef()
    const texture = useTexture('../../../img/tryptique/moon.jpeg')
    const { viewport } = useThree()

    const { scale, opacity } = useControls('Right Panel', {
        scale: {
            value: [viewport.width, viewport.height, 1],
            step: 0.01,
            label: 'Scale'
        },
        opacity: {
            value: 1,
            min: 0,
            max: 1,
            step: 0.01,
            label: 'Opacity'
        }
    })

    // Apply colorspace correction
    useEffect(() => {
        if (texture) {
            texture.colorSpace = THREE.SRGBColorSpace
        }
    }, [texture])

    return (
        <group>
            <mesh ref={rightPanelRef} scale={scale}>
                <planeGeometry args={[0.57, 0.57]} />
                <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={opacity} />
            </mesh>
        </group>
    )
} 