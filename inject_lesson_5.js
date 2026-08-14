const fs = require('fs');
const https = require('https');

const lesson5Data = {
  "id": "lesson_5",
  "title": "How did ordinary people fight for a voice?",
  "teacher_notes": {
    "primer": "This lesson evaluates how working-class resistance transformed from violent, uncoordinated machine-breaking into organized, mass political movements. It tests students' historical reasoning by contrasting the rural Hampshire Swing Riots with the urban constitutional challenge of Chartism, assessing how different social classes reacted to the pressures of an industrial economy.",
    "objectives": [
      {
        "objective": "Analyse how industrialisation and agricultural change provoked violent working-class resistance.",
        "primer": "Examine the local context of the Hampshire Swing Riots of 1830 to show how technological displacement (threshing machines) led directly to agrarian revolt.",
        "question": "Was the destruction of agricultural machinery driven by a hatred of technology or a desperation for survival?"
      },
      {
        "objective": "Evaluate how the Chartist movement shifted working-class strategy toward constitutional reform.",
        "primer": "Guide pupils through the six core points of the People's Charter, explaining how political franchise was viewed as the ultimate solution to economic misery.",
        "question": "Why did Chartists believe that winning the right to vote was more important than destroying machinery?"
      },
      {
        "objective": "Assess primary source utility through provenance and tone analysis.",
        "primer": "Contrast an official, top-down judicial warning with a bottom-up, pseudonymous threatening letter to discover how state authorities and laborers contested power.",
        "question": "How does the tone of an anonymous threat compare to the language of a royal court decree when assessing historical utility?"
      }
    ]
  },
  "do_now": {
    "title": "Do Now: Recall",
    "type": "questions",
    "items": [
      {
        "question": "What private corporate entity controlled British commercial and military interests in India until its formal abolition in 1858?",
        "answer": "The East India Company (EIC)."
      },
      {
        "question": "What was the 'Two-Power Standard' followed by the British government in the 19th century?",
        "answer": "A naval policy declaring that the Royal Navy must always remain larger and stronger than the combined fleets of the next two most powerful nations in the world."
      },
      {
        "question": "How did the industrial workforce at Portsmouth Dockyard directly support British naval supremacy?",
        "answer": "The dockyard functioned as a massive steam-powered industrial complex where thousands of workers manufactured advanced, iron-hulled 'Ironclad' warships."
      }
    ]
  },
  "visual_hook": {
    "title": "The Chartist Mass Demonstration at Kennington Common, 1848",
    "caption": "A historic photograph capturing thousands of Chartist protestors gathering in London to present their third massive petition to Parliament, demanding democratic rights.",
    "query": "Chartist demonstration Kennington Common 1848 photograph"
  },
  "vocab": [
    {
      "term": "Franchise",
      "definition": "The statutory right to vote in public political elections."
    },
    {
      "term": "Chartism",
      "definition": "A working-class movement for parliamentary reform between 1838 and 1848, campaigning for the democratic rights outlined in the People's Charter."
    },
    {
      "term": "Swing Riots",
      "definition": "A widespread uprising of agricultural workers across southern England in 1830, characterized by machine-breaking and arson."
    },
    {
      "term": "Constitutional Reform",
      "definition": "Making legal changes to the political system and the framework of government rather than using violent revolution to achieve power."
    },
    {
      "term": "Transportation",
      "definition": "A 19th-century criminal punishment where convicts were exiled to penal colonies abroad, most notably to Australia."
    }
  ],
  "narrative_blocks": [
    {
      "title": "The Flashpoint of Discontent: The Peterloo Massacre (1819)",
      "text": "In the decades following the industrial changes explored in this unit, ordinary working-class people possessed zero political power. Parliament was entirely controlled by wealthy landowners, and fast-growing industrial towns had no MPs to represent them. In August 1819, this political exclusion resulted in tragedy. Over 60,000 peaceful working-class men, women, and children gathered at St Peter's Field in Manchester to demand parliamentary reform and affordable food. Alarmed by the sheer size of the crowd, local magistrates panicked and ordered the cavalry to charge into the dense gathering with sabers drawn. The resulting panic left 18 dead and over 650 severely wounded. Radicals bitterly labeled the event the 'Peterloo Massacre', drawing an ironic comparison to the military victory at Waterloo. The state's violent response proved that the British establishment viewed peaceful working-class political demands as a treasonous threat to national stability.",
      "level_4": "In 1819, ordinary working people had no right to vote or choose MPs. In August, 60,000 peaceful workers met in Manchester to demand political rights. Local leaders panicked and ordered soldiers on horses to ride into the crowd with sharp swords. 18 people were killed and over 650 were hurt. This event was called the Peterloo Massacre, proving the government would use extreme violence to stop working people from asking for power.",
      "tasks": [
        {
          "type": "timeline",
          "qNum": 1,
          "question": "Construct a brief chronological timeline showing the progression of working-class resistance and state response between 1819 and 1848 based on the scope of this lesson's themes.",
          "model_answer": "* **1819:** The Peterloo Massacre – Peaceful protestors demanding vote reform are cut down by state cavalry in Manchester.\n* **1830:** The Hampshire Swing Riots – Agrarian workers destroy threshing machines in a violent wave of economic protest.\n* **1834:** The Tolpuddle Martyrs Case – Six agricultural laborers are sentenced to penal transportation for forming an early trade union.\n* **1838:** The Launch of the People's Charter – Chartists publish their six core democratic demands for constitutional reform.\n* **1848:** The Kennington Common Chartist Rally – The final mass petition is delivered to Parliament amid fears of revolution."
        }
      ]
    },
    {
      "title": "Rebellion in the Hampshire Fields: The Swing Riots (1830)",
      "text": "While industrial cities saw mass demonstrations, the rural countryside experienced an explosion of agrarian violence. In the winter of 1830, agricultural laborers across southern England reached breaking point. Hit by successive harvest failures and winter unemployment caused by the introduction of mechanical threshing machines, families faced literal starvation. Laborers launched an automated campaign of destruction known as the 'Swing Riots', named after their mythical, pseudonymous leader 'Captain Swing'. In Hampshire, the riots were exceptionally severe. Armed bands of laborers marched through villages, setting fire to hayricks, destroying mechanical threshing machines, and demanding a minimum living wage. The state reacted with uncompromising fury to protect the property rights of the elite. Over 100 Hampshire rioters were tried at Winchester Castle; 6 men were executed, and hundreds were sentenced to penal transportation to Australia.",
      "level_4": "In 1830, farming workers in southern England were starving due to low wages and new threshing machines taking their winter winter jobs. They started a violent protest called the Swing Riots, named after a fake leader called 'Captain Swing'. In Hampshire, workers marched through villages destroying machines and burning hayricks. The government reacted brutally: they put over 100 Hampshire workers on trial at Winchester, hanging 6 men and sending hundreds to prison colonies in Australia.",
      "source": {
        "type": "written",
        "title": "Source A: The Threat of Captain Swing",
        "content": "\"Sir, This is to inform you what will happen to you if you do not instantly destroy your threshing machines and raise the wages of your poor laborers to two shillings a day. We have sworn to endure this starvation no longer. If you do not break your machines yourself, we will come by night and burn them down, along with your barns and hayricks. Your injured servant, Captain Swing.\"\n— Signed by 'Captain Swing', October 1830",
        "provenance_clue": "An anonymous threatening letter sent directly to a wealthy landowner in the Hampshire countryside during the peak of the winter machinery burnings."
      },
      "tasks": [
        {
          "type": "provenance",
          "qNum": 2,
          "question": "Analyze how the provenance and anonymous nature of the 'Captain Swing' source impact its usefulness for a historian investigating working-class grievances during the 1830 riots.",
          "model_answer": "The source is immensely useful precisely because of its anonymous and threatening provenance. Because laborers faced execution or transportation for protesting, they had to hide their identities under the pseudonym 'Captain Swing' to communicate safely. This hidden provenance allows a historian to see the true, unvarnished motives of the rioters: it explicitly outlines their economic grievances (starvation wages and threshing machines) and demonstrates that they were willing to use targeted arson to force landowners into structural concessions."
        }
      ]
    },
    {
      "title": "The Legal Noose: The Tolpuddle Martyrs (1834)",
      "text": "Following the Swing Riots, working-class men realized that uncoordinated property destruction resulted only in execution or exile. Instead, they began exploring a new strategy: collective bargaining through Trade Unions. By combining their numbers, workers hoped they could legally force employers to pay fair wages. However, the state remained determined to crush any form of organized working-class combination. In 1834, six agricultural laborers in the Dorset village of Tolpuddle formed a friendly society to protest a wage cut. To ensure loyalty, they swore a traditional, secret oath. Seizing on this detail, the government arrested them under an obscure 1797 law that banned unlawful secret oaths. The 'Tolpuddle Martyrs' were sentenced to seven years' transportation to Australia. The severity of the sentence provoked national outrage, triggering massive union marches in London until the government was eventually forced to grant them a full pardon.",
      "level_4": "After the riots, workers tried a new plan: forming Trade Unions so they could stick together to ask for better pay. In 1834, six farm workers in Tolpuddle formed a group. To stop them, the government used an old law about secret oaths to arrest them. These 'Tolpuddle Martyrs' were sent away to Australia for seven years. This cruel punishment shocked the country, leading to massive protests until the government pardoned them.",
      "tasks": [
        {
          "type": "text",
          "qNum": 3,
          "question": "Why did the British government use an obscure law about 'secret oaths' to convict the Tolpuddle Martyrs in 1834?",
          "model_answer": "The government used the obscure 1797 law on secret oaths because forming a trade union was not technically illegal in 1834. Desperate to crush organized labor combinations before they spread across the country, the magistrates used the technicality of the secret loyalty oath sworn by the members to hand down a severe sentence of transportation as a deterrent."
        }
      ]
    },
    {
      "title": "The Constitutional Challenge: Chartism and the People's Charter",
      "text": "By the late 1838, working-class strategy shifted entirely from economic machinery sabotage to structural constitutional reform. Leaders realized that factory conditions, low wages, and judicial hostility would never change until working-class men sat in Parliament. This realization birthed Chartism, the first mass working-class democratic movement in British history. Launched in 1838, the movement was built around the **People's Charter**, which demanded six core political changes: 1) Universal male suffrage, 2) Secret ballots to stop voter intimidation, 3) No property qualifications for MPs, 4) Salaries for MPs so poor men could run for office, 5) Equal electoral districts, and 6) Annual Parliaments. The Chartists gathered millions of signatures on three mammoth petitions, delivering them to Parliament in 1839, 1842, and 1848, threatening a national general strike if their demands were ignored.",
      "level_4": "By 1838, workers decided that breaking machines would never fix their lives. They realized they needed to change the laws by getting working men into Parliament. They started a movement called Chartism. They wrote the 'People's Charter' with six key demands, including the right for all men to vote, secret voting, and paying MPs so poor men could afford to lead the country. They collected millions of signatures to pressure Parliament.",
      "source": {
        "type": "written",
        "title": "Source B: The Demands of the Chartist Leader",
        "content": "\"We look upon the franchise [vote] as our right, and as the only tool by which we can remove our heavy economic burdens. We are starved by unjust laws; our children are worked to death in your factories; our wages are stripped by taxes. Give us the vote, and we shall send men to Parliament who will dismantle this machinery of oppression and replace it with laws of justice.\"\n— William Lovett, Chartist Leader, May 1838",
        "provenance_clue": "An excerpt from the preamble of the People's Charter, published publicly to organize millions of working-class supporters across the nation's industrial hubs."
      },
      "tasks": [
        {
          "type": "empathy",
          "qNum": 4,
          "question": "Assume the persona of a Chartist speaker at the mass rally at Kennington Common in 1848. Deliver a brief speech explaining to your fellow workers why winning the 'People's Charter' is the only permanent solution to factory and agrarian misery.",
          "model_answer": "Fellow workers! For decades, we have broken our backs in the deafening factories of the north and bled in the freezing mud of the Hampshire brickfields! When we broke machines in 1830, they answered us with the gallows at Winchester. When we gathered peacefully at Peterloo, they answered us with cavalry swords! I tell you, breaking iron or begging landlords will never cure our misery! We stand here today because we have uncovered the truth: our suffering is caused by the laws made in Westminster! As long as Parliament belongs only to wealthy property owners, our children will be worked to death as Canary Girls and our wages will remain at starvation levels. The People's Charter is our ultimate weapon! With the secret ballot and universal male suffrage, we shall sweep the corrupt landowners from power and elect men from our own ranks. Give us the vote, and we shall rewrite the laws of England to favor the worker, not the master!"
        }
      ]
    },
    {
      "title": "The Legacy of Resistance: Progress through Struggle",
      "text": "Parliament rejected all three Chartist petitions with overwhelming contempt, deploying troops to arrest key leaders and secure major cities. On the surface, Chartism had failed, and its mass demonstrations ended after 1848 without winning a single demand immediately. However, historians view Chartism as a massive long-term catalyst for democratic progress. The movement successfully unified millions of diverse workers, establishing a permanent tradition of organized working-class resistance. Over the next eighty years, the pressure created by this political legacy forced the British establishment to slowly concede almost every Chartist demand. By 1928, five of the six points of the People's Charter had become the law of the land (with only annual Parliaments rejected), proving that the rights enjoyed in modern democracy were not gifted by the elite, but fought for by ordinary people.",
      "level_4": "Parliament rejected the Chartist petitions every time and sent soldiers to arrest the leaders. Although Chartism seemed to fail in 1848, it actually changed Britain forever. It taught working people how to organize and stand together. Over the next eighty years, the government was slowly forced by fear of revolution to give in. By 1928, five of the six Chartist demands had become law, proving our democratic rights were won by the struggle of ordinary people.",
      "tasks": [
        {
          "type": "extended_writing",
          "qNum": 5,
          "question": "Synthesis Assessment (8 Marks): 'The violent machine-breaking of the Swing Riots posed a far greater threat to the British establishment than the political campaigning of the Chartists.' To what extent do you agree with this interpretation? Use evidence from across the lesson to support your argument.",
          "model_answer": "It can be argued to a certain extent that the violent machine-breaking of the 1830 Swing Riots posed an immediate physical threat to the property of the ruling class, but a comprehensive historical analysis reveals that the political campaigning of the Chartists posed a far more dangerous, structural threat to the existence of the British establishment.\n\nOn one hand, the Swing Riots represented a terrifying breakdown of law and order across rural England, including Hampshire. The targeted destruction of mechanical threshing machines, anonymous 'Captain Swing' arson attacks, and physical intimidation of wealthy landowners directly threatened the immediate agricultural wealth of the ruling elite. The extreme violence of the state's response—deploying troops, hanging ringleaders at Winchester, and exiling hundreds to Australia via transportation—proves that the government viewed this localized property destruction as an active, urgent emergency that required immediate military suppression.\n\nHowever, the threat posed by the Swing Riots was inherently limited because it was uncoordinated, focused entirely on short-term economic relief (destroying machines and securing two shillings a day), and did not challenge the state's right to rule. Conversely, Chartism posed a profound, existential threat to the entire British political structure. Instead of breaking local machinery, the Chartists organized millions of urban industrial workers into a unified, national movement demanding constitutional reform. Their demands, such as universal male suffrage and secret ballots, directly threatened to strip the wealthy landowning elite of their political monopoly in Parliament. Furthermore, by collecting millions of signatures on petitions and threatening a general strike, Chartism proved that the working class had developed the organizational sophistication to potentially overthrow the government.\n\nUltimately, while the Swing Riots threatened the property of individual landowners, Chartism threatened the political survival of the establishment itself. The Swing Riots were a localized reaction to starvation, but Chartism was a revolutionary political alternative that eventually forced the elite to slowly democratize the nation over the next century."
        }
      ]
    }
  ],
  "sources": []
};

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// Fetch image for visual_hook
const options = {
  hostname: 'en.wikipedia.org',
  path: '/w/api.php?action=query&titles=Chartism&prop=pageimages&format=json&pithumbsize=500',
  headers: {
    'User-Agent': 'MeoncrossHistoryApp/1.0 (benlovett@example.com)'
  }
};

