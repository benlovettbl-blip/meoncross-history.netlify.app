import fs from 'fs';
import { execSync } from 'child_process';

const oldDbStr = execSync('git show HEAD:database.json', { encoding: 'utf8' });
const oldDb = JSON.parse(oldDbStr);

for (const key of Object.keys(oldDb)) {
  const dataJsPath = `public/units/${key}/data.js`;
  if (fs.existsSync(dataJsPath)) {
    const data = oldDb[key].data;
    if (!data) continue;
    
    let injected = '';
    
    // Add cover image if it exists in old database but is missing in data.js
    if (data.cover_image) {
        injected += `\n  "cover_image": "${data.cover_image}",`;
    }
    
    // Add homepage background
    if (data.homepage_background) {
        injected += `\n  "homepage_background": "${data.homepage_background}",`;
    }
    
    // Add title if it's missing or doesn't have KS3 prefix when it should
    let targetTitle = data.title;
    if (targetTitle && !targetTitle.startsWith("KS3: ") && ['water_and_sanitation', 'medieval_england', 'change_1450_1750', 'industrialisation_and_empire', 'great_war', 'australia', 'cold_war', 'crown_parliament_revolution'].includes(key)) {
        targetTitle = "KS3: " + targetTitle;
    }
    
    if (targetTitle) {
        // Just always inject the explicit title (will override lower down or just add it)
        injected += `\n  "title": "${targetTitle}",`;
    }
    
    if (injected) {
       let content = fs.readFileSync(dataJsPath, 'utf8');
       
       if (content.includes('module.exports = {')) {
           content = content.replace('module.exports = {', 'module.exports = {' + injected);
       } else if (content.includes('export const unitData = {')) {
           content = content.replace('export const unitData = {', 'export const unitData = {' + injected);
       } else if (content.includes('export default {')) {
           content = content.replace('export default {', 'export default {' + injected);
       }
       
       fs.writeFileSync(dataJsPath, content);
       console.log(`Injected into ${key}`);
    }
  }
}

console.log("Rebuilding database...");
execSync('node build_database.cjs', { stdio: 'inherit' });
console.log("Done!");
