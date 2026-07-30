import fs from 'fs';
import path from 'path';
import https from 'https';

const KT2_3 = {
  "id": "lesson_2_3",
  "title": "KT2.3: The Growth of Nazi Support, 1929–1932",
  "enquiry": "The shattered Republic: How did the economic earthquake of the Great Depression destroy Weimar democracy and propel Adolf Hitler from the political fringes to the brink of power?",
  "teacher_notes": {
      "primer": "This lesson details the transition of the Nazi party from a fringe group to a major political force due to the Great Depression. It highlights the collapse of democratic governance under Müller and Brüning, the influx of Big Business funding, and the effective use of propaganda and violence (SA) to achieve 'negative cohesion'.",
      "objectives": [
          {
              "objective": "Demonstrate precise knowledge of the economic and social impacts of the 1929 Wall Street Crash on Germany.",
              "primer": "Focus on section 1, detailing the reliance on US loans via the Dawes Plan and the resulting 6 million unemployed.",
              "question": "Why did the Wall Street Crash have a more devastating effect on Germany than on other European nations?"
          },
          {
              "objective": "Analyse the political paralysis of the Weimar Republic, explaining why the collapse of Müller's coalition and Brüning's policies caused voters to flock to extremist parties.",
              "primer": "Use section 2 to explain how Brüning's severe austerity measures earned him the title 'Hunger Chancellor' and drove voters away from democratic parties.",
              "question": "How did Brüning's use of Article 48 undermine public faith in the democratic process of the Weimar Republic?"
          },
          {
              "objective": "Evaluate the reasons for the surge in Nazi support, judging the relative importance of Hitler's personal appeal, Goebbels' propaganda, Big Business funding, and the violence of the SA.",
              "primer": "Examine sections 3, 4, and 5 to show students the multi-faceted approach of the Nazis, especially how fear of communism led to 'negative cohesion'.",
              "question": "To what extent was fear of the Communists (KPD) the most important reason for the surge in Nazi support by 1932?"
          }
      ]
  },
  "do_now": [
      {
          "question": "What was Gustav Stresemann's famous quote warning about the fragility of the German economy during the 'Golden Age'?",
          "answer": "He warned that Germany was 'dancing on a volcano' because its recovery was entirely reliant on short-term American loans."
      },
      {
          "question": "What was the central message of the Führerprinzip (Leadership Principle)?",
          "answer": "The belief that Germany needed a single, strong, undisputed leader (Führer) with absolute power, rather than weak democratic debate."
      },
      {
          "question": "How many seats did the Nazi Party win in the 1928 Reichstag elections, proving they were an electoral failure before the Depression?",
          "answer": "Only 12 seats."
      },
      {
          "type": "timer",
          "duration": 15,
          "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about how Hitler completely reorganised the Nazi Party after he was released from Landsberg Prison.",
          "answer": "He created national headquarters, divided Germany into regions run by Gauleiters, set up the SS as his personal bodyguard, and created the Hitler Youth to target the young."
      }
  ],
  "vocab": [
      {
          "term": "The Wall Street Crash",
          "def": "The catastrophic collapse of the US stock market in October 1929 that triggered a global economic depression."
      },
      {
          "term": "KPD (Communist Party of Germany)",
          "def": "The extreme left-wing party that wanted a Russian-style revolution; their support surged among unemployed workers."
      },
      {
          "term": "Hermann Müller",
          "def": "The Weimar Chancellor whose 'Grand Coalition' collapsed in 1930 because politicians could not agree on how to handle the economic crisis."
      },
      {
          "term": "Heinrich Brüning",
          "def": "The Weimar Chancellor (1930–1932) whose harsh economic policies earned him the nickname the 'Hunger Chancellor'."
      },
      {
          "term": "Article 48",
          "def": "The emergency decree clause in the constitution, heavily overused by President Hindenburg after 1930, bypassing the democratic Reichstag."
      },
      {
          "term": "Negative Cohesion",
          "def": "The idea that people supported the Nazis not because they shared Nazi beliefs, but because they shared the same fears and hatreds (e.g., a shared terror of communism)."
      },
      {
          "term": "Rotfrontkämpferbund (Red Front Fighters' League)",
          "def": "The violent paramilitary wing of the Communist Party."
      }
  ],
  "vocab_cloze_text": "Following the [The Wall Street Crash] in 1929, Germany suffered massive unemployment. The democratic government failed to cope; [Hermann Müller] resigned when his coalition collapsed, and his replacement, [Heinrich Brüning], relied heavily on [Article 48] to pass harsh laws. As unemployment rose, many workers flocked to the [KPD (Communist Party of Germany)], who used their violent [Rotfrontkämpferbund (Red Front Fighters' League)] to fight in the streets. Terrified of a communist revolution, many middle-class Germans began to support the Nazis through [Negative Cohesion]—not because they loved Hitler, but because they shared his hatred of communists.",
  "narrative": [
      {
          "title": "1. The Wall Street Crash and the Economic Earthquake",
          "text": "In October 1929, the US stock market collapsed, triggering the **Wall Street Crash**. Gustav Stresemann’s warning that Germany was \"dancing on a volcano\" became a terrifying reality. Under the Dawes Plan of 1924, the German economy was entirely reliant on American loans. Following the crash, panicked American banks demanded their money back immediately.\n\nThe economic impact on Germany was catastrophic. Without American investment, German factories were forced to shut down. By 1932, unemployment had reached a staggering **6 million** (roughly 40% of the German workforce). Millions were left homeless, relying on soup kitchens and sleeping in parks. Crucially, the middle classes—who had already lost their savings during the 1923 hyperinflation crisis—found themselves facing ruin once again as businesses and banks collapsed."
      },
      {
          "title": "2. The Death of Democracy: Müller and Brüning",
          "text": "As the economic crisis deepened, the Weimar political system completely paralysed. The Chancellor, a Social Democrat named **Hermann Müller**, led a 'Grand Coalition' of moderate parties. However, as unemployment skyrocketed, the politicians bitterly argued over whether to raise taxes or cut unemployment benefits. Unable to agree, Müller resigned in March 1930. This marked the end of truly democratic government in Weimar Germany.\n\nHe was replaced by **Heinrich Brüning**. Because Brüning could not get a majority in the Reichstag, he relied on President Hindenburg to pass laws using **Article 48** (emergency decrees).\n\n**Advanced Analysis: The 'Hunger Chancellor'**\nBrüning’s response to the crisis was disastrous. Fearing a repeat of the 1923 hyperinflation, he refused to print more money. Instead, he raised taxes, slashed government wages, and cut unemployment benefits. This caused immense suffering, earning him the bitter nickname the **'Hunger Chancellor'**. With the moderate government actively making the people poorer and bypassing parliament, desperate Germans began to abandon democracy entirely and vote for extreme parties who promised radical solutions."
      },
      {
          "title": "3. The Communist Threat and Big Business",
          "text": "The first group to benefit from this desperation was the **KPD (Communist Party)**. Unemployed, starving industrial workers flocked to the KPD, which promised to overthrow the wealthy industrialists and share the nation's wealth equally. By 1932, the KPD had gained 100 seats in the Reichstag.\n\nHowever, this surge in communist support terrified the German middle classes, rural farmers, and wealthy business owners. Rich industrialists like **Fritz Thyssen**, the Krupp family, and Bosch were terrified of a Russian-style revolution where their factories would be confiscated. Consequently, they began secretly pouring millions of marks into the Nazi Party, viewing Hitler as their best defence against the Communists. This massive financial backing allowed Joseph Goebbels to fund an unparalleled propaganda campaign."
      },
      {
          "title": "4. The Appeal of Hitler and Nazi Propaganda",
          "text": "Using this new wealth, the Nazis presented themselves as the only political force strong enough to save Germany.\n\n* **The 1932 Presidential Election:** Hitler challenged the ageing Hindenburg for the presidency. Although Hitler lost, he won an astonishing **13.4 million votes**. This campaign catapulted him to national superstar status. He was the first politician to fly by aeroplane to multiple cities in a single day (the *\"Hitler over Germany\"* campaign), giving him the image of a dynamic, energetic saviour.\n* **Targeted Propaganda:** Nazi propaganda was highly sophisticated. If an anti-Semitic poster didn't work in a certain town, they quietly dropped it and used a poster promising higher crop prices for farmers instead. They promised *'Work and Bread'* to the unemployed.\n* **Appealing to Demographics:** They successfully targeted **women** by claiming that voting for the Nazis was the best way to protect traditional family values and save their children from starvation. They targeted **young people** by portraying the Weimar Republic as weak and elderly, and the Nazi movement as exciting and rebellious."
      },
      {
          "title": "5. Advanced Analysis: The SA and Negative Cohesion",
          "text": "The growth of the Nazi Party was not just about brilliant posters; it was deeply rooted in violence and **negative cohesion**.\n\nBy 1932, the SA had grown to 400,000 members. Germany’s streets were erupting into open warfare as the SA fought brutal battles against the communist private army, the *Rotfrontkämpferbund*. Dozens of people were killed in political street fights.\n\nParadoxically, the Nazis used this violence to their advantage. They deliberately started the fights with the communists, but then used their highly disciplined, uniformed SA marches to present themselves to the middle classes as the only party capable of restoring order. Millions of middle-class voters ultimately voted for the Nazis not because they fully supported Hitler’s extreme racial views, but because of *negative cohesion*—they shared Hitler's hatred of the Weimar Republic and his absolute determination to crush the communists."
      }
  ],
  "questions": [
      {
          "q": "In what month and year did the Wall Street Crash occur?",
          "a": "October 1929",
          "distractors": [
              "November 1923",
              "January 1933",
              "August 1924"
          ]
      },
      {
          "q": "Why was Germany's economy hit so hard by the Wall Street Crash?",
          "a": "Because their economy relied heavily on US loans from the Dawes Plan, which American banks suddenly demanded back",
          "distractors": [
              "Because France immediately demanded full payment of all remaining reparations",
              "Because the German government had invested all of its gold reserves in the US stock market",
              "Because all German factories were physically destroyed by the ensuing riots"
          ]
      },
      {
          "q": "By 1932, how many Germans were unemployed?",
          "a": "6 million",
          "distractors": [
              "2 million",
              "1 million",
              "10 million"
          ]
      },
      {
          "q": "Which Weimar Chancellor resigned in March 1930 because his 'Grand Coalition' could not agree on how to handle unemployment benefits?",
          "a": "Hermann Müller",
          "distractors": [
              "Heinrich Brüning",
              "Gustav Stresemann",
              "Franz von Papen"
          ]
      },
      {
          "q": "Who replaced Müller as Chancellor in 1930?",
          "a": "Heinrich Brüning",
          "distractors": [
              "Adolf Hitler",
              "Kurt von Schleicher",
              "Paul von Hindenburg"
          ]
      },
      {
          "q": "What bitter nickname was given to Chancellor Brüning by the German public?",
          "a": "The 'Hunger Chancellor'",
          "distractors": [
              "The 'Iron Chancellor'",
              "The 'November Criminal'",
              "The 'Dictator'"
          ]
      },
      {
          "q": "Why did the public give Brüning this nickname?",
          "a": "Because he raised taxes and cut government wages and unemployment benefits",
          "distractors": [
              "Because he deliberately starved communist prisoners",
              "Because he gave all of Germany's food away to France as reparations",
              "Because he refused to import food from America"
          ]
      },
      {
          "q": "Which constitutional clause did Brüning and President Hindenburg use to bypass the Reichstag and rule by decree?",
          "a": "Article 48",
          "distractors": [
              "Article 231",
              "The Enabling Act",
              "The Dawes Plan"
          ]
      },
      {
          "q": "Which extreme left-wing party saw a surge in support from unemployed workers during the Depression?",
          "a": "The KPD / Communist Party",
          "distractors": [
              "The SPD / Social Democrats",
              "The NSDAP / Nazi Party",
              "The Centre Party"
          ]
      },
      {
          "q": "Why did wealthy industrialists like Fritz Thyssen and Krupp start giving massive financial backing to the Nazi Party?",
          "a": "They were terrified of a Communist takeover where their wealth and factories would be confiscated",
          "distractors": [
              "They strongly believed in Hitler's anti-Semitic policies",
              "Hitler promised to give them free government land",
              "They wanted to provoke another war with France to boost weapons sales"
          ]
      },
      {
          "q": "Who did Hitler run against in the 1932 Presidential Election?",
          "a": "Paul von Hindenburg",
          "distractors": [
              "Ernst Thälmann",
              "Hermann Müller",
              "Heinrich Brüning"
          ]
      },
      {
          "q": "Although he lost, roughly how many votes did Hitler secure in the 1932 Presidential Election?",
          "a": "13.4 million votes",
          "distractors": [
              "5 million votes",
              "2 million votes",
              "20 million votes"
          ]
      },
      {
          "q": "What was the name of the innovative propaganda campaign where Hitler travelled the country by aeroplane?",
          "a": "The 'Hitler over Germany' campaign",
          "distractors": [
              "The 'Flight of the Führer' campaign",
              "The 'Skies of the Reich' campaign",
              "The 'Eagle of Germany' campaign"
          ]
      },
      {
          "q": "What simple, powerful three-word slogan did the Nazis use to appeal to starving, unemployed workers?",
          "a": "'Work and Bread'",
          "distractors": [
              "'Blood and Iron'",
              "'Peace and Prosperity'",
              "'Freedom and Glory'"
          ]
      },
      {
          "q": "How did Nazi propaganda specifically appeal to women voters?",
          "a": "By claiming the Nazis would protect traditional family values and save their children from starvation",
          "distractors": [
              "By promising women equal pay and advanced career opportunities",
              "By promising to build more universities for women",
              "By giving women the right to vote for the first time"
          ]
      },
      {
          "q": "How many members did the SA (Brownshirts) have by 1932?",
          "a": "400,000",
          "distractors": [
              "100,000",
              "2 million",
              "1 million"
          ]
      },
      {
          "q": "What was the name of the violent paramilitary wing of the Communist Party that fought the SA in the streets?",
          "a": "The Rotfrontkämpferbund / Red Front Fighters' League",
          "distractors": [
              "The Freikorps",
              "The Stosstrupp",
              "The SS"
          ]
      },
      {
          "q": "Why did the violent street brawls actually help the Nazis win middle-class votes?",
          "a": "The disciplined SA marches made the Nazis look like the only force organised and strong enough to crush the communists and restore order",
          "distractors": [
              "Because the middle classes enjoyed watching the violence on the streets",
              "Because the SA successfully assassinated all communist leaders",
              "Because the police openly joined the SA in every brawl"
          ]
      },
      {
          "q": "What is the historical term for people supporting a political party because they share the same fears and hatreds, rather than identical beliefs?",
          "a": "Negative Cohesion",
          "distractors": [
              "Positive Reinforcement",
              "Mutual Alliance",
              "The Führerprinzip"
          ]
      },
      {
          "q": "How did the Nazis adapt their propaganda at a local level to maximise votes?",
          "a": "They dropped messages that didn't work in specific towns and heavily pushed messages that local people wanted to hear",
          "distractors": [
              "They only spoke about anti-Semitism everywhere they went",
              "They refused to change their message and demanded people agree with them",
              "They completely ignored rural areas and only focused on large cities"
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

    // Add lesson 2.3
    const existing = db.lessons.findIndex(l => l.id === KT2_3.id);
    if (existing !== -1) {
        db.lessons[existing] = KT2_3;
    } else {
        db.lessons.push(KT2_3);
    }
    
    // Sort lessons by ID just in case
    db.lessons.sort((a,b) => a.id.localeCompare(b.id));

    // Bios to add
    const bios = [
        { name: "Hermann Müller", role: "Weimar Chancellor", desc: "The SPD Chancellor whose 'Grand Coalition' collapsed in 1930 over unemployment benefits.", search: "Hermann_Müller_(politician)" },
        { name: "Heinrich Brüning", role: "Weimar Chancellor", desc: "Known as the 'Hunger Chancellor' for his harsh austerity measures during the Great Depression.", search: "Heinrich_Brüning" },
        { name: "Fritz Thyssen", role: "Wealthy Industrialist", desc: "A wealthy German businessman who financially backed the Nazi Party out of fear of communism.", search: "Fritz_Thyssen" }
    ];

    if (!db.key_individuals) db.key_individuals = [];
    
    for (let bio of bios) {
        if (!db.key_individuals.find(k => k.name === bio.name)) {
            const url = await fetchWikiImage(bio.search);
            const safeName = bio.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
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
