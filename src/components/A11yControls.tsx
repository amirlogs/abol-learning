import { useEffect, useState } from 'react'

type TextScale = '100' | '125' | '150'
type Contrast = 'default' | 'high'

const TEXT_KEY = 'abol-learn-text-scale'
const CONTRAST_KEY = 'abol-learn-contrast'

function readScale(): TextScale {
  const value = localStorage.getItem(TEXT_KEY)
  return value === '125' || value === '150' ? value : '100'
}

function readContrast(): Contrast {
  return localStorage.getItem(CONTRAST_KEY) === 'high' ? 'high' : 'default'
}

export function A11yControls() {
  const [textScale, setTextScale] = useState<TextScale>('100')
  const [contrast, setContrast] = useState<Contrast>('default')

  useEffect(() => {
    setTextScale(readScale())
    setContrast(readContrast())
  }, [])

  useEffect(() => {
    document.documentElement.dataset.textScale = textScale
    localStorage.setItem(TEXT_KEY, textScale)
  }, [textScale])

  useEffect(() => {
    document.documentElement.dataset.contrast = contrast
    localStorage.setItem(CONTRAST_KEY, contrast)
  }, [contrast])

  return (
    <div className="a11y-bar" role="region" aria-label="Display preferences">
      <div className="a11y-bar__group">
        <span className="a11y-bar__label" id="text-size-label">
          Text size
        </span>
        <div className="a11y-bar__controls" role="group" aria-labelledby="text-size-label">
          {([
            ['100', 'Default'],
            ['125', 'Large'],
            ['150', 'Larger'],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className="a11y-chip"
              aria-pressed={textScale === value}
              onClick={() => setTextScale(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="a11y-bar__group">
        <span className="a11y-bar__label" id="contrast-label">
          Contrast
        </span>
        <div className="a11y-bar__controls" role="group" aria-labelledby="contrast-label">
          <button
            type="button"
            className="a11y-chip"
            aria-pressed={contrast === 'default'}
            onClick={() => setContrast('default')}
          >
            Standard
          </button>
          <button
            type="button"
            className="a11y-chip"
            aria-pressed={contrast === 'high'}
            onClick={() => setContrast('high')}
          >
            High contrast
          </button>
        </div>
      </div>
    </div>
  )
}
