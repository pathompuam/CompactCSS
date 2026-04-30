export const compactCSS = (css, keepComments = false) => {
  if (!keepComments) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      .replace(/}/g, '}\n')
      .trim()
  }

  const comments = []
  let result = css.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    comments.push(match)
    return `__COMMENT_${comments.length - 1}__`
  })

  result = result
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/}/g, '}\n')

  comments.forEach((comment, i) => {
    result = result.replace(`__COMMENT_${i}__`, `\n\n${comment}\n`)
  })

  return result.trim().replace(/\n{3,}/g, '\n\n')
}

export const minifyCSS = (css, keepComments = false) => {
  if (!keepComments) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim()
  }

  const comments = []
  let result = css.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    comments.push(match)
    return `__COMMENT_${comments.length - 1}__`
  })

  result = result
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')

  comments.forEach((comment, i) => {
    result = result.replace(`__COMMENT_${i}__`, `\n\n${comment}\n`)
  })

  return result.trim().replace(/\n{3,}/g, '\n\n')
}

export const prettyFormatCSS = (css, keepComments = false) => {
  let processedCss = css

  if (!keepComments) {
    processedCss = processedCss.replace(/\/\*[\s\S]*?\*\//g, '')
  } else {
    // ซ่อน Comment ไว้ชั่วคราวเพื่อไม่ให้โดนเคลียร์ Whitespace ทำพัง
    const comments = []
    processedCss = processedCss.replace(/\/\*[\s\S]*?\*\//g, (match) => {
      comments.push(match)
      return `__COMMENT_${comments.length - 1}__`
    })

    // เคลียร์ Whitespace เดิมออกทั้งหมดก่อน
    processedCss = processedCss
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')

    // ใส่ Comment กลับคืน
    comments.forEach((comment, i) => {
      processedCss = processedCss.replace(`__COMMENT_${i}__`, comment)
    })
  }

  // ถ้าไม่เอา Comment ก็เคลียร์ Whitespace ธรรมดา
  if (!keepComments) {
    processedCss = processedCss
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
  }

  let result = ''
  let indent = 0
  let inComment = false
  const chars = processedCss.split('')

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]
    const nextChar = chars[i + 1] || ''

    if (keepComments && char === '/' && nextChar === '*') {
      inComment = true
      result = result.trimEnd() + '\n\n' + '  '.repeat(indent) + char
      continue
    }
    
    if (inComment) {
      result += char
      if (char === '*' && nextChar === '/') {
        inComment = false
        result += nextChar
        i++ 
        result += '\n' + '  '.repeat(indent)
      }
      continue
    }

    if (char === '{') {
      result += ' {\n'
      indent++
      result += '  '.repeat(indent)
    } else if (char === '}') {
      result = result.trimEnd()
      indent--
      result += '\n' + '  '.repeat(indent) + '}\n\n' // เคาะบรรทัดว่างหลังจบ 1 กฎเสมอ
    } else if (char === ';' && nextChar !== '}') {
      result += ';\n' + '  '.repeat(indent)
    } else if (char === ',' && nextChar !== ' ') {
      // ป้องกันการเว้นวรรคซ้ำซ้อนถ้ามีช่องว่างอยู่แล้ว
      result += ', '
    } else {
      result += char
    }
  }

  // จัดการช่องว่างส่วนเกินที่อาจเกิดจากการขึ้นบรรทัดใหม่
  return result.replace(/\n{3,}/g, '\n\n').trim()
}

export const convertCSS = (css, format = 'compact', keepComments = false) => {
  if (!css || typeof css !== 'string') return ''
  switch (format) {
    case 'minify': return minifyCSS(css, keepComments)
    case 'pretty': return prettyFormatCSS(css, keepComments)
    case 'compact': default: return compactCSS(css, keepComments)
  }
}