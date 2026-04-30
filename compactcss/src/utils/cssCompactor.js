export const compactCSS = (css) => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .trim()
}

export const oneLineCSS = (css) => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\n\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .trim()
}

export const minifyCSS = (css) => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

export const prettyFormatCSS = (css) => {
  let result = ''
  let indent = 0
  const chars = css.split('')

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]
    const nextChar = chars[i + 1] || ''

    if (char === '{') {
      result += ' {\n'
      indent++
      result += '  '.repeat(indent)
    } else if (char === '}') {
      result = result.trimEnd()
      indent--
      result += '\n' + '  '.repeat(indent) + '}\n'
    } else if (char === ';' && nextChar !== '}') {
      result += ';\n' + '  '.repeat(indent)
    } else if (char === ',' && nextChar === ' ') {
      result += ', '
      i++
    } else if (char !== ' ' || (result[result.length - 1] !== ' ' && result[result.length - 1] !== '\n')) {
      result += char
    }
  }

  return result.trim()
}

export const convertCSS = (css, format = 'compact') => {
  if (!css || typeof css !== 'string') {
    return ''
  }

  switch (format) {
    case 'oneline':
      return oneLineCSS(css)
    case 'minify':
      return minifyCSS(css)
    case 'pretty':
      return prettyFormatCSS(css)
    case 'compact':
    default:
      return compactCSS(css)
  }
}
