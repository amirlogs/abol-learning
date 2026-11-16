import '@abolkit/player'
import { useEffect, useId, useRef, useState } from 'react'
import { abolApiOrigin, generateCaptions, type Lesson } from '../config'

type Props = {
  lesson: Lesson
}

/** Human labels for generate-captions codes (1.0.0 docs: Afaan Oromoo for om). */
const captionLabels: Record<string, string> = {
  am: 'Amharic',
  om: 'Afaan Oromoo',
  ti: 'Tigrinya',
  aa: 'Afar',
}

type BrailleDetail = {
  status?: string
  message?: string
  filename?: string
}

type CaptionsDetail = {
  status?: string
  message?: string
}

export function LessonPlayer({ lesson }: Props) {
  const playerRef = useRef<HTMLElement | null>(null)
  const liveId = useId()
  const [status, setStatus] = useState('')

  const captionList = generateCaptions
    .split(/\s+/)
    .filter(Boolean)
    .map((code) => captionLabels[code] ?? code)
    .join(', ')

  useEffect(() => {
    const el = playerRef.current
    if (!el) return

    const onBraille = (event: Event) => {
      const detail = (event as CustomEvent<BrailleDetail>).detail
      if (detail?.status === 'ready') {
        setStatus(
          detail.filename
            ? `Amharic Braille export ready (${detail.filename}).`
            : 'Amharic Braille export ready.',
        )
      } else if (detail?.status === 'error') {
        setStatus(detail.message?.trim() || 'Braille export failed.')
      }
    }

    const onCaptions = (event: Event) => {
      const detail = (event as CustomEvent<CaptionsDetail>).detail
      if (detail?.status === 'ready') {
        setStatus('Generated captions are ready.')
      } else if (detail?.status === 'failed') {
        setStatus(detail.message?.trim() || 'Caption generation failed.')
      }
    }

    const onError = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail
      if (detail?.message) setStatus(detail.message)
    }

    el.addEventListener('abol:braille', onBraille)
    el.addEventListener('abol:captions', onCaptions)
    el.addEventListener('abol:error', onError)
    return () => {
      el.removeEventListener('abol:braille', onBraille)
      el.removeEventListener('abol:captions', onCaptions)
      el.removeEventListener('abol:error', onError)
    }
  }, [lesson.id])

  return (
    <div className="lesson-player">
      <p className="eyebrow">{lesson.resourceLabel}</p>
      <h3 className="lesson-player__title" id="lesson-title" tabIndex={-1}>
        {lesson.title}
      </h3>
      <p className="lesson-player__summary">{lesson.summary}</p>

      <abol-player
        key={lesson.id}
        ref={playerRef}
        src={lesson.src}
        lang="en"
        captions={lesson.captions}
        captions-lang={lesson.captionsLang}
        captions-label={lesson.captionsLabel}
        caption-api={abolApiOrigin}
        generate-captions={generateCaptions}
        sign={lesson.sign}
        controls-keys="focus"
        {...(lesson.signPlaceholder ? { 'sign-placeholder': '' } : {})}
      >
        {lesson.captionTracks.map((track) => (
          <track
            key={`${lesson.id}-${track.srclang}`}
            kind="captions"
            src={track.src}
            srcLang={track.srclang}
            label={track.label}
          />
        ))}
      </abol-player>

      <p id={liveId} className={status ? 'a11y-toast' : 'visually-hidden'} role="status" aria-live="polite">
        {status}
      </p>

      <p className="hint" role="note">
        English (and finished translations) ship as local WebVTT under <code>/captions/{lesson.id}/</code>.
        The player also requests {captionList} from <code>{abolApiOrigin}</code>. Use the sign control for
        the ASL companion. When Amharic cues are ready,{' '}
        <strong>Export Amharic Braille (.brf)</strong> appears beside captions.
      </p>
      <p className="credit">{lesson.signCredit}</p>
    </div>
  )
}
