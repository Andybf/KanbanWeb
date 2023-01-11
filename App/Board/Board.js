/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/FreeWebKanban/modules/AVElement.js';
import BrowserSave from "/FreeWebKanban/modules/BrowserSave.js";

export default class Board extends AVElement {

    boardList;
    currentOnDragStickyNote;
    controlPanelReference;

    connectedCallback() {
        this.controlPanelReference = this.getParentComponent('app').getChildComponent("control-panel");
    }

    renderedCallback() {
        this.boardList = this.body.querySelector("ul.column-list");
        this.loadNewChildrenComponent('comp-stickynote');
    }

    dropOnStickynoteSlot(event) {
        if (this.currentOnDragStickyNote) {
            event.target.parentElement.appendChild(this.currentOnDragStickyNote.parentElement);
            this.currentOnDragStickyNote = null;
        } else {
            this.createNewStickernoteOnColumnList(event.target.parentElement);
        }
    }

    createNewStickernoteOnColumnList(target) {
        let compStickerNote = document.createElement("comp-stickynote");
        let listItem = target.lastElementChild;
        this.deactivateStickerSlot(listItem);
        listItem.appendChild(compStickerNote);
        this.controlPanelReference.body.querySelectorAll(".selected").forEach(element => {
            compStickerNote.setAttribute(element.dataset['attr'], element.dataset['value']);
        });
    }

    insertStickynoteSlotsOnColumns() {
        for (let column of this.body.firstElementChild.children) {
            let stickerSlot = document.createElement("li");;
            stickerSlot.className = "sticker-item slot";
            stickerSlot.ondragover = event => {event.preventDefault()};
            stickerSlot.ondrop = event => {this.dropOnStickynoteSlot(event)};
            column.querySelector("ul").appendChild(stickerSlot);
        }
    }

    insertNewColumnSlotOnBoard() {
        let newColumn = document.createElement("li");
        newColumn.className = "column-item slot";
        newColumn.ondragover = event => {event.preventDefault()};
        newColumn.ondrop = event => {this.columnDrop(event)};
        this.body.querySelector("ul.column-list").appendChild(newColumn);
    }

    removeExistingColumnSlots() {
        for (let columnslot of this.boardList.children) {
            if (columnslot.className.includes('slot')) {
                columnslot.parentElement.removeChild(columnslot);
            }
        }
    }

    removeExistingStickynoteSlots() {
        for (let columns of this.boardList.children) {
            for (let itemslot of columns.lastElementChild.children) {
                if (itemslot.className.includes('slot')) {
                    itemslot.parentElement.removeChild(itemslot);
                }
            }
        }
    }

    convertColumnSlotToColumn(column) {
        let listItem = document.importNode(this.body.querySelector("template#column-content").content,true);
        listItem.querySelector("#recycle-button").addEventListener('click', event => {this.deleteColumn(event)});
        column.appendChild(listItem);
        this.deactivateStickerSlot(column);
        column.querySelector("input[class='column-title']").addEventListener("change", 
            (event) => {BrowserSave.checkAutoSave(event);}
        );     
    }

    columnDrop(event) {
        this.convertColumnSlotToColumn(event.target);
        if (this.currentOnDragStickyNote) {
            event.target.lastElementChild.appendChild(this.currentOnDragStickyNote.parentElement);
            this.currentOnDragStickyNote = null;
        } else {
            let stickerSlot = document.createElement("li");;
            stickerSlot.className = "sticker-item";
            event.target.lastElementChild.appendChild(stickerSlot);
            this.createNewStickernoteOnColumnList(event.target.lastElementChild);
        }
    }

    deactivateStickerSlot(slot) {
        slot.classList.remove('slot');
        slot.ondragover = null;
        slot.ondrop = null;
    }

    deleteColumn(event) {
        event.target.parentElement.parentElement.parentElement.removeChild(
            event.target.parentElement.parentElement
        );
        BrowserSave.checkAutoSave();
    }

    calculateEventTouchHitbox(event, item) {
        const x = event.changedTouches.item(0).clientX;
        const y = event.changedTouches.item(0).clientY;
        const box = item.getBoundingClientRect();
        return (x > box.x && x < box.x+box.width) &&
               (y > box.y && y < box.y+box.height)
    }
}