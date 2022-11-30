/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from "/FreeWebKanban/modules/AVElement.js";

export default class Stickynote extends AVElement{

    boardReference;
    stickynoteStackReference;
    recyclebinReference;
    isUserTouchMoving;
    stickynote;

    renderedCallback() {
        this.boardReference = this.getParentComponent('board');
        this.recyclebinReference = this.getParentComponent('app').getChildComponent('control-panel').getChildComponent('recyclebin');
        this.stickynote = this.body.querySelector('div');
        this.darkBackground = this.body.querySelector('.dark-background');
        this.ondragstart = event => {this.stickynoteDragStart(event)};
        this.ontouchstart = event => {this.stickynoteTouchStart(event)};
        this.ontouchmove = event => {this.stickynoteTouchMove(event)};
        this.ondragend = event => {this.stickynoteDragEnd(event)};
        this.ontouchend = event => {this.stickynoteTouchEnd(event)};
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
        this.body.querySelector('input').value = this.attributes['stickynote-title'].nodeValue;
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

    stickynoteTouchStart(event) {
        this.isUserTouchMoving = true;
    }

    stickynoteTouchMove(event) {
        event.preventDefault();
        if (this.isUserTouchMoving) {
            this.isUserTouchMoving = false;
            this.dispatchEvent(new Event('dragstart'));
        }
    }

    stickynoteDragEnd() {
        this.recyclebinReference.deactivateRecycleBin();
        this.boardReference.removeExistingColumnSlots();
        this.boardReference.removeExistingStickynoteSlots();
    }

    stickynoteTouchEnd(event) {
        this.isUserTouchMoving = false;
        Array.from(this.boardReference.body.querySelectorAll("li.slot")).forEach((item) => {
            if(this.boardReference.calculateEventTouchHitbox(event, item)) {
                event.preventDefault();
                item.dispatchEvent(new Event('drop'));
            }
        });
        if(this.boardReference.calculateEventTouchHitbox(event, this.recyclebinReference)){
            event.preventDefault();
            this.recyclebinReference.dispatchEvent(new Event('drop'));
        }
        this.dispatchEvent(new Event('dragend'));
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
        this.stickynote.querySelector('span').innerText = this.stickynote.querySelector("input").value;
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
        this.ontouchstart = event => {this.stickynoteTouchStart(event)};
        this.ondragend = event => {this.stickynoteDragEnd(event)};
    }

    handleWindowKeyPress(event) {
        if (event.key == 'Escape') {
            this.retractStickynote();
        }
    }
}