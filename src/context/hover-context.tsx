"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface HoverContextType {
  is3DHovered: boolean
  set3DHovered: (hovered: boolean) => void
}

const HoverContext = createContext<HoverContextType | undefined>(undefined)

export function HoverProvider({ children }: { children: ReactNode }) {
  const [is3DHovered, set3DHovered] = useState(false)

  return (
    <HoverContext.Provider value={{ is3DHovered, set3DHovered }}>
      {children}
    </HoverContext.Provider>
  )
}

export function useHover() {
  const context = useContext(HoverContext)
  if (context === undefined) {
    throw new Error("useHover must be used within a HoverProvider")
  }
  return context
}
