import BrowserSave from "/FreeWebKanban/modules/BrowserSave.js";

export default class QuickSave extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = 
        `<button
            class='button-option'
            id="button-save"
        >Quick Save</button>`;
    }

    connectedCallback() {
        this.querySelector("#button-save").addEventListener("click",
            (event) => {BrowserSave.saveOnBrowserStorage(event)
        });
    }
}