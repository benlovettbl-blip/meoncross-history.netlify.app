const https = require('https');

function verifyOembed(videoId) {
  return new Promise((resolve) => {
    https
      .get(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            if (res.statusCode === 200) {
              try {
                const j = JSON.parse(data);
                resolve({ valid: true, id: videoId, title: j.title, author: j.author_name });
              } catch (e) {
                resolve({ valid: false, id: videoId });
              }
            } else {
              resolve({ valid: false, id: videoId, status: res.statusCode });
            }
          });
        },
      )
      .on('error', () => resolve({ valid: false, id: videoId }));
  });
}

function fetchDuration(videoId) {
  return new Promise((resolve) => {
    https
      .get(
        `https://www.youtube.com/watch?v=${videoId}`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            const durMatch = data.match(/"approxDurationMs":"(\d+)"/);
            if (durMatch) {
              const sec = Math.round(parseInt(durMatch[1], 10) / 1000);
              const m = Math.floor(sec / 60);
              const s = sec % 60;
              resolve(`${m} mins ${s < 10 ? '0' : ''}${s} secs (${sec}s)`);
            } else {
              resolve('Unknown duration');
            }
          });
        },
      )
      .on('error', () => resolve('Unknown duration'));
  });
}

async function testList(list) {
  for (const item of list) {
    const res = await verifyOembed(item.id);
    if (res.valid) {
      const dur = await fetchDuration(item.id);
      console.log(`[L${item.lesson}] [${item.id}] ${dur} | "${res.title}" by ${res.author}`);
    } else {
      console.log(`[L${item.lesson}] [${item.id}] INVALID (status ${res.status})`);
    }
  }
}

// Candidate IDs across KT1, KT2, KT3, KT4
const candidates = [
  // L1: Position of Black Americans (Jim Crow & Emmett Till)
  { lesson: 1, id: 'rYynBR7heVQ' }, // Jim Crow Laws and the Segregated South | Daily Dose Documentary
  { lesson: 1, id: '4HljsKwpv3g' }, // Emmett Till: Crash Course Black American History #34
  { lesson: 1, id: 'KXo_9DG6aV8' }, // Origins of the Jim Crow Era - One Minute History
  { lesson: 1, id: 'SYiI7j6GW68' }, // Emmett Till, Age 14, Abducted and Murdered

  // L2: Challenging Education (Brown v Board & Little Rock Nine)
  { lesson: 2, id: 'jRYK4RWyUAo' }, // Brown v. Board of Education Explained | Landmark Cases
  { lesson: 2, id: 'NBlqcAEv4nk' }, // School Segregation and Brown v Board | Crash Course
  { lesson: 2, id: 'auATIIhUXVU' }, // Civil Rights Movement: The Little Rock Nine | GCSE History
  { lesson: 2, id: 'S0Dn3tOmyKk' }, // How the Little Rock 9 Impacted the Civil Rights Movement | HISTORY

  // L3: Montgomery Bus Boycott
  { lesson: 3, id: '_omQ841ZAWg' }, // The Montgomery Bus Boycott of 1955 | History
  { lesson: 3, id: 'lFs6kK2vVvU' }, // Rosa Parks - Civil Rights Activist | Mini Bio | BIO
  { lesson: 3, id: 'FE6Yvy65phM' }, // Montgomery Bus Boycott | HistoryPod
  { lesson: 3, id: 'V57lotnKGF8' }, // The Montgomery Bus Boycott - The History Teacher

  // L4: Southern Resistance (KKK, White Citizens' Councils, 1957 Act)
  { lesson: 4, id: 'qXZk9_9PjF8' }, // Southern Resistance to Civil Rights
  { lesson: 4, id: '13SgQh2bQz0' }, // The Ku Klux Klan and the Civil Rights Movement
  { lesson: 4, id: 'h78Y89QWvYc' }, // The Civil Rights Act of 1957
  { lesson: 4, id: '2S_Z95K97kU' }, // Dixiecrats and Southern Resistance
];

testList(candidates).catch(console.error);
