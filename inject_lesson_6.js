const fs = require('fs');
const path = require('path');

const newLesson6Data = {
  "id": "lesson_6",
  "title": "How did the road to democracy expand?",
  "teacher_notes": {
    "primer": "This final lesson of the unit traces the slow, hard-fought transition of Britain from an aristocratic oligarchy to a burgeoning democracy. It emphasizes that political rights were not freely given but conceded gradually due to popular pressure, utilizing the local Hampshire context of 'rotten boroughs' to highlight the absurdity of the pre-reform system.",
    "objectives": [
      {
        "objective": "Understand the corruption of the unreformed electoral system.",
        "primer": "Use the local case study of Hampshire's 'pocket' and 'rotten' boroughs to demonstrate how wealthy elites completely controlled Parliament before 1832.",
        "question": "How could a town with no people have two Members of Parliament, while a city of a hundred thousand had none?"
      },
      {
        "objective": "Analyse the consequences of the 1832 Great Reform Act and the 1872 Secret Ballot Act.",
        "primer": "Ensure students grasp the distinction between gaining the legal right to vote (franchise) and gaining the practical freedom to vote without fear (secret ballot).",
        "question": "Why might a working-class man feel that the right to vote was useless if his landlord was watching him do it?"
      },
      {
        "objective": "Evaluate primary sources to uncover political motives.",
        "primer": "Guide students to analyze a satirical cartoon and a political speech to understand the deep fear the ruling classes held regarding working-class power.",
        "question": "Why did the wealthy elite view expanding democracy as a dangerous threat rather than a matter of fairness?"
      }
    ]
  },
  "do_now": {
    "title": "Do Now: Recall",
    "type": "questions",
    "items": [
      {
        "question": "What was the 1819 Peterloo Massacre?",
        "answer": "An event in Manchester where local magistrates sent armed cavalry to charge into a crowd of 60,000 peaceful working-class protesters demanding parliamentary reform, resulting in 18 deaths."
      },
      {
        "question": "Name two of the six core demands made by the Chartists in the 'People's Charter'.",
        "answer": "Universal male suffrage (all men get the vote), secret ballots, no property qualifications for MPs, salaries for MPs, equal electoral districts, and annual Parliaments."
      },
      {
        "question": "Why did agricultural laborers in Hampshire launch the violent 'Swing Riots' in 1830?",
        "answer": "They were facing starvation wages and winter unemployment caused by the introduction of mechanical threshing machines, leading them to break machines and burn hayricks in protest."
      }
    ]
  },
  "sources": [
    {
      "title": "The First Secret Ballot, 1872",
      "caption": "A Victorian illustration showing a man casting a vote in a newly designed private wooden booth, fundamentally changing British elections forever by removing public intimidation.",
      "src": "/images/secret_ballot.jpg"
    }
  ],
  "vocab": [
    {
      "term": "Rotten Borough",
      "definition": "An historic town or district that had lost almost all its population but still kept the right to send two Members of Parliament to London."
    },
    {
      "term": "Pocket Borough",
      "definition": "A voting district completely controlled (in the 'pocket' of) a wealthy local landowner who could effectively choose the MP himself."
    },
    {
      "term": "Franchise",
      "definition": "The legal right to vote in political elections."
    },
    {
      "term": "Constituency",
      "definition": "A specific geographical area that voters live in to elect a representative to a legislative body."
    },
    {
      "term": "Secret Ballot",
      "definition": "A voting method in which a voter's choices in an election are anonymous, preventing attempts to influence the voter by intimidation or bribery."
    }
  ],
  "narrative_blocks": [
    {
      "title": "The Unreformed System and the Hampshire Rotten Boroughs",
      "text": "Before 1832, the British electoral system was deeply corrupt and completely unrepresentative of the new industrial nation. Voting was restricted to a tiny minority of wealthy male property owners. The system of constituencies had not been updated for centuries, creating absurd inequalities. Massive new industrial cities like Manchester and Birmingham had zero Members of Parliament (MPs). Meanwhile, abandoned medieval villages—known as 'Rotten Boroughs'—still sent two MPs to Westminster. A shocking local example was Newtown on the Isle of Wight (then part of the historic county of Hampshire). By 1832, Newtown had only 14 rundown houses and barely a dozen voters, yet it possessed two MPs. Furthermore, these voters were easily bribed or intimidated by the local wealthy landowner, making it a 'Pocket Borough'—a seat in Parliament that the elite could simply buy or hand to their friends.",
      "level_4": "Before 1832, voting in Britain was deeply unfair. Only a few rich men could vote. Big new cities full of factories had no MPs to represent them in Parliament. However, empty old villages called 'Rotten Boroughs' still had two MPs. A local example was Newtown in Hampshire, which had only 14 houses but still sent two MPs to London. Rich landowners controlled these areas completely, telling the few local people exactly who to vote for. This was called having a borough in their 'pocket'.",
      "source": {
        "title": "The Old Rotten Tree",
        "type": "image",
        "src": "/images/old_rotten_tree.jpg",
        "caption": "A famous political cartoon titled 'The Old Rotten Tree'. It shows a dead, decaying tree with branches labeled with the names of Rotten Boroughs (like 'Newtown' and 'Old Sarum'). Wealthy politicians sit comfortably in the dead branches like vultures, while angry reformers chop at the trunk with axes labeled 'Reform'.",
        "provenance_clue": "A mass-produced satirical cartoon printed in a cheap radical newspaper, designed to be understood by working-class people who could not read complex political essays."
      },
      "tasks": [
        {
          "type": "provenance",
          "qNum": 1,
          "question": "Source Utility: How useful is the satirical cartoon 'The Old Rotten Tree' for a historian studying the unreformed electoral system, compared to looking at an official government voting register?",
          "model_answer": "An official voting register is highly useful for providing factual, statistical evidence of the corruption (e.g., proving exactly how few voters lived in Newtown). However, the satirical cartoon is also extremely useful because of its provenance and tone. As a piece of cheap, mass-produced propaganda, it reveals the intense public anger and mockery directed at the elite. It proves that the working classes actively viewed the system as 'decaying' (the dead tree) and parasitic (the politicians acting as vultures), helping a historian understand the emotional outrage that fueled the demand for reform."
        }
      ]
    },
    {
      "title": "The 1832 Great Reform Act",
      "text": "Fearing a violent revolution similar to the Swing Riots and the French Revolution, the government finally passed the Great Reform Act in 1832. This was a crucial first step on the road to democracy. The Act abolished 56 of the worst Rotten Boroughs (including Newtown in Hampshire) and created new constituencies for the unrepresented industrial cities in the North. It also expanded the franchise, granting the vote to middle-class men who owned property worth £10 a year. However, the Act deliberately excluded the working classes. The wealthy elite who passed the law hoped that by giving the middle classes the vote, they would pacify the country and prevent any further democratic expansion. For the ordinary factory worker and farm laborer, 1832 felt like a bitter betrayal, sparking the rise of the Chartist movement.",
      "level_4": "The government was terrified that angry workers would start a violent revolution. To calm things down, they passed the Great Reform Act in 1832. This law destroyed the empty 'Rotten Boroughs' like Newtown and gave MPs to the new, busy factory cities. It also allowed middle-class men with property to vote. However, the law did not give the vote to poor working-class men. The rich politicians hoped this small change would stop any more demands, but it just made the working class feel betrayed.",
      "tasks": [
        {
          "type": "exam_practice",
          "qNum": 2,
          "question": "Exam Practice (8 Marks): Explain two consequences of the 1832 Great Reform Act.",
          "model_answer": "One consequence of the 1832 Great Reform Act was the redistribution of political power to reflect the changing geography of Industrial Britain. By abolishing 56 corrupt 'Rotten Boroughs' in the south (such as Newtown in Hampshire) and granting new MPs to massive industrial cities in the north like Manchester, the Act ensured that the areas driving Britain's economy finally had a voice in Parliament.\n\nA second consequence was the intense anger and radicalisation of the working class. The Act extended the franchise only to middle-class men who met a £10 property qualification, deliberately excluding the millions of working-class men who had actively campaigned and rioted for reform. This bitter sense of betrayal had a direct consequence: it spurred the working classes to form their own independent political movement, leading directly to the creation of Chartism and the drafting of the People's Charter in 1838."
        }
      ]
    },
    {
      "title": "The 1872 Secret Ballot Act",
      "text": "Even after the 1832 Act, a major tool of upper-class control remained: public voting. In the 19th century, there was no privacy at elections. Men had to stand on a public platform (the 'hustings') and shout out the name of the candidate they were voting for in front of a cheering or booing crowd. This meant that landlords, factory owners, and violent mobs knew exactly how every man voted. If a worker voted against his boss's chosen candidate, he could be fired, evicted from his home, or physically beaten. True democratic freedom was impossible under these conditions. Finally, in 1872, Parliament passed the Secret Ballot Act. It required voters to mark their choices on a printed paper inside a private wooden booth and drop it into a locked box. Almost overnight, the power of elite bribery and intimidation collapsed.",
      "level_4": "Even after some men won the right to vote, the system was not fair because voting was done in public. A voter had to stand on a stage and shout out who he was voting for. This meant his boss or landlord was watching. If a poor man voted the 'wrong' way, he could be fired from his job or kicked out of his house. In 1872, the government passed the Secret Ballot Act. This allowed men to vote in a private wooden booth using a piece of paper, meaning rich bosses could no longer bully or bribe people for their votes.",
      "tasks": [
        {
          "type": "categorisation",
          "qNum": 3,
          "question": "Significance Analysis: Which piece of legislation made the greatest practical difference to the political freedom of an ordinary voter: gaining the franchise in a Reform Act, or the 1872 Secret Ballot Act? Explain your reasoning.",
          "model_answer": "While the Reform Acts were legally essential because they granted the technical right to vote, the 1872 Secret Ballot Act arguably made the greatest practical difference to an individual voter's freedom. Before 1872, the franchise was effectively an illusion for poorer men, as public voting meant their choices were entirely dictated by the fear of eviction or unemployment orchestrated by wealthy landlords and employers. The Secret Ballot Act severed this mechanism of intimidation, transforming the vote from a public display of obedience into a genuine, protected democratic choice."
        }
      ]
    },
    {
      "title": "Expanding the Franchise: The Acts of 1867 and 1884",
      "text": "The pressure from working-class movements like Chartism ultimately proved impossible to ignore. By the 1860s, politicians realized that expanding the vote was inevitable. In 1867, the Second Reform Act was passed, granting the vote to skilled working-class men in urban towns and cities. Later, the 1884 Third Reform Act extended this exact same right to the countryside, finally giving agricultural laborers and miners the vote. However, this expansion was not driven purely by a belief in fairness. The ruling elite deeply feared the working masses, viewing them as uneducated and dangerous. Politicians like Conservative leader Benjamin Disraeli eventually passed these reforms out of calculated political strategy; he hoped that by 'gifting' the working class the vote, they would gratefully vote for the Conservative party in return, preserving the elite's hold on power.",
      "level_4": "The government eventually realized they could not stop ordinary people from demanding the vote forever. In 1867, a new law gave the vote to skilled workers in big cities. Then, in 1884, another law gave the vote to farm workers in the countryside. The politicians did not do this just because it was fair. Many rich leaders were still terrified of the working class. However, clever politicians gave them the vote hoping that the newly enfranchised workers would be so grateful they would vote for the politicians who gave it to them.",
      "source": {
        "author": "Robert Lowe, Member of Parliament",
        "date": "1866",
        "text": "\"If you give the working classes the franchise, you are handing over the government of this country to the most ignorant, the most impulsive, and the most violent part of the population. They have no property to protect, and therefore they will simply vote to tax the wealthy and destroy the institutions that have made Britain great. It is a leap in the dark.\"",
        "provenance_clue": "A speech delivered in the House of Commons by an anti-reform politician directly attempting to persuade other MPs to vote against the 1867 Reform Act."
      },
      "tasks": [
        {
          "type": "provenance",
          "qNum": 4,
          "question": "Read the speech by Robert Lowe (1866). Based on this source, explain the underlying fear that caused wealthy elites to resist expanding the franchise to the working classes.",
          "model_answer": "The source reveals that the wealthy elite resisted expanding the franchise out of a profound fear of class warfare and loss of property. Lowe explicitly characterizes the working class as 'ignorant', 'impulsive', and 'violent'. Because the working masses did not own property, the elite feared that if they gained political power, they would use the democratic system to 'tax the wealthy' and dismantle the privileged institutions that protected the upper classes, overturning the entire social hierarchy of Britain."
        }
      ]
    },
    {
      "title": "The Road Ahead: An Incomplete Democracy",
      "text": "By the end of the 19th century, the British political landscape had been radically transformed. The corrupt, aristocratic oligarchy that had allowed empty Hampshire fields to elect MPs had been dismantled. Due to the Reform Acts of 1832, 1867, and 1884, and the protection of the 1872 Secret Ballot, roughly 60% of adult men in Britain now had a secure, private vote. However, the road to a true democracy was far from complete. Millions of the poorest, unpropertied men were still legally excluded from voting. More glaringly, every single woman in the country, regardless of her wealth or education, was entirely barred from the political process. The fierce resistance of the 19th-century working man laid the foundation for democracy, but it set the stage for the explosive struggle of the Suffragettes in the century to come.",
      "level_4": "By the end of the 1800s, Britain had changed massively. The corrupt system of 'Rotten Boroughs' was gone. Thanks to the new laws and the secret ballot, over half of all men in Britain could now vote safely and privately. However, Britain was not a true democracy yet. The very poorest men were still not allowed to vote. Most importantly, no women were allowed to vote at all, no matter how rich or smart they were. The working men had won their fight, but the battle for women's voting rights was just about to begin.",
      "tasks": [
        {
          "type": "extended_writing",
          "qNum": 5,
          "question": "Synthesis Assessment: To what extent was Britain a fully functioning democracy by the end of 1884? Use evidence from across the lesson to support your judgment.",
          "model_answer": "By 1884, Britain was only a partial democracy; while it had made immense progress in dismantling aristocratic corruption, it remained fundamentally incomplete. \n\nOn one hand, the progress toward democracy since the unreformed era was highly significant. The egregious corruption of 'Pocket Boroughs' like Newtown in Hampshire had been abolished by the 1832 Act, giving industrial cities a voice. Furthermore, the 1867 and 1884 Acts successfully expanded the franchise to urban and rural working-class men. Crucially, the 1872 Secret Ballot Act ensured this franchise functioned democratically, as men could finally vote without the threat of intimidation or eviction from their employers. These milestones transformed Britain from an elite oligarchy into a representative state for the majority of men.\n\nHowever, it is impossible to call Britain a 'fully functioning democracy' by 1884 because the system still relied on vast, systemic exclusion. The franchise was still tied to property qualifications, meaning the absolute poorest men in society remained legally barred from political participation. Most severely, 100% of the female population was disenfranchised based purely on gender. Because a true democracy requires universal representation for all citizens, the Britain of 1884 can only be categorized as an evolving, incomplete democracy that had laid the structural groundwork for the universal suffrage battles of the 20th century."
        }
      ]
    }
  ]
};

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// Find existing lesson_6 and replace it
const existingIndex = data.lessons.findIndex(l => l.id === 'lesson_6');
if (existingIndex >= 0) {
  data.lessons[existingIndex] = newLesson6Data;
} else {
  data.lessons.push(newLesson6Data);
}

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');

// Copy generated images
fs.copyFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/55339e94-ff4f-48f5-92ae-7a43847c9408/secret_ballot_1786700672367.jpg', 'public/images/secret_ballot.jpg');
fs.copyFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/55339e94-ff4f-48f5-92ae-7a43847c9408/rotten_tree_1786700692106.jpg', 'public/images/old_rotten_tree.jpg');

console.log('Successfully injected Lesson 6 and copied AI generated images!');
