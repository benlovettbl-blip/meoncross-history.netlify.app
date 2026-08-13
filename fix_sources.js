const fs = require('fs');

let content = fs.readFileSync('great_war/data.js', 'utf8');

// L0 Source
content = content.replace(
    /"title": "Source A: Map of the German Empire vs Modern Germany"/g,
    '"title": "Source A: A map from 1871 showing the newly created German Empire compared to modern Germany."'
);
content = content.replace(
    /"caption": "A map showing the newly created German Empire in 1871 \(left\) compared to modern-day Germany \(right\)."/g,
    '"caption": "This map illustrates the dramatic shift in European borders following the Franco-Prussian War in 1871. By uniting various independent German states into a single, massive German Empire under Prussian leadership, Otto von Bismarck completely altered the balance of power in Europe. This sudden creation of a massive, heavily armed, and highly industrialized powerhouse in the center of Europe deeply terrified its neighbors, setting the stage for future conflict."'
);

// L1 Source
content = content.replace(
    /"title": "Source A: Anton von Werner, 'The Proclamation of the German Empire at Versailles', painted in 1885."/g,
    '"title": "Source A: A painting by Anton von Werner from 1885 showing the Proclamation of the German Empire at Versailles."'
);
content = content.replace(
    /<strong>What is this source showing\?<\/strong> /g,
    ''
);

// L2 Source
content = content.replace(
    /"title": "Source A: John Tenniel, 'The Greedy Boy', a British political cartoon published in Punch Magazine, 1885."/g,
    '"title": "Source A: A political cartoon by John Tenniel from 1885 showing German Chancellor Otto von Bismarck as a greedy boy."'
);

// L3 Source
content = content.replace(
    /"title": "Source A: Official technical blueprint showing the design and armament of HMS Dreadnought, published in 1906."/g,
    '"title": "Source A: An official technical blueprint from 1906 showing the revolutionary design of HMS Dreadnought."'
);

// L4 Source
content = content.replace(
    /"title": "Source A: 'The Chain of Friendship', an American cartoon published in the Brooklyn Eagle, July 1914."/g,
    '"title": "Source A: An American political cartoon from July 1914 showing the chain reaction of the European alliance system."'
);
content = content.replace(
    /"caption": "This cartoon shows how the complex web of alliances dragged all the European powers into war. Serbia is threatened by Austria, who is threatened by Russia, who is threatened by Germany, and so on."/g,
    '"caption": "This cartoon vividly illustrates the terrifying domino effect of the European alliance system. Following the assassination in Sarajevo, the rigid network of treaties dragged all the major powers into war. Serbia is threatened by Austria-Hungary, who is threatened by Russia, who is threatened by Germany, and so on. The alliances, which were theoretically designed to prevent war by acting as a deterrent, instead acted as tripwires that guaranteed a localized dispute would instantly explode into a continent-wide conflict."'
);

// L5 Source
content = content.replace(
    /"title": "Source A: Leonard Raven-Hill, 'The Boiling Point', a British political cartoon published in Punch Magazine, 1912."/g,
    '"title": "Source A: A British political cartoon by Leonard Raven-Hill from 1912 showing European leaders sitting on the boiling Balkans."'
);

fs.writeFileSync('great_war/data.js', content);
console.log('Fixed source formatting in great_war/data.js');
