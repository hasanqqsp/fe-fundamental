class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _column = 2;
  _gutter = 16;

  //   static get observedAttributes() {
  //     return ["column", "gutter"];
  //   }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    // this.render();
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
      width :100%;
      display:flex;
      
    }
    #notes-list {
        width: 100%;
        background-color: white;
        flex-grow: 1;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 8px 0px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
    }

    #notes-list > h2 {
      font-size:1.75rem;
      margin-top:0.75rem;
        margin-bottom: 1rem;
    }

    #notes-list-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        gap: 0.75rem;
        align-items:center;
    }

    section{
      max-width: 100%;
    }
    h2 {
      
    }
    `;
  }

  _emptyContent() {
    const container = this._shadowRoot.querySelector("#notes-list-container");
    if (container) {
      container.innerHTML = "";
    }
  }

  connectedCallback() {
    this.render();

    // this.shadowRoot
    //   .querySelector("note-item")
    //   .addEventListener("delete-note", () => {
    //     console.log("delete");
    //   });
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      
        <section id="notes-list">
          <h2>Catatan Anda</h2>
          <div id="notes-list-container">

          </div>
        </section>

    `;
  }

  //   attributeChangedCallback(name, oldValue, newValue) {
  //     switch (name) {
  //       case "column":
  //         this.column = newValue;
  //         break;
  //       case "gutter":
  //         this.gutter = newValue;
  //         break;
  //     }

  //     this.render();
  //   }
}

customElements.define("notes-list", NotesList);
