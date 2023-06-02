export const sectionRegex =  /\/\*.*?\*\/([\s\S]*?)(?=\/\*.*?\*\/|\n\s*\n|$)/g
export const sectionNameRegex = /\/\*.*?\*\//g
export const sectionNameReplaceRegex = /\/\*\*\*|\*\*\*\//g
export const otherCommentsRegex = /([^$\s])\/\*.*?\*\/([\s\S]*?)(?=\/\*.*?\*\/|\n\s*\n|$)/gm

function removeOtherComments(input) {
  return input.replace(otherCommentsRegex, '$1')
}

export function getSection(str) {
  return sectionRegex.exec(str)
}

export function getSectionName(str) {
  return str.replace(sectionNameReplaceRegex, '')
    .trim()
}

export function getSections(str) {
  const input = removeOtherComments(str)
  let sections = []
  let match
  while((match = getSection(input))) {
    const name = getSectionName(match[0].match(sectionNameRegex)[0])
    const rules = match[1].trim()
    sections.push({ name, rules })
  }

  return sections
}

