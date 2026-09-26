import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useMediaQuery } from "../hooks/useMediaQuery.js";

// The main rotating shape. Reacts gently to pointer position for a subtle
// parallax feel, and drifts on its own via <Float>.
function CenterpieceShape() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer, clock } = state;
    const t = clock.getElapsedTime();

    // Base rotation + a small pointer-driven offset (parallax)
    groupRef.current.rotation.y = t * 0.18 + pointer.x * 0.4;
    groupRef.current.rotation.x = t * 0.08 + pointer.y * 0.25;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#5eead4"
          wireframe
          emissive="#5eead4"
          emissiveIntensity={0.35}
          roughness={0.4}
        />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#8b7cf6"
          transparent
          opacity={0.5}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

function OrbitingShape({ radius, speed, size, color, offset = 0 }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    if (!ref.current) return;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * (radius * 0.5), Math.sin(t) * radius);
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 0.6;
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.35} />
    </mesh>
  );
}

function SceneContents({ reduced }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={1.1} color="#5eead4" />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#8b7cf6" />

      <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 1.1}>
        <CenterpieceShape />
      </Float>

      {!reduced && (
        <>
          <OrbitingShape radius={2.6} speed={0.35} size={0.22} color="#5eead4" />
          <OrbitingShape radius={3.1} speed={-0.25} size={0.16} color="#8b7cf6" offset={2} />
          <OrbitingShape radius={2.2} speed={0.5} size={0.13} color="#e8e9ed" offset={4} />
        </>
      )}

      {!reduced && <Sparkles count={40} scale={6} size={1.4} speed={0.25} color="#5eead4" opacity={0.5} />}
    </>
  );
}

function HeroScene() {
  const isMobile = useMediaQuery("(max-width: 720px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const reduced = isMobile || prefersReducedMotion;

  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContents reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HeroScene;
