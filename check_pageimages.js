const fs = require('fs');

async function getPageImageTitle(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== "-1" && pages[pageId].pageimage) {
        return pages[pageId].pageimage;
    }
    return "No pageimage";
}

async function run() {
    const titles = [
        "Kapp_Putsch",
        "Hyperinflation_in_the_Weimar_Republic",
        "Bauhaus",
        "Adolf_Hitler",
        "Beer_Hall_Putsch",
        "Adolf_Hitler's_rise_to_power",
        "Reichstag_fire",
        "Dachau_concentration_camp",
        "Cross_of_Honour_of_the_German_Mother",
        "League_of_German_Girls",
        "Reichsautobahn",
        "Kristallnacht"
    ];
    
    for (const t of titles) {
        const pi = await getPageImageTitle(t);
        console.log(`${t} -> ${pi}`);
    }
}
run();
