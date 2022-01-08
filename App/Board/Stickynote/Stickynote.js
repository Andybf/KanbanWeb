/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from "/modules/AVElement.js";

export default class Stickynote extends AVElement{

    boardReference;
    stickyStackReference;

    connectedCallback() {
        this.boardReference = this.getParentComponents()[0];
    }

    renderedCallback() {
        this.addEventListener('dragstart', event => {this.stickynoteDragStart(event)});
        this.addEventListener('dragend', event => {this.stickynoteDragEnd(event)});
        this.generateColorForSticker();
        this.generateRotationForSticker();
    }

    generateColorForSticker() {
        let colorList = [
            '--sticky-color-yellow',
            '--sticky-color-red',
            '--sticky-color-green',
            '--sticky-color-blue',
            '--sticky-color-purple',
            '--sticky-color-grey'
        ];
        let generatedNumber = Math.round(Math.random() * 5);
        let selectedColor = colorList[generatedNumber];
        this.body.querySelector('div').style['background-color'] = `var(${selectedColor})`;
    }

    generateRotationForSticker() {
        this.body.querySelector('div').style['transform'] = `rotate(${(Math.random() * 6)+357}deg)`;
    }

    stickynoteDragStart(event) {
        console.log('stickynoteDragStart',event);
        
        this.boardReference.currentOnDragStickyNote = event.target;
        this.boardReference.insertStickynoteSlotsOnColumns();
        this.boardReference.insertNewColumnSlotOnBoard();
    }

    stickynoteDragEnd(event) {
        console.log('stickynoteDragEnd', event);
        this.boardReference.removeExistingColumnSlots();
        this.boardReference.removeExistingStickynoteSlots();
    }
}