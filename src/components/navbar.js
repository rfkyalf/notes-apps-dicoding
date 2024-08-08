class CustomNavbar extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
    <style>
    nav {
      background-color: #1e1b4b;
      padding: 0 50px;
      display: flex;
      align-items: center;
      color: white;
    }
    nav h1 {
      font-size: 30px; 
      font-weight: 600
    }
    </style>
    <nav>
    <h1>Notes Apps</h1>
  </nav>
    `;
  }
}

customElements.define('custom-navbar', CustomNavbar);
