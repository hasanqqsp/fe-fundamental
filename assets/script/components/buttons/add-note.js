class AddNoteButton extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._style = document.createElement("style");
    this._bg = this.getAttribute("bg") || "teal";
    this._text = this.getAttribute("text") || "white";
  }

  _updateStyle() {
    this._style.textContent = `
        #add-note-button {
            font-size: 1.5rem;
            padding: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            border: 0px;
            background-color: ${this._bg};
            color: ${this._text};
            margin-bottom: 1rem;
            font-family: "Quicksand";
            font-weight: 800;
            border-radius: 0.25rem;
            vertical-align: middle;
            
        }

        #add-note-button:hover
             {
            opacity:0.7;
            cursor: pointer;
        }
        #add-note-button:hover {
            
        }
        `;
  }

  static get observedAttributes() {
    return ["bg", "text"];
  }

  connectedCallback() {
    this.render();
    this._shadowRoot
      .getElementById("add-note-button")
      .addEventListener("click", (event) => {
        this.dispatchEvent(new CustomEvent("toggle-form"));
      });
  }

  disconnectedCallback() {
    this._shadowRoot
      .getElementById("add-note-button")
      .removeEventListener("click", (event) => {
        this.dispatchEvent(new CustomEvent("toggle-form"));
      });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
    this.render();
  }

  render() {
    this._updateStyle();
    this._shadowRoot.innerHTML = `
        ${this._style.outerHTML}
        <button id="add-note-button">
            +&nbsp;&nbsp;Tambahkan Catatan
        </button>;
        `;
  }
}

customElements.define("add-note-button", AddNoteButton);
