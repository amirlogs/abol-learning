/**
 * The Abol API is plain HTTP. Vercel (and any HTTPS host) blocks mixed-content
 * fetches to http://16.16.124.190. Caption JSON also returns absolute HTTP VTT
 * URLs. Rewrite those through the same-origin `/abol-proxy` path (Vite + Vercel).
 *
 * Job-card uses `new URL(audio-summary-api).origin`, so `/abol-proxy` collapses
 * to the page origin and POSTs `/api/job-summaries/audio`. Vite/Vercel also
 * rewrite `/api` → EC2.
 *
 * TTS responses return presigned MinIO URLs at `http://localhost:9000/...`
 * (Compose binds MinIO to loopback; signatures require Host: localhost:9000).
 * Rewrite those to same-origin `/abol-minio/...` so Vite/Vercel/Caddy can proxy
 * the original AssemblyAI bytes with the Host header preserved.
 */
const EC2_ORIGIN = 'http://16.16.124.190'
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

    return maybeRewriteJobAudioResponse(rewritten, response)
  }
}

function resolveRequestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input
  if (input instanceof URL) return input.href
  return input.url
}

export function rewriteAbolUrl(url: string): string {
  if (!url.startsWith(EC2_ORIGIN)) return url
  return `${PROXY_PREFIX}${url.slice(EC2_ORIGIN.length)}`
}

async function maybeRewriteJobAudioResponse(url: string, response: Response): Promise<Response> {
  if (!response.ok) return response
  if (!url.includes('/api/job-summaries/audio') && !url.includes('/api/job-summaries/')) {
    return response
  }

  const type = response.headers.get('content-type') ?? ''
  if (!type.includes('application/json')) return response

  try {
    const body = (await response.clone().json()) as { audioUrl?: string }
    const nextUrl = rewriteMinioAudioUrl(body.audioUrl)
    if (!nextUrl || nextUrl === body.audioUrl) return response

    return new Response(JSON.stringify({ ...body, audioUrl: nextUrl }), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })
  } catch {
    return response
  }
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
