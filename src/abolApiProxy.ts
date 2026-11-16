/**
 * The Abol API is plain HTTP. Vercel (and any HTTPS host) blocks mixed-content
 * fetches to http://16.16.124.190. Caption JSON also returns absolute HTTP VTT
 * URLs. Rewrite those through the same-origin `/abol-proxy` path (Vite + Vercel).
 */
const EC2_ORIGIN = 'http://16.16.124.190'
const PROXY_PREFIX = '/abol-proxy'

export function installAbolApiProxy(): void {
  if (typeof window === 'undefined') return
  const w = window as Window & { __abolApiProxyInstalled?: boolean }
  if (w.__abolApiProxyInstalled) return
  w.__abolApiProxyInstalled = true

  const originalFetch = window.fetch.bind(window)

  window.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (typeof input === 'string') {
      return originalFetch(rewriteAbolUrl(input), init)
    }
    if (input instanceof URL) {
      return originalFetch(rewriteAbolUrl(input.href), init)
    }
    if (input instanceof Request) {
      const next = rewriteAbolUrl(input.url)
      if (next !== input.url) return originalFetch(new Request(next, input), init)
    }
    return originalFetch(input, init)
  }
}

export function rewriteAbolUrl(url: string): string {
  if (!url.startsWith(EC2_ORIGIN)) return url
  return `${PROXY_PREFIX}${url.slice(EC2_ORIGIN.length)}`
}

/** Prefer same-origin proxy; allow override via env for direct EC2 access. */
export function resolveAbolApiOrigin(envValue?: string): string {
  const raw = envValue?.trim()
  if (raw) {
    return raw.replace(/\/+$/, '').replace(/\/api$/i, '')
  }
  return PROXY_PREFIX
}
