'use client'

import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export const LeftPanel = (props) => {
    const leftPanelRef = useRef()
    const texture = useTexture('../../../img/sun.png')
    const { viewport } = useThree()

    useEffect(() => {
        if (texture) {
            texture.colorSpace = THREE.SRGBColorSpace
        }
    }, [texture])

    return (
        <group>
            <mesh ref={leftPanelRef} scale={[viewport.width, viewport.height, 1]}>
                <planeGeometry args={[0.57, 0.57]} />
                <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}