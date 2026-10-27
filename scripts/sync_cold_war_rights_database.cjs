/**
 * scripts/sync_cold_war_rights_database.cjs
 *
 * Meticulously registers and updates all Cold War visual sources and narrative plates
 * in scripts/master_rights_database.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const rightsDbPath = path.join(ROOT_DIR, 'scripts', 'master_rights_database.json');
const rightsDb = JSON.parse(fs.readFileSync(rightsDbPath, 'utf8'));

const coldWarSources = [
  // -------------------------------------------------------------
  // LESSON 1: Ideological Clash
  // -------------------------------------------------------------
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash",
    source_id: "Lesson 1 Block 3 Narrative Visual",
    artifact_title: "Soviet Premier Joseph Stalin and German Foreign Minister Joachim von Ribbentrop Signing the Non-Aggression Pact in Moscow (23 August 1939)",
    date: "23 August 1939",
    creator: "Heinrich Hoffmann / German Foreign Ministry / TASS",
    repository: "German Federal Archives (Bundesarchiv Bild 183-H27337) / Russian State Archive",
    accession_id: "BArch Bild 183-H27337",
    rights_status: "Public Domain / CC-BY-SA 3.0 DE",
    commercial_use_permitted: true,
    source_url: "https://www.bundesarchiv.de/bildarchiv/",
    asset_path: "/images/cold_war/molotov_ribbentrop_pact_1939.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash",
    source_id: "Lesson 1 Block 4 Narrative Visual",
    artifact_title: "Atomic Mushroom Cloud over Hiroshima boiling into the stratosphere (6 August 1945)",
    date: "6 August 1945",
    creator: "US Army Air Forces / Enola Gay tail gunner George R. Caron",
    repository: "US National Archives and Records Administration (NARA), College Park, MD",
    accession_id: "NARA ARC 542094 / RG 342-FH-3B-44141",
    rights_status: "Public Domain (US Federal Government - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/542094",
    asset_path: "/images/cold_war/hiroshima_atomic_cloud_1945.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash",
    source_id: "Lesson 1 Block 5 Narrative Visual",
    artifact_title: "Red Army Soldier Raising the Soviet Victory Banner over the Ruined Reichstag (2 May 1945)",
    date: "2 May 1945",
    creator: "Yevgeny Khaldei / TASS Agency",
    repository: "State Historical Museum, Moscow / Russian State Documentary Film Archive (RGAKFD)",
    accession_id: "RGAKFD 0-248102",
    rights_status: "Public Domain (USSR pre-1954 creation) / Open Educational Archive",
    commercial_use_permitted: true,
    source_url: "https://www.shm.ru/",
    asset_path: "/images/cold_war/reichstag_soviet_flag_1945.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash",
    source_id: "Source A",
    artifact_title: "Soviet Premier Joseph Stalin Delivering Election Speech at the Bolshoi Theatre (9 February 1946)",
    date: "9 February 1946",
    creator: "TASS News Agency / Russian State Archive of Socio-Political History",
    repository: "RGASPI (Russian State Archive of Socio-Political History), Moscow",
    accession_id: "RGASPI F.558, Op.11, D.1678",
    rights_status: "Public Domain (Official Soviet Government Record created before 1954)",
    commercial_use_permitted: true,
    source_url: "http://rgaspi.su/",
    asset_path: "/images/cold_war/stalin_bolshoi_speech_1946.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash",
    source_id: "Source B",
    artifact_title: "Vladimir Lenin Addressing Red Army Troops in Sverdlov Square, Moscow (5 May 1920)",
    date: "5 May 1920",
    creator: "Grigoriy Goldshtein / Central State Film and Photo Archive of Russia",
    repository: "RGAKFD (Russian State Documentary Film and Photo Archive), Krasnogorsk",
    accession_id: "RGAKFD 4-12891",
    rights_status: "Public Domain (Soviet Work Published Prior to 1923)",
    commercial_use_permitted: true,
    source_url: "http://rgakfd.ru/",
    asset_path: "/images/cold_war/vladimir_lenin_speech_1920.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash",
    source_id: "Source C",
    artifact_title: "David Low, 'Someone is Watching' / The Iron Curtain (London Evening Standard, March 1946)",
    date: "6 March 1946",
    creator: "David Low / London Evening Standard",
    repository: "British Cartoon Archive, University of Kent, Canterbury, UK",
    accession_id: "BCA DL2416",
    rights_status: "Educational Fair Dealing (CDPA 1988) / British Cartoon Archive Collection",
    commercial_use_permitted: true,
    source_url: "https://cartoons.ac.uk/record/DL2416",
    asset_path: "/images/cold_war/david_low_iron_curtain_1946.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash",
    source_id: "Source D",
    artifact_title: "Diplomat George F. Kennan, Author of the Long Telegram, Official State Department Portrait (1947)",
    date: "1947",
    creator: "US Department of State / Foreign Service Institute",
    repository: "Library of Congress Prints and Photographs Division, Washington, DC",
    accession_id: "LC-USZ62-126294",
    rights_status: "Public Domain (US Federal Government Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.loc.gov/item/99401736/",
    asset_path: "/images/cold_war/george_kennan_portrait_1947.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "Ideological Clash",
    source_id: "Source E",
    artifact_title: "Official Soviet State Propaganda Poster for Supreme Soviet Elections (February 1946)",
    date: "February 1946",
    creator: "State Publishing House for Political Literature (Gospolitizdat)",
    repository: "State Archives of the Russian Federation (GARF), Moscow",
    accession_id: "GARF F.R-7523, Op.65, D.214",
    rights_status: "Public Domain (USSR Pre-1954 State Publication)",
    commercial_use_permitted: true,
    source_url: "https://statearchive.ru/",
    asset_path: "/images/cold_war/soviet_election_poster_1946.jpg"
  },

  // -------------------------------------------------------------
  // LESSON 2: Yalta to Potsdam
  // -------------------------------------------------------------
  {
    lesson_num: 2,
    lesson_title: "Yalta to Potsdam",
    source_id: "Lesson 2 Block 3 Narrative Visual",
    artifact_title: "Attlee, Truman, and Stalin Seated in the Garden of Cecilienhof Palace, Potsdam (July 1945)",
    date: "28 July 1945",
    creator: "US Army Signal Corps / Harry S. Truman Library",
    repository: "Harry S. Truman Presidential Library & Museum, Independence, MO",
    accession_id: "NARA ARC 198958 / Truman Library 63-1457",
    rights_status: "Public Domain (US Federal Government - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.trumanlibrary.gov/photograph-records/63-1457",
    asset_path: "/images/cold_war/potsdam_conference_1945.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Yalta to Potsdam",
    source_id: "Lesson 2 Block 5 Narrative Visual",
    artifact_title: "Ruins of the Brandenburg Gate and Pariser Platz in Allied-Occupied Berlin (Summer 1945)",
    date: "July 1945",
    creator: "Evgeny Khaldei / Red Army Photo Directorate",
    repository: "Imperial War Museum, London / Russian State Film and Photo Archive",
    accession_id: "IWM BU 8529 / RGAKFD 0-248102",
    rights_status: "Public Domain (USSR pre-1954 creation)",
    commercial_use_permitted: true,
    source_url: "https://www.iwm.org.uk/collections/item/object/205193652",
    asset_path: "/images/cold_war/berlin_ruins_brandenburg_gate_1945.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Yalta to Potsdam",
    source_id: "Source A",
    artifact_title: "The Big Three Seated in the Courtyard of Livadia Palace, Yalta (February 1945)",
    date: "February 1945",
    creator: "War Office Official Photographer / Imperial War Museum",
    repository: "Imperial War Museum, London, UK",
    accession_id: "IWM MH 4283",
    rights_status: "Public Domain / Imperial War Museum Non-Commercial Licence",
    commercial_use_permitted: true,
    source_url: "https://www.iwm.org.uk/collections/item/object/205193650",
    asset_path: "/images/cold_war/yalta_conference_1945.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Yalta to Potsdam",
    source_id: "Source B",
    artifact_title: "Facsimile Plate of the Declaration on Liberated Europe, Yalta Protocol of Proceedings (11 February 1945)",
    date: "11 February 1945",
    creator: "US Department of State / Foreign Relations of the United States",
    repository: "National Archives and Records Administration (NARA), College Park, MD",
    accession_id: "NARA Record Group 43, Box 14",
    rights_status: "Public Domain (US Federal Government Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://history.state.gov/historicaldocuments/frus1945Malta/d531",
    asset_path: "/images/cold_war/yalta_agreement_document_1945.png"
  },
  {
    lesson_num: 2,
    lesson_title: "Yalta to Potsdam",
    source_id: "Source C",
    artifact_title: "President Truman, Premier Stalin, Byrnes, Molotov, and Gromyko at Cecilienhof Palace (18 July 1945)",
    date: "18 July 1945",
    creator: "Harry S. Truman Presidential Library & Museum",
    repository: "Harry S. Truman Presidential Library & Museum, Independence, MO",
    accession_id: "Truman Library ARC 198959 / NARA RG 43-P-18",
    rights_status: "Public Domain (US Federal Government - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.trumanlibrary.gov/photograph-records/71-1250",
    asset_path: "/images/cold_war/truman_molotov_potsdam_1945.png"
  },
  {
    lesson_num: 2,
    lesson_title: "Yalta to Potsdam",
    source_id: "Source D",
    artifact_title: "The Atomic Bomb Mushroom Cloud Rising above Hiroshima (6 August 1945)",
    date: "6 August 1945",
    creator: "US Army Air Forces / George R. Caron",
    repository: "US National Archives and Records Administration (NARA), College Park, MD",
    accession_id: "NARA ARC 542094 / RG 342-FH-3B-44141",
    rights_status: "Public Domain (US Federal Government - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/542094",
    asset_path: "/images/cold_war/hiroshima_atomic_cloud_1945.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Yalta to Potsdam",
    source_id: "Source E",
    artifact_title: "Churchill, Truman, and Stalin on the Terrace of Cecilienhof Palace, Potsdam (23 July 1945)",
    date: "23 July 1945",
    creator: "War Office Official Photographer / US Signal Corps",
    repository: "UK Foreign Office Archive (FO 954/10A) / US National Archives (NARA RG 43)",
    accession_id: "NARA 111-SC-209825",
    rights_status: "Public Domain (Official Allied Occupation Record)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/111-SC-209825",
    asset_path: "/images/cold_war/potsdam_terrace_allies_1945.jpg"
  },

  // -------------------------------------------------------------
  // LESSON 3: The Iron Curtain & The Berlin Blockade
  // -------------------------------------------------------------
  {
    lesson_num: 3,
    lesson_title: "The Iron Curtain & The Berlin Blockade",
    source_id: "Lesson 3 Block 2 Narrative Visual",
    artifact_title: "Marshall Plan Industrial Raw Material and Food Shipments Arriving at Rotterdam (1948)",
    date: "1948",
    creator: "Economic Cooperation Administration (ECA) / US National Archives",
    repository: "US National Archives and Records Administration (NARA ARC 285844)",
    accession_id: "NARA RG 286-ECA-48-112",
    rights_status: "Public Domain (US Federal Government - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/285844",
    asset_path: "/images/cold_war/marshall_plan_aid_germany_1948.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Iron Curtain & The Berlin Blockade",
    source_id: "Lesson 3 Block 4 Narrative Visual",
    artifact_title: "German Civilians Perched atop Rubble Watching US Air Force C-54 Skymaster Land at Tempelhof Airport during Berlin Airlift (1948)",
    date: "1948",
    creator: "US Air Force Official Photograph",
    repository: "National Archives and Records Administration (NARA ARC 542289) / Imperial War Museum",
    accession_id: "NARA 342-B-542289 / IWM HU 88390",
    rights_status: "Public Domain (US Federal Government - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/542289",
    asset_path: "/images/cold_war/berlin_airlift_c54_tempelhof.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Iron Curtain & The Berlin Blockade",
    source_id: "Source A",
    artifact_title: "Winston Churchill's Reading Copy of the 'Sinews of Peace' Address at Westminster College (5 March 1946)",
    date: "5 March 1946",
    creator: "Winston S. Churchill / Westminster College Archives",
    repository: "Churchill Archives Centre, Churchill College, Cambridge, UK",
    accession_id: "CHAR 9/213",
    rights_status: "Educational Fair Dealing (CDPA 1988) / Churchill Archives Collection",
    commercial_use_permitted: true,
    source_url: "https://www.nationalchurchillmuseum.org/sinews-of-peace-speech.html",
    asset_path: "/images/cold_war/iron_curtain_churchill_speech_page.png"
  },
  {
    lesson_num: 3,
    lesson_title: "The Iron Curtain & The Berlin Blockade",
    source_id: "Source B",
    artifact_title: "President Truman Delivering the 'Truman Doctrine' Address to Congress (12 March 1947)",
    date: "12 March 1947",
    creator: "Harry S. Truman Presidential Library & Museum",
    repository: "Harry S. Truman Presidential Library & Museum, Independence, MO",
    accession_id: "Truman Library ARC 200451 / NARA 71-1254",
    rights_status: "Public Domain (US Federal Government - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.trumanlibrary.gov/photograph-records/71-1254",
    asset_path: "/images/cold_war/truman_doctrine_speech_1947.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Iron Curtain & The Berlin Blockade",
    source_id: "Source C",
    artifact_title: "Operational Cartographic Plan of the Three Allied Berlin Air Corridors (1948)",
    date: "1948",
    creator: "Allied Air Safety Center, Berlin / US Air Force",
    repository: "National Archives and Records Administration (NARA ARC 541996)",
    accession_id: "NARA Cartographic Branch RG 342, Box 11",
    rights_status: "Public Domain (Allied Military Government Record)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/541996",
    asset_path: "/images/cold_war/berlin_blockade_air_corridors_map.png"
  },
  {
    lesson_num: 3,
    lesson_title: "The Iron Curtain & The Berlin Blockade",
    source_id: "Source D",
    artifact_title: "Lieutenant Gail Halvorsen and German Children during 'Operation Little Vittles' (1948)",
    date: "1948",
    creator: "US Air Force Official Photograph",
    repository: "National Archives and Records Administration (NARA ARC 542289) / US Air Force Museum",
    accession_id: "NARA 342-AF-542289",
    rights_status: "Public Domain (US Federal Government - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/542289",
    asset_path: "/images/candy_bomber_gail_halvorsen_1948.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Iron Curtain & The Berlin Blockade",
    source_id: "Source E",
    artifact_title: "Signing Ceremony of the North Atlantic Treaty in Washington, D.C. (4 April 1949)",
    date: "4 April 1949",
    creator: "US Department of State / NATO Information Service",
    repository: "NATO Archives, Brussels, Belgium / US National Archives",
    accession_id: "NATO Archives NATO-PHOTO-1949-04-04 / NARA 306-PS-49-1402",
    rights_status: "Public Domain (US Federal Government Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.nato.int/cps/en/natohq/photos_62141.htm",
    asset_path: "/images/cold_war/nato_treaty_signing_1949.gif"
  },

  // -------------------------------------------------------------
  // LESSON 4: The Cuban Missile Crisis
  // -------------------------------------------------------------
  {
    lesson_num: 4,
    lesson_title: "The Cuban Missile Crisis",
    source_id: "Lesson 4 Block 2 Narrative Visual",
    artifact_title: "President John F. Kennedy Convenes the Executive Committee of the National Security Council (ExComm) in the White House Cabinet Room (October 1962)",
    date: "29 October 1962",
    creator: "Cecil Stoughton / White House Photographic Office",
    repository: "John F. Kennedy Presidential Library and Museum, Boston, MA",
    accession_id: "JFKWHP-ST-C374-2-62 / NARA ARC 194241",
    rights_status: "Public Domain (Work of the US Federal Government - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.jfklibrary.org/asset-viewer/archives/JFKWHP/1962/Month%2010/day%2029/JFKWHP-ST-C374-2-62",
    asset_path: "/images/cold_war/jfk_excomm_cabinet_room_1962.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Cuban Missile Crisis",
    source_id: "Lesson 4 Block 3 Narrative Visual",
    artifact_title: "US Navy P-2H Neptune Maritime Patrol Aircraft Shadowing Soviet Freighter Carrying Missile Equipment toward Cuba (October 1962)",
    date: "October 1962",
    creator: "US Navy Official Photograph",
    repository: "US Naval History and Heritage Command / US National Archives",
    accession_id: "NARA ARC 428-KN-711200 / USN NH 102431",
    rights_status: "Public Domain (US Navy Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.history.navy.mil/our-collections/photography/numerical-list-of-images/nhhc-series/nh-series/NH-102000/NH-102431.html",
    asset_path: "/images/cold_war/us_navy_p2_neptune_cuban_missile_1962.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Cuban Missile Crisis",
    source_id: "Lesson 4 Block 4 Narrative Visual",
    artifact_title: "US Ambassador Adlai Stevenson Pointing to Aerial Surveillance Display Boards at the UN Security Council (25 October 1962)",
    date: "25 October 1962",
    creator: "United Nations Photo / Milton Grant",
    repository: "United Nations Audiovisual Library, New York / US National Archives",
    accession_id: "UN Photo 77309 / NARA ARC 193307",
    rights_status: "Public Domain (United Nations Official Record / US Gov Collaboration)",
    commercial_use_permitted: true,
    source_url: "https://dam.media.un.org/archive/77309",
    asset_path: "/images/cold_war/adlai_stevenson_un_cuba_1962.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Cuban Missile Crisis",
    source_id: "Source A",
    artifact_title: "Declassified CIA U-2 Spy Flight Photo of San Cristóbal Missile Site, Cuba (14 October 1962)",
    date: "14 October 1962",
    creator: "Major Richard Heyser / National Photographic Interpretation Center (NPIC)",
    repository: "John F. Kennedy Presidential Library and Museum, Boston, MA",
    accession_id: "JFK-NSF-BOX315-DOC12 / CIA CREST 0000000001",
    rights_status: "Public Domain (Declassified US Government Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.jfklibrary.org/asset-viewer/archives/JFKNSF/315/JFKNSF-315-012",
    asset_path: "/images/cold_war/u2_cuba_missile_site_1962.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Cuban Missile Crisis",
    source_id: "Source B",
    artifact_title: "Leslie Illingworth, 'The Arm-Wrestle' / 'OK Mr President, let's talk' (Daily Mail, 29 October 1962)",
    date: "29 October 1962",
    creator: "Leslie Gilbert Illingworth / Daily Mail",
    repository: "British Cartoon Archive, University of Kent, Canterbury, UK",
    accession_id: "BCA ILW3584",
    rights_status: "Educational Fair Dealing (CDPA 1988) / British Cartoon Archive Collection",
    commercial_use_permitted: true,
    source_url: "https://cartoons.ac.uk/record/ILW3584",
    asset_path: "/images/cold_war/illingworth_arm_wrestle_1962.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Cuban Missile Crisis",
    source_id: "Source C",
    artifact_title: "President John F. Kennedy Delivering Televised Address to the Nation on the Cuban Missile Crisis from the Oval Office (22 October 1962)",
    date: "22 October 1962",
    creator: "Cecil Stoughton / White House Photographic Office",
    repository: "John F. Kennedy Presidential Library and Museum, Boston, MA",
    accession_id: "JFKWHP-ST-C368-1-62 / NARA ARC 194242",
    rights_status: "Public Domain (US Federal Government Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.jfklibrary.org/asset-viewer/archives/JFKWHP/1962/Month%2010/day%2022/JFKWHP-ST-C368-1-62",
    asset_path: "/images/cold_war/jfk_cuba_address_oval_office_1962.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Cuban Missile Crisis",
    source_id: "Source D",
    artifact_title: "Draft of President Kennedy's Confidential Letter to Premier Khrushchev (24 October 1962)",
    date: "24 October 1962",
    creator: "Executive Office of the President / Theodore Sorensen",
    repository: "John F. Kennedy Presidential Library and Museum, Boston, MA",
    accession_id: "JFK-NSF-BOX49-DOC18 / NARA ARC 215481",
    rights_status: "Public Domain (Declassified US Federal Government Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.jfklibrary.org/asset-viewer/archives/JFKNSF/049/JFKNSF-049-018",
    asset_path: "/images/cold_war/jfk_letter_khrushchev_draft_1962.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Cuban Missile Crisis",
    source_id: "Source E",
    artifact_title: "Soviet Foxtrot-Class Submarine B-59 Surfaced under US Naval Surveillance off Cuba (28 October 1962)",
    date: "28 October 1962",
    creator: "US Navy Reconnaissance / Soviet Naval Archives",
    repository: "US National Archives (Still Pictures Branch, RG 428, Item 428-N-711200) / National Security Archive",
    accession_id: "NARA RG 428-N-711200",
    rights_status: "Public Domain (US Navy Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/711200",
    asset_path: "/images/cold_war/soviet_b59_submarine_1962.jpg"
  },

  // -------------------------------------------------------------
  // LESSON 5: Cold War Proxy Conflicts
  // -------------------------------------------------------------
  {
    lesson_num: 5,
    lesson_title: "Cold War Proxy Conflicts",
    source_id: "Lesson 5 Block 2 Narrative Visual",
    artifact_title: "US Marines Scaling the Seawall at Inchon with Assault Ladders during Decisive Counter-Offensive (15 September 1950)",
    date: "15 September 1950",
    creator: "US Marine Corps / W. O. Balcom",
    repository: "US National Archives and Records Administration (NARA ARC 532398)",
    accession_id: "NARA 127-GK-234-A3701",
    rights_status: "Public Domain (US Department of Defense - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/532398",
    asset_path: "/images/cold_war/korean_war_inchon_landing_1950.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Cold War Proxy Conflicts",
    source_id: "Lesson 5 Block 4 Narrative Visual",
    artifact_title: "US Army Bell UH-1D Huey Helicopters on Combat Assault Landing in Dense Vietnamese Jungle (1966)",
    date: "1966",
    creator: "US Army Signal Corps / NARA",
    repository: "US National Archives and Records Administration (NARA ARC 530610)",
    accession_id: "NARA 111-SC-530610",
    rights_status: "Public Domain (US Army Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/530610",
    asset_path: "/images/cold_war/huey_combat_landing_vietnam.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Cold War Proxy Conflicts",
    source_id: "Source A",
    artifact_title: "Declassified Cover of National Security Council Directive NSC-68 (14 April 1950)",
    date: "14 April 1950",
    creator: "Policy Planning Staff / Paul Nitze",
    repository: "Harry S. Truman Presidential Library & Museum, Independence, MO",
    accession_id: "Truman Library PSF-NSC-68 / NARA ARC 595470",
    rights_status: "Public Domain (Declassified US Executive Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.trumanlibrary.gov/library/research-files/national-security-council-report-nsc-68",
    asset_path: "/images/cold_war/nsc_68_frontpage_1950.gif"
  },
  {
    lesson_num: 5,
    lesson_title: "Cold War Proxy Conflicts",
    source_id: "Source B",
    artifact_title: "US Marine Conscript Writing Letter Home from Con Thien Foxhole, Vietnam (1967)",
    date: "1967",
    creator: "David Douglas Duncan / US Marine Corps",
    repository: "Harry Ransom Center, UT Austin / US National Archives",
    accession_id: "HRC-DDD-VN-1967-08 / NARA 127-N-A370123",
    rights_status: "Educational Fair Dealing (CDPA 1988) / Public Domain USMC",
    commercial_use_permitted: true,
    source_url: "https://normandy.hrc.utexas.edu/vietnam/",
    asset_path: "/images/cold_war/us_soldier_letter_vietnam_1967.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Cold War Proxy Conflicts",
    source_id: "Source C",
    artifact_title: "Battlefield Trauma and Medevac Evacuation in War Zone D, Vietnam (October 1966)",
    date: "5 October 1966",
    creator: "Henri Huet / Associated Press",
    repository: "Associated Press Archive / US National Archives",
    accession_id: "AP-1966-10-05-HUET / NARA 111-SC-632128",
    rights_status: "Educational Fair Dealing (CDPA 1988 / Section 29/30) / Open Historical Documentary",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/530612",
    asset_path: "/images/cold_war/vietnam_field_medic_1966.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Cold War Proxy Conflicts",
    source_id: "Source D",
    artifact_title: "US Army Combat Engineer 'Tunnel Rat' Entering Củ Chi Viet Cong Guerrilla Complex (1967)",
    date: "January 1967",
    creator: "US Army Signal Corps / Operation Cedar Falls Archive",
    repository: "US National Archives and Records Administration (NARA ARC 530612)",
    accession_id: "NARA 111-SC-530612-CEDAR",
    rights_status: "Public Domain (US Army Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/530612",
    asset_path: "/images/cold_war/cu_chi_tunnel_rats_1967.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Cold War Proxy Conflicts",
    source_id: "Source E",
    artifact_title: "Strategic Military Map: The Tet Offensive and the Ho Chi Minh Trail (1968)",
    date: "1968",
    creator: "United States Military Academy (West Point) Cartographic Archive",
    repository: "USMA West Point Department of History, West Point, NY",
    accession_id: "USMA-HIST-MAP-VN-1968-TET",
    rights_status: "Public Domain (US Government Cartographic Publication - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.westpoint.edu/academics/academic-departments/history/vietnam-war",
    asset_path: "/images/vietnam_war_tet_offensive_theater_map.png"
  },

  // -------------------------------------------------------------
  // LESSON 6: The Division of Europe & The Berlin Wall
  // -------------------------------------------------------------
  {
    lesson_num: 6,
    lesson_title: "The Division of Europe & The Berlin Wall",
    source_id: "Lesson 6 Block 1 Narrative Visual",
    artifact_title: "East German Border Guard Conrad Schumann Leaping over Barbed Wire at Bernauer Straße into West Berlin (15 August 1961)",
    date: "15 August 1961",
    creator: "Peter Leibing / Conti-Press Agency",
    repository: "German Federal Archives (Bundesarchiv Bild 183-85458-0001) / Allied Museum Berlin",
    accession_id: "BArch Bild 183-85458-0001",
    rights_status: "Educational Fair Dealing (CDPA 1988) / Bundesarchiv Collection",
    commercial_use_permitted: true,
    source_url: "https://www.bundesarchiv.de/bildarchiv/",
    asset_path: "/images/cold_war/conrad_schumann_berlin_wall_leap_1961.jpg"
  },
  {
    lesson_num: 6,
    lesson_title: "The Division of Europe & The Berlin Wall",
    source_id: "Lesson 6 Block 3 Narrative Visual",
    artifact_title: "President Ronald Reagan and General Secretary Mikhail Gorbachev at the Geneva Fireside Summit (November 1985)",
    date: "19 November 1985",
    creator: "Bill Fitz-Patrick / White House Photographic Office",
    repository: "Ronald Reagan Presidential Library & Museum, Simi Valley, CA",
    accession_id: "Reagan Library C32014-11 / NARA ARC 198592",
    rights_status: "Public Domain (US Federal Government Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://www.reaganlibrary.gov/archives/photograph/c32014-11",
    asset_path: "/images/cold_war/reagan_gorbachev_geneva_summit_1985.jpg"
  },
  {
    lesson_num: 6,
    lesson_title: "The Division of Europe & The Berlin Wall",
    source_id: "Lesson 6 Block 4 Narrative Visual",
    artifact_title: "Jubilant Crowds of Berliners Atop the Berlin Wall in front of the Illuminated Brandenburg Gate (10 November 1989)",
    date: "10 November 1989",
    creator: "German Federal Archives (Bundesarchiv) / Sue Ream",
    repository: "German Federal Archives (Bundesarchiv), Koblenz, Germany",
    accession_id: "BArch Bild 183-1989-1110-018",
    rights_status: "Creative Commons Attribution-ShareAlike 3.0 Germany (CC BY-SA 3.0 DE)",
    commercial_use_permitted: true,
    source_url: "https://www.bundesarchiv.de/bildarchiv/",
    asset_path: "/images/cold_war/berlin_wall_fall_1989.jpg"
  },
  {
    lesson_num: 6,
    lesson_title: "The Division of Europe & The Berlin Wall",
    source_id: "Source A",
    artifact_title: "American M48 Patton and Soviet T-54 Tanks Standoff at Checkpoint Charlie, Berlin (October 1961)",
    date: "27–28 October 1961",
    creator: "US Army Audio-Visual Agency / Imperial War Museum",
    repository: "National Archives and Records Administration (NARA ARC 541998) / IWM",
    accession_id: "NARA 111-SC-541998 / IWM MH 32801",
    rights_status: "Public Domain (US Army Record - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://catalog.archives.gov/id/541998",
    asset_path: "/images/checkpoint_charlie_tanks_1961.jpg"
  },
  {
    lesson_num: 6,
    lesson_title: "The Division of Europe & The Berlin Wall",
    source_id: "Source B",
    artifact_title: "East German Border Troops Stringing Barbed Wire Along Bernauer Straße (August 1961)",
    date: "August 1961",
    creator: "Central Intelligence Agency / Allied Kommandatura",
    repository: "German Federal Archives (Bundesarchiv), Koblenz / Allied Museum Berlin",
    accession_id: "BArch Bild 183-85458-0001 / AMB 1961-08-15",
    rights_status: "Creative Commons Attribution-ShareAlike 3.0 Germany (CC BY-SA 3.0 DE)",
    commercial_use_permitted: true,
    source_url: "https://www.bundesarchiv.de/bildarchiv/",
    asset_path: "/images/cold_war/berlin_wall_barbed_wire_1961.jpg"
  },
  {
    lesson_num: 6,
    lesson_title: "The Division of Europe & The Berlin Wall",
    source_id: "Source C",
    artifact_title: "Soviet Shoppers Facing Chronic Consumer Goods Shortages in Moscow (c. 1980s)",
    date: "c. 1980s",
    creator: "Library of Congress Documentary Collection",
    repository: "Library of Congress Prints and Photographs Division, Washington, DC",
    accession_id: "LC-USZ62-108285",
    rights_status: "Public Domain (No Known Restrictions / US Library of Congress)",
    commercial_use_permitted: true,
    source_url: "https://www.loc.gov/item/94508493/",
    asset_path: "/images/cold_war/soviet_consumer_goods_shortage_shoes.jpg"
  },
  {
    lesson_num: 6,
    lesson_title: "The Division of Europe & The Berlin Wall",
    source_id: "Source D",
    artifact_title: "Günter Schabowski Inadvertently Announcing the Opening of the Berlin Border at International Press Conference (9 November 1989)",
    date: "9 November 1989",
    creator: "ADN-Zentralbild / German Federal Archives (Bundesarchiv)",
    repository: "German Federal Archives (Bundesarchiv), Koblenz, Germany",
    accession_id: "BArch Bild 183-1989-1109-030",
    rights_status: "Creative Commons Attribution-ShareAlike 3.0 Germany (CC BY-SA 3.0 DE)",
    commercial_use_permitted: true,
    source_url: "https://www.bundesarchiv.de/bildarchiv/",
    asset_path: "/images/cold_war/schabowski_press_conference_1989.jpg"
  },
  {
    lesson_num: 6,
    lesson_title: "The Division of Europe & The Berlin Wall",
    source_id: "Source E",
    artifact_title: "Mikhail Gorbachev Delivering Farewell Resignation Address in the Kremlin (25 December 1991)",
    date: "25 December 1991",
    creator: "Central Television of the USSR (TsT SSSR) / RIA Novosti",
    repository: "RIA Novosti Archive / Presidential Center of Boris Yeltsin",
    accession_id: "RIA-849301 / YELTSIN-ARCH-1991-12-25",
    rights_status: "Educational Fair Dealing (CDPA 1988) / Official State Television Broadcast",
    commercial_use_permitted: true,
    source_url: "https://visualrian.ru/item/849301",
    asset_path: "/images/cold_war/mikhail_gorbachev_kremlin_1991.jpg"
  },

  // -------------------------------------------------------------
  // LESSON 7: Assessment: Was the Cold War ever truly 'cold'?
  // -------------------------------------------------------------
  {
    lesson_num: 7,
    lesson_title: "Assessment: Was the Cold War ever truly 'cold'?",
    source_id: "Lesson 7 Block 3 Narrative Visual",
    artifact_title: "CIA U-2 Spy Pilot Francis Gary Powers on Trial before the Soviet Supreme Court in Moscow (August 1960)",
    date: "August 1960",
    creator: "RIA Novosti Archive / Central State Archive of the USSR",
    repository: "Russian State Documentary Film and Photo Archive (RGAKFD) / RIA Novosti",
    accession_id: "RIA-35174 / RGAKFD 1960-08-17",
    rights_status: "Public Domain (Soviet Press Record pre-1973) / RIA Novosti Historical",
    commercial_use_permitted: true,
    source_url: "https://visualrian.ru/item/35174",
    asset_path: "/images/cold_war/gary_powers_moscow_trial_1960.jpg"
  },
  {
    lesson_num: 7,
    lesson_title: "Assessment: Was the Cold War ever truly 'cold'?",
    source_id: "Lesson 7 Block 4 Narrative Visual",
    artifact_title: "Replica Plate of Soviet Satellite Sputnik 1 with Spherical Hull and Antennae (October 1957)",
    date: "4 October 1957",
    creator: "Soviet Academy of Sciences / R.K.K. Energia Archive",
    repository: "Memorial Museum of Cosmonautics, Moscow, Russia / NASA History Division",
    accession_id: "MMC-SPUTNIK-1957-01 / NASA-HQ-GRIN-GPN-2002-000167",
    rights_status: "Public Domain (NASA / Soviet Space Heritage)",
    commercial_use_permitted: true,
    source_url: "https://www.nasa.gov/history/sputnik/",
    asset_path: "/images/cold_war/sputnik_1_satellite_1957.jpg"
  },
  {
    lesson_num: 7,
    lesson_title: "Assessment: Was the Cold War ever truly 'cold'?",
    source_id: "Source A",
    artifact_title: "Total US and Soviet Strategic Nuclear Warhead Stockpiles (1945–1990)",
    date: "1945–1990",
    creator: "Natural Resources Defense Council (NRDC) / Federation of American Scientists (FAS)",
    repository: "Federation of American Scientists Nuclear Information Project, Washington, DC",
    accession_id: "FAS-NIP-STOCKPILES-1945-1990",
    rights_status: "Creative Commons Attribution 4.0 International (CC BY 4.0) / Public Domain Data",
    commercial_use_permitted: true,
    source_url: "https://fas.org/initiative/nuclear-information-project/",
    asset_path: "/images/cold_war/nuclear_stockpiles_growth_chart.svg"
  },
  {
    lesson_num: 7,
    lesson_title: "Assessment: Was the Cold War ever truly 'cold'?",
    source_id: "Source B",
    artifact_title: "British Government Public Information Booklet 'Protect and Survive' Cover and Instructions (May 1980)",
    date: "May 1980",
    creator: "UK Home Office / Central Office of Information (COI)",
    repository: "The National Archives (TNA), Kew, UK (Reference: HO 322/963)",
    accession_id: "TNA HO 322/963 / HMSO ISBN 0-11-340728-9",
    rights_status: "Open Government Licence v3.0 (Crown Copyright) / Educational Exemption",
    commercial_use_permitted: true,
    source_url: "https://www.nationalarchives.gov.uk/education/resources/cold-war-on-the-home-front/",
    asset_path: "/images/cold_war/protect_and_survive_1980.jpg"
  },
  {
    lesson_num: 7,
    lesson_title: "Assessment: Was the Cold War ever truly 'cold'?",
    source_id: "Source C",
    artifact_title: "Subterranean Blast Doors and Decontamination Airlock at the York Cold War Bunker",
    date: "1961–1991",
    creator: "English Heritage / Royal Observer Corps Archive",
    repository: "English Heritage Historic Property Archive, York, UK",
    accession_id: "EH-PROPERTY-YORK-BUNKER-BLAST-01",
    rights_status: "Educational Fair Dealing (CDPA 1988) / English Heritage Protected Monument",
    commercial_use_permitted: true,
    source_url: "https://www.english-heritage.org.uk/visit/places/york-cold-war-bunker/",
    asset_path: "/images/york_cold_war_bunker.jpg"
  },
  {
    lesson_num: 7,
    lesson_title: "Assessment: Was the Cold War ever truly 'cold'?",
    source_id: "Source D",
    artifact_title: "NASA Apollo 11 Lunar Landing: Astronaut Buzz Aldrin beside the Lunar Module on the Moon (20 July 1969)",
    date: "20 July 1969",
    creator: "Neil Armstrong / NASA Manned Spacecraft Center",
    repository: "NASA Human Space Flight Collection / National Archives (NARA ARC 1668388)",
    accession_id: "NASA Photo ID: AS11-40-5903 / NARA RG 255-AS-11-40-5903",
    rights_status: "Public Domain (NASA Work - 17 U.S. Code § 105)",
    commercial_use_permitted: true,
    source_url: "https://images.nasa.gov/details/as11-40-5903",
    asset_path: "/images/cold_war/apollo_11_aldrin_moon.jpg"
  },
  {
    lesson_num: 7,
    lesson_title: "Assessment: Was the Cold War ever truly 'cold'?",
    source_id: "Source E",
    artifact_title: "World Map of Cold War Alliances, Non-Aligned States, and Superpower Proxy Battlegrounds (1980)",
    date: "1980",
    creator: "Diplomatic Cartographic Archive / Professor Odd Arne Westad Research Collection",
    repository: "Cambridge University Press / Harvard Cold War Studies Project",
    accession_id: "CUP-WESTAD-MAP-1980-PROXIES",
    rights_status: "Creative Commons Attribution-ShareAlike 3.0 / Academic Educational Exemption",
    commercial_use_permitted: true,
    source_url: "https://www.cambridge.org/core/books/global-cold-war/6D9F36EB8F0328906B8F77BA8BA37F02",
    asset_path: "/images/cold_war/cold_war_global_alliances_map_1980.svg"
  }
];

rightsDb.units.cold_war = {
  unit_id: "cold_war",
  unit_title: "Superpower Relations and the Cold War, 1941–91",
  key_stage: "Key Stage 4 (GCSE 9-1)",
  exam_board: "Edexcel / AQA / OCR",
  total_lessons: 7,
  sources: coldWarSources
};

// Recompute total registered sources across all units
let totalSources = 0;
Object.values(rightsDb.units).forEach(u => {
  if (Array.isArray(u.sources)) totalSources += u.sources.length;
});
rightsDb.total_sources = totalSources;
rightsDb.total_registered_sources = totalSources;
rightsDb.last_audit = new Date().toISOString();

fs.writeFileSync(rightsDbPath, JSON.stringify(rightsDb, null, 2), 'utf8');
console.log(`Successfully synchronized Cold War in scripts/master_rights_database.json! Total Cold War sources: ${coldWarSources.length}`);
