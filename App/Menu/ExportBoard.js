import BrowserSave from "/KanbanWeb/modules/BrowserSave.js";

export default class ChangeTheme extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = 
        `<button
            class='button-option'
            id="button-export"
        >Export Board</button>`;
    }

    connectedCallback() {
        this.querySelector("#button-export").addEventListener("click",
            (event) => {this.saveOnClientComputer(event)
        });
    }

    saveOnClientComputer() {
        const content = BrowserSave.generateBoardDataJson(window.document.querySelector("comp-app"));
        let fileName = `${content.name}.json`;
        let url = this.generateDownloadAddress(JSON.stringify(content,null,4));
        let alink = this.generateLinkOnPage(url,fileName);
        alink.click();
        window.URL.revokeObjectURL(url);
    }

    generateDownloadAddress(content) {
        let blob = new Blob([content], {type: "octet/stream"});
        let url = window.URL.createObjectURL(blob);
        return url;
    }

    generateLinkOnPage(url, fileName) {
        let aLink = document.createElement('a');
        aLink.download = fileName;
        aLink.href = url;
        document.body.appendChild(aLink);
        return aLink;
    }
}