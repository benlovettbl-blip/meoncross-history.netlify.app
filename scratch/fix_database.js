const fs = require('fs');

const dbPath = 'c:/Projects/meoncross-history.netlify.app/public/database.json';
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. Standardise Middle East unit
if (data.cme_new && data.cme_new.data && data.cme_new.data.lessons) {
    data.cme_new.data.lessons.forEach(lesson => {
        // Fix learning_objective typo
        if (lesson.learning_objective && !lesson.learning_objectives) {
            lesson.learning_objectives = lesson.learning_objective;
            delete lesson.learning_objective;
        }
        
        // Standardise do_now type
        if (lesson.do_now && lesson.do_now.type) {
            lesson.do_now.type = "retrieval";
        }
    });
}

// 2. Standardise Medicine unit
if (data.edexcel_medicine && data.edexcel_medicine.data) {
    if (data.edexcel_medicine.data.lessons) {
        data.edexcel_medicine.data.lessons.forEach(lesson => {
            // Standardise do_now type
            if (lesson.do_now && lesson.do_now.type) {
                lesson.do_now.type = "retrieval";
            }
        });
    }

    // Insert debatePrompts
    data.edexcel_medicine.data.debatePrompts = [
      {
        "title": "Lesson 1: The Bismarck Problem",
        "prompt": "<strong>Roleplay:</strong> You are a French politician in 1872. Defend your decision to hold a grudge against Germany over the loss of Alsace-Lorraine. Should revenge be a primary goal of your nation's foreign policy?"
      },
      {
        "title": "Lesson 2: The Sun and the Shadow",
        "prompt": "<strong>Debate:</strong> 'Imperialism was the primary cause of WW1.' Do you agree? Use evidence of the Moroccan crises and the scramble for Africa to support your view."
      },
      {
        "title": "Lesson 3: The Dreadnought Dilemma",
        "prompt": "<strong>Roleplay:</strong> You are British First Lord of the Admiralty Winston Churchill. Explain to the public why the Two-Power Standard is essential for Britain's survival, even if it bankrupts the country."
      },
      {
        "title": "Lesson 4: The Schlieffen Gamble",
        "prompt": "<strong>Debate:</strong> Was the Schlieffen Plan an aggressive act of war, or a necessary defensive strategy for a country surrounded by enemies? Pick a side."
      },
      {
        "title": "Lesson 5: The July Crisis",
        "prompt": "<strong>Roleplay:</strong> You are Tsar Nicholas II of Russia. Will you mobilize your army to protect Serbia, knowing it will trigger a war with Germany? Justify your decision to your advisors."
      }
    ];
}

fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated database.json');
