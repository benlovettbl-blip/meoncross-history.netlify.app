const fs = require('fs');

let content = fs.readFileSync('water_and_sanitation/data.js', 'utf8');
const jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// Local blocks definition
const localBlocks = [
  {
    lessonIndex: 0,
    title: 'Fishbourne Roman Palace',
    text: 'Just down the road from Fareham near Chichester, Fishbourne Roman Palace is the largest Roman home found in Britain. It features incredibly well-preserved remains of a Roman bathhouse and the hypocaust (underfloor heating) system. It is a perfect local example of Roman engineering and luxury sanitation that you can actually visit today.',
    image: 'water_local_fishbourne.jpg',
    question: 'Based on what you have learned about Roman sanitation, why do you think a wealthy palace like Fishbourne would have its own private bathhouse and hypocaust system, while ordinary Romano-British people did not?'
  },
  {
    lessonIndex: 1,
    title: 'Titchfield Abbey',
    text: 'Located right in Fareham, this Premonstratensian abbey relied on the River Meon. Like most monasteries, it had highly advanced water management for the time, including fresh water piped in for washing (the lavatorium) and a reredorter (latrine block) cleverly positioned over a running stream to carry waste away.',
    image: 'water_local_titchfield.jpg',
    question: 'How does the water management system at Titchfield Abbey support the idea that monasteries were much healthier places to live than Medieval towns?'
  },
  {
    lessonIndex: 2,
    title: 'Tudor Portsmouth & Southsea Castle',
    text: 'As Portsmouth grew into a vital naval hub under Henry VIII, the cramped, walled town became notoriously filthy, relying entirely on overflowing cesspits and open gutters. You can contrast this with the dedicated (though basic) latrine chutes built into the walls of nearby Southsea Castle for soldiers.',
    image: 'water_local_southsea.jpg',
    question: 'If you lived in the overcrowded, walled town of Tudor Portsmouth, what risks would you face from the lack of proper sewers and overflowing cesspits?'
  },
  {
    lessonIndex: 3,
    title: 'The 1849 Portsmouth Cholera Epidemic',
    text: 'As the Industrial Revolution caused Portsea\'s population to explode around the dockyard, overcrowding led to severe sanitation crises. In the summer of 1849, a devastating cholera outbreak hit Portsmouth, killing over 800 people. It perfectly mirrors the national crisis and the deadly consequences of the Miasma theory before John Snow\'s discoveries.',
    image: 'water_local_haslar.jpg',
    question: 'Why did rapid population growth in places like Portsea make the 1849 cholera outbreak so devastating for the local community?'
  },
  {
    lessonIndex: 4,
    title: 'Eastney Beam Engine House',
    text: 'This is Portsmouth\'s direct equivalent to Joseph Bazalgette\'s London sewers! Built in 1887 by Sir Frederick Bramwell, these massive Victorian steam engines were constructed to pump Portsmouth\'s raw sewage out to sea at Langstone Harbour, finally cleaning up the city\'s streets and eliminating cholera locally.',
    image: 'water_local_eastney.jpg',
    question: 'How did the construction of the Eastney Beam Engine House in 1887 solve the exact same public health crisis in Portsmouth that Bazalgette solved in London?'
  }
];

localBlocks.forEach(lb => {
  const lesson = data.lessons[lb.lessonIndex];
  
  // HTML rendering string for the narrative block
  const localHtml = `
<div class="local-history-box" style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px 20px; margin: 20px 0; border-radius: 0 6px 6px 0;">
    <h4 style="color: #166534; margin-top: 0; margin-bottom: 10px;">
        <i class="fa-solid fa-location-dot"></i> Local Link: ${lb.title}
    </h4>
    <p style="margin: 0; color: #1f2937; font-size: 1rem; line-height: 1.6;">
        ${lb.text}
    </p>
</div>`;

  // Insert the narrative block
  const newBlock = {
    type: 'narrative',
    content: localHtml,
    image: lb.image,
    tasks: [
      {
        question: lb.question,
        type: 'text'
      }
    ]
  };

  if (lesson.narrative_blocks && lesson.narrative_blocks.length >= 2) {
      lesson.narrative_blocks.splice(2, 0, newBlock);
  } else if (lesson.narrative_blocks) {
      lesson.narrative_blocks.push(newBlock);
  }
});

// Update key individuals
const henryVIII = {
    "name": "King Henry VIII",
    "role": "Monarch of England",
    "details": "King of England who oversaw the growth of the Royal Navy and ordered the construction of coastal defences like Southsea Castle to protect Portsmouth.",
    "date_of_birth": "1491",
    "date_of_death": "1547",
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/07/Workshop_of_Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg"
};

const bramwell = {
    "name": "Sir Frederick Bramwell",
    "role": "Civil Engineer",
    "details": "A prominent Victorian civil engineer who designed the Eastney Beam Engine House in Portsmouth, pumping raw sewage out to sea and vastly improving the city's public health.",
    "date_of_birth": "1818",
    "date_of_death": "1903",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/23/Frederick_Bramwell.jpg"
};

if (!data.key_individuals) {
    data.key_individuals = [];
}
data.key_individuals.push(henryVIII);
data.key_individuals.push(bramwell);

fs.writeFileSync('water_and_sanitation/data.js', 'export const unitData = ' + JSON.stringify(data, null, 4) + ';\n', 'utf8');
console.log('Successfully injected local history blocks and individuals.');
