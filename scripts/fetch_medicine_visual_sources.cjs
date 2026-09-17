const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

// Specific search titles or direct Wikimedia thumbnail targets
const imageRequests = [
  // L1
  { filename: 'zodiac_man.jpg', search: 'Zodiac man' },
  { filename: 'medieval_urine_chart.jpg', search: 'Urine wheel' },
  // L2
  { filename: 'hotel_dieu_hospital.jpg', search: 'Hôtel-Dieu Paris woodcut' },
  { filename: 'medieval_barber_surgeon.jpg', search: 'Medieval bloodletting' },
  // L3
  { filename: 'flagellants_1349.jpg', search: 'Flagellants 1349 Doetechum' },
  // L4 - USER SPECIFIC REQUEST: Vesalius Fabrica frontispiece!
  {
    filename: 'vesalius_fabrica_frontispiece.jpg',
    search: 'De Humani Corporis Fabrica Libri Septem',
  },
  // L5
  { filename: 'pare_artificial_limbs.jpg', search: 'Ambroise Paré artificial limb' },
  { filename: 'quack_doctor_steen.jpg', search: 'Jan Steen Quack' },
  { filename: 'culpeper_herbal.jpg', search: 'The English Physitian Culpeper' },
  // L6
  { filename: 'bill_of_mortality_1665.jpg', search: 'London Bill of Mortality 1665' },
  { filename: 'plague_doctor_1665.jpg', search: 'Doktor Schnabel von Rom' },
  // L7
  { filename: 'pasteur_swan_neck.jpg', search: 'Swan neck flask experiment' },
  { filename: 'koch_bacteria.jpg', search: 'Robert Koch anthrax' },
  // L8
  { filename: 'lister_carbolic_spray.jpg', search: 'Lister carbolic spray' },
  {
    filename: 'nightingale_coxcomb.jpg',
    search: 'Diagram of the causes of mortality in the army in the East',
  },
  { filename: 'simpson_chloroform.jpg', search: 'James Young Simpson chloroform' },
  // L9
  {
    filename: 'cow_pock_gillray.jpg',
    search: 'The Cow-Pock or the Wonderful Effects of the New Inoculation',
  },
  // L10
  { filename: 'photograph_51.jpg', search: 'Photo 51' },
  { filename: 'electron_microscope_virus.jpg', search: 'Bacteriophage electron microscope' },
  // L11
  { filename: 'paul_ehrlich_lab.jpg', search: 'Paul Ehrlich laboratory' },
  { filename: 'robotic_surgery_da_vinci.jpg', search: 'Da Vinci Surgical System' },
  // L12
  { filename: 'florey_chain_apparatus.jpg', search: 'Penicillin production Oxford Dunn School' },
  // L13
  { filename: 'vintage_doctor_cigarette_ad.jpg', search: 'More Doctors Smoke Camels' },
  {
    filename: 'plain_cigarette_packaging_uk.jpg',
    search: 'Plain tobacco packaging United Kingdom',
  },
  // L14
  { filename: 'rontgen_first_xray.jpg', search: 'First medical X-ray' },
  { filename: 'western_front_map_1916.jpg', search: 'Western Front (World War I)' },
  // L15
  { filename: 'trench_foot_clinical.jpg', search: 'Trench foot' },
  { filename: 'stretcher_bearers_passchendaele.jpg', search: 'Passchendaele stretcher bearers' },
  { filename: 'british_ph_gas_helmet.jpg', search: 'British PH gas helmet' },
  // L16
  { filename: 'brodie_helmet_shrapnel.jpg', search: 'Brodie helmet' },
  { filename: 'sargent_gassed_1919.jpg', search: 'Gassed (painting)' },
  { filename: 'ww1_shrapnel_xray.jpg', search: 'World War I X-ray shrapnel' },
  // L17
  { filename: 'ramc_chain_of_evacuation.jpg', search: 'Chain of evacuation RAMC' },
  {
    filename: 'casualty_clearing_station_ww1.jpg',
    search: 'Casualty Clearing Station World War I',
  },
  { filename: 'ramc_canal_barge.jpg', search: 'Ambulance barge World War I' },
  // L18
  { filename: 'robertson_blood_depot_1917.jpg', search: 'Oswald Hope Robertson blood transfusion' },
  { filename: 'gillies_tubed_pedicle.jpg', search: 'Harold Gillies plastic surgery' },
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'MeoncrossHistoryHub/1.0 (educational; history@meoncross.co.uk)',
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          });
        },
      )
      .on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client
      .get(
        url,
        {
          headers: {
            'User-Agent': 'MeoncrossHistoryHub/1.0 (educational; history@meoncross.co.uk)',
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            // Handle redirect
            downloadFile(res.headers.location, dest).then(resolve).catch(reject);
            return;
          }
          if (res.statusCode !== 200) {
            file.close();
            if (fs.existsSync(dest)) fs.unlinkSync(dest);
            reject(new Error(`HTTP ${res.statusCode} when downloading ${url}`));
            return;
          }
          res.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              const stats = fs.statSync(dest);
              if (stats.size < 2000) {
                fs.unlinkSync(dest);
                reject(new Error(`File too small (${stats.size} bytes), likely an error page`));
              } else {
                resolve(stats.size);
              }
            });
          });
        },
      )
      .on('error', (err) => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
  });
}

async function run() {
  console.log(
    `Starting retrieval of ${imageRequests.length} primary visual sources for GCSE Medicine...`,
  );
  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const item of imageRequests) {
    const destPath = path.join(targetDir, item.filename);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 5000) {
      console.log(`[EXISTS] ${item.filename} (${fs.statSync(destPath).size} bytes)`);
      skippedCount++;
      continue;
    }

    try {
      console.log(`[QUERY] Searching for "${item.search}" -> ${item.filename}`);
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(item.search)}&gsrlimit=3&prop=pageimages&pithumbsize=600&format=json`;
      const data = await fetchJson(searchUrl);

      let thumbUrl = null;
      if (data && data.query && data.query.pages) {
        const pages = Object.values(data.query.pages);
        for (const p of pages) {
          if (p.thumbnail && p.thumbnail.source) {
            thumbUrl = p.thumbnail.source;
            break;
          }
        }
      }

      if (!thumbUrl) {
        console.warn(
          `[WARN] No thumbnail found via search for "${item.search}". Trying direct title query...`,
        );
        const directUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.search)}&prop=pageimages&pithumbsize=600&format=json`;
        const directData = await fetchJson(directUrl);
        if (directData && directData.query && directData.query.pages) {
          const pages = Object.values(directData.query.pages);
          if (pages[0] && pages[0].thumbnail) {
            thumbUrl = pages[0].thumbnail.source;
          }
        }
      }

      if (!thumbUrl) {
        console.error(`[FAIL] Could not locate thumbnail for "${item.search}"`);
        failedCount++;
        continue;
      }

      console.log(`[DOWNLOADING] ${thumbUrl} -> ${item.filename}`);
      const size = await downloadFile(thumbUrl, destPath);
      console.log(`[SUCCESS] Saved ${item.filename} (${size} bytes)`);
      successCount++;
    } catch (err) {
      console.error(`[ERROR] Failed to fetch ${item.filename}: ${err.message}`);
      failedCount++;
    }

    // Gentle delay between requests to be polite to Wikipedia API
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\n=== Asset Retrieval Summary ===`);
  console.log(`Downloaded: ${successCount} | Existing: ${skippedCount} | Failed: ${failedCount}`);
}

run();
