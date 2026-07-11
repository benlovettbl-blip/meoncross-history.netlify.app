function e(e){document.addEventListener(`DOMContentLoaded`,()=>{let t=document.getElementById(`sidebar`),n=document.getElementById(`content-area`),r=document.getElementById(`btn-dyslexia`),i=document.createElement(`style`);i.textContent=`
    .phase-card {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .phase-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .narrative-chunk {
      background: #f8fafc;
      border-left: 4px solid #002855;
      padding: 15px 20px;
      margin-bottom: 18px;
      border-radius: 0 6px 6px 0;
      line-height: 1.8;
      font-size: 1.05rem;
    }
    .vocab-word {
      position: relative;
      border-bottom: 2px dashed #002855;
      cursor: help;
      color: #002855;
      font-weight: 700;
      background: #fef08a;
      padding: 0 4px;
      border-radius: 3px;
    }
    .vocab-word:hover::after {
      content: attr(data-definition);
      position: absolute;
      bottom: 130%;
      left: 50%;
      transform: translateX(-50%);
      background: #1e293b;
      color: #ffffff;
      padding: 10px 14px;
      border-radius: 6px;
      width: 260px;
      font-size: 0.85rem;
      font-weight: 400;
      line-height: 1.4;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      white-space: normal;
      text-align: center;
    }
    .scaffold-box {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 14px;
      margin-top: 12px;
      font-size: 0.95rem;
    }
    .starter-box { border-left: 4px solid #2563eb; }
    .clue-box { border-left: 4px solid #d97706; }
    .model-box { border-left: 4px solid #059669; }
    .btn-group {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      flex-wrap: wrap;
    }
    .student-answer-input {
      display: none;
      width: 100%;
      height: 80px;
      padding: 10px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-family: inherit;
      resize: vertical;
      margin-bottom: 10px;
    }
    .laptop-mode-active .student-answer-input {
      display: block;
    }
    .do-now-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 15px;
      margin-bottom: 15px;
    }
    .do-now-card .answer {
      display: none;
      margin-top: 10px;
      padding: 10px;
      background: #e2e8f0;
      border-radius: 4px;
      font-weight: 500;
    }
    .do-now-card.revealed .answer {
      display: block;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      font-size: 0.95rem;
      font-family: inherit;
    }
    .btn-primary {
      background: #1a237e;
      color: white;
      border-color: #1a237e;
    }
    .btn-primary:hover {
      background: #0d1659;
    }
    .btn-sm-icon {
      padding: 4px 8px;
      font-size: 0.9rem;
      border-radius: 4px;
      margin-left: 6px;
    }
    .student-answer-input {
      width: 100%;
      height: 80px;
      padding: 10px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-family: inherit;
      resize: vertical;
      box-sizing: border-box;
      margin-top: 5px;
    }
    .fab-copy {
      display: none;
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #1e3a8a;
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 1.5rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      cursor: pointer;
      z-index: 1000;
      transition: transform 0.2s, background 0.2s;
    }
    .fab-copy:hover {
      transform: scale(1.05);
      background: #1e293b;
    }
    .laptop-mode-active .fab-copy {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-secondary {
      background: #e2e8f0;
      color: #334155;
      border-color: #cbd5e1;
    }
    .btn-secondary:hover {
      background: #cbd5e1;
      color: #0f172a;
    }
    .reading-active {
      background: #ef4444 !important;
      color: white !important;
      border-color: #dc2626 !important;
    }
    .sidebar {
      background: #0f172a !important;
      border-right: none !important;
      box-shadow: 2px 0 15px rgba(0,0,0,0.1);
    }
    .sidebar .fa-graduation-cap, .sidebar h2, .sidebar span, .sidebar .lesson-link {
      color: #f1f5f9 !important;
    }
    .sidebar .lesson-link {
      background: rgba(255,255,255,0.05) !important;
      border: 1px solid transparent;
    }
    .sidebar .lesson-link:hover, .sidebar .lesson-link.active {
      background: rgba(255,255,255,0.15) !important;
      color: #ffffff !important;
      border-color: rgba(255,255,255,0.2);
    }
    .sidebar-header {
      border-bottom: 1px solid rgba(255,255,255,0.1) !important;
    }
    .source-card img {
      max-width: 100%;
      max-height: 500px;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    .flashcard-deck {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    .flashcard-wrapper {
      background-color: transparent;
      height: 200px;
      perspective: 1000px;
      cursor: pointer;
    }
    .flashcard-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }
    .flashcard-wrapper.flipped .flashcard-inner {
      transform: rotateY(180deg);
    }
    .flashcard-face {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border: 2px solid #e2e8f0;
    }
    .flashcard-front {
      background-color: #ffffff;
      color: #0f172a;
    }
    .flashcard-front h4 {
      margin: 0 0 10px 0;
      font-size: 1.2rem;
      color: #1e3a8a;
    }
    .flashcard-front p {
      margin: 0;
      color: #64748b;
      font-size: 0.9rem;
    }
    .flashcard-back {
      background-color: #f8fafc;
      color: #334155;
      transform: rotateY(180deg);
      font-size: 1.05rem;
      line-height: 1.5;
    }
    .teacher-note {
      display: none;
      background: #1e293b;
      color: #f8fafc;
      border-left: 4px solid #facc15;
      padding: 15px 20px;
      border-radius: 6px;
      margin-bottom: 25px;
      font-size: 1.05rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      line-height: 1.6;
    }
    .teacher-note h4 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #facc15;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.15rem;
    }
    .teacher-mode-active .teacher-note {
      display: block;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
    .para-number {
      background: #e2e8f0;
      color: #475569;
      font-weight: bold;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      margin-right: 15px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    @keyframes highlightPulse {
      0% { background: #fef08a; transform: scale(1.02); }
      50% { background: #fef08a; transform: scale(1.02); }
      100% { background: #f8fafc; transform: scale(1); }
    }
    .highlight-flash {
      animation: highlightPulse 2.5s ease-out;
    }
  `,document.head.appendChild(i),window.scrollToPara=function(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:`smooth`,block:`center`}),t.classList.remove(`highlight-flash`),t.offsetWidth,t.classList.add(`highlight-flash`),setTimeout(()=>t.classList.remove(`highlight-flash`),2600))};let a=``;document.querySelectorAll(`.header-title-container div div`).forEach(e=>{e.textContent.includes(`Unit Enquiry:`)&&(a=e.textContent,e.style.display=`none`)});let o=window.speechSynthesis,s=null,c=document.createElement(`button`);c.className=`fab-copy`,c.innerHTML=`<i class="fa-solid fa-copy"></i>`,c.title=`Copy all answers to OneNote`,c.onclick=()=>{let e=`History Lesson Answers

`;document.querySelectorAll(`.do-now-card`).forEach(t=>{let n=t.querySelector(`div[style*="font-weight: 700"]`),r=t.querySelector(`.student-answer-input`);if(n&&r){let t=n.cloneNode(!0),i=t.querySelector(`span`);i&&i.remove(),e+=t.textContent.trim()+`
`,e+=`Answer: `+r.value+`

`}}),navigator.clipboard.writeText(e).then(()=>{alert(`All answers copied to clipboard! Ready to paste into OneNote.`)}).catch(e=>{alert(`Failed to copy to clipboard.`)})},document.body.appendChild(c),window.readAloudText=function(e){if(o.speaking&&e.classList.contains(`reading-active`)){o.cancel(),e.classList.remove(`reading-active`),e.innerHTML=`<i class="fa-solid fa-volume-high"></i>`;return}o.cancel(),document.querySelectorAll(`.narrative-chunk button`).forEach(e=>{e.classList.remove(`reading-active`),e.innerHTML=`<i class="fa-solid fa-volume-high"></i>`});let t=e.parentElement.querySelector(`.narrative-text`).textContent;t.trim()!==``&&(e.classList.add(`reading-active`),e.innerHTML=`<i class="fa-solid fa-stop"></i>`,s=new SpeechSynthesisUtterance(t),s.onend=()=>{e.classList.remove(`reading-active`),e.innerHTML=`<i class="fa-solid fa-volume-high"></i>`},o.speak(s))},r.innerHTML=`SEN / Dyslexia Mode`,r.addEventListener(`click`,()=>{document.body.classList.toggle(`sen-mode`);let e=document.body.classList.contains(`sen-mode`);r.textContent=e?`Standard Mode`:`SEN / Dyslexia Mode`});let l=document.querySelector(`.header-actions`);if(l){let e=document.createElement(`button`);e.className=`btn btn-secondary`,e.style.marginRight=`10px`,e.innerHTML=`<i class="fa-solid fa-laptop"></i> Laptop Mode`,localStorage.getItem(`laptopMode`)===`true`&&(document.body.classList.add(`laptop-mode-active`),e.innerHTML=`<i class="fa-solid fa-laptop"></i> Laptop Mode: ON`,e.style.background=`#1e293b`,e.style.color=`#ffffff`),e.addEventListener(`click`,()=>{document.body.classList.toggle(`laptop-mode-active`);let t=document.body.classList.contains(`laptop-mode-active`);localStorage.setItem(`laptopMode`,t),e.innerHTML=t?`<i class="fa-solid fa-laptop"></i> Laptop Mode: ON`:`<i class="fa-solid fa-laptop"></i> Laptop Mode`,e.style.background=t?`#1e293b`:``,e.style.color=t?`#ffffff`:``}),l.appendChild(e);let t=document.createElement(`button`);t.className=`btn btn-secondary`,t.innerHTML=`<i class="fa-solid fa-user-tie"></i> Teacher Mode`,t.addEventListener(`click`,()=>{document.body.classList.toggle(`teacher-mode-active`);let e=document.body.classList.contains(`teacher-mode-active`);t.innerHTML=e?`<i class="fa-solid fa-user-tie"></i> Teacher Mode: ON`:`<i class="fa-solid fa-user-tie"></i> Teacher Mode`,t.style.background=e?`#1e293b`:``,t.style.color=e?`#ffffff`:``}),l.appendChild(t);let n=document.createElement(`button`);n.className=`btn btn-secondary`,n.innerHTML=`<i class="fa-solid fa-list-check"></i> Curriculum Setup`,n.addEventListener(`click`,()=>{u()}),l.appendChild(n)}function u(){let e=document.getElementById(`curriculum-modal`);if(!e){e=document.createElement(`div`),e.id=`curriculum-modal`,e.style.cssText=`position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;`;let t=document.createElement(`div`);t.style.cssText=`background:var(--card-bg);padding:30px;border-radius:12px;width:90%;max-width:500px;color:var(--text-color);box-shadow:0 10px 25px rgba(0,0,0,0.2);`,t.innerHTML=`
        <h2 style="margin-top:0"><i class="fa-solid fa-book-open"></i> Curriculum Setup</h2>
        <p style="opacity:0.8;font-size:0.95rem;">Select the units your class has already been taught. The app will dynamically generate "PAST TOPIC" Do Now retrieval questions from these units.</p>
        <div id="unit-checkboxes" style="display:flex;flex-direction:column;gap:12px;margin:25px 0;">
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;">
          <button id="close-curriculum" class="btn btn-primary">Save & Close</button>
        </div>
      `,e.appendChild(t),document.body.appendChild(e);let n=[{id:`norman_conquest`,title:`The Norman Conquest`},{id:`water_and_sanitation`,title:`Water & Health Through Time`},{id:`change_1450_1750`,title:`Change 1450-1750 (Tudors)`}],r=t.querySelector(`#unit-checkboxes`),i=JSON.parse(localStorage.getItem(`taughtUnits`)||`[]`);n.forEach(e=>{let t=document.createElement(`label`);t.style.display=`flex`,t.style.alignItems=`center`,t.style.gap=`10px`,t.style.cursor=`pointer`,t.style.fontSize=`1.1rem`;let n=document.createElement(`input`);n.type=`checkbox`,n.value=e.id,n.style.width=`20px`,n.style.height=`20px`,n.checked=i.includes(e.id),n.addEventListener(`change`,()=>{let t=JSON.parse(localStorage.getItem(`taughtUnits`)||`[]`);n.checked?t.push(e.id):t=t.filter(t=>t!==e.id),localStorage.setItem(`taughtUnits`,JSON.stringify([...new Set(t)]))}),t.appendChild(n),t.appendChild(document.createTextNode(e.title)),r.appendChild(t)}),t.querySelector(`#close-curriculum`).addEventListener(`click`,()=>{document.body.removeChild(e),location.reload()})}}function d(){let n=document.getElementById(`sidebar-nav-container`)||t;n.innerHTML=``,e.lessons.forEach((e,t)=>{let r=document.createElement(`a`);r.className=`lesson-link`,t===0&&r.classList.add(`active`),r.textContent=e.title,r.addEventListener(`click`,t=>{t.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`),f(e),window.scrollTo({top:0,behavior:`smooth`})}),n.appendChild(r)});let r=document.createElement(`a`);r.className=`lesson-link`,r.textContent=`Pupil Workbook`,r.href=`workbook.html`,r.target=`_blank`,r.style.marginTop=`15px`,r.style.border=`2px dashed #cbd5e1`,n.appendChild(r)}function f(e){let t=`<div class="lesson-content" style="max-width: 900px; margin: 0 auto;">`;if(a&&(t+=`
        <div style="background: linear-gradient(135deg, #1e3a8a, #312e81); color: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-size: 1.15rem; font-weight: 600; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border: 2px solid #a5b4fc;">
          <i class="fa-solid fa-lightbulb" style="color: #fde047; margin-right: 10px;"></i> ${a}
        </div>
      `),t+=`
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding: 10px 15px; border-bottom: 1px solid #e2e8f0; background: #ffffff; border-radius: 8px;">
        <h4 style="margin: 0; font-size: 1.1rem; color: var(--primary);">${e.title}</h4>
        <div style="display: flex; gap: 8px; flex-shrink: 0;">
          <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.9rem; background: var(--accent-red); border-color: var(--accent-red);" onclick="openDebateModal()"><i class="fa-solid fa-comments"></i> Class Debate</button>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;" onclick="window.renderDashboard()"><i class="fa-solid fa-arrow-left"></i> Unit Menu</button>
        </div>
      </div>
      <div id="progress-container" style="background: #e2e8f0; height: 6px; width: 100%; margin-bottom: 20px; border-radius: 3px; overflow: hidden;">
        <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
      </div>
    `,e.learning_objectives&&(t+=`
        <div class="learning-objectives-card" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-top: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 10px;">
            <i class="fa-solid fa-bullseye" style="color: #10b981;"></i> Learning Objectives
          </h3>
          <p style="font-size: 1.1rem; font-weight: 600; color: #1e3a8a; margin-bottom: 15px;">
            ${e.learning_objectives.overarching}
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
            ${e.learning_objectives.scaffolded.map(e=>`<li style="margin-bottom: 8px;">${e}</li>`).join(``)}
          </ul>
        </div>
      `),e.teacher_notes){let n=``;n=e.teacher_notes&&!Array.isArray(e.teacher_notes)&&typeof e.teacher_notes==`object`?(e.teacher_notes.primer?`<div style="font-size: 1.05rem; margin-bottom: 20px;">${e.teacher_notes.primer}</div>`:``)+(e.teacher_notes.objectives||[]).map(e=>`
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${e.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: ${e.question?`10px`:`0`};">${e.primer}</div>
            ${e.question?`
            <div style="background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; padding: 10px; border-radius: 0 4px 4px 0;">
              <div style="color: #38bdf8; font-weight: bold; font-size: 0.85rem; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Hinge Question</div>
              <div style="color: #e0f2fe; font-size: 0.95rem; font-style: italic;">"${e.question}"</div>
            </div>`:``}
          </div>
        `).join(``):Array.isArray(e.teacher_notes)?e.teacher_notes.map(e=>`
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${e.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: ${e.question?`10px`:`0`};">${e.primer}</div>
            ${e.question?`
            <div style="background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; padding: 10px; border-radius: 0 4px 4px 0;">
              <div style="color: #38bdf8; font-weight: bold; font-size: 0.85rem; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Hinge Question</div>
              <div style="color: #e0f2fe; font-size: 0.95rem; font-style: italic;">"${e.question}"</div>
            </div>`:``}
          </div>
        `).join(``):`<div style="font-size: 1.05rem;">${e.teacher_notes}</div>`,t+=`
        <div class="teacher-note">
          <h4><i class="fa-solid fa-chalkboard-user"></i> Pedagogical Primer</h4>
          ${n}
        </div>
      `}let r={};e.vocab&&e.vocab.forEach(e=>{r[e.term.toLowerCase()]=e.definition});let i=e=>{if(Object.keys(r).length===0)return e;let t=e;for(let[e,n]of Object.entries(r)){let r=RegExp(`\\b(${e})\\b`,`gi`);t=t.replace(r,`<span class="vocab-word" data-definition="${n.replace(/"/g,`&quot;`)}">$1</span>`)}return t},o=1,s=1,c=e=>{let t=e.replace(/^(Enquiry:|Q\d+:|Task \d+:|Question \d+[a-z]?:)\s*/i,``);return`Question ${s++}: ${t}`};if(e.primary_source){let n=e.primary_source.src;t+=`
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${o++}: ${e.learning_objective||`Visual Source & Hook`}</div>
          </div>
          <div class="source-card" style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
            <img src="${n}" alt="Source" style="max-height: 500px; max-width: 100%; object-fit: contain; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 15px;">
            <div style="font-weight: bold; margin-bottom: 10px; font-size: 1.1rem; color: var(--primary);">${e.primary_source.title}</div>
            ${e.primary_source.caption?`<div style="color: #475569; margin-bottom: 15px; font-size: 0.95rem; text-align: left;">${e.primary_source.caption}</div>`:``}
            ${e.primary_source.question?`
              <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 20px;">
                <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${c(e.primary_source.question)}</strong></p>
              </div>
            `:``}
          </div>
        </div>
      `}if(e.do_now&&e.do_now.items){try{let t=JSON.parse(localStorage.getItem(`taughtUnits`)||`[]`);t.length>0&&window.KNOWLEDGE_BANK&&e.do_now.items.forEach(e=>{if(e.question.includes(`PAST TOPIC:`)){let n=t[Math.floor(Math.random()*t.length)],r=window.KNOWLEDGE_BANK[n];if(r&&r.length>0){let t=r[Math.floor(Math.random()*r.length)];e.question=`PAST TOPIC: `+t.question,e.answer=t.answer}}})}catch(e){console.error(e)}t+=`
        <div class="phase-card" id="phase-${o}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${o++}: Do Now Tasks</div>
            <button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.do-now-card').forEach(c => c.classList.toggle('revealed'))" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-eye"></i> Reveal All</button>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
      `,e.do_now.items.forEach((e,n)=>{t+=`
          <div class="do-now-card" id="do-now-card-${n}">
            <div style="font-weight: 700; margin-bottom: 8px;">Task ${n+1}</div>
            <div>${e.question}</div>
            <div class="answer" id="do-now-ans-${n}">${e.answer}</div>
          </div>
        `}),t+=`</div></div>`}if(e.narrative&&e.narrative.length>0){let n=e.title.replace(/^Lesson\s*\d+:\s*/i,``);t+=`
        <div class="phase-card" id="phase-${o}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #1e3a8a;">Phase ${o++}: ${n}</div>
          </div>
      `,e.narrative.forEach((e,n)=>{t+=`
          <div id="para-${n+1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease;">
            <div class="para-number">${n+1}</div>
            <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">${i(e)}</div>
            <button class="btn btn-secondary" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        `}),e.sources&&e.sources.length>0&&(t+=`<div class="sources-grid" style="margin-top: 20px;">`,e.sources.forEach(e=>{if(e.src){let n=e.src.startsWith(`../`)?e.src:`../great_war/${e.src}`;t+=`
              <div class="source-card" style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
                ${e.title?`<h4 style="color: var(--primary); margin-top: 0; text-align: left;">${e.title}</h4>`:``}
                <img src="${n}" alt="Source Image">
                ${e.caption?`<p class="source-caption" style="text-align: left; color: #475569;">${e.caption}</p>`:``}
                ${e.question?`
                  <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                    <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${c(e.question)}</strong></p>
                  </div>
                `:``}
              </div>
            `}}),t+=`</div>`),t+=`</div>`}if(e.pair_share){let n=e.pair_share;t+=`
        <div class="phase-card" id="phase-${o}">
          <div class="phase-title" style="color: #059669; border-bottom-color: #34d399;">Phase ${o++}: Think, Pair, Share</div>
          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 20px;">
            <p style="font-size: 1.15rem; font-weight: 700; color: #065f46; margin-top: 0;">${n.prompt}</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
              <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-brain"></i> 1. Think</div>
                <p style="margin: 0; font-size: 0.95rem; color: #475569;">${n.think}</p>
              </div>
              <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-comments"></i> 2. Pair</div>
                <p style="margin: 0; font-size: 0.95rem; color: #475569;">${n.pair}</p>
              </div>
              <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-users"></i> 3. Share</div>
                <p style="margin: 0; font-size: 0.95rem; color: #475569;">${n.share}</p>
              </div>
            </div>
          </div>
        </div>
      `}if(e.tasks&&e.tasks.length>0||e.historians_corner){if(t+=`
        <div class="phase-card" id="phase-${o}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase ${o++}: Written Application</div>
            <button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>
          </div>
      `,e.tasks&&e.tasks.length>0&&e.tasks.forEach((e,n)=>{let r=c(e.text),i=r.match(/\((P|Para\s*)(\d+)\)$/i),a=``;i&&(r=r.replace(i[0],``).trim(),a=`<button class="btn btn-secondary btn-sm-icon" title="Find Evidence" onclick="window.scrollToPara('para-${i[2]}')"><i class="fa-solid fa-magnifying-glass"></i></button>`),t+=`
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${r}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${a}
                  ${e.starter?`<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" onclick="toggleElement('starter-${n}')"><i class="fa-solid fa-pen"></i></button>`:``}
                  ${e.clue?`<button class="btn btn-secondary btn-sm-icon" title="Clue" onclick="toggleElement('clue-${n}')"><i class="fa-solid fa-lightbulb"></i></button>`:``}
                  ${e.model?`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('model-${n}')"><i class="fa-solid fa-check-double"></i></button>`:``}
                </span>
              </div>
              <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>

              ${e.starter?`<div id="starter-${n}" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${e.starter}</div>`:``}
              ${e.clue?`<div id="clue-${n}" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${e.clue}</div>`:``}
              ${e.model?`<div id="model-${n}" class="scaffold-box model-box" style="display:none;">${e.model}</div>`:``}
            </div>
          `}),e.historians_corner){let n=e.historians_corner;t+=`
          <div style="margin-top: 30px; background: #fafafa; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h3 style="margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; color: #0f172a;">${n.title}</h3>
            <p style="font-size: 1.05rem; line-height: 1.6; color: #334155; margin-bottom: 20px;">${n.text}</p>
            
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 0;">
              <div style="font-weight: 700; margin-bottom: 10px; color: #ef4444;">Stretch Challenge</div>
              <div style="font-size: 1.05rem; margin-bottom: 12px;">
                ${n.stretch_question}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${n.starter?`<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" onclick="toggleElement('hc-starter')"><i class="fa-solid fa-pen"></i></button>`:``}
                  ${n.clue?`<button class="btn btn-secondary btn-sm-icon" title="Clue" onclick="toggleElement('hc-clue')"><i class="fa-solid fa-lightbulb"></i></button>`:``}
                  ${n.stretch_model?`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('hc-model')"><i class="fa-solid fa-check-double"></i></button>`:``}
                </span>
              </div>
              <textarea class="student-answer-input" placeholder="Write your stretch response here..." oninput="window.updateProgress()"></textarea>

              ${n.starter?`<div id="hc-starter" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${n.starter}</div>`:``}
              ${n.clue?`<div id="hc-clue" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${n.clue}</div>`:``}
              ${n.stretch_model?`<div id="hc-model" class="scaffold-box model-box" style="display:none;">${n.stretch_model}</div>`:``}
            </div>
          </div>
        `}t+=`</div>`}e.flashcards&&e.flashcards.length>0&&(t+=`
        <div class="phase-card" id="phase-${o}">
          <div class="phase-title">Phase ${o++}: Consolidation & Recall</div>
          <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
          <div class="flashcard-deck">
      `,e.flashcards.forEach(e=>{t+=`
          <div class="flashcard-wrapper" onclick="this.classList.toggle('flipped')">
            <div class="flashcard-inner">
              <div class="flashcard-face flashcard-front">
                <h4>${e.term}</h4>
                <p>Tap to reveal</p>
              </div>
              <div class="flashcard-face flashcard-back">
                ${e.definition}
              </div>
            </div>
          </div>
        `}),t+=`</div></div>`),t+=`</div>`,n.innerHTML=t}window.toggleElement=e=>{let t=document.getElementById(e);t&&(t.style.display=t.style.display===`none`?`block`:`none`)},e.lessons.length>0?(d(),f(e.lessons[0])):n.innerHTML=`<h2>No lessons found in data.js</h2>`}),window.updateProgress=()=>{let e=document.querySelectorAll(`.student-answer-input`),t=0;e.forEach(e=>{e.value.trim().length>0&&t++});let n=document.getElementById(`progress-bar`);n&&(e.length===0?n.style.width=`100%`:n.style.width=`${t/e.length*100}%`)}}export{e as t};