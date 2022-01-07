/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/modules/AVElement.js'
export default class StickyStack extends AVElement {

    stickerStack;
    boardReference;

    renderedCallback() {
        this.boardReference = this.getParentComponents()[0].body.querySelector("comp-board");
        this.stickerStack = this.body.querySelector("#stickynote-stack");
        this.stickerStack.addEventListener('dragstart', event => {this.StackdragStart(event)});
        this.stickerStack.addEventListener('dragend', event => {this.StackdragEnd(event)});
    }

    StackdragStart(event) {
        console.log('dragStart',event);
        this.boardReference.insertStickynoteSlotsOnColumns();
        this.boardReference.insertNewColumnSlotOnBoard();
    }

    StackdragEnd(event) {
        console.log('dragEnd',event);
        this.boardReference.removeExistingColumnSlots();
        this.boardReference.removeExistingStickynoteSlots();
    }
}