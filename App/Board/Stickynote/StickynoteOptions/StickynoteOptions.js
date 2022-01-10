import AVElement from '/modules/AVElement.js'
export default class StickynoteOptions extends AVElement {

    options;
    settingName;
    stickynoteReference;
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.settingName = this.attributes.settingname.value;
    }

    renderedCallback() {
        this.stickynoteReference = this.getParentComponents()[0];
        this.options.forEach( option => {
            let button = document.createElement("button");
            button.setAttribute('data-attr',this.settingName);
            button.setAttribute('data-value',option);
            button.style[this.settingName] = option;
            button.onclick = event => {this.handleButtonClick(event)};
            if (this.settingName.includes('font')) {
                button.innerText = "Aa";
            }
            this.body.querySelector("div").appendChild(button);
        });
        this.initializeButtonsActions();
        this.whichSideIsComponent();
    }

    whichSideIsComponent() {
        if(this.nextElementSibling.localName != 'style') {
            this.body.querySelector("div").classList.add('left-side');
        } else {
            this.body.querySelector("div").classList.add('right-side');
        }
    }

    initializeButtonsActions() {
        const event = new MouseEvent('click', null);
        let value = this.stickynoteReference.cardStyleInformation[this.options[0]];
        let button = this.body.querySelector("button[data-value='"+value+"']");
        button && button.dispatchEvent(event);
    }

    handleButtonClick(event) {
        const attribute = event.target.dataset['attr'];
        const value = event.target.dataset['value'];
        this.applyOptionsOnStickynote(attribute, value);
        this.updateSelectedOption(event);
    }

    applyOptionsOnStickynote(attribute, value) {
        this.stickynoteReference.body.querySelector("div").style[attribute] = value;
    }

    updateSelectedOption(event) {
        Array.from(event.target.parentElement.children).forEach( button => {
            button.classList.remove('selected');
        });
        event.target.classList.add('selected');
    }

    activateOptionPanel() {
        let element= this.body.firstElementChild;
        element.style['z-index'] = '101';
        if (element.className.includes('left')){
            element.style['animation-name'] = 'slideToLeft';
        } else {
            element.style['animation-name'] = 'slideToRight';
        }
        element.style['display'] = null;
    }

    deactivateOptionPanel() {
        let element= this.body.firstElementChild;
        if (element.className.includes('left')){
            element.style['animation-name'] = 'closeLeft';
        } else {
            element.style['animation-name'] = 'closeRight';
        }
        setTimeout(() => {
            element.style['z-index'] = null;
            element.style['display'] = 'none';
        },1000);
    }
}