const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

let jsonStr = content.replace('export default early_modern_world;', '').replace('const early_modern_world =', '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = eval('(' + jsonStr + ')');

let l1 = data.lessons[0];

// Remove the old rubbish silk road block
l1.narrative_blocks = l1.narrative_blocks.filter(b => b.image !== '/images/silk_road.jpg');

let newBlock = {
  title: "Visual Analysis: The Silk Road (1375)",
  image: "/images/caravane_marco_polo.jpg",
  image_alt: "Detail from the Catalan Atlas (1375) showing Marco Polo's caravan on the Silk Road",
  source_letter: "A",
  image_caption: "A detail from the famous Catalan Atlas of 1375, depicting Marco Polo's caravan travelling along the Silk Road. For centuries, this massive network of overland trade routes was the artery of global wealth, connecting Europe to the riches of Asia.",
  tasks: [
    {
      type: "source_analysis",
      question: "Study Source A. What does this 1375 map detail suggest about how trade was conducted between Europe and Asia before the discovery of sea routes?",
      model_answer: "Source A shows merchants traveling in large caravans using camels and horses. This suggests that trade before 1450 relied on slow, grueling overland journeys across massive continents, requiring pack animals to transport luxury goods like silk and spices."
    }
  ]
};

// Insert at the beginning
l1.narrative_blocks.unshift(newBlock);

l1.narrative_blocks.forEach(b => {
    if (b === newBlock) return;
    
    if (b.text && b.text.includes('Source A:')) {
        b.text = b.text.replace('Source A:', 'Source B:');
    }
    if (b.tasks) {
        b.tasks.forEach(t => {
            if (t.question && t.question.includes('Source A')) {
                t.question = t.question.replace('Source A', 'Source B');
                if (t.model_answer) t.model_answer = t.model_answer.replace(/Source A/g, 'Source B');
            }
        });
    }

    if (b.source_letter === 'C') {
        b.source_letter = 'D';
        if (b.tasks) b.tasks.forEach(t => {
            if (t.question) t.question = t.question.replace(/Source C/g, 'Source D');
            if (t.model_answer) t.model_answer = t.model_answer.replace(/Source C/g, 'Source D');
        });
    }
    else if (b.source_letter === 'D') {
        b.source_letter = 'E';
        if (b.tasks) b.tasks.forEach(t => {
            if (t.question) t.question = t.question.replace(/Source D/g, 'Source E');
            if (t.model_answer) t.model_answer = t.model_answer.replace(/Source D/g, 'Source E');
        });
    }
    else if (b.source_letter === 'E') {
        b.source_letter = 'F';
        if (b.tasks) b.tasks.forEach(t => {
            if (t.question) t.question = t.question.replace(/Source E/g, 'Source F');
            if (t.model_answer) t.model_answer = t.model_answer.replace(/Source E/g, 'Source F');
        });
    }
    
    if (b.tasks) {
        b.tasks.forEach(t => {
            if (t.question && t.question.includes('Sources D and E')) {
                t.question = t.question.replace('Sources D and E', 'Sources E and F');
                if (t.model_answer) t.model_answer = t.model_answer.replace(/Sources D and E/g, 'Sources E and F');
                if (t.model_answer) t.model_answer = t.model_answer.replace(/Source D/g, 'Source E');
                if (t.model_answer) t.model_answer = t.model_answer.replace(/Source E/g, 'Source F');
            }
        });
    }
});

const newContent = "const early_modern_world = " + JSON.stringify(data, null, 2) + ";\n\nexport default early_modern_world;";

fs.writeFileSync('early_modern_world/data.js', newContent);
console.log('Successfully injected new Silk Road visual source!');
