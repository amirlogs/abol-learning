/**
 * The Abol API is plain HTTP. Vercel (and any HTTPS host) blocks mixed-content
 * fetches to http://16.16.124.190. Caption JSON also returns absolute HTTP VTT
 * URLs (EC2 or local Compose PUBLIC_BASE_URL). Rewrite those through the
 * same-origin `/abol-proxy` path (Vite + Vercel).
 *
 * Job-card uses `new URL(audio-summary-api).origin`, so `/abol-proxy` collapses
 * to the page origin and POSTs `/api/job-summaries/audio`. Vite/Vercel also
 * rewrite `/api` → the API target.
 *
 * TTS responses return presigned MinIO URLs at `http://localhost:9000/...`
 * (Compose binds MinIO to loopback; signatures require Host: localhost:9000).
 * Rewrite those to same-origin `/abol-minio/...` so Vite/Vercel/Caddy can proxy
 * the original AssemblyAI bytes with the Host header preserved.
 */
const EC2_ORIGIN = 'http://16.16.124.190'
const LOCAL_API_ORIGINS = ['http://127.0.0.1:8787', 'http://localhost:8787'] as const
const API_ORIGINS = [EC2_ORIGIN, ...LOCAL_API_ORIGINS] as const
const PROXY_PREFIX = '/abol-proxy'
const MINIO_PROXY_PREFIX = '/abol-minio'
const MINIO_LOCAL_ORIGINS = ['http://localhost:9000', 'http://127.0.0.1:9000'] as const

export function installAbolApiProxy(): void {
  if (typeof window === 'undefined') return
  const w = window as Window & { __abolApiProxyInstalled?: boolean }
  if (w.__abolApiProxyInstalled) return
  w.__abolApiProxyInstalled = true

  const originalFetch = window.fetch.bind(window)

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const requestUrl = resolveRequestUrl(input)
    const rewritten = rewriteAbolUrl(requestUrl)
    const response =
      rewritten !== requestUrl
        ? await originalFetch(
            input instanceof Request ? new Request(rewritten, input) : rewritten,
            init,
          )
        : await originalFetch(input, init)

    return maybeRewriteApiJsonResponse(rewritten, response)
  }
}

function resolveRequestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input
  if (input instanceof URL) return input.href
  return input.url
}

export function rewriteAbolUrl(url: string): string {
  for (const origin of API_ORIGINS) {
    if (url === origin || url.startsWith(`${origin}/`)) {
      return `${PROXY_PREFIX}${url.slice(origin.length)}`
    }
  }
  return url
}

async function maybeRewriteApiJsonResponse(url: string, response: Response): Promise<Response> {
  if (!response.ok && response.status !== 202) return response

  const type = response.headers.get('content-type') ?? ''
  if (!type.includes('application/json')) return response

  const isCaptionPayload =
    url.includes('/api/captions') ||
    url.includes('/api/caption-jobs/') ||
    url.includes('/api/videos/')
  const isJobAudio =
    url.includes('/api/job-summaries/audio') || url.includes('/api/job-summaries/')

  if (!isCaptionPayload && !isJobAudio) return response

  try {
    const body = (await response.clone().json()) as Record<string, unknown>
    let changed = false

    if (isJobAudio) {
      const nextUrl = rewriteMinioAudioUrl(
        typeof body.audioUrl === 'string' ? body.audioUrl : undefined,
      )
      if (nextUrl && nextUrl !== body.audioUrl) {
        body.audioUrl = nextUrl
        changed = true
      }
    }

    if (isCaptionPayload) {
      const next = rewriteCaptionPayloadUrls(body)
      if (next.changed) {
        Object.assign(body, next.body)
        changed = true
      }
    }

    if (!changed) return response

    return new Response(JSON.stringify(body), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })
  } catch {
    return response
  }
}

function rewriteCaptionPayloadUrls(body: Record<string, unknown>): {
  body: Record<string, unknown>
  changed: boolean
} {
  let changed = false
  const captions = body.captions
  if (Array.isArray(captions)) {
    body.captions = captions.map((item) => {
      if (!item || typeof item !== 'object') return item
      const row = { ...(item as Record<string, unknown>) }
      for (const key of ['url', 'vttUrl', 'href'] as const) {
        if (typeof row[key] === 'string') {
          const next = rewriteAbolUrl(row[key] as string)
          if (next !== row[key]) {
            row[key] = next
            changed = true
          }
        }
      }
      return row
    })
  }
  return { body, changed }
}

/** Map presigned localhost MinIO URLs onto the same-origin MinIO proxy. */
export function rewriteMinioAudioUrl(audioUrl?: string): string | undefined {
  if (!audioUrl) return audioUrl
  for (const origin of MINIO_LOCAL_ORIGINS) {
    if (audioUrl.startsWith(`${origin}/`)) {
      return `${MINIO_PROXY_PREFIX}${audioUrl.slice(origin.length)}`
    }
  }
  return audioUrl
}

/** Prefer same-origin proxy; allow override via env for direct EC2 access. */
export function resolveAbolApiOrigin(envValue?: string): string {
  const raw = envValue?.trim()
  if (raw) {
    return raw.replace(/\/+$/, '').replace(/\/api$/i, '')
  }
  return PROXY_PREFIX
}
