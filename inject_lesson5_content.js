const fs = require('fs');

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

const lesson5 = data.lessons.find(l => l.id === 'lesson_5');
if (lesson5) {
  lesson5.visual_hook.src = '/images/sepoy_mutiny_1857.png';
  
  lesson5.narrative_blocks = [
    {
      title: "A War for Liberation",
      content: "While ordinary people in Great Britain fought for a voice through domestic resistance like the machine-breaking Swing Riots or the peaceful gathering at Peterloo, colonial resistance abroad took on a far more violent and structural dimension. In the summer of 1857, the British Empire faced its greatest existential crisis of the nineteenth century. The Indian subcontinent, a vast landmass of diverse cultures, languages, and kingdoms, erupted in a massive, coordinated rebellion against its rulers. This was not a localized riot over winter wages, but a full-scale war for liberation executed by colonized people who actively weaponized their military training to reclaim their agency from a foreign occupier."
    },
    {
      title: "The Enfield Cartridge Catalyst",
      content: "The spark that ignited this explosive rebellion is often attributed to a single, culturally tone-deaf military innovation: the Enfield rifle. In early 1857, rumors spread like wildfire among the *sepoys*—the native Indian soldiers who made up over eighty percent of the East India Company’s (EIC) military forces—that the new paper ammunition cartridges were greased with a mixture of beef and pork fat. To load the rifle, soldiers had to bite the top off the cartridge. For Hindu soldiers, who revere the cow, and Muslim soldiers, for whom the pig is strictly forbidden, this was viewed as a deliberate, malicious plot to destroy their religious purity."
    },
    {
      title: "Systemic Resentment and Annexation",
      content: "However, modern historians emphasize that the cartridges were merely the catalyst; the true cause was a deep-seated, systemic resentment toward the East India Company’s decades of exploitation. Under aggressive policies like the 'Doctrine of Lapse,' the EIC had executed ruthless land grabs, annexing independent Indian kingdoms whenever a native ruler died without a direct male heir. This political greed, combined with heavy taxation on local farmers, the destruction of domestic textile industries, and an increasing wave of Christian missionary activity, convinced many Indians that the British were determined to systematically dismantle their ancient civilization, economy, and religions."
    },
    {
      title: "From Mutiny to National War",
      content: "The outbreak of violence began in earnest on May 10, 1857, at the military outpost of Meerut. Refusing to use the contaminated cartridges, a group of sepoys mutinied, turned their weapons on their British officers, and marched directly to the historic capital of Delhi. There, they declared the elderly Mughal Emperor, Bahadur Shah Zafar, as the true leader of India, instantly transforming a localized military mutiny into a unified, national war of independence. The rebellion spread rapidly across northern and central India, led by iconic figures of resistance such as Rani Lakshmibai, the Queen of Jhansi, who famously fought on horseback to protect her kingdom from corporate annexation. For months, the British lost total control of vast territories, trapped in besieged fortresses while Indian rebels successfully asserted their political and military agency."
    },
    {
      title: "Industrialized Brutality and Reprisal",
      content: "The British reprisal, when it finally came, was defined by an uncompromising, industrialized brutality that completely shattered any illusion of Britain as a 'civilizing' force. Fueled by sensationalized media reports of British civilian deaths, the state deployed the full might of its military apparatus to execute a campaign of mass terror. British forces marched through Indian villages, executing not just mutinous soldiers but thousands of ordinary civilians, burning entire communities to the ground. In an act of psychological warfare designed to deny victims traditional religious funerals, rebel leaders were bound to the mouths of cannons and blown apart."
    },
    {
      title: "The Birth of the British Raj",
      content: "The immediate consequence of this catastrophic conflict was the complete destruction of the entity that had triggered it. In 1858, recognizing that a private, profit-driven corporation could no longer safely govern a subcontinent, the British Parliament passed the Government of India Act. The East India Company was formally abolished, and its vast territories were transferred directly to the British Crown, establishing the era of the **British Raj**. Queen Victoria was declared Empress of India, signaling to the world that while the initial rebellion had been crushed by overwhelming violence, the empire had been forced to completely restructure itself because the colonized population had dared to strike back."
    }
  ];
}

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected Lesson 5 narrative!');
