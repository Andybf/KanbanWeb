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
    colorOptionsAvailable = [
        'var(--sticky-color-yellow)',
        'var(--sticky-color-red)',
        'var(--sticky-color-green)',
        'var(--sticky-color-blue)',
        'var(--sticky-color-purple)',
        'var(--sticky-color-grey)'
    ];
    fontOptionsAvailable = [
        'cursive',
        'fantasy',
        'monospace',
        'sans-serif',
        'CraftyGirls',
        'serif'
    ];

    connectedCallback() {
        this.boardReference = this.getParentComponents()[0];
        this.recyclebinReference = this.getParentComponents()[1].body.querySelector("comp-recyclebin");
    }

    renderedCallback() {
        this.stickynote = this.body.querySelector('div');
        this.addEventListener('dragstart', event => {this.stickynoteDragStart(event)});
        this.addEventListener('dragend', event => {this.stickynoteDragEnd(event)});
        this.onfocus = event => {this.activateStickerOptions(event)}
        this.onblur = event => {this.deactivateStickerOptions(event)}
        this.generateColorForSticker();
        this.generateRotationForSticker();
    }

    generateColorForSticker() {
        let stickerBody = this.body.querySelector('div');
        this.cardStyleInformation.forEach( (value,key) => {
            stickerBody.style[key] = value;
        })
    }

    generateRotationForSticker() {
        this.body.querySelector('div').style['transform'] = `rotate(${(Math.random() * 6)+357}deg)`;
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
        setTimeout(() => {
            for(let optComp of this.getChildrenComponents()) {
                optComp.activateOptionPanel();
            }
        },250);
        this.stickynote.style['z-index'] = '102';
    }

    deactivateStickerOptions() {
        setTimeout(() => {
            for(let optComp of this.getChildrenComponents()) {
                optComp.deactivateOptionPanel();
            }
            setTimeout(() => {
                this.stickynote.style['z-index'] = null;
            },1000);
        },250);
    }
}