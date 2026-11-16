import '@abolkit/player'
import { abolApiOrigin, generateCaptions, type Lesson } from '../config'

type Props = {
  lesson: Lesson
}

export function LessonPlayer({ lesson }: Props) {
  return (
    <div className="lesson-player">
      <p className="eyebrow">{lesson.resourceLabel}</p>
      <h3 className="lesson-player__title" id="lesson-title" tabIndex={-1}>
        {lesson.title}
      </h3>
      <p className="lesson-player__summary">{lesson.summary}</p>

      <abol-player
        key={lesson.id}
        src={lesson.src}
        lang="en"
        caption-api={abolApiOrigin}
        generate-captions={generateCaptions}
        sign={lesson.sign}
        {...(lesson.signPlaceholder ? { 'sign-placeholder': '' } : {})}
      />

      <p className="hint" role="note">
        Captions request English transcript plus {generateCaptions.split(/\s+/).join(', ')} from{' '}
        <code>{abolApiOrigin}</code>. Use the player’s sign control to show the ASL companion
        window.
      </p>
      <p className="credit">{lesson.signCredit}</p>
    </div>
  )
}
