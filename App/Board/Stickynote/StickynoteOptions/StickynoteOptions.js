import AVElement from '/modules/AVElement.js'
export default class StickynoteOptions extends AVElement {

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
        fontSize : {}
    };
    colors = {
        black : '#000000',
        grey : '#a0a0a0',
        white : '#f0f0f0',
        red : '#FF0000',
        green : '#00FF00',
        blue : '#0000FF'
    }
    fontName = [
        'Monospace',
        'Cursive',
        'Fantasy',
        'Serif',
        'Sans Serif'
    ];
    fontSize = [2,3,4,5,6,7,8,9,10 ];

    renderedCallback() {
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
        this.buttons.fontName.onclick = event => {this.openTextMenuSelection(event)};
        this.buttons.fontSize.onclick = event => {this.openTextMenuSelection(event)};
        this.buttons.fontColor.onclick = event => {this.openColorMenuSelection(event)};
        this.buttons.fontBackground.onclick = event => {this.openColorMenuSelection(event)};
    }

    executeCommand(value, arg) { /* Obsolete */
        document.execCommand(value,false, arg);
    }

    openColorMenuSelection(event) {
        let colorList = document.createElement("ul");
        colorList.classList.add('color-list');
        for(let color of Object.keys(this.colors)) {
            let item = document.createElement("li");
            item.setAttribute('data-value',this.colors[color]);
            item.style.background = this.colors[color];
            item.onclick = evt => {
                this.executeCommand(evt.target.parentElement.parentElement.value, evt.target.dataset.value);
                colorList.parentElement.removeChild(colorList);
                colorListBackground.parentElement.removeChild(colorListBackground);
            }
            colorList.appendChild(item);
        }
        let colorListBackground = document.createElement("div");
        colorListBackground.classList.add("color-list-background");
        colorListBackground.onclick = event => {
            colorList.parentElement.removeChild(colorList);
            colorListBackground.parentElement.removeChild(colorListBackground);
        };
        event.target.appendChild(colorList);
        event.target.appendChild(colorListBackground);
    }

    openTextMenuSelection(event){
        let textList = document.createElement("ul");
        textList.classList.add('text-list');
        for(let item of this[event.target.value]) {
            let itemElement = document.createElement("li");
            itemElement.innerText = item;
            itemElement.onclick = evt => {
                this.executeCommand(textList.parentElement.firstElementChild.value, evt.target.innerText);
                textList.parentElement.removeChild(textList);
                colorListBackground.parentElement.removeChild(colorListBackground);
            }
            textList.appendChild(itemElement);
        }
        let colorListBackground = document.createElement("div");
        colorListBackground.classList.add("color-list-background");
        colorListBackground.onclick = event => {
            textList.parentElement.removeChild(textList);
            colorListBackground.parentElement.removeChild(colorListBackground);
        };
        event.target.parentElement.appendChild(textList);
        event.target.parentElement.appendChild(colorListBackground);
    }
}