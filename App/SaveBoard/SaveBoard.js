/**
 * FreeWebKanban © 2022 Anderson Bucchianico. All rights reserved.
*/

import AVElement from '/FreeWebKanban/modules/AVElement.js'
export default class SaveBoard extends AVElement {

    appReference;

    renderedCallback() {
        this.body.firstElementChild.onclick = event => {
            this.saveOnLocalStorage();
            this.handleClick(event)
        };
        this.appReference = this.getParentComponents().get('comp-app');
    }

    saveOnLocalStorage() {
        if (window.localStorage) {
            const content = this.generateBoardDataJson();
            window.localStorage.lastSave = JSON.stringify(content,null,4);
        }
    }

    handleClick() {
        const content = this.generateBoardDataJson();
        let fileName = `${content.name}.json`;
        let url = this.generateDownloadAddress(JSON.stringify(content,null,4));
        let alink = this.generateLinkOnPage(url,fileName);
        alink.click();
        window.URL.revokeObjectURL(url);
    }

    generateBoardDataJson() {
        let content = {
            'name' : this.appReference.body.querySelector("h2").innerText,
            'createdDate' : Date.now(),
            'columns' : []
        }
        Array.from(this.appReference.body.querySelector("comp-board").boardList.children).forEach(element => {
            let stickerList = [];
            Array.from(element.querySelector("ul").children).forEach( item => {
                stickerList.push({
                    'content' : item.firstElementChild.body.querySelector('div').firstElementChild.innerHTML,
                    'background-color' : item.firstElementChild.attributes['background-color'].nodeValue
                });
            });
            content.columns.push({
                'title' : element.querySelector("h3").innerText,
                'stickers' : stickerList
            });
        });
        return content;
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