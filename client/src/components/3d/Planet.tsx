import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader } from 'three';
import planetTexture from '../../assets/planet_texture.jpg'; // Ensure you have a texture file here

export function Planet() {
  const meshRef = useRef<Mesh>(null!);
  const texture = useLoader(TextureLoader, planetTexture);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += delta * 0.05;
      // Subtle bobbing motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.6} 
        metalness={0.2} 
        emissive="#222222"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}
