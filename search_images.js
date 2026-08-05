const fetch = require('node-fetch');
async function search(title) {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=500&format=json`;
    const res = await fetch(searchUrl);
    const json = await res.json();
    const pages = json.query?.pages;
    if (!pages) { console.log(title, 'No results'); return; }
    const pageWithThumb = Object.values(pages).filter(p => p.thumbnail).sort((a, b) => (a.index || 99) - (b.index || 99))[0];
    if (pageWithThumb) {
        console.log(title, ':', pageWithThumb.thumbnail.source);
    } else {
        console.log(title, 'No thumbnail');
    }
}
(async () => {
    await search("Pocahontas engraving");
    await search("Pocahontas portrait");
    await search("Sir Thomas Roe Jahangir");
    await search("Jamestown Fort");
})();
