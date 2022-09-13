/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/FreeWebKanban/modules/AVElement.js'
export default class App extends AVElement {
    
    renderedCallback() {
        this.body.querySelector("h1").addEventListener("click", 
            (event) => {this.toggleEasterEgg(event);}
        );
    }

    toggleEasterEgg() {
        const extraInfoContainer = this.body.querySelector("div.extra-info-container");
        extraInfoContainer.style.display = getComputedStyle(extraInfoContainer).display == 'none' ? 'grid' : 'none';
    }
    
}