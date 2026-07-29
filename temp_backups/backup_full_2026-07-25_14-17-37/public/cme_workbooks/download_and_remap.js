const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');
const publicAssetsDir = path.join(publicDir, 'assets');
const publicSourcesDir = path.join(publicAssetsDir, 'sources');
const publicPortraitsDir = path.join(publicSourcesDir, 'portraits');

// Ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

ensureDir(publicPortraitsDir);

// Mapping of wikimedia URLs to local paths (relative to public/)
const mapping = {
  "https://upload.wikimedia.org/wikipedia/commons/0/03/Mohammed_Amin_al-Husseini-MJ.jpg": "assets/sources/portraits/grand_mufti.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Intifada_in_Gaza_Strip_%28FL45884441%29.jpg": "assets/sources/intifada_palestine_1987.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/c/cd/Bundesarchiv_Bild_183-1982-0310-027%2C_Berlin%2C_Yasser_Arafat%2C_Erich_Honecker.jpg": "assets/sources/portraits/yasser_arafat.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/88/Abdullah_I_of_Jordan_portrait.jpg": "assets/sources/portraits/abdullah_i.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3e/King-Hussein-bin-Talal-al-Hashemi-of-Jordan-with-an-automatic-weapon-352047190570.jpg": "assets/sources/portraits/king_hussein.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/Sugiono_and_Mahmoud_Abbas_at_the_2024_BRICS_Summit_-_02.jpg": "assets/sources/portraits/mahmoud_abbas.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golda_Meir_%281964%29.jpg": "assets/sources/portraits/golda_meir.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6b/Ariel_Sharon_official_portrait_2001.webp": "assets/sources/portraits/ariel_sharon.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/14/Ludwig_Blum_-_Moshe_Dayan%2C_1949.JPG": "assets/sources/portraits/moshe_dayan.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/f2/Yitzhak_Rabin_1994_Portrait_%283x4_cropped%29.jpg": "assets/sources/portraits/yitzhak_rabin.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ernest_Bevin_MP.jpg": "assets/sources/portraits/ernest_bevin.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/ed/Premier_Lubbers_ontvangt_premier_Shamir_van_Israel_op_Catshuis%2C_Bestanddeelnr_932-8773_%28cropped%29.jpg": "assets/sources/portraits/yitzhak_shamir.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/97/President_Trump_Meets_with_Henry_Kissinger_%2833787724293%29.jpg": "assets/sources/portraits/henry_kissinger.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/Jimmy_Carter_1971_a.jpg": "assets/sources/portraits/jimmy_carter.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/f8/Begin%2C_Carter_and_Sadat_at_Camp_David_1978.jpg": "assets/sources/portraits/menachem_begin.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/Palestinian_refugees_in_Ein_El_Hilweh_refugee_camp_in_Lebanon.jpg": "assets/sources/palestinian_refugees_1948.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/Gamal_Abdel_Nasser_%28c._1960s%29.jpg": "assets/sources/portraits/gamal_abdel_nasser.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/George_Habash_Portrait.jpg": "assets/sources/portraits/george_habash.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/be/Anwar_Sadat_official_portrait.jpg": "assets/sources/portraits/anwar_sadat.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/80/V%C3%A4ter_der_Einheit.jpg": "assets/sources/portraits/mikhail_gorbachev.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/73/Oslo-Accordsmaxresdefault-1.jpg": "assets/sources/rabin_clinton_arafat.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Egyptian_forces_crossing_the_Suez_Canal.jpg": "assets/sources/egyptian_crossing_1973.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/30/Hosni_Mubarak_illustration.png": "assets/sources/portraits/hosni_mubarak.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Portrait_of_prime_minister_Levy_Eshkol._August_1963._D699-070.jpg": "assets/sources/portraits/levi_eshkol.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/c/cc/Tiran_R01.jpg": "assets/sources/straits_of_tiran.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/bd/UN_Palestine_Partition_Versions_1947.jpg": "assets/sources/un_partition_plan_1947.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/Kurdish_fighters_and_a_destroyed_portrait_of_dictator_Saddam_Hussein_during_the_1991_Iraqi_uprisings.jpg": "assets/sources/portraits/saddam_hussein.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/62/%D7%A6%D7%A0%D7%97%D7%A0%D7%99%D7%9D_%D7%91%D7%9B%D7%95%D7%AA%D7%9C_%D7%94%D7%9E%D7%A2%D7%A8%D7%91%D7%99.jpg": "assets/sources/western_wall_1967.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Folke_Bernadotte%2C_Count_of_Wisborg.png": "assets/sources/portraits/folke_bernadotte.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/49/44_Bill_Clinton_3x4.jpg": "assets/sources/portraits/bill_clinton.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b0/Sadat_and_Begin_clean3.jpg": "assets/sources/sadat_carter_begin_1978.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/95/Portrait_of_Hafez_al-Assad_in_1990s.jpg": "assets/sources/portraits/hafez_al_assad.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/David_Ben-Gurion_in_1952.jpg": "assets/sources/portraits/david_ben_gurion.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/59/Members_of_Israeli_Delegation_to_Armistice_talks_in_Rhodes%2C_January_1949.jpg": "assets/sources/1949_armistice_map.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/23/Al-Ahram_Newspaper_Publish_Suez_Canal_Nationalization.jpg": "assets/sources/nasser_nationalizing_suez_1956.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/ac/George_and_Barbara_Bush_with_their_first_born_child_George_W._Bush%2C_while_Bush_was_a_student_at_Yale.jpg": "assets/sources/portraits/george_h_w_bush.jpg",
};

