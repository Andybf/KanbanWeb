/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/modules/AVElement.js'
export default class StickyStack extends AVElement {

    stickerStack;
    colorSlide;
    boardReference;

    renderedCallback() {
        this.boardReference = this.getParentComponents().get('comp-app').body.querySelector('comp-board');
        this.stickerStack = this.body.querySelector(".stickynote-stack");
        this.stickerStack.addEventListener('dragstart', () => {this.StackdragStart()});
        this.stickerStack.addEventListener('dragend', () => {this.StackdragEnd()});
        this.initializeButtonsActions();
    }

    StackdragStart() {
        this.boardReference.insertStickynoteSlotsOnColumns();
        this.boardReference.insertNewColumnSlotOnBoard();
        this.stickerStack.classList.add('stickystack-empty');
    }

    StackdragEnd() {
        this.stickerStack.classList.remove('stickystack-empty');
        this.boardReference.removeExistingColumnSlots();
        this.boardReference.removeExistingStickynoteSlots();
    }

    initializeButtonsActions() {
        this.body.querySelectorAll(".option-buttons").forEach( element => {
            Array.from(element.children).forEach( button => {
                button.onclick = event => {this.handleButtonClick(event)};
            }) 
        });
        const event = new MouseEvent('click', null);
        this.body.querySelector("button[data-value*='yellow']").dispatchEvent(event);
    }

    handleButtonClick(event) {
        const attribute = event.target.dataset['attr'];
        const value = event.target.dataset['value'];
        this.applyOptionsOnStickyStack(attribute, value);
        this.updateSelectedOption(event);
    }

    applyOptionsOnStickyStack(attribute, value) {
        this.stickerStack.style[attribute] = value;
    }

    updateSelectedOption(event) {
        Array.from(event.target.parentElement.children).forEach( button => {
            button.classList.remove('selected');
        });
        event.target.classList.add('selected');
    }
}