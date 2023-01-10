export default class ChangeTheme extends HTMLElement {

    isAutoSaveEnabled = true;

    constructor() {
        super();
        window.document.documentElement.setAttribute('auto-save',this.isAutoSaveEnabled);
        this.innerHTML = `<button class='button-option'>
            <span>Auto Save:</span>
            <span id='autosave-state'>enabled</span>
        </button>`;
    }

    connectedCallback() {
        this.querySelector("button").addEventListener('click',
            (event) => {this.toogleAutosave(event);}
        );
    }

    toogleAutosave() {
        this.isAutoSaveEnabled = (this.isAutoSaveEnabled) ? false : true;
        window.document.documentElement.setAttribute('auto-save',this.isAutoSaveEnabled);
        this.querySelector('#autosave-state').innerText = (this.querySelector('#autosave-state').innerText == 'enabled') ? 'disabled' : 'enabled';
    }
}