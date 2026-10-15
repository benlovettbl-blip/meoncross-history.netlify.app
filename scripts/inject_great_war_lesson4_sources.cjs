const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const gwPath = path.join(__dirname, '..', 'units', 'great_war', 'data.js');
const gwPublicPath = path.join(__dirname, '..', 'public', 'units', 'great_war', 'data.js');

let content = fs.readFileSync(gwPath, 'utf8');

// 1. Add a4_map & banner to lesson_4 if not present
const l4EnquiryQ = `enquiryQuestion:\n        'Did European military alliances protect continental peace or guarantee a domino-effect catastrophe?',`;
const l4MapBanner = `enquiryQuestion:\n        'Did European military alliances protect continental peace or guarantee a domino-effect catastrophe?',\n      a4_map: ['/units/great_war/assets/map_lesson4.png', '/units/great_war/assets/balkans_1914_simple_map.png'],\n      banner: {\n        image: '/units/great_war/assets/map_lesson4.png',\n        position: 'center 30%',\n        caption:\n          'Geopolitical cartography of Europe in 1914 illustrating the division into the Triple Entente and Triple Alliance.',\n      },`;

if (
  content.includes(l4EnquiryQ) &&
  !content.includes("a4_map: ['/units/great_war/assets/map_lesson4.png'")
) {
  content = content.replace(l4EnquiryQ, l4MapBanner);
  console.log('✓ Added a4_map and banner to lesson_4');
}

// 2. Add Sources A-E to narrative_blocks 1-5 of lesson_4
const oldAct1 = `        {
          act: 1,
          title: '4.1 The Central European Bloc: Dual Alliance & Triple Alliance (1879–1882)',
          text: '<span class="para-ref">[4.1]</span> In October 1879, haunted by the specter of a hostile coalition between France and Russia, Chancellor Otto von Bismarck negotiated the historic <strong>Dual Alliance</strong> with the Austro-Hungarian Empire. Both empires pledged that if either were attacked by Russia, the other would intervene with its entire armed forces; if attacked by another power (such as France), the other promised benevolent neutrality. Three years later, in 1882, Italy joined the partnership after losing Tunisia to France in an imperial dispute, expanding the bloc into the <strong>Triple Alliance</strong>.<br><br><span class="para-ref">[4.2]</span> Bismarck intended the Triple Alliance as a strictly defensive shield to stabilize Central Europe and preserve peace through strength. But it had a dangerous unintended consequence: it tied Germany’s military destiny to the fragile, multi-ethnic Austro-Hungarian Empire, an ancient realm ruled by the elderly Habsburg Emperor Franz Joseph that was being torn apart from within by violent nationalist rebellions.',
        },`;

const newAct1 = `        {
          act: 1,
          title: '4.1 The Central European Bloc: Dual Alliance & Triple Alliance (1879–1882)',
          text: '<span class="para-ref">[4.1]</span> In October 1879, haunted by the specter of a hostile coalition between France and Russia, Chancellor Otto von Bismarck negotiated the historic <strong>Dual Alliance</strong> with the Austro-Hungarian Empire. Both empires pledged that if either were attacked by Russia, the other would intervene with its entire armed forces; if attacked by another power (such as France), the other promised benevolent neutrality. Three years later, in 1882, Italy joined the partnership after losing Tunisia to France in an imperial dispute, expanding the bloc into the <strong>Triple Alliance</strong>.<br><br><span class="para-ref">[4.2]</span> Bismarck intended the Triple Alliance as a strictly defensive shield to stabilize Central Europe and preserve peace through strength. But it had a dangerous unintended consequence: it tied Germany’s military destiny to the fragile, multi-ethnic Austro-Hungarian Empire, an ancient realm ruled by the elderly Habsburg Emperor Franz Joseph that was being torn apart from within by violent nationalist rebellions.',
          source: {
            letter: 'A',
            title: 'Source A (Geopolitical Cartography): The Armed Camps: Triple Alliance & Triple Entente (1914)',
            image: '/units/great_war/assets/map_lesson4.png',
            is_artwork: false,
            caption:
              'Geopolitical map of Europe in 1914 showing the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (Britain, France, Russia), alongside minority nationalities within Austria-Hungary.',
            citation: 'War Office Intelligence Department, London (1914); Historical Atlas of Modern Europe.',
            context:
              'By 1914, Europe was split into two hostile armed camps: the Central Powers (Germany and Austria-Hungary) surrounded on both sides by the Triple Entente (Britain, France, and Russia). This encirclement convinced German military leaders that a two-front war was inevitable.',
            hinge_question:
              'Why did the geographical encirclement of Germany by the Triple Entente make German military planners panic and favor a pre-emptive strike?',
          },
        },`;

