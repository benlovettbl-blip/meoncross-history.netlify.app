import fs from 'fs';
import path from 'path';
import https from 'https';

const KT2_4 = {
  "id": "lesson_2_4",
  "title": "KT2.4: How Hitler Became Chancellor, 1932–1933",
  "enquiry": "The Backstairs Intrigue: How did secret political scheming, revenge, and a fatal underestimation rescue a struggling Adolf Hitler and hand him the Chancellorship of Germany?",
  "teacher_notes": {
      "primer": "This lesson details the critical 'backstairs intrigue' that brought Hitler to power, focusing on the collapse of Weimar democracy under Brüning, Papen, and Schleicher, and the fatal miscalculation by the conservative elites who thought they could control him.",
      "objectives": [
          {
              "objective": "Demonstrate precise chronological knowledge of the rapid succession of Weimar Chancellors between 1930 and 1933 (Brüning, von Papen, von Schleicher).",
              "primer": "Ensure students can sequence the Chancellors correctly, as this is vital for narrative exam questions.",
              "question": "What was the correct chronological order of the final three Weimar Chancellors before Hitler?"
          },
          {
              "objective": "Analyse the political scheming (\"backstairs intrigue\") between President Hindenburg, his inner circle, Franz von Papen, and the conservative elites.",
              "primer": "Highlight the role of the 'camarilla' and the industrialists' petition in section 3 and 4.",
              "question": "Why did Franz von Papen secretly meet with Hitler to plot against Kurt von Schleicher?"
          },
          {
              "objective": "Evaluate why Hindenburg finally agreed to appoint Hitler as Chancellor despite his deep personal hatred for him, understanding the fatal miscalculation the elites made.",
              "primer": "Focus on Papen's quote in section 5 to demonstrate the sheer arrogance of the elites.",
              "question": "Why did the elites believe they had trapped Hitler by making him Chancellor?"
          }
      ],
      "source_context": {
          "title": "The Puppet Master?",
          "caption": "A 1933 political cartoon showing Franz von Papen holding Hitler on his shoulders, presenting him to a massive crowd. Papen is whispering instructions into Hitler's ear.",
          "image": "/images/papen_hitler_cartoon.jpg",
          "tasks": [
              "Identify two details in the cartoon that suggest Papen thought he was in control.",
              "Use your own knowledge to explain why this cartoon was published in early 1933."
          ],
          "hinge_question": "Does this cartoon accurately reflect the reality of the balance of power between Hitler and Papen in January 1933, or just what Papen wanted people to believe?"
      }
  },
  "do_now": [
      {
          "question": "How many votes did Hitler win in the 1932 Presidential election against Hindenburg?",
          "answer": "13.4 million votes."
      },
      {
          "question": "What is meant by the historical term 'negative cohesion'?",
          "answer": "Supporting a party because you share the same fears/hatreds (e.g. fear of communism), not necessarily the same beliefs."
      },
      {
          "question": "Who was the Weimar Chancellor from 1930–1932 known bitterly as the 'Hunger Chancellor'?",
          "answer": "Heinrich Brüning."
      },
      {
          "type": "timer",
          "duration": 15,
          "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about how the SA helped the Nazis gain middle-class votes during the Great Depression.",
          "answer": "The SA deliberately fought the communists in the streets, but then marched in disciplined uniforms, making the Nazis look like the only party organised enough to restore order and crush communism, which the middle classes feared."
      }
  ],
  "vocab": [
      {
          "term": "Paul von Hindenburg",
          "def": "The 84-year-old conservative President of the Weimar Republic and former WW1 military hero."
      },
      {
          "term": "The Camarilla",
          "def": "The small, powerful inner circle of advisors who heavily influenced President Hindenburg (including his son, Oskar, and Otto von Meissner)."
      },
      {
          "term": "Franz von Papen",
          "def": "A wealthy, conservative nobleman and Chancellor (1932) who plotted to put Hitler in power so he could control him."
      },
      {
          "term": "Kurt von Schleicher",
          "def": "An influential army general and Chancellor (1932–1933) who warned against a Nazi government but was ultimately betrayed by Papen."
      },
      {
          "term": "Backstairs Intrigue",
          "def": "Secret political deal-making done behind closed doors by a small group of elites, ignoring the democratic process."
      },
      {
          "term": "Cabinet",
          "def": "The committee of senior government ministers who help the Chancellor run the country."
      }
  ],
  "vocab_cloze_text": "By 1932, the ageing President [Paul von Hindenburg] was heavily influenced by a small group of advisors known as [The Camarilla]. After the fall of Brüning, the President appointed the conservative [Franz von Papen] as Chancellor, but he lacked support. Following the brief and disastrous Chancellorship of [Kurt von Schleicher], Papen engaged in [Backstairs Intrigue]—secretly plotting to make Hitler Chancellor. The elites severely underestimated Hitler; they believed that by restricting the number of Nazis in the [Cabinet], they could easily control him.",
  "narrative": [
      {
          "title": "1. The Fall of Brüning and the Death of Democracy (May 1932)",
          "text": "By the spring of 1932, the Weimar Constitution was effectively broken. Chancellor Heinrich Brüning had lost control of the Reichstag and was relying entirely on President Hindenburg to pass laws using **Article 48** (emergency decrees).\n\nIn May 1932, Brüning made two fatal miscalculations. First, to curb street violence, he banned the SA and the SS, which outraged right-wing politicians. Second, he proposed buying up bankrupt country estates from the wealthy elite to house unemployed workers. Hindenburg, himself a wealthy landowner, was furious and viewed this as practically communist. Brüning was forced to resign."
      },
      {
          "title": "2. Franz von Papen and the 'Cabinet of Barons' (July 1932)",
          "text": "Hindenburg was advised by General Kurt von Schleicher to appoint a wealthy, conservative nobleman named **Franz von Papen** as the new Chancellor. Papen’s government was incredibly undemocratic; it was made up entirely of wealthy landowners and industrial elites, earning it the nickname the **'Cabinet of Barons'**.\n\nBecause Papen had almost no support in the Reichstag, he held a general election in **July 1932**, hoping to win a majority. It was a disaster for him, but a triumph for the Nazis. The Nazi Party won **230 seats**, making them the largest single party in the Reichstag. Hitler immediately demanded that Hindenburg make him Chancellor. Hindenburg, who openly despised Hitler (referring to him insultingly as \"that Bohemian corporal\"), flatly refused."
      },
      {
          "title": "3. Advanced Analysis: The November Crisis and Nazi Exhaustion",
          "text": "Refusing to cooperate, the Nazis and Communists used their majority to vote down everything Papen proposed. Paralyzed, Papen convinced Hindenburg to call *another* election in **November 1932**, hoping the voters were getting tired of the Nazis.\n\nPapen was partially right. In November, the Nazi vote dropped to **196 seats**. Furthermore, the Nazis had fought three major election campaigns in one year; party funds were completely exhausted, and Goebbels wrote in his diary of deep despair. The Nazi momentum was breaking.\n\nAt this critical moment, big business intervened. Terrified of a communist takeover, wealthy industrialists (organised by Hjalmar Schacht) sent Hindenburg a formal petition demanding he appoint Hitler as Chancellor to protect their wealth."
      },
      {
          "title": "4. Schleicher's Failure and the 'Backstairs Plot' (Dec 1932 - Jan 1933)",
          "text": "Fearing that keeping Papen in power would cause the SA to start a civil war, Hindenburg sacked Papen and reluctantly made General **Kurt von Schleicher** Chancellor in December 1932.\n\nSchleicher’s time as Chancellor was a complete failure. He had no political support and could not control the Reichstag. Meanwhile, a furious and humiliated Franz von Papen wanted revenge against Schleicher.\n\nPapen began a **'backstairs intrigue'**—secretly meeting with Adolf Hitler, alongside members of Hindenburg's **camarilla** (his son Oskar von Hindenburg and advisor Otto von Meissner). They struck a backroom deal: if Papen could convince the ageing President to make Hitler Chancellor, Hitler would make Papen Vice-Chancellor."
      },
      {
          "title": "5. Advanced Analysis: The Fatal Miscalculation",
          "text": "On **30 January 1933**, President Hindenburg officially appointed Adolf Hitler as Chancellor of Germany.\n\nTo a modern historian, it seems unbelievable that the conservative elites would hand power to a violent extremist. However, they believed they had trapped Hitler in a political cage. Out of a Cabinet of 12 ministers, Hindenburg and Papen allowed **only two other Nazis** (Wilhelm Frick and Hermann Göring); the rest were traditional conservatives.\n\nThe elites severely underestimated Hitler, viewing him as an uneducated political amateur they could easily manipulate to crush the communists. Papen famously boasted to a friend: *\"We have framed him... in two months we will have pushed Hitler into a corner so hard that he'll be squeaking.\"* They believed they were hiring Hitler as their puppet; in reality, they had just handed him the keys to the Republic."
      }
  ],
  "questions": [
      {
          "q": "Which Chancellor was forced to resign in May 1932 after angering President Hindenburg with his land reform proposals?",
          "a": "Heinrich Brüning",
          "distractors": [
              "Franz von Papen",
              "Kurt von Schleicher",
              "Gustav Stresemann"
          ]
      },
      {
          "q": "What drastic action did Brüning take in 1932 that angered right-wing politicians?",
          "a": "He banned the SA and the SS",
          "distractors": [
              "He arrested Adolf Hitler",
              "He banned the Communist Party",
              "He suspended the Weimar Constitution"
          ]
      },
      {
          "q": "What was the name of the small, powerful inner circle of advisors who manipulated the ageing President Hindenburg?",
          "a": "The camarilla",
          "distractors": [
              "The Triumvirate",
              "The Reichswehr",
              "The Freikorps"
          ]
      },
      {
          "q": "Who did Hindenburg appoint as Chancellor immediately after Brüning?",
          "a": "Franz von Papen",
          "distractors": [
              "Kurt von Schleicher",
              "Adolf Hitler",
              "Hermann Müller"
          ]
      },
      {
          "q": "What nickname was given to von Papen's undemocratic government because it was filled with wealthy elites?",
          "a": "The 'Cabinet of Barons'",
          "distractors": [
              "The 'Government of Generals'",
              "The 'Council of Kings'",
              "The 'Dictatorship of the Rich'"
          ]
      },
      {
          "q": "How many seats did the Nazi Party win in the July 1932 elections, making them the largest party?",
          "a": "230 seats",
          "distractors": [
              "196 seats",
              "107 seats",
              "12 seats"
          ]
      },
      {
          "q": "Following the July 1932 elections, what did Hitler immediately demand from Hindenburg?",
          "a": "To be appointed Chancellor",
          "distractors": [
              "To be appointed President",
              "To ban the Communist Party",
              "To be made leader of the army"
          ]
      },
      {
          "q": "What insulting term did President Hindenburg use to describe Adolf Hitler?",
          "a": "A \"Bohemian corporal\"",
          "distractors": [
              "A \"Bavarian peasant\"",
              "An \"Austrian traitor\"",
              "A \"mad dog\""
          ]
      },
      {
          "q": "When Papen called a second election in November 1932, what happened to the Nazi vote?",
          "a": "It dropped to 196 seats, and the party was running out of money",
          "distractors": [
              "It increased to 250 seats, giving them an absolute majority",
              "It stayed exactly the same",
              "It collapsed entirely, leaving them with only 12 seats again"
          ]
      },
      {
          "q": "In November 1932, what did wealthy industrialists (like Hjalmar Schacht) send to Hindenburg?",
          "a": "A formal petition urging him to appoint Hitler as Chancellor",
          "distractors": [
              "A letter demanding he ban the Nazi Party",
              "A threat to move their factories to France",
              "A massive bribe of two million marks"
          ]
      },
      {
          "q": "Which army general warned Hindenburg that keeping Papen in power would lead to a civil war?",
          "a": "Kurt von Schleicher",
          "distractors": [
              "Erich Ludendorff",
              "Wilhelm Keitel",
              "Paul von Lettow-Vorbeck"
          ]
      },
      {
          "q": "In what month and year did von Schleicher become Chancellor?",
          "a": "December 1932",
          "distractors": [
              "May 1932",
              "January 1933",
              "October 1929"
          ]
      },
      {
          "q": "Who plotted revenge against von Schleicher by secretly meeting with Adolf Hitler?",
          "a": "Franz von Papen",
          "distractors": [
              "Heinrich Brüning",
              "Hjalmar Schacht",
              "Oskar von Hindenburg"
          ]
      },
      {
          "q": "What is the historical phrase used to describe the secret deal-making that brought Hitler to power?",
          "a": "Backstairs intrigue",
          "distractors": [
              "The Munich Plot",
              "The November Treason",
              "The Shadow Government"
          ]
      },
      {
          "q": "What position did Franz von Papen demand in the new government in exchange for helping Hitler?",
          "a": "Vice-Chancellor",
          "distractors": [
              "Minister of Defence",
              "Minister of the Interior",
              "President of the Reichstag"
          ]
      },
      {
          "q": "On what exact date did Adolf Hitler officially become Chancellor of Germany?",
          "a": "30 January 1933",
          "distractors": [
              "9 November 1923",
              "27 February 1933",
              "2 August 1934"
          ]
      },
      {
          "q": "How many Nazis were allowed in Hitler's first Cabinet of 12 ministers?",
          "a": "Only three: Hitler, Wilhelm Frick, and Hermann Göring",
          "distractors": [
              "None, except for Hitler",
              "Six (half the cabinet)",
              "All twelve"
          ]
      },
      {
          "q": "Why did Hindenburg and Papen deliberately surround Hitler with conservative ministers?",
          "a": "To control him and use him as a puppet",
          "distractors": [
              "Because the Nazis didn't have enough educated politicians",
              "To appease the British and French governments",
              "Because it was required by the Weimar Constitution"
          ]
      },
      {
          "q": "What famous quote did von Papen say, showing he severely underestimated Hitler?",
          "a": "\"In two months we will have pushed Hitler into a corner so hard that he'll be squeaking\"",
          "distractors": [
              "\"The German people will soon wake up from this nightmare\"",
              "\"He is just a passing storm\"",
              "\"We have hired a clown to run a circus\""
          ]
      },
      {
          "q": "Did Hitler seize the Chancellorship by force, or was he appointed legally?",
          "a": "He was appointed legally / under the rules of the Weimar Constitution",
          "distractors": [
              "He seized it by force in a violent revolution",
              "He rigged the 1932 election to win 100% of the vote",
              "He assassinated President Hindenburg to take his place"
          ]
      }
  ],
  "exam_questions": [
      {
          "type": "how_useful",
          "marks": 8,
          "source": {
              "id": "Source A",
              "content": "A 1933 political cartoon from a socialist newspaper showing Franz von Papen holding Hitler on his shoulders. Papen is whispering into Hitler's ear as if controlling him.",
              "provenance": "Published by a socialist newspaper in early 1933, shortly after Hitler was appointed Chancellor.",
              "provenance_clue": "Consider the MOTIVE of a socialist newspaper. They deeply hated both the wealthy conservatives (like Papen) and the Nazis. Are they mocking Papen for thinking he is in control? Are they warning the public about the dangers of this alliance? Remember, the audience would be left-wing workers who feared this new government."
          },
          "question": "How useful is Source A for an enquiry into the reasons why Hitler was appointed Chancellor in January 1933?"
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

    // Add lesson 2.4
    const existing = db.lessons.findIndex(l => l.id === KT2_4.id);
    if (existing !== -1) {
        db.lessons[existing] = KT2_4;
    } else {
        db.lessons.push(KT2_4);
    }
    
    // Sort lessons by ID
    db.lessons.sort((a,b) => a.id.localeCompare(b.id));

    // Bios to add
    const bios = [
        { name: "Franz von Papen", role: "Chancellor / Vice-Chancellor", desc: "A conservative nobleman who plotted to appoint Hitler as Chancellor, mistakenly believing he could be controlled as a puppet.", search: "Franz_von_Papen" },
        { name: "Kurt von Schleicher", role: "Chancellor / Army General", desc: "An influential general and brief Chancellor whose failure to govern led to von Papen's revenge plot to install Hitler.", search: "Kurt_von_Schleicher" },
        { name: "Hjalmar Schacht", role: "Economist / Banker", desc: "A prominent banker who organised the petition from wealthy industrialists urging Hindenburg to appoint Hitler.", search: "Hjalmar_Schacht" },
        { name: "Wilhelm Frick", role: "Nazi Minister of the Interior", desc: "One of only three Nazis in Hitler's first cabinet; he was crucial in giving the Nazis control over the police.", search: "Wilhelm_Frick" },
        { name: "Hermann Göring", role: "Nazi Minister", desc: "A powerful Nazi and WW1 fighter ace who was one of the three Nazis in the original 1933 cabinet.", search: "Hermann_Göring" }
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
