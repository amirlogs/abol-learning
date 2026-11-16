import { AbolJobCard, type JobApplyEventDetail, type SummaryPlayEventDetail } from '@abolkit/job-card/react'
import { useId, useState } from 'react'
import { abolApiOrigin } from '../config'

const jobs = [
  {
    id: 'junior-a11y',
    jobUrl: '/jobs/junior-a11y.json',
    calendar: 'gregory' as const,
  },
  {
    id: 'learning-content',
    jobUrl: '/jobs/learning-content.json',
    /** Docs 1.0.0: ethiopic calendar for Ethiopian postings */
    calendar: 'ethiopic' as const,
  },
  {
    id: 'frontend-learning',
    jobUrl: '/jobs/frontend-learning.json',
    calendar: 'gregory' as const,
  },
] as const

function JobNotice(props: {
  jobUrl: string
  calendar: 'gregory' | 'ethiopic'
  onAnnounce: (message: string) => void
}) {
  const onApply = (detail: JobApplyEventDetail) => {
    // 1.0.0: Apply with a posting url is a real new-tab link. Do not preventDefault —
    // let the card open the career URL; still announce for the live region.
    props.onAnnounce(
      detail.url
        ? `Opening apply link for ${detail.job.title} in a new tab.`
        : `Apply signaled for ${detail.job.title}. This demo has no account flow.`,
    )
  }

  const onPlay = (detail: SummaryPlayEventDetail) => {
    if (detail.playing) {
      props.onAnnounce(`Playing audio summary for ${detail.job.title}.`)
    }
  }

  return (
    <AbolJobCard
      jobUrl={props.jobUrl}
      audioSummaryApi={abolApiOrigin}
      lang="en"
      calendar={props.calendar}
      headingLevel={3}
      onJobApply={onApply}
      onSummaryPlay={onPlay}
    />
  )
}

export function JobsBoard() {
  const liveId = useId()
  const [announce, setAnnounce] = useState('')

  return (
    <div className="jobs-board">
      <p className="hint" role="note">
        Cards use <code>AbolJobCard</code> from <code>@abolkit/job-card@1.0.0</code> —{' '}
        <code>audioSummaryApi</code> for Listen, Apply opens the posting URL in a new tab, and one
        notice uses <code>calendar=&quot;ethiopic&quot;</code>.
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
            <JobNotice
              jobUrl={job.jobUrl}
              calendar={job.calendar}
              onAnnounce={setAnnounce}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
