/**
 * FreeWebKanban
 * Copyright © 2021 Anderson Bucchianico. All rights reserved.
*/

let stickyNote = document.querySelector("div[class='postit']");
stickyNote.addEventListener('dragstart',dragStart);
stickyNote.addEventListener('dragend',dragEnd);

function createColumn() {
    let column = document.importNode(document.querySelector("template[id='column']").content,true);
    createColumnItem(column);
    document.querySelector("article[class='board']").appendChild(column);
}

function createColumnItem(column) {
    let item = document.importNode(document.querySelector("template[id='item-slot']").content,true);
    addEventListenersfor(item.firstElementChild);
    column.querySelector(".column-subcontainer").appendChild(item);
}

function addEventListenersfor(item) {
    item.addEventListener('dragover',dragOver);
    item.addEventListener('dragEnter',dragEnter);
    item.addEventListener('dragleave',dragLeave);
    item.addEventListener('drop',dragDrop);
}

function dragStart(event) {
    console.log("sticky dragStart");
    createColumn();
    Array.from(document.querySelectorAll("ul[class='list-item']")).forEach( element => {
        element.classList.add('list-slot');
    });
}

function dragEnd(event) {
    console.log("sticky dragEnd",Array.from(document.querySelectorAll("ul.list-slot")));
    Array.from(document.querySelectorAll("ul.list-slot")).forEach( element => {
        element.classList.remove('list-slot');
    });
}

function dragOver(event) {
    console.log('item dragOver');
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    console.log('item dragEnter');
}

function dragLeave(event) {
    console.log('item dragLeave');
}

function dragDrop(event) {
    console.log('item dragDrop');
    let newItem = document.importNode(document.querySelector("template[id='item-sticky']").content,true);
    event.target.appendChild(newItem);
    console.log(event);
}