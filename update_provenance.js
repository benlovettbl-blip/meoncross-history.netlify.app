const fs = require('fs');
const prefix = 'export const unitData = ';
const content = fs.readFileSync('early_modern_world/data.js', 'utf8');
const jsonStr = content.replace(prefix, '').trim().replace(/;$/, '').trim();
let data = eval('(' + jsonStr + ')');

// Update Lesson 1 (Canton)
let l1 = data.lessons[0].narrative_blocks.find(b => b.title === 'Macro-History: The Wealth of the East');
if (l1) {
    l1.image_caption = "An 18th-century painting showing the foreign trading factories at Canton (Guangzhou) along the Pearl River in China. This was the bustling, highly regulated district where British, Dutch, and French East India Companies were forced to operate under strict Chinese imperial oversight.";
}

// Update Lesson 2 (Mercator)
let l2 = data.lessons[1].narrative_blocks.find(b => b.title === 'Macro-History: Navigating the Unknown');
if (l2) {
    l2.image_caption = "A 16th-century Nautical Planisphere (Mercator World Map). This map revolutionized oceanic travel, showing complex ocean trade routes, wind currents, and the terrifying scale of the vast unknown oceans that European sailors faced.";
}

// Update Lesson 4 (Royal Exchange/Thames)
let l4 = data.lessons[3].narrative_blocks.find(b => b.title === 'Macro-History: The Financial Hub');
if (l4) {
    l4.image_caption = "An 18th-century view of the Royal Exchange in London. During this period, the River Thames became crowded with merchant ships and a forest of wooden masts, transforming London into the maritime and financial hub of global trade.";
}

// Update Lesson 6 (Britannia)
let l6 = data.lessons[5].narrative_blocks.find(b => b.title === 'Macro-History: The Ideology of Empire');
if (l6) {
    l6.image_caption = "'The East Offering its Riches to Britannia' (Spiridione Roma, 1778). Commissioned by the East India Company for their headquarters in London, this allegorical ceiling painting shows Britannia seated high above, receiving riches like jewels, spices, and silk offered by personifications of Asia, Africa, and India.";
}

// Add the 4 sources to the root for the cover grid
data.cover_sources = [
    {
        image: '/images/global_britannia.jpg',
        title: 'The East Offering its Riches to Britannia (1778)',
        description: 'An allegorical painting showing Britannia receiving jewels, spices, and silk from Asia, Africa, and India. It highlights the ideology and wealth of the empire.'
    },
    {
        image: '/images/global_canton.jpg',
        title: 'Foreign Trading Factories at Canton (Guangzhou)',
        description: 'The highly regulated district in Qing China where European companies operated, proving that Asian empires held immense global economic power.'
    },
    {
        image: '/images/royal_exchange.jpg',
        title: 'The Financial Hub of London',
        description: 'A view of the Royal Exchange. By 1750, London was crowded with merchant ships and transformed into the financial center of global maritime trade.'
    },
    {
        image: '/images/global_mercator.jpg',
        title: 'Nautical Planisphere World Map',
        description: 'Early modern maps revolutionized travel, showing the massive ocean trade routes and the terrifying scale of global exploration.'
    }
];

fs.writeFileSync('early_modern_world/data.js', prefix + JSON.stringify(data, null, 4) + ';\n');
console.log('Updated data.js with rich provenance and cover sources.');
