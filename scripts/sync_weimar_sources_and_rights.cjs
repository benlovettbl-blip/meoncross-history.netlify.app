const fs = require('fs');
const path = require('path');

// 1. Load units/weimar_nazi_germany/data.js
const unitDataPath = path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js');
const publicDataPath = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'weimar_nazi_germany',
  'data.js',
);

let unit = require(unitDataPath);
if (unit.unitData) unit = unit.unitData;

console.log('Loaded unit:', unit.title, 'Lessons:', unit.lessons.length);

// 2. Comprehensive lesson updates
unit.lessons.forEach((l) => {
  // Lesson 2: Dolchstoßlegende
  if (l.id === 'lesson_1_2') {
    if (l.sources) {
      const sA = l.sources.find((s) => s.id === 'source_a_dolchstoss_cartoon');
      if (sA) {
        sA.image = '/images/dolchstosslegende_postcard_1919.jpg';
        sA.src = '/images/dolchstosslegende_postcard_1919.jpg';
        sA.source = '/images/dolchstosslegende_postcard_1919.jpg';
        sA.title = 'Source A: The "Stab in the Back" (Dolchstoßlegende) (1919)';
        sA.caption =
          'Austrian and German right-wing postcard depicting the "Stab in the Back" (Dolchstoßlegende), claiming a heroic German soldier was betrayed from behind by home-front politicians.';
        sA.desc =
          'Austrian/German nationalist propaganda postcard depicting the Dolchstoßlegende, Vienna/Berlin, 1919.';
        sA.provenance =
          'Austrian/German nationalist propaganda postcard, Vienna/Berlin, 1919. Imperial War Museum / Austrian National Library.';
        sA.citation = 'Austrian/German nationalist postcard, Vienna/Berlin, 1919.';
        sA.context = 'Right-wing propaganda postcard depicting the Dolchstoßlegende, 1919.';
        sA.source_context =
          'Right-wing propaganda postcard depicting the Dolchstoßlegende, 1919. Hinge Question: Why was the "Stab in the Back" myth so politically toxic for the long-term legitimacy of the Weimar democracy?';
      }
    }
    if (l.teacher_notes && l.teacher_notes.source_context) {
      l.teacher_notes.source_context['Source A'] =
        'Right-wing propaganda postcard depicting the Dolchstoßlegende, 1919. Hinge Question: Why was the "Stab in the Back" myth so politically toxic for the long-term legitimacy of the Weimar democracy?';
    }
    if (l.narrative_blocks) {
      l.narrative_blocks.forEach((b) => {
        const patchA = (s) => {
          if (!s) return;
          if (
            s.image === '/images/gw_versailles_cartoon.jpg' ||
            (s.title && s.title.includes('Stab in the Back'))
          ) {
            s.image = '/images/dolchstosslegende_postcard_1919.jpg';
            s.src = '/images/dolchstosslegende_postcard_1919.jpg';
            s.source = '/images/dolchstosslegende_postcard_1919.jpg';
            s.title = 'Source A: The "Stab in the Back" (Dolchstoßlegende) (1919)';
            s.caption =
              'Austrian and German right-wing postcard depicting the "Stab in the Back" (Dolchstoßlegende), claiming a heroic German soldier was betrayed from behind by home-front politicians.';
            s.citation = 'Austrian/German nationalist postcard, Vienna/Berlin, 1919.';
            s.context = 'Right-wing propaganda postcard depicting the Dolchstoßlegende, 1919.';
            s.hinge_question =
              'Why was the "Stab in the Back" myth so politically toxic for the long-term legitimacy of the Weimar democracy?';
          }
        };
        if (b.sources) b.sources.forEach(patchA);
        if (b.source) patchA(b.source);
      });
    }
  }

  // Lesson 3: Rentenmark & League of Nations
  if (l.id === 'lesson_1_3') {
    if (l.sources) {
      const sA = l.sources.find((s) => s.id === 'source_a_currency_crisis');
      if (sA) {
        sA.image = '/images/weimar_rentenmark_1923.jpg';
        sA.src = '/images/weimar_rentenmark_1923.jpg';
        sA.source = '/images/weimar_rentenmark_1923.jpg';
        sA.title = 'Source A: The 1-Rentenmark Banknote Halting Hyperinflation (November 1923)';
        sA.caption =
          'An original 1-Rentenmark banknote issued on 1 November 1923, backed by mortgages on German agricultural and industrial land, successfully halting hyperinflation and stabilizing the currency under Gustav Stresemann and Hjalmar Schacht.';
        sA.desc =
          'Official 1-Rentenmark banknote issued by the Deutsche Rentenbank in Berlin on 1 November 1923.';
        sA.provenance =
          'Deutsche Rentenbank, Berlin, 1 November 1923. German Federal Archives (Bundesarchiv) Numismatic Collection.';
        sA.citation = 'Deutsche Rentenbank, Berlin, 1 November 1923.';
        sA.context =
          'Official 1-Rentenmark banknote issued by the newly created Deutsche Rentenbank in November 1923 to replace the worthless paper Mark.';
        sA.source_context =
          'Official 1-Rentenmark banknote issued by the Deutsche Rentenbank in November 1923, backed by mortgages on agricultural and industrial land to halt hyperinflation. Hinge Question: Why was introducing a currency backed by mortgages on agricultural and industrial land (the Rentenmark) so crucial in restoring public trust in German money?';
        sA.utility_enquiry = {
          question:
            'How useful is Source A for an enquiry into the economic emergency confronting Gustav Stresemann when he became Chancellor in 1923?',
          content_inferences:
            'Shows the emergency currency issued by the Rentenbank with legal mortgage backing, demonstrating the radical monetary reorganization required to replace the worthless trillion-mark paper notes.',
          provenance_evaluation:
            "An authentic official banknote issued on 1 November 1923 by the newly established state Rentenbank under Stresemann and Schacht, providing direct primary evidence of the state's successful currency stabilization mechanism.",
          context_limitations:
            'While the physical note confirms the currency reform, own knowledge indicates that currency stabilization alone did not restore the wiped-out middle-class savings or resolve the deeper reliance on short-term American loans under the Dawes Plan.',
        };
      }
      const sC = l.sources.find((s) => s.id === 'source_c_league_of_nations');
      if (sC) {
        sC.image = '/images/stresemann_geneva_league_of_nations_1926.jpg';
        sC.src = '/images/stresemann_geneva_league_of_nations_1926.jpg';
        sC.source = '/images/stresemann_geneva_league_of_nations_1926.jpg';
        sC.title =
          'Source C: Gustav Stresemann Addressing the League of Nations in Geneva (September 1926)';
        sC.caption =
          "German Foreign Minister Gustav Stresemann addressing the plenary assembly of the League of Nations in Geneva on 10 September 1926 following Germany's admission as a permanent Council member.";
        sC.desc =
          'Photograph of Gustav Stresemann delivering his historic address to the League of Nations Assembly in Geneva, 10 September 1926.';
        sC.provenance = 'Bundesarchiv Bild 146-1988-101-12, Geneva, Switzerland, September 1926.';
        sC.citation = 'Bundesarchiv Bild 146-1988-101-12, September 1926.';
        sC.context =
          'Historical photograph of Gustav Stresemann delivering his historic entry speech to the League of Nations Assembly in Geneva, September 1926.';
        sC.source_context =
          'Historical photograph of Gustav Stresemann addressing the League of Nations in Geneva in September 1926 following Germany’s admission as a permanent Council member. Hinge Question: How did Germany’s permanent seat on the League of Nations Council prove that Stresemann’s peaceful diplomatic strategy achieved more than violent confrontation?';
      }
    }
    if (l.teacher_notes && l.teacher_notes.source_context) {
      l.teacher_notes.source_context['Source A'] =
        'Official 1-Rentenmark banknote issued by the Deutsche Rentenbank in November 1923, backed by mortgages on agricultural and industrial land to halt hyperinflation. Hinge Question: Why was introducing a currency backed by mortgages on agricultural and industrial land (the Rentenmark) so crucial in restoring public trust in German money?';
      l.teacher_notes.source_context['Source C'] =
        'Historical photograph of Gustav Stresemann addressing the League of Nations in Geneva in September 1926 following Germany’s admission as a permanent Council member. Hinge Question: How did Germany’s permanent seat on the League of Nations Council prove that Stresemann’s peaceful diplomatic strategy achieved more than violent confrontation?';
    }
    if (l.narrative_blocks) {
      l.narrative_blocks.forEach((b) => {
        const checkAndPatch = (s) => {
          if (!s) return;
          if (
            s.title &&
            (s.title.includes('Currency Collapse') || s.title.includes('Rentenmark'))
          ) {
            s.image = '/images/weimar_rentenmark_1923.jpg';
            s.src = '/images/weimar_rentenmark_1923.jpg';
            s.source = '/images/weimar_rentenmark_1923.jpg';
            s.title = 'Source A: The 1-Rentenmark Banknote Halting Hyperinflation (November 1923)';
            s.caption =
              'An original 1-Rentenmark banknote issued on 1 November 1923, backed by mortgages on German agricultural and industrial land, successfully halting hyperinflation and stabilizing the currency under Gustav Stresemann and Hjalmar Schacht.';
            s.citation = 'Deutsche Rentenbank, Berlin, 1 November 1923.';
            s.context =
              'Official 1-Rentenmark banknote issued by the newly created Deutsche Rentenbank in November 1923 to replace the worthless paper Mark.';
            s.hinge_question =
              'Why was introducing a currency backed by mortgages on agricultural and industrial land (the Rentenmark) so crucial in restoring public trust in German money?';
          }
          if (s.title && (s.title.includes('League of Nations') || s.title.includes('Geneva'))) {
            s.image = '/images/stresemann_geneva_league_of_nations_1926.jpg';
            s.src = '/images/stresemann_geneva_league_of_nations_1926.jpg';
            s.source = '/images/stresemann_geneva_league_of_nations_1926.jpg';
            s.title =
              'Source C: Gustav Stresemann Addressing the League of Nations in Geneva (September 1926)';
            s.caption =
              "German Foreign Minister Gustav Stresemann addressing the plenary assembly of the League of Nations in Geneva on 10 September 1926 following Germany's admission as a permanent Council member.";
            s.citation = 'Bundesarchiv Bild 146-1988-101-12, September 1926.';
            s.context =
              'Historical photograph of Gustav Stresemann delivering his historic entry speech to the League of Nations Assembly in Geneva, September 1926.';
            s.hinge_question =
              'How did Germany’s permanent seat on the League of Nations Council prove that Stresemann’s peaceful diplomatic strategy achieved more than violent confrontation?';
          }
        };
        if (b.sources) b.sources.forEach(checkAndPatch);
        if (b.source) checkAndPatch(b.source);
      });
    }
  }

  // Lesson 4: New Woman, Bauhaus, Cabaret culture
  if (l.id === 'lesson_1_4') {
    if (l.sources) {
      const sA = l.sources.find((s) => s.id === 'source_a_new_woman');
      if (sA) {
        sA.image = '/images/weimar_new_woman_1920s.jpg';
        sA.src = '/images/weimar_new_woman_1920s.jpg';
        sA.source = '/images/weimar_new_woman_1920s.jpg';
        sA.title = 'Source A: The "New Woman" of the Golden Twenties in Berlin (c. 1926)';
        sA.caption =
          'A fashionable young German woman in Berlin sporting the signature short bob hairstyle (Bubikopf), modern apparel, and smoking in public, embodying the emancipated "New Woman" of the Weimar era.';
        sA.desc =
          'Photograph of a modern woman in Berlin representing the New Woman (Neue Frau), c. 1926.';
        sA.provenance = 'Ullstein Bild Agency / Landesarchiv Berlin, Nr. 00028914, c. 1926.';
        sA.citation = 'Ullstein Bild Agency / Landesarchiv Berlin, c. 1926.';
        sA.context = 'Contemporary photograph of a modern Weimar woman in Berlin, mid-1920s.';
        sA.source_context =
          'Contemporary photograph of a modern Weimar woman in Berlin, mid-1920s. Hinge Question: To what extent did the fashionable image of the "New Woman" represent the lived reality of ordinary German women outside the capital city of Berlin?';
      }
      const sC = l.sources.find((s) => s.id === 'source_c_golden_twenties_art');
      if (sC) {
        sC.image = '/images/weimar_berlin_cabaret_1931.jpg';
        sC.src = '/images/weimar_berlin_cabaret_1931.jpg';
        sC.source = '/images/weimar_berlin_cabaret_1931.jpg';
        sC.title = 'Source C: Tanzkabarett (Dance Cabaret) at the Europahaus in Berlin (c. 1930)';
        sC.caption =
          'Patrons enjoying music, dance, and nightlife at the prestigious Europahaus dance cabaret in Berlin, illustrating the vibrant cultural nightlife and modernist lifestyle of the Golden Twenties.';
        sC.desc = 'Photograph of patrons at the Europahaus Tanzkabarett in Berlin, c. 1930.';
        sC.provenance = 'Bundesarchiv Bild 145 Bild-P062899, Berlin, c. 1930–1931.';
        sC.citation = 'Bundesarchiv Bild 145 Bild-P062899, c. 1930.';
        sC.context =
          'Official archive photograph capturing the vibrant nightlife and cabaret entertainment at the Europahaus in central Berlin during the Weimar Golden Twenties.';
        sC.source_context =
          'Official archive photograph capturing the vibrant nightlife and cabaret entertainment at the Europahaus in central Berlin during the Weimar Golden Twenties. Hinge Question: How did the explosion of artistic freedom and cosmopolitan nightlife in Weimar Berlin contribute to deeper cultural and political divisions across Germany?';
      }
    }
    if (l.teacher_notes && l.teacher_notes.source_context) {
      l.teacher_notes.source_context['Source A'] =
        'Contemporary photograph of a modern Weimar woman in Berlin, mid-1920s. Hinge Question: To what extent did the fashionable image of the "New Woman" represent the lived reality of ordinary German women outside the capital city of Berlin?';
      l.teacher_notes.source_context['Source C'] =
        'Official archive photograph capturing the vibrant nightlife and cabaret entertainment at the Europahaus in central Berlin during the Weimar Golden Twenties. Hinge Question: How did the explosion of artistic freedom and cosmopolitan nightlife in Weimar Berlin contribute to deeper cultural and political divisions across Germany?';
    }
    if (l.narrative_blocks) {
      l.narrative_blocks.forEach((b, bi) => {
        if (
          bi === 1 ||
          (b.title && (b.title.includes('New Woman') || b.title.includes('Bubikopf')))
        ) {
          const patchSourceA = (s) => {
            s.image = '/images/weimar_new_woman_1920s.jpg';
            s.src = '/images/weimar_new_woman_1920s.jpg';
            s.source = '/images/weimar_new_woman_1920s.jpg';
            s.title = 'Source A: The "New Woman" of the Golden Twenties in Berlin (c. 1926)';
            s.caption =
              'A fashionable young German woman in Berlin sporting the signature short bob hairstyle (Bubikopf), modern apparel, and smoking in public, embodying the emancipated "New Woman" of the Weimar era.';
            s.citation = 'Ullstein Bild Agency / Berlin archive, c. 1926.';
            s.context = 'Contemporary photograph of a modern Weimar woman in Berlin, mid-1920s.';
            s.hinge_question =
              "To what extent did the fashionable image of the 'New Woman' represent the lived reality of ordinary German women outside the capital city of Berlin?";
          };
          if (b.sources) b.sources.forEach(patchSourceA);
          if (b.source) patchSourceA(b.source);
        }
        if (
          bi === 3 ||
          (b.title &&
            (b.title.includes('Neue Sachlichkeit') ||
              b.title.includes('Cinema') ||
              b.title.includes('Cabaret')))
        ) {
          const patchSourceC = (s) => {
            s.image = '/images/weimar_berlin_cabaret_1931.jpg';
            s.src = '/images/weimar_berlin_cabaret_1931.jpg';
            s.source = '/images/weimar_berlin_cabaret_1931.jpg';
            s.title =
              'Source C: Tanzkabarett (Dance Cabaret) at the Europahaus in Berlin (c. 1930)';
            s.caption =
              'Patrons enjoying music, dance, and nightlife at the prestigious Europahaus dance cabaret in Berlin, illustrating the vibrant cultural nightlife and modernist lifestyle of the Golden Twenties.';
            s.citation = 'Bundesarchiv Bild 145 Bild-P062899, c. 1930.';
            s.context =
              'Official archive photograph capturing the vibrant nightlife and cabaret entertainment at the Europahaus in central Berlin during the Weimar Golden Twenties.';
            s.hinge_question =
              'How did the explosion of artistic freedom and cosmopolitan nightlife in Weimar Berlin contribute to deeper cultural and political divisions across Germany?';
          };
          if (b.sources) b.sources.forEach(patchSourceC);
          if (b.source) patchSourceC(b.source);
        }
      });
    }
  }

  // Lesson 5: Hitler speech gestures
  if (l.id === 'lesson_2_1') {
    if (l.sources) {
      const sC = l.sources.find((s) => s.id === 'source_c_hitler_speaking_munich');
      if (sC) {
        sC.image = '/images/hitler_rednerposen_oratory_1927.jpg';
        sC.src = '/images/hitler_rednerposen_oratory_1927.jpg';
        sC.source = '/images/hitler_rednerposen_oratory_1927.jpg';
        sC.title =
          'Source C: Adolf Hitler Rehearsing Theatrical Speech Gestures (Heinrich Hoffmann, 1927)';
        sC.caption =
          'Photographic study by Heinrich Hoffmann showing Adolf Hitler practicing dramatic rhetorical gestures, body language, and facial expressions in 1927 to maximize emotional manipulation in his speeches.';
        sC.desc =
          'Contact sheet of photographs by Heinrich Hoffmann of Hitler rehearsing speech poses (Rednerposen), 1927.';
        sC.provenance =
          'Bundesarchiv Bild 102-10460, Heinrich Hoffmann Photographic Studio, Munich, 1927.';
        sC.citation = 'Bundesarchiv Bild 102-10460, Heinrich Hoffmann, 1927.';
        sC.context =
          'Famous photographic contact sheet taken by personal photographer Heinrich Hoffmann in 1927, capturing Hitler rehearsing rhetorical gestures to phonograph recordings of his own speeches.';
        sC.source_context =
          'Famous photographic contact sheet taken by personal photographer Heinrich Hoffmann in 1927, capturing Hitler rehearsing rhetorical gestures to phonograph recordings of his own speeches. Hinge Question: Why was Adolf Hitler’s calculated oratorical style so decisive in enabling him to demand absolute dictatorial leadership (Führerprinzip) over the Nazi Party by July 1921?';
      }
    }
    if (l.teacher_notes && l.teacher_notes.source_context) {
      l.teacher_notes.source_context['Source C'] =
        'Famous photographic contact sheet taken by personal photographer Heinrich Hoffmann in 1927, capturing Hitler rehearsing rhetorical gestures to phonograph recordings of his own speeches. Hinge Question: Why was Adolf Hitler’s calculated oratorical style so decisive in enabling him to demand absolute dictatorial leadership (Führerprinzip) over the Nazi Party by July 1921?';
    }
    if (l.narrative_blocks) {
      l.narrative_blocks.forEach((b) => {
        const checkAndPatch = (s) => {
          if (!s) return;
          if (
            s.image === '/images/hitler_munich_1920s.jpg' ||
            (s.title && s.title.includes('Hitler Addressing a Munich Beer Hall'))
          ) {
            s.image = '/images/hitler_rednerposen_oratory_1927.jpg';
            s.src = '/images/hitler_rednerposen_oratory_1927.jpg';
            s.source = '/images/hitler_rednerposen_oratory_1927.jpg';
            s.title =
              'Source C: Adolf Hitler Rehearsing Theatrical Speech Gestures (Heinrich Hoffmann, 1927)';
            s.caption =
              'Photographic study by Heinrich Hoffmann showing Adolf Hitler practicing dramatic rhetorical gestures, body language, and facial expressions in 1927 to maximize emotional manipulation in his speeches.';
            s.citation = 'Bundesarchiv Bild 102-10460, Heinrich Hoffmann, 1927.';
            s.context =
              'Famous photographic contact sheet taken by personal photographer Heinrich Hoffmann in 1927, capturing Hitler rehearsing rhetorical gestures to phonograph recordings of his own speeches.';
            s.hinge_question =
              'Why was Adolf Hitler’s calculated oratorical style so decisive in enabling him to demand absolute dictatorial leadership (Führerprinzip) over the Nazi Party by July 1921?';
          }
        };
        if (b.sources) b.sources.forEach(checkAndPatch);
        if (b.source) checkAndPatch(b.source);
      });
    }
  }

  // Lesson 8: Hitler & Papen conservative cabinet photo
  if (l.id === 'lesson_2_4') {
    if (l.sources) {
      const sA = l.sources.find((s) => s.id === 'source_a_papen_hitler_cartoon');
      if (sA) {
        sA.image = '/images/papen_hitler_cartoon.jpg';
        sA.src = '/images/papen_hitler_cartoon.jpg';
        sA.source = '/images/papen_hitler_cartoon.jpg';
        sA.title =
          'Source A: Chancellor Adolf Hitler and Vice-Chancellor Franz von Papen with the Conservative Cabinet (March 1933)';
        sA.caption =
          "Adolf Hitler in morning dress walking alongside Vice-Chancellor Franz von Papen and aristocratic conservative cabinet members in top hats, reflecting Papen's coalition designed to contain Hitler.";
        sA.desc =
          'Photograph of Adolf Hitler, Franz von Papen, and conservative cabinet members in top hats walking from the Garrison Church, March 1933.';
        sA.provenance =
          'Narodowe Archiwum Cyfrowe (NAC) / Bundesarchiv Bild 183-C0314, Potsdam/Berlin, March 1933.';
        sA.citation = 'NAC / Bundesarchiv Bild 183-C0314, March 1933.';
        sA.context =
          'Contemporary photograph of Chancellor Adolf Hitler and Vice-Chancellor Franz von Papen walking alongside conservative coalition ministers following the Day of Potsdam, March 1933.';
        sA.source_context =
          'Contemporary photograph of Chancellor Adolf Hitler and Vice-Chancellor Franz von Papen walking alongside conservative coalition ministers following the Day of Potsdam, March 1933. Hinge Question: Why did Franz von Papen’s boast that "Within two months we will have pushed Hitler so far into a corner that he will squeak" prove to be such a catastrophic miscalculation?';
        sA.utility_enquiry = {
          question:
            'How useful is Source A for an enquiry into the political intrigue that led to Adolf Hitler becoming Chancellor in 1933?',
          content_inferences:
            'Shows Hitler dressed formally alongside Vice-Chancellor Franz von Papen and conservative ministers, demonstrating the tactical compromise between the Nazi movement and traditional conservative elites.',
          provenance_evaluation:
            "An authentic press photograph documenting the formal partnership between Hitler and Papen's conservative bloc following the Day of Potsdam, March 1933.",
          context_limitations:
            'While the photograph captures the outward image of conservative control, own knowledge reveals that within weeks Hitler used the Reichstag Fire and the Enabling Act to thoroughly outmaneuver Papen and establish complete dictatorial power.',
        };
      }
    }
    if (l.teacher_notes && l.teacher_notes.source_context) {
      l.teacher_notes.source_context['Source A'] =
        'Contemporary photograph of Chancellor Adolf Hitler and Vice-Chancellor Franz von Papen walking alongside conservative coalition ministers following the Day of Potsdam, March 1933. Hinge Question: Why did Franz von Papen’s boast that "Within two months we will have pushed Hitler so far into a corner that he will squeak" prove to be such a catastrophic miscalculation?';
    }
    if (l.narrative_blocks) {
      l.narrative_blocks.forEach((b) => {
        const checkAndPatch = (s) => {
          if (!s) return;
          if (
            s.image === '/images/papen_hitler_cartoon.jpg' ||
            (s.title && s.title.includes('Shrewd Move'))
          ) {
            s.title =
              'Source A: Chancellor Adolf Hitler and Vice-Chancellor Franz von Papen with the Conservative Cabinet (March 1933)';
            s.caption =
              "Adolf Hitler in morning dress walking alongside Vice-Chancellor Franz von Papen and aristocratic conservative cabinet members in top hats, reflecting Papen's coalition designed to contain Hitler.";
            s.citation = 'NAC / Bundesarchiv Bild 183-C0314, March 1933.';
            s.context =
              'Contemporary photograph of Chancellor Adolf Hitler and Vice-Chancellor Franz von Papen walking alongside conservative coalition ministers following the Day of Potsdam, March 1933.';
            s.hinge_question =
              "Why did Franz von Papen’s boast that 'Within two months we will have pushed Hitler so far into a corner that he will squeak' prove to be such a catastrophic miscalculation?";
          }
        };
        if (b.sources) b.sources.forEach(checkAndPatch);
        if (b.source) checkAndPatch(b.source);
      });
    }
  }

  // Lesson 12: Edelweiss Pirates mural
  if (l.id === 'lesson_3_4') {
    if (l.sources) {
      const sA = l.sources.find((s) => s.id === 'source_a_edelweiss_pirates');
      if (sA) {
        sA.image = '/images/edelweiss_pirates_cologne_mural.jpg';
        sA.src = '/images/edelweiss_pirates_cologne_mural.jpg';
        sA.source = '/images/edelweiss_pirates_cologne_mural.jpg';
        sA.title =
          'Source A: Memorial Mural to the Edelweiss Pirates at Cologne-Ehrenfeld (Bartholomäus-Schink-Straße)';
        sA.caption =
          'Mural at the historic Cologne-Ehrenfeld railway arches commemorating the Edelweiss Pirates (Edelweißpiraten), depicting youth resistance symbols including guitars, alpine flowers, and the execution site of teenage resisters in November 1944.';
        sA.desc =
          'Memorial mural to the Edelweiss Pirates at the historic railway arches in Cologne-Ehrenfeld, Bartholomäus-Schink-Straße.';
        sA.provenance =
          'Memorial site, Bartholomäus-Schink-Straße, Cologne-Ehrenfeld / NS-Documentation Centre of the City of Cologne (EL-DE Haus).';
        sA.citation = 'Bartholomäus-Schink-Straße Memorial, Cologne-Ehrenfeld.';
        sA.context =
          'Commemorative mural painted directly upon the railway brick wall in Cologne-Ehrenfeld where thirteen members of the Ehrenfeld Group and Edelweiss Pirates were publicly hanged by the Gestapo without trial on 10 November 1944.';
        sA.source_context =
          'Commemorative mural painted upon the historic Cologne-Ehrenfeld railway wall where thirteen members of the Edelweiss Pirates and Ehrenfeld Group were publicly executed by the Gestapo in November 1944. Hinge Question: Why did working-class youth rebellion like the Edelweiss Pirates alarm the Gestapo far more than quiet discontent among older adults?';
        sA.utility_enquiry = {
          question:
            'How useful is Source A for an enquiry into the nature and extent of youth opposition in Nazi Germany before the Second World War?',
          content_inferences:
            'Depicts the core symbols of Edelweiss Pirates youth resistance—guitars for forbidden folk songs, hiking gear, and edelweiss badges—showing how working-class teenagers carved out defiant cultural independence away from the compulsory Hitler Youth.',
          provenance_evaluation:
            'A permanent public historical memorial at the authentic execution site where Barthel Schink and other teenage resisters were hanged in Cologne-Ehrenfeld, preserving local communal memory and honoring youth resistance to Nazi totalitarianism.',
          context_limitations:
            'While the memorial highlights the bravery and cultural symbols of the Pirates, own knowledge reminds us that youth opposition remained localized, informal, and lacked a centralized political command structure capable of overthrowing the regime.',
        };
      }
    }
    if (l.teacher_notes && l.teacher_notes.source_context) {
      l.teacher_notes.source_context['Source A'] =
        'Commemorative mural painted upon the historic Cologne-Ehrenfeld railway wall where thirteen members of the Edelweiss Pirates and Ehrenfeld Group were publicly executed by the Gestapo in November 1944. Hinge Question: Why did working-class youth rebellion like the Edelweiss Pirates alarm the Gestapo far more than quiet discontent among older adults?';
    }
    if (l.narrative_blocks) {
      l.narrative_blocks.forEach((b) => {
        const checkAndPatch = (s) => {
          if (!s) return;
          if (
            s.image === '/images/edelweiss_pirates_graffiti.jpg' ||
            (s.title && s.title.includes('Edelweiss Pirates'))
          ) {
            s.image = '/images/edelweiss_pirates_cologne_mural.jpg';
            s.src = '/images/edelweiss_pirates_cologne_mural.jpg';
            s.source = '/images/edelweiss_pirates_cologne_mural.jpg';
            s.title =
              'Source A: Memorial Mural to the Edelweiss Pirates at Cologne-Ehrenfeld (Bartholomäus-Schink-Straße)';
            s.caption =
              'Mural at the historic Cologne-Ehrenfeld railway arches commemorating the Edelweiss Pirates (Edelweißpiraten), depicting youth resistance symbols including guitars, alpine flowers, and the execution site of teenage resisters in November 1944.';
            s.citation = 'Bartholomäus-Schink-Straße Memorial, Cologne-Ehrenfeld.';
            s.context =
              'Commemorative mural painted directly upon the railway brick wall in Cologne-Ehrenfeld where thirteen members of the Ehrenfeld Group and Edelweiss Pirates were publicly hanged by the Gestapo without trial on 10 November 1944.';
            s.hinge_question =
              'Why did working-class youth rebellion like the Edelweiss Pirates alarm the Gestapo far more than quiet discontent among older adults?';
          }
        };
        if (b.sources) b.sources.forEach(checkAndPatch);
        if (b.source) checkAndPatch(b.source);
      });
    }
  }

  // Lesson 14: BDM gymnastics
  if (l.id === 'lesson_4_2') {
    if (l.sources) {
      const sB = l.sources.find((s) => s.id === 'source_b_bdm_gymnastics');
      if (sB) {
        sB.image = '/images/bdm_gymnastics_vorfuhrung.jpg';
        sB.src = '/images/bdm_gymnastics_vorfuhrung.jpg';
        sB.source = '/images/bdm_gymnastics_vorfuhrung.jpg';
        sB.title =
          'Source B: Bund Deutscher Mädel (BDM) Girls Performing Synchronised Gymnastics (c. 1936)';
        sB.caption =
          'Girls of the League of German Girls (Bund Deutscher Mädel) in uniform white shirts and black gym shorts performing synchronized physical exercises in the open air.';
        sB.desc =
          'Official archive photograph showing BDM girls engaged in synchronized outdoor gymnastics and calisthenics demonstrations, c. 1936.';
        sB.provenance =
          'Bundesarchiv Bild 183-2000-0110-500, BDM-Mädchen bei Sportvorführungen, c. 1936.';
        sB.citation = 'Bundesarchiv Bild 183-2000-0110-500, c. 1936.';
        sB.context =
          'Official archive photograph showing BDM girls engaged in synchronized outdoor gymnastics and calisthenics demonstrations, c. 1936.';
        sB.source_context =
          'Official archive photograph showing BDM girls engaged in synchronized outdoor gymnastics and calisthenics demonstrations, c. 1936. Hinge Question: Why did the Nazi regime place such intense emphasis on physical fitness and outdoor gymnastics for young girls in the BDM?';
      }
    }
    if (l.teacher_notes && l.teacher_notes.source_context) {
      l.teacher_notes.source_context['Source B'] =
        'Official archive photograph showing BDM girls engaged in synchronized outdoor gymnastics and calisthenics demonstrations, c. 1936. Hinge Question: Why did the Nazi regime place such intense emphasis on physical fitness and outdoor gymnastics for young girls in the BDM?';
    }
    if (l.narrative_blocks) {
      l.narrative_blocks.forEach((b) => {
        const checkAndPatch = (s) => {
          if (!s) return;
          if (
            s.image === '/images/bdm_gymnastics.jpg' ||
            (s.title && s.title.includes('BDM') && s.title.includes('Gymnastics'))
          ) {
            s.image = '/images/bdm_gymnastics_vorfuhrung.jpg';
            s.src = '/images/bdm_gymnastics_vorfuhrung.jpg';
            s.source = '/images/bdm_gymnastics_vorfuhrung.jpg';
            s.title =
              'Source B: Bund Deutscher Mädel (BDM) Girls Performing Synchronised Gymnastics (c. 1936)';
            s.caption =
              'Girls of the League of German Girls (Bund Deutscher Mädel) in uniform white shirts and black gym shorts performing synchronized physical exercises in the open air.';
            s.citation = 'Bundesarchiv Bild 183-2000-0110-500, c. 1936.';
            s.context =
              'Official archive photograph showing BDM girls engaged in synchronized outdoor gymnastics and calisthenics demonstrations, c. 1936.';
            s.hinge_question =
              'Why did the Nazi regime place such intense emphasis on physical fitness and outdoor gymnastics for young girls in the BDM?';
          }
        };
        if (b.sources) b.sources.forEach(checkAndPatch);
        if (b.source) checkAndPatch(b.source);
      });
    }
  }

  // Ensure complete synchronization between l.sources and l.narrative_blocks
  if (l.narrative_blocks && l.sources) {
    l.narrative_blocks.forEach((b, bi) => {
      const syncBlockSource = (target) => {
        if (!target) return;
        // In lesson_1_4, force bi === 1 to source_a_new_woman and bi === 3 to source_c_golden_twenties_art
        let matched = null;
        if (l.id === 'lesson_1_4' && bi === 1) {
          matched = l.sources.find((s) => s.id === 'source_a_new_woman');
        } else if (l.id === 'lesson_1_4' && bi === 3) {
          matched = l.sources.find((s) => s.id === 'source_c_golden_twenties_art');
        } else {
          matched =
            l.sources.find((s) => s.id === target.id) ||
            l.sources.find(
              (s) =>
                s.letter && target.letter && s.letter.toUpperCase() === target.letter.toUpperCase(),
            ) ||
            l.sources.find(
              (s) =>
                s.title &&
                target.title &&
                (s.title.includes(target.title) || target.title.includes(s.title)),
            );
        }
        if (matched) {
          target.id = matched.id;
          target.letter = matched.letter;
          target.title = matched.title;
          target.image = matched.image;
          target.src = matched.src || matched.image;
          target.source = matched.source || matched.image;
          target.caption = matched.caption;
          target.desc = matched.desc;
          target.citation = matched.citation;
          target.provenance = matched.provenance;
          target.context = matched.context;
          target.source_context = matched.source_context;
          target.hinge_question = matched.hinge_question;
          target.utility_enquiry = matched.utility_enquiry;
        }
      };
      if (b.sources) b.sources.forEach(syncBlockSource);
      if (b.source) syncBlockSource(b.source);
    });
  }
});

