# Abol Learn

Small **React + Vite** demo of [Abol Kit](https://abolkit.vercel.app/) as a lightweight learning hub.

- **Learn** — featured lesson + more resources with `<abol-player@1.0.0>`: captions via the Abol API, ASL companion, optional Amharic Braille (`.brf`) export
- **Jobs** — accessible notices with `AbolJobCard` from `@abolkit/job-card@1.0.0` (new-tab Apply, audio summary)

Demo only — no auth, no custom backend.

## Packages (pinned)

```bash
npm install @abolkit/player@1.0.0
npm install @abolkit/job-card@1.0.0
```

Never use `latest`. Component guides: https://abolkit.vercel.app/components/player/ · https://abolkit.vercel.app/components/job-card/

## API

EC2 API: `http://16.16.124.190` ([docs](http://16.16.124.190/docs))

Browsers block **HTTPS pages** (e.g. Vercel) from calling plain HTTP APIs (mixed content). This demo proxies through same-origin paths:

| Layer | Behavior |
| --- | --- |
| Vite (local) | `/abol-proxy` + `/api` → local Compose or EC2 (`ABOL_API_PROXY_TARGET`); `/abol-minio` → MinIO |
| Vercel | `/abol-proxy` + `/api` → EC2; `/abol-minio` needs Caddy on the API host |
| App | `caption-api="/abol-proxy"`; job Listen via `audioSummaryApi` + `abolAudioSummary` MP3s |

| Attribute / prop | Value |
| --- | --- |
| `caption-api` | `/abol-proxy` (default) |
| `captions` + `<track>` | Local fixtures under `public/captions/<lesson>/` (English always; translations when ready) |
| `generate-captions` | `am om ti aa` (Amharic, Afaan Oromoo, Tigrinya, Afar) — fills gaps from the API |
| `braille-export` | default on when Amharic cues exist (`off` to hide); companions in `public/abol-kit/` |
| Job Listen | `audioSummaryApi` + `abolAudioSummary` fixtures |
| Job Apply | new-tab link when posting has `url` (1.0.0) |

## Run

```bash
npm install   # also runs sync:abol-kit (Braille companions → public/abol-kit/)
npm run dev
```

```bash
npm run build
npm run preview
```

## Lessons

| Lesson | Media | Sign window |
| --- | --- | --- |
| TypeScript in 100 Seconds (featured) | YouTube / Fireship | ASL alphabet (local WebM) |
| Go in 100 Seconds | YouTube / Fireship | ASL alphabet (local WebM) |
| Obama Weekly Address | YouTube | ASL story (local WebM) |

Sign media attribution: `public/sign/ATTRIBUTION.md`. Tracks use `sign-placeholder` when they are illustrative companions.

## Accessibility notes

- Skip link, landmarks, labeled sections, page text-size / contrast controls
- Resource list → lesson detail with focus move to the lesson title
- Job Apply opens posting URLs in a new tab; actions announced via `aria-live`
- Prefer-reduced-motion respected for decorative motion
