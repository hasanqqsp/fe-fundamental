class ActionButton extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._style = document.createElement("style");
    this.type = this.getAttribute("type") || "delete";
  }

  static get observedAttributes() {
    return ["type"];
  }

  set type(value) {
    this._type = value;
    this._bgColor =
      value === "delete" ? "rgb(221, 37, 37)" : "rgb(108,117,125)";
    this._bgColorHover =
      value === "delete" ? "rgba(221, 37, 37,0.8)" : "rgba(108,117,125,0.8)";
    this.render();
  }

  connectedCallback() {
    this.render();

    this._shadowRoot.querySelector("button").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("action-note", {
          detail: this.getAttribute("id"),
          bubbles: true,
        }),
      );
    });
  }

  _updateStyle() {
    this._style.textContent = `
        .action-button {
            padding: 0.25rem;
            background-color: ${this._bgColor};
            border: 0;
            border-radius: 3px;
            color: white;
            vertical-align: middle;
            aspect-ratio: 1;
        }
        .action-button:hover {
            cursor: pointer;
            background-color: ${this._bgColorHover};
        }
    `;
  }

  render() {
    this._updateStyle();

    this.shadowRoot.innerHTML = `
            ${this._style.outerHTML}
            ${
              this._type === "delete"
                ? `
            <button class="action-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </button>
          `
                : this._type === "archive"
                  ? `<button class="action-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-zip-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 9.438V8.5h1v.938a1 1 0 0 0 .03.243l.4 1.598-.93.62-.93-.62.4-1.598a1 1 0 0 0 .03-.243"
                      />
                      <path
                        d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-4-.5V2h-1V1H6v1h1v1H6v1h1v1H6v1h1v1H5.5V6h-1V5h1V4h-1V3zm0 4.5h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V8.5a1 1 0 0 1 1-1"
                      />
                    </svg>
                  </button>`
                  : this._type === "unarchive"
                    ? `<button class="action-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-zip-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 9.438V8.5h1v.938a1 1 0 0 0 .03.243l.4 1.598-.93.62-.93-.62.4-1.598a1 1 0 0 0 .03-.243"
                      />
                      <path
                        d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-4-.5V2h-1V1H6v1h1v1H6v1h1v1H6v1h1v1H5.5V6h-1V5h1V4h-1V3zm0 4.5h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V8.5a1 1 0 0 1 1-1"
                      />
                    </svg>
                  </button>`
                    : ""
            }
         
    `;
  }
}

customElements.define("action-button", ActionButton);
