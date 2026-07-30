import fs from 'fs';
import path from 'path';

const userList = [
  { group: "Key Topic 1", name: "Friedrich Ebert", bio: "Leader of the Social Democratic Party (SPD) who became the first President of the Weimar Republic. He was responsible for declaring the new republic following the Kaiser's abdication, signing the armistice to end the First World War, and negotiating the Ebert-Groener Pact with the army to restore order in Berlin." },
  { group: "Key Topic 1", name: "Prince Max von Baden", bio: "The Kaiser's last Imperial Chancellor. He announced the abdication of Kaiser Wilhelm II in November 1918 and handed over executive chancellorship to Friedrich Ebert to manage a relatively peaceful transition of power and prevent a violent, communist-style revolution." },
  { group: "Key Topic 1", name: "Woodrow Wilson", bio: "President of the United States who formulated the \"Fourteen Points\" after WWI. German citizens expected the Treaty of Versailles to be based on his principles of fair self-determination, making the actual harsh terms of the treaty a shocking betrayal—the dictated peace or *Diktat*." },
  { group: "Key Topic 1", name: "Matthias Erzberger", bio: "Moderate Centre Party politician who headed the German delegation and signed the 1918 Armistice. He was labeled a \"November Criminal\" who stabbed the military in the back (*Dolchstoss*), and was subsequently assassinated by right-wing nationalists in 1921." },
  { group: "Key Topic 1", name: "Walther Rathenau", bio: "The Weimar Foreign Minister who negotiated the Rapallo Treaty. He was assassinated by right-wing nationalists in 1922, illustrating the extreme political violence and instability threatening the early Weimar state." },
  { group: "Key Topic 1", name: "Rosa Luxemburg & Karl Liebknecht", bio: "Leaders of the extreme left-wing Spartacist League. They launched the failed Spartacist Uprising in Berlin in January 1919, attempting to overthrow the government and set up a communist-style state, before being captured and executed by the Freikorps." },
  { group: "Key Topic 1", name: "Wolfgang Kapp", bio: "Right-wing politician who led the failed Kapp Putsch in March 1920. Backed by Freikorps units refusing to disarm, he briefly seized Berlin and forced the Weimar government to flee, but his coup collapsed after a general strike called by Ebert paralyzed the city's infrastructure." },
  { group: "Key Topic 1", name: "Gustav Stresemann", bio: "Appointed Chancellor in August 1923 and Foreign Minister from 1924 to 1929. He was the central figure of Weimar's recovery, introducing the Rentenmark to end hyperinflation, negotiating the Dawes and Young Plans to reduce reparations, securing French withdrawal from the Ruhr, and gaining international acceptance via the Locarno Pact and entry into the League of Nations." },
  { group: "Key Topic 1", name: "Walter Gropius", bio: "Modernist architect who founded the famous Bauhaus design school in Dessau. His work pioneered functionalism in architecture and design, representing the bold experimentation and cultural freedom of Weimar's \"Golden Age\"." },
  { group: "Key Topic 1", name: "Marlene Dietrich", bio: "Famous Weimar actress who starred in the ground-breaking film *The Blue Angel* (1930). She came to represent the \"New Woman\" of the era—independent, glamorous, and challenging traditional gender roles." },
  { group: "Key Topic 1", name: "George Grosz & Otto Dix", bio: "Prominent Expressionist and *Neue Sachlichkeit* (New Objectivity) artists. They used their paintings to depict the harsh social realities of post-war Germany, including war-disabled veterans, poverty, and political hypocrisy, showing the deep societal divisions underneath Weimar's glitz." },
  { group: "Key Topic 1", name: "Dr. Magnus Hirschfeld", bio: "Pioneer of sexual science who founded the Institute for Sexual Science in Berlin. He was a prominent advocate for LGBT rights and sex reform during the socially progressive Weimar years." },

  { group: "Key Topic 2", name: "Adolf Hitler", bio: "A decorated WWI veteran who joined the German Workers' Party (DAP) as a military intelligence agent in 1919. He took control of the party through his powerful public speaking, co-authored the Twenty-Five Point Programme, introduced the swastika, and established the SA to secure his position as absolute leader (*Führer*)." },
  { group: "Key Topic 2", name: "Ernst Röhm", bio: "Co-founder and commander of the Sturmabteilung (SA). A hard-line ex-army officer, he recruited violent paramilitary thugs to protect Nazi meetings and disrupt opposing left-wing assemblies." },
  { group: "Key Topic 2", name: "Hermann Goering", bio: "A highly decorated First World War fighter pilot who joined the Nazi Party in 1922. He brought prestige, military discipline, and upper-class contacts to the early party leadership, and later founded the Gestapo." },
  { group: "Key Topic 2", name: "Julius Streicher", bio: "Extreme anti-Semitic publisher who founded the propaganda newspaper *Der Stürmer* in 1923. He used his platform to spread virulently anti-Jewish conspiracy theories and strengthen support for Hitler's racial ideology." },
  { group: "Key Topic 2", name: "Anton Drexler", bio: "A Munich locksmith who founded the German Workers' Party (DAP) in 1919. He served as Hitler's early political mentor but was gradually pushed aside as Hitler took total control of the renamed NSDAP." },
  { group: "Key Topic 2", name: "Rudolf Hess", bio: "Hitler's devoted private secretary and early party member who was imprisoned with Hitler after the Munich Putsch and helped transcribe *Mein Kampf*." },
  { group: "Key Topic 2", name: "Gregor Strasser", bio: "A powerful northern German Gauleiter who led the socialist-leaning faction of the Nazi Party in the mid-1920s. He challenged Hitler's southern, nationalist wing until Hitler re-established his supreme authority at the Bamberg Conference of 1926." },
  { group: "Key Topic 2", name: "General Erich Ludendorff", bio: "Legendary First World War military commander who marched alongside Hitler during the failed Munich Putsch in November 1923. His participation was intended to win the support of the German army, though he was acquitted at the subsequent trial." },
  { group: "Key Topic 2", name: "Joseph Goebbels", bio: "Appointed head of Nazi propaganda (Gauleiter of Berlin) in 1926. He brilliantly coordinated Nazi election campaigns during the Great Depression, using modern technology (radio, loudspeakers, and aeroplanes for \"Hitler over Germany\" tours) and targeted posters to win over different interest groups." },
  { group: "Key Topic 2", name: "Heinrich Brüning", bio: "Centre Party Chancellor from 1930 to 1932. Nicknamed the \"Hunger Chancellor\" because of his highly unpopular austerity measures (cutting unemployment benefits and raising taxes), he bypassed the Reichstag by ruling through Hindenburg's emergency decrees (Article 48), which destabilized Weimar democracy." },
  { group: "Key Topic 2", name: "Ernst Thälmann", bio: "Leader of the German Communist Party (KPD). He was Hitler's key rival on the extreme left during the elections of the early 1930s, gaining major support among the unemployed and raising middle-class fears of a communist revolution." },
  { group: "Key Topic 2", name: "Paul von Hindenburg", bio: "Celebrated WWI military hero and second President of the Weimar Republic. Though he deeply disliked Hitler (calling him a \"Bohemian corporal\"), he was persuaded by conservative politicians to appoint him as Chancellor in January 1933 to resolve the political deadlock." },
  { group: "Key Topic 2", name: "Franz von Papen", bio: "Conservative politician and former Chancellor. He conspired with Hindenburg's inner circle to oust Schleicher, plotting to make Hitler Chancellor in a coalition cabinet where Papen (as Vice-Chancellor) believed he could control Hitler like a puppet." },
  { group: "Key Topic 2", name: "Kurt von Schleicher", bio: "An influential army general and Chancellor (December 1932–January 1933). He attempted to split the Nazi Party by offering Gregor Strasser a government post, but failed and was replaced by Hitler, before being assassinated during the Night of the Long Knives." },

  { group: "Key Topic 3", name: "Marinus van der Lubbe", bio: "A young Dutch communist arrested, tried, and executed for setting fire to the Reichstag building in February 1933. Hitler used his arrest to claim a massive communist conspiracy, justifying the suspension of civil liberties." },
  { group: "Key Topic 3", name: "Heinrich Himmler", bio: "Head of the SS (Schutzstaffel). He systematically consolidated control over all German police forces, the Gestapo, and the expanding concentration camp system (starting with Dachau in 1933) to build the central apparatus of the police state." },
  { group: "Key Topic 3", name: "Reinhard Heydrich", bio: "Deputy to Himmler and head of the SD (the Nazi Security Service) and Gestapo. He orchestrated a massive network of surveillance, file-keeping, and terror to hunt down and eliminate all political opponents of the regime." },
  { group: "Key Topic 3", name: "Albert Speer", bio: "Hitler's personal architect and close ally. He designed monumental, classical-style Nazi structures (such as the Nuremberg Rally grounds) to project the state's power, permanence, and dominance over the individual." },
  { group: "Key Topic 3", name: "Jesse Owens", bio: "African-American track and field athlete who won 4 gold medals at the 1936 Berlin Olympics. His spectacular athletic success directly contradicted Goebbels' propaganda aims and Nazi racial theories of Aryan supremacy." },
  { group: "Key Topic 3", name: "Martin Niemöller", bio: "A prominent Protestant pastor who supported early right-wing ideals but fiercely opposed the state-controlled Reich Church. He co-founded the Pastors' Emergency League (PEL) and the Confessing Church. He was imprisoned in concentration camps from 1937 to 1945 and is famous for his post-war poem \"First they came...\"." },
  { group: "Key Topic 3", name: "George Elser", bio: "A German carpenter who opposed the Nazi dictatorship on moral grounds. In November 1939, he planned and executed a highly sophisticated solo bomb plot at the Bürgerbräukeller in Munich, narrowly missing assassinating Hitler." },
  { group: "Key Topic 3", name: "Dietrich Bonhoeffer", bio: "Protestant theologian and pastor who actively worked against the Nazi regime's anti-Semitic policies and the Reich Church. He joined the military intelligence (Abwehr) resistance network and was eventually executed for his involvement in plans to overthrow Hitler." },
  { group: "Key Topic 3", name: "Carl von Ossietzky", bio: "Pacifist, journalist, and outspoken anti-Nazi critic who exposed clandestine German rearmament. He was sent to a concentration camp in 1933 and awarded the Nobel Peace Prize in 1935 while imprisoned, causing a diplomatic embarrassment for the regime." },
  { group: "Key Topic 3", name: "August Landmesser", bio: "A shipyard worker famously photographed in 1936 refusing to perform the \"Heil Hitler\" salute during a mass rally, persecuted for his relationship with a Jewish woman under the Nuremberg Laws." },

  { group: "Key Topic 4", name: "Gertrud Scholtz-Klink", bio: "Appointed Reich Women’s Leader (*Reichsfrauenführerin*). Her role was to oversee all Nazi women's organizations and ensure that German women conformed to the domestic ideals of marriage, child-rearing, and motherhood (*Kinder, Küche, Kirche*)." },
  { group: "Key Topic 4", name: "Bernhard Rust", bio: "Reich Minister of Science, Education, and National Culture. He coordinated the radical Nazification of the school curriculum, rewrote textbooks, forced teachers to swear loyalty oaths, and turned schools into instruments of racial and ideological indoctrination." },
  { group: "Key Topic 4", name: "Judith Kerr", bio: "A young Jewish girl who fled Germany with her family in 1933 just before her father, a prominent anti-Nazi critic, was to be arrested. She later detailed her experience as a refugee in her semi-autobiographical book *When Hitler Stole Pink Rabbit*." },
  { group: "Key Topic 4", name: "Anna Lehnkering", bio: "A disabled teenager who struggled in school and was sent to an institution. She was forcibly sterilized by the Nazis at age 19 under the Sterilisation Law and later murdered under the T4 Euthanasia Programme, representing the thousands of victims of Nazi eugenics." },
  { group: "Key Topic 4", name: "Friedrich-Paul von Groszheim", bio: "A young German man arrested and tortured by the Gestapo under Paragraph 175 for being homosexual. He was forcibly sterilized as a condition of his release, illustrating the brutal state-sponsored persecution of social minorities." }
];

