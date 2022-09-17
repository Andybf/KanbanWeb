/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from "/FreeWebKanban/modules/AVElement.js";

export default class Stickynote extends AVElement{

    boardReference;
    stickynoteStackReference;
    recyclebinReference;
    stickynote;

    renderedCallback() {
        this.boardReference = this.getParentComponents().get('comp-board');
        this.recyclebinReference = this.getParentComponents().get('comp-app').body.querySelector("comp-recyclebin");
        this.stickynote = this.body.querySelector('div');
        this.darkBackground = this.body.querySelector('.dark-background');
        this.ondragstart = event => {this.stickynoteDragStart(event)};
        this.ondragend = event => {this.stickynoteDragEnd(event)};
        this.stickynote.onmouseup = event => {this.expandStickynote(event);}
        this.darkBackground.addEventListener('click', event => {
            this.retractStickynote(event);
        });
        this.generateColorForSticker();
        this.generateContentForSticker();
        this.generateRotationForSticker();
        this.loadNewChildrenComponent('comp-stickynote-options');
    }

    generateColorForSticker() {
        let stickerBody = this.body.querySelector('div');
        stickerBody.style['background-color'] = this.attributes['background-color'].nodeValue;
    }

    generateContentForSticker() {
        this.body.querySelector('article').innerHTML = this.attributes['textvalue'].nodeValue;
    }

    generateRotationForSticker() {
        this.stickynote.style['transform'] = `rotate(${(Math.random() * 6)+-3}deg)`;
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

    expandStickynote() {
        this.stickynote.classList.add('stickynote-content-expanded');
        this.body.querySelector('.dark-background').style.display = 'unset';
        setTimeout(() => {
            this.darkBackground.classList.add('background-blur');
        },330);
        this.body.firstElementChild.setAttribute('draggable', false);
        this.body.firstElementChild.setAttribute('hoverEffect', false);
        this.ondragstart = null;
        this.ondragend = null;
        this.stickynote.onmouseup = null;
        this.stickynote.prepend(document.createElement('comp-stickynote-options'));
        window.onkeydown = event => {this.handleWindowKeyPress(event)};
    }

    retractStickynote() {
        this.stickynote.classList.remove('stickynote-content-expanded');
        this.stickynote.style['transform'] = this.stickynoteRotation;
        this.stickynote.style['position'] = 'absolute';
        setTimeout(() => {
            this.stickynote.style['position'] = null;
        },330);
        this.stickynote.onmouseup = event => {this.expandStickynote(event);}
        this.stickynote.removeChild(this.stickynote.firstElementChild);
        this.darkBackground.classList.remove('background-blur');
        this.darkBackground.style = null;
        this.body.firstElementChild.setAttribute('draggable', true);
        this.body.firstElementChild.setAttribute('hoverEffect', true);
        this.ondragstart = event => {this.stickynoteDragStart(event)};
        this.ondragend = event => {this.stickynoteDragEnd(event)};
    }

    handleWindowKeyPress(event) {
        if (event.key == 'Escape') {
            this.retractStickynote();
        }
    }
}