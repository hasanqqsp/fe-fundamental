class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: "open",
    });
    // this._template = document
    //   .querySelector("template#note-item")
    //   .content.cloneNode(true);

    this._style = document.createElement("style");
    this._style.textContent = `
      :host {
        height:100%;
      }
      .note-item {
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        padding: 0.75rem;
      }
      .note-item-header {
        display: flex;
        justify-content: space-between;
      }
      .note-title {
        font-weight: 700;
        margin-top:0.25rem;
        margin-bottom:0.5rem;
        font-size:1.3rem;
        word-break: break-word;
      }
      .left{
        flex-basis:80%
      }
      .modified-date {
        font-size: 1.05rem;
        color: rgba(0, 0, 0, 0.7);
        margin-top:0.25rem;
        margin-bottom: 0.5rem;
      }
      .note-body {
        font-size : 1.1rem;
        margin-bottom :0;
        white-space: pre;
        text-wrap:balance;
      }
    `;
  }

  set note(value) {
    this._note = value;

    this.render();

    this._shadowRoot
      .querySelector("delete-button")
      .addEventListener("delete-note", (ev) =>
        this.dispatchEvent(new ev.constructor(ev.type, { detail: ev.detail }))
      );
  }

  get note() {
    return this._note;
  }

  static get observedAttributes() {
    return ["note"];
  }

  render() {
    this._shadowRoot.innerHTML = `
    
    ${this._style.outerHTML}
    
    <article class="note-item">
        <div class="note-item-header">
          <div class="left">
            <h3 class="note-title">${this.note?.title}</h3>
            <p name="note-date" class="modified-date">
              ${new Date(this.note?.createdAt).toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div class="note-action">
            <delete-button id="${this.note?.id}"></delete-button>
          </div>
        </div>
        <p name="note-body" class="note-body"
          >${this._note?.body}</p
        >
      </article>`;
  }
}
customElements.define("note-item", NoteItem);
