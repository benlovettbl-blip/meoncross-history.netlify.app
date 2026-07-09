import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('great_war', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

// Add Historian's Corner and GCSE Task to all lessons
const historianCorners = [
  {
    title: "The 'Master Planner' Debate",
    text: "Historians debate whether Bismarck was a genius 'master planner' who plotted the Franco-Prussian War years in advance, or merely a brilliant opportunist who reacted to events (like the Ems Telegram) as they happened. A.J.P. Taylor famously argued Bismarck just rode the wave of events."
  },
  {
    title: "The Primat der Innenpolitik",
    text: "Some historians (like Eckart Kehr) argue that Wilhelm II's aggressive Weltpolitik was actually driven by domestic politics. By creating foreign enemies, the Kaiser hoped to distract the German working class from voting for socialist parties at home."
  },
  {
    title: "The Anglo-German Antagonism",
    text: "Paul Kennedy argues that the naval arms race was the single most decisive factor in turning Britain from a neutral observer into Germany's enemy, as the threat of a German navy fundamentally challenged Britain's core survival strategy."
  },
  {
    title: "The 'Powder Keg' Inevitability",
    text: "Was war inevitable in the Balkans? Richard Evans argues that the complex alliance system turned the Balkans into a doomsday machine, where any small conflict was mathematically guaranteed to drag all the Great Powers into a general war."
  },
  {
    title: "The Fischer Controversy",
    text: "In 1961, German historian Fritz Fischer shocked the world by arguing that Germany deliberately caused WWI to achieve world power status. He pointed to the 'Blank Cheque' as evidence that Germany actively pushed Austria into war, knowing it would provoke Russia."
  }
];

const gcseTasks = [
  {
    sources: [
      {
        type: "visual",
        src: "assets/alsace_lorraine_simple_map.png",
        title: "Source A: Map of Alsace-Lorraine, annexed by Germany in 1871."
      },
      {
        type: "written",
        text: "“France will never forgive us for taking Alsace-Lorraine. We must ensure she never finds an ally to help her take it back.”",
        title: "Source B: Extract from a private letter written by Otto von Bismarck, 1872."
      }
    ],
    topic: "the reasons for French hatred of Germany after 1871",
    model: "Source A is highly useful as it visually proves the strategic and economic loss of Alsace-Lorraine to Germany. Its origin as a factual map makes the content reliable. Source B is also highly useful; as a private letter from Bismarck (the Chancellor), it provides honest insight into Germany's awareness of French desire for 'revanche', giving us the motive for Bismarck's future alliance system. Together, they explain both the geographic cause of the hatred and the political consequences."
  },
  {
    sources: [
      {
        type: "visual",
        src: "assets/was_greedy_boy.png",
        title: "Source A: A British political cartoon from 1897 showing Kaiser Wilhelm II."
      },
      {
        type: "written",
        text: "“We do not want to put anyone in the shade, but we too demand our place in the sun.”",
        title: "Source B: Speech by German Foreign Minister Bernhard von Bülow to the Reichstag, 1897."
      }
    ],
    topic: "the impact of Weltpolitik on international relations",
    model: "Source A is useful for showing the British perception of Weltpolitik; the cartoon's purpose is to mock Wilhelm II as greedy, demonstrating the growing tension between Britain and Germany. Source B is useful for understanding the German intent behind Weltpolitik; as a public speech to the Reichstag, its purpose is to rally domestic support for empire-building. Together they show how German ambition directly caused British anxiety."
  },
  {
    sources: [
      {
        type: "visual",
        src: "assets/was_dreadnought_blueprint.png",
        title: "Source A: Official technical blueprint of HMS Dreadnought, 1906."
      },
      {
        type: "written",
        text: "“We want eight, and we won't wait!”",
        title: "Source B: Popular British political slogan chanted by the public in 1909."
      }
    ],
    topic: "the effects of the Anglo-German naval arms race",
    model: "Source A is useful for showing the technological leap that triggered the arms race; its origin as an official blueprint makes it highly reliable evidence of the ship's massive guns. Source B is highly useful for showing the psychological impact of the arms race on the British public; its purpose was to pressure the government to build more ships. Together, they show how technological advances fueled public panic."
  },
  {
    sources: [
      {
        type: "visual",
        src: "assets/balkans_1914_simple_map.png",
        title: "Source A: Map of the Balkans showing the expansion of Serbia after 1913."
      },
      {
        type: "written",
        text: "“Serbia is a viper that must be crushed. If we do not destroy them now, our empire will be torn apart by Slavic nationalism.”",
        title: "Source B: Diary entry of the Austro-Hungarian Chief of Staff, Conrad von Hötzendorf, 1913."
      }
    ],
    topic: "the threat posed by Serbia to Austria-Hungary",
    model: "Source A is useful because it visually demonstrates how Serbia nearly doubled in size after the Balkan Wars, making it a much larger physical threat. Source B is extremely useful because, as a private diary entry, it reveals the genuine panic and aggressive intentions of the Austro-Hungarian military command without political censorship. Together, they prove that Austria-Hungary felt an existential need to destroy Serbia."
  },
  {
    sources: [
      {
        type: "visual",
        src: "assets/was_boiling_point.png",
        title: "Source A: 'The Boiling Point', a British cartoon published in Punch Magazine, 1912."
      },
      {
        type: "written",
        text: "“You may rest assured that His Majesty will faithfully stand by Austria-Hungary, as is required by the obligations of his alliance and of his ancient friendship.”",
        title: "Source B: The 'Blank Cheque' telegram sent from Germany to Austria-Hungary, 5 July 1914."
      }
    ],
    topic: "the causes of the outbreak of World War I",
    model: "Source A is useful for showing the long-term tension in the Balkans; its purpose is to warn the British public that the 'Great Powers' were struggling to keep the peace. Source B is crucial for understanding the short-term trigger; as an official diplomatic telegram, it proves that Germany gave Austria-Hungary unconditional support, which gave Austria the confidence to attack Serbia. Together, they explain why a regional crisis exploded into a world war."
  }
];

unitData.lessons.forEach((l, i) => {
  l.historians_corner = historianCorners[i];
  l.gcse_task = gcseTasks[i];
});

const newJsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, newJsContent);
console.log("Injected Historians Corner and GCSE Tasks into data.js");
