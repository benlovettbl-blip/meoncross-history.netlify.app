import { cleanQuestionText } from '../data_parser.js';
import { generateKeyIndividualEmbedHTML } from '../key_individuals.js';
import { appStore } from './store.js';
import { getAssetUrl } from './assets.js';

window.formatBold = function(text) {
      if (!text) return '';
      let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Handle blockquotes
      parsed = parsed.replace(/(^|\n)> (.*?)(?=\n|$)/g, '$1<blockquote style="border-left: 4px solid #cbd5e1; padding-left: 15px; margin-left: 0; color: #475569; font-style: italic; background: rgba(248, 250, 252, 0.5); padding-top: 5px; padding-bottom: 5px; border-radius: 0 4px 4px 0;">$2</blockquote>');
      // Handle headers
      parsed = parsed.replace(/(^|\n)### (.*?)(?=\n|$)/g, '$1<h4 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h4>');
      parsed = parsed.replace(/(^|\n)## (.*?)(?=\n|$)/g, '$1<h3 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h3>');
      
      parsed = parsed.replace(/\\n/g, '\n');
      
      // Handle lists
      if (parsed.match(/(^|\n)[\*\-]\s/)) {
        parsed = parsed.replace(/(^|\n)[\*\-]\s+(.*)/g, '$1<li>$2</li>');
        parsed = parsed.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g, '<ul style="margin-top: 5px; margin-bottom: 5px; padding-left: 20px;">\n$1\n</ul>');
      }

      // Handle italics (after lists so we don't conflict with bullet points)
      parsed = parsed.replace(/\*([^\*]+)\*/g, '<i>$1</i>');
      
      parsed = parsed.replace(/\n/g, '<br>');
      // Clean up <br> around elements
      parsed = parsed.replace(/<br><ul/g, '<ul').replace(/<\/ul><br>/g, '</ul>').replace(/<br><li>/g, '<li>').replace(/<\/li><br>/g, '</li>');
      parsed = parsed.replace(/<br><blockquote/g, '<blockquote').replace(/<\/blockquote><br>/g, '</blockquote>');
      parsed = parsed.replace(/<br><h/g, '<h').replace(/<\/h4><br>/g, '</h4>').replace(/<\/h3><br>/g, '</h3>');
      
      return parsed;
    }

window.renderLessonByIndex = function(index, skipHistory = false) {
      if (appStore.state.activeUnitData && appStore.state.activeUnitData.lessons && appStore.state.activeUnitData.lessons[index]) {
        if (!skipHistory) {
          try {
            const url = new URL(window.location);
            url.searchParams.set('lesson', index);
            history.pushState({ lessonIndex: index }, "", url);
          } catch (e) {
            console.warn('History routing disabled (e.g. file:// protocol):', e);
          }
        }
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        // Try to activate the corresponding sidebar link
        const links = document.querySelectorAll('.lesson-link');
        const isKS3 = appStore.state.activeUnitData.title && appStore.state.activeUnitData.title.includes('KS3');
        if (!isKS3 && links.length > index + 1) { // +1 because the first link is Unit Homepage
            links[index + 1].classList.add('active');
        }
        renderLesson(appStore.state.activeUnitData.lessons[index]);
        (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

export function renderLesson(lesson) {
        window.postRenderHooks = [];
        let htmlDoNow="", htmlPrimary="", htmlSources1="", htmlNarrative="", htmlPairShare="", htmlHistorian="", htmlTasks="";
      const formatBold = window.formatBold;
      let globalQuestionNum = 1;
      const formatQuestion = (qText, prependNumber = true) => {
        if (!qText) return '';
        let cleaned = cleanQuestionText(qText);
        if (prependNumber) return `Question ${globalQuestionNum++}: ${formatBold(cleaned)}`;
        return formatBold(cleaned);
      };
    lesson = JSON.parse(JSON.stringify(lesson));
    assignQuestionNumbers(lesson);
    
    // Normalize do_now format
    if (Array.isArray(lesson.do_now)) {
      lesson.do_now = {
        type: "questions",
        items: lesson.do_now.map(t => ({ question: t.q || t.question, answer: t.a || t.answer }))
      };
    } else if (lesson.do_now && lesson.do_now.type === "questions" && lesson.do_now.tasks) {
      lesson.do_now.items = lesson.do_now.tasks.map(t => ({ question: t.q || t.question, answer: t.a || t.answer }));
    }

    // Extract exam tasks from tasks array so they are not rendered inline
    let extractedExamTasks = [];
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) {
          const eTasks = block.tasks.filter(t => (t.text || t.question || '').includes('marks)'));
          extractedExamTasks.push(...eTasks);
          block.tasks = block.tasks.filter(t => !(t.text || t.question || '').includes('marks)'));
        }
      });
    }
    if (lesson.tasks) {
      const eTasks = lesson.tasks.filter(t => (t.text || t.question || '').includes('marks)'));
      extractedExamTasks.push(...eTasks);
      lesson.tasks = lesson.tasks.filter(t => !(t.text || t.question || '').includes('marks)'));
    }
    
    if (lesson.exam_practice && Array.isArray(lesson.exam_practice)) {
      // Duplication removed: exam_practice is rendered directly below.
    }

    assignQuestionNumbers(lesson);
    window.currentActiveLesson = lesson;
    
    // Tabs container logic
    let heroImage = lesson.banner || window.currentUnitData?.homepage_background || '/images/default_hero.jpg';
    const isTrip = window.currentUnitData && window.currentUnitData.type === 'trip';
    let lessonPrefix = 'Lesson';
    let ktMatch = lesson.title ? lesson.title.match(/^(?:KT|Key Topic)\s*([\d\.]+)/i) : null;
    
        if (window.currentUnitId === 'cme_new' && ktMatch) {
      if (ktMatch[1].startsWith('1')) heroImage = '/assets/cme_new_kt1_cover.png';
      else if (ktMatch[1].startsWith('2')) heroImage = '/assets/cme_new_kt2_cover.png';
      else if (ktMatch[1].startsWith('3')) heroImage = '/assets/cme_new_kt3_cover.png';
    } else if (window.currentUnitId === 'edexcel_medicine' && ktMatch) {
      if (ktMatch[1].startsWith('1')) heroImage = '/images/banner_medicine_medieval.jpg';
      else if (ktMatch[1].startsWith('2')) heroImage = '/images/banner_medicine_renaissance.jpg';
      else if (ktMatch[1].startsWith('3')) heroImage = '/images/banner_medicine_18th_19th.jpg';
      else if (ktMatch[1].startsWith('4')) heroImage = '/images/banner_medicine_modern.png';
      else if (ktMatch[1].startsWith('5')) heroImage = '/images/banner_medicine_western_front.jpg';
    }

    if (isTrip && lesson.id && lesson.id.startsWith('day_')) {
      lessonPrefix = `Day ${lesson.id.split('_')[1]}`;
    } else if (ktMatch) {
      lessonPrefix = `KT ${ktMatch[1]}`;
    } else if (lesson.id && lesson.id.startsWith('lesson_')) {
      const parts = lesson.id.split('_');
      if (parts.length > 2) {
        lessonPrefix = `Lesson ${parseInt(parts[1])}.${parts.slice(2).join('.')}`;
      } else {
        lessonPrefix = `Lesson ${parseInt(parts[1])}`;
      }
    }
    
    const contentArea = document.getElementById('content-area');
    if (contentArea) contentArea.style.paddingTop = '0'; // Fix gap
    
    let html = `<div class="lesson-content">`;
    
    let headerEnquiry = lesson.enquiry || lesson.enquiry_question || lesson.inquiry_question;
    let targetText = headerEnquiry || lesson.title || '';
    let stickyHeaderText = '';
    
    if (/^(?:KT|Key Topic|Lesson)\s*[\d\.]+/i.test(targetText)) {
      stickyHeaderText = targetText;
    } else {
      stickyHeaderText = `${lessonPrefix}: ${targetText}`;
    }
    
    // Sticky Header (No visible background, but opaque to hide scrolling text)
    const currentIndex = appStore.state.activeUnitData.lessons.findIndex(l => l.title === lesson.title);
    html += `
      <div class="sticky-lesson-header">
          <h4 class="sticky-lesson-title">
            ${stickyHeaderText}
          </h4>
          <div class="sticky-lesson-actions">
          ${isTrip ? '' : `<button class="btn" style="padding: 6px 12px; font-size: 0.9rem; background: white; color: #0f172a; border: 1px solid rgba(0,0,0,0.1); font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.05);" data-action="open-debate-modal"><i class="fa-solid fa-comments" style="color: #3b82f6;"></i> Class Debate</button>`}
          ${isTrip && lesson.tour_guide_script ? `<button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.9rem; background: #6366f1; border-color: #6366f1; box-shadow: 0 2px 5px rgba(99,102,241,0.3);" data-action="open-tour-guide-modal" data-index="${currentIndex}"><i class="fa-solid fa-bullhorn"></i> Tour Guide Script</button>` : ''}
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem; background: white; border: 1px solid rgba(0,0,0,0.1);" data-action="switch-view" data-view="dashboard"><i class="fa-solid fa-arrow-left"></i> ${isTrip ? 'Trip Menu' : 'Unit Menu'}</button>
        </div>
      </div>
    `;
    let bannerPosition = lesson.banner_position || 'center';
    
    // Full-Bleed Hero Image
    html += `
      <div class="lesson-hero" style="position: relative; width: calc(100% + 8rem); margin-left: -4rem; margin-top: -1rem; height: 300px; background: url('${heroImage}') ${bannerPosition}/cover no-repeat; margin-bottom: 2rem; border-bottom: 1px solid var(--border-glass); box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(15,23,42,0.9));"></div>
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 2rem 4rem;">
          <span style="color: #cbd5e1; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">${lessonPrefix}</span>
          <h2 style="font-family: 'Playfair Display', serif; color: white; font-size: 2.5rem; margin: 0.5rem 0 0 0; line-height: 1.2; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${lesson.title}</h2>
        </div>
      </div>
    `;

    html += `
      <div id="progress-container" style="background: rgba(226,232,240,0.5); height: 6px; width: 100%; margin-bottom: 20px; border-radius: 3px; overflow: hidden; backdrop-filter: blur(5px);">
        <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
      </div>
    `;

    // -----------------------------------------------------
    // TABS NAVIGATION UI
    // -----------------------------------------------------
    html += `
      
    `;


    let vocabDict = {};
    if (lesson.vocab) {
      lesson.vocab.forEach(v => {
        const termDef = v.definition || v.def || v.desc || '';
        if (termDef) {
          vocabDict[v.term.toLowerCase()] = termDef;
        }
      });
    }

       let seenTerms = new Set();
      const highlightGlossary = (text) => {
        if (!text || typeof text !== 'string') return text || '';
        if (Object.keys(vocabDict).length === 0) return text;
        let processedText = text;
        const sortedTerms = Object.keys(vocabDict).sort((a,b) => b.length - a.length);
        for (const term of sortedTerms) {
          const def = vocabDict[term];
          if (!def || typeof def !== 'string') continue;
          if (!seenTerms.has(term)) {
            // Regex matches HTML tags OR the specific term word boundary
            const regex = new RegExp(`(<[^>]+>)|\\b(${term})\\b`, 'gi');
            let matchedTerm = false;
            
            processedText = processedText.replace(regex, (match, htmlTag, word) => {
              if (htmlTag) return htmlTag; // Skip and preserve anything already in an HTML tag
              if (word) {
                matchedTerm = true;
                return `<span class="vocab-word" data-definition="${def.replace(/"/g, '&quot;')}">${word}</span>`;
              }
              return match;
            });
            
            if (matchedTerm) {
              seenTerms.add(term);
            }
          }
        }
        return processedText;
      };


    if (lesson.teacher_notes) {
      let notesHtml = '';
      if (lesson.teacher_notes && !Array.isArray(lesson.teacher_notes) && typeof lesson.teacher_notes === 'object') {
        const primerText = lesson.teacher_notes.primer ? `<div style="font-size: 1.05rem; margin-bottom: 20px;">${lesson.teacher_notes.primer}</div>` : '';
        const sourceContext = lesson.teacher_notes.source_context ? `<div style="font-size: 0.95rem; margin-bottom: 20px; background: rgba(2, 132, 199, 0.2); padding: 15px; border-left: 4px solid #38bdf8; border-radius: 4px;"><strong><i class="fa-solid fa-image"></i> Source Context:</strong><br/>${lesson.teacher_notes.source_context}</div>` : '';
        const objectivesHtml = (lesson.teacher_notes.objectives || []).map(note => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">${note.primer}</div>
            ${note.question ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); color: #38bdf8; font-weight: 600;"><i class="fa-solid fa-circle-question" style="margin-right: 4px;"></i> Hinge Question: ${note.question}</div>` : ''}
          </div>
        `).join('');
        notesHtml = primerText + sourceContext + objectivesHtml;
      } else if (Array.isArray(lesson.teacher_notes)) {
        notesHtml = lesson.teacher_notes.map(note => `
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${note.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">${note.primer}</div>
            ${note.question ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); color: #38bdf8; font-weight: 600;"><i class="fa-solid fa-circle-question" style="margin-right: 4px;"></i> Hinge Question: ${note.question}</div>` : ''}
          </div>
        `).join('');
      } else {
        notesHtml = `<div style="font-size: 1.05rem;">${lesson.teacher_notes}</div>`;
      }

      if (!isTrip) {
        html += `
          <div class="teacher-note">
            <h4><i class="fa-solid fa-chalkboard-user"></i> Pedagogical Primer</h4>
            ${notesHtml}
          </div>
        `;
      }
    } else {
      // If no teacher notes but we somehow had objectives elsewhere (fallback)
      if (!isTrip) {
      }
    }

          
if (lesson.sources && lesson.sources.length > 0) {
        htmlSources1 += `<div class="sources-grid" style="margin-top: 20px;">`;
        lesson.sources.forEach(source => {
          htmlSources1 += `
            <div class="source-card" style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
              ${source.title ? `<h4 style="color: var(--primary); margin-top: 0; text-align: left;">${source.title}</h4>` : ''}
              
              ${source.src ? `
                <div style="display: inline-flex; flex-direction: column; position: relative; max-width: 100%; text-align: left; margin: 15px 0;">
                  <div style="position: relative;">
                    <img src="${getAssetUrl(source.src)}" alt="Source Image" style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in; display: block;" data-action="open-modal">
                  </div>
                  ${source.caption ? `
                    <div class="source-info-panel" style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; font-size: 0.95rem; color: #334155; margin-top: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: relative;">
                      <strong style="color: #0f172a; margin-bottom: 5px; display: block;">
                        <i class="fa-solid fa-circle-info" style="color: #10b981; margin-right: 5px;"></i>
                        About this source
                      </strong>
                      ${source.caption}
                    </div>
                  ` : ''}
                </div>
              ` : (source.caption ? `
                <div style="text-align: left; margin-top: 15px; font-size: 1.05rem; color: #334155; line-height: 1.5; padding: 15px; background: #f8fafc; border-left: 4px solid #10b981; border-radius: 4px;">
                  ${source.caption}
                </div>
              ` : '')}
              
              ${source.content ? `<div style="text-align: left; margin-top: 10px; font-style: italic; color: #334155; font-size: 1.05rem; line-height: 1.5;">${source.content}</div>` : ''}
              ${source.question ? `
                <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${source.qNum ? `Q${source.qNum}. ` : ''}${formatQuestion(source.question, !source.qNum)}</strong></p>
                </div>
              ` : ''}
            </div>
          `;
        });
        htmlSources1 += `</div>`;
      }

// ==========================================
    // TAB 1: PREPARATION
    // ==========================================
    htmlSources1 += ``;
    
    
if (lesson.primary_source) {
      let srcs = Array.isArray(lesson.primary_source.src) ? lesson.primary_source.src : [lesson.primary_source.src];
      htmlPrimary += `
        <div class="phase-card">
          <div class="source-card" style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-bottom: 15px;">
              ${srcs.map(src => `<img src="${getAssetUrl(src)}" alt="Source" style="max-height: 500px; max-width: ${srcs.length > 1 ? '45%' : '100%'}; object-fit: contain; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">`).join('')}
            </div>
            <div style="font-weight: bold; margin-bottom: 10px; font-size: 1.1rem; color: var(--primary);">${lesson.primary_source.title}</div>
            ${lesson.primary_source.caption ? `<div style="color: #475569; margin-bottom: 15px; font-size: 0.95rem; text-align: left;">${lesson.primary_source.caption}</div>` : ''}
            ${lesson.primary_source.question ? `
              <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 20px;">
                <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${lesson.primary_source.qNum ? `Q${lesson.primary_source.qNum}. ` : ''}${formatQuestion(lesson.primary_source.question, !lesson.primary_source.qNum)}</strong></p>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    
      if (lesson.starters && lesson.starters.length > 0) {
        htmlPrimary += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #1e3a8a, #3b82f6); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-image" style="margin-right: 10px;"></i> Historical Sources: Think & Wonder
            </div>
            <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
        `;
        lesson.starters.forEach((starter, index) => {
          htmlPrimary += `
              <div style="display: flex; flex-direction: column; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; height: 100%;">
                <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 1.1rem; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Source ${String.fromCharCode(65 + index)}: ${starter.title}</h4>
                <div style="width: 100%; height: 250px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                  <img src="${starter.source}" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" data-action="open-modal">
                </div>
                <div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">
                  ${starter.caption}
                </div>
                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; border-radius: 0 4px 4px 0; margin-top: auto;">
                  <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px; font-size: 0.95rem;"><i class="fa-solid fa-lightbulb" style="color: #fbbf24; margin-right: 5px;"></i> Think & Wonder</div>
                  <div style="font-size: 0.95rem; color: #1e40af;">${starter.think_wonder}</div>
                </div>
              </div>
          `;
        });
        htmlPrimary += `
            </div>
          </div>
        `;
      }
      
      if (lesson.utility_starters && lesson.utility_starters.sources) {
        htmlPrimary += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #475569, #334155); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-scale-balanced" style="margin-right: 10px;"></i> Historical Sources: Utility
            </div>
            <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
        `;
        lesson.utility_starters.sources.forEach((source, index) => {
          let sourceContentHtml = '';
          if (source.type === 'written') {
             sourceContentHtml = `
               <div style="width: 100%; height: 250px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 4px; padding: 20px; overflow-y: auto; margin-bottom: 15px; font-family: 'Playfair Display', serif; font-size: 1.1rem; line-height: 1.6; color: #422006; box-shadow: inset 0 0 10px rgba(0,0,0,0.02);">
                 <i class="fa-solid fa-quote-left" style="color: #facc15; font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                 ${source.content}
               </div>
             `;
          } else {
             sourceContentHtml = `
                <div style="width: 100%; height: 250px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                  <img src="${source.source}" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" data-action="open-modal">
                </div>
                ${source.caption ? `<div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">${source.caption}</div>` : ''}
             `;
          }

          htmlPrimary += `
              <div style="display: flex; flex-direction: column; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; height: 100%;">
                <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 1.1rem; border-bottom: 2px solid #475569; padding-bottom: 5px;">${source.title}</h4>
                ${sourceContentHtml}
                
                <details style="background: #f1f5f9; border-left: 4px solid #64748b; border-radius: 0 4px 4px 0; margin-top: auto; overflow: hidden;">
                  <summary style="padding: 12px; cursor: pointer; font-weight: 700; color: #334155; font-size: 0.95rem; list-style: none; display: flex; align-items: center;">
                    <i class="fa-solid fa-key" style="color: #fbbf24; margin-right: 8px;"></i> Reveal Provenance Clue
                  </summary>
                  <div style="padding: 0 12px 12px 12px; font-size: 0.95rem; color: #475569; border-top: 1px dashed #cbd5e1; margin-top: 4px; padding-top: 8px;">
                    ${source.provenance_clue}
                  </div>
                </details>
              </div>
          `;
        });
        htmlPrimary += `
            </div>
            <div style="padding: 15px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <h3 style="margin: 0; color: #0f172a; font-size: 1.15rem; font-family: 'Playfair Display', serif;">
                How useful are Sources A and B for an enquiry into ${lesson.utility_starters.enquiry}? (8 marks)
              </h3>
            </div>
          </div>
        `;
      }
      
      
    if (lesson.do_now && lesson.do_now.type === 'timeline' && lesson.do_now.events) {
      if (isTrip) {
        htmlDoNow += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 30px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              <div style="padding: 20px;">
                <div style="margin-bottom: 20px; font-size: 1.2rem; color: #1e3a8a;"><strong>${lesson.do_now.prediction_question || ''}</strong></div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
        `;
        lesson.do_now.events.forEach((ev, idx) => {
          htmlDoNow += `
            <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
              <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;"><i class="fa-regular fa-clock" style="margin-right: 6px;"></i>${ev.year}</div>
              <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">${ev.title}</div>
              <div style="font-size: 0.95rem; color: #475569;">${ev.detail}</div>
              ${ev.img ? `<div style="text-align: center; margin-top: 15px;"><img src="${getAssetUrl(ev.img)}" style="max-width: 40%; border-radius: 4px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>` : ''}
            </div>
          `;
        });
        htmlDoNow += `</div></div></div>`;
        
        // Add Map Container
        const eventsWithLoc = lesson.do_now.events.filter(e => e.lat && e.lng);
        if (eventsWithLoc.length > 0) {
          htmlDoNow += `
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 30px;">
              <div style="padding: 15px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: bold; font-size: 1.1rem; color: #1e293b;">
                <i class="fa-solid fa-map-location-dot" style="color: #ef4444; margin-right: 8px;"></i> Interactive Trip Map
              </div>
              <div id="trip-map-container" style="height: 500px; width: 100%;"></div>
            </div>
          `;
        }
      } else {
        htmlDoNow += `
          <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
              <summary style="padding: 10px 15px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
                <span><i class="fa-solid fa-clock-rotate-left" style="color: #3b82f6; margin-right: 10px;"></i> Chronological Timeline</span>
                <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
              </summary>
              <div style="padding: 20px;">
                <div style="margin-bottom: 20px; font-size: 1.1rem; color: #1e3a8a;"><strong>${lesson.do_now.prediction_question || ''}</strong></div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
        `;
        lesson.do_now.events.forEach((ev, idx) => {
          htmlDoNow += `
            <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
              <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;">${ev.year}</div>
              <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">${ev.title}</div>
              <div style="font-size: 0.95rem; color: #475569;">${ev.detail}</div>
              ${ev.img ? `<div style="text-align: center; margin-top: 15px;"><img src="${getAssetUrl(ev.img)}" style="max-width: 40%; border-radius: 4px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>` : ''}
            </div>
          `;
        });
        htmlDoNow += `</div></div></details>`;
      }
    } else if (lesson.do_now && lesson.do_now.items) {
      try {
        const taught = JSON.parse(localStorage.getItem('taughtUnits') || '[]');
        if (taught.length > 0 && window.KNOWLEDGE_BANK) {
          lesson.do_now.items.forEach(item => {
            if (item.question.includes('PAST TOPIC:')) {
              const unit = taught[Math.floor(Math.random() * taught.length)];
              const bank = window.KNOWLEDGE_BANK[unit];
              if (bank && bank.length > 0) {
                const randQ = bank[Math.floor(Math.random() * bank.length)];
                item.question = 'PAST TOPIC: ' + randQ.question;
                item.answer = randQ.answer;
              }
            }
          });
        }
      } catch(e) { console.error(e); }

      htmlDoNow += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-list-check" style="color: #3b82f6; margin-right: 10px;"></i> Do Now Tasks</span>
              <div>
                <button class="btn btn-secondary" data-action="toggle-all-answers" style="font-size: 0.9rem; padding: 4px 10px; margin-right: 10px;"><i class="fa-solid fa-eye"></i> Reveal All</button>
                <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
              </div>
            </summary>
            <div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
      `;
      const doNowItems = lesson.do_now.items || lesson.do_now.tasks || [];
      doNowItems.forEach((item, index) => {
        let qText = item.question || item.event || '';
        let aText = item.answer || item.year || '';
        if (typeof qText !== 'string') qText = String(qText);
        if (typeof aText !== 'string') aText = String(aText);
        if (window.currentUnitId) {
          qText = qText.replace(/src=['"]assets\//g, `src="/units/${window.currentUnitId}/assets/`);
          aText = aText.replace(/src=['"]assets\//g, `src="/units/${window.currentUnitId}/assets/`);
        }
        const cardId = `donow-card-${index}`;
        htmlDoNow += `
          <div class="do-now-card" id="do-now-card-${index}" data-action="toggle-element" data-target-id="${cardId}" style="cursor: pointer;">
            <div style="font-weight: 700; margin-bottom: 8px;">Task ${index + 1}</div>
            <div>${qText}</div>
            <div class="answer" id="${cardId}" style="display: none; margin-top: 10px; padding: 10px; background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">${aText}</div>
          </div>
        `;
      });
      htmlDoNow += `</div></details>`;
    }

    const hasVocab = lesson.vocab && lesson.vocab.length > 0;
    if (hasVocab) {
      htmlDoNow += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #b45309; font-weight: bold; font-size: 1.05rem; background: #fffbeb; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-spell-check" style="color: #b45309; margin-right: 10px;"></i> Key Vocabulary</span>
              <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
            </summary>
            <div style="padding: 20px;">
              <p style="color: #475569; margin-bottom: 20px; font-size: 1.1rem;"><strong>Vocabulary Practice:</strong> Tap a term on the left, then tap its matching definition on the right to master the key vocabulary.</p>
              <div id="vocab-match-game" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="match-terms" style="display: flex; flex-direction: column; gap: 10px;">
      `;
      
      lesson.vocab.forEach((v, idx) => {
        htmlDoNow += `<button class="btn btn-secondary match-term-btn" data-idx="${idx}" style="text-align: left; padding: 15px; font-weight: bold; border-width: 2px; transition: all 0.2s;">${v.term}</button>`;
      });
      
      htmlDoNow += `</div><div class="match-defs" style="display: flex; flex-direction: column; gap: 10px;">`;
      
      let defs = lesson.vocab.map((v, idx) => ({ def: v.definition, idx: idx }));
      defs.sort(() => Math.random() - 0.5);
      
      defs.forEach(d => {
        htmlDoNow += `<button class="btn btn-secondary match-def-btn" data-idx="${d.idx}" style="text-align: left; padding: 15px; font-weight: normal; border-width: 2px; transition: all 0.2s;">${d.def}</button>`;
      });
      
      htmlDoNow += `
                </div>
              </div>
              <div id="unlock-success" style="display: none; margin-top: 20px; padding: 15px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; color: #047857; font-weight: bold; text-align: center; font-size: 1.2rem;">
                <i class="fa-solid fa-star"></i> Vocabulary Mastered!
              </div>
            </div>
          </details>
      `;
    }

    

    // ==========================================
    // TAB 2: THE HISTORY
    // ==========================================
    htmlDoNow += ``;

    if (lesson.learning_objectives) {
      // Smart check: Only render overarching objective if it differs from the main lesson title
      let overarchingHtml = '';
      const cleanTitle = (lesson.title || '').replace(/^Lesson\s*\d+:\s*/i, '').trim();
      const cleanObj = (lesson.learning_objectives.overarching || '').trim();
      if (cleanObj && cleanObj !== cleanTitle) {
        overarchingHtml = `
          <p style="font-size: 1.1rem; font-weight: 600; color: #1e3a8a; margin-bottom: 15px;">
            ${lesson.learning_objectives.overarching}
          </p>
        `;
      }
      
      htmlDoNow += `
        <div class="learning-objectives-card" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-top: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; margin-bottom: ${overarchingHtml ? '0' : '15px'};">
            <i class="fa-solid fa-bullseye" style="color: #10b981;"></i> Learning Objectives
          </h3>
          ${overarchingHtml}
          <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
            ${lesson.learning_objectives.scaffolded.map(obj => `<li style="margin-bottom: 8px;">${obj}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    let videos = [];
    if (lesson.video) {
      videos = videos.concat(Array.isArray(lesson.video) ? lesson.video : [lesson.video]);
    }
    if (lesson.extra_videos && Array.isArray(lesson.extra_videos)) {
      videos = videos.concat(lesson.extra_videos);
    }
    
    if (videos.length > 0) {
      htmlDoNow += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <summary style="cursor: pointer; padding: 20px; font-size: 1.25rem; color: #b45309; font-weight: 600; display: flex; align-items: center; gap: 10px; user-select: none;">
            <i class="fa-brands fa-youtube" style="color: #dc2626;"></i> Lesson Video Resources (${videos.length})
          </summary>
          <div style="padding: 0 20px 20px 20px; display: flex; flex-direction: column; gap: 15px;">
      `;

      videos.forEach((vid) => {
        let providerText = vid.type === 'youtube' ? 'YouTube' : 'ERA';
        let iconColor = vid.type === 'youtube' ? '#dc2626' : '#3b82f6';
        let iconClass = vid.type === 'youtube' ? 'fa-brands fa-youtube' : 'fa-solid fa-arrow-up-right-from-square';

        htmlDoNow += `
          <div style="background: #f8fafc; border-left: 4px solid ${iconColor}; border-radius: 4px; padding: 12px 16px; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <i class="${iconClass}" style="font-size: 1.2rem; color: ${iconColor};"></i>
                <div>
                  <div style="color: #1e293b; font-size: 0.95rem; font-weight: 600;">${vid.title || 'External Video Resource'} ${vid.duration ? `<span style="color: #64748b; font-weight: normal; margin-left: 8px;"><i class="fa-regular fa-clock"></i> ${vid.duration}</span>` : ''}</div>
                  <div style="color: #64748b; font-size: 0.85rem;">External ${providerText} Video. Opens in a new secure tab.</div>
                </div>
              </div>
              <a href="${vid.url}" target="_blank" style="white-space: nowrap; background: #eff6ff; color: #2563eb; padding: 6px 12px; border: 1px solid #bfdbfe; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.9rem; transition: all 0.2s;">
                Watch <i class="fa-solid fa-play" style="margin-left: 4px; font-size: 0.8rem;"></i>
              </a>
            </div>
            ${vid.viewing_task ? `<div style="background: #fffbeb; border-left: 3px solid #f59e0b; padding: 8px 12px; font-size: 0.9rem; color: #b45309;"><i class="fa-solid fa-bullseye" style="margin-right: 5px;"></i> <b>Viewing Task:</b> ${vid.viewing_task}</div>` : ''}
            ${vid.model_answer ? `
            <details style="background: #f0fdf4; border-left: 3px solid #22c55e; border-radius: 2px;">
              <summary style="cursor: pointer; padding: 8px 12px; font-size: 0.9rem; color: #166534; font-weight: 600; user-select: none; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-key"></i> Reveal Model Answer
              </summary>
              <div style="padding: 0 12px 12px 12px; font-size: 0.9rem; color: #14532d; line-height: 1.5;">
                ${vid.model_answer}
              </div>
            </details>
            ` : ''}
          </div>
        `;
      });
      
      htmlDoNow += `
          </div>
        </details>
      `;
    }

    
if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
      htmlNarrative += `
        <div class="phase-card">
      `;
      
      lesson.narrative_blocks.forEach((block, index) => {
        if (block.type === 'interactive_map') {
          htmlNarrative += `
            <div class="interactive-map-container" style="margin: 30px 0; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h3 style="margin-top: 0; color: #1e293b; font-family: 'Playfair Display', serif;"><i class="fa-solid fa-map-location-dot"></i> Interactive Historical Map</h3>
              <div class="map-img-wrapper" style="position: relative; height: 500px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; margin-bottom: 20px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
          `;
          
          block.maps.forEach((m, idx) => {
            htmlNarrative += `<img src="${getAssetUrl(m.src)}" id="map-img-${m.id}" style="position: absolute; max-width: 100%; max-height: 100%; object-fit: contain; opacity: ${idx === 0 ? '1' : '0'}; transition: opacity 0.6s ease-in-out; border-radius: 6px;">`;
          });
          
          htmlNarrative += `
              </div>
              <div id="map-caption-display" style="font-size: 1.1rem; font-style: italic; color: #334155; min-height: 3em; margin-bottom: 20px;">${block.maps[0].caption}</div>
              <div class="map-controls" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          `;
          
          block.maps.forEach((m, idx) => {
            const activeClass = idx === 0 ? 'active-map-btn' : '';
            htmlNarrative += `
                <button class="btn btn-secondary map-toggle-btn ${activeClass}" data-map-id="${m.id}" data-caption="${m.caption.replace(/"/g, '&quot;')}" data-action="toggle-map" style="border-radius: 30px; padding: 8px 16px; font-weight: bold;">
                  ${m.year} ${m.label}
                </button>
            `;
          });
          
          htmlNarrative += `
              </div>
            </div>
          `;
          return;
        }
        
        if (block.type === 'photo_slider') {
          htmlNarrative += `
            <div class="photo-slider-container" style="margin: 30px 0; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h3 style="margin-top: 0; color: #1e293b; font-family: 'Playfair Display', serif;"><i class="fa-solid fa-camera-rotate"></i> Then & Now</h3>
              <div style="position: relative; width: 100%; max-width: 800px; margin: 0 auto; height: 400px; overflow: hidden; border-radius: 8px; border: 1px solid #e2e8f0; background: #e2e8f0;">
                <!-- After (Bottom) Image -->
                <img src="${getAssetUrl(block.after_image)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none;" alt="${block.after_label || 'After'}">
                
                <!-- Before (Top) Image Wrapper -->
                <div class="slider-before-wrapper" style="position: absolute; top: 0; left: 0; width: 50%; height: 100%; overflow: hidden; border-right: 3px solid white; box-shadow: 2px 0 10px rgba(0,0,0,0.3);">
                  <img src="${getAssetUrl(block.before_image)}" style="position: absolute; top: 0; left: 0; width: 100vw; max-width: 800px; height: 100%; object-fit: cover; pointer-events: none;" alt="${block.before_label || 'Before'}">
                </div>
                
                <!-- Slider Handle Visual -->
                <div class="slider-handle" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 6px rgba(0,0,0,0.3); pointer-events: none; z-index: 2;">
                  <i class="fa-solid fa-arrows-left-right" style="color: #334155;"></i>
                </div>

                <!-- Invisible Range Input -->
                <input type="range" min="0" max="100" value="50" class="photo-range-slider" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 3;" oninput="
                  const wrapper = this.parentElement.querySelector('.slider-before-wrapper');
                  const handle = this.parentElement.querySelector('.slider-handle');
                  wrapper.style.width = this.value + '%';
                  handle.style.left = this.value + '%';
                ">
              </div>
              <div style="display: flex; justify-content: space-between; max-width: 800px; margin: 10px auto 0 auto; color: #64748b; font-weight: bold;">
                <span>${block.before_label || 'Before'}</span>
                <span>${block.after_label || 'After'}</span>
              </div>
            </div>
          `;
          return;
        }

        if (block.type === 'flip_card_gallery') {
          const searchId = 'search-cards-' + Math.random().toString(36).substr(2, 9);
          
          htmlNarrative += `
            <div class="flip-card-gallery-wrapper" style="margin: 40px 0; background: #1e293b; border: 2px solid #0f172a; border-radius: 12px; padding: 25px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
              <h3 style="margin-top: 0; color: #f8fafc; font-family: 'Playfair Display', serif; text-align: center; border-bottom: 1px solid #475569; padding-bottom: 15px; margin-bottom: 20px;">
                <i class="fa-solid fa-users-viewfinder"></i> The Fallen
              </h3>
              ${block.cards && block.cards.length > 10 ? `
              <div style="text-align: center; margin-bottom: 30px;">
                <input type="text" id="${searchId}" placeholder="Search names..." onkeyup="
                  const filter = this.value.toUpperCase();
                  const gallery = this.parentElement.nextElementSibling;
                  const cards = gallery.getElementsByClassName('flip-card-wrapper');
                  for (let i = 0; i < cards.length; i++) {
                    const name = cards[i].getAttribute('data-name');
                    if (name.toUpperCase().indexOf(filter) > -1) {
                      cards[i].style.display = '';
                    } else {
                      cards[i].style.display = 'none';
                    }
                  }
                " style="padding: 12px 20px; width: 80%; max-width: 400px; border-radius: 25px; border: 1px solid #334155; background: #0f172a; color: white; outline: none; font-size: 1.1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
              </div>` : ''}
              
              <div class="flip-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px;">
          `;
          
          if (block.cards && Array.isArray(block.cards)) {
            block.cards.forEach(card => {
              htmlNarrative += `
                <div class="flip-card-wrapper" data-name="${card.name.replace(/"/g, '&quot;')}" style="background-color: transparent; height: 350px; perspective: 1000px; cursor: pointer;" data-action="flip-card">
                  <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.8s; transform-style: preserve-3d;">
                    
                    <!-- Front of card -->
                    <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background-color: #334155; color: white; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); border: 1px solid #475569;">
                      <h4 style="margin: 0 0 15px 0; font-size: 1.4rem; font-family: 'Playfair Display', serif; color: #f8fafc; border-bottom: 2px solid #1e293b; padding-bottom: 10px; width: 100%;">${card.name}</h4>
                      <p style="font-size: 1.05rem; font-style: italic; color: #cbd5e1; margin: 0;">${card.background}</p>
                      <div style="margin-top: auto; color: #94a3b8; font-size: 0.85rem;"><i class="fa-solid fa-hand-pointer"></i> Tap to flip</div>
                    </div>
                    
                    <!-- Back of card -->
                    <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background-color: #0f172a; color: white; transform: rotateY(180deg); border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 2px solid #065f46; overflow-y: auto;">
                      <i class="fa-solid fa-cross" style="color: #059669; font-size: 2rem; margin-bottom: 15px;"></i>
                      <p style="font-size: 1rem; line-height: 1.5; color: #e2e8f0; margin: 0;">${card.story}</p>
                    </div>
                    
                  </div>
                </div>
              `;
            });
          }
          
          htmlNarrative += `
              </div>
            </div>
          `;
          return;
        }

        const bg = (index % 2 === 0) ? '#ffffff' : '#f0f9ff';
        
        if (typeof block.text === 'string' && block.text.match(/^\[Key Individual:\s*(.+)\]$/i)) {
          const kiMatch = block.text.match(/^\[Key Individual:\s*(.+)\]$/i);
          const personName = kiMatch[1].trim();
          let person = null;
          if (window.db && window.currentUnitId) {
            const unitDb = window.db[window.currentUnitId];
            person = unitDb.data?.key_individuals?.find(p => p.name.toLowerCase().includes(personName.toLowerCase()));
            if (!person) person = unitDb.biographies?.find(p => p.name.toLowerCase().includes(personName.toLowerCase()));
          }
          if (person) {
             const cardHtml = generateKeyIndividualEmbedHTML ? generateKeyIndividualEmbedHTML(person) : `<div>${person.name}</div>`;
             htmlNarrative += `
               <div class="key-individual-embed" style="margin-bottom: 20px; border: 1px solid var(--border-glass); border-radius: 8px; overflow: hidden; background: #f8fafc; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                 <button data-action="toggle-chevron" style="width: 100%; text-align: left; padding: 15px 20px; background: rgba(59, 130, 246, 0.1); border: none; font-weight: bold; color: #1e3a8a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.05rem; transition: background 0.2s;">
                   <span><i class="fa-solid fa-id-card-clip" style="margin-right: 10px; color: #3b82f6;"></i> Key Individual: ${person.name}</span>
                   <i class="fa-solid fa-chevron-down chevron-icon"></i>
                 </button>
                 <div style="display: none; padding: 25px; background: #ffffff;">
                   <div style="width: 100%; margin: 0 auto;">
                     ${cardHtml}
                   </div>
                 </div>
               </div>
             `;
             return;
          }
        }

        const isQuote = typeof block.text === 'string' && block.text.startsWith('"');
        let blockText = block.text || '';
        
        // 1. Add inline Key Individual links FIRST
        let contentStr = blockText.replace(/\[Key Individual:\s*([^\]]+)\]/gi, (match, name) => {
            const hasPerson = appStore.state.activeUnitData && appStore.state.activeUnitData.key_individuals && appStore.state.activeUnitData.key_individuals.some(p => p.name && p.name.toLowerCase() === name.toLowerCase());
            if (!hasPerson) {
                return name;
            }
            return `<a href="javascript:void(0)" class="key-individual-inline-link no-print" data-action="jump-to-key-individual" data-name="${name}" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer; padding: 2px 6px; font-size: 0.95em; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; vertical-align: baseline;"><i class="fa-solid fa-id-card-clip"></i> ${name}</a><span class="print-only" style="display:none; font-weight:bold;">${name}</span>`;
        });

        // 2. Add Glossary highlighting SECOND (it will skip the <a> tags we just made)
        contentStr = isQuote ? `<em style="font-size:1.1rem; color:#475569;">${contentStr}</em>` : highlightGlossary(contentStr);

        contentStr = formatBold(contentStr);
        contentStr = contentStr.replace(/src=["'](\.\/)?assets\//g, 'src="/units/' + window.currentUnitId + '/assets/');
        let styledContent = contentStr;
        if (!isQuote && !contentStr.trim().startsWith('<') && contentStr.length > 20) {
           const firstLetter = contentStr.charAt(0);
           const rest = contentStr.slice(1);
           styledContent = `<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #1e3a8a;">${firstLetter}</span>` + rest;
        }
        
        let l4StyledContent = '';
        if (block.level_4) {
          // 1. Add inline Key Individual links FIRST
          let l4ContentStr = block.level_4.replace(/\[Key Individual:\s*([^\]]+)\]/gi, (match, name) => {
              const hasPerson = appStore.state.activeUnitData && appStore.state.activeUnitData.key_individuals && appStore.state.activeUnitData.key_individuals.some(p => p.name && p.name.toLowerCase() === name.toLowerCase());
              if (!hasPerson) {
                  return name;
              }
              return `<a href="javascript:void(0)" class="key-individual-inline-link no-print" data-action="jump-to-key-individual" data-name="${name}" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer; padding: 2px 6px; font-size: 0.95em; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; vertical-align: baseline;"><i class="fa-solid fa-id-card-clip"></i> ${name}</a><span class="print-only" style="display:none; font-weight:bold;">${name}</span>`;
          });
          
          // 2. Add Glossary highlighting SECOND
          l4ContentStr = isQuote ? `<em style="font-size:1.1rem; color:#475569;">${l4ContentStr}</em>` : highlightGlossary(l4ContentStr);

          l4ContentStr = formatBold(l4ContentStr);
          l4StyledContent = l4ContentStr;
          if (!isQuote && !l4ContentStr.trim().startsWith('<') && l4ContentStr.length > 20) {
             const firstLetter = l4ContentStr.charAt(0);
             const rest = l4ContentStr.slice(1);
             l4StyledContent = `<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #047857;">${firstLetter}</span>` + rest;
          }
        }

        let themeHeadingHtml = '';
        if (block.theme_heading) {
          const headingId = block.theme_heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          themeHeadingHtml = `<h4 id="${headingId}" style="margin-top: 0; margin-bottom: 10px; color: #1e3a8a; font-size: 1.15rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; display: inline-block;"><i class="fa-solid fa-bookmark" style="color: #64748b; margin-right: 8px;"></i>${block.theme_heading}</h4><br/>`;
        }

        let imageHtml = '';
        if (block.images && Array.isArray(block.images) && block.images.length > 0) {
           const galleryData = encodeURIComponent(JSON.stringify(block.images.map(img => ({ src: getAssetUrl(img.src || img.image), alt: img.alt || img.image_alt || '' })))).replace(/'/g, "%27");
           imageHtml = `
             <style>
               .image-hint-caption {
                 font-size: 0.9rem; color: #64748b; margin-top: 8px; font-style: italic; cursor: pointer; user-select: none; transition: all 0.3s ease; padding: 4px; border-radius: 4px; display: inline-block;
               }
               .image-hint-caption:hover {
                 background: rgba(0,0,0,0.02);
               }
               .image-hint-caption.blurred {
                 color: transparent !important; text-shadow: 0 0 10px rgba(100,116,139,0.8) !important;
               }
             </style>
             <div class="narrative-images-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 20px 0;">
               ${block.images.map((img, idx) => {
                 if (img.image_context) {
                   return `
                     <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; justify-content: center; margin: 20px 0; width: 100%; grid-column: 1 / -1;">
                       <div style="flex: 1 1 300px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                         <img src="${getAssetUrl(img.src || img.image)}" alt="${img.alt || img.image_alt || 'Narrative Image'}" style="width: 100%; max-height: 400px; object-fit: contain; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" data-action="open-gallery" data-gallery="${galleryData}" data-index="${idx}">
                         ${(img.caption || img.image_caption || img.alt || img.image_alt) ? `<div class="image-hint-caption" data-action="toggle-caption-blur" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> ${img.source_letter ? `<strong>Source ${img.source_letter}:</strong> ` : ''}${img.caption || img.image_caption || img.alt || img.image_alt}</div>` : ''}
                       </div>
                       <div style="flex: 1 1 300px; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center;">
                         <h4 style="margin-top: 0; margin-bottom: 12px; color: #b45309; display: flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                           <i class="fa-solid fa-magnifying-glass-plus"></i> Historical Context
                         </h4>
                         <p style="margin: 0; font-size: 1rem; color: #334155; line-height: 1.6;">
                           ${img.image_context.replace(/\*\*Hinge Question:\*\*/g, '<br><br><strong style="color: #b45309;">Hinge Question:</strong>')}
                         </p>
                       </div>
                     </div>
                   `;
                 } else {
                   return `
                     <div class="narrative-image-container" style="text-align: center;">
                       <img src="${getAssetUrl(img.src || img.image)}" alt="${img.alt || img.image_alt || 'Narrative Image'}" style="width: 100%; max-height: 400px; object-fit: contain; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" data-action="open-gallery" data-gallery="${galleryData}" data-index="${idx}">
                       ${(img.caption || img.image_caption || img.alt || img.image_alt) ? `<div class="image-hint-caption" data-action="toggle-caption-blur" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> ${img.source_letter ? `<strong>Source ${img.source_letter}:</strong> ` : ''}${img.caption || img.image_caption || img.alt || img.image_alt}</div>` : ''}
                     </div>
                   `;
                 }
               }).join('')}
             </div>
           `;
        } else if (block.image) {
           let containerStyle = block.image_context 
             ? 'display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; justify-content: center; margin: 20px 0;'
             : 'text-align: center; margin: 20px 0;';
           let imgWrapperStyle = block.image_context 
             ? 'flex: 1 1 300px; text-align: center; display: flex; flex-direction: column; justify-content: center;' 
             : '';
           let contextHtml = block.image_context 
             ? `
               <div style="flex: 1 1 300px; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center;">
                 <h4 style="margin-top: 0; margin-bottom: 12px; color: #b45309; display: flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                   <i class="fa-solid fa-magnifying-glass-plus"></i> Historical Context
                 </h4>
                 <p style="margin: 0; color: #334155; line-height: 1.6; font-size: 1rem;">${block.image_context.replace(/\*\*Hinge Question:\*\*/g, '<br><br><strong style="color: #b45309;">Hinge Question:</strong>')}</p>
               </div>
               `
             : '';
           
           imageHtml = `
             <style>
               .image-hint-caption {
                 font-size: 0.9rem; color: #64748b; margin-top: 8px; font-style: italic; cursor: pointer; user-select: none; transition: all 0.3s ease; padding: 4px; border-radius: 4px; display: inline-block;
               }
               .image-hint-caption:hover {
                 background: rgba(0,0,0,0.02);
               }
               .image-hint-caption.blurred {
                 color: transparent !important; text-shadow: 0 0 10px rgba(100,116,139,0.8) !important;
               }
             </style>
             <div class="narrative-image-container" style="${containerStyle}">
               <div style="${imgWrapperStyle}">
                 <img src="${getAssetUrl(block.image)}" alt="${block.image_alt || 'Narrative Image'}" style="max-width: 100%; max-height: 400px; object-fit: contain; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" data-action="open-modal">
                 ${(block.caption || block.image_caption || block.image_alt) ? `<div class="image-hint-caption" data-action="toggle-caption-blur" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> ${block.source_letter ? `<strong>Source ${block.source_letter}:</strong> ` : ''}${block.caption || block.image_caption || block.image_alt}</div>` : ''}
               </div>
               ${contextHtml}
             </div>
           `;
        }

        let blockSourceHtml = '';
        if (block.source) {
             let sourceContentHtml = '';
             if (block.source.type === 'written') {
                 sourceContentHtml = `
                   <div style="width: 100%; max-height: 350px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 4px; padding: 20px; overflow-y: auto; margin-bottom: 15px; font-family: 'Playfair Display', serif; font-size: 1.1rem; line-height: 1.6; color: #422006; box-shadow: inset 0 0 10px rgba(0,0,0,0.02);">
                     <i class="fa-solid fa-quote-left" style="color: #facc15; font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                     ${block.source.content}
                   </div>
                 `;
             } else {
                 sourceContentHtml = `
                    <div style="width: 100%; max-height: 400px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                      <img src="${getAssetUrl(block.source.source || block.source.src)}" alt="Source" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" data-action="open-modal">
                    </div>
                 `;
             }

             blockSourceHtml = `
              <div class="gcse-source-container" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: left;">
                ${block.source.caption ? `<h4 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center; line-height: 1.4;">
                  <i class="fa-solid fa-file-lines" style="color: #3b82f6; margin-right: 10px;"></i>
                  ${block.source.caption}
                </h4>` : (block.source.title ? `<h4 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center;">
                  <i class="fa-solid fa-file-lines" style="color: #3b82f6; margin-right: 10px;"></i>
                  ${block.source.title}
                </h4>` : '')}
                ${sourceContentHtml}
                ${block.source.source_context ? `
                  <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 15px; border-radius: 0 4px 4px 0; margin-top: 15px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
                    <strong>Historical Context:</strong> ${window.formatBold(block.source.source_context)}
                  </div>
                ` : ''}
                ${block.source.provenance_clue ? `
                  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px; margin-top: 15px;">
                    <strong style="color: #166534; display: block; margin-bottom: 5px;"><i class="fa-solid fa-magnifying-glass" style="margin-right: 5px;"></i> Provenance Clue:</strong>
                    <span style="color: #15803d; font-size: 0.95rem;">${window.formatBold(block.source.provenance_clue)}</span>
                  </div>
                ` : ''}
                ${block.source.question ? `<div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${block.source.qNum ? `Q${block.source.qNum}. ` : ''}${formatQuestion(block.source.question, !block.source.qNum)}</strong></p>
                </div>` : ''}
              </div>
             `;
        }

        htmlNarrative += `
            <div class="standard-narrative-container">
              ${imageHtml}
              ${blockSourceHtml}
              <div id="para-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                ${(!block.text || !block.text.trim() || (typeof block.text === 'string' && block.text.includes('side-quest-box')) || (block.title && block.title.toLowerCase().includes('lesson reflection'))) ? '' : '<div class="para-number">' + (index + 1) + '</div>'}
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">${themeHeadingHtml}${styledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" data-action="read-aloud" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          `;

        let extrasHtml = '';
        if (block.level_4) {
          extrasHtml += `
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-${index + 1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">${index + 1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;">${l4StyledContent}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" data-action="read-aloud" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          `;
        }
        
        if (block.hinge_question) {
          const hingeId = `hinge-${index}`;
          const hingeQuestionText = block.hinge_question.text || block.hinge_question.question;
          const correctIndex = block.hinge_question.correct_index !== undefined ? block.hinge_question.correct_index : block.hinge_question.answer;
          extrasHtml += `
            <div class="hinge-question-container no-print" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px;">
              <button class="btn btn-secondary" id="btn-${hingeId}" data-action="reveal-hinge" data-target="${hingeId}" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Hinge Question</button>
              <div id="${hingeId}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"${hingeQuestionText}"</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${block.hinge_question.options.map((opt, i) => `
                    <button data-action="hinge-mcq-select" data-correct="${correctIndex}" data-index="${i}" style="text-align: left; background: white; border: 1px solid #bae6fd; padding: 12px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem; color: #334155;">
                      <strong>${String.fromCharCode(65 + i)}:</strong> ${opt}
                    </button>
                  `).join('')}
                </div>
                <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                  <strong>Explanation:</strong> ${block.hinge_question.explanation}
                </div>
              </div>
            </div>
          `;
        }
        
        if (block.tasks && block.tasks.length > 0) {
          extrasHtml += `<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">`;
          block.tasks.forEach((task, tIdx) => {
             if (task.type === 'convict_game') {
              const gameId = `convict-game-emb-${index}-${tIdx}`;
              extrasHtml += `<div id="${gameId}" style="margin-bottom: 20px;"></div>`;
              window.postRenderHooks.push(() => {
                import('../convict_game.js').then(mod => {
                   mod.initConvictGame(document.getElementById(gameId), task);
                });
              });
              return;
            }
            if (task.type === 'physician_game') {
              const gameId = `physician-game-emb-${index}-${tIdx}`;
              extrasHtml += `<div id="${gameId}" style="margin-bottom: 20px;"></div>`;
              window.postRenderHooks.push(() => {
                import('../physician_game.js').then(mod => {
                   mod.initPhysicianGame(document.getElementById(gameId), task);
                });
              });
              return;
            }
            if (task.type === 'drag_drop_timeline') {
               const timelineId = `dd-timeline-emb-${index}-${tIdx}`;
               extrasHtml += `<div id="${timelineId}" style="margin-bottom: 20px;"></div>`;
               window.postRenderHooks.push(() => {
                 import('../drag_drop_timeline.js').then(mod => {
                    mod.initDragDropTimeline(document.getElementById(timelineId), task);
                 });
               });
               return;
             }
             if (task.type === 'interactive_map') {
               const mapId = `interactive-map-emb-${index}-${tIdx}`;
               extrasHtml += `<div id="${mapId}" style="margin-bottom: 20px;"></div>`;
               window.postRenderHooks.push(() => {
                 import('../interactive_map.js').then(mod => {
                    mod.initInteractiveMap(document.getElementById(mapId), task);
                 });
               });
               return;
             }
             if (task.type === 'spectrum_mapper') {
               const spectrumId = `spectrum-emb-${index}-${tIdx}`;
               extrasHtml += `<div id="${spectrumId}" style="margin-bottom: 20px;"></div>`;
               window.postRenderHooks.push(() => {
                 import('../spectrum_mapper.js').then(mod => {
                    mod.initSpectrumMapper(document.getElementById(spectrumId), task);
                 });
               });
               return;
             }
             if (task.type === 'multiple_choice') {
               extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-list-check"></i> ${task.text || task.question || ''}</h4>
                 ${task.questions.map((q, qIdx) => `
                   <div style="margin-top: 15px;">
                     <strong>${q.q}</strong>
                     <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;">
                       ${q.options.map((opt, oIdx) => `
                         <label style="cursor:pointer; display:flex; align-items:center; gap:8px;">
                           <input type="radio" name="mc-${index}-${tIdx}-${qIdx}" value="${oIdx}">
                           <span>${opt}</span>
                         </label>
                       `).join('')}
                     </div>
                   </div>
                 `).join('')}
               </div>`;
               return;
             }
             if (task.type === 'sorting') {
               extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-arrow-down-1-9"></i> ${task.text || task.question || ''}</h4>
                 <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                   ${task.events.map((ev, eIdx) => `
                     <div style="display:flex; align-items:center; gap:10px;">
                       <input type="number" min="1" max="${task.events.length}" style="width:50px; padding:5px; border:1px solid #ccc; border-radius:4px;">
                       <span>${ev}</span>
                     </div>
                   `).join('')}
                 </div>
               </div>`;
               return;
             }
             if (task.type === 'cloze') {
               let renderedCloze = task.cloze_text.replace(/\[([^\]]+)\]/g, '<input type="text" placeholder="..." style="border:none; border-bottom:2px solid #3b82f6; background:transparent; width:100px; text-align:center; margin:0 5px;" />');
               extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-pen-clip"></i> ${task.text || task.question || ''}</h4>
                 <div style="margin-bottom: 15px; padding:10px; background:#e0f2fe; border-radius:6px; font-weight:bold; color:#0369a1;">Word Bank: ${task.words.join(' | ')}</div>
                 <p style="line-height:1.8; font-size:1.05rem;">${renderedCloze}</p>
               </div>`;
               return;
             }
             if (task.type === 'matching') {
               extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-link"></i> ${task.text}</h4>
                 <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:15px;">
                   <div style="display:flex; flex-direction:column; gap:10px;">
                     ${task.pairs.map(p => `<div style="padding:10px; background:white; border:1px solid #cbd5e1; border-radius:6px; font-weight:bold;">${p.left}</div>`).join('')}
                   </div>
                   <div style="display:flex; flex-direction:column; gap:10px;">
                     ${[...task.pairs].sort(() => Math.random() - 0.5).map(p => `<div style="padding:10px; background:white; border:1px solid #cbd5e1; border-radius:6px;">${p.right}</div>`).join('')}
                   </div></div></details>`;
               return;
             }
             if (task.type === 'table_planner') {
               extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; overflow-x:auto;">
                  <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-table"></i> ${task.text || task.question || 'Planner'}</h4>
                 <table style="width:100%; border-collapse:collapse; margin-top:10px; background:white;">
                   <thead><tr>${task.columns.map(c => `<th style="border:1px solid #cbd5e1; padding:10px; background:#e2e8f0; color:#1e293b; text-align:left;">${c}</th>`).join('')}</tr></thead>
                   <tbody>
                     ${Array.from({length: task.rows}).map(() => `<tr>${task.columns.map(() => `<td style="border:1px solid #cbd5e1; padding:10px;"><textarea style="width:100%; min-height:60px; border:none; resize:vertical; outline:none;" placeholder="Type here..."></textarea></td>`).join('')}</tr>`).join('')}
                   </tbody>
                 </table>
               </div>`;
               return;
             }
             if (task.type === 'think_pair_share') {
               extrasHtml += `<div style="margin-bottom: 20px; background: #ecfdf5; padding: 15px; border-radius: 8px; border: 2px solid #10b981;">
                 <h4 style="margin-top:0; color:#065f46;"><i class="fa-solid fa-users"></i> Think-Pair-Share</h4>
                 <p style="font-weight:bold; color:#0f172a; font-size:1.1rem;">${task.text || task.question}</p>
                 <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-top:15px;">
                   <div style="background:white; padding:10px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                     <div style="font-weight:bold; color:#059669; margin-bottom:8px;"><i class="fa-solid fa-brain"></i> My Thoughts</div>
                     <textarea style="width:100%; border:none; resize:vertical; min-height:80px; outline:none;" placeholder="Jot down your initial ideas..."></textarea>
                   </div>
                   <div style="background:white; padding:10px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                     <div style="font-weight:bold; color:#059669; margin-bottom:8px;"><i class="fa-solid fa-comments"></i> Partner's Thoughts</div>
                     <textarea style="width:100%; border:none; resize:vertical; min-height:80px; outline:none;" placeholder="What did your partner add?..."></textarea>
                   </div></div></details>`;
               return;
             }
             if (task.type === 'drawing') {
               extrasHtml += `<div style="margin-bottom: 20px; background: #fffbeb; padding: 15px; border-radius: 8px; border: 2px dashed #f59e0b; text-align:center;">
                 <h4 style="margin-top:0; color:#b45309;"><i class="fa-solid fa-palette"></i> Drawing Task</h4>
                 <p style="font-weight:bold; color:#0f172a; font-size:1.05rem;">${task.text || task.question}</p>
                 <div style="margin:20px auto; width:80%; height:200px; background:white; border:1px solid #d1d5db; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#9ca3af; font-style:italic;">
                   [Draw your response in your workbook]
                 </div>
               </div>`;
               return;
             }
             const qPrefix = task.qNum ? `Q${task.qNum}. ` : "";
             const ansId = `ans-emb-${index}-${tIdx}`;
             const starterBtn = task.starter ? `<button class="btn" data-action="toggle-element" data-target-id="starter-${ansId}" style="margin-left: 5px; padding: 4px 8px; font-size: 0.8rem; background: #e0f2fe; color: #0284c7; border: 1px solid #7dd3fc;"><i class="fa-solid fa-pen"></i> Starter</button>` : "";
             const starterDiv = task.starter ? `<div class="starter-box" id="starter-${ansId}" style="display: none; margin-top: 8px; background: #f0f9ff; padding: 10px; border-left: 3px solid #0284c7; font-style: italic; color: #0c4a6e; transition: all 0.3s ease;">${task.starter}</div>` : "";
             extrasHtml += `
               <div style="margin-bottom: 10px;">
                 <div style="font-size: 1.05rem; line-height: 1.6; color: #1e293b; margin-bottom: 8px;">${window.formatBold(qPrefix + (task.text || task.question || ''))}</div>
                 <button class="btn btn-secondary" data-action="toggle-element" data-target-id="${ansId}" style="padding: 4px 8px; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Show</button>
                 ${starterBtn}
                 ${starterDiv}
                 <div class="answer" id="${ansId}" style="display: none; margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03; line-height: 1.6;">${window.formatBold(task.model || task.model_answer || '')}</div>
               </div>
             `;
          });
          extrasHtml += `</div>`;
          
          if (block.flashcards && block.flashcards.length > 0) {
            extrasHtml += `<div style="margin-top: 20px; padding: 20px; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px;"><div class="flashcard-deck">`;
            block.flashcards.forEach(fc => {
              let t = fc.term || fc.word || fc.title || '';
              let d = fc.definition || fc.meaning || fc.desc || '';
              extrasHtml += `
                <div class="flashcard-wrapper" data-action="flip-card-wrapper">
                  <div class="flashcard-inner">
                    <div class="flashcard-face flashcard-front">
                      <h4>${t}</h4>
                      <p style="font-size: 0.9rem; margin-top: 10px;">Tap to reveal</p>
                    </div>
                    <div class="flashcard-face flashcard-back">
                      ${d}
                    </div>
                  </div>
                </div>
              `;
            });
            extrasHtml += `</div></div>`;
          }
        }

        let isSideQuest = styledContent.includes('</details>') && (block.title && block.title.includes('Side Quest'));
        if (isSideQuest) {
           styledContent = styledContent.replace('</details>', extrasHtml + '</details>');
           extrasHtml = '';
           // Rewrite the actual styledContent in the narrative chunk manually below
        }

        htmlNarrative += extrasHtml;
        });

      
let hasModels = false;
if (lesson.tasks) {
        hasModels = lesson.tasks.some(t => !!t.model);
      }
      if (lesson.historians_corner && lesson.historians_corner.stretch_model) {
        hasModels = true;
      }
      
      const revealBtn = hasModels ? `<button class="btn btn-secondary" data-action="reveal-all-models" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>` : '';

      htmlTasks += `
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
            
            ${revealBtn}
          </div>
      `;

      if (lesson.tasks && lesson.tasks.length > 0) {
        lesson.tasks.forEach((task, tIdx) => {
          if (task.type === 'drag_drop_timeline') {
            const timelineId = `dd-timeline-lesson-${tIdx}`;
            htmlTasks += `<div id="${timelineId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../drag_drop_timeline.js').then(mod => {
                 mod.initDragDropTimeline(document.getElementById(timelineId), task);
              });
            });
            return;
          }
          if (task.type === 'interactive_map') {
            const mapId = `interactive-map-lesson-${tIdx}`;
            htmlTasks += `<div id="${mapId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../interactive_map.js').then(mod => {
                 mod.initInteractiveMap(document.getElementById(mapId), task);
              });
            });
            return;
          }
          let rawQText = task.text || task.question || "";
          let cleaned = rawQText.replace(/^(Enquiry:|Q\d+:|Task \d+:|Question \d+[a-z]?:)\s*/i, '');
          let qText = typeof formatBold !== 'undefined' ? formatBold(cleaned) : cleaned;
          let clueParaMatch = qText.match(/\((P|Para\s*)(\d+)\)$/i);
          let clueBtn = '';
          if (clueParaMatch) {
            qText = qText.replace(clueParaMatch[0], '').trim();
            clueBtn = `<button class="btn btn-secondary btn-sm-icon" title="Find Evidence" data-action="scroll-to-para" data-target="para-${clueParaMatch[2]}"><i class="fa-solid fa-magnifying-glass"></i></button>`;
          }

          let match = qText.match(/^([A-Za-z0-9'\-\/ ]+):\s*(.*)/);
          let displayHeading = '';
          if (match) {
              displayHeading = `<div style="font-size: 1.15rem; color: #0284c7; margin-bottom: 6px; font-weight: 800;">${match[1]}</div>`;
              qText = match[2];
          }

          htmlTasks += `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              ${displayHeading}
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${task.qNum ? `Q${task.qNum}. ` : ''}${qText}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${clueBtn}
                  ${task.starter ? `<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" data-action="toggle-element" data-target-id="starter-${tIdx}"><i class="fa-solid fa-pen"></i></button>` : ''}
                  ${task.clue ? `<button class="btn btn-secondary btn-sm-icon" title="Clue" data-action="toggle-element" data-target-id="clue-${tIdx}"><i class="fa-solid fa-lightbulb"></i></button>` : ''}
                  ${task.model ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" data-action="toggle-element" data-target-id="model-${tIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>

              ${task.starter ? `<div id="starter-${tIdx}" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${task.starter}</div>` : ''}
              ${task.clue ? `<div id="clue-${tIdx}" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${task.clue}</div>` : ''}
              ${task.model ? `<div id="model-${tIdx}" class="scaffold-box model-box" style="display:none;">${formatBold(task.model)}</div>` : ''}
            </div>
          `;
        });
      }

      
if (lesson.historians_corner) {
        const hc = lesson.historians_corner;
        htmlHistorian += `
          <div style="margin-top: 30px; background: #fafafa; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h3 style="margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; color: #0f172a;">${hc.title}</h3>
            <p style="font-size: 1.05rem; line-height: 1.6; color: #334155; margin-bottom: 20px;">${formatBold(hc.text || (hc.author_context + "<br><br><i>" + hc.extract + "</i>"))}</p>
            ${hc.stretch_question ? `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 0;">
              <div style="font-weight: 700; margin-bottom: 10px; color: #ef4444;">Stretch Challenge</div>
              <div style="font-size: 1.05rem; margin-bottom: 12px;">
                ${hc.qNum ? `Q${hc.qNum}. ` : ''}${hc.stretch_question}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${hc.starter ? `<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" data-action="toggle-element" data-target-id="hc-starter"><i class="fa-solid fa-pen"></i></button>` : ''}
                  ${hc.clue ? `<button class="btn btn-secondary btn-sm-icon" title="Clue" data-action="toggle-element" data-target-id="hc-clue"><i class="fa-solid fa-lightbulb"></i></button>` : ''}
                  ${hc.stretch_model ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" data-action="toggle-element" data-target-id="hc-model"><i class="fa-solid fa-check-double"></i></button>` : ''}
                </span>
              </div>
              ${hc.starter ? `<div id="hc-starter" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${hc.starter}</div>` : ''}
              ${hc.clue ? `<div id="hc-clue" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${hc.clue}</div>` : ''}
              ${hc.stretch_model ? `<div id="hc-model" class="scaffold-box model-box" style="display:none;">${formatBold(hc.stretch_model)}</div>` : ''}
            </div>` : ''}
          </div>
        `;
      }
      htmlHistorian += `</div>`;
    }

    
if (lesson.pair_share) {
      const ps = lesson.pair_share;
      htmlPairShare += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 15px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #059669; font-weight: bold; font-size: 1.05rem; background: #ecfdf5; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #a7f3d0;">
              <span><i class="fa-solid fa-users" style="color: #059669; margin-right: 10px;"></i> Think, Pair, Share</span>
              <i class="fa-solid fa-chevron-down" style="color: #059669;"></i>
            </summary>
            <div style="padding: 20px; background: #ecfdf5;">
              <p style="font-size: 1.15rem; font-weight: 700; color: #065f46; margin-top: 0;">${ps.prompt}</p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span><i class="fa-solid fa-brain"></i> 1. Think</span>
                    <button data-action="start-tps-timer" style="background: #10b981; color: white; border: none; border-radius: 4px; padding: 3px 8px; cursor: pointer; font-size: 0.85rem; font-weight: bold;"><i class="fa-regular fa-clock"></i> 60s</button>
                  </div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${ps.think}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-comments"></i> 2. Pair</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${ps.pair}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-users"></i> 3. Share</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${ps.share}</p>
                 </div>
              </div>
            </div>
          </details>
      `;
    }

    if (lesson.exam_practice) {
      let epQuestions = [];
      let epStimulus = [];
      if (Array.isArray(lesson.exam_practice)) {
        epQuestions = lesson.exam_practice;
      } else {
        epQuestions = lesson.exam_practice.questions || [];
        epStimulus = lesson.exam_practice.stimulus || [];
      }

      if (epQuestions.length > 0 || epStimulus.length > 0) {
        htmlPairShare += `
          <div class="phase-card" style="margin-top: 30px; border: 2px solid #3b82f6; border-radius: 8px;">
            <div style="background: #eff6ff; padding: 15px; border-bottom: 2px solid #bfdbfe; border-radius: 6px 6px 0 0; margin: -20px -20px 20px -20px; display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; color: #1e3a8a; font-size: 1.2rem;"><i class="fa-solid fa-graduation-cap"></i> Assessment Practice</h3>
              <button class="btn btn-secondary" data-action="reveal-all-models" style="font-size: 0.9rem; padding: 4px 10px; background: white; border: 1px solid #bfdbfe;"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>
            </div>
        `;
        const renderQuestion = (q, qIdx) => `
              <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                    ${formatQuestion(q.question)}
                  <span style="display: inline-flex; vertical-align: middle;">
                    ${q.model ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" data-action="toggle-element" data-target-id="ep-model-${qIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                  </span>
                </div>
                <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
                ${q.model ? `<div id="ep-model-${qIdx}" class="scaffold-box model-box" style="display:none;">${typeof formatBold !== 'undefined' ? formatBold(q.model) : q.model}</div>` : ''}
              </div>
        `;

        if (epQuestions.length > 0) {
          let q2Index = epQuestions.findIndex(q => q.question && (q.question.trim().startsWith('2. ') || q.question.trim().startsWith('Q2.')));
          if (q2Index !== -1) {
             htmlPairShare += renderQuestion(epQuestions[q2Index], q2Index);
          }
        }
        
        if (epStimulus.length > 0) {
          htmlPairShare += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-bottom: 20px;">`;
          epStimulus.forEach((stim, sIdx) => {
            htmlPairShare += `
              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px;">
                <div style="font-weight: bold; color: #334155; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">${stim.title}</div>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.5; color: #475569; font-style: italic;">${stim.content}</p>
              </div>
            `;
          });
          htmlPairShare += `</div>`;
        }
        
        if (epQuestions.length > 0) {
          epQuestions.forEach((q, qIdx) => {
            let isQ2 = q.question && (q.question.trim().startsWith('2. ') || q.question.trim().startsWith('Q2.'));
            if (!isQ2) {
               htmlPairShare += renderQuestion(q, qIdx);
            }
          });
        }
        htmlPairShare += `</div>`;
      }
    }

    let deck = null;
    if (lesson.vocab && lesson.vocab.length > 0) {
      deck = lesson.vocab;
    } else if (lesson.key_vocabulary && lesson.key_vocabulary.length > 0) {
      deck = lesson.key_vocabulary;
    } else if (lesson.flashcards && lesson.flashcards.length > 0) {
      if (lesson.flashcards[0].term || lesson.flashcards[0].word) {
         deck = lesson.flashcards;
      }
    }

    if (deck) {
      htmlPairShare += `
        <div class="phase-card">
          <div class="phase-title">Consolidation & Recall</div>
          <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
          <div class="flashcard-deck">
      `;
      deck.forEach(fc => {
        let t = fc.term || fc.word || fc.title || '';
        let d = fc.definition || fc.meaning || fc.desc || '';
        htmlPairShare += `
          <div class="flashcard-wrapper" data-action="flip-card-wrapper">
            <div class="flashcard-inner">
              <div class="flashcard-face flashcard-front">
                <h4>${t}</h4>
                <p>Tap to reveal</p>
              </div>
              <div class="flashcard-face flashcard-back">
                ${d}
              </div>
            </div>
          </div>
        `;
      });
      htmlPairShare += `</div></div>`;
    }

    if (lesson.extended || lesson.debate_prep) {
      let extHtml = `
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Extended Scholarship</div>
            ${lesson.extended && (lesson.extended.model || lesson.extended.answer) ? `<button class="btn btn-secondary" data-action="toggle-element" data-target-id="extended-model-${lesson.id}" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button>` : ''}
          </div>
      `;

      if (lesson.debate_prep) {
        const dp = lesson.debate_prep;
        const allArgs = [...dp.arguments_for.map(a=>({t:a, s:'for'})), ...dp.arguments_against.map(a=>({t:a, s:'against'}))].sort(() => Math.random() - 0.5);
        const argsHtml = allArgs.map((arg, idx) => `<div class="debate-card" draggable="true" ondragstart="window.dragDebate(event)" id="debate-arg-${lesson.id}-${idx}" data-side="${arg.s}" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: grab;">${arg.t}</div>`).join('');

        extHtml += `
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-scale-balanced"></i> Debate Prep: ${dp.question}</h3>
            <p style="color: #475569; font-size: 0.95rem;">Drag and drop the evidence cards below into the correct columns to prepare your arguments before writing your essay.</p>
            
            <div id="debate-bank-${lesson.id}" class="debate-dropzone" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #94a3b8; padding: 15px; border-radius: 8px; margin-bottom: 20px; min-height: 80px;">
              ${argsHtml}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h4 style="text-align: center; color: #16a34a; margin-top: 0;">Agree</h4>
                <div id="debate-for-${lesson.id}" class="debate-dropzone" data-target="for" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #86efac; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
              <div>
                <h4 style="text-align: center; color: #dc2626; margin-top: 0;">Disagree</h4>
                <div id="debate-against-${lesson.id}" class="debate-dropzone" data-target="against" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #fca5a5; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 15px;">
              <button class="btn btn-primary" data-action="check-debate" data-id="${lesson.id}">Check Answers</button>
              <div id="debate-feedback-${lesson.id}" style="margin-top: 10px; font-weight: bold;"></div>
            </div>
          </div>
        `;
      }

      if (lesson.extended && lesson.extended.paragraphs) {
        if (lesson.extended.title) {
          extHtml += `<h3 style="color: #0f172a;">${lesson.extended.title}</h3>`;
        }
        lesson.extended.paragraphs.forEach(p => {
             extHtml += `<p style="color: #334155; font-size: 1.05rem; line-height: 1.6;">${formatBold(p)}</p>`;
        });
      }
      extHtml += `</div>`;
      
      if (lesson.debate_prep || (lesson.extended && lesson.extended.paragraphs)) {
         htmlPairShare += extHtml;
      }
    }

    
      let myUnitData = window.currentUnitData || {};
      const unitId = myUnitData.id || new URLSearchParams(window.location.search).get('id');
      const isEarlyModern = (unitId === 'early_modern_world');
      let isGCSE = (unitId === 'weimar_nazi_germany' || unitId === 'cme_new');

      if (isTrip) {
          html += htmlNarrative + htmlDoNow + htmlPrimary + htmlSources1 + htmlPairShare + htmlHistorian + htmlTasks;
      } else if (isEarlyModern) {
          html += htmlDoNow + htmlPrimary + (isGCSE ? '' : htmlSources1) + htmlNarrative + htmlPairShare + htmlHistorian + htmlTasks;
      } else {
          html += (isGCSE ? '' : htmlSources1) + htmlPrimary + htmlDoNow + htmlNarrative + htmlTasks + htmlHistorian + htmlPairShare;
      }
      
      if (isGCSE) {
          html += htmlSources1;
      }
if (lesson.gcse_task || (lesson.extended && lesson.extended.question) || extractedExamTasks.length > 0) {
      let gcseHtml = `
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #b45309;">${(lesson.extended && lesson.extended.title) ? lesson.extended.title : 'Assessment Practice'}</div>
            <button class="btn btn-secondary" data-action="reveal-all-models" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal Models</button>
          </div>
      `;

      if (lesson.extended && lesson.extended.question) {
        let hintsHtml = '';
        if (lesson.extended.hints && lesson.extended.hints.length > 0) {
           hintsHtml = `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; padding-left: 20px; color: #92400e;">${lesson.extended.hints.map(h => `<li>${formatBold(h)}</li>`).join('')}</ul></div>`;
        }

        let sourceHtml = '';
        if (lesson.extended.source_a || lesson.extended.source_b) {
          sourceHtml = `<div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 15px 0;">`;
          if (lesson.extended.source_a) {
             const prov = typeof lesson.extended.source_a === 'string' ? '' : lesson.extended.source_a.provenance;
             const content = typeof lesson.extended.source_a === 'string' ? lesson.extended.source_a : lesson.extended.source_a.content;
             sourceHtml += `
               <div style="flex: 1 1 250px; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A</strong>
                 ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${content.replace(/\n/g, '<br>')}
                 </div>
               </div>`;
          }
          if (lesson.extended.source_b) {
             const prov = typeof lesson.extended.source_b === 'string' ? '' : lesson.extended.source_b.provenance;
             const content = typeof lesson.extended.source_b === 'string' ? lesson.extended.source_b : lesson.extended.source_b.content;
             sourceHtml += `
               <div style="flex: 1 1 250px; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                 ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${content.replace(/\n/g, '<br>')}
                 </div>
               </div>`;
          }
          sourceHtml += `</div>`;
          if (lesson.extended.provenance_clue) {
            sourceHtml += `<details style="margin-top: 15px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; overflow: hidden;">
              <summary style="padding: 12px; cursor: pointer; color: #166534; font-weight: bold; list-style: none;">
                <i class="fa-solid fa-magnifying-glass" style="margin-right: 5px;"></i> Click to Reveal Provenance Scaffolding Clues
              </summary>
              <div style="padding: 0 12px 12px 12px; color: #15803d; border-top: 1px solid #bbf7d0; margin-top: 5px; padding-top: 12px;">
                ${lesson.extended.provenance_clue}
              </div>
            </details>`;
          }
        }

        gcseHtml += `
          <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
              ${lesson.extended.qNum ? `Q${lesson.extended.qNum}. ` : ''}${formatQuestion(lesson.extended.question, !lesson.extended.qNum)}
              <span style="display: inline-flex; vertical-align: middle;">
                ${lesson.extended.model || lesson.extended.answer ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" data-action="toggle-element" data-target-id="extended-model-${lesson.id}"><i class="fa-solid fa-check-double"></i></button>` : ''}
              </span>
            </div>
            ${sourceHtml}
            ${hintsHtml}
            <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your extended response here..." oninput="window.updateProgress()"></textarea>
            ${lesson.extended.model || lesson.extended.answer ? `<div id="extended-model-${lesson.id}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(lesson.extended.model || lesson.extended.answer)}</div>` : ''}
          </div>
        `;
      }

      if (lesson.gcse_task) {
        if (lesson.gcse_task.tasks) {
          lesson.gcse_task.tasks.forEach((task, tIdx) => {
            gcseHtml += `
              <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                  ${lesson.gcse_task.qNum && tIdx === 0 ? `Q${lesson.gcse_task.qNum}. ` : ''}${formatQuestion(task.text || task.question, !(lesson.gcse_task.qNum && tIdx === 0))}
                  <span style="display: inline-flex; vertical-align: middle;">
                    ${task.model ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" data-action="toggle-element" data-target-id="gcse-model-${tIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                  </span>
                </div>
                <textarea class="student-answer-input" style="min-height: ${(task.text || task.question || "").includes("12 marks") || (task.text || task.question || "").includes("16 marks") ? "200px" : "100px"};" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
                ${task.model ? `<div id="gcse-model-${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(task.model)}</div>` : ''}
              </div>
            `;
          });
        } else if (lesson.gcse_task.sources) {
           let topicText = lesson.gcse_task.topic || '';
           let isNarrative = topicText.toLowerCase().includes("write a narrative account");
           
           if (isNarrative) {
               gcseHtml += `<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ''}${topicText}</p>`;
               gcseHtml += `<p style="font-size: 1rem; color: #475569; margin-bottom: 10px;"><em>Read the historical sources below before writing your narrative account:</em></p>`;
           } else {
               gcseHtml += `<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ''}How useful are Sources A and B for an enquiry into ${topicText}?</p>`;
           }
           
           gcseHtml += `<div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">`;
           lesson.gcse_task.sources.forEach(srcObj => {
             gcseHtml += `<div style="flex: 1; min-width: 300px; background: white; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">`;
             if (srcObj.type === 'visual') {
               gcseHtml += `<img src="${getAssetUrl(srcObj.src)}" style="max-width: 100%; max-height: 250px; border-radius: 4px; margin-bottom: 10px;">`;
             } else {
               gcseHtml += `<blockquote style="font-size: 1.05rem; font-style: italic; color: #475569; margin: 0 0 15px 0; border-left: 4px solid #94a3b8; padding-left: 10px;">${formatBold(srcObj.text)}</blockquote>`;
             }
             gcseHtml += `<p style="font-size: 0.95rem; font-weight: bold; color: #334155; margin: 0;">${srcObj.title}</p>`;
             gcseHtml += `</div>`;
           });
           gcseHtml += `</div>`;
           
           let placeholder = isNarrative ? "Write your 8-mark narrative account here..." : "Type your 8-mark utility evaluation here...";
           gcseHtml += `<textarea class="student-answer-input" style="min-height: 200px;" placeholder="${placeholder}" oninput="window.updateProgress()"></textarea>`;
           
           if (lesson.gcse_task.model) {
              gcseHtml += `<div style="margin-top: 15px;"><button class="btn btn-secondary" data-action="toggle-element" data-target-id="gcse-model-src"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button></div>`;
              gcseHtml += `<div id="gcse-model-src" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(lesson.gcse_task.model)}</div>`;
           }
        }
      }

      if (extractedExamTasks.length > 0) {
        extractedExamTasks.forEach((task, tIdx) => {
          gcseHtml += `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${formatQuestion(task.text || task.question)}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${task.model ? `<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" data-action="toggle-element" data-target-id="extracted-model-${tIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
              ${task.model ? `<div id="extracted-model-${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(task.model)}</div>` : ''}
            </div>
          `;
        });
      }
      gcseHtml += `</div>`;
      html += gcseHtml;
    }

    if (lesson.quiz && lesson.quiz.length > 0 && appStore.state.activeUnitData.type !== 'trip') {
      window.currentQuizData = lesson.quiz.map(q => {
      if (!q.options && q.distractors && q.distractors.length > 0) {
        let opts = [q.answer || q.a, ...q.distractors];
        opts = opts.sort(() => Math.random() - 0.5);
        const correctIdx = opts.indexOf(q.answer || q.a);
        return { ...q, options: opts, answer: correctIdx };
      } else if (q.options && typeof (q.answer || q.a) === 'string') {
        let opts = [...q.options];
        opts = opts.sort(() => Math.random() - 0.5);
        return { ...q, options: opts, answer: opts.indexOf(q.answer || q.a) };
      }
      return q;
    });
    window.currentQuizIndex = 0;
      window.currentQuizLessonId = lesson.id;
      
      html += `
        <div class="phase-card no-print" id="inline-quiz-container" style="padding: 30px;">
          <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
            <i class="fa-solid fa-clipboard-check" style="font-size: 2rem; color: #3b82f6; margin-right: 15px;"></i>
            <div>
              <h2 style="margin: 0; color: #1e293b; font-size: 1.5rem;">Knowledge Check Quiz</h2>
              <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Question <span id="quiz-progress">1 / ${lesson.quiz.length}</span></p>
            </div>
          </div>
          
          <div id="quiz-question-container">
            <!-- Populated dynamically -->
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <div id="quiz-feedback" style="font-weight: bold; padding-top: 8px;"></div>
            <button id="quiz-next-btn" class="btn btn-primary" style="display: none;" data-action="next-quiz-question">Next Question <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      `;
    }
    
    // Previous / Next Lesson Navigation Buttons
    if (currentIndex !== -1) {
      html += `<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; margin-bottom: 40px;">`;
      
      if (currentIndex > 0) {
        html += `<button class="btn btn-secondary" data-action="render-lesson" data-index="${currentIndex - 1}"><i class="fa-solid fa-arrow-left"></i> Previous ${isTrip ? 'Day' : 'Lesson'}</button>`;
      } else {
        html += `<div></div>`;
      }
      
      if (currentIndex < appStore.state.activeUnitData.lessons.length - 1) {
        html += `<button class="btn btn-primary" data-action="render-lesson" data-index="${currentIndex + 1}">Next ${isTrip ? 'Day' : 'Lesson'} <i class="fa-solid fa-arrow-right"></i></button>`;
      } else {
        html += `<div></div>`;
      }
      
      html += `</div>`;
    }
    
    html += `</div>`; // End lesson-content wrapper

    contentArea.innerHTML = html;
    
    if (lesson.quiz && lesson.quiz.length > 0) {
      if (document.getElementById('quiz-progress')) {
        window.renderQuizQuestion();
      }
    }
    window.vocabMatchesFound = 0;
    setTimeout(() => {
      if (window.mermaid) {
        try {
          mermaid.init(undefined, document.querySelectorAll('.mermaid'));
        } catch (e) {
          console.error("Mermaid render error:", e);
        }
      }
      if (window.postRenderHooks) {
        window.postRenderHooks.forEach(hook => hook());
        window.postRenderHooks = [];
      }
      
      // Initialize Trip Map
      const mapContainer = document.getElementById('trip-map-container');
      if (mapContainer && window.L && lesson.do_now && lesson.do_now.type === 'timeline') {
        const eventsWithLoc = lesson.do_now.events.filter(e => e.lat && e.lng);
        if (eventsWithLoc.length > 0) {
          const map = L.map('trip-map-container');
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          
          const markers = [];
          eventsWithLoc.forEach(ev => {
            const marker = L.marker([ev.lat, ev.lng]).addTo(map);
            let popupContent = `<strong>${ev.year} - ${ev.title}</strong><br>${ev.detail}`;
            
            if (appStore.state.activeUnitData.local_heroes) {
              const heroes = appStore.state.activeUnitData.local_heroes.filter(h => ev.title.includes(h.cemetery) || ev.detail.includes(h.cemetery) || (h.cemetery.includes("Menin Gate") && ev.title.includes("Menin Gate")));
              if (heroes.length > 0) {
                popupContent += `<div style="margin-top: 15px; border: 2px solid #ef4444; border-radius: 8px; padding: 10px; background: #fef2f2;">
                  <h4 style="margin: 0 0 5px 0; color: #991b1b;"><i class="fa-solid fa-ribbon"></i> Local Connection</h4>`;
                heroes.forEach(h => {
                  popupContent += `<p style="margin: 0 0 5px 0; font-size: 0.9em; color: #7f1d1d;"><strong>${h.name}</strong> (${h.age}) - ${h.regiment}<br><em>${h.connection}</em><br>${h.story}</p>`;
                });
                popupContent += `</div>`;
              }
            }

            if (ev.youtube_id) {
              popupContent += `<div style="margin-top: 10px;"><iframe width="100%" height="150" src="https://www.youtube.com/embed/${ev.youtube_id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="border-radius: 4px;"></iframe></div>`;
            }
            marker.bindPopup(popupContent, { minWidth: 250 });
            markers.push(marker);
          });
          
          if (markers.length > 0) {
            const group = new L.featureGroup(markers);
            map.fitBounds(group.getBounds().pad(0.2));
            
            // Draw Polyline connecting pins if not a local hero lesson
            if (!lesson.id || !lesson.id.startsWith('hero_')) {
              const latlngs = eventsWithLoc.map(ev => [ev.lat, ev.lng]);
              L.polyline(latlngs, {
                color: '#ef4444',
                weight: 4,
                opacity: 0.7,
                dashArray: '10, 10',
                lineJoin: 'round'
              }).addTo(map);
            }
          }
        }
      }
    }, 100); 
  }

export function assignQuestionNumbers(lesson) {
    let globalQNum = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
    if (lesson.sources) lesson.sources.forEach(source => { if (source.question) source.qNum = globalQNum++; });
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.source && block.source.question) block.source.qNum = globalQNum++;
        if (block.tasks) block.tasks.forEach(task => { if (task.type !== 'vocab_match') task.qNum = globalQNum++; });
        if (block.hinge_question) block.hinge_question.qNum = globalQNum++;
      });
    }
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
    if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;
    if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
  }


// Keep global bindings for now
window.formatBold = formatBold;
