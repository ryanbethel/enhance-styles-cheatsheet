import test from 'tape'
import {
  getSections
} from '../../src/regex/sections.mjs'

test('should extract sections', t=> {
  const input = `
  /*** SOMETHING ***/
  .foo {
    display: content;
  }
  /*** OR ***/
  .bar {
    color: red;
  }
  /*** OTHER ***/
  .baz {
    background: deeppink;
  }
`
  const sections = getSections(input)
  t.equals(sections.length, 3, 'Gets all sections')
  t.equal(sections[0].name, 'SOMETHING', 'Parses first section name')
  t.equal(sections[2].name, 'OTHER', 'Parses last section name')
  t.ok(sections[0].rules)
  t.end()
})
