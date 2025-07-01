import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { Planet } from './Planet';

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#a855f7" />
      <pointLight position={[-10, -5, -15]} intensity={1.5} color="#22d3ee" />
      
      <Stars radius={150} depth={50} count={7000} factor={5} saturation={0} fade speed={1.5} />
      <Sparkles count={100} scale={10} size={6} speed={0.4} color="#ff79c6" />

      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.3} 
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
      <Planet />
    </Canvas>
  );
}
