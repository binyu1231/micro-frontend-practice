import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo activator" href="#">
                <i />
                single-spa-examples
              </a>
              <a href="#" data-activates="mobile-demo" className="button-collapse">
                <i className="material-icons">
                  menu
                </i>
              </a>
              <ul className="right hide-on-med-and-down">
                {menuItems.call(this)}
              </ul>
            </div>
          </nav>
        </div>
        <ul className="side-nav" id="mobile-demo">
          {menuItems.call(this)}
        </ul>
      </div>
    );
  }

  navigateTo = url => window.history.pushState(null, null, url)
}

function menuItems() {
  return (
    <div>
      <li>
        <a onClick={() => this.navigateTo("/")}>
          Home
        </a>
      </li>
      <li>
        <a onClick={() => this.navigateTo("/react")}>
          React
        </a>
      </li>
      <li>
        <a onClick={() => this.navigateTo("/angular")}>
          Angular
        </a>
      </li>
      <li>
        <a onClick={() => this.navigateTo("/vue")}>
          Vue.js
        </a>
      </li>
    </div>
  )
}
