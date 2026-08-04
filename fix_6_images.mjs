import fs from 'fs';
import path from 'path';

const filesToDownload = [
    {
        filename: 'munich_putsch_defendants.jpg',
        wikiFile: 'Bundesarchiv_Bild_102-00344A,_München,_Nach_Hitler-Ludendorff_Prozess.jpg'
    },
    {
        filename: 'nazi_poster_our_last_hope.jpg',
        wikiFile: 'Unsere_letzte_Hoffnung-Hitler_(1932).jpg'
    },
    {
        filename: 'hitler_hindenburg_1933.jpg',
        wikiFile: 'Bundesarchiv_Bild_183-S38324,_Tag_von_Potsdam,_Adolf_Hitler,_Paul_v._Hindenburg.jpg'
    },
    {
        filename: 'dachau_roll_call.jpg',
        wikiFile: 'Bundesarchiv_Bild_152-27-13A,_Dachau_Konzentrationslager,_Häftlinge_beim_Appell.jpg'
    },
    {
        filename: 'nuremberg_rally.jpg',
        wikiFile: 'Bundesarchiv_Bild_183-1982-1130-502,_Nürnberg,_Reichsparteitag,_SA-_und_SS-Appell.jpg'
    },
    {
        filename: 'edelweiss_pirates_graffiti.jpg',
        wikiFile: 'Edelweißpiraten_Jülich_Koch.jpg'
    }
];

async function downloadImages() {
    for (const item of filesToDownload) {
        const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(item.wikiFile)}?width=800`;
        console.log(`Downloading ${item.filename} from ${url}`);
        
        try {
            const response = await fetch(url, {
                headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (Student Project)' }
            });
            
            if (!response.ok) {
                console.error(`Failed to download ${item.filename}: ${response.status} ${response.statusText}`);
                continue;
            }
            
            const buffer = await response.arrayBuffer();
            const dest = path.resolve('public/images', item.filename);
            fs.writeFileSync(dest, Buffer.from(buffer));
            console.log(`Successfully saved ${item.filename}`);
        } catch (e) {
            console.error(`Error downloading ${item.filename}:`, e.message);
        }
    }
}

downloadImages();
