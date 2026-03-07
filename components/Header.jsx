"use client"
import React from "react"
import TenantSwitcher from "./TenantSwitcher"
import { useTheme } from "./ThemeProvider"

export default function Header() {
  const { theme } = useTheme()
  return (
    <header className="header">
      <div className="brand">
        {theme?.logo ? <img src={theme.logo} alt="" className="logo" /> : <div className="logo" />}
        <div>
          <div style={{fontWeight:700}}>{theme?.name || "Stream Platform"}</div>
          <div style={{fontSize:12, color:"var(--color-text)"}}>Customizable portal</div>
        </div>
      </div>

      <div style={{display:"flex", gap:12, alignItems:"center"}}>
        <TenantSwitcher />
      </div>
    </header>
  )
}