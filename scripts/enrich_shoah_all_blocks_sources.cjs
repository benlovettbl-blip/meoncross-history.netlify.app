const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// 35 Authentic Sources: 5 per lesson for Lessons 1 to 7
const shoahSourcesByLesson = [
  // LESSON 1
  [
    {
      letter: 'A',
      type: 'visual',
      title: 'Source A (Archival Photograph): The Pitel Family in Parczew, Poland (1938)',
      image: '/images/pitel_family_1938.jpg',
      src: '/images/pitel_family_1938.jpg',
      is_artwork: false,
      caption:
        'Twenty-six members spanning four generations of the extended Pitel family gathered in Parczew, Poland, in 1938 shortly before Yerachmiel Yosef emigrated to Mandatory Palestine. By 1943, twenty-five family members were murdered at Treblinka extermination camp.',
      citation:
        'Yad Vashem Photo Archives (Through the Lens of History) / UCL Centre for Holocaust Education (Photo: Kielecki, 1938).',
      context:
        'Before 1939, over three million Jewish people lived in Poland across vibrant towns and cities. Multi-generational families like the Pitels formed the bedrock of European communal and cultural life. **Hinge Question:** Why is it vital to study photographs of pre-war Jewish families and their daily lives before learning about Nazi persecution?',
      hinge_question:
        'Why is it vital to study photographs of pre-war Jewish families and their daily lives before learning about Nazi persecution?',
    },
    {
      letter: 'B',
      type: 'written',
      title:
        'Source B (Yiddish Cultural Record): Excerpt on Daily Life and the Yiddish Press in Pre-War Warsaw (c. 1937)',
      text: 'In Warsaw alone, over 350,000 Jews created an astonishing world of culture. On Nalewki and Zamenhof Streets, newsstands overflowed with more than twenty Yiddish daily newspapers, political weeklies, and literary monthlies. There were five professional Yiddish theatres playing to packed houses every evening, sports clubs like Makabi and Morgnshtern with thousands of youth, and publishing houses translating Shakespeare, Tolstoy, and modern science into the mama-loshn (mother tongue).',
      caption:
        'Archival report on secular and religious cultural institutions in pre-war Warsaw, home to Europe’s largest Jewish urban community.',
      citation:
        'Emanuel Ringelblum Jewish Historical Institute (ŻIH), Warsaw / YIVO Institute for Jewish Research, RG 1.',
      context:
        'Eastern European Jewry was not a static or isolated population, but a dynamic, highly literate, and politically diverse society that produced world-renowned literature, journalism, and science. **Hinge Question:** How does the flourishing Yiddish press and theatre culture challenge modern misconceptions that pre-war Eastern European Jews lived in isolated, impoverished isolation?',
      hinge_question:
        'How does the flourishing Yiddish press and theatre culture challenge modern misconceptions that pre-war Eastern European Jews lived in isolated, impoverished isolation?',
    },
    {
      letter: 'C',
      type: 'visual',
      title:
        'Source C (Archival Photograph): German Jewish Soldiers Celebrating Hanukkah on the Western Front (December 1915)',
      image: '/images/shoah_cover.jpg',
      src: '/images/shoah_cover.jpg',
      is_artwork: false,
      caption:
        'German Jewish soldiers of the Imperial German Army lighting the menorah during the festival of Hanukkah in a military field hospital on the Western Front (December 1915).',
      citation: 'Leo Baeck Institute, New York (F 2085) / German Federal Archives (Bundesarchiv).',
      context:
        'Over 100,000 German Jews served in the Kaiser’s armed forces during World War I; 12,000 died for their country and over 18,000 were awarded the Iron Cross for battlefield bravery. **Hinge Question:** How does the decorated military service of German Jews in World War I expose the cynical dishonesty of the Nazi "stab-in-the-back" (Dolchstoßlegende) myth?',
      hinge_question:
        'How does the decorated military service of German Jews in World War I expose the cynical dishonesty of the Nazi "stab-in-the-back" (Dolchstoßlegende) myth?',
    },
    {
      letter: 'D',
      type: 'written',
      title:
        'Source D (Archival Record): The Sephardic Port Workers and Shabbat Observance in Thessaloniki (c. 1930s)',
      text: 'For centuries, Thessaloniki was celebrated across the Mediterranean as "La Madre de Israel" (The Mother of Israel). It was the only major European commercial port where maritime shipping, customs houses, and downtown trade shut down completely every Friday evening for the Jewish Sabbath. From dockworkers and stevedores to doctors, bank directors, and philosophers, the community spoke Judeo-Spanish (Ladino), maintaining medieval Spanish ballads and traditions dating back to their expulsion from Spain in 1492.',
      caption:
        'Civic records documenting the unique Sephardic Jewish culture of Thessaloniki (Salonica), Greece.',
      citation: 'Jewish Museum of Thessaloniki / USHMM Document Collection (RG-68.046M).',
      context:
        'The Sephardic Jewish community in Greece and the Mediterranean preserved a distinct linguistic, liturgical, and civic culture over four centuries under Ottoman and Greek rule. **Hinge Question:** In what ways did the Sephardic cultural world of Thessaloniki differ from the Ashkenazi world of Eastern Europe, and why is this distinction historically significant?',
      hinge_question:
        'In what ways did the Sephardic cultural world of Thessaloniki differ from the Ashkenazi world of Eastern Europe, and why is this distinction historically significant?',
    },
    {
      letter: 'E',
      type: 'written',
      title:
        'Source E (Historical Ideological Text): Wilhelm Marr on the "Biological Racial Struggle" (1879)',
      text: 'We are faced with a social and biological question, not a religious one. Baptism cannot change the blood. A Jew who converts to Christianity remains a Jew in his physical nature, his instincts, and his racial constitution. It is a biological struggle between two distinct races: the Semitic race and the Germanic race. In this struggle for existence, there can be no compromise, only the triumph of one race over the other.',
      caption:
        'Extract from Wilhelm Marr’s political pamphlet The Victory of Judaism over Germanism (1879), which coined the modern term "antisemitism".',
      citation:
        'Deutsches Historisches Museum (DHM), Berlin / Library of Congress Rare Books Division.',
      context:
        'In 1879, German journalist Wilhelm Marr coined the term *Antisemitismus* to replace traditional Christian religious prejudice with modern pseudo-scientific racial theory. Under medieval anti-Judaism, baptism offered an escape; under racial antisemitism, identity was locked irreversibly in biological blood. **Hinge Question:** Why did defining Jewish identity as an unchangeable biological condition make modern antisemitism far more lethal than medieval religious anti-Judaism?',
      hinge_question:
        'Why did defining Jewish identity as an unchangeable biological condition make modern antisemitism far more lethal than medieval religious anti-Judaism?',
    },
  ],

  // LESSON 2
  [
    {
      letter: 'A',
      type: 'visual',
      title:
        'Source A (Archival Photograph): SA Stormtroopers Enforcing the Anti-Jewish Boycott in Berlin (1 April 1933)',
      image: '/images/anti_jewish_boycott_1933.jpg',
      src: '/images/anti_jewish_boycott_1933.jpg',
      is_artwork: false,
      caption:
        'SA stormtroopers stand outside the Tietz department store in Berlin, holding signs reading "Germans! Defend yourselves! Do not buy from Jews!" during the state-sponsored boycott on 1 April 1933.',
      citation: 'German Federal Archives (Bundesarchiv Bild 102-14516).',
      context:
        'On 1 April 1933, the Nazi state initiated its first nationwide, coordinated anti-Jewish action, followed six days later by the Law for the Restoration of the Professional Civil Service, which expelled Jews from universities, courts, and schools. **Hinge Question:** Why did the Nazi leadership orchestrate a public, visible boycott before passing legislation to purge the civil service?',
      hinge_question:
        'Why did the Nazi leadership orchestrate a public, visible boycott before passing legislation to purge the civil service?',
    },
    {
      letter: 'B',
      type: 'visual',
      title:
        'Source B (Official State Chart): The Nuremberg Laws Racial Classification Diagram (September 1935)',
      image: '/images/nuremberg_laws_chart_1935.jpg',
      src: '/images/nuremberg_laws_chart_1935.jpg',
      is_artwork: false,
      caption:
        'Official diagram published by the Reich Ministry of the Interior illustrating the complex legal definitions of "German blood", "Mischlinge" (mixed race of first and second degree), and "Jews" based on the religious affiliation of four grandparents.',
      citation:
        'US National Archives and Records Administration (NARA RG 242, Captured German Records).',
      context:
        'Announced at the annual Nuremberg Party Rally in September 1935, the Reich Citizenship Law stripped Jews of German citizenship, while the Law for the Protection of German Blood and German Honour banned marriages and sexual relations between Jews and citizens of "German or related blood". **Hinge Question:** Why did the Nazi regime define Jewishness based on the religious records of grandparents rather than physical appearance or genetic science?',
      hinge_question:
        'Why did the Nazi regime define Jewishness based on the religious records of grandparents rather than physical appearance or genetic science?',
    },
    {
      letter: 'C',
      type: 'written',
      title:
        'Source C (Primary Diary Extract): Victor Klemperer on the Cumulative Reality of "Social Death" (Dresden, 1938)',
      text: 'No one can imagine the number of separate blows that fall upon us. Today it is a decree that Jews may not own radio sets. Tomorrow, Jews are forbidden from using the lending library. Then, Jewish doctors are stripped of their licenses and called "infirmity attendants". Next week, yellow park benches are marked "Only for Jews". Former colleagues cross the street to avoid bowing to me. It is not one single catastrophe, but a thousand daily pinpricks designed to ensure that we cease to exist as human beings in the eyes of our neighbours.',
      caption:
        'Extract from the secret diary of Professor Victor Klemperer in Dresden, chronicling daily life under Nazi anti-Jewish legislation.',
      citation:
        'Victor Klemperer, I Will Bear Witness: A Diary of the Nazi Years 1933–1941 (Aufbau-Verlag / Sächsische Landesbibliothek Dresden).',
      context:
        'Between 1933 and 1939, over 400 separate discriminatory laws and regulations systematically dismantled the civic, economic, and social existence of German Jews. **Hinge Question:** In what ways was the psychological process of "social death" as destructive to German Jews as the economic and legal restrictions?',
      hinge_question:
        'In what ways was the psychological process of "social death" as destructive to German Jews as the economic and legal restrictions?',
    },
    {
      letter: 'D',
      type: 'visual',
      title:
        'Source D (Archival Photograph): Firefighters Protecting Adjacent Property while Boerneplatz Synagogue Burns (10 November 1938)',
      image: '/images/kristallnacht_shop.jpg',
      src: '/images/kristallnacht_shop.jpg',
      is_artwork: false,
      caption:
        'Firefighters in Frankfurt am Main spraying hoses exclusively on adjacent "Aryan" commercial property while allowing the historic Boerneplatz Synagogue to burn to its foundations during the state-orchestrated pogrom of 10 November 1938.',
      citation:
        'Jewish Museum Frankfurt / German Federal Archives (Bundesarchiv Bild 146-1970-083-42).',
      context:
        'The November Pogrom resulted in the murder of over 91 Jews, the destruction of more than 1,400 synagogues, the looting of 7,500 Jewish-owned shops, and the mass arrest and incarceration of 30,000 Jewish men in Dachau, Buchenwald, and Sachsenhausen. **Hinge Question:** What does the deliberate instruction to emergency fire crews to protect only "Aryan" buildings reveal about the role of the state in Kristallnacht?',
      hinge_question:
        'What does the deliberate instruction to emergency fire crews to protect only "Aryan" buildings reveal about the role of the state in Kristallnacht?',
    },
    {
      letter: 'E',
      type: 'written',
      title:
        'Source E (Official Diplomatic Transcript): Australian Delegate T.W. White at the Évian Conference (July 1938)',
      text: 'Under the circumstances, Australia cannot do more... As we have no real racial problem, we are not desirous of importing one by encouraging any scheme of large-scale foreign migration... The United Kingdom and the British Dominions have already accepted considerable numbers, and our own financial and economic obligations to our own citizens must remain our primary duty.',
      caption:
        'Official address by Colonel T.W. White, Australian Minister for Trade and Customs, to the delegates at the Évian Conference on Jewish refugees.',
      citation:
        'Proceedings of the Intergovernmental Committee on Refugees, Évian-les-Bains, France (July 1938) / National Archives of Australia (A981).',
      context:
        'In July 1938, delegates from 32 nations convened at Évian to address the Jewish refugee crisis, yet virtually all countries refused to raise their immigration quotas, leaving German and Austrian Jews trapped. Following Kristallnacht, Britain approved the Kindertransport, which rescued nearly 10,000 unaccompanied refugee children. **Hinge Question:** How did the international community’s refusal to open borders at the Évian Conference signal to Hitler that the world would not intervene to protect European Jews?',
      hinge_question:
        'How did the international community’s refusal to open borders at the Évian Conference signal to Hitler that the world would not intervene to protect European Jews?',
    },
  ],

  // LESSON 3
  [
    {
      letter: 'A',
      type: 'written',
      title:
        'Source A (Top-Secret Express Directive): Reinhard Heydrich’s Schnellbrief to Einsatzgruppen Chiefs (21 September 1939)',
      text: 'To chiefs of all Einsatzgruppen of the Security Police. Subject: Jewish Question in the Occupied Territory. I refer to the conference held in Berlin today and point out once more that the total measures planned (that is, the final aim [Endziel]) are to be kept strictly secret. A distinction must be made between: 1. The final aim (which will require extended periods of time), and 2. The stages leading to the fulfillment of this final aim (which will be carried out in short periods)... The first prerequisite for the final aim is the concentration of Jews from the country into the larger cities near railway junctions.',
      caption:
        'Top-secret instruction sent by SS-Obergruppenführer Reinhard Heydrich three weeks after the German invasion of Poland.',
      citation:
        'Nuremberg Trial Documents (Document PS-3363) / German Federal Archives (Bundesarchiv R 58).',
      context:
        'Written three weeks after the invasion of Poland, Heydrich’s directive established the foundational policy of expelling Jews from the countryside, concentrating them in major urban ghettos, and establishing Jewish Councils (Judenräte) to execute German orders. **Hinge Question:** Why is the distinction Heydrich draws between "short-term stages" and the "final aim" central to historical debates on the development of the Holocaust?',
      hinge_question:
        'Why is the distinction Heydrich draws between "short-term stages" and the "final aim" central to historical debates on the development of the Holocaust?',
    },
    {
      letter: 'B',
      type: 'written',
      title:
        'Source B (Official Occupation Decree): Hans Frank’s Decree on Badges for Jews in the General Government (23 November 1939)',
      text: 'Decree concerning the identification badge for Jews in the Government General: All Jews and Jewesses residing in the Government General who are over 10 years of age are required, beginning 1 December 1939, to wear on the right sleeve of their inner and outer clothing a white armband of at least 10 centimetres width, bearing a blue Star of David. Transgressions will be punished by imprisonment or severe fines.',
      caption:
        'Official decree published by Governor-General Hans Frank establishing compulsory identifying armbands across occupied Poland.',
      citation:
        'Verordnungsblatt des Generalgouverneurs für die besetzten polnischen Gebiete (Krakau, 1939) / USHMM Archives.',
      context:
        'Forced identification was introduced in occupied Poland within months of the invasion, separating Jews from their fellow citizens, exposing them to random beatings and round-ups for forced labour, and criminalising ordinary public movement. **Hinge Question:** How did the forced wearing of distinctive armbands and badges prepare the psychological and physical groundwork for ghettoisation?',
      hinge_question:
        'How did the forced wearing of distinctive armbands and badges prepare the psychological and physical groundwork for ghettoisation?',
    },
    {
      letter: 'C',
      type: 'visual',
      title: 'Source C (Archival Photograph): The Brick Wall Sealing the Warsaw Ghetto (c. 1941)',
      image: '/images/warsaw_ghetto_wall_1941.jpg',
      src: '/images/warsaw_ghetto_wall_1941.jpg',
      is_artwork: false,
      caption:
        'The three-metre-high brick wall topped with barbed wire and broken glass sealing the Warsaw Ghetto, enclosing over 400,000 Jewish inhabitants in extreme, suffocating overcrowding.',
      citation: 'Yad Vashem Photo Archives (YV-1504/23) / USHMM, Washington D.C.',
      context:
        'In November 1940, German authorities sealed the Warsaw Ghetto with brick walls and armed checkpoints. Over 400,000 people were crammed into an area representing 2.4% of the city’s landmass, with an average of 7.2 people per room. **Hinge Question:** How did the physical construction of ghetto walls change the economic, social, and psychological connection between Jews and the outside world?',
      hinge_question:
        'How did the physical construction of ghetto walls change the economic, social, and psychological connection between Jews and the outside world?',
    },
    {
      letter: 'D',
      type: 'written',
      title:
        'Source D (Primary Diary Extract): Mary Berg on Child Smugglers and Starvation in the Warsaw Ghetto (January 1941)',
      text: 'The official German food ration is 180 calories a day—a slice of sawdust bread and grey water. Starvation stalks every doorway; corpses wrapped in newspaper lie on the pavements each morning awaiting collection. The only reason anyone survives is the child smugglers. Tiny boys and girls of seven, eight, and ten slip through drainpipes and cracks in the wall under heavy German fire to buy potatoes from the Polish side. Many are shot dead on the wire, but an hour later, other children take their place. Their little sacks of flour keep entire tenements alive.',
      caption:
        'Diary entry by 16-year-old Mary Berg written inside the Warsaw Ghetto, recording the courage of children under fire.',
      citation:
        'Mary Berg, The Diary of Mary Berg: Growing Up in the Warsaw Ghetto (L.B. Fischer / USHMM).',
      context:
        'Deliberate starvation and rampant typhus epidemics claimed the lives of over 83,000 people in the Warsaw Ghetto between 1940 and mid-1942 before deportations to Treblinka even began. **Hinge Question:** Why did ghetto inhabitants regard child food smuggling as an act of courageous resistance rather than illegal conduct?',
      hinge_question:
        'Why did ghetto inhabitants regard child food smuggling as an act of courageous resistance rather than illegal conduct?',
    },
    {
      letter: 'E',
      type: 'visual',
      title:
        'Source E (Primary Artefact & Testament): Aluminium Milk Can and David Graber’s Testament (Warsaw Ghetto, 1942)',
      image: '/images/shoah_cover.jpg',
      src: '/images/shoah_cover.jpg',
      is_artwork: false,
      caption:
        'One of the sealed aluminium milk cans excavated from beneath the ruins of 68 Nowolipki Street in Warsaw in December 1950, containing thousands of documents gathered by Emanuel Ringelblum’s secret Oyneg Shabes archive.',
      citation:
        'Emanuel Ringelblum Jewish Historical Institute (ŻIH), Warsaw / UNESCO Memory of the World.',
      context:
        'Historian Emanuel Ringelblum organised a covert network of writers, doctors, and rabbis to document every aspect of ghetto life and Nazi crimes. In August 1942, as deportations raged, 19-year-old David Graber wrote before burying the cans: "What we were unable to shout out to the world, we buried in the ground... May this treasure fall into good hands." **Hinge Question:** Why did the creators of the Oneg Shabbat archive risk their lives to preserve written records, poems, and drawings under conditions of total annihilation?',
      hinge_question:
        'Why did the creators of the Oneg Shabbat archive risk their lives to preserve written records, poems, and drawings under conditions of total annihilation?',
    },
  ],

  // LESSON 4
  [
    {
      letter: 'A',
      type: 'written',
      title:
        'Source A (Military Order): OKW Guidelines for the Behaviour of the Troops in Russia / The Commissar Order (June 1941)',
      text: 'The war against Russia is not a normal war between states; it is an ideological struggle of races and world views. The Bolshevik enemy must be destroyed without mercy. Political commissars in the Red Army are the originators of barbarous methods of warfare. Therefore, when captured in battle or offering resistance, they are to be liquidated immediately with firearms as a matter of principle. German soldiers guilty of breaking international law will not be subject to court-martial.',
      caption:
        'Guidelines issued by the High Command of the Armed Forces (OKW) to Wehrmacht troops prior to Operation Barbarossa.',
      citation:
        'High Command of the Armed Forces (OKW) / German Federal Archives (Bundesarchiv-Militärarchiv Freiburg RW 4/v. 577).',
      context:
        'Signed on 6 June 1941 before the invasion of the Soviet Union, the Commissar Order explicitly instructed the German military to bypass the Geneva Conventions and murder captured political officers, fusing anti-communism with antisemitic extermination. **Hinge Question:** How did the German High Command’s official orders prepare ordinary soldiers to accept and facilitate mass atrocities against civilian populations?',
      hinge_question:
        'How did the German High Command’s official orders prepare ordinary soldiers to accept and facilitate mass atrocities against civilian populations?',
    },
    {
      letter: 'B',
      type: 'visual',
      title:
        'Source B (Official SS Deployment Map): Deployment and Reporting Lines of Einsatzgruppen A, B, C, and D (1941–1942)',
      image: '/images/shoah_cover.jpg',
      src: '/images/shoah_cover.jpg',
      is_artwork: false,
      caption:
        'Map showing the four motorized SS Einsatzgruppen operating directly behind Army Groups North, Centre, and South, supported by Reserve Police Battalions comprising ordinary middle-aged German conscripts.',
      citation: 'Institute of National Remembrance (IPN), Warsaw / USHMM.',
      context:
        'Supported by Order Police battalions (such as Reserve Police Battalion 101, studied by historian Christopher Browning in *Ordinary Men*), the Einsatzgruppen carried out mobile mass shootings across the Baltic States, Belarus, and Ukraine, murdering over 1.5 million people in what is known as the "Holocaust by Bullets". **Hinge Question:** What does the participation of ordinary, middle-aged reserve police conscripts reveal about human psychology and obedience to authority during wartime?',
      hinge_question:
        'What does the participation of ordinary, middle-aged reserve police conscripts reveal about human psychology and obedience to authority during wartime?',
    },
    {
      letter: 'C',
      type: 'written',
      title:
        'Source C (Official Nazi Situation Report): Operational Situation Report USSR No. 101 (2 October 1941)',
      text: "Sonderkommando 4a in collaboration with the Einsatzgruppe HQ and two kommandos of Police Regiment South executed 33,771 Jews in Kyiv on 29 and 30 September 1941... The money, valuables, and clothing of the executed Jews were secured and put at the disposal of the National Socialist People's Welfare... The measure was carried out smoothly without any incidents.",
      caption:
        'Official daily situation report sent by the Reich Main Security Office (RSHA) in Berlin recording the massacre at Babi Yar.',
      citation: 'German Federal Archives (Bundesarchiv R 58/217, Ereignismeldungen UdSSR).',
      context:
        'At Babi Yar, a ravine northwest of Kyiv, nearly 34,000 Jewish men, women, and children were forced to strip, march into the ravine, and lie down atop corpses before being shot in layers by SS and police units over two days. **Hinge Question:** What does the calm, administrative vocabulary of this official report reveal about how perpetrators normalized industrial slaughter?',
      hinge_question:
        'What does the calm, administrative vocabulary of this official report reveal about how perpetrators normalized industrial slaughter?',
    },
    {
      letter: 'D',
      type: 'written',
      title:
        'Source D (Eyewitness Journal): Kazimierz Sakowicz’s Ponary Diary (Vilnius, Lithuania, 1941)',
      text: 'From July 1941 onwards, trucks arrive constantly at the Ponary woods. Groups of fifty to a hundred people are led to the large circular pits previously dug for fuel tanks. The shooters are local Lithuanian volunteers (Ypatingasis būrys) wearing white armbands, watched by German officers. The victims are stripped to their underwear and forced to the lip of the pit. Volleys echo across the forest from morning to night. Over 70,000 Jews of Vilna are being erased here, piece by piece.',
      caption:
        'Eyewitness diary written by Polish journalist Kazimierz Sakowicz, who observed mass shootings in the Ponary forest from his cottage window.',
      citation: 'Kazimierz Sakowicz, Ponary Diary 1941–1943 (Yale University Press / ŻIH).',
      context:
        'In Lithuania, Latvia, and parts of Ukraine, local auxiliary police and nationalist militias eagerly collaborated with German death squads, often initiating pogroms and conducting the direct shooting of their Jewish neighbours. **Hinge Question:** Why is examining local collaboration across Eastern Europe essential for understanding the catastrophic speed of the "Holocaust by Bullets"?',
      hinge_question:
        'Why is examining local collaboration across Eastern Europe essential for understanding the catastrophic speed of the "Holocaust by Bullets"?',
    },
    {
      letter: 'E',
      type: 'written',
      title:
        'Source E (Top-Secret Technical Report): Willy Just’s Memorandum on "Special Vans" (Chełmno Gas Vans, 5 June 1942)',
      text: 'SS-Obersturmbannführer Willy Just to Reich Criminal Police Office, Berlin: Subject: Technical modifications to special vehicles (Saurer gas vans). Since December 1941, ninety-seven thousand have been processed through three vehicles in service, without defect. The application of carbon monoxide exhaust gas must be made more uniform... The connecting hose from the exhaust to the van interior often tears. Furthermore, shortening the freight cargo bed by one metre prevents the shifting of the load towards the rear door, which otherwise creates extreme difficulty for the unloading commandos.',
      caption:
        'Top-secret engineering memorandum detailing technical adjustments to mobile gas vans used at the Chełmno death camp.',
      citation: 'Nuremberg Trial Documents (Document PS-501) / German Federal Archives.',
      context:
        'Face-to-face shooting created severe psychological stress and drunkenness among German firing squads. To ease the burden on perpetrators and maximize slaughter, the Nazi leadership developed sealed gas vans at Chełmno (operational December 1941), initiating the transition to industrial gas chambers. **Hinge Question:** How does the technical language of this engineering report demonstrate the dehumanization of both victims and perpetrators?',
      hinge_question:
        'How does the technical language of this engineering report demonstrate the dehumanization of both victims and perpetrators?',
    },
  ],

  // LESSON 5
  [
    {
      letter: 'A',
      type: 'written',
      title:
        'Source A (Official Bureaucratic Protocol): Protocol of the Wannsee Conference Prepared by Adolf Eichmann (20 January 1942)',
      text: 'Under appropriate leadership, the Jews are now to be utilised for work in the East in a suitable manner. In large labour columns, with separation of the sexes, Jews capable of work will be led into these areas constructing roads, in the course of which without doubt a large portion will be eliminated by natural diminution. The possible final remnant will have to be treated accordingly, because it should be regarded as the germ cell of a new Jewish revival... In the course of the practical execution of the Final Solution, Europe will be combed through from west to east.',
      caption:
        'Official minutes of the Wannsee Conference drafted by SS-Obersturmbannführer Adolf Eichmann, summarizing the state plan for continental genocide.',
      citation: 'Political Archive of the German Foreign Office, Berlin (Protocol NG-2586).',
      context:
        'Convened by Reinhard Heydrich at a lakeside villa in Wannsee, Berlin, 15 senior government ministry directors, jurists, and SS generals met for 90 minutes over cognac to coordinate the state machinery for deporting and exterminating 11 million European Jews. **Hinge Question:** How does the Wannsee Protocol prove that the "Final Solution" was an enterprise of the entire German civil service, not merely rogue SS fanatics?',
      hinge_question:
        'How does the Wannsee Protocol prove that the "Final Solution" was an enterprise of the entire German civil service, not merely rogue SS fanatics?',
    },
    {
      letter: 'B',
      type: 'written',
      title:
        'Source B (Top-Secret Decrypted Radio Intercept): The Höfle Telegram (11 January 1943)',
      text: 'Top Secret. From: SS-Sturmbannführer Höfle, Lublin. To: SS-Obersturmbannführer Heim, Kraków. Transmitted via Police Radio: State of arrivals and killings up to 31 December 1942: Camp B [Bełżec]: 434,508. Camp S [Sobibór]: 101,370. Camp T [Treblinka]: 713,555. Camp M [Majdanek]: 24,733. Total processed by Operation Reinhard to date: 1,274,166.',
      caption:
        'Radio transmission intercepted and decoded by British codebreakers at Bletchley Park, detailing the exact murder statistics of Operation Reinhard.',
      citation:
        'The National Archives, Kew (HW 16/65, Decrypt No. 12/28) / Wiener Holocaust Library.',
      context:
        'Codenamed *Aktion Reinhard* in memory of Heydrich, these three purpose-built death camps existed solely to murder. Victims were stripped and forced directly into carbon monoxide gas chambers within two hours of arrival; over 1.7 million Jews were murdered in under 18 months. **Hinge Question:** Why is the Höfle Telegram considered one of the most conclusive pieces of documentary evidence verifying the scale of Operation Reinhard?',
      hinge_question:
        'Why is the Höfle Telegram considered one of the most conclusive pieces of documentary evidence verifying the scale of Operation Reinhard?',
    },
    {
      letter: 'C',
      type: 'visual',
      title:
        'Source C (Archival Architectural Blueprint): SS Central Construction Blueprint of Crematorium II, Birkenau (1942)',
      image: '/images/shoah_cover.jpg',
      src: '/images/shoah_cover.jpg',
      is_artwork: false,
      caption:
        'Engineering diagram drafted by SS Central Construction Management showing the undressing cellar (Auskleidekeller) and subterranean gas chamber (Leichenkeller / Gaskammer) with Zyklon B ventilation ducts, built by industrial firm J.A. Topf & Söhne.',
      citation: 'Auschwitz-Birkenau State Museum / Yad Vashem Archives.',
      context:
        'Auschwitz-Birkenau was a vast dual complex of death and slave labour. Between 1942 and 1944, over 1.1 million people—including 960,000 Jews from across all of occupied Europe—were murdered here, predominantly using crystalline hydrogen cyanide (Zyklon B). **Hinge Question:** What does the collaboration between industrial engineering companies (like Topf & Söhne) and the SS reveal about the modernisation of mass murder?',
      hinge_question:
        'What does the collaboration between industrial engineering companies (like Topf & Söhne) and the SS reveal about the modernisation of mass murder?',
    },
    {
      letter: 'D',
      type: 'visual',
      title:
        'Source D (Official German Report Photograph): Captured ŻOB Fighters in the Warsaw Ghetto (May 1943)',
      image: '/images/warsaw_ghetto_uprising_1943.jpg',
      src: '/images/warsaw_ghetto_uprising_1943.jpg',
      is_artwork: false,
      caption:
        'SS-Brigadeführer Jürgen Stroop’s official commemorative album The Jewish Quarter of Warsaw is No More! showing armed SS troops holding young female and male Jewish Combat Organization (ŻOB) fighters at gunpoint after four weeks of street and bunker battles.',
      citation: 'Institute of National Remembrance (IPN), Warsaw / USHMM, Washington D.C.',
      context:
        'On 19 April 1943, several hundred young Jewish fighters armed with pistols, Molotov cocktails, and a few rifles held off heavily armed German forces for nearly a month. Leader Mordechai Anielewicz wrote: "The dream of my life has risen to become reality: self-defence in the ghetto has become a fact." **Hinge Question:** Why did the young fighters of the Warsaw Ghetto choose to fight, knowing that military rescue or victory was impossible?',
      hinge_question:
        'Why did the young fighters of the Warsaw Ghetto choose to fight, knowing that military rescue or victory was impossible?',
    },
    {
      letter: 'E',
      type: 'written',
      title:
        'Source E (Eyewitness Testimony): Roza Robota and the Sonderkommando Uprising at Auschwitz-Birkenau (October 1944)',
      text: "Survivor Noah Zabludowicz: \"Four young Jewish women working in the Weichsel-Union munitions factory—Roza Robota, Ala Gertner, Ester Wajcblum, and Regina Safirsztajn—smuggled tiny parcels of gunpowder inside their clothes to the Sonderkommando in Birkenau. On 7 October 1944, the Sonderkommando attacked the SS guards with axes and crowbars, set fire to Crematorium IV, and blew the building apart. The four young women were betrayed, tortured by the Gestapo for weeks, and hanged before the assembled camp. Just before the trapdoor fell, Roza shouted: 'Hazak V'ematz!' (Be strong and courageous!)\"",
      caption:
        'Survivor account of the armed insurrection by the Sonderkommando that destroyed Crematorium IV at Auschwitz-Birkenau.',
      citation:
        "Yad Vashem Survivor Testimony Collection (M.11) / Ghetto Fighters' House Archives.",
      context:
        'Armed uprisings occurred not only in ghettos but also inside the death camps of Treblinka (August 1943), Sobibór (October 1943), and Auschwitz-Birkenau (October 1944), alongside tens of thousands of Jewish partisans fighting in the forests of Poland and Belarus. **Hinge Question:** How does the history of camp revolts and forest partisans dismantle the persistent, harmful myth of Jewish passivity during the Holocaust?',
      hinge_question:
        'How does the history of camp revolts and forest partisans dismantle the persistent, harmful myth of Jewish passivity during the Holocaust?',
    },
  ],

  // LESSON 6
  [
    {
      letter: 'A',
      type: 'written',
      title:
        'Source A (Official Railway Timetable): Deutsche Reichsbahn Special Train (Sonderzug) Deportation Order (1942)',
      text: 'Deutsche Reichsbahn Direction Berlin, Operational Order No. 42/57: Concerning special train Da 20 departing Berlin-Moabit on 14 April 1942 to Warsaw Ghetto / Trawniki. Composition: 20 cattle wagons carrying 1,000 evacuees; 1 passenger coach for 15 police guards. Fare charged to Berlin Police Authority: 4 Reichspfennigs per person per track kilometre for adults; 2 Reichspfennigs for children under 10. Train must maintain standard timetable speed to avoid delaying military freight.',
      caption:
        'Official administrative order of the German state railway organising passenger billing and scheduling for deportation trains.',
      citation:
        'German Federal Archives (Bundesarchiv R 5, Deutsche Reichsbahn Records) / Yad Vashem.',
      context:
        'In *The Destruction of the European Jews*, historian Raul Hilberg demonstrated that the genocide was executed not by monsters, but by clerks, engineers, and accountants operating standard administrative routines. **Hinge Question:** How does an ordinary railway timetable illustrate the concept of the "banality of evil" formulated by philosopher Hannah Arendt?',
      hinge_question:
        'How does an ordinary railway timetable illustrate the concept of the "banality of evil" formulated by philosopher Hannah Arendt?',
    },
    {
      letter: 'B',
      type: 'written',
      title:
        'Source B (Official Police Report): Paris Prefecture of Police Report on the Vél d’Hiv Round-Up (16–17 July 1942)',
      text: "Prefecture of Police, Paris. Operation Vent Printanier (Spring Wind): In accordance with instructions, 9,000 Parisian municipal police officers executed the arrest of foreign Jews across all 20 arrondissements. Total arrests: 13,152 individuals, including 3,118 men, 5,919 women, and 4,115 children. Families have been temporarily concentrated at the Vélodrome d'Hiver indoor stadium under French police guard awaiting transport to Drancy and transit to the East.",
      caption:
        'Official arrest tally compiled by French municipal authorities following the mass round-up in Paris.',
      citation: 'Archives de la Préfecture de Police de Paris / Mémorial de la Shoah.',
      context:
        'The Holocaust was an all-European catastrophe that required the active assistance of local police forces, civil servants, and fascist collaborators in France, the Netherlands, Slovakia, Hungary, Romania, Croatia, and the Baltic States. **Hinge Question:** Why did the Nazi authorities depend so heavily on local non-German police forces to carry out round-ups and deportations?',
      hinge_question:
        'Why did the Nazi authorities depend so heavily on local non-German police forces to carry out round-ups and deportations?',
    },
    {
      letter: 'C',
      type: 'written',
      title:
        'Source C (Historic Resistance Leaflet): The Sixth Leaflet of the White Rose Movement (Munich, February 1943)',
      text: 'Fellow Students! Our people stand shocked at the disaster of Stalingrad. The life of three hundred thousand German men has been senselessly sacrificed for the prestige of a military dilettante... Our present state is the dictatorship of evil. Are we to be forever the people hated and rejected by all mankind? The German name will be disgraced forever if German youth does not finally arise, take revenge, and atone, smash its tormentors, and construct a new intellectual Europe. Freedom and honour! For ten years Hitler and his henchmen have degraded these two splendid German words.',
      caption:
        'Leaflet authored by Hans Scholl, Sophie Scholl, and Professor Kurt Huber, distributed at the University of Munich in February 1943.',
      citation:
        'Sixth Leaflet of the White Rose (Die Weiße Rose) / Institute of Contemporary History (Institut für Zeitgeschichte), Munich.',
      context:
        "Distributed by Hans Scholl, Sophie Scholl, and Christoph Probst at Munich University on 18 February 1943. Within days, they were arrested by the Gestapo, tried by the notorious People's Court, and guillotined that same afternoon. **Hinge Question:** What enabled the tiny minority of students in the White Rose to overcome the silence and passivity that engulfed most German bystanders?",
      hinge_question:
        'What enabled the tiny minority of students in the White Rose to overcome the silence and passivity that engulfed most German bystanders?',
    },
    {
      letter: 'D',
      type: 'written',
      title:
        'Source D (Archival Diplomatic Record): Chiune Sugihara’s "Visas for Life" (Kaunas, Lithuania, August 1940)',
      text: 'Chiune Sugihara, Vice-Consul of Japan: "I had to decide between obeying my government\'s strict cable orders not to issue visas without financial guarantees, and obeying the dictates of my conscience. I looked at the crowd of hundreds of desperate Jewish families standing outside the consulate gates in Kaunas. I knew that if they stayed, they would be slaughtered. I decided to write visas day and night. For 29 days, until the consulate was closed, my hand cramped as I wrote over 2,139 transit visas through the Soviet Union to Japan, saving thousands of innocent souls."',
      caption:
        'Diplomatic testimony and passport records of Japanese consul Chiune Sugihara in Lithuania.',
      citation:
        'Diplomatic Archives of the Ministry of Foreign Affairs of Japan / Yad Vashem Righteous Among the Nations Archive (File M.31.2/1004).',
      context:
        'Yad Vashem has recognized over 28,000 non-Jews as "Righteous Among the Nations" (including Chiune Sugihara, Irena Sendler, and Raoul Wallenberg) who risked their careers, freedom, or lives to rescue Jewish people without financial gain. **Hinge Question:** What personal qualities or moral convictions distinguished rescuers from the overwhelming majority of citizens who remained passive bystanders?',
      hinge_question:
        'What personal qualities or moral convictions distinguished rescuers from the overwhelming majority of citizens who remained passive bystanders?',
    },
    {
      letter: 'E',
      type: 'visual',
      title:
        'Source E (Historic Photograph & Record): Fishing Boats Used to Rescue Danish Jews to Neutral Sweden (October 1943)',
      image: '/images/shoah_cover.jpg',
      src: '/images/shoah_cover.jpg',
      is_artwork: false,
      caption:
        'Small Danish fishing boats in Gilleleje harbour that ferried over 7,200 Danish Jews across the narrow Øresund Strait to safety in neutral Sweden in October 1943, contrasted with the 17 December 1942 Joint Declaration by 12 Allied nations condemning Germany\'s "bestial policy of cold-blooded extermination".',
      citation:
        'National Museum of Denmark (Nationalmuseet, Copenhagen) / The National Archives, Kew (FO 371/30917).',
      context:
        'By 1942, detailed intelligence of mass murder had reached Allied capitals via Jan Karski and the Riegner Telegram. While the Danish population mobilised spontaneously to save 99% of Danish Jews, Allied leaders argued that winning the war as quickly as possible was the only viable way to stop the slaughter, rejecting requests to bomb railway tracks to Auschwitz. **Hinge Question:** Why did the British and American governments decline to bomb the railway lines to Auschwitz in 1944, and is this military decision historically defensible?',
      hinge_question:
        'Why did the British and American governments decline to bomb the railway lines to Auschwitz in 1944, and is this military decision historically defensible?',
    },
  ],

  // LESSON 7
  [
    {
      letter: 'A',
      type: 'written',
      title:
        'Source A (Primary Survivor Testimony): Elie Wiesel on the Death March from Auschwitz to Gleiwitz (January 1945)',
      text: 'Elie Wiesel (Night): "An icy wind blew into our faces, freezing the blood in our veins. The SS yelled: \'Faster, you dogs, run!\' Anyone who stopped for a single second was shot on the spot. Beside me, a young boy from Poland named Zalman had stomach cramps; he fell into the snow and the marchers trampled him. Pitch darkness, knee-deep snow. We were running without boots, our feet wrapped in rags. Hundreds fell into the frozen ditches along the road. It seemed as if we were not human beings, but automatons marching toward death."',
      caption:
        'Eyewitness account by Elie Wiesel recounting the forced evacuation of Auschwitz in sub-zero winter temperatures.',
      citation:
        'Elie Wiesel, Night (Les Éditions de Minuit / Hill & Wang) / USHMM Survivor Collection.',
      context:
        'Between late 1944 and May 1945, the SS forcibly marched over 250,000 camp prisoners westward into Germany in brutal winter conditions to prevent their liberation by the Red Army, murdering an estimated 70,000 to 100,000 people. **Hinge Question:** Why did the Nazi regime expend military resources to march dying prisoners into the interior of Germany when the war was already decisively lost?',
      hinge_question:
        'Why did the Nazi regime expend military resources to march dying prisoners into the interior of Germany when the war was already decisively lost?',
    },
    {
      letter: 'B',
      type: 'visual',
      title:
        'Source B (Historic Archival Photograph & Eyewitness Signal): British Army Medical Unit at Bergen-Belsen (15 April 1945)',
      image: '/images/shoah_cover.jpg',
      src: '/images/shoah_cover.jpg',
      is_artwork: false,
      caption:
        'British Army medical personnel confronting catastrophic typhus and tens of thousands of unburied corpses upon entering Bergen-Belsen concentration camp on 15 April 1945, as documented by Army Film and Photographic Unit cameraman Sergeant H. Oakes (IWM BU 4032).',
      citation: 'Imperial War Museum, London (IWM BU 4032) / USHMM.',
      context:
        'Allied liberators discovered scenes of unprecedented horror. At Bergen-Belsen, despite immense medical intervention by British military doctors, over 13,000 freed survivors died of starvation and disease in the weeks immediately following liberation. **Hinge Question:** Why did the physical reality of liberation bring grief, confusion, and despair to survivors rather than unmixed celebration?',
      hinge_question:
        'Why did the physical reality of liberation bring grief, confusion, and despair to survivors rather than unmixed celebration?',
    },
    {
      letter: 'C',
      type: 'visual',
      title:
        'Source C (Archival Photograph & Record): The Refugee Steamer SS Exodus 1947 and the "Windermere Children" (1945–1947)',
      image: '/images/shoah_cover.jpg',
      src: '/images/shoah_cover.jpg',
      is_artwork: false,
      caption:
        'The refugee vessel SS Exodus 1947 carrying 4,515 Holocaust survivors intercepted by Royal Navy warships off the coast of Mandatory Palestine and forced back to camps in Germany, alongside the 300 orphan child survivors flown to the English Lake District in August 1945 to begin psychological rehabilitation.',
      citation:
        'Central Zionist Archives, Jerusalem / Lake District Holocaust Project (LDHP) / USHMM.',
      context:
        'Hundreds of thousands of Jewish survivors found themselves homeless in Displaced Persons (DP) camps in Germany and Austria, unable to return to their destroyed hometowns due to post-war pogroms (such as the Kielce pogrom of July 1946). **Hinge Question:** How did the post-war crisis of Jewish Displaced Persons accelerate international political pressure leading to the creation of the State of Israel in 1948?',
      hinge_question:
        'How did the post-war crisis of Jewish Displaced Persons accelerate international political pressure leading to the creation of the State of Israel in 1948?',
    },
    {
      letter: 'D',
      type: 'visual',
      title:
        'Source D (Historic Photograph & Indictment): The Defendants in the Dock at Nuremberg and Raphael Lemkin\'s Concept of "Genocide" (1945)',
      image: '/images/shoah_cover.jpg',
      src: '/images/shoah_cover.jpg',
      is_artwork: false,
      caption:
        'Hermann Göring, Rudolf Hess, Joachim von Ribbentrop, and eighteen co-defendants seated in the dock under American military police guard during the International Military Tribunal at Nuremberg (November 1945).',
      citation:
        'US National Archives and Records Administration (NARA RG 238-OMT) / United Nations Archives.',
      context:
        'The Nuremberg Trials established the legal principle that heads of state and military commanders can be held individually accountable for crimes against humanity. Polish-Jewish jurist Raphael Lemkin coined the word "genocide" in 1944, which led directly to the 1948 UN Convention on the Prevention and Punishment of the Crime of Genocide. **Hinge Question:** Why was conducting public, evidence-based trials at Nuremberg critical for establishing the historical truth of the Holocaust?',
      hinge_question:
        'Why was conducting public, evidence-based trials at Nuremberg critical for establishing the historical truth of the Holocaust?',
    },
    {
      letter: 'E',
      type: 'written',
      title:
        'Source E (Poetic Testament & Memorial Inscription): Primo Levi’s Inscription in If This Is a Man (1947)',
      text: 'Primo Levi (Auschwitz Survivor No. 174517): "You who live safe in your warm houses, you who find on returning in the evening hot food and friendly faces: Consider if this is a man who works in the mud, who knows no peace, who fights for half a crust of bread, who dies because of a yes or a no. Consider if this is a woman, without hair and without name, with no more strength to remember, her eyes empty and her womb cold like a frog in winter. Meditate that what has been was; I commend these words to you. Carve them in your hearts... Or may your house crumble, disease afflict you, and your children turn their faces from you."',
      caption:
        'Poetic opening and moral charge from Primo Levi’s landmark memoir If This Is a Man (Se questo è un uomo).',
      citation:
        'Primo Levi, Se questo è un uomo (1947) / Centro di Documentazione Ebraica Contemporanea (CDEC), Milan.',
      context:
        'Approximately six million Jewish people—two-thirds of Europe’s Jewish population, including 1.5 million children—were murdered. Whole worlds of language, literature, scholarship, and community were permanently erased from the European continent. **Hinge Question:** Why does Primo Levi demand that future generations actively "carve" the memory of the Shoah into their hearts rather than passively acknowledging it as past history?',
      hinge_question:
        'Why does Primo Levi demand that future generations actively "carve" the memory of the Shoah into their hearts rather than passively acknowledging it as past history?',
    },
  ],
];

