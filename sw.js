const cacheName = 'FreeWebKanbanPWA';
const pathname = '/FreeWebKanban';
const filesToCache = [
    pathname+'/',
    pathname+'/sw.js',
    pathname+'/style.css',
    pathname+'/script.js',
    pathname+'/modules/AVElement.js',
    pathname+'/modules/AVutils.js',
    pathname+'/App/App.js',
    pathname+'/App/App.html',
    pathname+'/App/App.css',
    pathname+'/App/Menu/Menu.js',
    pathname+'/App/Menu/Menu.html',
    pathname+'/App/Menu/Menu.css',
    pathname+'/App/Board/Board.js',
    pathname+'/App/Board/Board.html',
    pathname+'/App/Board/Board.css',
    pathname+'/App/Recyclebin/Recyclebin.js',
    pathname+'/App/Recyclebin/Recyclebin.html',
    pathname+'/App/Recyclebin/Recyclebin.css',
    pathname+'/App/StickyStack/StickyStack.js',
    pathname+'/App/StickyStack/StickyStack.html',
    pathname+'/App/StickyStack/StickyStack.css',
    pathname+'/App/Board/Stickynote/Stickynote.js',
    pathname+'/App/Board/Stickynote/Stickynote.html',
    pathname+'/App/Board/Stickynote/Stickynote.css',
    pathname+'/App/Board/Stickynote/StickynoteOptions/StickynoteOptions.js',
    pathname+'/App/Board/Stickynote/StickynoteOptions/StickynoteOptions.html',
    pathname+'/App/Board/Stickynote/StickynoteOptions/StickynoteOptions.css',
    pathname+'/App/Board/Stickynote/StickynoteOptions/ListSelector/ListSelector.js',
    pathname+'/App/Board/Stickynote/StickynoteOptions/ListSelector/ListSelector.html',
    pathname+'/App/Board/Stickynote/StickynoteOptions/ListSelector/ListSelector.css'
];

self.addEventListener("install", (event) => {
    event.waitUntil(performInstalloperations());
});

self.addEventListener('activate', event => {
    performActivationOperations();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(handleFetchRequisition(event));
});

async function performActivationOperations() {
    let keyList = await caches.keys();
    return Promise.all(
        keyList.map(key => {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        })
    );
}

async function performInstalloperations() {
    let clientCache = await caches.open(cacheName);
    for (let fileToCache of filesToCache) {
        await clientCache.add(fileToCache);
    }
}

async function handleFetchRequisition(event) {
    let response = await caches.match(event.request);
    if(!response) {
        response = await fetch(event.request);
        let clientCache = await caches.open(cacheName);
        clientCache.put(event.request, response.clone());
    }
    return response;
}