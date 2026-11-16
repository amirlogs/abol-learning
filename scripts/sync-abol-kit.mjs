#!/usr/bin/env node
/**
 * Copy GPL Braille companions from @abolkit/player into public/abol-kit/
 * so ESM apps can preload them as classic scripts (see abolBrailleBootstrap.ts).
 */
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'node_modules/@abolkit/player/dist')
const out = join(root, 'public/abol-kit')

mkdirSync(out, { recursive: true })

for (const name of ['abol-player.braille.js', 'abol-player.braille.capi.js']) {
  copyFileSync(join(dist, name), join(out, name))
}

writeFileSync(
  join(out, 'abol-player.js'),
  '// Abol Learn: Braille companion base marker for /abol-kit/\n',
)

console.log('Synced Braille companions → public/abol-kit/')
