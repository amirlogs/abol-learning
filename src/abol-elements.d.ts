import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type AbolPlayerAttributes = {
  src?: string
  lang?: string
  captions?: string
  'captions-lang'?: string
  'captions-label'?: string
  'caption-api'?: string
  'generate-captions'?: string
  manifest?: string
  sign?: string
  'sign-placeholder'?: string | boolean
  poster?: string
  audio?: string
  descriptions?: string
  transcript?: string
  'offline-pack'?: string
  'braille-export'?: string
  'controls-keys'?: string
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'abol-player': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
        AbolPlayerAttributes
    }
  }
}

export {}
