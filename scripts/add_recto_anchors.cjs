const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
let code = fs.readFileSync(targetPath, 'utf8');

const anchors = [
  'Zionist settlement and the 1936 Great Arab Revolt forced Britain into irreconcilable diplomatic reversals on the eve of the Second World War.',
  'The 1948 military victory and the Rhodes armistices established the Green Line, securing Israeli sovereignty while permanently dividing historical Palestine.',
  'Mass Palestinian displacement and the unyielding Law of Return created a militarised frontier defined by cross-border fedayeen raids and brutal reprisals.',
  'Nasser’s nationalisation of the Suez Canal and the humiliating Anglo-French retreat marked the definitive collapse of European colonial power in the Middle East.',
  'Disputes over Jordan River water diversion, border artillery clashes, and Egyptian troop mobilization in Sinai made war an unavoidable inevitability by 1967.',
  'Israel’s preemptive air blitzkrieg shattered three Arab armies in six days, quadrupling Israeli territory and placing one million Palestinians under direct military occupation.',
  'UN Resolution 242 established the historic "Land for Peace" principle, while settlement building and the Khartoum "Three Noes" entrenched three decades of confrontation.',
  'The rise of the PLO and asymmetric international skyjackings propelled Palestinian national identity onto the global stage through spectacle and armed struggle.',
  'The 1973 surprise assault shattered Israeli complacency, while the Arab oil embargo transformed global economics and forced American diplomatic intervention.',
  'The Camp David Accords removed the Arab world’s strongest military power from the conflict, exchanging the Sinai Peninsula for lasting Egyptian-Israeli peace.',
  'The quagmire of the Lebanon War and the spontaneous grassroots stones of the First Intifada fundamentally broke Israel’s post-1967 status quo.',
  'Secret diplomacy at Oslo achieved unprecedented mutual recognition before collapsing under the weight of extremist violence, settlement growth, and assassination.',
];

let idx = 0;
code = code.replace(/rectoSubtitle:\s*('[^']+'|"[^"]+"),/g, (match, p1) => {
  const anchor = anchors[idx++];
  return `rectoSubtitle: ${p1},\n    rectoAnchor: ${JSON.stringify(anchor)},`;
});

fs.writeFileSync(targetPath, code, 'utf8');
console.log(`Added rectoAnchor to ${idx} enquiries in cme_unified_textbook_data.cjs!`);
