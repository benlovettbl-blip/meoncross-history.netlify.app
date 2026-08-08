const query = "File:Thomas Bowles - The Inside View of the Royal Exchange at London - B1995.13.93 - Yale Center for British Art.jpg";
const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&pithumbsize=500&format=json`;
fetch(url, { headers: { 'User-Agent': 'MeoncrossHistory/1.0' } })
    .then(res => res.json())
    .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        console.log(pages[pageId].thumbnail.source);
    });
