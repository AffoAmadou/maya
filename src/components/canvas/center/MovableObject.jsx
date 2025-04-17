import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';

export const MovableObject = ({ id, position, onPositionChange }) => {
    const meshRef = useRef();
    const { viewport } = useThree();

    const bind = useDrag(({ offset: [x, y] }) => {
        const newX = (x / viewport.width) * 2;
        const newY = -(y / viewport.height) * 2;

        if (meshRef.current) {
            meshRef.current.position.x = newX;
            meshRef.current.position.y = newY;

            onPositionChange({
                id,
                x: newX,
                y: newY
            });
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            {...bind()}
        >
            <planeGeometry args={[0.08, 0.08]} />
            <meshBasicMaterial color={id === 'sun' ? '#ffd700' : '#ffffff'} transparent />
        </mesh>
    );
}; 