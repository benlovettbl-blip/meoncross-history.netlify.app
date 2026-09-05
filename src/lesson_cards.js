import { getAssetUrl } from './engine/assets.js'; // refreshed

export function renderKeyTopicLessonsHTML(unitData, currentUnitId, currentUnitData) {
  let lessonsHTML = `
      <style>
        .premium-banner {
          position: relative; overflow: hidden; border-radius: 12px; padding: 25px 30px; margin-top: 30px; margin-bottom: 20px; 
          box-shadow: 0 10px 25px -10px rgba(0,0,0,0.4); display: flex; flex-direction: column; align-items: flex-start; gap: 8px; 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: default;
        }
        .premium-banner:hover {
          transform: scale(1.01) translateY(-3px);
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.5);
        }
        .premium-banner-bg {
          position: absolute; top: -5%; left: -5%; width: 110%; height: 110%; 
          background-position: center; background-size: cover; 
          z-index: 1; filter: brightness(0.9); transition: transform 0.8s ease;
        }
        .premium-banner:hover .premium-banner-bg {
          transform: scale(1.03);
        }
        .premium-banner-overlay-1 {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%); z-index: 2;
        }
        .premium-banner-overlay-2 {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
          opacity: 0.45; mix-blend-mode: multiply; z-index: 3;
        }
        .premium-banner-glow {
          position: absolute; bottom: -50px; right: -50px; width: 300px; height: 300px; 
          filter: blur(40px); z-index: 3; opacity: 0.6; border-radius: 50%;
        }
        .premium-banner-content {
          position: relative; z-index: 4; padding-left: 20px;
        }
        .premium-banner-title {
          margin: 0; color: #ffffff; font-size: 2rem; font-weight: 700; 
          font-family: 'Playfair Display', serif; text-shadow: 0px 4px 12px rgba(0,0,0,0.8); letter-spacing: -0.5px;
        }
        .premium-banner-enquiry {
          margin: 8px 0 0 0; color: #f8fafc; font-size: 1.05rem; font-style: italic; 
          max-width: 800px; font-weight: 300; text-shadow: 0px 2px 8px rgba(0,0,0,0.8);
        }
      </style>
    `;

  if (
    currentUnitId === 'edexcel_medicine' ||
    currentUnitId === 'cme_new' ||
    currentUnitId === 'weimar_nazi_germany' ||
    currentUnitId === 'eee'
  ) {
    let periods = [];
    if (currentUnitId === 'edexcel_medicine') {
      periods = [
        {
          id: 'medieval',
          title: 'Medieval (c1250-c1500)',
          prefix: 'lesson_1_',
          gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
          border: '#dc2626',
          image: '/images/banner_medicine_medieval.jpg',
          enquiry: 'How much did medicine really change in Medieval England?',
        },
        {
          id: 'renaissance',
          title: 'Renaissance (c1500-c1700)',
          prefix: 'lesson_2_',
          gradient: 'linear-gradient(135deg, #064e3b, #059669)',
          border: '#059669',
          image: '/images/banner_medicine_renaissance.jpg',
          enquiry: 'Why did the Medical Renaissance have so little impact on everyday treatments?',
        },
        {
          id: '18th_19th',
          title: '18th & 19th C (c1700-c1900)',
          prefix: 'lesson_3_',
          gradient: 'linear-gradient(135deg, #475569, #d97706)',
          border: '#d97706',
          image: '/images/banner_medicine_18th_19th.jpg',
          enquiry:
            'How did the Industrial Revolution transform the understanding and prevention of disease?',
        },
        {
          id: 'modern',
          title: 'Modern (c1900-present)',
          prefix: 'lesson_4_',
          gradient: 'linear-gradient(135deg, #0c4a6e, #0284c7)',
          border: '#0284c7',
          image: '/images/banner_medicine_modern.png',
          enquiry:
            'How did technology and government intervention revolutionize 20th-century medicine?',
        },
        {
          id: 'western_front',
          title: 'Western Front',
          prefix: 'lesson_5_',
          gradient: 'linear-gradient(135deg, #422006, #65a30d)',
          border: '#65a30d',
          image: '/images/banner_medicine_western_front.jpg',
          enquiry:
            'How did the horrific conditions of trench warfare drive rapid medical innovation?',
        },
      ];
    } else if (currentUnitId === 'cme_new') {
      periods = [
        {
          id: 'KT1',
          title: 'Key Topic 1: The Birth of Israel',
          prefix: 'KT1',
          gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
          border: '#3b82f6',
          image: 'assets/cme_new_kt1_cover.png',
          enquiry: 'How and why was the state of Israel established?',
        },
        {
          id: 'KT2',
          title: 'Key Topic 2: Escalating Conflict',
          prefix: 'KT2',
          gradient: 'linear-gradient(135deg, #7f1d1d, #ef4444)',
          border: '#ef4444',
          image: 'assets/cme_new_yom_kippur_crossing.png',
          enquiry: 'What drove the major conflicts in the Middle East from 1967-1973?',
        },
        {
          id: 'KT3',
          title: 'Key Topic 3: Attempts at Peace',
          prefix: 'KT3',
          gradient: 'linear-gradient(135deg, #064e3b, #10b981)',
          border: '#10b981',
          image: 'assets/cme_new_camp_david_accords.png',
          enquiry: 'Why has lasting peace in the Middle East been so difficult to achieve?',
          bgPos: 'center 20%',
        },
      ];
    } else if (
      currentUnitId === 'weimar_nazi_germany' ||
      (currentUnitData && currentUnitData.title && currentUnitData.title.includes('Weimar'))
    ) {
      periods = [
        {
          id: 'KT1',
          title: 'Key Topic 1: The Weimar Republic (1918-29)',
          prefix: 'lesson_1_',
          gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
          border: '#3b82f6',
          image: 'images/weimar_kt1_cover.jpg',
          enquiry: 'To what extent did the Weimar Republic recover from its early crises?',
        },
        {
          id: 'KT2',
          title: "Key Topic 2: Hitler's Rise to Power, 1919-33",
          prefix: 'lesson_2_',
          gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
          border: '#dc2626',
          image: 'images/weimar_kt2_cover.jpg',
          enquiry: 'How did a tiny obscure political group transform?',
        },
        {
          id: 'KT3',
          title: 'Key Topic 3: Nazi Control and Dictatorship',
          prefix: 'lesson_3_',
          gradient: 'linear-gradient(135deg, #4b5563, #1f2937)',
          border: '#1f2937',
          image: 'images/weimar_kt3_cover.jpg',
          enquiry: 'From chains to absolute control',
        },
        {
          id: 'KT4',
          title: 'Key Topic 4: Life in Nazi Germany, 1933-39',
          prefix: 'lesson_4_',
          gradient: 'linear-gradient(135deg, #4d7c0f, #65a30d)',
          border: '#65a30d',
          image: 'images/weimar_kt4_cover.jpg',
          enquiry: 'Did life improve under the Nazis?',
        },
      ];
    } else if (
      currentUnitId === 'eee' ||
      (currentUnitData && currentUnitData.title && currentUnitData.title.includes('Elizabeth'))
    ) {
      periods = [
        {
          id: 'KT1',
          title: 'Key Topic 1: Queen, government and religion, 1558-69',
          prefix: 'lesson_1_',
          gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
          border: '#3b82f6',
          image: 'assets/placeholder_cover.jpg',
          enquiry: 'From religious division to the Armada: How did Elizabeth secure her throne?',
        },
        {
          id: 'KT2',
          title: 'Key Topic 2: Challenges to Elizabeth at home and abroad, 1569-88',
          prefix: 'lesson_2_',
          gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
          border: '#dc2626',
          image: 'assets/placeholder_cover.jpg',
          enquiry: 'Why did plots and foreign threats push Elizabeth towards war?',
        },
        {
          id: 'KT3',
          title: 'Key Topic 3: Elizabethan society in the Age of Exploration, 1558-88',
          prefix: 'lesson_3_',
          gradient: 'linear-gradient(135deg, #4b5563, #1f2937)',
          border: '#1f2937',
          image: 'assets/placeholder_cover.jpg',
          enquiry: 'What was life like during the Elizabethan Golden Age?',
        },
      ];
    }

    periods.forEach((p) => {
      lessonsHTML += `
        <div class="premium-banner">
          <div class="premium-banner-bg" style="background-image: url('${p.image}'); background-position: ${p.bgPos || 'center'};"></div>
          <div class="premium-banner-overlay-1"></div>
          <div class="premium-banner-overlay-2" style="background: ${p.gradient};"></div>
          <div class="premium-banner-glow" style="background: radial-gradient(circle, ${p.border} 0%, transparent 70%);"></div>
          <div class="premium-banner-content" style="border-left: 6px solid ${p.border};">
            <h3 class="premium-banner-title">${p.title}</h3>
            <p class="premium-banner-enquiry">${p.enquiry}</p>
          </div>
        </div>
      `;
      lessonsHTML +=
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; text-align: left;">';

      let foundAny = false;
      unitData.lessons.forEach((lesson, index) => {
        if (
          (lesson.id && lesson.id.startsWith(p.prefix)) ||
          (lesson.title && lesson.title.startsWith(p.prefix))
        ) {
          foundAny = true;
          lessonsHTML += `
            <div class="homepage-lesson-card" data-action="view-lesson-detail" data-index="${index}" style="position: relative; background: white; border: 1px solid #e2e8f0; border-left: 5px solid ${p.border}; border-radius: 8px; padding: 12px 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)';">
              <h3 style="margin-top: 0; color: #1a237e; font-size: 1rem; margin-bottom: 5px; font-family: 'Outfit', sans-serif;">${unitData.type === 'trip' ? 'Day' : 'Lesson'} ${index + 1}</h3>
              <p style="margin: 0; color: #475569; font-weight: 500; font-size: 0.9rem; line-height: 1.3;">${lesson.title.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
            </div>
          `;
        }
      });

      if (!foundAny) {
        lessonsHTML += `<p style="color: #64748b; font-style: italic; margin-left: 10px;">No lessons found for this period.</p>`;
      }
      lessonsHTML += '</div>';
    });
  } else if (
    (unitData &&
      (unitData.type === 'trip' ||
        unitData.id === 'trip_ypres' ||
        (unitData.title && unitData.title.includes('Battlefield')))) ||
    currentUnitId === 'trip_ypres' ||
    (currentUnitData &&
      (currentUnitData.type === 'trip' ||
        currentUnitData.id === 'trip_ypres' ||
        (currentUnitData.title && currentUnitData.title.includes('Battlefield'))))
  ) {
    const targetData = unitData && unitData.lessons ? unitData : currentUnitData || {};
    const days = [];
    const meninGateHeroes = [];
    const tyneCotHeroes = [];
    const lowryBrothers = [];
    let prepPack = null;

    (targetData.lessons || []).forEach((lesson, index) => {
      if (lesson.id === 'day_0') {
        prepPack = { lesson, index };
      } else if (lesson.id === 'day_1' || lesson.id === 'day_2' || lesson.id === 'day_3') {
        days.push({ lesson, index });
      } else if (lesson.id === 'hero_0' || lesson.id === 'hero_1') {
        meninGateHeroes.push({ lesson, index });
      } else if (lesson.id && ['hero_2', 'hero_3', 'hero_4', 'hero_5'].includes(lesson.id)) {
        tyneCotHeroes.push({ lesson, index });
      } else if (lesson.id && lesson.id.startsWith('hero_lowry_')) {
        lowryBrothers.push({ lesson, index });
      }
    });

    lessonsHTML += `
      <div id="trip-hub-container" style="margin-top: 25px;">
        <!-- Two-Tab Switcher Bar -->
        <div style="display: flex; gap: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 14px; margin-bottom: 25px; flex-wrap: wrap;">
          <button class="btn trip-hub-tab-btn active" data-action="switch-trip-hub-tab" data-tab="itinerary" style="padding: 10px 22px; font-size: 0.95rem; border-radius: 8px; border: 1.5px solid #1e3a8a; background: #1e3a8a; color: #ffffff; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(30, 58, 138, 0.25); transition: all 0.2s;">
            <i class="fa-solid fa-route" style="font-size: 1rem;"></i>
            <span>3-Day Field Itinerary</span>
            <span class="tab-badge" style="font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; background: rgba(255, 255, 255, 0.25); color: #ffffff; margin-left: 4px;">3 Days</span>
          </button>
          <button class="btn trip-hub-tab-btn" data-action="switch-trip-hub-tab" data-tab="fallen" style="padding: 10px 22px; font-size: 0.95rem; border-radius: 8px; border: 1.5px solid #cbd5e1; background: #f8fafc; color: #475569; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;">
            <i class="fa-solid fa-monument" style="font-size: 1rem;"></i>
            <span>Village Fallen &amp; Memorials</span>
            <span class="tab-badge" style="font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; background: #e2e8f0; color: #475569; margin-left: 4px;">9 Heroes</span>
          </button>
        </div>

        <!-- Tab 1: 3-Day Field Itinerary -->
        <div id="trip-panel-itinerary" style="display: block; scroll-margin-top: 80px;">
    `;

    if (prepPack) {
      lessonsHTML += `
        <div style="margin-bottom: 25px;">
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 5px solid #0284c7; border-radius: 8px; padding: 18px 22px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
            <div style="flex: 1; min-width: 280px; cursor: pointer;" data-action="view-lesson-detail" data-index="${prepPack.index}">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px; flex-wrap: wrap;">
                <h3 style="margin: 0; color: #0369a1; font-size: 1.18rem; font-family: 'Playfair Display', serif;">Pre-Trip Information &amp; Parental Briefing</h3>
                <span style="background: #eff6ff; color: #0284c7; border: 1px solid #bfdbfe; font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; text-transform: uppercase;">Thu 10 Sep · 16:15 Briefing</span>
              </div>
              <p style="margin: 0; color: #475569; font-size: 0.88rem; line-height: 1.4;">Joint expedition led by Mr Ben Lovett &amp; Mr James Garrett (The History Boys) · Accomp: Dr Kirkup &amp; Mrs Lushey. Packing checklist, catering &amp; €30–€40 Euros, rooming timeline, and return forms.</p>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
              <a href="/pdfs/ypres_1914_1918_pupil_field_guide.pdf" target="_blank" style="padding: 7px 12px; font-size: 0.8rem; font-weight: 700; background: #eff6ff; color: #1e3a8a; border: 1.5px solid #93c5fd; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s;" onmouseover="this.style.background='#dbeafe';" onmouseout="this.style.background='#eff6ff';">
                <i class="fa-solid fa-book-bookmark" style="color: #2563eb;"></i> Pupil Guide (PDF)
              </a>
              <a href="/pdfs/ypres_1914_1918_teacher_companion.pdf" target="_blank" style="padding: 7px 12px; font-size: 0.8rem; font-weight: 700; background: #f5f3ff; color: #5b21b6; border: 1.5px solid #c4b5fd; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s;" onmouseover="this.style.background='#ede9fe';" onmouseout="this.style.background='#f5f3ff';">
                <i class="fa-solid fa-compass" style="color: #7c3aed;"></i> Tour Companion (PDF)
              </a>
              <a href="/pdfs/ypres_2026_parent_information_pack.pdf" target="_blank" style="padding: 7px 12px; font-size: 0.8rem; font-weight: 700; background: #fefce8; color: #b45309; border: 1.5px solid #fde047; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s;" onmouseover="this.style.background='#fef08a';" onmouseout="this.style.background='#fefce8';">
                <i class="fa-solid fa-file-pdf" style="color: #dc2626;"></i> Parent Pack (PDF)
              </a>
              <a href="/briefings/ypres_2026_parent_briefing.pptx" download style="padding: 7px 12px; font-size: 0.8rem; font-weight: 700; background: #f0fdf4; color: #166534; border: 1.5px solid #bbf7d0; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s;" onmouseover="this.style.background='#dcfce7';" onmouseout="this.style.background='#f0fdf4';">
                <i class="fa-solid fa-file-powerpoint" style="color: #ea580c;"></i> Slides (.pptx)
              </a>
              <button class="btn" data-action="view-lesson-detail" data-index="${prepPack.index}" style="padding: 7px 12px; font-size: 0.8rem; font-weight: 700; background: #0284c7; color: #ffffff; border: 1.5px solid #0284c7; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                View Guide &rarr;
              </button>
            </div>
          </div>
        </div>
      `;
    }

    lessonsHTML += `
          <div id="trip-daily-itinerary-section" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; scroll-margin-top: 80px;">
            <h2 style="margin: 0; text-align: left; color: #0f172a; font-family: 'Playfair Display', serif; font-size: 1.35rem;">
              <i class="fa-solid fa-calendar-check" style="color: #1e3a8a; margin-right: 8px;"></i>Daily Field Itinerary
            </h2>
            <span style="font-size: 0.8rem; font-family: sans-serif; font-weight: 600; background: #eff6ff; color: #1d4ed8; padding: 4px 12px; border-radius: 20px; border: 1px solid #bfdbfe;">3 Days · 1st–3rd October 2026</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; text-align: left;">
    `;

    days.forEach((d, i) => {
      lessonsHTML += `
          <div class="homepage-lesson-card" data-action="view-lesson-detail" data-index="${d.index}" style="background: white; border: 1px solid #e2e8f0; border-top: 4px solid #1e3a8a; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.04); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.04)';">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h3 style="margin: 0; color: #1e3a8a; font-size: 1.2rem; font-family: 'Playfair Display', serif;">Day ${i + 1}</h3>
              <span style="font-size: 0.75rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; padding: 3px 8px; border-radius: 12px; border: 1px solid #bfdbfe;">Field Guide</span>
            </div>
            <p style="margin: 0; color: #334155; font-weight: 600; font-size: 0.95rem; line-height: 1.4;">${d.lesson.title.replace(/^Day \d+:\s*/, '')}</p>
            <p style="margin: 8px 0 0 0; color: #64748b; font-size: 0.85rem; font-style: italic;">${d.lesson.enquiry || ''}</p>
          </div>
      `;
    });

    lessonsHTML += `
          </div>

          <!-- Voices & Poetry of the Salient Banner -->
          <div style="margin-top: 30px; background: #faf8f5; border: 1px solid #e7dfd5; border-left: 5px solid #7f1d1d; border-radius: 8px; padding: 22px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 3px 10px; border-radius: 12px;">Expedition Literature</span>
              <h3 style="margin: 6px 0 4px 0; color: #7f1d1d; font-size: 1.25rem; font-family: 'Playfair Display', serif;">Voices &amp; Poetry of the Salient</h3>
              <p style="margin: 0; color: #475569; font-size: 0.9rem; max-width: 600px;">16 unabridged poems by 12 First World War soldier-poets across our 11 expedition stops, including McCrae, Owen, Sassoon, Rosenberg, Sorley, and Brittain.</p>
            </div>
            <button class="btn" data-action="open-anthology-modal" style="padding: 10px 18px; font-size: 0.9rem; font-weight: 700; background: #7f1d1d; color: white; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 5px rgba(127, 29, 29, 0.25); transition: background 0.2s;" onmouseover="this.style.background='#991b1b';" onmouseout="this.style.background='#7f1d1d';">
              Browse 16-Poem Anthology &rarr;
            </button>
          </div>
        </div>

        <!-- Tab 2: Village Fallen & Memorials -->
        <div id="trip-panel-fallen" style="display: none; scroll-margin-top: 80px;">
          <div style="margin-bottom: 25px;">
            <h2 style="margin: 0 0 6px 0; text-align: left; color: #991b1b; font-family: 'Playfair Display', serif; font-size: 1.35rem;">
              The Fallen: Local Heroes of the Salient
            </h2>
            <p style="color: #475569; font-size: 0.95rem; margin: 0; line-height: 1.5;">
              During our 3-day tour, pupils will locate these young men from our home villages (Stubbington, Chark, Lee-on-the-Solent) who died in the Ypres Salient. They are commemorated on the physical memorial panels visited during Days 1, 2, and 3.
            </p>
          </div>

          <!-- Crofton Parish Memorial Tablet Spotlight -->
          <div style="background: #fdfaf6; border: 1.5px solid #dcd3c6; border-radius: 10px; padding: 20px; display: flex; flex-wrap: wrap; gap: 20px; align-items: center; box-shadow: 0 2px 6px rgba(0,0,0,0.04); margin-bottom: 25px;">
            <div style="flex: 0 0 160px; text-align: center;">
              <img src="/images/stubbington_memorial_2.jpg" alt="Crofton Parish Memorial Tablet" style="max-width: 100%; border-radius: 6px; border: 1px solid #cbd5e1; cursor: zoom-in; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" data-action="open-modal" data-src="/images/stubbington_memorial_2.jpg">
              <small style="display: block; margin-top: 5px; color: #78350f; font-weight: 600; font-size: 0.78rem;">Holy Rood Church, Stubbington</small>
            </div>
            <div style="flex: 1; min-width: 250px;">
              <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #fef3c7; color: #92400e; padding: 3px 9px; border-radius: 12px;">The Home Link</span>
              <h4 style="margin: 6px 0 8px 0; color: #1e3a8a; font-size: 1.15rem; font-family: 'Playfair Display', serif;">The Crofton Parish Memorial Tablet</h4>
              <p style="margin: 0; color: #475569; font-size: 0.9rem; line-height: 1.5;">
                Every one of our six Salient fallen—along with the three Lowry brothers—is carved side-by-side into this marble tablet in Holy Rood Church. On this tour, our mission is to trace their names from our home village to the great memorial walls of Flanders.
              </p>
            </div>
          </div>

          <!-- Stubbington War Memorial Lychgate - 4 Sides Showcase -->
          <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
              <div>
                <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 3px 9px; border-radius: 12px;">Village Memorial Heritage</span>
                <h4 style="margin: 6px 0 0 0; color: #0f172a; font-size: 1.15rem; font-family: 'Playfair Display', serif;">The Stubbington War Memorial Lychgate (All 4 Sides)</h4>
              </div>
              <span style="font-size: 0.8rem; color: #64748b; font-style: italic;">Carved oak tie-beams commemorating the parish dead · Click any photo to zoom</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px;">
              <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
                <div style="height: 110px; overflow: hidden; background: #0f172a; cursor: zoom-in;" data-action="open-modal" data-src="/images/stubbington_names_4.jpg">
                  <img src="/images/stubbington_names_4.jpg" alt="West Beam: Adams to Franklin" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
                </div>
                <div style="padding: 10px; font-size: 0.82rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <strong style="color: #1e3a8a; display: block; font-size: 0.88rem;">Side 1 (West Beam)</strong>
                    <span style="color: #475569; display: block; margin-top: 3px;">Adams · Ayling · Franklin</span>
                  </div>
                  <span style="display: inline-block; margin-top: 8px; font-size: 0.72rem; font-weight: 700; color: #1d4ed8; background: #eff6ff; padding: 2px 6px; border-radius: 4px; align-self: flex-start;">Day 2 · Menin Gate</span>
                </div>
              </div>
              <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
                <div style="height: 110px; overflow: hidden; background: #0f172a; cursor: zoom-in;" data-action="open-modal" data-src="/images/stubbington_names_1.jpg">
                  <img src="/images/stubbington_names_1.jpg" alt="East Beam: Muckett to Smith" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
                </div>
                <div style="padding: 10px; font-size: 0.82rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <strong style="color: #1e3a8a; display: block; font-size: 0.88rem;">Side 2 (East Beam)</strong>
                    <span style="color: #475569; display: block; margin-top: 3px;">Muckett · Rye · Smith</span>
                  </div>
                  <span style="display: inline-block; margin-top: 8px; font-size: 0.72rem; font-weight: 700; color: #b91c1c; background: #fef2f2; padding: 2px 6px; border-radius: 4px; align-self: flex-start;">Day 2 · Tyne Cot</span>
                </div>
              </div>
              <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
                <div style="height: 110px; overflow: hidden; background: #0f172a; cursor: zoom-in;" data-action="open-modal" data-src="/images/stubbington_names_2.jpg">
                  <img src="/images/stubbington_names_2.jpg" alt="South Beam: Warland to Wells" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
                </div>
                <div style="padding: 10px; font-size: 0.82rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <strong style="color: #1e3a8a; display: block; font-size: 0.88rem;">Side 3 (South Beam)</strong>
                    <span style="color: #475569; display: block; margin-top: 3px;">Warland · Ward · Wells</span>
                  </div>
                  <span style="display: inline-block; margin-top: 8px; font-size: 0.72rem; font-weight: 700; color: #047857; background: #ecfdf5; padding: 2px 6px; border-radius: 4px; align-self: flex-start;">Day 2 · Tyne Cot</span>
                </div>
              </div>
              <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
                <div style="height: 110px; overflow: hidden; background: #0f172a; cursor: zoom-in;" data-action="open-modal" data-src="/images/stubbington_names_3.jpg">
                  <img src="/images/stubbington_names_3.jpg" alt="North Beam: Lowry Brothers & Halahan" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
                </div>
                <div style="padding: 10px; font-size: 0.82rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <strong style="color: #1e3a8a; display: block; font-size: 0.88rem;">Side 4 (North Beam)</strong>
                    <span style="color: #475569; display: block; margin-top: 3px;">Lowry Brothers · Halahan · King</span>
                  </div>
                  <span style="display: inline-block; margin-top: 8px; font-size: 0.72rem; font-weight: 700; color: #7c3aed; background: #f5f3ff; padding: 2px 6px; border-radius: 4px; align-self: flex-start;">Tour Hub &amp; Pre-Trip</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Menin Gate Group -->
          <div style="margin-bottom: 30px;">
            <div style="background: #f8fafc; border-left: 4px solid #b91c1c; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px;">
              <h4 style="margin: 0; color: #7f1d1d; font-size: 1.1rem; font-family: 'Playfair Display', serif;">
                Ypres (Menin Gate) Memorial · Panel 35
              </h4>
              <span style="font-size: 0.85rem; color: #64748b;">Visited on Day 2 during the 8:00 PM Last Post Ceremony</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; text-align: left;">
    `;

    meninGateHeroes.forEach((h) => {
      const heroData =
        targetData.local_heroes?.find(
          (lh) =>
            lh.name.includes(h.lesson.title.split(' ')[1]) ||
            h.lesson.title.includes(lh.name.split(' ')[lh.name.split(' ').length - 1]),
        ) || {};
      lessonsHTML += `
        <div class="homepage-lesson-card" data-action="view-lesson-detail" data-index="${h.index}" style="background: #fff; border: 1px solid #e2e8f0; border-left: 5px solid #ea580c; border-radius: 8px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='translateY(0)';">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <h3 style="margin: 0; color: #7f1d1d; font-size: 1.1rem; font-family: 'Playfair Display', serif;">${h.lesson.title.split('(')[0].trim()}</h3>
            <span style="font-size: 0.75rem; font-weight: 700; background: #ffedd5; color: #c2410c; padding: 2px 8px; border-radius: 10px; white-space: nowrap;">Panel 35</span>
          </div>
          <p style="margin: 0 0 6px 0; color: #475569; font-size: 0.88rem; font-weight: 600;">${heroData.regiment || '1st Battalion, Hampshire Regiment'}</p>
          <p style="margin: 0 0 8px 0; color: #64748b; font-size: 0.83rem; line-height: 1.4;">Home: ${heroData.connection || 'Local Hampshire connection'}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #fed7aa; padding-top: 8px; font-size: 0.78rem;">
            <span style="color: #1e3a8a; font-weight: 600;">Parish Tablet: <code>${heroData.tablet_inscription || ''}</code></span>
            <span style="color: #c2410c; font-weight: 600;"><i class="fa-solid fa-monument"></i> Menin Gate</span>
          </div>
        </div>
      `;
    });

    lessonsHTML += `
            </div>
          </div>

          <!-- Tyne Cot Group -->
          <div style="margin-bottom: 30px;">
            <div style="background: #f8fafc; border-left: 4px solid #b91c1c; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px;">
              <h4 style="margin: 0; color: #7f1d1d; font-size: 1.1rem; font-family: 'Playfair Display', serif;">
                Tyne Cot Memorial to the Missing · Passchendaele
              </h4>
              <span style="font-size: 0.85rem; color: #64748b;">Visited on Day 2 · Inscribed on the rear memorial wall</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; text-align: left;">
    `;

    tyneCotHeroes.forEach((h) => {
      const heroData =
        targetData.local_heroes?.find(
          (lh) =>
            lh.name.includes(h.lesson.title.split(' ')[1]) ||
            h.lesson.title.includes(lh.name.split(' ')[lh.name.split(' ').length - 1]),
        ) || {};
      const panelLabel = h.lesson.id === 'hero_5' ? 'Panels 14–17' : 'Panels 88–90';
      lessonsHTML += `
        <div class="homepage-lesson-card" data-action="view-lesson-detail" data-index="${h.index}" style="background: #fff; border: 1px solid #e2e8f0; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='translateY(0)';">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <h3 style="margin: 0; color: #7f1d1d; font-size: 1.1rem; font-family: 'Playfair Display', serif;">${h.lesson.title.split('(')[0].trim()}</h3>
            <span style="font-size: 0.75rem; font-weight: 700; background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 10px; white-space: nowrap;">${panelLabel}</span>
          </div>
          <p style="margin: 0 0 6px 0; color: #475569; font-size: 0.88rem; font-weight: 600;">${heroData.regiment || ''}</p>
          <p style="margin: 0 0 8px 0; color: #64748b; font-size: 0.83rem; line-height: 1.4;">Home: ${heroData.connection || 'Local Hampshire connection'}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #fecaca; padding-top: 8px; font-size: 0.78rem;">
            <span style="color: #1e3a8a; font-weight: 600;">Parish Tablet: <code>${heroData.tablet_inscription || ''}</code></span>
            <span style="color: #991b1b; font-weight: 600;"><i class="fa-solid fa-monument"></i> Tyne Cot Memorial</span>
          </div>
        </div>
      `;
    });

    lessonsHTML += `
            </div>
          </div>
    `;

    // The Lowry Brothers
    if (lowryBrothers.length > 0) {
      lessonsHTML += `
        <div style="margin-top: 35px; background: #fdfaf6; border: 1.5px solid #e7dfd5; border-radius: 10px; padding: 25px;">
          <div style="border-bottom: 1.5px solid #e7dfd5; padding-bottom: 12px; margin-bottom: 18px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #fef3c7; color: #92400e; padding: 3px 9px; border-radius: 12px; display: inline-block; margin-bottom: 8px;">
              Home Front Memorial Story
            </span>
            <h3 style="margin: 0 0 6px 0; color: #1e293b; font-size: 1.35rem; font-family: 'Playfair Display', serif;">
              A Village's Sacrifice: The Lowry Brothers of Manor Way Grange
            </h3>
            <p style="margin: 0; color: #475569; font-size: 0.92rem; line-height: 1.5;">
              The names of William ('Harper'), Auriol ('Eric'), and Cyril ('Patrick') Lowry are carved into the Stubbington War Memorial. While their graves and memorials lie across Gallipoli, Arras, and the Somme rather than the Ypres Salient, their story represents the devastating cost of the war on individual Hampshire families.
            </p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; text-align: left;">
      `;
      lowryBrothers.forEach((b) => {
        const heroData =
          targetData.local_heroes?.find(
            (lh) =>
              lh.name.includes('Lowry') &&
              ((b.lesson.id.includes('william') && lh.name.includes('William')) ||
                (b.lesson.id.includes('auriol') && lh.name.includes('Auriol')) ||
                (b.lesson.id.includes('cyril') && lh.name.includes('Cyril'))),
          ) || {};
        const theatreBadge = b.lesson.id.includes('william')
          ? 'Gallipoli (1915)'
          : b.lesson.id.includes('auriol')
            ? 'Arras (1918)'
            : 'Somme (1918)';
        lessonsHTML += `
          <div class="homepage-lesson-card" data-action="view-lesson-detail" data-index="${b.index}" style="background: #fff; border: 1px solid #e2e8f0; border-left: 5px solid #d97706; border-radius: 8px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='translateY(0)';">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <h3 style="margin: 0; color: #92400e; font-size: 1.05rem; font-family: 'Playfair Display', serif;">${b.lesson.title.split('(')[0].trim()}</h3>
              <span style="font-size: 0.72rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 10px; white-space: nowrap;">${theatreBadge}</span>
            </div>
            <p style="margin: 0 0 6px 0; color: #475569; font-size: 0.88rem; font-weight: 600;">${heroData.regiment || ''}</p>
            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 0.83rem; line-height: 1.4;">Home: ${heroData.connection || 'Manor Way Grange, Lee-on-the-Solent'}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #fed7aa; padding-top: 8px; font-size: 0.78rem;">
              <span style="color: #1e3a8a; font-weight: 600;">Tablet: <code>${heroData.tablet_inscription || ''}</code></span>
              <span style="color: #64748b; font-style: italic;">${(heroData.memorial || '').split(',')[0]}</span>
            </div>
          </div>
        `;
      });
      lessonsHTML += `
          </div>
        </div>
      `;
    }

    lessonsHTML += `
        </div>
      </div>
    `;

    return lessonsHTML;
  } else {
    lessonsHTML =
      '<h2 style="font-family: \'Playfair Display\', serif; color: #1a237e; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 40px; margin-bottom: 20px;">Key Topic Lessons</h2><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; text-align: left;">';
    if (unitData.lessons) {
      unitData.lessons.forEach((lesson, index) => {
        let bgStyle = 'background: white; border: 1px solid #e2e8f0;';
        let titleColor = '#1a237e';
        let textColor = '#475569';
        let textShadow = 'none';

        let candidateImg = lesson.banner || lesson.cover_image;
        if (!candidateImg && lesson.sources && lesson.sources.length > 0) {
          candidateImg = lesson.sources[0].src || lesson.sources[0].image_url;
        }

        if (candidateImg) {
          let imgUrl = getAssetUrl(candidateImg);
          bgStyle = `background: linear-gradient(to bottom, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.9) 100%), url('${imgUrl}') center/cover; border: none; min-height: 150px; display: flex; flex-direction: column; justify-content: flex-end;`;
          titleColor = '#f8fafc';
          textColor = '#e2e8f0';
          textShadow = '0 2px 4px rgba(0,0,0,0.5)';
        }

        let cardBadge = `Lesson ${index + 1}`;
        if (lesson.id && lesson.id.startsWith('hero_')) {
          cardBadge = 'Local Hero';
        } else if (lesson.id === 'day_0') {
          cardBadge = 'Pre-Trip';
        } else if (lesson.id && lesson.id.startsWith('day_')) {
          cardBadge = `Day ${lesson.id.split('_')[1]}`;
        }

        let cardContent = `
            <h3 style="margin-top: 0; color: ${titleColor}; font-size: 1.1rem; margin-bottom: 5px; text-shadow: ${textShadow};">${cardBadge}</h3>
            <p style="margin: 0; color: ${textColor}; font-weight: 500; font-size: 0.95rem; text-shadow: ${textShadow};">${lesson.title}</p>
        `;

        if (lesson.enquiry) {
          cardContent = `
                <h3 style="margin-top: 0; color: ${titleColor}; font-size: 1.1rem; margin-bottom: 5px; text-shadow: ${textShadow};">${cardBadge}: ${lesson.title}</h3>
                <p style="margin: 0; color: ${textColor}; font-weight: 500; font-size: 0.9rem; font-style: italic; text-shadow: ${textShadow}; line-height: 1.3;">${lesson.enquiry}</p>
            `;
        }

        lessonsHTML += `
          <div class="homepage-lesson-card" data-action="view-lesson-detail" data-index="${index}" style="${bgStyle} border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
            ${cardContent}
          </div>
        `;
      });
    }
    lessonsHTML += '</div>';

    if (
      unitData.mock_exams &&
      Array.isArray(unitData.mock_exams) &&
      unitData.mock_exams.length > 0
    ) {
      lessonsHTML +=
        '<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Mock Exams</h2>';
      lessonsHTML +=
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">';
      unitData.mock_exams.forEach((mock) => {
        const mockUrl = currentUnitId ? `/units/${currentUnitId}/${mock.url}` : mock.url;
        lessonsHTML += `
          <div class="homepage-lesson-card" style="background: #fdf2f8; border: 2px dashed #db2777; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" data-action="open-link" data-url="${mockUrl}" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#fdf2f8'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <i class="fa-solid fa-file-signature fa-2x" style="color: #db2777; margin-bottom: 10px;"></i>
            <h3 style="margin: 0; color: #334155; font-size: 0.9rem;">${mock.title}</h3>
          </div>
        `;
      });
      lessonsHTML += '</div>';
    }

    // Removed legacy PDF Materials rendering
  }

  return lessonsHTML;
}
