"use client"
import React, { useEffect, useState } from "react"
import AdminThemeEditor from "../../components/AdminThemeEditor"
import { useTheme } from "../../components/ThemeProvider"

const TENANTS = [
  { id: "ngo-a", label: "Hope Stream" },
  { id: "ngo-b", label: "Care TV" },
  { id: "ngo-c", label: "Relief Live" }
]

export default function AdminPage() {
  const [selected, setSelected] = useState(TENANTS[0].id)
  const [theme, setTheme] = useState(null)
  const [loading, setLoading] = useState(false)
  const { switchTheme } = useTheme()

  useEffect(() => {
    fetch(`/api/themes/${selected}`).then(r => r.json()).then(setTheme).catch(()=>{})
    console.log("selected", selected);
  }, [selected])

  const handleSave = async (updated) => {
    setLoading(true)
    const res = await fetch(`/api/themes/${selected}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updated)
    })
    setLoading(false)
    if (res.ok) {
      alert("Saved")
      setTheme(updated)
      switchTheme(selected)
    } else {
      alert("Save failed")
    }
  }

  return (
    <div style={{maxWidth:900, margin:"24px auto"}}>
      <h1>Admin: Theme Editor</h1>
      <div style={{marginBottom:12}}>
        <label>
          Tenant:{" "}
          <select value={selected} onChange={(e)=>setSelected(e.target.value)}>
            {TENANTS.map(t=> <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </label>
      </div>

      {theme ? (
        <AdminThemeEditor theme={theme} onSave={handleSave} saving={loading} />
      ) : (
        <div>Loading...</div>
      )}
      <button className="cta" onClick={() => window.history.back()}>go back</button>
    </div>
  )
}