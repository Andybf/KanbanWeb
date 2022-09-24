export default class BrowserSave extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = 
        `<button
            class='button-option'
            id="button-save"
        >Quick Save</button>`;
    }

    connectedCallback() {
        this.querySelector("#button-save").addEventListener("click",
            (event) => {this.saveOnBrowserStorage(event)
        });
    }

    saveOnBrowserStorage() {
        if (window.localStorage) {
            const content = BrowserSave.generateBoardDataJson(window.document.querySelector("comp-app"));
            window.localStorage.lastSave = JSON.stringify(content,null,4);
        }
    }

    static generateBoardDataJson(rootAppComp) {
        let BoardNameInput = rootAppComp.body.querySelector("input");
        let BoardName = (BoardNameInput.value.length > 0) ? BoardNameInput.value : BoardNameInput.placeholder;
        let content = {
            'name' : BoardName,
            'createdDate' : Date.now(),
            'columns' : []
        }
        Array.from(rootAppComp.body.querySelector("comp-board").boardList.children).forEach(element => {
            let stickerList = [];
            Array.from(element.querySelector("ul").children).forEach( item => {
                stickerList.push({
                    'content' : item.firstElementChild.body.querySelector('div').firstElementChild.innerHTML,
                    'background-color' : item.firstElementChild.attributes['background-color'].nodeValue
                });
            });
            content.columns.push({
                'title' : element.querySelector("input").innerText,
                'stickers' : stickerList
            });
        });
        return content;
    }
}