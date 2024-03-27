class AddNoteForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._display = "none";
    this._maxChar = 50;
    this._charCount = 0;
  }

  _updateStyle() {
    this._style.textContent = `
        
        :host {
            flex-grow: 1;
            width: 100%;
            padding: 0.75rem!important;
            background-color: white;
            margin-bottom: 1rem!important;
            border-radius: 5px;
            display: ${this._display};
        }

        #add-note-form label {
            display: block;
            
            position: absolute;
            top: 0.75rem;
            z-index: 10;
            left: 0.75rem;
            transition: 150ms all ease-in-out;
            font-size:1rem;
        }

        input[type="text"] {
            display: block;
            width: 100%;
            height: 1rem;
            border: 1px solid teal;
            padding: 0.75rem;
            border-radius: 4px;
            font-size: 1.2rem;
            font-family:inherit;
        }

        #input-title:focus-visible,
        #input-body:focus-visible {
            outline: none;
        }

        .form-group {
            flex-grow: 1;
            position: relative;
            margin-bottom: 1rem;
            display: flex;
            flex-wrap: wrap;
            width:100%;
        }

        #input-title:focus-visible ~ label,
        #input-body:focus-visible ~ label,
        #input-title:valid ~ label,
        #input-body:valid ~ label {
            left: 0.75rem;
            top: -10px;
            font-size: 1rem;
            z-index: 9;
            padding-left: 2px;
            padding-right: 2px;
            background-color: white;
        }

        .input-description,#helper-input-title-counter {
            font-size: 0.9rem;
            margin :0;
            margin-top : 3px;
        }


        #input-body {
            width: 100%;
            border: 1px solid teal;
            padding: 0.75rem;
            border-radius: 4px;
            font-family:inherit;
            font-size: 1.2rem;
        }

        .button-right {
            display: flex;
            justify-content: end;
            width:100%;
        }
        form {
            display:flex;
            flex-wrap:wrap;

        }
        h2 {
            font-size:1.75rem;
            margin-top:0.75rem;
            margin-bottom: 1.25rem;
        }
        .input-helper {
            width:100%;
            display:flex;
            justify-content:space-between;
            color: rgba(0, 0, 0, 0.7);
        }
        `;
  }

  connectedCallback() {
    this.render();
  }
  disconnectedCallback() {
    this._shadowRoot
      .getElementById("input-title")
      .removeEventListener("click", (ev) => {
        this._charCount = ev.target.value.length;
        if (this._charCount >= this._maxChar) {
          ev.target.value.substring(0, this._maxChar);
        }
      });

    this._shadowRoot
      .querySelector("form")
      .removeEventListener("submit", (ev) => {
        ev.preventDefault();
        const title = this._shadowRoot.getElementById("input-title").value;
        const body = this._shadowRoot.getElementById("input-body").value;
        this.onFormSubmit({ title, body });
        ev.target.reset();
      });
  }

  static get observedAttributes() {
    return ["display"];
  }

  set display(value) {
    this._display = value;
    this.render();
  }

  get display() {
    return this._display;
  }

  onFormSubmit({ title, body }) {
    this.dispatchEvent(
      new CustomEvent("add-note", { detail: { title, body } })
    );
  }

  render() {
    this._updateStyle();
    this._shadowRoot.innerHTML = `
        ${this._style.outerHTML}
        <section id="add-note-form">
            <h2>Tambahkan Catatan</h2>
            <form>
                <div class="form-group">
                    <input type="text" name="title" id="input-title" required aria-describedby="#helper-input-title" max=50/>
                    <label for="title">Judul Catatan </label>
                    <div class="input-helper">
                        <p class="input-description" id="helper-input-title">Maksimal 50 karakter</p>
                        <p class="input-counter" id="helper-input-title-counter" ><span id="char-remaining">${this._maxChar}</span>/${this._maxChar}</p>
                    </div>

                </div>
                <div class="form-group">
                    <textarea name="body" id="input-body" rows="10" required></textarea>
                    <label for="body">Isi Catatan</label>
                </div>
                <div class="button-right">
                    <save-button></save-button>
                </div>
            </form>
        </section>`;

    this._shadowRoot
      .getElementById("input-title")
      .addEventListener("input", (ev) => {
        ev.target.value = ev.target.value.substring(0, this._maxChar);
        this._charCount = ev.target.value.length;
        const remainChar = this._maxChar - this._charCount;
        this._shadowRoot.getElementById("char-remaining").textContent =
          remainChar;
        const inputHelper = this._shadowRoot.querySelector(".input-helper");
        if (remainChar == 0) {
          ev.target.style.border = "1px solid red";
          inputHelper.style.color = "red";
        } else {
          ev.target.style.border = "1px solid teal";
          inputHelper.style.color = "";
        }
      });

    this._shadowRoot.querySelector("form").addEventListener("submit", (ev) => {
      ev.preventDefault();
      const title = this._shadowRoot.getElementById("input-title").value;
      const body = this._shadowRoot.getElementById("input-body").value;
      this.onFormSubmit({ title, body });
      ev.target.reset();
    });
  }
}

customElements.define("add-note-form", AddNoteForm);
