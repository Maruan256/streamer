export default function Page() {
  return (
    <>
      <section className="card" style={{marginBottom:20}}>
        <h1>Welcome</h1>
        <p>Demo themeable streaming portal. Switch tenant in the header to change branding.</p>
      </section>

      <section className="card">
        <h2>Sample Player & Info</h2>
        <div style={{display:"grid", gridTemplateColumns:"1fr 320px", gap:18, alignItems:"start"}}>
          <div>
            <div style={{background:"#111", height:220, borderRadius:8, color:"white", display:"flex", alignItems:"center", justifyContent:"center"}}>Video player placeholder</div>
            <h3 style={{marginTop:12}}>Live Now: Community Stream</h3>
            <p>Short description of the stream. CTA buttons below adapt to theme colors.</p>
            <div style={{display:"flex", gap:8, marginTop:12}}>
              <button className="cta">Donate</button>
              <button style={{padding:"8px 12px", borderRadius:8, border:"1px solid rgba(0,0,0,0.08)"}}>Volunteer</button>
            </div>
          </div>

          <aside>
            <div style={{marginBottom:12, padding:12, borderRadius:8, background:"rgba(0,0,0,0.03)"}}>
              <strong>Next Event</strong>
              <div>Sunday — 10:00 AM</div>
            </div>
            <div style={{padding:12, borderRadius:8, background:"rgba(0,0,0,0.02)"}}>
              <strong>Contact</strong>
              <div>hello@ngo.example</div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}