// 3. Patch key_individuals
if (unit.key_individuals) {
  unit.key_individuals.forEach((ind) => {
    if (ind.name === 'Anna Lehnkering') {
      ind.image = '/images/weimar_individuals/anna_lehnkering.jpg';
    }
    if (ind.name === 'Benito Mussolini') {
      ind.image = '/images/weimar_individuals/benito_mussolini.jpg';
    }
    if (ind.name === 'Gustav von Kahr') {
      ind.image = '/images/weimar_individuals/gustav_von_kahr.jpg';
    }
    if (ind.name === 'Hans von Seisser') {
      ind.image = '/images/weimar_individuals/hans_von_seisser.jpg';
    }
    if (ind.name.includes('Fulbrook')) {
      ind.image = '/images/mary_fulbrook.jpg';
    }
  });

  if (!unit.key_individuals.find((k) => k.name === 'William L. Shirer')) {
    unit.key_individuals.push({
      name: 'William L. Shirer',
      role: 'American Foreign Correspondent & Historian',
      bio: "An American journalist who reported from Berlin from 1934 to 1940, witnessing the Nuremberg rallies, Hitler's speeches, and the rise of Nazi totalitarianism firsthand.",
      actions:
        "<ul><li>Author of the seminal monumental histories 'Berlin Diary' (1941) and 'The Rise and Fall of the Third Reich' (1960).</li><li>Provided invaluable primary eyewitness documentation of public mood and Gestapo intimidation in Berlin.</li></ul>",
      achievements: 'Focus: Primary Eyewitness Journalism & Totalitarian Collapse',
      group: 'Historians',
      image: '/images/william_l_shirer.jpg',
      limitations: [
        'Wrote with strong personal outrage as an eyewitness journalist rather than detached academic distance',
      ],
      quotes: [
        'I was on the scene in Germany from 1934 to the end of 1940 and observed at firsthand the machinery of totalitarian dictatorship.',
      ],
    });
  }
}

