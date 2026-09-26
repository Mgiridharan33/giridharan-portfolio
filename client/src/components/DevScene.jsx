import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import personalDetailsImage from "../assets/personal detail.png";
import projectShowcaseImage from "../assets/project cover.png";

function ProjectShowcase() {
  const texture = useTexture(projectShowcaseImage);
  texture.colorSpace = SRGBColorSpace;

  return (
    <mesh position={[0, 0.12, 0.115]}>
      <planeGeometry args={[3.825, 2.55]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Workstation({ reduced }) {
  return (
    <group position={[0, 0.18, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.78, 3.02, 0.2]} />
        <meshStandardMaterial color="#303b4d" roughness={0.3} metalness={0.65} />
      </mesh>
      <ProjectShowcase />
      <mesh position={[0, -1.64, -0.03]}>
        <boxGeometry args={[0.42, 0.48, 0.22]} />
        <meshStandardMaterial color="#343e50" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, -1.91, 0]}>
        <boxGeometry args={[1.55, 0.12, 0.82]} />
        <meshStandardMaterial color="#2b3547" roughness={0.28} metalness={0.72} />
      </mesh>
      <mesh position={[0, -1.52, 0.115]}>
        <boxGeometry args={[0.34, 0.025, 0.015]} />
        <meshBasicMaterial color="#5eead4" />
      </mesh>
    </group>
  );
}

function PhoneProfileScreen() {
  const texture = useTexture(personalDetailsImage);
  texture.colorSpace = SRGBColorSpace;

  return (
    <mesh position={[0, -0.02, 0.09]}>
      <planeGeometry args={[0.78, 1.397]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function PhoneDevice({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale} rotation={[0.02, -0.12, -0.035]}>
      <mesh>
        <boxGeometry args={[0.92, 1.94, 0.14]} />
        <meshStandardMaterial color="#303b4d" roughness={0.24} metalness={0.68} />
      </mesh>
      <mesh position={[0, 0, 0.075]}>
        <boxGeometry args={[0.82, 1.82, 0.025]} />
        <meshBasicMaterial color="#0b1422" />
      </mesh>
      <PhoneProfileScreen />
      <mesh position={[0, 0.83, 0.105]}>
        <boxGeometry args={[0.18, 0.035, 0.02]} />
        <meshBasicMaterial color="#101b2b" />
      </mesh>
    </group>
  );
}

function AccentOrb({ position, color, speed }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime() * speed;
    ref.current.rotation.x = time;
    ref.current.rotation.y = time * 0.8;
  });

  return (
    <mesh ref={ref} position={position} scale={[0.32, 0.5, 0.32]}>
      <icosahedronGeometry args={[0.28, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.28} roughness={0.3} metalness={0.5} />
    </mesh>
  );
}

function SceneContents({ reduced, isMobile, scrollRef }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer, clock } = state;
    const scrollValue = scrollRef?.get ? scrollRef.get() : 0;
    const motionScale = reduced ? 0 : 1;

    groupRef.current.rotation.y = motionScale * (pointer.x * 0.16 + scrollValue * 0.26 + Math.sin(clock.getElapsedTime() * 0.12) * 0.018);
    groupRef.current.rotation.x = motionScale * pointer.y * 0.08;
    groupRef.current.position.y = motionScale * scrollValue * -0.12;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 4, 5]} intensity={1.3} color="#dbeafe" />
      <pointLight position={[-4, 1, 1]} intensity={1.1} color="#5eead4" />
      <pointLight position={[4, -1, -1]} intensity={0.9} color="#fb923c" />

      <Float speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.15} floatIntensity={reduced ? 0 : 0.6}>
        <Workstation reduced={reduced} />
      </Float>

      <>
        <PhoneDevice
          position={isMobile ? [-1.95, -0.42, 0.72] : [-3.12, -0.48, 0.55]}
          scale={isMobile ? 1.02 : 0.92}
        />
        {!reduced && (
          <>
          <AccentOrb position={[-2.6, 1.55, -0.3]} color="#5eead4" speed={0.32} />
          <AccentOrb position={[2.55, -1.05, 0.35]} color="#a78bfa" speed={-0.28} />
          </>
        )}
      </>
    </group>
  );
}

function DevScene({ scrollRef }) {
  const isMobile = useMediaQuery("(max-width: 720px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const reduced = isMobile || prefersReducedMotion;

  return (
    <div className="dev-scene" aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ position: [0, 0, isMobile ? 6.9 : 5.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContents reduced={reduced} isMobile={isMobile} scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default DevScene;
