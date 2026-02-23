/**
 * parseHeadline
 * Converts a raw headline string into React nodes with support for:
 *  - **text** → <strong>text</strong>
 *  - \n      → <br /> (explicit newline)
 *
 * Usage in JSX:
 *   <h1>{parseHeadline(config.heroHeadline)}</h1>
 */

import { Fragment, ReactNode } from 'react';

export function parseHeadline(text: string): ReactNode {
  // Split on both actual newline characters (\u000A) and the two-character
  // escaped sequence \n so the function works regardless of how the config
  // author wrote the string.
  const lines = text.split(/\n|\\n/);

  return lines.map((line, lineIdx) => {
    // Split on **…** markers
    const segments = line.split(/(\*\*[^*]+\*\*)/g);

    return (
      <Fragment key={lineIdx}>
        {segments.map((seg, segIdx) => {
          if (seg.startsWith('**') && seg.endsWith('**')) {
            return <strong key={segIdx}>{seg.slice(2, -2)}</strong>;
          }
          return <Fragment key={segIdx}>{seg}</Fragment>;
        })}
        {lineIdx < lines.length - 1 && <br />}
      </Fragment>
    );
  });
}
