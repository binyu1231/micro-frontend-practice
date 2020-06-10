export function Nav (dom: HTMLElement) {
  if (!dom) return null

  dom.innerHTML = `
    <div class="system-context">
      <nav class="nav">
        <h1>System Context</h1>
        <ul>
          <li>
            <a href="/react">Container React</a>
            <a href="/vue">Container Vue</a>
          </li>
        </ul>
      </nav>
    </div>
  `
}