import BrowserSave from "/KanbanWeb/modules/BrowserSave.js";

export default class RealoadCache extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = 
        `<button
            class='button-option'
            id="reload-cache"
        >Reload Cache</button>`;
    }

    connectedCallback() {
        this.querySelector("#reload-cache").addEventListener("click", (event) => {
            this.deleteBrowserCache();
        });
    }

    deleteBrowserCache() {
        if (confirm("Reload cache? It will require a working connection with the internet")) {
            window.caches.keys().then( cacheKeys => {
                cacheKeys.map( key => {
                    window.caches.delete(key);
                });
            })
            window.location = window.location;
        }
    }
}