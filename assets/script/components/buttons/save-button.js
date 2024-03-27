class SaveButton extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement("style");
    this._style.textContent = `
        button:hover {
            background-color: rgba(0, 128, 128, 0.8);
            cursor: pointer;
        }
        button {
            font-size: 1.1rem;
            padding: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            border: 0px;
            background-color: rgb(0, 128, 128);
            color: white;
            margin-bottom: 1rem;
            font-family: "Quicksand";
            font-weight: 800;
            border-radius: 0.25rem;
            vertical-align: middle;
        }
    `;
  }

  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
        ${this._style.outerHTML}
        <button type="submit" id="save-button">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-floppy-fill"
            viewBox="0 0 16 16"
            >
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
            </svg>
            &nbsp;Simpan
        </button>
`;
  }
}

customElements.define("save-button", SaveButton);
