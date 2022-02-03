/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/modules/AVElement.js'
export default class Board extends AVElement {

    boardList;
    currentOnDragStickyNote;
    stickyStackReference;

    renderedCallback() {
        this.boardList = this.body.querySelector("ul.column-list");
        this.stickyStackReference = this.getParentComponents().get('comp-app').body.querySelector("comp-sticky-stack");
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
        this.stickyStackReference.body.querySelectorAll(".selected").forEach(element => {
            compStickerNote.cardStyleInformation.set(element.dataset['attr'], element.dataset['value']);
        });
        compStickerNote.setAttribute('textvalue','Digite algo aqui...');
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
        this.boardList.appendChild(newColumn);
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
    }
}