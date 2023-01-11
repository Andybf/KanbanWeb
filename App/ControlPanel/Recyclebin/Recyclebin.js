/**
 * KanbanWeb © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/KanbanWeb/modules/AVElement.js'
export default class Recyclebin extends AVElement {

    currentOnDragStickyNote;

    renderedCallback() {
        this.controlPanelReference = this.getParentComponent('control-panel').body;
        this.addEventListener('drop', event => {this.recyclebinDrop(event)});
        this.addEventListener('dragover', event => {event.preventDefault()});
        this.addEventListener('dragenter', event => {this.recyclebinDragEnter(event)});
        this.addEventListener('dragleave', event => {this.recyclebinDragLeave(event)});
    }

    recyclebinDrop(event) {
        this.currentOnDragStickyNote = this.getParentComponent('app').getChildComponent("board").currentOnDragStickyNote
        if (this.currentOnDragStickyNote) {
            this.currentOnDragStickyNote.parentElement.parentElement.removeChild(this.currentOnDragStickyNote.parentElement);
            this.getParentComponent('app').getChildComponent("board").currentOnDragStickyNote = null;
            this.currentOnDragStickyNote = null;
        }
        event.target.style['animation-name'] = null;
    }

    recyclebinDragEnter(event) {
        event.target.style['animation-name'] = "sparkling";
    }

    recyclebinDragLeave(event) {
        event.target.style['animation-name'] = null;
    }

    activateRecycleBin() {
        this.body.firstChild.style['display'] = 'flex';
        this.controlPanelReference.querySelector('#stickynote-stack-container').style.display = 'none';
        this.controlPanelReference.querySelector('.option-buttons').style.animationName = 'retract-button-options';
    }

    deactivateRecycleBin() {
        this.body.firstChild.style['display'] = null;
        this.controlPanelReference.querySelector('#stickynote-stack-container').style.display =  null;
        this.controlPanelReference.querySelector('.option-buttons').style.animationName = 'expand-button-options';
    }
}