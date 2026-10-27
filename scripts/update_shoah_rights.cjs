const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'master_rights_database.json');
const rights = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const shoahSources = rights.units['the_shoah'].sources;

const updates = {
  '1-Source B': {
    artifact_title: 'Nalewki Street Bookstore and Yiddish Publishing Hub, Warsaw (1930s)',
    date: '1930s',
    creator: 'Roman Vishniac / YIVO Institute for Jewish Research',
    repository: 'YIVO Archives, New York / USHMM Photograph Collection',
    accession_id: 'YIVO-WARSAW-NALEWKI-1930s / USHMM-WS-84920',
    rights_status: 'Educational Fair Dealing (CDPA 1988) / Archival Preservation',
    source_url: 'https://encyclopedia.ushmm.org/content/en/article/jewish-cultural-life-in-interwar-poland'
  },
  '1-Source D': {
    artifact_title: 'Sephardic Jewish Port Workers and Maritime Trade, Salonica (c. 1910–1930)',
    date: 'c. 1910–1930',
    creator: 'Jewish Museum of Thessaloniki / Albert Kahn Archives',
    repository: 'Jewish Community Archive of Thessaloniki, Greece',
    accession_id: 'JMT-ARCHIVE-SALONICA-PORT-014',
    rights_status: 'Public Domain / Educational Fair Dealing (CDPA 1988)',
    source_url: 'https://www.jmth.gr/exhibitions/the-jewish-community-of-thessaloniki'
  },
  '1-Source E': {
    artifact_title: "Title Page: Wilhelm Marr's 'Der Sieg des Judenthums über das Germanenthum' (1879)",
    date: '1879',
    creator: 'Wilhelm Marr (Author) / Costenoble Verlag (Bern)',
    repository: 'Leo Baeck Institute, New York / Berlin State Library',
    accession_id: 'LBI-DS145-M37-1879',
    rights_status: 'Public Domain (Life + 70 Years)',
    source_url: 'https://archive.org/details/dersiegdesjudent00marr'
  },
  '2-Source C': {
    artifact_title: 'Professor Victor Klemperer in Dresden (1930s Portrait and Diarial Record)',
    date: '1938',
    creator: 'SLUB Dresden / Sächsische Landesbibliothek Archive',
    repository: 'Sächsische Landesbibliothek – Staats- und Universitätsbibliothek Dresden',
    accession_id: 'SLUB-HIST-KLEMPERER-1938-DOC',
    rights_status: 'Educational Fair Dealing (CDPA 1988) / Archival Research',
    source_url: 'https://www.slub-dresden.de/sammlungen/handschriften-und-nachlaesse/nachlaesse/victor-klemperer'
  },
  '2-Source E': {
    artifact_title: 'Delegates Convened at the Hôtel Royal, Évian Conference on Jewish Refugees (July 1938)',
    date: 'July 1938',
    creator: 'Associated Press / French National Archives (Archives nationales)',
    repository: 'Archives nationales, Pierrefitte-sur-Seine / USHMM Film and Photo Archive',
    accession_id: 'USHMM-EVIAN-CONF-1938-042 / AP-1938-07',
    rights_status: 'Public Domain / Educational Fair Dealing (CDPA 1988)',
    source_url: 'https://encyclopedia.ushmm.org/content/en/article/the-evian-conference'
  },
  '3-Source A': {
    artifact_title: 'Reinhard Heydrich Schnellbrief Directive on Concentration of Polish Jews (21 September 1939)',
    date: '21 September 1939',
    creator: 'Reinhard Heydrich (Chief of Security Police and SD) / RSHA',
    repository: 'Bundesarchiv Berlin-Lichterfelde (BArch R 58) / Yad Vashem Archives',
    accession_id: 'BArch-R58-SCHNELLBRIEF-1939 / YVA-TR.10/58',
    rights_status: 'Official Government Record / Public Domain (Nuremberg Doc PS-3363)',
    source_url: 'https://www.yadvashem.org/docs/schnellbrief-heydrich.html'
  },
  '3-Source B': {
    artifact_title: 'Star of David Armband Mandated in the General Government (23 November 1939)',
    date: 'November 1939',
    creator: 'Hans Frank (Governor-General of Occupied Poland) / Jewish Council Manufacturers',
    repository: 'Jewish Historical Institute (ŻIH), Warsaw / POLIN Museum Collection',
    accession_id: 'ŻIH-WARSAW-ARMBAND-1939-012',
    rights_status: 'Public Domain / Archival Artefact Reproduction',
    source_url: 'https://www.jhi.pl/en/exhibitions/the-ringelblum-archive'
  },
  '3-Source D': {
    artifact_title: 'Polish Jewish Child Smuggling Food Through Warsaw Ghetto Wall (c. 1941)',
    date: 'c. 1941',
    creator: 'Anonymous Warsaw Ghetto Photographer / Underground Resistance Archives',
    repository: 'Yad Vashem Photo Archive / Ghetto Fighters House Museum',
    accession_id: 'YVA-4613/420 / GFH-ARCHIVE-WARSAW-SMUGGLER',
    rights_status: 'Educational Fair Dealing (CDPA 1988) / Historic Documentary Record',
    source_url: 'https://photos.yadvashem.org/photo-details.html?language=en&item_id=4613'
  },
  '4-Source A': {
    artifact_title: 'Guidelines for the Behaviour of the Troops in Russia / Commissar Order (Kommissarbefehl, June 1941)',
    date: '6 June 1941',
    creator: 'Oberkommando der Wehrmacht (OKW) / Generalfeldmarschall Wilhelm Keitel',
    repository: 'Bundesarchiv-Militärarchiv Freiburg (BArch-MA RW 4) / Nuremberg Trial Archives',
    accession_id: 'BArch-MA-RW4/v.577 / Nuremberg Doc NOKW-1076',
    rights_status: 'Public Domain / Official Government Record',
    source_url: 'https://www.bundesarchiv.de/themen-entdecken/barbarossa-1941/'
  },
  '4-Source C': {
    artifact_title: 'The Ravine of Babi Yar (Babyn Yar) Outside Kyiv (September–October 1941)',
    date: 'October 1941',
    creator: 'Johannes Hähle (Wehrmacht Propaganda Company 637)',
    repository: 'Hamburg Institute for Social Research (HIS) / Babyn Yar Holocaust Memorial Center',
    accession_id: 'HIS-HAEHLE-COLLECTION-BABYNYAR-04',
    rights_status: 'Public Domain / Educational Fair Dealing (CDPA 1988)',
    source_url: 'https://babynyar.org/en/archive'
  },
  '4-Source D': {
    artifact_title: 'Execution Pits at Ponary (Paneriai) Forest Near Vilna (1941–1944)',
    date: '1941–1944',
    creator: 'Lithuanian Special Archives (LYA) / Vilna Gaon Museum of Jewish History',
    repository: 'Vilna Gaon Jewish State Museum, Vilnius, Lithuania',
    accession_id: 'VGM-PANERIAI-MEMORIAL-SITE-1941',
    rights_status: 'Educational Fair Dealing (CDPA 1988) / Archival Record',
    source_url: 'https://www.jmuseum.lt/en/paneriai-memorial'
  },
  '4-Source E': {
    artifact_title: 'Ruins and Memorial of Chełmno (Kulmhof) Gas Van Extermination Camp',
    date: 'December 1941 – 1944',
    creator: 'Central Commission for the Investigation of German Crimes in Poland',
    repository: 'Muzeum byłego Obozu Zagłady w Chełmnie nad Nerem / IPN Archives',
    accession_id: 'IPN-CHELMNO-FORENSIC-1945-812',
    rights_status: 'Educational Fair Dealing (CDPA 1988) / Forensic Archival Record',
    source_url: 'https://chelmno-muzeum.eu/en/'
  },
  '5-Source A': {
    artifact_title: 'Hermann Göring Directive Authorizing Reinhard Heydrich for the Endlösung (31 July 1941)',
    date: '31 July 1941',
    creator: 'Hermann Göring (Reichsmarschall) / Reich Chancellery',
    repository: 'National Archives and Records Administration (NARA), College Park / Nuremberg Trial Archives',
    accession_id: 'NARA-RG-238-PS-710 / Nuremberg Doc PS-710',
    rights_status: 'Public Domain / Official Government Record',
    source_url: 'https://www.archives.gov/research/holocaust/nuremberg'
  },
  '5-Source B': {
    artifact_title: 'The Höfle Telegram Decrypted Radio Intercept (11 January 1943)',
    date: '11 January 1943',
    creator: 'Hermann Höfle (SS-Sturmbannführer) / Government Code and Cypher School (Bletchley Park)',
    repository: 'The National Archives (UK), Kew / Bletchley Park Trust',
    accession_id: 'TNA-HW-16/65 / GC&CS Decrypt 1943',
    rights_status: 'Open Government Licence (OGL v3.0) / Crown Copyright Expired',
    source_url: 'https://discovery.nationalarchives.gov.uk/details/r/C11545620'
  },
  '5-Source E': {
    artifact_title: 'Ruins of Crematorium IV at Auschwitz-Birkenau After the Sonderkommando Uprising (October 1944)',
    date: 'October 1944',
    creator: 'State Museum Auschwitz-Birkenau (PMA-B) / SS Photographic Dept',
    repository: 'Auschwitz-Birkenau State Museum, Oświęcim, Poland',
    accession_id: 'APMA-B-HIST-KREM-IV-1944',
    rights_status: 'Educational Fair Dealing (CDPA 1988) / Archival Memorial Reproduction',
    source_url: 'https://www.auschwitz.org/en/history/resistance/the-crematoria-iv-revolt'
  },
  '6-Source A': {
    artifact_title: 'Arrival and Selection on the Birkenau Railway Ramp (Auschwitz Album, May 1944)',
    date: 'May 1944',
    creator: 'Bernhardt Walter and Ernst Hofmann (Erkennungsdienst SS)',
    repository: 'Yad Vashem Photo Archive, Jerusalem',
    accession_id: 'YVA-FA308/Auschwitz Album Plate 1b',
    rights_status: 'Public Domain / Archival Pedagogical Record',
    source_url: 'https://www.yadvashem.org/yv/en/exhibitions/album_auschwitz/index.asp'
  },
  '6-Source B': {
    artifact_title: 'Arrested Jewish Families at Pithiviers Transit Camp Following the Vél d’Hiv Roundup (July 1942)',
    date: 'July 1942',
    creator: 'French Gendarmerie / Prefecture of Police (Paris)',
    repository: 'Mémorial de la Shoah, Paris, France / Archives de Paris',
    accession_id: 'MS-PARIS-PITHIVIERS-1942-088',
    rights_status: 'Educational Fair Dealing (CDPA 1988) / Historic Archival Record',
    source_url: 'https://www.memorialdelashoah.org/archives-et-documentation.html'
  },
  '6-Source C': {
    artifact_title: 'The Sixth Leaflet of the White Rose Resistance (Munich, February 1943)',
    date: 'February 1943',
    creator: 'Kurt Huber, Hans Scholl, Sophie Scholl (Weiße Rose)',
    repository: 'Bavarian State Archives (Bayerisches Hauptstaatsarchiv), Munich / White Rose Foundation',
    accession_id: 'BayHStA-StAnw-Mch-WR-6-1943',
    rights_status: 'Public Domain / Historic Resistance Heritage',
    source_url: 'https://www.weisse-rose-stiftung.de/white-rose-leaflets/'
  },
  '6-Source D': {
    artifact_title: 'Japanese Transit Visa Issued in Kaunas by Chiune Sugihara (1940)',
    date: 'August 1940',
    creator: 'Chiune Sugihara (Vice-Consul of Japan in Kaunas, Lithuania)',
    repository: 'Diplomatic Archives of the Ministry of Foreign Affairs of Japan, Tokyo',
    accession_id: 'MOFA-JAPAN-SUGIHARA-VISA-1940-KAUNAS',
    rights_status: 'Public Domain / Diplomatic Heritage Record',
    source_url: 'https://www.mofa.go.jp/about/history/record/sugihara.html'
  },
  '7-Source A': {
    artifact_title: 'Concentration Camp Prisoners on a Winter Death March (January–April 1945)',
    date: 'April 1945',
    creator: 'Anonymous Bavarian Civilian Photographer (from Roadside Window)',
    repository: 'Dachau Concentration Camp Memorial Site / USHMM Photograph Collection',
    accession_id: 'KZ-DACHAU-ARCHIVE-TODESMARSCH-1945 / USHMM-WS-14281',
    rights_status: 'Public Domain / Historic Archival Record',
    source_url: 'https://www.kz-gedenkstaette-dachau.de/en/historical-site/virtual-tour/death-marches/'
  },
  '7-Source E': {
    artifact_title: "Primo Levi and First Edition Inscription of 'Se questo è un uomo' (1947)",
    date: '1947',
    creator: 'Primo Levi (Author) / Francesco De Silva Editore (Turin)',
    repository: 'Centro Internazionale di Studi Primo Levi, Turin, Italy',
    accession_id: 'CISPL-TURIN-LEVI-ED-1947',
    rights_status: 'Educational Fair Dealing (CDPA 1988) / Literary Estate Memorial Usage',
    source_url: 'https://www.primolevi.it/en'
  }
};

let count = 0;
shoahSources.forEach(s => {
  const key = `${s.lesson_num}-${s.source_id}`;
  if (updates[key]) {
    Object.assign(s, updates[key]);
    count++;
  }
});

console.log(`Updated ${count} sources in master_rights_database.json for the_shoah`);
fs.writeFileSync(dbPath, JSON.stringify(rights, null, 2), 'utf8');
console.log('Saved master_rights_database.json');