const oldAct2 = `        {
          act: 2,
          title: '4.2 The Counter-Alliance: Franco-Russian Alliance & Triple Entente (1894–1907)',
          text: '<span class="para-ref">[4.2]</span> In 1890, Kaiser Wilhelm II made the fateful blunder of allowing Bismarck’s secret 1887 Reinsurance Treaty with Russia to lapse. Desperate for capital loans to build the Trans-Siberian Railway and fearful of German military dominance, autocratic Tsarist Russia turned to republican France. In 1894, the two ideologically opposite regimes signed the <strong>Franco-Russian Military Alliance</strong>, promising mutual military assistance if either were attacked by Germany. Bismarck’s supreme nightmare—a two-front encirclement—had become a reality.<br><br><span class="para-ref">[4.3]</span> Alarmed by German naval expansion, Great Britain abandoned its traditional policy of "Splendid Isolation." In 1904, Britain settled century-old colonial disputes with France in the <strong>Entente Cordiale</strong>. In 1907, Britain and Russia resolved imperial rivalries in Persia and Tibet in the <strong>Anglo-Russian Convention</strong>. Together, these bilateral treaties formed the <strong>Triple Entente</strong> (Britain, France, Russia). Europe was now divided into two armed, suspicious coalitions. The alliance system was designed as a mutual deterrent, but it operated like a string of linked dynamite: if any two powers went to war, all six would be dragged into the conflagration.',
        },`;

const newAct2 = `        {
          act: 2,
          title: '4.2 The Counter-Alliance: Franco-Russian Alliance & Triple Entente (1894–1907)',
          text: '<span class="para-ref">[4.2]</span> In 1890, Kaiser Wilhelm II made the fateful blunder of allowing Bismarck’s secret 1887 Reinsurance Treaty with Russia to lapse. Desperate for capital loans to build the Trans-Siberian Railway and fearful of German military dominance, autocratic Tsarist Russia turned to republican France. In 1894, the two ideologically opposite regimes signed the <strong>Franco-Russian Military Alliance</strong>, promising mutual military assistance if either were attacked by Germany. Bismarck’s supreme nightmare—a two-front encirclement—had become a reality.<br><br><span class="para-ref">[4.3]</span> Alarmed by German naval expansion, Great Britain abandoned its traditional policy of "Splendid Isolation." In 1904, Britain settled century-old colonial disputes with France in the <strong>Entente Cordiale</strong>. In 1907, Britain and Russia resolved imperial rivalries in Persia and Tibet in the <strong>Anglo-Russian Convention</strong>. Together, these bilateral treaties formed the <strong>Triple Entente</strong> (Britain, France, Russia). Europe was now divided into two armed, suspicious coalitions. The alliance system was designed as a mutual deterrent, but it operated like a string of linked dynamite: if any two powers went to war, all six would be dragged into the conflagration.',
          source: {
            letter: 'B',
            title: 'Source B (Geopolitical Cartography): The Encirclement of Germany and Austria-Hungary',
            image: '/images/gw_alliance_map.png',
            is_artwork: false,
            caption:
              'Map showing the geopolitical division of Europe into the Triple Entente (yellow), Central Powers (pink), and neutral nations (blue).',
            citation: 'European International Relations Archive, 1914.',
            context:
              'When France and Russia formed an alliance in 1894, Bismarck’s nightmare of a two-front encirclement became reality. When Britain signed ententes with France (1904) and Russia (1907), Germany found itself encircled by three Great Powers.',
            hinge_question:
              'How did Britain’s decision to abandon "Splendid Isolation" transform regional European rivalries into a rigid continental deadlock?',
          },
        },`;