// Download helper with redirects
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    try {
      const urlObj = new URL(url);
      https.get(urlObj, { headers: { 'User-Agent': 'EdexcelHistoryStudyApp/1.0 (studyapp@gmail.com)' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          let redirectUrl = res.headers.location;
          if (redirectUrl.startsWith('//')) {
            redirectUrl = 'https:' + redirectUrl;
          } else if (redirectUrl.startsWith('/')) {
            redirectUrl = urlObj.origin + redirectUrl;
          }
          downloadFile(redirectUrl, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: HTTP Status ${res.statusCode}`));
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        reject(err);
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function run() {
  // Move middle_east_header.png to public/assets/
  const originalHeader = path.join(rootDir, 'assets', 'middle_east_header.png');
  const targetHeader = path.join(publicAssetsDir, 'middle_east_header.png');
  if (fs.existsSync(originalHeader)) {
    fs.copyFileSync(originalHeader, targetHeader);
    console.log(`Copied middle_east_header.png to public/assets/`);
  }

  // Copy existing portraits if they exist to save requests
  const localPortraits = {
    'david_ben_gurion.jpg': 'assets/sources/portraits/david_ben_gurion.jpg',
    'kissinger.jpg': 'assets/sources/portraits/henry_kissinger.jpg' // note henry_kissinger mapped to kissinger.jpg locally
  };

  const oldPortraitsDir = path.join(rootDir, 'assets', 'sources', 'portraits');
  if (fs.existsSync(oldPortraitsDir)) {
    for (const [oldName, targetRel] of Object.entries(localPortraits)) {
      const oldPath = path.join(oldPortraitsDir, oldName);
      if (fs.existsSync(oldPath)) {
        const targetPath = path.join(publicDir, targetRel);
        fs.copyFileSync(oldPath, targetPath);
        console.log(`Reused local portrait: ${oldName} -> ${targetRel}`);
      }
    }
  }

  // Download all files in mapping
  const urls = Object.keys(mapping);
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const relPath = mapping[url];
    const dest = path.join(publicDir, relPath);

    // Skip if already exists or downloaded
    if (fs.existsSync(dest)) {
      console.log(`[${i+1}/${urls.length}] File already exists: ${relPath}`);
      continue;
    }

    console.log(`[${i+1}/${urls.length}] Downloading ${url} ...`);
    try {
      await downloadFile(url, dest);
      console.log(`Successfully downloaded to ${relPath}`);
      // Respectful 300ms delay to prevent Wikimedia rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (e) {
      console.error(`Error downloading ${url}:`, e);
      // Wait slightly longer on error before retry/continue
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Search and replace remote URLs with local ones in src/views.js and src/lessons_data.js
  const filesToUpdate = [
    path.join(srcDir, 'views.js'),
    path.join(srcDir, 'lessons_data.js')
  ];

  filesToUpdate.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let count = 0;
      Object.entries(mapping).forEach(([url, localPath]) => {
        if (content.includes(url)) {
          // Replace all occurrences
          content = content.split(url).join(localPath);
          count++;
        }
      });
      if (count > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${path.basename(filePath)}: replaced ${count} remote URL types with local paths.`);
      } else {
        console.log(`No updates needed for ${path.basename(filePath)}.`);
      }
    }
  });

  console.log("Migration complete!");
}

run();
