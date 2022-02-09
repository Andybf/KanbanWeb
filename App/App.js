/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from './modules/AVElement.js'
export default class App extends AVElement {
    
    renderedCallback() {
        this.body.querySelector('h1').onclick = event => {
            event.target.firstElementChild.classList.add('visible');
        };
    }
    
}