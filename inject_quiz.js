const fs = require('fs');

const questions = [
    { q: "How many independent states existed in Central Europe before 1871?", a: "39", options: ["39", "300", "15", "50"] },
    { q: "Which state was the most powerful among the German states before 1871?", a: "Prussia", options: ["Prussia", "Bavaria", "Saxony", "Austria"] },
    { q: "Who became the Prime Minister of Prussia in 1862?", a: "Otto von Bismarck", options: ["Otto von Bismarck", "Wilhelm I", "Frederick the Great", "Klemens von Metternich"] },
    { q: "What was Bismarck's famous phrase for how Germany would be unified?", a: "Blood and iron", options: ["Blood and iron", "Peace and diplomacy", "Gold and silver", "Speeches and majority decisions"] },
    { q: "What did 'blood and iron' mean in Bismarck's approach?", a: "Warfare and military strength", options: ["Warfare and military strength", "Industrialization and mining", "Diplomatic treaties", "Democratic voting"] },
    { q: "Which two countries did Prussia defeat in quick wars before fighting France?", a: "Denmark and Austria", options: ["Denmark and Austria", "Russia and Britain", "Italy and Spain", "Sweden and Poland"] },
    { q: "Why did Bismarck provoke a war with France in 1870?", a: "To unite the southern German states with Prussia against a common enemy", options: ["To unite the southern German states with Prussia against a common enemy", "To steal French gold", "To stop French expansion into the Rhineland", "To test new Prussian weapons"] },
    { q: "What military advantages helped the Prussian army defeat the French rapidly?", a: "Modern railways and artillery", options: ["Modern railways and artillery", "Naval superiority", "Air support and tanks", "Larger numbers of cavalry"] },
    { q: "In what year was the new German Empire officially created?", a: "1871", options: ["1871", "1862", "1888", "1914"] },
    { q: "Who was crowned as the first Kaiser (Emperor) of the newly unified German Empire?", a: "Wilhelm I", options: ["Wilhelm I", "Wilhelm II", "Otto von Bismarck", "Frederick III"] },
    { q: "Where did the ceremony proclaiming the new German Empire take place?", a: "Palace of Versailles, France", options: ["Palace of Versailles, France", "Reichstag, Berlin", "Schönbrunn Palace, Vienna", "Notre Dame Cathedral, Paris"] },
    { q: "Why was the location of the German Empire's proclamation significant?", a: "It deeply humiliated the defeated French", options: ["It deeply humiliated the defeated French", "It was traditionally a German city", "It was the only palace large enough", "It proved Bismarck's peaceful intentions"] },
    { q: "What major geopolitical concept was destroyed by the creation of the massive German Empire?", a: "The Balance of Power", options: ["The Balance of Power", "The Concert of Europe", "The League of Nations", "The Continental System"] },
    { q: "Geographically, where was the new German Empire located?", a: "In the center of Europe", options: ["In the center of Europe", "On the Mediterranean coast", "Isolated on an island", "In Eastern Europe"] },
    { q: "Which two major powers bordered the new German Empire to the East and West?", a: "Russia and France", options: ["Russia and France", "Britain and Italy", "Austria and Ottoman Empire", "Spain and Sweden"] },
    { q: "How did the sudden emergence of the German Empire make its neighbors feel?", a: "Threatened and fearful of its military strength", options: ["Threatened and fearful of its military strength", "Relieved that Central Europe was stable", "Indifferent because Germany was peaceful", "Excited for new trade opportunities"] },
    { q: "What was the name of the war that finalized the unification of Germany?", a: "The Franco-Prussian War", options: ["The Franco-Prussian War", "The Austro-Prussian War", "The Crimean War", "The Thirty Years' War"] },
    { q: "What role did the southern German states play during the Franco-Prussian War?", a: "They joined Prussia to fight against France", options: ["They joined Prussia to fight against France", "They remained neutral", "They allied with France against Prussia", "They rebelled against Bismarck"] },
    { q: "What was the primary method Bismarck used to achieve his political goals?", a: "Ruthless politics and warfare", options: ["Ruthless politics and warfare", "Peaceful negotiation", "Democratic referendums", "Religious appeals"] },
    { q: "What title did Wilhelm I receive in 1871?", a: "Kaiser", options: ["Kaiser", "Tsar", "President", "Chancellor"] }
];

const file = './great_war/data.js';
let content = fs.readFileSync(file, 'utf8');

// The file is a JS module exporting unitData
// We need to parse it or just use regex to insert the quiz array into lesson_0.
// Since it's tricky to parse a full JS file safely without an AST, let's just do a string replacement.
// lesson_0 starts with: "id": "lesson_0",
const target = '"id": "lesson_0",';
const insert = `\n        "quiz": ${JSON.stringify(questions, null, 12).replace(/\n/g, '\n        ')},`;

if (content.includes(target) && !content.includes('"quiz": [\n            {\n                "q": "How many independent states existed')) {
    content = content.replace(target, target + insert);
    fs.writeFileSync(file, content);
    console.log("Successfully injected 20 quiz questions into lesson_0");
} else {
    console.log("Could not find lesson_0 or quiz already injected.");
}
