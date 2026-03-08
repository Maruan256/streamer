"use client"
import React from "react"
import { useTheme } from "./ThemeProvider"

export default function TenantSwitcher() {
  const { theme, switchTheme } = useTheme()
  const tenants = [
    { id: "ngo-a", label: "Customer A" },
    { id: "ngo-b", label: "Customer B" },
    { id: "ngo-c", label: "Customer C" }
  ]

  return (
    <div style={{display:"flex", gap:10, alignItems:"center"}}>
      <select
        value={theme?.id || ""}
        onChange={(e) => switchTheme(e.target.value)}
        aria-label="Select tenant"
      >
        <option value="">Select tenant</option>
        {tenants.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
      </select>
    </div>
  )
}