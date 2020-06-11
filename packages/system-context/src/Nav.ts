export function Nav (dom: HTMLElement) {
  if (!dom) return null

  dom.innerHTML = `
    <div class="system-context">
      <nav class="nav">
        <h1>System Context</h1>
        <ul>
          <li>
            <a id="react-link" href="javascript:;">Container React</a>
            <a id="vue-link" href="javascript:;">Container Vue</a>
          </li>
        </ul>
      </nav>
    </div>
  `

  const reactLink = document.getElementById('react-link') 
  const vueLink = document.getElementById('vue-link')

  reactLink.addEventListener('click', function () {
    window.history.pushState(null, null, '/react')
  })
  vueLink.addEventListener('click', function () {
    window.history.pushState(null, null, '/vue')
  })
}