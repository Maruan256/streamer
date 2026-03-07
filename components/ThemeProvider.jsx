"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children, initialTheme }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    // try load persisted tenant
    const saved = localStorage.getItem("tenant-theme-id")
    if (!theme && saved) {
      // load theme JSON from public/themes
      fetch(`/themes/${saved}.json`).then(r => r.json()).then(setTheme).catch(()=>{})
    }
  }, [])

  useEffect(() => {
    if (!theme) return
    // apply CSS variables
    const root = document.documentElement
    const colors = theme.colors || {}
    root.style.setProperty("--color-primary", colors.primary || "")
    root.style.setProperty("--color-accent", colors.accent || "")
    root.style.setProperty("--color-background", colors.background || "")
    root.style.setProperty("--color-text", colors.text || "")
    root.style.setProperty("--app-font", theme.font || "system-ui, -apple-system")
    // persist tenant id
    if (theme.id) localStorage.setItem("tenant-theme-id", theme.id)
  }, [theme])

  const switchTheme = async (themeId) => {
    try {
      const res = await fetch(`/api/themes/${themeId}`)
      if (res.ok) {
        const t = await res.json()
        setTheme(t)
      } else {
        throw new Error('API failed')
      }
    } catch (e) {
      // fallback to public/themes
      try {
        const fallbackRes = await fetch(`/themes/${themeId}.json`)
        const t = await fallbackRes.json()
        setTheme(t)
      } catch (fallbackError) {
        console.error("Failed to load theme", fallbackError)
      }
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}