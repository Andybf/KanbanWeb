/* 
 * AndView Framework
 * Copyright © 2022 Anderson Bucchianico. All rights reserved.
 * 
*/

export default class AVutils {
    
    static mapPopValue(map) {
        let value = Array.from(map)[map.size-1][1];
        map.delete(Array.from(map)[map.size-1][0])
        return value;
    }

    static concatMaps(map1, map2) {
        const iterationCount = (map1.size > map2.size) ? map1.size : map2.size;
        for (let index=0; index<iterationCount; index++) {
            map1.set(Array.from(map2)[index][0], {localName : Array.from(map2)[index][1].localName});
        }
    }

    static showToast(type, message) {
        function closeToast() {

        }
        
        let toast = document.createElement('div');
        toast.innerText = message;
        toast.style = {
            position: 'absolute',
            width: '200px',
            height: '50px',
            top: '5%',
            left: '50%'
        }
        switch(type) {
            case 'info':
                toast.style.background = 'grey';
                break;
            case 'warn':
                toast.style.background = 'yellow';
                break;
            case 'error':
                toast.style.background = 'red';
                break;
            default:
                toast.style.background = 'grey';
        }
        
        document.documentElement.appendChild(toast);
        setTimeout(closeToast(),5000);
    }
}