const fs = require('fs');
let data = fs.readFileSync('public/units/trip_ypres/data.js', 'utf8');

const targetExtended = `"extended": {
        "question": "1 (a). How useful are Sources A and B for an enquiry into the impact of the war on the town of Ypres and the importance of rest for the soldiers? Explain your answer, using Sources A and B and your knowledge of the historical context. (8 marks)",
        "scaffolding": [
          "**Provenance Clues:** Analyze the Nature, Origin, and Purpose of the source. Ask yourself: Who wrote it? When? Why? How does their motive or the intended audience affect what they have written and its usefulness for the enquiry?"
        ],
        "source_a": {
          "provenance": "A photograph showing the complete destruction of the Cloth Hall in the Ypres town square, 1918.",
          "content": "<div style=\\"padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;\\"><img src=\\"/images/ypres_cloth_hall.jpg\\" style=\\"max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;\\"></div>"
        },
        "source_b": {
          "provenance": "A photograph of British soldiers relaxing and drinking tea inside Talbot House (Toc H) in Poperinge.",
          "content": "<div style=\\"padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;\\"><img src=\\"/images/talbot_house_relaxing.jpg\\" style=\\"max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;\\"></div>"
        },
        "model": "<strong>Source A is highly useful...</strong>",
        "provenance_clue": "Source A is a factual photograph documenting structural damage; what can it tell us about the destructive power of artillery? Source B shows men resting at Talbot House; why was this 'Every Man’s Club' so vital for morale just a few miles behind the front line?"
      }`;

const replacementExtended = `"extended": {
        "question": "1 (a). How useful are Sources A and B for an enquiry into the physical conditions of the landscape and trench warfare on the Western Front? Explain your answer, using Sources A and B and your knowledge of the historical context. (8 marks)",
        "scaffolding": [
          "**Provenance Clues:** Analyze the Nature, Origin, and Purpose of the source. Ask yourself: Who wrote it? When? Why? How does their motive or the intended audience affect what they have written and its usefulness for the enquiry?"
        ],
        "source_a": {
          "provenance": "A photograph showing the devastating impact of artillery fire and mud on the landscape during the Battle of Passchendaele, 1917.",
          "content": "<div style=\\"padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;\\"><img src=\\"/images/gw_flooded_trench.jpg\\" style=\\"max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;\\"></div>"
        },
        "source_b": {
          "provenance": "A photograph of soldiers from the Cheshire Regiment occupying a captured German trench, 1916.",
          "content": "<div style=\\"padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;\\"><img src=\\"/images/hooge_crater_trench.png\\" style=\\"max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;\\"></div>"
        },
        "model": "<strong>Source A is highly useful...</strong>",
        "provenance_clue": "Source A is an official photograph documenting the severe mud and destroyed landscape; what can it tell us about the conditions soldiers had to fight in? Source B shows men resting in a captured trench; what does this reveal about the realities of trench occupation?"
      }`;

if(data.includes(targetExtended)) {
    data = data.replace(targetExtended, replacementExtended);
    fs.writeFileSync('public/units/trip_ypres/data.js', data);
    console.log("Successfully replaced extended section!");
} else {
    console.log("Could not find the target extended block to replace. Here is what is in data.js for 'extended':");
    const idx = data.indexOf('"extended"');
    if (idx !== -1) {
        console.log(data.substring(idx - 50, idx + 1000));
    }
}
