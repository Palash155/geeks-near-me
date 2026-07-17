"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type TechCanvasProps = {
  reducedMotion: boolean;
  onReady: () => void;
};

const branches: [number, number, number][][] = [
  [
    [0, -0.72, 0.28],
    [0, 0.88, 0.28],
  ],
  [
    [0, -0.08, 0.28],
    [-0.72, 0.54, 0.28],
    [-0.72, 0.98, 0.28],
  ],
  [
    [0, 0.15, 0.28],
    [0.78, 0.72, 0.28],
    [0.78, 1.02, 0.28],
  ],
];

const nodePositions: [number, number, number][] = [
  [0, 0.98, 0.31],
  [-0.72, 1.08, 0.31],
  [0.78, 1.12, 0.31],
];

function SignalNode({ position, index, reducedMotion }: { position: [number, number, number]; index: number; reducedMotion: boolean }) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reducedMotion || !ring.current) return;
    const phase = (clock.elapsedTime * 0.65 + index * 0.8) % 1;
    const scale = 1 + phase * 1.8;
    ring.current.scale.setScalar(scale);
    const material = ring.current.material as THREE.MeshBasicMaterial;
    material.opacity = (1 - phase) * 0.42;
  });

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#35d07f" emissive="#10a050" emissiveIntensity={2.4} />
      </mesh>
      <mesh ref={ring} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.18, 0.205, 40]} />
        <meshBasicMaterial color="#35d07f" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function LogoMachine({ reducedMotion }: { reducedMotion: boolean }) {
  const machine = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!machine.current || reducedMotion) return;
    machine.current.rotation.y = THREE.MathUtils.lerp(machine.current.rotation.y, state.pointer.x * 0.18, 0.035);
    machine.current.rotation.x = THREE.MathUtils.lerp(machine.current.rotation.x, -state.pointer.y * 0.1, 0.035);
    machine.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.08;
    if (orbit.current) orbit.current.rotation.z += delta * 0.08;
  });

  return (
    <group ref={machine} rotation={[-0.03, -0.12, 0]}>
      <RoundedBox args={[4.6, 3.2, 0.34]} radius={0.2} smoothness={6}>
        <meshStandardMaterial color="#087bc2" metalness={0.48} roughness={0.3} />
      </RoundedBox>

      <RoundedBox args={[4.13, 2.73, 0.18]} radius={0.14} smoothness={5} position={[0, 0, 0.22]}>
        <meshStandardMaterial color="#eaf8ff" metalness={0.08} roughness={0.42} emissive="#dff5ff" emissiveIntensity={0.22} />
      </RoundedBox>

      {branches.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index === 0 ? "#35d07f" : "#21bd76"}
          lineWidth={3.2}
          transparent
          opacity={0.96}
        />
      ))}

      {nodePositions.map((position, index) => (
        <SignalNode key={index} position={position} index={index} reducedMotion={reducedMotion} />
      ))}

      <mesh position={[0, -2.05, 0]}>
        <cylinderGeometry args={[0.13, 0.2, 0.9, 32]} />
        <meshStandardMaterial color="#087bc2" metalness={0.78} roughness={0.2} />
      </mesh>

      <RoundedBox args={[1.65, 0.22, 0.66]} radius={0.1} smoothness={5} position={[0, -2.48, 0]}>
        <meshStandardMaterial color="#08689f" metalness={0.8} roughness={0.22} />
      </RoundedBox>

      <mesh ref={orbit} rotation={[1.2, 0.2, 0]} scale={[1.2, 1.2, 1.2]}>
        <torusGeometry args={[2.9, 0.007, 8, 160]} />
        <meshBasicMaterial color="#2b9fcc" transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

export default function TechCanvas({ reducedMotion, onReady }: TechCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 7.4], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={onReady}
    >
      <ambientLight intensity={1.65} />
      <pointLight position={[-4, 4, 6]} intensity={18} color="#8bd8ff" distance={14} />
      <pointLight position={[4, 1, 5]} intensity={15} color="#8be5b4" distance={12} />
      <LogoMachine reducedMotion={reducedMotion} />
    </Canvas>
  );
}
