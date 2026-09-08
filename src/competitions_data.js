/**
 * Co-Curricular Competitions & Young Historian Awards Data
 * Add future history competitions, essay prizes, and awards to this registry.
 */

export const competitionsData = [
  {
    id: 'hampshire_archives_2027',
    title: 'Hampshire Archives Trust History Competition 2026–27',
    sponsor: 'Hampshire Archives Trust',
    sponsorLogo: 'fa-landmark-dome',
    badge: 'Official County Competition',
    badgeColor: '#f59e0b',
    status: 'Open for Entries',
    targetYears: 'Years 7–9 · Years 10–11 · Sixth Form',
    deadline: 'Friday 19th March 2027',
    ceremony: 'Summer Term 2027 at the Lord Lieutenant of Hampshire’s offices in Winchester',
    prizes: [
      {
        tier: 'Individual Winner',
        reward: '£100 Cash Prize',
        icon: 'fa-award',
        desc: 'Cash prize awarded directly to the student winner in each age category, plus an official Winner’s Certificate presented by the Lord Lieutenant.',
      },
      {
        tier: 'School / Group Winner',
        reward: '£300 Department Grant + Trophy',
        icon: 'fa-trophy',
        desc: '£300 towards History Department books and learning resources, plus the prestigious Annual Winner’s Trophy to keep at Meoncross for the academic year.',
      },
      {
        tier: 'Runners-Up',
        reward: 'Highly Commended Certificates',
        icon: 'fa-certificate',
        desc: 'Official commended certificates awarded to students and groups producing high-calibre archival projects.',
      },
    ],
    overview:
      'The Hampshire Archives Trust invites students to submit historical investigations into any aspect of Hampshire history—from local communities and historic events to family heritage and prominent figures. Projects may be produced individually or in collaborative groups.',
    keyRequirement:
      'Demonstrated use of authentic primary archives (documents, diaries, letters, parish/census rolls, historical maps, military records, old photographs, oral history recordings, or film footage).',
    acceptableFormats: [
      { name: 'Historical Essay / Report', icon: 'fa-file-lines' },
      { name: 'Short Documentary / Film', icon: 'fa-video' },
      { name: 'Audio Podcast / Interview', icon: 'fa-podcast' },
      { name: 'Research Poster / Display', icon: 'fa-image' },
      { name: 'Interactive Website / Digital App', icon: 'fa-laptop-code' },
      { name: 'Illustrated Presentation', icon: 'fa-person-chalkboard' },
    ],
    localSparks: [
      {
        title: 'The Fallen of Stubbington & Lee-on-the-Solent',
        category: 'First World War & Remembrance',
        desc: 'Investigate the lives, occupations, and military service of local men named on the Stubbington village war memorial using Commonwealth War Graves Commission (CWGC) archives, local parish registers, and census data.',
        badge: 'Meoncross Local Connection',
      },
      {
        title: 'Southampton, the Titanic & Wartime Embarkation',
        category: 'Maritime & Global Hampshire',
        desc: 'Explore the maritime social history of the Solent—such as the Southampton crew members of the Titanic (1912) or the secret D-Day embarkations (1944)—using port logs, oral history recordings, and shipping manifests.',
        badge: 'Solent Heritage',
      },
      {
        title: 'Victorian Poverty & The Fareham Union Workhouse',
        category: 'Social & Industrial History',
        desc: 'Uncover 19th-century life in South Hampshire by analysing Fareham Union Workhouse admission records, Poor Law guardian minutes, and census rolls held at the Hampshire Record Office.',
        badge: 'County Archives',
      },
      {
        title: 'Sir Walter Raleigh, Privateering & The Solent',
        category: 'Early Modern England',
        desc: 'Examine Hampshire’s crucial role in Elizabethan naval expeditions, trade routes, and privateer preparations from Portsmouth harbour using 16th-century naval archives.',
        badge: 'Tudor History',
      },
    ],
    howToEnter: [
      'Choose whether to enter as an individual or in a collaborative group (Years 7–9, 10–11, or Sixth Form).',
      'Select an aspect of Hampshire history that fascinates you—school, village, family, or local event.',
      'Explore primary archives (visit the Hampshire Record Office in Winchester or use online digital record repositories).',
      'Select your medium (essay, film, podcast, website, or poster).',
      'Submit through Mr Lovett (Head of History) before Friday 19th March 2027. Multiple entries per year group are welcome and free of charge.',
    ],
    links: [
      {
        label: 'Hampshire Archives Trust Education Portal',
        url: 'https://hampshirearchivestrust.co.uk/education',
        icon: 'fa-arrow-up-right-from-square',
      },
      {
        label: 'Hampshire Record Office (Winchester)',
        url: 'https://www.hants.gov.uk/librariesandarchives/archives',
        icon: 'fa-building-columns',
      },
    ],
    contact: 'Dr Alistair Dougall (Trustee, Hampshire Archives Trust)',
  },
];
