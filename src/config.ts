import { resolveAbolApiOrigin } from './abolApiProxy'

/**
 * Caption API base for `<abol-player caption-api>`.
 * Defaults to same-origin `/abol-proxy` (Vite/Vercel rewrite → API) so HTTPS pages
 * are not blocked by mixed content.
 *
 * Job-card `audioSummaryApi` uses `.origin` only, so the same value collapses to
 * the page origin and hits `/api/...` (also rewritten).
 */
export const abolApiOrigin = resolveAbolApiOrigin(import.meta.env.VITE_ABOL_API_ORIGIN)

/** Languages accepted by player `generate-captions` (subset of API TRANSLATION_LANGUAGES). */
export const generateCaptions =
  import.meta.env.VITE_GENERATE_CAPTIONS?.trim() || 'am om ti aa'

export type CaptionTrack = {
  src: string
  srclang: string
  label: string
}

export type Lesson = {
  id: string
  resourceLabel: string
  title: string
  blurb: string
  summary: string
  /** Main lesson media for `<abol-player src>`. */
  src: string
  /** Primary English captions (local fixture; API may add more via generate-captions). */
  captions: string
  captionsLang: string
  captionsLabel: string
  /** Extra WebVTT tracks shipped under public/captions/… */
  captionTracks: CaptionTrack[]
  /** Direct media URL for the sign-language PiP (`sign` attribute). */
  sign: string
  /**
   * When true, sets `sign-placeholder` — companion ASL is illustrative,
   * not a synced interpretation of this lesson.
   */
  signPlaceholder: boolean
  signCredit: string
}

/**
 * Featured lesson is `lessons[0]` (shown on the Learn hub).
 * Remaining lessons stay in a minimizable resource list.
 *
 * Local VTT fixtures under /captions/<id>/ keep English (and any finished
 * translations) available even when the caption worker/Gemini is rate-limited.
 * `generate-captions` still requests the full language set from the API.
 */
export const lessons: Lesson[] = [
  {
    id: 'typescript-100',
    resourceLabel: 'Lesson 01 · Typed JavaScript',
    title: 'TypeScript in 100 Seconds',
    blurb: 'Fireship explainer · ~2.5 min · captions via Abol API',
    summary:
      'A short Fireship explainer of TypeScript: static types, tsc, and why teams add types to JavaScript. Captions load from local fixtures plus the Abol Kit API.',
    src: 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA',
    captions: '/captions/typescript-100/en.vtt',
    captionsLang: 'en',
    captionsLabel: 'English',
    captionTracks: [
      { src: '/captions/typescript-100/am.vtt', srclang: 'am', label: 'አማርኛ' },
    ],
    sign: '/sign/asl-alphabet.webm',
    signPlaceholder: true,
    signCredit:
      'Sign window: ASL alphabet demo by Travis Dougherty (CC BY-SA), via Wikimedia Commons.',
  },
  {
    id: 'go-100',
    resourceLabel: 'Lesson 02 · Systems languages',
    title: 'Go in 100 Seconds',
    blurb: 'Fireship explainer · ~2.5 min · captions via Abol API',
    summary:
      'A short Fireship explainer of Go: concurrency, tooling, and why teams reach for it. Captions load from local fixtures plus the Abol Kit API.',
    src: 'https://www.youtube.com/watch?v=446E-r0rXHI',
    captions: '/captions/go-100/en.vtt',
    captionsLang: 'en',
    captionsLabel: 'English',
    captionTracks: [
      { src: '/captions/go-100/aa.vtt', srclang: 'aa', label: 'Afar' },
    ],
    sign: '/sign/asl-alphabet.webm',
    signPlaceholder: true,
    signCredit:
      'Sign window: ASL alphabet demo by Travis Dougherty (CC BY-SA), via Wikimedia Commons.',
  },
  {
    id: 'obama-opportunity',
    resourceLabel: 'Lesson 03 · Public speaking',
    title: 'Weekly Address: Restoring Opportunity for All',
    blurb: 'Obama White House · ~2.5 min · captions via Abol API',
    summary:
      'A short public address used in the Abol Kit player demos — good for testing captions, transcript, Braille export, and settings.',
    src: 'https://www.youtube.com/watch?v=7XL0tfJn6QI',
    captions: '/captions/obama-opportunity/en.vtt',
    captionsLang: 'en',
    captionsLabel: 'English',
    captionTracks: [
      { src: '/captions/obama-opportunity/am.vtt', srclang: 'am', label: 'አማርኛ' },
      { src: '/captions/obama-opportunity/om.vtt', srclang: 'om', label: 'Afaan Oromoo' },
      { src: '/captions/obama-opportunity/ti.vtt', srclang: 'ti', label: 'ትግርኛ' },
      { src: '/captions/obama-opportunity/aa.vtt', srclang: 'aa', label: 'Afar' },
    ],
    sign: '/sign/asl-story.webm',
    signPlaceholder: true,
    signCredit:
      'Sign window: “The Tortoise and the Hare” in ASL by ASLized! (CC BY 3.0), via Wikimedia Commons.',
  },
]
