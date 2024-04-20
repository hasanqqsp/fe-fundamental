class AppHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._style = document.createElement("style");
  }

  connectedCallback() {
    this._style.textContent = `
      header {
        background-color: teal;
        min-height: 3.5rem;
        display: flex;
        padding: 0.5rem;
        align-items: center;
        color: white;
        justify-content:center;
        box-sizing:border-box;
      }
      h1 {
        margin-bottom:0.2rem;
        margin-top:0.2rem;
        font-size:1.75rem;
        max-width:1400px;
        width:100%;

      }
    `;
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
        ${this._style.outerHTML}
        <header>
            <h1>Notes App</h1>
        </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
