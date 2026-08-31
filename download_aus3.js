const fs = require('fs');
const { execSync } = require('child_process');

const files = [
  { title: 'File:Facsimile_of_Tuesday,_23rd_October,_1770_(Cook\'s_journal).jpg', dest: 'public/images/aus_cook_journal.jpg' },
  { title: 'File:First_Fleet_entering_Sydney_1788_Bradley.jpg', dest: 'public/images/aus_first_fleet.jpg' },
  { title: 'File:Sydney_Cove,_Port_Jackson_in_the_County_of_Cumberland_-_F._F._delineavit,_1769.jpg', dest: 'public/images/aus_sydney_cove.jpg' },
  { title: 'File:The_Gold_Diggings_of_Victoria_(1852).jpg', dest: 'public/images/aus_gold_rush.jpg' },
  { title: 'File:Aborigines_Claim_Citizen_Rights_-_Day_of_Mourning_broadsheet,_1938.jpg', dest: 'public/images/aus_day_of_mourning.jpg' }
];

async function download() {
  for (const file of files) {
    console.log('Fetching API for ' + file.title);
    const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(file.title) + '&prop=imageinfo&iiprop=url&format=json';
    
    try {
        const apiRes = execSync('curl -s -A "Mozilla/5.0" "' + apiUrl + '"').toString();
        const json = JSON.parse(apiRes);
        const pages = json.query.pages;
        const pageId = Object.keys(pages)[0];
        
        if (pages[pageId] && pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
        let imageUrl = pages[pageId].imageinfo[0].url;
        console.log('Got URL: ' + imageUrl);
        execSync('curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "' + imageUrl + '" -o ' + file.dest);
        } else {
        console.log('Failed to find image info for ' + file.title);
        }
    } catch(e) {
        console.log(e);
    }
    execSync('node -e "setTimeout(()=>{}, 2000)"');
  }
}

download();