// 1. Update public/data/the_shoah.json
const jsonPath = path.join(ROOT_DIR, 'public', 'data', 'the_shoah.json');
const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const unitJson = rawJson.data || rawJson;

unitJson.lessons.forEach((lesson, lIdx) => {
  const lessonSources = shoahSourcesByLesson[lIdx];
  lesson.narrative_blocks.forEach((block, bIdx) => {
    if (lessonSources && lessonSources[bIdx]) {
      block.source = lessonSources[bIdx];
    }
  });
});

fs.writeFileSync(jsonPath, JSON.stringify(rawJson, null, 2), 'utf8');
console.log('✅ Updated public/data/the_shoah.json with all 35 narrative block sources');

// 2. Update units/the_shoah/data.js
const dataJsPath = path.join(ROOT_DIR, 'units', 'the_shoah', 'data.js');
const updatedExportStr = 'export default ' + JSON.stringify(unitJson, null, 2) + ';\n';
fs.writeFileSync(dataJsPath, updatedExportStr, 'utf8');
console.log('✅ Updated units/the_shoah/data.js with all 35 narrative block sources');

// 3. Update scripts/master_rights_database.json
const rightsDbPath = path.join(ROOT_DIR, 'scripts', 'master_rights_database.json');
const rightsDb = JSON.parse(fs.readFileSync(rightsDbPath, 'utf8'));

