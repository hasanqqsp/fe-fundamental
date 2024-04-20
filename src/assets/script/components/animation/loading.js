class Loading extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: "open",
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
            <style>
                :host { 
                    width:100vw;
                    height:100vh;
                    max-width:100vw;
                    max-height:100vh;
                    position:fixed;
                    background-color:white;
                    display:none;
                    justify-content:center;
                    align-items:center;
                    
                }
                 svg{
                    height: 15rem;
                    color:teal;
                }
            </style>
            <svg fill="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="3" r="0"><animate id="spinner_318l" begin="0;spinner_cvkU.end-0.5s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="16.50" cy="4.21" r="0"><animate id="spinner_g5Gj" begin="spinner_318l.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="7.50" cy="4.21" r="0"><animate id="spinner_cvkU" begin="spinner_Uuk0.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="19.79" cy="7.50" r="0"><animate id="spinner_e8rM" begin="spinner_g5Gj.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="4.21" cy="7.50" r="0"><animate id="spinner_Uuk0" begin="spinner_z7ol.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="21.00" cy="12.00" r="0"><animate id="spinner_MooL" begin="spinner_e8rM.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="3.00" cy="12.00" r="0"><animate id="spinner_z7ol" begin="spinner_KEoo.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="19.79" cy="16.50" r="0"><animate id="spinner_btyV" begin="spinner_MooL.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="4.21" cy="16.50" r="0"><animate id="spinner_KEoo" begin="spinner_1IYD.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="16.50" cy="19.79" r="0"><animate id="spinner_1sIS" begin="spinner_btyV.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="7.50" cy="19.79" r="0"><animate id="spinner_1IYD" begin="spinner_NWhh.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle><circle cx="12" cy="21" r="0"><animate id="spinner_NWhh" begin="spinner_1sIS.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="0;2;0" keyTimes="0;.2;1" keySplines="0,1,0,1;.53,0,.61,.73" fill="freeze"/></circle></svg>
        `;
  }
}
customElements.define("loading-fs", Loading);
