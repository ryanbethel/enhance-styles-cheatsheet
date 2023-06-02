import * as csstree from 'css-tree'
import { getStyles } from '@enhance/arc-plugin-styles'
import { getSections } from '../../../regex/sections.mjs'
const generatedStyles = getStyles.styleTag()
const RESET = 'Reset'

function parseCSS(cssString) {
  const parsed = csstree.parse(cssString)
  const output = []

  csstree.walk(parsed, (node) => {
    if (node.type === 'Rule') {
      const selector = csstree.generate(node.prelude)
      const declarations = csstree.generate(node.block)

      output.push({ selector, rule: declarations })
    }
  })

  return output
}

export async function get() {
  const styles = getSections(generatedStyles)
    .filter(section => section.name !== RESET)
    .map(section => {
      return {
        name: section.name,
        rules: parseCSS(section.rules)
      }
    })

  return {
    json: {
      styles
    }
  }
}

