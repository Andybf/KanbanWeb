/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/modules/AVElement.js'
export default class LoadBoard extends AVElement {

    renderedCallback() {
        let json = this.getSaveFile();
        this.loadFromJson(json);
    }

    getSaveFile() {
        return JSON.parse('{"placeholder": "value"}');
    }

    loadFromJson(json) {
        console.log(json);
    }
}