import { execSync } from 'child_process';
import path from 'path';

const images = [
    { dest: "dachau_roll_call.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Dachau_Concentration_Camp_roll_call.jpg/500px-Dachau_Concentration_Camp_roll_call.jpg" },
    { dest: "hitler_hindenburg_1933.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bundesarchiv_Bild_102-14269%2C_Potsdam%2C_Tag_von_Potsdam%2C_Adolf_Hitler%2C_Paul_v._Hindenburg.jpg/500px-Bundesarchiv_Bild_102-14269%2C_Potsdam%2C_Tag_von_Potsdam%2C_Adolf_Hitler%2C_Paul_v._Hindenburg.jpg" },
    { dest: "munich_putsch_defendants.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Bundesarchiv_Bild_102-00344A%2C_M%C3%BCnchen%2C_nach_Hitler-Ludendorff_Prozess.jpg/500px-Bundesarchiv_Bild_102-00344A%2C_M%C3%BCnchen%2C_nach_Hitler-Ludendorff_Prozess.jpg" },
    { dest: "nazi_poster_our_last_hope.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Wahlplakat_Hitler_unsere_letzte_Hoffnung.jpg/500px-Wahlplakat_Hitler_unsere_letzte_Hoffnung.jpg" },
    { dest: "nuremberg_rally.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Bundesarchiv_Bild_102-17049%2C_N%C3%BCrnberg%2C_Reichsparteitag%2C_SA-_und_SS-Appell.jpg/500px-Bundesarchiv_Bild_102-17049%2C_N%C3%BCrnberg%2C_Reichsparteitag%2C_SA-_und_SS-Appell.jpg" },
    { dest: "reichstag_fire_ruins.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Bundesarchiv_Bild_102-14364%2C_Berlin%2C_Reichstagsbrand.jpg/500px-Bundesarchiv_Bild_102-14364%2C_Berlin%2C_Reichstagsbrand.jpg" }
];

for (const img of images) {
    const destPath = path.join(process.cwd(), 'public', 'images', img.dest);
    const curlCommand = `curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -H "Accept: image/webp,image/apng,image/*,*/*;q=0.8" "${img.url}" -o "${destPath}"`;
    try {
        console.log(`Downloading ${img.dest}...`);
        execSync(curlCommand, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to download ${img.dest}`);
    }
}

console.log("Finished downloading broken images.");
