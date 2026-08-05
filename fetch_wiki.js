const fetch = require('node-fetch');
async function fetchWikiImage(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    const res = await fetch(url);
    const json = await res.json();
    const pages = json.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].thumbnail) {
        return pages[pageId].thumbnail.source;
    }
    return null;
}
(async () => {
    console.log("Luther:", await fetchWikiImage("Martin Luther"));
    console.log("Drake:", await fetchWikiImage("Francis Drake"));
    console.log("Armada:", await fetchWikiImage("Armada Portrait"));
})();
