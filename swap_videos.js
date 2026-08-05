const fs = require('fs');

const dataStr = fs.readFileSync('great_war_part2/data.js', 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);
const data = JSON.parse(dataStr.substring(jsonStartIndex));

const newVideos = {
    'lesson_1': [
        {
            "type": "era",
            "url": "https://era.org.uk/streaming-service-resource/wwi-a-z-a-is-for-archduke-franz-ferdinand-bbc-two/",
            "title": "A is for Archduke Franz Ferdinand | WWI A-Z",
            "duration": "2 mins 30 secs",
            "viewing_task": "Watch this quick summary and note down exactly how the assassination in Sarajevo triggered the outbreak of war.",
            "model_answer": "The assassination of Archduke Franz Ferdinand by Gavrilo Princip caused Austria-Hungary to declare war on Serbia, which dragged in Russia, Germany, and eventually Britain due to the alliance system."
        },
        {
            "type": "era",
            "url": "https://era.org.uk/streaming-service-resource/wwi-a-z-y-is-for-your-country-needs-you-bbc-two/",
            "title": "Y is for Your Country Needs You | WWI A-Z",
            "duration": "3 mins",
            "viewing_task": "How was Lord Kitchener's famous poster used to drum up initial excitement for the war?",
            "model_answer": "The poster used direct eye contact and a pointing finger to make young men feel personally responsible and pressured into joining the army, making them feel it was their patriotic duty."
        },
        {
            "type": "era",
            "url": "https://era.org.uk/streaming-service-resource/wwi-a-z-b-is-for-battalions-bbc-two/",
            "title": "B is for Battalions | WWI A-Z",
            "duration": "3 mins",
            "viewing_task": "Explain what a 'Pals Battalion' was and why it was an effective recruitment tactic.",
            "model_answer": "A Pals Battalion allowed groups of friends, neighbors, and workmates to join up and serve together. It was effective because men didn't want to be left behind while all their friends went off to fight."
        }
    ],
    'lesson_2': [
        {
            "type": "era",
            "url": "https://era.org.uk/streaming-service-resource/wwi-a-z-t-is-for-trenches-bbc-two/",
            "title": "T is for Trenches | WWI A-Z",
            "duration": "3 mins",
            "viewing_task": "Describe three terrible conditions soldiers faced while living in the trenches.",
            "model_answer": "Soldiers faced deep, freezing mud, infestations of giant rats, and the constant threat of diseases like trench foot caused by standing in water for days."
        },
        {
            "type": "era",
            "url": "https://era.org.uk/streaming-service-resource/wwi-a-z-g-is-for-gas-bbc-two/",
            "title": "G is for Gas | WWI A-Z",
            "duration": "3 mins",
            "viewing_task": "Watch the students examine the genuine gas mask. Why were gas attacks so terrifying for the soldiers?",
            "model_answer": "Gas attacks were terrifying because the gas (like chlorine or mustard gas) would blind them and destroy their lungs from the inside, causing a slow and agonizing death if they didn't get their clumsy masks on in time."
        }
    ],
    'lesson_3': [
        {
            "type": "era",
            "url": "https://era.org.uk/tv-radio-resources/secondary-history/britain-europe-and-the-wider-world/",
            "title": "The Battle of Tanga | The World's War",
            "duration": "5 mins",
            "viewing_task": "Note down the vital contributions made by African and colonial troops during the Battle of Tanga.",
            "model_answer": "African and colonial troops did much of the fighting and heavy lifting in the East African campaign, completely shattering the myth that WW1 was only fought by white European soldiers in France."
        },
        {
            "type": "era",
            "url": "https://era.org.uk/streaming-service-resource/wwi-a-z-e-is-for-empire-bbc-two/",
            "title": "E is for Empire | WWI A-Z",
            "duration": "3 mins",
            "viewing_task": "How did the wider British Empire contribute to the war effort?",
            "model_answer": "Millions of men from across the British Empire, including India, Australia, Canada, and Africa, provided vital combat troops, laborers, and essential resources that allowed Britain to continue fighting."
        }
    ],
    'lesson_4': [
        {
            "type": "era",
            "url": "https://era.org.uk/streaming-service-resource/wwi-a-z-w-is-for-women-bbc-two/",
            "title": "W is for Women | WWI A-Z",
            "duration": "3 mins",
            "viewing_task": "What were the 'Munitionettes' and why was their work so dangerous?",
            "model_answer": "Munitionettes were the 1 million women who worked in munitions factories making shells. The work was incredibly dangerous due to the risk of massive factory explosions and toxic TNT poisoning, which turned their skin yellow (earning them the nickname 'Canaries')."
        },
        {
            "type": "era",
            "url": "https://era.org.uk/streaming-service-resource/wwi-a-z-c-is-for-conscription-bbc-two/",
            "title": "C is for Conscription | WWI A-Z",
            "duration": "3 mins",
            "viewing_task": "Explain why the government was forced to introduce conscription in 1916.",
            "model_answer": "The initial rush of volunteers had dried up by 1915, and due to massive casualties on the Western Front, the government had to force men to join the army (conscription) to keep the military functioning."
        }
    ],
    'lesson_5': [
        {
            "type": "era",
            "url": "https://era.org.uk/tv-radio-resources/secondary-history/britain-europe-and-the-wider-world/",
            "title": "The Treaty of Versailles | Hitler's Rise: The Colour Films",
            "duration": "5 mins",
            "viewing_task": "Watch the colorized footage and list two ways the Treaty of Versailles punished Germany.",
            "model_answer": "1. It forced Germany to accept full blame for the war (the War Guilt clause). 2. It imposed devastating financial reparations that shattered the German economy."
        },
        {
            "type": "era",
            "url": "https://era.org.uk/tv-radio-resources/secondary-history/britain-europe-and-the-wider-world/",
            "title": "The end of WW1 | Nazis: A Warning from History",
            "duration": "5 mins",
            "viewing_task": "How did the German public react to the peace terms?",
            "model_answer": "They were deeply bitter and felt betrayed, viewing the treaty as a 'Diktat' (a dictated peace) that humiliated their nation and stripped them of their dignity."
        }
    ],
    'lesson_6': [
        {
            "type": "era",
            "url": "https://era.org.uk/tv-radio-resources/secondary-history/britain-europe-and-the-wider-world/",
            "title": "The history of The Cenotaph | Remembrance Sunday",
            "duration": "5 mins",
            "viewing_task": "What is the powerful significance of the Unknown Warrior at the Cenotaph?",
            "model_answer": "The Unknown Warrior represents all the unidentified soldiers who died in the war, allowing grieving families with no grave to visit to have a national symbol to mourn at."
        },
        {
            "type": "era",
            "url": "https://era.org.uk/streaming-service-resource/wwi-a-z-r-is-for-remembrance-bbc-two/",
            "title": "R is for Remembrance | WWI A-Z",
            "duration": "2 mins",
            "viewing_task": "Why was the national act of remembrance established on November 11th?",
            "model_answer": "It was established to mark the exact date and time the Armistice was signed in 1918 (the 11th hour of the 11th day of the 11th month), ensuring the country never forgets the sacrifice of the dead."
        }
    ]
};

data.lessons.forEach(l => {
    if (newVideos[l.id]) {
        l.video = newVideos[l.id];
    }
});

fs.writeFileSync('great_war_part2/data.js', preText + JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully swapped YouTube videos for ERA videos!');
