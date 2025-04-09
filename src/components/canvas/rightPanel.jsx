'use client'

import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export const RightPanel = (props) => {
    const rightPanelRef = useRef()
    const texture = useTexture('../../../img/moon.jpeg')
    const { viewport } = useThree()

    // Apply colorspace correction
    useEffect(() => {
        if (texture) {
            texture.colorSpace = THREE.SRGBColorSpace
        }
    }, [texture])

    return (
        <group>
            <mesh ref={rightPanelRef} scale={[viewport.width, viewport.height, 1]}>
                <planeGeometry args={[0.57, 0.57]} />
                <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
} 