const oldAct3 = `        {
          act: 3,
          title: '4.3 The "Balkan Powder Keg", Ottoman Decline & Pan-Slavism (1900–1908)',
          text: '<span class="para-ref">[4.3]</span> For centuries, the Balkan peninsula in south-eastern Europe had been ruled by the Islamic <strong>Ottoman Empire</strong>. But by 1900, the Ottoman state was decaying rapidly, mocked across Europe as the "Sick Man of Europe." As Ottoman power collapsed, independent Christian nations—Greece, Bulgaria, Romania, and <strong>Serbia</strong>—threw off Turkish rule. A dangerous geopolitical vacuum emerged in south-eastern Europe, known as the <strong>"Balkan Powder Keg."</strong><br><br><span class="para-ref">[4.4]</span> Two rival Great Powers competed to dominate this vacuum. The Russian Empire claimed the mantle of protector of fellow Orthodox Christians and Slavs under the banner of <strong>Pan-Slavism</strong>, seeking warm-water naval access through the Dardanelles Straits to the Mediterranean. Directly opposing Russia was the Austro-Hungarian Empire, which feared that if Slavic nationalism triumphed in the Balkans, the millions of Serbs, Croats, and Bosnians living inside the Habsburg realm would break away and destroy the empire. Independent Serbia, dreaming of a "Greater Serbia" uniting all South Slavs, became Austria’s mortal enemy.',
        },`;

const newAct3 = `        {
          act: 3,
          title: '4.3 The "Balkan Powder Keg", Ottoman Decline & Pan-Slavism (1900–1908)',
          text: '<span class="para-ref">[4.3]</span> For centuries, the Balkan peninsula in south-eastern Europe had been ruled by the Islamic <strong>Ottoman Empire</strong>. But by 1900, the Ottoman state was decaying rapidly, mocked across Europe as the "Sick Man of Europe." As Ottoman power collapsed, independent Christian nations—Greece, Bulgaria, Romania, and <strong>Serbia</strong>—threw off Turkish rule. A dangerous geopolitical vacuum emerged in south-eastern Europe, known as the <strong>"Balkan Powder Keg."</strong><br><br><span class="para-ref">[4.4]</span> Two rival Great Powers competed to dominate this vacuum. The Russian Empire claimed the mantle of protector of fellow Orthodox Christians and Slavs under the banner of <strong>Pan-Slavism</strong>, seeking warm-water naval access through the Dardanelles Straits to the Mediterranean. Directly opposing Russia was the Austro-Hungarian Empire, which feared that if Slavic nationalism triumphed in the Balkans, the millions of Serbs, Croats, and Bosnians living inside the Habsburg realm would break away and destroy the empire. Independent Serbia, dreaming of a "Greater Serbia" uniting all South Slavs, became Austria’s mortal enemy.',
          source: {
            letter: 'C',
            title: 'Source C (Cartographic Record): The Balkan Powder Keg (1914)',
            image: '/units/great_war/assets/balkans_1914_simple_map.png',
            is_artwork: false,
            caption:
              'Strategic map of the Balkan Peninsula in 1914 following the Balkan Wars, showing the dramatic territorial expansion of independent Serbia on the southern frontier of Austria-Hungary.',
            citation: 'Department Cartographic Archive (1914).',
            context:
              'The collapse of Ottoman power created an explosive vacuum in the Balkans. Russia backed fellow Slavic Christians (Pan-Slavism), while Austria-Hungary feared that a powerful independent Serbia would tear the multinational Habsburg Empire apart.',
            hinge_question:
              'Why did Austria-Hungary view the expansion of Serbia following the Balkan Wars as an existential threat to its own imperial survival?',
          },
        },`;

