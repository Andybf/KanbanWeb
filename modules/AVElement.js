/* 
 * AndView Framework
 * Copyright © 2022 Anderson Bucchianico. All rights reserved.
 * 
*/

import MiniParser from './MiniCssParser.js'

export default class AVElement extends HTMLElement {

    #childrenComponentList = [];
    #componentpath = '';

    constructor() {
        super();
        this.#initializeComponent();
    }

    async #initializeComponent() {
        this.#doPreLoadContentActions();
        await this.#appendHTMLtoComponent();
        await this.#appendCSStoComponentBody();
        this.#doPostLoadContentActions();
        this.renderedCallback();
    }

    #doPreLoadContentActions() {
        if (!this._parentComponentNameList) {
            this._parentComponentNameList = [];
        }
        if (this.parentNode) {
            this.#catalogParentComponents(this.parentNode);
        }
        this.#constructComponentPath();
    }

    #catalogParentComponents(parentNode) {
        let nextParentNode = parentNode;
        if (nextParentNode.host) {
            this._parentComponentNameList.push(nextParentNode.host);
            this.#catalogParentComponents(nextParentNode.host);
        } else if (nextParentNode.localName.includes("html")) {
            return false;
        } else {
            this.#catalogParentComponents(nextParentNode.parentNode);
        }
    }

    #constructComponentPath() {
        let root = this.#constructComponentRootPath();
        this.#componentpath = {
            root : `${root}${this.constructor.name}`,
            html : `${root}${this.constructor.name}/${this.constructor.name}.html`,
            css  : `${root}${this.constructor.name}/${this.constructor.name}.css`,
            js   : `${root}${this.constructor.name}/${this.constructor.name}.js`,
        }
    }

    #constructComponentRootPath() {
        let root = '/';
        let copiedCompParents = this._parentComponentNameList.slice(0);
        for(let x=this._parentComponentNameList.length; x>0; x--) {
            root += `${this.#constructComponentClassName(copiedCompParents.pop())}/`
        }
        return root;
    }

    #constructComponentClassName(componentLocalName) {
        let className = '';
        componentLocalName.localName.replace("comp-",'').split('-').forEach( word => {
            className += word[0].toUpperCase() + word.slice(1);
        });
        return className;
    }

    async #appendHTMLtoComponent() {
        await this.#fetchContentWithPath(this.#componentpath.html).then( (responseText) => {
            let componentHTML = new DOMParser().parseFromString(responseText,"text/html");
            this.body = this.attachShadow({mode:'closed'});
            Array.from(componentHTML.querySelector("body").childNodes).forEach( node => {
                this.body.appendChild(node);
            })
            this.template = componentHTML.querySelector("head");
        });
    }

    async #appendCSStoComponentBody() {
        function removeCommentsAndBreakLines(cssText){
            return cssText.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').replaceAll('\n','');
        }
        await this.#fetchContentWithPath(this.#componentpath.css).then( cssText => {
            let styleNode = document.createElement("style");
            styleNode.innerText = removeCommentsAndBreakLines(cssText);
            this.#applyStylesToComponentRootElement(cssText);
            this.body.appendChild(styleNode);
        });
    }

    #applyStylesToComponentRootElement(cssText) {
        let compStyle = new MiniParser().parseToJSON(this.localName, cssText);
        compStyle && Object.keys(compStyle).forEach( (attr) => {
            this.style[attr] = compStyle[attr]
        });
    }

    async #fetchContentWithPath(path) {
        let response = await fetch(path);
        if (response.statusText == 'OK') {
            return await response.text();
        } else {
            return 'Something was Wrong' + response.text();
        }        
    }

    #doPostLoadContentActions() {
        this.#catalogChildrenComponents();
        this.#initializeAllChildrenComponents();
        this.attributes.length > 0 && this.#loadParentCustomAttributes();
    }

    #catalogChildrenComponents() {
        this.body.querySelectorAll("*").forEach( componentNode => {
            if (componentNode.tagName.includes("COMP-")){
                this.#childrenComponentList.push(componentNode);
            }
        })
    }

    #initializeAllChildrenComponents() {
        this.#childrenComponentList.forEach( componentNode => {
            this._initializeChildrenComponent(componentNode);
        })
    }

    #loadParentCustomAttributes() {
        Array.from(this.attributes).forEach( attr => {
            if (attr.nodeValue.includes('{') && attr.nodeValue.includes('}')) {
                let varName = attr.nodeValue.replace('{','').replace('}','');
                this[attr.name] = this.getParentComponents()[0][varName];
            }
        });
    }

    _initializeChildrenComponent(componentElement) {
        let className = this.#constructComponentClassName(componentElement);
        import(`${this.#componentpath.root}/${className}/${className}.js`)
        .then( classDefinition => {
            this.#defineCustomComponent(componentElement,classDefinition);
        });
    }

    loadNewChildrenComponent(childTagName) {
        let newComp = document.createElement(childTagName)
        let className = this.#constructComponentClassName(newComp);
        import(`${this.#componentpath.root}/${className}/${className}.js`).then( classDefinition => {
            classDefinition.default.prototype._parentComponentNameList = [this].concat(this.getParentComponents());
            this.#defineCustomComponent(newComp,classDefinition);
        });
    }

    #defineCustomComponent(htmlNode,classDefinition) {
        function isComponentAlreadyDefined(name) {
            return window.customElements.get(name);
        }
        if (classDefinition.default && !isComponentAlreadyDefined(htmlNode.localName)) {
            customElements.define(htmlNode.localName,classDefinition.default);
        }
    }

    getParentComponents() {
        return this._parentComponentNameList;
    }

    getChildrenComponents() {
        return this.#childrenComponentList;
    }

    renderedCallback(){}
}