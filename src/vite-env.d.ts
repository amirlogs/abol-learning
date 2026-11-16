/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ABOL_API_ORIGIN?: string
  readonly VITE_GENERATE_CAPTIONS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
