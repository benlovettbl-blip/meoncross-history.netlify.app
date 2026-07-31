import fs from 'fs';
import { unitData } from './weimar_nazi_germany/data.js';

const clozes = {
    "KT1": "Following the end of WWI, the new German republic signed the [Armistice], angering many who believed the army was never defeated but rather betrayed by the [November Criminals], fueling the destructive [Dolchstoßlegende] (stab-in-the-back myth). The new Weimar [Constitution] was highly democratic, giving power to the elected [Reichstag] and the upper house, the [Reichsrat]. However, its voting system of [Proportional Representation (PR)] led to many fragmented parties, making it almost impossible to form a stable majority, usually resulting in a weak [Coalition Government]. In times of crisis, the President could suspend democracy entirely and rule by decree using [Article 48].",
    "lesson_1_2": "The Weimar Republic faced immediate outrage when they signed the Treaty of Versailles, viewed by many Germans as a harsh, dictated peace or [Diktat], which forced them to pay massive financial [Reparations]. Threats came from the extreme left, such as the communist [Spartacist League] uprising, and the extreme right, when nationalist ex-soldiers known as the [Freikorps] attempted to overthrow the government in the Kapp [Putsch]. In 1923, when Germany defaulted on payments, French troops invaded the Ruhr; the government ordered workers to strike in [Passive Resistance], and printed more money to pay them, which directly caused the catastrophic collapse of the currency known as [Hyperinflation].",
    "lesson_1_3": "Under Stresemann’s leadership, Germany recovered from economic disaster by scrapping the worthless currency and replacing it temporarily with the [Rentenmark], before permanently introducing the stable [Reichsmark]. To ease the burden of Versailles, he negotiated the [Dawes Plan (1924)] to receive US loans, and later the [Young Plan (1929)] to significantly reduce the total debt. To restore Germany's international reputation, Stresemann signed the [Locarno Pact (1925)] to agree on western borders, successfully led Germany into the international peacekeeping body the [League of Nations], and signed the [Kellogg-Briand Pact (1928)] alongside 61 other countries promising not to use war to resolve disputes.",
    "lesson_1_4": "During the 'Golden Age', Germany's [Standard of Living] improved for many, supported by progressive welfare reforms like the [Unemployment Insurance Act (1927)]. Women were granted equal voting rights under [Article 109], paving the way for the socially liberated, independent [New Woman (Neue Frau)] who embraced modern fashion and work. Culturally, Berlin became a vibrant hub of [Avant-garde] experimentation; artists embraced the realism of [New Objectivity (Neue Sachlichkeit)], while the revolutionary [Bauhaus] movement transformed architecture and design with its sleek, functional aesthetic."
};

unitData.lessons.forEach(l => {
    if (clozes[l.id]) {
        l.vocab_cloze_text = clozes[l.id];
    }
});

fs.writeFileSync('./weimar_nazi_germany/data.js', 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n');
console.log('done injecting cloze texts');