https.get(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    let wikiData = JSON.parse(body);
    let pages = wikiData.query.pages;
    let pageId = Object.keys(pages)[0];
    let imageUrl = pages[pageId].thumbnail ? pages[pageId].thumbnail.source : null;
    
    if (imageUrl) {
      console.log('Found image URL:', imageUrl);
      const file = fs.createWriteStream('public/images/chartist_demo.jpg');
      https.get(imageUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Image downloaded successfully.');
          
          lesson5Data.sources = [{
            title: lesson5Data.visual_hook.title,
            caption: lesson5Data.visual_hook.caption,
            src: "/images/chartist_demo.jpg"
          }];
          delete lesson5Data.visual_hook;
          
          const existingIndex = data.lessons.findIndex(l => l.id === 'lesson_5');
          if (existingIndex >= 0) {
            data.lessons[existingIndex] = lesson5Data;
          } else {
            const lesson4Index = data.lessons.findIndex(l => l.id === 'lesson_4');
            data.lessons.splice(lesson4Index + 1, 0, lesson5Data);
          }

          fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
          console.log('Successfully injected Lesson 5!');
        });
      });
    } else {
      console.log('No image found via Wikipedia API. Injecting without source src.');
      delete lesson5Data.visual_hook;
      const existingIndex = data.lessons.findIndex(l => l.id === 'lesson_5');
      if (existingIndex >= 0) {
        data.lessons[existingIndex] = lesson5Data;
      } else {
        data.lessons.push(lesson5Data);
      }
      fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
    }
  });
}).on('error', (e) => {
  console.error(e);
});
