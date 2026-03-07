"use client"
import React, { useState, useEffect } from "react"

export default function AdminThemeEditor({ theme, onSave, saving }) {
  const [draft, setDraft] = useState(theme)

  useEffect(() => { console.log("hello"); setDraft(theme); }, [theme])

  if (!theme) return <p>Loading theme...</p>

  const update = (path, value) => {
    setDraft(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      const parts = path.split(".")
      let cur = copy
      for (let i=0;i<parts.length-1;i++) {
        cur = cur[parts[i]] = cur[parts[i]] || {}
      }
      cur[parts[parts.length-1]] = value
      return copy
    })
  }

  return (
    <div style={{display:"grid", gap:12}}>
      <label>
        Name<br/>
        <input value={draft.name} onChange={e=>update("name", e.target.value)} />
      </label>

      <label>
        Logo URL<br/>
        <input value={draft.logo} onChange={e=>update("logo", e.target.value)} />
      </label>

      <label>
        Font stack<br/>
        <input value={draft.font} onChange={e=>update("font", e.target.value)} />
      </label>

      <fieldset style={{padding:12, borderRadius:8}}>
        <legend>Colors</legend>
        <label>
          Primary<br/>
          <input type="color" value={draft.colors.primary} onChange={e=>update("colors.primary", e.target.value)} />
        </label>
        <label>
          Accent<br/>
          <input type="color" value={draft.colors.accent} onChange={e=>update("colors.accent", e.target.value)} />
        </label>
        <label>
          Background<br/>
          <input type="color" value={draft.colors.background} onChange={e=>update("colors.background", e.target.value)} />
        </label>
        <label>
          Text<br/>
          <input type="color" value={draft.colors.text} onChange={e=>update("colors.text", e.target.value)} />
        </label>
      </fieldset>

      <div style={{display:"flex", gap:8}}>
        <button onClick={()=>onSave(draft)} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        <button onClick={()=>setDraft(theme)}>Reset</button>
      </div>

      <div style={{marginTop:12}}>
        <strong>Preview JSON</strong>
        <pre style={{background:"#f6f8fa", padding:12, borderRadius:8, overflowX:"auto"}}>{JSON.stringify(draft, null, 2)}</pre>
      </div>
    </div>
  )
}