import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import GSAP from 'gsap'
import { useControls } from 'leva'

export const Moon = ({ position: initialPosition }) => {
    const meshref = useRef(null)
    const materialref = useRef(null)
    const texture = useTexture('../../../img/center/Lune_Mini.png')

    const { scaleX, scaleY, scaleZ, opacity, geometryWidth, geometryHeight, posX, posY, posZ } = useControls('Moon', {
        scaleX: {
            value: 1,
            min: 0.1,
            max: 3,
            step: 0.001,
            label: 'Scale X'
        },
        scaleY: {
            value: 1,
            min: 0.1,
            max: 3,
            step: 0.001,
            label: 'Scale Y'
        },
        scaleZ: {
            value: 1,
            min: 0.1,
            max: 3,
            step: 0.001,
            label: 'Scale Z'
        },
        opacity: {
            value: 1,
            min: 0,
            max: 1,
            step: 0.001,
            label: 'Opacity'
        },
        geometryWidth: {
            value: 0.0695,
            min: 0.01,
            max: 1,
            step: 0.001,
            label: 'Width'
        },
        geometryHeight: {
            value: 0.1577,
            min: 0.01,
            max: 1,
            step: 0.001,
            label: 'Height'
        },
        posX: {
            value: initialPosition?.[0] || 0.1,
            min: -2,
            max: 2,
            step: 0.001,
            label: 'Position X'
        },
        posY: {
            value: initialPosition?.[1] || -0.17,
            min: -2,
            max: 2,
            step: 0.001,
            label: 'Position Y'
        },
        posZ: {
            value: initialPosition?.[2] || 0.6,
            min: -2,
            max: 2,
            step: 0.001,
            label: 'Position Z'
        }
    })

    const scale = [scaleX, scaleY, scaleZ]
    const geometry = [geometryWidth, geometryHeight]
    const position = [posX, posY, posZ]

    useEffect(() => {
    }, [])

    const handleHover = (e) => {
    }

    const handleNonHover = () => {
    }

    return (
        <>
            <mesh ref={meshref} position={position} scale={scale} onPointerOut={handleNonHover} onPointerOver={(e) => handleHover(e)} >
                <planeGeometry args={[...geometry, 10, 10]} />
                <meshBasicMaterial opacity={opacity} ref={materialref} side={THREE.DoubleSide} transparent map={texture} />
            </mesh>
        </>
    )
}