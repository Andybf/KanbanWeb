import AVElement from '/KanbanWeb/modules/AVElement.js'

export default class Menu extends AVElement {

    listContainer = new Object();

    renderedCallback() {
        this.listContainer = this.body.querySelector(".menu-list-container");
        this.listContainer.addEventListener('click', 
            (event) => {this.toggleListContainer(event)}
        );
        this.body.querySelector("#button-menu").addEventListener('click',
            (event) => {this.toggleListContainer(event)}
        );

        import('/KanbanWeb/App/Menu/LoadBoard.js').then( ( appClassDefinition) => {
            customElements.define("mod-load-board", appClassDefinition.default);
        });
        import('/KanbanWeb/App/Menu/QuickSave.js').then( ( appClassDefinition) => {
            customElements.define("mod-browser-save", appClassDefinition.default);
        });
        import('/KanbanWeb/App/Menu/ExportBoard.js').then( ( appClassDefinition) => {
            customElements.define("mod-export-board", appClassDefinition.default);
        });
        import('/KanbanWeb/App/Menu/ChangeTheme.js').then( ( appClassDefinition) => {
            customElements.define("mod-change-theme", appClassDefinition.default);
        });
        import('/KanbanWeb/App/Menu/AutoSave.js').then( ( appClassDefinition) => {
            customElements.define("mod-auto-save", appClassDefinition.default);
        });
        import('/KanbanWeb/App/Menu/ReloadCache.js').then( ( appClassDefinition) => {
            customElements.define("mod-reload-cache", appClassDefinition.default);
        });
    }

    toggleListContainer(event) {
        if (getComputedStyle(this.listContainer).display == "none") {
            this.listContainer.style.display = "initial";
        } else {
            this.listContainer.style.display = "none";
        } 
    }
}