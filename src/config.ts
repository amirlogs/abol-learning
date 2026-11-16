import { resolveAbolApiOrigin } from './abolApiProxy'

/**
 * Caption API base for `<abol-player caption-api>`.
 * Defaults to same-origin `/abol-proxy` (Vite/Vercel rewrite → EC2) so HTTPS pages
 * are not blocked by mixed content.
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
 * Three lessons with caption API + ASL companion tracks.
 * Captions: English transcript + am/om/ti/aa via `caption-api` / `generate-captions`.
 */
export const lessons: Lesson[] = [
  {
    id: 'go-100',
    resourceLabel: 'Lesson 01 · Systems languages',
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
    resourceLabel: 'Lesson 02 · Public speaking',
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
  {
    id: 'lightning-dhh',
    resourceLabel: 'Lesson 03 · Inclusive safety',
    title: 'Lightning Safety for the Deaf and Hard of Hearing Community',
    blurb: 'Open educational WebM · ~1 min · captions via Abol API',
    summary:
      'Public-domain educational video for the Deaf and hard-of-hearing community. Captions are generated through the Abol Kit caption API.',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Lightning_Safety_for_the_Deaf_and_Hard_of_Hearing_Community.webm',
    sign: '/sign/asl-alphabet.webm',
    signPlaceholder: true,
    signCredit:
      'Sign window: ASL alphabet demo by Travis Dougherty (CC BY-SA), via Wikimedia Commons.',
  },
]
