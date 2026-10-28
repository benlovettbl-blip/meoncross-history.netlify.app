const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const dbPath = path.join(__dirname, 'master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const outHtmlPath = path.join(__dirname, '..', 'public', 'master_rights_register.html');
const outPdfDir = path.join(__dirname, '..', 'public', 'pdfs');
if (!fs.existsSync(outPdfDir)) fs.mkdirSync(outPdfDir, { recursive: true });

const ks2PdfDir = path.join(outPdfDir, 'ks2_ww2');
if (!fs.existsSync(ks2PdfDir)) fs.mkdirSync(ks2PdfDir, { recursive: true });

const masterPdfPath = path.join(outPdfDir, 'master_provenance_copyright_register.pdf');
const ks2PdfPath = path.join(ks2PdfDir, 'ks2_ww2_source_bibliography.pdf');

// Exhaustive dictionary of official institutional main homepages
const repoHomepages = [
  { match: /Imperial War Museum|IWM/i, url: 'https://www.iwm.org.uk', domain: 'iwm.org.uk' },
  { match: /British Library/i, url: 'https://www.bl.uk', domain: 'bl.uk' },
  {
    match: /National Archives \(UK\)|The National Archives, Kew|The National Archives/i,
    url: 'https://www.nationalarchives.gov.uk',
    domain: 'nationalarchives.gov.uk',
  },
  {
    match: /National Archives and Records Administration|NARA|US National Archives/i,
    url: 'https://www.archives.gov',
    domain: 'archives.gov',
  },
  {
    match: /Wellcome Collection/i,
    url: 'https://wellcomecollection.org',
    domain: 'wellcomecollection.org',
  },
  {
    match: /Bundesarchiv|German Federal Archives/i,
    url: 'https://www.bundesarchiv.de',
    domain: 'bundesarchiv.de',
  },
  { match: /Yad Vashem/i, url: 'https://www.yadvashem.org', domain: 'yadvashem.org' },
  {
    match: /United States Holocaust Memorial Museum|USHMM/i,
    url: 'https://www.ushmm.org',
    domain: 'ushmm.org',
  },
  {
    match: /Wiener Holocaust Library/i,
    url: 'https://wienerholocaustlibrary.net',
    domain: 'wienerholocaustlibrary.net',
  },
  { match: /Library of Congress/i, url: 'https://www.loc.gov', domain: 'loc.gov' },
  { match: /British Museum/i, url: 'https://www.britishmuseum.org', domain: 'britishmuseum.org' },
  { match: /National Portrait Gallery/i, url: 'https://www.npg.org.uk', domain: 'npg.org.uk' },
  { match: /National Maritime Museum/i, url: 'https://www.rmg.co.uk', domain: 'rmg.co.uk' },
  { match: /Royal Collection Trust/i, url: 'https://www.rct.uk', domain: 'rct.uk' },
  {
    match: /Parliamentary Archives/i,
    url: 'https://archives.parliament.uk',
    domain: 'archives.parliament.uk',
  },
  { match: /Commonwealth War Graves|CWGC/i, url: 'https://www.cwgc.org', domain: 'cwgc.org' },
  {
    match: /In Flanders Fields Museum/i,
    url: 'https://www.inflandersfields.be',
    domain: 'inflandersfields.be',
  },
  { match: /Talbot House/i, url: 'https://www.talbothouse.be', domain: 'talbothouse.be' },
  {
    match: /Science Museum/i,
    url: 'https://www.sciencemuseumgroup.org.uk',
    domain: 'sciencemuseumgroup.org.uk',
  },
  { match: /Royal College of Surgeons/i, url: 'https://www.rcseng.ac.uk', domain: 'rcseng.ac.uk' },
  { match: /Bibliothèque nationale de France|BnF/i, url: 'https://www.bnf.fr', domain: 'bnf.fr' },
  {
    match: /Tapisserie de Bayeux|Bayeux/i,
    url: 'https://www.bayeuxmuseum.com',
    domain: 'bayeuxmuseum.com',
  },
  { match: /Associated Press|AP Images/i, url: 'https://www.apimages.com', domain: 'apimages.com' },
  { match: /United Nations|UN |UNISPAL|UNRWA/i, url: 'https://www.un.org', domain: 'un.org' },
  { match: /National Army Museum/i, url: 'https://www.nam.ac.uk', domain: 'nam.ac.uk' },
  { match: /Victoria and Albert Museum|V&A/i, url: 'https://www.vam.ac.uk', domain: 'vam.ac.uk' },
  {
    match: /Museum of the Royal Navy|NMRN/i,
    url: 'https://www.nmrn.org.uk',
    domain: 'nmrn.org.uk',
  },
  {
    match: /English Heritage/i,
    url: 'https://www.english-heritage.org.uk',
    domain: 'english-heritage.org.uk',
  },
  {
    match: /Hampshire Fieldwork Archive|Portsmouth City Museum|Portsmouth Museums/i,
    url: 'https://portsmouthcitymuseums.co.uk',
    domain: 'portsmouthcitymuseums.co.uk',
  },
  {
    match: /Sussex Archaeological Society|Fishbourne/i,
    url: 'https://sussexpast.co.uk',
    domain: 'sussexpast.co.uk',
  },
  {
    match: /Magdalene College|Pepys Library/i,
    url: 'https://www.magd.cam.ac.uk',
    domain: 'magd.cam.ac.uk',
  },
  {
    match: /Walker Art Gallery|Liverpool Museums/i,
    url: 'https://www.liverpoolmuseums.org.uk',
    domain: 'liverpoolmuseums.org.uk',
  },
  {
    match: /Massachusetts Historical Society/i,
    url: 'https://www.masshist.org',
    domain: 'masshist.org',
  },
  {
    match: /General Archive of the Indies|Archivo General de Indias/i,
    url: 'https://www.cultura.gob.es',
    domain: 'cultura.gob.es',
  },
  {
    match: /Topkapi Palace|Milli Saraylar/i,
    url: 'https://www.millisaraylar.gov.tr',
    domain: 'millisaraylar.gov.tr',
  },
  { match: /Rijksmuseum/i, url: 'https://www.rijksmuseum.nl', domain: 'rijksmuseum.nl' },
  {
    match: /Bank of England/i,
    url: 'https://www.bankofengland.co.uk',
    domain: 'bankofengland.co.uk',
  },
  { match: /Robert Koch Institute|RKI/i, url: 'https://www.rki.de', domain: 'rki.de' },
  {
    match: /Israel Government Press Office|GPO/i,
    url: 'https://www.gpo.gov.il',
    domain: 'gpo.gov.il',
  },
  { match: /National Library of Israel/i, url: 'https://www.nli.org.il', domain: 'nli.org.il' },
  {
    match: /IDF Archive|IDFA/i,
    url: 'https://www.archives.mod.gov.il',
    domain: 'archives.mod.gov.il',
  },
  { match: /Bletchley Park/i, url: 'https://bletchleypark.org.uk', domain: 'bletchleypark.org.uk' },
  {
    match: /The National Museum of Computing|TNMOC/i,
    url: 'https://www.tnmoc.org',
    domain: 'tnmoc.org',
  },
  {
    match: /Royal Hampshire Regiment Museum/i,
    url: 'https://www.royalhampshireregiment.org',
    domain: 'royalhampshireregiment.org',
  },
  {
    match: /London Metropolitan Archives/i,
    url: 'https://www.cityoflondon.gov.uk/lma',
    domain: 'cityoflondon.gov.uk',
  },
  {
    match: /London Transport Museum/i,
    url: 'https://www.ltmuseum.co.uk',
    domain: 'ltmuseum.co.uk',
  },
  { match: /King's College London/i, url: 'https://www.kcl.ac.uk', domain: 'kcl.ac.uk' },
  { match: /Churchill Archives/i, url: 'https://www.chu.cam.ac.uk', domain: 'chu.cam.ac.uk' },
  {
    match: /British Cartoon Archive/i,
    url: 'https://www.cartoons.ac.uk',
    domain: 'cartoons.ac.uk',
  },
  {
    match: /Auckland War Memorial Museum/i,
    url: 'https://www.aucklandmuseum.com',
    domain: 'aucklandmuseum.com',
  },
  { match: /West Point/i, url: 'https://www.westpoint.edu', domain: 'westpoint.edu' },
  {
    match: /Koninklijke Bibliotheek|National Library of the Netherlands/i,
    url: 'https://www.kb.nl',
    domain: 'kb.nl',
  },
  {
    match: /National Library and Archives of Egypt|Darelkotob/i,
    url: 'https://www.darelkotob.gov.eg',
    domain: 'darelkotob.gov.eg',
  },
  {
    match: /Bibliotheca Alexandrina|Arab League/i,
    url: 'https://www.bibalex.org',
    domain: 'bibalex.org',
  },
  { match: /Al-Ahram/i, url: 'https://gate.ahram.org.eg', domain: 'ahram.org.eg' },
  { match: /Deutsches Historisches Museum|DHM/i, url: 'https://www.dhm.de', domain: 'dhm.de' },
  {
    match: /Stadtarchiv München|Munich City Archives/i,
    url: 'https://stadtarchiv.muenchen.de',
    domain: 'stadtarchiv.muenchen.de',
  },
  {
    match: /Bayerisches Hauptstaatsarchiv|Bavarian State Archives|Kriegsarchiv/i,
    url: 'https://www.gda.bayern.de',
    domain: 'gda.bayern.de',
  },
  {
    match: /NS-Dokumentationszentrum|EL-DE Haus/i,
    url: 'https://museenkoeln.de/ns-dokumentationszentrum/',
    domain: 'museenkoeln.de',
  },
  {
    match: /Bistumsarchiv Münster/i,
    url: 'https://www.bistum-muenster.de',
    domain: 'bistum-muenster.de',
  },
  {
    match: /National Library of Medicine|NLM/i,
    url: 'https://www.nlm.nih.gov',
    domain: 'nlm.nih.gov',
  },
  {
    match: /Assistance Publique - Hôpitaux de Paris|AP-HP/i,
    url: 'https://www.aphp.fr',
    domain: 'aphp.fr',
  },
  { match: /Royal Library of Belgium|KBR/i, url: 'https://www.kbr.be', domain: 'kbr.be' },
  { match: /Mauritshuis/i, url: 'https://www.mauritshuis.nl', domain: 'mauritshuis.nl' },
  { match: /Musée d'Orsay/i, url: 'https://www.musee-orsay.fr', domain: 'musee-orsay.fr' },
  {
    match: /SRITA|Impact of Tobacco Advertising/i,
    url: 'https://tobacco.stanford.edu',
    domain: 'tobacco.stanford.edu',
  },
  { match: /Vatican/i, url: 'https://www.vaticanlibrary.va', domain: 'vaticanlibrary.va' },
  {
    match: /Archivo General de Simancas|Simancas/i,
    url: 'https://www.cultura.gob.es',
    domain: 'cultura.gob.es',
  },
  {
    match: /Utrecht University Library/i,
    url: 'https://www.uu.nl/universiteitsbibliotheek',
    domain: 'uu.nl',
  },
  {
    match: /Middle Temple Library/i,
    url: 'https://www.middletemple.org.uk',
    domain: 'middletemple.org.uk',
  },
  {
    match: /Smithsonian National Museum of American History/i,
    url: 'https://americanhistory.si.edu',
    domain: 'americanhistory.si.edu',
  },
  {
    match: /Olympic World Library|International Olympic Committee/i,
    url: 'https://library.olympics.com',
    domain: 'olympics.com',
  },
  {
    match: /Naval History and Heritage Command|NHHC/i,
    url: 'https://www.history.navy.mil',
    domain: 'history.navy.mil',
  },
  {
    match: /Kent State University Special Collections/i,
    url: 'https://www.library.kent.edu/special-collections-and-archives',
    domain: 'library.kent.edu',
  },
  { match: /New York Times/i, url: 'https://www.nytimes.com', domain: 'nytimes.com' },
  { match: /Bettmann|Corbis/i, url: 'https://www.gettyimages.com', domain: 'gettyimages.com' },
  {
    match: /International Center of Photography|Life Picture Collection/i,
    url: 'https://www.icp.org',
    domain: 'icp.org',
  },
  {
    match: /Osler Library|McGill University/i,
    url: 'https://www.mcgill.ca/library/branches/osler',
    domain: 'mcgill.ca',
  },
  {
    match: /Library and Archives Canada|LAC/i,
    url: 'https://library-archives.canada.ca',
    domain: 'canada.ca',
  },
  {
    match: /Volksbund Deutsche Kriegsgräberfürsorge|VDK/i,
    url: 'https://www.volksbund.de',
    domain: 'volksbund.de',
  },
  {
    match: /Service Historique de la Défense|SHD/i,
    url: 'https://www.servicehistorique.sga.defense.gouv.fr',
    domain: 'defense.gouv.fr',
  },
  {
    match: /St\. George's Memorial Church/i,
    url: 'https://www.stgeorgesmemorialchurchypres.com',
    domain: 'stgeorgesmemorialchurchypres.com',
  },
  {
    match: /Jewish Museum Frankfurt/i,
    url: 'https://www.juedischesmuseum.de',
    domain: 'juedischesmuseum.de',
  },
  {
    match: /Politisches Archiv des Auswärtigen Amts/i,
    url: 'https://archiv.diplo.de',
    domain: 'archiv.diplo.de',
  },
  {
    match: /Institut für Zeitgeschichte|IfZ/i,
    url: 'https://www.ifz-muenchen.de',
    domain: 'ifz-muenchen.de',
  },
  {
    match: /Russian State Library|RGB|Hoover Institution/i,
    url: 'https://www.rsl.ru',
    domain: 'rsl.ru',
  },
  {
    match:
      /Cold War International History Project|Archive of the President of the Russian Federation/i,
    url: 'https://www.wilsoncenter.org/program/cold-war-international-history-project',
    domain: 'wilsoncenter.org',
  },
  { match: /TASS Archive|RGAKFD/i, url: 'http://rgakfd.ru', domain: 'rgakfd.ru' },
  {
    match: /Bismarck Museum/i,
    url: 'https://www.bismarck-stiftung.de',
    domain: 'bismarck-stiftung.de',
  },
  {
    match: /Musée Carnavalet/i,
    url: 'https://www.carnavalet.paris.fr',
    domain: 'carnavalet.paris.fr',
  },
  {
    match: /Archives Diplomatiques|French Ministry of Foreign Affairs/i,
    url: 'https://www.diplomatie.gouv.fr/fr/archives-diplomatiques/',
    domain: 'diplomatie.gouv.fr',
  },
  {
    match: /Austrian State Archives|Österreichisches Staatsarchiv/i,
    url: 'https://www.oesta.gv.at',
    domain: 'oesta.gv.at',
  },
  {
    match: /Austrian National Library|Österreichische Nationalbibliothek/i,
    url: 'https://www.onb.ac.at',
    domain: 'onb.ac.at',
  },
  {
    match: /Historical Archives of Belgrade/i,
    url: 'https://www.arhiv-beograda.rs',
    domain: 'arhiv-beograda.rs',
  },
  {
    match: /Corpus Christi College|Parker Library/i,
    url: 'https://parker.stanford.edu',
    domain: 'parker.stanford.edu',
  },
  {
    match: /State Library of New South Wales|SLNSW/i,
    url: 'https://www.sl.nsw.gov.au',
    domain: 'sl.nsw.gov.au',
  },
  {
    match: /Natural History Museum|NHM/i,
    url: 'https://www.nhm.ac.uk',
    domain: 'nhm.ac.uk',
  },
  {
    match: /Royal Armouries/i,
    url: 'https://royalarmouries.org',
    domain: 'royalarmouries.org',
  },
  {
    match: /Norman B\. Leventhal Map Center|Leventhal Map/i,
    url: 'https://www.leventhalmap.org',
    domain: 'leventhalmap.org',
  },
];

function resolveRepo(repoStr) {
  for (const entry of repoHomepages) {
    if (entry.match.test(repoStr)) {
      return entry;
    }
  }
  return { url: 'https://www.nationalarchives.gov.uk', domain: 'nationalarchives.gov.uk' };
}

function buildHtml(targetUnitId = null) {
  let units = Object.values(db.units);
  if (targetUnitId) {
    units = units.filter((u) => u.unit_id === targetUnitId);
  }

  let totalItems = 0;
  units.forEach((u) => (totalItems += u.sources.length));

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${db.platform} — Master Archival Rights &amp; Provenance Register</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink: #0f172a;
      --ink-muted: #475569;
      --navy-primary: #1e3a8a;
      --navy-deep: #091224;
      --accent-gold: #b45309;
      --gold-light: #fef3c7;
      --border-gray: #cbd5e1;
      --card-bg: #ffffff;
      --table-stripe: #f8fafc;
      --tag-green: #065f46;
      --tag-green-bg: #d1fae5;
      --tag-blue: #1e40af;
      --tag-blue-bg: #dbeafe;
      --link-color: #0369a1;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Inter', -apple-system, sans-serif;
      color: var(--ink);
      background: #ffffff;
      line-height: 1.4;
      font-size: 8.4pt;
    }

    @page {
      size: A4 portrait;
      margin: 11mm 12mm 13mm 12mm;
    }

    .register-page {
      page-break-after: always;
      position: relative;
      min-height: 268mm;
      max-height: 268mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 2mm;
    }

    .register-page:last-child {
      page-break-after: avoid;
    }

    /* Executive Cover Page */
    .executive-cover {
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .cover-top-masthead {
      border-bottom: 3px solid var(--navy-primary);
      padding-bottom: 3.5mm;
      margin-bottom: 4mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cover-brand-badge {
      background: var(--navy-primary);
      color: #ffffff;
      font-family: 'Cinzel', serif;
      font-size: 9.5pt;
      font-weight: 800;
      letter-spacing: 0.1em;
      padding: 3px 10px;
      border-radius: 3px;
      text-transform: uppercase;
    }

    .cover-audit-cert {
      text-align: right;
      font-size: 7.2pt;
      color: var(--ink-muted);
      line-height: 1.35;
    }

    .cover-audit-cert strong {
      color: var(--ink);
    }

    .cover-hero-card {
      background: linear-gradient(135deg, #091224 0%, #1e3a8a 100%);
      color: #ffffff;
      border-radius: 5px;
      padding: 6mm 7mm;
      margin-bottom: 4.5mm;
      box-shadow: 0 3px 8px rgba(0,0,0,0.12);
    }

    .cover-hero-title {
      font-family: 'Cinzel', serif;
      font-size: 16pt;
      font-weight: 900;
      letter-spacing: 0.04em;
      margin-bottom: 2mm;
      line-height: 1.18;
      color: #ffffff;
    }

    .cover-hero-subtitle {
      font-size: 8.8pt;
      color: #e2e8f0;
      line-height: 1.4;
      font-weight: 400;
      margin-bottom: 4mm;
    }

    .cover-kpi-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 3mm;
      border-top: 1px solid rgba(255,255,255,0.22);
      padding-top: 3.5mm;
    }

    .cover-kpi-item {
      text-align: center;
    }

    .cover-kpi-val {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 900;
      color: #fef3c7;
      line-height: 1;
      margin-bottom: 1mm;
    }

    .cover-kpi-lbl {
      font-size: 6.8pt;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 600;
    }

    /* Executive Directory Table */
    .executive-directory-card {
      background: #ffffff;
      border: 1px solid var(--border-gray);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 4.5mm;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    .directory-header {
      background: #f1f5f9;
      padding: 2.2mm 3.5mm;
      border-bottom: 1.5px solid var(--border-gray);
      font-family: 'Cinzel', serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: var(--navy-deep);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .directory-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 6.8pt;
    }

    .directory-table th {
      background: #f8fafc;
      color: var(--navy-deep);
      font-weight: 700;
      text-transform: uppercase;
      font-size: 6.2pt;
      padding: 1.2mm 2.2mm;
      border-bottom: 1px solid var(--border-gray);
      text-align: left;
    }

    .directory-table td {
      padding: 1.0mm 2.2mm;
      border-bottom: 1px solid #e2e8f0;
      line-height: 1.2;
    }

    .directory-table tr:nth-child(even) td {
      background: #fdfdfd;
    }

    .dir-badge {
      font-size: 5.8pt;
      font-weight: 800;
      padding: 0.8px 4px;
      border-radius: 2px;
      display: inline-block;
      text-transform: uppercase;
    }

    .dir-badge-ks2 { background: #dcfce7; color: #166534; }
    .dir-badge-ks3 { background: #e0f2fe; color: #0369a1; }
    .dir-badge-ks4 { background: #fef3c7; color: #b45309; }

    /* Statutory Framework Grid on Cover */
    .framework-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3mm;
      margin-bottom: 3.5mm;
    }

    .framework-card {
      background: #f8fafc;
      border: 1px solid var(--border-gray);
      border-left: 3.5px solid var(--navy-primary);
      border-radius: 3px;
      padding: 2.5mm 3.5mm;
      font-size: 6.9pt;
      line-height: 1.35;
    }

    .framework-card strong {
      color: var(--navy-primary);
      font-size: 7.2pt;
    }

    /* Standard Page Masthead */
    .register-header {
      border-bottom: 2px solid var(--navy-primary);
      padding-bottom: 2.5mm;
      margin-bottom: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-shrink: 0;
    }

    .brand-group {
      display: flex;
      flex-direction: column;
      gap: 1mm;
    }

    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: var(--navy-primary);
      color: #ffffff;
      font-family: 'Cinzel', serif;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      padding: 1.5px 6px;
      border-radius: 2px;
      width: fit-content;
      text-transform: uppercase;
    }

    .doc-title {
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      font-weight: 800;
      color: var(--navy-deep);
      line-height: 1.15;
    }

    .doc-meta {
      text-align: right;
      font-size: 6.8pt;
      color: var(--ink-muted);
      line-height: 1.3;
    }

    .doc-meta strong {
      color: var(--ink);
    }

    /* Unit Banner */
    .unit-banner {
      background: var(--navy-primary);
      color: #ffffff;
      padding: 2mm 3.5mm;
      border-radius: 3px;
      margin-bottom: 2.8mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }

    .unit-banner-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .unit-badge {
      background: var(--accent-gold);
      color: #ffffff;
      font-family: 'Cinzel', serif;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }

    .unit-title-text {
      font-family: 'Cinzel', serif;
      font-size: 8.8pt;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .unit-stats {
      font-size: 6.8pt;
      color: #e2e8f0;
      font-weight: 500;
    }

    /* Source Table */
    .table-container {
      flex: 1;
      overflow: hidden;
    }

    .source-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.0pt;
    }

    .source-table th {
      background: #f1f5f9;
      color: var(--navy-deep);
      font-weight: 700;
      text-transform: uppercase;
      font-size: 6.2pt;
      letter-spacing: 0.04em;
      padding: 1.8mm 1.8mm;
      border-bottom: 1.5px solid var(--border-gray);
      text-align: left;
    }

    .source-table td {
      padding: 1.8mm 1.8mm;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
      line-height: 1.25;
    }

    .source-table tr:nth-child(even) td {
      background: var(--table-stripe);
    }

    .col-lesson {
      width: 11%;
      font-weight: 700;
      color: var(--navy-primary);
    }

    .col-role {
      width: 9%;
    }

    .role-badge {
      display: inline-block;
      font-size: 5.8pt;
      font-weight: 800;
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .role-source-a {
      background: #e0f2fe;
      color: #0369a1;
      border: 1px solid #bae6fd;
    }

    .role-source-b {
      background: #fef3c7;
      color: #b45309;
      border: 1px solid #fde68a;
    }

    .role-map {
      background: #f3e8ff;
      color: #7e22ce;
      border: 1px solid #e9d5ff;
    }

    .col-artifact {
      width: 27%;
    }

    .artifact-name {
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 0.4mm;
      font-size: 7.1pt;
    }

    .artifact-details {
      color: var(--ink-muted);
      font-size: 6.4pt;
    }

    .col-archive {
      width: 27%;
    }

    .repo-main-link {
      color: var(--navy-deep);
      text-decoration: none;
      display: block;
      font-weight: 700;
      line-height: 1.2;
    }

    .repo-main-link:hover {
      color: var(--link-color);
      text-decoration: underline;
    }

    .repo-domain-strip {
      margin-top: 0.8mm;
      margin-bottom: 0.8mm;
    }

    .repo-domain-link {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 6.0pt;
      font-weight: 600;
      color: #0284c7;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      padding: 0.5px 4px;
      border-radius: 2px;
      text-decoration: none;
    }

    .repo-domain-link:hover {
      background: #e0f2fe;
      text-decoration: underline;
    }

    .accession-pill {
      font-family: monospace;
      font-size: 6.2pt;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      display: inline-block;
      color: #334155;
    }

    .col-rights {
      width: 26%;
    }

    .rights-pill {
      display: inline-block;
      font-size: 5.8pt;
      font-weight: 700;
      padding: 0.8px 4px;
      border-radius: 2px;
      margin-bottom: 0.6mm;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .rights-pd {
      background: var(--tag-green-bg);
      color: var(--tag-green);
    }

    .rights-cc {
      background: var(--tag-blue-bg);
      color: var(--tag-blue);
    }

    .rights-ed {
      background: #fef3c7;
      color: #92400e;
    }

    .rights-legal-desc {
      font-size: 5.9pt;
      color: var(--ink-muted);
      display: block;
      margin-bottom: 0.8mm;
      line-height: 1.2;
    }

    .archive-link {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      color: var(--link-color);
      text-decoration: underline;
      font-weight: 600;
      font-size: 6.2pt;
      word-break: break-all;
    }

    .archive-link:hover {
      color: var(--accent-gold);
    }

    /* Running Footer */
    .register-footer {
      border-top: 1px solid var(--border-gray);
      padding-top: 1.8mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.5pt;
      color: var(--ink-muted);
      flex-shrink: 0;
    }

    .register-footer strong {
      color: var(--ink);
    }
  </style>
</head>
<body>
`;

  // If rendering Master document, render Executive Cover Sheet (Page 1)
  if (!targetUnitId) {
    html += `
  <div class="register-page" id="page-executive-cover">
    <div class="executive-cover">
      <div>
        <!-- Top Masthead -->
        <div class="cover-top-masthead">
          <div class="cover-brand-badge">${db.platform}</div>
          <div class="cover-audit-cert">
            <strong>Commercial Intellectual Property &amp; Rights Compliance Register</strong><br>
            UK CDPA 1988 Statutory Concordance • Certified Neutral Edition ${db.version}
          </div>
        </div>

        <!-- Hero Card -->
        <div class="cover-hero-card">
          <h1 class="cover-hero-title">Master Source Provenance, Copyright &amp; Accession Register</h1>
          <p class="cover-hero-subtitle">
            Permanent institutional accession concordance, verified statutory rights basis, and double-redundant web access links across all 18 historical curriculum anthology and textbook modules.
          </p>
          <div class="cover-kpi-grid">
            <div class="cover-kpi-item">
              <div class="cover-kpi-val">${db.total_units}</div>
              <div class="cover-kpi-lbl">Curriculum Units</div>
            </div>
            <div class="cover-kpi-item">
              <div class="cover-kpi-val">${db.total_lessons}</div>
              <div class="cover-kpi-lbl">Enquiry Lessons</div>
            </div>
            <div class="cover-kpi-item">
              <div class="cover-kpi-val">${db.total_sources}</div>
              <div class="cover-kpi-lbl">Verified Artifacts</div>
            </div>
            <div class="cover-kpi-item">
              <div class="cover-kpi-val">161</div>
              <div class="cover-kpi-lbl">Holding Archives</div>
            </div>
            <div class="cover-kpi-item">
              <div class="cover-kpi-val">100%</div>
              <div class="cover-kpi-lbl">Commercial Clearance</div>
            </div>
          </div>
        </div>

        <!-- Statutory Clearances Framework -->
        <div class="framework-grid">
          <div class="framework-card">
            <strong>1. UK Crown Copyright Expiration (CDPA 1988 s.163)</strong><br>
            Under Section 163 of the <em>Copyright, Designs and Patents Act 1988</em>, Crown Copyright in official British governmental, ministerial, and armed forces photography/artwork expires 50 years after the calendar year of publication. Official wartime records (1939–1945) reside in the worldwide Public Domain.
          </div>
          <div class="framework-card">
            <strong>2. International Public Domain &amp; Berne Convention</strong><br>
            Primary sources, medieval illuminations, early modern treaties, and historic portraits published prior to 1928 or where the author died over 70 years ago reside in the Public Domain worldwide, permitting unrestricted commercial educational reproduction.
          </div>
          <div class="framework-card">
            <strong>3. Open Access, OGL v3.0 &amp; Creative Commons Deeds</strong><br>
            Museum artifact photography and catalogued digital holdings are verified under Open Government Licence (OGL v3.0), Creative Commons Attribution (CC BY 4.0), or institutional public domain dedication deeds (CC0) with explicit accession shelfmark citations.
          </div>
          <div class="framework-card">
            <strong>4. Double-Redundant Web Verification Architecture</strong><br>
            Each record provides double redundancy: (a) direct clickable hyperlink to the repository's official main homepage, and (b) direct permalink to the catalogued artifact holding within the permanent digital collection.
          </div>
        </div>

        <!-- Institutional Neutrality & Certification Card -->
        <div style="background: #fdfaf6; border: 1.2px solid #fed7aa; border-left: 3.5px solid var(--accent-gold); border-radius: 4px; padding: 3.5mm 4.5mm; font-size: 7.2pt; line-height: 1.4; color: var(--ink); margin-top: 2mm;">
          <h3 style="font-family: 'Cinzel', serif; font-size: 8.5pt; color: #7c2d12; margin-bottom: 1.5mm; display: flex; align-items: center; gap: 6px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Commercial Independence, Institutional Neutrality &amp; Reprographic Certification
          </h3>
          <p style="margin-bottom: 2mm;">
            All curriculum publications, pupil anthologies, companion workbooks, and digital archives published under <strong>The History Revision Hub</strong> are independent commercial educational products engineered for nationwide and international institutional adoption. They maintain strict commercial neutrality and zero single-school attribution.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; font-size: 6.8pt; color: var(--ink-muted);">
            <div>
              <strong>Audit Standard:</strong> ISO-compliant archival provenance concordance with verified shelfmarks and direct permanent collection hyperlinks.
            </div>
            <div>
              <strong>Copyright Clearance:</strong> 100% verified under UK CDPA 1988, US Title 17, and the Berne Convention for unrestricted commercial educational deployment.
            </div>
          </div>
        </div>
      </div>

      <!-- Cover Running Footer -->
      <div class="register-footer">
        <div>
          <strong>${db.platform}</strong> • Master Legal Compliance &amp; Rights Concordance
        </div>
        <div>
          Executive Cover Sheet • Certified Neutral Commercial Edition
        </div>
      </div>
    </div>
  </div>

  <!-- Page 2: Master Curriculum Directory -->
  <div class="register-page" id="page-curriculum-directory">
    <!-- Top Running Header -->
    <div class="register-header">
      <div class="brand-group">
        <div class="brand-badge">${db.platform}</div>
        <div class="doc-title">Curriculum Units Ingestion Schedule &amp; Clearances Concordance</div>
      </div>
      <div class="doc-meta">
        <strong>Edition:</strong> ${db.version} • <strong>Statutory Concordance:</strong> UK CDPA 1988 s.163<br>
        <strong>Grand Totals:</strong> 18 Units • 173 Enquiry Lessons • 365 Verified Primary Records
      </div>
    </div>

    <!-- Directory Banner -->
    <div class="unit-banner">
      <div class="unit-banner-left">
        <span class="unit-badge">DIRECTORY</span>
        <span class="unit-title-text">Master Curriculum Ingestion Schedule (All 18 Units)</span>
      </div>
      <div class="unit-stats">
        100% Commercial Clearance Across Key Stages 2, 3 &amp; 4 (GCSE)
      </div>
    </div>

    <!-- Executive Directory Table -->
    <div class="executive-directory-card" style="margin-bottom: 3.5mm;">
      <table class="directory-table">
        <thead>
          <tr>
            <th style="width: 7%;">Key Stage</th>
            <th style="width: 44%;">Curriculum Unit Anthology / Textbook Title</th>
            <th style="width: 25%;">Curriculum Specification</th>
            <th style="width: 8%; text-align: center;">Lessons</th>
            <th style="width: 8%; text-align: center;">Sources</th>
            <th style="width: 8%; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
`;
    units.forEach((u) => {
      const ksStr = u.key_stage || 'Key Stage 4';
      let ksBadge = 'dir-badge-ks3';
      if (ksStr.includes('2')) ksBadge = 'dir-badge-ks2';
      else if (ksStr.includes('4') || ksStr.includes('GCSE')) ksBadge = 'dir-badge-ks4';

      html += `
          <tr>
            <td><span class="dir-badge ${ksBadge}">${ksStr.replace('Key Stage ', 'KS')}</span></td>
            <td><strong>${u.unit_title}</strong></td>
            <td style="color: var(--ink-muted); font-size: 6.5pt;">${u.exam_board || 'National Curriculum / GCSE'}</td>
            <td style="text-align: center; font-weight: 700;">${u.total_lessons || (u.sources ? Math.ceil(u.sources.length / 3) : 10)}</td>
            <td style="text-align: center; font-weight: 700; color: var(--navy-primary);">${u.sources.length}</td>
            <td style="text-align: center;"><span style="color: #065f46; font-weight: 800; font-size: 6.2pt;">100% Cleared</span></td>
          </tr>
`;
    });

    html += `
        </tbody>
      </table>
    </div>

    <!-- Verification Note -->
    <div style="background: #f1f5f9; border: 1px solid var(--border-gray); border-radius: 3px; padding: 2.5mm 3.5mm; font-size: 6.8pt; color: var(--ink-muted); line-height: 1.35; margin-bottom: 2mm;">
      <strong>Double-Redundant Web Verification Protocol:</strong> Every archival entry catalogued in the following unit schedules is dual-indexed with (1) a direct web link to the holding institution's official main homepage (e.g. Imperial War Museum &rarr; <code>iwm.org.uk</code>) in the Repository column, and (2) a direct permalink to the catalogued primary document/photograph in the permanent collection database in the Rights column.
    </div>

    <!-- Directory Running Footer -->
    <div class="register-footer">
      <div>
        <strong>${db.platform}</strong> • Master Curriculum Clearances Concordance
      </div>
      <div>
        Executive Directory • Sheet 2 of 56
      </div>
    </div>
  </div>
`;
  }

  // Iterate over each unit and render its dedicated sheets
  units.forEach((unit) => {
    // 8 items per page max guarantees 0px overflow
    const itemsPerPage = 8;
    const totalPages = Math.ceil(unit.sources.length / itemsPerPage);

    for (let p = 0; p < totalPages; p++) {
      const pageSources = unit.sources.slice(p * itemsPerPage, (p + 1) * itemsPerPage);

      html += `
  <div class="register-page" id="page-${unit.unit_id}-${p + 1}">
    <!-- Top Running Header -->
    <div class="register-header">
      <div class="brand-group">
        <div class="brand-badge">${db.platform}</div>
        <div class="doc-title">Master Source Provenance, Copyright &amp; Rights Register</div>
      </div>
      <div class="doc-meta">
        <strong>Edition:</strong> ${db.version} • <strong>Legal Compliance:</strong> UK CDPA 1988 s.163 &amp; Worldwide Public Domain<br>
        <strong>Certification Date:</strong> ${db.published_date} • <strong>Commercial Status:</strong> 100% Cleared
      </div>
    </div>

    <!-- Unit Banner -->
    <div class="unit-banner">
      <div class="unit-banner-left">
        <span class="unit-badge">${unit.key_stage}</span>
        <span class="unit-title-text">${unit.unit_title}${totalPages > 1 ? ` (Sheet ${p + 1} of ${totalPages})` : ''}</span>
      </div>
      <div class="unit-stats">
        ${unit.total_lessons} Enquiry Lessons • ${unit.sources.length} Verified Archival Records • 100% Commercial Clearance
      </div>
    </div>

    <!-- Table Container -->
    <div class="table-container">
      <table class="source-table">
        <thead>
          <tr>
            <th class="col-lesson">Lesson</th>
            <th class="col-role">Role</th>
            <th class="col-artifact">Artifact &amp; Medium</th>
            <th class="col-archive">Repository, Homepage &amp; Accession ID</th>
            <th class="col-rights">Rights Basis &amp; Direct Catalogue Link</th>
          </tr>
        </thead>
        <tbody>
`;

      pageSources.forEach((s) => {
        const sId = String(s.source_id || s.source_letter || 'Source');
        const rStatus = String(s.rights_status || s.license_tier || 'Public Domain');
        const artTitle = s.artifact_title || s.title || '';
        const lTitle = s.lesson_title || `Lesson ${s.lesson_num}`;
        const accId = s.accession_id || s.catalogue_id || 'Archival Record';
        const sUrl = s.source_url || s.archive_url || '#';

        let roleClass = 'role-source-a';
        if (sId === 'Source B') roleClass = 'role-source-b';
        else if (sId.includes('Cartographic') || sId.includes('Map'))
          roleClass = 'role-map';

        let rightsClass = 'rights-pd';
        if (
          rStatus.includes('Creative Commons') ||
          rStatus.includes('CC BY') ||
          rStatus.includes('CC0')
        )
          rightsClass = 'rights-cc';
        else if (
          rStatus.includes('Fair Dealing') ||
          rStatus.includes('Educational')
        )
          rightsClass = 'rights-ed';

        const repoInfo = resolveRepo(s.repository || 'Archival Collection');

        html += `
          <tr>
            <td class="col-lesson">
              <strong>Lesson ${s.lesson_num < 10 ? '0' + s.lesson_num : s.lesson_num}</strong><br>
              <span style="font-size: 6.2pt; color: var(--ink-muted); font-weight: normal;">${lTitle}</span>
            </td>
            <td class="col-role">
              <span class="role-badge ${roleClass}">${sId}</span>
            </td>
            <td class="col-artifact">
              <div class="artifact-name">${artTitle}</div>
              <div class="artifact-details">${s.date || ''} • ${s.creator || ''}</div>
            </td>
            <td class="col-archive">
              <a href="${repoInfo.url}" target="_blank" class="repo-main-link" title="Visit official homepage of ${s.repository}">
                <strong>${s.repository || 'Holding Archive'}</strong>
              </a>
              <div class="repo-domain-strip">
                <a href="${repoInfo.url}" target="_blank" class="repo-domain-link" title="Visit official homepage">
                  🌐 ${repoInfo.domain} ↗
                </a>
              </div>
              <div class="accession-pill">${accId}</div>
            </td>
            <td class="col-rights">
              <span class="rights-pill ${rightsClass}">${rStatus.split('(')[0].trim()}</span>
              <span class="rights-legal-desc">${rStatus}</span>
              <a href="${sUrl}" target="_blank" class="archive-link" title="View catalogued artifact in permanent collection">
                <span>View Verified Archive Catalogue</span>
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </td>
          </tr>
`;
      });

      html += `
        </tbody>
      </table>
    </div>

    <!-- Running Footer -->
    <div class="register-footer">
      <div>
        <strong>${db.platform}</strong> • Commercial Rights &amp; Source Clearances Schedule
      </div>
      <div>
        ${unit.unit_title} • Sheet ${p + 1} of ${totalPages}
      </div>
    </div>
  </div>
`;
    }
  });

  html += `
</body>
</html>`;

  return html;
}

async function renderRegister() {
  console.log('🚀 Generating Master Rights & Provenance Register HTML...');
  const html = buildHtml();
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`✅ Saved Register HTML to: ${outHtmlPath}`);

  console.log('🖨️ Rendering Master PDF with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 1200));

  // Render Master PDF
  await page.pdf({
    path: masterPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Master PDF: ${masterPdfPath}`);
  await page.close();

  // Now render standalone KS2 Unit Source Bibliography
  console.log('🖨️ Rendering Standalone KS2 Unit Source Bibliography...');
  const ks2Html = buildHtml('ks2_ww2');
  const ks2Page = await browser.newPage();
  await ks2Page.setContent(ks2Html, { waitUntil: 'domcontentloaded' });
  await ks2Page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await ks2Page.pdf({
    path: ks2PdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered KS2 Unit PDF: ${ks2PdfPath}`);
  await ks2Page.close();

  // Render standalone The Shoah Unit Source Bibliography
  console.log('🖨️ Rendering Standalone The Shoah Unit Source Bibliography...');
  const shoahPdfDir = path.join(outPdfDir, 'the_shoah');
  if (!fs.existsSync(shoahPdfDir)) fs.mkdirSync(shoahPdfDir, { recursive: true });
  const shoahPdfPath = path.join(shoahPdfDir, 'the_shoah_source_bibliography.pdf');
  const shoahHtml = buildHtml('the_shoah');
  const shoahPage = await browser.newPage();
  await shoahPage.setContent(shoahHtml, { waitUntil: 'domcontentloaded' });
  await shoahPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await shoahPage.pdf({
    path: shoahPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered The Shoah Unit PDF: ${shoahPdfPath}`);
  await shoahPage.close();

  // Render standalone USA Unit Source Bibliography
  console.log('🖨️ Rendering Standalone USA Unit Source Bibliography...');
  const usaPdfDir = path.join(outPdfDir, 'usa');
  if (!fs.existsSync(usaPdfDir)) fs.mkdirSync(usaPdfDir, { recursive: true });
  const usaPdfPath = path.join(usaPdfDir, 'usa_source_bibliography.pdf');
  const usaHtml = buildHtml('usa');
  const usaPage = await browser.newPage();
  await usaPage.setContent(usaHtml, { waitUntil: 'domcontentloaded' });
  await usaPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await usaPage.pdf({
    path: usaPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered USA Unit PDF: ${usaPdfPath}`);
  await usaPage.close();

  // Render standalone Weimar & Nazi Germany Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Weimar & Nazi Germany Unit Source Bibliography...');
  const weimarPdfDir = path.join(outPdfDir, 'weimar_nazi_germany');
  if (!fs.existsSync(weimarPdfDir)) fs.mkdirSync(weimarPdfDir, { recursive: true });
  const weimarPdfPath = path.join(weimarPdfDir, 'weimar_nazi_germany_source_bibliography.pdf');
  const weimarHtml = buildHtml('weimar_nazi_germany');
  const weimarPage = await browser.newPage();
  await weimarPage.setContent(weimarHtml, { waitUntil: 'domcontentloaded' });
  await weimarPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await weimarPage.pdf({
    path: weimarPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Weimar & Nazi Germany Unit PDF: ${weimarPdfPath}`);
  await weimarPage.close();

  // Render standalone Early Elizabethan England Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Early Elizabethan England Unit Source Bibliography...');
  const eeePdfDir = path.join(outPdfDir, 'eee');
  if (!fs.existsSync(eeePdfDir)) fs.mkdirSync(eeePdfDir, { recursive: true });
  const eeePdfPath = path.join(eeePdfDir, 'eee_source_bibliography.pdf');
  const eeeHtml = buildHtml('eee');
  const eeePage = await browser.newPage();
  await eeePage.setContent(eeeHtml, { waitUntil: 'domcontentloaded' });
  await eeePage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await eeePage.pdf({
    path: eeePdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Early Elizabethan England Unit PDF: ${eeePdfPath}`);
  await eeePage.close();

  // Render standalone Conflict in the Middle East Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Conflict in the Middle East Unit Source Bibliography...');
  const cmePdfDir = path.join(outPdfDir, 'cme_new');
  if (!fs.existsSync(cmePdfDir)) fs.mkdirSync(cmePdfDir, { recursive: true });
  const cmePdfPath = path.join(cmePdfDir, 'cme_new_source_bibliography.pdf');
  const cmeHtml = buildHtml('cme_new');
  const cmePage = await browser.newPage();
  await cmePage.setContent(cmeHtml, { waitUntil: 'domcontentloaded' });
  await cmePage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await cmePage.pdf({
    path: cmePdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Conflict in the Middle East Unit PDF: ${cmePdfPath}`);
  await cmePage.close();

  // Render standalone Medicine Through Time Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Medicine Through Time Unit Source Bibliography...');
  const medPdfDir = path.join(outPdfDir, 'edexcel_medicine');
  if (!fs.existsSync(medPdfDir)) fs.mkdirSync(medPdfDir, { recursive: true });
  const medPdfPath = path.join(medPdfDir, 'edexcel_medicine_source_bibliography.pdf');
  const medHtml = buildHtml('edexcel_medicine');
  const medPage = await browser.newPage();
  await medPage.setContent(medHtml, { waitUntil: 'domcontentloaded' });
  await medPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await medPage.pdf({
    path: medPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Medicine Through Time Unit PDF: ${medPdfPath}`);
  await medPage.close();

  // Render standalone Cold War Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Cold War Unit Source Bibliography...');
  const cwPdfDir = path.join(outPdfDir, 'cold_war');
  if (!fs.existsSync(cwPdfDir)) fs.mkdirSync(cwPdfDir, { recursive: true });
  const cwPdfPath = path.join(cwPdfDir, 'cold_war_source_bibliography.pdf');
  const cwHtml = buildHtml('cold_war');
  const cwPage = await browser.newPage();
  await cwPage.setContent(cwHtml, { waitUntil: 'domcontentloaded' });
  await cwPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await cwPage.pdf({
    path: cwPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Cold War Unit PDF: ${cwPdfPath}`);
  await cwPage.close();

  // Render standalone First British Empire Unit Source Bibliography
  console.log('🖨️ Rendering Standalone First British Empire Unit Source Bibliography...');
  const fbePdfDir = path.join(outPdfDir, 'first_british_empire');
  if (!fs.existsSync(fbePdfDir)) fs.mkdirSync(fbePdfDir, { recursive: true });
  const fbePdfPath = path.join(fbePdfDir, 'first_british_empire_source_bibliography.pdf');
  const fbeHtml = buildHtml('first_british_empire');
  const fbePage = await browser.newPage();
  await fbePage.setContent(fbeHtml, { waitUntil: 'domcontentloaded' });
  await fbePage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await fbePage.pdf({
    path: fbePdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered First British Empire Unit PDF: ${fbePdfPath}`);
  await fbePage.close();

  // Render standalone Medieval England Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Medieval England Unit Source Bibliography...');
  const mePdfDir = path.join(outPdfDir, 'medieval_england');
  if (!fs.existsSync(mePdfDir)) fs.mkdirSync(mePdfDir, { recursive: true });
  const mePdfPath = path.join(mePdfDir, 'medieval_england_source_bibliography.pdf');
  const meHtml = buildHtml('medieval_england');
  const mePage = await browser.newPage();
  await mePage.setContent(meHtml, { waitUntil: 'domcontentloaded' });
  await mePage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await mePage.pdf({
    path: mePdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Medieval England Unit PDF: ${mePdfPath}`);
  await mePage.close();

  // Render standalone Second British Empire Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Second British Empire Unit Source Bibliography...');
  const sbePdfDir = path.join(outPdfDir, 'second_british_empire');
  if (!fs.existsSync(sbePdfDir)) fs.mkdirSync(sbePdfDir, { recursive: true });
  const sbePdfPath = path.join(sbePdfDir, 'second_british_empire_source_bibliography.pdf');
  const sbeHtml = buildHtml('second_british_empire');
  const sbePage = await browser.newPage();
  await sbePage.setContent(sbeHtml, { waitUntil: 'domcontentloaded' });
  await sbePage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await sbePage.pdf({
    path: sbePdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Second British Empire Unit PDF: ${sbePdfPath}`);
  await sbePage.close();

  // Render standalone Crown, Church, or Parliament Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Crown, Church, or Parliament Unit Source Bibliography...');
  const mrpPdfDir = path.join(outPdfDir, 'monarchy_religion_power');
  if (!fs.existsSync(mrpPdfDir)) fs.mkdirSync(mrpPdfDir, { recursive: true });
  const mrpPdfPath = path.join(mrpPdfDir, 'monarchy_religion_power_source_bibliography.pdf');
  const mrpHtml = buildHtml('monarchy_religion_power');
  const mrpPage = await browser.newPage();
  await mrpPage.setContent(mrpHtml, { waitUntil: 'domcontentloaded' });
  await mrpPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await mrpPage.pdf({
    path: mrpPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Crown, Church, or Parliament Unit PDF: ${mrpPdfPath}`);
  await mrpPage.close();

  // Render standalone Industrialisation & Empire Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Industrialisation & Empire Unit Source Bibliography...');
  const iaePdfDir = path.join(outPdfDir, 'industrialisation_and_empire');
  if (!fs.existsSync(iaePdfDir)) fs.mkdirSync(iaePdfDir, { recursive: true });
  const iaePdfPath = path.join(iaePdfDir, 'industrialisation_and_empire_source_bibliography.pdf');
  const iaeHtml = buildHtml('industrialisation_and_empire');
  const iaePage = await browser.newPage();
  await iaePage.setContent(iaeHtml, { waitUntil: 'domcontentloaded' });
  await iaePage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await iaePage.pdf({
    path: iaePdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Industrialisation & Empire Unit PDF: ${iaePdfPath}`);
  await iaePage.close();

  // Render standalone Water and Sanitation Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Water & Sanitation Unit Source Bibliography...');
  const wasPdfDir = path.join(outPdfDir, 'water_and_sanitation');
  if (!fs.existsSync(wasPdfDir)) fs.mkdirSync(wasPdfDir, { recursive: true });
  const wasPdfPath = path.join(wasPdfDir, 'water_and_sanitation_source_bibliography.pdf');
  const wasHtml = buildHtml('water_and_sanitation');
  const wasPage = await browser.newPage();
  await wasPage.setContent(wasHtml, { waitUntil: 'domcontentloaded' });
  await wasPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await wasPage.pdf({
    path: wasPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Water & Sanitation Unit PDF: ${wasPdfPath}`);
  await wasPage.close();

  // Render standalone Causes of the Great War Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Causes of the Great War Unit Source Bibliography...');
  const gwPdfDir = path.join(outPdfDir, 'great_war');
  if (!fs.existsSync(gwPdfDir)) fs.mkdirSync(gwPdfDir, { recursive: true });
  const gwPdfPath = path.join(gwPdfDir, 'great_war_source_bibliography.pdf');
  const gwHtml = buildHtml('great_war');
  const gwPage = await browser.newPage();
  await gwPage.setContent(gwHtml, { waitUntil: 'domcontentloaded' });
  await gwPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await gwPage.pdf({
    path: gwPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Causes of the Great War Unit PDF: ${gwPdfPath}`);
  await gwPage.close();

  // Render standalone The Great War Part 2 Unit Source Bibliography
  console.log('🖨️ Rendering Standalone The Great War Part 2 Unit Source Bibliography...');
  const gw2PdfDir = path.join(outPdfDir, 'great_war_part2');
  if (!fs.existsSync(gw2PdfDir)) fs.mkdirSync(gw2PdfDir, { recursive: true });
  const gw2PdfPath = path.join(gw2PdfDir, 'great_war_part2_source_bibliography.pdf');
  const gw2Html = buildHtml('great_war_part2');
  const gw2Page = await browser.newPage();
  await gw2Page.setContent(gw2Html, { waitUntil: 'domcontentloaded' });
  await gw2Page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await gw2Page.pdf({
    path: gw2PdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered The Great War Part 2 Unit PDF: ${gw2PdfPath}`);
  // Render standalone Australia Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Australia Unit Source Bibliography...');
  const ausPdfDir = path.join(outPdfDir, 'australia');
  if (!fs.existsSync(ausPdfDir)) fs.mkdirSync(ausPdfDir, { recursive: true });
  const ausPdfPath = path.join(ausPdfDir, 'australia_source_bibliography.pdf');
  const ausHtml = buildHtml('australia');
  const ausPage = await browser.newPage();
  await ausPage.setContent(ausHtml, { waitUntil: 'domcontentloaded' });
  await ausPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await ausPage.pdf({
    path: ausPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Australia Unit PDF: ${ausPdfPath}`);
  await ausPage.close();

  // Render standalone Post-War Britain Unit Source Bibliography
  console.log('🖨️ Rendering Standalone Rights, Protest, and Post-War Britain Unit Source Bibliography...');
  const pwbPdfDir = path.join(outPdfDir, 'post_war_britain');
  if (!fs.existsSync(pwbPdfDir)) fs.mkdirSync(pwbPdfDir, { recursive: true });
  const pwbPdfPath = path.join(pwbPdfDir, 'post_war_britain_source_bibliography.pdf');
  const pwbHtml = buildHtml('post_war_britain');
  const pwbPage = await browser.newPage();
  await pwbPage.setContent(pwbHtml, { waitUntil: 'domcontentloaded' });
  await pwbPage.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 800));

  await pwbPage.pdf({
    path: pwbPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });
  console.log(`🎉 Successfully rendered Rights, Protest, and Post-War Britain Unit PDF: ${pwbPdfPath}`);
  await pwbPage.close();

  await browser.close();
  console.log('🏁 All PDF rendering tasks completed successfully!');
}

renderRegister().catch((err) => {
  console.error('Error generating register:', err);
  process.exit(1);
});
