const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('🕯️ APPLYING 4-TIER IDEAL CLASSROOM VIDEO SHELF: THE SHOAH');
console.log('======================================================');

const theShoah4TierVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=sB4Nc4AFjMQ',
      title: 'What is the Holocaust? Part 1/7: Introduction | Yad Vashem',
      duration: '0 mins 55 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Concise introductory overview from Yad Vashem defining the Holocaust as the state-sponsored, systematic persecution and murder of six million Jews by the Nazi regime and its collaborators. Recommended Watch Window: 00:00–00:55 (Full Clip) • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Solemn, dignified educational overview.',
      viewing_task:
        '<ol><li><strong>[00:20] Quick Check:</strong> Approximately how many European Jewish men, women, and children were systematically murdered by Nazi Germany and its collaborators during the Holocaust?</li><li><strong>[00:45] Hinge Question:</strong> Why is it historically essential to understand who European Jews were and how they lived before 1939, rather than viewing them solely as passive victims of Nazi violence?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Approximately six million Jews (representing two-thirds of European Jewry).</li><li><strong>Hinge Question:</strong> Defining European Jews solely by their destruction dehumanizes them a second time, stripping them of centuries of cultural, artistic, religious, and scientific achievements. Understanding their rich pre-war lives makes students appreciate the immense human and civilizational void left by the genocide.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=gfgXXDOXp-c',
      title: 'Jewish Life before the Second World War: an Introduction | Yad Vashem',
      duration: '5 mins 36 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Yad Vashem’s foundational documentary exploring the vibrant diversity of European Jewish life before 1939: religious, secular, Yiddish culture in the shtetls of Poland, and urban integration in Berlin, Vienna, and Paris. Recommended Watch Window: 00:30–04:45 • Lesson Phase: Guided Instruction & Historical Grounding. Tone Alert: Solemn, dignified educational documentary honoring pre-war Jewish culture and human dignity.',
      viewing_task:
        '<ol><li><strong>[01:10] Recall:</strong> Approximately how many Jewish people lived in Europe prior to the Second World War in 1939, and in which country was the largest Jewish population concentrated?</li><li><strong>[02:40] Explain:</strong> Contrast the lifestyle of Jews living in the rural <em>shtetls</em> of Eastern Europe with that of integrated, secular Jewish communities in Western European capitals like Berlin, Vienna, and Paris.</li><li><strong>[04:15] Challenge:</strong> Why is it historically essential to study pre-war Jewish life, culture, and achievements before studying the Holocaust: why must victims not be defined solely by their destruction?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Approximately 9.5 million Jewish people; the largest population was in Poland (over 3.3 million Jews, comprising 10% of the Polish population).</li><li><strong>Explain:</strong> In Eastern Europe, millions lived in small market towns (<em>shtetls</em>) where daily life was deeply steeped in traditional Orthodox Judaism, communal religious study, and vibrant Yiddish language and literature. In contrast, many German, Austrian, and French Jews were thoroughly assimilated, secular citizens who served decorated in WWI, worked as university professors, doctors, lawyers, artists, and viewed themselves proudly as patriotic Germans or Frenchmen first.</li><li><strong>Challenge:</strong> Defining European Jews solely as passive victims of Nazi murder dehumanizes them a second time, stripping them of their rich agency, cultural complexity, and centuries of artistic, religious, and scientific contributions. Understanding the diverse richness of Jewish life before 1939 makes students comprehend the catastrophic, irreplaceable scale of the civilizational void left by the genocide.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=pAYEQP8gx3w',
      title: 'Life is Beautiful (1997, Roberto Benigni) | Official Trailer',
      duration: '2 mins 14 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Three-time Academy Award-winning film portraying Guido Orefice, a playful Italian-Jewish bookshop owner whose life is shattered by fascist racial laws and deportation. Recommended Watch Window: 00:00–02:14 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Family Life. Tone Alert: Poignant, imaginative dramatisation of pre-war affection and family solidarity.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice how Roberto Benigni depicts the vibrancy, humour, and romantic daily life of Guido and Dora in 1930s Italy before the implementation of racial laws and deportation. How does this cinematic framing emphasize that Holocaust victims were ordinary individuals with rich emotional lives, professions, and families?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer emphasizes Guido\'s warmth, wit, and humanity, making the intrusion of anti-Semitic discrimination and eventual transport to a concentration camp feel acutely tragic. By focusing on the bond between father and son, the film honors the emotional dignity and resilience of victims before the catastrophe stripped them of their names and freedom.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=kOIHRQlQqwU',
      title: 'Liberators and Survivors: The First Moments | Yad Vashem',
      duration: '15 mins 27 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Moving oral history documentary featuring firsthand testimonies from survivors recalling their childhood homes, schools, and Sabbath traditions before the cataclysm. Recommended Watch Window: 01:00–08:30 • Lesson Phase: In-Depth Documentary Investigation & Survivor Testimony. Tone Alert: Dignified, moving survivor memories honoring lost communities.',
      viewing_task:
        '<ol><li><strong>[02:15] Recall:</strong> What languages and cultural traditions were spoken and practiced by Eastern European Jewish families in pre-war Poland and Lithuania?</li><li><strong>[05:40] Explain:</strong> How do survivor recollections illustrate the sudden transformation of daily life when anti-Semitic laws and social ostracism began separating Jewish children from their classmates?</li><li><strong>[07:50] Challenge:</strong> Evaluate how oral testimonies restore personal individuality and human dignity to individuals who were reduced to numbers tattooed on their arms.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Yiddish, Polish, Russian, and Hebrew, characterized by traditional religious holidays, bustling market squares, and rich Yiddish literature and theater.</li><li><strong>Explain:</strong> Survivors describe the shock of being told by non-Jewish childhood friends that they could no longer play together, being barred from public parks and swimming pools, and watching their fathers forced to step off sidewalks for German soldiers. This reveals how psychological isolation preceded physical deportation.</li><li><strong>Challenge:</strong> Bureaucratic Nazi records deliberately erased human individuality, reducing victims to cargo lists and numbers. Oral testimony allows survivors to reclaim their names, family memories, and personal agency, compelling modern students to confront the genocide as millions of individual human tragedies rather than an incomprehensible aggregate statistic.</li></ol>',
    },
  ],

  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=mQ1E6wO9jXQ',
      title: 'What Was Kristallnacht in the Holocaust? | Holocaust Explainer',
      duration: '3 mins 12 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Concise explainer detailing the 9–10 November 1938 nationwide pogrom: the destruction of synagogues, looting of businesses, and mass arrest of 30,000 men. Recommended Watch Window: 00:00–03:00 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Clear, focused museum breakdown of state-sponsored terror.',
      viewing_task:
        '<ol><li><strong>[01:00] Quick Check:</strong> What pretext did Propaganda Minister Joseph Goebbels use to launch the violent nationwide pogrom known as <em>Kristallnacht</em> in November 1938?</li><li><strong>[02:15] Hinge Question:</strong> Why did the arrest and incarceration of 30,000 Jewish men in concentration camps during Kristallnacht signal that legal emigration was no longer enough to escape persecution?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> The assassination of German diplomat Ernst vom Rath in Paris by Herschel Grynszpan, a desperate 17-year-old Polish Jewish youth.</li><li><strong>Hinge Question:</strong> Prior to November 1938, persecution was primarily legal, civil, and economic. Kristallnacht demonstrated that the Nazi state would deploy direct physical violence, burning synagogues and arresting tens of thousands without trial to terrorize Jewish families into fleeing Germany and forfeiting their remaining wealth.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=5ubZv0YqrnE',
      title: 'The Path to Nazi Genocide: From Citizens to Outcasts, 1933–1938 | USHMM',
      duration: '7 mins 28 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'United States Holocaust Memorial Museum (USHMM) chapter tracing the legal and social exclusion of German Jews: the April 1933 boycott, the 1935 Nuremberg Laws (Reich Citizenship Law and Blood Protection Law), and the November 1938 Kristallnacht pogrom. Recommended Watch Window: 01:00–06:15 • Lesson Phase: Guided Instruction & Legal Deconstruction. Tone Alert: Authoritative museum documentary with primary Nazi legislation and photographs.',
      viewing_task:
        '<ol><li><strong>[01:45] Recall:</strong> What two foundational statutes comprised the September 1935 Nuremberg Laws passed by the Nazi Reichstag at the Nuremberg Party Rally?</li><li><strong>[03:30] Explain:</strong> Explain how the Reich Citizenship Law stripped German Jews of their constitutional citizenship, reducing them to second-class "subjects of the state" (<em>Staatsangehörige</em>).</li><li><strong>[05:20] Challenge:</strong> Evaluate how the state-orchestrated violence of <em>Kristallnacht</em> (9–10 November 1938) marked a decisive transition from discriminatory civil legislation to violent physical terror and mass roundups.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The <em>Reich Citizenship Law</em> and the <em>Law for the Protection of German Blood and German Honour</em>.</li><li><strong>Explain:</strong> The laws revoked the German citizenship of anyone defined as a Jew by ancestry (having three or four Jewish grandparents regardless of personal religious belief), stripping them of the right to vote, hold public office, or fly the German flag. The Blood Protection Law outlawed marriage and sexual relations between Jews and citizens of "German or related blood", legally isolating Jews as racial outcasts.</li><li><strong>Challenge:</strong> Prior to November 1938, anti-Semitic persecution was primarily economic, legal, and bureaucratic. Orchestrated by Joseph Goebbels and the SA following the assassination of Ernst vom Rath, <em>Kristallnacht</em> unleashed nationwide physical terror: 267 synagogues destroyed, 7,500 Jewish businesses looted, 91 Jews murdered, and crucially, 30,000 Jewish men arrested and sent directly to concentration camps (Dachau, Buchenwald, Sachsenhausen) to coerce their families into surrendering their property and fleeing Germany.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=gG22XNhtnoY',
      title: "Schindler's List (1993, Steven Spielberg) | Official Trailer",
      duration: '2 mins 15 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Seven-time Academy Award-winning historical masterpiece starring Liam Neeson, Ralph Fiennes, and Ben Kingsley. Depicts the progressive stripping of Jewish rights, forced relocation into enclosed ghettos, and the liquidation of communities. Recommended Watch Window: 00:00–02:15 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Legal Dispossession. Tone Alert: Severe, historically unflinching cinematic drama in monochrome.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the stark black-and-white cinematography, the red coat of the little girl, the systematic eviction of families from their apartments, and the methodical bureaucratic documentation of confiscated Jewish property. How does Spielberg\'s visual choices illustrate the ruthless dehumanisation of an entire people under Nazi rule?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> Spielberg uses stark black-and-white to evoke authentic period newsreel footage, stripping away Hollywood glamour to present genocide with documentary solemnity. The single flash of red on the little girl humanizes the anonymous masses, symbolizing the vulnerability of individual innocent life amidst industrial, bureaucratic slaughter.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=APyioYJISXI',
      title: 'What Were the Nuremberg Trials? | Holocaust Explainer | USHMM',
      duration: '4 mins 00 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Detailed analysis of how Nazi legal architects like Wilhelm Frick and Hans Frank were held accountable under international law for "Crimes Against Humanity", establishing that state laws cannot excuse genocidal atrocities. Recommended Watch Window: 00:00–04:00 (Full Explainer). Lesson Phase: Guided Instruction & Legal Culpability. Tone Alert: Rigorous legal-historical documentary from the US Holocaust Memorial Museum.',
      viewing_task:
        '<ol><li><strong>[00:50] Recall:</strong> What new legal concept was formulated at the 1945–1946 Nuremberg International Military Tribunal to prosecute state-sponsored persecution and genocide?</li><li><strong>[02:15] Explain:</strong> How did Nazi defendants attempt to defend their implementation of the Nuremberg Laws and anti-Semitic decrees, and why did the tribunal reject their "superior orders" defense?</li><li><strong>[03:30] Challenge:</strong> Evaluate the enduring legacy of the Nuremberg Principles: how did the trials establish that individual human conscience supersedes the obedience demanded by totalitarian state laws?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> "Crimes Against Humanity" and "Waging Aggressive War".</li><li><strong>Explain:</strong> Defendants like Wilhelm Keitel and Joachim von Ribbentrop claimed they were merely following the lawful commands of their Head of State (Hitler) and obeying official German legislation. The judges rejected this argument, establishing Principle IV: that an individual who commits a crime against humanity cannot evade moral and legal responsibility by claiming they acted under superior orders.</li><li><strong>Challenge:</strong> The Nuremberg Principles permanently revolutionized international jurisprudence. They dismantled the historic doctrine of Westphalian national sovereignty where a government could treat its own citizens however it wished within its borders, creating modern international criminal law and the 1948 UN Universal Declaration of Human Rights.</li></ol>',
    },
  ],

  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fjVQgDhMuis',
      title: 'The Warsaw Ghetto Uprising | Key Historical Concepts | Yad Vashem',
      duration: '3 mins 44 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Concise Yad Vashem overview of the Jewish Combat Organisation (ŻOB), Mordechai Anielewicz, and the April 1943 armed uprising in the Warsaw Ghetto against German deportation forces. Recommended Watch Window: 00:00–03:20 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, stirring historical summary of armed defiance.',
      viewing_task:
        '<ol><li><strong>[00:45] Quick Check:</strong> Who was the 24-year-old leader of the Jewish Combat Organisation (ŻOB) who commanded the Warsaw Ghetto Uprising in April 1943?</li><li><strong>[02:10] Hinge Question:</strong> Why did the young fighters of the Warsaw Ghetto choose to stage an armed uprising knowing that military defeat was inevitable?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Mordechai Anielewicz.</li><li><strong>Hinge Question:</strong> The fighters knew they could not defeat the German army with a handful of pistols and petrol bombs. They fought to die with dignity, to avenge their murdered families, and to send a message of defiance to the world that Jews would not surrender passively to extermination.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=8tx2PyYlx9A',
      title: 'What Were Ghettos in the Holocaust? | USHMM Explainer',
      duration: '4 mins 22 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'USHMM explainer analyzing the establishment of over 1,000 enclosed ghettos across occupied Poland and the Baltic states: overcrowding, Star of David armbands, the Jewish Councils (Judenräte), starvation rations, and typhus epidemics. Recommended Watch Window: 00:30–03:50 • Lesson Phase: Guided Instruction & Primary Analysis. Tone Alert: Objective, somber museum history detailing human suffering and social isolation.',
      viewing_task:
        '<ol><li><strong>[01:05] Recall:</strong> What was the largest enclosed ghetto in Nazi-occupied Europe, where over 400,000 Jews were crammed into an area of barely 1.3 square miles surrounded by 10-foot brick walls?</li><li><strong>[02:15] Explain:</strong> How did Nazi occupation authorities use deliberate starvation rations (giving Jews barely 200 calories per day) and sanitary deprivation to weaponize disease and hunger inside the ghettos?</li><li><strong>[03:10] Challenge:</strong> Evaluate the agonizing moral dilemmas forced upon the Jewish Councils (<em>Judenräte</em>) appointed by the SS: did cooperation help protect communities or make leaders unwitting instruments of Nazi deportation?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Warsaw Ghetto in Poland.</li><li><strong>Explain:</strong> The German civil administration strictly restricted food shipments into the ghettos, allocating Jews official rations of less than 200–300 calories per day (a starvation diet). Combined with extreme overcrowding (an average of 7.2 people per room in Warsaw), lack of winter coal, contaminated water, and a ban on medicines, typhus and tuberculosis spread uncontrollably, causing over 80,000 Jews to die of hunger and disease in Warsaw alone before deportations even began.</li><li><strong>Challenge:</strong> Council leaders (like Adam Czerniaków in Warsaw) hoped that by managing municipal administration, orphanages, and organizing productive factory labor for the German war effort, they could make the Jewish population economically indispensable and preserve lives until the war ended. However, when the SS ordered the Judenräte to compile daily quotas of thousands of children, elderly, and sick for "resettlement to the East" (the death camps), leaders faced an impossible moral trap, leading Czerniaków to commit suicide rather than sign deportation lists.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=BFwGqLa_oAo',
      title: 'The Pianist (2002, Roman Polanski / Adrien Brody) | Official Trailer',
      duration: '2 mins 16 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Three-time Academy Award-winning feature film based on the autobiography of Polish-Jewish classical pianist Władysław Szpilman, directed by Holocaust survivor Roman Polanski. Depicts the construction of the Warsaw Ghetto brick wall, the smuggling of food by children, and the deportations to Treblinka. Recommended Watch Window: 00:00–02:16 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Ghetto Survival. Tone Alert: Intense, visceral biographical drama.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the physical bricking up of the Warsaw Ghetto walls, the starving children begging in the streets, the arbitrary violence of SS officers, and Władysław Szpilman\'s struggle to maintain his musical identity amidst total devastation. How does Polanski portray the gradual, agonizing erosion of human dignity inside the enclosed ghetto?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> Polanski, who survived the Krakow Ghetto as a child, depicts the claustrophobia and moral agony of ghettoization without melodrama. The trailer captures how the ghetto stripped individuals of their professions, homes, and basic physical needs, reducing survival to a daily struggle for bread while highlighting how Szpilman\'s music became a defiant sanctuary of human spirit.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=HyZPDvgXXP4',
      title: 'The Great Deportation in the Warsaw Ghetto - Abraham Lewin\'s Diary | Yad Vashem',
      duration: '8 mins 23 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Haunting primary archival documentary examining the secret Oneg Shabbat underground archive compiled by historian Emanuel Ringelblum, buried in metal milk cans beneath the ghetto rubble. Recommended Watch Window: 01:00–07:15 • Lesson Phase: Guided Instruction & Primary Document Investigation. Tone Alert: Devastating primary diary excerpts read against historical photographs.',
      viewing_task:
        '<ol><li><strong>[01:40] Recall:</strong> What was the codename of the secret underground archive established by Emanuel Ringelblum to document daily life and Nazi atrocities in the Warsaw Ghetto?</li><li><strong>[03:50] Explain:</strong> Describe Abraham Lewin\'s diary entries recording the "Great Deportation" (<em>Grossaktion Warschau</em>) in the summer of 1942: how many Jews were loaded into cattle cars destined for Treblinka death camp each day?</li><li><strong>[06:30] Challenge:</strong> Evaluate the profound moral significance of the Oneg Shabbat archive: why did Ringelblum and his colleagues risk their lives to bury their writings in milk cans beneath the earth?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> <em>Oneg Shabbat</em> ("Joy of the Sabbath").</li><li><strong>Explain:</strong> Between 5,000 and 10,000 Jews were rounded up daily at the <em>Umschlagplatz</em> railway siding and packed into sealed freight cars with no water or sanitation. Lewin\'s diary captures the terror, weeping of mothers, and despair as over 265,000 Warsaw Jews were deported to Treblinka\'s gas chambers within seven weeks.</li><li><strong>Challenge:</strong> Ringelblum recognized that the Nazis intended not only to murder every Jewish person, but to erase their memory and rewrite history to depict their victims as subhuman vermin. Burying the testimonies, artwork, and statistics in sealed tin boxes and milk cans was an act of supreme spiritual resistance, ensuring that even if none of them survived, the undeniable truth of what happened would reach future generations.</li></ol>',
    },
  ],

  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=YoElznkTado',
      title: 'Einsatzgruppen: Mobile Killing Squads | USHMM',
      duration: '6 mins 37 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Analyzes the invasion of the Soviet Union (Operation Barbarossa, June 1941) and the transition to systematic mass murder: Einsatzgruppen A, B, C, D, Order Police Battalions, local collaborators, and the massacre at Babi Yar. Recommended Watch Window: 00:00–04:00 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Highly sensitive, serious archival documentary detailing the "Holocaust by Bullets".',
      viewing_task:
        '<ol><li><strong>[01:15] Quick Check:</strong> What were the four mobile paramilitary death squads created by the SS to execute Jews behind the Eastern Front in 1941 called?</li><li><strong>[03:10] Hinge Question:</strong> Why did SS commanders like Heinrich Himmler conclude that mass shootings by firing squad were inefficient and psychologically unviable for executioners, driving the development of industrial gas chambers?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> The <em>Einsatzgruppen</em> (Task Forces A, B, C, and D).</li><li><strong>Hinge Question:</strong> Mass shootings were public, consumed millions of rounds of rifle ammunition needed by the army, and caused severe psychological trauma, alcoholism, and nervous breakdowns among German executioners forced to shoot women and children face-to-face. This led the SS to develop mechanized gas vans and permanent gas chambers to create distance between the killers and their victims.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=0pdGKpSNgMA',
      title: 'Holocaust by Bullets - Father Patrick Desbois | Yahad-In Unum Lecture',
      duration: '49 mins 26 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Groundbreaking forensic investigation by French Catholic priest Father Patrick Desbois, documenting the mass execution trenches of over two million Jews across Ukraine, Belarus, Poland, and Russia through ballistics and local eyewitness interviews. Recommended Watch Window: 04:00–12:30 • Lesson Phase: Guided Instruction & Forensic Grounding. Tone Alert: Emotionally solemn, highly rigorous forensic history.',
      viewing_task:
        '<ol><li><strong>[06:15] Recall:</strong> How many Jewish victims are estimated to have been murdered by bullets rather than in extermination camps, and across which territories did these killings occur?</li><li><strong>[10:30] Explain:</strong> Describe Father Desbois\' methodology: how does his team use German military archives, Soviet extraordinary commissions, GPS mapping, and local non-Jewish eyewitness interviews to locate mass graves?</li><li><strong>[12:15] Challenge:</strong> Evaluate how the reality of the "Holocaust by Bullets" destroys the myth that the genocide was carried out in secret camps far from public view.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Between 1.5 and 2 million Jewish victims, murdered across Ukraine, Belarus, the Baltic States, and western Russia.</li><li><strong>Explain:</strong> Desbois interviews elderly Ukrainian and Belarusian villagers who witnessed the massacres as children (often requisitioned to dig trenches, drive carts, or cook for German officers). His team cross-references these oral accounts with ballistic shell casings and German archival reports to locate forgotten mass graves in village ravines and forests, giving names and dignity back to the dead.</li><li><strong>Challenge:</strong> Extermination camps like Treblinka or Belzec were enclosed, isolated sites designed to disguise murder. In contrast, the Holocaust by Bullets was completely public: executions took place in broad daylight on the edges of villages, within full hearing and sight of local populations, with local police and townspeople watching, proving that genocide was an open, public event across the Eastern territories.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=YLZ5pTVVXQ0',
      title: 'Conspiracy (2001, Frank Pierson / Kenneth Branagh) | Original Trailer',
      duration: '1 min 01 sec',
      pathway: 'Cinematic',
      teacher_guidance:
        'Acclaimed HBO/BBC film starring Kenneth Branagh as Reinhard Heydrich and Colin Firth as Wilhelm Stuckart, dramatizing the 90-minute Wannsee Conference on 20 January 1942 where 15 high-ranking Nazi bureaucrats formalized the "Final Solution". Recommended Watch Window: 00:00–01:01 (Full Trailer). Lesson Phase: Cinematic Starter Hook & The Bureaucracy of Genocide. Tone Alert: Chilling, polished depiction of civil servants organizing industrial extermination over lunch.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the opulent lakeside villa, the polite administrative decorum, fine wine, and crisp bureaucratic language ("evacuation to the East", "cleansing") used by SS General Reinhard Heydrich and ministry officials. How does this film capture the terrifying banality of evil: how educated lawyers, economists, and civil servants became architects of mass murder?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer strips genocide of chaotic battlefield violence, presenting it as a calculated, efficient corporate project. Branagh\'s Heydrich uses charm, intimidation, and euphemistic legal jargon to co-opt every branch of the German state apparatus, demonstrating Hannah Arendt\'s concept of the \'banality of evil\'—that horrific atrocities were organized by ordinary civil servants sitting around a conference table.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=16x7myWxqA4',
      title: 'Auschwitz: The Nazis and the Final Solution | BBC Select',
      duration: '3 mins 07 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Laurence Rees\' acclaimed BBC documentary series examining the architectural and bureaucratic evolution of mass murder from gas vans to Zyklon B chambers. Recommended Watch Window: 00:00–03:07 (Full Clip) • Lesson Phase: Guided Instruction & Historical Evolution. Tone Alert: Rigorous, authoritative BBC documentary with rare archival footage.',
      viewing_task:
        '<ol><li><strong>[00:45] Recall:</strong> In what Berlin suburb was the secret 1942 conference held where the logistical execution of the "Final Solution" was coordinated across German state ministries?</li><li><strong>[01:45] Explain:</strong> Explain how the transition from mobile Einsatzgruppen shootings to fixed extermination camps was designed to accelerate the pace of murder while shielding German executioners from psychological breakdown.</li><li><strong>[02:30] Challenge:</strong> Evaluate how the railway logistics of the German Reichsbahn made the continent-wide deportation of millions of people possible during an active two-front war.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Wannsee (the Wannsee Conference, 20 January 1942).</li><li><strong>Explain:</strong> Mass shooting required massive amounts of rifle ammunition, was impossible to keep secret, and caused severe psychological trauma and alcoholism among SS executioners. Mechanized gas chambers disguised as showers allowed a handful of SS officers to murder thousands of people in minutes using industrial chemical gas, distancing the perpetrators from physical bloodshed.</li><li><strong>Challenge:</strong> The German state railway (Reichsbahn) was an essential accomplice in genocide. Nazi planners prioritized cattle trains transporting families to death camps even when the Wehrmacht desperately needed rolling stock to supply the Eastern Front, demonstrating that ideological extermination superseded military rationalism in the Nazi worldview.</li></ol>',
    },
  ],

  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=4wkwYPlXfs4',
      title: 'What Was Auschwitz? | USHMM Explainer',
      duration: '3 mins 44 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'USHMM explainer analyzing the Auschwitz-Birkenau complex: the distinction between labor camps and extermination centers, the selection ramp (die Rampe), Zyklon B gas chambers, and the October 1944 Sonderkommando uprising. Recommended Watch Window: 00:20–03:25 • Lesson Phase: Guided Instruction & Structural Analysis. Tone Alert: Serious museum explainer analyzing industrial extermination and armed resistance.',
      viewing_task:
        '<ol><li><strong>[00:45] Quick Check:</strong> What were the three main constituent parts of the Auschwitz camp complex in occupied Poland (Auschwitz I, Auschwitz II-Birkenau, Auschwitz III-Monowitz)?</li><li><strong>[01:45] Hinge Question:</strong> How did SS doctors make the split-second life-or-death decisions on the selection ramp at Birkenau, and what proportion of arriving prisoners were murdered immediately?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Auschwitz I (administrative base); Auschwitz II-Birkenau (extermination camp with gas chambers); Auschwitz III-Monowitz (slave labor camp for IG Farben).</li><li><strong>Hinge Question:</strong> SS doctors like Josef Mengele inspected prisoners emerging from cattle cars, directing approximately 75–80% (including all children, pregnant mothers, elderly, and frail) directly to the gas chambers, while selecting the remaining 20% for slave labor to be worked to death.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ATQp8rFXRkg',
      title: 'The Auschwitz Album: Visual Evidence Leading to Mass Murder | Yad Vashem',
      duration: '5 mins 42 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Visual examination of the unique photographic album discovered by survivor Lili Jacob, documenting the arrival and selection of Hungarian Jews on the Birkenau ramp in May 1944. Recommended Watch Window: 00:45–05:15 • Lesson Phase: Guided Instruction & Visual Forensic Analysis. Tone Alert: Solemn, forensic documentary examining primary photographic evidence.',
      viewing_task:
        '<ol><li><strong>[01:10] Recall:</strong> Who took the photographs contained in the "Auschwitz Album", and why were these images originally captured?</li><li><strong>[03:20] Explain:</strong> Explain what the photographs reveal about the deliberate Nazi deception tactics used to keep arriving victims calm as they walked toward Crematoria II and III.</li><li><strong>[04:45] Challenge:</strong> Why is the Auschwitz Album considered one of the most critical visual records of the Holocaust: how does it provide incontrovertible photographic proof of industrial genocide?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> SS photographers Ernst Hofmann and Bernhard Walter, who took the photos as an official administrative record for camp authorities.</li><li><strong>Explain:</strong> The photos show victims carrying suitcases, coats, and pots, believing they were being relocated to a new settlement. SS guards spoke calmly, carried no visible weapons, and pointed to signs for "Disinfection" and "Baths", deliberately concealing the reality of the gas chambers until victims were locked inside.</li><li><strong>Challenge:</strong> The Nazis attempted to destroy all physical and documentary traces of their crimes before evacuating the camp. The Auschwitz Album survived miraculously in a German barracks, providing indisputable photographic evidence of the entire machinery of death—from unloading trains, through medical selection, sorting of stolen belongings, to the final walk into the gas chamber waiting areas—refuting all Holocaust denial.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=PSabBa9IWYs',
      title: 'Son of Saul (2015, László Nemes) | Official Trailer',
      duration: '1 min 50 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Academy Award and Cannes Grand Prix-winning masterpiece following Saul Ausländer, a Hungarian Jewish member of the Auschwitz-Birkenau Sonderkommando forced to work in the crematoria, who risks everything to give a dead child a proper Jewish burial. Recommended Watch Window: 00:00–01:50 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Spiritual Defiance. Tone Alert: Intensely claustrophobic, uncompromising historical drama.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the shallow depth of field (the camera stays locked tightly on Saul\'s face while horrors remain blurred in the background), the immersive soundscape of metallic doors, shouts, and machinery, and Saul\'s obsessive quest to give a child a proper burial. How does director László Nemes use cinematic technique to convey both the physical inferno of Birkenau and an individual\'s desperate effort to preserve their humanity?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> Nemes avoids exploitative wide shots of atrocity by anchoring the camera mere inches from Saul\'s face, forcing viewers to experience the disorientation and psychological numbness required to survive inside the crematoria. Saul\'s determination to recite the Kaddish (mourner\'s prayer) and give a Jewish burial to an unknown boy becomes a profound act of spiritual resistance—choosing human dignity in an environment designed to obliterate it.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1CAQ2lNDBN0',
      title: 'What Was the Liberation of Nazi Camps? | Holocaust Explainer | USHMM',
      duration: '3 mins 04 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Documents the arrival of Soviet, British, and American forces at Majdanek, Auschwitz, Buchenwald, and Dachau, contrasting initial soldier shock with the ongoing struggle to save dying survivors. Recommended Watch Window: 00:00–03:04 (Full Explainer). Lesson Phase: Guided Instruction & The Shock of Discovery. Tone Alert: Solemn archival footage from liberating cameramen.',
      viewing_task:
        '<ol><li><strong>[00:45] Recall:</strong> Which army liberated the Auschwitz-Birkenau extermination camp on 27 January 1945, discovering barely 7,000 emaciated living prisoners?</li><li><strong>[01:30] Explain:</strong> What physical evidence of industrial murder did SS guards fail to destroy before fleeing the camp, including warehouses filled with personal belongings?</li><li><strong>[02:15] Challenge:</strong> Why did the date of the liberation of Auschwitz-Birkenau (27 January) become universally designated by the United Nations as International Holocaust Remembrance Day?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Soviet Red Army (the 322nd Rifle Division of the 60th Army).</li><li><strong>Explain:</strong> Although the SS blew up Crematoria II, III, and V and burned down many storage barracks (the "Canada" section), Soviet troops discovered hundreds of thousands of men\'s and women\'s suits, 836,255 women\'s coats, 38,000 pairs of men\'s shoes, and over 7 tons of human hair shaved from victims before gassing.</li><li><strong>Challenge:</strong> Auschwitz-Birkenau was the largest and most lethal extermination center in history, where over 1.1 million human beings (including 1 million Jews) were murdered. Its liberation symbolizes both the moral nadir of human civilization and the absolute necessity of global vigilance against prejudice, making 27 January a permanent international pledge of remembrance.</li></ol>',
    },
  ],

  lesson_6: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=qQaySHue7Xo',
      title: 'Who are the Righteous Among the Nations? | Yad Vashem',
      duration: '2 mins 45 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Animated explainer from Yad Vashem explaining the criteria for recognition as Righteous Among the Nations: non-Jewish individuals who risked their lives, freedom, or safety to save Jews during the Holocaust without monetary compensation. Recommended Watch Window: 00:00–02:45 (Full Clip) • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated concept summary.',
      viewing_task:
        '<ol><li><strong>[00:50] Quick Check:</strong> What three strict criteria does Yad Vashem require to bestow the honor of "Righteous Among the Nations"?</li><li><strong>[02:00] Hinge Question:</strong> Why did rescuing a Jewish family in occupied Eastern Europe require extraordinary moral and physical courage compared to Western Europe?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> 1) Active involvement in saving Jewish individuals; 2) Direct mortal risk to the rescuer\'s life or freedom; 3) Complete absence of financial compensation or self-interest.</li><li><strong>Hinge Question:</strong> In Poland and Ukraine, the Nazi occupation enforced immediate public execution of the rescuer AND their entire family for merely offering a crust of bread or shelter to a Jew, whereas in Western Europe penalties were often imprisonment or fines, making Eastern European rescue extraordinarily perilous.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=9yU3ALfVcp0',
      title: 'Why Almost All of Denmark\'s Jews Survived the Holocaust | Imperial War Museums',
      duration: '11 mins 04 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'IWM curator documentary examining rescue and rescue networks: the Danish rescue of October 1943, where Danish fishermen ferried over 7,200 Jews to neutral Sweden in small boats, contrasting with complicity across occupied Europe. Recommended Watch Window: 01:00–06:45 • Lesson Phase: Guided Instruction & Ethical Investigation. Tone Alert: Rigorous, uplifting museum documentary exploring moral responsibility and resistance.',
      viewing_task:
        '<ol><li><strong>[01:45] Recall:</strong> What percentage of the Jewish population of Denmark survived the Holocaust as a result of the nationwide rescue operation in October 1943?</li><li><strong>[03:30] Explain:</strong> Explain how German naval attaché Georg Ferdinand Duckwitz leaked the planned Gestapo roundup, and how Danish doctors, police, clergy, and fishermen mobilized to hide and rescue their Jewish neighbors.</li><li><strong>[05:40] Challenge:</strong> Evaluate the spectrum of human behavior during the Shoah (perpetrators, collaborators, bystanders, and rescuers): why were rescuers like the Danish people or Raoul Wallenberg the rare exception rather than the rule?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Over 99% of Denmark\'s Jewish population survived (over 7,200 people were ferried to Sweden, with only 481 captured and sent to Theresienstadt, where Danish authorities continually monitored their welfare).</li><li><strong>Explain:</strong> Duckwitz warned Danish politicians of the upcoming Rosh Hashanah roundup. Within hours, Danish hospital staff admitted hundreds of Jews under false Christian names, clergy read pastoral letters demanding protection for Jewish citizens from church pulpits, ordinary citizens provided safe houses, and Danish fishermen risked their lives ferrying families across the icy Øresund strait to neutral Sweden in over 300 fishing vessels.</li><li><strong>Challenge:</strong> Rescuing Jews required immense physical danger: across Nazi-occupied Eastern Europe, sheltering a Jew was punishable by immediate summary execution of the rescuer and their entire family. Most Europeans were bystanders who turned a blind eye out of terror, indifference, or anti-Semitic prejudice, while many actively collaborated for financial profit (such as claiming abandoned Jewish apartments). In Denmark, rescue succeeded because Danish national identity defined Danish Jews as fellow citizens, creating unified civic solidarity supported by state institutions and proximity to neutral Sweden.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1EVPjV7Toho',
      title: 'One Life (2023, James Hawes / Anthony Hopkins) | Official Trailer',
      duration: '2 mins 12 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Acclaimed biographical drama starring Sir Anthony Hopkins and Johnny Flynn as Sir Nicholas Winton, who organized the Prague Kindertransport in 1939, rescuing 669 predominantly Jewish children from Nazi-occupied Czechoslovakia before borders closed. Recommended Watch Window: 00:00–02:12 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Moral Responsibility. Tone Alert: Deeply moving, uplifting historical drama exploring compassion and humility.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice young Nicholas Winton racing against bureaucratic red tape and German troop movements in Prague, and decades later as an elderly man on the BBC television programme <em>That\'s Life!</em> surrounded by the adult children he saved. How does this film challenge the common historical excuse that "an ordinary individual was powerless to make a difference"?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer illustrates that Nicholas Winton was not a politician or diplomat, but a 29-year-old stockbroker who recognized an urgent humanitarian crisis and refused to remain an indifferent bystander. By cutting through bureaucratic delays and finding foster families, his actions prove that determined moral initiative by ordinary citizens could rescue hundreds of innocent lives from genocide.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=FVNR8PrtnQc',
      title: 'Defiance (2008, Edward Zwick / Daniel Craig) | Official Trailer',
      duration: '2 mins 27 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Dramatisation of the Bielski partisans—brothers Tuvia, Zus, and Asael Bielski—who built a thriving hidden community of over 1,200 Jewish refugees in the Naliboki forest of Belarus, choosing armed resistance focused primarily on saving lives rather than military glory. Recommended Watch Window: 00:00–02:27 (Full Trailer). Lesson Phase: Guided Instruction & Armed Jewish Resistance. Tone Alert: Tense, heroic historical combat drama highlighting active resistance.',
      viewing_task:
        '<ol><li><strong>[00:45] Recall:</strong> In what densely forested region of Eastern Europe did the Bielski brothers establish an armed partisan community that successfully protected over 1,200 Jewish men, women, and children?</li><li><strong>[01:30] Explain:</strong> Contrast the philosophy of Tuvia Bielski ("I would rather save one old Jewish woman than kill ten German soldiers") with conventional military partisan resistance.</li><li><strong>[02:10] Challenge:</strong> How does the reality of the Bielski forest community shatter the persistent myth that Jewish victims passively accepted Nazi persecution without fighting back?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Naliboki Forest in Western Belarus (then eastern Poland).</li><li><strong>Explain:</strong> Soviet partisans prioritized blowing up German supply trains and killing enemy troops, often rejecting elderly Jews, women, and children as burdens. Tuvia Bielski insisted that every single Jewish refugee, regardless of age or physical infirmity, must be welcomed into the forest camp, establishing schools, a hospital, a bakery, and workshops, making rescue the supreme goal.</li><li><strong>Challenge:</strong> Despite facing brutal winters, starvation, and manhunts by German anti-partisan brigades, the Bielski partisans built a functioning democratic woodland society that survived for over two years. By fighting back with rifles and preserving over a thousand lives, they proved that Jews engaged in active, sophisticated armed resistance whenever geographical and logistical conditions made it possible.</li></ol>',
    },
  ],

  lesson_7: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Qu3_Oytc5Qk',
      title: 'The Liberation of Bergen-Belsen Concentration Camp | Holocaust Memorial Day Trust',
      duration: '2 mins 40 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Archival newsreel of the British 11th Armoured Division liberating Bergen-Belsen on 15 April 1945, featuring Richard Dimbleby\'s historic BBC radio broadcast, medical relief, and survivor testimony. Recommended Watch Window: 00:00–02:35 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Solemn, historical newsreel footage detailing the humanitarian catastrophe discovered by Allied forces.',
      viewing_task:
        '<ol><li><strong>[00:40] Quick Check:</strong> Which Allied army liberated the Bergen-Belsen concentration camp in northern Germany on 15 April 1945, discovering 60,000 starving survivors and thousands of unburied corpses?</li><li><strong>[01:30] Hinge Question:</strong> Why did the BBC initially refuse to broadcast Richard Dimbleby\'s emotional dispatch from Bergen-Belsen until he threatened to resign?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> The British Army (the 11th Armoured Division).</li><li><strong>Hinge Question:</strong> BBC executives could not believe human beings could inflict such unspeakable barbarity, fearing the public would dismiss it as exaggerated wartime propaganda. Dimbleby\'s determination ensured that eyewitness proof of the Nazi genocide was broadcast to the world.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1CAQ2lNDBN0',
      title: 'What Was the Liberation of Nazi Camps? | Holocaust Explainer | USHMM',
      duration: '3 mins 04 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'USHMM documentary detailing the liberation of camps across Europe, the medical disaster facing liberators, and the struggle of survivors who returned to find their entire families murdered. Recommended Watch Window: 00:30–03:00 • Lesson Phase: Guided Instruction & Post-Liberation Reality. Tone Alert: Sobering, respectful museum documentary.',
      viewing_task:
        '<ol><li><strong>[00:45] Recall:</strong> What severe infectious disease was sweeping through Bergen-Belsen when British medical teams arrived, killing hundreds of survivors each day even after liberation?</li><li><strong>[01:40] Explain:</strong> Explain the immense difficulties faced by "Displaced Persons" (DPs) in post-war Europe: why could many survivors not return to their hometowns in Poland?</li><li><strong>[02:30] Challenge:</strong> Evaluate how the shock of camp liberations permanently altered Western public perceptions of Nazi Germany and shaped post-war human rights conventions.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Typhus.</li><li><strong>Explain:</strong> Thousands of survivors had no surviving family members, their homes had been confiscated by neighbors, and virulent anti-Semitic pogroms (such as the Kielce pogrom of July 1946) broke out against returning Jews in Poland. This forced over 250,000 survivors into Allied Displaced Persons camps for years while they waited for visas to emigrate.</li><li><strong>Challenge:</strong> Direct photographic and newsreel evidence filmed by British, Soviet, and American cameramen removed all doubts regarding the depravity of the Nazi regime. The sheer horror convinced world leaders that national sovereignty must be subordinated to universal human rights, leading directly to the 1948 UN Convention on the Prevention and Punishment of the Crime of Genocide and the Universal Declaration of Human Rights.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=yH7ktvUWaYo',
      title: 'Denial (2016, Mick Jackson / Rachel Weisz) | Official Trailer',
      duration: '2 mins 31 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Based on the true story of American historian Deborah E. Lipstadt, who was sued for libel in the British High Court by British Holocaust denier David Irving. Features Rachel Weisz and Timothy Spall, illustrating the forensic courtroom defense of Auschwitz\'s gas chambers and the danger of historical distortion. Recommended Watch Window: 00:00–02:31 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Defending Historical Truth. Tone Alert: Gripping, intellectually intense British courtroom drama.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the legal stakes under English libel law (where the burden of proof fell on the defendant to prove the Holocaust happened), the forensic visit to the ruins of Crematorium II at Auschwitz-Birkenau, and David Irving\'s calculated falsification of archival documents. Why is the legal victory in <em>Lipstadt v Irving</em> a crucial moment in modern historiography and the battle against Holocaust denial?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer dramatizes the critical difference between legitimate historical debate and ideological lies. By presenting forensic architectural blueprints of gas chambers, railway timetables, and documentary evidence in a court of law, Lipstadt\'s legal team legally established that Holocaust denial is not an opinion, but deliberate anti-Semitic fabrication, demonstrating why rigorous documentary evidence matters.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=vywGZzb9O4M',
      title: 'The Nuremberg Trial: The Film Record (1946) | US Chief of Counsel for the Prosecution',
      duration: '17 mins 21 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Authoritative archival documentary capturing Justice Robert H. Jackson\'s opening address, the screening of liberating film evidence inside the courtroom, and the cross-examination of Hermann Göring and Nazi leadership. Recommended Watch Window: 02:00–10:30 • Lesson Phase: In-Depth Documentary Investigation & International Justice. Tone Alert: Solemn, historic judicial documentary featuring primary courtroom audio.',
      viewing_task:
        '<ol><li><strong>[03:15] Recall:</strong> What famous warning did US Chief Prosecutor Robert H. Jackson deliver in his opening statement regarding the historical significance of the Nuremberg Trials?</li><li><strong>[06:40] Explain:</strong> How did Allied prosecutors use Nazi Germany\'s own captured administrative records, films, and government memos rather than eyewitness testimony as the bedrock of their prosecution?</li><li><strong>[09:20] Challenge:</strong> Evaluate whether the Nuremberg Trials successfully delivered justice: did executing key leaders heal the moral devastation of the Holocaust, and how did it establish the universal principle of individual criminal responsibility?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> "That four great nations, flushed with victory and stung with injury, stay the hand of vengeance and voluntarily submit their captive enemies to the judgment of the law is one of the most significant tributes that Power has ever paid to Reason."</li><li><strong>Explain:</strong> Jackson recognized that defendants might accuse eyewitnesses of emotional bias or exaggerating trauma. By relying on millions of pages of meticulous Nazi paperwork, typed transport manifests, minutes of the Wannsee Conference, and SS extermination reports, prosecutors proved that genocide was the deliberate policy of the Nazi state using the regime\'s own undeniable paperwork.</li><li><strong>Challenge:</strong> Executing a dozen Nazi leaders could never compensate for the slaughter of six million innocent people. However, Nuremberg succeeded in creating an incontrovertible evidentiary record that permanently discredited the Nazi regime and made Holocaust denial legally impossible. Crucially, it established that heads of state and military commanders cannot shield themselves behind sovereignty or "following orders", establishing the foundation for all modern international human rights law.</li></ol>',
    },
  ],
};

