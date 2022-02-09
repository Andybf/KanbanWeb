/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from './modules/AVElement.js'
export default class LoadBoard extends AVElement {

    loadButton;
    loadInput;

    renderedCallback() {
        this.loadButton = this.body.querySelector('button');
        this.loadInput = this.body.querySelector('input');

        this.loadButton.onclick = () => {
            this.loadInput.click();
        };
        this.loadInput.onchange = event => {
            this.getSaveFile(event);
        };
        this.getSaveFromBrowserLocalStorage();
    }

    getSaveFile(input) {
        let fileSave;
        let fileReader = new FileReader();
        fileReader.readAsText(input.target.files[0]); 
        fileReader.onload = (subEvent) => {
            try {
                this.loadFromJson(JSON.parse(subEvent.target.result));
            } catch (e) {
                console.error(e);
            }
        };
    }

    getSaveFromBrowserLocalStorage() {
        try {
            if (window.localStorage.lastSave) {
                this.loadFromJson(JSON.parse(window.localStorage.lastSave));
            }
        } catch (e) {
            console.error(e);
        }
    }

    loadFromJson(json) {
        this.setBoardTitle(json.name);
        this.resetBoard();
        this.setBoardStickers(json.columns);
    }

    setBoardTitle(title) {
        this.getParentComponents().get('comp-app').body.querySelector('h2').innerText = title;
    }

    resetBoard() {
        let boardList = this.getParentComponents().get('comp-app').body.querySelector('comp-board');
        for (let x=0; x<boardList.body.firstElementChild.children.length; x++) {
            boardList.body.firstElementChild.removeChild(boardList.body.firstElementChild.firstElementChild)
        }
    }

    setBoardStickers(columns) {
        let board = this.getParentComponents().get('comp-app').body.querySelector('comp-board');

        columns.forEach( column => {
            board.insertNewColumnSlotOnBoard();
            let columnitem = board.body.querySelector('li.column-item:last-child');            
            board.convertColumnSlotToColumn(columnitem);
            columnitem.querySelector('h3').innerText = column.title;

            column.stickers.forEach( sticker => {
                let stickerSlot = document.createElement("li");;
                stickerSlot.className = "sticker-item";
                columnitem.lastElementChild.appendChild(stickerSlot);
                board.createNewStickernoteOnColumnList(columnitem.lastElementChild);
                let createdSticky =  columnitem.lastElementChild.lastElementChild.querySelector('comp-stickynote');
                createdSticky.setAttribute('background-color', sticker['background-color']);
                createdSticky.setAttribute('textValue', sticker['content']);
            });
        });
    }
}