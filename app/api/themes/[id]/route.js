import fs from "fs/promises"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "Data", "Themes")

function themePath(id) {
  return path.join(DATA_DIR, `${id}.json`)
}

export async function GET(req, { params }) {
  const { id } = params
  try {
    const content = await fs.readFile(themePath(id), "utf-8")
    return new Response(content, { status: 200, headers: { "content-type": "application/json" } })
  } catch (err) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
  }
}

export async function POST(req, { params }) {
  const { id } = params
  try {
    const body = await req.json()
    if (!body || body.id !== id) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 })
    }
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(themePath(id), JSON.stringify(body, null, 2), "utf-8")
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: "Failed to save" }), { status: 500 })
  }
}