async function applyShoah4Tier() {
  const dataPath = path.join(ROOT_DIR, 'units', 'the_shoah', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  unitData.lessons.forEach((l) => {
    if (theShoah4TierVideos[l.id]) {
      l.video = theShoah4TierVideos[l.id];
      delete l.extra_videos;
      console.log(`✅ Injected 4-Tier shelf (${l.video.length} videos) into ${l.id} (${l.title})`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/the_shoah/data.js');

  // Copy to public/units/the_shoah/data.js
  const publicUnitDir = path.join(ROOT_DIR, 'public', 'units', 'the_shoah');
  if (!fs.existsSync(publicUnitDir)) fs.mkdirSync(publicUnitDir, { recursive: true });
  fs.writeFileSync(path.join(publicUnitDir, 'data.js'), fileContent, 'utf8');
  console.log('✅ Updated public/units/the_shoah/data.js');

  // Sync to data/the_shoah.json and public/data/the_shoah.json
  const payload = { id: 'the_shoah', data: unitData };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'data', 'the_shoah.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(ROOT_DIR, 'public', 'data', 'the_shoah.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  console.log('✅ Synced data/the_shoah.json and public/data/the_shoah.json');

  console.log('\nRebuilding database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('🎉 THE SHOAH 4-TIER SHELF COMPLETED (28/28 VIDEOS ACTIVE)!');
}

applyShoah4Tier().catch((err) => {
  console.error('❌ Error applying The Shoah 4-tier videos:', err);
  process.exit(1);
});
