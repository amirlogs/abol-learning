/**
 * ESM `import '@abolkit/player'` does not set the player's script base URL, so
 * lazy sibling resolution for abol-player.braille.js fails. Preload the GPL
 * companions as classic scripts from /abol-kit/ (copied from the package dist).
 * Once `__abolBraille` is registered, Export Amharic Braille works without Wa.
 */
const BRAILLE_SRC = '/abol-kit/abol-player.braille.js'

declare global {
  // Set by abol-player.braille.js when the companion loads.
  var __abolBraille: unknown
  var __abolBrailleReady: Promise<unknown> | undefined
}

export function bootstrapAbolBraille(): void {
  if (typeof document === 'undefined') return
  if (globalThis.__abolBraille || globalThis.__abolBrailleReady) return
  if (document.querySelector(`script[src="${BRAILLE_SRC}"]`)) return

  const script = document.createElement('script')
  script.src = BRAILLE_SRC
  script.async = true
  script.dataset.abolBraille = 'preload'
  document.head.append(script)
}
