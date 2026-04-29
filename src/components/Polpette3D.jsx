import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// Polpetta su stuzzicadenti
function PolpettaConStuzzicadenti({ position, rotation = [0, 0, 0], scale = 1, baseColor = '#7a3a22' }) {
  const polpettaGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.5, 64, 64)
    const positions = geo.attributes.position
    const vertex = new THREE.Vector3()
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i)
      const noise = (Math.sin(vertex.x * 8) + Math.cos(vertex.y * 7) + Math.sin(vertex.z * 9)) * 0.04
      const noise2 = Math.sin(vertex.x * 20 + vertex.y * 15) * 0.02
      vertex.multiplyScalar(1 + noise + noise2)
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stuzzicadenti */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.012, 1.2, 8]} />
        <meshStandardMaterial color="#d4b886" roughness={0.7} />
      </mesh>
      {/* Punta sotto */}
      <mesh position={[0, -0.18, 0]} castShadow>
        <coneGeometry args={[0.012, 0.05, 8]} />
        <meshStandardMaterial color="#b89a6a" roughness={0.7} />
      </mesh>
      {/* Polpetta sopra lo stuzzicadenti */}
      <mesh position={[0, 0.5, 0]} geometry={polpettaGeo} castShadow receiveShadow>
        <meshStandardMaterial color={baseColor} roughness={0.85} metalness={0} />
      </mesh>
      {/* Glaze sugo (sottile) */}
      <mesh position={[0, 0.5, 0]} geometry={polpettaGeo} scale={1.005}>
        <meshStandardMaterial
          color="#c2553a"
          transparent
          opacity={0.32}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

// Piattino di carta paglia
function Piattino() {
  return (
    <group position={[0, -0.05, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[1.8, 1.7, 0.08, 64]} />
        <meshStandardMaterial color="#ede0c2" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.045, 0]}>
        <torusGeometry args={[1.78, 0.025, 16, 80]} />
        <meshStandardMaterial color="#d4c298" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.041, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.42, 64]} />
        <meshStandardMaterial color="#b04a32" opacity={0.4} transparent />
      </mesh>
    </group>
  )
}

// IMPORTANTE: questo componente DEVE stare DENTRO al Canvas perché usa useFrame
function SceneContent() {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12
    }
  })

  return (
    <group ref={ref}>
      <Piattino />

      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
        <PolpettaConStuzzicadenti
          position={[0, 0, 0]}
          rotation={[0.05, 0, -0.04]}
          scale={1.05}
          baseColor="#7a3a22"
        />
      </Float>

      <Float speed={1.4} rotationIntensity={0.05} floatIntensity={0.12}>
        <PolpettaConStuzzicadenti
          position={[-0.85, 0, 0.35]}
          rotation={[-0.06, 0.2, 0.1]}
          scale={0.95}
          baseColor="#6e3220"
        />
      </Float>

      <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.1}>
        <PolpettaConStuzzicadenti
          position={[0.9, 0, 0.25]}
          rotation={[0.04, -0.15, -0.08]}
          scale={1}
          baseColor="#854028"
        />
      </Float>
    </group>
  )
}

export default function Polpette3D() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2.2, 4.5], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.4}
        castShadow
        color="#fff5e0"
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 3, -2]} intensity={0.5} color="#ffb380" />
      <pointLight position={[0, -1, 3]} intensity={0.3} color="#c66d5e" />

      <SceneContent />

      <ContactShadows
        position={[0, -0.1, 0]}
        opacity={0.45}
        scale={8}
        blur={2.2}
        far={3}
        color="#2b1f15"
      />

      <Environment preset="sunset" />
    </Canvas>
  )
}
