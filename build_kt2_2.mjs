import fs from 'fs';
import path from 'path';
import https from 'https';

const KT2_2 = {
  "id": "lesson_2_2",
  "title": "KT2.2: The Munich Putsch and the Lean Years, 1923–1929",
  "enquiry": "A spectacular failure or a political masterstroke: How did Hitler use the disaster of the Munich Putsch to completely rebuild the Nazi Party during its 'lean years'?",
  "teacher_notes": {
      "primer": "This lesson explores the dramatic failure of the Munich Putsch, Hitler's tactical pivot during his imprisonment at Landsberg where he wrote Mein Kampf, and the fundamental restructuring of the Nazi party from a revolutionary militia into a national political machine.",
      "objectives": [
          {
              "objective": "Demonstrate precise knowledge of the short-term and long-term causes, events, and immediate consequences of the 1923 Munich Putsch.",
              "primer": "Walk students through the chaos of 1923 (Ruhr invasion, hyperinflation) that made Hitler feel the time was right in sections 1 and 2.",
              "question": "Why did Hitler believe November 1923 was the perfect moment to launch a revolution against the Weimar government?"
          },
          {
              "objective": "Analyse how Hitler used his time in prison to write Mein Kampf and fundamentally change the strategy and structure of the Nazi Party.",
              "primer": "Use section 3 and 4 to explain Hitler's shift to the 'legal route' and the core ideologies of Mein Kampf (Aryan supremacy, Lebensraum).",
              "question": "What was the most important strategic lesson Hitler learned from the failure of the Munich Putsch?"
          },
          {
              "objective": "Evaluate why the Nazi Party struggled to win electoral support between 1924 and 1928, despite their highly effective internal reorganisation.",
              "primer": "Focus on section 6 to explain the impact of the 'Golden Age' and Gustav Stresemann in neutralizing the appeal of extreme parties.",
              "question": "Why did the Nazi Party win only 12 seats in the 1928 elections despite having over 100,000 disciplined members?"
          }
      ]
  },
  "do_now": [
      {
          "question": "What was the name of the elite, highly trusted unit selected from the SA to act as Hitler's personal bodyguard in 1923?",
          "answer": "The Stosstrupp (Shock Troop)."
      },
      {
          "question": "What does the German word 'Putsch' mean?",
          "answer": "A violent attempt to overthrow a government or seize political power."
      },
      {
          "question": "Who was the Chancellor of Germany in late 1923 who called off passive resistance in the Ruhr?",
          "answer": "Gustav Stresemann."
      },
      {
          "type": "timer",
          "duration": 15,
          "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about how hyperinflation created 'winners' and 'losers' in German society.",
          "answer": "Winners included those with debts (which became worthless) and businessmen who took out loans to buy businesses. Losers included anyone with savings, fixed incomes, or pensions, as their money became completely worthless."
      }
  ],
  "vocab": [
      {
          "term": "The Bavarian Triumvirate",
          "def": "The three men who ruled the region of Bavaria in 1923: Gustav von Kahr, Otto von Lossow, and Hans von Seisser."
      },
      {
          "term": "Treason",
          "def": "The crime of betraying one's country or attempting to overthrow the government."
      },
      {
          "term": "Landsberg Prison",
          "def": "The castle fortress where Hitler was imprisoned after the Munich Putsch."
      },
      {
          "term": "Mein Kampf ('My Struggle')",
          "def": "Hitler's autobiography and political manifesto, dictated while he was in prison."
      },
      {
          "term": "Führerprinzip (The Leadership Principle)",
          "def": "The core Nazi belief that the party (and later Germany) must be run by one dictator with absolute, unquestionable power."
      },
      {
          "term": "Gauleiter",
          "def": "A regional leader of the Nazi Party, appointed by Hitler to run a specific local area (a Gau) of Germany."
      },
      {
          "term": "SS (Schutzstaffel)",
          "def": "A ruthless and fiercely loyal private bodyguard unit created in 1925, completely separate from the SA."
      },
      {
          "term": "Aryan",
          "def": "The Nazi term for what they considered the 'master race' of Germanic/Nordic peoples."
      }
  ],
  "vocab_cloze_text": "In 1923, Hitler attempted to overthrow the government with the help of [The Bavarian Triumvirate], but it failed and he was charged with [Treason]. While serving a lenient sentence in [Landsberg Prison], he dictated his manifesto, [Mein Kampf ('My Struggle')], which outlined his belief in the supremacy of the [Aryan] race and the need for absolute dictatorship through the [Führerprinzip (The Leadership Principle)]. Realising he needed a new political machine, Hitler appointed regional leaders called [Gauleiter] to organise the party, and later created the elite, black-uniformed [SS (Schutzstaffel)] as his fiercely loyal personal bodyguard.",
  "narrative": [
      {
          "title": "1. The Causes of the Munich Putsch (November 1923)",
          "text": "By November 1923, the Weimar Republic appeared to be collapsing. French troops were occupying the Ruhr, hyperinflation had destroyed the currency, and the democratic government in Berlin looked entirely powerless.\n\nHitler believed the time was right to strike, heavily inspired by the Italian fascist leader Benito Mussolini, who had successfully marched on Rome and seized power the year before. In Bavaria, the local right-wing government—led by the **Triumvirate** of Gustav von Kahr (Bavarian Prime Minister), Otto von Lossow (head of the Bavarian army), and Hans von Seisser (head of the Bavarian police)—was also actively plotting against the Weimar government. Hitler intended to hijack their plot, use their authority to take control of Munich, and then march his SA stormtroopers to Berlin to tear down the Republic."
      },
      {
          "title": "2. The Events of the Putsch",
          "text": "On the evening of **8 November 1923**, the Bavarian Triumvirate were speaking at a meeting in the Bürgerbräukeller (a large beer hall) in Munich. Hitler, backed by 600 armed SA members, burst through the doors. He fired a gunshot into the ceiling and declared a national revolution. At gunpoint, he forced Kahr, Lossow, and Seisser into a back room and made them swear loyalty to his uprising. Crucially, Hitler also had the backing of **General Erich Ludendorff**, a highly respected First World War military hero.\n\nHowever, the Putsch quickly unravelled. Hitler made a fatal error by leaving the beer hall to deal with a crisis elsewhere, allowing Ludendorff to let the Triumvirate go home. Once free, Kahr and Lossow immediately broke their promises and contacted the regular army and police to stop the Nazis.\n\nOn **9 November**, Hitler and Ludendorff marched 2,000 Nazis into the centre of Munich. They were met by armed police. A brief, bloody firefight broke out. Fourteen Nazis and four policemen were killed. Hitler dislocated his shoulder, fled the scene, and was arrested two days later hiding in a wardrobe."
      },
      {
          "title": "3. Advanced Analysis: Turning Disaster into Victory",
          "text": "On the surface, the Putsch was a humiliating failure. The Nazi Party was banned, and Hitler was put on trial for high treason. However, Hitler turned his trial into a political masterstroke.\n\nThe trial gave Hitler national media coverage for the very first time. He used the courtroom as a theatrical stage, delivering passionate speeches arguing that he wasn't a traitor, but a patriot trying to save Germany from the \"treasonous 'November Criminals'\". The Weimar judiciary (judges) were traditionally very right-wing and sympathised with his hatred of the Republic. Instead of the death penalty (the standard punishment for treason), Hitler was given a remarkably lenient sentence of just five years in **Landsberg Prison**.\n\nIn reality, he served only **nine months** in comfortable conditions. He spent this time dictating his manifesto, ***Mein Kampf*** **(My Struggle)**. This book laid out his core beliefs, which would become the blueprint for Nazi Germany:\n\n* **Race:** The belief that the Germanic **Aryan** race was superior and destined to rule, while Jewish people were part of a global conspiracy plotting to weaken Germany.\n* **Lebensraum (Living Space):** The necessity of expanding Germany's borders into Eastern Europe and Russia to gain land and resources.\n* **Totalitarianism:** The destruction of democracy in favour of the **Führerprinzip** (the total authority of a single leader)."
      },
      {
          "title": "4. The Wilderness / Lean Years (1924–1928)",
          "text": "While in prison, Hitler realised a crucial lesson: the Nazis could no longer try to seize power by force. They had to destroy democracy from the inside by winning elections—what he called the **\"legal route\"** to power: *\"We shall have to hold our noses and enter the Reichstag.\"*\n\nUpon his release in December 1924, the ban on the Nazi Party was lifted, and Hitler set about drastically reorganising the political machine:\n\n* **National Structure:** He divided Germany into 35 local regions (*Gaue*), appointing a loyal **Gauleiter** to run each one and drive local recruitment.\n* **The SS:** Because the SA was too rowdy and heavily loyal to Ernst Röhm, Hitler created the **SS (Schutzstaffel)** in 1925. Run by **Heinrich Himmler**, they wore black uniforms and acted as Hitler's fiercely loyal, elite personal bodyguards.\n* **Targeting the Youth:** In 1926, the party officially formed the **Hitler Youth** (*Hitlerjugend*) to indoctrinate young boys, alongside the Nazi Women's League."
      },
      {
          "title": "5. Advanced Analysis: The Bamberg Conference (1926)",
          "text": "As the party expanded nationally, a dangerous split emerged. The northern Gauleiters (like Gregor Strasser and Joseph Goebbels) wanted to focus heavily on the 'Socialist' parts of the 25-Point Programme to win over poor industrial workers. The southern Gauleiters wanted to focus on the 'Nationalist' parts to win over wealthy businessmen and the army.\n\nTo prevent the party from fracturing, Hitler called the **Bamberg Conference** in 1926. He ruthlessly crushed the socialist wing of the party, asserting his absolute authority. Recognising talent, Hitler cleverly won over **Joseph Goebbels**, promoting him to Gauleiter of Berlin. Strasser was sidelined, and Hitler’s total ideological dominance was secured."
      },
      {
          "title": "6. Shifting Propaganda and Electoral Failure",
          "text": "Despite having over 100,000 highly disciplined members by 1928, the Nazis were an electoral failure, winning just 12 seats (2.6% of the vote) in the 1928 Reichstag elections.\n\nThe primary reason for this failure was Gustav Stresemann. The Weimar Republic was experiencing an economic 'Golden Age'. Hyperinflation was over, American Dawes Plan loans were flowing in, and in 1925, the German people had elected the conservative war hero Paul von Hindenburg as President. With the country feeling stable and proud, voters simply ignored the extreme politics of the Nazi Party.\n\nHowever, the Nazis were highly adaptable. Realising that industrial workers were voting for the Communists or Social Democrats, the Nazis shifted their propaganda. They began heavily targeting **farmers** (who were suffering from plummeting food prices) and the **lower-middle classes** (the *Mittelstand*, who had never recovered from hyperinflation). While they failed to win power in 1928, the Nazis had built a highly organised, national political machine just waiting for the next major crisis to strike."
      }
  ],
  "questions": [
      {
          "q": "In what month and year did the Munich Putsch take place?",
          "a": "November 1923",
          "distractors": [
              "January 1919",
              "August 1924",
              "October 1929"
          ]
      },
      {
          "q": "Name the three men who made up the 'Bavarian Triumvirate' that Hitler tried to hijack.",
          "a": "Gustav von Kahr, Otto von Lossow, Hans von Seisser",
          "distractors": [
              "Erich Ludendorff, Paul von Hindenburg, Wilhelm Groener",
              "Friedrich Ebert, Philipp Scheidemann, Matthias Erzberger",
              "Ernst Röhm, Hermann Göring, Heinrich Himmler"
          ]
      },
      {
          "q": "Which famous First World War general supported Hitler during the Munich Putsch?",
          "a": "General Erich Ludendorff",
          "distractors": [
              "General Paul von Hindenburg",
              "General Wilhelm Groener",
              "General Walther von Lüttwitz"
          ]
      },
      {
          "q": "How many Nazis were killed in the firefight with the police during the Putsch?",
          "a": "14",
          "distractors": [
              "2",
              "100",
              "600"
          ]
      },
      {
          "q": "What serious criminal charge was Hitler put on trial for in early 1924?",
          "a": "High Treason",
          "distractors": [
              "Murder",
              "Theft of government property",
              "Terrorism"
          ]
      },
      {
          "q": "Why did Hitler receive such a lenient sentence (5 years) at his trial?",
          "a": "The Weimar judges were right-wing and sympathised with his nationalist, anti-Weimar views",
          "distractors": [
              "He successfully convinced the jury he wasn't there",
              "He bribed the judges with money stolen from the beer hall",
              "The judges were terrified of the SA storming the courtroom"
          ]
      },
      {
          "q": "How long did Hitler actually spend in Landsberg Prison?",
          "a": "Nine months",
          "distractors": [
              "Five years",
              "Two weeks",
              "Three years"
          ]
      },
      {
          "q": "What was the title of the book Hitler dictated while in prison?",
          "a": "Mein Kampf / My Struggle",
          "distractors": [
              "Das Kapital",
              "The 25-Point Programme",
              "Triumph of the Will"
          ]
      },
      {
          "q": "What specific Nazi term was used in Hitler's book to describe the 'master race' of Germanic peoples?",
          "a": "Aryan",
          "distractors": [
              "Nordic",
              "Prussian",
              "Teutonic"
          ]
      },
      {
          "q": "What does the term 'Lebensraum' mean, as outlined in Mein Kampf?",
          "a": "Living space - the need to expand Germany's borders into Eastern Europe",
          "distractors": [
              "Master race - the need to purify German blood",
              "Living standards - the need to improve factory conditions",
              "Breathing room - the need to eliminate the Treaty of Versailles"
          ]
      },
      {
          "q": "What major strategic lesson did Hitler learn from the failure of the Munich Putsch?",
          "a": "That the Nazis had to win power legally through elections, not through violent revolution",
          "distractors": [
              "That the SA was too weak and needed to be replaced immediately",
              "That they should have attacked Berlin first instead of Munich",
              "That Ludendorff was a traitor who should be assassinated"
          ]
      },
      {
          "q": "What title was given to the local Nazi Party leaders appointed by Hitler to run the 35 regions (Gaue) of Germany?",
          "a": "Gauleiters",
          "distractors": [
              "Sturmbannführers",
              "Reichsleiters",
              "Burgermeisters"
          ]
      },
      {
          "q": "What was the 'Führerprinzip'?",
          "a": "The Leadership Principle: the idea that the party must be run by one absolute dictator",
          "distractors": [
              "The Fighting Principle: the idea that violence is necessary for political change",
              "The Freedom Principle: the idea that all Germans should be equal",
              "The Future Principle: the idea that children are the key to the Reich"
          ]
      },
      {
          "q": "In what year did Hitler establish the SS (Schutzstaffel)?",
          "a": "1925",
          "distractors": [
              "1923",
              "1933",
              "1928"
          ]
      },
      {
          "q": "Why did Hitler create the SS when he already had the SA?",
          "a": "He needed an elite bodyguard that was unquestionably loyal only to him, unlike the SA which was loyal to Ernst Röhm",
          "distractors": [
              "Because the SA had all been arrested after the Munich Putsch",
              "Because the SA were seen as too weak and cowardly",
              "Because the SA was disbanded under the terms of the Dawes Plan"
          ]
      },
      {
          "q": "Who was the ruthless leader who eventually took command of the SS?",
          "a": "Heinrich Himmler",
          "distractors": [
              "Ernst Röhm",
              "Hermann Göring",
              "Joseph Goebbels"
          ]
      },
      {
          "q": "In what year was the Bamberg Conference held?",
          "a": "1926",
          "distractors": [
              "1924",
              "1929",
              "1933"
          ]
      },
      {
          "q": "Which key figure did Hitler successfully win over from the 'socialist' wing at the Bamberg Conference?",
          "a": "Joseph Goebbels",
          "distractors": [
              "Gregor Strasser",
              "Ernst Röhm",
              "Heinrich Himmler"
          ]
      },
      {
          "q": "How many seats did the Nazi Party win in the 1928 Reichstag elections?",
          "a": "12 seats",
          "distractors": [
              "32 seats",
              "107 seats",
              "230 seats"
          ]
      },
      {
          "q": "Which two groups in society did the Nazis shift their propaganda to target in the late 1920s when they failed to win over industrial workers?",
          "a": "Farmers and the lower-middle classes / Mittelstand",
          "distractors": [
              "Aristocrats and the army",
              "Women and children",
              "Big business owners and bankers"
          ]
      }
  ]
};

