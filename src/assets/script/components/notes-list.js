class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ["title", "notes-data"];
  }

  set title(value) {
    this._title = value;

    this.render();
  }

  set notesData(notes) {
    this._notesData = notes;
    this._updateNotes();

    this._shadowRoot.querySelectorAll("note-item").forEach((item) => {
      item.addEventListener("action-note", (ev) => {
        this.dispatchEvent(new ev.constructor(ev.type, { detail: ev.detail }));
      });
    });
    // this.render();
  }

  _updateNotes() {
    const container = this._shadowRoot.querySelector(".notes-list-container");
    this._emptyContent();
    let notesItemElements = this._notesData.map((note) => {
      const noteItemElement = document.createElement("note-item");

      noteItemElement.note = note;
      return noteItemElement;
    });
    // Utils.emptyElement(noteListElement);

    if (notesItemElements.length) {
      container.append(...notesItemElements);
    } else {
      container.parentElement.innerHTML = `
        <h2>${this._title}</h2>
            <div class="notes-list-container empty">
            <p class="no-data-label">Tidak ada catatan yang dapat ditampilkan</p>
            </div>
      `;
    }
    notesItemElements = [];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._title = this.getAttribute("title") || "Catatan Anda";
    this._notesData = null;
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

    .notes-list-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        gap: 0.75rem;
        align-items:center;
    }
    .notes-list-container.empty {
      display: block;
    }

    section{
      max-width: 100%;
    }
    .no-data-label {
      font-size:1.1rem;
      font-weight:bold;
      text-align:center;
    }
    `;
  }

  _emptyContent() {
    const container = this._shadowRoot.querySelector(".notes-list-container");
    if (container) {
      container.classList.remove("empty");
      container.innerHTML = "";
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.innerHTML = `
        ${this._style.outerHTML}
        <section id="notes-list">
          <h2>${this._title}</h2>
          <div class="notes-list-container">
        
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
