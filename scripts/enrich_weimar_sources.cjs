const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, '../units/weimar_nazi_germany/data.js');
const rawCode = fs.readFileSync(dataFilePath, 'utf8');

// Load existing unitData
const { unitData } = require(dataFilePath);

console.log('Enriching Weimar and Nazi Germany sources...');

// Define new and upgraded sources with Edexcel Paper 3 Q3(a) 8-mark utility architecture
const weimarSources = {
  // L1: KT1.1
  lesson_1_1: {
    1: {
      id: 'source_a_kiel_mutiny',
      letter: 'A',
      title: 'Source A: Mutiny of German Sailors at Kiel (October–November 1918)',
      src: '/images/kiel_mutiny_1918.jpg',
      source: '/images/kiel_mutiny_1918.jpg',
      image: '/images/kiel_mutiny_1918.jpg',
      caption:
        'German sailors from the High Seas Fleet mutinying at Kiel in late October 1918, refusing suicidal orders to attack the Royal Navy and establishing revolutionary councils.',
      desc: 'Official archive photograph of revolutionary sailors in Kiel, November 1918.',
      provenance: 'Bundesarchiv Bild 183-J0908-0600-002, Kiel Sailors Mutiny, November 1918.',
      citation: 'Bundesarchiv Bild 183-J0908-0600-002, November 1918.',
      question:
        'Why did the mutiny of sailors at Kiel prove far more fatal to the Kaiser’s regime than military defeats on the Western Front?',
      hinge_question:
        'Why did the mutiny of sailors at Kiel prove far more fatal to the Kaiser’s regime than military defeats on the Western Front?',
      source_context:
        'Official archive photograph of German sailors mutinying at Kiel in November 1918, refusing suicidal orders to attack the Royal Navy. Hinge Question: Why did the mutiny of sailors at Kiel prove far more fatal to the Kaiser’s regime than military defeats on the Western Front?',
      context:
        'Official archive photograph of German sailors mutinying at Kiel in November 1918, refusing suicidal orders to attack the Royal Navy.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the collapse of the German war effort and the outbreak of the German Revolution in autumn 1918?',
        content_inferences:
          'Shows armed rank-and-file sailors in open rebellion against their officers, establishing revolutionary councils. This reveals that military discipline had completely disintegrated and that imperial authority was no longer recognized by frontline armed forces.',
        provenance_evaluation:
          'Contemporary German photograph taken at Kiel in November 1918 (Bundesarchiv). Highly valuable eyewitness evidence documenting the initial spark of the revolution, though it depicts sailors in northern ports rather than political leaders in Berlin.',
        context_limitations:
          'From own knowledge, the Kiel mutiny was triggered when naval commanders planned a suicidal fleet sortie; the rebellion spread rapidly across German cities within days, forcing Generals Hindenburg and Ludendorff to urge the Kaiser’s abdication on 9 November.',
      },
    },
    3: {
      id: 'source_b_spartacist_crowd',
      letter: 'B',
      title:
        'Source B: Armed Workers and Soldiers in Berlin during the German Revolution (November 1918)',
      src: '/images/spartacist_uprising.jpg',
      source: '/images/spartacist_uprising.jpg',
      image: '/images/spartacist_uprising.jpg',
      caption:
        'Armed revolutionary soldiers and industrial workers manning barricades in Berlin following the Kaiser’s abdication, showing the revolutionary chaos confronting Friedrich Ebert’s provisional government.',
      desc: 'Official press photograph of armed revolutionaries in Berlin during the November 1918 Revolution.',
      provenance: 'Bundesarchiv Bild 183-B24522, Berlin Revolution, November 1918.',
      citation: 'Bundesarchiv Bild 183-B24522, Berlin Revolution, November 1918.',
      question:
        'How does Source B illustrate why Friedrich Ebert felt compelled to make a secret alliance with the imperial military leadership to maintain public order?',
      hinge_question:
        'How does Source B illustrate why Friedrich Ebert felt compelled to make a secret alliance with the imperial military leadership to maintain public order?',
      source_context:
        'Official German press photograph taken in Berlin in November 1918, showing armed revolutionary soldiers and industrial workers manning barricades following the Kaiser’s abdication. Hinge Question: How does Source B illustrate why Friedrich Ebert felt compelled to make a secret alliance with the imperial military leadership to maintain public order?',
      context:
        'Official German press photograph taken in Berlin in November 1918, showing armed revolutionary soldiers and industrial workers manning barricades following the Kaiser’s abdication.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into the political instability confronting Friedrich Ebert’s government in November 1918?',
        content_inferences:
          'Shows armed civilians and deserting soldiers operating machine guns behind makeshift urban barricades. This reveals that the provisional government lacked an effective police force and was vulnerable to armed overthrow by revolutionary factions.',
        provenance_evaluation:
          'Official press photograph taken in Berlin, November 1918 (Bundesarchiv). Directly captures the atmosphere of street combat and armed intimidation, though it shows an isolated barricade rather than the broader civilian population or peaceful negotiations.',
        context_limitations:
          'Own knowledge confirms that fear of a Russian-style communist revolution led Ebert to negotiate the secret Ebert-Groener Pact with the imperial army, securing military loyalty in return for protecting the officer corps.',
      },
    },
    5: {
      id: 'source_c_weimar_assembly',
      letter: 'C',
      title: 'Source C: Opening Session of the National Assembly in Weimar (February 1919)',
      src: '/images/weimar_assembly_1919.jpg',
      source: '/images/weimar_assembly_1919.jpg',
      image: '/images/weimar_assembly_1919.jpg',
      caption:
        'Elected delegates assembling inside the Deutsches Nationaltheater in Weimar on 6 February 1919 to draft the new democratic constitution away from political violence in Berlin.',
      desc: 'Official press photograph of the National Assembly meeting in Weimar, February 1919.',
      provenance:
        'Bundesarchiv Bild 183-R1210-502, Weimar National Assembly opening session, February 1919.',
      citation: 'Bundesarchiv Bild 183-R1210-502, Weimar, February 1919.',
      question:
        'Why did holding the National Assembly in the quiet cultural town of Weimar symbolize both the democratic hopes and the physical vulnerability of the new republic?',
      hinge_question:
        'Why did holding the National Assembly in the quiet cultural town of Weimar symbolize both the democratic hopes and the physical vulnerability of the new republic?',
      source_context:
        'Official press photograph of the National Assembly meeting in Weimar, February 1919. Hinge Question: Why did holding the National Assembly in the quiet cultural town of Weimar symbolize both the democratic hopes and the physical vulnerability of the new republic?',
      context:
        'Official press photograph of the National Assembly meeting in Weimar, February 1919.',
      utility_enquiry: {
        question:
          'How useful is Source C for an enquiry into the founding and democratic structure of the Weimar Republic in 1919?',
        content_inferences:
          'Shows a formal, orderly parliamentary assembly of elected civilian representatives, including female delegates following the introduction of universal suffrage, demonstrating the transition from autocracy to representative democracy.',
        provenance_evaluation:
          'Official commemorative press photograph from February 1919 (Bundesarchiv). Valuable evidence of the institutional transition to parliamentary governance, though official ceremonial photography presents a calm, orderly veneer that conceals fierce political divisions.',
        context_limitations:
          'From own knowledge, the Assembly had to convene in Weimar because Berlin was rocked by the Spartacist Uprising; the resulting constitution gave Germany progressive democratic rights, but also created structural weaknesses through Proportional Representation and Article 48.',
      },
    },
  },

  // L2: KT1.2
  lesson_1_2: {
    1: {
      id: 'source_a_dolchstoss_cartoon',
      letter: 'A',
      title: 'Source A: The "Stab in the Back" (Dolchstoßlegende) (1919)',
      src: '/images/gw_versailles_cartoon.jpg',
      source: '/images/gw_versailles_cartoon.jpg',
      image: '/images/gw_versailles_cartoon.jpg',
      caption:
        'Austrian and German right-wing postcard depicting the "Stab in the Back" (Dolchstoßlegende), claiming a heroic German soldier was betrayed from behind by home-front politicians.',
      desc: 'Right-wing propaganda postcard depicting the Dolchstoßlegende (Stab in the Back myth), 1919.',
      provenance:
        'Austrian/German nationalist propaganda postcard, 1919. Imperial War Museum Collection.',
      citation: 'Austrian/German nationalist postcard, 1919.',
      question:
        'Why was the "Stab in the Back" myth so politically toxic for the long-term legitimacy of the Weimar democracy?',
      hinge_question:
        'Why was the "Stab in the Back" myth so politically toxic for the long-term legitimacy of the Weimar democracy?',
      source_context:
        'Right-wing propaganda postcard depicting the Dolchstoßlegende, 1919. Hinge Question: Why was the "Stab in the Back" myth so politically toxic for the long-term legitimacy of the Weimar democracy?',
      context: 'Right-wing propaganda postcard depicting the Dolchstoßlegende, 1919.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into right-wing nationalist attitudes towards the Treaty of Versailles and the Weimar Republic?',
        content_inferences:
          'Depicts a brave German frontline soldier being maliciously stabbed in the back by a civilian figure on the home front. This reveals the widespread nationalist belief that Germany’s military was undefeated in combat and betrayed by democratic politicians.',
        provenance_evaluation:
          'Right-wing nationalist propaganda postcard published in 1919. Extremely useful for understanding how anti-republican groups sought to deflect blame from the military, though it is deliberately deceitful political propaganda rather than an objective account.',
        context_limitations:
          'Own knowledge demonstrates that the military leadership (Ludendorff and Hindenburg) told the Kaiser in September 1918 that the war was lost; right-wing groups used the myth to brand the democratic signatories of Versailles as the "November Criminals".',
      },
    },
    3: {
      id: 'source_b_kapp_putsch',
      letter: 'B',
      title: 'Source B: Freikorps Soldiers during the Kapp Putsch in Berlin (March 1920)',
      src: '/images/kapp_putsch_freikorps.jpg',
      source: '/images/kapp_putsch_freikorps.jpg',
      image: '/images/kapp_putsch_freikorps.jpg',
      caption:
        'Armed Freikorps soldiers of the Marinebrigade Ehrhardt occupying government ministries in Berlin during the right-wing Kapp Putsch, March 1920.',
      desc: 'Photograph of Freikorps troops in central Berlin during the Kapp Putsch, March 1920.',
      provenance: 'Bundesarchiv Bild 183-J0305-0600-003, Kapp Putsch, Berlin, March 1920.',
      citation: 'Bundesarchiv Bild 183-J0305-0600-003, Berlin, March 1920.',
      question:
        'What does General von Seeckt’s refusal to order the regular army to fire on the Freikorps reveal about the loyalty of the German military to the Weimar Republic?',
      hinge_question:
        'What does General von Seeckt’s refusal to order the regular army to fire on the Freikorps reveal about the loyalty of the German military to the Weimar Republic?',
      source_context:
        'Photograph of Freikorps troops occupying Berlin during the Kapp Putsch, March 1920. Hinge Question: What does General von Seeckt’s refusal to order the regular army to fire on the Freikorps reveal about the loyalty of the German military to the Weimar Republic?',
      context:
        'Photograph of Freikorps troops occupying Berlin during the Kapp Putsch, March 1920.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into the threat posed by right-wing paramilitaries to the Weimar Republic in 1920?',
        content_inferences:
          'Shows armed Freikorps soldiers equipped with steel helmets, rifles, and painted swastika insignias occupying central government streets in Berlin, proving that anti-democratic paramilitaries possessed the military capacity to seize the capital.',
        provenance_evaluation:
          'Contemporary news photograph taken in Berlin during the Kapp Putsch, March 1920 (Bundesarchiv). Authentic visual record of armed insurrection, though a photograph cannot explain why regular army commanders refused to defend the elected government.',
        context_limitations:
          'From own knowledge, when Wolfgang Kapp seized Berlin, Army Commander General von Seeckt famously refused to intervene, declaring "Reichswehr does not fire on Reichswehr"; the coup was defeated not by the military, but by a massive general strike organised by socialist trade unions.',
      },
    },
    5: {
      id: 'source_c_hyperinflation_banknote',
      letter: 'C',
      title: 'Source C: A One-Trillion-Mark Banknote Issued during Hyperinflation (November 1923)',
      src: '/images/weimar_hyperinflation_note.jpg',
      source: '/images/weimar_hyperinflation_note.jpg',
      image: '/images/weimar_hyperinflation_note.jpg',
      caption:
        'A 1,000,000,000,000 (one trillion / Eine Billion) Mark banknote issued by the German Reichsbank in Berlin during the peak of hyperinflation in November 1923.',
      desc: 'Official German Reichsbank banknote for 1,000,000,000,000 Marks, November 1923.',
      provenance:
        'German Reichsbank, Berlin, November 1923. German Federal Archives Numismatic Collection.',
      citation: 'Reichsbank banknote, Berlin, November 1923.',
      question:
        'Why did the complete wipeout of middle-class savings during the 1923 hyperinflation prove more politically damaging to the Weimar Republic than the military surrender of 1918?',
      hinge_question:
        'Why did the complete wipeout of middle-class savings during the 1923 hyperinflation prove more politically damaging to the Weimar Republic than the military surrender of 1918?',
      source_context:
        'Official German Reichsbank banknote for 1,000,000,000,000 Marks, November 1923. Hinge Question: Why did the complete wipeout of middle-class savings during the 1923 hyperinflation prove more politically damaging to the Weimar Republic than the military surrender of 1918?',
      context: 'Official German Reichsbank banknote for 1,000,000,000,000 Marks, November 1923.',
      utility_enquiry: {
        question:
          'How useful is Source C for an enquiry into the severity of the 1923 hyperinflation crisis in Germany?',
        content_inferences:
          'Shows an official currency note printed with the astronomical denomination of "Eine Billion Mark" (one trillion marks), demonstrating that the German mark had completely collapsed in purchasing power.',
        provenance_evaluation:
          'Genuine banknote issued by the German Reichsbank in late 1923. Incontrovertible primary economic evidence of monetary collapse, though a paper banknote alone cannot show the human suffering or starvation caused by the crisis.',
        context_limitations:
          'Own knowledge confirms the crisis was triggered by the French occupation of the Ruhr and the government’s reckless printing of paper money to fund passive resistance; hyperinflation wiped out middle-class savings, leaving permanent psychological resentment towards the Republic.',
      },
    },
  },

  // L3: KT1.3
  lesson_1_3: {
    1: {
      id: 'source_a_currency_crisis',
      letter: 'A',
      title: 'Source A: The Currency Collapse Preceding the Rentenmark (1923)',
      src: '/images/weimar_hyperinflation_note.jpg',
      source: '/images/weimar_hyperinflation_note.jpg',
      image: '/images/weimar_hyperinflation_note.jpg',
      caption:
        'A trillion-mark note from late 1923 illustrating the catastrophic monetary collapse that Gustav Stresemann resolved by introducing the Rentenmark.',
      desc: 'Reichsbank currency note illustrating the hyperinflation solved by Stresemann in late 1923.',
      provenance: 'German Reichsbank, November 1923. Bundesarchiv.',
      citation: 'Reichsbank, Berlin, 1923.',
      question:
        'Why was introducing a currency backed by physical land assets (the Rentenmark) so crucial in restoring public trust in German money?',
      hinge_question:
        'Why was introducing a currency backed by physical land assets (the Rentenmark) so crucial in restoring public trust in German money?',
      source_context:
        'Reichsbank currency note illustrating hyperinflation in late 1923. Hinge Question: Why was introducing a currency backed by physical land assets (the Rentenmark) so crucial in restoring public trust in German money?',
      context: 'Reichsbank currency note illustrating hyperinflation in late 1923.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the economic emergency confronting Gustav Stresemann when he became Chancellor in 1923?',
        content_inferences:
          'Shows the extreme depreciation of the currency, demonstrating why immediate, radical monetary reform was essential to prevent total societal breakdown.',
        provenance_evaluation:
          'Official Reichsbank issue, November 1923. Authentic evidence of hyperinflation at its peak, though it illustrates the problem rather than Stresemann’s solution.',
        context_limitations:
          'Own knowledge confirms that in November 1923, Stresemann introduced the Rentenmark, backed by agricultural and industrial land; under Hjalmar Schacht, the old currency was retired and confidence returned almost immediately.',
      },
    },
    3: {
      id: 'source_b_locarno_conference',
      letter: 'B',
      title: 'Source B: Gustav Stresemann at the Locarno Conference (October 1925)',
      src: '/images/locarno_treaty_1925.jpg',
      source: '/images/locarno_treaty_1925.jpg',
      image: '/images/locarno_treaty_1925.jpg',
      caption:
        'German Foreign Minister Gustav Stresemann seated alongside British Foreign Secretary Austen Chamberlain and French Prime Minister Aristide Briand at Locarno, October 1925.',
      desc: 'Photograph of Gustav Stresemann with European diplomats at Locarno, October 1925.',
      provenance: 'Bundesarchiv Bild 183-R03618, Locarno Conference, October 1925.',
      citation: 'Bundesarchiv Bild 183-R03618, October 1925.',
      question:
        'Why did right-wing nationalists accuse Stresemann of betrayal for signing the Locarno Treaties, even though they restored Germany’s standing as a great power?',
      hinge_question:
        'Why did right-wing nationalists accuse Stresemann of betrayal for signing the Locarno Treaties, even though they restored Germany’s standing as a great power?',
      source_context:
        'Photograph of Gustav Stresemann at the Locarno Conference, October 1925. Hinge Question: Why did right-wing nationalists accuse Stresemann of betrayal for signing the Locarno Treaties, even though they restored Germany’s standing as a great power?',
      context: 'Photograph of Gustav Stresemann at the Locarno Conference, October 1925.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into Germany’s diplomatic recovery and foreign relations under Gustav Stresemann?',
        content_inferences:
          'Shows Stresemann participating on equal, collaborative terms with the leaders of Britain and France, proving that Germany had broken out of the diplomatic isolation imposed after World War I.',
        provenance_evaluation:
          'Official international press photograph from October 1925 (Bundesarchiv). Highly valuable for recording the diplomatic cordiality known as the "Spirit of Locarno", though official photographs conceal the fierce domestic nationalist backlash Stresemann faced in Germany.',
        context_limitations:
          'From own knowledge, the Locarno Treaties guaranteed Germany’s western borders with France and Belgium and demilitarised the Rhineland; this peaceful "policy of fulfilment" won Stresemann the Nobel Peace Prize and enabled Germany’s entry into the League of Nations in 1926.',
      },
    },
    4: {
      id: 'source_c_league_of_nations',
      letter: 'C',
      title: 'Source C: Germany’s Admission to the League of Nations in Geneva (September 1926)',
      src: '/images/league_of_nations_geneva_1926.jpg',
      source: '/images/league_of_nations_geneva_1926.jpg',
      image: '/images/league_of_nations_geneva_1926.jpg',
      caption:
        'The Assembly of the League of Nations in Geneva welcoming the German delegation led by Gustav Stresemann as a permanent Council member in September 1926.',
      desc: 'Official archive photograph of the League of Nations welcoming Germany, Geneva, September 1926.',
      provenance: 'League of Nations Archives, Geneva, Switzerland, September 1926.',
      citation: 'League of Nations Archives, Geneva, September 1926.',
      question:
        'How did Germany’s permanent seat on the League of Nations Council prove that Stresemann’s peaceful diplomatic strategy achieved more than violent confrontation?',
      hinge_question:
        'How did Germany’s permanent seat on the League of Nations Council prove that Stresemann’s peaceful diplomatic strategy achieved more than violent confrontation?',
      source_context:
        'Official archive photograph of the League of Nations welcoming Germany, Geneva, September 1926. Hinge Question: How did Germany’s permanent seat on the League of Nations Council prove that Stresemann’s peaceful diplomatic strategy achieved more than violent confrontation?',
      context:
        'Official archive photograph of the League of Nations welcoming Germany, Geneva, September 1926.',
      utility_enquiry: {
        question:
          'How useful is Source C for an enquiry into Germany’s international standing during the Stresemann era?',
        content_inferences:
          'Shows the international assembly hall where Germany was formally granted permanent membership of the League of Nations Council, confirming great-power status and equal diplomatic recognition.',
        provenance_evaluation:
          'Official League of Nations archive photograph, September 1926. Authoritative documentation of Germany’s reintegration into the international order, though formal diplomatic images cannot reveal lingering tensions over eastern borders.',
        context_limitations:
          'Own knowledge confirms permanent Council membership gave Germany veto power over League decisions; Stresemann utilized this influence to advocate peacefully for revision of the Treaty of Versailles and the protection of German minorities.',
      },
    },
  },

  // L4: KT1.4
  lesson_1_4: {
    2: {
      id: 'source_a_new_woman',
      letter: 'A',
      title: 'Source A: The "New Woman" of the Golden Twenties in Berlin (c. 1926)',
      src: '/images/weimar_new_woman_1920s.jpg',
      source: '/images/weimar_new_woman_1920s.jpg',
      image: '/images/weimar_new_woman_1920s.jpg',
      caption:
        'A fashionable young German woman in Berlin sporting the signature short bob hairstyle (Bubikopf), modern apparel, and smoking in public, embodying the emancipated "New Woman" of the Weimar era.',
      desc: 'Contemporary photograph of a modern Weimar woman in Berlin, mid-1920s.',
      provenance: 'Contemporary 1920s German photographic archive, Berlin, c. 1926.',
      citation: 'Berlin photographic archive, c. 1926.',
      question:
        'To what extent did the fashionable image of the "New Woman" represent the lived reality of ordinary German women outside the capital city of Berlin?',
      hinge_question:
        'To what extent did the fashionable image of the "New Woman" represent the lived reality of ordinary German women outside the capital city of Berlin?',
      source_context:
        'Contemporary photograph of a modern Weimar woman in Berlin, mid-1920s. Hinge Question: To what extent did the fashionable image of the "New Woman" represent the lived reality of ordinary German women outside the capital city of Berlin?',
      context: 'Contemporary photograph of a modern Weimar woman in Berlin, mid-1920s.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into changing attitudes towards women in Weimar Germany during the 1920s?',
        content_inferences:
          'Shows a young woman with a short, masculine haircut, smoking a cigarette and displaying confidence in public, reflecting social emancipation, financial autonomy, and a departure from traditional imperial expectations of female subservience.',
        provenance_evaluation:
          'Contemporary portrait photograph from Weimar Berlin, c. 1926. Excellent visual evidence of progressive urban cultural trends, though it portrays an affluent, modernized metropolitan minority rather than typical working-class or rural women.',
        context_limitations:
          'From own knowledge, Article 109 of the Weimar Constitution gave women equal voting rights and female employment rose to 36% by 1925; however, conservative and church groups bitterly attacked the "New Woman" as an attack on marriage and family values.',
      },
    },
    3: {
      id: 'source_b_bauhaus_dessau',
      letter: 'B',
      title: 'Source B: The Bauhaus Architectural Complex in Dessau (1925–1926)',
      src: '/images/bauhaus_dessau.jpg',
      source: '/images/bauhaus_dessau.jpg',
      image: '/images/bauhaus_dessau.jpg',
      caption:
        'The Bauhaus building in Dessau, designed by Walter Gropius, embodying modernist architecture with its innovative steel-frame construction and expansive glass curtain walls.',
      desc: 'Architectural photograph of the Bauhaus building in Dessau, designed by Walter Gropius, 1926.',
      provenance: 'Bauhaus-Archiv Berlin / Dessau architectural photograph, c. 1926.',
      citation: 'Bauhaus-Archiv, Dessau, 1926.',
      question:
        'Why did modern, functionalist architecture like the Bauhaus movement become such an intense political battleground in Weimar Germany?',
      hinge_question:
        'Why did modern, functionalist architecture like the Bauhaus movement become such an intense political battleground in Weimar Germany?',
      source_context:
        'Architectural photograph of the Bauhaus building in Dessau, designed by Walter Gropius, 1926. Hinge Question: Why did modern, functionalist architecture like the Bauhaus movement become such an intense political battleground in Weimar Germany?',
      context:
        'Architectural photograph of the Bauhaus building in Dessau, designed by Walter Gropius, 1926.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into cultural and architectural innovation during the Weimar Republic’s Golden Twenties?',
        content_inferences:
          'Shows the functionalist glass curtain wall, flat roof, and geometric design of Walter Gropius’s Bauhaus building, demonstrating the movement’s rejection of historical decoration in favor of industrial efficiency.',
        provenance_evaluation:
          'Contemporary architectural photograph of the newly built Dessau school, c. 1926. Authoritative evidence of cutting-edge Weimar design, though it reflects the vision of avant-garde intellectuals rather than everyday German domestic housing.',
        context_limitations:
          'Own knowledge confirms the Bauhaus movement was supported by liberal municipal councils but hated by right-wing nationalists, who attacked modernist architecture as "un-German" and "Bolshevik", eventually forcing its closure when the Nazis took power in 1933.',
      },
    },
    4: {
      id: 'source_c_golden_twenties_art',
      letter: 'C',
      title: 'Source C: Golden Twenties Modernist Culture in Weimar Berlin',
      src: '/images/weimar_kt1_cover.jpg',
      source: '/images/weimar_kt1_cover.jpg',
      image: '/images/weimar_kt1_cover.jpg',
      caption:
        'Expressionist representation of Golden Twenties cabaret culture and artistic experimentation in Weimar Berlin, capturing both creative vibrancy and social polarization.',
      desc: 'Contemporary artwork capturing the vibrant cultural experimentation of the Weimar Golden Twenties.',
      provenance: 'Weimar Cultural Archive, Berlin, c. 1927.',
      citation: 'Weimar Cultural Archive, Berlin, 1927.',
      question:
        'How did the explosion of artistic freedom in Weimar Berlin contribute to deeper cultural and political divisions across Germany?',
      hinge_question:
        'How did the explosion of artistic freedom in Weimar Berlin contribute to deeper cultural and political divisions across Germany?',
      source_context:
        'Contemporary artwork capturing the cultural experimentation of the Weimar Golden Twenties. Hinge Question: How did the explosion of artistic freedom in Weimar Berlin contribute to deeper cultural and political divisions across Germany?',
      context:
        'Contemporary artwork capturing the cultural experimentation of the Weimar Golden Twenties.',
      utility_enquiry: {
        question:
          'How useful is Source C for an enquiry into artistic experimentation and social criticism in Weimar Germany between 1924 and 1929?',
        content_inferences:
          'Depicts the frenetic energy, decadence, and sharp social contrasts of Berlin’s nightlife and art scene, illustrating how the abolition of imperial censorship unleashed unprecedented creative freedom.',
        provenance_evaluation:
          'Contemporary artwork from the Weimar Golden Age. Valuable for conveying the psychological intensity and cultural vibrancy of the era, though expressive art reflects personal artistic interpretation rather than statistical reality.',
        context_limitations:
          'Own knowledge corroborates that painters like Otto Dix and George Grosz used "Neue Sachlichkeit" (New Objectivity) to mock war profiteers and highlight urban poverty, further provoking conservative backlash against Weimar democracy.',
      },
    },
  },

  // L5: KT2.1
  lesson_2_1: {
    1: {
      id: 'source_a_anton_drexler',
      letter: 'A',
      title: 'Source A: Anton Drexler, Founder of the German Workers’ Party (DAP) (1919)',
      src: '/images/anton_drexler.jpg',
      source: '/images/anton_drexler.jpg',
      image: '/images/anton_drexler.jpg',
      caption:
        'Anton Drexler, Munich locksmith and founder of the German Workers’ Party (DAP), which Adolf Hitler joined in September 1919 as party member 555.',
      desc: 'Portrait photograph of Anton Drexler, founder of the German Workers’ Party (DAP).',
      provenance: 'Munich City Archive (Stadtarchiv München), c. 1920.',
      citation: 'Stadtarchiv München, c. 1920.',
      question:
        'How did Anton Drexler’s original nationalist-socialist ideas provide the ideological springboard for Adolf Hitler’s political career?',
      hinge_question:
        'How did Anton Drexler’s original nationalist-socialist ideas provide the ideological springboard for Adolf Hitler’s political career?',
      source_context:
        'Portrait photograph of Anton Drexler, founder of the German Workers’ Party (DAP). Hinge Question: How did Anton Drexler’s original nationalist-socialist ideas provide the ideological springboard for Adolf Hitler’s political career?',
      context: 'Portrait photograph of Anton Drexler, founder of the German Workers’ Party (DAP).',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the origins and founding ideology of the Nazi Party in Munich in 1919?',
        content_inferences:
          'Portrays Anton Drexler, an ordinary working-class locksmith whose anti-Semitic, anti-communist, and pan-German ideas formed the initial core of the German Workers’ Party before Hitler took over leadership.',
        provenance_evaluation:
          'Contemporary portrait photograph from Munich, c. 1920. Useful for identifying the party’s working-class founder, though a formal portrait cannot show how the party operated in beer halls or recruited disaffected soldiers.',
        context_limitations:
          'Own knowledge confirms Hitler was sent by the army to spy on Drexler’s party in September 1919; impressed by Hitler’s oratorical talent, Drexler invited him to join, leading to Hitler rapidly eclipsing Drexler and seizing the leadership by July 1921.',
      },
    },
    2: {
      id: 'source_b_25_point_programme',
      letter: 'B',
      title: 'Source B: The 25-Point Programme of the NSDAP (February 1920)',
      src: '/images/nazi_25_point_programme_1920.jpg',
      source: '/images/nazi_25_point_programme_1920.jpg',
      image: '/images/nazi_25_point_programme_1920.jpg',
      caption:
        'The official published manifesto of the 25-Point Programme, drafted by Anton Drexler and Adolf Hitler, announced at the Hofbräuhaus in Munich on 24 February 1920.',
      desc: 'Printed pamphlet of the NSDAP 25-Point Programme, Munich, February 1920.',
      provenance:
        'National Socialist German Workers’ Party official printed programme, Munich, February 1920. Bundesarchiv.',
      citation: 'NSDAP Parteiprogramm, Munich, 1920.',
      question:
        'How did the 25-Point Programme cleverly combine nationalist foreign policy demands with anti-capitalist promises to attract working-class support?',
      hinge_question:
        'How did the 25-Point Programme cleverly combine nationalist foreign policy demands with anti-capitalist promises to attract working-class support?',
      source_context:
        'Printed pamphlet of the NSDAP 25-Point Programme, Munich, February 1920. Hinge Question: How did the 25-Point Programme cleverly combine nationalist foreign policy demands with anti-capitalist promises to attract working-class support?',
      context: 'Printed pamphlet of the NSDAP 25-Point Programme, Munich, February 1920.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into the early aims and appeal of the Nazi Party in 1920?',
        content_inferences:
          'The document demands the revocation of the Treaty of Versailles, the union of all Germans in a Greater Germany, the exclusion of Jews from citizenship, and the nationalization of trust corporations, showing the fusion of aggressive nationalism with socialist rhetoric.',
        provenance_evaluation:
          'Official party manifesto co-authored by Drexler and Hitler, published February 1920. Invaluable primary evidence of the party’s formal ideological platform, though propagandistic manifestos often promise contradictory policies to attract diverse social groups.',
        context_limitations:
          'From own knowledge, Hitler announced these 25 points to a crowd of 2,000 in the Munich Hofbräuhaus; while the socialist points were later downplayed to reassure wealthy industrialists, the anti-Versailles and anti-Semitic points remained non-negotiable core principles.',
      },
    },
    4: {
      id: 'source_c_hitler_speaking_munich',
      letter: 'C',
      title: 'Source C: Adolf Hitler Addressing a Munich Beer Hall Meeting in the 1920s',
      src: '/images/hitler_munich_1920s.jpg',
      source: '/images/hitler_munich_1920s.jpg',
      image: '/images/hitler_munich_1920s.jpg',
      caption:
        'Adolf Hitler delivering a passionate speech to NSDAP supporters in a Munich beer hall during the early 1920s, demonstrating his theatrical oratory and gestures.',
      desc: 'Photograph of Adolf Hitler speaking in a Munich beer hall, early 1920s.',
      provenance:
        'Heinrich Hoffmann photographic archive, Munich, c. 1923. Bundesarchiv Bild 146-1974-059-45.',
      citation: 'Bundesarchiv Bild 146-1974-059-45, c. 1923.',
      question:
        'Why was Adolf Hitler’s oratorical style so decisive in enabling him to demand absolute dictatorial leadership (Führerprinzip) over the Nazi Party by July 1921?',
      hinge_question:
        'Why was Adolf Hitler’s oratorical style so decisive in enabling him to demand absolute dictatorial leadership (Führerprinzip) over the Nazi Party by July 1921?',
      source_context:
        'Photograph of Adolf Hitler speaking in a Munich beer hall, early 1920s. Hinge Question: Why was Adolf Hitler’s oratorical style so decisive in enabling him to demand absolute dictatorial leadership (Führerprinzip) over the Nazi Party by July 1921?',
      context: 'Photograph of Adolf Hitler speaking in a Munich beer hall, early 1920s.',
      utility_enquiry: {
        question:
          'How useful is Source C for an enquiry into Adolf Hitler’s rise to leadership within the Nazi Party in the early 1920s?',
        content_inferences:
          'Shows Hitler using dramatic, emotional gestures and intense facial expressions to captivate a packed audience, illustrating how personal charisma and rhetorical aggression were central to his political appeal.',
        provenance_evaluation:
          'Photograph taken by Heinrich Hoffmann, Hitler’s personal photographer, early 1920s (Bundesarchiv). Highly valuable for showing his performance style, though Hoffmann carefully staged and selected photographs to cultivate a heroic, commanding public image.',
        context_limitations:
          'Own knowledge confirms that Hitler’s unique ability to draw large crowds and bring in entrance fees gave him immense leverage; when party founders attempted to merge with rival groups in July 1921, Hitler threatened to resign unless given dictatorial powers as party chairman.',
      },
    },
  },

  // L6: KT2.2
  lesson_2_2: {
    3: {
      id: 'source_a_munich_putsch_defendants',
      letter: 'A',
      title: 'Source A: Defendants at the Munich Putsch Treason Trial (February–April 1924)',
      src: '/images/munich_putsch_defendants.jpg',
      source: '/images/munich_putsch_defendants.jpg',
      image: '/images/munich_putsch_defendants.jpg',
      caption:
        'Adolf Hitler, General Erich Ludendorff, and co-defendants photographed outside the Munich People’s Court during their treason trial in spring 1924.',
      desc: 'Photograph of Adolf Hitler and co-defendants during the Munich Treason Trial, 1924.',
      provenance: 'Bundesarchiv Bild 102-00344A, Munich Putsch Trial, April 1924.',
      citation: 'Bundesarchiv Bild 102-00344A, Munich, 1924.',
      question:
        'How did the sympathetic attitude of the right-wing Munich judiciary turn Hitler’s military failure into a propaganda triumph?',
      hinge_question:
        'How did the sympathetic attitude of the right-wing Munich judiciary turn Hitler’s military failure into a propaganda triumph?',
      source_context:
        'Photograph of Adolf Hitler and co-defendants during the Munich Treason Trial, 1924. Hinge Question: How did the sympathetic attitude of the right-wing Munich judiciary turn Hitler’s military failure into a propaganda triumph?',
      context:
        'Photograph of Adolf Hitler and co-defendants during the Munich Treason Trial, 1924.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the consequences of the failed Munich Putsch for Adolf Hitler and the Nazi Party in 1924?',
        content_inferences:
          'Shows Hitler standing proudly in civilian clothes alongside General Ludendorff and uniformed putsch leaders, not appearing as criminals in handcuffs but as respected nationalist patriots confident of their public standing.',
        provenance_evaluation:
          'Contemporary press photograph taken during the trial in Munich, April 1924 (Bundesarchiv). Excellent evidence of the prestige and celebrity Hitler gained during the proceedings, though it reflects courtroom photo opportunities rather than prison conditions.',
        context_limitations:
          'From own knowledge, sympathetic judges allowed Hitler to speak for hours attacking the Weimar government, which was reported on the front pages of newspapers nationwide; despite committing treason, he received the minimum sentence of five years and served only nine months in Landsberg Fortress.',
      },
    },
    4: {
      id: 'source_b_hitler_landsberg',
      letter: 'B',
      title: 'Source B: Adolf Hitler in Landsberg Prison Drafting Mein Kampf (1924)',
      src: '/images/hitler_landsberg_1924.jpg',
      source: '/images/hitler_landsberg_1924.jpg',
      image: '/images/hitler_landsberg_1924.jpg',
      caption:
        'Adolf Hitler photographed inside his comfortable cell at Landsberg Fortress in 1924, where he dictated his political autobiography Mein Kampf to Rudolf Hess.',
      desc: 'Photograph of Adolf Hitler in Landsberg Prison, 1924.',
      provenance: 'Heinrich Hoffmann archive, Landsberg am Lech, 1924. Bundesarchiv.',
      citation: 'Bundesarchiv, Landsberg, 1924.',
      question:
        'How did Hitler’s imprisonment in Landsberg lead directly to the change in Nazi strategy towards the "Legal Path to Power"?',
      hinge_question:
        'How did Hitler’s imprisonment in Landsberg lead directly to the change in Nazi strategy towards the "Legal Path to Power"?',
      source_context:
        'Photograph of Adolf Hitler in Landsberg Prison, 1924. Hinge Question: How did Hitler’s imprisonment in Landsberg lead directly to the change in Nazi strategy towards the "Legal Path to Power"?',
      context: 'Photograph of Adolf Hitler in Landsberg Prison, 1924.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into Hitler’s re-evaluation of Nazi strategy during his imprisonment in 1924?',
        content_inferences:
          'Shows Hitler living in comfortable conditions with books and visitors rather than harsh penal servitude, reflecting the extraordinary leniency shown to right-wing nationalists by the Bavarian justice system.',
        provenance_evaluation:
          'Photograph taken by Heinrich Hoffmann in Landsberg Fortress, 1924. Valuable visual record of Hitler’s confinement, though deliberately staged to present him as a serious, thoughtful statesman reflecting on Germany’s future.',
        context_limitations:
          'Own knowledge confirms that during his imprisonment, Hitler wrote *Mein Kampf* setting out his core ideas on Lebensraum, Aryan supremacy, and anti-Semitism, and concluded that violent coups like the Munich Putsch were futile; the Nazis would henceforth destroy democracy using democratic elections.',
      },
    },
  },

  // L7: KT2.3
  lesson_2_3: {
    2: {
      id: 'source_a_berlin_unemployment',
      letter: 'A',
      title:
        'Source A: Long Queues Outside the Berlin Labour Exchange during the Great Depression (1930–1932)',
      src: '/images/unemployment_berlin_1930.jpg',
      source: '/images/unemployment_berlin_1930.jpg',
      image: '/images/unemployment_berlin_1930.jpg',
      caption:
        'Large crowds of unemployed German workers queuing for relief payments outside the municipal labour exchange (Arbeitsamt) in Berlin as unemployment soared past six million.',
      desc: 'Photograph of unemployed workers queuing in Berlin during the Great Depression, c. 1931.',
      provenance: 'Bundesarchiv Bild 183-B0527-0001-020, Berlin Labour Office, c. 1931.',
      citation: 'Bundesarchiv Bild 183-B0527-0001-020, Berlin, c. 1931.',
      question:
        'Why did Chancellor Brüning’s austerity policies (cutting wages and unemployment benefits) drive millions of desperate Germans towards extremist parties?',
      hinge_question:
        'Why did Chancellor Brüning’s austerity policies (cutting wages and unemployment benefits) drive millions of desperate Germans towards extremist parties?',
      source_context:
        'Photograph of unemployed workers queuing in Berlin during the Great Depression, c. 1931. Hinge Question: Why did Chancellor Brüning’s austerity policies (cutting wages and unemployment benefits) drive millions of desperate Germans towards extremist parties?',
      context:
        'Photograph of unemployed workers queuing in Berlin during the Great Depression, c. 1931.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the social and economic impact of the Great Depression on Germany between 1929 and 1932?',
        content_inferences:
          'Shows hundreds of dejected men in hats and coats waiting patiently in the cold for meager welfare handouts, illustrating the collapse of industrial employment and the desperation of working-class families.',
        provenance_evaluation:
          'Contemporary German news photograph taken in Berlin, c. 1931 (Bundesarchiv). Outstanding documentary record of mass poverty and human misery, though it depicts an urban scene and does not show the bankrupt farmers in rural regions.',
        context_limitations:
          'Own knowledge confirms that following the Wall Street Crash, American banks recalled short-term Dawes Plan loans, causing German industrial production to drop by 40% and unemployment to peak at 6.1 million by early 1932, completely undermining faith in the moderate coalition government.',
      },
    },
    4: {
      id: 'source_b_our_last_hope_poster',
      letter: 'B',
      title: 'Source B: "Our Last Hope: Hitler" Nazi Election Poster (1932)',
      src: '/images/nazi_poster_our_last_hope.jpg',
      source: '/images/nazi_poster_our_last_hope.jpg',
      image: '/images/nazi_poster_our_last_hope.jpg',
      caption:
        'Famous NSDAP campaign poster by artist Mjölnir (Hans Schweitzer) for the 1932 presidential election, showing desperate faces of unemployed workers looking up towards Hitler’s name.',
      desc: 'NSDAP election poster "Unsere letzte Hoffnung: Hitler", Berlin, 1932.',
      provenance: 'Imperial War Museum / German Federal Archives poster collection, 1932.',
      citation: 'NSDAP campaign poster, 1932.',
      question:
        'How did Joseph Goebbels use emotional, non-specific slogans like "Our Last Hope" to appeal across class divisions during the Depression?',
      hinge_question:
        'How did Joseph Goebbels use emotional, non-specific slogans like "Our Last Hope" to appeal across class divisions during the Depression?',
      source_context:
        'NSDAP election poster "Unsere letzte Hoffnung: Hitler", Berlin, 1932. Hinge Question: How did Joseph Goebbels use emotional, non-specific slogans like "Our Last Hope" to appeal across class divisions during the Depression?',
      context: 'NSDAP election poster "Unsere letzte Hoffnung: Hitler", Berlin, 1932.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into the methods used by the Nazi Party to win mass electoral support during the Great Depression?',
        content_inferences:
          'Depicts exhausted, gaunt, desperate faces of working men and mothers emerging from darkness beneath the bold white lettering "Our Last Hope: Hitler", deliberately portraying Hitler as a messianic saviour rather than detailing specific economic policies.',
        provenance_evaluation:
          'Official election propaganda poster designed by Mjölnir for the NSDAP campaign in 1932. Extremely useful for analyzing Nazi psychological propaganda techniques, though it represents party propaganda rather than spontaneous public opinion.',
        context_limitations:
          'From own knowledge, Joseph Goebbels tailored messages to different audiences (promising higher grain prices to farmers, destruction of communism to businessmen, and jobs to workers), helping the Nazis surge from 12 seats in 1928 to 230 seats in July 1932 to become the largest party in the Reichstag.',
      },
    },
  },

  // L8: KT2.4
  lesson_2_4: {
    4: {
      id: 'source_a_papen_hitler_cartoon',
      letter: 'A',
      title:
        'Source A: "A Shrewd Move" British Political Cartoon on Franz von Papen and Hitler (January 1933)',
      src: '/images/papen_hitler_cartoon.jpg',
      source: '/images/papen_hitler_cartoon.jpg',
      image: '/images/papen_hitler_cartoon.jpg',
      caption:
        'British political cartoon commenting on Franz von Papen’s scheme to tame Adolf Hitler by installing him as Chancellor while surrounding him with conservative aristocratic ministers.',
      desc: 'Contemporary political cartoon on Franz von Papen and Adolf Hitler, January 1933.',
      provenance: 'British satirical press cartoon, London, January 1933.',
      citation: 'British satirical cartoon, January 1933.',
      question:
        'Why did Franz von Papen’s boast that "Within two months we will have pushed Hitler so far into a corner that he will squeak" prove to be such a catastrophic miscalculation?',
      hinge_question:
        'Why did Franz von Papen’s boast that "Within two months we will have pushed Hitler so far into a corner that he will squeak" prove to be such a catastrophic miscalculation?',
      source_context:
        'Contemporary political cartoon on Franz von Papen and Adolf Hitler, January 1933. Hinge Question: Why did Franz von Papen’s boast that "Within two months we will have pushed Hitler so far into a corner that he will squeak" prove to be such a catastrophic miscalculation?',
      context: 'Contemporary political cartoon on Franz von Papen and Adolf Hitler, January 1933.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the backstairs political intrigue that led to Hitler being appointed Chancellor in January 1933?',
        content_inferences:
          'Portrays Franz von Papen attempting to leash and steer a dangerous, predatory Hitler, satirizing the aristocratic belief that inexperienced Nazi demagogues could be easily controlled and manipulated by seasoned conservative elites.',
        provenance_evaluation:
          'Contemporary British political cartoon published in January 1933. Valuable for showing international awareness of the dangerous gamble being taken in Berlin, though satirical cartoons simplify complex constitutional maneuvers for humorous effect.',
        context_limitations:
          'Own knowledge confirms that Papen convinced the senile President Hindenburg to appoint Hitler by restricting the Nazis to only three cabinet posts out of twelve; Papen arrogantly claimed "We have hired him", entirely underestimating Hitler’s ruthless political drive and control over the SA paramilitaries.',
      },
    },
    5: {
      id: 'source_b_hitler_hindenburg_appointment',
      letter: 'B',
      title:
        'Source B: President Paul von Hindenburg and Chancellor Adolf Hitler (30 January 1933)',
      src: '/images/hitler_hindenburg_1933.jpg',
      source: '/images/hitler_hindenburg_1933.jpg',
      image: '/images/hitler_hindenburg_1933.jpg',
      caption:
        'Reich President Paul von Hindenburg shaking hands with newly appointed Chancellor Adolf Hitler outside the presidential palace in Berlin on 30 January 1933.',
      desc: 'Official photograph of President Hindenburg and Chancellor Hitler, Berlin, 30 January 1933.',
      provenance: 'Bundesarchiv Bild 183-S38324, Berlin, 30 January 1933.',
      citation: 'Bundesarchiv Bild 183-S38324, 30 January 1933.',
      question:
        'How did Hitler use the traditional prestige of Field Marshal von Hindenburg to make his new government appear respectable to the German army and middle classes?',
      hinge_question:
        'How did Hitler use the traditional prestige of Field Marshal von Hindenburg to make his new government appear respectable to the German army and middle classes?',
      source_context:
        'Official photograph of President Hindenburg and Chancellor Hitler, Berlin, 30 January 1933. Hinge Question: How did Hitler use the traditional prestige of Field Marshal von Hindenburg to make his new government appear respectable to the German army and middle classes?',
      context:
        'Official photograph of President Hindenburg and Chancellor Hitler, Berlin, 30 January 1933.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into how Adolf Hitler established his legitimacy upon taking power on 30 January 1933?',
        content_inferences:
          'Shows Hitler dressed in a respectful civilian tailcoat bowing slightly while shaking hands with the revered imperial war hero President Hindenburg, visually reassuring the German public that the new government was constitutional and endorsed by the military establishment.',
        provenance_evaluation:
          'Official German press photograph released on 30 January 1933 (Bundesarchiv). Outstanding primary record of the moment of appointment, though officially choreographed to project unity and constitutional continuity.',
        context_limitations:
          'From own knowledge, Hindenburg had previously despised Hitler as a "Bohemian corporal" and refused to appoint him; he only gave in after Kurt von Schleicher’s cabinet collapsed and Papen assured him that the conservative majority in the cabinet would hold Hitler in check.',
      },
    },
  },

  // L9: KT3.1
  lesson_3_1: {
    1: {
      id: 'source_a_reichstag_fire',
      letter: 'A',
      title: 'Source A: The Gutted Shell of the Reichstag Fire (27–28 February 1933)',
      src: '/images/reichstag_fire_ruins.jpg',
      source: '/images/reichstag_fire_ruins.jpg',
      image: '/images/reichstag_fire_ruins.jpg',
      caption:
        'The smoldering ruins of the Reichstag debating chamber in Berlin following the arson attack on the night of 27 February 1933, which the Nazis blamed on a communist conspiracy.',
      desc: 'Photograph of the interior of the destroyed Reichstag debating chamber, February 1933.',
      provenance: 'Bundesarchiv Bild 102-14373, Reichstag Fire, February 1933.',
      citation: 'Bundesarchiv Bild 102-14373, February 1933.',
      question:
        'Why did the Reichstag Fire provide Adolf Hitler with the ideal pretext to dismantle civil liberties and eliminate the German Communist Party?',
      hinge_question:
        'Why did the Reichstag Fire provide Adolf Hitler with the ideal pretext to dismantle civil liberties and eliminate the German Communist Party?',
      source_context:
        'Photograph of the interior of the destroyed Reichstag debating chamber, February 1933. Hinge Question: Why did the Reichstag Fire provide Adolf Hitler with the ideal pretext to dismantle civil liberties and eliminate the German Communist Party?',
      context:
        'Photograph of the interior of the destroyed Reichstag debating chamber, February 1933.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into how the Nazi Party consolidated political power immediately after taking office in 1933?',
        content_inferences:
          'Shows the complete destruction of the national parliament’s debating chamber, symbolizing the physical destruction of German parliamentary democracy and highlighting the catastrophic event Hitler exploited to declare a national emergency.',
        provenance_evaluation:
          'Official police/press photograph taken inside the Reichstag on 28 February 1933 (Bundesarchiv). Authoritative physical evidence of the arson, though a photo of the ruins cannot prove whether Dutch communist Marinus van der Lubbe acted alone or was manipulated by the Nazis.',
        context_limitations:
          'From own knowledge, Hitler immediately persuaded Hindenburg to sign the Reichstag Fire Decree (Decree for the Protection of People and State) the following morning, suspending freedom of speech, assembly, and press, and allowing the arrest of 4,000 communists.',
      },
    },
    2: {
      id: 'source_b_enabling_act_kroll',
      letter: 'B',
      title:
        'Source B: The Reichstag Voting on the Enabling Act in the Kroll Opera House (23 March 1933)',
      src: '/images/kroll_opera_enabling_act_1933.jpg',
      source: '/images/kroll_opera_enabling_act_1933.jpg',
      image: '/images/kroll_opera_enabling_act_1933.jpg',
      caption:
        'The Reichstag in session at the Kroll Opera House under a giant swastika banner on 23 March 1933, as SA stormtroopers lined the aisles to intimidate delegates into passing the Enabling Act.',
      desc: 'Photograph of the Reichstag meeting at the Kroll Opera House for the Enabling Act vote, March 1933.',
      provenance: 'Bundesarchiv Bild 102-14439, Kroll Opera House, Berlin, 23 March 1933.',
      citation: 'Bundesarchiv Bild 102-14439, 23 March 1933.',
      question:
        'How did the physical presence of armed SA and SS stormtroopers inside the debating chamber ensure the passage of the Enabling Act?',
      hinge_question:
        'How did the physical presence of armed SA and SS stormtroopers inside the debating chamber ensure the passage of the Enabling Act?',
      source_context:
        'Photograph of the Reichstag meeting at the Kroll Opera House for the Enabling Act vote, March 1933. Hinge Question: How did the physical presence of armed SA and SS stormtroopers inside the debating chamber ensure the passage of the Enabling Act?',
      context:
        'Photograph of the Reichstag meeting at the Kroll Opera House for the Enabling Act vote, March 1933.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into how Adolf Hitler established a legal dictatorship in March 1933?',
        content_inferences:
          'Shows the parliament meeting beneath a colossal Nazi swastika banner, surrounded by uniformed party members, demonstrating that parliamentary sovereignty had been replaced by overt Nazi intimidation and coercion.',
        provenance_evaluation:
          'Official press photograph taken inside the Kroll Opera House on 23 March 1933 (Bundesarchiv). Outstanding visual evidence documenting the vote that ended German democracy, though official photography does not capture the shouting and physical threats directed at SPD deputies.',
        context_limitations:
          'Own knowledge confirms communist deputies had already been imprisoned or banned; only the 94 Social Democrats (SPD) led by Otto Wels had the courage to vote against the act, which passed 444 to 94, granting Hitler the constitutional power to enact laws without Reichstag consent for four years.',
      },
    },
  },

  // L10: KT3.2
  lesson_3_2: {
    1: {
      id: 'source_a_dachau_roll_call',
      letter: 'A',
      title: 'Source A: Roll Call of Political Prisoners at Dachau Concentration Camp (1933)',
      src: '/images/dachau_roll_call.jpg',
      source: '/images/dachau_roll_call.jpg',
      image: '/images/dachau_roll_call.jpg',
      caption:
        'Roll call of political prisoners, mostly communists and trade unionists, standing at attention in the courtyard of Dachau Concentration Camp near Munich in 1933.',
      desc: 'Photograph of political prisoners on roll call at Dachau concentration camp, 1933.',
      provenance: 'Bundesarchiv Bild 152-01-26, Dachau Concentration Camp, 1933.',
      citation: 'Bundesarchiv Bild 152-01-26, Dachau, 1933.',
      question:
        'Why was the establishment of concentration camps like Dachau in 1933 so essential for terrorizing ordinary German citizens into conformity?',
      hinge_question:
        'Why was the establishment of concentration camps like Dachau in 1933 so essential for terrorizing ordinary German citizens into conformity?',
      source_context:
        'Photograph of political prisoners on roll call at Dachau concentration camp, 1933. Hinge Question: Why was the establishment of concentration camps like Dachau in 1933 so essential for terrorizing ordinary German citizens into conformity?',
      context: 'Photograph of political prisoners on roll call at Dachau concentration camp, 1933.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the role of concentration camps in the Nazi police state between 1933 and 1939?',
        content_inferences:
          'Shows hundreds of civilian political detainees lined up under rigid military discipline guarded by SS guards, illustrating that the regime used extra-legal detention camps to silence domestic political opponents without trial.',
        provenance_evaluation:
          'Photograph taken at Dachau in 1933, released with official Nazi approval (Bundesarchiv). Useful for showing early camp organization, though official propaganda photographs deliberately sanitized conditions, concealing the routine beatings, torture, and executions.',
        context_limitations:
          'From own knowledge, Dachau was opened by Heinrich Himmler in March 1933 as a model camp for political prisoners; the fear of being sent to a camp under "protective custody" (Schutzhaft) by the Gestapo deterred the German population from expressing dissent.',
      },
    },
    4: {
      id: 'source_b_reichskonkordat',
      letter: 'B',
      title: 'Source B: Signing of the Reichskonkordat at the Vatican (July 1933)',
      src: '/images/reichskonkordat_signing_1933.jpg',
      source: '/images/reichskonkordat_signing_1933.jpg',
      image: '/images/reichskonkordat_signing_1933.jpg',
      caption:
        'Vice-Chancellor Franz von Papen and Cardinal Eugenio Pacelli (the future Pope Pius XII) signing the Reichskonkordat between Nazi Germany and the Catholic Church in Rome on 20 July 1933.',
      desc: 'Official photograph of the signing of the Reichskonkordat, Vatican, July 1933.',
      provenance: 'Bundesarchiv Bild 183-R24391, Rome, Vatican, 20 July 1933.',
      citation: 'Bundesarchiv Bild 183-R24391, 20 July 1933.',
      question:
        'How did the Reichskonkordat provide Hitler with international respectability while effectively neutralizing political Catholic opposition within Germany?',
      hinge_question:
        'How did the Reichskonkordat provide Hitler with international respectability while effectively neutralizing political Catholic opposition within Germany?',
      source_context:
        'Official photograph of the signing of the Reichskonkordat, Vatican, July 1933. Hinge Question: How did the Reichskonkordat provide Hitler with international respectability while effectively neutralizing political Catholic opposition within Germany?',
      context: 'Official photograph of the signing of the Reichskonkordat, Vatican, July 1933.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into Nazi policy towards the Catholic Church in 1933?',
        content_inferences:
          'Shows formal, diplomatic cooperation between senior Nazi government officials and the Vatican hierarchy, indicating an agreement where both sides sought to delineate spheres of authority.',
        provenance_evaluation:
          'Official commemorative photograph taken at the Vatican on 20 July 1933 (Bundesarchiv). Outstanding formal record of the treaty’s conclusion, though diplomatic photographs give no indication of the rapid violations of the treaty that followed.',
        context_limitations:
          'Own knowledge confirms that under the Concordat, Hitler promised not to interfere with Catholic schools, youth clubs, and worship, in exchange for the Catholic Centre Party dissolving itself and priests withdrawing from political activity; within two years, Hitler breached the agreement by harassing priests and shutting Catholic schools.',
      },
    },
  },

  // L11: KT3.3
  lesson_3_3: {
    2: {
      id: 'source_a_volksempfaenger',
      letter: 'A',
      title: 'Source A: The Volksempfänger VE301 "People’s Receiver" Radio (1933)',
      src: '/images/volksempfaenger_radio_1933.jpg',
      source: '/images/volksempfaenger_radio_1933.jpg',
      image: '/images/volksempfaenger_radio_1933.jpg',
      caption:
        'The mass-produced Volksempfänger VE301 radio, subsidized by the Propaganda Ministry and engineered with a limited receiving range to prevent Germans tuning into foreign radio broadcasts.',
      desc: 'Official product photograph of the Volksempfänger VE301 radio, 1933.',
      provenance: 'Reich Propaganda Ministry publicity archive, Berlin, 1933.',
      citation: 'Reichspropagandaministerium, Berlin, 1933.',
      question:
        'Why did Joseph Goebbels consider the cheap People’s Receiver radio to be the most vital instrument of propaganda in the modern totalitarian state?',
      hinge_question:
        'Why did Joseph Goebbels consider the cheap People’s Receiver radio to be the most vital instrument of propaganda in the modern totalitarian state?',
      source_context:
        'Official product photograph of the Volksempfänger VE301 radio, 1933. Hinge Question: Why did Joseph Goebbels consider the cheap People’s Receiver radio to be the most vital instrument of propaganda in the modern totalitarian state?',
      context: 'Official product photograph of the Volksempfänger VE301 radio, 1933.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the methods used by Joseph Goebbels to control information and influence public attitudes in Nazi Germany?',
        content_inferences:
          'Shows a simple, austere, affordable household radio designed for mass consumption, illustrating how the regime utilized modern electronic communications to bring Nazi speeches and propaganda directly into German living rooms.',
        provenance_evaluation:
          'Authentic primary artifact manufactured under the direction of the Reich Ministry of Public Enlightenment and Propaganda from 1933. Incontrovertible evidence of technology being weaponized for political indoctrination.',
        context_limitations:
          'Own knowledge confirms the VE301 (priced at only 76 marks, two weeks’ wages) raised radio ownership from 25% in 1932 to over 70% by 1939; it lacked shortwave capability, making it impossible to receive the BBC, and listening to foreign broadcasts was later made punishable by execution.',
      },
    },
    3: {
      id: 'source_b_nuremberg_rally',
      letter: 'B',
      title: 'Source B: Mass Rally at the Nuremberg Zeppelin Field (1934–1936)',
      src: '/images/nuremberg_rally.jpg',
      source: '/images/nuremberg_rally.jpg',
      image: '/images/nuremberg_rally.jpg',
      caption:
        'Hundreds of thousands of uniformed party members, SA, and SS troops standing in geometric formations at the Nuremberg Zeppelin Field during the annual Nazi Party Rally.',
      desc: 'Photograph of the vast night-time assembly at the Nuremberg Rally, Zeppelin Field, c. 1935.',
      provenance: 'Bundesarchiv Bild 183-C12701, Nuremberg Rally, Zeppelin Field, c. 1935.',
      citation: 'Bundesarchiv Bild 183-C12701, Nuremberg, c. 1935.',
      question:
        'How did Albert Speer’s "Cathedral of Light" and vast choreographed rallies create a psychological sense of invincible collective power?',
      hinge_question:
        'How did Albert Speer’s "Cathedral of Light" and vast choreographed rallies create a psychological sense of invincible collective power?',
      source_context:
        'Photograph of the vast assembly at the Nuremberg Rally, Zeppelin Field, c. 1935. Hinge Question: How did Albert Speer’s "Cathedral of Light" and vast choreographed rallies create a psychological sense of invincible collective power?',
      context: 'Photograph of the vast assembly at the Nuremberg Rally, Zeppelin Field, c. 1935.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into how the Nazi regime used mass spectacles to manufacture conformity and promote the Führer cult?',
        content_inferences:
          'Shows hundreds of thousands of identical, disciplined bodies arranged in monumental geometric blocks, demonstrating how individual identity was subordinated to the state and projecting an aura of overwhelming power and unity.',
        provenance_evaluation:
          'Official propaganda photograph by the Reichspressechef, Nuremberg, c. 1935 (Bundesarchiv). Highly valuable for analyzing the visual architecture of Nazi propaganda, though deliberately composed from elevated angles to exaggerate scale and obscure any dissent.',
        context_limitations:
          'From own knowledge, these annual week-long rallies were orchestrated by Propaganda Minister Goebbels and architect Albert Speer (who used 130 anti-aircraft searchlights to create the "Cathedral of Light"), filmed by Leni Riefenstahl for *Triumph of the Will* to mesmerize both German citizens and foreign observers.',
      },
    },
    4: {
      id: 'source_c_jesse_owens_olympics',
      letter: 'C',
      title: 'Source C: Jesse Owens on the Medal Podium at the 1936 Berlin Olympics',
      src: '/images/jesse_owens.jpg',
      source: '/images/jesse_owens.jpg',
      image: '/images/jesse_owens.jpg',
      caption:
        'African-American track star Jesse Owens saluting on the victory podium after winning gold at the 1936 Berlin Olympics, directly challenging Nazi racial theories of Aryan supremacy.',
      desc: 'Photograph of Jesse Owens on the Olympic podium in Berlin, August 1936.',
      provenance:
        'Associated Press / International Olympic Committee archive, Berlin, August 1936.',
      citation: 'Associated Press, Berlin, August 1936.',
      question:
        'How did Jesse Owens’ four gold medals publicly undermine Adolf Hitler’s propaganda narrative of Aryan physical and biological superiority?',
      hinge_question:
        'How did Jesse Owens’ four gold medals publicly undermine Adolf Hitler’s propaganda narrative of Aryan physical and biological superiority?',
      source_context:
        'Photograph of Jesse Owens on the Olympic podium in Berlin, August 1936. Hinge Question: How did Jesse Owens’ four gold medals publicly undermine Adolf Hitler’s propaganda narrative of Aryan physical and biological superiority?',
      context: 'Photograph of Jesse Owens on the Olympic podium in Berlin, August 1936.',
      utility_enquiry: {
        question:
          'How useful is Source C for an enquiry into the international impact and ideological contradictions of the 1936 Berlin Olympic Games?',
        content_inferences:
          'Shows African-American athlete Jesse Owens standing victorious at the center of the Olympic stadium in Berlin while German competitor Luz Long salutes, visibly disproving the Nazi doctrine of inherent Aryan racial superiority.',
        provenance_evaluation:
          'Contemporary international press photograph, August 1936. Authentic, objective photojournalism documenting a global sporting moment, though an image of the podium cannot show how thoroughly Goebbels censored domestic radio reports of Black victories.',
        context_limitations:
          'Own knowledge confirms Hitler built a 100,000-seat stadium and temporarily took down anti-Jewish street signs to project an image of a civilized, prosperous Germany; despite Owens winning four gold medals, Germany still topped the overall medal table, which Nazi propaganda proclaimed as proof of Aryan vitality.',
      },
    },
  },

  // L12: KT3.4
  lesson_3_4: {
    3: {
      id: 'source_a_edelweiss_pirates',
      letter: 'A',
      title:
        'Source A: Edelweiss Pirates Anti-Nazi Slogans and Youth Graffiti (Cologne, 1938–1939)',
      src: '/images/edelweiss_pirates_graffiti.jpg',
      source: '/images/edelweiss_pirates_graffiti.jpg',
      image: '/images/edelweiss_pirates_graffiti.jpg',
      caption:
        'Gestapo photographic evidence showing anti-Nazi graffiti sprayed by the Edelweiss Pirates (Edelweißpiraten) on railway walls in the Rhineland, defying Hitler Youth control.',
      desc: 'Gestapo surveillance photograph of Edelweiss Pirates graffiti in Cologne, late 1930s.',
      provenance: 'Gestapo Düsseldorf/Köln surveillance file, c. 1938–1939. Bundesarchiv.',
      citation: 'Gestapo surveillance file, Cologne, 1939.',
      question:
        'Why did working-class youth rebellion like the Edelweiss Pirates alarm the Gestapo far more than quiet discontent among older adults?',
      hinge_question:
        'Why did working-class youth rebellion like the Edelweiss Pirates alarm the Gestapo far more than quiet discontent among older adults?',
      source_context:
        'Gestapo surveillance photograph of Edelweiss Pirates graffiti in Cologne, late 1930s. Hinge Question: Why did working-class youth rebellion like the Edelweiss Pirates alarm the Gestapo far more than quiet discontent among older adults?',
      context:
        'Gestapo surveillance photograph of Edelweiss Pirates graffiti in Cologne, late 1930s.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the nature and extent of youth opposition in Nazi Germany before the Second World War?',
        content_inferences:
          'Shows illegal graffiti painted in prominent public spaces, demonstrating that working-class teenagers openly rejected totalitarian regimentation, mocked the Hitler Youth, and risked arrest to assert their freedom.',
        provenance_evaluation:
          'Official Gestapo photographic evidence compiled during investigations in Cologne, c. 1938 (Bundesarchiv). Highly useful as authentic police evidence of real resistance, though police records often focused on criminal deviance rather than political motives.',
        context_limitations:
          'From own knowledge, the Edelweiss Pirates (who wore checked shirts and edelweiss flower badges) beat up Hitler Youth patrols, sang banned songs, and went hiking; while their defiance was courageous, it remained localized and never posed an existential threat to Hitler’s grip on state power.',
      },
    },
    5: {
      id: 'source_b_bishop_galen',
      letter: 'B',
      title: 'Source B: Bishop Clemens August Graf von Galen (c. 1935)',
      src: '/images/galen_portrait.jpg',
      source: '/images/galen_portrait.jpg',
      image: '/images/galen_portrait.jpg',
      caption:
        'Clemens August Graf von Galen, the Catholic Bishop of Münster, who courageously delivered famous public sermons condemning Nazi Gestapo terror and the secret T4 euthanasia programme.',
      desc: 'Portrait photograph of Bishop Clemens August Graf von Galen, Bishop of Münster.',
      provenance: 'Diocese of Münster archive, c. 1935.',
      citation: 'Diocese of Münster archive, c. 1935.',
      question:
        'Why was the Nazi regime afraid to execute Bishop von Galen, even when he openly attacked government euthanasia policies from the pulpit?',
      hinge_question:
        'Why was the Nazi regime afraid to execute Bishop von Galen, even when he openly attacked government euthanasia policies from the pulpit?',
      source_context:
        'Portrait photograph of Bishop Clemens August Graf von Galen, Bishop of Münster. Hinge Question: Why was the Nazi regime afraid to execute Bishop von Galen, even when he openly attacked government euthanasia policies from the pulpit?',
      context: 'Portrait photograph of Bishop Clemens August Graf von Galen, Bishop of Münster.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into the role of religious resistance against the Nazi regime in the 1930s and 1940s?',
        content_inferences:
          'Shows a conservative, authoritative ecclesiastical leader in traditional vestments, indicating that religious opposition came from respected institutional figures within the social establishment rather than just fringe radicals.',
        provenance_evaluation:
          'Formal church portrait photograph, c. 1935. Useful for identifying the leading Catholic critic of Nazi euthanasia, though a portrait alone does not reveal the text or revolutionary impact of his public sermons.',
        context_limitations:
          'Own knowledge confirms Galen used his pulpit in 1941 to read out evidence of the regime’s secret "Aktion T4" murder of disabled children; his speeches were printed and dropped by the RAF, and his aristocratic status and immense popularity forced Hitler to temporarily halt the euthanasia programme.',
      },
    },
  },

  // L13: KT4.1
  lesson_4_1: {
    1: {
      id: 'source_a_aryan_family_poster',
      letter: 'A',
      title: 'Source A: Nazi Propaganda Promoting the Domestic Ideal and Aryan Motherhood',
      src: '/images/bdm_domestic_skills.jpg',
      source: '/images/bdm_domestic_skills.jpg',
      image: '/images/bdm_domestic_skills.jpg',
      caption:
        'Nazi photographic propaganda showing young German women receiving domestic training in childcare and cooking, reinforcing the slogan "Kinder, Küche, Kirche" (Children, Kitchen, Church).',
      desc: 'Propaganda photograph of domestic training for German women, 1930s.',
      provenance: 'Reich Youth Leadership (Reichsjugendführung) archive, c. 1936. Bundesarchiv.',
      citation: 'Reichsjugendführung archive, c. 1936.',
      question:
        'How did Nazi propaganda enforce traditional gender roles to reverse the social and professional gains made by women during the Weimar Republic?',
      hinge_question:
        'How did Nazi propaganda enforce traditional gender roles to reverse the social and professional gains made by women during the Weimar Republic?',
      source_context:
        'Propaganda photograph of domestic training for German women, 1930s. Hinge Question: How did Nazi propaganda enforce traditional gender roles to reverse the social and professional gains made by women during the Weimar Republic?',
      context: 'Propaganda photograph of domestic training for German women, 1930s.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into Nazi policies towards women and family life in the 1930s?',
        content_inferences:
          'Shows young women being systematically trained in domestic skills and childcare, demonstrating the regime’s ideological determination to exclude women from professions and confine them to reproductive, homemaking roles.',
        provenance_evaluation:
          'Official state propaganda photograph published by the Reich Youth Leadership, c. 1936 (Bundesarchiv). Outstanding evidence of the state’s idealized vision of female duty, though it depicts model training centers rather than the diverse opinions of women themselves.',
        context_limitations:
          'From own knowledge, the Law for the Reduction of Unemployment (1933) offered marriage loans of up to 1,000 marks on condition that the woman gave up work; women doctors, lawyers, and civil servants were purged from their posts, though rearmament after 1937 eventually forced the regime to encourage women back into factories.',
      },
    },
    3: {
      id: 'source_b_mothers_cross',
      letter: 'B',
      title: 'Source B: The Honour Cross of the German Mother (Mutterkreuz) (1938)',
      src: '/images/mothers_cross_award.jpg',
      source: '/images/mothers_cross_award.jpg',
      image: '/images/mothers_cross_award.jpg',
      caption:
        'The Honour Cross of the German Mother (Ehrenkreuz der Deutschen Mutter) in Bronze (4–5 children), Silver (6–7 children), and Gold (8+ children), instituted on 16 December 1938.',
      desc: 'The official Cross of Honour of the German Mother medal award, 1938.',
      provenance:
        'Präsidialkanzlei der NSDAP, Berlin, December 1938. Imperial War Museum Collection.',
      citation: 'NSDAP Präsidialkanzlei, Berlin, 1938.',
      question:
        'Why did the Nazi regime award military-style medals like the Mother’s Cross to encourage high birth rates among racially acceptable families?',
      hinge_question:
        'Why did the Nazi regime award military-style medals like the Mother’s Cross to encourage high birth rates among racially acceptable families?',
      source_context:
        'The official Cross of Honour of the German Mother medal award, 1938. Hinge Question: Why did the Nazi regime award military-style medals like the Mother’s Cross to encourage high birth rates among racially acceptable families?',
      context: 'The official Cross of Honour of the German Mother medal award, 1938.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into the methods used by the Nazi regime to encourage population growth and promote racial eugenics?',
        content_inferences:
          'The medal resembles an Iron Cross military decoration inscribed with "The Child Ennobles the Mother" on blue and white enamel, showing that childbirth was glorified as a state duty equivalent to military service.',
        provenance_evaluation:
          'Genuine state award instituted by Adolf Hitler on 16 December 1938. Invaluable primary material evidence showing how the state institutionalized fertility incentives, though the physical medal does not reveal whether awards actually altered family planning decisions.',
        context_limitations:
          'Own knowledge confirms medals were awarded only to women of "pure German blood" who were deemed genetically and politically healthy; mothers wearing the gold cross were saluted by Hitler Youth members and given preferential seating on public transport, reflecting the regime’s demographic obsession with breeding soldiers.',
      },
    },
  },

  // L14: KT4.2
  lesson_4_2: {
    1: {
      id: 'source_a_hitler_youth_uniforms',
      letter: 'A',
      title: 'Source A: Hitler Youth Boys in Paramilitary Uniform (Bundesarchiv Bild 119-5592-14A)',
      src: '/images/hitler_youth_march_1930s.jpg',
      source: '/images/hitler_youth_march_1930s.jpg',
      image: '/images/hitler_youth_march_1930s.jpg',
      caption:
        'A group of Hitler Youth (Hitlerjugend) boys in military-style uniforms, belts, and swastika armbands, participating in outdoor drill and ideological conditioning.',
      desc: 'Photograph of Hitler Youth members in full uniform, c. 1935.',
      provenance: 'Bundesarchiv Bild 119-5592-14A, Gruppe von HJ-Jungen, c. 1935.',
      citation: 'Bundesarchiv Bild 119-5592-14A, c. 1935.',
      question:
        'How did the Hitler Youth combine outdoor adventure with military drills to prepare young boys for future conscription in the German army?',
      hinge_question:
        'How did the Hitler Youth combine outdoor adventure with military drills to prepare young boys for future conscription in the German army?',
      source_context:
        'Photograph of Hitler Youth members in full uniform, c. 1935. Hinge Question: How did the Hitler Youth combine outdoor adventure with military drills to prepare young boys for future conscription in the German army?',
      context: 'Photograph of Hitler Youth members in full uniform, c. 1935.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the purpose and methods of the Hitler Youth movement in the 1930s?',
        content_inferences:
          'Shows young boys wearing miniature military uniforms with shoulder straps and swastika badges, demonstrating that youth organizations were explicitly designed to indoctrinate boys with unquestioning obedience and prepare them for military service.',
        provenance_evaluation:
          'Contemporary German photograph of Hitler Youth boys, c. 1935 (Bundesarchiv). Useful evidence of how boys were organized and uniformed, though official photographs show eager, compliant participants and conceal the growing resentment among boys forced to attend boring drills.',
        context_limitations:
          'Own knowledge confirms that membership was made compulsory for all eligible 10-to-18-year-olds in December 1936; activities focused on physical fitness, rifle shooting, map reading, and intense racial lectures to ensure absolute devotion to Adolf Hitler.',
      },
    },
    2: {
      id: 'source_b_bdm_gymnastics',
      letter: 'B',
      title:
        'Source B: Bund Deutscher Mädel (BDM) Girls Performing Synchronised Gymnastics (c. 1936)',
      src: '/images/bdm_gymnastics.jpg',
      source: '/images/bdm_gymnastics.jpg',
      image: '/images/bdm_gymnastics.jpg',
      caption:
        'Girls of the League of German Girls (Bund Deutscher Mädel) in uniform white shirts and black skirts performing synchronized physical exercises in the open air.',
      desc: 'Photograph of BDM girls engaged in synchronized outdoor gymnastics, c. 1936.',
      provenance: 'Reichsjugendführung archive, Berlin, c. 1936. Bundesarchiv.',
      citation: 'Bundesarchiv, Berlin, 1936.',
      question:
        'Why did the Nazi regime place such intense emphasis on physical fitness and outdoor gymnastics for young girls in the BDM?',
      hinge_question:
        'Why did the Nazi regime place such intense emphasis on physical fitness and outdoor gymnastics for young girls in the BDM?',
      source_context:
        'Photograph of BDM girls engaged in synchronized outdoor gymnastics, c. 1936. Hinge Question: Why did the Nazi regime place such intense emphasis on physical fitness and outdoor gymnastics for young girls in the BDM?',
      context: 'Photograph of BDM girls engaged in synchronized outdoor gymnastics, c. 1936.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into the aims of the League of German Girls (BDM) in Nazi Germany?',
        content_inferences:
          'Shows young women in matching uniforms performing collective physical exercises with military precision, demonstrating that physical conditioning and collective conformity were prioritized over individual intellectual development.',
        provenance_evaluation:
          'Official promotional photograph produced by the BDM leadership, c. 1936 (Bundesarchiv). Excellent evidence of the regime’s propaganda portrayal of healthy Aryan youth, though it deliberately hides the ideological indoctrination sessions that accompanied physical training.',
        context_limitations:
          'From own knowledge, the BDM was the female wing of the Hitler Youth for girls aged 14 to 18; its explicit goal was to build robust physical health so girls would become fertile mothers capable of bearing healthy Aryan children for the Thousand-Year Reich.',
      },
    },
  },

  // L15: KT4.3
  lesson_4_3: {
    2: {
      id: 'source_a_autobahn_workers',
      letter: 'A',
      title: 'Source A: Construction Workers on the Reichsautobahn Project (c. 1935)',
      src: '/images/autobahn_construction.jpg',
      source: '/images/autobahn_construction.jpg',
      image: '/images/autobahn_construction.jpg',
      caption:
        'German labourers building a stretch of the Reichsautobahn motorway network, hailed by Nazi propaganda as proof that Hitler had conquered unemployment.',
      desc: 'Photograph of workers constructing an Autobahn highway, mid-1930s.',
      provenance: 'Bundesarchiv Bild 183-C0314-0010-003, Reichsautobahnbau, c. 1935.',
      citation: 'Bundesarchiv Bild 183-C0314-0010-003, c. 1935.',
      question:
        'How did the Autobahn construction programme serve both as a powerful domestic propaganda victory and a strategic military asset?',
      hinge_question:
        'How did the Autobahn construction programme serve both as a powerful domestic propaganda victory and a strategic military asset?',
      source_context:
        'Photograph of workers constructing an Autobahn highway, mid-1930s. Hinge Question: How did the Autobahn construction programme serve both as a powerful domestic propaganda victory and a strategic military asset?',
      context: 'Photograph of workers constructing an Autobahn highway, mid-1930s.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into Nazi economic policies and public works schemes to reduce unemployment in the 1930s?',
        content_inferences:
          'Shows gangs of manual workers actively laying tarmac and concrete for dual-carriageway highways, illustrating how the government invested massive state funds into public infrastructure to create jobs.',
        provenance_evaluation:
          'Official press photograph from the Reich Ministry of Transport, c. 1935 (Bundesarchiv). Highly useful for seeing how the regime publicized its modern engineering triumphs, though propaganda exaggerated the numbers employed (never more than 125,000 workers directly).',
        context_limitations:
          'Own knowledge confirms Hitler personally turned the first spade of dirt for the Autobahn in September 1933; while the 7,000 km network boosted national pride and improved military mobility, the massive fall in unemployment from 6 million to under 1 million was mainly driven by rearmament, conscription, and the exclusion of women and Jews from statistics ("invisible unemployment").',
      },
    },
    4: {
      id: 'source_b_kdf_emblem',
      letter: 'B',
      title: 'Source B: Strength Through Joy (KdF) Scheme Promotional Emblem and Programme (1938)',
      src: '/images/kdf_cruise_ship_1938.jpg',
      source: '/images/kdf_cruise_ship_1938.jpg',
      image: '/images/kdf_cruise_ship_1938.jpg',
      caption:
        'The official sun-wheel cog symbol of the Strength Through Joy (Kraft durch Freude - KdF) organization, which organized subsidized holidays, theatre trips, and the Volkswagen car scheme.',
      desc: 'The official emblem of the Kraft durch Freude (KdF) division of the German Labour Front, 1938.',
      provenance: 'Deutsche Arbeitsfront (DAF) archive, Berlin, 1938.',
      citation: 'DAF archive, Berlin, 1938.',
      question:
        'How did Robert Ley use leisure perks like KdF cruises and the Volkswagen scheme to compensate German workers for the loss of free trade unions and wage controls?',
      hinge_question:
        'How did Robert Ley use leisure perks like KdF cruises and the Volkswagen scheme to compensate German workers for the loss of free trade unions and wage controls?',
      source_context:
        'The official emblem of the Kraft durch Freude (KdF) division of the German Labour Front, 1938. Hinge Question: How did Robert Ley use leisure perks like KdF cruises and the Volkswagen scheme to compensate German workers for the loss of free trade unions and wage controls?',
      context:
        'The official emblem of the Kraft durch Freude (KdF) division of the German Labour Front, 1938.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into how the German Labour Front (DAF) sought to control and appease industrial workers between 1933 and 1939?',
        content_inferences:
          'The emblem incorporates a dynamic sunburst inside a mechanical industrial cogwheel, symbolizing the union of joyful recreation with productive industrial labor under total state direction.',
        provenance_evaluation:
          'Official corporate logo of the KdF organisation, 1938. Authentic ideological artifact illustrating how state institutions branded welfare programmes, though an emblem cannot show how few workers actually went on luxury cruises compared to senior party officials.',
        context_limitations:
          'From own knowledge, after crushing independent trade unions in May 1933, the DAF under Robert Ley established KdF to keep workers contented and productive; millions enjoyed cheap theatre tickets and hiking trips, but the popular "KdF-Wagen" (Volkswagen) savings scheme took workers’ money while no cars were ever delivered before factories switched to military vehicles.',
      },
    },
  },

  // L16: KT4.4
  lesson_4_4: {
    1: {
      id: 'source_a_anti_jewish_boycott',
      letter: 'A',
      title:
        'Source A: SA Stormtroopers Enforcing the Nationwide Anti-Jewish Boycott (1 April 1933)',
      src: '/images/anti_jewish_boycott_1933.jpg',
      source: '/images/anti_jewish_boycott_1933.jpg',
      image: '/images/anti_jewish_boycott_1933.jpg',
      caption:
        'Uniformed SA stormtroopers pasting placards stating "Deutsche, verteidigt euch! Kauft nicht bei Juden!" (Germans, defend yourselves! Do not buy from Jews!) on the window of a Jewish department store in Berlin, 1 April 1933.',
      desc: 'Photograph of SA stormtroopers posting boycott signs on a Jewish shop in Berlin, 1 April 1933.',
      provenance: 'Bundesarchiv Bild 102-14469, Berlin Boycott, 1 April 1933.',
      citation: 'Bundesarchiv Bild 102-14469, 1 April 1933.',
      question:
        'Why did the Nazi government launch the boycott of Jewish businesses on 1 April 1933, and why did they call it off after only one day?',
      hinge_question:
        'Why did the Nazi government launch the boycott of Jewish businesses on 1 April 1933, and why did they call it off after only one day?',
      source_context:
        'Photograph of SA stormtroopers posting boycott signs on a Jewish shop in Berlin, 1 April 1933. Hinge Question: Why did the Nazi government launch the boycott of Jewish businesses on 1 April 1933, and why did they call it off after only one day?',
      context:
        'Photograph of SA stormtroopers posting boycott signs on a Jewish shop in Berlin, 1 April 1933.',
      utility_enquiry: {
        question:
          'How useful is Source A for an enquiry into the early persecution of Jewish citizens by the Nazi regime in 1933?',
        content_inferences:
          'Shows paramilitary stormtroopers physically stationing themselves outside Jewish-owned shops to intimidate customers and paint anti-Semitic slogans on glass, proving that the persecution began with economic boycott and state-sponsored intimidation immediately after Hitler took power.',
        provenance_evaluation:
          'Contemporary news photograph taken in central Berlin on 1 April 1933 (Bundesarchiv). Outstanding eyewitness record of the first nationwide anti-Jewish action, though it depicts an official staged action and does not show the quiet embarrassment of many ordinary passers-by.',
        context_limitations:
          'Own knowledge confirms Goebbels organized the nationwide boycott to punish German Jews for alleged foreign criticism; however, it was abandoned after 24 hours because international financial protests threatened Germany’s fragile economy, prompting Hitler to switch to legal persecution through the Civil Service Law of April 1933.',
      },
    },
    2: {
      id: 'source_b_nuremberg_laws_chart',
      letter: 'B',
      title:
        'Source B: Official Racial Classification Chart under the Nuremberg Laws (September 1935)',
      src: '/images/nuremberg_laws_chart_1935.jpg',
      source: '/images/nuremberg_laws_chart_1935.jpg',
      image: '/images/nuremberg_laws_chart_1935.jpg',
      caption:
        'The official Reichsgesetzblatt diagram explaining the 1935 Nuremberg Laws (Reich Citizenship Law and Law for the Protection of German Blood and German Honour), categorizing individuals by ancestral grandparent lineage.',
      desc: 'Official racial classification chart illustrating the Nuremberg Laws of September 1935.',
      provenance: 'Reichsgesetzblatt, Part I, No. 100, Berlin, 1935. Bundesarchiv.',
      citation: 'Reichsgesetzblatt, Berlin, 1935.',
      question:
        'How did the Nuremberg Laws fundamentally transform anti-Semitism from social prejudice into inescapable, pseudoscientific state law?',
      hinge_question:
        'How did the Nuremberg Laws fundamentally transform anti-Semitism from social prejudice into inescapable, pseudoscientific state law?',
      source_context:
        'Official racial classification chart illustrating the Nuremberg Laws of September 1935. Hinge Question: How did the Nuremberg Laws fundamentally transform anti-Semitism from social prejudice into inescapable, pseudoscientific state law?',
      context:
        'Official racial classification chart illustrating the Nuremberg Laws of September 1935.',
      utility_enquiry: {
        question:
          'How useful is Source B for an enquiry into the legal methods used by the Nazi state to persecute Jewish people between 1935 and 1939?',
        content_inferences:
          'Shows an intricate pseudo-scientific genealogical chart categorizing Germans into "German-blooded", "Mischlinge" (first or second degree), and "Jews" based solely on the religious affiliation of their four grandparents, proving that persecution was racial and biological rather than religious.',
        provenance_evaluation:
          'Official government legal diagram published in the Reichsgesetzblatt in late 1935. Incontrovertible official legal evidence showing how the state codified racial discrimination into law, though a chart cannot convey the terror and social isolation felt by families stripped of citizenship.',
        context_limitations:
          'From own knowledge, announced at the Nuremberg Rally in September 1935, the Reich Citizenship Law stripped Jews of German citizenship and voting rights, while the Blood Protection Law outlawed marriage and sexual relations between Jews and citizens of German blood, laying the legal foundation for total social segregation and eventual genocide.',
      },
    },
    4: {
      id: 'source_c_kristallnacht_shopfront',
      letter: 'C',
      title:
        'Source C: Shattered Jewish Shopfront Following Kristallnacht in Berlin (November 1938)',
      src: '/images/kristallnacht_shop.jpg',
      source: '/images/kristallnacht_shop.jpg',
      image: '/images/kristallnacht_shop.jpg',
      caption:
        'The shattered display windows of a Jewish-owned retail shop in Berlin on the morning of 10 November 1938, following the nationwide pogrom of Kristallnacht.',
      desc: 'Photograph of a wrecked Jewish-owned shop in Berlin after Kristallnacht, November 1938.',
      provenance: 'Bundesarchiv Bild 146-1970-083-42, Berlin, 10 November 1938.',
      citation: 'Bundesarchiv Bild 146-1970-083-42, November 1938.',
      question:
        'Why did Kristallnacht represent a critical turning point in the Nazi persecution of Jewish people, shifting from legal discrimination to organized state violence?',
      hinge_question:
        'Why did Kristallnacht represent a critical turning point in the Nazi persecution of Jewish people, shifting from legal discrimination to organized state violence?',
      source_context:
        'Photograph of a wrecked Jewish-owned shop in Berlin after Kristallnacht, November 1938. Hinge Question: Why did Kristallnacht represent a critical turning point in the Nazi persecution of Jewish people, shifting from legal discrimination to organized state violence?',
      context:
        'Photograph of a wrecked Jewish-owned shop in Berlin after Kristallnacht, November 1938.',
      utility_enquiry: {
        question:
          'How useful is Source C for an enquiry into the escalation of anti-Semitic violence during Kristallnacht in November 1938?',
        content_inferences:
          'Shows heavy plate glass shattered onto the pavement with the business interior looted and destroyed, providing visual proof of violent, coordinated physical attacks on Jewish property in major German cities.',
        provenance_evaluation:
          'Contemporary news photograph taken in Berlin on the morning of 10 November 1938 (Bundesarchiv). Outstanding eyewitness record of the physical aftermath of the pogrom, though a photograph of a single shop cannot reveal the 91 murders or the burning of hundreds of synagogues across Germany.',
        context_limitations:
          'Own knowledge confirms Goebbels orchestrated the pogrom following the assassination of diplomat Ernst vom Rath in Paris; over 1,000 synagogues were burned, 7,500 shops looted, and 30,000 Jewish men sent to concentration camps, after which the regime imposed a punitive 1 billion mark fine on the Jewish community and accelerated forced Aryanisation of all remaining businesses.',
      },
    },
  },
};

// Apply sources to unitData
unitData.lessons.forEach((lesson) => {
  const lessonSources = weimarSources[lesson.id];
  if (!lessonSources) return;

  if (!lesson.teacher_notes) lesson.teacher_notes = {};
  if (!lesson.teacher_notes.source_context) lesson.teacher_notes.source_context = {};

  lesson.narrative_blocks.forEach((block, bIdx) => {
    const actNum = block.act || bIdx + 1;
    const srcObj = lessonSources[actNum];
    if (srcObj) {
      block.source = srcObj;
      lesson.teacher_notes.source_context[`Source ${srcObj.letter}`] = srcObj.source_context;
      console.log(`Updated ${lesson.id} Act ${actNum} -> Source ${srcObj.letter}: ${srcObj.title}`);
    }
  });

  // Also sync lesson.sources array if present
  const allSourcesInLesson = [];
  lesson.narrative_blocks.forEach((b) => {
    if (b.source) allSourcesInLesson.push(b.source);
  });
  lesson.sources = allSourcesInLesson;
});

// Re-serialize unitData into data.js
const newFileContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
fs.writeFileSync(dataFilePath, newFileContent, 'utf8');

console.log('Successfully wrote enriched Weimar sources to:', dataFilePath);
