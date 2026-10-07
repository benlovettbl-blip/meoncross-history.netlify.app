const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const vettedVideos = [
  // L1: KT1.1 Origins of the Republic, 1918–1919
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/make-germany-pay-twentieth-century-history/',
      title:
        '[STARTER HOOK] Twentieth Century History: The German Revolution & The Armistice (1918)',
      duration: '20 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–06:45. Covers the Kiel mutiny, the abdication of Kaiser Wilhelm II, Friedrich Ebert proclaiming the Republic, and the "stab-in-the-back" myth (Dolchstoßlegende).',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/6-making-germany-pay-history-file/',
      title: '[ENQUIRY EVIDENCE] History File: The Treaty of Versailles & The "Diktat" (1919)',
      duration: '19 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–07:30. Examines the terms of Versailles: War Guilt (Article 231), reparations of £6.6 billion, demilitarisation of the Rhineland, and loss of 13% of German territory.',
    },
  ],

  // L2: KT1.2 Early Challenges to the Republic, 1919–1923
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-the-dark-charisma-of-adolf-hitler-episode-1-freikorps/',
      title: '[STARTER HOOK] BBC Two: The Freikorps & Political Violence (1919–1920)',
      duration: '4 mins 30 secs',
      teacher_guidance:
        'Explores the demobilised soldiers of the Freikorps crushing the Spartacist Uprising in Berlin, the murder of Luxemburg and Liebknecht, and the Kapp Putsch of 1920.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/6-making-germany-pay-history-file/',
      title: '[PRIMARY EVIDENCE] History File: The 1923 Crisis – Ruhr Occupation & Hyperinflation',
      duration: '19 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 07:15–14:20. Direct evidence of French and Belgian troops invading the Ruhr, passive resistance, printing paper marks, and the complete collapse of middle-class savings.',
    },
  ],

  // L3: KT1.3 Recovery of the Republic, 1924–1929
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/6-making-germany-pay-history-file/',
      title:
        '[STARTER HOOK] Gustav Stresemann: The Rentenmark, Dawes Plan & Locarno Pact (1924–1929)',
      duration: '19 mins 0 secs',
      teacher_guidance:
        "⏱️ Watch Window: 14:30–19:15. How Stresemann stabilized the currency with the Rentenmark, negotiated US loans under the Dawes Plan (800M marks), and secured Germany's entry into the League of Nations.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/hitlers-rise-the-colour-films-the-treaty-of-versailles-channel-4/',
      title:
        "[ENQUIRY EVIDENCE] Weimar's Golden Years: Economic Recovery & The Illusion of Stability",
      duration: '48 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 22:00–28:15. Critical historical perspective on whether Weimar recovery was genuine or "dancing on a volcano" dependent on short-term American loans.',
    },
  ],

  // L4: KT1.4 Changes in Society, 1924–1929
  [
    {
      url: 'https://www.youtube.com/watch?v=-j52Dx5wUFk',
      title:
        '[STARTER HOOK] The History Teacher: Changes for Workers, Women and Culture in the 1920s',
      duration: '6 mins 12 secs',
      teacher_guidance:
        'Note 3 specific changes in living standards for German workers, 2 ways women\'s freedom expanded ("New Woman"), and how traditionalists reacted to avant-garde Berlin nightlife.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/hitlers-rise-the-colour-films-the-treaty-of-versailles-channel-4/',
      title:
        '[ENQUIRY EVIDENCE] Weimar Culture & Architecture: Bauhaus, Expressionism & The Cabarets',
      duration: '48 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 29:30–35:10. Explores Walter Gropius\'s Bauhaus movement, Otto Dix\'s anti-war paintings, and the conservative resentment against Weimar cultural "decadence".',
    },
  ],

  // L5: KT2.1 Early Development of the Nazi Party, 1919–1922
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-the-dark-charisma-of-adolf-hitler-episode-1-stormtroopers/',
      title:
        "[STARTER HOOK] BBC Two: The Early Nazi Party – Anton Drexler, The DAP & Hitler's Oratory",
      duration: '5 mins 20 secs',
      teacher_guidance:
        "How Hitler joined the tiny German Workers' Party (DAP) in 1919, renamed it the NSDAP, wrote the 25-Point Programme, and introduced the swastika emblem and Völkischer Beobachter.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/rise-of-the-nazis-the-sa-and-the-appeal-of-the-nazis-bbc-two/',
      title: '[ENQUIRY EVIDENCE] BBC Two: Rise of the Nazis – Ernst Röhm & The Stormtroopers (SA)',
      duration: '6 mins 15 secs',
      teacher_guidance:
        'Focuses on the creation of the SA ("Brownshirts") in 1921: their role as paramilitary bodyguards, street fighters breaking up Communist meetings, and intimidating political opponents.',
    },
  ],

  // L6: KT2.2 Munich Putsch & Lean Years, 1923–1929
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-the-dark-charisma-of-adolf-hitler-episode-1-beer-hall-putsch/',
      title: '[STARTER HOOK] BBC Two: The Munich Beer Hall Putsch (8–9 November 1923)',
      duration: '5 mins 10 secs',
      teacher_guidance:
        "Reconstructs Hitler and Ludendorff hijacking von Kahr's meeting at the Bürgerbräukeller, the march through Munich, the 16 dead Nazis, and the failure of the armed coup.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-the-dark-charisma-of-adolf-hitler-episode-1-mein-kampf/',
      title:
        '[PRIMARY EVIDENCE] BBC Two: Hitler at Landsberg Prison, Mein Kampf & The Legal Strategy',
      duration: '5 mins 30 secs',
      teacher_guidance:
        'How Hitler used his 1924 trial for high treason to gain national publicity, served only 9 months in Landsberg, wrote Mein Kampf, and resolved to win power through democratic elections.',
    },
  ],

  // L7: KT2.3 Growth of Nazi Support, 1929–1932
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/1-the-rise-of-hitler-history-file/',
      title:
        '[STARTER HOOK] History File: The Wall Street Crash & The Surge in Nazi Support (1929–1932)',
      duration: '20 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–08:30. Explores how the collapse of the US stock market led to 6 million unemployed Germans by 1932, pushing desperate voters away from moderate parties toward the Nazis and Communists.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/rise-of-the-nazis-the-sa-and-the-appeal-of-the-nazis-bbc-two/',
      title:
        '[ENQUIRY EVIDENCE] BBC Two: Rise of the Nazis – Goebbels\' Propaganda & "Work and Bread"',
      duration: '6 mins 15 secs',
      teacher_guidance:
        'How modern campaigning (airplanes, mass rallies, targeted posters for farmers, workers, and industrialists) and the slogan "Arbeit und Brot" made the Nazis the largest Reichstag party (230 seats in July 1932).',
    },
  ],

  // L8: KT2.4 How Hitler Became Chancellor, 1932–1933
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/rise-of-the-nazis-how-hitler-becomes-chancellor-bbc-two/',
      title:
        '[STARTER HOOK] BBC Two: Rise of the Nazis – Political Intrigue: Papen, Schleicher & Hindenburg',
      duration: '7 mins 10 secs',
      teacher_guidance:
        'The political maneuvering of winter 1932–33: Franz von Papen scheming to oust General Kurt von Schleicher by persuading President Hindenburg that Hitler could be "boxed into a corner" as Chancellor.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-nazis-a-warning-from-history-helped-into-power-chancellor/',
      title:
        '[PRIMARY EVIDENCE] BBC Two: 30 January 1933 – Hitler Appointed Chancellor & The Torchlight Parade',
      duration: '5 mins 45 secs',
      teacher_guidance:
        'Archival footage and eyewitness testimony of Hitler taking the oath as Chancellor of a coalition government, followed by the dramatic SA torchlight procession through the Brandenburg Gate.',
    },
  ],

  // L9: KT3.1 Creation of a Dictatorship, 1933–1934
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/rise-of-the-nazis-the-reichstag-fire-and-the-enabling-act-bbc-two/',
      title:
        '[STARTER HOOK] BBC Two: The Reichstag Fire (27 Feb 1933) & The Enabling Act (24 March 1933)',
      duration: '6 mins 45 secs',
      teacher_guidance:
        'Examines Marinus van der Lubbe, the Emergency Decree for the Protection of People and State suspending civil liberties, and the intimidation of the Reichstag at the Kroll Opera House to pass the Enabling Act.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/rise-of-the-nazis-rise-of-the-dictatorship-bbc-two/',
      title:
        '[ENQUIRY EVIDENCE] BBC Two: The Night of the Long Knives (30 June 1934) & Death of Hindenburg',
      duration: '6 mins 20 secs',
      teacher_guidance:
        'Reconstructs the SS purge of Ernst Röhm and the SA leadership at Bad Wiessee, the elimination of Schleicher and Strasser, and the German Army swearing a personal oath of loyalty to Hitler as Führer.',
    },
  ],

  // L10: KT3.2 The Police State and Religion, 1933–1939
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/rise-of-the-nazis-the-creation-of-the-gestapo-bbc-two/',
      title: '[STARTER HOOK] BBC Two: The SS, The Gestapo & The Nazi Terror Apparatus',
      duration: '6 mins 10 secs',
      teacher_guidance:
        'How Heinrich Himmler unified the SS (Schutzstaffel) and Reinhard Heydrich controlled the Gestapo (Secret State Police), relying on ordinary civilian denunciations rather than mass manpower.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-nazis-a-warning-from-history-chaos-and-consent-political-prisoners-and-concentration-camps/',
      title:
        '[ENQUIRY EVIDENCE] BBC Two: Dachau Concentration Camp (1933) & Nazi Policy on Religion',
      duration: '5 mins 40 secs',
      teacher_guidance:
        'The establishment of Dachau for Communist and political prisoners, the 1933 Reichskonkordat with Pope Pius XI, and the persecution of the Protestant Confessing Church under Pastor Martin Niemöller.',
    },
  ],

  // L11: KT3.3 Controlling and Influencing Attitudes, 1933–1939
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-nazis-a-warning-from-history-chaos-and-consent-hitlers-leadership/',
      title: '[STARTER HOOK] BBC Two: Joseph Goebbels, Propaganda & The "Führer Myth"',
      duration: '5 mins 30 secs',
      teacher_guidance:
        'How the Ministry of Popular Enlightenment and Propaganda used cheap "People\'s Radios" (Volksempfänger), the Reich Press Law, annual Nuremberg rallies, and cinema to cultivate adoration of Hitler.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/great-continental-railway-journeys-nazi-olympic-games-of-1936-bbc-two/',
      title:
        '[ENQUIRY EVIDENCE] BBC Two: The 1936 Berlin Olympic Games & Nazi Propaganda Spectacle',
      duration: '6 mins 0 secs',
      teacher_guidance:
        'Archival analysis of how Hitler used the 1936 Olympics to project a civilized, prosperous image to the world, and how African-American athlete Jesse Owens challenged Nazi racial theories with four gold medals.',
    },
  ],

  // L12: KT3.4 Opposition, Resistance and Conformity, 1933–1939
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/5-opposition-to-hitler-history-file/',
      title:
        '[STARTER HOOK] History File: Youth Resistance – The Edelweiss Pirates & The Swing Youth',
      duration: '19 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–07:45. Explores non-conformist youth groups: working-class Edelweiss Pirates beating up Hitler Youth patrols, and middle-class Swing Youth dancing to banned American jazz.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-nazis-a-warning-from-history-fighting-to-the-end-internal-criticism/',
      title:
        '[ENQUIRY EVIDENCE] BBC Two: Religious & Military Dissent – Niemöller, Bonhoeffer & Galen',
      duration: '5 mins 40 secs',
      teacher_guidance:
        'Examines the courage of Pastor Martin Niemöller, the secret resistance of Dietrich Bonhoeffer, Bishop von Galen’s public sermons against euthanasia (Aktion T4), and the limits of public protest.',
    },
  ],

  // L13: KT4.1 Nazi Policies Towards Women, 1933–1939
  [
    {
      url: 'https://www.youtube.com/watch?v=arCs4X2rko4',
      title: '[STARTER HOOK] The History Teacher: Life for Women: Weimar and Nazi Germany',
      duration: '6 mins 6 secs',
      teacher_guidance:
        'Explain the Nazi slogan "Kinder, Küche, Kirche" and how the Law for the Encouragement of Marriage (1933) and the Mother\'s Cross incentivised high Aryan birth rates.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/2-life-in-hitlers-germany-history-file/',
      title: "[ENQUIRY EVIDENCE] History File: The Mother's Cross, Lebensborn & Women's Exclusion",
      duration: '19 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 05:20–11:30. In-depth examination of the dismissal of female civil servants and doctors, the Ehrenkreuz der Deutschen Mutter (Bronze, Silver, Gold), and the Lebensborn breeding homes.',
    },
  ],

  // L14: KT4.2 Nazi Policies Towards the Young, 1933–1939
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/4-youth-in-hitlers-germany-history-file/',
      title: '[STARTER HOOK] History File: Indoctrination in Schools & The Nazi Curriculum',
      duration: '19 mins 0 secs',
      teacher_guidance:
        "⏱️ Watch Window: 00:00–08:15. How the National Socialist Teachers' League transformed school subjects: rewriting history textbooks, adding racial biology (Rassenkunde), and prioritizing PE.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-the-dark-charisma-of-adolf-hitler-episode-2-german-youth/',
      title: '[PRIMARY ARCHIVE] BBC Two: The Hitler Youth (HJ) & League of German Girls (BDM)',
      duration: '5 mins 30 secs',
      teacher_guidance:
        'Eyewitness accounts of mandatory youth organisations: military drill and weapons training for boys vs gymnastics and preparation for motherhood for girls (1936 compulsory membership law).',
    },
  ],

  // L15: KT4.3 Employment and Living Standards, 1933–1939
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/2-life-in-hitlers-germany-history-file/',
      title: '[STARTER HOOK] History File: The Economic Miracle – The RAD, Autobahns & Rearmament',
      duration: '19 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–06:50. How Hitler tackled unemployment: the National Labour Service (RAD), building the Autobahn network, reintroducing military conscription (1935), and hidden unemployment statistics.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/2-life-in-hitlers-germany-history-file/',
      title:
        '[ENQUIRY EVIDENCE] History File: Workers Under the Nazi Regime – The DAF, KdF & Volkswagen',
      duration: '19 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 07:00–14:00. Banning independent trade unions, creating Robert Ley’s German Labour Front (DAF), the Strength Through Joy (KdF) cruise ships, and the Volkswagen Beetle savings stamp scheme.',
    },
  ],

  // L16: KT4.4 The Persecution of Minorities, 1933–1939
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/3-the-master-race-history-file/',
      title:
        '[STARTER HOOK] History File: Nazi Racial Ideology, The 1933 Boycott & Nuremberg Laws (1935)',
      duration: '19 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–09:15. Traces the escalating legal persecution of German Jews: the April 1933 shop boycott, the Reich Citizenship Law stripping Jews of citizenship, and the Law for the Protection of German Blood.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-nazis-a-warning-from-history-chaos-and-consent-the-night-of-the-broken-glass/',
      title:
        '[PRIMARY ARCHIVE] BBC Two: Kristallnacht – The Night of Broken Glass (9–10 November 1938)',
      duration: '6 mins 45 secs',
      teacher_guidance:
        'The turning point towards physical violence: Goebbels exploiting the assassination of Ernst vom Rath in Paris, SA destruction of synagogues and Jewish businesses, and the 1 billion mark fine imposed on the Jewish community.',
    },
  ],
];

