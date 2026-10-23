import * as React from 'react'
import { hex, type Color } from './colors'

/**
 * "text *coloured:coral* more" -> text with a coloured word.
 * "text *italic* more" with no colour -> underlined highlight in sun yellow.
 */
export function rich(text: string): React.ReactNode {
  return text.split('*').map((part, i) => {
    if (i % 2 === 0) return <React.Fragment key={i}>{part}</React.Fragment>
    const [word, col] = part.split(':')
    if (col && col in hex) return <span key={i} style={{ color: hex[col as Color] }}>{word}</span>
    return (
      <span key={i} className="inline-block -rotate-2 rounded-xl bg-mint px-2.5">
        {word}
      </span>
    )
  })
}
