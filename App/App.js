import AVElement from '/KanbanWeb/modules/AVElement.js';
import BrowserSave from "/KanbanWeb/modules/BrowserSave.js";

export default class App extends AVElement {
    
    renderedCallback() {
        this.body.querySelector("h1").addEventListener("click", 
            (event) => {this.toggleEasterEgg(event);}
        );
        this.body.querySelector("input[id='board-title']").addEventListener("change", 
            (event) => {BrowserSave.checkAutoSave(event);}
        );
    }

    toggleEasterEgg() {
        const extraInfoContainer = this.body.querySelector("div.extra-info-container");
        extraInfoContainer.style.display = getComputedStyle(extraInfoContainer).display == 'none' ? 'grid' : 'none';
    }
    
}