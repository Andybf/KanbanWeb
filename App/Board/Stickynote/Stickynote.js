/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from "/modules/AVElement.js";

export default class Stickynote extends AVElement{

    boardReference;
    stickyStackReference;
    recyclebinReference;
    stickynote;
    cardStyleInformation = new Map();

    connectedCallback() {
        this.boardReference = this.getParentComponents().get('comp-board');
        this.recyclebinReference = this.getParentComponents().get('comp-app').body.querySelector("comp-recyclebin");
    }

    renderedCallback() {
        this.stickynote = this.body.querySelector('div');
        this.darkBackground = this.body.querySelector('.dark-background');
        this.ondragstart = event => {this.stickynoteDragStart(event)};
        this.ondragend = event => {this.stickynoteDragEnd(event)};
        this.stickynote.onmouseup = event => {this.activateStickerOptions(event);}
        this.darkBackground.addEventListener('click', event => {
            this.deactivateStickerOptions(event)
        });
        this.generateColorForSticker();
        this.generateRotationForSticker();
        this.loadNewChildrenComponent('comp-stickynote-options');
    }

    generateColorForSticker() {
        let stickerBody = this.body.querySelector('div');
        this.cardStyleInformation.forEach( (value,key) => {
            stickerBody.style[key] = value;
        })
    }

    generateRotationForSticker() {
        this.body.querySelector('div').style['transform'] = `rotate(${(Math.random() * 6)+357}deg)`;
        this.stickynoteRotation = this.body.querySelector('div').style['transform'];
    }

    stickynoteDragStart(event) {
        this.recyclebinReference.activateRecycleBin();
        this.boardReference.currentOnDragStickyNote = event.target;
        this.boardReference.insertStickynoteSlotsOnColumns();
        this.boardReference.insertNewColumnSlotOnBoard();
    }

    stickynoteDragEnd() {
        this.recyclebinReference.deactivateRecycleBin();
        this.boardReference.removeExistingColumnSlots();
        this.boardReference.removeExistingStickynoteSlots();
    }

    activateStickerOptions() {
        this.stickynote.classList.add('stickynote-content-expanded');
        this.body.querySelector('.dark-background').style.display = 'unset';
        setTimeout(() => {
            this.darkBackground.style.backdropFilter = 'blur(10px)';
        },750);
        this.body.firstElementChild.setAttribute('draggable', false);
        this.ondragstart = null;
        this.ondragend = null;
        this.stickynote.onmouseup = null;
        this.stickynote.prepend(document.createElement('comp-stickynote-options'));
        let x = Math.round(window.innerWidth*0.166 - this.stickynote.getBoundingClientRect().x);
        let y = Math.round(window.innerHeight*0.25 - this.stickynote.getBoundingClientRect().y);
        this.stickynote.style['transform'] = `translate(${x}px, ${y}px)`;
    }

    deactivateStickerOptions() {
        this.stickynote.classList.remove('stickynote-content-expanded');
        this.darkBackground.style.display = null;
        this.darkBackground.style.backdropFilter = null;
        this.body.firstElementChild.setAttribute('draggable', true);
        this.stickynote.style['transform'] = this.stickynoteRotation;
        this.ondragstart = event => {this.stickynoteDragStart(event)};
        this.ondragend = event => {this.stickynoteDragEnd(event)};
        this.stickynote.onmouseup = event => {this.activateStickerOptions(event);}
        this.stickynote.removeChild(this.stickynote.firstElementChild);
    }
}