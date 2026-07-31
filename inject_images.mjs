import fs from 'fs';

let data = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');

data = data.replace(
    'Source B: A 1923 photograph showing German citizens in Berlin using a cart to transport massive baskets full of worthless paper currency.', 
    `Source B: <img src=\\"/images/hyperinflation_1923.jpg\\" alt=\\"5 Trillion Mark Note\\" style=\\"width:100%;max-width:500px;border-radius:10px;margin:10px 0;\\" /><br>A 5 Trillion Mark Reichsbanknote printed during the height of the German hyperinflation crisis in 1923.`
);

data = data.replace(
    'Source C: The poster features a stark, high-contrast illustration of a severely physically disabled man sitting in a wheelchair, looking sad and helpless. Behind him stands an athletic, healthy-looking German worker in overalls, carrying a heavy sack on his shoulders and looking exhausted. At the top of the poster, the bold caption reads: *"60,000 Reichsmarks is what this person suffering from hereditary defects costs the national community during his lifetime."* At the bottom, the text continues: *"Comrade, that is your money too. Read the Neues Volk, the monthly magazine of the Office of Racial Policy."*',
    `Source C: <img src=\\"/images/t4_poster.jpg\\" alt=\\"Neues Volk eugenics poster, 1938\\" style=\\"width:100%;max-width:500px;border-radius:10px;margin:10px 0;\\" /><br>An official Nazi propaganda poster published by the Office of Racial Policy in 1938. The caption reads: '60,000 Reichsmarks is what this person suffering from hereditary defects costs the national community during his lifetime. Comrade, that is your money too.'`
);

data = data.replace(
    'Source B: The photograph shows a classroom of approximately fifteen teenage girls, aged fifteen to sixteen. They are dressed in identical uniforms consisting of dark skirts and white blouses, with their hair neatly tied back in traditional plaits. They are standing around a large, modern kitchen table, carefully practicing how to prepare healthy meals and bathe baby dolls under the watchful eye of an older female instructor. The room is extremely clean and organized, and on the wall in the background hangs a framed portrait of Adolf Hitler. All the girls are smiling and appear focused and happy.',
    `Source B: <img src=\\"/images/bdm_girls.jpg\\" alt=\\"League of German Maidens visiting soldiers\\" style=\\"width:100%;max-width:500px;border-radius:10px;margin:10px 0;\\" /><br>A photograph showing members of the League of German Maidens (BDM) visiting wounded German soldiers in a Lazarett (military hospital).`
);

fs.writeFileSync('weimar_nazi_germany/data.js', data);
console.log('Images injected!');
