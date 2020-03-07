export class Button extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super()

    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'closed' })

    // Create spans
    const buttonElem = document.createElement('button')
    buttonElem.setAttribute('class', 'button')

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style')
    // console.log(style.isConnected)
    
    style.textContent = `
      .button {
        border: 1px solid #eee;
        padding: 8px 10px;
        border-radius: 2px;
        font-size: 1rem;
        outline: 0;
        color: steelblue;
        transition: .2s ease all;
      }

      .button:hover {
        box-shadow: 0 2px 4px #eee;
      }
      .button:active {
        box-shadow: 0 2px 4px #bbb;
        background: steelblue;
        color: #fff;
      }
    `
    // Attach the created elements to the shadow dom
    shadow.appendChild(style)
    shadow.appendChild(buttonElem)
    
    // Can't use Promise.resolve().then() with `script` tag in `.html` 
    setTimeout(() => {
      buttonElem.textContent = this.textContent || 'a custom button'
      // console.log(style.isConnected)
    }, 0)
  }
}