import fs from 'fs';

let content = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');

const wilhelmData = {
    name: 'Kaiser Wilhelm II',
    role: 'Emperor of Germany',
    bio: 'The last German Emperor and King of Prussia, ruling from 1888 to 1918. He was forced to abdicate on 9 November 1918 following a wave of mutinies and the looming defeat in the First World War.',
    image: '/images/weimar_individuals/kaiser_wilhelm_ii.jpg',
    significance: 'His erratic diplomacy, aggressive militarism, and refusal to compromise repeatedly destabilized European politics, creating the conditions that led to the outbreak of the First World War.',
    achievements: [
      'Pursued aggressive "Weltpolitik" to expand German global influence.',
      'Expanded the German Imperial Navy, sparking an arms race with Britain.',
      'Offered the "Blank Cheque" to Austria-Hungary in 1914.'
    ]
};

const insertStr = JSON.stringify(wilhelmData, null, 4) + ',';
content = content.replace(/"key_individuals":\s*\[/, '"key_individuals": [\n' + insertStr);

fs.writeFileSync('weimar_nazi_germany/data.js', content, 'utf8');
console.log('Injected Wilhelm II into data.js');
