/**
 * FreeWebKanban
 * FreeWebKanban © 2021 Anderson Bucchianico. All rights reserved.
*/

let stickyNoteStack = document.querySelector("#stickynote-stack");
stickyNoteStack.addEventListener('dragstart',StackdragStart);
stickyNoteStack.addEventListener('dragend',StackdragEnd);

let recyclebin = document.querySelector('#recyclebin-container');
recyclebin.addEventListener('drop', recyclebinDrop);
recyclebin.addEventListener('dragover', recyclebinDragover);
recyclebin.addEventListener('dragenter', recyclebinDragEnter);
recyclebin.addEventListener('dragleave', recyclebinDragLeave);

let currentOnDragStickyNote;

const boardColumns = document.querySelector('ul[class="board"]');

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

function returnNewStickernote() {
    let newItem = document.importNode(document.querySelector("template[id='stickynote']").content,true);
    newItem.firstElementChild.addEventListener('dragstart', stickynoteDragStart);
    newItem.firstElementChild.addEventListener('dragend', stickynoteDragEnd);
    newItem.firstElementChild.style['transform'] = `rotate(${(Math.random() * 15)+350}deg)`;
    let colorList = [
        '--sticky-color-yellow',
        '--sticky-color-red',
        '--sticky-color-green',
        '--sticky-color-blue',
        '--sticky-color-purple',
        '--sticky-color-grey'
    ];
    let generatedNumber = Math.round(Math.random() * 6);
    let selectedColor = colorList[generatedNumber];
    newItem.firstElementChild.firstElementChild.style['background-color'] = `var(${selectedColor})`;
    return newItem;
}

function StackdragStart(event) {
    console.log('dragStart',event);
    insertStickynoteSlotsOnColumns();
    insertNewColumnSlotOnBoard();
}

function StackdragEnd(event) {
    console.log('dragEnd',event);
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
        event.target.appendChild(returnNewStickernote());
    }
    convertColumnSlotToColumn(event);
}

function stickynoteSlotDrop(event) {
    console.log('stickynoteDrop',event);
    event.target.parentElement.appendChild(returnNewStickernote());
    if (currentOnDragStickyNote) {
        currentOnDragStickyNote.parentElement.removeChild(currentOnDragStickyNote);
        currentOnDragStickyNote = null;
    }
}

function stickynoteSlotDragover(event) {
    event.preventDefault();
}

function stickynoteDragStart(event) {
    console.log('stickynoteDragStart',event);
    currentOnDragStickyNote = event.target.parentElement;
    insertStickynoteSlotsOnColumns();
    insertNewColumnSlotOnBoard();
}

function stickynoteDragEnd(event) {
    console.log('stickynoteDragEnd', event);
    removeExistingColumnSlots();
    removeExistingStickynoteSlots();
}

function recyclebinDragover(event) {
    event.preventDefault();
}

function recyclebinDrop(event) {
    currentOnDragStickyNote &&
    currentOnDragStickyNote.parentElement.removeChild(currentOnDragStickyNote);
    currentOnDragStickyNote = null;
    event.target.style['border-color'] = "black";
}

function recyclebinDragEnter(event) {
    event.target.style['border-color'] = "red";
}

function recyclebinDragLeave(event) {
    event.target.style['border-color'] = "black";
}