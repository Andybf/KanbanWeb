import AVElement from '/modules/AVElement.js'
export default class ListSelector extends AVElement {

    sourceItems;
    sourceName;
    selectionType;

    renderedCallback() {
        this.renderColorSelection();
    }

    renderColorSelection() {
        let selectorContainer = this.createListContainerElement();
        this.generateListingFor(selectorContainer);
        let colorListBackground = this.generateBackground();
        this.body.appendChild(selectorContainer);
        this.body.appendChild(colorListBackground);
    }

    createListContainerElement() {
        let selectorContainer = document.createElement('ul');
        this.selectionType = this.selectionType == 'text' ? 'text-list' : 'color-list';
        selectorContainer.classList.add(this.selectionType);
        return selectorContainer;
    }

    generateListingFor(selectorContainer) {
        for(let item of this.sourceItems) {
            let selectorItem = document.createElement('li');
            if (this.selectionType == 'color-list') {
                selectorItem.style.backgroundColor = item;
            } else if (this.selectionType == 'text-list'){
                selectorItem.innerText = item;
            }
            selectorItem.dataset.value = item;
            selectorItem.onclick = event => {
                this.sendItemEventToParent(event);
                this.sendMessageToDestructMenu();
            };
            selectorContainer.appendChild(selectorItem);
        }
    }

    sendItemEventToParent(event) {
        const parent = this.getParentComponents().get('comp-stickynote-options');
        parent.handleInputFromSelectionList(event, this.sourceName);
    }

    generateBackground() {
        let colorListBackground = document.createElement("div");
        colorListBackground.classList.add("color-list-background");
        colorListBackground.onclick = event => {this.sendMessageToDestructMenu(event);};
        return colorListBackground;
    }

    sendMessageToDestructMenu(event){
        const parent = this.getParentComponents().get('comp-stickynote-options');
        parent.destroyMenu(this);
    }
}