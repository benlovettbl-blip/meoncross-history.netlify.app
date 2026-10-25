const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('👑 APPLYING 4-TIER IDEAL CLASSROOM VIDEO SHELF: MONARCHY, RELIGION & POWER');
console.log('======================================================');

const monarchy4TierVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=8TH65WnwSFs',
      title: 'Henry VIII and the Church | Timelines.tv History of Britain',
      duration: '4 mins 25 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        "Superb narrative summary by Timelines.tv examining Henry VIII's desire for a male heir, the Act of Supremacy (1534), and the plunder and destruction of England's monasteries. Recommended Watch Window: 00:00–03:45 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible British narrative documentary.",
      viewing_task:
        '<ol><li><strong>[01:10] Quick Check:</strong> Why did Henry VIII break with Pope Clement VII in Rome, and what new royal title did he assume in 1534?</li><li><strong>[03:15] Hinge Question:</strong> How did the Dissolution of the Monasteries permanently bind the wealthy Tudor nobility to Henry\'s religious Reformation?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> The Pope refused to annul Henry\'s marriage to Catherine of Aragon so he could marry Anne Boleyn; Henry assumed the title "Supreme Head of the Church of England".</li><li><strong>Hinge Question:</strong> Henry confiscated vast monastic lands and sold them at bargain prices to gentry and noble families. By enriching themselves with former Catholic Church property, English landowners had a massive financial interest in ensuring England remained Protestant, preventing any future return to papal authority.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=xdZcqAss92w',
      title: 'History vs. Henry VIII | TED-Ed',
      duration: '5 mins 25 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        "Animated courtroom trial debating Henry VIII's legacy: was he a tyrannical despot who executed wives and ministers, or an astute Renaissance nation-builder? Recommended Watch Window: 00:45–04:45 • Lesson Phase: Guided Instruction & Historical Evaluation. Tone Alert: Engaging philosophical courtroom deconstruction.",
      viewing_task:
        '<ol><li><strong>[01:30] Recall:</strong> What specific constitutional transformation did the 1534 Act of Supremacy establish for the English Crown?</li><li><strong>[03:15] Explain:</strong> Explain how Thomas Cromwell and Thomas Cranmer used parliamentary statute to dismantle papal authority and centralize state power.</li><li><strong>[04:30] Challenge:</strong> Evaluate whether Henry VIII was a true Protestant theological reformer or merely a self-interested Catholic monarch without a Pope.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Act declared the King to be the sole supreme earthly head of the Church of England, terminating the Pope\'s legal and taxation jurisdiction in England.</li><li><strong>Explain:</strong> Cromwell drafted parliamentary acts that outlawed appeals to Rome and redirected church taxes (First Fruits and Tenths) to the royal treasury, making Parliament an indispensable partner in royal governance.</li><li><strong>Challenge:</strong> Henry executed Protestants who denied transubstantiation (such as John Lambert) alongside Catholics who refused the Oath of Supremacy (such as Thomas More). Henry\'s 1539 Act of Six Articles reaffirmed traditional Catholic theology (clerical celibacy, private masses, confession), proving his Reformation was driven by dynastic succession and state sovereignty rather than Protestant doctrine.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=dxfpXoXBYRA',
      title: 'A Man for All Seasons (1966, Fred Zinnemann) | Official Trailer',
      duration: '3 mins 19 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Six-time Academy Award-winning historical drama starring Paul Scofield as Sir Thomas More and Robert Shaw as Henry VIII. Depicts More’s refusal to swear the Oath of Succession, preferring martyrdom over compromising his conscience. Recommended Watch Window: 00:00–03:19 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Conscience vs Tyranny. Tone Alert: Tense, intellectually profound Tudor drama.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice Paul Scofield\'s portrayal of Sir Thomas More refusing to sign Henry VIII\'s oath, declaring: "Some men think the Earth is round, others think it flat; but if it is flat, could the King\'s command make it round?" How does this cinematic sequence dramatize the terrifying clash between absolute royal authority and individual moral conscience during the Tudor Reformation?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer captures the moral integrity of Thomas More, who used legal silence to protect himself before facing perjury from Richard Rich. It highlights how Henry VIII demanded total subservience: loyalty to the monarch was no longer merely military and political, but extended into the private thoughts and religious souls of subjects, illustrating the birth of Tudor royal absolutism.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7RjKG6gwmiE',
      title: 'Henry VIII: Mind of a Tyrant – The Break with Rome | David Starkey',
      duration: '47 mins 31 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Dr. David Starkey analyzes the royal manuscript letters, parliamentary scrolls, and the psychological descent of Henry VIII from an idealistic Renaissance prince into a ruthless autocrat. Recommended Watch Window: 14:00–26:00 • Lesson Phase: In-Depth Documentary Investigation & Royal Psychology. Tone Alert: Rigorous documentary featuring primary Tudor state papers.',
      viewing_task:
        '<ol><li><strong>[08:15] Recall:</strong> What biblical verse from the Book of Leviticus did Henry VIII cite to argue that his marriage to his brother Arthur\'s widow Catherine was cursed by God?</li><li><strong>[18:40] Explain:</strong> Explain how the fall of Cardinal Thomas Wolsey in 1529 demonstrated the perilous danger of failing to deliver Henry VIII\'s marital annulment.</li><li><strong>[24:15] Challenge:</strong> Evaluate how the execution of Bishop John Fisher and Sir Thomas More in 1535 shocked Christian Europe and permanently branded Henry as a bloodthirsty tyrant.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Leviticus 20:21 ("If a man shall take his brother\'s wife, it is an unclean thing... they shall be childless").</li><li><strong>Explain:</strong> Wolsey was Lord Chancellor and Papal Legate, holding immense power. When Pope Clement VII stalled due to pressure from Catherine\'s nephew Emperor Charles V, Henry stripped Wolsey of his palaces (Hampton Court) and charged him with praemunire (treasonous allegiance to the Pope), showing that no minister was safe from royal wrath.</li><li><strong>Challenge:</strong> Fisher was a Catholic Cardinal and More was internationally renowned as Europe\'s leading humanist scholar and author of <em>Utopia</em>. Executing both men for refusing to acknowledge royal supremacy over the Church horrified the Pope, Emperor Charles V, and King Francis I, isolating England diplomatically and proving that Henry would eliminate anyone who challenged his supremacy.</li></ol>',
    },
  ],

  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=3KAsUADqACU',
      title: 'Who was Elizabeth I? | Hunting for History | BBC Teach',
      duration: '6 mins 02 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        "Investigates Elizabeth's accession in 1558 following the violent religious pendulum swings of Edward VI (strict Protestantism) and Mary I (Catholic persecutions). Recommended Watch Window: 00:00–03:45 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible educational biography.",
      viewing_task:
        '<ol><li><strong>[01:15] Quick Check:</strong> What violent religious pendulum swings occurred in England between Henry VIII\'s death in 1547 and Elizabeth I\'s accession in 1558?</li><li><strong>[02:45] Hinge Question:</strong> Why did Elizabeth famously declare that she had "no desire to make windows into men\'s souls", and how did this shape her 1559 Religious Settlement?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Her half-brother Edward VI imposed radical Protestantism (destroying altars, Latin mass banned), while her half-sister Mary I restored papal authority and burned nearly 300 Protestants at the stake.</li><li><strong>Hinge Question:</strong> Elizabeth recognized that religious extremism sparked rebellion and civil war. By establishing an outward compromise (the <em>Via Media</em>), she demanded outward conformity and loyalty to the Crown, allowing moderate Catholics to worship privately as long as they attended church and posed no political threat.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=-GbkZ_Y1AeQ',
      title: 'Early Elizabethan England: The Religious Settlement (1559) | The History Teacher',
      duration: '5 mins 48 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        "Detailed breakdown of the 1559 Via Media: the Act of Supremacy ('Supreme Governor') and the Act of Uniformity (Common Prayer Book and clerical vestments). Recommended Watch Window: 00:45–05:00 • Lesson Phase: Guided Instruction & Legislative Analysis. Tone Alert: Structured GCSE syllabus breakdown with primary text extracts.",
      viewing_task:
        '<ol><li><strong>[01:20] Recall:</strong> What specific title did Elizabeth choose in the 1559 Act of Supremacy, and why did she reject her father\'s title of "Supreme Head"?</li><li><strong>[03:15] Explain:</strong> Explain how the 1559 Act of Uniformity combined Protestant theology with traditional Catholic ceremony to appease both sides.</li><li><strong>[04:45] Challenge:</strong> Evaluate why both Catholic recusants and radical Puritans fiercely criticized Elizabeth\'s compromise: why did the Middle Way satisfy neither extreme?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> "Supreme Governor of the Church of England". She chose "Governor" to placate Catholics who believed only Christ or the Pope could be "Head", and Protestants who believed a woman could not hold spiritual headship over priests.</li><li><strong>Explain:</strong> Services were conducted in English using Cranmer\'s 1552 Book of Common Prayer, but communion phrasing was deliberately ambiguous (blending Catholic transubstantiation with Protestant commemoration), and churches retained crucifixes, candles, and clerical vestments (surplices).</li><li><strong>Challenge:</strong> Strict Catholics viewed any break with Rome as heresy and refused to attend church (becoming recusants who paid fines), while zealous Puritans viewed candles, music, and vestments as "popish rags" and idols that must be purged. Elizabeth\'s settlement was a political triumph for stability, but left lingering religious divisions that erupted into plots.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=DyGBwrtIamw',
      title: 'Elizabeth (1998, Shekhar Kapur / Cate Blanchett) | Official Trailer',
      duration: '2 mins 43 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Academy Award-winning feature film starring Cate Blanchett and Geoffrey Rush. Illustrates young Elizabeth surviving house arrest under Queen Mary, confronting the Council\'s demands to marry, and surviving Catholic assassination plots. Recommended Watch Window: 00:00–02:43 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Royal Survival. Tone Alert: Atmospheric, thrilling historical drama.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice young Elizabeth\'s vulnerability upon her accession in November 1558: surrounded by hostile Catholic powers (Spain and France), an empty treasury, and councilors insisting that a female ruler cannot survive without a foreign husband. How does Cate Blanchett\'s transformation into the "Virgin Queen" illustrate how she constructed an icon of royal power to secure her throne?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer dramatizes Elizabeth\'s realization that marrying an English noble would spark factional civil war, while marrying a foreign prince (like Philip II of Spain) would subordinate England to foreign empire. By rejecting marriage and dedicating herself to England ("I am married to England"), she created a brilliant political mythology that elevated her above factional squabbling.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7RjKG6gwmiE',
      title: 'Elizabeth I\'s Secret Agents | BBC Historical Documentary',
      duration: '47 mins 31 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Examines Sir Francis Walsingham\'s secret service: double agents, cipher decryptions, codebreakers like Thomas Phelippes, and the unmasking of the Ridolfi, Throckmorton, and Babington Plots. Recommended Watch Window: 10:00–22:00 • Lesson Phase: In-Depth Documentary Investigation & Tudor Espionage. Tone Alert: Tense, scholarly documentary on the birth of modern state intelligence.',
      viewing_task:
        '<ol><li><strong>[04:20] Recall:</strong> What 1570 papal bull issued by Pope Pius V excommunicated Elizabeth I and commanded English Catholics to depose her?</li><li><strong>[12:30] Explain:</strong> Explain how Sir Francis Walsingham\'s network of spies and codebreakers intercepted and decrypted Mary, Queen of Scots\' secret correspondence in the 1586 Babington Plot.</li><li><strong>[18:45] Challenge:</strong> Evaluate the moral and political dilemma facing Elizabeth regarding Mary Stuart: why did executing an anointed foreign queen establish a terrifying constitutional precedent?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> <em>Regnans in Excelsis</em>.</li><li><strong>Explain:</strong> Walsingham placed double agent Gilbert Gifford in charge of smuggling letters hidden inside waterproof beer barrels to Mary at Chartley Manor. Cryptographer Thomas Phelippes decoded the cipher, discovered Mary endorsing the assassination of Elizabeth, and forged a postscript asking for conspirators\' names, providing undeniable proof of treason.</li><li><strong>Challenge:</strong> Executing Mary violated the divine right of kings—the sacred belief that monarchs were ordained by God and could not be judged or executed by human courts. Elizabeth recognized that beheading a queen set a lethal precedent for her own crown and would provoke Philip II of Spain into an immediate invasion of England, which materialized as the Spanish Armada.</li></ol>',
    },
  ],

  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=r-uS4v43Dow',
      title: 'The Spanish Armada (1588) in 2 Minutes | Simple History',
      duration: '2 mins 01 sec',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Fast-paced animated summary of Philip II\'s grand "Enterprise of England": 130 warships, 30,000 men, the crescent formation, fireships at Calais, and the Protestant Wind. Recommended Watch Window: 00:00–02:01 (Full Clip) • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated battle summary.',
      viewing_task:
        '<ol><li><strong>[00:40] Quick Check:</strong> What was Philip II of Spain\'s tactical plan for the Armada, and which Spanish general\'s veteran army in the Netherlands was the fleet supposed to transport across the English Channel?</li><li><strong>[01:30] Hinge Question:</strong> Why did the English deployment of eight burning fireships off Calais on the night of 7 August 1588 break the Spanish defensive crescent formation without sinking a single ship?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> The Duke of Parma\'s 30,000 veteran Spanish soldiers (the Army of Flanders).</li><li><strong>Hinge Question:</strong> The Armada relied on an impregnable crescent formation. Seeing burning fireships packed with pitch and gunpowder drifting toward them on the tide, Spanish captains panicked, cut their anchor cables, and scattered into the dark sea. Without anchors, they could not regroup or dock to pick up Parma\'s waiting army.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=YlDA8cquOcU',
      title: 'Dan Snow: The Spanish Armada – Naval Tactics & The Battle of Gravelines',
      duration: '22 mins 25 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Naval historian Dan Snow reconstructs the running battle up the Channel: ship design differences (English nimble race-built galleons vs Spanish high-castled transports), reload times of culverins, and the Battle of Gravelines. Recommended Watch Window: 04:00–14:30 • Lesson Phase: Guided Instruction & Tactical Naval Analysis. Tone Alert: Superb hands-on nautical archaeology featuring cannon firings and sea charts.',
      viewing_task:
        '<ol><li><strong>[05:20] Recall:</strong> How did English galleon design (spearheaded by Sir John Hawkins) differ from traditional Spanish heavy galleons?</li><li><strong>[09:40] Explain:</strong> Explain how the English strategy of long-range broadside gunnery (using long-barreled culverins on four-wheel truck carriages) neutralized the Spanish tactic of boarding and close-quarters hand-to-hand combat.</li><li><strong>[13:15] Challenge:</strong> Evaluate whether English naval tactics or bad weather ("the Protestant Wind") was the decisive cause of the Armada\'s defeat: which factor was truly decisive?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> English galleons were "race-built"—longer, lower, with lowered forecastles and stern castles, making them faster, more maneuverable, and able to sail closer to the wind.</li><li><strong>Explain:</strong> Spanish doctrine treated ships as floating castles to grapple and board enemies with infantry. The English used fast reloading truck carriages and culverins to pound Spanish hulls from outside grappling range, killing crews and shattering masts without risking hand-to-hand combat.</li><li><strong>Challenge:</strong> English tactics broke the Armada\'s cohesion: fireships disrupted the crescent at Calais, and close-range gunnery at Gravelines forced the fleet into the dangerous North Sea. However, the catastrophic destruction of the fleet occurred off the rocky coasts of Scotland and Ireland, where violent Atlantic gales wrecked over 30 ships, demonstrating that tactical English pressure drove Spain into fatal weather.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=DyGBwrtIamw',
      title: 'Elizabeth: The Golden Age (2007) – Armada Defeat & The Tilbury Speech',
      duration: '3 mins 15 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Theatrical film excerpt featuring Cate Blanchett delivering the historic 1588 Speech to the Troops at Tilbury in parade armor, followed by the nighttime fireship inferno at Calais and Gravelines. Recommended Watch Window: 00:00–03:15 (Full Clip) • Lesson Phase: Cinematic Starter Hook & Royal Propaganda. Tone Alert: Epic, grand cinematic dramatisation of naval combat.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice Cate Blanchett\'s delivery of Elizabeth\'s famous speech ("I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king, and of a king of England too!"), and the fiery destruction of Spanish galleons. How does this film illustrate Elizabeth\'s mastery of political theater and the forging of an English patriotic identity?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The sequence captures Elizabeth\'s brilliant psychological understanding of leadership. Riding on a white horse in silver armor among ordinary soldiers, she bridged her gender and shared physical danger with her men, transforming a terrifying foreign invasion into a defining myth of English national exceptionalism and Protestant providential destiny.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=kr14pyCB70Q',
      title: 'Armada: 12 Days to Save England | BBC Landmark Documentary',
      duration: '1 hr 08 mins',
      pathway: 'Documentary',
      teacher_guidance:
        'Comprehensive BBC documentary featuring Anita Anand and Dan Snow examining newly discovered Spanish state letters, showing Duke of Medina Sidonia\'s private doubts, communication failures with Parma, and the catastrophic shipwrecks in Ireland. Recommended Watch Window: 24:00–38:00 • Lesson Phase: In-Depth Documentary Investigation & Spanish Perspective. Tone Alert: Authoritative, emotionally gripping bilingual documentary.',
      viewing_task:
        '<ol><li><strong>[11:30] Recall:</strong> Who was appointed commander of the Spanish Armada by King Philip II following the sudden death of the veteran Admiral Santa Cruz?</li><li><strong>[26:15] Explain:</strong> Explain the fatal communication breakdown between the Duke of Medina Sidonia in the English Channel and the Duke of Parma in Bruges: why could Parma\'s invasion barges not meet the fleet?</li><li><strong>[34:40] Challenge:</strong> Evaluate the geopolitical consequences of the Armada\'s failure: how did the victory establish England as a rising maritime power and alter Philip II\'s global ambitions?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Duke of Medina Sidonia (Alonso Pérez de Guzmán, who famously protested that he was prone to seasickness and had no naval experience).</li><li><strong>Explain:</strong> Parma\'s canal barges were blockaded inside Dunkirk and Antwerp by Dutch Protestant flyboats (Sea Beggars). Because deep-draft Spanish galleons could not enter the shallow Flemish sandbanks to protect the barges, and messages took 48 hours to travel by horseback, the two forces could not coordinate.</li><li><strong>Challenge:</strong> The defeat was a catastrophic financial and military blow to Spain, costing half the fleet and 15,000 men. While the Anglo-Spanish war dragged on until 1604, England\'s victory saved Protestant independence, stimulated oceanic trade, and laid the navigational foundations for English colonial expansion in North America and India.</li></ol>',
    },
  ],

  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=6niBsMeNToo',
      title: 'Why Did England Have a Civil War? | History in a Nutshell',
      duration: '4 mins 54 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Fast-paced animated summary exploring the clash between Charles I\'s belief in the Divine Right of Kings, 11 Years\' Tyranny, Ship Money, William Laud\'s prayer book, and the attempt to arrest the Five Members. Recommended Watch Window: 00:00–04:00 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated constitutional summary.',
      viewing_task:
        '<ol><li><strong>[01:10] Quick Check:</strong> What medieval tax on coastal ports did Charles I unlawfully impose on inland English towns during his "Eleven Years\' Tyranny" without parliamentary consent?</li><li><strong>[03:15] Hinge Question:</strong> Why did Charles I\'s attempt to arrest Five Members of Parliament inside the House of Commons in January 1642 make armed civil war unavoidable?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Ship Money.</li><li><strong>Hinge Question:</strong> Entering the Commons chamber with 400 armed soldiers violated parliamentary privilege and centuries of constitutional tradition. When Speaker William Lenthall famously replied that he had "neither eyes to see nor tongue to speak in this place, but as the House is pleased to direct me", Charles recognized he had lost London, fled the capital, and raised his royal standard at Nottingham.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7Nn-EkQvEIA',
      title: 'The Trial And Execution Of Charles I | Timelines.tv History of Britain',
      duration: '23 mins 44 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Andrew Chater chronicles Pride\'s Purge, the creation of the High Court of Justice, Charles I\'s refusal to plead ("by what lawful authority am I brought here?"), and his public beheading outside the Banqueting House on 30 January 1649. Recommended Watch Window: 04:00–15:00 • Lesson Phase: Guided Instruction & Regicide Investigation. Tone Alert: Superb, somber narrative documentary examining the most radical moment in British history.',
      viewing_task:
        '<ol><li><strong>[05:20] Recall:</strong> What unprecedented charge was brought against King Charles I at his trial in Westminster Hall in January 1649?</li><li><strong>[09:15] Explain:</strong> Explain Charles I\'s constitutional defense at his trial: why did he refuse to remove his hat or enter a plea of guilty or not guilty?</li><li><strong>[13:40] Challenge:</strong> Evaluate Oliver Cromwell and the regicides\' dilemma: why did they conclude that executing an anointed monarch was the only way to prevent renewed civil war?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> "Tyrant, traitor, murderer, and a public enemy to the good people of this nation."</li><li><strong>Explain:</strong> Charles argued that as King, his authority was derived directly from God, and no earthly court possessed the legal right to judge their sovereign. He maintained that pleading would surrender the constitutional liberties of all English subjects to an illegal military dictatorship.</li><li><strong>Challenge:</strong> Charles had secretly negotiated with Scots and foreign Catholic powers to invade England even after military defeat in the First Civil War, provoking the Second Civil War of 1648. Cromwell and the army officers viewed Charles as a "man of blood" who had shed the blood of his own people; they believed as long as Charles lived, he would perpetually plot royalist uprisings.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=XdP35Jc__nc',
      title: 'Cromwell (1970, Ken Hughes / Richard Harris, Alec Guinness) | Official Trailer',
      duration: '3 mins 22 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Oscar-winning historical epic starring Richard Harris as Oliver Cromwell and Sir Alec Guinness as King Charles I. Recreates the New Model Army at Naseby, parliamentary debates, and the storming of the House of Commons. Recommended Watch Window: 00:00–03:22 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Regicide. Tone Alert: Grand, dramatic cinematic confrontation of power.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the stark visual contrast between the decadent, aristocratic royal court of Charles I and the austere, puritanical discipline of Oliver Cromwell\'s New Model Army ("Ironsides"). How does the film capture the deep ideological and religious hatred that divided Royalist Cavaliers and Parliamentary Roundheads?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer contrasts Alec Guinness\'s dignified, autocratic King Charles—convinced his power comes from divine appointment—with Richard Harris\'s passionate Cromwell, driven by Calvinist religious conviction that Parliament must protect English liberties. It highlights how political disagreement mutated into a holy war, transforming ordinary farmers and MPs into revolutionary soldiers.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7Nn-EkQvEIA',
      title: 'The English Civil War & The Commonwealth | BBC Landmark Documentary',
      duration: '23 mins 44 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Analyzes the Cromwellian Protectorate (1649–1660): the abolition of the monarchy and House of Lords, rule by Major-Generals, Puritan suppression of Christmas and theaters, and the eventual Restoration of Charles II in 1660. Recommended Watch Window: 14:00–23:00 • Lesson Phase: In-Depth Documentary Investigation & The Republic. Tone Alert: Balanced historical analysis of Britain\'s eleven-year republic.',
      viewing_task:
        '<ol><li><strong>[06:30] Recall:</strong> What title was assumed by Oliver Cromwell in 1653 when he dissolved the Rump Parliament and established a military protectorate?</li><li><strong>[12:15] Explain:</strong> Explain how Puritan rule during the Commonwealth (banning Christmas, theater, dancing, and maypoles) alienated ordinary English citizens from the republican experiment.</li><li><strong>[19:40] Challenge:</strong> Evaluate why the British monarchy was restored in May 1660 with the return of Charles II: was the English Revolution an ultimate failure?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> "Lord Protector of the Commonwealth of England, Scotland, and Ireland".</li><li><strong>Explain:</strong> Cromwell and the Major-Generals enforced strict moral legislation, closing pubs, outlawing traditional sports, and punishing Sabbath-breaking. Ordinary people came to view the military republic as a grim, joyless dictatorship far more authoritarian than the old monarchy had ever been.</li><li><strong>Challenge:</strong> While the Stuart monarchy was restored, it was permanently weakened. Charles II and James II knew that monarchs could no longer rule without Parliament, tax without consent, or maintain arbitrary star-chamber courts. The revolution proved that ultimate sovereign authority rested in the consent of the political nation, paving the way for 1688.</li></ol>',
    },
  ],

  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=KCYAQEgquxE',
      title: 'What is the English Bill of Rights? | Untold History',
      duration: '2 mins 07 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Concise constitutional explainer highlighting the enduring legacy of the 1689 Bill of Rights: parliamentary free speech, regular elections, taxation by consent, and the prohibition of cruel and unusual punishment. Recommended Watch Window: 00:00–02:07 (Full Clip) • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible legal-historical summary.',
      viewing_task:
        '<ol><li><strong>[00:45] Quick Check:</strong> What Dutch Prince and his English wife were offered the English crown in 1689 on condition that they accept the Declaration of Rights?</li><li><strong>[01:30] Hinge Question:</strong> How did the 1689 Bill of Rights permanently end the threat of absolute royal monarchy in England, establishing a constitutional monarchy?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> William of Orange and Mary II (daughter of the deposed James II).</li><li><strong>Hinge Question:</strong> The Bill of Rights established that monarchs could no longer suspend laws, raise taxes, or maintain a standing peacetime army without parliamentary consent, ensuring that elected MPs held supreme legislative authority over the Crown.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=motfoum620o',
      title: '"Glorious" Revolution | Timelines.tv History of Britain',
      duration: '5 mins 42 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        "Andrew Chater traces the constitutional culmination of the 17th century: how James II's pro-Catholic policies provoked Parliament to invite William of Orange, cementing the 1689 Bill of Rights. Recommended Watch Window: 00:45–05:15 • Lesson Phase: Guided Instruction & Constitutional Analysis. Tone Alert: Superb narrative documentary with period prints and constitutional charters.",
      viewing_task:
        '<ol><li><strong>[01:15] Recall:</strong> Why did the birth of a healthy son to Catholic King James II in June 1688 prompt English politicians to send a secret invitation to William of Orange?</li><li><strong>[03:20] Explain:</strong> Explain why the overthrow of James II in 1688 was branded the "Glorious Revolution", and why this title is contested by Irish and Scottish historians.</li><li><strong>[04:50] Challenge:</strong> Synoptic Synthesis: Across the 170-year struggle from Henry VIII (1517) to William and Mary (1689), how did supreme political power shift from Crown to Church to Parliament?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Protestant MPs had tolerated James II believing his Protestant daughter Mary would succeed him; the birth of a prince guaranteed a permanent Catholic dynasty.</li><li><strong>Explain:</strong> English Whigs branded it "Glorious" because the transfer of power in London occurred without widespread bloodshed or civil war. However, in Ireland and Scotland, the revolution provoked brutal, bloody warfare (the Battle of the Boyne, the Siege of Derry, and Glencoe), establishing centuries of sectarian oppression.</li><li><strong>Challenge:</strong> Henry VIII broke with Rome to centralize supreme religious and political power into the absolute royal monarchy. However, royal claims to Divine Right under the Stuarts provoked the Civil War and the execution of Charles I. By 1689, Parliament successfully established that the monarch was a constitutional servant bound by law, making elected Parliament the supreme governing power in Britain.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=VocTBrPOT6I',
      title: 'To Kill a King (2003, Mike Barker / Tim Roth, Dougray Scott) | Official Scene',
      duration: '2 mins 44 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Historical feature scene starring Tim Roth as Oliver Cromwell and Dougray Scott as Lord Fairfax. Dramatizes the high-stakes confrontation between parliamentary puritans and moderate parliamentarians over the fate of the nation. Recommended Watch Window: 00:00–02:44 (Full Clip) • Lesson Phase: Cinematic Starter Hook & Parliamentary Sovereignty. Tone Alert: Tense, gritty political drama.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the debate between Cromwell and Fairfax regarding whether military power should dictate terms to Parliament, and the struggle to establish a stable government after the overthrow of the King. How does this film capture the danger of political power sliding into military dictatorship when traditional constitutional checks are destroyed?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The scene dramatizes the tragic paradox of the English Civil War: having fought to protect Parliament from the King\'s tyranny, Cromwell and the New Model Army found themselves repeatedly purging and dissolving Parliament to enforce their own policies, demonstrating how difficult it is to build a constitutional democracy in the vacuum of revolution.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7Nn-EkQvEIA',
      title: 'Crown, Church & Parliament: The Birth of Constitutional Monarchy | BBC Documentary',
      duration: '23 mins 44 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Comprehensive capstone documentary examining the long transition from medieval feudalism and divine right of kings to the Toleration Act (1689), the Act of Settlement (1701), and the emergence of modern parliamentary democracy. Recommended Watch Window: 12:00–23:00 • Lesson Phase: Synoptic Capstone & Constitutional Evolution. Tone Alert: Authoritative, academically rigorous historical analysis.',
      viewing_task:
        '<ol><li><strong>[04:10] Recall:</strong> What 1689 statute granted freedom of worship to non-conformist Protestants (Baptists, Quakers, Presbyterians), while continuing to exclude Catholics from public office?</li><li><strong>[11:30] Explain:</strong> Explain how the 1701 Act of Settlement permanently barred Roman Catholics from sitting on the British throne or marrying the monarch.</li><li><strong>[18:40] Challenge:</strong> Capstone Evaluation: Assess whether the English Bill of Rights truly established a democracy in 1689, or merely replaced the absolute rule of a King with the oligarchy of wealthy landowners and aristocrats.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Toleration Act 1689.</li><li><strong>Explain:</strong> To prevent any future Catholic Stuart restoration, Parliament decreed that the English crown could only pass to Protestant heirs (specifically Sophia of Hanover and her Protestant descendants), establishing that royal succession was governed by parliamentary statute rather than divine inheritance.</li><li><strong>Challenge:</strong> The Bill of Rights did not create modern democracy: voting rights were restricted to a tiny fraction (under 3%) of wealthy male property owners, women were entirely excluded, and rotten boroughs dominated elections. However, by establishing that the monarch was subject to law, that taxes required parliamentary consent, and that debate was free from royal arrest, 1689 created the essential constitutional framework that made future democratic expansion possible.</li></ol>',
    },
  ],
};

