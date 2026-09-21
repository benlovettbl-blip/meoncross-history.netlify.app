/**
 * History Revision Hub — High-DPI Vector Cartography Generator
 *
 * Generates publication-grade, scalable vector SVG maps for:
 * 1. public/images/map_golan_heights_1967_vector.svg
 *    - Syrian Armistice Line, Golan Heights Plateau, 1949 DMZs, Artillery Fortifications & Kibbutzim
 * 2. public/images/map_1967_conquered_territories_vector.svg
 *    - Middle East Regional Transformation, Pre-1967 Green Line vs Conquered Territories (Sinai, Gaza, West Bank, Golan)
 *
 * Features:
 * - 100% Vector paths for razor-sharp rendering at 300+ DPI commercial printing
 * - Curated institutional monochrome/duotone palette (Navy, Slate, Amber, Olive, Ochre)
 * - Authentic cartographic fonts (Newsreader / Playfair / Inter)
 * - Crisp borders, contour lines, scale bars, north arrows, and archival shelfmark seals
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'public', 'images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

/**
 * 1. Map: The Syrian Armistice Line & Golan Heights (1964–1967)
 * Dimensions: 800 x 950 px (Aspect ratio ~ 0.84, matches column width and budget)
 */
function generateGolanHeightsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 950" width="100%" height="100%" style="background:#fcfbf9; font-family:'Inter',sans-serif;">
  <defs>
    <!-- Patterns -->
    <pattern id="dmzHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#d97706" stroke-width="1.8" stroke-opacity="0.6"/>
    </pattern>
    <pattern id="plateauContour" width="16" height="16" patternTransform="rotate(20 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="16" y2="0" stroke="#cbd5e1" stroke-width="0.8" stroke-opacity="0.4"/>
    </pattern>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Map Background Border -->
  <rect x="8" y="8" width="784" height="934" fill="#fdfdfc" stroke="#0f172a" stroke-width="2.5" rx="3"/>
  <rect x="14" y="14" width="772" height="922" fill="none" stroke="#94a3b8" stroke-width="0.8"/>

  <!-- Topographic Base Regions -->
  <!-- Israel Lowland (Galilee & Hula Valley) -->
  <path d="M 16 16 L 380 16 L 400 120 L 360 260 L 350 440 L 320 540 L 300 750 L 340 850 L 320 934 L 16 934 Z" fill="#f1f5f9"/>
  
  <!-- Golan Heights Plateau (Elevated Escarpment: 400m - 1100m) -->
  <path d="M 380 16 L 784 16 L 784 934 L 320 934 L 340 850 L 300 750 L 320 540 L 350 440 L 360 260 L 400 120 Z" fill="#fef3c7" fill-opacity="0.65"/>
  <path d="M 380 16 L 784 16 L 784 934 L 320 934 L 340 850 L 300 750 L 320 540 L 350 440 L 360 260 L 400 120 Z" fill="url(#plateauContour)"/>

  <!-- Mountain Shading / Escarpment Ridge line (Hachures) -->
  <path d="M 400 120 Q 370 200 360 260 Q 350 350 350 440 Q 320 500 320 540 Q 300 650 300 750 Q 320 800 340 850" fill="none" stroke="#92400e" stroke-width="3" stroke-dasharray="2,3"/>

  <!-- Water Bodies -->
  <!-- Sea of Galilee / Lake Tiberias (-210m below sea level) -->
  <path d="M 305 535 C 330 550, 360 600, 355 660 C 350 710, 320 745, 290 750 C 265 745, 245 700, 250 630 C 255 570, 280 535, 305 535 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5" filter="url(#shadow)"/>
  
  <!-- River Jordan (North to South) -->
  <path d="M 360 16 Q 370 100 350 180 Q 330 260 320 340 Q 315 420 310 490 L 305 535 M 290 750 Q 285 820 280 934" fill="none" stroke="#0284c7" stroke-width="2.2"/>
  
  <!-- Hasbani, Dan, Banias Springs (Headwaters) -->
  <path d="M 310 16 Q 320 60 335 110 L 350 180" fill="none" stroke="#38bdf8" stroke-width="1.4"/>
  <path d="M 410 40 Q 390 100 350 180" fill="none" stroke="#38bdf8" stroke-width="1.4"/>
  
  <!-- Yarmouk River (Border between Syria and Jordan) -->
  <path d="M 784 830 Q 600 820 480 840 Q 380 850 340 850 Q 310 850 285 860" fill="none" stroke="#0284c7" stroke-width="2"/>

  <!-- 1949 Demilitarised Zones (DMZ North, Central, South) -->
  <!-- North DMZ (Hula Basin) -->
  <polygon points="340,190 375,200 370,250 335,240" fill="url(#dmzHatch)" stroke="#d97706" stroke-width="1.2"/>
  <!-- Central DMZ (Bnot Yaakov Bridge) -->
  <polygon points="310,430 355,435 345,475 305,470" fill="url(#dmzHatch)" stroke="#d97706" stroke-width="1.2"/>
  <!-- South DMZ (Southeastern shore of Lake Tiberias / Al-Hamma) -->
  <polygon points="325,720 370,720 395,780 340,795 300,750" fill="url(#dmzHatch)" stroke="#d97706" stroke-width="1.2"/>

  <!-- Syrian Diversion Canal Route (Water Wars Scheme 1964) -->
  <path d="M 440 60 Q 480 180 470 300 Q 460 450 490 600 Q 520 720 540 820" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,4"/>

  <!-- International & Armistice Borders -->
  <!-- 1949 Armistice Line (Green Line) -->
  <path d="M 380 16 L 395 120 L 360 260 L 350 440 L 320 540 L 305 545 L 355 660 L 340 750 L 350 820 L 320 934" fill="none" stroke="#15803d" stroke-width="2.5" stroke-dasharray="8,4"/>

  <!-- 1967 Ceasefire Line (Purple Line - East of Golan) -->
  <path d="M 520 16 Q 580 200 610 380 Q 640 560 630 750 L 610 934" fill="none" stroke="#7e22ce" stroke-width="2.2" stroke-dasharray="6,3"/>

  <!-- Syrian Military Fortifications & Artillery Batteries (Red Bunkers) -->
  <g fill="#b91c1c" stroke="#000" stroke-width="0.8">
    <!-- Tel Azaziat -->
    <circle cx="390" cy="140" r="5"/><polygon points="385,133 395,133 390,125"/>
    <!-- Tel Hamra -->
    <circle cx="430" cy="170" r="5"/>
    <!-- Central Escarpment (Customs House) -->
    <circle cx="370" cy="460" r="5"/><polygon points="365,453 375,453 370,445"/>
    <!-- Tawafiq / Mutsav Soreg (Overlooking Tel Katzir) -->
    <circle cx="350" cy="770" r="5"/><polygon points="345,763 355,763 350,755"/>
    <!-- Quneitra Command HQ -->
    <rect x="560" y="320" width="16" height="12" fill="#991b1b"/>
  </g>

  <!-- Syrian Artillery Firing Arcs (pointing down into Hula Valley kibbutzim) -->
  <path d="M 385 140 Q 320 160 260 170" fill="none" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
  <path d="M 365 460 Q 290 480 230 490" fill="none" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3,3"/>
  <path d="M 345 770 Q 280 770 230 770" fill="none" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3,3"/>

  <!-- Israeli Kibbutzim & Lowland Settlements (Blue Squares) -->
  <g fill="#1e3a8a" stroke="#ffffff" stroke-width="1">
    <!-- Dan & Dafna -->
    <rect x="300" y="115" width="8" height="8"/>
    <!-- Kfar Szold -->
    <rect x="315" y="195" width="8" height="8"/>
    <!-- Shamir -->
    <rect x="310" y="240" width="8" height="8"/>
    <!-- Gadot -->
    <rect x="260" y="450" width="8" height="8"/>
    <!-- Ein Gev (isolated eastern shore) -->
    <rect x="348" y="650" width="8" height="8"/>
    <!-- Tel Katzir / HaOn -->
    <rect x="285" y="765" width="8" height="8"/>
    <!-- Tiberias Town -->
    <circle cx="245" cy="625" r="5" fill="#0f172a"/>
  </g>

  <!-- Geographic & Cartographic Labels -->
  <!-- Countries / Sovereign Territories -->
  <text x="120" y="80" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#334155" letter-spacing="4">ISRAEL</text>
  <text x="90" y="105" font-size="9" font-weight="700" fill="#64748b" letter-spacing="1">(UPPER GALILEE &amp; HULA VALLEY)</text>
  
  <text x="630" y="180" font-family="'Playfair Display', serif" font-size="22" font-weight="900" fill="#78350f" letter-spacing="4">SYRIA</text>
  <text x="440" y="380" font-family="'Playfair Display', serif" font-size="18" font-weight="900" fill="#92400e" letter-spacing="2">GOLAN HEIGHTS</text>
  <text x="455" y="400" font-size="8.5" font-weight="700" fill="#b45309">(ELEVATED VOLCANIC PLATEAU)</text>

  <text x="210" y="45" font-size="11" font-weight="800" fill="#475569" letter-spacing="1.5">LEBANON</text>
  <text x="540" y="900" font-family="'Playfair Display', serif" font-size="16" font-weight="800" fill="#475569" letter-spacing="2">JORDAN</text>

  <!-- Strategic Water Labels -->
  <text x="260" y="655" font-size="10" font-weight="800" fill="#0369a1" font-style="italic">Sea of Galilee</text>
  <text x="265" y="670" font-size="7.5" font-weight="700" fill="#0284c7">(-210m Elevation)</text>
  <text x="255" y="370" font-size="9" font-weight="700" fill="#0284c7" transform="rotate(-75 255 370)">River Jordan</text>
  <text x="560" y="865" font-size="8.5" font-weight="700" fill="#0369a1">Yarmouk River</text>

  <!-- Settlement Labels -->
  <text x="235" y="122" font-size="8.5" font-weight="700" fill="#0f172a">Kibbutz Dan</text>
  <text x="245" y="202" font-size="8.5" font-weight="700" fill="#0f172a">Kfar Szold</text>
  <text x="205" y="456" font-size="8.5" font-weight="700" fill="#0f172a">Kibbutz Gadot</text>
  <text x="362" y="657" font-size="8" font-weight="800" fill="#1e3a8a">Ein Gev</text>
  <text x="215" y="772" font-size="8.5" font-weight="700" fill="#0f172a">Tel Katzir</text>
  <text x="195" y="630" font-size="9.5" font-weight="800" fill="#0f172a">Tiberias</text>

  <!-- Syrian Fortification Labels -->
  <text x="402" y="144" font-size="8" font-weight="800" fill="#991b1b">Tel Azaziat (Artillery)</text>
  <text x="382" y="465" font-size="8" font-weight="800" fill="#991b1b">Customs House Post</text>
  <text x="362" y="775" font-size="8" font-weight="800" fill="#991b1b">Tawafiq Bunkers</text>
  <text x="582" y="330" font-size="9" font-weight="800" fill="#7f1d1d">Quneitra (HQ)</text>

  <!-- Top Elevation Note -->
  <text x="600" y="55" font-size="9" font-weight="800" fill="#475569">Mount Hermon (2,814m)</text>

  <!-- Title Cartouche Box (Top Left) -->
  <g transform="translate(26, 24)" filter="url(#shadow)">
    <rect width="320" height="74" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" rx="3"/>
    <text x="12" y="20" font-family="'Playfair Display', serif" font-size="11.5" font-weight="900" fill="#0f172a">THE GOLAN HEIGHTS FRONT</text>
    <text x="12" y="36" font-size="7.8" font-weight="800" fill="#1e3a8a" letter-spacing="0.5">SYRIAN ARMISTICE LINE &amp; DMZs (1964–1967)</text>
    <text x="12" y="52" font-size="6.8" font-style="italic" fill="#475569">Syrian cliff artillery overlooking lowland Israeli kibbutzim</text>
    <text x="12" y="65" font-family="monospace" font-size="6.2" font-weight="700" fill="#64748b">SHELFMARK: MAP-GOLAN-1967-DPI300</text>
  </g>

  <!-- Cartographic Legend Box (Bottom Left) -->
  <g transform="translate(26, 800)" filter="url(#shadow)">
    <rect width="250" height="122" fill="#ffffff" stroke="#0f172a" stroke-width="1.2" rx="3"/>
    <text x="10" y="16" font-size="8" font-weight="900" fill="#0f172a" text-transform="uppercase" letter-spacing="0.6">Cartographic Legend</text>
    
    <!-- 1949 Armistice Green Line -->
    <line x1="12" y1="30" x2="36" y2="30" stroke="#15803d" stroke-width="2.5" stroke-dasharray="6,3"/>
    <text x="44" y="33" font-size="7.2" font-weight="700" fill="#1e293b">1949 Armistice Green Line</text>

    <!-- 1949 Demilitarised Zone -->
    <rect x="12" y="42" width="24" height="10" fill="url(#dmzHatch)" stroke="#d97706" stroke-width="1"/>
    <text x="44" y="50" font-size="7.2" font-weight="700" fill="#1e293b">1949 Demilitarised Zone (DMZ)</text>

    <!-- Syrian Diversion Canal -->
    <line x1="12" y1="62" x2="36" y2="62" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2"/>
    <text x="44" y="65" font-size="7.2" font-weight="700" fill="#1e293b">Syrian Water Diversion Canal (1964)</text>

    <!-- Syrian Artillery Post -->
    <circle cx="24" cy="79" r="4" fill="#b91c1c" stroke="#000" stroke-width="0.8"/>
    <text x="44" y="82" font-size="7.2" font-weight="700" fill="#1e293b">Syrian Fortified Artillery Bunker</text>

    <!-- Israeli Kibbutz -->
    <rect x="20" y="93" width="8" height="8" fill="#1e3a8a" stroke="#fff" stroke-width="0.8"/>
    <text x="44" y="100" font-size="7.2" font-weight="700" fill="#1e293b">Israeli Kibbutz (Civilian Settlement)</text>

    <!-- 1967 Ceasefire Line (Purple Line) -->
    <line x1="12" y1="112" x2="36" y2="112" stroke="#7e22ce" stroke-width="2" stroke-dasharray="5,2"/>
    <text x="44" y="115" font-size="7.2" font-weight="700" fill="#1e293b">1967 Ceasefire Line (Purple Line)</text>
  </g>

  <!-- Scale & North Arrow (Bottom Right) -->
  <g transform="translate(670, 850)">
    <polygon points="50,0 44,24 50,20 56,24" fill="#0f172a"/>
    <polygon points="50,40 44,16 50,20 56,16" fill="#94a3b8"/>
    <text x="47" y="-4" font-size="10" font-weight="900" fill="#0f172a">N</text>
    <!-- Scale Bar: 10 km -->
    <rect x="0" y="52" width="50" height="4" fill="#0f172a"/>
    <rect x="50" y="52" width="50" height="4" fill="#94a3b8"/>
    <text x="0" y="68" font-size="7" font-weight="700" fill="#0f172a">0</text>
    <text x="46" y="68" font-size="7" font-weight="700" fill="#0f172a">5</text>
    <text x="88" y="68" font-size="7" font-weight="700" fill="#0f172a">10 km</text>
  </g>

