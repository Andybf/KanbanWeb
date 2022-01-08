/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/modules/AVElement.js'
export default class StickyStack extends AVElement {

    stickerStack;
    colorSlide;
    boardReference;

    renderedCallback() {
        this.boardReference = this.getParentComponents()[0].body.querySelector("comp-board");
        this.stickerStack = this.body.querySelector(".stickynote-stack");
        this.stickerStack.addEventListener('dragstart', event => {this.StackdragStart(event)});
        this.stickerStack.addEventListener('dragend', event => {this.StackdragEnd(event)});

        // this.colorSlide = this.body.querySelector("input[type='range']");
        // this.colorSlide.onmousedown = () => {
        //     this.colorSlide.addEventListener('mousemove', event => {this.StickerColorSlideChanged(event)});
        // };
        // this.colorSlide.onmouseup = () => {
        //     this.colorSlide.onmousedown = null;
        // };
    }

    StackdragStart(event) {
        this.boardReference.insertStickynoteSlotsOnColumns();
        this.boardReference.insertNewColumnSlotOnBoard();
        this.stickerStack.classList.add('stickystack-empty');
    }

    StackdragEnd(event) {
        this.stickerStack.classList.remove('stickystack-empty');
        this.boardReference.removeExistingColumnSlots();
        this.boardReference.removeExistingStickynoteSlots();
    }

    StickerColorSlideChanged(event) {
        let colorList = [
            '--sticky-color-yellow',
            '--sticky-color-red',
            '--sticky-color-green',
            '--sticky-color-blue',
            '--sticky-color-purple',
            '--sticky-color-grey'
        ];
        let selectedColor = colorList[event.target.value];
        this.body.querySelector('div').style['background-color'] = `var(${selectedColor})`;
    }
}