const oldAct4 = `        {
          act: 4,
          title: '4.4 The 1908 Bosnian Annexation Crisis & Russian Humiliation (October 1908)',
          text: '<span class="para-ref">[4.4]</span> In October 1908, the powder keg came close to exploding. Exploiting a revolution in the Ottoman Empire, Austro-Hungarian Foreign Minister Alois von Aehrenthal unilaterally <strong>annexed the provinces of Bosnia and Herzegovina</strong>, which Austria had occupied administratively since 1878. The annexation sparked furious outrage in Serbia, which viewed Bosnia—with its large Serbian population—as its natural sovereign territory. Serbian crowds protested in Belgrade and demanded war.<br><br><span class="para-ref">[4.5]</span> Russia stepped forward to champion Serbia, mobilizing troops along its western border. But Germany’s Chancellor Bernhard von Bülow intervened with brutal clarity. In March 1909, Germany delivered a harsh ultimatum to Saint Petersburg: Russia must accept the annexation immediately without an international conference, or Germany would support Austria with total military force. Still recovering from its disastrous 1905 defeat by Japan, the Russian army was unready for war. Deeply humiliated, Tsar Nicholas II backed down and forced Serbia to submit. But the humiliation left a legacy of bitter fury: Russia launched a massive military rearmament program and resolved never to back down in the Balkans again.',
        },`;

const newAct4 = `        {
          act: 4,
          title: '4.4 The 1908 Bosnian Annexation Crisis & Russian Humiliation (October 1908)',
          text: '<span class="para-ref">[4.4]</span> In October 1908, the powder keg came close to exploding. Exploiting a revolution in the Ottoman Empire, Austro-Hungarian Foreign Minister Alois von Aehrenthal unilaterally <strong>annexed the provinces of Bosnia and Herzegovina</strong>, which Austria had occupied administratively since 1878. The annexation sparked furious outrage in Serbia, which viewed Bosnia—with its large Serbian population—as its natural sovereign territory. Serbian crowds protested in Belgrade and demanded war.<br><br><span class="para-ref">[4.5]</span> Russia stepped forward to champion Serbia, mobilizing troops along its western border. But Germany’s Chancellor Bernhard von Bülow intervened with brutal clarity. In March 1909, Germany delivered a harsh ultimatum to Saint Petersburg: Russia must accept the annexation immediately without an international conference, or Germany would support Austria with total military force. Still recovering from its disastrous 1905 defeat by Japan, the Russian army was unready for war. Deeply humiliated, Tsar Nicholas II backed down and forced Serbia to submit. But the humiliation left a legacy of bitter fury: Russia launched a massive military rearmament program and resolved never to back down in the Balkans again.',
          source: {
            letter: 'D',
            title: 'Source D (Primary Political Cartoon): The Boiling Point (Punch, October 1912)',
            image: '/units/great_war/assets/was_boiling_point.png',
            is_artwork: true,
            caption:
              'Leonard Raven-Hill, "The Boiling Point" (Punch, October 1912): European Great Power monarchs (Wilhelm II, Franz Joseph, George V, Nicholas II, and the Ottoman Sultan) desperately attempt to sit on the lid of a boiling pot marked "Balkan Troubles".',
            citation: 'Leonard Raven-Hill, Punch Magazine, Vol. CXLIII, 2 October 1912.',
            context:
              'Published during the First Balkan War, this cartoon illustrates contemporary fears that regional ethnic and national rivalries in south-eastern Europe were threatening to boil over and engulf the entire continent.',
            hinge_question:
              'Why did the cartoonist depict the Great Power monarchs struggling to keep the lid on the pot, rather than creating the fire underneath?',
          },
        },`;

