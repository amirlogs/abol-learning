# Abol Learn

Small **React + Vite** demo of [Abol Kit](https://abolkit.vercel.app/) as a lightweight learning hub.

- **Learn** — 3 lessons with `<abol-player>`: captions via the live Abol API, ASL companion in the sign window
- **Jobs** — 3 accessible job notices with `AbolJobCard` + audio summaries from the same API

Demo only — no auth, no custom backend.

## Packages (pinned)

```bash
npm install @abolkit/player@0.1.1
npm install @abolkit/job-card@0.1.1
```

Never use `latest`. Docs: https://abolkit.vercel.app/

## API

EC2 API: `http://16.16.124.190` ([docs](http://16.16.124.190/docs))

Browsers block **HTTPS pages** (e.g. Vercel) from calling plain HTTP APIs (mixed content). This demo proxies through same-origin `/abol-proxy`:

| Layer | Behavior |
| --- | --- |
| Vite / Vercel | `/abol-proxy/*` → `http://16.16.124.190/*` |
| App | `caption-api="/abol-proxy"` + fetch rewrite for absolute EC2 VTT URLs |

| Attribute / prop | Value |
| --- | --- |
| `caption-api` | `/abol-proxy` (default) |
| `generate-captions` | `am om ti aa` |
| Job listen audio | local `abolAudioSummary` MP3s under `/audio/` |

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Lessons

| Lesson | Media | Sign window |
| --- | --- | --- |
| Go in 100 Seconds | YouTube | ASL alphabet (local WebM) |
| Obama Weekly Address | YouTube | ASL story (local WebM) |
| Lightning Safety (DHH) | Wikimedia WebM | ASL alphabet (local WebM) |

Sign media attribution: `public/sign/ATTRIBUTION.md`. Tracks use `sign-placeholder` when they are illustrative companions.

## Accessibility notes

- Skip link, landmarks, labeled sections
- Resource list → lesson detail with focus move to the lesson title
- Job apply is cancelled in-demo and announced via `aria-live`
- Job cards keep their built-in apply / listen / structured facts UI
- Prefer-reduced-motion respected for decorative motion
