export default function cheatsheet({ html, state }) {
  const { styles } = state.store

  return html`
<style scope=global>
.my-table {
  display: table;
  border-collapse: collapse;
  width: 100%;
}

.my-table li {
  display: table-row;
  border-bottom: 1px solid #ccc;
}


.my-table li span {
  display: table-cell;
  padding: 5px 10px;
  text-align: left;
  vertical-align: middle;
}
</style>
<main>
  <label>Search:<input id=search-box class="border1 border-solid border-current p-2" placeholder="search text"></label>
  <section id=list>
  ${styles.map(section => section.rules.length !== 0 ? `
    <details open class="m0">
      <summary>${section.name}</summary>
      <ul class=my-table>
      ${section.rules.map(rule => `
        <li class="list-none m-2"><span>${rule.selector}:</span><span> ${rule.rule}</span></li>
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