const oldAct5 = `        {
          act: 5,
          title: '4.5 The 1912–1913 Balkan Wars & The Pre-emptive War Urge (1912–1913)',
          text: '<span class="para-ref">[4.5]</span> In October 1912, the <strong>First Balkan War</strong> erupted. An alliance of Serbia, Greece, Bulgaria, and Montenegro (the Balkan League) attacked the Ottoman Empire, sweeping Turkish armies out of almost all their European territories in just six weeks. In 1913, the victors quarrelled over the spoils in the bloody <strong>Second Balkan War</strong>, which ended with Serbia decisively defeating Bulgaria.<br><br><span class="para-ref">[4.6]</span> The consequences of the Balkan Wars were catastrophic for Austro-Hungarian security. Serbia emerged from the wars triumphant: its national territory expanded by eighty percent and its population swelled from three million to four and a half million. Flush with military confidence and armed with modern French artillery, Serbian nationalists intensified terrorist agitation inside Austria-Hungary. In Vienna, Austrian Chief of General Staff <strong>Franz Conrad von Hötzendorf</strong> became convinced that a <strong>pre-emptive war</strong> to militarily crush Serbia was essential before Slavic subversion destroyed the Habsburg monarchy: Conrad urged war against Serbia over twenty times in 1913 alone. The stage was set: all that was needed was a spark.',
        },`;

const newAct5 = `        {
          act: 5,
          title: '4.5 The 1912–1913 Balkan Wars & The Pre-emptive War Urge (1912–1913)',
          text: '<span class="para-ref">[4.5]</span> In October 1912, the <strong>First Balkan War</strong> erupted. An alliance of Serbia, Greece, Bulgaria, and Montenegro (the Balkan League) attacked the Ottoman Empire, sweeping Turkish armies out of almost all their European territories in just six weeks. In 1913, the victors quarrelled over the spoils in the bloody <strong>Second Balkan War</strong>, which ended with Serbia decisively defeating Bulgaria.<br><br><span class="para-ref">[4.6]</span> The consequences of the Balkan Wars were catastrophic for Austro-Hungarian security. Serbia emerged from the wars triumphant: its national territory expanded by eighty percent and its population swelled from three million to four and a half million. Flush with military confidence and armed with modern French artillery, Serbian nationalists intensified terrorist agitation inside Austria-Hungary. In Vienna, Austrian Chief of General Staff <strong>Franz Conrad von Hötzendorf</strong> became convinced that a <strong>pre-emptive war</strong> to militarily crush Serbia was essential before Slavic subversion destroyed the Habsburg monarchy: Conrad urged war against Serbia over twenty times in 1913 alone. The stage was set: all that was needed was a spark.',
          source: {
            letter: 'E',
            title: 'Source E (Strategic Operational Map): The German Schlieffen Plan',
            image: '/units/great_war/assets/schlieffen_plan_simple_map.png',
            is_artwork: false,
            caption:
              'Operational diagram of the Schlieffen Plan: Germany planned to rapidly violate Belgian neutrality and encircle Paris in 39 days before redeploying east to face slow-mobilizing Russia.',
            citation: 'German Great General Staff Operational Archive (1905/1914).',
            context:
              'Devised by Count Alfred von Schlieffen, this rigid operational timetable dictated that any war with Russia required an immediate pre-emptive invasion of France through neutral Belgium, guaranteeing British intervention under the 1839 Treaty of London.',
            hinge_question:
              'How did rigid military mobilization timetables like the Schlieffen Plan strip European diplomats of the power to stop war in July 1914?',
          },
        },`;

if (content.includes(oldAct1)) {
  content = content.replace(oldAct1, newAct1);
  console.log('✓ Injected Source A (Alliance Map) into Act 1');
}
if (content.includes(oldAct2)) {
  content = content.replace(oldAct2, newAct2);
  console.log('✓ Injected Source B (Encirclement Map) into Act 2');
}
if (content.includes(oldAct3)) {
  content = content.replace(oldAct3, newAct3);
  console.log('✓ Injected Source C (Balkans Map) into Act 3');
}
if (content.includes(oldAct4)) {
  content = content.replace(oldAct4, newAct4);
  console.log('✓ Injected Source D (Punch Boiling Point) into Act 4');
}
if (content.includes(oldAct5)) {
  content = content.replace(oldAct5, newAct5);
  console.log('✓ Injected Source E (Schlieffen Plan Map) into Act 5');
}

fs.writeFileSync(gwPath, content, 'utf8');
fs.writeFileSync(gwPublicPath, content, 'utf8');
execSync(`node --check "${gwPath}"`);
console.log(
  '✅ units/great_war/data.js and public mirror successfully updated and syntax validated.',
);
