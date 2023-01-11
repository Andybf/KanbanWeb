import BrowserSave from "/FreeWebKanban/modules/BrowserSave.js";

export default class RealoadCache extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = 
        `<button
            class='button-option'
            id="reload-cache"
        >Reaload Cache</button>`;
    }

    connectedCallback() {
        this.querySelector("#reload-cache").addEventListener("click", (event) => {
            this.deleteBrowserCache();
        });
    }

    deleteBrowserCache() {
        window.caches.keys().then( cacheKeys => {
            cacheKeys.map( key => {
                window.caches.delete(key);
            });
        })
        window.location = window.location;
    }
}