const DUMMY_DB = "./weimar_nazi_germany/data.js";

async function fetchWikiImage(query) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=500`;
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const pages = parsed.query.pages;
                    const firstPageId = Object.keys(pages)[0];
                    if (firstPageId !== "-1" && pages[firstPageId].thumbnail) {
                        resolve(pages[firstPageId].thumbnail.source);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function run() {
    let raw = fs.readFileSync(DUMMY_DB, 'utf-8');
    raw = raw.replace("export const unitData =", "global.unitData =");
    eval(raw);
    const db = global.unitData;

    // Add lesson 2.2
    const existing = db.lessons.findIndex(l => l.id === KT2_2.id);
    if (existing !== -1) {
        db.lessons[existing] = KT2_2;
    } else {
        db.lessons.push(KT2_2);
    }
    
    // Sort lessons by ID
    db.lessons.sort((a,b) => a.id.localeCompare(b.id));

    // Bios to add
    const bios = [
        { name: "Gustav von Kahr", role: "Bavarian Prime Minister", desc: "A right-wing politician who led the Bavarian government in 1923. He plotted against the Weimar Republic but betrayed Hitler during the Munich Putsch.", search: "Gustav_Ritter_von_Kahr" },
        { name: "Erich Ludendorff", role: "WWI General", desc: "A highly respected military commander from the First World War who supported Hitler's Munich Putsch but accidentally let the Triumvirate escape.", search: "Erich_Ludendorff" },
        { name: "Heinrich Himmler", role: "Leader of the SS", desc: "The ruthless leader appointed by Hitler to command the SS (Schutzstaffel), his loyal elite bodyguard.", search: "Heinrich_Himmler" },
        { name: "Ernst Röhm", role: "Leader of the SA", desc: "A founding member of the Nazi Party and the powerful leader of the SA (Sturmabteilung), whose rowdiness worried Hitler.", search: "Ernst_Röhm" },
        { name: "Gregor Strasser", role: "Nazi Gauleiter", desc: "A prominent Nazi who led the socialist wing of the party in northern Germany. He was sidelined by Hitler at the Bamberg Conference.", search: "Gregor_Strasser" }
    ];

    if (!db.key_individuals) db.key_individuals = [];
    
    for (let bio of bios) {
        if (!db.key_individuals.find(k => k.name === bio.name)) {
            const url = await fetchWikiImage(bio.search);
            const safeName = bio.name.toLowerCase().replace(/[^a-z0-9ßöüä]/gi, '_');
            const destPath = `/images/${safeName}.jpg`;
            if (url) {
                await downloadImage(url, `./public/images/${safeName}.jpg`);
            }
            db.key_individuals.push({
                name: bio.name,
                role: bio.role,
                description: bio.desc,
                image: destPath
            });
            console.log("Added key individual:", bio.name);
        }
    }

    // Now convert back to module format
    const outStr = "export const unitData = " + JSON.stringify(db, null, 4) + ";\n";
    fs.writeFileSync(DUMMY_DB, outStr);
    console.log("Updated data.js");
}

run();
