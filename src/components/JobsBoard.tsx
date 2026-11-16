import {
  AbolJobCard,
  type AbolJobCardElement,
  type JobApplyEventDetail,
  type SummaryPlayEventDetail,
} from '@abolkit/job-card/react'
import { useEffect, useId, useRef, useState } from 'react'

const jobs = [
  { id: 'junior-a11y', jobUrl: '/jobs/junior-a11y.json' },
  { id: 'learning-content', jobUrl: '/jobs/learning-content.json' },
  { id: 'frontend-learning', jobUrl: '/jobs/frontend-learning.json' },
] as const

function JobNotice(props: {
  jobUrl: string
  onAnnounce: (message: string) => void
}) {
  const ref = useRef<AbolJobCardElement | null>(null)
  const onAnnounceRef = useRef(props.onAnnounce)
  onAnnounceRef.current = props.onAnnounce

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onApply = (event: Event) => {
      event.preventDefault()
      const detail = (event as CustomEvent<JobApplyEventDetail>).detail
      onAnnounceRef.current(
        `Demo apply recorded for ${detail.job.title}. No account is required in this demo.`,
      )
    }

    const onPlay = (event: Event) => {
      const detail = (event as CustomEvent<SummaryPlayEventDetail>).detail
      if (detail.playing) {
        onAnnounceRef.current(`Playing audio summary for ${detail.job.title}.`)
      }
    }

    el.addEventListener('abol:job-apply', onApply)
    el.addEventListener('abol:summary-play', onPlay)
    return () => {
      el.removeEventListener('abol:job-apply', onApply)
      el.removeEventListener('abol:summary-play', onPlay)
    }
  }, [])

  return <AbolJobCard ref={ref} jobUrl={props.jobUrl} lang="en" headingLevel={3} />
}

export function JobsBoard() {
  const liveId = useId()
  const [announce, setAnnounce] = useState('')

  return (
    <div className="jobs-board">
      <p className="hint" role="note">
        Each notice includes a plain-language summary, listen control (local audio via{' '}
        <code>abolAudioSummary</code>), key facts, and apply action.
      </p>

      <div
        id={liveId}
        className={announce ? 'a11y-toast' : 'visually-hidden'}
        role="status"
        aria-live="polite"
      >
        {announce}
      </div>

      <ul className="jobs-board__list">
        {jobs.map((job) => (
          <li key={job.id}>
            <JobNotice jobUrl={job.jobUrl} onAnnounce={setAnnounce} />
          </li>
        ))}
      </ul>
    </div>
  )
}
