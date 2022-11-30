import AVElement from '/FreeWebKanban/modules/AVElement.js'
export default class StickynoteOptions extends AVElement {

    selectionlistBackground = {};

    buttons = {
        bold : {},
        italic : {},
        underline : {},
        strikethrough : {},
        justifyLeft : {},
        justifyCenter : {},
        justifyRight : {},
        justify : {},
        unorderedList : {},
        orderedList : {},
        fontColor : {},
        fontBackground : {},
        fontName : {},
        fontSize : {},
        stickyColor : {}
    };
    colors = [
        '#000000',
        '#a0a0a0',
        '#f0f0f0',
        '#e64747',
        '#47e653',
        '#4747e6',
        '#47c2e6'
    ];
    stickyColor = [
        'var(--sticky-color-yellow)',
        'var(--sticky-color-red)',
        'var(--sticky-color-green)',
        'var(--sticky-color-blue)',
        'var(--sticky-color-purple)',
        'var(--sticky-color-grey)'
]
    fontName = [
        'Monospace',
        'Cursive',
        'Fantasy',
        'Serif',
        'Sans Serif'
    ];
    fontSize = [2,3,4,5,6,7,8,9,10 ];

    renderedCallback() {
        this.loadNewChildrenComponent('comp-list-selector');

        this.buttons.bold = this.body.querySelector('button[value="bold"]');
        this.buttons.italic = this.body.querySelector('button[value="italic"]');
        this.buttons.underline = this.body.querySelector('button[value="underline"]');
        this.buttons.strikethrough = this.body.querySelector('button[value="strikeThrough"]');
        this.buttons.justifyLeft = this.body.querySelector('button[value="justifyLeft"]');
        this.buttons.justifyCenter = this.body.querySelector('button[value="justifyCenter"]');
        this.buttons.justifyRight = this.body.querySelector('button[value="justifyRight"]');
        this.buttons.justify = this.body.querySelector('button[value="justifyFull"]');
        this.buttons.unorderedList = this.body.querySelector('button[value="insertUnorderedList"]');
        this.buttons.orderedList = this.body.querySelector('button[value="insertOrderedList"]');
        this.buttons.fontName = this.body.querySelector('button[value="fontName"]');
        this.buttons.fontSize = this.body.querySelector('button[value="fontSize"]');
        this.buttons.fontColor = this.body.querySelector('button[value="foreColor"]');
        this.buttons.fontBackground = this.body.querySelector('button[value="backColor"]');
        this.buttons.stickyColor = this.body.querySelector('button[value="stickyColor"]');

        this.buttons.bold.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.italic.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.underline.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.strikethrough.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.justifyLeft.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.justifyCenter.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.justifyRight.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.justify.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.unorderedList.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.orderedList.onclick = event => {this.executeCommand(event.target.value, event.target.value)};
        this.buttons.fontName.onclick = event => {this.openMenuSelection(event)};
        this.buttons.fontSize.onclick = event => {this.openMenuSelection(event)};
        this.buttons.fontColor.onclick = event => {this.openMenuSelection(event)};
        this.buttons.fontBackground.onclick = event => {this.openMenuSelection(event)};
        this.buttons.stickyColor.onclick = event => {this.openMenuSelection(event)};
    }

    /* Obsolete: This feature can be removed at any browser version in the future */
    executeCommand(value, arg) {
        document.execCommand(value,false, arg);
    }

    openMenuSelection(event){
        let menu = document.createElement('comp-list-selector');
        menu.sourceItems = this[event.target.dataset.listsource];
        menu.selectionType = event.target.dataset.type;
        menu.sourceName = event.target.value;
        event.target.parentElement.appendChild(menu);
    }

    handleInputFromSelectionList(event, stickynote, menuName) {
        if (menuName == 'stickyColor') {
            stickynote.setAttribute('background-color', event.target.style.backgroundColor);
            stickynote.generateColorForSticker();
        } else {
            this.executeCommand(menuName, event.target.dataset.value);
        }
    }

    destroyMenu(menu) {
        menu.parentElement.removeChild(menu);
    }
}