import BrowserSave from "/KanbanWeb/modules/BrowserSave.js";

export default class ChangeBackground extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = `
        <input type="file" id="loadimage-input" style="display:none;"/>
        <button class='button-option' id="change-background">
            <span>Change Background...</span>
        </button>`;
    }

    connectedCallback() {
        let loadInput = this.querySelector('input[id*=loadimage-input]');
        loadInput.addEventListener('change', (event) => {
            this.loadImageFromClient(event);
        });
        this.querySelector("button[id*='change-background']").addEventListener( 'click', () => {
            loadInput.click();
        });
    }

    static loadBackground(base64Image) {
        document.firstElementChild.style.backgroundImage = `url(${base64Image})`;
        document.firstElementChild.style.backgroundSize = 'cover';
    }

    loadImageFromClient(event) {
        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (subEvent) => {
            let base64ImgData = subEvent.target.result;
            ChangeBackground.loadBackground(base64ImgData);
            BrowserSave.saveOnBrowserStorage();
        }
        fileReader.readAsDataURL(file);
    }
}