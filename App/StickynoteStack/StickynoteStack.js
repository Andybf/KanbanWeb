/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/FreeWebKanban/modules/AVElement.js'
export default class StickynoteStack extends AVElement {

    stickerStack;
    colorSlide;
    boardReference;

    renderedCallback() {
        this.boardReference = this.getParentComponents().get('comp-app').body.querySelector('comp-board');
        this.stickerStack = this.body.querySelector(".stickynote-stack");
        this.stickerStack.addEventListener('dragstart', (event) => {this.StackdragStart(event)});
        this.stickerStack.addEventListener('touchstart', (event) => {this.StackTouchStart(event)});
        this.stickerStack.addEventListener('dragend', (event) => {this.StackdragEnd(event)});
        this.stickerStack.addEventListener('touchend', (event) => {this.StackTouchEnd(event)});
        this.initializeButtonsActions();
    }

    StackTouchStart(event) {
        event.preventDefault();
        this.stickerStack.dispatchEvent(new Event('dragstart'));
    }

    StackdragStart(event) {
        this.boardReference.insertStickynoteSlotsOnColumns();
        this.boardReference.insertNewColumnSlotOnBoard();
        this.stickerStack.classList.add('stickynoteStack-empty');
    }

    StackTouchEnd(event) {
        Array.from(this.boardReference.body.querySelectorAll("li.slot")).forEach((item) => {
            if(this.boardReference.calculateEventTouchHitbox(event, item)) {
                event.preventDefault();
                item.dispatchEvent(new Event('drop'));
            }
        });
        this.stickerStack.dispatchEvent(new Event('dragend'));
    }

    StackdragEnd(event) {
        this.stickerStack.classList.remove('stickynoteStack-empty');
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
        this.applyOptionsOnstickynoteStack(attribute, value);
        this.updateSelectedOption(event);
    }

    applyOptionsOnstickynoteStack(attribute, value) {
        this.stickerStack.style[attribute] = value;
    }

    updateSelectedOption(event) {
        Array.from(event.target.parentElement.children).forEach( button => {
            button.classList.remove('selected');
        });
        event.target.classList.add('selected');
    }
}