import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import GSAP from 'gsap'
import { useControls } from 'leva'

export const Temple = ({ position: initialPosition }) => {
    const meshref = useRef(null)
    const materialref = useRef(null)
    const texture = useTexture('../../../img/center/Temple.png')

    const { scaleX, scaleY, scaleZ, opacity, geometryWidth, geometryHeight, posX, posY, posZ } = useControls('Temple', {
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
            value: 0.68,
            min: 0.01,
            max: 1,
            step: 0.001,
            label: 'Geometry Width'
        },
        geometryHeight: {
            value: 0.49,
            min: 0.01,
            max: 1,
            step: 0.001,
            label: 'Geometry Height'
        },
        posX: {
            value: -0.3,
            min: -2,
            max: 2,
            step: 0.001,
            label: 'Position X'
        },
        posY: {
            value: initialPosition?.[1] || -0.1,
            min: -2,
            max: 2,
            step: 0.001,
            label: 'Position Y'
        },
        posZ: {
            value: initialPosition?.[2] || -0.8,
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
                <planeGeometry args={[...geometry, 100, 100]} />
                <meshBasicMaterial opacity={opacity} ref={materialref} side={THREE.DoubleSide} transparent map={texture} />
            </mesh>
        </>
    )
}