</svg>`;
}

/**
 * 2. Map: The 1967 Conquered Occupied Territories Following the Six-Day War
 * Dimensions: 800 x 1000 px
 */
function generateConqueredTerritoriesSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%" style="background:#fcfbf9; font-family:'Inter',sans-serif;">
  <defs>
    <!-- Patterns -->
    <pattern id="occupiedHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="10" stroke="#b45309" stroke-width="1.8" stroke-opacity="0.3"/>
    </pattern>
    <filter id="shadowTerr" x="-4%" y="-4%" width="108%" height="108%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Border Frame -->
  <rect x="8" y="8" width="784" height="984" fill="#fdfdfc" stroke="#0f172a" stroke-width="2.5" rx="3"/>
  <rect x="14" y="14" width="772" height="972" fill="none" stroke="#94a3b8" stroke-width="0.8"/>

  <!-- Base Landmasses -->
  <!-- Egypt Mainland (West of Suez) -->
  <path d="M 16 16 L 260 16 L 260 380 L 220 540 L 160 720 L 16 750 Z" fill="#f1f5f9"/>

  <!-- Arab Sovereign States (Jordan, Syria, Lebanon, Saudi Arabia) -->
  <!-- Syria & Lebanon (North / Northeast) -->
  <path d="M 520 16 L 784 16 L 784 340 L 620 280 L 580 180 Z" fill="#f8fafc"/>
  <!-- Jordan (East of Jordan River / Dead Sea) -->
  <path d="M 580 340 L 784 340 L 784 984 L 540 984 L 520 780 L 530 640 L 570 420 Z" fill="#f8fafc"/>

  <!-- Water Bodies -->
  <!-- Mediterranean Sea -->
  <path d="M 16 16 L 520 16 Q 440 180 340 280 L 240 330 L 16 330 Z" fill="#e0f2fe"/>
  <!-- Red Sea / Gulf of Suez & Gulf of Aqaba -->
  <!-- Gulf of Suez -->
  <path d="M 260 380 Q 240 480 200 620 L 230 760 L 320 880 L 350 850 L 260 620 Q 280 480 270 380 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
  <!-- Gulf of Aqaba -->
  <path d="M 470 650 L 500 850 L 530 830 L 490 640 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.2"/>
  <!-- Straits of Tiran Entrance -->
  <path d="M 430 920 L 500 850 L 540 890 L 480 984 L 400 984 Z" fill="#bae6fd"/>
  <!-- Dead Sea (-430m) -->
  <path d="M 545 460 Q 560 510 550 560 Q 535 550 540 490 Z" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.2"/>
  <!-- Sea of Galilee -->
  <ellipse cx="535" cy="220" rx="14" ry="20" fill="#7dd3fc" stroke="#0284c7" stroke-width="1.2"/>

  <!-- Suez Canal (North to South Waterway) -->
  <path d="M 235 330 L 255 400 L 250 490 L 230 570 L 215 620" fill="none" stroke="#0284c7" stroke-width="3.5"/>

  <!-- PRE-JUNE 1967 ISRAEL (Green Line Boundaries) -->
  <path d="M 505 140 L 535 200 L 520 320 L 470 340 L 380 360 L 355 400 L 410 460 L 480 470 L 520 620 L 480 650 L 470 650 L 410 490 L 350 370 L 400 300 L 480 220 L 490 140 Z" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>

  <!-- OCCUPIED CONQUERED TERRITORIES (Captured June 1967) -->
  <!-- 1. Sinai Peninsula (60,000 km² captured from Egypt) -->
  <path d="M 260 380 L 360 360 L 410 460 L 480 650 L 430 920 L 320 880 L 230 760 L 200 620 L 260 380 Z" fill="#fef3c7" stroke="#b45309" stroke-width="2.5" filter="url(#shadowTerr)"/>
  <path d="M 260 380 L 360 360 L 410 460 L 480 650 L 430 920 L 320 880 L 230 760 L 200 620 L 260 380 Z" fill="url(#occupiedHatch)"/>

  <!-- 2. Gaza Strip (Captured from Egypt) -->
  <path d="M 360 360 L 410 395 L 395 410 L 350 375 Z" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
  <path d="M 360 360 L 410 395 L 395 410 L 350 375 Z" fill="url(#occupiedHatch)"/>

  <!-- 3. West Bank & East Jerusalem (5,640 km² captured from Jordan) -->
  <path d="M 480 300 L 545 320 L 560 410 L 545 460 L 550 560 L 500 560 L 470 480 L 470 380 Z" fill="#fef3c7" stroke="#b45309" stroke-width="2.5" filter="url(#shadowTerr)"/>
  <path d="M 480 300 L 545 320 L 560 410 L 545 460 L 550 560 L 500 560 L 470 480 L 470 380 Z" fill="url(#occupiedHatch)"/>

  <!-- 4. Golan Heights (1,200 km² captured from Syria) -->
  <path d="M 525 150 L 580 160 L 590 260 L 545 270 L 535 220 Z" fill="#fef3c7" stroke="#b45309" stroke-width="2.5" filter="url(#shadowTerr)"/>
  <path d="M 525 150 L 580 160 L 590 260 L 545 270 L 535 220 Z" fill="url(#occupiedHatch)"/>

  <!-- Ceasefire Lines & Strategic Markers -->
  <!-- 10 June 1967 Ceasefire Line (Suez Canal Front) -->
  <path d="M 235 330 L 255 400 L 250 490 L 230 570 L 215 620" stroke="#b91c1c" stroke-width="2" stroke-dasharray="6,3"/>

  <!-- Major Cities & Capitals -->
  <!-- Jerusalem -->
  <circle cx="495" cy="420" r="5" fill="#0f172a" stroke="#fff" stroke-width="1.2"/>
  <text x="430" y="415" font-size="9.5" font-weight="900" fill="#0f172a">Jerusalem</text>
  <!-- Tel Aviv -->
  <circle cx="450" cy="380" r="4.5" fill="#0f172a" stroke="#fff" stroke-width="1.2"/>
  <text x="390" y="385" font-size="8.5" font-weight="800" fill="#0f172a">Tel Aviv</text>
  <!-- Cairo -->
  <circle cx="110" cy="460" r="5" fill="#0f172a" stroke="#fff" stroke-width="1.2"/>
  <text x="80" y="450" font-size="10" font-weight="900" fill="#0f172a">Cairo</text>
  <!-- Damascus -->
  <circle cx="630" cy="120" r="5" fill="#0f172a" stroke="#fff" stroke-width="1.2"/>
  <text x="640" y="125" font-size="10" font-weight="900" fill="#0f172a">Damascus</text>
  <!-- Amman -->
  <circle cx="600" cy="430" r="5" fill="#0f172a" stroke="#fff" stroke-width="1.2"/>
  <text x="610" y="435" font-size="10" font-weight="900" fill="#0f172a">Amman</text>
  <!-- Port of Eilat -->
  <circle cx="475" cy="650" r="4" fill="#1d4ed8"/>
  <text x="485" y="655" font-size="8" font-weight="800" fill="#1d4ed8">Eilat</text>
  <!-- Sharm el-Sheikh -->
  <circle cx="430" cy="920" r="4.5" fill="#b91c1c"/>
  <text x="330" y="925" font-size="8.5" font-weight="800" fill="#b91c1c">Sharm el-Sheikh</text>

  <!-- Large Territorial & Country Name Labels -->
  <text x="60" y="560" font-family="'Playfair Display', serif" font-size="24" font-weight="900" fill="#475569" letter-spacing="4">EGYPT</text>
  <text x="630" y="560" font-family="'Playfair Display', serif" font-size="24" font-weight="900" fill="#475569" letter-spacing="4">JORDAN</text>
  <text x="640" y="220" font-family="'Playfair Display', serif" font-size="20" font-weight="900" fill="#475569" letter-spacing="3">SYRIA</text>
  <text x="460" y="100" font-size="11" font-weight="800" fill="#475569" letter-spacing="1.5">LEBANON</text>

  <!-- Conquered Territories Callout Labels -->
  <!-- Sinai -->
  <g transform="translate(260, 580)">
    <text x="0" y="0" font-family="'Playfair Display', serif" font-size="17" font-weight="900" fill="#78350f" letter-spacing="2">SINAI PENINSULA</text>
    <text x="12" y="18" font-size="8" font-weight="800" fill="#92400e">OCCUPIED FROM EGYPT (60,000 km²)</text>
    <text x="18" y="32" font-size="7.2" font-style="italic" fill="#b45309">Buffer zone along east bank of Suez Canal</text>
  </g>

  <!-- West Bank -->
  <g transform="translate(485, 345)">
    <text x="0" y="0" font-family="'Playfair Display', serif" font-size="12" font-weight="900" fill="#78350f">WEST BANK</text>
    <text x="0" y="14" font-size="7.5" font-weight="800" fill="#92400e">(From Jordan • 5,640 km²)</text>
    <text x="0" y="26" font-size="7" font-weight="700" fill="#b45309">Includes East Jerusalem</text>
  </g>

  <!-- Golan Heights -->
  <g transform="translate(565, 200)">
    <text x="0" y="0" font-family="'Playfair Display', serif" font-size="10.5" font-weight="900" fill="#78350f">GOLAN</text>
    <text x="0" y="12" font-size="7" font-weight="800" fill="#92400e">(From Syria • 1,200 km²)</text>
  </g>

  <!-- Gaza Strip -->
  <g transform="translate(290, 420)">
    <text x="0" y="0" font-size="8.5" font-weight="900" fill="#78350f">GAZA STRIP</text>
    <text x="0" y="10" font-size="6.8" font-weight="700" fill="#92400e">(From Egypt)</text>
  </g>

  <!-- Waterway Labels -->
  <text x="70" y="240" font-family="'Newsreader', Georgia, serif" font-size="14" font-style="italic" fill="#0284c7" letter-spacing="1">Mediterranean Sea</text>
  <text x="155" y="670" font-size="8.5" font-weight="700" fill="#0284c7" transform="rotate(-65 155 670)">Gulf of Suez</text>
  <text x="495" y="730" font-size="8.5" font-weight="700" fill="#0284c7" transform="rotate(75 495 730)">Gulf of Aqaba</text>
  <text x="445" y="960" font-size="8.5" font-weight="800" fill="#0369a1">Straits of Tiran</text>
  <text x="175" y="440" font-size="8.5" font-weight="800" fill="#0369a1" transform="rotate(-80 175 440)">Suez Canal</text>

  <!-- Title Cartouche Box (Top Left) -->
  <g transform="translate(24, 24)" filter="url(#shadowTerr)">
    <rect width="340" height="74" fill="#ffffff" stroke="#0f172a" stroke-width="1.5" rx="3"/>
    <text x="12" y="20" font-family="'Playfair Display', serif" font-size="12" font-weight="900" fill="#0f172a">TERRITORIAL TRANSFORMATION</text>
    <text x="12" y="36" font-size="8" font-weight="800" fill="#1e3a8a" letter-spacing="0.5">THE SIX-DAY WAR &amp; OCCUPIED LANDS (JUNE 1967)</text>
    <text x="12" y="52" font-size="7" font-style="italic" fill="#475569">Territory captured by Israel: Sinai, Gaza, West Bank, Golan Heights</text>
    <text x="12" y="65" font-family="monospace" font-size="6.2" font-weight="700" fill="#64748b">UN RESOLUTION 242 BASELINE • SHELFMARK: MAP-1967-TERR-DPI300</text>
  </g>

  <!-- Cartographic Legend Box (Bottom Left) -->
  <g transform="translate(24, 820)" filter="url(#shadowTerr)">
    <rect width="250" height="135" fill="#ffffff" stroke="#0f172a" stroke-width="1.2" rx="3"/>
    <text x="10" y="16" font-size="8" font-weight="900" fill="#0f172a" text-transform="uppercase" letter-spacing="0.6">Cartographic Legend</text>
    
    <!-- Israel Pre-1967 -->
    <rect x="12" y="26" width="22" height="12" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.2"/>
    <text x="42" y="35" font-size="7.2" font-weight="700" fill="#1e293b">Israel (Pre-5 June 1967 Territory)</text>

    <!-- Conquered Occupied Territories -->
    <rect x="12" y="44" width="22" height="12" fill="#fef3c7" stroke="#b45309" stroke-width="1.2"/>
    <line x1="12" y1="56" x2="34" y2="44" stroke="#b45309" stroke-width="1.2"/>
    <text x="42" y="53" font-size="7.2" font-weight="700" fill="#1e293b">Territory Occupied by Israel (June 1967)</text>

    <!-- 1949 Armistice Line (Green Line) -->
    <line x1="12" y1="68" x2="34" y2="68" stroke="#1d4ed8" stroke-width="2"/>
    <text x="42" y="71" font-size="7.2" font-weight="700" fill="#1e293b">1949 Armistice Line (Green Line)</text>

    <!-- 10 June 1967 Ceasefire Line -->
    <line x1="12" y1="83" x2="34" y2="83" stroke="#b91c1c" stroke-width="2" stroke-dasharray="5,2"/>
    <text x="42" y="86" font-size="7.2" font-weight="700" fill="#1e293b">10 June 1967 Ceasefire Lines</text>

    <!-- International Waterway -->
    <line x1="12" y1="98" x2="34" y2="98" stroke="#0284c7" stroke-width="3"/>
    <text x="42" y="101" font-size="7.2" font-weight="700" fill="#1e293b">Strategic Canal / Chokepoint Passage</text>

    <!-- Capital City -->
    <circle cx="23" cy="116" r="4" fill="#0f172a" stroke="#fff" stroke-width="1"/>
    <text x="42" y="119" font-size="7.2" font-weight="700" fill="#1e293b">National Capital / Strategic Hub</text>
  </g>

  <!-- Scale & North Arrow (Bottom Right) -->
  <g transform="translate(680, 890)">
    <polygon points="40,0 35,20 40,16 45,20" fill="#0f172a"/>
    <polygon points="40,32 35,14 40,16 45,14" fill="#94a3b8"/>
    <text x="37" y="-4" font-size="9" font-weight="900" fill="#0f172a">N</text>
    <!-- Scale Bar: 100 km -->
    <rect x="0" y="42" width="40" height="4" fill="#0f172a"/>
    <rect x="40" y="42" width="40" height="4" fill="#94a3b8"/>
    <text x="0" y="56" font-size="6.8" font-weight="700" fill="#0f172a">0</text>
    <text x="35" y="56" font-size="6.8" font-weight="700" fill="#0f172a">50</text>
    <text x="70" y="56" font-size="6.8" font-weight="700" fill="#0f172a">100 km</text>
  </g>

</svg>`;
}

console.log('Generating high-DPI vector SVG maps...');

const golanSvg = generateGolanHeightsSvg();
const golanPath = path.join(IMAGES_DIR, 'map_golan_heights_1967_vector.svg');
fs.writeFileSync(golanPath, golanSvg, 'utf8');
console.log(`✅ Generated Golan Heights Vector Map: ${golanPath} (${golanSvg.length} bytes)`);

const terrSvg = generateConqueredTerritoriesSvg();
const terrPath = path.join(IMAGES_DIR, 'map_1967_conquered_territories_vector.svg');
fs.writeFileSync(terrPath, terrSvg, 'utf8');
console.log(`✅ Generated Conquered Territories Vector Map: ${terrPath} (${terrSvg.length} bytes)`);