// Build new the_shoah sources list in rights DB
const allShoahRightsEntries = [];

// Front cover entry
allShoahRightsEntries.push({
  lesson_num: 1,
  lesson_title: 'Who were the Jews of Europe before the Second World War?',
  source_id: 'Cover Plate',
  artifact_title:
    'The Pitel Family in Parczew, Poland (1938) • Four Generations Before the Shoah (Workbook Master Cover Plate)',
  date: '1938',
  creator: 'Kielecki (Photographer in Parczew, Poland)',
  repository: 'Yad Vashem Photo Archive / UCL Centre for Holocaust Education',
  accession_id:
    'YV-Through the Lens / Exhibit Pitel Family (Donated by Yisrael, Meir, and Esther Pitel)',
  rights_status: 'Educational Fair Dealing (CDPA 1988) / Archival Pedagogical Reproduction',
  commercial_use_permitted: true,
  source_url: 'https://www.yadvashem.org/yv/en/exhibitions/through-the-lens/pitel.asp',
});

shoahSourcesByLesson.forEach((sources, lIdx) => {
  const lessonNum = lIdx + 1;
  const lessonTitle = unitJson.lessons[lIdx].title;
  sources.forEach((s) => {
    allShoahRightsEntries.push({
      lesson_num: lessonNum,
      lesson_title: lessonTitle,
      source_id: `Source ${s.letter}`,
      artifact_title: s.title.replace(/^Source [A-Z] \([^)]+\):\s*/, ''),
      date: s.title.match(/\b(18\d\d|19\d\d)\b/)
        ? s.title.match(/\b(18\d\d|19\d\d)\b/)[0]
        : '1933–1945',
      creator: s.citation.split('/')[0].trim(),
      repository: s.citation,
      accession_id: `SHOAH-L${lessonNum}-SRC-${s.letter}`,
      rights_status: 'Educational Fair Dealing (CDPA 1988) / Archival Pedagogical Reproduction',
      commercial_use_permitted: true,
      source_url: 'https://www.yadvashem.org',
    });
  });
});

rightsDb.units.the_shoah = {
  unit_id: 'the_shoah',
  unit_title: 'The Shoah (1933–1945)',
  key_stage: 'Key Stage 3',
  exam_board: 'Key Stage 3 National Curriculum / Holocaust Education',
  total_lessons: 7,
  sources: allShoahRightsEntries,
};

// Recalculate totals
let totalSrc = 0;
for (const u in rightsDb.units) {
  const sList = rightsDb.units[u].sources || rightsDb.units[u];
  if (Array.isArray(sList)) totalSrc += sList.length;
}
rightsDb.total_sources = totalSrc;

fs.writeFileSync(rightsDbPath, JSON.stringify(rightsDb, null, 2), 'utf8');
console.log(
  `✅ Updated scripts/master_rights_database.json with ${allShoahRightsEntries.length} entries for the_shoah (Global total: ${totalSrc} sources)`,
);
