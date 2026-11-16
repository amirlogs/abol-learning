import { useEffect, useId, useRef, useState } from 'react'
import { A11yControls } from './components/A11yControls'
import { JobsBoard } from './components/JobsBoard'
import { LessonPlayer } from './components/LessonPlayer'
import { lessons } from './config'
import './App.css'

type View = 'hub' | 'lesson'

const featuredLesson = lessons[0]
const moreLessons = lessons.slice(1)

export default function App() {
  const [view, setView] = useState<View>('hub')
  const [activeLessonId, setActiveLessonId] = useState(moreLessons[0]?.id ?? '')
  const backRef = useRef<HTMLButtonElement>(null)
  const lessonTitleId = useId()

  const activeLesson = moreLessons.find((item) => item.id === activeLessonId) ?? moreLessons[0]

  useEffect(() => {
    if (view !== 'lesson') return
    const title = document.getElementById('lesson-title')
    if (title instanceof HTMLElement) title.focus()
    else backRef.current?.focus()
  }, [view, activeLessonId])

  const openLesson = (id: string) => {
    setActiveLessonId(id)
    setView('lesson')
  }

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <div className="atmosphere" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" onClick={() => setView('hub')}>
          <span className="brand__mark" aria-hidden="true" />
          Abol Learn
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#learn">Learn</a>
          <a href="#jobs">Jobs</a>
        </nav>
      </header>

      <A11yControls />

      <main id="main">
        <section className="hero" aria-labelledby="hero-brand" id="top">
          <p className="hero__brand" id="hero-brand">
            Abol Learn
          </p>
          <h1 className="hero__headline">Calm lessons. Clear career notices.</h1>
          <p className="hero__lede">
            A lightweight demo hub powered by Abol Kit — a featured captioned lesson with ASL
            companion tracks, more resources on demand, accessible job notices, no accounts.
          </p>
          <div className="hero__cta">
            <a className="button" href="#learn">
              Start learning
            </a>
          </div>
        </section>

        <section id="learn" className="section" aria-labelledby="learn-heading">
          <div className="section__intro">
            <h2 id="learn-heading">Learn</h2>
            <p>
              One featured lesson on this page. More resources stay collapsed until you open them —
              each player requests captions from the Abol Kit API and offers a sign-language window.
            </p>
          </div>

          {view === 'hub' ? (
            <div className="learn-hub">
              {featuredLesson && (
                <div className="learn-hub__featured" role="region" aria-label="Featured lesson">
                  <LessonPlayer lesson={featuredLesson} />
                </div>
              )}

              {moreLessons.length > 0 && (
                <details className="more-lessons">
                  <summary className="more-lessons__summary">
                    More lessons <span aria-hidden="true">({moreLessons.length})</span>
                  </summary>
                  <ul className="resource-list">
                    {moreLessons.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="resource-link"
                          onClick={() => openLesson(item.id)}
                          aria-describedby={`${item.id}-blurb`}
                        >
                          <span className="resource-link__meta">{item.resourceLabel}</span>
                          <span className="resource-link__title">{item.title}</span>
                          <span className="resource-link__blurb" id={`${item.id}-blurb`}>
                            {item.blurb}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ) : (
            activeLesson && (
              <div className="lesson-detail" role="region" aria-labelledby={lessonTitleId}>
                <button
                  ref={backRef}
                  type="button"
                  className="back-link"
                  onClick={() => setView('hub')}
                >
                  ← Back to Learn
                </button>
                <span id={lessonTitleId} className="visually-hidden">
                  {activeLesson.title}
                </span>
                <LessonPlayer lesson={activeLesson} />
              </div>
            )
          )}
        </section>

        <section id="jobs" className="section section--jobs" aria-labelledby="jobs-heading">
          <div className="section__intro">
            <h2 id="jobs-heading">Jobs</h2>
            <p>
              Career notices as schema.org JobPosting cards — apply, listen to an audio summary from
              the Abol API, and read structured details.
            </p>
          </div>
          <JobsBoard />
        </section>
      </main>

      <footer className="footer">
        <p>
          Demo only ·{' '}
          <a href="https://abolkit.vercel.app/" rel="noreferrer" target="_blank">
            Abol Kit docs<span className="visually-hidden"> (opens in a new tab)</span>
          </a>{' '}
          · API{' '}
          <a href="http://16.16.124.190/docs" rel="noreferrer" target="_blank">
            reference<span className="visually-hidden"> (opens in a new tab)</span>
          </a>{' '}
          · packages pinned at <code>0.1.1</code>
        </p>
      </footer>
    </div>
  )
}
