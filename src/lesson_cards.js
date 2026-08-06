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
    
  if (currentUnitId === 'edexcel_medicine' || currentUnitId === 'cme_new' || currentUnitId === 'weimar_nazi_germany' || currentUnitId === 'eee') {
    let periods = [];
    if (currentUnitId === 'edexcel_medicine') {
      periods = [
        { id: 'medieval', title: 'Medieval (c1250-c1500)', prefix: 'lesson_1_', gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)', border: '#dc2626', image: 'assets/banners/medieval_pano_1784551792993.png', enquiry: 'How much did medicine really change in Medieval England?' },
        { id: 'renaissance', title: 'Renaissance (c1500-c1700)', prefix: 'lesson_2_', gradient: 'linear-gradient(135deg, #064e3b, #059669)', border: '#059669', image: 'assets/banners/renaissance_pano_1784551804068.png', enquiry: 'Why did the Medical Renaissance have so little impact on everyday treatments?' },
        { id: '18th_19th', title: '18th & 19th C (c1700-c1900)', prefix: 'lesson_3_', gradient: 'linear-gradient(135deg, #475569, #d97706)', border: '#d97706', image: 'assets/banners/industrial_pano_1784551813599.png', enquiry: 'How did the Industrial Revolution transform the understanding and prevention of disease?' },
        { id: 'modern', title: 'Modern (c1900-present)', prefix: 'lesson_4_', gradient: 'linear-gradient(135deg, #0c4a6e, #0284c7)', border: '#0284c7', image: 'assets/banners/modern_pano_1784551822373.png', enquiry: 'How did technology and government intervention revolutionize 20th-century medicine?' },
        { id: 'western_front', title: 'Western Front', prefix: 'lesson_5_', gradient: 'linear-gradient(135deg, #422006, #65a30d)', border: '#65a30d', image: 'assets/banners/western_front_pano_1784551831887.png', enquiry: 'How did the horrific conditions of trench warfare drive rapid medical innovation?' }
      ];
    } else if (currentUnitId === 'cme_new') {
      periods = [
        { id: 'KT1', title: 'Key Topic 1: The Birth of Israel', prefix: 'KT1', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', border: '#3b82f6', image: 'assets/cme_new_kt1_cover.png', enquiry: 'How and why was the state of Israel established?' },
        { id: 'KT2', title: 'Key Topic 2: Escalating Conflict', prefix: 'KT2', gradient: 'linear-gradient(135deg, #7f1d1d, #ef4444)', border: '#ef4444', image: 'assets/cme_new_yom_kippur_crossing.png', enquiry: 'What drove the major conflicts in the Middle East from 1967-1973?' },
        { id: 'KT3', title: 'Key Topic 3: Attempts at Peace', prefix: 'KT3', gradient: 'linear-gradient(135deg, #064e3b, #10b981)', border: '#10b981', image: 'assets/cme_new_camp_david_accords.png', enquiry: 'Why has lasting peace in the Middle East been so difficult to achieve?', bgPos: 'center 20%' }
      ];
    } else if (currentUnitId === 'weimar_nazi_germany' || (currentUnitData && currentUnitData.title && currentUnitData.title.includes('Weimar'))) {
      periods = [
        { id: 'KT1', title: 'Key Topic 1: The Weimar Republic (1918-29)', prefix: 'lesson_1_', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', border: '#3b82f6', image: 'images/weimar_kt1_cover.jpg', enquiry: 'To what extent did the Weimar Republic recover from its early crises?' },
        { id: 'KT2', title: "Key Topic 2: Hitler's Rise to Power, 1919-33", prefix: 'lesson_2_', gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)', border: '#dc2626', image: 'images/weimar_kt2_cover.jpg', enquiry: 'How did a tiny obscure political group transform?' },
        { id: 'KT3', title: "Key Topic 3: Nazi Control and Dictatorship", prefix: 'lesson_3_', gradient: 'linear-gradient(135deg, #4b5563, #1f2937)', border: '#1f2937', image: 'images/weimar_kt3_cover.jpg', enquiry: 'From chains to absolute control' },
        { id: 'KT4', title: "Key Topic 4: Life in Nazi Germany, 1933-39", prefix: 'lesson_4_', gradient: 'linear-gradient(135deg, #4d7c0f, #65a30d)', border: '#65a30d', image: 'images/weimar_kt4_cover.jpg', enquiry: 'Did life improve under the Nazis?' }
      ];
    } else if (currentUnitId === 'eee' || (currentUnitData && currentUnitData.title && currentUnitData.title.includes('Elizabeth'))) {
      periods = [
        { id: 'KT1', title: 'Key Topic 1: Queen, government and religion, 1558-69', prefix: 'lesson_1_', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', border: '#3b82f6', image: 'assets/placeholder_cover.jpg', enquiry: 'From religious division to the Armada: How did Elizabeth secure her throne?' },
        { id: 'KT2', title: "Key Topic 2: Challenges to Elizabeth at home and abroad, 1569-88", prefix: 'lesson_2_', gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)', border: '#dc2626', image: 'assets/placeholder_cover.jpg', enquiry: 'Why did plots and foreign threats push Elizabeth towards war?' },
        { id: 'KT3', title: "Key Topic 3: Elizabethan society in the Age of Exploration, 1558-88", prefix: 'lesson_3_', gradient: 'linear-gradient(135deg, #4b5563, #1f2937)', border: '#1f2937', image: 'assets/placeholder_cover.jpg', enquiry: 'What was life like during the Elizabethan Golden Age?' }
      ];
    }
    
    periods.forEach(p => {
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
      lessonsHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; text-align: left;">';
      
      let foundAny = false;
      unitData.lessons.forEach((lesson, index) => {
        if ((lesson.id && lesson.id.startsWith(p.prefix)) || (lesson.title && lesson.title.startsWith(p.prefix))) {
          foundAny = true;
          lessonsHTML += `
            <div class="homepage-lesson-card" data-index="${index}" style="position: relative; background: white; border: 1px solid #e2e8f0; border-left: 5px solid ${p.border}; border-radius: 8px; padding: 12px 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s ease;" onclick="window.renderLessonByIndex(${index})" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)';">
              <h3 style="margin-top: 0; color: #1a237e; font-size: 1rem; margin-bottom: 5px; font-family: 'Outfit', sans-serif;">Lesson ${index + 1}</h3>
              <p style="margin: 0; color: #475569; font-weight: 500; font-size: 0.9rem; line-height: 1.3;">${lesson.title.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
            </div>
          `;
        }
      });
      
      // ADD WORKBOOK FOR THIS PERIOD
      lessonsHTML += `
        <div class="homepage-lesson-card" style="background: #f8fafc; border: 2px dashed ${p.border}; border-radius: 8px; padding: 12px 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('/units/${currentUnitId}/workbook_${p.id}.html', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#f8fafc'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
           <i class="fa-solid fa-book-open" style="font-size: 1.2rem; color: ${p.border}; margin-bottom: 6px;"></i>
           <h3 style="margin: 0; color: #334155; font-size: 0.9rem;">Workbook: ${p.title}</h3>
        </div>
      `;
      
      // ADD MASTERY PACK FOR THIS PERIOD
      lessonsHTML += `
        <div class="homepage-lesson-card" style="background: #fff0f2; border: 2px dashed #d32f2f; border-radius: 8px; padding: 12px 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('/units/${currentUnitId}/mastery_pack_${p.id}.html', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#fff0f2'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
           <i class="fa-solid fa-shield-halved" style="font-size: 1.2rem; color: #d32f2f; margin-bottom: 6px;"></i>
           <h3 style="margin: 0; color: #d32f2f; font-size: 0.9rem;">Mastery Pack: ${p.title}</h3>
        </div>
      `;

      if (!foundAny) {
         lessonsHTML += `<p style="color: #64748b; font-style: italic; margin-left: 10px;">No lessons found for this period.</p>`;
      }
      lessonsHTML += '</div>';
    });
  } else {
    lessonsHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 40px; text-align: left;">';
    unitData.lessons.forEach((lesson, index) => {
        lessonsHTML += `
          <div class="homepage-lesson-card" data-index="${index}" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onclick="window.renderLessonByIndex(${index})">
            <h3 style="margin-top: 0; color: #1a237e; font-size: 1.1rem; margin-bottom: 10px;">Lesson ${index + 1}</h3>
            <p style="margin: 0; color: #475569; font-weight: 500; font-size: 0.95rem;">${lesson.title}</p>
          </div>
        `;
    });
    lessonsHTML += '</div>';
    

    if (unitData.mock_exams && Array.isArray(unitData.mock_exams) && unitData.mock_exams.length > 0) {
      lessonsHTML += '<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Mock Exams</h2>';
      lessonsHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">';
      unitData.mock_exams.forEach(mock => {
        const mockUrl = currentUnitId ? `/units/${currentUnitId}/${mock.url}` : mock.url;
        lessonsHTML += `
          <div class="homepage-lesson-card" style="background: #fdf2f8; border: 2px dashed #db2777; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('${mockUrl}', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#fdf2f8'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <i class="fa-solid fa-file-signature fa-2x" style="color: #db2777; margin-bottom: 10px;"></i>
            <h3 style="margin: 0; color: #334155; font-size: 0.9rem;">${mock.title}</h3>
          </div>
        `;
      });
      lessonsHTML += '</div>';
    }

    if (unitData.printable_workbooks && unitData.printable_workbooks.length > 0) {
      lessonsHTML += '<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Printable Workbooks</h2>';
      lessonsHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">';
      unitData.printable_workbooks.forEach(wb => {
        const wbUrl = currentUnitId ? `/units/${currentUnitId}/${wb.url}` : wb.url;
        lessonsHTML += `
          <div class="homepage-lesson-card" style="background: #f8fafc; border: 2px dashed #3b82f6; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('${wbUrl}', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#f8fafc'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
             <i class="fa-solid fa-book-open" style="font-size: 1.5rem; color: #3b82f6; margin-bottom: 10px;"></i>
             <h3 style="margin: 0; color: #334155; font-size: 1.1rem;">${wb.title}</h3>
          </div>
        `;
      });
      lessonsHTML += '</div>';
    }
  }

  return lessonsHTML;
}
