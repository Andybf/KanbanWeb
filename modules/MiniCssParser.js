/* 
 * AndView Framework
 * Copyright © 2022 Anderson Bucchianico. All rights reserved.
 * 
*/

export default class MiniCssParser {

    parseToJSON(selectorName, cssStr) {
        if (cssStr.includes(selectorName)) {
            cssStr = this.#removeBreakLinesAndWhitespaces(cssStr);
            cssStr = this.#getSelectorContents(selectorName, cssStr);
            cssStr = this.#removeLastOcurrenceOfSemicolon(cssStr);
            return this.#returnPropertiesInObjectFormat(cssStr);
        }        
    }
    
    #removeBreakLinesAndWhitespaces(cssText){
        return cssText.replace(/\s+/g,'').replaceAll('\n','');
    }

    #getSelectorContents(selectorName, cssStr) {
        return cssStr.substring(cssStr.indexOf(selectorName)+selectorName.length,cssStr.indexOf('}'));
    }

    #removeLastOcurrenceOfSemicolon(str) {
        return str.slice(0, str.lastIndexOf(';')) + str.slice(str.lastIndexOf(';')+1);
    }
    
    #returnPropertiesInObjectFormat(cssString) {
        let mapProp = new Map();
        cssString.replaceAll('{','').split(';').forEach( entry => {
            let keyValue = entry.split(':')
            mapProp.set(keyValue[0],keyValue[1]);
        });
        return Object.fromEntries(mapProp);
    }
}