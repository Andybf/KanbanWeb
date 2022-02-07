const cacheName = 'FreeWebKanbanPWA';
const filesToCache = [
    '/',
    'sw.js',
    'style.css',
    'script.js',
    '/modules/AVElement.js',
    '/modules/AVUtils.js',
    '/modules/MiniCssParser.js',
    '/App/App.js',
    '/App/App.html',
    '/App/App.css',
    '/App/Board/Board.js',
    '/App/Board/Board.html',
    '/App/Board/Board.css',
    '/App/LoadBoard/LoadBoard.js',
    '/App/LoadBoard/LoadBoard.html',
    '/App/LoadBoard/LoadBoard.css',
    '/App/Recyclebin/Recyclebin.js',
    '/App/Recyclebin/Recyclebin.html',
    '/App/Recyclebin/Recyclebin.css',
    '/App/SaveBoard/SaveBoard.js',
    '/App/SaveBoard/SaveBoard.html',
    '/App/SaveBoard/SaveBoard.css',
    '/App/StickyStack/StickyStack.js',
    '/App/StickyStack/StickyStack.html',
    '/App/StickyStack/StickyStack.css',
    '/App/Board/Stickynote/Stickynote.js',
    '/App/Board/Stickynote/Stickynote.html',
    '/App/Board/Stickynote/Stickynote.css',
    '/App/Board/Stickynote/StickynoteOptions/StickynoteOptions.js',
    '/App/Board/Stickynote/StickynoteOptions/StickynoteOptions.html',
    '/App/Board/Stickynote/StickynoteOptions/StickynoteOptions.css',
    '/App/Board/Stickynote/StickynoteOptions/ListSelector/ListSelector.js',
    '/App/Board/Stickynote/StickynoteOptions/ListSelector/ListSelector.html',
    '/App/Board/Stickynote/StickynoteOptions/ListSelector/ListSelector.css'
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
    return clientCache.addAll(filesToCache);
}

async function handleFetchRequisition(event) {
    let response = await caches.match(event.request);
    if(!response) {
        console.log('not fund in cache')
        response = await fetch(event.request);
        let clientCache = await caches.open(cacheName);
        clientCache.put(event.request, response.clone());
    }
    return response;
}