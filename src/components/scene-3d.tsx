"use client"
import * as THREE from 'three'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial, shaderMaterial } from '@react-three/drei'
import { Suspense, useRef, useLayoutEffect, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

// --- Ripple Shader ---
const RippleShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorstart: new THREE.Color('#ffffff'), // Will be overridden by theme or props if needed
    uColorend: new THREE.Color('#f0f0f0'),
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
      vec2 st = vUv;
      float dist = distance(st, uMouse);
      
      // Ripple effect calculation
      float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.01;
      
      // Decay ripple based on distance (only show near mouse)
      float decay = max(0.0, 1.0 - dist * 3.0); 
      
      // Apply subtle distortion
      vec2 distortedUV = st + ripple * decay;

      gl_FragColor = vec4(0.0, 0.0, 0.0, decay * 0.05); // Very subtle shadow/darkening
    }
  `
)

extend({ RippleShaderMaterial })

function RippleBackground() {
    const materialRef = useRef<any>(null)
    const { viewport, mouse } = useThree()

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime()
            // Convert normalized mouse (-1 to 1) to UV space (0 to 1) approximatively for the shader
             materialRef.current.uMouse = new THREE.Vector2(
                (state.mouse.x + 1) / 2,
                (state.mouse.y + 1) / 2
            )
        }
    })

    return (
        <mesh position={[0, 0, -2]}>
            <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
            {/* @ts-ignore */}
            <rippleShaderMaterial ref={materialRef} transparent opacity={0.5} />
        </mesh>
    )
}

// --- Particles ---
function Particles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const { viewport } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
    </instancedMesh>
  )
}

import { useHover } from "@/context/hover-context"

function AnimatedModel() {
    const meshRef = useRef<THREE.Mesh>(null!)
    const groupRef = useRef<THREE.Group>(null!)
    const materialRef = useRef<any>(null!)
    const { viewport } = useThree()
    const [hovered, setHovered] = useState(false)
    const { set3DHovered } = useHover()
    
    // ... existing colorState memo ...
    const colorState = useMemo(() => ({
        current: new THREE.Color("#007bff"),
        targetGreen: new THREE.Color("#00ff88"), // Green
        targetBlue: new THREE.Color("#007bff"),   // Blue
    }), [])

    useLayoutEffect(() => {
        if (!groupRef.current) return;
        
        ScrollTrigger.getAll().forEach(t => t.kill());

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // 1. Hero -> Projects
        tl.to(groupRef.current.position, {
            x: viewport.width / 3.5, 
            y: -viewport.height * 0.1,
            z: 0
        }, "start")
        .to(groupRef.current.scale, {
            x: 0.8, y: 0.8, z: 0.8
        }, "start")
        
        // 2. Projects -> Skills
        .to(groupRef.current.position, {
            x: -viewport.width / 3.5,
            y: -1,
            z: 0,
            duration: 1
        }, "center")
        .to(groupRef.current.rotation, {
            y: Math.PI,
            duration: 1
        }, "center")

        // 3. Skills -> Contact (Left side)
        .to(groupRef.current.position, {
            x: -viewport.width / 3, 
            y: 0,
            z: 1,
            duration: 1
        }, "end")
        .to(groupRef.current.scale, {
            x: 1.2, y: 1.2, z: 1.2
        }, "end")

        // 4. Contact -> Footer (Disappear)
        .to(groupRef.current.scale, {
            x: 0.8, y: 0.8, z: 0.8 // Keep it visible but maybe smaller? Or just keep previous scale.
        }, "end") // Keep scale
        .to(materialRef.current, {
             opacity: 0, // Fade out opacity at the very end
             duration: 0.5
        }, "end")

        return () => {
             tl.kill();
             ScrollTrigger.getAll().forEach(t => t.kill());
        }
    }, [viewport])

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        
        // Rotation
        meshRef.current.rotation.x += delta * 0.1
        meshRef.current.rotation.y += delta * (hovered ? 0.3 : 0.2) // Very slow rotation even on hover

        // Color & Opacity Transition
        if (materialRef.current) {
            const targetColor = hovered ? colorState.targetGreen : colorState.targetBlue;
            materialRef.current.color.lerp(targetColor, delta * 2);
            
            // Opacity logic: "become very light" -> reduce opacity or increase lightness?
            // User said "reduce its opacity... become very light".
            // MeshDistortMaterial supports transmission or opacity if transparent=true.
            // Let's assume standard material opacity.
            // But standard material is better with lightness for "light".
            // Let's toggle opacity.
            materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, hovered ? 0.6 : 1, delta * 2);
        }
    })

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh 
                    ref={meshRef}
                    onPointerOver={() => {
                        setHovered(true)
                        set3DHovered(true)
                        document.body.style.cursor = 'pointer'
                    }}
                    onPointerOut={() => {
                        setHovered(false)
                        set3DHovered(false)
                        document.body.style.cursor = 'auto'
                    }}
                >
                    <icosahedronGeometry args={[1.2, 0]} />
                    <MeshDistortMaterial
                        ref={materialRef}
                        color={'#007bff'} 
                        speed={hovered ? 2 : 1.5}
                        distort={hovered ? 0.5 : 0.3}
                        roughness={0.2}
                        metalness={0.8}
                        transparent={true} // Enable transparency for opacity changes
                        opacity={1}
                    />
                </mesh>
            </Float>
        </group>
    )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        className="!pointer-events-none"
        camera={{ position: [0, 0, 5], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ alpha: true }}
        eventSource={typeof window !== 'undefined' ? (document.body as HTMLElement) : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Suspense fallback={null}>
             <Environment preset="city" />
             <RippleBackground />
             <Particles count={200} />
             <AnimatedModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