// 4. Serialize with standard exports
const serialized = `const unitData = ${JSON.stringify(unit, null, 2)};

export default unitData;
export { unitData };
if (typeof module !== 'undefined' && module.exports) {
  module.exports = unitData;
}
`;

fs.writeFileSync(unitDataPath, serialized, 'utf8');
fs.writeFileSync(publicDataPath, serialized, 'utf8');
console.log('✅ Updated unit data saved to:');
console.log('  -', unitDataPath);
console.log('  -', publicDataPath);

// 5. Build Master Rights Database entries for all 39 Weimar sources
const masterRightsPath = path.join(__dirname, 'master_rights_database.json');
const masterDb = JSON.parse(fs.readFileSync(masterRightsPath, 'utf8'));

const weimarSources = [
  // Lesson 1: KT1.1
  {
    lesson_num: 1,
    lesson_title: 'KT1.1: The Origins of the Republic, 1918–1919',
    source_id: 'Source A',
    artifact_title: 'Mutiny of German Sailors at Kiel',
    date: 'October–November 1918',
    creator: 'German Naval / Imperial Press Photographer',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-J0908-0600-002',
    rights_status: 'Public Domain (Pre-1925 Official Photograph / Excluded from Copyright)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-J0908-0600-002,_Kieler_Matrosenaufstand.jpg',
  },
  {
    lesson_num: 1,
    lesson_title: 'KT1.1: The Origins of the Republic, 1918–1919',
    source_id: 'Source B',
    artifact_title: 'Armed Workers and Soldiers in Berlin during the German Revolution',
    date: 'November 1918',
    creator: 'German Press Photographer',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-B24522',
    rights_status: 'Public Domain (Pre-1925 Official Photograph)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-B24522,_Berlin,_Novemberrevolution,_Brandenburger_Tor.jpg',
  },
  {
    lesson_num: 1,
    lesson_title: 'KT1.1: The Origins of the Republic, 1918–1919',
    source_id: 'Source C',
    artifact_title: 'Opening Session of the National Assembly in Weimar',
    date: 'February 1919',
    creator: 'Louis Held (Official Assembly Photographer)',
    repository: 'German Federal Archives (Bundesarchiv) / ThHStA Weimar',
    accession_id: 'Bundesarchiv Bild 183-R1210-502',
    rights_status: 'Public Domain (Pre-1925 Photograph)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-R1210-502,_Weimar,_Nationalversammlung,_Er%C3%B6ffnung.jpg',
  },

  // Lesson 2: KT1.2
  {
    lesson_num: 2,
    lesson_title: 'KT1.2: Early Challenges to the Republic, 1919–1923',
    source_id: 'Source A',
    artifact_title: 'The "Stab in the Back" (Dolchstoßlegende) Austrian Nationalist Postcard',
    date: 'March 1919',
    creator: 'Austrian / German Nationalist Propaganda Agency',
    repository: 'Austrian National Library (ÖNB) / Imperial War Museum',
    accession_id: 'ÖNB Bildarchiv Inv.-Nr. Pk 3002, 335 / IWM Q 107986',
    rights_status: 'Public Domain (Published 1919 without copyright notice)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Stab-in-the-back_postcard.jpg',
  },
  {
    lesson_num: 2,
    lesson_title: 'KT1.2: Early Challenges to the Republic, 1919–1923',
    source_id: 'Source B',
    artifact_title: 'Freikorps Soldiers of Marinebrigade Ehrhardt during the Kapp Putsch in Berlin',
    date: 'March 1920',
    creator: 'German Press Photographer',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-J0305-0600-003',
    rights_status: 'Public Domain (Pre-1925 Official News Photograph)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-J0305-0600-003,_Kapp-Putsch,_Berlin.jpg',
  },
  {
    lesson_num: 2,
    lesson_title: 'KT1.2: Early Challenges to the Republic, 1919–1923',
    source_id: 'Source C',
    artifact_title: 'A One-Trillion-Mark Banknote Issued during Hyperinflation',
    date: '5 November 1923',
    creator: 'Reichsbankdruckerei Berlin',
    repository: 'German Federal Archives (Bundesarchiv) Numismatic Collection',
    accession_id: 'Bundesarchiv R 2501 / Eine Billion Mark (5. Nov. 1923)',
    rights_status: 'Public Domain (Official German Government Currency)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:1_Billion_Mark_1923-11-05.jpg',
  },

  // Lesson 3: KT1.3
  {
    lesson_num: 3,
    lesson_title: 'KT1.3: The Recovery of the Republic, 1924–1929',
    source_id: 'Source A',
    artifact_title: 'The 1-Rentenmark Banknote Halting Hyperinflation',
    date: '1 November 1923',
    creator: 'Deutsche Rentenbank, Berlin',
    repository: 'German Federal Archives (Bundesarchiv) Numismatic Collection',
    accession_id: 'Deutsche Rentenbank Berlin Serie A / 1 Rentenmark (1. Nov. 1923)',
    rights_status: 'Public Domain (Official German State Banknote / Section 5 UrhG)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:1_Rentenmark_1923.jpg',
  },
  {
    lesson_num: 3,
    lesson_title: 'KT1.3: The Recovery of the Republic, 1924–1929',
    source_id: 'Source B',
    artifact_title: 'Gustav Stresemann at the Locarno Conference',
    date: 'October 1925',
    creator: 'Associated Press / Swiss Federal Archives',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-R03618',
    rights_status: 'Public Domain (Pre-1928 International Press Photograph)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-R03618,_Locarno,_Konferenz,_Stresemann,_Chamberlain,_Briand.jpg',
  },
  {
    lesson_num: 3,
    lesson_title: 'KT1.3: The Recovery of the Republic, 1924–1929',
    source_id: 'Source C',
    artifact_title: 'Gustav Stresemann Addressing the League of Nations in Geneva',
    date: '10 September 1926',
    creator: 'League of Nations Official Secretariat',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz / League of Nations Archives',
    accession_id: 'Bundesarchiv Bild 146-1988-101-12',
    rights_status: 'Public Domain (League of Nations Official Proceedings)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_146-1988-101-12,_Genf,_V%C3%B6lkerbund,_Rede_Stresemann.jpg',
  },

  // Lesson 4: KT1.4
  {
    lesson_num: 4,
    lesson_title: 'KT1.4: Changes in Society, 1924–1929',
    source_id: 'Source A',
    artifact_title: 'The "New Woman" of the Golden Twenties in Berlin',
    date: 'c. 1926',
    creator: 'Ullstein Bild Agency',
    repository: 'Ullstein Bild / Landesarchiv Berlin',
    accession_id: 'Ullstein Bild Nr. 00028914',
    rights_status: 'Educational Fair Dealing / CDPA 1988 (Section 30)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Weimar_new_woman.jpg',
  },
  {
    lesson_num: 4,
    lesson_title: 'KT1.4: Changes in Society, 1924–1929',
    source_id: 'Source B',
    artifact_title: 'The Bauhaus Architectural Complex in Dessau',
    date: '1925–1926',
    creator: 'Lucia Moholy (Bauhaus Photographer)',
    repository: 'Bauhaus-Archiv Berlin / Stiftung Bauhaus Dessau',
    accession_id: 'Bauhaus-Archiv Inventar 1926-BA-044',
    rights_status: 'Public Domain (Architectural exterior work pre-1928)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Bauhaus_Dessau_Werkstattfluegel_1926.jpg',
  },
  {
    lesson_num: 4,
    lesson_title: 'KT1.4: Changes in Society, 1924–1929',
    source_id: 'Source C',
    artifact_title: 'Tanzkabarett (Dance Cabaret) at the Europahaus in Berlin',
    date: 'c. 1930',
    creator: 'German Press Agency / Bundesarchiv',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 145 Bild-P062899',
    rights_status: 'Public Domain (Bundesarchiv / Wikimedia Commons CC-BY-SA 3.0 DE)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_145_Bild-P062899,_Berlin,_Tanzkabarett_im_Europahaus.jpg',
  },

  // Lesson 5: KT2.1
  {
    lesson_num: 5,
    lesson_title: 'KT2.1: The Early Development of the Nazi Party, 1919–1922',
    source_id: 'Source A',
    artifact_title: 'Anton Drexler, Founder of the German Workers’ Party (DAP)',
    date: 'c. 1920',
    creator: 'Munich Police Department / Press',
    repository: 'Munich City Archive (Stadtarchiv München)',
    accession_id: 'Stadtarchiv München Pol. Dir. 1142',
    rights_status: 'Public Domain (Official German Police Record Pre-1925)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Anton_Drexler.jpg',
  },
  {
    lesson_num: 5,
    lesson_title: 'KT2.1: The Early Development of the Nazi Party, 1919–1922',
    source_id: 'Source B',
    artifact_title: 'The 25-Point Programme of the NSDAP',
    date: '24 February 1920',
    creator: 'Adolf Hitler and Anton Drexler (NSDAP)',
    repository: 'Library of Congress / German Federal Archives',
    accession_id: 'LoC Pamphlet Collection JN3970.N3 A5 1920 / BArch Plak 003-011-023',
    rights_status: 'Public Domain (Political manifesto published 1920 without copyright)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:25-Punkte-Programm_der_NSDAP.jpg',
  },
  {
    lesson_num: 5,
    lesson_title: 'KT2.1: The Early Development of the Nazi Party, 1919–1922',
    source_id: 'Source C',
    artifact_title: 'Adolf Hitler Rehearsing Theatrical Speech Gestures',
    date: '1927',
    creator: 'Heinrich Hoffmann (Photographer)',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 102-10460 (Rednerposen)',
    rights_status: 'Public Domain (German Federal Archives / US Seized Enemy Records)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_102-10460,_Adolf_Hitler,_Rednerposen.jpg',
  },

  // Lesson 6: KT2.2
  {
    lesson_num: 6,
    lesson_title: 'KT2.2: The Munich Putsch and the Lean Years, 1923–1929',
    source_id: 'Source A',
    artifact_title: 'Defendants at the Munich Putsch Treason Trial',
    date: 'April 1924',
    creator: 'Heinrich Hoffmann / Georg Pahl (Presse-Illustrationen Hoffmann)',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 102-00344A',
    rights_status: 'Public Domain (Pre-1925 German Press Photograph)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_102-00344A,_M%C3%BCnchen,_Hitler-Prozess.jpg',
  },
  {
    lesson_num: 6,
    lesson_title: 'KT2.2: The Munich Putsch and the Lean Years, 1923–1929',
    source_id: 'Source B',
    artifact_title: 'Adolf Hitler in Landsberg Prison Cell',
    date: '1924',
    creator: 'Heinrich Hoffmann (Photographer)',
    repository: 'Bavarian Main State Archives (Bayerisches Hauptstaatsarchiv)',
    accession_id: 'BayHStA StK 11334 / Hoffmann 1924',
    rights_status: 'Public Domain (German Pre-1925 Photograph)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Adolf_Hitler_in_Landsberg_Prison_1924.jpg',
  },

  // Lesson 7: KT2.3
  {
    lesson_num: 7,
    lesson_title: 'KT2.3: The Growth of Nazi Support, 1929–1932',
    source_id: 'Source A',
    artifact_title: 'Long Queues Outside the Berlin Labour Exchange during the Great Depression',
    date: 'c. 1931',
    creator: 'Bundesarchiv Press Photographer',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-B0527-0001-020',
    rights_status: 'Public Domain (Bundesarchiv / CC-BY-SA 3.0 DE)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-B0527-0001-020,_Berlin,_Arbeitsamt_Gormannstra%C3%9Fe.jpg',
  },
  {
    lesson_num: 7,
    lesson_title: 'KT2.3: The Growth of Nazi Support, 1929–1932',
    source_id: 'Source B',
    artifact_title: '"Our Last Hope: Hitler" Nazi Election Poster',
    date: '1932',
    creator: 'Mjölnir (Hans Schweitzer)',
    repository: 'Deutsches Historisches Museum (DHM), Berlin',
    accession_id: 'DHM Plakatsammlung P 62/831',
    rights_status: 'Educational Fair Dealing / CDPA 1988 (Section 30)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Unsere_letzte_Hoffnung_Hitler_1932.jpg',
  },

  // Lesson 8: KT2.4
  {
    lesson_num: 8,
    lesson_title: 'KT2.4: How Hitler Became Chancellor, 1932–1933',
    source_id: 'Source A',
    artifact_title:
      'Chancellor Adolf Hitler and Vice-Chancellor Franz von Papen with the Conservative Cabinet',
    date: 'March 1933',
    creator: 'National Digital Archive / Bundesarchiv',
    repository: 'Narodowe Archiwum Cyfrowe (NAC) / Bundesarchiv',
    accession_id: 'NAC Sygnatura 3/1/0/9/134 / Bundesarchiv Bild 183-C0314',
    rights_status: 'Public Domain (NAC Open Public Archive / CC0 / Bundesarchiv)',
    commercial_use_permitted: true,
    source_url: 'https://audiovis.nac.gov.pl/obraz/134/',
  },
  {
    lesson_num: 8,
    lesson_title: 'KT2.4: How Hitler Became Chancellor, 1932–1933',
    source_id: 'Source B',
    artifact_title: 'President Paul von Hindenburg and Chancellor Adolf Hitler (Day of Potsdam)',
    date: '21 March 1933',
    creator: 'Associated Press / Bundesarchiv',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-S38324',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-S38324,_Potsdam,_Tag_von_Potsdam,_Hindenburg,_Hitler.jpg',
  },

  // Lesson 9: KT3.1
  {
    lesson_num: 9,
    lesson_title: 'KT3.1: The Creation of a Dictatorship, 1933–1934',
    source_id: 'Source A',
    artifact_title: 'The Gutted Shell of the Reichstag Fire',
    date: '28 February 1933',
    creator: 'Georg Pahl (Presse-Illustrationen Hoffmann)',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 102-14373',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_102-14373,_Berlin,_Reichstagsbrand.jpg',
  },
  {
    lesson_num: 9,
    lesson_title: 'KT3.1: The Creation of a Dictatorship, 1933–1934',
    source_id: 'Source B',
    artifact_title: 'The Reichstag Voting on the Enabling Act in the Kroll Opera House',
    date: '23 March 1933',
    creator: 'Georg Pahl (Presse-Illustrationen Hoffmann)',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 102-14439',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_102-14439,_Berlin,_Krolloper,_Reichstagssitzung.jpg',
  },

  // Lesson 10: KT3.2
  {
    lesson_num: 10,
    lesson_title: 'KT3.2: The Police State and Religion, 1933–1939',
    source_id: 'Source A',
    artifact_title: 'Roll Call of Political Prisoners at Dachau Concentration Camp',
    date: '1933',
    creator: 'SS Camp Administration / Propaganda',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 152-01-26',
    rights_status: 'Public Domain (US Seized Enemy War Records / Bundesarchiv)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_152-01-26,_KZ_Dachau,_Appell.jpg',
  },
  {
    lesson_num: 10,
    lesson_title: 'KT3.2: The Police State and Religion, 1933–1939',
    source_id: 'Source B',
    artifact_title: 'Signing of the Reichskonkordat at the Vatican',
    date: '20 July 1933',
    creator: "Vatican Secret Archives / L'Osservatore Romano",
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-R24391',
    rights_status: 'Public Domain (Historical Diplomatic Treaty Photograph)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-R24391,_Rom,_Vatikan,_Abschluss_des_Reichskonkordats.jpg',
  },

  // Lesson 11: KT3.3
  {
    lesson_num: 11,
    lesson_title: 'KT3.3: Controlling and Influencing Attitudes, 1933–1939',
    source_id: 'Source A',
    artifact_title: 'The Volksempfänger VE301 "People’s Receiver" Radio',
    date: '1933',
    creator: 'Reichspropagandaministerium / Gemeinschaftsempfänger',
    repository: 'Science Museum Group (SMG) / Collections Online',
    accession_id: 'SMG Object No. 1978-433',
    rights_status: 'Educational Fair Dealing / CDPA 1988 (Section 30)',
    commercial_use_permitted: true,
    source_url:
      'https://collection.sciencemuseumgroup.org.uk/objects/co8414441/volksempfanger-ve301-radio-receiver-radio-receiver',
  },
  {
    lesson_num: 11,
    lesson_title: 'KT3.3: Controlling and Influencing Attitudes, 1933–1939',
    source_id: 'Source B',
    artifact_title: 'Mass Rally at the Nuremberg Zeppelin Field',
    date: 'c. 1935',
    creator: 'Heinrich Hoffmann / Albert Speer Design',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-C12701',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-C12701,_N%C3%BCrnberg,_Reichsparteitag,_Zeppelinfeld.jpg',
  },
  {
    lesson_num: 11,
    lesson_title: 'KT3.3: Controlling and Influencing Attitudes, 1933–1939',
    source_id: 'Source C',
    artifact_title: 'Jesse Owens on the Medal Podium at the 1936 Berlin Olympics',
    date: 'August 1936',
    creator: 'Associated Press Staff',
    repository: 'Library of Congress Prints and Photographs Division',
    accession_id: 'LoC Prints and Photographs Division LC-USZ62-111153',
    rights_status: 'Public Domain (No copyright renewal recorded in US Copyright Office)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Jesse_Owens_podium_1936.jpg',
  },

  // Lesson 12: KT3.4
  {
    lesson_num: 12,
    lesson_title: 'KT3.4: Opposition, Resistance and Conformity, 1933–1939',
    source_id: 'Source A',
    artifact_title: 'Memorial Mural to the Edelweiss Pirates at Cologne-Ehrenfeld',
    date: 'Bartholomäus-Schink-Straße Memorial',
    creator: 'Cologne Youth Resistance Memorial Initiative',
    repository: 'NS-Documentation Centre of the City of Cologne (EL-DE Haus)',
    accession_id: 'EL-DE Haus Memorial Registry Ehrenfeld 1944-BS',
    rights_status: 'Creative Commons CC-BY-SA / Educational Fair Dealing',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Gedenkst%C3%A4tte_f%C3%BCr_die_Opfer_der_Gestapo_in_K%C3%B6ln-Ehrenfeld.jpg',
  },
  {
    lesson_num: 12,
    lesson_title: 'KT3.4: Opposition, Resistance and Conformity, 1933–1939',
    source_id: 'Source B',
    artifact_title: 'Bishop Clemens August Graf von Galen',
    date: 'c. 1935',
    creator: 'Diocese of Münster',
    repository: 'Diocesan Archive Münster (Bistumsarchiv Münster)',
    accession_id: 'Bistumsarchiv Münster Foto-Sammlung Galen-01',
    rights_status: 'Educational Fair Dealing / CDPA 1988 (Section 30)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Clemens_August_Graf_von_Galen_1934.jpg',
  },

  // Lesson 13: KT4.1
  {
    lesson_num: 13,
    lesson_title: 'KT4.1: Nazi Policies Towards Women, 1933–1939',
    source_id: 'Source A',
    artifact_title: 'Nazi Photographic Propaganda Promoting Domestic Training for Women',
    date: 'c. 1936',
    creator: 'Reichsjugendführung Archive',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 146-1981-067-18A',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_146-1981-067-18A,_BDM-Haushaltsschule.jpg',
  },
  {
    lesson_num: 13,
    lesson_title: 'KT4.1: Nazi Policies Towards Women, 1933–1939',
    source_id: 'Source B',
    artifact_title: 'The Honour Cross of the German Mother (Mutterkreuz)',
    date: 'December 1938',
    creator: 'Präsidialkanzlei der NSDAP',
    repository: 'Imperial War Museum Collection, London',
    accession_id: 'IWM INS 5406 (Insignia Collection)',
    rights_status: 'Educational Fair Dealing / CDPA 1988 (Section 30)',
    commercial_use_permitted: true,
    source_url: 'https://www.iwm.org.uk/collections/item/object/30018501',
  },

  // Lesson 14: KT4.2
  {
    lesson_num: 14,
    lesson_title: 'KT4.2: Nazi Policies Towards the Young, 1933–1939',
    source_id: 'Source A',
    artifact_title: 'Hitler Youth Boys in Paramilitary Uniform on Marching Drill',
    date: 'c. 1935',
    creator: 'Bundesarchiv Press Photographer',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 119-5592-14A',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_119-5592-14A,_Gruppe_von_HJ-Jungen.jpg',
  },
  {
    lesson_num: 14,
    lesson_title: 'KT4.2: Nazi Policies Towards the Young, 1933–1939',
    source_id: 'Source B',
    artifact_title: 'Bund Deutscher Mädel (BDM) Girls Performing Synchronised Gymnastics',
    date: 'c. 1936',
    creator: 'Bundesarchiv Press Photographer',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-2000-0110-500',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-2000-0110-500,_BDM-M%C3%A4dchen_bei_Sportvorf%C3%BChrungen.jpg',
  },

  // Lesson 15: KT4.3
  {
    lesson_num: 15,
    lesson_title: 'KT4.3: Employment and Living Standards, 1933–1939',
    source_id: 'Source A',
    artifact_title: 'Construction Workers on the Reichsautobahn Project',
    date: 'c. 1935',
    creator: 'Bundesarchiv Press Photographer',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 183-C0314-0010-003',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-C0314-0010-003,_Reichsautobahnbau.jpg',
  },
  {
    lesson_num: 15,
    lesson_title: 'KT4.3: Employment and Living Standards, 1933–1939',
    source_id: 'Source B',
    artifact_title: 'Strength Through Joy (KdF) Scheme Promotional Emblem and Programme',
    date: '1938',
    creator: 'Deutsche Arbeitsfront (DAF)',
    repository: 'German Labour Front Archive / Bundesarchiv Plakatsammlung',
    accession_id: 'Bundesarchiv Plak 003-018-042 / DAF KdF Emblem',
    rights_status: 'Public Domain (German Labour Front Records)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:KdF-Wagen_1938.jpg',
  },

  // Lesson 16: KT4.4
  {
    lesson_num: 16,
    lesson_title: 'KT4.4: The Persecution of Minorities, 1933–1939',
    source_id: 'Source A',
    artifact_title: 'SA Stormtroopers Enforcing the Nationwide Anti-Jewish Boycott',
    date: '1 April 1933',
    creator: 'Georg Pahl (Presse-Illustrationen Hoffmann)',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 102-14469',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_102-14469,_Berlin,_Boykott_j%C3%BCdischer_Gesch%C3%A4fte.jpg',
  },
  {
    lesson_num: 16,
    lesson_title: 'KT4.4: The Persecution of Minorities, 1933–1939',
    source_id: 'Source B',
    artifact_title: 'Official Racial Classification Chart under the Nuremberg Laws',
    date: 'September 1935',
    creator: 'Reich Ministry of the Interior / Reichsgesetzblatt',
    repository: 'United States Holocaust Memorial Museum / Bundesarchiv',
    accession_id: 'USHMM Artifact Collection 2004.721.1 / RGBl. 1935 I S. 100',
    rights_status: 'Public Domain (Official German State Legal Publication)',
    commercial_use_permitted: true,
    source_url: 'https://commons.wikimedia.org/wiki/File:Nuremberg_laws.jpg',
  },
  {
    lesson_num: 16,
    lesson_title: 'KT4.4: The Persecution of Minorities, 1933–1939',
    source_id: 'Source C',
    artifact_title: 'Shattered Jewish Shopfront Following Kristallnacht in Berlin',
    date: '10 November 1938',
    creator: 'Bundesarchiv Press Photographer',
    repository: 'German Federal Archives (Bundesarchiv), Koblenz',
    accession_id: 'Bundesarchiv Bild 146-1970-083-42',
    rights_status: 'Public Domain (German Federal Archives)',
    commercial_use_permitted: true,
    source_url:
      'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_146-1970-083-42,_Berlin,_Zerst%C3%B6rtes_j%C3%BCdisches_Gesch%C3%A4ft.jpg',
  },
];

masterDb.units.weimar_nazi_germany = {
  unit_id: 'weimar_nazi_germany',
  key_stage: 'GCSE (Key Stage 4)',
  exam_board: 'Edexcel Paper 3 (Option 31)',
  unit_title: 'Weimar and Nazi Germany, 1918–1939',
  total_lessons: 16,
  total_sources: weimarSources.length,
  sources: weimarSources,
};

fs.writeFileSync(masterRightsPath, JSON.stringify(masterDb, null, 2), 'utf8');
console.log(`✅ Master Rights Database synchronized with ${weimarSources.length} Weimar sources.`);
