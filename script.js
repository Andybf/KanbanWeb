/**
 * FreeWebKanban
 * FreeWebKanban © 2021 Anderson Bucchianico. All rights reserved.
*/

import('/App/App.js').then( ( appClassDefinition) => {
    customElements.define("comp-app", appClassDefinition.default);
})