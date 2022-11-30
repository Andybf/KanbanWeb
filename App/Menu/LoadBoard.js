/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

export default class LoadBoard extends HTMLElement {

    loadButton;
    loadInput;

    constructor() {
        super();
        this.innerHTML = `
            <button
                class="button-option"
                id="load-board"
            >Load Board</button>
            <input type="file"/>
        `;
    }

    connectedCallback() {
        this.compAppReference = window.document.querySelector("comp-app");
        this.loadButton = this.querySelector('button[id="load-board"]');
        this.loadInput = this.querySelector('input[type="file"]');
        
        this.loadButton.onclick = () => {
            this.loadInput.click();
        };
        this.loadInput.onchange = event => {
            this.getSaveFile(event);
        };
        this.getSaveFromBrowserLocalStorage();
    }

    getSaveFile(input) {
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
        this.cleanBoardContent();
        this.setBoardStickers(json.columns);
    }

    setBoardTitle(title) {
        this.compAppReference.body.querySelector('input').value = title;
    }

    cleanBoardContent() {
        let boardList = this.compAppReference.body.querySelector('comp-board');
        for (let x=0; x<boardList.body.firstElementChild.children.length; x++) {
            boardList.body.firstElementChild.removeChild(boardList.body.firstElementChild.firstElementChild);
        }
    }

    setBoardStickers(columns) {
        let board = this.compAppReference.body.querySelector('comp-board');

        columns.forEach( column => {
            board.insertNewColumnSlotOnBoard();
            let columnitem = board.body.querySelector('li.column-item:last-child');            
            board.convertColumnSlotToColumn(columnitem);
            columnitem.querySelector('input').innerText = column['column-title'];

            column.stickers.forEach( databseSticker => {
                let stickerSlot = document.createElement("li");;
                stickerSlot.className = "sticker-item";
                columnitem.lastElementChild.appendChild(stickerSlot);
                board.createNewStickernoteOnColumnList(columnitem.lastElementChild);
                let createdStickynote =  columnitem.lastElementChild.lastElementChild.querySelector('comp-stickynote');
                createdStickynote.setAttribute('stickynote-title', databseSticker['stickynote-title'])
                createdStickynote.setAttribute('background-color', databseSticker['background-color']);
                createdStickynote.setAttribute('textValue', databseSticker['content']);
            });
        });
    }
}