async function fetchWikimediaImage(name) {
  try {
    let queryName = name;
    if (name.includes('&')) {
      queryName = name.split('&')[0].trim();
    }
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(queryName)}&prop=pageimages&format=json&pithumbsize=500`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== "-1" && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch (e) {
    console.error(`Failed to fetch for ${name}`, e);
  }
  return null;
}

async function downloadImage(url, filename) {
  const filepath = path.join('public/images/weimar_individuals', filename);
  if (fs.existsSync(filepath)) {
    return `/images/weimar_individuals/${filename}`;
  }
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    console.log(`Downloaded ${filename}`);
    return `/images/weimar_individuals/${filename}`;
  } catch (e) {
    console.error(`Failed to download ${url}`, e);
  }
  return null;
}

async function run() {
  if (!fs.existsSync('public/images/weimar_individuals')) {
    fs.mkdirSync('public/images/weimar_individuals', { recursive: true });
  }

  // Load existing data to preserve any fields if they already exist
  const dataPath = 'weimar_nazi_germany/data.js';
  let content = fs.readFileSync(dataPath, 'utf8');
  let dataObj;
  try {
    dataObj = eval('(function(){ ' + content.replace(/export\s+const\s+unitData\s*=\s*/, 'return ') + '})()');
  } catch (e) {
    console.error("Failed to parse data.js", e);
    process.exit(1);
  }
  const existingKeyIndividuals = dataObj.key_individuals || [];

  for (let i = 0; i < userList.length; i++) {
    const person = userList[i];
    const existing = existingKeyIndividuals.find(p => p.name.includes(person.name) || person.name.includes(p.name));
    
    // Copy any useful existing data
    if (existing) {
      person.role = person.role || existing.role;
      person.image = existing.image || person.image;
    }

    if (!person.image) {
      const imgUrl = await fetchWikimediaImage(person.name);
      if (imgUrl) {
        const safeName = person.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        const filename = `${safeName}.jpg`;
        const localPath = await downloadImage(imgUrl, filename);
        if (localPath) {
          person.image = localPath;
        }
      } else {
        person.image = '';
      }
    }
  }

  // Replace key_individuals array in data.js
  const stringifiedKeyIndividuals = JSON.stringify(userList, null, 8);
  const regex = /"key_individuals":\s*\[[\s\S]*?\n    \]/m;
  const newContent = content.replace(regex, `"key_individuals": ${stringifiedKeyIndividuals.replace(/\n/g, '\n    ')}`);
  
  if (newContent !== content && newContent.includes('key_individuals')) {
    fs.writeFileSync(dataPath, newContent, 'utf8');
    console.log('Successfully updated weimar_nazi_germany/data.js with new key_individuals.');
  } else {
    console.error('Failed to replace key_individuals in data.js');
  }
}

run();
