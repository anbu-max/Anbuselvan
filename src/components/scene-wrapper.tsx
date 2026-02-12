"use client"

import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("@/components/scene-3d"), { 
    ssr: false   
})

export default function SceneWrapper() {
    return <Scene3D />
}
