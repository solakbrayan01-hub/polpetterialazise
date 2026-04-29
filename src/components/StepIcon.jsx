import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// Macinatore (cilindro con manovella)
function Macinatore() {
  const handleRef = useRef()
  useFrame((state) => {
    if (handleRef.current) handleRef.current.rotation.z = state.clock.elapsedTime * 2
  })
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
        <meshStandardMaterial color="#8a8a8a" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.6, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#6a6a6a" roughness={0.3} metalness={0.8} />
      </mesh>
      <group ref={handleRef} position={[0.6, 0, 0]}>
        <mesh position={[0.3, 0, 0]}>
          <boxGeometry args={[0.6, 0.08, 0.08]} />
          <meshStandardMaterial color="#5a3a22" roughness={0.7} />
        </mesh>
        <mesh position={[0.55, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#5a3a22" roughness={0.7} />
        </mesh>
      </group>
    </group>
  )
}

// Mani che impastano (sfera che pulsa, simboleggia l'impasto)
function Impasto() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08
      ref.current.scale.set(s, s * 0.95, s)
      ref.current.rotation.y += 0.01
    }
  })
  
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.7, 32, 32)
    const positions = geo.attributes.position
    const vertex = new THREE.Vector3()
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i)
      const noise = (Math.sin(vertex.x * 5) + Math.cos(vertex.y * 6)) * 0.06
      vertex.multiplyScalar(1 + noise)
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }
    geo.computeVertexNormals()
    return geo
  }, [])
  
  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color="#a8765a" roughness={0.9} />
    </mesh>
  )
}

// Pentola con coperchio che bolle
function Pentola() {
  const lidRef = useRef()
  const steamRef = useRef()
  
  useFrame((state) => {
    if (lidRef.current) {
      lidRef.current.position.y = 0.5 + Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 0.05
      lidRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.05
    }
  })

  return (
    <group>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.7, 0.6, 0.8, 32]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Manici */}
      <mesh position={[0.85, -0.1, 0]}>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[-0.85, -0.1, 0]}>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      {/* Coperchio */}
      <group ref={lidRef} position={[0, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.72, 0.72, 0.1, 32]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#5a3a22" roughness={0.7} />
        </mesh>
      </group>
    </group>
  )
}

// Polpetta finale impiattata con basilico
function Servita() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005
    }
  })

  const polpettaGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.4, 32, 32)
    const positions = geo.attributes.position
    const vertex = new THREE.Vector3()
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i)
      const noise = (Math.sin(vertex.x * 8) + Math.cos(vertex.y * 7)) * 0.04
      vertex.multiplyScalar(1 + noise)
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  const leafGeo = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.18, 0.1, 0.25, 0.35, 0, 0.5)
    shape.bezierCurveTo(-0.25, 0.35, -0.18, 0.1, 0, 0)
    return new THREE.ShapeGeometry(shape, 12)
  }, [])

  return (
    <group ref={ref}>
      {/* Piatto */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.9, 0.85, 0.08, 32]} />
        <meshStandardMaterial color="#ede0c2" roughness={0.5} />
      </mesh>
      {/* Sugo */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.75, 0.7, 0.04, 32]} />
        <meshStandardMaterial color="#a8443a" roughness={0.3} />
      </mesh>
      {/* Polpetta */}
      <mesh position={[0, 0.05, 0]} geometry={polpettaGeo}>
        <meshStandardMaterial color="#7a3a22" roughness={0.85} />
      </mesh>
      {/* Foglia di basilico sopra */}
      <mesh position={[0.15, 0.4, 0.1]} rotation={[0, 0, 0.3]} geometry={leafGeo}>
        <meshStandardMaterial color="#5c6b3a" side={THREE.DoubleSide} roughness={0.7} />
      </mesh>
    </group>
  )
}

const COMPONENTS = {
  macinatore: Macinatore,
  impasto: Impasto,
  pentola: Pentola,
  servita: Servita,
}

export default function StepIcon({ type }) {
  const Component = COMPONENTS[type]
  return (
    <Canvas
      camera={{ position: [0, 0.5, 3], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} color="#fff5e0" />
      <directionalLight position={[-2, 2, -2]} intensity={0.4} color="#ffb380" />
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <Component />
      </Float>
    </Canvas>
  )
}
