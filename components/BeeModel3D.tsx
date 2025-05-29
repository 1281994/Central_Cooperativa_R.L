"use client"

import { Suspense, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

// Componente de la abeja volando SIEMPRE
function FlyingBee({ url }: { url: string }) {
  const group = useRef<any>(null)
  const { scene, animations } = useGLTF(url)
  const { actions, mixer, names } = useAnimations(animations, group)
  const flyClipNameRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    const flyClipName =
      names?.find((n) =>
        n.toLowerCase().includes("fly") ||
        n.toLowerCase().includes("vuelo") ||
        n.toLowerCase().includes("volar")
      ) || names?.[0]

    flyClipNameRef.current = flyClipName

    Object.values(actions).forEach((action) => action?.stop())

    if (flyClipName && actions[flyClipName]) {
      actions[flyClipName].reset().play()
      actions[flyClipName].setLoop(THREE.LoopRepeat, Infinity)
    }
  }, [actions, names])

  useFrame((_, delta) => {
    if (mixer) mixer.update(delta)
    const flyClipName = flyClipNameRef.current
    if (flyClipName && actions[flyClipName] && !actions[flyClipName].isRunning()) {
      actions[flyClipName].reset().play()
      actions[flyClipName].setLoop(THREE.LoopRepeat, Infinity)
    }
  })

  return (
    <group ref={group}>
      {/* Más pequeña y centrada */}
      <primitive
        object={scene}
        scale={[1, 1, 1]}           // <-- más pequeña
        position={[0, -0.8, 0]}        // <-- centrada verticalmente
        rotation={[0, -Math.PI / 2, 0]} // mira a la izquierda
      />
    </group>
  )
}

interface BeeModel3DProps {
  width?: string
  height?: string
  className?: string
}

export function BeeModel3D({ width = "100vw", height = "400px", className = "" }: BeeModel3DProps) {
  return (
    <div className={className} style={{ width, height }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={null}>
          <FlyingBee url="/assets/demon_bee_full_texture.glb" />
        </Suspense>
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload("/assets/demon_bee_full_texture.glb")