function formatVideoBlock(videoList) {
  let out = '      video: [\n';
  videoList.forEach((v) => {
    out += '        {\n';
    out += `          url: '${v.url}',\n`;
    out += `          title: '${v.title.replace(/'/g, "\\'")}',\n`;
    out += `          duration: '${v.duration}',\n`;
    out += `          teacher_guidance:\n            '${v.teacher_guidance.replace(/'/g, "\\'")}',\n`;
    out += '        },\n';
  });
  out += '      ],';
  return out;
}

// In weimar_nazi_germany/data.js, find all 16 occurrences of `video: [...]` or `video: {...}`
// Regex that matches both arrays and objects
const videoRegex = /video:\s*(\[[\s\S]*?\]|\{[\s\S]*?\})\s*,/g;
const matches = [...content.matchAll(videoRegex)];

if (matches.length !== 16) {
  console.error(`Expected 16 video blocks in Germany, found ${matches.length}`);
  process.exit(1);
}

for (let i = matches.length - 1; i >= 0; i--) {
  const match = matches[i];
  const replacement = formatVideoBlock(vettedVideos[i]);
  content =
    content.slice(0, match.index) + replacement + content.slice(match.index + match[0].length);
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log(
  '🎉 Successfully realigned all 16 lesson video blocks in units/weimar_nazi_germany/data.js!',
);
