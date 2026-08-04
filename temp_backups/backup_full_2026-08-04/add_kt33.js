const fs = require('fs');

const dataPath = 'weimar_nazi_germany/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

// Parse the existing data to safely manipulate it
let dataObj;
try {
  dataObj = eval('(function(){ ' + content.replace(/export const (unitData) =/, 'return') + '; })()');
} catch (e) {
  console.error("Failed to parse data.js", e);
  process.exit(1);
}

const lesson33 = {
    "id": "lesson_3_3",
    "title": "Key Topic 3.3: Controlling and Influencing Attitudes, 1933–1939",
    "enquiry": "The war for the German mind: How did Joseph Goebbels use censorship, mass propaganda, and the arts to brainwash an entire nation?",
    "teacher_notes": {
        "primer": "This lesson details the cultural and psychological takeover of Germany via censorship, propaganda, and the manipulation of the arts. It includes elite-level details such as the Eher Verlag monopoly, communal listening via loudspeakers, the Degenerate Art exhibition in Munich, and the domestic triumph of the 1936 Olympics.",
        "objectives": [
            {
                "objective": "Demonstrate precise knowledge of the methods Goebbels used to censor the press, literature, and radio.",
                "primer": "Highlight the structural methods of censorship, specifically the Editor's Law and the Eher Verlag's buyouts.",
                "question": "How did the Editor's Law of 1933 effectively force newspaper editors to censor themselves?"
            },
            {
                "objective": "Analyse how the Nazis utilised mass rallies, the 1936 Berlin Olympics, and cheap technology (like the Volksempfänger) as tools of indoctrination.",
                "primer": "Discuss the dual nature of the Olympics: an international embarrassment due to Jesse Owens, but a domestic triumph due to Germany's 33 gold medals.",
                "question": "Why could the 1936 Berlin Olympics be considered a massive propaganda success for the domestic German audience?"
            },
            {
                "objective": "Evaluate the ways in which the Nazis crushed independent thought by controlling art, architecture, and music through the Reich Chamber of Culture.",
                "primer": "Ensure students understand the function of the Reich Chamber of Culture and the specific concept of 'Degenerate Art'.",
                "question": "What was the specific purpose of the 1937 'Degenerate Art Exhibition' in Munich?"
            }
        ]
    },
    "learning_objectives": [
        {
            "objective": "Demonstrate precise knowledge of the methods Goebbels used to censor the press, literature, and radio.",
            "primer": "Highlight the structural methods of censorship, specifically the Editor's Law and the Eher Verlag's buyouts.",
            "question": "How did the Editor's Law of 1933 effectively force newspaper editors to censor themselves?"
        },
        {
            "objective": "Analyse how the Nazis utilised mass rallies, the 1936 Berlin Olympics, and cheap technology (like the Volksempfänger) as tools of indoctrination.",
            "primer": "Discuss the dual nature of the Olympics: an international embarrassment due to Jesse Owens, but a domestic triumph due to Germany's 33 gold medals.",
            "question": "Why could the 1936 Berlin Olympics be considered a massive propaganda success for the domestic German audience?"
        },
        {
            "objective": "Evaluate the ways in which the Nazis crushed independent thought by controlling art, architecture, and music through the Reich Chamber of Culture.",
            "primer": "Ensure students understand the function of the Reich Chamber of Culture and the specific concept of 'Degenerate Art'.",
            "question": "What was the specific purpose of the 1937 'Degenerate Art Exhibition' in Munich?"
        }
    ],
    "do_now": {
        "type": "retrieval",
        "items": [
            {
                "question": "What was the name of the government department set up in 1935 to weaken the power of Christianity?",
                "answer": "The Ministry of Church Affairs."
            },
            {
                "question": "What is meant by the German term Schutzhaft (Protective Custody)?",
                "answer": "A Nazi legal loophole allowing the Gestapo to imprison anyone indefinitely without trial."
            },
            {
                "question": "Who was the brutal judge placed in charge of the People's Court?",
                "answer": "Roland Freisler."
            },
            {
                "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about the difference between the SS, the SD, and the Gestapo.",
                "answer": "The SS were the main paramilitary bodyguards who ran the police and camps; the SD were the intelligence wing who kept index cards; the Gestapo were the non-uniformed secret police who arrested people."
            }
        ]
    },
    "vocab": [
        { "term": "Censorship", "definition": "The government banning or hiding information, preventing the public from seeing anything critical of the regime." },
        { "term": "Propaganda", "definition": "Spreading highly biased, one-sided information to manipulate how people think and behave." },
        { "term": "Ministry of Public Enlightenment and Propaganda", "definition": "The government department created in 1933, led by Dr Joseph Goebbels, to control the media." },
        { "term": "Volksempfänger (People’s Receiver)", "definition": "A cheap, mass-produced radio designed so that ordinary Germans could afford to listen to Hitler's speeches." },
        { "term": "Reich Chamber of Culture", "definition": "A state-run organisation that controlled all the arts; you could not work as an artist or musician unless you were a member." },
        { "term": "Entartete Kunst (Degenerate Art)", "definition": "The Nazi term for modern, abstract, or expressionist art, which they banned for being 'un-German'." }
    ],
    "narrative_blocks": [
        {
            "text": "**1. Goebbels and the Ministry of Propaganda**\nIn March 1933, Hitler appointed [Key Individual: Joseph Goebbels] as the Minister of Public Enlightenment and Propaganda. Goebbels was a mastermind of psychological manipulation. He understood that for propaganda to work, it had to be inescapable but often subtle. His goal was the *Gleichschaltung* (coordination) of the German mind—ensuring that every time a citizen opened a newspaper, turned on the radio, or went to the cinema, they absorbed the Nazi message."
        },
        {
            "text": "**2. Censorship: Crushing the Truth**\nGoebbels systematically destroyed free speech in Germany to ensure no one could hear anti-Nazi viewpoints:\n\n* **The Press:** In October 1933, Goebbels passed the ***Schriftleitergesetz* (Editor’s Law)**, making newspaper editors legally responsible for what was printed, effectively forcing them to censor themselves. Furthermore, the official Nazi publishing house, the **Eher Verlag**, systematically bought up independent newspapers. By 1939, the Nazis directly owned or controlled 82% of all newspapers in Germany.\n* **Literature:** In May 1933, Goebbels organised massive \"Book Burnings\" across Germany. Brainwashed university students threw over 20,000 books written by Jews, communists, and pacifists (like Albert Einstein and Karl Marx) into massive bonfires in Berlin."
        },
        {
            "text": "**3. Propaganda: Mass Rallies and the Radio**\nHaving silenced the opposition, Goebbels flooded Germany with Nazi ideology:\n\n* **The Radio:** Goebbels realised that hearing Hitler's charismatic voice was the most effective way to brainwash the public. He subsidised the mass production of the ***Volksempfänger*** (People’s Receiver). These radios were deliberately designed with a short range so they could not pick up foreign stations like the BBC. By 1939, over 70% of German homes owned one. Crucially, listening was enforced: loudspeakers were erected in streets and factories, and sirens would sound to halt all work when Hitler made a major speech.\n* **Mass Rallies:** Every September, the Nazis held a massive rally in Nuremberg. These were carefully choreographed theatrical spectacles. [Key Individual: Albert Speer], Hitler’s favourite architect, designed the 'Cathedral of Light' using 130 anti-aircraft searchlights pointing into the night sky, creating a semi-religious, overwhelming atmosphere of power and unity.\n* **Film:** Cinemas were immensely popular. Goebbels commissioned director [Key Individual: Leni Riefenstahl] to make *Triumph of the Will* (documenting the 1934 Nuremberg Rally), which is still studied today as a masterpiece of propaganda. However, 80% of Nazi films were actually comedies or dramas that just had subtle anti-Semitic or pro-Aryan messages woven into the plot."
        },
        {
            "text": "**4. The 1936 Berlin Olympics**\nThe 1936 Olympic Games provided Hitler with the ultimate global stage to showcase the \"superiority\" of the Aryan race and the efficiency of the Nazi state.\n\n* **The Deception:** Goebbels carefully paused the regime's brutality. Violent anti-Semitic newspapers like *Der Stürmer* were temporarily removed from newsstands, and \"Jews Not Wanted\" signs were taken down. Foreign visitors left genuinely impressed by the clean, prosperous, and highly organised \"New Germany\".\n* **The International Failure vs. Domestic Success:** Hitler's primary goal was to prove Aryan racial supremacy. Internationally, this was undermined by the African-American athlete [Key Individual: Jesse Owens], who won four gold medals. However, for the domestic German audience, the propaganda was a massive triumph: Germany dominated the overall medal table, winning 33 gold medals (far ahead of America's 24), which Goebbels used as 'proof' of Aryan superiority."
        },
        {
            "text": "**5. Controlling Culture and the Arts**\nHitler fancied himself an artist, and he believed that culture should reflect the heroic, traditional values of the German race. In September 1933, the **Reich Chamber of Culture** was set up. If you wanted to publish a book, sell a painting, or play in an orchestra, you *had* to be a member. Jews and political opponents were banned.\n\n* **Art:** Modern, abstract art was despised by Hitler and banned as ***Entartete Kunst*** (Degenerate Art). In 1937, the Nazis held a massive 'Degenerate Art Exhibition' in Munich, where banned paintings were hung crookedly and surrounded by insulting graffiti to encourage the public to mock them. Instead, the Nazis promoted heroic, realistic paintings of muscular Aryan soldiers and fertile peasant women.\n* **Architecture:** Hitler favoured monumental, neoclassical architecture (huge stone buildings with classical pillars). Albert Speer designed buildings that were deliberately massive to make the individual feel small and the State feel eternal.\n* **Music:** Jewish composers (like Mendelssohn) were completely banned. American Jazz was outlawed because it was seen as \"black music\". Instead, Germans were encouraged to listen to traditional German composers like **Richard Wagner** and Beethoven."
        }
    ],
    "quiz": [
        { "q": "Who was appointed as the Minister of Public Enlightenment and Propaganda in 1933?", "a": "Joseph Goebbels" },
        { "q": "What was the 'Editor's Law' of 1933?", "a": "A law making newspaper editors personally responsible for anything printed in their papers" },
        { "q": "What was the name of the Nazi publishing house that bought up 82% of all German newspapers by 1939?", "a": "The Eher Verlag" },
        { "q": "What happened in Berlin and other university towns in May 1933?", "a": "Massive book burnings of works by Jewish and communist authors" },
        { "q": "What was the German name for the cheap, mass-produced 'People's Receiver' radio?", "a": "Volksempfänger" },
        { "q": "Why were the Nazi radios deliberately designed with short range?", "a": "So Germans could not pick up foreign broadcasts like the BBC" },
        { "q": "How did the Nazis ensure people listened to Hitler's speeches even if they weren't at home?", "a": "They put loudspeakers in streets and sounded sirens in factories to stop work" },
        { "q": "In which city did the Nazis hold their massive, carefully choreographed annual rallies?", "a": "Nuremberg" },
        { "q": "Who was the architect who designed the 'Cathedral of Light' for the Nuremberg Rallies?", "a": "Albert Speer" },
        { "q": "What was the name of the famous female film director who made 'Triumph of the Will'?", "a": "Leni Riefenstahl" },
        { "q": "Why were 80% of Nazi films actually comedies or dramas rather than blatant propaganda?", "a": "Goebbels knew people would get bored, so he hid the Nazi messages inside entertainment" },
        { "q": "In what year did Berlin host the Olympic Games?", "a": "1936" },
        { "q": "Give one example of how the Nazis hid their true nature during the Olympics.", "a": "They temporarily took down 'Jews Not Wanted' signs / hid anti-Semitic newspapers" },
        { "q": "Who was the African-American athlete who won four gold medals at the 1936 Olympics?", "a": "Jesse Owens" },
        { "q": "How many gold medals did Germany win at the 1936 Olympics, allowing Goebbels to claim it was a domestic triumph?", "a": "33 gold medals" },
        { "q": "What organisation did all artists, writers, and musicians have to join to get work?", "a": "The Reich Chamber of Culture" },
        { "q": "What was the Nazi term for modern, abstract art that they completely banned?", "a": "Degenerate Art / Entartete Kunst" },
        { "q": "What was the purpose of the 1937 'Degenerate Art Exhibition' in Munich?", "a": "To deliberately display banned modern art so the German public could mock and laugh at it" },
        { "q": "Why did Hitler and Albert Speer build their architecture on such a massive scale?", "a": "To make the individual feel small and the Nazi State feel eternal and powerful" },
        { "q": "Which genre of music did the Nazis ban because they racistly viewed it as 'black music'?", "a": "Jazz" }
    ],
    "gcse_task": {
        "topic": "Explain one consequence of Nazi control of culture and the arts. (4 marks)",
        "tasks": []
    }
};

