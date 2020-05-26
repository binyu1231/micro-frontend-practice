export function Nav (dom: HTMLElement) {
  if (!dom) return null

  dom.innerHTML = `
    <div class="system-context">
      <nav class="nav">
        <h1>System Context</h1>
        <ul>
          <li>
            <a href="/container-react">Container React</a>
            <a href="/container-vue">Container Vue</a>
          </li>
        </ul>
      </nav>
    </div>
  `
}