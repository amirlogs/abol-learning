/**
 * The Abol API is plain HTTP. Vercel (and any HTTPS host) blocks mixed-content
 * fetches to http://16.16.124.190. Caption JSON also returns absolute HTTP VTT
 * URLs. Rewrite those through the same-origin `/abol-proxy` path (Vite + Vercel).
 *
 * Job-card uses `new URL(audio-summary-api).origin`, so `/abol-proxy` collapses
 * to the page origin and POSTs `/api/job-summaries/audio`. Vite/Vercel also
 * rewrite `/api` → EC2. TTS responses often return `http://localhost:9000/...`
 * (MinIO, not publicly reachable) — rewrite those to local demo MP3s so Listen
 * still plays after a successful API ensure call.
 */
const EC2_ORIGIN = 'http://16.16.124.190'
const PROXY_PREFIX = '/abol-proxy'

/** Fallback MP3s when the API returns an unreachable MinIO URL. */
const LOCAL_JOB_AUDIO: Record<string, string> = {
  'abol-learn:junior-a11y': '/audio/junior-a11y.mp3',
  'abol-learn_junior-a11y': '/audio/junior-a11y.mp3',
  'abol-learn:learning-content': '/audio/learning-content.mp3',
  'abol-learn_learning-content': '/audio/learning-content.mp3',
  'abol-learn:frontend-learning': '/audio/frontend-learning.mp3',
  'abol-learn_frontend-learning': '/audio/frontend-learning.mp3',
}

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
  if (!url.includes('/api/job-summaries/audio')) return response

  const type = response.headers.get('content-type') ?? ''
  if (!type.includes('application/json')) return response

  try {
    const body = (await response.clone().json()) as {
      jobId?: string
      audioUrl?: string
    }
    const nextUrl = playableJobAudioUrl(body.jobId, body.audioUrl)
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

function playableJobAudioUrl(jobId?: string, audioUrl?: string): string | undefined {
  if (!audioUrl) return audioUrl
  if (!isUnreachableMediaHost(audioUrl)) return audioUrl
  if (jobId && LOCAL_JOB_AUDIO[jobId]) return LOCAL_JOB_AUDIO[jobId]

  // Last resort: match path slug to a local fixture.
  for (const [id, path] of Object.entries(LOCAL_JOB_AUDIO)) {
    if (audioUrl.includes(id.replace(/:/g, '_')) || audioUrl.includes(id)) return path
  }
  return audioUrl
}

function isUnreachableMediaHost(audioUrl: string): boolean {
  try {
    const host = new URL(audioUrl).hostname
    return host === 'localhost' || host === '127.0.0.1'
  } catch {
    return false
  }
}

/** Prefer same-origin proxy; allow override via env for direct EC2 access. */
export function resolveAbolApiOrigin(envValue?: string): string {
  const raw = envValue?.trim()
  if (raw) {
    return raw.replace(/\/+$/, '').replace(/\/api$/i, '')
  }
  return PROXY_PREFIX
}
