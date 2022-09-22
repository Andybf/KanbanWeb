export default class ChangeTheme extends HTMLElement {

    selectedThemeIndex = 0;
    spanThemeSelected;

    constructor() {
        super();
        this.innerHTML = `<button class='button-option'>
            <span>Selected Theme:</span>
            <span id='theme-selected'>dynamic</span>
        </button>`;
    }

    connectedCallback() {
        this.spanThemeSelected = this.querySelector('#theme-selected');
        this.querySelector("button").addEventListener('click',
            (event) => {this.toggleAppTheme(event);}
        );
    }

    toggleAppTheme() {
        switch(this.selectedThemeIndex) {
            case 0:
                window.document.documentElement.className = 'dark-theme';
                this.spanThemeSelected.innerText = 'dark';
                this.selectedThemeIndex = 1;
                break;
            case 1:
                window.document.documentElement.className = 'light-theme';
                this.spanThemeSelected.innerText = 'light';
                this.selectedThemeIndex = 2;
                break;
            default:
                window.document.documentElement.className = 'dynamic-theme';
                this.spanThemeSelected.innerText = 'dynamic';
                this.selectedThemeIndex = 0;
        }
    }
}