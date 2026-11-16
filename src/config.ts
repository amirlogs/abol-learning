import { resolveAbolApiOrigin } from './abolApiProxy'

/**
 * Caption API base for `<abol-player caption-api>`.
 * Defaults to same-origin `/abol-proxy` (Vite/Vercel rewrite → EC2) so HTTPS pages
 * are not blocked by mixed content.
 *
 * Job-card `audioSummaryApi` uses `.origin` only, so the same value collapses to
 * the page origin and hits `/api/...` (also rewritten to EC2).
 */
export const abolApiOrigin = resolveAbolApiOrigin(import.meta.env.VITE_ABOL_API_ORIGIN)

/** Languages accepted by player `generate-captions` (subset of API TRANSLATION_LANGUAGES). */
export const generateCaptions =
  import.meta.env.VITE_GENERATE_CAPTIONS?.trim() || 'am om ti aa'

export type Lesson = {
  id: string
  resourceLabel: string
  title: string
  blurb: string
  summary: string
  /** Main lesson media for `<abol-player src>`. */
  src: string
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
 */
export const lessons: Lesson[] = [
  {
    id: 'typescript-100',
    resourceLabel: 'Lesson 01 · Typed JavaScript',
    title: 'TypeScript in 100 Seconds',
    blurb: 'Fireship explainer · ~2.5 min · captions via Abol API',
    summary:
      'A short Fireship explainer of TypeScript: static types, tsc, and why teams add types to JavaScript. Captions load from the Abol Kit API.',
    src: 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA',
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
      'A short Fireship explainer of Go: concurrency, tooling, and why teams reach for it. Captions load from the Abol Kit API.',
    src: 'https://www.youtube.com/watch?v=446E-r0rXHI',
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
      'A short public address used in the Abol Kit player demos — good for testing captions, transcript, and settings.',
    src: 'https://www.youtube.com/watch?v=7XL0tfJn6QI',
    sign: '/sign/asl-story.webm',
    signPlaceholder: true,
    signCredit:
      'Sign window: “The Tortoise and the Hare” in ASL by ASLized! (CC BY 3.0), via Wikimedia Commons.',
  },
]
