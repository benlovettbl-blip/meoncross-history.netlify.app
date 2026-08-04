import fs from 'fs';
import path from 'path';

const units = {
    'eee': [
        {
            "title": "Elizabeth's Religious Settlement",
            "prompt": "<strong>Debate:</strong> Was Elizabeth's 'Middle Way' a brilliant compromise that prevented civil war, or a cowardly failure to commit to true Protestantism? Argue your case."
        },
        {
            "title": "The Problem of Mary, Queen of Scots",
            "prompt": "<strong>Roleplay:</strong> You are Sir Francis Walsingham in 1586. Convince Queen Elizabeth that executing her cousin Mary is the only way to save England from Catholic plots like the Babington Plot."
        },
        {
            "title": "The Spanish Armada",
            "prompt": "<strong>Debate:</strong> Did the Spanish Armada fail because of superior English tactics and naval technology, or was it simply defeated by disastrous Spanish planning and the weather (the 'Protestant Wind')? Pick a side."
        }
    ],
    'great_war': [
        {
            "title": "Bismarck & Unification",
            "prompt": "<strong>Debate:</strong> Was Otto von Bismarck a political genius who unified Germany through master diplomacy, or a ruthless warmonger who built an empire entirely on 'blood and iron'?"
        },
        {
            "title": "The Scramble for Africa",
            "prompt": "<strong>Debate:</strong> 'The Scramble for Africa was purely about economic greed for raw materials, not national pride or status.' Do you agree? Use evidence from the Moroccan Crises."
        },
        {
            "title": "The Alliance System",
            "prompt": "<strong>Roleplay:</strong> You are Kaiser Wilhelm II in 1914. Justify giving Austria-Hungary the 'Blank Cheque' after the assassination of Franz Ferdinand. Why must Germany stand by its only reliable ally?"
        }
    ],
    'great_war_part2': [
        {
            "title": "Lions Led By Donkeys?",
            "prompt": "<strong>Debate:</strong> Were British generals like Sir Douglas Haig incompetent butchers who threw lives away at the Somme, or did they adapt as best as they could to a new, industrial type of war?"
        },
        {
            "title": "A Truly Global War?",
            "prompt": "<strong>Debate:</strong> Was World War I truly a 'World' war, or was it just a European civil war that unfairly dragged in colonial subjects from India and Africa against their will?"
        },
        {
            "title": "The Treaty of Versailles",
            "prompt": "<strong>Roleplay:</strong> You are French Prime Minister Georges Clemenceau in 1919. Explain to Woodrow Wilson why Germany must be utterly crushed, disarmed, and punished financially for the devastation of the war."
        }
    ],
    'water_and_sanitation': [
        {
            "title": "Roman Public Health",
            "prompt": "<strong>Debate:</strong> Did the Romans build complex aqueducts and bathhouses because they actually understood how disease spread, or just because they liked feeling clean and showing off their imperial wealth?"
        },
        {
            "title": "Medieval Public Health",
            "prompt": "<strong>Roleplay:</strong> You are a medieval town councilor. The Black Death is approaching. Defend your decision to clean the streets of rotting animals and fine butchers for dumping waste, rather than just praying."
        },
        {
            "title": "The Great Stink",
            "prompt": "<strong>Debate:</strong> 'It wasn't cholera or John Snow that forced the government to build London's sewers, it was simply the overwhelming smell of the River Thames outside Parliament.' Do you agree? Argue your case."
        }
    ],
    'weimar_nazi_germany': [
        {
            "title": "The Weimar Republic",
            "prompt": "<strong>Debate:</strong> 'The Weimar Republic was doomed from the start in 1919 because of the Treaty of Versailles and the myth of the November Criminals.' Argue for or against this statement."
        },
        {
            "title": "Hitler's Rise to Power",
            "prompt": "<strong>Roleplay:</strong> You are Franz von Papen in January 1933. Explain to President Hindenburg why making Hitler Chancellor is a 'safe' idea and how you plan to control him like a puppet."
        },
        {
            "title": "Life in Nazi Germany",
            "prompt": "<strong>Debate:</strong> 'The youth of Germany were completely brainwashed by the Hitler Youth and the Nazi education system.' How far do you agree? Use evidence of opposition groups like the Edelweiss Pirates."
        }
    ]
};

for (const [unit, prompts] of Object.entries(units)) {
    const filePath = path.join(process.cwd(), unit, 'data.js');
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${unit}, file not found.`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if already injected
    if (content.includes('"debatePrompts"')) {
        console.log(`Skipping ${unit}, already has debatePrompts.`);
        continue;
    }

    // Inject right after export const unitData = {
    const injection = `export const unitData = {\n    "debatePrompts": ${JSON.stringify(prompts, null, 8)},\n`;
    content = content.replace('export const unitData = {', injection);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Successfully injected debatePrompts into ${unit}/data.js`);
}
