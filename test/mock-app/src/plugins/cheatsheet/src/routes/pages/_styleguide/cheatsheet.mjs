export default function cheatsheet({ html, state }) {
  const { styles } = state.store

  return html`
<style scope="global">
body {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
  font-size: 14px;
}

summary {
  font-size: 18px;
}

.my-table {
  display: grid;
  width: 100%;
}

.my-table li {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 42ch 1fr;
  border-bottom: 1px solid #ccc;
}

.my-table li:nth-of-type(odd) {
  background: hsla(0deg 0% 0% / 4%);
}

</style>
<main class='leading3 p0 p5-lg'>
  <label class='block mb0 mb2-lg'>
    Search: <input id=search-box class="border1 border-solid border-current p-2" placeholder="search text">
  </label>
  <section id="list">
  ${styles.map(section => section.rules.length !== 0 ? `
    <details open>
      <summary class="text0 font-bold pt0 pb0">${section.name}</summary>
      <ul class="my-table">
      ${section.rules.map(rule => `
        <li class="list-none pt0 pb0 pl-2 pr-2">
          <span>${rule.selector.replaceAll(',', ',<br />')}</span>
          <span>
            ${rule.rule
    .replaceAll(',', ', ')
    .replaceAll(':', ': ')
    .replaceAll(';', ';<br />')
    .replaceAll('{', '')
    .replaceAll('}', '')}
          </span>
        </li>
      `).join('')}
      </ul>

    </details>
  `: []).join('')
}
  </section>
</main>

<script type=module>

function filterList() {
  const input = document.getElementById('search-box');
  const list = document.getElementById('list').getElementsByTagName('li');
  const sections = document.getElementsByTagName('details')

  for (var i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.innerHTML.toLowerCase().indexOf(input.value.toLowerCase()) !== -1) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  }
  for (var i = 0; i < sections.length; i++) {
    const section = sections[i]
    const visibleItems = Array.from(section.getElementsByTagName('li')).filter(li => li.style.display !== 'none')
    if (visibleItems.length === 0) {
      section.style.display = 'none'
    } else { section.style.display = 'block'}
  }
}

document.getElementById('search-box').addEventListener('input', filterList);
</script>


  `
}
