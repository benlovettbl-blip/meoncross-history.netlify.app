const fs = require('fs');

const dataStr = fs.readFileSync('great_war_part2/data.js', 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);
const data = JSON.parse(dataStr.substring(jsonStartIndex));

data.key_individuals = [
    {
        "name": "Lord Kitchener",
        "image": "/images/gw_kitchener_portrait.jpg",
        "bio": "Secretary of State for War in 1914. His face became instantly iconic on the 'Your Country Needs You' recruitment posters.",
        "actions": "He realized the war would be long and require millions of men, leading to the creation of 'Kitchener's New Army' and Pals Battalions.",
        "achievements": [
            "Successfully mobilized a massive volunteer army before conscription was needed.",
            "Drowned in 1916 when his ship hit a German mine."
        ]
    },
    {
        "name": "Sir Douglas Haig",
        "image": "/images/gw_douglas_haig.jpg",
        "bio": "Commander-in-Chief of the British Expeditionary Force (BEF) from late 1915 until the end of the war.",
        "actions": "He commanded the British forces at major battles including the Somme and Passchendaele, known for their horrific casualties.",
        "achievements": [
            "Highly controversial figure: criticized as the 'Butcher of the Somme' by some, but defended by others as a general who successfully adapted to modern industrial warfare and led the British to ultimate victory in 1918."
        ]
    },
    {
        "name": "Khudadad Khan",
        "image": "/images/gw_khudadad_khan.jpg",
        "bio": "A sepoy (infantryman) in the 129th Duke of Connaught's Own Baluchis of the British Indian Army.",
        "actions": "In October 1914 at the First Battle of Ypres, his machine gun team fought to the death to hold back the German advance. He was the sole survivor of his team.",
        "achievements": [
            "He was the first Indian soldier to be awarded the Victoria Cross (VC), the highest military decoration for valour in the British Empire."
        ]
    },
    {
        "name": "Wilfred Owen",
        "image": "/images/gw_wilfred_owen.jpg",
        "bio": "One of the most famous British war poets, who served as an officer on the Western Front.",
        "actions": "He wrote visceral, shocking poetry like 'Dulce et Decorum Est' and 'Anthem for Doomed Youth' while recovering from shell shock.",
        "achievements": [
            "His poetry shattered the romanticized, jingoistic propaganda of 1914, exposing the brutal 'pity of war'. Tragically killed in action just one week before the Armistice."
        ]
    },
    {
        "name": "David Lloyd George",
        "image": "/images/gw_lloyd_george.jpg",
        "bio": "British Prime Minister during the latter half of the war and at the Paris Peace Conference.",
        "actions": "He drove the creation of the Ministry of Munitions to solve the shell crisis and effectively mobilized the Home Front.",
        "achievements": [
            "Represented Britain as one of the 'Big Three' at Versailles, attempting to find a middle ground between crushing Germany and rebuilding the European economy."
        ]
    },
    {
        "name": "Georges Clemenceau",
        "image": "/images/gw_clemenceau.jpg",
        "bio": "Prime Minister of France, nicknamed 'The Tiger'.",
        "actions": "He represented a devastated France at the Paris Peace Conference, demanding maximum revenge and security.",
        "achievements": [
            "Pushed for the harshest possible terms against Germany in the Treaty of Versailles to ensure France would never be invaded again."
        ]
    },
    {
        "name": "Woodrow Wilson",
        "image": "/images/gw_woodrow_wilson.jpg",
        "bio": "President of the United States of America.",
        "actions": "Brought America into the war in 1917 and proposed a peaceful, idealistic vision for the post-war world based on his 'Fourteen Points'.",
        "achievements": [
            "He championed the creation of the League of Nations, though his own country ultimately refused to join it."
        ]
    }
];

fs.writeFileSync('great_war_part2/data.js', preText + JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully added key_individuals!');
