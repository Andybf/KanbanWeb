export default class ChangeTheme extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = "<button class='button-option'>Switch Theme</button>"
    }

    connectedCallback() {
        this.querySelector("button").addEventListener('click',
            (event) => {this.toggleAppTheme(event);}
        );
    }

    toggleAppTheme() {
        const html = window.document.documentElement;
        html.className = (html.className == 'dark-theme') ? 'light-theme' : 'dark-theme';
    }
}