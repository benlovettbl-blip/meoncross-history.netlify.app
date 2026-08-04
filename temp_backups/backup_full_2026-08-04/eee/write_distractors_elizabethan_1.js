const fs = require('fs');
const path = require('path');

const distractorsElizPart1 = {
  "What was the estimated population of England in 1558?": [
    "Around five million. This population was largely urban, with the vast majority living and working in growing cities like London.",
    "Around one million. This population was extremely sparse, with the vast majority living in small northern settlements.",
    "Around ten million. This population was evenly split, with half living in towns and half working as tenant farmers."
  ],
  "What was the 'Great Chain of Being'?": [
    "A religious doctrine stating that the monarch had the power to appoint all bishops. This meant that the church was entirely controlled by the Crown.",
    "A legal code outlining the rights of peasants to graze animals on common land. This meant that landowners could not easily evict tenant farmers.",
    "A military alliance between England, Scotland, and France to counter Spain. This meant that the three nations would defend each other against invasion."
  ],
  "Who were the wealthiest people in English society below the monarch?": [
    "The gentry. These were men who held local political offices and owned small estates in the countryside.",
    "The merchants. These were men who ran the international cloth trade and controlled the wealth of cities.",
    "The clergy. These were men who collected church tithes and managed the vast lands owned by the bishoprics."
  ],
  "What was the Privy Council?": [
    "A public assembly of elected representatives from across England. They met once a year to vote on new tax requests and present petitions to the Queen.",
    "A secret judicial court that tried nobles accused of treason. They met in private and had the power to order executions without a jury trial.",
    "A council of foreign ambassadors representing Catholic powers. They met weekly to negotiate treaties and trade agreements with the English government."
  ],
  "Roughly how many men typically made up the Privy Council?": [
    "Around 50 men. Elizabeth deliberately kept this group large to ensure all regional factions in England were represented.",
    "Around 100 men. Elizabeth wanted to include representatives from both houses of Parliament and all major noble families.",
    "Around 10 men. Elizabeth wanted to restrict decision-making to a very small inner circle of close personal friends."
  ],
  "Who was Elizabeth's most important minister and Secretary of State?": [
    "Robert Dudley. He was her most trusted advisor and was essential in helping her make political decisions throughout her early reign.",
    "Francis Walsingham. He was her most trusted advisor and was essential in helping her make political decisions throughout her early reign.",
    "Thomas Howard. He was her most trusted advisor and was essential in helping her make political decisions throughout her early reign."
  ],
  "What were the two houses that made up Parliament?": [
    "The Privy Council and the House of Commons. Members of the Council were chosen by the Queen, while the Commons consisted of elected local gentlemen.",
    "The House of Lords and the Ecclesiastical Commission. Members of the Lords were nobles, while the Commission consisted of high-ranking Protestant bishops.",
    "The House of Bishops and the House of Commons. Members of the Bishops were religious leaders, while the Commons represented the merchant class."
  ],
  "What was the main reason Elizabeth would call Parliament?": [
    "To pass royal decrees. Elizabeth needed Parliament's approval to create any new laws, calling them in regularly every six months throughout her entire reign.",
    "To seek advice on marriage. Elizabeth wanted Parliament to debate and select her future husband, calling them in four times to discuss different foreign suitors.",
    "To resolve religious disputes. Elizabeth called Parliament to settle theological arguments between Puritans and moderate bishops, calling them in monthly."
  ],
  "What was the 'Royal Prerogative'?": [
    "The right of Parliament to veto laws passed by the Queen. This allowed MPs to block decisions on domestic taxes and foreign treaties they disagreed with.",
    "The judicial power of the House of Lords to put royal advisors on trial. This allowed the nobility to dismiss ministers they believed were corrupt.",
    "The traditional privilege of the Privy Council to govern when the Queen was ill. This allowed the council to pass emergency laws without royal approval."
  ],
  "Who were the Justices of the Peace (JPs)?": [
    "Elected town mayors who were chosen by local merchants. Their job was to manage local trade, collect tariffs, and run the city courts.",
    "Royal judges who traveled around the country in pairs. Their job was to hold major criminal trials twice a year in each county of England.",
    "Protestant priests who were appointed by the bishop. Their job was to run the local parish, collect tithes, and report on religious recusants."
  ],
  "Who were Elizabeth's parents?": [
    "Henry VIII and Catherine of Aragon. Because Henry had divorced Catherine to marry Anne Boleyn, Protestants refused to acknowledge the marriage as valid.",
    "Henry VIII and Jane Seymour. Because Jane had died shortly after childbirth, Catholics refused to acknowledge her son Edward's claim.",
    "Edward VI and Catherine Parr. Because Edward had married Catherine in secret, Parliament refused to acknowledge the validity of their children."
  ],
  "Why did strict Catholics question Elizabeth's legitimacy?": [
    "She had been declared illegitimate by her own father, Henry VIII, in an Act of Parliament. Catholics believed this parliamentary act could never be reversed.",
    "She was born to a mother, Anne Boleyn, who was accused of treason and witchcraft. Catholics believed that children of traitors could not inherit the crown.",
    "She was not baptised inside a Catholic church by a bishop representing Rome. Catholics believed that only a Catholic baptism could qualify a monarch to rule."
  ],
  "Why was Elizabeth's gender considered a problem in 1558?": [
    "16th-century laws forbade women from inheriting any land or titles. This meant that special parliamentary legislation had to be passed to allow her to rule.",
    "The Pope had issued a papal decree stating that a female ruler was a sin. This meant that foreign Catholic powers were legally ordered to depose her.",
    "She was expected to marry a foreign prince who would automatically become the King. This meant that England would lose its national independence."
  ],
  "What was the primary political risk of Elizabeth marrying an English nobleman?": [
    "It would anger foreign Catholic powers who wanted her to marry their princes. This could lead to Spain launching an immediate invasion of England.",
    "It would force the English nobleman to take control of the government. This would weaken the monarch's power and make Parliament supreme.",
    "It would require the gentry to pay a massive wedding tax to fund the celebrations. This could lead to widespread tax riots in the countryside."
  ],
  "What was the primary political risk of Elizabeth marrying a foreign Catholic prince?": [
    "It would force England to adopt Catholicism as the official religion. This could lead to a massive Protestant rebellion and civil war in the South.",
    "It would drag England into expensive foreign wars to defend the prince's homeland. This would bankrupt the English Crown and disrupt trade.",
    "It would lead to the Prince claiming the English throne for himself if Elizabeth died. This would end the Tudor dynasty and absorb England into a foreign empire."
  ],
  "What propaganda image did Elizabeth cultivate to turn her unmarried status into a strength?": [
    "The 'Warrior Queen'. She used this image to portray herself as a strong military leader who would defend England against foreign Catholic armies.",
    "The 'Mother of England'. She used this image to portray herself as a caring mother who loved all her subjects as her own children.",
    "The 'Protestant Saint'. She used this image to portray herself as a holy leader who was directly chosen by God to guide the English Church."
  ],
  "What type of education did Elizabeth receive as a child?": [
    "A traditional Catholic education. This gave her a deep faith in the Pope and a detailed understanding of Latin liturgy and church law.",
    "A basic courtly education. This focused on social skills such as dancing, singing, needlework, and learning how to run a royal household.",
    "A highly practical military education. This gave her an understanding of siege warfare, artillery, and how to command troops in battle."
  ],
  "Name two languages Elizabeth was fluent in, demonstrating her high level of education.": [
    "French and Spanish. Her ability to speak multiple languages allowed her to confidently negotiate with foreign ambassadors without needing translators.",
    "Italian and German. Her ability to speak multiple languages allowed her to confidently negotiate with foreign ambassadors without needing translators.",
    "Dutch and Portuguese. Her ability to speak multiple languages allowed her to confidently negotiate with foreign ambassadors without needing translators."
  ],
  "What does the term 'patronage' mean in Elizabethan government?": [
    "Using royal funds to build castles, roads, and bridges in the counties. It was a vital system used by the monarch to improve the infrastructure of England.",
    "Appointing local gentlemen to act as judges in the county courts. It was a vital system used by the monarch to enforce royal laws and maintain order.",
    "Giving financial grants to artists, writers, and playwrights to support the arts. It was a vital system used by the monarch to promote English culture."
  ],
  "How did Elizabeth use patronage as a personal strength?": [
    "She used it to fund a massive royal army that could crush any noble rebellions. By keeping all military power in her own hands, she maintained control.",
    "She used it to win the support of the merchant class by granting them lower trade taxes. By improving the economy, she ensured she was popular.",
    "She used it to build a network of loyal local judges who would strictly enforce her laws. By controlling the courts, she crushed domestic dissent."
  ],
  "Exactly how much debt did Elizabeth inherit upon her accession in 1558?": [
    "£100,000. This moderate sum was accumulated by her predecessor, Mary I, making it relatively easy for Elizabeth to pay off within her first year.",
    "£500,000. This massive sum was accumulated by her predecessor, Mary I, making it incredibly difficult for Elizabeth to fund her government and defence.",
    "£1,000,000. This massive sum was accumulated by her predecessor, Mary I, making it incredibly difficult for Elizabeth to fund her government and defence."
  ],
  "How much of the Crown's debt was owed to the Antwerp Exchange, and at what interest rate?": [
    "£50,000 was owed at an interest rate of 10%. Servicing this foreign debt consumed a small portion of the Crown's annual revenue.",
    "£200,000 was owed at an interest rate of 12%. Servicing this foreign debt consumed a huge portion of the Crown's annual revenue.",
    "£300,000 was owed at an interest rate of 15%. Servicing this foreign debt consumed a huge portion of the Crown's annual revenue."
  ],
  "What previous financial policy caused massive inflation in England?": [
    "Enclosing common land. Since the 1540s, landowners had been fencing off fields to farm sheep, driving up the price of grain and bread.",
    "Increasing customs duties. Since the 1540s, the Crown had raised taxes on imported goods, making everyday items far more expensive.",
    "Raising the value of the pound. Since the 1540s, the government had recalled old coins to replace them, causing confusion in the markets."
  ],
  "Which strategic port had England recently lost to France in 1558?": [
    "Dunkirk. Losing England's last military base on the European continent was a major blow to national pride and security.",
    "Boulogne. Losing England's last military base on the European continent was a major blow to national pride and security.",
    "Harfleur. Losing England's last military base on the European continent was a major blow to national pride and security."
  ],
  "What was the 'Auld Alliance'?": [
    "A traditional trade agreement between England and the Netherlands. This was a vital economic link because it allowed English merchants to sell cloth in Antwerp.",
    "A religious alliance between the Pope and the Holy Roman Emperor. This was a severe Catholic threat because it aimed to launch a crusade against Protestants.",
    "A defensive alliance between Spain and Portugal. This was a major naval threat because it united the two largest fleets in the Atlantic against England."
  ],
  "Who was the Scottish Queen who was also married to the heir of the French throne in 1558?": [
    "Mary of Guise. This meant the French had a direct dynastic interest in placing their Catholic Scottish Queen onto the English throne.",
    "Margaret Tudor. This meant the French had a direct dynastic interest in placing their Catholic Scottish Queen onto the English throne.",
    "Elizabeth of Valois. This meant the French had a direct dynastic interest in placing their Catholic Scottish Queen onto the English throne."
  ],
  "Why was the French threat so dangerous given Elizabeth's financial weaknesses?": [
    "Because France was the largest economy in Europe, they could easily buy up all English wool. This would collapse the English trade system.",
    "Because the French navy was twice the size of the English fleet, they could easily launch a blockade. This would cut off all English trade.",
    "Because the French had the backing of the Pope, they could declare a holy crusade. This would convince English Catholics to join the invasion."
  ],
  "How had Mary I left England religiously divided?": [
    "Mary I had established a strict Protestant church and executed hundreds of Catholics. This recent trauma left deep religious hatred between English Catholics and Protestants.",
    "Mary I had allowed individual counties to choose their own religion, creating local conflicts. This led to small-scale civil wars across the country.",
    "Mary I had signed a treaty with the Pope that placed the English Church under direct Roman control. This angered the patriotic merchant class."
  ],
  "Why did Elizabeth have to be careful not to anger Spain during this early period?": [
    "Spain controlled the Antwerp cloth market, which was vital for England's economy. If Elizabeth angered Spain, she risked collapsing the wool trade.",
    "Spain was England's closest trading partner and supplied all of England's wheat. If Elizabeth angered Spain, she risked causing a massive famine.",
    "Spain had the power to excommunicate Elizabeth immediately. If Elizabeth angered Spain, she would lose the support of all moderate English Protestants."
  ],
  "What had Mary Tudor sold off that reduced Elizabeth's regular income?": [
    "Large quantities of royal timber from the forests. This reduced Elizabeth's ability to build new warships and repair her naval bases.",
    "Significant amounts of Crown lands. This reduced Elizabeth's annual income from rents, meaning the Queen was forced to rely more heavily on calling Parliament for taxes.",
    "All the silver plate and treasures in the royal palaces. This left Elizabeth with no valuables to act as security for foreign loans."
  ],
  "What was the nickname for Elizabeth's Religious Settlement?": [
    "The 'Great Compromise'. It was a deliberate compromise designed to blend Protestant beliefs with familiar Catholic appearances to avoid civil war.",
    "The 'Via Media'. It was a deliberate compromise designed to blend Protestant beliefs with familiar Catholic appearances to avoid civil war.",
    "The 'Protestant Settlement'. It was a deliberate compromise designed to blend Protestant beliefs with familiar Catholic appearances to avoid civil war."
  ],
  "Which 1559 Act made Elizabeth the 'Supreme Governor' of the Church?": [
    "The Act of Uniformity. It required all clergy to swear an oath of allegiance acknowledging her authority over the Church.",
    "The Act of Religion. It required all clergy to swear an oath of allegiance acknowledging her authority over the Church.",
    "The Royal Injunctions. It required all clergy to swear an oath of allegiance acknowledging her authority over the Church."
  ],
  "Why did Elizabeth choose the title 'Supreme Governor' instead of 'Supreme Head'?": [
    "To appease strict Protestants. This cleverly avoided angering Puritans who believed that only Jesus Christ could be the 'Head' of the Church.",
    "To appease the French King. This cleverly avoided suggesting that she had the power to make treaties regarding the French Catholic Church.",
    "To appease Parliament. This cleverly avoided suggesting that she had the power to raise taxes to fund the Church without their approval."
  ],
  "Which 1559 Act dictated the appearance of churches and the form of services?": [
    "The Act of Supremacy. It mandated that every parish use the new English Book of Common Prayer so that worship was identical across the country.",
    "The Royal Injunctions. It mandated that every parish use the new English Book of Common Prayer so that worship was identical across the country.",
    "The Act of Compromise. It mandated that every parish use the new English Book of Common Prayer so that worship was identical across the country."
  ],
  "What were 'recusancy fines'?": [
    "A five-shilling fine for failing to attend Protestant church services on a Sunday. This was roughly a month's wages for a typical labourer, designed to force outward conformity.",
    "A ten-shilling fine for celebrating Catholic Mass in private homes. This was designed to bankrupt Catholic families who refused to conform.",
    "A one-pound fine for possessing an illegal Catholic Latin Bible. This was designed to stamp out Catholic reading materials."
  ],
  "What were the Royal Injunctions?": [
    "A set of laws passed by Parliament on how to run the Church. They included rules such as requiring all priests to marry and banning any church decorations.",
    "A papal decree issued by the Pope condemning the new settlement. It ordered all English Catholics to boycott the Protestant church services.",
    "A set of guidelines written by the Archbishop of Canterbury on how to preach. They focused on theological points regarding the nature of communion."
  ],
  "How many of the 10,000 ordinary parish priests accepted the settlement and took the oath?": [
    "Around 5,000. This showed that the settlement faced significant local resistance from the ordinary clergy at a local level.",
    "Around 9,500. This showed that the settlement was largely successful in gaining the support of the ordinary clergy at a local level.",
    "Around 2,000. This showed that the settlement was a complete failure in gaining the support of the ordinary clergy at a local level."
  ],
  "How did the Marian (Catholic) bishops react to the Act of Supremacy?": [
    "Almost all of them accepted the oath to protect their positions. This allowed Elizabeth to maintain the existing Catholic hierarchy in the Church.",
    "They petitioned the Queen to allow them to remain Catholic while serving the Church. Elizabeth agreed to this compromise for the first ten years.",
    "They fled to Spain to raise a Catholic army to invade England. This left the English Church without any bishops for the first year of her reign."
  ],
  "What language was the new Book of Common Prayer written in?": [
    "Latin. This fulfilled the core Protestant belief that ordinary people should be able to understand church services and read the word of God for themselves.",
    "Greek. This fulfilled the core Protestant belief that ordinary people should be able to understand church services and read the word of God for themselves.",
    "French. This fulfilled the core Protestant belief that ordinary people should be able to understand church services and read the word of God for themselves."
  ],
  "What Catholic-style clothing did Elizabeth insist priests continue to wear under the settlement?": [
    "Copes. Keeping these elaborate robes was part of the 'Middle Way' compromise to ensure church services still looked familiar and comforting to Catholics.",
    "Chasubles. Keeping these elaborate robes was part of the 'Middle Way' compromise to ensure church services still looked familiar and comforting to Catholics.",
    "Albs. Keeping these elaborate robes was part of the 'Middle Way' compromise to ensure church services still looked familiar and comforting to Catholics."
  ],
  "What document was required for a priest to be allowed to preach in Elizabethan England?": [
    "A university divinity degree. This ensured the government could strictly control what messages were being delivered to the masses.",
    "A recommendation letter from a local noble. This ensured the government could strictly control what messages were being delivered to the masses.",
    "An oath of celibacy certificate. This ensured the government could strictly control what messages were being delivered to the masses."
  ],
  "What were the Church Courts responsible for judging?": [
    "Land disputes and inheritance laws. They dealt with non-criminal matters that affected daily life, such as property boundaries and tenant contracts.",
    "Trade regulations and market prices. They dealt with non-criminal matters that affected daily life, such as weight standards and merchant licensing.",
    "Vagrancy offenses and local thefts. They dealt with non-criminal matters that affected daily life, such as homeless begging and small-scale robberies."
  ],
  "How did the Church of England actively promote loyalty to the Queen?": [
    "By requiring all citizens to sign a yearly oath of loyalty at their local church. This reinforced the idea that rebelling against the Queen was a sin against God.",
    "By displaying large portraits of the Queen in place of religious icons inside the churches. This reinforced the idea that she was chosen by God.",
    "By holding weekly public trials of suspected traitors in the churchyard. This reinforced the idea that rebelling against the Queen was a sin against God."
  ],
  "What were 'Visitations'?": [
    "Inspections carried out by the Privy Council every year. Their primary purpose was to ensure that local officials were strictly enforcing royal laws.",
    "Inspections carried out by royal judges twice a year. Their primary purpose was to hold criminal courts and maintain order in the counties.",
    "Inspections carried out by the Queen herself during her summer progresses. Their primary purpose was to meet local people and display her power."
  ],
  "Aside from priests, whose licences did bishops check during Visitations?": [
    "Merchants, traders, and shopkeepers. The Church was responsible for verifying the professional licenses of essential businesses in the community.",
    "Teachers, lawyers, and legal clerks. The Church was responsible for verifying the professional licenses of essential educators and legal workers.",
    "Bakers, butchers, and brewers. The Church was responsible for verifying the professional licenses of essential food suppliers in the community."
  ],
  "What role did the parish church play in the human lifecycle?": [
    "It was responsible for providing education and training for all young people. It ran the local petty schools and organized apprenticeships.",
    "It acted as the local hospital and care home for the sick. It employed midwives and provided medical care for poor families in the parish.",
    "It was the local registry office for all land sales and business contracts. It recorded all property deeds and trade agreements in the county."
  ],
  "What was the role of the Ecclesiastical High Commission?": [
    "To collect the Church taxes (first fruits and tenths) for the Crown. It was a special committee with the power to audit church accounts.",
    "To write new Protestant prayer books and guidelines for services. It was a special committee with the power to define the official Church theology.",
    "To organize the training of new Protestant priests at Oxford and Cambridge. It was a special committee with the power to grant preaching licenses."
  ],
  "How did the Church provide community entertainment?": [
    "Churches hosted weekly theater performances of Biblical plays. They funded and hosted local acting troupes to perform for the parishioners.",
    "Churches organized sports contests, such as mob football and archery. They funded and hosted athletic competitions for the young men.",
    "Churches ran local taverns and breweries in the churchyard. They funded and hosted communal dining events to raise money for the parish."
  ],
  "How did the Church act as a form of mass communication for the government?": [
    "In an era before newspapers, the Church published weekly printed newsheets for the congregation to read. These detailed new laws and royal events.",
    "In an era before newspapers, the bishop sent messengers to ride through the parish shouting news of new laws and royal events.",
    "In an era before newspapers, the Church maintained a public notice board in the churchyard where new laws and royal events were posted."
  ],
  "Why was the Church's endorsement of the 'Divine Right of Kings' politically vital?": [
    "It gave the Queen the power to tax the clergy without their consent. By preaching this doctrine, the Church supported her financial independence.",
    "It gave the Queen the power to make new laws without consulting Parliament. By preaching this doctrine, the Church supported her absolute power.",
    "It gave the Queen the power to choose her own successor without parliamentary approval. By preaching this doctrine, the Church supported her dynastic security."
  ],
  "Who were the Puritans?": [
    "Moderate Protestants who supported the Middle Way compromise. They wanted to maintain a balance between Protestant theology and Catholic traditions.",
    "Strict Catholics who refused to attend the new services. They wanted to restore the authority of the Pope and return the Church to Rome.",
    "English humanists who wanted to reform education. They believed that schools should focus on classical subjects rather than religious training."
  ],
  "What was the Puritan 'Crucifix Controversy'?": [
    "Puritans demanded that all crucifixes be removed from Catholic homes. They viewed them as dangerous symbols of popery that should be banned.",
    "Puritans argued that the Queen should display a large crucifix in her private chapel. They viewed it as a vital symbol of Christian unity.",
    "Puritans protested against the Archbishop of Canterbury wearing a crucifix during services. They viewed it as a sinful display of Catholic pride."
  ],
  "How did Elizabeth respond to the Puritan bishops threatening to resign over crucifixes?": [
    "She ignored their threats and ordered the immediate arrest of those who refused to conform. She replaced them with moderate bishops.",
    "She compromised by allowing crucifixes to be displayed only in private chapels. She did this to avoid a public dispute with her leading ministers.",
    "She backed down completely and ordered all crucifixes in England to be destroyed. She did this to ensure the support of the Puritan MPs."
  ],
  "What was the 'Vestment Controversy' of 1566?": [
    "Puritan priests demanded that the Queen wear simple, plain clothing during royal events. They argued that elaborate displays of wealth were unchristian.",
    "Puritan priests protested against the use of stained glass windows displaying elaborate robes. They viewed them as sinful Catholic decorations.",
    "Puritan priests refused to allow ordinary churchgoers to wear colorful clothing to services. They argued that everyone should dress in black."
  ],
  "How many Puritan priests lost their jobs during the 1566 Vestment Controversy exhibition?": [
    "10 Puritan priests. The Archbishop of Canterbury held a fashion exhibition to enforce the rules, and those who refused to conform were sacked.",
    "100 Puritan priests. The Archbishop of Canterbury held a fashion exhibition to enforce the rules, and those who refused to conform were sacked.",
    "500 Puritan priests. The Archbishop of Canterbury held a fashion exhibition to enforce the rules, and those who refused to conform were sacked."
  ],
  "Why did Puritans object to the existence of bishops?": [
    "They believed bishops were too loyal to the Queen and ignored the authority of the Bible. Puritans argued that the Church should be independent of the Crown.",
    "They believed bishops were secret Catholics who were plotting to restore the Pope. Puritans argued that they should be replaced by Protestant ministers.",
    "They believed bishops were too expensive to maintain and wasted Church funds. Puritans argued that their lands should be sold off to support the poor."
  ],
  "Where did the Puritans base their beliefs on how the church should be run?": [
    "Strictly on the decisions of the early Protestant Reformers in Switzerland. If a practice was not approved by John Calvin, they believed it was ungodly.",
    "Strictly on the laws passed by the English Parliament during Henry VIII's reign. If a practice was not included in the original Reformation acts, they believed it was ungodly.",
    "Strictly on the guidelines written by the Archbishop of Canterbury. If a practice was not explicitly recommended in his sermons, they believed it was ungodly."
  ],
  "Did the Puritans pose a direct military threat to Elizabeth in the 1560s?": [
    "Yes. They formed armed secret societies and plotted to launch a coup to replace Elizabeth with a radical Puritan council.",
    "Yes. They actively aligned with Protestant rebels in Scotland and France to raise a military force to pressure the Queen.",
    "Yes. They launched a series of violent attacks on Catholic chapels and homes in the South, creating fear of a religious civil war."
  ],
  "Why was the Puritan challenge still highly significant despite not being violent?": [
    "Because they had the financial backing of the wealthy merchants in London. This allowed them to build a powerful political party that could block taxes in Parliament.",
    "Because they were supported by foreign Protestant superpowers, like Sweden and Denmark. This threatened to damage England's diplomatic alliances.",
    "Because they controlled the printing presses and could easily distribute anti-government pamphlets to the masses, undermining the Queen's authority."
  ],
  "What specific Catholic features did Puritans want to remove from churches?": [
    "Bibles, pulpit stands, and wooden pews. They believed that these items were unbiblical Catholic inventions that should be replaced by simple mats.",
    "Latin inscriptions, prayer books, and bells. They believed that these items were unbiblical Catholic inventions that should be banned from worship.",
    "Fonts, wedding rings, and funeral biers. They believed that these items were unbiblical Catholic inventions that should be banned from services."
  ],
  "What instruction did the Papacy (the Pope) issue to English Catholics in 1566?": [
    "He ordered them to launch an immediate armed crusade against Elizabeth's government. This instruction escalated Catholic opposition into violent rebellion.",
    "He ordered them to pay a special tax to Rome to fund Catholic plots against the Queen. This instruction escalated Catholic opposition into financial support.",
    "He ordered them to migrate to Catholic countries in Europe to escape Protestant rule. This instruction escalated Catholic opposition into a mass exodus."
  ],
  "What term was used for Catholics who actively refused to attend Protestant services?": [
    "Schismatics. These individuals chose to pay the one-shilling fine rather than compromise their faith by attending the Protestant church.",
    "Papists. These individuals chose to pay the one-shilling fine rather than compromise their faith by attending the Protestant church.",
    "Exiles. These individuals chose to pay the one-shilling fine rather than compromise their faith by attending the Protestant church."
  ],
  "What proportion of the English nobility were estimated to be Catholic recusants or sympathisers?": [
    "Up to one-half. Because these nobles had immense wealth and private armies, the recusant movement was a massive political threat.",
    "Up to two-thirds. Because these nobles had immense wealth and private armies, the recusant movement was a massive political threat.",
    "Up to one-tenth. Because these nobles had immense wealth and private armies, the recusant movement was a massive political threat."
  ],
  "In which geographic area of England was the Catholic challenge the strongest?": [
    "The South-West and Cornwall. Traditional Catholic nobles, like the Earls of Devon, retained massive influence in these regions.",
    "The Midlands and Wales. Traditional Catholic nobles, like the Earls of Worcester, retained massive influence in these regions.",
    "The East Anglia and Essex. Traditional Catholic nobles, like the Earls of Norfolk, retained massive influence in these regions."
  ],
  "What major event in Europe in 1566 threatened to bring Catholic armies closer to England?": [
    "The French Civil War. French Catholic forces defeated Protestant rebels near the Channel ports, turning the territory directly across the water into a war zone.",
    "The German Religious War. Catholic imperial armies marched towards the Baltic coast, turning the territory directly across the sea into a war zone.",
    "The Spanish Armada Mobilization. Spanish fleets gathered in the ports of Galicia, turning the waters directly off the coast into a war zone."
  ],
  "Who did King Philip II of Spain send to the Netherlands in 1567 to crush the Dutch Revolt?": [
    "The Duke of Parma. He arrived with an army of 10,000 veteran Spanish soldiers and established the brutal 'Council of Troubles' to execute Protestants.",
    "The Duke of Medina Sidonia. He arrived with an army of 10,000 veteran Spanish soldiers and established the brutal 'Council of Troubles' to execute Protestants.",
    "Don John of Austria. He arrived with an army of 10,000 veteran Spanish soldiers and established the brutal 'Council of Troubles' to execute Protestants."
  ],
  "Who were the 'Sea Beggars'?": [
    "English privateers commissioned by Elizabeth. She secretly allowed them to shelter in English ports to attack Spanish ships in the Channel.",
    "Dutch Catholic refugees fleeing Spanish persecution. Elizabeth secretly allowed them to shelter in English ports to escape the war in the Netherlands.",
    "French Protestant sailors who raided Spanish treasure fleets. Elizabeth secretly allowed them to shelter in English ports to sell their stolen goods."
  ],
  "What was the Genoese Loan of 1568?": [
    "Gold lent by Spanish bankers to fund the Armada. Elizabeth seized the gold when the ships took shelter in English ports, heavily angering Spain.",
    "Gold lent by Italian merchants to fund English privateers. Elizabeth seized the gold when the merchants refused to pay her a cut of the profits.",
    "Gold lent by the Pope to fund Catholic plots against Elizabeth. Elizabeth seized the gold when it was intercepted by her spies in London."
  ],
  "What drastic action did Pope Pius V take against Elizabeth in 1570?": [
    "He issued a Papal Bull of Interdict. He officially closed all churches in England, banning baptisms, marriages, and funerals.",
    "He issued a Papal Bull of Crusade. He officially called on all Catholic nations to launch a holy war to invade England and depose the Queen.",
    "He issued a Papal Bull of Deposition. He officially declared that Elizabeth was a usurper and ordered her Catholic subjects to overthrow her."
  ],
  "Why was the 1570 Papal Bull so dangerous for Elizabeth?": [
    "It allowed foreign Catholic powers to execute English merchants trading in their countries. This threatened to ruin the English economy.",
    "It allowed the Pope to appoint a Catholic archbishop to run the Church of England in secret. This threatened to create a parallel church system.",
    "It allowed English Catholic priests to celebrate Mass in public without facing recusancy fines. This threatened to make the settlement unenforceable."
  ],
  "Through which royal relative did Mary, Queen of Scots claim her right to the English throne?": [
    "Mary Tudor. Mary was Elizabeth's second cousin and the granddaughter of Henry VIII's sister, giving her a flawless royal bloodline.",
    "Arthur Tudor. Mary was Elizabeth's second cousin and the granddaughter of Henry VIII's sister, giving her a flawless royal bloodline.",
    "Henry VII. Mary was Elizabeth's second cousin and the granddaughter of Henry VIII's sister, giving her a flawless royal bloodline."
  ],
  "Why did English Catholics believe Mary was the rightful Queen instead of Elizabeth?": [
    "Mary was older than Elizabeth and therefore had a senior claim to the throne. Catholics believed that age was the primary factor in royal succession.",
    "Mary had already produced a male heir (James VI), securing the succession. Catholics believed that having a son made her claim superior to Elizabeth's.",
    "Mary was the choice of the Pope, who had issued a papal decree naming her the Queen. Catholics believed that the Pope's decision was absolute."
  ],
  "Which powerful European country had Mary previously been Queen of?": [
    "Spain. She was briefly married to King Philip II, which meant the Spanish heavily supported her claim to the English throne.",
    "Scotland. She was briefly married to King James IV, which meant the Scottish heavily supported her claim to the English throne.",
    "The Netherlands. She was briefly married to the Duke of Orange, which meant the Dutch heavily supported her claim to the English throne."
  ],
  "Why was Mary forced to flee Scotland in 1568?": [
    "Scottish Catholic lords rebelled and forced her to abdicate. This followed a scandal where she was accused of trying to convert Scotland to Protestantism.",
    "Scottish clans launched a civil war over land taxes and forced her to abdicate. This followed a scandal where she was accused of corruption.",
    "Scottish merchant guilds rebelled and forced her to abdicate. This followed a scandal where she was accused of signing a secret trade treaty with France."
  ],
  "What did Mary's arrival in England provide for dissatisfied English Catholics?": [
    "A direct link to the Spanish army in the Netherlands. She provided a channel for plotters to request military help from the Duke of Alba.",
    "A source of Catholic funding from Rome. She provided a channel for plotters to receive gold to pay for weapons and private militias.",
    "A legal defense against recusancy fines. She provided a channel for plotters to request papal exemptions from attending Protestant services."
  ],
  "What concept made Elizabeth reluctant to put Mary on trial or execute her?": [
    "The concept of 'royal immunity'. Elizabeth believed that all royalty were exempt from criminal laws and could only be judged by their own peers.",
    "The concept of 'diplomatic protection'. Elizabeth believed that Mary was a foreign guest who had sought shelter and could not legally be prosecuted.",
    "The concept of 'family honor'. Elizabeth believed that putting her own cousin on trial would bring shame and division to the Tudor dynasty."
  ],
  "Why couldn't Elizabeth simply send Mary back to Scotland?": [
    "It would anger the French King, who wanted Mary to return to France. Elizabeth wanted to maintain good relations with the French government.",
    "It would anger the Pope, who wanted Mary to remain in England to lead the Catholic restoration. Elizabeth wanted to avoid a papal crusade.",
    "It would anger the northern Catholic Earls, who wanted Mary to stay in the North. Elizabeth wanted to avoid provoking a regional rebellion."
  ],
  "Why couldn't Elizabeth allow Mary to travel to France?": [
    "She feared Mary would marry the French King and unite the two crowns. If Mary returned to France, she would pose a massive dynastic threat to England.",
    "She feared Mary would reveal English military secrets to the French army. If Mary returned to France, she would undermine England's national security.",
    "She feared Mary would negotiate a trade treaty that excluded English cloth. If Mary returned to France, she would damage England's merchants."
  ],
  "What physical proof was used by Scottish lords to implicate Mary in murder?": [
    "The 'Darnley Letters'. These were love letters allegedly written by Mary to the Earl of Bothwell, suggesting they conspired to murder Lord Darnley.",
    "The 'Bothwell Casket'. This was a wooden chest containing secret contracts between Mary and the killers, proving she funded the murder.",
    "The 'Holyrood Contract'. This was a signed agreement between Mary and her nobles to assassinate Lord Darnley to allow her to remarry."
  ],
  "Which powerful English noble did Catholic plotters plan to marry Mary to?": [
    "Robert Dudley, the Earl of Leicester. He was England's most senior noble, and a marriage to him was meant to secure the Catholic succession.",
    "Thomas Percy, the Earl of Northumberland. He was England's most senior noble, and a marriage to him was meant to secure the Catholic succession.",
    "Charles Neville, the Earl of Westmorland. He was England's most senior noble, and a marriage to him was meant to secure the Catholic succession."
  ],
  "In what year did Mary, Queen of Scots cross the border and arrive in England?": [
    "1567. She fled across the Solway Firth seeking Elizabeth's protection after her forces were defeated in Scotland.",
    "1569. She fled across the Solway Firth seeking Elizabeth's protection after her forces were defeated in Scotland.",
    "1570. She fled across the Solway Firth seeking Elizabeth's protection after her forces were defeated in Scotland."
  ],
  "What action did Elizabeth take immediately upon Mary's arrival in England?": [
    "She ordered her to be immediately deported to France. Elizabeth wanted to avoid any Catholic plots or involvement in Scottish affairs.",
    "She welcomed her to court in London as an honored royal guest. Elizabeth ordered a series of banquets and tournaments to celebrate her arrival.",
    "She had her arrested and sent to the Tower of London as a suspected traitor. Elizabeth ordered a full trial before the Privy Council."
  ],
  "What was the York Conference (1568–69)?": [
    "A meeting of Protestant bishops. Its official purpose was to write new guidelines for the clergy on how to handle Catholic recusants in the North.",
    "A border summit between English and Scottish diplomats. Its official purpose was to negotiate a treaty regarding the return of Mary to Scotland.",
    "A political assembly of northern nobles. Its official purpose was to debate the legitimacy of the Queen and petition for lower land taxes."
  ],
  "What was the final verdict of the York Conference?": [
    "Mary was found guilty of murder and sentenced to life imprisonment in England. This allowed Elizabeth to lock her up as a convicted criminal.",
    "Mary was found innocent of all charges and Elizabeth was ordered to help her win back her Scottish throne. This forced Elizabeth to raise an army.",
    "Mary was found guilty of treason against Elizabeth and sentenced to execution. This forced Elizabeth to sign her death warrant immediately."
  ],
  "How did Mary's presence in England immediately affect domestic security in 1569?": [
    "It led to a series of Catholic assassination attempts on the Queen in London. Her presence was the immediate catalyst for the Ridolfi Plot.",
    "It caused a massive increase in recusancy fines across the country. Her presence was the immediate catalyst for the government crackdown on Catholics.",
    "It triggered a Protestant protest march on Parliament in London. Her presence was the immediate catalyst for the Puritans demanding her execution."
  ],
  "What did the Duke of Norfolk plan to do with Mary in 1569?": [
    "He planned to help her escape to France. He wanted to secure a foreign Catholic army to invade England, a plan that was heavily backed by Spain.",
    "He planned to put her on trial for the murder of Lord Darnley. He wanted to prove her guilt to the public, a plan that was backed by Protestants.",
    "He planned to appoint her as the regent of Scotland. He wanted to restore her authority over the Scottish lords, a plan that was backed by Cecil."
  ],
  "What did Elizabeth do to the Duke of Norfolk when she discovered his marriage plot?": [
    "She ordered his immediate execution for high treason. This panic caused the Northern Earls to prematurely trigger their rebellion.",
    "She banished him from court and ordered him to live on his estates in East Anglia. This panic caused the Northern Earls to prematurely trigger their rebellion.",
    "She forced him to marry a Protestant noblewoman to end the plot. This panic caused the Northern Earls to prematurely trigger their rebellion."
  ],
  "How did Elizabeth respond when the Northern Earls marched south to try and free Mary?": [
    "She ordered the royal army to attack the rebel camp immediately. This successfully defeated the rebels in a major battle in Yorkshire.",
    "She fled London and took shelter in Windsor Castle for safety. This successfully prevented the rebels from capturing the Queen.",
    "She offered the rebel leaders a full pardon if they dismantled their army. This successfully convinced the Earls to end the rebellion without fighting."
  ],
  "What did Mary's captivity mean for England's relations with Spain?": [
    "It resulted in Spain launching an immediate trade embargo on English cloth. This caused a massive economic recession in London.",
    "It forced Spain to sign a peace treaty acknowledging Elizabeth as the rightful Queen. This brought temporary security to the country.",
    "It led to Spain demanding the release of the Genoese Loan gold in exchange for Mary. This created constant diplomatic negotiations."
  ],
  "Did Elizabeth and Mary ever meet face-to-face during this period?": [
    "Yes, they met once in secret at Richmond Palace in 1572. They attempted to negotiate a compromise but could not agree on the succession.",
    "Yes, they met twice during Elizabeth's summer progresses in the Midlands. They publicly embraced to show their family unity to the crowds.",
    "Yes, they met frequently during the York Conference. They sat together in court to hear the evidence presented by the Scottish lords."
  ],
  "Which two Catholic nobles led the Revolt of the Northern Earls?": [
    "The Earls of Sussex and Leicester. They were traditional Catholic nobles from the north of England who felt politically isolated.",
    "The Earls of Shrewsbury and Huntingdon. They were traditional Catholic nobles from the north of England who felt politically isolated.",
    "The Earls of Pembroke and Derby. They were traditional Catholic nobles from the north of England who felt politically isolated."
  ],
  "What was the main political reason for the Earls' rebellion?": [
    "They objected to the high taxes Elizabeth levied to pay for her wars in France. They felt that the North was paying more than its fair share.",
    "They demanded the restoration of the traditional wool trade with Antwerp. They felt that Elizabeth's policies were ruining the northern economy.",
    "They protested against the appointment of Puritans to run the local courts. They felt that their traditional laws were being replaced."
  ],
  "Who did the Northern Earls want to marry to Mary, Queen of Scots?": [
    "Robert Dudley, the Earl of Leicester. He was England's highest noble, and the marriage was intended to secure a Catholic heir to the throne.",
    "Thomas Percy, the Earl of Northumberland. He was England's highest noble, and the marriage was intended to secure a Catholic heir to the throne.",
    "Charles Neville, the Earl of Westmorland. He was England's highest noble, and the marriage was intended to secure a Catholic heir to the throne."
  ],
  "What significant religious building did the rebels capture in November 1569?": [
    "York Minster. Capturing the spiritual heart of the North allowed them to make a massive public statement of rebellion.",
    "Ripon Cathedral. Capturing the spiritual heart of the North allowed them to make a massive public statement of rebellion.",
    "Carlisle Cathedral. Capturing the spiritual heart of the North allowed them to make a statement of rebellion."
  ],
  "What rebellious religious act did the Earls perform inside Durham Cathedral?": [
    "They arrested the Protestant bishop and held him hostage. This act successfully rallied local religious sympathisers to their cause.",
    "They burned the English Bibles and replaced them with Latin ones. This act successfully rallied local religious sympathisers to their cause.",
    "They celebrated a traditional Protestant service in defiance of the Pope's order. This act successfully rallied local religious sympathisers to their cause."
  ],
  "How many supporters did the Northern Earls manage to rally for their march south?": [
    "Around 10,000 men. However, the rebellion failed to spread beyond the North, leaving them heavily outnumbered by the royal army.",
    "Around 1,500 men. However, the rebellion failed to spread beyond the North, leaving them heavily outnumbered by the royal army.",
    "Around 20,000 men. However, the rebellion failed to spread beyond the North, leaving them heavily outnumbered by the royal army."
  ],
  "Where did Elizabeth abruptly move Mary, Queen of Scots to prevent her from being rescued?": [
    "London. By moving Mary further south, Elizabeth successfully prevented the rebels from reaching their figurehead.",
    "Windsor. By moving Mary further south, Elizabeth successfully prevented the rebels from reaching their figurehead.",
    "Fotheringhay. By moving Mary further south, Elizabeth successfully prevented the rebels from reaching their figurehead."
  ],
  "What was the ultimate fate of the Earl of Northumberland after the revolt collapsed?": [
    "He escaped to France and lived in exile for the rest of his life. His lands were seized by the Crown.",
    "He was pardoned by the Queen in exchange for a massive fine. He was allowed to keep his title but lost all political power.",
    "He was assassinated in his bed by royal agents in Scotland. His death served as a warning to other plotters."
  ],
  "How many ordinary rebels did Elizabeth order to be executed as a deterrent?": [
    "Up to 100 common rebels. This brutal retaliation was designed to utterly crush Catholic dissent and ensure no peasant would ever dare rise again.",
    "Up to 200 common rebels. This brutal retaliation was designed to utterly crush Catholic dissent and ensure no peasant would ever dare rise again.",
    "Up to 2,000 common rebels. This brutal retaliation was designed to utterly crush Catholic dissent and ensure no peasant would ever dare rise again."
  ],
  "What major religious decree did the Pope issue in 1570 as a direct result of the revolt?": [
    "The Papal Bull of Interdict. Pope Pius V officially closed all churches in England, making English Catholics potential traitors.",
    "The Papal Bull of Deposition. Pope Pius V officially declared Elizabeth to be a usurper and ordered her subjects to depose her.",
    "The Papal Bull of Crusade. Pope Pius V officially called on Catholic nations to launch a holy war to invade England and depose the Queen."
  ],
  "In what year did the Ridolfi Plot take place?": [
    "1569. It was orchestrated by Roberto Ridolfi, an Italian banker who used his travel connections to smuggle messages.",
    "1570. It was orchestrated by Roberto Ridolfi, an Italian banker who used his travel connections to smuggle messages.",
    "1572. It was orchestrated by Roberto Ridolfi, an Italian banker who used his travel connections to smuggle messages."
  ],
  "How many Spanish troops did the Duke of Alba promise to send for the Ridolfi Plot?": [
    "5,000 veteran Spanish soldiers. They were supposed to sail from the Netherlands to support the overthrow of Elizabeth.",
    "20,000 veteran Spanish soldiers. They were supposed to sail from the Netherlands to support the overthrow of Elizabeth.",
    "50,000 veteran Spanish soldiers. They were supposed to sail from the Netherlands to support the overthrow of Elizabeth."
  ],
  "Which senior English noble was executed as a result of his involvement in the Ridolfi Plot?": [
    "The Earl of Northumberland. Despite Elizabeth's hesitation to kill her own cousin, Parliament successfully pressured her into executing him.",
    "The Earl of Westmorland. Despite Elizabeth's hesitation to kill her own cousin, Parliament successfully pressured her into executing him.",
    "The Duke of Sussex. Despite Elizabeth's hesitation to kill her own cousin, Parliament successfully pressured her into executing him."
  ],
  "Which foreign power was meant to lead the invasion in the 1583 Throckmorton Plot?": [
    "Spain. The French Duke of Guise planned to invade England to free Mary, Queen of Scots, with the financial backing of King Philip II of Spain.",
    "The Netherlands. The French Duke of Guise planned to invade England to free Mary, Queen of Scots, with the financial backing of King Philip II of Spain.",
    "Scotland. The French Duke of Guise planned to invade England to free Mary, Queen of Scots, with the financial backing of King Philip II of Spain."
  ],
  "What terrifying document did Walsingham find when he raided Francis Throckmorton's house?": [
    "A map of English ports marked for Spanish invasion. This confirmed the government's worst fears about an invisible 'enemy within' waiting to strike.",
    "A coded letter from the Pope authorizing the assassination of the Queen. This confirmed the government's worst fears about an enemy within.",
    "A contract between Throckmorton and French mercenary troops. This confirmed the government's worst fears about an enemy within."
  ],
  "Who wrote the intercepted letters to Mary, Queen of Scots in 1586?": [
    "Francis Throckmorton. He was a young, wealthy Catholic who foolishly detailed a six-step plan to assassinate Queen Elizabeth.",
    "Roberto Ridolfi. He was a young, wealthy Catholic who foolishly detailed a six-step plan to assassinate Queen Elizabeth.",
    "Thomas Howard. He was a young, wealthy Catholic who foolishly detailed a six-step plan to assassinate Queen Elizabeth."
  ],
  "How did Babington attempt to communicate secretly with Mary?": [
    "By hiding messages inside hollow walking sticks. He hid these coded letters inside beer barrels being delivered to her captivity.",
    "By writing messages in invisible ink on the back of prayer books. He hid these coded letters inside beer barrels being delivered to her captivity.",
    "By bribing Mary's guards to carry oral messages. He hid these coded letters inside beer barrels being delivered to her captivity."
  ],
  "What vital role did Sir Francis Walsingham hold in Elizabeth's government?": [
    "He was her Lord Treasurer and chief financial advisor. He built a vast, ruthless intelligence network across Europe to protect the Queen.",
    "He was her Archbishop of Canterbury and religious advisor. He built a vast, ruthless intelligence network across Europe to protect the Queen.",
    "He was her Lord Chancellor and chief judicial officer. He built a vast, ruthless intelligence network across Europe to protect the Queen."
  ],
  "What is an 'agent provocateur'?": [
    "A double agent who feeds false information to foreign governments. Walsingham used these agents to mislead Spanish ambassadors.",
    "A code-breaker who deciphers secret messages intercepted by spies. Walsingham used these agents to find evidence of treason.",
    "A royal guard who protects the Queen from assassination attempts. Walsingham used these agents to secure the palaces."
  ],
  "Who was the expert code-breaker employed by Walsingham to decipher the Babington letters?": [
    "Robert Poley. His ability to break the secret ciphers provided the undeniable written proof that Mary supported Elizabeth's assassination.",
    "Gilbert Gifford. His ability to break the secret ciphers provided the undeniable written proof that Mary supported Elizabeth's assassination.",
    "Arthur Gregory. His ability to break the secret ciphers provided the undeniable written proof that Mary supported Elizabeth's assassination."
  ],
  "In what month and year was Mary, Queen of Scots executed?": [
    "October 1586. She was beheaded at Fotheringhay Castle after 19 years of captivity in England.",
    "August 1586. She was beheaded at Fotheringhay Castle after 19 years of captivity in England.",
    "March 1587. She was beheaded at Fotheringhay Castle after 19 years of captivity in England."
  ],
  "Which specific plot provided the final evidence that led to Mary's execution?": [
    "The Ridolfi Plot (1571). Walsingham's interception of the letters proved she was actively involved in treason.",
    "The Throckmorton Plot (1583). Walsingham's interception of the letters proved she was actively involved in treason.",
    "The Norfolk Plot (1569). Walsingham's interception of the letters proved she was actively involved in treason."
  ],
  "What did Mary explicitly agree to in her coded reply to Babington?": [
    "The invasion of England by a French army. This undeniable written consent left Elizabeth with no political excuse to keep her alive.",
    "The marriage to the Duke of Norfolk to claim the crown. This undeniable written consent left Elizabeth with no political excuse to keep her alive.",
    "The transfer of the English succession to King Philip II. This undeniable written consent left Elizabeth with no political excuse to keep her alive."
  ],
  "Which 1585 law stated that Mary would be executed if she was found guilty of plotting?": [
    "The Act Against Recusancy. This law laid the legal groundwork to bypass Elizabeth's reluctance and force the execution.",
    "The Act of Supremacy. This law laid the legal groundwork to bypass Elizabeth's reluctance and force the execution.",
    "The Act of Uniformity. This law laid the legal groundwork to bypass Elizabeth's reluctance and force the execution."
  ],
  "Why was Elizabeth so hesitant to sign Mary's death warrant?": [
    "Because she feared a massive rebellion among English Protestants who opposed executions. She feared this would destabilize the South.",
    "Because she believed Mary was innocent and was being framed by Walsingham. She feared this would destroy her own reputation.",
    "Because she had promised the Scottish King, James VI, that she would never hurt his mother. She feared this would lead to a Scottish war."
  ],
  "What happened to the domestic Catholic threat in England after Mary's execution?": [
    "It increased significantly. With Mary dead, English Catholics were outraged and launched a series of violent regional rebellions.",
    "It remained completely unchanged. English Catholics continued to plot with Spanish ambassadors to assassinate the Queen.",
    "It resulted in the Pope issuing a new excommunication order. This convinced English Catholics to boycott all Protestant services."
  ],
  "How did King Philip II of Spain react to Mary's execution?": [
    "He signed a peace treaty with England to avoid further conflict. He now realized that England was too strong to defeat.",
    "He demanded that Elizabeth pay compensation to Mary's family in Scotland. He threatened to launch an embargo if she refused.",
    "He offered to marry Elizabeth to unite the two crowns and end the conflict. He now saw her as a legitimate and strong ruler."
  ],
  "What relation was Mary to the new Protestant King of Scotland, James VI?": [
    "She was his sister. However, James VI did not protest her execution because Elizabeth secretly promised him the English throne.",
    "She was his aunt. However, James VI did not protest her execution because Elizabeth secretly promised him the English throne.",
    "She was his cousin. However, James VI did not protest her execution because Elizabeth secretly promised him the English throne."
  ],
  "How did Mary's execution change the future of the English succession?": [
    "It forced Elizabeth to name King Philip II of Spain as her legal heir. This guaranteed that the next monarch would be a Catholic.",
    "It forced Elizabeth to marry Robert Dudley to try and produce a Protestant heir. This guaranteed that the next monarch would be Tudor.",
    "It allowed Parliament to select the next monarch from the English nobility. This guaranteed that the next monarch would be Protestant."
  ],
  "What did the execution prove about the power of Elizabeth's Privy Council?": [
    "It proved they could dissolve Parliament and rule England as a military council to protect the state.",
    "It proved they could arrest and put the Queen on trial if she refused to sign death warrants to protect the state.",
    "It proved they could make treaties with foreign Protestant powers without royal approval to protect the state."
  ],
  "What religion was King Philip II of Spain?": [
    "He was a moderate Protestant. He believed it was his duty to support the new Church of England against radical Puritans.",
    "He was a strict Calvinist. He believed it was his duty to spread the Reformation across Europe and defeat the Catholic Pope.",
    "He was a traditional humanist. He believed it was his duty to promote education and classic studies throughout his empire."
  ],
  "How did the 1570 Papal Bull increase political tension between England and Spain?": [
    "It banned all Spanish merchants from trading with English ports. Because the Pope excommunicated Elizabeth, Philip II halted the wool trade.",
    "It ordered Spain to pay a special tax to Rome to fund the war in the Netherlands. Because of this, Philip II could not afford to build the Armada.",
    "It allowed English privateers to legally raid Spanish colonies without a licence. Because of this, Philip II felt justified in attacking Drake."
  ],
  "Which terrifying Catholic alliance did Spain sign with France in 1584?": [
    "The Treaty of Nonsuch. This united the two most powerful Catholic superpowers in Europe with the specific goal of eradicating Protestantism.",
    "The Treaty of Sèvres. This united the two most powerful Catholic superpowers in Europe with the specific goal of eradicating Protestantism.",
    "The Protocol of Joinville. This united the two most powerful Catholic superpowers in Europe with the specific goal of eradicating Protestantism."
  ],
  "What region of the world did Spain hold a strict trade monopoly over?": [
    "The East Indies (Southeast Asia). Spain claimed that all trade in this region required a Spanish licence, shutting out English merchants.",
    "The Baltic Sea (Northern Europe). Spain claimed that all trade in this region required a Spanish licence, shutting out English merchants.",
    "The Mediterranean (Southern Europe). Spain claimed that all trade in this region required a Spanish licence, shutting out English merchants."
  ],
  "What highly profitable goods were grown and mined in the Spanish New World?": [
    "Wheat, barley, and vast amounts of gold. This wealth funded Spain's massive armies in Europe.",
    "Spices, silk, and vast amounts of copper. This wealth funded Spain's massive armies in Europe.",
    "Cotton, tea, and vast amounts of iron. This wealth funded Spain's massive armies in Europe."
  ],
  "Why did English merchants start trading illegally in the New World?": [
    "Because the French had blockaded their traditional trade routes in the Mediterranean. English merchants desperately needed new markets.",
    "Because the Pope had excommunicated Elizabeth, banning them from trading in Italy. English merchants desperately needed new markets.",
    "Because the gentry had raised land rents, making farming unprofitable. English merchants desperately needed new businesses."
  ],
  "How did Spain react to John Hawkins trading enslaved people in the New World in 1568?": [
    "They welcomed him to trade and granted him a formal Spanish license. This trade agreement brought temporary peace between the two nations.",
    "They ignored his actions because they needed the labor for their plantations. This allowed Hawkins to make a massive profit for his investors.",
    "They petitioned Queen Elizabeth to arrest Hawkins and seize his gold. This diplomatic request was refused, creating tension between the countries."
  ],
  "What was the 'Genoese Loan' that Elizabeth seized in 1568?": [
    "Gold lent by the Pope to fund Catholic plots. Elizabeth seized it while the ships sheltered in English ports, causing a massive diplomatic crisis.",
    "Gold lent by Italian merchants to fund English privateers. Elizabeth seized it while the ships sheltered in English ports, causing a crisis.",
    "Gold lent by Spanish bankers to fund the Dutch rebels. Elizabeth seized it while the ships sheltered in English ports, causing a crisis."
  ],
  "How did Spain's actions in the Netherlands increase religious rivalry?": [
    "The Spanish Inquisition's decision to support Puritan priests in the Netherlands horrified the English. They feared the same would happen to them.",
    "The Spanish army's decision to destroy Catholic churches in the Netherlands horrified the English. They feared the same would happen to them.",
    "The Spanish Inquisition's decision to ban all trade with Protestant merchants in the Netherlands horrified the English. They feared the same."
  ],
  "Why did Elizabeth secretly fund English pirates instead of officially declaring war?": [
    "To build a joint naval coalition with France and the Netherlands. By funding pirates, she prepared for a coordinated war against Spain.",
    "To force Spain to pay compensation for the lost strategic port of Calais. By plundering gold, she recovered the value of the port.",
    "To satisfy the demands of the merchant class who wanted to colonize the Americas. By funding pirates, she explored potential settlement sites."
  ]
};

fs.writeFileSync(path.join(__dirname, 'scratch_distractors_eliz_part1.json'), JSON.stringify(distractorsElizPart1, null, 2), 'utf8');
console.log("Successfully wrote scratch_distractors_eliz_part1.json");