// Insert lesson_3_3 if it doesn't exist, or replace if it does
const lessonIndex = dataObj.lessons.findIndex(l => l.id === 'lesson_3_3');
if (lessonIndex !== -1) {
    dataObj.lessons[lessonIndex] = lesson33;
} else {
    dataObj.lessons.push(lesson33);
}

// Add key individuals
if (!dataObj.key_individuals) dataObj.key_individuals = [];
const addKI = (name, role, significance) => {
    if (!dataObj.key_individuals.some(k => k.name === name)) {
        dataObj.key_individuals.push({ name, role, significance, image: "" });
    }
};

addKI("Joseph Goebbels", "Minister of Public Enlightenment and Propaganda", "The mastermind behind the Nazi propaganda machine, responsible for controlling all media, arts, and information to brainwash the German public.");
addKI("Albert Speer", "Hitler's Chief Architect", "Designed monumental Nazi buildings and the 'Cathedral of Light' for the Nuremberg rallies. Later appointed Minister of Armaments during WWII.");
addKI("Leni Riefenstahl", "Film Director", "Commissioned by Goebbels to direct 'Triumph of the Will', a groundbreaking and highly influential propaganda film documenting the 1934 Nuremberg Rally.");
addKI("Jesse Owens", "American Olympic Athlete", "An African-American track and field athlete who won four gold medals at the 1936 Berlin Olympics, undermining Hitler's myth of Aryan supremacy.");

const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully updated KT 3.3 and added key individuals!");
