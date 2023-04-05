import * as csstree from 'css-tree'
import { getStyles } from '@enhance/arc-plugin-styles'
const generatedStyles = getStyles.styleTag()

function removeOtherComments(input) {
  return input.replace(/([^\^\$\s])\/\*.*?\*\/([\s\S]*?)(?=\/\*.*?\*\/|\n\s*\n|$)/gm, '$1')
}

function extractSections(input) {
  const sectionRegex = /\/\*.*?\*\/([\s\S]*?)(?=\/\*.*?\*\/|\n\s*\n|$)/g
  let sections = [];


  let match;
  while ((match = sectionRegex.exec(input))) {
    const name = match[0].match(/\/\*.*?\*\//g)[0].replace(/\/\*|\*\//g, '').trim();
    const rules = match[1].trim();
    sections.push({ name, rules });
  }
  const removeSections = ['RESET', '----- THEME COLORS -----', 'CUSTOM PROPERTIES',]
  sections = sections.filter(section => !removeSections.includes(section.name))
  return sections;
}


function parseCSS(cssString) {
  const parsed = csstree.parse(cssString);
  const output = [];

  csstree.walk(parsed, (node) => {
    if (node.type === 'Rule') {
      const selector = csstree.generate(node.prelude);
      const declarations = csstree.generate(node.block);

      output.push({ selector, rule: declarations });
    }
  });

  return output;
}



export async function get(req) {
  const styles = extractSections(removeOtherComments(generatedStyles)).map(section => {
    return { name: section.name, rules: parseCSS(section.rules) }
  })

  return {
    json: { styles }
  }


}


