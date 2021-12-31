/**
 * FreeWebKanban
 * Copyright © 2021 Anderson Bucchianico. All rights reserved.
*/

let stickyNoteStack = document.querySelector("#stickynote-stack");
stickyNoteStack.addEventListener('dragstart',StackdragStart);
stickyNoteStack.addEventListener('dragend',StackdragEnd);

const boardColumns = document.querySelector('ul[class="board"]');

function StackdragStart(event) {
    console.log('dragStart',event);

    function insertStickynoteSlotsOnColumns() {
        for (let column of boardColumns.children) {
            let stickynoteSlot = document.importNode(document.querySelector("template[id='stickynote-slot']").content,true);
            stickynoteSlot.firstElementChild.addEventListener('dragover', stickynoteSlotDragover);
            stickynoteSlot.firstElementChild.addEventListener('drop', stickynoteSlotDrop);
            column.lastElementChild.appendChild(stickynoteSlot);
        }
    }
    function insertNewColumnSlotOnBoard() {
        let newColumn = document.importNode(document.querySelector("template[id='column']").content,true);
        newColumn.firstElementChild.addEventListener('dragover',columnDragover);
        newColumn.firstElementChild.addEventListener('drop',columnDrop);
        boardColumns.appendChild(newColumn);
    }

    insertStickynoteSlotsOnColumns();
    insertNewColumnSlotOnBoard();
}

function StackdragEnd(event) {
    console.log('dragEnd',event);

    function removeExistingColumnSlots() {
        for (let columnslot of boardColumns.children) {
            if (columnslot.className == 'column-list-slot') {
                columnslot.parentElement.removeChild(columnslot);
            }
        }
    }
    function removeExistingStickynoteSlots() {
        for (let columns of boardColumns.children) {
            for (let itemslot of columns.lastElementChild.children) {
                if (itemslot.className == 'stickynote-list-slot') {
                    itemslot.parentElement.removeChild(itemslot);
                }
            }
        }
    }
    removeExistingColumnSlots();
    removeExistingStickynoteSlots();
}

function columnDragover(event) {
    event.preventDefault();
}
function columnDrop(event) {
    console.log('drop',event);

    function convertColumnSlotToColumn(event) {
        event.target.parentElement.className = 'column-list';
        event.target.parentElement.removeEventListener('drop',columnDrop);
        event.target.parentElement.removeEventListener('dragover',columnDragover);
        let newItem = document.importNode(document.querySelector("template[id='stickynote']").content,true);
        event.target.appendChild(newItem);
    }
    convertColumnSlotToColumn(event);
}

function stickynoteSlotDrop(event) {
    console.log('stickynoteDrop',event);
    function insertNewStickynoteItemOnSlot(event) {
        let newItem = document.importNode(document.querySelector("template[id='stickynote']").content,true);
        event.target.parentElement.appendChild(newItem);
    }
    insertNewStickynoteItemOnSlot(event);
}

function stickynoteSlotDragover(event) {
    event.preventDefault();
}