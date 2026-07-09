import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

// Function to generate reasonable model answers for placeholder text
unitData.lessons.forEach((l, i) => {
  l.tasks.forEach((t, j) => {
    if (t.model && t.model.includes("A detailed historical explanation")) {
      // Create a better model based on the lesson
      if (i === 0) {
        if (t.text.includes("Bismarck")) {
          t.model = "Bismarck released an edited version of the Ems Telegram that made it look like the Prussian King had insulted the French ambassador. This provoked France into declaring war, allowing Prussia to look like the victim and uniting the southern German states against France.";
        } else if (t.text.includes("advantages")) {
          t.model = "Prussia used their advanced railway network to rapidly mobilize 500,000 troops, and their superior Krupp steel artillery to bombard the French from a longer, faster range.";
        } else if (t.text.includes("Alsace-Lorraine")) {
          t.model = "France deeply resented the loss of the resource-rich territory of Alsace-Lorraine and the humiliation of a German occupation army. This created a long-term desire for 'revanche' (revenge).";
        }
      } else if (i === 1) {
        if (t.text.includes("Reinsurance")) {
          t.model = "By letting the Reinsurance Treaty expire, Wilhelm II lost Germany's secret alliance with Russia. This allowed France and Russia to ally, leaving Germany encircled and facing a two-front war.";
        } else if (t.text.includes("Moroccan")) {
          t.model = "Instead of breaking Britain and France apart, Wilhelm's aggressive actions in Morocco actually terrified Britain, leading them to form a much stronger, formal military alliance (the Entente Cordiale) with France to defend against Germany.";
        } else if (t.text.includes("Wilhelm II")) {
          t.model = "Wilhelm II was arrogant, impulsive, and erratic. His desire for global power (Weltpolitik) constantly created unnecessary crises that alienated Britain and Russia, destroying the careful diplomatic web Bismarck had built.";
        }
      } else if (i === 2) {
        if (t.text.includes("Dreadnought")) {
          t.model = "The HMS Dreadnought was so technologically advanced (faster, heavier armor, massive long-range guns) that it rendered all previous battleships obsolete, effectively resetting the naval arms race to zero.";
        } else if (t.text.includes("navy")) {
          t.model = "Germany felt it needed a massive navy to protect its growing global empire and trade routes, and to secure its 'place in the sun' as a top-tier world power.";
        } else if (t.text.includes("public")) {
          t.model = "The naval race created intense paranoia and anti-German sentiment among the British public, fueled by invasion-scare novels and newspaper campaigns like 'We want eight and we won't wait'.";
        }
      } else if (i === 3) {
        if (t.text.includes("Slavs")) {
          t.model = "Russia saw itself as the cultural and religious protector of the Slavic people, which meant they felt a strong duty to defend Serbia against Austro-Hungarian aggression.";
        } else if (t.text.includes("Yugoslavia")) {
          t.model = "If Serbia successfully united all southern Slavs into a 'Yugoslavia', it would inspire other ethnic groups within the multi-ethnic Austro-Hungarian Empire to break away, causing the entire empire to collapse.";
        } else if (t.text.includes("Balkan Wars")) {
          t.model = "The Balkan Wars nearly destroyed the Ottoman Empire's presence in Europe and left Serbia significantly larger, stronger, and more ambitious, terrifying Austria-Hungary.";
        }
      } else if (i === 4) {
        if (t.text.includes("Archduke")) {
          t.model = "The assassination of Archduke Franz Ferdinand by Gavrilo Princip on June 28, 1914, was the immediate trigger for the war.";
        } else if (t.text.includes("alliances")) {
          t.model = "The rigid alliance systems meant that a local dispute between Austria and Serbia quickly dragged in Russia (to defend Serbia), Germany (to defend Austria), and France and Britain (to defend Russia and Belgium).";
        } else if (t.text.includes("Schlieffen")) {
          t.model = "The Schlieffen Plan was Germany's strategy to quickly defeat France by invading through neutral Belgium before turning to fight Russia. The invasion of Belgium forced Britain to enter the war to protect Belgian neutrality.";
        }
      }
    }
  });
});

const newJsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, newJsContent);
console.log("Fixed data.js placeholder models");
