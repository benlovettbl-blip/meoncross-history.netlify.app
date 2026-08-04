import fs from 'fs';

const metadataStr = fs.readFileSync('all_random_videos_metadata.json', 'utf8');
const metadata = JSON.parse(metadataStr);

function categorizeVideo(title, url) {
    const t = title.toLowerCase();
    
    // Middle East (cme_new)
    if (t.includes('1948') || t.includes('nakba') || t.includes('mandate') || t.includes('partition') || t.includes('resolution 181') || t.includes('exodus') || t.includes('haganah') || t.includes('king david hotel') || t.includes('balfour') || t.includes('ben-gurion')) {
        return { unit: 'cme_new', lesson: 'lesson_1' };
    }
    if (t.includes('suez') || t.includes('nasser')) {
        return { unit: 'cme_new', lesson: 'lesson_3' };
    }
    if (t.includes('six-day') || t.includes('six day') || t.includes('1967')) {
        return { unit: 'cme_new', lesson: 'lesson_4' };
    }
    if (t.includes('yom kippur') || t.includes('1973') || t.includes('valley of tears') || t.includes('golda')) {
        return { unit: 'cme_new', lesson: 'lesson_6' };
    }
    if (t.includes('resolution 242')) {
        return { unit: 'cme_new', lesson: 'lesson_5' };
    }
    if (t.includes('munich') || t.includes('black september') || t.includes('september 5')) {
        return { unit: 'cme_new', lesson: 'lesson_8' };
    }
    
    // Weimar & Nazi Germany (weimar_nazi_germany)
    if (t.includes('weimar') || t.includes('kaiser') || t.includes('spartacist') || t.includes('versailles') || t.includes('hyperinflation') || t.includes('hitler') || t.includes('nazi') || t.includes('munich putsch') || t.includes('stresemann') || t.includes('goebbels') || t.includes('gestapo') || t.includes('holocaust') || t.includes('kristallnacht') || t.includes('night of the long knives') || t.includes('sturmabteilung') || t.includes('schutzstaffel') || t.includes('fuhrer') || t.includes('füher') || t.includes('world war i') || t.includes('ww1') || t.includes('wwi')) {
        return { unit: 'weimar_nazi_germany', lesson: 'unknown' };
    }
    
    // Medicine (edexcel_medicine)
    if (t.includes('medicine') || t.includes('medieval') || t.includes('renaissance') || t.includes('cholera') || t.includes('snow') || t.includes('pasteur') || t.includes('koch') || t.includes('penicillin') || t.includes('fleming') || t.includes('florey') || t.includes('chain') || t.includes('nightingale') || t.includes('hospital') || t.includes('surgery') || t.includes('anatomy') || t.includes('vesalius') || t.includes('harvey') || t.includes('sydenham') || t.includes('vaccination') || t.includes('jenner') || t.includes('public health') || t.includes('trench') || t.includes('western front') || t.includes('blood transfusion') || t.includes('x-ray') || t.includes('thomas splint') || t.includes('gas attack') || t.includes('ramc') || t.includes('fany') || t.includes('black death') || t.includes('great plague') || t.includes('miasma')) {
        return { unit: 'edexcel_medicine', lesson: 'unknown' };
    }

    // Elizabeth (eee)
    if (t.includes('elizabeth') || t.includes('mary queen') || t.includes('armada') || t.includes('poverty') || t.includes('puritan') || t.includes('catholic') || t.includes('tudor') || t.includes('exploration') || t.includes('drake') || t.includes('raleigh') || t.includes('virginia') || t.includes('plots') || t.includes('rebellion') || t.includes('ridolfi') || t.includes('throckmorton') || t.includes('babington') || t.includes('walsingham') || t.includes('cecil')) {
        return { unit: 'eee', lesson: 'unknown' };
    }

    // Cold War
    if (t.includes('cold war') || t.includes('soviet') || t.includes('berlin') || t.includes('cuba') || t.includes('missile') || t.includes('stalin') || t.includes('truman') || t.includes('marshall') || t.includes('nato') || t.includes('warsaw') || t.includes('hungarian') || t.includes('prague') || t.includes('gorbachev') || t.includes('reagan')) {
        return { unit: 'cold_war', lesson: 'unknown' };
    }

    return { unit: 'unknown', lesson: 'unknown' };
}

const summary = {};

metadata.forEach(video => {
    const { unit, lesson } = categorizeVideo(video.title, video.url);
    if (!summary[unit]) summary[unit] = [];
    summary[unit].push({ title: video.title, url: video.url, duration: video.duration, lesson });
});

let output = '';
for (const [unit, videos] of Object.entries(summary)) {
    output += `### Unit: ${unit}\n`;
    videos.forEach(v => {
        output += `- [${v.lesson}] ${v.title} (${v.duration})\n`;
    });
    output += '\n';
}

fs.writeFileSync('categorization_summary.txt', output, 'utf8');
console.log('Summary saved.');