async function applyMonarchy4Tier() {
  const dataPath = path.join(ROOT_DIR, 'units', 'monarchy_religion_power', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  unitData.lessons.forEach((l) => {
    if (monarchy4TierVideos[l.id]) {
      l.video = monarchy4TierVideos[l.id];
      delete l.extra_videos;
      console.log(`✅ Injected 4-Tier shelf (${l.video.length} videos) into ${l.id} (${l.title})`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/monarchy_religion_power/data.js');

  // Copy to public/units/monarchy_religion_power/data.js
  const publicUnitDir = path.join(ROOT_DIR, 'public', 'units', 'monarchy_religion_power');
  if (!fs.existsSync(publicUnitDir)) fs.mkdirSync(publicUnitDir, { recursive: true });
  fs.writeFileSync(path.join(publicUnitDir, 'data.js'), fileContent, 'utf8');
  console.log('✅ Updated public/units/monarchy_religion_power/data.js');

  // Sync to data/monarchy_religion_power.json and public/data/monarchy_religion_power.json
  const payload = { id: 'monarchy_religion_power', data: unitData };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'data', 'monarchy_religion_power.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(ROOT_DIR, 'public', 'data', 'monarchy_religion_power.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  console.log('✅ Synced data/monarchy_religion_power.json and public/data/monarchy_religion_power.json');

  console.log('\nRebuilding database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('🎉 MONARCHY, RELIGION & POWER 4-TIER SHELF COMPLETED (20/20 VIDEOS ACTIVE)!');
}

applyMonarchy4Tier().catch((err) => {
  console.error('❌ Error applying Monarchy 4-tier videos:', err);
  process.exit(1);
});
