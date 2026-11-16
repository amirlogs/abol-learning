#!/usr/bin/env node
/**
 * Pull caption VTTs from the local Abol Kit API into public/captions/<lesson>/.
 * Uses lesson YouTube URLs → POST /api/captions/generate (idempotent) then GET each lang.
 */
import { mkdirSync, writeFileSync, unlinkSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const api = (process.env.ABOL_API_PROXY_TARGET || 'http://127.0.0.1:8787').replace(/\/+$/, '')
const langs = ['en', 'am', 'om', 'ti', 'aa']

const lessons = [
  { id: 'typescript-100', url: 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA' },
  { id: 'go-100', url: 'https://www.youtube.com/watch?v=446E-r0rXHI' },
  { id: 'obama-opportunity', url: 'https://www.youtube.com/watch?v=7XL0tfJn6QI' },
]

async function ensureVideo(url) {
  const res = await fetch(`${api}/api/captions/generate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ url, languages: ['am', 'om', 'ti', 'aa'] }),
  })
  const json = await res.json()
  const videoId = json.video?.id
  if (!videoId) throw new Error(`No video id for ${url}: HTTP ${res.status}`)
  return { videoId, status: json.status, captions: json.captions ?? [] }
}

async function main() {
  for (const lesson of lessons) {
    const dir = join(root, 'public/captions', lesson.id)
    mkdirSync(dir, { recursive: true })
    const { videoId, status } = await ensureVideo(lesson.url)
    console.log(`${lesson.id}: video=${videoId} status=${status}`)
    for (const lang of langs) {
      const out = join(dir, `${lang}.vtt`)
      const res = await fetch(`${api}/api/videos/${videoId}/captions/${lang}`)
      if (!res.ok) {
        if (existsSync(out)) unlinkSync(out)
        console.log(`  ${lang}: skip (${res.status})`)
        continue
      }
      const text = await res.text()
      writeFileSync(out, text)
      console.log(`  ${lang}: wrote ${text.length} bytes`)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
