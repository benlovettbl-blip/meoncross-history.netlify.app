import{a as e,r as t,t as n}from"./preload-helper-BA9YgAzt.js";function r(e,t){let n=[];t.exam_blocks&&t.exam_blocks.forEach(e=>{e.questions.forEach(t=>{n.push({...t,question:t.text||t.question,blockTitle:e.title})})}),t.lessons&&t.lessons.forEach(e=>{if(e.exam_practice){let t=[];t=Array.isArray(e.exam_practice)?e.exam_practice:e.exam_practice.questions?e.exam_practice.questions.map(t=>({...t,stimulus:t.stimulus||e.exam_practice.stimulus})):[e.exam_practice],t.forEach(t=>{let r=t.question||t.text;if(!r)return;let i=t.type;if(!i)if(r.includes(`12 marks`))i=`12-mark`;else if(r.includes(`16 marks`))i=`16-mark`;else if(r.includes(`2 marks`)||r.includes(`4 marks`)||r.includes(`8 marks`)){let e=r.match(/\((\d+) marks?\)/);i=e?`${e[1]}-mark`:`4-mark`}else i=`Exam`;let a=e.title||``,o=a.split(`:`)[0];n.push({...t,question:r,blockTitle:a,ktPrefix:o,type:i})})}});let r=t.assessments&&t.assessments.length>0||t.lessons&&t.lessons.some(e=>e.assessments&&e.assessments.length>0||e.gcse_task),i=t.mock_exams&&t.mock_exams.length>0;if(n.length===0&&!r&&!i){e.innerHTML=`
      <div style="text-align:center; padding: 40px; background: #fff; border-radius: 12px; color: #64748b; font-size: 1.2rem;">
        <i class="fa-solid fa-file-circle-xmark fa-3x" style="margin-bottom:20px; color:#cbd5e1;"></i>
        <br>No assessments or exam questions found for this unit.
      </div>
    `;return}let a=[...new Set(n.map(e=>e.type).filter(Boolean))];if(t.title&&t.title.includes(`KS3`)){let n=`
      <style>
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="epz-wrapper" style="max-width: 900px; margin: 0 auto; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4); border-radius: 20px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; position: relative;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #1e3a8a; margin-top: 0; margin-bottom: 30px;"><i class="fa-solid fa-pen-nib" style="color: #3b82f6;"></i> Unit Assessments</h2>
        <div style="display: flex; flex-direction: column; gap: 20px;">
    `,r=[];t.assessments&&Array.isArray(t.assessments)&&r.push(...t.assessments.map(e=>({...e,lessonTitle:`End of Unit Assessment`}))),t.lessons&&t.lessons.forEach(e=>{e.assessments?e.assessments.forEach(t=>r.push({...t,lessonTitle:e.title})):e.gcse_task&&r.push({...e.gcse_task,lessonTitle:e.title})}),r.length===0?n+=`<p style="color: #64748b; font-size: 1.1rem;">No assessments found for this unit.</p>`:r.forEach(e=>{let t=e.question||e.text||e.description||`Assessment Task`;e.type===`timeline`&&e.events&&(t+=`<ul style="margin-top: 15px; font-size: 1.1rem; color: #475569;">`+e.events.map(e=>`<li><strong>${e.title}</strong>: ${e.detail}</li>`).join(``)+`</ul>`),n+=`
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #3b82f6;">
            <div style="font-size: 0.9rem; font-weight: 700; color: #6366f1; text-transform: uppercase; margin-bottom: 10px;">${e.lessonTitle}</div>
            <h3 style="margin-top: 0; color: #0f172a; font-size: 1.3rem; margin-bottom: 15px;">${e.title&&e.lessonTitle!==`End of Unit Assessment`?e.title+`<br>`:``}${t}</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${e.hint?`<button class="main-btn" onclick="alert('${e.hint.replace(/'/g,`\\'`)}')" style="background: #fef3c7; color: #d97706; border: 1px solid #fde68a; padding: 8px 16px; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-lightbulb"></i> Hint</button>`:``}
              ${e.model_answer?`<button class="main-btn" onclick="const a = this.nextElementSibling; a.style.display = a.style.display === 'none' ? 'block' : 'none';" style="background: #d1fae5; color: #059669; border: 1px solid #a7f3d0; padding: 8px 16px; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-star"></i> Show Model</button>
              <div style="display: none; width: 100%; margin-top: 15px; padding: 15px; background: #f0fdf4; border-left: 4px solid #10b981; color: #064e3b; border-radius: 0 8px 8px 0; white-space: pre-wrap;">${Array.isArray(e.model_answer)?e.model_answer.join(`\\n\\n`):e.model_answer}</div>`:``}
            </div>
          </div>
        `}),n+=`</div></div>`,e.innerHTML=n;return}e.innerHTML=`
    <style>
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .epz-wrapper {
        max-width: 900px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.4);
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05);
        animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        position: relative;
        overflow: hidden;
      }
      .epz-title {
        font-family: 'Playfair Display', serif;
        font-size: 2.8rem;
        background: linear-gradient(135deg, #1e3a8a 0%, #4f46e5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        font-weight: 800;
        letter-spacing: -0.5px;
      }
      .epz-btn {
        transition: all 0.2s ease;
        transform: translateY(0);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .epz-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        filter: brightness(1.05);
      }
      .epz-btn:active {
        transform: translateY(1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .epz-select {
        transition: all 0.3s ease;
      }
      .epz-select:hover {
        border-color: #94a3b8 !important;
      }
      .epz-select:focus {
        outline: none;
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }
      .epz-card {
        background: white;
        border-radius: 16px;
        padding: 30px;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
        border: 1px solid #f1f5f9;
        margin-top: 30px;
        position: relative;
        overflow: hidden;
      }
      .epz-card::after {
        content: '';
        position: absolute;
        top: 0; right: 0; width: 100px; height: 100px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
      }
      .epz-pill {
        padding: 8px 16px;
        border-radius: 20px;
        border: 2px solid #cbd5e1;
        background: white;
        color: #475569;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.95rem;
      }
      .epz-pill:hover {
        border-color: #3b82f6;
        color: #3b82f6;
      }
      .epz-pill.active {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }
    </style>
    
    <div class="epz-wrapper">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; gap: 20px; flex-wrap: wrap;">
        <div>
          <h1 class="epz-title"><i class="fa-solid fa-pen-nib" style="color: #3b82f6;"></i> Exam Practice Zone</h1>
          <p style="color: #64748b; font-size: 1.15rem; margin-top: 10px;">${n.length>0?`Select a question type or a specific past paper question to master.`:`Download complete mock exams below.`}</p>
        </div>
        <button id="epz-back-btn" class="main-btn epz-btn" style="display: none; background: #f8fafc; color: #334155; border: 1px solid #cbd5e1; padding: 10px 20px; border-radius: 10px; font-weight: 600;"><i class="fa-solid fa-arrow-left"></i> Change Question</button>
      </div>

      <div id="epz-controls" ${n.length===0?`style="display:none;"`:``}>
        <div style="display: flex; flex-direction: column; gap: 20px; background: #f8fafc; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="font-weight: 700; color: #1e293b; font-size: 1.05rem; text-transform: uppercase; letter-spacing: 0.5px;">Target Question Type</label>
            <div id="epz-type-pills" style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button class="epz-pill active" data-type="all">📚 All Question Types</button>
              ${a.map(e=>`<button class="epz-pill" data-type="${e}">${e.charAt(0).toUpperCase()+e.slice(1)}</button>`).join(``)}
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="font-weight: 700; color: #1e293b; font-size: 1.05rem; text-transform: uppercase; letter-spacing: 0.5px;">Or Select Specific Question</label>
            <select id="epz-specific-filter" class="epz-select" style="width: 100%; padding: 14px; border-radius: 10px; border: 2px solid #cbd5e1; font-size: 1.15rem; background: #ffffff; color: #1e293b; cursor: pointer;">
              <option value="random">🎲 Random Question (From Filters Above)</option>
            </select>
          </div>
          <button id="epz-generate-btn" class="main-btn epz-btn" style="background: linear-gradient(135deg, #3b82f6, #4f46e5); color: white; padding: 14px 28px; font-size: 1.15rem; flex-shrink: 0; border: none; border-radius: 10px; font-weight: 600;">
            <i class="fa-solid fa-bolt"></i> Generate Question
          </button>
        </div>
      </div>

      <div id="epz-question-display" style="display: none;" class="epz-card">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px;">
          <div id="epz-q-meta" style="font-size: 0.95rem; font-weight: 800; color: #6366f1; text-transform: uppercase; letter-spacing: 1.5px; background: rgba(99, 102, 241, 0.1); padding: 6px 12px; border-radius: 8px;"></div>
          <div id="epz-timer-container" style="display: flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #0f172a, #1e293b); color: white; padding: 10px 20px; border-radius: 25px; font-family: 'Courier New', monospace; font-size: 1.4rem; font-weight: bold; box-shadow: 0 4px 15px rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.1);">
            <i class="fa-solid fa-stopwatch" style="color: #38bdf8;"></i> <span id="epz-timer-display" style="letter-spacing: 2px;">00:00</span>
            <button id="epz-timer-toggle" style="background: rgba(255,255,255,0.1); border: none; color: white; cursor: pointer; padding: 6px 10px; border-radius: 50%; transition: background 0.2s;"><i class="fa-solid fa-play"></i></button>
          </div>
        </div>

        <h2 id="epz-q-text" style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #0f172a; margin-top: 0; line-height: 1.3; font-weight: 700;"></h2>
        <div id="epz-q-stimulus" style="font-size: 1.2rem; color: #475569; margin-top: 20px; font-style: italic; background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; border-left: 4px solid #cbd5e1;"></div>
        
        <div id="epz-q-images" style="display: none; margin-top: 20px; display: flex; flex-wrap: wrap; gap: 10px;"></div>

        <div id="epz-q-provenance" style="display: none; margin-top: 15px; padding: 15px; background: #fef08a; border-left: 5px solid #ca8a04; color: #854d0e; font-size: 1.1rem; border-radius: 8px;"><i class="fa-solid fa-lightbulb"></i> <strong>Scaffolding:</strong> <span id="epz-q-provenance-text"></span></div>

        <div style="margin-top: 35px; display: flex; gap: 15px; flex-wrap: wrap;">
          <button id="epz-hint-btn" class="main-btn epz-btn" style="display: none; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 12px 24px; font-size: 1.1rem; border: none; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-lightbulb"></i> Structure Strip Hint</button>
          <button id="epz-wagoll-btn" class="main-btn epz-btn" style="display: none; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 24px; font-size: 1.1rem; border: none; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-star"></i> Show Model Answer</button>
        </div>

        <div id="epz-hint-panel" style="display: none; margin-top: 25px; padding: 25px; background: linear-gradient(to right, #fffbeb, #fef3c7); border-left: 5px solid #f59e0b; border-radius: 0 12px 12px 0; font-size: 1.15rem; color: #92400e; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.1);"></div>
        <div id="epz-wagoll-panel" style="display: none; margin-top: 25px; padding: 30px; background: linear-gradient(to right, #ecfdf5, #d1fae5); border-left: 5px solid #10b981; border-radius: 0 12px 12px 0; font-size: 1.15rem; color: #065f46; line-height: 1.8; white-space: pre-wrap; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.1);"></div>

      </div>
      
    </div>
  `;let o=null,s=null,c=0,l=!1,u=`all`,d=document.getElementById(`epz-type-pills`),f=document.getElementById(`epz-specific-filter`),p=document.getElementById(`epz-generate-btn`),m=document.getElementById(`epz-back-btn`),h=document.getElementById(`epz-question-display`),g=document.getElementById(`epz-q-meta`),_=document.getElementById(`epz-q-text`),v=document.getElementById(`epz-q-stimulus`),y=document.getElementById(`epz-q-images`),b=document.getElementById(`epz-q-provenance`),x=document.getElementById(`epz-q-provenance-text`),S=document.getElementById(`epz-timer-display`),C=document.getElementById(`epz-timer-toggle`),w=document.getElementById(`epz-hint-btn`),T=document.getElementById(`epz-wagoll-btn`),E=document.getElementById(`epz-hint-panel`),D=document.getElementById(`epz-wagoll-panel`),O=e=>{let t=Math.floor(e/60),n=e%60;return`${t.toString().padStart(2,`0`)}:${n.toString().padStart(2,`0`)}`},k=()=>{S.textContent=O(c),c<=60?S.style.color=`#ef4444`:S.style.color=`white`},A=()=>{l||(l=!0,C.innerHTML=`<i class="fa-solid fa-pause"></i>`,s=setInterval(()=>{c>0?(c--,k()):(j(),alert(`Time's up! Pens down!`))},1e3))},j=()=>{l=!1,C.innerHTML=`<i class="fa-solid fa-play"></i>`,clearInterval(s)},M=()=>{let e=u,t=n;e!==`all`&&(t=t.filter(t=>t.type===e));let r=f.value,i=`<option value="random">🎲 Random Question (From Filters Above)</option>`;t.forEach(e=>{let t=n.indexOf(e),r=e.question.length>75?e.question.substring(0,75)+`...`:e.question,a=e.ktPrefix?`[${e.ktPrefix}] `:``;i+=`<option value="${t}">📄 ${a}${r}</option>`}),f.innerHTML=i,r!==`random`&&Array.from(f.options).some(e=>e.value===r)&&(f.value=r)};m.addEventListener(`click`,()=>{j();let e=Array.from(document.querySelectorAll(`.lesson-link`)).find(e=>e.innerHTML.includes(`Unit Homepage`));e?e.click():window.location.href=`/`}),C.addEventListener(`click`,()=>{l?j():A()}),w.addEventListener(`click`,()=>{E.style.display=E.style.display===`none`?`block`:`none`}),T.addEventListener(`click`,()=>{D.style.display=D.style.display===`none`?`block`:`none`}),d&&d.addEventListener(`click`,e=>{e.target.classList.contains(`epz-pill`)&&(Array.from(d.children).forEach(e=>e.classList.remove(`active`)),e.target.classList.add(`active`),u=e.target.getAttribute(`data-type`),M())}),p.addEventListener(`click`,()=>{let e=f?f.value:`random`;if(e!==`random`)o=n[parseInt(e)];else{let e=u,t=n;if(e!==`all`&&(t=t.filter(t=>t.type===e)),t.length===0){alert(`No questions found for this filter.`);return}let r=Math.floor(Math.random()*t.length);o=t[r]}j(),h.style.display=`block`,E.style.display=`none`,D.style.display=`none`,y.innerHTML=``;let t=o.marks||parseInt((o.type||`0`).replace(/[^0-9]/g,``))||0;if(t&&(c=t*90,k()),g.innerHTML=`<i class="fa-solid fa-book-open"></i> ${o.blockTitle} &bull; ${o.type||`Exam`} Question`,_.textContent=o.question,o.stimulus?(Array.isArray(o.stimulus)?v.innerHTML=o.stimulus.map(e=>typeof e==`string`?e:typeof e==`object`?`<strong>${e.title}</strong><br>${e.content}`:``).join(`<br><br>`):v.innerHTML=o.stimulus,v.style.display=`block`):(v.innerHTML=``,v.style.display=`none`),o.image&&(y.style.display=`flex`,y.innerHTML+=`<img src="${o.image}" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">`),o.provenance_clue?(x.textContent=o.provenance_clue,b.style.display=`block`):b.style.display=`none`,o.structure_strip||o.scaffolding){w.style.display=`block`;let e=o.structure_strip||o.scaffolding,t=`<strong>Scaffolding / Structure Strip:</strong><br><br>`;typeof e==`string`?t+=e.replace(/\\n/g,`<br>`):Array.isArray(e)&&(t+=`<ul style="padding-left: 20px;">${e.map(e=>`<li>${e}</li>`).join(``)}</ul>`),E.innerHTML=t}else w.style.display=`none`;if(o.model_answer){T.style.display=`block`;let e=o.model_answer;Array.isArray(e)&&(e=e.join(`<br><br>`)),D.innerHTML=e.replace(/\\n|\n/g,`<br>`).replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`)}else T.style.display=`none`});let N=document.createElement(`div`);if(N.id=`legacy-assessments`,M(),t.mock_exams&&t.mock_exams.length>0){let n=`
      <div style="margin-top: 50px; background: #fff; padding: 30px; border-radius: 16px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #1e293b; margin-top: 0; margin-bottom: 20px;">
          <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i> Printable Mock Exams
        </h2>
        <p style="color: #475569; font-size: 1.1rem; margin-bottom: 25px;">Generate completely copyright-free, print-ready PDF replicas of past papers.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
          ${t.mock_exams.map(e=>`
            <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; background: #f8fafc; display: flex; flex-direction: column;">
              <h3 style="margin-top: 0; color: #0f172a; font-size: 1.3rem;">${e.title}</h3>
              ${e.paper_reference||e.time_minutes?`<p style="color: #64748b; font-size: 1rem; margin-bottom: 20px; flex-grow: 1;">
                ${e.paper_reference?`<strong>Paper Ref:</strong> ${e.paper_reference}<br>`:``}
                ${e.time_minutes?`<strong>Time:</strong> ${e.time_minutes} minutes<br>`:``}
                ${e.total_marks?`<strong>Marks:</strong> ${e.total_marks} marks`:``}
              </p>`:`<div style="flex-grow: 1;"></div>`}
              <a href="units/${t.id||window.currentUnitId}/${e.id}.html" target="_blank" class="main-btn epz-btn" style="display: block; text-align: center; text-decoration: none; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 20px; font-size: 1.1rem; border-radius: 8px; font-weight: 600; margin-bottom: 10px;">
                <i class="fa-solid fa-print"></i> Generate Printable PDF
              </a>
              ${e.has_mark_scheme||e.section_b&&e.section_b.questions&&e.section_b.questions.some(e=>e.model_answer||e.type===`either_or`&&(e.q5?.model_answer||e.q6?.model_answer))||e.questions&&e.questions.some(e=>e.model_answer||e.type===`essay_choice`&&e.options?.some(e=>e.model_answer))?`
              <a href="units/${t.id||window.currentUnitId}/${e.id}_mark_scheme.html" target="_blank" class="main-btn epz-btn" style="display: block; text-align: center; text-decoration: none; background: linear-gradient(135deg, #002855, #003b7a); color: white; padding: 12px 20px; font-size: 1.1rem; border-radius: 8px; font-weight: 600;">
                <i class="fa-solid fa-chalkboard-user"></i> Teacher Mark Scheme
              </a>
              `:``}
            </div>
          `).join(``)}
        </div>
      </div>
    `,r=e.querySelector(`.epz-wrapper`);r&&r.insertAdjacentHTML(`beforeend`,n)}}function i(e){let t=e.actions||e.achievements&&!Array.isArray(e.achievements)||e.limitations,n=``;(e.image||e.image_url)&&(n=`
      <div style="margin-top: 25px; display: flex; justify-content: center; align-items: flex-start;">
        <img src="${e.image_url?e.image_url:typeof y==`function`?y(e.image):e.image}" loading="lazy" style="max-width: 100%; max-height: 200px; object-fit: contain; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" onerror="this.parentElement.style.display='none'">
      </div>
    `);let r=``;e.bio?r=`<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${e.bio}</div>`:e.significance&&(r=`<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;"><strong>Significance:</strong> ${e.significance}`,e.achievements&&Array.isArray(e.achievements)&&e.achievements.length>0&&(r+=`<br><br><strong>Achievements:</strong><ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>${e.achievements.join(`</li><li>`)}</li></ul>`),r+=`</div>`);let i=``;t&&(i=`<div style="flex: 1.5; min-width: 350px; display: flex; flex-direction: column; gap: 15px; justify-content: center;">`,e.actions&&(i+=`
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 10px; border-radius: 4px;">
          <strong style="color: #3b82f6; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Core Actions</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${e.actions}</span>
        </div>`),e.achievements&&!Array.isArray(e.achievements)&&(i+=`
        <div style="background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e; padding: 10px; border-radius: 4px;">
          <strong style="color: #22c55e; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Impact / Achievements</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${e.achievements}</span>
        </div>`),e.limitations&&(i+=`
        <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; border-radius: 4px;">
          <strong style="color: #ef4444; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Structural Limitations</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${e.limitations}</span>
        </div>`),i+=`</div>`);let a=e.lifespan?`<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: -5px; margin-bottom: 10px;">${e.lifespan}</p>`:``;return`
    <div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: stretch; background: var(--bg-card); padding: 25px; border-radius: 12px; border: 1px solid var(--border-glass);">
      <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column;">
        <h3 style="margin: 0 0 5px 0; color: var(--primary); font-family: var(--font-heading); font-size: 1.5rem;">${e.name}</h3>
        ${a}
        <p style="margin: 0 0 15px 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${e.role||``}</p>
        ${r}
        ${n}
      </div>
      ${i}
    </div>
  `}function a(e){let t=``;t=e.image||e.image_url?`<div style="width: 100%; height: 280px; background: var(--bg-card, #f8fafc); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
      <img src="${e.image_url?e.image_url:typeof y==`function`?y(e.image):e.image}" style="max-width: 100%; max-height: 100%; object-fit: contain; mix-blend-mode: multiply;" onerror="this.src='/images/placeholder_portrait.jpg'">
    </div>`:`<div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden; flex-direction: column; color: var(--text-muted);">
      <i class="fa-solid fa-user" style="font-size: 4rem; opacity: 0.2;"></i>
    </div>`;let n=``;e.bio?n=`<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${e.bio}</div>`:e.significance&&(n=`<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;"><strong>Significance:</strong> ${e.significance}</div>`);let r=`
    <h3 style="margin: 0 0 15px 0; color: var(--primary); font-family: var(--font-heading); text-align: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 10px;">${e.name}</h3>
  `,i=!1;if(e.actions&&(i=!0,r+=`
      <div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
        <strong style="color: #3b82f6; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Core Actions</strong>
        <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${e.actions}</span>
      </div>`),e.achievements){i=!0;let t=Array.isArray(e.achievements)?`<ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>${e.achievements.join(`</li><li>`)}</li></ul>`:e.achievements;r+=`
      <div style="background: rgba(34, 197, 94, 0.1); border-left: 3px solid #22c55e; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
        <strong style="color: #22c55e; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Impact / Achievements</strong>
        <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${t}</span>
      </div>`}if(e.limitations&&(i=!0,r+=`
      <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
        <strong style="color: #ef4444; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Structural Limitations</strong>
        <span style="font-size: 0.9rem; color: var(--text-main); display: block;">${e.limitations}</span>
      </div>`),e.quotes){i=!0;let t=Array.isArray(e.quotes)?e.quotes.map(e=>`&ldquo;${e}&rdquo;`).join(`<br><br>`):`&ldquo;${e.quotes}&rdquo;`;r+=`
      <div style="background: rgba(168, 85, 247, 0.1); border-left: 3px solid #a855f7; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
        <strong style="color: #a855f7; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Key Quotes</strong>
        <span style="font-size: 0.9rem; color: var(--text-main); display: block; font-style: italic;">${t}</span>
      </div>`}i||(r+=`<div style="padding: 20px; text-align: center; color: var(--text-muted); font-style: italic; background: rgba(0,0,0,0.02); border-radius: 8px;">Detailed revision notes for this individual are currently being compiled. Check back soon!</div>`),r+=`<div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.8rem; color: var(--text-muted);"><i class="fas fa-undo"></i> Tap to flip back</div>`;let a=e.lifespan?`<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: -10px; margin-bottom: 10px;">${e.lifespan}</p>`:``;return`
    <div class="person-card" onclick="this.classList.toggle('flipped')" style="height: 100%;">
      <div class="card-inner">
        <div class="card-front">
          ${t}
          <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
            <h3 style="margin: 0 0 5px 0; color: var(--primary); font-family: var(--font-heading);">${e.name}</h3>
            ${a}
            <p style="margin: 0 0 15px 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${e.role||``}</p>
            ${n}
            <div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.85rem; color: #10b981; font-weight: bold;"><i class="fas fa-sync-alt" style="margin-right: 5px;"></i> Tap for Details</div>
          </div>
        </div>
        <div class="card-back">${r}</div>
      </div>
    </div>
  `}function o(e,t,n,r){if(!t||t.length===0)return;let i=document.getElementById(`flip-card-styles`);i||(i=document.createElement(`style`),i.id=`flip-card-styles`,document.head.appendChild(i)),i.innerHTML=`
    .person-card {
      background: transparent;
      cursor: pointer;
    }
    .card-inner {
      position: relative;
      height: 100%;
      perspective: 1000px;
    }
    .person-card:hover:not(.flipped) .card-inner {
      transform: translateY(-5px);
      -webkit-transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    .card-front, .card-back {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
      -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
      background: var(--bg-card, rgba(255, 255, 255, 0.05));
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
    }
    .card-front {
      position: relative;
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
      height: 100%;
    }
    .card-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg);
      padding: 20px;
      overflow-y: auto;
      box-sizing: border-box;
    }
    .person-card.flipped .card-front {
      transform: rotateY(-180deg);
      -webkit-transform: rotateY(-180deg);
    }
    .person-card.flipped .card-back {
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
    }

    /* Premium Banner Styles */
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
  `;let o=document.createElement(`div`);o.className=`key-individuals-wrapper fade-in`,o.style.padding=`20px`,o.style.maxWidth=`1200px`,o.style.margin=`0 auto`;let s=document.createElement(`div`);s.style.textAlign=`center`,s.style.marginBottom=`40px`,s.innerHTML=`
    <h1 style="font-family: var(--font-heading); color: var(--primary); margin-bottom: 10px; font-size: 2.5rem;">${n||`Key Individuals`}</h1>
    <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">${r||`Profiles of the major historical figures who shaped these events.`}</p>
  `,o.appendChild(s);let c=!1;t.length>0&&t[0].group&&(c=!0);let l={"Key Topic 1":{title:`Key Topic 1: The Weimar Republic (1918-29)`,image:`images/weimar_kt1_cover.jpg`,gradient:`linear-gradient(135deg, #1e3a8a, #3b82f6)`,border:`#3b82f6`,enquiry:`To what extent did the Weimar Republic recover from its early crises?`},"Key Topic 2":{title:`Key Topic 2: Hitler's Rise to Power, 1919-33`,image:`images/weimar_kt2_cover.jpg`,gradient:`linear-gradient(135deg, #7f1d1d, #dc2626)`,border:`#dc2626`,enquiry:`How did a tiny obscure political group transform?`},"Key Topic 3":{title:`Key Topic 3: Nazi Control and Dictatorship`,image:`images/weimar_kt3_cover.jpg`,gradient:`linear-gradient(135deg, #4b5563, #1f2937)`,border:`#1f2937`,enquiry:`From chains to absolute control`},"Key Topic 4":{title:`Key Topic 4: Life in Nazi Germany, 1933-39`,image:`images/weimar_kt4_cover.jpg`,gradient:`linear-gradient(135deg, #4d7c0f, #65a30d)`,border:`#65a30d`,enquiry:`Did life improve under the Nazis?`}};if(c){let e=``,n=``,r=!0;t.forEach(t=>{if(t.group!==e){r||(n+=`</div>`),r=!1,e=t.group;let i=l[e];if(i){let e=typeof y==`function`?y(`/`+i.image):`/`+i.image;n+=`
            <div style="margin-top: 40px; margin-bottom: 25px;">
              <div class="premium-banner" style="position: relative; margin: 0; min-height: 140px;">
                <div class="premium-banner-bg" style="background-image: url('${e}'); background-position: center;"></div>
                <div class="premium-banner-overlay-1"></div>
                <div class="premium-banner-overlay-2" style="background: ${i.gradient};"></div>
                <div class="premium-banner-glow" style="background: radial-gradient(circle, ${i.border} 0%, transparent 70%);"></div>
                <div class="premium-banner-content" style="border-left: 6px solid ${i.border};">
                  <h3 class="premium-banner-title">${i.title}</h3>
                  <p class="premium-banner-enquiry">${i.enquiry}</p>
                </div>
              </div>
            </div>
          `}else n+=`
            <h2 style="margin-top: 40px; margin-bottom: 20px; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 10px;">
              ${e}
            </h2>
          `;n+=`<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; align-items: stretch;">`}n+=a(t)}),r||(n+=`</div>`),o.insertAdjacentHTML(`beforeend`,n)}else{let e=document.createElement(`div`);e.style.display=`grid`,e.style.gridTemplateColumns=`repeat(auto-fill, minmax(280px, 1fr))`,e.style.gap=`25px`,e.style.alignItems=`stretch`;let n=``;t.forEach(e=>{n+=a(e)}),e.innerHTML=n,o.appendChild(e)}e.appendChild(o)}function s(n,r){let i=[],a=[],o=[],s=[],c={},l={};if(r.lessons&&r.lessons.forEach(e=>{let t=e.title;c[t]||(c[t]={title:t,questions:[]}),l[t]||(l[t]={title:t,questions:[]});let n=(n,r,a,o)=>{let s={q:n,a,options:r,img:o,source:e.title};i.push(s),c[t].questions.push(s)},r=e.quiz||e.quiz_questions;r&&Array.isArray(r)&&r.forEach(t=>{let r=t.question||t.q;if(r===`Who is this historical figure?`)s.push({q:r,a:t.options?t.options[t.answer]:t.a,options:t.options,img:t.img,source:e.title});else{let e=t.a||t.answer;t.options&&typeof t.answer==`number`&&(e=t.options[t.answer]),n(r,t.options,e,t.img)}}),e.do_now&&e.do_now.type===`questions`&&e.do_now.items&&e.do_now.items.forEach(e=>{n(e.question,null,e.answer)});let u=(n,r)=>{let i={q:n,a:r,source:e.title};a.push(i),l[t].questions.push(i)};e.vocab&&e.vocab.forEach(e=>{o.push({term:e.term,definition:e.definition}),u(`What is the definition of "${e.term}"?`,e.definition),u(`Which term matches this definition: "${e.definition}"?`,e.term)}),e.do_now&&e.do_now.type===`questions`&&(e.do_now.items||e.do_now.tasks||[]).forEach(e=>{let t=e.question||e.q,n=e.answer||e.a;t&&n&&u(t,n)}),e.knowledge_check&&e.knowledge_check.forEach(e=>{u(e.question,e.answer)})}),a=a.filter((e,t,n)=>n.findIndex(t=>t.q===e.q)===t),o=o.filter((e,t,n)=>n.findIndex(t=>t.term===e.term)===t),i.length===0&&a.length===0){n.innerHTML=`<div style="padding: 40px; text-align: center; color: #64748b;">No quiz or revision data available for this unit.</div>`;return}let u=Object.values(c).filter(e=>e.questions.length>0),d=[...i].sort(()=>.5-Math.random()).slice(0,15);n.innerHTML=`
        <div style="max-width: 800px; margin: 0 auto; padding-bottom: 50px; font-family: 'Inter', sans-serif;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 2.5rem; color: #1a237e; margin-bottom: 10px;"><i class="fa-solid fa-gamepad"></i> Interactive Revision Hub</h1>
                <p style="color: #64748b; font-size: 1.1rem;">Test your recall of key historical facts!</p>
            </div>

            <!-- MODE SELECT MENU -->
            <div id="mode-select-container">
                <p style="font-size: 1.2rem; color: #475569; margin-bottom: 30px; text-align: center;">Select a game mode to test your knowledge!</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.background='#f8fafc';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" id="btn-mode-levels">
                        <i class="fa-solid fa-layer-group" style="font-size: 3rem; color: #3b82f6; margin-bottom: 15px;"></i>
                        <h3 style="margin:0 0 10px 0; color: #1e3a8a; font-size: 1.5rem;">Topic Quizzes</h3>
                        <p style="color: #64748b; margin:0;">Tracked, structured quizzes mapped to the A4 pack.</p>
                    </div>
                    <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.background='#f8fafc';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" id="btn-mode-flashcard">
                        <i class="fa-solid fa-bolt" style="font-size: 3rem; color: #f59e0b; margin-bottom: 15px;"></i>
                        <h3 style="margin:0 0 10px 0; color: #1e3a8a; font-size: 1.5rem;">Flashcard Frenzy</h3>
                        <p style="color: #64748b; margin:0;">10 random quick-fire questions. ${a.length} questions available.</p>
                    </div>
                    <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.background='#f8fafc';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" id="btn-mode-vocab">
                        <i class="fa-solid fa-link" style="font-size: 3rem; color: #10b981; margin-bottom: 15px;"></i>
                        <h3 style="margin:0 0 10px 0; color: #1e3a8a; font-size: 1.5rem;">Vocab Match-Up</h3>
                        <p style="color: #64748b; margin:0;">Drag and drop to match 5 key terms to their definitions.</p>
                    </div>
                    ${s.length>0?`
                    <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.background='#f8fafc';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" id="btn-mode-portrait">
                        <i class="fa-solid fa-user-tie" style="font-size: 3rem; color: #db2777; margin-bottom: 15px;"></i>
                        <h3 style="margin:0 0 10px 0; color: #1e3a8a; font-size: 1.5rem;">Who Am I? (Portraits)</h3>
                        <p style="color: #64748b; margin:0;">Identify ${s.length} historical figures by their portraits.</p>
                    </div>
                    `:``}
                </div>
            </div>

            <!-- SHARED GAME CONTAINER -->
            <div id="quiz-ui-container" style="display: none; margin-top: 20px;"></div>
        </div>
    `;let f=n.querySelector(`#mode-select-container`),p=n.querySelector(`#quiz-ui-container`);n.querySelector(`#btn-mode-levels`).addEventListener(`click`,()=>{f.style.display=`none`,p.style.display=`block`,h(!1)}),n.querySelector(`#btn-mode-flashcard`).addEventListener(`click`,()=>{f.style.display=`none`,p.style.display=`block`,v()}),n.querySelector(`#btn-mode-vocab`).addEventListener(`click`,()=>{f.style.display=`none`,p.style.display=`block`,b()}),s.length>0&&n.querySelector(`#btn-mode-portrait`).addEventListener(`click`,()=>{f.style.display=`none`,p.style.display=`block`,g(s,`Who Am I? (Portraits)`,!1)});function m(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function h(e=!1){let t=e?Object.values(l).filter(e=>e.questions.length>0):u,n=`
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #0f172a; margin: 0;">Select a ${e?`Flashcard Deck`:`Topic`}</h2>
                <button id="btn-back-main" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 8px 15px; border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-arrow-left"></i> Back</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
        `;if(t.forEach((t,r)=>{n+=`
                <div class="quiz-level-card" data-level="${r}" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="font-size: 2rem; color: ${e?`#f59e0b`:`#3b82f6`}; margin-bottom: 10px;"><i class="fa-solid ${e?`fa-bolt`:`fa-unlock-keyhole`}"></i></div>
                    <h3 style="margin: 0 0 5px 0; color: #1e293b; font-size: 1.1rem; line-height: 1.3;">${t.title}</h3>
                    <p style="margin: 0; color: #64748b; font-size: 0.9rem; margin-top: 8px;">${t.questions.length} ${e?`Cards`:`Questions`}</p>
                </div>
            `}),e||(n+=`
                <div class="quiz-boss-card" style="background: linear-gradient(135deg, #1e1b4b, #312e81); border: 2px solid #4f46e5; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);">
                    <div style="font-size: 2rem; color: #fbbf24; margin-bottom: 10px;"><i class="fa-solid fa-crown"></i></div>
                    <h3 style="margin: 0 0 5px 0; color: white;">The Ultimate Test</h3>
                    <p style="margin: 0; color: #cbd5e1; font-size: 0.9rem;">15 Random Questions</p>
                </div>`),n+=`</div>`,p.innerHTML=n,p.querySelector(`#btn-back-main`).addEventListener(`click`,()=>{p.style.display=`none`,f.style.display=`block`}),p.querySelectorAll(`.quiz-level-card`).forEach(n=>{n.addEventListener(`mouseover`,()=>{n.style.borderColor=e?`#f59e0b`:`#3b82f6`,n.style.transform=`translateY(-3px)`}),n.addEventListener(`mouseout`,()=>{n.style.borderColor=`#e2e8f0`,n.style.transform=`translateY(0)`}),n.addEventListener(`click`,()=>{let r=parseInt(n.dataset.level);e?y(t[r].questions,t[r].title):g(t[r].questions,t[r].title,!0)})}),!e){let e=p.querySelector(`.quiz-boss-card`);e.addEventListener(`mouseover`,()=>{e.style.transform=`translateY(-3px) scale(1.02)`}),e.addEventListener(`mouseout`,()=>{e.style.transform=`translateY(0) scale(1)`}),e.addEventListener(`click`,()=>{g(d,`The Ultimate Test`,!0)})}}function g(n,r,i){let a=0,o=0,s=n.map(e=>e.a),c=n.map(e=>{let t=e.options;if(!t){let n=s.filter(t=>t!==e.a).sort(()=>.5-Math.random()).slice(0,3);for(;n.length<3;)n.push(`Incorrect Option`);t=[e.a,...n]}return{...e,shuffledOptions:m(t)}});function l(){if(a>=c.length){_(o,c.length,i);return}let n=c[a],s=`
                <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; color: #64748b; font-size: 0.9rem;">
                        <span><strong>${r}</strong></span>
                        <span>Question ${a+1} of ${c.length}</span>
                    </div>
                    <h2 style="font-size: 1.5rem; color: #0f172a; margin-bottom: 30px;">${n.q}</h2>
                    ${n.img?`<img src="${n.img}" style="max-height: 300px; max-width: 100%; border-radius: 8px; margin-bottom: 25px; object-fit: contain; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">`:``}
                    <div id="quiz-options" style="display: flex; flex-direction: column; gap: 10px; max-width: 500px; margin: 0 auto;">
                        ${n.shuffledOptions.map((e,t)=>`
                            <button class="quiz-option-btn" data-answer="${e.replace(/"/g,`&quot;`)}" style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 15px; font-size: 1.1rem; color: #334155; cursor: pointer; transition: all 0.2s; text-align: left; position: relative;">
                                <span style="display: inline-block; width: 30px; height: 30px; line-height: 30px; text-align: center; background: #e2e8f0; border-radius: 50%; margin-right: 15px; font-weight: bold; color: #64748b;">${String.fromCharCode(65+t)}</span>
                                ${e}
                            </button>
                        `).join(``)}
                    </div>
                    <div id="quiz-feedback" style="margin-top: 25px; min-height: 50px;"></div>
                </div>
            `;p.innerHTML=s;let u=p.querySelectorAll(`.quiz-option-btn`);u.forEach(r=>{r.addEventListener(`mouseover`,()=>{r.disabled||(r.style.background=`#eff6ff`,r.style.borderColor=`#bfdbfe`)}),r.addEventListener(`mouseout`,()=>{r.disabled||(r.style.background=`#f8fafc`,r.style.borderColor=`#e2e8f0`)}),r.addEventListener(`click`,()=>{if(r.disabled)return;u.forEach(e=>e.disabled=!0);let s=r.dataset.answer,d=n.a;if(s===d)r.style.background=`#dcfce7`,r.style.borderColor=`#22c55e`,r.style.color=`#166534`,o++,p.querySelector(`#quiz-feedback`).innerHTML=`<div style="color: #16a34a; font-weight: bold; font-size: 1.2rem;"><i class="fa-solid fa-circle-check"></i> Correct!</div>`,i&&n.id&&(e(n.id,!0),t());else{r.style.background=`#fee2e2`,r.style.borderColor=`#ef4444`,r.style.color=`#991b1b`;let a=Array.from(u).find(e=>e.dataset.answer===d);a&&(a.style.background=`#dcfce7`,a.style.borderColor=`#22c55e`),p.querySelector(`#quiz-feedback`).innerHTML=`<div style="color: #dc2626; font-weight: bold; font-size: 1.2rem;"><i class="fa-solid fa-circle-xmark"></i> Incorrect. The answer was ${d}</div>`,i&&n.id&&(e(n.id,!1),t())}let f=document.createElement(`button`);f.innerHTML=a===c.length-1?`See Results <i class="fa-solid fa-arrow-right"></i>`:`Next Question <i class="fa-solid fa-arrow-right"></i>`,f.style.cssText=`margin-top: 15px; background: #3b82f6; color: white; border: none; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background 0.2s;`,f.addEventListener(`click`,()=>{a++,l()}),p.querySelector(`#quiz-feedback`).appendChild(f)})})}l()}function _(e,t,n){let r=Math.round(e/t*100),i=``,a=``,o=``;r>=80?(i=`Excellent work! You have a great historical memory.`,a=`#16a34a`,o=`fa-trophy`):r>=50?(i=`Good effort! A little more revision and you'll master it.`,a=`#ca8a04`,o=`fa-star`):(i=`Keep practicing! Review your notes and try again.`,a=`#dc2626`,o=`fa-book-open`);let s=`
            <div style="background: white; border-radius: 12px; padding: 40px 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center;">
                <div style="font-size: 4rem; color: ${a}; margin-bottom: 10px;"><i class="fa-solid ${o}"></i></div>
                <h2 style="font-size: 2rem; color: #0f172a; margin-bottom: 10px;">Quiz Complete!</h2>
                <div style="font-size: 3rem; font-weight: 800; color: ${a}; margin-bottom: 10px;">${e} / ${t}</div>
                <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 30px;">${i}</p>
                
                <button id="back-to-menu-btn" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; margin-right: 10px;">
                    <i class="fa-solid fa-list"></i> Main Menu
                </button>
                ${n?`
                <button id="back-to-levels-btn" style="background: #3b82f6; color: white; border: none; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                    <i class="fa-solid fa-arrow-left"></i> Back to Levels
                </button>`:``}
            </div>
        `;p.innerHTML=s,p.querySelector(`#back-to-menu-btn`).addEventListener(`click`,()=>{p.style.display=`none`,f.style.display=`block`}),n&&p.querySelector(`#back-to-levels-btn`).addEventListener(`click`,()=>h(!1))}function v(){if(a.length===0){p.innerHTML=`<div style="text-align: center; padding: 30px;">No flashcard data available.</div><button onclick="document.getElementById('mode-select-container').style.display='block'; document.getElementById('quiz-ui-container').style.display='none';" style="padding: 10px; cursor: pointer;">Back</button>`;return}let e=`
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #0f172a; margin: 0;">Select a Flashcard Theme</h2>
                <button id="btn-back-main" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 8px 15px; border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-arrow-left"></i> Back</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
        `,t=[{id:`all`,title:`All Units (Random)`,color:`#1e3a8a`,icon:`fa-layer-group`,lessons:[]},{id:`trade`,title:`Exploration & Trade`,color:`#10b981`,icon:`fa-globe`,lessons:[`1450`,`Trade or takeover`]},{id:`conflict`,title:`Conflict & Power`,color:`#ef4444`,icon:`fa-gavel`,lessons:[`Who controlled Britain`,`enslaved Africans`]},{id:`religion`,title:`Religion & Society`,color:`#8b5cf6`,icon:`fa-church`,lessons:[`religious conflict`,`modern`]}];t.forEach(t=>{e+=`
                <div class="theme-card" data-theme="${t.id}" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="font-size: 2.5rem; color: ${t.color}; margin-bottom: 15px;"><i class="fa-solid ${t.icon}"></i></div>
                    <h3 style="margin: 0 0 5px 0; color: #1e293b; font-size: 1.1rem; line-height: 1.3;">${t.title}</h3>
                </div>
            `}),e+=`</div>
        <div style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <h3 style="color: #475569; font-size: 1rem; margin-bottom: 10px;">Or revise by specific lesson:</h3>
            <button id="btn-by-lesson" style="background: white; color: #3b82f6; border: 2px solid #3b82f6; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%;">View Lesson Decks</button>
        </div>`,p.innerHTML=e,p.querySelector(`#btn-back-main`).addEventListener(`click`,()=>{p.style.display=`none`,f.style.display=`block`}),p.querySelector(`#btn-by-lesson`).addEventListener(`click`,()=>{h(!0)}),p.querySelectorAll(`.theme-card`).forEach(e=>{e.addEventListener(`mouseover`,()=>{e.style.transform=`translateY(-3px)`,e.style.borderColor=`#94a3b8`}),e.addEventListener(`mouseout`,()=>{e.style.transform=`translateY(0)`,e.style.borderColor=`#e2e8f0`}),e.addEventListener(`click`,()=>{let n=e.dataset.theme,r=t.find(e=>e.id===n),i=a;if(n!==`all`&&(i=a.filter(e=>r.lessons.some(t=>e.source&&e.source.includes(t)))),i.length===0){alert(`No flashcards found for this theme!`);return}y(i,r.title)})})}function y(n,r){let i=0,a=m([...n]);function o(){if(i>=a.length){s();return}let n=a[i],c=`
                <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center; position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; color: #64748b; font-size: 0.9rem;">
                        <span><strong>${r}</strong></span>
                        <span>Card ${i+1} of ${a.length}</span>
                    </div>
                    
                    <div id="flashcard-container" style="perspective: 1000px; width: 100%; max-width: 600px; margin: 0 auto; height: 300px; cursor: pointer;">
                        <div id="flashcard-inner" style="width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; position: relative;">
                            
                            <!-- Front of card -->
                            <div style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 20px; flex-direction: column;">
                                <h2 style="font-size: 1.5rem; color: #0f172a; margin: 0;">${n.q}</h2>
                                <p style="color: #64748b; margin-top: 20px; font-size: 0.9rem;"><i class="fa-solid fa-hand-pointer"></i> Click to flip</p>
                            </div>

                            <!-- Back of card -->
                            <div style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 20px; transform: rotateY(180deg); flex-direction: column;">
                                <h2 style="font-size: 1.5rem; color: #1e3a8a; margin: 0;">${n.a}</h2>
                            </div>

                        </div>
                    </div>

                    <div id="flashcard-actions" style="margin-top: 30px; display: none; justify-content: center; gap: 20px;">
                        <button id="btn-wrong" style="background: #fee2e2; color: #b91c1c; border: 2px solid #fca5a5; padding: 12px 25px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-xmark"></i> I was wrong</button>
                        <button id="btn-right" style="background: #dcfce7; color: #15803d; border: 2px solid #86efac; padding: 12px 25px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-check"></i> I got it right!</button>
                    </div>
                </div>
            `;p.innerHTML=c;let l=p.querySelector(`#flashcard-inner`),u=p.querySelector(`#flashcard-container`),d=p.querySelector(`#flashcard-actions`),f=!1;u.addEventListener(`click`,()=>{f||=(l.style.transform=`rotateY(180deg)`,d.style.display=`flex`,!0)}),p.querySelector(`#btn-wrong`).addEventListener(`click`,r=>{r.stopPropagation(),n.id&&(e(n.id,!1),t()),i++,o()}),p.querySelector(`#btn-right`).addEventListener(`click`,r=>{r.stopPropagation(),n.id&&(e(n.id,!0),t()),i++,o()})}function s(){p.innerHTML=`
                <div style="background: white; border-radius: 12px; padding: 40px 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center;">
                    <div style="font-size: 4rem; color: #f59e0b; margin-bottom: 10px;"><i class="fa-solid fa-bolt"></i></div>
                    <h2 style="font-size: 2rem; color: #0f172a; margin-bottom: 10px;">Deck Complete!</h2>
                    <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 30px;">You've reviewed all cards in this topic.</p>
                    
                    <button id="back-to-menu-btn" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; margin-right: 10px;">
                        <i class="fa-solid fa-list"></i> Main Menu
                    </button>
                    <button id="back-to-levels-btn" style="background: #f59e0b; color: white; border: none; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                        <i class="fa-solid fa-arrow-left"></i> Back to Decks
                    </button>
                </div>
            `,p.querySelector(`#back-to-menu-btn`).addEventListener(`click`,()=>{p.style.display=`none`,f.style.display=`block`}),p.querySelector(`#back-to-levels-btn`).addEventListener(`click`,()=>h(!0))}o()}function b(){if(o.length<5){p.innerHTML=`<div style="text-align: center; padding: 30px;">Not enough vocabulary data available for match-up (needs 5).</div><button onclick="document.getElementById('mode-select-container').style.display='block'; document.getElementById('quiz-ui-container').style.display='none';" style="padding: 10px; cursor: pointer;">Back</button>`;return}let e=m([...o]).slice(0,5),t=m([...e]),n=m([...e]);window.dragVocab=function(e){e.dataTransfer.setData(`text`,e.target.id)},window.allowDropVocab=function(e){e.preventDefault()},window.dropVocab=function(e){e.preventDefault();let t=e.dataTransfer.getData(`text`),n=document.getElementById(t),r=e.target;for(;r&&!r.classList.contains(`vocab-dropzone`);)r=r.parentElement;r&&n&&(r.children.length>0&&document.getElementById(`vocab-terms-column`).appendChild(r.children[0]),r.appendChild(n))};let r=`
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #0f172a; margin: 0;">Vocab Match-Up</h2>
                <button id="btn-back-main-vocab" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 8px 15px; border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-arrow-left"></i> Back</button>
            </div>
            <p style="text-align:center; margin-bottom: 20px; color: #475569;">Drag the Terms on the left to the correct Definitions on the right.</p>
            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; margin-bottom: 20px;">
                <div id="vocab-terms-column" style="display:flex; flex-direction: column; gap:15px; border-right: 2px dashed #cbd5e1; padding-right: 20px;">
                    ${t.map((e,t)=>`<div id="vocab-term-${t}" data-term="${e.term.replace(/"/g,`&quot;`)}" class="vocab-term-card" draggable="true" ondragstart="window.dragVocab(event)" style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 15px; font-weight: bold; cursor: grab; text-align: center;">${e.term}</div>`).join(``)}
                </div>
                <div id="vocab-defs-column" style="display:flex; flex-direction: column; gap:15px;">
                    ${n.map(e=>`
                        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; align-items: stretch; min-height: 60px;">
                            <div class="vocab-dropzone" data-def="${e.term.replace(/"/g,`&quot;`)}" ondragover="window.allowDropVocab(event)" ondrop="window.dropVocab(event)" style="flex: 0 0 150px; border-right: 2px dashed #94a3b8; background: white; border-top-left-radius: 8px; border-bottom-left-radius: 8px; padding: 10px; display:flex; align-items:center; justify-content:center;"></div>
                            <div style="padding: 15px; flex: 1; display:flex; align-items:center;">${e.definition}</div>
                        </div>
                    `).join(``)}
                </div>
            </div>
            <div style="text-align: center;">
                <button id="btn-check-vocab" style="background: #3b82f6; color: white; border: none; font-size: 1.2rem; padding: 12px 30px; border-radius: 6px; font-weight: bold; cursor: pointer;">Check Answers</button>
                <div id="vocab-feedback" style="margin-top: 15px; font-weight: bold; font-size: 1.2rem; min-height: 2em;"></div>
            </div>
        `;p.innerHTML=r,p.querySelector(`#btn-back-main-vocab`).addEventListener(`click`,()=>{p.style.display=`none`,f.style.display=`block`}),p.querySelector(`#btn-check-vocab`).addEventListener(`click`,()=>{let e=0,t=p.querySelectorAll(`.vocab-dropzone`),n=!0;t.forEach(t=>{if(t.style.background=`white`,t.children.length===0){n=!1;return}let r=t.children[0];r.getAttribute(`data-term`)===t.getAttribute(`data-def`)?(e++,t.style.background=`#dcfce7`,r.style.borderColor=`#16a34a`):(t.style.background=`#fee2e2`,r.style.borderColor=`#dc2626`)});let r=p.querySelector(`#vocab-feedback`);if(!n){r.style.color=`#d97706`,r.innerText=`Please match all terms before checking!`;return}e===5?(r.style.color=`#16a34a`,r.innerText=`Perfect! 5/5 Correct.`,setTimeout(()=>_(5,5,!1),2e3)):(r.style.color=`#dc2626`,r.innerText=`You got ${e}/5 correct. Check the red boxes and try again!`)})}}function c(e){return e?e.replace(/^Recall from (last|previous) lesson(s)?:\s*/i,``).replace(/^PAST TOPIC:\s*/i,``).replace(/^Enquiry:\s*/i,``).replace(/^Predict:\s*/i,``).replace(/^(Q\d+[:.]? |Task \d+[:.]? |Question \d+[a-z]?[:.]? |Enquiry Task[:.]? |\d+\.\s*)/i,``).replace(/\s*\((P|Para\s*)\d+\)/gi,``).replace(/\s*\(Ext P\d+(-\d+)?\)/gi,``).trim():``}var l=(e,t,n)=>`
  <div style="display: flex; align-items: center; margin-bottom: 25px; border-bottom: 3px solid ${n}; padding-bottom: 10px;">
    <div style="background: ${n}; color: white; width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-right: 15px; box-shadow: 0 4px 10px ${n}40;">
      <i class="fa-solid ${t}"></i>
    </div>
    <h2 style="color: ${n}; font-family: 'Outfit', sans-serif; font-size: 1.9rem; font-weight: 700; margin: 0;">${e}</h2>
  </div>
`,u=(e,t,n,r,i,a,o,s)=>{let c=`card-`+Math.random().toString(36).substr(2,9),l=n.match(/(\d+)(?!.*\d)/),u=l?parseInt(l[1],10):5;return`
  <div class="exam-guide-topic" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); padding: 30px; margin-bottom: 35px; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 20px -5px rgba(0, 0, 0, 0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.05)';">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">
      <h3 style="color: #0f172a; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; margin: 0;">${e}</h3>
      <div style="display: flex; gap: 10px; align-items: center;">
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-star" style="color: #eab308;"></i> ${t}</span>
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-regular fa-clock" style="color: #3b82f6;"></i> ${n}</span>
        <button onclick="window.toggleExamTimer('${c}', ${u})" style="background: #e2e8f0; color: #475569; border: none; border-radius: 20px; padding: 6px 14px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;" onmouseover="this.style.background='#cbd5e1'" onmouseout="this.style.background='#e2e8f0'"><i class="fa-solid fa-stopwatch" style="color: #6366f1;"></i> Timer</button>
      </div>
    </div>
    
    <div id="timer-container-${c}" style="display: none; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 15px 20px; margin-bottom: 25px; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 15px;">
        <button onclick="window.adjustExamTimer('${c}', -1)" style="background: white; border: 1px solid #93c5fd; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #1d4ed8; transition: background 0.2s;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='white'"><i class="fa-solid fa-minus"></i></button>
        <div id="timer-display-${c}" style="font-family: 'Fira Code', monospace; font-size: 2rem; font-weight: bold; color: #1e3a8a; width: 110px; text-align: center;">${u}:00</div>
        <button onclick="window.adjustExamTimer('${c}', 1)" style="background: white; border: 1px solid #93c5fd; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #1d4ed8; transition: background 0.2s;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='white'"><i class="fa-solid fa-plus"></i></button>
      </div>
      <div style="flex-grow: 1; margin: 0 25px; height: 8px; background: #dbeafe; border-radius: 4px; overflow: hidden; position: relative;">
        <div id="timer-progress-${c}" style="width: 100%; height: 100%; background: #3b82f6; transition: width 1s linear;"></div>
      </div>
      <div style="display: flex; gap: 10px;">
        <button id="timer-start-btn-${c}" onclick="window.startExamTimer('${c}')" style="background: #10b981; color: white; border: none; border-radius: 6px; padding: 8px 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'"><i class="fa-solid fa-play"></i> Start</button>
        <button onclick="window.resetExamTimer('${c}', ${u})" style="background: #64748b; color: white; border: none; border-radius: 6px; padding: 8px 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s;" onmouseover="this.style.background='#475569'" onmouseout="this.style.background='#64748b'"><i class="fa-solid fa-rotate-right"></i> Reset</button>
      </div>
    </div>
    
    <div style="background: #f8fafc; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin-bottom: 25px;">
      <span style="display: block; font-size: 0.85rem; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px;">Target Objective</span>
      <span style="color: #334155; font-weight: 500; font-size: 1.05rem;">${r}</span>
    </div>
    
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #f8fafc; padding: 25px; border-radius: 10px; margin: 30px 0; font-family: 'Fira Code', monospace; position: relative; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
      <div style="position: absolute; top: -10px; right: -10px; color: rgba(255,255,255,0.03); font-size: 6rem;"><i class="fa-solid fa-code"></i></div>
      <strong style="color: #38bdf8; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 15px;"><i class="fa-solid fa-bolt" style="color: #fbbf24; margin-right: 8px;"></i> ${i}</strong>
      <div style="font-size: 1rem; line-height: 1.8;">
        ${a}
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
      <div style="background: #fff5f5; border: 1px solid #fecaca; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #dc2626; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-triangle-exclamation" style="margin-right: 10px; font-size: 1.2rem;"></i> Examiner Red Flags</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #991b1b; line-height: 1.6;">
          ${o.map(e=>`<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>${e}</span></li>`).join(``)}
        </ul>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #16a34a; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-check-double" style="margin-right: 10px; font-size: 1.2rem;"></i> Grade 9 Checklist</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #166534; line-height: 1.6;">
          ${s.map(e=>`<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>${e}</span></li>`).join(``)}
        </ul>
      </div>
    </div>
  </div>
`},d=`
<div class="exam-guide-section" style="margin-bottom: 60px;">
  ${l(`Section A: The Historic Environment`,`fa-map-location-dot`,`#1e40af`)}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section assesses your knowledge of the historic environment of the Western Front and counts for 10% of your total GCSE.</em></p>

  ${u(`Q1(a) & 1(b): Describe One Feature...`,`4 Marks`,`5 mins`,`AO1 (Demonstrate knowledge and understanding of key features)`,`The 2-Mark Triage Formula`,`<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Sentence 1: State feature clearly]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Sentence 2: Add specific context]</div></div>`,[`<strong>The Single-Sentence List:</strong> Naming a feature without elaboration (e.g., "One feature was gas attacks"). This only secures 1 mark.`,`<strong>Vague Generalizations:</strong> Broad statements without precise historical vocabulary.`,`<strong>"Too Much Detail":</strong> Writing a whole paragraph. Examiners award the 2 marks as soon as the feature and one detail are met. Excess writing wastes precious time.`],[`<strong>Structural Separation:</strong> Have I written exactly two distinct sentences for 1(a) and two for 1(b)?`,`<strong>First-Sentence Punch:</strong> Does my first sentence explicitly state one physical, technological, or administrative feature?`,`<strong>Precise Contextual Anchor:</strong> Does my second sentence deploy named, specific historical data?`,`<strong>Zero Overlap:</strong> Are my answers for 1(a) and 1(b) completely distinct?`])}

  ${u(`Question 2(a): Source Utility`,`8 Marks`,`12-15 mins`,`AO3 (Analyse, evaluate, and use sources to make substantiated judgements)`,`The Grade 9 Utility Structure`,`<div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">1</span> Enquiry-Focused Thesis</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">2</span> Source Paragraph (Content, Provenance, Context)</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">3</span> Explicit Utility Verdict (Do NOT compare)</div></div>`,[`<strong>Generic Provenance Mnemonics:</strong> Using rote-learned checklists to make sweepingly dismissive statements (e.g., "Source A is a diary so it is biased/unreliable").`,`<strong>The Comparison Trap:</strong> Wasting time comparing Source A and Source B. There are zero marks available for comparing.`,`<strong>Simple Comprehension:</strong> Simply listing what the source "shows" or "says" without drawing historical inferences.`],[`<strong>Enquiry Alignment:</strong> Does the first sentence of each paragraph state how useful that specific source is for the precise enquiry?`,`<strong>Double-Source Balance:</strong> Have I given equal analytical weight to both sources?`,`<strong>Inference from Content:</strong> Have I pulled a specific quote or visual detail and explicitly explained what it reveals?`,`<strong>Provenance Deconstruction:</strong> Have I evaluated why the source was created, who created it, and when?`,`<strong>Contextual Verification:</strong> Have I integrated independent historical knowledge?`])}

  ${u(`Question 2(b): Source Follow-Up`,`4 Marks`,`5 mins`,`AO3 (Formulate historical questions and plan a historical enquiry)`,`The Enquiries Connection Map`,`<div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;"><div style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.9rem;">1. Precise Source Detail</div><i class="fa-solid fa-arrow-right" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.9rem;">2. Broadening Question</div><i class="fa-solid fa-arrow-right" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.9rem;">3. Contemporary Source</div><i class="fa-solid fa-arrow-right" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.9rem;">4. How it Helps</div></div>`,[`<strong>The "Unlinked" Chain:</strong> Proposing a follow-up question that has no logical connection to the physical quote selected in Box 1.`,`<strong>Anachronistic Sources:</strong> Suggesting "interviews with soldiers," "the internet," or "textbooks." You must select a primary source.`,`<strong>Circular Explanations:</strong> Writing "This would help answer my question because it would tell me what I want to know" in Box 4 receives 0 marks.`],[`<strong>Box 1 (Detail):</strong> Have I copied a single, direct, and highly specific quote?`,`<strong>Box 2 (Question):</strong> Is my question tightly focused on the detail in Box 1?`,`<strong>Box 3 (Source Type):</strong> Have I suggested a highly specific, contemporary primary source? (e.g. RAMC medical diaries)`,`<strong>Box 4 (How it Helps):</strong> Have I explained exactly what information my suggested source would contain?`])}
</div>
`,f=`
<div class="exam-guide-section" style="margin-bottom: 60px;">
  ${l(`Section B: Thematic Study (Medicine in Britain)`,`fa-book-medical`,`#047857`)}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section tests your understanding of change, continuity, and causation across 800 years of British medicine.</em></p>

  ${u(`Question 3: Explain One Similarity or Difference...`,`4 Marks`,`5 mins`,`AO2 (Analyse similarity and difference across historical periods)`,`The Symmetrical Splicing Method`,`<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Comparative Thesis]</div><i class="fa-solid fa-link" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Era 1: Context]</div><i class="fa-solid fa-scale-balanced" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Era 2: Matching Context]</div></div>`,[`<strong>The "Two-Story" Essay:</strong> Writing a block of facts about the first era, followed by a separate block about the second era without linking them is capped at 2 marks.`,`<strong>Concept Slippage:</strong> If the question asks about prevention, do not write about treatment.`,`<strong>Chronological Blunders:</strong> Placing key developments in the wrong century.`],[`<strong>Immediate Comparison:</strong> Does my very first sentence make a direct comparison using a comparative connective?`,`<strong>Symmetrical Alignment:</strong> Do the details I provide for Era 2 directly match the theme of Era 1?`,`<strong>Single-Paragraph Splicing:</strong> Is my answer written as a single, cohesive paragraph?`])}

  ${u(`Question 4: Explain Why... (Causation)`,`12 Marks`,`15-18 mins`,`AO2 (Analyse causation) and AO1 (Demonstrate precise knowledge)`,`The Three-Causal-Pillars Layout`,`<div style="display: flex; flex-direction: column; gap: 8px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;"><div style="color: #94a3b8; font-style: italic;"><i class="fa-solid fa-ban"></i> No Introduction</div><div style="display: flex; gap: 10px; margin: 10px 0;"><div style="flex: 1; background: rgba(56, 189, 248, 0.2); border: 1px solid rgba(56, 189, 248, 0.4); text-align: center; padding: 10px; border-radius: 6px;">Para 1<br><small>Stimulus A</small></div><div style="flex: 1; background: rgba(56, 189, 248, 0.2); border: 1px solid rgba(56, 189, 248, 0.4); text-align: center; padding: 10px; border-radius: 6px;">Para 2<br><small>Stimulus B</small></div><div style="flex: 1; background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); text-align: center; padding: 10px; border-radius: 6px;">Para 3<br><small>Own Knowledge</small></div></div><div style="color: #94a3b8; font-style: italic;"><i class="fa-solid fa-ban"></i> No Conclusion</div></div>`,[`<strong>The Stimulus Cap:</strong> Failing to introduce an independent third factor from your own knowledge caps your mark at 8/12.`,`<strong>The Narrative Biography Trap:</strong> Writing a chronological story instead of explaining <em>why</em> their work led to rapid progress.`],[`<strong>The Rule of Three:</strong> Have I structured my answer into exactly three separate paragraphs?`,`<strong>Causal Topic Openers:</strong> Does the first sentence of each paragraph state a clear, analytical cause?`,`<strong>Double Causal Connectives:</strong> Have I used the Edexcel Connective Chain ("Consequently...", "This meant that...") at least twice per paragraph?`])}

  ${u(`Question 5 & 6: Evaluative Essay`,`16+4 Marks`,`25-30 mins`,`AO2 (Evaluate significance/change) and AO1 (Wide-ranging knowledge)`,`The Grade 9 Judgment Arc`,`<div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; flex-wrap: wrap; gap: 15px;"><div style="text-align: center;"><div style="background: #3b82f6; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-bottom: 8px; font-weight: bold;">1</div><br>Intro<br><small style="color:#94a3b8">(Thesis & Criteria)</small></div><i class="fa-solid fa-chevron-right" style="color: #475569;"></i><div style="text-align: center;"><div style="background: #3b82f6; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-bottom: 8px; font-weight: bold;">2</div><br>FOR<br><small style="color:#94a3b8">(Given Factor)</small></div><i class="fa-solid fa-chevron-right" style="color: #475569;"></i><div style="text-align: center;"><div style="background: #10b981; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-bottom: 8px; font-weight: bold;">3</div><br>AGAINST<br><small style="color:#94a3b8">(Own Knowledge)</small></div><i class="fa-solid fa-chevron-right" style="color: #475569;"></i><div style="text-align: center;"><div style="background: #8b5cf6; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-bottom: 8px; font-weight: bold;">4</div><br>Conclusion<br><small style="color:#94a3b8">(Apply Criteria)</small></div></div>`,[`<strong>The One-Sided Argument:</strong> Failing to analyze alternative factors traps your essay at Level 2 (8 marks).`,`<strong>"Fencing" Conclusions:</strong> Reaching a conclusion that simply states both sides were equally important.`,`<strong>Concept Slippage:</strong> Treating "care" and "treatment" as identical.`],[`<strong>Explicit Evaluation Criteria:</strong> Have I defined the historical criteria I will use to measure the statement?`,`<strong>The Argument AGAINST:</strong> Have I evaluated alternative factors using my own knowledge?`,`<strong>Substantiated Verdict:</strong> Have I explicitly applied the criteria established in my intro to justify which factor was most significant?`,`<strong>SPaG:</strong> Have I capitalized proper nouns and correctly spelled specialist terms?`])}
</div>
`,p=`
<div class="exam-guide-section" style="margin-bottom: 60px;">
  ${l(`Period Study: Conflict in the Middle East`,`fa-globe`,`#b91c1c`)}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section is a fast-paced assessment of your historical knowledge and analytical skills. You have exactly <strong>50 minutes</strong> to complete this section, which is worth <strong>32 marks</strong> in total.</em></p>

  ${u(`Q1(a) & 1(b): Explain One Consequence`,`4 Marks (2x2)`,`5 mins`,`AO1/AO2 (Knowledge & Analysis of Consequence)`,`The 3-Step PEE Formula`,`<div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">P</span> Point: State one clear, valid consequence</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">E</span> Evidence: Provide precise, specific knowledge</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">E</span> Explanation: Use causal language (e.g., "This directly resulted in...")</div></div>`,[`Describing what happened <em>after</em> the event instead of what happened <em>as a direct result</em>.`,`Listing multiple consequences instead of focusing on one.`,`Repeating the same consequence across 1(a) and 1(b).`],[`Is this exactly one highly focused paragraph?`,`Did I include precise names, dates, or figures as evidence?`,`Are there explicit causal connectives linking the evidence to the consequence?`])}

  ${u(`Q2: Analytical Narrative`,`8 Marks`,`15 mins`,`AO1/AO2 (Knowledge & Sequence/Causation)`,`Chronological Linkage Chain`,`<div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 1</span> The Beginning: Earliest event</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 2</span> The Middle: Causal link to event 2</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 3</span> The End: Culminating outcome</div></div>`,[`Failing to introduce an independent development (only using stimulus points).`,`Writing a descriptive story without explaining how one event led to the next.`,`Jumping back and forth chronologically.`],[`Are there exactly three connected paragraphs?`,`Does every paragraph open with an explicit causal connective?`,`Have I included at least one major development from my own knowledge?`])}

  ${u(`Q3: Explain the Importance`,`16 Marks (2x8)`,`25 mins`,`AO1/AO2 (Knowledge & Analysis of Significance)`,`The "X Linked to Y" Model`,`<div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 1</span> Short-Term/Immediate Importance</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 2</span> Long-Term/Strategic Importance</div></div>`,[`Describing what the event/person did without explaining <em>why</em> it was important.`,`Not explicitly answering "what difference did this make?".`],[`Did I write exactly two analytical paragraphs for each of the two topics?`,`Did I include analytical language like "This was highly important for X because..."?`,`Does my second paragraph end with a strong summary statement about long-term significance?`])}

  <div class="exam-guide-topic" style="background: #f8fafc; border: 2px dashed #94a3b8; border-radius: 12px; padding: 30px; margin-bottom: 35px;">
    <h3 style="color: #334155; font-family: \'Outfit\', sans-serif; font-size: 1.5rem; font-weight: 700; margin-top: 0; margin-bottom: 20px;"><i class="fa-solid fa-lightbulb" style="color: #eab308; margin-right: 10px;"></i> Top Tips & Common Pitfalls for the Middle East</h3>
    <ul style="list-style: none; padding: 0; margin: 0; font-size: 1rem; color: #475569; line-height: 1.8;">
      <li style="margin-bottom: 15px;"><strong style="color: #0f172a;">Own the Timeline:</strong> Memorize the exact years of key conflicts to ensure you stay within the precise date range of narrative or importance questions.</li>
      <li style="margin-bottom: 15px;"><strong style="color: #0f172a;">Master the Cold War Proxy Context:</strong> Show the examiner you understand the international dimension. Explain how the US and Soviet Union provided weapons, funding, or diplomatic pressure to advance their interests.</li>
      <li style="margin-bottom: 15px;"><strong style="color: #0f172a;">Use Precise Tier-3 Terminology:</strong> Weave specific historical terms into your explanations (e.g., Mandate, Fedayeen, Intifada, Shuttle Diplomacy, Sovereignty).</li>
      <li style="margin-bottom: 15px;"><strong style="color: #b91c1c;">The "Nasser vs. Sadat" Confusion:</strong> Do not confuse these two Egyptian presidents. Nasser (1954-1970) is key to Suez and the Six-Day War. Sadat (1970-1981) is key to the Yom Kippur War and Camp David.</li>
    </ul>
  </div>
</div>
`,m=`
<div class="exam-guide-section" style="margin-bottom: 60px;">
  ${l(`Paper 3: Modern Depth Study (Weimar and Nazi Germany, 1918-39)`,`fa-landmark`,`#0f172a`)}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section assesses your knowledge of Germany from 1918 to 1939 and your ability to evaluate sources and interpretations. You have <strong>1 hour 30 minutes</strong> to complete this section, which is worth 30% of your total GCSE.</em></p>

  ${u(`Question 1: Give Two Things You Can Infer...`,`4 Marks`,`5-7 mins`,`AO3 (Analyse sources to make inferences)`,`The Inference Double-Punch`,`<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Make an inference]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Quote the detail that proves it]</div></div>`,[`<strong>Paraphrasing the Source:</strong> Just repeating what the source says without reading between the lines gets 0 marks for inference.`,`<strong>Missing Quotes:</strong> Failing to provide a specific physical detail from the source to back up the inference.`],[`<strong>Two Distinct Inferences:</strong> Have I made two completely different inferences?`,`<strong>Direct Quotes:</strong> Have I included a specific quote or visual detail to support each inference?`])}

  ${u(`Question 2: Explain Why...`,`12 Marks`,`20 mins`,`AO1 (Knowledge & Understanding) and AO2 (Analysis of Causation)`,`The 3-Aspect Causation Framework`,`<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Introduce Cause]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Deploy Precise Detail]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Link with Causation Connective: "As a result..."]</div></div>`,[`<strong>The Stimulus Ceiling (Max 8 Marks):</strong> Relying only on the two provided bullet points. You must introduce at least one distinct factor of your own knowledge to address three aspects of content and unlock Level 4.`,`<strong>Descriptive/Narrative Drift:</strong> Describing what happened rather than explaining how or why the event directly caused the outcome.`,`<strong>Prioritisation Waste:</strong> Trying to rank, balance, or link the causes in a conclusion. This question does not assess evaluation, so you get zero reward for doing so.`],[`<strong>Three Aspects of Content:</strong> Have I written three well-developed paragraphs covering three distinct aspects of the topic?`,`<strong>Causation Connectives:</strong> Does every paragraph end with an analytical link showing exactly how the cause led to the outcome?`])}

  ${u(`Question 3(a): Evaluating Source Utility`,`8 Marks`,`15 mins`,`AO3 (Analyse and evaluate source utility)`,`The Utility Trio (Content + Provenance + Context)`,`<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Analyse Source Content]</div><div style="color: #38bdf8;"><i class="fa-solid fa-plus"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[NOP: Nature/Origin/Purpose]</div><div style="color: #38bdf8;"><i class="fa-solid fa-plus"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Contextual Knowledge validation]</div></div>`,[`<strong>Generic NOP:</strong> Stating basic comments like "it is biased because it is propaganda" or "it is a photograph so it is a snapshot." You must link specific provenance details directly to its utility.`,`<strong>Missing Own Knowledge:</strong> Relying solely on source text analysis. Without deploying precise historical knowledge to validate or challenge the source, you are capped at Level 2 (max 5 marks).`,`<strong>The Comparison Trap:</strong> Attempting to compare the sources or state which is more useful. There are no comparison marks—evaluate each source on its own merit.`,`<strong>Focusing on What is Missing:</strong> Writing about what the source does not mention rather than evaluating the utility of what is actually there.`],[`<strong>Both Sources Evaluated:</strong> Have I written equal-weight paragraphs for both Source B and Source C?`,`<strong>Qualitative Contextual Knowledge:</strong> Have I used my own knowledge of Weimar/Nazi Germany to confirm, supplement, or challenge what the sources reveal?`])}

  ${u(`Question 3(b): Identifying Differences`,`4 Marks`,`5-7 mins`,`AO4 (Analyse interpretations to identify differences)`,`The Interpretations Contrast`,`<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[State overall view of Interpretation 1]</div><div style="color: #38bdf8;"><i class="fa-solid fa-code-compare"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[State contrasting view of Interpretation 2]</div></div>`,[`<strong>Surface Details Only:</strong> Spotting minor differences in vocabulary or specific facts rather than identifying the fundamental, overall difference in the historians’ arguments (caps at Level 1, max 2 marks).`,`<strong>Unsupported Assertions:</strong> Stating the overall difference but failing to back it up with direct quotes or clear paraphrased details from both interpretations.`],[`<strong>Core Disagreement Identified:</strong> Did I identify the overall difference in view (e.g., economic vs. political, or positive vs. negative impact)?`,`<strong>Evidence from Both:</strong> Have I quoted or referenced specific details from both Interpretation 1 and Interpretation 2?`])}

  ${u(`Question 3(c): Explaining Reasons for Difference`,`4 Marks`,`5-7 mins`,`AO4 (Analyse why interpretations differ)`,`The Source-Weighting Explanation`,`<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[State: Historians gave weight to different sources]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Link Int 1 to Source B details]</div><div style="color: #38bdf8;"><i class="fa-solid fa-and"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Link Int 2 to Source C details]</div></div>`,[`<strong>Speculating on Historian Backgrounds:</strong> Attributing the difference to the date, title, or the nationality/bias of the authors. This is a primary source skill and gets 0 marks here as secondary work provenance is not assessed.`,`<strong>Repeating the 3(b) Answer:</strong> Explaining what the difference is instead of explaining the process of how the historians arrived at different conclusions.`,`<strong>Vague Source Linking:</strong> Mentioning that they used different sources but failing to use explicit details from both the sources and the interpretations to substantiate the claim.`],[`<strong>Dual-Linking:</strong> Have I explicitly linked details from Interpretation 1 to Source B, and details from Interpretation 2 to Source C?`,`<strong>Clear Analytical Reason:</strong> Did I start by stating a valid reason, such as the use of different primary evidence or a different thematic focus?`])}

  ${u(`Question 3(d): Evaluating an Interpretation`,`16 Marks + 4 SPaG`,`30-35 mins`,`AO4 (Analyse and evaluate interpretations)`,`The Balanced Evaluation Scale`,`<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Analyse & Support Int 2 with Context]</div><div style="color: #38bdf8;"><i class="fa-solid fa-scale-balanced"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Challenge with Int 1 & Context]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Sustained, reasoned judgement]</div></div>`,[`<strong>The Straight Essay:</strong> Writing a general essay on the topic using only your own knowledge. You must evaluate the interpretations themselves; otherwise, you are capped at Level 2.`,`<strong>Single-Interpretation Bias:</strong> Only evaluating Interpretation 2 and ignoring Interpretation 1. Failing to mention the alternative view automatically restricts the analysis strand to Level 1, capping the total mark at 9-10/16.`,`<strong>The "Somewhat Agree" Fence-Sit:</strong> Simply listing pros and cons without a clear, reasoned criterion that leads to a robust, justified overall judgement.`],[`<strong>How the View is Conveyed:</strong> Have I indicated how the historians’ views are conveyed (e.g., through their choice of tone, loaded language, emphasis, or omission of details) to unlock high Level 4?`,`<strong>Specialist Terminology (SPaG):</strong> Have I used precise key terms (e.g., <em>Dolchstoss</em>, <em>Gleichschaltung</em>, <em>putsch</em>, <em>Diktat</em>, <em>Article 48</em>) to secure the 4 SPaG marks?`])}
</div>
`,h=`
<div class="exam-guide-section" style="margin-bottom: 60px;">
  ${l(`Paper 2: Early Elizabethan England, 1558-88`,`fa-chess-queen`,`#7c3aed`)}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section assesses your knowledge of Elizabeth's reign. You have <strong>55 minutes</strong> to complete this section, which is worth 20% of your total GCSE.</em></p>

  ${u(`Question 1(a) & 1(b): Describe One Feature...`,`4 Marks (2x2)`,`5 mins`,`AO1 (Demonstrate knowledge and understanding of key features)`,`The 2-Mark Triage Formula`,`<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap; margin-top: 10px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; font-weight: 500;">[Sentence 1: State feature clearly]</div><div style="color: #38bdf8; font-size: 1.2rem;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; font-weight: 500;">[Sentence 2: Add specific context]</div></div>`,[`<strong>The "Paragraph" Trap:</strong> Writing a massive paragraph. Examiners want this surgical: identify the feature, then add a further detail to provide context.`,`<strong>Double-Dipping:</strong> Giving two features for 1(a). The format has changed! You now only need <em>one</em> feature for 1(a), and a completely different <em>one</em> feature for 1(b).`,`<strong>Vague Statements:</strong> Listing a feature without any specific historical evidence (e.g., naming William Cecil or a specific year) to back it up.`],[`Did I state one clear, valid feature per question?`,`Did I immediately follow it up with a specific supporting fact or piece of contextual evidence?`,`Is my answer exactly two sentences long?`])}

  ${u(`Question 2: Explain Why...`,`12 Marks`,`20 mins`,`AO1 & AO2 (Knowledge and Analysis of Causation)`,`The Three-Causal-Pillars Layout`,`<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;"><div style="display: flex; justify-content: space-between; align-items: center; background: rgba(56, 189, 248, 0.1); padding: 10px 15px; border-radius: 8px; border-left: 4px solid #38bdf8;"><strong>Paragraph 1:</strong> Stimulus Point A</div><div style="display: flex; justify-content: space-between; align-items: center; background: rgba(56, 189, 248, 0.1); padding: 10px 15px; border-radius: 8px; border-left: 4px solid #38bdf8;"><strong>Paragraph 2:</strong> Stimulus Point B</div><div style="display: flex; justify-content: space-between; align-items: center; background: rgba(124, 58, 237, 0.1); padding: 10px 15px; border-radius: 8px; border-left: 4px solid #7c3aed;"><strong>Paragraph 3:</strong> <em>Your Own Knowledge</em></div></div>`,[`<strong>Storytelling Mode:</strong> Just describing what happened (the narrative) instead of explaining <em>why</em> the event happened. You must analyse causation.`,`<strong>Forgetting Own Knowledge:</strong> Only using the two stimulus points provided. If you don't add a third distinct factor of your own, your marks are heavily capped.`,`<strong>Missing the "So What?":</strong> Failing to link the end of your paragraph explicitly back to the question.`],[`Did I use a PEEL structure (Point, Evidence, Explanation, Link) for every paragraph?`,`Are there three distinct paragraphs covering three separate causes/factors?`,`Did I definitely include a third piece of "own knowledge" not given in the prompt?`,`Does every paragraph directly answer <em>why</em> this specific factor caused the outcome in the question?`])}

  ${u(`Question 3 (or 4): Evaluate the Statement...`,`16 Marks`,`30 mins`,`AO1 & AO2 (Evaluate significance/change)`,`The Grade 9 Judgment Arc`,`<div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;"><div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px;">⚖️ <strong>Intro:</strong> State your overall judgement</div><div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px;">👍 <strong>Para 1:</strong> Evidence supporting the statement</div><div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px;">👎 <strong>Para 2 & 3:</strong> Counter-arguments / Alternative factors</div><div style="background: rgba(245, 158, 11, 0.15); padding: 8px 12px; border-radius: 6px; border-left: 4px solid #f59e0b;">🏆 <strong>Conclusion:</strong> The "Killer" Judgement using criteria</div></div>`,[`<strong>Sitting on the Fence:</strong> You must make a clear judgement on how far you agree. Do not just say "I agree and disagree".`,`<strong>The Hollow Judgement:</strong> Giving an overall judgement but leaving your justification asserted or insecure, without applying valid criteria.`,`<strong>Ignoring the Alternatives:</strong> Failing to provide counter-arguments. You must think about both sides of the argument.`],[`Did I decide on the criteria for my judgement <em>before</em> I started writing?`,`Have I balanced the essay by looking at factors that support the statement and factors that challenge it?`,`Does my conclusion weigh the factors up using clear criteria (e.g., short-term trigger vs. long-term existential threat)?`,`Have I demonstrated wide-ranging knowledge with highly specific dates, names, and statistics?`])}
</div>
`;function g(e){return e.cover_sources?`
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; text-align: left;">
        ${e.cover_sources.map(e=>`
          <div style="display: flex; align-items: center; gap: 15px; background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="flex: 0 0 150px; height: 150px; border-radius: 8px; overflow: hidden; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <img src="${y(e.image)}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover; cursor: zoom-in;" onclick="window.openModal && window.openModal(this.src)">
            </div>
            <div style="flex: 1;">
              <h4 style="margin: 0 0 5px 0; color: #0f172a; font-size: 1rem;">${e.title}</h4>
              <p style="margin: 0; color: #475569; font-size: 0.85rem; line-height: 1.4;">${e.description}</p>
            </div>
          </div>
        `).join(``)}
      </div>
    `:Array.isArray(e.cover_image)?`
      <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 20px;">
        ${e.cover_image.map(e=>`
          <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; flex: 1; max-height: 400px; display: flex; align-items: center; justify-content: center; background: #0f172a;">
            <img src="${y(e)}" alt="Unit Cover" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;">
          </div>
        `).join(``)}
      </div>
    `:e.cover_image?`
      <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; display: block; margin: 0 auto 5px auto; max-width: 33%;">
        <img src="${y(e.cover_image)}" alt="Unit Cover" style="max-width: 100%; height: auto; display: block; max-height: 400px; margin: 0 auto;">
      </div>
    `:``}function _(e,t,n){let r=`
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
    `;if(t===`edexcel_medicine`||t===`cme_new`||t===`weimar_nazi_germany`||t===`eee`){let i=[];t===`edexcel_medicine`?i=[{id:`medieval`,title:`Medieval (c1250-c1500)`,prefix:`lesson_1_`,gradient:`linear-gradient(135deg, #7f1d1d, #dc2626)`,border:`#dc2626`,image:`/images/banner_medicine_medieval.jpg`,enquiry:`How much did medicine really change in Medieval England?`},{id:`renaissance`,title:`Renaissance (c1500-c1700)`,prefix:`lesson_2_`,gradient:`linear-gradient(135deg, #064e3b, #059669)`,border:`#059669`,image:`/images/banner_medicine_renaissance.jpg`,enquiry:`Why did the Medical Renaissance have so little impact on everyday treatments?`},{id:`18th_19th`,title:`18th & 19th C (c1700-c1900)`,prefix:`lesson_3_`,gradient:`linear-gradient(135deg, #475569, #d97706)`,border:`#d97706`,image:`/images/banner_medicine_18th_19th.jpg`,enquiry:`How did the Industrial Revolution transform the understanding and prevention of disease?`},{id:`modern`,title:`Modern (c1900-present)`,prefix:`lesson_4_`,gradient:`linear-gradient(135deg, #0c4a6e, #0284c7)`,border:`#0284c7`,image:`/images/banner_medicine_modern.png`,enquiry:`How did technology and government intervention revolutionize 20th-century medicine?`},{id:`western_front`,title:`Western Front`,prefix:`lesson_5_`,gradient:`linear-gradient(135deg, #422006, #65a30d)`,border:`#65a30d`,image:`/images/banner_medicine_western_front.jpg`,enquiry:`How did the horrific conditions of trench warfare drive rapid medical innovation?`}]:t===`cme_new`?i=[{id:`KT1`,title:`Key Topic 1: The Birth of Israel`,prefix:`KT1`,gradient:`linear-gradient(135deg, #1e3a8a, #3b82f6)`,border:`#3b82f6`,image:`assets/cme_new_kt1_cover.png`,enquiry:`How and why was the state of Israel established?`},{id:`KT2`,title:`Key Topic 2: Escalating Conflict`,prefix:`KT2`,gradient:`linear-gradient(135deg, #7f1d1d, #ef4444)`,border:`#ef4444`,image:`assets/cme_new_yom_kippur_crossing.png`,enquiry:`What drove the major conflicts in the Middle East from 1967-1973?`},{id:`KT3`,title:`Key Topic 3: Attempts at Peace`,prefix:`KT3`,gradient:`linear-gradient(135deg, #064e3b, #10b981)`,border:`#10b981`,image:`assets/cme_new_camp_david_accords.png`,enquiry:`Why has lasting peace in the Middle East been so difficult to achieve?`,bgPos:`center 20%`}]:t===`weimar_nazi_germany`||n&&n.title&&n.title.includes(`Weimar`)?i=[{id:`KT1`,title:`Key Topic 1: The Weimar Republic (1918-29)`,prefix:`lesson_1_`,gradient:`linear-gradient(135deg, #1e3a8a, #3b82f6)`,border:`#3b82f6`,image:`images/weimar_kt1_cover.jpg`,enquiry:`To what extent did the Weimar Republic recover from its early crises?`},{id:`KT2`,title:`Key Topic 2: Hitler's Rise to Power, 1919-33`,prefix:`lesson_2_`,gradient:`linear-gradient(135deg, #7f1d1d, #dc2626)`,border:`#dc2626`,image:`images/weimar_kt2_cover.jpg`,enquiry:`How did a tiny obscure political group transform?`},{id:`KT3`,title:`Key Topic 3: Nazi Control and Dictatorship`,prefix:`lesson_3_`,gradient:`linear-gradient(135deg, #4b5563, #1f2937)`,border:`#1f2937`,image:`images/weimar_kt3_cover.jpg`,enquiry:`From chains to absolute control`},{id:`KT4`,title:`Key Topic 4: Life in Nazi Germany, 1933-39`,prefix:`lesson_4_`,gradient:`linear-gradient(135deg, #4d7c0f, #65a30d)`,border:`#65a30d`,image:`images/weimar_kt4_cover.jpg`,enquiry:`Did life improve under the Nazis?`}]:(t===`eee`||n&&n.title&&n.title.includes(`Elizabeth`))&&(i=[{id:`KT1`,title:`Key Topic 1: Queen, government and religion, 1558-69`,prefix:`lesson_1_`,gradient:`linear-gradient(135deg, #1e3a8a, #3b82f6)`,border:`#3b82f6`,image:`assets/placeholder_cover.jpg`,enquiry:`From religious division to the Armada: How did Elizabeth secure her throne?`},{id:`KT2`,title:`Key Topic 2: Challenges to Elizabeth at home and abroad, 1569-88`,prefix:`lesson_2_`,gradient:`linear-gradient(135deg, #7f1d1d, #dc2626)`,border:`#dc2626`,image:`assets/placeholder_cover.jpg`,enquiry:`Why did plots and foreign threats push Elizabeth towards war?`},{id:`KT3`,title:`Key Topic 3: Elizabethan society in the Age of Exploration, 1558-88`,prefix:`lesson_3_`,gradient:`linear-gradient(135deg, #4b5563, #1f2937)`,border:`#1f2937`,image:`assets/placeholder_cover.jpg`,enquiry:`What was life like during the Elizabethan Golden Age?`}]),i.forEach(t=>{r+=`
        <div class="premium-banner">
          <div class="premium-banner-bg" style="background-image: url('${t.image}'); background-position: ${t.bgPos||`center`};"></div>
          <div class="premium-banner-overlay-1"></div>
          <div class="premium-banner-overlay-2" style="background: ${t.gradient};"></div>
          <div class="premium-banner-glow" style="background: radial-gradient(circle, ${t.border} 0%, transparent 70%);"></div>
          <div class="premium-banner-content" style="border-left: 6px solid ${t.border};">
            <h3 class="premium-banner-title">${t.title}</h3>
            <p class="premium-banner-enquiry">${t.enquiry}</p>
          </div>
        </div>
      `,r+=`<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; text-align: left;">`;let n=!1;e.lessons.forEach((i,a)=>{(i.id&&i.id.startsWith(t.prefix)||i.title&&i.title.startsWith(t.prefix))&&(n=!0,r+=`
            <div class="homepage-lesson-card" data-index="${a}" style="position: relative; background: white; border: 1px solid #e2e8f0; border-left: 5px solid ${t.border}; border-radius: 8px; padding: 12px 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s ease;" onclick="window.renderLessonByIndex(${a})" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)';">
              <h3 style="margin-top: 0; color: #1a237e; font-size: 1rem; margin-bottom: 5px; font-family: 'Outfit', sans-serif;">${e.type===`trip`?`Day`:`Lesson`} ${a+1}</h3>
              <p style="margin: 0; color: #475569; font-weight: 500; font-size: 0.9rem; line-height: 1.3;">${i.title.replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`)}</p>
            </div>
          `)}),n||(r+=`<p style="color: #64748b; font-style: italic; margin-left: 10px;">No lessons found for this period.</p>`),r+=`</div>`})}else if(e.type===`trip`){let t=[],n=[],i=[];e.lessons.forEach((e,r)=>{e.id&&e.id.startsWith(`hero_`)?i.push({lesson:e,index:r}):e.id===`day_0`?t.push({lesson:e,index:r}):e.id!==`final_challenge`&&n.push({lesson:e,index:r})}),t.length,r+=`<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">`,n.forEach((e,t)=>{r+=`
          <div class="homepage-lesson-card" data-index="${e.index}" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onclick="window.renderLessonByIndex(${e.index})">
            <h3 style="margin-top: 0; color: #1a237e; font-size: 1.1rem; margin-bottom: 10px;">Day ${t+1}</h3>
            <p style="margin: 0; color: #475569; font-weight: 500; font-size: 0.95rem;">${e.lesson.title.replace(/^Day \d+:\s*/,``)}</p>
          </div>
        `}),r+=`</div>`,i.length>0&&(r+=`<h2 style="margin-top: 40px; text-align: left; color: #991b1b; border-bottom: 2px solid #fecaca; padding-bottom: 10px;"><i class="fa-solid fa-ribbon"></i> The Fallen</h2>`,r+=`<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">`,i.forEach(e=>{r+=`
            <div class="homepage-lesson-card" data-index="${e.index}" style="background: #fff; border: 1px solid #fecaca; border-left: 5px solid #ef4444; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onclick="window.renderLessonByIndex(${e.index})">
              <h3 style="margin-top: 0; color: #7f1d1d; font-size: 1.1rem; margin-bottom: 10px; font-family: 'Playfair Display', serif;">${e.lesson.title}</h3>
            </div>
          `}),r+=`</div>`)}else r=`<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px; text-align: left;">`,e.lessons.forEach((t,n)=>{let i=`background: white; border: 1px solid #e2e8f0;`,a=`#1a237e`,o=`#475569`;(t.banner||t.cover_image)&&(i=`background: linear-gradient(to bottom, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.9) 100%), url('${typeof getAssetUrl==`function`?getAssetUrl(t.banner||t.cover_image):t.banner||t.cover_image}') center/cover; border: none; min-height: 150px; display: flex; flex-direction: column; justify-content: flex-end;`,a=`#f8fafc`,o=`#e2e8f0`);let s=`
            <h3 style="margin-top: 0; color: ${a}; font-size: 1.1rem; margin-bottom: 5px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${e.type===`trip`?`Day`:`Lesson`} ${n+1}</h3>
            <p style="margin: 0; color: ${o}; font-weight: 500; font-size: 0.95rem; text-shadow: 0 1px 3px rgba(0,0,0,0.5);">${t.title}</p>
        `;t.enquiry&&(s=`
                <h3 style="margin-top: 0; color: ${a}; font-size: 1.1rem; margin-bottom: 5px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${e.type===`trip`?`Day`:`Lesson`} ${n+1}: ${t.title}</h3>
                <p style="margin: 0; color: ${o}; font-weight: 500; font-size: 0.9rem; font-style: italic; text-shadow: 0 1px 3px rgba(0,0,0,0.5); line-height: 1.3;">${t.enquiry}</p>
            `),r+=`
          <div class="homepage-lesson-card" data-index="${n}" style="${i} border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onclick="window.renderLessonByIndex(${n})">
            ${s}
          </div>
        `}),r+=`</div>`,e.mock_exams&&Array.isArray(e.mock_exams)&&e.mock_exams.length>0&&(r+=`<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Mock Exams</h2>`,r+=`<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">`,e.mock_exams.forEach(e=>{let n=t?`/units/${t}/${e.url}`:e.url;r+=`
          <div class="homepage-lesson-card" style="background: #fdf2f8; border: 2px dashed #db2777; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('${n}', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#fdf2f8'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <i class="fa-solid fa-file-signature fa-2x" style="color: #db2777; margin-bottom: 10px;"></i>
            <h3 style="margin: 0; color: #334155; font-size: 0.9rem;">${e.title}</h3>
          </div>
        `}),r+=`</div>`),e.printable_workbooks&&e.printable_workbooks.length>0&&(!e.workbooks||e.workbooks.length===0)&&(r+=`<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">PDF Materials</h2>`,r+=`<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">`,e.printable_workbooks.forEach(e=>{let n=t?`/units/${t}/${e.url}`:e.url,i=e.icon||`fa-book-open`,a=e.title.includes(`Mastery`)||e.url.includes(`mastery_pack`),o=a?`#d32f2f`:`#3b82f6`,s=a?`#fff0f2`:`#f8fafc`;r+=`
          <div class="homepage-lesson-card" style="background: ${s}; border: 2px dashed ${o}; border-radius: 8px; padding: 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('${n}', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='${s}'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
             <i class="fa-solid ${i}" style="font-size: 1.5rem; color: ${o}; margin-bottom: 10px;"></i>
             <h3 style="margin: 0; color: ${o}; font-size: 1.1rem;">${e.title}</h3>
          </div>
        `}),r+=`</div>`);return r}window.examTimers={},window.toggleExamTimer=function(e,t){let n=document.getElementById(`timer-container-`+e);n.style.display===`none`?(n.style.display=`flex`,window.examTimers[e]||(window.examTimers[e]={totalSeconds:t*60,remainingSeconds:t*60,interval:null,isRunning:!1},v(e))):n.style.display=`none`},window.adjustExamTimer=function(e,t){let n=window.examTimers[e];if(!n||n.isRunning)return;let r=n.totalSeconds+t*60;r>=60&&(n.totalSeconds=r,n.remainingSeconds=r,v(e))},window.startExamTimer=function(e){let t=window.examTimers[e];if(!t)return;let n=document.getElementById(`timer-start-btn-`+e);t.isRunning?(clearInterval(t.interval),t.isRunning=!1,n.innerHTML=`<i class="fa-solid fa-play"></i> Resume`,n.style.background=`#f59e0b`,n.onmouseout=function(){this.style.background=`#f59e0b`},n.onmouseover=function(){this.style.background=`#d97706`}):(t.isRunning=!0,n.innerHTML=`<i class="fa-solid fa-pause"></i> Pause`,n.style.background=`#f59e0b`,n.onmouseout=function(){this.style.background=`#f59e0b`},n.onmouseover=function(){this.style.background=`#d97706`},t.interval=setInterval(()=>{t.remainingSeconds>0?(t.remainingSeconds--,v(e)):(clearInterval(t.interval),t.isRunning=!1,n.innerHTML=`<i class="fa-solid fa-check"></i> Time Up!`,n.style.background=`#ef4444`,n.onmouseout=function(){this.style.background=`#ef4444`},n.onmouseover=function(){this.style.background=`#dc2626`})},1e3))},window.resetExamTimer=function(e,t){let n=window.examTimers[e];if(!n)return;clearInterval(n.interval),n.remainingSeconds=n.totalSeconds,n.isRunning=!1;let r=document.getElementById(`timer-start-btn-`+e);r.innerHTML=`<i class="fa-solid fa-play"></i> Start`,r.style.background=`#10b981`,r.onmouseout=function(){this.style.background=`#10b981`},r.onmouseover=function(){this.style.background=`#059669`},v(e)};function v(e){let t=window.examTimers[e];if(!t)return;let n=Math.floor(t.remainingSeconds/60),r=t.remainingSeconds%60,i=document.getElementById(`timer-display-`+e);i&&(i.textContent=n+`:`+(r<10?`0`:``)+r,t.remainingSeconds<=60&&t.remainingSeconds>0?i.style.color=`#dc2626`:i.style.color=`#1e3a8a`);let a=document.getElementById(`timer-progress-`+e);if(a){let e=t.remainingSeconds/t.totalSeconds*100;a.style.width=e+`%`,e<20?a.style.background=`#ef4444`:e<50?a.style.background=`#f59e0b`:a.style.background=`#3b82f6`}}function y(e){return!e||e.startsWith(`http`)||e.startsWith(`/`)?e:window.currentUnitId?`/units/${window.currentUnitId}/${e}`:e}function b(e){window.currentUnitData=e;let t=()=>{window.addEventListener(`renderLessonEvent`,e=>{let t=e.detail;O(t),setTimeout(()=>{let e=document.getElementById(`content-area`);e?e.scrollTo({top:0,behavior:`smooth`}):window.scrollTo({top:0,behavior:`smooth`})},100),document.querySelectorAll(`.lesson-link`).forEach(e=>{e.classList.remove(`active`),e.textContent.includes(t.title)&&e.classList.add(`active`)})});let t=document.getElementById(`sidebar`),a=document.getElementById(`content-area`),o=document.getElementById(`btn-dyslexia`),l=document.createElement(`style`);l.textContent=`
    .phase-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    }
    .phase-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 2px solid rgba(0,0,0,0.05);
      padding-bottom: 10px;
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
      border-bottom: 2px dashed #3b82f6;
      cursor: pointer;
      color: #1e3a8a;
      font-weight: 700;
      background: rgba(59, 130, 246, 0.1);
      padding: 0 4px;
      border-radius: 3px;
      transition: all 0.2s ease;
    }
    .vocab-word:hover, .vocab-word.active {
      background: rgba(59, 130, 246, 0.25);
      border-bottom-color: #1e3a8a;
    }
    #global-glossary-popover {
      position: fixed;
      background: #1e293b;
      color: #ffffff;
      padding: 12px 16px;
      border-radius: 8px;
      width: max-content;
      max-width: 300px;
      font-size: 0.9rem;
      font-weight: 400;
      line-height: 1.5;
      z-index: 100000;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      pointer-events: none;
      opacity: 0;
      transform: translateY(10px) scale(0.95);
      transition: opacity 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #global-glossary-popover.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    #global-glossary-popover::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -6px;
      border-width: 6px;
      border-style: solid;
      border-color: #1e293b transparent transparent transparent;
      transition: left 0.2s ease;
    }
    #global-glossary-popover.arrow-top::after {
      top: auto;
      bottom: 100%;
      border-color: transparent transparent #1e293b transparent;
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
      height: 140px;
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
      background: rgba(248, 250, 252, 0.9);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
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
    }
    .flashcard-face {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
      -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
    }
    .flashcard-front {
      background-color: #f1f5f9;
      color: #333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px;
      border: 1px solid #cbd5e1;
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
    }
    .flashcard-front h4 {
      margin: 0 0 10px 0;
      color: #1e293b;
      font-size: 1.1rem;
    }
    .flashcard-front p {
      margin: 0;
      color: #64748b;
      font-size: 0.9rem;
    }
    .flashcard-back {
      background-color: #3b82f6;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px;
      transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg);
      font-size: 1.05rem;
      line-height: 1.5;
    }
    .flashcard-wrapper.flipped .flashcard-front {
      transform: rotateY(-180deg);
      -webkit-transform: rotateY(-180deg);
    }
    .flashcard-wrapper.flipped .flashcard-back {
      transform: rotateY(0deg);
      -webkit-transform: rotateY(0deg);
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
  `,document.head.appendChild(l),window.scrollToPara=function(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:`smooth`,block:`center`}),t.classList.remove(`highlight-flash`),t.offsetWidth,t.classList.add(`highlight-flash`),setTimeout(()=>t.classList.remove(`highlight-flash`),2600))},document.querySelectorAll(`.header-title-container div div`).forEach(e=>{e.textContent.includes(`Unit Enquiry:`)&&(e.textContent,e.style.display=`none`)});let u=window.speechSynthesis,v=null,b=document.createElement(`button`);b.className=`fab-copy`,b.innerHTML=`<i class="fa-solid fa-copy"></i>`,b.title=`Copy all answers to OneNote`,b.onclick=()=>{let e=`History Lesson Answers

`;document.querySelectorAll(`.do-now-card`).forEach(t=>{let n=t.querySelector(`div[style*="font-weight: 700"]`),r=t.querySelector(`.student-answer-input`);if(n&&r){let t=n.cloneNode(!0),i=t.querySelector(`span`);i&&i.remove(),e+=t.textContent.trim()+`
`,e+=`Answer: `+r.value+`

`}}),navigator.clipboard.writeText(e).then(()=>{alert(`All answers copied to clipboard! Ready to paste into OneNote.`)}).catch(e=>{alert(`Failed to copy to clipboard.`)})},document.body.appendChild(b),window.toggleSimplify=function(e){let t=e.closest(`.narrative-chunk`).querySelector(`.narrative-text`);t&&(e.classList.contains(`simplified-active`)?(t.innerHTML=decodeURIComponent(e.getAttribute(`data-original`)),e.classList.remove(`simplified-active`),e.style.background=``,e.style.color=`#047857`):(t.innerHTML=decodeURIComponent(e.getAttribute(`data-simplified`)),e.classList.add(`simplified-active`),e.style.background=`#d1fae5`,e.style.color=`#065f46`))},window.readAloudText=function(e){if(u.speaking&&e.classList.contains(`reading-active`)){u.cancel(),e.classList.remove(`reading-active`),e.innerHTML=`<i class="fa-solid fa-volume-high"></i>`;return}u.cancel(),document.querySelectorAll(`.narrative-chunk button`).forEach(e=>{e.classList.remove(`reading-active`),e.innerHTML=`<i class="fa-solid fa-volume-high"></i>`});let t=e.closest(`.narrative-chunk`).querySelector(`.narrative-text`).textContent;t.trim()!==``&&(e.classList.add(`reading-active`),e.innerHTML=`<i class="fa-solid fa-stop"></i>`,v=new SpeechSynthesisUtterance(t),v.onend=()=>{e.classList.remove(`reading-active`),e.innerHTML=`<i class="fa-solid fa-volume-high"></i>`},u.speak(v))},o.addEventListener(`click`,()=>{document.body.classList.toggle(`sen-mode`);let e=document.body.classList.contains(`sen-mode`);o.title===`SEN / Dyslexia Mode`||o.title===`Standard Mode`?(o.title=e?`Standard Mode`:`SEN / Dyslexia Mode`,o.style.background=e?`#1e293b`:``,o.style.color=e?`#ffffff`:``):o.textContent=e?`Standard Mode`:`SEN / Dyslexia Mode`});let C=document.querySelector(`.header-actions`);if(C){let e=document.createElement(`button`);e.className=`btn btn-secondary`,e.style.marginRight=`5px`,e.style.padding=`6px 12px`,e.title=`Laptop Mode`,e.innerHTML=`<i class="fa-solid fa-laptop"></i>`,localStorage.getItem(`laptopMode`)===`true`&&(document.body.classList.add(`laptop-mode-active`),e.style.background=`#1e293b`,e.style.color=`#ffffff`),e.addEventListener(`click`,()=>{document.body.classList.toggle(`laptop-mode-active`);let t=document.body.classList.contains(`laptop-mode-active`);localStorage.setItem(`laptopMode`,t),e.style.background=t?`#1e293b`:``,e.style.color=t?`#ffffff`:``}),C.appendChild(e);let t=document.createElement(`button`);t.className=`btn btn-secondary`,t.innerHTML=`<i class="fa-solid fa-user-tie"></i> Teacher Mode`,t.addEventListener(`click`,()=>{document.body.classList.toggle(`teacher-mode-active`);let e=document.body.classList.contains(`teacher-mode-active`);t.innerHTML=e?`<i class="fa-solid fa-user-tie"></i> Teacher Mode: ON`:`<i class="fa-solid fa-user-tie"></i> Teacher Mode`,t.style.background=e?`#1e293b`:``,t.style.color=e?`#ffffff`:``}),C.appendChild(t);let n=document.createElement(`button`);n.className=`btn btn-secondary`,n.innerHTML=`<i class="fa-solid fa-clock-rotate-left"></i> Prior Knowledge (Teachers)`,n.addEventListener(`click`,()=>{w()}),C.appendChild(n);let r=document.createElement(`button`);r.className=`btn btn-secondary`,r.innerHTML=`<i class="fa-solid fa-person-chalkboard"></i> Task Whiteboard`,r.addEventListener(`click`,()=>{S()}),C.appendChild(r)}function w(){let e=document.getElementById(`curriculum-modal`);if(!e){e=document.createElement(`div`),e.id=`curriculum-modal`,e.style.cssText=`position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;`;let t=document.createElement(`div`);t.style.cssText=`background:#ffffff;padding:30px;border-radius:12px;width:90%;max-width:500px;color:#333333;box-shadow:0 10px 25px rgba(0,0,0,0.2);`,t.innerHTML=`
        <h2 style="margin-top:0"><i class="fa-solid fa-clock-rotate-left"></i> Prior Knowledge Setup</h2>
        <p style="opacity:0.8;font-size:0.95rem;">Select the units your class has already been taught. The app will dynamically generate "PAST TOPIC" Do Now retrieval questions from these units.</p>
        <div id="unit-checkboxes" style="display:flex;flex-direction:column;gap:12px;margin:25px 0;">
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;">
          <button id="close-curriculum" class="btn btn-primary">Save & Close</button>
        </div>
      `,e.appendChild(t),document.body.appendChild(e);let n=[{id:`norman_conquest`,title:`The Norman Conquest`},{id:`water_and_sanitation`,title:`Water & Health Through Time`},{id:`change_1450_1750`,title:`Change 1450-1750 (Tudors)`}],r=t.querySelector(`#unit-checkboxes`),i=JSON.parse(localStorage.getItem(`taughtUnits`)||`[]`);n.forEach(e=>{let t=document.createElement(`label`);t.style.display=`flex`,t.style.alignItems=`center`,t.style.gap=`10px`,t.style.cursor=`pointer`,t.style.fontSize=`1.1rem`;let n=document.createElement(`input`);n.type=`checkbox`,n.value=e.id,n.style.width=`20px`,n.style.height=`20px`,n.checked=i.includes(e.id),n.addEventListener(`change`,()=>{let t=JSON.parse(localStorage.getItem(`taughtUnits`)||`[]`);n.checked?t.push(e.id):t=t.filter(t=>t!==e.id),localStorage.setItem(`taughtUnits`,JSON.stringify([...new Set(t)]))}),t.appendChild(n),t.appendChild(document.createTextNode(e.title)),r.appendChild(t)}),t.querySelector(`#close-curriculum`).addEventListener(`click`,()=>{document.body.removeChild(e),location.reload()})}}window.renderDashboard=function(e=!1){if(!e)try{let e=new URL(window.location);e.searchParams.delete(`lesson`),history.pushState({dashboard:!0},``,e)}catch(e){console.warn(`History routing disabled (e.g. file:// protocol):`,e)}document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`));let t=document.querySelector(`.lesson-link`);t&&t.classList.add(`active`),T(),window.scrollTo({top:0,behavior:`smooth`})};function T(){let t=_(e,window.currentUnitId,window.currentUnitData),n=``;if(e.type===`trip`){let t=e.cover_image?y(e.cover_image):``,r=-1,i=null;e.lessons&&e.lessons.forEach((e,t)=>{e.id===`day_0`&&(r=t,i=e)}),n=`
        <div style="display: flex; flex-wrap: wrap; text-align: left; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; margin-bottom: 40px;">
          <!-- Left Column -->
          <div style="flex: 1.2; min-width: 300px; padding: 40px;">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; color: #1a237e; margin: 0 0 10px 0; line-height: 1.1;">
              ${e.title||`Featured Battlefield Tour`}
            </h1>
            <h2 style="font-size: 1.3rem; color: #64748b; font-weight: 400; margin: 0 0 30px 0;">
              ${e.enquiry_question||e.enquiry||`Join the expedition`}
            </h2>
            
            ${i?`
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 25px; margin-top: 20px;">
              <h3 style="margin: 0 0 10px 0; color: #334155; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-suitcase-rolling" style="color: #f59e0b;"></i> Final Preparations
              </h3>
              <p style="margin: 0 0 15px 0; color: #475569; font-size: 0.95rem;">
                ${i.enquiry||`What to Pack & Logistics`}
              </p>
              <button class="btn btn-primary" onclick="window.renderLessonByIndex(${r})" style="background: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s; box-shadow: 0 4px 6px rgba(37,99,235,0.2);" onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
                View Prep Pack
              </button>
            </div>
            `:``}

            <button onclick="window.openTeacherGuideModal()" style="margin-top: 20px; background: #4f46e5; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; font-size: 1.05rem; border: none; cursor: pointer; transition: background 0.2s; box-shadow: 0 4px 15px rgba(79,70,229,0.3); display: flex; align-items: center; gap: 10px;" onmouseover="this.style.background='#4338ca'" onmouseout="this.style.background='#4f46e5'">
               <i class="fa-solid fa-chalkboard-user"></i> How to Use This App (Teacher Guide)
            </button>
          </div>
          
          <!-- Right Column -->
          <div style="flex: 1; min-width: 300px; padding: 20px;">
             <div style="width: 100%; height: 100%; min-height: 300px; background-image: url('${t}'); background-size: cover; background-position: center; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);"></div>
          </div>
        </div>
      `}else{let t=e.homepage_background||(typeof e.cover_image==`string`?e.cover_image:null);n=t&&!e.cover_sources&&!Array.isArray(e.cover_image)?`
          <div class="hero-container" style="background: linear-gradient(to bottom, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.1) 100%), url('${y(t)}') center/cover no-repeat;">
            <h1 class="hero-title">${e.enquiry_question||e.enquiry||`Unit Enquiry`}</h1>
            <h2 class="hero-subtitle">
              ${e.title}
            </h2>
            ${e.cover_caption?`<p class="hero-caption">${e.cover_caption}</p>`:``}
          </div>
        `:`
          <div style="text-align: center; padding-bottom: 50px;">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; color: #1a237e; margin-bottom: 10px; line-height: 1.2;">${e.enquiry_question||e.enquiry||`Unit Enquiry`}</h1>
            <h2 style="font-size: 1.4rem; color: #475569; font-weight: 500; margin-top: 0; margin-bottom: 30px;">
              ${e.title}
            </h2>
            
            ${g(e,y)}
            
            ${e.cover_caption?`<p style="margin-top: 5px; margin-bottom: 20px; font-style: italic; color: #64748b; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">${e.cover_caption}</p>`:``}
          </div>
        `}a.innerHTML=`
      <div>
        ${n}
        
        <h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${e.type===`trip`?`Tour Itinerary`:`Key Topic Lessons`}</h2>
        ${t}
      </div>
    `,a.querySelectorAll(`.homepage-lesson-card`).forEach(t=>{t.addEventListener(`mouseover`,()=>{t.style.transform=`translateY(-3px)`,t.style.boxShadow=`0 8px 15px rgba(0,0,0,0.1)`}),t.addEventListener(`mouseout`,()=>{t.style.transform=`none`,t.style.boxShadow=`0 4px 6px rgba(0,0,0,0.05)`}),t.addEventListener(`click`,()=>{if(!t.hasAttribute(`data-index`))return;let n=parseInt(t.dataset.index);document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),O(e.lessons[n]),window.scrollTo({top:0,behavior:`smooth`})})})}function E(){a.innerHTML=``;let t=document.createElement(`div`);t.className=`dashboard-container`;let n=``;n=e.title&&e.title.toLowerCase().includes(`medicine`)?`
        <div class="welcome-banner" style="background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #e2e8f0; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 1</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${d}
          ${f}
        </div>
      `:e.title&&e.title.toLowerCase().includes(`middle east`)?`
        <div class="welcome-banner" style="background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #fecaca; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 2</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${p}
        </div>
      `:e.title&&(e.title.toLowerCase().includes(`weimar`)||e.title.toLowerCase().includes(`germany`))?`
        <div class="welcome-banner" style="background: linear-gradient(135deg, #334155 0%, #0f172a 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #cbd5e1; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 3</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${m}
        </div>
      `:e.title&&(e.title.toLowerCase().includes(`elizabeth`)||e.title.toLowerCase().includes(`armada`))?`
        <div class="welcome-banner" style="background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #ddd6fe; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 2</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${h}
        </div>
      `:`
        <div class="welcome-banner" style="background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #e2e8f0; font-size: 1.15rem; margin: 0;">Revision strategies for this unit</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          <p>No specific exam guidance is available for this unit yet.</p>
        </div>
      `,t.innerHTML=n,a.appendChild(t)}function D(){let i=document.getElementById(`sidebar-nav-container`)||t;i.innerHTML=``;let a=document.createElement(`a`);if(a.className=`lesson-link active`,a.innerHTML=`<i class="fa-solid fa-home" style="margin-right: 8px;"></i> Unit Homepage`,a.addEventListener(`click`,e=>{e.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),a.classList.add(`active`),T(),window.scrollTo({top:0,behavior:`smooth`})}),i.appendChild(a),e.key_info&&e.key_info.live_album_url){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-camera-retro" style="margin-right: 8px;"></i> Live Photo Feed`,t.style.background=`rgba(239, 68, 68, 0.1)`,t.style.borderLeft=`3px solid #ef4444`,t.addEventListener(`click`,n=>{n.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let r=document.getElementById(`content-area`);r.innerHTML=`
          <style>
            @keyframes floatUp {
              0% { transform: translateY(20px) rotate(-8deg); opacity: 0; }
              100% { transform: translateY(0) rotate(-8deg); opacity: 1; }
            }
            @keyframes floatUpRight {
              0% { transform: translateY(30px) rotate(4deg); opacity: 0; }
              100% { transform: translateY(0) rotate(4deg); opacity: 1; }
            }
            .photo-stack {
              position: relative;
              width: 250px;
              height: 250px;
              margin: 0 auto 40px auto;
            }
            .polaroid {
              position: absolute;
              background: white;
              padding: 10px 10px 35px 10px;
              box-shadow: 0 15px 35px -5px rgba(0,0,0,0.4);
              border-radius: 6px;
              width: 200px;
              height: 220px;
              top: 10px;
              left: 25px;
              border: 1px solid #e2e8f0;
            }
            .polaroid-1 {
              transform: rotate(-8deg);
              z-index: 1;
              background-color: #f8fafc;
              animation: floatUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .polaroid-2 {
              transform: rotate(4deg);
              z-index: 2;
              left: 45px;
              top: 20px;
              animation: floatUpRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
              opacity: 0;
            }
            .polaroid-img {
              width: 100%;
              height: 100%;
              background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #94a3b8;
              font-size: 3.5rem;
              border-radius: 4px;
            }
            @keyframes photoPulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.5); opacity: 0; }
            }
          </style>
          
          <div class="welcome-banner" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 60px 40px; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 10px 15px -3px rgba(0, 0, 0, 0.2); position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
            <!-- Decorative background elements -->
            <div style="position: absolute; top: -100px; right: -50px; width: 300px; height: 300px; background: rgba(59, 130, 246, 0.15); border-radius: 50%; filter: blur(50px);"></div>
            <div style="position: absolute; bottom: -100px; left: -50px; width: 350px; height: 350px; background: rgba(239, 68, 68, 0.15); border-radius: 50%; filter: blur(60px);"></div>
            
            <div style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; z-index: 10;">
              
              <div class="photo-stack">
                <div class="polaroid polaroid-1">
                  <div class="polaroid-img"><i class="fa-solid fa-image"></i></div>
                </div>
                <div class="polaroid polaroid-2">
                  <div class="polaroid-img"><i class="fa-solid fa-camera"></i></div>
                </div>
              </div>

              <div style="display: inline-flex; align-items: center; background: rgba(255,255,255,0.1); padding: 8px 20px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.15); margin-bottom: 24px; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
                <div style="position: relative; width: 10px; height: 10px; margin-right: 12px;">
                  <div style="position: absolute; inset: 0; background-color: #ef4444; border-radius: 50%;"></div>
                  <div style="position: absolute; inset: 0; background-color: #ef4444; border-radius: 50%; animation: photoPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
                </div>
                <span style="color: #f8fafc; font-weight: 700; font-size: 0.95rem; letter-spacing: 1.5px; text-transform: uppercase;">Live Updates Active</span>
              </div>
              
              <h1 style="color: #ffffff; margin-top: 0; margin-bottom: 15px; font-size: clamp(2.5rem, 5vw, 4rem); font-family: 'Playfair Display', serif; text-shadow: 0 4px 15px rgba(0,0,0,0.5); line-height: 1.1;">Live Photo Feed</h1>
              
              <p style="color: #94a3b8; font-size: 1.25rem; margin: 0 auto 40px auto; max-width: 700px; line-height: 1.7;">
                We are using a shared Google Photos album to securely share photos with parents back home. Whenever our staff find a 4G signal, new photos of the pupils will automatically appear in the album!
              </p>

              <div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; align-items: center;">
                <a href="${e.key_info.live_album_url}" target="_blank" class="main-btn" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 18px 40px; font-size: 1.3rem; border: none; border-radius: 12px; font-weight: 700; box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.5); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none; display: inline-flex; align-items: center; gap: 12px;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 25px -5px rgba(37, 99, 235, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 25px -5px rgba(37, 99, 235, 0.5)'">
                  <i class="fa-brands fa-google" style="font-size: 1.5rem;"></i> Open Google Photos
                </a>
                
                <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 15px 20px; display: flex; align-items: center; gap: 15px; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);">
                  <div style="background: white; padding: 6px; border-radius: 8px;">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(e.key_info.live_album_url)}&bgcolor=ffffff&color=1e293b&margin=0" alt="QR Code" style="width: 70px; height: 70px; display: block;">
                  </div>
                  <div style="text-align: left;">
                    <div style="color: #ffffff; font-weight: 700; font-size: 1.15rem; margin-bottom: 4px;">Scan with phone</div>
                    <div style="color: #cbd5e1; font-size: 0.95rem;">To view on the go</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,window.scrollTo({top:0,behavior:`smooth`})}),i.appendChild(t)}if(e.type===`trip`){let t=[];if(e.lessons.forEach((e,n)=>{e.id&&e.id.startsWith(`hero_`)&&t.push({lesson:e,index:n})}),t.length>0){let e=document.createElement(`a`);e.className=`lesson-link`,e.innerHTML=`<div style="display:flex; justify-content:space-between; align-items:center; width:100%;"><div style="color:#991b1b;"><i class="fa-solid fa-ribbon" style="margin-right: 8px;"></i> The Fallen</div><i class="fa-solid fa-chevron-down" style="font-size:0.8em; opacity:0.6;"></i></div>`,e.href=`#`,e.style.background=`rgba(153, 27, 27, 0.05)`,e.style.borderLeft=`3px solid #991b1b`;let n=document.createElement(`div`);n.style.display=`none`,n.style.flexDirection=`column`,e.onclick=t=>{t.preventDefault(),n.style.display=n.style.display===`none`?`flex`:`none`;let r=e.querySelector(`.fa-chevron-down, .fa-chevron-up`);r&&(r.className=n.style.display===`none`?`fa-solid fa-chevron-down`:`fa-solid fa-chevron-up`)},t.forEach(e=>{let t=document.createElement(`a`);t.className=`lesson-link sub-link`,t.innerHTML=`<i class="fa-solid fa-user" style="margin-right: 8px; opacity:0.7;"></i>`+e.lesson.title,t.style.paddingLeft=`2.5rem`,t.style.fontSize=`0.9em`,t.style.borderLeft=`2px solid #ef4444`,t.style.background=`rgba(0,0,0,0.02)`,t.style.marginBottom=`2px`,t.onclick=n=>{n.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),window.renderLessonByIndex(e.index)},n.appendChild(t)}),i.appendChild(e),i.appendChild(n)}}if(e.specification_file){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-list-check" style="margin-right: 8px;"></i> ${e.title&&e.title.includes(`KS3`)?`Curriculum Overview`:`Exam Specification`}`,t.href=e.specification_file,t.onclick=r=>{r.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let i=document.getElementById(`content-area`);i.innerHTML=``,n(()=>import(`./spec_viewer-mecV4S7U.js`).then(t=>{t.initSpecViewer(i,e.specification_file)}),[])},i.appendChild(t)}if(e.type!==`trip`&&(!e.title||!e.title.includes(`KS3`))){let e=document.createElement(`a`);e.className=`lesson-link`,e.innerHTML=`<i class="fa-solid fa-graduation-cap" style="margin-right: 8px;"></i> Exam Masterclass Guide`,e.addEventListener(`click`,t=>{t.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),E(),window.scrollTo({top:0,behavior:`smooth`})}),i.appendChild(e)}if(window.currentUnitId===`edexcel_medicine`){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-timeline" style="margin-right: 8px;"></i> Thematic Matrix (Change & Continuity)`,t.style.background=`rgba(56, 189, 248, 0.1)`,t.style.borderLeft=`3px solid #38bdf8`,t.addEventListener(`click`,async r=>{r.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let{renderThematicMatrix:i}=await n(async()=>{let{renderThematicMatrix:e}=await import(`./thematic_matrix-D8S9-XHi.js`);return{renderThematicMatrix:e}},[]);i(document.getElementById(`content-area`),e),window.scrollTo({top:0,behavior:`smooth`})}),i.appendChild(t)}if(e.guided_reading&&e.guided_reading.length>0){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-book-open" style="margin-right: 8px;"></i> Guided Reading`,t.href=`#`,t.style.marginTop=`15px`,t.style.borderTop=`1px solid #e2e8f0`,t.style.paddingTop=`15px`,t.onclick=async r=>{r.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let{initGuidedReadingTask:i}=await n(async()=>{let{initGuidedReadingTask:e}=await import(`./guided_reading-BvekUPAz.js`);return{initGuidedReadingTask:e}},[]),a=document.getElementById(`content-area`);a.innerHTML=``;let o=0;window.currentActiveLesson&&e.lessons&&(o=e.lessons.findIndex(e=>e.title===window.currentActiveLesson.title)),i(a,e.guided_reading,{currentLessonIndex:o}),window.scrollTo({top:0,behavior:`smooth`})},i.appendChild(t)}if(e.type!==`trip`&&window.currentUnitId!==`medieval_england`&&window.currentUnitId!==`early_modern_world`&&window.currentUnitId!==`industrialisation_and_empire`&&window.currentUnitId!==`australia`){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=e.title&&e.title.includes(`KS3`)?`✍️ Assessments`:`✍️ Assessments & Exam Practice`,t.style.marginTop=`15px`,t.style.color=`#60a5fa`,t.addEventListener(`click`,n=>{n.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let i=document.getElementById(`content-area`);i.innerHTML=``,r(i,e),window.scrollTo({top:0,behavior:`smooth`})}),i.appendChild(t)}if(e.type!==`trip`){let t=document.createElement(`a`);t.id=`quiz-zone-link`,t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-layer-group"></i> Interactive Revision Hub`,t.style.marginTop=`15px`,t.style.color=`#34d399`,t.style.cursor=`pointer`,t.addEventListener(`click`,n=>{n.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let r=document.getElementById(`content-area`);r.innerHTML=``,s(r,e),window.scrollTo({top:0,behavior:`smooth`})}),i.appendChild(t)}if(e.type!==`trip`&&window.currentUnitId!==`medieval_england`&&window.currentUnitId!==`water_and_sanitation`&&window.currentUnitId!==`early_modern_world`&&window.currentUnitId!==`edexcel_medicine`&&window.currentUnitId!==`great_war`&&window.currentUnitId!==`great_war_part2`&&window.currentUnitId!==`industrialisation_and_empire`&&window.currentUnitId!==`australia`){let e=document.createElement(`a`);e.className=`lesson-link`,e.innerHTML=`<i class="fa-solid fa-file-invoice"></i> Revision Cheat Sheet`,e.href=window.currentUnitId?`/units/${window.currentUnitId}/cheat_sheet.html`:`cheat_sheet.html`,e.target=`_blank`,e.style.marginTop=`15px`,i.appendChild(e)}if(e.type!==`trip`&&e.workbooks&&e.workbooks.length>0){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-print"></i> Print & PDF Hub`,t.style.marginTop=`15px`,t.style.color=`#8b5cf6`,t.addEventListener(`click`,async r=>{r.preventDefault(),document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let i=document.getElementById(`content-area`);i.innerHTML=``;let{renderWorkbooksZone:a}=await n(async()=>{let{renderWorkbooksZone:e}=await import(`./workbooks_zone-B3EikzcU.js`);return{renderWorkbooksZone:e}},[]);a(i,e),window.scrollTo({top:0,behavior:`smooth`})}),i.appendChild(t)}}window.formatBold=function(e){if(!e)return``;let t=e.replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`);return t=t.replace(/(^|\n)> (.*?)(?=\n|$)/g,`$1<blockquote style="border-left: 4px solid #cbd5e1; padding-left: 15px; margin-left: 0; color: #475569; font-style: italic; background: rgba(248, 250, 252, 0.5); padding-top: 5px; padding-bottom: 5px; border-radius: 0 4px 4px 0;">$2</blockquote>`),t=t.replace(/(^|\n)### (.*?)(?=\n|$)/g,`$1<h4 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h4>`),t=t.replace(/(^|\n)## (.*?)(?=\n|$)/g,`$1<h3 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h3>`),t=t.replace(/\\n/g,`
`),t.match(/(^|\n)[\*\-]\s/)&&(t=t.replace(/(^|\n)[\*\-]\s+(.*)/g,`$1<li>$2</li>`),t=t.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g,`<ul style="margin-top: 5px; margin-bottom: 5px; padding-left: 20px;">
$1
</ul>`)),t=t.replace(/\*([^\*]+)\*/g,`<i>$1</i>`),t=t.replace(/\n/g,`<br>`),t=t.replace(/<br><ul/g,`<ul`).replace(/<\/ul><br>/g,`</ul>`).replace(/<br><li>/g,`<li>`).replace(/<\/li><br>/g,`</li>`),t=t.replace(/<br><blockquote/g,`<blockquote`).replace(/<\/blockquote><br>/g,`</blockquote>`),t=t.replace(/<br><h/g,`<h`).replace(/<\/h4><br>/g,`</h4>`).replace(/<\/h3><br>/g,`</h3>`),t},window.renderLessonByIndex=function(t,n=!1){if(e&&e.lessons&&e.lessons[t]){if(!n)try{let e=new URL(window.location);e.searchParams.set(`lesson`,t),history.pushState({lessonIndex:t},``,e)}catch(e){console.warn(`History routing disabled (e.g. file:// protocol):`,e)}document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`));let r=document.querySelectorAll(`.lesson-link`);!(e.title&&e.title.includes(`KS3`))&&r.length>t+1&&r[t+1].classList.add(`active`),O(e.lessons[t]),window.scrollTo({top:0,behavior:`smooth`})}};function O(t){window.postRenderHooks=[];let r=``,a=``,o=``,s=``,l=``,u=``,d=``,f=window.formatBold,p=1,m=(e,t=!0)=>{if(!e)return``;let n=c(e);return t?`Question ${p++}: ${f(n)}`:f(n)};t=JSON.parse(JSON.stringify(t)),x(t),Array.isArray(t.do_now)?t.do_now={type:`questions`,items:t.do_now.map(e=>({question:e.q||e.question,answer:e.a||e.answer}))}:t.do_now&&t.do_now.type===`questions`&&t.do_now.tasks&&(t.do_now.items=t.do_now.tasks.map(e=>({question:e.q||e.question,answer:e.a||e.answer})));let h=[];if(t.narrative_blocks&&t.narrative_blocks.forEach(e=>{if(e.tasks){let t=e.tasks.filter(e=>(e.text||e.question||``).includes(`marks)`));h.push(...t),e.tasks=e.tasks.filter(e=>!(e.text||e.question||``).includes(`marks)`))}}),t.tasks){let e=t.tasks.filter(e=>(e.text||e.question||``).includes(`marks)`));h.push(...e),t.tasks=t.tasks.filter(e=>!(e.text||e.question||``).includes(`marks)`))}t.exam_practice&&Array.isArray(t.exam_practice),x(t),window.currentActiveLesson=t;let g=t.banner||window.currentUnitData?.homepage_background||`/images/default_hero.jpg`,_=window.currentUnitData&&window.currentUnitData.type===`trip`,v=`Lesson`,b=t.title?t.title.match(/^(?:KT|Key Topic)\s*([\d\.]+)/i):null;if(window.currentUnitId===`cme_new`&&b?b[1].startsWith(`1`)?g=`/assets/cme_new_kt1_cover.png`:b[1].startsWith(`2`)?g=`/assets/cme_new_kt2_cover.png`:b[1].startsWith(`3`)&&(g=`/assets/cme_new_kt3_cover.png`):window.currentUnitId===`edexcel_medicine`&&b&&(b[1].startsWith(`1`)?g=`/images/banner_medicine_medieval.jpg`:b[1].startsWith(`2`)?g=`/images/banner_medicine_renaissance.jpg`:b[1].startsWith(`3`)?g=`/images/banner_medicine_18th_19th.jpg`:b[1].startsWith(`4`)?g=`/images/banner_medicine_modern.png`:b[1].startsWith(`5`)&&(g=`/images/banner_medicine_western_front.jpg`)),_&&t.id&&t.id.startsWith(`day_`))v=`Day ${t.id.split(`_`)[1]}`;else if(b)v=`KT ${b[1]}`;else if(t.id&&t.id.startsWith(`lesson_`)){let e=t.id.split(`_`);v=e.length>2?`Lesson ${parseInt(e[1])}.${e.slice(2).join(`.`)}`:`Lesson ${parseInt(e[1])}`}let S=document.getElementById(`content-area`);S&&(S.style.paddingTop=`0`);let C=`<div class="lesson-content">`,w=t.enquiry||t.enquiry_question||t.inquiry_question||t.title||``,T=``;T=/^(?:KT|Key Topic|Lesson)\s*[\d\.]+/i.test(w)?w:`${v}: ${w}`;let E=e.lessons.findIndex(e=>e.title===t.title);C+=`
      <div class="sticky-lesson-header">
          <h4 class="sticky-lesson-title">
            ${T}
          </h4>
          <div class="sticky-lesson-actions">
          ${_?``:`<button class="btn" style="padding: 6px 12px; font-size: 0.9rem; background: white; color: #0f172a; border: 1px solid rgba(0,0,0,0.1); font-weight: 600; box-shadow: 0 2px 5px rgba(0,0,0,0.05);" onclick="openDebateModal()"><i class="fa-solid fa-comments" style="color: #3b82f6;"></i> Class Debate</button>`}
          ${_&&t.tour_guide_script?`<button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.9rem; background: #6366f1; border-color: #6366f1; box-shadow: 0 2px 5px rgba(99,102,241,0.3);" onclick="window.openTourGuideModal(${E})"><i class="fa-solid fa-bullhorn"></i> Tour Guide Script</button>`:``}
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem; background: white; border: 1px solid rgba(0,0,0,0.1);" onclick="window.renderDashboard()"><i class="fa-solid fa-arrow-left"></i> ${_?`Trip Menu`:`Unit Menu`}</button>
        </div>
      </div>
    `;let D=t.banner_position||`center`;C+=`
      <div class="lesson-hero" style="position: relative; width: calc(100% + 8rem); margin-left: -4rem; margin-top: -1rem; height: 300px; background: url('${g}') ${D}/cover no-repeat; margin-bottom: 2rem; border-bottom: 1px solid var(--border-glass); box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(15,23,42,0.9));"></div>
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 2rem 4rem;">
          <span style="color: #cbd5e1; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">${v}</span>
          <h2 style="font-family: 'Playfair Display', serif; color: white; font-size: 2.5rem; margin: 0.5rem 0 0 0; line-height: 1.2; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${t.title}</h2>
        </div>
      </div>
    `,C+=`
      <div id="progress-container" style="background: rgba(226,232,240,0.5); height: 6px; width: 100%; margin-bottom: 20px; border-radius: 3px; overflow: hidden; backdrop-filter: blur(5px);">
        <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
      </div>
    `,C+=`
      
    `;let O={};t.vocab&&t.vocab.forEach(e=>{let t=e.definition||e.def||e.desc||``;t&&(O[e.term.toLowerCase()]=t)});let k=new Set,A=e=>{if(!e||typeof e!=`string`)return e||``;if(Object.keys(O).length===0)return e;let t=e,n=Object.keys(O).sort((e,t)=>t.length-e.length);for(let e of n){let n=O[e];if(!(!n||typeof n!=`string`)&&!k.has(e)){let r=RegExp(`(<[^>]+>)|\\b(${e})\\b`,`gi`),i=!1;t=t.replace(r,(e,t,r)=>t||(r?(i=!0,`<span class="vocab-word" data-definition="${n.replace(/"/g,`&quot;`)}">${r}</span>`):e)),i&&k.add(e)}}return t};if(t.teacher_notes){let e=``;if(t.teacher_notes&&!Array.isArray(t.teacher_notes)&&typeof t.teacher_notes==`object`){let n=t.teacher_notes.primer?`<div style="font-size: 1.05rem; margin-bottom: 20px;">${t.teacher_notes.primer}</div>`:``,r=t.teacher_notes.source_context?`<div style="font-size: 0.95rem; margin-bottom: 20px; background: rgba(2, 132, 199, 0.2); padding: 15px; border-left: 4px solid #38bdf8; border-radius: 4px;"><strong><i class="fa-solid fa-image"></i> Source Context:</strong><br/>${t.teacher_notes.source_context}</div>`:``,i=(t.teacher_notes.objectives||[]).map(e=>`
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${e.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">${e.primer}</div>
            ${e.question?`<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); color: #38bdf8; font-weight: 600;"><i class="fa-solid fa-circle-question" style="margin-right: 4px;"></i> Hinge Question: ${e.question}</div>`:``}
          </div>
        `).join(``);e=n+r+i}else e=Array.isArray(t.teacher_notes)?t.teacher_notes.map(e=>`
          <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid #64748b;">
            <div style="font-weight: bold; color: #facc15; margin-bottom: 6px; font-size: 0.95rem;"><i class="fa-solid fa-bullseye" style="font-size: 0.8rem; margin-right: 4px;"></i> ${e.objective}</div>
            <div style="font-size: 0.95rem; margin-bottom: 0;">${e.primer}</div>
            ${e.question?`<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); color: #38bdf8; font-weight: 600;"><i class="fa-solid fa-circle-question" style="margin-right: 4px;"></i> Hinge Question: ${e.question}</div>`:``}
          </div>
        `).join(``):`<div style="font-size: 1.05rem;">${t.teacher_notes}</div>`;_||(C+=`
          <div class="teacher-note">
            <h4><i class="fa-solid fa-chalkboard-user"></i> Pedagogical Primer</h4>
            ${e}
          </div>
        `)}if(t.sources&&t.sources.length>0&&(o+=`<div class="sources-grid" style="margin-top: 20px;">`,t.sources.forEach(e=>{o+=`
            <div class="source-card" style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
              ${e.title?`<h4 style="color: var(--primary); margin-top: 0; text-align: left;">${e.title}</h4>`:``}
              
              ${e.src?`
                <div style="display: inline-flex; flex-direction: column; position: relative; max-width: 100%; text-align: left; margin: 15px 0;">
                  <div style="position: relative;">
                    <img src="${y(e.src)}" alt="Source Image" style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in; display: block;" onclick="window.openModal(this.src)">
                  </div>
                  ${e.caption?`
                    <div class="source-info-panel" style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; font-size: 0.95rem; color: #334155; margin-top: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: relative;">
                      <strong style="color: #0f172a; margin-bottom: 5px; display: block;">
                        <i class="fa-solid fa-circle-info" style="color: #10b981; margin-right: 5px;"></i>
                        About this source
                      </strong>
                      ${e.caption}
                    </div>
                  `:``}
                </div>
              `:e.caption?`
                <div style="text-align: left; margin-top: 15px; font-size: 1.05rem; color: #334155; line-height: 1.5; padding: 15px; background: #f8fafc; border-left: 4px solid #10b981; border-radius: 4px;">
                  ${e.caption}
                </div>
              `:``}
              
              ${e.content?`<div style="text-align: left; margin-top: 10px; font-style: italic; color: #334155; font-size: 1.05rem; line-height: 1.5;">${e.content}</div>`:``}
              ${e.question?`
                <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${e.qNum?`Q${e.qNum}. `:``}${m(e.question,!e.qNum)}</strong></p>
                </div>
              `:``}
            </div>
          `}),o+=`</div>`),o+=``,t.primary_source){let e=Array.isArray(t.primary_source.src)?t.primary_source.src:[t.primary_source.src];a+=`
        <div class="phase-card">
          <div class="source-card" style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-bottom: 15px;">
              ${e.map(t=>`<img src="${y(t)}" alt="Source" style="max-height: 500px; max-width: ${e.length>1?`45%`:`100%`}; object-fit: contain; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">`).join(``)}
            </div>
            <div style="font-weight: bold; margin-bottom: 10px; font-size: 1.1rem; color: var(--primary);">${t.primary_source.title}</div>
            ${t.primary_source.caption?`<div style="color: #475569; margin-bottom: 15px; font-size: 0.95rem; text-align: left;">${t.primary_source.caption}</div>`:``}
            ${t.primary_source.question?`
              <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 20px;">
                <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${t.primary_source.qNum?`Q${t.primary_source.qNum}. `:``}${m(t.primary_source.question,!t.primary_source.qNum)}</strong></p>
              </div>
            `:``}
          </div>
        </div>
      `}if(t.starters&&t.starters.length>0&&(a+=`
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #1e3a8a, #3b82f6); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-image" style="margin-right: 10px;"></i> Historical Sources: Think & Wonder
            </div>
            <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
        `,t.starters.forEach((e,t)=>{a+=`
              <div style="display: flex; flex-direction: column; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; height: 100%;">
                <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 1.1rem; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Source ${String.fromCharCode(65+t)}: ${e.title}</h4>
                <div style="width: 100%; height: 250px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                  <img src="${e.source}" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" onclick="window.openModal(this.src)">
                </div>
                <div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">
                  ${e.caption}
                </div>
                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; border-radius: 0 4px 4px 0; margin-top: auto;">
                  <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px; font-size: 0.95rem;"><i class="fa-solid fa-lightbulb" style="color: #fbbf24; margin-right: 5px;"></i> Think & Wonder</div>
                  <div style="font-size: 0.95rem; color: #1e40af;">${e.think_wonder}</div>
                </div>
              </div>
          `}),a+=`
            </div>
          </div>
        `),t.utility_starters&&t.utility_starters.sources&&(a+=`
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #475569, #334155); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-scale-balanced" style="margin-right: 10px;"></i> Historical Sources: Utility
            </div>
            <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
        `,t.utility_starters.sources.forEach((e,t)=>{let n=``;n=e.type===`written`?`
               <div style="width: 100%; height: 250px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 4px; padding: 20px; overflow-y: auto; margin-bottom: 15px; font-family: 'Playfair Display', serif; font-size: 1.1rem; line-height: 1.6; color: #422006; box-shadow: inset 0 0 10px rgba(0,0,0,0.02);">
                 <i class="fa-solid fa-quote-left" style="color: #facc15; font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                 ${e.content}
               </div>
             `:`
                <div style="width: 100%; height: 250px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                  <img src="${e.source}" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" onclick="window.openModal(this.src)">
                </div>
                ${e.caption?`<div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">${e.caption}</div>`:``}
             `,a+=`
              <div style="display: flex; flex-direction: column; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; height: 100%;">
                <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 1.1rem; border-bottom: 2px solid #475569; padding-bottom: 5px;">${e.title}</h4>
                ${n}
                
                <details style="background: #f1f5f9; border-left: 4px solid #64748b; border-radius: 0 4px 4px 0; margin-top: auto; overflow: hidden;">
                  <summary style="padding: 12px; cursor: pointer; font-weight: 700; color: #334155; font-size: 0.95rem; list-style: none; display: flex; align-items: center;">
                    <i class="fa-solid fa-key" style="color: #fbbf24; margin-right: 8px;"></i> Reveal Provenance Clue
                  </summary>
                  <div style="padding: 0 12px 12px 12px; font-size: 0.95rem; color: #475569; border-top: 1px dashed #cbd5e1; margin-top: 4px; padding-top: 8px;">
                    ${e.provenance_clue}
                  </div>
                </details>
              </div>
          `}),a+=`
            </div>
            <div style="padding: 15px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <h3 style="margin: 0; color: #0f172a; font-size: 1.15rem; font-family: 'Playfair Display', serif;">
                How useful are Sources A and B for an enquiry into ${t.utility_starters.enquiry}? (8 marks)
              </h3>
            </div>
          </div>
        `),t.do_now&&t.do_now.type===`timeline`&&t.do_now.events)_?(r+=`
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 30px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              <div style="padding: 20px;">
                <div style="margin-bottom: 20px; font-size: 1.2rem; color: #1e3a8a;"><strong>${t.do_now.prediction_question||``}</strong></div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
        `,t.do_now.events.forEach((e,t)=>{r+=`
            <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
              <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;"><i class="fa-regular fa-clock" style="margin-right: 6px;"></i>${e.year}</div>
              <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">${e.title}</div>
              <div style="font-size: 0.95rem; color: #475569;">${e.detail}</div>
              ${e.img?`<div style="text-align: center; margin-top: 15px;"><img src="${y(e.img)}" style="max-width: 40%; border-radius: 4px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>`:``}
            </div>
          `}),r+=`</div></div></div>`,t.do_now.events.filter(e=>e.lat&&e.lng).length>0&&(r+=`
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 30px;">
              <div style="padding: 15px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: bold; font-size: 1.1rem; color: #1e293b;">
                <i class="fa-solid fa-map-location-dot" style="color: #ef4444; margin-right: 8px;"></i> Interactive Trip Map
              </div>
              <div id="trip-map-container" style="height: 500px; width: 100%;"></div>
            </div>
          `)):(r+=`
          <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
              <summary style="padding: 10px 15px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
                <span><i class="fa-solid fa-clock-rotate-left" style="color: #3b82f6; margin-right: 10px;"></i> Chronological Timeline</span>
                <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
              </summary>
              <div style="padding: 20px;">
                <div style="margin-bottom: 20px; font-size: 1.1rem; color: #1e3a8a;"><strong>${t.do_now.prediction_question||``}</strong></div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
        `,t.do_now.events.forEach((e,t)=>{r+=`
            <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
              <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;">${e.year}</div>
              <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">${e.title}</div>
              <div style="font-size: 0.95rem; color: #475569;">${e.detail}</div>
              ${e.img?`<div style="text-align: center; margin-top: 15px;"><img src="${y(e.img)}" style="max-width: 40%; border-radius: 4px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>`:``}
            </div>
          `}),r+=`</div></div></details>`);else if(t.do_now&&t.do_now.items){try{let e=JSON.parse(localStorage.getItem(`taughtUnits`)||`[]`);e.length>0&&window.KNOWLEDGE_BANK&&t.do_now.items.forEach(t=>{if(t.question.includes(`PAST TOPIC:`)){let n=e[Math.floor(Math.random()*e.length)],r=window.KNOWLEDGE_BANK[n];if(r&&r.length>0){let e=r[Math.floor(Math.random()*r.length)];t.question=`PAST TOPIC: `+e.question,t.answer=e.answer}}})}catch(e){console.error(e)}r+=`
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-list-check" style="color: #3b82f6; margin-right: 10px;"></i> Do Now Tasks</span>
              <div>
                <button class="btn btn-secondary" onclick="event.preventDefault(); window.toggleAllAnswers(this.closest('details'))" style="font-size: 0.9rem; padding: 4px 10px; margin-right: 10px;"><i class="fa-solid fa-eye"></i> Reveal All</button>
                <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
              </div>
            </summary>
            <div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
      `,(t.do_now.items||t.do_now.tasks||[]).forEach((e,t)=>{let n=e.question||e.event||``,i=e.answer||e.year||``;typeof n!=`string`&&(n=String(n)),typeof i!=`string`&&(i=String(i)),window.currentUnitId&&(n=n.replace(/src=['"]assets\//g,`src="/units/${window.currentUnitId}/assets/`),i=i.replace(/src=['"]assets\//g,`src="/units/${window.currentUnitId}/assets/`));let a=`donow-card-${t}`;r+=`
          <div class="do-now-card" id="do-now-card-${t}" onclick="window.toggleAnswerById('${a}')" style="cursor: pointer;">
            <div style="font-weight: 700; margin-bottom: 8px;">Task ${t+1}</div>
            <div>${n}</div>
            <div class="answer" id="${a}" style="display: none; margin-top: 10px; padding: 10px; background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 4px;">${i}</div>
          </div>
        `}),r+=`</div></details>`}if(t.vocab&&t.vocab.length>0){r+=`
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #b45309; font-weight: bold; font-size: 1.05rem; background: #fffbeb; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0;">
              <span><i class="fa-solid fa-spell-check" style="color: #b45309; margin-right: 10px;"></i> Key Vocabulary</span>
              <i class="fa-solid fa-chevron-down" style="color: #64748b;"></i>
            </summary>
            <div style="padding: 20px;">
              <p style="color: #475569; margin-bottom: 20px; font-size: 1.1rem;"><strong>Vocabulary Practice:</strong> Tap a term on the left, then tap its matching definition on the right to master the key vocabulary.</p>
              <div id="vocab-match-game" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="match-terms" style="display: flex; flex-direction: column; gap: 10px;">
      `,t.vocab.forEach((e,t)=>{r+=`<button class="btn btn-secondary match-term-btn" data-idx="${t}" style="text-align: left; padding: 15px; font-weight: bold; border-width: 2px; transition: all 0.2s;">${e.term}</button>`}),r+=`</div><div class="match-defs" style="display: flex; flex-direction: column; gap: 10px;">`;let e=t.vocab.map((e,t)=>({def:e.definition,idx:t}));e.sort(()=>Math.random()-.5),e.forEach(e=>{r+=`<button class="btn btn-secondary match-def-btn" data-idx="${e.idx}" style="text-align: left; padding: 15px; font-weight: normal; border-width: 2px; transition: all 0.2s;">${e.def}</button>`}),r+=`
                </div>
              </div>
              <div id="unlock-success" style="display: none; margin-top: 20px; padding: 15px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; color: #047857; font-weight: bold; text-align: center; font-size: 1.2rem;">
                <i class="fa-solid fa-star"></i> Vocabulary Mastered!
              </div>
            </div>
          </details>
      `}if(r+=``,t.learning_objectives){let e=``,n=(t.title||``).replace(/^Lesson\s*\d+:\s*/i,``).trim(),i=(t.learning_objectives.overarching||``).trim();i&&i!==n&&(e=`
          <p style="font-size: 1.1rem; font-weight: 600; color: #1e3a8a; margin-bottom: 15px;">
            ${t.learning_objectives.overarching}
          </p>
        `),r+=`
        <div class="learning-objectives-card" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-top: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; margin-bottom: ${e?`0`:`15px`};">
            <i class="fa-solid fa-bullseye" style="color: #10b981;"></i> Learning Objectives
          </h3>
          ${e}
          <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
            ${t.learning_objectives.scaffolded.map(e=>`<li style="margin-bottom: 8px;">${e}</li>`).join(``)}
          </ul>
        </div>
      `}let j=[];if(t.video&&(j=j.concat(Array.isArray(t.video)?t.video:[t.video])),t.extra_videos&&Array.isArray(t.extra_videos)&&(j=j.concat(t.extra_videos)),j.length>0&&(r+=`
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <summary style="cursor: pointer; padding: 20px; font-size: 1.25rem; color: #b45309; font-weight: 600; display: flex; align-items: center; gap: 10px; user-select: none;">
            <i class="fa-brands fa-youtube" style="color: #dc2626;"></i> Lesson Video Resources (${j.length})
          </summary>
          <div style="padding: 0 20px 20px 20px; display: flex; flex-direction: column; gap: 15px;">
      `,j.forEach(e=>{let t=e.type===`youtube`?`YouTube`:`ERA`,n=e.type===`youtube`?`#dc2626`:`#3b82f6`,i=e.type===`youtube`?`fa-brands fa-youtube`:`fa-solid fa-arrow-up-right-from-square`;r+=`
          <div style="background: #f8fafc; border-left: 4px solid ${n}; border-radius: 4px; padding: 12px 16px; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <i class="${i}" style="font-size: 1.2rem; color: ${n};"></i>
                <div>
                  <div style="color: #1e293b; font-size: 0.95rem; font-weight: 600;">${e.title||`External Video Resource`} ${e.duration?`<span style="color: #64748b; font-weight: normal; margin-left: 8px;"><i class="fa-regular fa-clock"></i> ${e.duration}</span>`:``}</div>
                  <div style="color: #64748b; font-size: 0.85rem;">External ${t} Video. Opens in a new secure tab.</div>
                </div>
              </div>
              <a href="${e.url}" target="_blank" style="white-space: nowrap; background: #eff6ff; color: #2563eb; padding: 6px 12px; border: 1px solid #bfdbfe; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 0.9rem; transition: all 0.2s;">
                Watch <i class="fa-solid fa-play" style="margin-left: 4px; font-size: 0.8rem;"></i>
              </a>
            </div>
            ${e.viewing_task?`<div style="background: #fffbeb; border-left: 3px solid #f59e0b; padding: 8px 12px; font-size: 0.9rem; color: #b45309;"><i class="fa-solid fa-bullseye" style="margin-right: 5px;"></i> <b>Viewing Task:</b> ${e.viewing_task}</div>`:``}
            ${e.model_answer?`
            <details style="background: #f0fdf4; border-left: 3px solid #22c55e; border-radius: 2px;">
              <summary style="cursor: pointer; padding: 8px 12px; font-size: 0.9rem; color: #166534; font-weight: 600; user-select: none; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-key"></i> Reveal Model Answer
              </summary>
              <div style="padding: 0 12px 12px 12px; font-size: 0.9rem; color: #14532d; line-height: 1.5;">
                ${e.model_answer}
              </div>
            </details>
            `:``}
          </div>
        `}),r+=`
          </div>
        </details>
      `),t.narrative_blocks&&t.narrative_blocks.length>0){s+=`
        <div class="phase-card">
      `,t.narrative_blocks.forEach((t,r)=>{if(t.type===`interactive_map`){s+=`
            <div class="interactive-map-container" style="margin: 30px 0; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h3 style="margin-top: 0; color: #1e293b; font-family: 'Playfair Display', serif;"><i class="fa-solid fa-map-location-dot"></i> Interactive Historical Map</h3>
              <div class="map-img-wrapper" style="position: relative; height: 500px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; margin-bottom: 20px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
          `,t.maps.forEach((e,t)=>{s+=`<img src="${y(e.src)}" id="map-img-${e.id}" style="position: absolute; max-width: 100%; max-height: 100%; object-fit: contain; opacity: ${t===0?`1`:`0`}; transition: opacity 0.6s ease-in-out; border-radius: 6px;">`}),s+=`
              </div>
              <div id="map-caption-display" style="font-size: 1.1rem; font-style: italic; color: #334155; min-height: 3em; margin-bottom: 20px;">${t.maps[0].caption}</div>
              <div class="map-controls" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          `,t.maps.forEach((e,t)=>{s+=`
                <button class="btn btn-secondary map-toggle-btn ${t===0?`active-map-btn`:``}" data-map-id="${e.id}" data-caption="${e.caption.replace(/"/g,`&quot;`)}" onclick="toggleMap(this)" style="border-radius: 30px; padding: 8px 16px; font-weight: bold;">
                  ${e.year} ${e.label}
                </button>
            `}),s+=`
              </div>
            </div>
          `;return}let a=r%2==0?`#ffffff`:`#f0f9ff`;if(typeof t.text==`string`&&t.text.match(/^\[Key Individual:\s*(.+)\]$/i)){let e=t.text.match(/^\[Key Individual:\s*(.+)\]$/i)[1].trim(),n=null;if(window.db&&window.currentUnitId){let t=window.db[window.currentUnitId];n=t.data?.key_individuals?.find(t=>t.name.toLowerCase().includes(e.toLowerCase())),n||=t.biographies?.find(t=>t.name.toLowerCase().includes(e.toLowerCase()))}if(n){let e=i?i(n):`<div>${n.name}</div>`;s+=`
               <div class="key-individual-embed" style="margin-bottom: 20px; border: 1px solid var(--border-glass); border-radius: 8px; overflow: hidden; background: #f8fafc; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                 <button onclick="const content = this.nextElementSibling; const icon = this.querySelector('.chevron-icon'); if(content.style.display==='none'){content.style.display='block'; icon.classList.replace('fa-chevron-down','fa-chevron-up');}else{content.style.display='none'; icon.classList.replace('fa-chevron-up','fa-chevron-down');}" style="width: 100%; text-align: left; padding: 15px 20px; background: rgba(59, 130, 246, 0.1); border: none; font-weight: bold; color: #1e3a8a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 1.05rem; transition: background 0.2s;">
                   <span><i class="fa-solid fa-id-card-clip" style="margin-right: 10px; color: #3b82f6;"></i> Key Individual: ${n.name}</span>
                   <i class="fa-solid fa-chevron-down chevron-icon"></i>
                 </button>
                 <div style="display: none; padding: 25px; background: #ffffff;">
                   <div style="width: 100%; margin: 0 auto;">
                     ${e}
                   </div>
                 </div>
               </div>
             `;return}}let o=typeof t.text==`string`&&t.text.startsWith(`"`),c=(t.text||``).replace(/\[Key Individual:\s*([^\]]+)\]/gi,(t,n)=>e&&e.key_individuals&&e.key_individuals.some(e=>e.name&&e.name.toLowerCase()===n.toLowerCase())?`<a href="javascript:void(0)" class="key-individual-inline-link no-print" onclick="window.jumpToKeyIndividual('${n}')" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer; padding: 2px 6px; font-size: 0.95em; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; vertical-align: baseline;"><i class="fa-solid fa-id-card-clip"></i> ${n}</a><span class="print-only" style="display:none; font-weight:bold;">${n}</span>`:n);c=o?`<em style="font-size:1.1rem; color:#475569;">${c}</em>`:A(c),c=f(c),c=c.replace(/src=["'](\.\/)?assets\//g,`src="/units/`+window.currentUnitId+`/assets/`);let l=c;if(!o&&!c.trim().startsWith(`<`)&&c.length>20){let e=c.charAt(0),t=c.slice(1);l=`<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #1e3a8a;">${e}</span>`+t}let u=``;if(t.level_4){let n=t.level_4.replace(/\[Key Individual:\s*([^\]]+)\]/gi,(t,n)=>e&&e.key_individuals&&e.key_individuals.some(e=>e.name&&e.name.toLowerCase()===n.toLowerCase())?`<a href="javascript:void(0)" class="key-individual-inline-link no-print" onclick="window.jumpToKeyIndividual('${n}')" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer; padding: 2px 6px; font-size: 0.95em; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; vertical-align: baseline;"><i class="fa-solid fa-id-card-clip"></i> ${n}</a><span class="print-only" style="display:none; font-weight:bold;">${n}</span>`:n);if(n=o?`<em style="font-size:1.1rem; color:#475569;">${n}</em>`:A(n),n=f(n),u=n,!o&&!n.trim().startsWith(`<`)&&n.length>20){let e=n.charAt(0),t=n.slice(1);u=`<span style="float: left; font-size: 3rem; line-height: 2.5rem; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Playfair Display', serif; color: #047857;">${e}</span>`+t}}let d=``;t.theme_heading&&(d=`<h4 id="${t.theme_heading.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/(^-|-$)/g,``)}" style="margin-top: 0; margin-bottom: 10px; color: #1e3a8a; font-size: 1.15rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; display: inline-block;"><i class="fa-solid fa-bookmark" style="color: #64748b; margin-right: 8px;"></i>${t.theme_heading}</h4><br/>`);let p=``;if(t.images&&Array.isArray(t.images)&&t.images.length>0){let e=encodeURIComponent(JSON.stringify(t.images.map(e=>({src:y(e.src||e.image),alt:e.alt||e.image_alt||``})))).replace(/'/g,`%27`);p=`
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
               ${t.images.map((t,n)=>t.image_context?`
                     <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; justify-content: center; margin: 20px 0; width: 100%; grid-column: 1 / -1;">
                       <div style="flex: 1 1 300px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                         <img src="${y(t.src||t.image)}" alt="${t.alt||t.image_alt||`Narrative Image`}" style="width: 100%; max-height: 400px; object-fit: contain; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" onclick="window.openGallery('${e}', ${n})">
                         ${t.caption||t.image_caption||t.alt||t.image_alt?`<div class="image-hint-caption" onclick="this.classList.toggle('blurred'); const i = this.querySelector('i'); if(this.classList.contains('blurred')) { i.classList.replace('fa-eye', 'fa-eye-slash'); i.style.color = '#94a3b8'; this.title = 'Click to reveal caption'; } else { i.classList.replace('fa-eye-slash', 'fa-eye'); i.style.color = '#10b981'; this.title = 'Click to hide caption'; }" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> ${t.source_letter?`<strong>Source ${t.source_letter}:</strong> `:``}${t.caption||t.image_caption||t.alt||t.image_alt}</div>`:``}
                       </div>
                       <div style="flex: 1 1 300px; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center;">
                         <h4 style="margin-top: 0; margin-bottom: 12px; color: #b45309; display: flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                           <i class="fa-solid fa-magnifying-glass-plus"></i> Historical Context
                         </h4>
                         <p style="margin: 0; font-size: 1rem; color: #334155; line-height: 1.6;">
                           ${t.image_context.replace(/\*\*Hinge Question:\*\*/g,`<br><br><strong style="color: #b45309;">Hinge Question:</strong>`)}
                         </p>
                       </div>
                     </div>
                   `:`
                     <div class="narrative-image-container" style="text-align: center;">
                       <img src="${y(t.src||t.image)}" alt="${t.alt||t.image_alt||`Narrative Image`}" style="width: 100%; max-height: 400px; object-fit: contain; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" onclick="window.openGallery('${e}', ${n})">
                       ${t.caption||t.image_caption||t.alt||t.image_alt?`<div class="image-hint-caption" onclick="this.classList.toggle('blurred'); const i = this.querySelector('i'); if(this.classList.contains('blurred')) { i.classList.replace('fa-eye', 'fa-eye-slash'); i.style.color = '#94a3b8'; this.title = 'Click to reveal caption'; } else { i.classList.replace('fa-eye-slash', 'fa-eye'); i.style.color = '#10b981'; this.title = 'Click to hide caption'; }" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> ${t.source_letter?`<strong>Source ${t.source_letter}:</strong> `:``}${t.caption||t.image_caption||t.alt||t.image_alt}</div>`:``}
                     </div>
                   `).join(``)}
             </div>
           `}else if(t.image){let e=t.image_context?`display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; justify-content: center; margin: 20px 0;`:`text-align: center; margin: 20px 0;`,n=t.image_context?`flex: 1 1 300px; text-align: center; display: flex; flex-direction: column; justify-content: center;`:``,r=t.image_context?`
               <div style="flex: 1 1 300px; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center;">
                 <h4 style="margin-top: 0; margin-bottom: 12px; color: #b45309; display: flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                   <i class="fa-solid fa-magnifying-glass-plus"></i> Historical Context
                 </h4>
                 <p style="margin: 0; color: #334155; line-height: 1.6; font-size: 1rem;">${t.image_context.replace(/\*\*Hinge Question:\*\*/g,`<br><br><strong style="color: #b45309;">Hinge Question:</strong>`)}</p>
               </div>
               `:``;p=`
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
             <div class="narrative-image-container" style="${e}">
               <div style="${n}">
                 <img src="${y(t.image)}" alt="${t.image_alt||`Narrative Image`}" style="max-width: 100%; max-height: 400px; object-fit: contain; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" onclick="window.openModal(this.src)">
                 ${t.caption||t.image_caption||t.image_alt?`<div class="image-hint-caption" onclick="this.classList.toggle('blurred'); const i = this.querySelector('i'); if(this.classList.contains('blurred')) { i.classList.replace('fa-eye', 'fa-eye-slash'); i.style.color = '#94a3b8'; this.title = 'Click to reveal caption'; } else { i.classList.replace('fa-eye-slash', 'fa-eye'); i.style.color = '#10b981'; this.title = 'Click to hide caption'; }" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> ${t.source_letter?`<strong>Source ${t.source_letter}:</strong> `:``}${t.caption||t.image_caption||t.image_alt}</div>`:``}
               </div>
               ${r}
             </div>
           `}let h=``;if(t.source){let e=``;e=t.source.type===`written`?`
                   <div style="width: 100%; max-height: 350px; background-color: #fefce8; border: 1px solid #fde047; border-radius: 4px; padding: 20px; overflow-y: auto; margin-bottom: 15px; font-family: 'Playfair Display', serif; font-size: 1.1rem; line-height: 1.6; color: #422006; box-shadow: inset 0 0 10px rgba(0,0,0,0.02);">
                     <i class="fa-solid fa-quote-left" style="color: #facc15; font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                     ${t.source.content}
                   </div>
                 `:`
                    <div style="width: 100%; max-height: 400px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                      <img src="${y(t.source.source||t.source.src)}" alt="Source" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" onclick="window.openModal(this.src)">
                    </div>
                 `,h=`
              <div class="gcse-source-container" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: left;">
                ${t.source.caption?`<h4 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center; line-height: 1.4;">
                  <i class="fa-solid fa-file-lines" style="color: #3b82f6; margin-right: 10px;"></i>
                  ${t.source.caption}
                </h4>`:t.source.title?`<h4 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center;">
                  <i class="fa-solid fa-file-lines" style="color: #3b82f6; margin-right: 10px;"></i>
                  ${t.source.title}
                </h4>`:``}
                ${e}
                ${t.source.source_context?`
                  <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 15px; border-radius: 0 4px 4px 0; margin-top: 15px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
                    <strong>Historical Context:</strong> ${window.formatBold(t.source.source_context)}
                  </div>
                `:``}
                ${t.source.provenance_clue?`
                  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 15px; margin-top: 15px;">
                    <strong style="color: #166534; display: block; margin-bottom: 5px;"><i class="fa-solid fa-magnifying-glass" style="margin-right: 5px;"></i> Provenance Clue:</strong>
                    <span style="color: #15803d; font-size: 0.95rem;">${window.formatBold(t.source.provenance_clue)}</span>
                  </div>
                `:``}
                ${t.source.question?`<div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${t.source.qNum?`Q${t.source.qNum}. `:``}${m(t.source.question,!t.source.qNum)}</strong></p>
                </div>`:``}
              </div>
             `}s+=`
            <div class="standard-narrative-container">
              ${p}
              ${h}
              <div id="para-${r+1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${a}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                ${!t.text||!t.text.trim()||typeof t.text==`string`&&t.text.includes(`side-quest-box`)||t.title&&t.title.toLowerCase().includes(`lesson reflection`)?``:`<div class="para-number">`+(r+1)+`</div>`}
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6;">${d}${l}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          `;let g=``;if(t.level_4&&(g+=`
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-${r+1}" class="narrative-chunk" style="display: flex; align-items: flex-start; margin-bottom: 15px; padding: 15px; background: ${a}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="para-number" style="background:#ecfdf5; color:#047857;">${r+1}</div>
                <div class="narrative-text" style="flex-grow: 1; line-height: 1.6; font-size: 1.15rem; color:#1e293b;">${u}</div>
                <div style="display: flex; align-items: flex-start;">
                  <button class="btn btn-secondary no-print" onclick="window.readAloudText(this)" style="padding: 6px 10px; flex-shrink: 0; margin-left: 15px;" title="Read Aloud"><i class="fa-solid fa-volume-high"></i></button>
                </div>
              </div>
            </div>
          `),t.hinge_question){let e=`hinge-${r}`,n=t.hinge_question.text||t.hinge_question.question,i=t.hinge_question.correct_index===void 0?t.hinge_question.answer:t.hinge_question.correct_index;g+=`
            <div class="hinge-question-container no-print" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px;">
              <button class="btn btn-secondary" id="btn-${e}" onclick="document.getElementById('${e}').style.display = 'block'; this.style.display = 'none';" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Hinge Question</button>
              <div id="${e}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"${n}"</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${t.hinge_question.options.map((e,t)=>`
                    <button onclick="
                      const parent = this.parentElement;
                      const explanation = parent.nextElementSibling;
                      for (let child of parent.children) {
                        child.style.pointerEvents = 'none';
                        if (child.dataset.index == ${i}) {
                          child.style.backgroundColor = '#dcfce7';
                          child.style.borderColor = '#22c55e';
                          child.style.color = '#166534';
                        }
                      }
                      if (${t} !== ${i}) {
                        this.style.backgroundColor = '#fee2e2';
                        this.style.borderColor = '#ef4444';
                        this.style.color = '#991b1b';
                      }
                      explanation.style.display = 'block';
                    " data-index="${t}" style="text-align: left; background: #ffffff; border: 1px solid #cbd5e1; color: #334155; padding: 10px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem;">
                      <span style="font-weight: bold; margin-right: 8px;">${String.fromCharCode(65+t)}.</span> ${e}
                    </button>
                  `).join(``)}
                </div>
                <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                  <strong>Explanation:</strong> ${t.hinge_question.explanation}
                </div>
              </div>
            </div>
          `}t.tasks&&t.tasks.length>0&&(g+=`<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">`,t.tasks.forEach((e,t)=>{if(e.type===`convict_game`){let i=`convict-game-emb-${r}-${t}`;g+=`<div id="${i}" style="margin-bottom: 20px;"></div>`,window.postRenderHooks.push(()=>{n(()=>import(`./convict_game-CSHi6PUA.js`).then(t=>{t.initConvictGame(document.getElementById(i),e)}),[])});return}if(e.type===`physician_game`){let i=`physician-game-emb-${r}-${t}`;g+=`<div id="${i}" style="margin-bottom: 20px;"></div>`,window.postRenderHooks.push(()=>{n(()=>import(`./physician_game-Cmy3CF6h.js`).then(t=>{t.initPhysicianGame(document.getElementById(i),e)}),[])});return}if(e.type===`drag_drop_timeline`){let i=`dd-timeline-emb-${r}-${t}`;g+=`<div id="${i}" style="margin-bottom: 20px;"></div>`,window.postRenderHooks.push(()=>{n(()=>import(`./drag_drop_timeline-anmBODpi.js`).then(t=>{t.initDragDropTimeline(document.getElementById(i),e)}),[])});return}if(e.type===`interactive_map`){let i=`interactive-map-emb-${r}-${t}`;g+=`<div id="${i}" style="margin-bottom: 20px;"></div>`,window.postRenderHooks.push(()=>{n(()=>import(`./interactive_map-Dvk9CYCB.js`).then(t=>{t.initInteractiveMap(document.getElementById(i),e)}),[])});return}if(e.type===`spectrum_mapper`){let i=`spectrum-emb-${r}-${t}`;g+=`<div id="${i}" style="margin-bottom: 20px;"></div>`,window.postRenderHooks.push(()=>{n(()=>import(`./spectrum_mapper-DzDMqsTS.js`).then(t=>{t.initSpectrumMapper(document.getElementById(i),e)}),[])});return}if(e.type===`multiple_choice`){g+=`<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-list-check"></i> ${e.text||e.question||``}</h4>
                 ${e.questions.map((e,n)=>`
                   <div style="margin-top: 15px;">
                     <strong>${e.q}</strong>
                     <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;">
                       ${e.options.map((e,i)=>`
                         <label style="cursor:pointer; display:flex; align-items:center; gap:8px;">
                           <input type="radio" name="mc-${r}-${t}-${n}" value="${i}">
                           <span>${e}</span>
                         </label>
                       `).join(``)}
                     </div>
                   </div>
                 `).join(``)}
               </div>`;return}if(e.type===`sorting`){g+=`<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-arrow-down-1-9"></i> ${e.text||e.question||``}</h4>
                 <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                   ${e.events.map((t,n)=>`
                     <div style="display:flex; align-items:center; gap:10px;">
                       <input type="number" min="1" max="${e.events.length}" style="width:50px; padding:5px; border:1px solid #ccc; border-radius:4px;">
                       <span>${t}</span>
                     </div>
                   `).join(``)}
                 </div>
               </div>`;return}if(e.type===`cloze`){let t=e.cloze_text.replace(/\[([^\]]+)\]/g,`<input type="text" placeholder="..." style="border:none; border-bottom:2px solid #3b82f6; background:transparent; width:100px; text-align:center; margin:0 5px;" />`);g+=`<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-pen-clip"></i> ${e.text||e.question||``}</h4>
                 <div style="margin-bottom: 15px; padding:10px; background:#e0f2fe; border-radius:6px; font-weight:bold; color:#0369a1;">Word Bank: ${e.words.join(` | `)}</div>
                 <p style="line-height:1.8; font-size:1.05rem;">${t}</p>
               </div>`;return}if(e.type===`matching`){g+=`<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-link"></i> ${e.text}</h4>
                 <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:15px;">
                   <div style="display:flex; flex-direction:column; gap:10px;">
                     ${e.pairs.map(e=>`<div style="padding:10px; background:white; border:1px solid #cbd5e1; border-radius:6px; font-weight:bold;">${e.left}</div>`).join(``)}
                   </div>
                   <div style="display:flex; flex-direction:column; gap:10px;">
                     ${[...e.pairs].sort(()=>Math.random()-.5).map(e=>`<div style="padding:10px; background:white; border:1px solid #cbd5e1; border-radius:6px;">${e.right}</div>`).join(``)}
                   </div></div></details>`;return}if(e.type===`table_planner`){g+=`<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; overflow-x:auto;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-table"></i> ${e.text}</h4>
                 <table style="width:100%; border-collapse:collapse; margin-top:10px; background:white;">
                   <thead><tr>${e.columns.map(e=>`<th style="border:1px solid #cbd5e1; padding:10px; background:#e2e8f0; color:#1e293b; text-align:left;">${e}</th>`).join(``)}</tr></thead>
                   <tbody>
                     ${Array.from({length:e.rows}).map(()=>`<tr>${e.columns.map(()=>`<td style="border:1px solid #cbd5e1; padding:10px;"><textarea style="width:100%; min-height:60px; border:none; resize:vertical; outline:none;" placeholder="Type here..."></textarea></td>`).join(``)}</tr>`).join(``)}
                   </tbody>
                 </table>
               </div>`;return}if(e.type===`think_pair_share`){g+=`<div style="margin-bottom: 20px; background: #ecfdf5; padding: 15px; border-radius: 8px; border: 2px solid #10b981;">
                 <h4 style="margin-top:0; color:#065f46;"><i class="fa-solid fa-users"></i> Think-Pair-Share</h4>
                 <p style="font-weight:bold; color:#0f172a; font-size:1.1rem;">${e.text||e.question}</p>
                 <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-top:15px;">
                   <div style="background:white; padding:10px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                     <div style="font-weight:bold; color:#059669; margin-bottom:8px;"><i class="fa-solid fa-brain"></i> My Thoughts</div>
                     <textarea style="width:100%; border:none; resize:vertical; min-height:80px; outline:none;" placeholder="Jot down your initial ideas..."></textarea>
                   </div>
                   <div style="background:white; padding:10px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                     <div style="font-weight:bold; color:#059669; margin-bottom:8px;"><i class="fa-solid fa-comments"></i> Partner's Thoughts</div>
                     <textarea style="width:100%; border:none; resize:vertical; min-height:80px; outline:none;" placeholder="What did your partner add?..."></textarea>
                   </div></div></details>`;return}if(e.type===`drawing`){g+=`<div style="margin-bottom: 20px; background: #fffbeb; padding: 15px; border-radius: 8px; border: 2px dashed #f59e0b; text-align:center;">
                 <h4 style="margin-top:0; color:#b45309;"><i class="fa-solid fa-palette"></i> Drawing Task</h4>
                 <p style="font-weight:bold; color:#0f172a; font-size:1.05rem;">${e.text||e.question}</p>
                 <div style="margin:20px auto; width:80%; height:200px; background:white; border:1px solid #d1d5db; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#9ca3af; font-style:italic;">
                   [Draw your response in your workbook]
                 </div>
               </div>`;return}let i=e.qNum?`Q${e.qNum}. `:``,a=`ans-emb-${r}-${t}`,o=e.starter?`<button class="btn" onclick="window.toggleStarterById('starter-${a}')" style="margin-left: 5px; padding: 4px 8px; font-size: 0.8rem; background: #e0f2fe; color: #0284c7; border: 1px solid #7dd3fc;"><i class="fa-solid fa-pen"></i> Starter</button>`:``,s=e.starter?`<div class="starter-box" id="starter-${a}" style="display: none; margin-top: 8px; background: #f0f9ff; padding: 10px; border-left: 3px solid #0284c7; font-style: italic; color: #0c4a6e; transition: all 0.3s ease;">${e.starter}</div>`:``;g+=`
               <div style="margin-bottom: 10px;">
                 <div style="font-size: 1.05rem; line-height: 1.6; color: #1e293b; margin-bottom: 8px;">${window.formatBold(i+(e.text||e.question||``))}</div>
                 <button class="btn btn-secondary" onclick="window.toggleAnswerById('${a}')" style="padding: 4px 8px; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Show</button>
                 ${o}
                 ${s}
                 <div class="answer" id="${a}" style="display: none; margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03; line-height: 1.6;">${window.formatBold(e.model||e.model_answer||``)}</div>
               </div>
             `}),g+=`</div>`),l.includes(`</details>`)&&t.title&&t.title.includes(`Side Quest`)&&(l=l.replace(`</details>`,g+`</details>`),g=``),s+=g});let r=!1;if(t.tasks&&(r=t.tasks.some(e=>!!e.model)),t.historians_corner&&t.historians_corner.stretch_model&&(r=!0),d+=`
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
            
            ${r?`<button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>`:``}
          </div>
      `,t.tasks&&t.tasks.length>0&&t.tasks.forEach((e,t)=>{if(e.type===`drag_drop_timeline`){let r=`dd-timeline-lesson-${t}`;d+=`<div id="${r}" style="margin-bottom: 20px;"></div>`,window.postRenderHooks.push(()=>{n(()=>import(`./drag_drop_timeline-anmBODpi.js`).then(t=>{t.initDragDropTimeline(document.getElementById(r),e)}),[])});return}if(e.type===`interactive_map`){let r=`interactive-map-lesson-${t}`;d+=`<div id="${r}" style="margin-bottom: 20px;"></div>`,window.postRenderHooks.push(()=>{n(()=>import(`./interactive_map-Dvk9CYCB.js`).then(t=>{t.initInteractiveMap(document.getElementById(r),e)}),[])});return}let r=(e.text||e.question||``).replace(/^(Enquiry:|Q\d+:|Task \d+:|Question \d+[a-z]?:)\s*/i,``),i=f===void 0?r:f(r),a=i.match(/\((P|Para\s*)(\d+)\)$/i),o=``;a&&(i=i.replace(a[0],``).trim(),o=`<button class="btn btn-secondary btn-sm-icon" title="Find Evidence" onclick="window.scrollToPara('para-${a[2]}')"><i class="fa-solid fa-magnifying-glass"></i></button>`);let s=i.match(/^([A-Za-z0-9'\-\/ ]+):\s*(.*)/),c=``;s&&(c=`<div style="font-size: 1.15rem; color: #0284c7; margin-bottom: 6px; font-weight: 800;">${s[1]}</div>`,i=s[2]),d+=`
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              ${c}
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${e.qNum?`Q${e.qNum}. `:``}${i}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${o}
                  ${e.starter?`<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" onclick="toggleElement('starter-${t}')"><i class="fa-solid fa-pen"></i></button>`:``}
                  ${e.clue?`<button class="btn btn-secondary btn-sm-icon" title="Clue" onclick="toggleElement('clue-${t}')"><i class="fa-solid fa-lightbulb"></i></button>`:``}
                  ${e.model?`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('model-${t}')"><i class="fa-solid fa-check-double"></i></button>`:``}
                </span>
              </div>
              <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>

              ${e.starter?`<div id="starter-${t}" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${e.starter}</div>`:``}
              ${e.clue?`<div id="clue-${t}" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${e.clue}</div>`:``}
              ${e.model?`<div id="model-${t}" class="scaffold-box model-box" style="display:none;">${f(e.model)}</div>`:``}
            </div>
          `}),t.historians_corner){let e=t.historians_corner;u+=`
          <div style="margin-top: 30px; background: #fafafa; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px;">
            <h3 style="margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; color: #0f172a;">${e.title}</h3>
            <p style="font-size: 1.05rem; line-height: 1.6; color: #334155; margin-bottom: 20px;">${f(e.text||e.author_context+`<br><br><i>`+e.extract+`</i>`)}</p>
            ${e.stretch_question?`
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 0;">
              <div style="font-weight: 700; margin-bottom: 10px; color: #ef4444;">Stretch Challenge</div>
              <div style="font-size: 1.05rem; margin-bottom: 12px;">
                ${e.qNum?`Q${e.qNum}. `:``}${e.stretch_question}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${e.starter?`<button class="btn btn-secondary btn-sm-icon" title="Sentence Starter" onclick="toggleElement('hc-starter')"><i class="fa-solid fa-pen"></i></button>`:``}
                  ${e.clue?`<button class="btn btn-secondary btn-sm-icon" title="Clue" onclick="toggleElement('hc-clue')"><i class="fa-solid fa-lightbulb"></i></button>`:``}
                  ${e.stretch_model?`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('hc-model')"><i class="fa-solid fa-check-double"></i></button>`:``}
                </span>
              </div>
              ${e.starter?`<div id="hc-starter" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${e.starter}</div>`:``}
              ${e.clue?`<div id="hc-clue" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${e.clue}</div>`:``}
              ${e.stretch_model?`<div id="hc-model" class="scaffold-box model-box" style="display:none;">${f(e.stretch_model)}</div>`:``}
            </div>`:``}
          </div>
        `}u+=`</div>`}if(t.pair_share){let e=t.pair_share;l+=`
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 15px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #059669; font-weight: bold; font-size: 1.05rem; background: #ecfdf5; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #a7f3d0;">
              <span><i class="fa-solid fa-users" style="color: #059669; margin-right: 10px;"></i> Think, Pair, Share</span>
              <i class="fa-solid fa-chevron-down" style="color: #059669;"></i>
            </summary>
            <div style="padding: 20px; background: #ecfdf5;">
              <p style="font-size: 1.15rem; font-weight: 700; color: #065f46; margin-top: 0;">${e.prompt}</p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span><i class="fa-solid fa-brain"></i> 1. Think</span>
                    <button onclick="startTPSTimer(this, 60)" style="background: #10b981; color: white; border: none; border-radius: 4px; padding: 3px 8px; cursor: pointer; font-size: 0.85rem; font-weight: bold;"><i class="fa-regular fa-clock"></i> 60s</button>
                  </div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${e.think}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-comments"></i> 2. Pair</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${e.pair}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-users"></i> 3. Share</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${e.share}</p>
                 </div>
              </div>
            </div>
          </details>
      `}if(t.exam_practice){let e=[],n=[];if(Array.isArray(t.exam_practice)?e=t.exam_practice:(e=t.exam_practice.questions||[],n=t.exam_practice.stimulus||[]),e.length>0||n.length>0){l+=`
          <div class="phase-card" style="margin-top: 30px; border: 2px solid #3b82f6; border-radius: 8px;">
            <div style="background: #eff6ff; padding: 15px; border-bottom: 2px solid #bfdbfe; border-radius: 6px 6px 0 0; margin: -20px -20px 20px -20px; display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; color: #1e3a8a; font-size: 1.2rem;"><i class="fa-solid fa-graduation-cap"></i> Assessment Practice</h3>
              <button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px; background: white; border: 1px solid #bfdbfe;"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>
            </div>
        `;let t=(e,t)=>`
              <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                    ${m(e.question)}
                  <span style="display: inline-flex; vertical-align: middle;">
                    ${e.model?`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('ep-model-${t}')"><i class="fa-solid fa-check-double"></i></button>`:``}
                  </span>
                </div>
                <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
                ${e.model?`<div id="ep-model-${t}" class="scaffold-box model-box" style="display:none;">${f===void 0?e.model:f(e.model)}</div>`:``}
              </div>
        `;if(e.length>0){let n=e.findIndex(e=>e.question&&(e.question.trim().startsWith(`2. `)||e.question.trim().startsWith(`Q2.`)));n!==-1&&(l+=t(e[n],n))}n.length>0&&(l+=`<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-bottom: 20px;">`,n.forEach((e,t)=>{l+=`
              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px;">
                <div style="font-weight: bold; color: #334155; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">${e.title}</div>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.5; color: #475569; font-style: italic;">${e.content}</p>
              </div>
            `}),l+=`</div>`),e.length>0&&e.forEach((e,n)=>{e.question&&(e.question.trim().startsWith(`2. `)||e.question.trim().startsWith(`Q2.`))||(l+=t(e,n))}),l+=`</div>`}}let M=null;if(t.vocab&&t.vocab.length>0?M=t.vocab:t.key_vocabulary&&t.key_vocabulary.length>0?M=t.key_vocabulary:t.flashcards&&t.flashcards.length>0&&(t.flashcards[0].term||t.flashcards[0].word)&&(M=t.flashcards),M&&(l+=`
        <div class="phase-card">
          <div class="phase-title">Consolidation & Recall</div>
          <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
          <div class="flashcard-deck">
      `,M.forEach(e=>{let t=e.term||e.word||e.title||``,n=e.definition||e.meaning||e.desc||``;l+=`
          <div class="flashcard-wrapper" onclick="this.classList.toggle('flipped')">
            <div class="flashcard-inner">
              <div class="flashcard-face flashcard-front">
                <h4>${t}</h4>
                <p>Tap to reveal</p>
              </div>
              <div class="flashcard-face flashcard-back">
                ${n}
              </div>
            </div>
          </div>
        `}),l+=`</div></div>`),t.extended||t.debate_prep){let e=`
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Extended Scholarship</div>
            ${t.extended&&(t.extended.model||t.extended.answer)?`<button class="btn btn-secondary" onclick="toggleElement('extended-model-${t.id}')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button>`:``}
          </div>
      `;if(t.debate_prep){let n=t.debate_prep,r=[...n.arguments_for.map(e=>({t:e,s:`for`})),...n.arguments_against.map(e=>({t:e,s:`against`}))].sort(()=>Math.random()-.5).map((e,n)=>`<div class="debate-card" draggable="true" ondragstart="window.dragDebate(event)" id="debate-arg-${t.id}-${n}" data-side="${e.s}" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: grab;">${e.t}</div>`).join(``);e+=`
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-scale-balanced"></i> Debate Prep: ${n.question}</h3>
            <p style="color: #475569; font-size: 0.95rem;">Drag and drop the evidence cards below into the correct columns to prepare your arguments before writing your essay.</p>
            
            <div id="debate-bank-${t.id}" class="debate-dropzone" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #94a3b8; padding: 15px; border-radius: 8px; margin-bottom: 20px; min-height: 80px;">
              ${r}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h4 style="text-align: center; color: #16a34a; margin-top: 0;">Agree</h4>
                <div id="debate-for-${t.id}" class="debate-dropzone" data-target="for" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #86efac; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
              <div>
                <h4 style="text-align: center; color: #dc2626; margin-top: 0;">Disagree</h4>
                <div id="debate-against-${t.id}" class="debate-dropzone" data-target="against" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #fca5a5; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 15px;">
              <button class="btn btn-primary" onclick="window.checkDebate('${t.id}')">Check Answers</button>
              <div id="debate-feedback-${t.id}" style="margin-top: 10px; font-weight: bold;"></div>
            </div>
          </div>
        `}t.extended&&(t.extended.paragraphs||t.extended.title)&&(t.extended.title&&(e+=`<h3 style="color: #0f172a;">${t.extended.title}</h3>`),t.extended.paragraphs&&t.extended.paragraphs.forEach(t=>{e+=`<p style="color: #334155; font-size: 1.05rem; line-height: 1.6;">${f(t)}</p>`})),e+=`</div>`,(t.debate_prep||t.extended&&(t.extended.paragraphs||t.extended.title))&&(l+=e)}let N=(window.currentUnitData||{}).id||new URLSearchParams(window.location.search).get(`id`),P=N===`early_modern_world`,F=N===`weimar_nazi_germany`||N===`cme_new`;if(_?C+=s+r+a+o+l+u+d:P?C+=r+a+(F?``:o)+s+l+u+d:C+=(F?``:o)+a+r+s+d+u+l,F&&(C+=o),t.gcse_task||t.extended&&t.extended.question||h.length>0){let e=`
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #b45309;">${t.extended&&t.extended.title?t.extended.title:`Assessment Practice`}</div>
            <button class="btn btn-secondary" onclick="this.closest('.phase-card').querySelectorAll('.model-box').forEach(c => c.style.display = c.style.display === 'block' ? 'none' : 'block')" style="font-size: 0.9rem; padding: 4px 10px;"><i class="fa-solid fa-magnifying-glass"></i> Reveal Models</button>
          </div>
      `;if(t.extended&&t.extended.question){let n=``;t.extended.hints&&t.extended.hints.length>0&&(n=`<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; padding-left: 20px; color: #92400e;">${t.extended.hints.map(e=>`<li>${f(e)}</li>`).join(``)}</ul></div>`);let r=``;if(t.extended.source_a||t.extended.source_b){if(r=`<div style="display: flex; gap: 20px; margin: 15px 0;">`,t.extended.source_a){let e=typeof t.extended.source_a==`string`?``:t.extended.source_a.provenance,n=typeof t.extended.source_a==`string`?t.extended.source_a:t.extended.source_a.content;r+=`
               <div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A</strong>
                 ${e?`<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${e}</span>`:``}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${n.replace(/\n/g,`<br>`)}
                 </div>
               </div>`}if(t.extended.source_b){let e=typeof t.extended.source_b==`string`?``:t.extended.source_b.provenance,n=typeof t.extended.source_b==`string`?t.extended.source_b:t.extended.source_b.content;r+=`
               <div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                 ${e?`<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${e}</span>`:``}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${n.replace(/\n/g,`<br>`)}
                 </div>
               </div>`}r+=`</div>`,t.extended.provenance_clue&&(r+=`<details style="margin-top: 15px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; overflow: hidden;">
              <summary style="padding: 12px; cursor: pointer; color: #166534; font-weight: bold; list-style: none;">
                <i class="fa-solid fa-magnifying-glass" style="margin-right: 5px;"></i> Click to Reveal Provenance Scaffolding Clues
              </summary>
              <div style="padding: 0 12px 12px 12px; color: #15803d; border-top: 1px solid #bbf7d0; margin-top: 5px; padding-top: 12px;">
                ${t.extended.provenance_clue}
              </div>
            </details>`)}e+=`
          <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
              ${t.extended.qNum?`Q${t.extended.qNum}. `:``}${m(t.extended.question,!t.extended.qNum)}
              <span style="display: inline-flex; vertical-align: middle;">
                ${t.extended.model||t.extended.answer?`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('extended-model-${t.id}')"><i class="fa-solid fa-check-double"></i></button>`:``}
              </span>
            </div>
            ${r}
            ${n}
            <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your extended response here..." oninput="window.updateProgress()"></textarea>
            ${t.extended.model||t.extended.answer?`<div id="extended-model-${t.id}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${f(t.extended.model||t.extended.answer)}</div>`:``}
          </div>
        `}if(t.gcse_task){if(t.gcse_task.tasks)t.gcse_task.tasks.forEach((n,r)=>{e+=`
              <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                  ${t.gcse_task.qNum&&r===0?`Q${t.gcse_task.qNum}. `:``}${m(n.text||n.question,!(t.gcse_task.qNum&&r===0))}
                  <span style="display: inline-flex; vertical-align: middle;">
                    ${n.model?`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('gcse-model-${r}')"><i class="fa-solid fa-check-double"></i></button>`:``}
                  </span>
                </div>
                <textarea class="student-answer-input" style="min-height: ${(n.text||n.question||``).includes(`12 marks`)||(n.text||n.question||``).includes(`16 marks`)?`200px`:`100px`};" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
                ${n.model?`<div id="gcse-model-${r}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${f(n.model)}</div>`:``}
              </div>
            `});else if(t.gcse_task.sources){let n=t.gcse_task.topic||``,r=n.toLowerCase().includes(`write a narrative account`);r?(e+=`<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">${t.gcse_task.qNum?`Q${t.gcse_task.qNum}. `:``}${n}</p>`,e+=`<p style="font-size: 1rem; color: #475569; margin-bottom: 10px;"><em>Read the historical sources below before writing your narrative account:</em></p>`):e+=`<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">${t.gcse_task.qNum?`Q${t.gcse_task.qNum}. `:``}How useful are Sources A and B for an enquiry into ${n}?</p>`,e+=`<div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">`,t.gcse_task.sources.forEach(t=>{e+=`<div style="flex: 1; min-width: 300px; background: white; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">`,t.type===`visual`?e+=`<img src="${y(t.src)}" style="max-width: 100%; max-height: 250px; border-radius: 4px; margin-bottom: 10px;">`:e+=`<blockquote style="font-size: 1.05rem; font-style: italic; color: #475569; margin: 0 0 15px 0; border-left: 4px solid #94a3b8; padding-left: 10px;">${f(t.text)}</blockquote>`,e+=`<p style="font-size: 0.95rem; font-weight: bold; color: #334155; margin: 0;">${t.title}</p>`,e+=`</div>`}),e+=`</div>`,e+=`<textarea class="student-answer-input" style="min-height: 200px;" placeholder="${r?`Write your 8-mark narrative account here...`:`Type your 8-mark utility evaluation here...`}" oninput="window.updateProgress()"></textarea>`,t.gcse_task.model&&(e+=`<div style="margin-top: 15px;"><button class="btn btn-secondary" onclick="toggleElement('gcse-model-src')"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button></div>`,e+=`<div id="gcse-model-src" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${f(t.gcse_task.model)}</div>`)}}h.length>0&&h.forEach((t,n)=>{e+=`
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${m(t.text||t.question)}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${t.model?`<button class="btn btn-secondary btn-sm-icon" title="Reveal Model Answer" onclick="toggleElement('extracted-model-${n}')"><i class="fa-solid fa-check-double"></i></button>`:``}
                </span>
              </div>
              <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
              ${t.model?`<div id="extracted-model-${n}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${f(t.model)}</div>`:``}
            </div>
          `}),e+=`</div>`,C+=e}t.quiz&&t.quiz.length>0&&e.type!==`trip`&&(window.currentQuizData=t.quiz.map(e=>{if(!e.options&&e.distractors&&e.distractors.length>0){let t=[e.answer||e.a,...e.distractors];t=t.sort(()=>Math.random()-.5);let n=t.indexOf(e.answer||e.a);return{...e,options:t,answer:n}}else if(e.options&&typeof(e.answer||e.a)==`string`){let t=[...e.options];return t=t.sort(()=>Math.random()-.5),{...e,options:t,answer:t.indexOf(e.answer||e.a)}}return e}),window.currentQuizIndex=0,window.currentQuizLessonId=t.id,C+=`
        <div class="phase-card no-print" id="inline-quiz-container" style="padding: 30px;">
          <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
            <i class="fa-solid fa-clipboard-check" style="font-size: 2rem; color: #3b82f6; margin-right: 15px;"></i>
            <div>
              <h2 style="margin: 0; color: #1e293b; font-size: 1.5rem;">Knowledge Check Quiz</h2>
              <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Question <span id="quiz-progress">1 / ${t.quiz.length}</span></p>
            </div>
          </div>
          
          <div id="quiz-question-container">
            <!-- Populated dynamically -->
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <div id="quiz-feedback" style="font-weight: bold; padding-top: 8px;"></div>
            <button id="quiz-next-btn" class="btn btn-primary" style="display: none;" onclick="window.nextQuizQuestion()">Next Question <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      `),E!==-1&&(C+=`<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; margin-bottom: 40px;">`,E>0?C+=`<button class="btn btn-secondary" onclick="window.renderLessonByIndex(${E-1})"><i class="fa-solid fa-arrow-left"></i> Previous ${_?`Day`:`Lesson`}</button>`:C+=`<div></div>`,E<e.lessons.length-1?C+=`<button class="btn btn-primary" onclick="window.renderLessonByIndex(${E+1})">Next ${_?`Day`:`Lesson`} <i class="fa-solid fa-arrow-right"></i></button>`:C+=`<div></div>`,C+=`</div>`),C+=`</div>`,S.innerHTML=C,t.quiz&&t.quiz.length>0&&document.getElementById(`quiz-progress`)&&window.renderQuizQuestion(),window.vocabMatchesFound=0,setTimeout(()=>{if(window.mermaid)try{mermaid.init(void 0,document.querySelectorAll(`.mermaid`))}catch(e){console.error(`Mermaid render error:`,e)}if(window.postRenderHooks&&(window.postRenderHooks.forEach(e=>e()),window.postRenderHooks=[]),document.getElementById(`trip-map-container`)&&window.L&&t.do_now&&t.do_now.type===`timeline`){let n=t.do_now.events.filter(e=>e.lat&&e.lng);if(n.length>0){let r=L.map(`trip-map-container`);L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`© OpenStreetMap contributors`}).addTo(r);let i=[];if(n.forEach(t=>{let n=L.marker([t.lat,t.lng]).addTo(r),a=`<strong>${t.year} - ${t.title}</strong><br>${t.detail}`;if(e.local_heroes){let n=e.local_heroes.filter(e=>t.title.includes(e.cemetery)||t.detail.includes(e.cemetery)||e.cemetery.includes(`Menin Gate`)&&t.title.includes(`Menin Gate`));n.length>0&&(a+=`<div style="margin-top: 15px; border: 2px solid #ef4444; border-radius: 8px; padding: 10px; background: #fef2f2;">
                  <h4 style="margin: 0 0 5px 0; color: #991b1b;"><i class="fa-solid fa-ribbon"></i> Local Connection</h4>`,n.forEach(e=>{a+=`<p style="margin: 0 0 5px 0; font-size: 0.9em; color: #7f1d1d;"><strong>${e.name}</strong> (${e.age}) - ${e.regiment}<br><em>${e.connection}</em><br>${e.story}</p>`}),a+=`</div>`)}t.youtube_id&&(a+=`<div style="margin-top: 10px;"><iframe width="100%" height="150" src="https://www.youtube.com/embed/${t.youtube_id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="border-radius: 4px;"></iframe></div>`),n.bindPopup(a,{minWidth:250}),i.push(n)}),i.length>0){let e=new L.featureGroup(i);if(r.fitBounds(e.getBounds().pad(.2)),!t.id||!t.id.startsWith(`hero_`)){let e=n.map(e=>[e.lat,e.lng]);L.polyline(e,{color:`#ef4444`,weight:4,opacity:.7,dashArray:`10, 10`,lineJoin:`round`}).addTo(r)}}}}},100)}window.switchTab=e=>{document.querySelectorAll(`.tab-content`).forEach(e=>{e.style.display=`none`}),document.querySelectorAll(`.tab-btn`).forEach(e=>{e.classList.remove(`active`)});let t=document.getElementById(e);t&&(t.style.display=`block`);let n=document.querySelector(`button[onclick*="${e}"]`);n&&n.classList.add(`active`)},window.toggleElement=e=>{let t=document.getElementById(e);t&&(t.style.display=t.style.display===`none`?`block`:`none`)};let k=null,A=null;if(window.vocabMatchesFound=0,document.addEventListener(`click`,e=>{let t=e.target.closest(`.match-term-btn`),n=e.target.closest(`.match-def-btn`);if(t&&!t.disabled&&(document.querySelectorAll(`.match-term-btn`).forEach(e=>{e.disabled||(e.style.borderColor=`#cbd5e1`)}),t.style.borderColor=`#3b82f6`,k=t.dataset.idx,A=t),n&&!n.disabled&&k!==null)if(n.dataset.idx===k){n.style.background=`#10b981`,n.style.color=`#fff`,n.style.borderColor=`#059669`,n.disabled=!0,A.style.background=`#10b981`,A.style.color=`#fff`,A.style.borderColor=`#059669`,A.disabled=!0,k=null,A=null,window.vocabMatchesFound++;let e=document.querySelectorAll(`.match-term-btn`).length;if(window.vocabMatchesFound>=e){let e=document.getElementById(`unlock-success`);e&&(e.style.display=`block`);let t=document.getElementById(`locked-content`);t&&(t.style.opacity=`1`,t.style.pointerEvents=`auto`,t.style.filter=`none`)}}else n.style.borderColor=`#ef4444`,setTimeout(()=>{n.disabled||(n.style.borderColor=`#cbd5e1`)},500)}),e.lessons.length>0){D();let e=new URLSearchParams(window.location.search).get(`lesson`);e!==null&&!isNaN(e)?window.renderLessonByIndex(parseInt(e),!0):T(),window.addEventListener(`popstate`,e=>{e.state&&e.state.customTab?document.querySelectorAll(`.lesson-link`).forEach(t=>{t.innerText.toLowerCase().includes(e.state.customTab.replace(`_`,` `))&&t.click()}):e.state&&e.state.lessonIndex!==void 0?window.renderLessonByIndex(e.state.lessonIndex,!0):window.renderDashboard(!0)})}else a.innerHTML=`<h2>No lessons found in data.js</h2>`};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,t):t()}window.updateProgress=()=>{let e=document.querySelectorAll(`.student-answer-input`),t=0;e.forEach(e=>{e.value.trim().length>0&&t++});let n=document.getElementById(`progress-bar`);n&&(e.length===0?n.style.width=`100%`:n.style.width=`${t/e.length*100}%`)};function x(e){let t=1;e.primary_source&&e.primary_source.question&&(e.primary_source.qNum=t++),e.sources&&e.sources.forEach(e=>{e.question&&(e.qNum=t++)}),e.tasks&&e.tasks.forEach(e=>e.qNum=t++),e.historians_corner&&e.historians_corner.stretch_question&&(e.historians_corner.qNum=t++),e.narrative_blocks&&e.narrative_blocks.forEach(e=>{e.source&&e.source.question&&(e.source.qNum=t++),e.tasks&&e.tasks.forEach(e=>{e.type!==`vocab_match`&&(e.qNum=t++)}),e.hinge_question&&(e.hinge_question.qNum=t++)}),e.extended&&e.extended.question&&(e.extended.qNum=t++),e.gcse_task&&(e.gcse_task.qNum=t++),e.pair_share&&(e.pair_share.qNum=t++)}function S(){let e=document.getElementById(`task-whiteboard-modal`);if(!e)return;let t=document.getElementById(`whiteboard-questions-container`);t.innerHTML=``;let n=window.currentActiveLesson||unitData.lessons[0];x(n);let r=``,i=(e,t,n)=>{let i=window.formatBold(n)||`Model answer to be discussed in class.`,a=e&&e!==`-`&&e!==`Do Now`?`Q${e}. `:e===`Do Now`?`<strong>[Do Now]</strong> `:``;r+=`
        <div class="wb-question-card" style="cursor:pointer;" onclick="this.querySelector('.wb-answer').classList.toggle('revealed')" title="Click to reveal answer">
          <div style="font-weight: bold;">${a}${t}</div>
          <div class="wb-answer">${i}</div>
        </div>
      `};n.do_now&&(n.do_now.type===`timeline`&&n.do_now.prediction_question?i(`Do Now`,n.do_now.prediction_question,n.do_now.model||n.do_now.answer||``):n.do_now.type===`questions`&&n.do_now.items.forEach(e=>{i(`Do Now`,e.question,e.answer||``)})),n.primary_source&&n.primary_source.question&&i(n.primary_source.qNum,n.primary_source.question,n.primary_source.model_answer||``),n.sources&&n.sources.forEach(e=>{e.question&&i(e.qNum,e.question,e.model_answer||``)}),n.tasks&&n.tasks.forEach(e=>{i(e.qNum,e.text||e.question||``,e.model||e.model_answer||``)}),n.historians_corner&&n.historians_corner.stretch_question&&i(n.historians_corner.qNum,n.historians_corner.stretch_question,n.historians_corner.model_answer||``),n.narrative_blocks&&n.narrative_blocks.forEach(e=>{e.source&&e.source.question&&i(e.source.qNum,e.source.question,e.source.model_answer||``),e.tasks&&e.tasks.forEach(e=>{e.type!==`vocab_match`&&i(e.qNum,e.text||e.question||``,e.model||e.model_answer||``)}),e.hinge_question&&i(e.hinge_question.qNum,e.hinge_question.question||e.hinge_question,e.hinge_question.model_answer||``)}),n.extended&&n.extended.question&&i(n.extended.qNum,n.extended.question,n.extended.model_answer||``),n.gcse_task&&(n.gcse_task.question||n.gcse_task.prompt)&&i(n.gcse_task.qNum,n.gcse_task.question||n.gcse_task.prompt,n.gcse_task.model_answer||``),n.pair_share&&n.pair_share.prompt&&i(n.pair_share.qNum,n.pair_share.prompt,`Discuss in pairs.`),n.debate_prep&&i(`-`,`Debate Prep: ${n.debate_prep.question}`,`<strong>Agree:</strong><ul>${n.debate_prep.arguments_for.map(e=>`<li>${e}</li>`).join(``)}</ul><strong>Disagree:</strong><ul>${n.debate_prep.arguments_against.map(e=>`<li>${e}</li>`).join(``)}</ul>`),t.innerHTML=r,e.classList.add(`visible`)}window.toggleStarterById=function(e){let t=document.getElementById(e);t&&(t.style.display=t.style.display===`block`?`none`:`block`)},window.dragDebate=function(e){e.dataTransfer.setData(`text`,e.target.id)},window.allowDrop=function(e){e.preventDefault()},window.dropDebate=function(e){e.preventDefault();let t=e.dataTransfer.getData(`text`),n=document.getElementById(t),r=e.target;for(;r&&!r.classList.contains(`debate-dropzone`);)r=r.parentElement;r&&n&&r.appendChild(n)},window.checkDebate=function(e){let t=!0,n=!0,r=document.getElementById(`debate-bank-${e}`);r&&r.children.length>0&&(n=!1);let i=document.getElementById(`debate-for-${e}`);i&&Array.from(i.children).forEach(e=>{e.getAttribute(`data-side`)===`for`?e.style.border=`2px solid #16a34a`:(t=!1,e.style.border=`2px solid #dc2626`)});let a=document.getElementById(`debate-against-${e}`);a&&Array.from(a.children).forEach(e=>{e.getAttribute(`data-side`)===`against`?e.style.border=`2px solid #16a34a`:(t=!1,e.style.border=`2px solid #dc2626`)});let o=document.getElementById(`debate-feedback-${e}`);n?t?(o.style.color=`#16a34a`,o.innerText=`Excellent! All evidence sorted correctly. You are ready to write your essay!`):(o.style.color=`#dc2626`,o.innerText=`Some evidence is in the wrong column. Check the red cards and try again!`):(o.style.color=`#d97706`,o.innerText=`Please sort all evidence cards first!`)},window.toggleAnswerById=function(e){let t=document.getElementById(e);t&&(t.classList.contains(`revealed`)?(t.classList.remove(`revealed`),t.style.display=`none`):(t.classList.add(`revealed`),t.style.display=`block`))},window.toggleAllAnswers=function(e){let t=e.closest(`.phase-card`)||e.closest(`.do-now-box`)||e.closest(`details`);if(!t)return;let n=t.querySelectorAll(`.answer`),r=Array.from(n).some(e=>e.style.display!==`block`&&!e.classList.contains(`revealed`));n.forEach(e=>{r?(e.style.display=`block`,e.classList.add(`revealed`)):(e.style.display=`none`,e.classList.remove(`revealed`))})},window.toggleAllWhiteboardAnswers=function(){let e=document.getElementById(`taskWhiteboardContent`);if(!e)return;let t=e.querySelectorAll(`.answer`),n=Array.from(t).some(e=>e.style.display!==`block`&&!e.classList.contains(`revealed`));t.forEach(e=>{n?(e.style.display=`block`,e.classList.add(`revealed`)):(e.style.display=`none`,e.classList.remove(`revealed`))})},window.toggleMap=function(e){let t=e.closest(`.interactive-map-container`);t.querySelectorAll(`.map-toggle-btn`).forEach(e=>{e.classList.remove(`active-map-btn`),e.style.backgroundColor=``,e.style.color=``}),e.classList.add(`active-map-btn`),e.style.backgroundColor=`#1a237e`,e.style.color=`white`;let n=e.getAttribute(`data-map-id`);t.querySelectorAll(`img[id^="map-img-"]`).forEach(e=>{e.style.opacity=`0`}),t.querySelector(`#map-img-`+n).style.opacity=`1`,t.querySelector(`#map-caption-display`).innerHTML=e.getAttribute(`data-caption`)},window.jumpToKeyIndividual=function(e){let t=`historical_individuals`,n=`Historical Individuals`;if(window.db&&window.currentUnitId&&window.db[window.currentUnitId]){let r=window.db[window.currentUnitId].data||window.db[window.currentUnitId];if(r&&r.key_individuals){let i=r.key_individuals.find(t=>t.name.toLowerCase()===e.toLowerCase());i&&i.group===`Historians`&&(t=`historians`,n=`Historians`)}}let r=new URL(window.location);r.searchParams.set(`tab`,t),history.pushState({customTab:t},``,r);let i=document.querySelectorAll(`.lesson-link`),a=null;i.forEach(e=>{if(e.innerText.includes(n)){if(n===`Historians`&&e.innerText.includes(`Historical`))return;a=e}}),a&&a.click(),setTimeout(()=>{let t=document.querySelectorAll(`.person-card`),n=null;if(t.forEach(t=>{let r=t.querySelector(`h3`);r&&r.innerText.toLowerCase().includes(e.toLowerCase())&&(n=t)}),n){n.scrollIntoView({behavior:`smooth`,block:`center`});let e=n.style.boxShadow;n.style.boxShadow=`0 0 0 4px rgba(59, 130, 246, 0.5)`,n.style.transition=`box-shadow 0.3s ease`,setTimeout(()=>{n.style.boxShadow=e},2e3)}},100)},window.currentDebateIndex=0,window.injectDebateModalIfNeeded=function(){document.getElementById(`debateModal`)||document.body.insertAdjacentHTML(`beforeend`,`
  <div id="debateModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; opacity: 0; transition: opacity 0.3s ease;" onclick="if(event.target === this) window.closeDebateModal()">
    <div class="modal-content" style="background: white; border: 3px solid var(--accent-red); border-radius: 12px; padding: 30px; max-width: 700px; width: 90%; color: var(--navy); position: relative; box-shadow: 0 15px 40px rgba(0,0,0,0.6); transform: scale(0.95); transition: transform 0.3s ease;">
      <button onclick="window.closeDebateModal()" style="position: absolute; top: 15px; right: 15px; background: transparent; border: none; color: #555; font-size: 18pt; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
      <div style="text-align: center; margin-bottom: 20px;">
        <i class="fa-solid fa-scale-balanced" style="font-size: 32pt; color: var(--accent-red);"></i>
        <h2 style="font-family: var(--font-heading); font-size: 22pt; margin: 10px 0 0 0; color: var(--navy); text-transform: uppercase;">Classroom Oracy</h2>
        <h3 style="font-family: var(--font-title); font-size: 14pt; margin: 5px 0 0 0; color: #555;" id="debateTopicSubtitle">Structured Debate Prompt</h3>
      </div>
      <div id="debateModalContent" style="font-size: 14pt; line-height: 1.5; text-align: center; background: #faf9f6; padding: 25px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 20px;">
        <!-- Content dynamically populated -->
      </div>
      <div id="debateSentenceStarterContainer" style="display: none; background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px; border-radius: 4px; text-align: left;">
        <strong style="color: #d97706; font-size: 11pt; text-transform: uppercase; display: block; margin-bottom: 5px;"><i class="fa-solid fa-lightbulb"></i> Sentence Starter</strong>
        <span id="debateSentenceStarterText" style="font-size: 12pt; color: #451a03; font-style: italic;"></span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <button class="btn btn-secondary" onclick="window.cycleDebatePrompt(-1)"><i class="fa-solid fa-arrow-left"></i> Previous</button>
        <button id="btn-show-starter" class="btn" style="background: transparent; border: 2px dashed #cbd5e1; color: #64748b; border-radius: 6px; padding: 8px 15px; font-size: 11pt; cursor: pointer; transition: all 0.2s;" onclick="window.toggleDebateStarter()">Show Hint</button>
        <button class="btn btn-primary" onclick="window.cycleDebatePrompt(1)">Next Prompt <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  </div>`)},window.openKeyInfoModal=function(){let e=window.currentUnitData&&window.currentUnitData.key_info;if(!e)return;let t=document.createElement(`div`);t.className=`modal-overlay`,t.style.display=`flex`,t.innerHTML=`
    <div class="modal-content" style="max-width: 500px; padding: 30px; border-radius: 12px; font-family: 'Outfit', sans-serif;">
      <h3 style="margin-top:0; color: #1e293b; font-size: 1.5rem; margin-bottom: 20px;"><i class="fa-solid fa-circle-info" style="color:#ef4444; margin-right:10px;"></i> Key Trip Information</h3>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-phone" style="width:20px; color:#64748b;"></i> Emergency Contact</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${e.emergency_contact}</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-hotel" style="width:20px; color:#64748b;"></i> Accommodation</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${e.hotel}</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-bus" style="width:20px; color:#64748b;"></i> Transport Provider</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${e.coach}</p>
      </div>
      <div style="text-align: right;">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
      </div>
    </div>
  `,document.body.appendChild(t)},window.openTourGuideModal=function(e){let t=window.currentUnitData.lessons[e];if(!t||!t.tour_guide_script)return;let n=document.createElement(`div`);n.className=`modal-overlay no-print`,n.style.cssText=`position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; display: flex;`,n.onclick=function(e){e.target===n&&n.remove()},n.innerHTML=`
      <div class="modal-content" style="background: white; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 40px; border-radius: 12px; font-family: 'Outfit', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #6366f1; padding-bottom: 15px;">
          <h3 style="margin: 0; color: #1e293b; font-size: 1.8rem;"><i class="fa-solid fa-bullhorn" style="color:#6366f1; margin-right:12px;"></i> Tour Guide Script</h3>
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()"><i class="fa-solid fa-times"></i> Close</button>
        </div>
        ${t.tour_guide_script.map(e=>`
      <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
        <h4 style="color: #1e293b; font-size: 1.25rem; margin-bottom: 15px; border-left: 4px solid #6366f1; padding-left: 12px;">${e.theme_heading}</h4>
        <div style="font-size: 1.1rem; line-height: 1.6; color: #334155;">${e.text}</div>
      </div>
    `).join(``)}
        <div style="text-align: right; margin-top: 20px;">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close Script</button>
        </div>
      </div>
    `,document.body.appendChild(n)},window.openDebateModal=function(){window.injectDebateModalIfNeeded();let e=document.getElementById(`debateModal`);e.style.display=`flex`,e.offsetWidth,e.style.opacity=`1`,e.querySelector(`.modal-content`).style.transform=`scale(1)`,window.renderDebatePrompt()},window.closeDebateModal=function(){let e=document.getElementById(`debateModal`);e&&(e.style.opacity=`0`,e.querySelector(`.modal-content`).style.transform=`scale(0.95)`,setTimeout(()=>{e.style.display=`none`},300))},window.renderDebatePrompt=function(){if(!window.currentUnitData||!window.currentUnitData.debatePrompts||window.currentUnitData.debatePrompts.length===0){document.getElementById(`debateTopicSubtitle`).innerText=`No prompts available`,document.getElementById(`debateModalContent`).innerHTML=`No debate prompts found for this unit.`,document.getElementById(`btn-show-starter`).style.display=`none`;return}let e=window.currentUnitData.debatePrompts[window.currentDebateIndex];document.getElementById(`debateTopicSubtitle`).innerText=e.title,document.getElementById(`debateModalContent`).innerHTML=e.prompt;let t=document.getElementById(`debateSentenceStarterContainer`),n=document.getElementById(`btn-show-starter`);t&&(t.style.display=`none`),e.sentence_starter&&n?(n.style.display=`inline-block`,n.innerText=`Show Hint`,document.getElementById(`debateSentenceStarterText`).innerText=e.sentence_starter):n&&(n.style.display=`none`)},window.toggleDebateStarter=function(){let e=document.getElementById(`debateSentenceStarterContainer`),t=document.getElementById(`btn-show-starter`);e.style.display===`none`?(e.style.display=`block`,t.innerText=`Hide Hint`):(e.style.display=`none`,t.innerText=`Show Hint`)},window.cycleDebatePrompt=function(e){if(!window.currentUnitData||!window.currentUnitData.debatePrompts)return;let t=window.currentUnitData.debatePrompts;window.currentDebateIndex+=e,window.currentDebateIndex<0&&(window.currentDebateIndex=t.length-1),window.currentDebateIndex>=t.length&&(window.currentDebateIndex=0),window.renderDebatePrompt()},window.injectMilestoneModalIfNeeded=function(){document.getElementById(`milestoneModal`)||document.body.insertAdjacentHTML(`beforeend`,`
  <div id="milestoneModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease;" onclick="if(event.target === this) window.closeMilestoneModal()">
    <div class="modal-content" style="background: var(--navy); border: 2.5px solid var(--gold); border-radius: 12px; padding: 25px; max-width: 500px; width: 90%; color: #ffffff; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform 0.3s ease;">
      <button class="modal-close-btn" onclick="window.closeMilestoneModal()" style="position: absolute; top: 15px; right: 15px; background: transparent; border: none; color: #ffffff; font-size: 16pt; cursor: pointer; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
      <div id="modalMilestoneContent">
        <!-- Content dynamically populated via showMilestoneModal -->
      </div>
    </div>
  </div>`)},window.showMilestoneModal=function(e){if(window.injectMilestoneModalIfNeeded(),!window.currentUnitData||!window.currentUnitData.milestones)return;let t=window.currentUnitData.milestones[e];if(!t)return;let n=document.getElementById(`modalMilestoneContent`);n&&(n.innerHTML=`
      <div style="font-size: 11pt; font-weight: bold; color: var(--gold); text-transform: uppercase; margin-bottom: 5px;">Milestone ${e}: ${t.year}</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-top: 0; margin-bottom: 15px; border-bottom: 1.5px solid var(--gold); padding-bottom: 5px; color: #ffffff;">${t.title}</h3>
      <img src="${y(t.img)}" alt="${t.title}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 6px; border: 1.5px solid var(--gold); margin-bottom: 15px;">
      <p style="font-size: 10.5pt; line-height: 1.5; color: #e2e8f0; margin-bottom: 15px; text-align: justify;">${t.desc}</p>
      <div style="background: rgba(255,255,255,0.06); padding: 12px; border-radius: 6px; border-left: 3px solid var(--gold);">
        <strong style="display: block; font-size: 9pt; text-transform: uppercase; color: var(--gold); margin-bottom: 4px;"><i class="fa-solid fa-circle-question"></i> Retrieval Challenge</strong>
        <span style="font-size: 9.5pt; line-height: 1.4; color: #f8fafc;">${t.trivia}</span>
      </div>
    `);let r=document.getElementById(`milestoneModal`);r&&(r.style.display=`flex`,r.offsetWidth,r.style.opacity=`1`,r.querySelector(`.modal-content`).style.transform=`scale(1)`)},window.closeMilestoneModal=function(){let e=document.getElementById(`milestoneModal`);e&&(e.style.opacity=`0`,e.querySelector(`.modal-content`).style.transform=`scale(0.95)`,setTimeout(()=>{e.style.display=`none`},300))},window.currentQuizData=[],window.currentQuizIndex=0,window.currentQuizLessonId=null,window.injectQuizModalIfNeeded=function(){document.getElementById(`quizModal`)||document.body.insertAdjacentHTML(`beforeend`,`
  <div id="quizModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease;" onclick="if(event.target === this) window.closeQuizModal()">
    <div class="modal-content" style="background: #ffffff; border-radius: 12px; padding: 30px; max-width: 600px; width: 90%; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform 0.3s ease;">
      <button class="modal-close-btn" onclick="window.closeQuizModal()" style="position: absolute; top: 15px; right: 15px; background: transparent; border: none; color: #64748b; font-size: 16pt; cursor: pointer; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
      
      <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
        <i class="fa-solid fa-clipboard-check" style="font-size: 2rem; color: #3b82f6; margin-right: 15px;"></i>
        <div>
          <h2 style="margin: 0; color: #1e293b; font-size: 1.5rem;">Knowledge Check</h2>
          <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Question <span id="quiz-progress">1 / 4</span></p>
        </div>
      </div>
      
      <div id="quiz-question-container">
        <!-- Populated dynamically -->
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <div id="quiz-feedback" style="font-weight: bold; padding-top: 8px;"></div>
        <button id="quiz-next-btn" class="btn btn-primary" style="display: none;" onclick="window.nextQuizQuestion()">Next Question <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  </div>`)},window.startQuiz=function(e){if(window.injectQuizModalIfNeeded(),!window.currentUnitData||!window.currentUnitData.lessons)return;let t=window.currentUnitData.lessons.find(t=>t.id===e);if(!t||!t.quiz||t.quiz.length===0)return;window.currentQuizData=t.quiz.map(e=>{if(!e.options&&e.distractors&&e.distractors.length>0){let t=[e.answer||e.a,...e.distractors];t=t.sort(()=>Math.random()-.5);let n=t.indexOf(e.answer||e.a);return{...e,options:t,answer:n}}else if(e.options&&typeof(e.answer||e.a)==`string`){let t=[...e.options];return t=t.sort(()=>Math.random()-.5),{...e,options:t,answer:t.indexOf(e.answer||e.a)}}return e}),window.currentQuizIndex=0,window.currentQuizLessonId=e,window.renderQuizQuestion();let n=document.getElementById(`quizModal`);n.style.display=`flex`,n.offsetWidth,n.style.opacity=`1`,n.querySelector(`.modal-content`).style.transform=`scale(1)`},window.renderQuizQuestion=function(){let e=window.currentQuizData[window.currentQuizIndex];document.getElementById(`quiz-progress`).innerText=`${window.currentQuizIndex+1} / ${window.currentQuizData.length}`;let t=``;e.options?e.options.forEach((e,n)=>{t+=`
        <button class="quiz-option-btn" data-idx="${n}" onclick="window.checkQuizAnswer(this, ${n})" style="display: block; width: 100%; text-align: left; padding: 15px; margin-bottom: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1.05rem; color: #334155; cursor: pointer; transition: all 0.2s;">
          <span style="display: inline-block; width: 30px; height: 30px; line-height: 30px; text-align: center; background: #e2e8f0; border-radius: 50%; margin-right: 15px; font-weight: bold; color: #64748b;">${String.fromCharCode(65+n)}</span>
          ${e}
        </button>
      `}):t=`
      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 15px;">
         <button class="btn btn-secondary" onclick="this.nextElementSibling.style.display='block'; this.style.display='none'; document.getElementById('quiz-next-btn').style.display='block';">Reveal Answer</button>
         <div style="display: none; font-size: 1.15rem; color: #059669; font-weight: bold; padding: 10px;">${e.a||e.answer||``}</div>
      </div>
    `,document.getElementById(`quiz-question-container`).innerHTML=`
    <h3 style="font-size: 1.3rem; color: #0f172a; margin-bottom: 20px; line-height: 1.4;">${e.question||e.q}</h3>
    ${t}
  `,document.getElementById(`quiz-feedback`).innerHTML=``;let n=document.getElementById(`quiz-next-btn`);e.options,n.style.display=`none`,window.currentQuizIndex>=window.currentQuizData.length-1?(n.innerHTML=`Finish <i class="fa-solid fa-check"></i>`,n.onclick=window.closeQuizModal):(n.innerHTML=`Next Question <i class="fa-solid fa-arrow-right"></i>`,n.onclick=window.nextQuizQuestion)},window.checkQuizAnswer=function(e,t){let n=window.currentQuizData[window.currentQuizIndex],r=t===n.answer;document.getElementById(`quiz-question-container`).querySelectorAll(`.quiz-option-btn`).forEach(e=>{e.disabled=!0,e.style.cursor=`default`,parseInt(e.dataset.idx)===n.answer&&(e.style.borderColor=`#22c55e`,e.style.background=`#f0fdf4`,e.style.color=`#15803d`,e.innerHTML=`<i class="fa-solid fa-check-circle"></i> `+e.innerHTML)});let i=document.getElementById(`quiz-feedback`);r?i.innerHTML=`<span style="color: #22c55e;"><i class="fa-solid fa-star"></i> Correct!</span>`:(e.style.borderColor=`#ef4444`,e.style.background=`#fef2f2`,e.style.color=`#b91c1c`,e.innerHTML=`<i class="fa-solid fa-circle-xmark"></i> `+e.innerHTML,i.innerHTML=`<span style="color: #ef4444;">Incorrect. Review the answer above.</span>`),window.currentQuizIndex<window.currentQuizData.length-1?(document.getElementById(`quiz-next-btn`).innerHTML=`Next Question <i class="fa-solid fa-arrow-right"></i>`,document.getElementById(`quiz-next-btn`).style.display=`block`,document.getElementById(`quiz-next-btn`).onclick=window.nextQuizQuestion):(document.getElementById(`quiz-next-btn`).innerHTML=`Finish Quiz <i class="fa-solid fa-flag-checkered"></i>`,document.getElementById(`quiz-next-btn`).style.display=`block`,document.getElementById(`quiz-next-btn`).onclick=function(){document.getElementById(`quiz-question-container`).innerHTML=`<h3 style="text-align:center; color: #15803d;"><i class="fa-solid fa-trophy"></i> Quiz Complete!</h3>`,document.getElementById(`quiz-feedback`).innerHTML=``,document.getElementById(`quiz-next-btn`).style.display=`none`})},window.nextQuizQuestion=function(){window.currentQuizIndex++,window.renderQuizQuestion()},window.closeQuizModal=function(){let e=document.getElementById(`quizModal`);e&&(e.style.opacity=`0`,e.querySelector(`.modal-content`).style.transform=`scale(0.95)`,setTimeout(()=>{e.style.display=`none`},300))};var C=null,w=null;function T(){document.getElementById(`global-glossary-popover`)?C=document.getElementById(`global-glossary-popover`):(C=document.createElement(`div`),C.id=`global-glossary-popover`,document.body.appendChild(C));let e=e=>{let t=e.target.closest(`.vocab-word`);if(!t)return;let n=t.getAttribute(`data-definition`);if(!n)return;w=t,t.classList.add(`active`),C.innerHTML=`<strong style="color: #60a5fa; display: block; margin-bottom: 4px;">${t.textContent}</strong>${n}`,C.classList.add(`visible`);let r=t.getBoundingClientRect(),i=C.getBoundingClientRect(),a=r.top-i.height-10,o=r.left+r.width/2-i.width/2,s=`50%`;if(C.classList.remove(`arrow-top`),a<10&&(a=r.bottom+10,C.classList.add(`arrow-top`)),o<10){let e=10-o;o=10,s=`calc(50% - ${e}px)`}else if(o+i.width>window.innerWidth-10){let e=o+i.width-(window.innerWidth-10);o=window.innerWidth-10-i.width,s=`calc(50% + ${e}px)`}C.style.top=`${a}px`,C.style.left=`${o}px`;let c=document.getElementById(`popover-arrow-style`);c||(c=document.createElement(`style`),c.id=`popover-arrow-style`,document.head.appendChild(c)),c.innerHTML=`#global-glossary-popover::after { left: ${s}; }`},t=e=>{C&&C.classList.contains(`visible`)&&(C.classList.remove(`visible`),w&&=(w.classList.remove(`active`),null))};document.body.addEventListener(`mouseover`,e),document.body.addEventListener(`mouseout`,e=>{e.target.closest(`.vocab-word`)&&t(e)}),document.body.addEventListener(`click`,n=>{n.target.closest(`.vocab-word`)?w===n.target.closest(`.vocab-word`)?t(n):(t(n),e(n)):t(n)}),window.addEventListener(`scroll`,t,{passive:!0}),window.addEventListener(`resize`,t,{passive:!0})}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,T):T(),window.openModal=function(e){let t=document.createElement(`div`);t.style.position=`fixed`,t.style.top=`0`,t.style.left=`0`,t.style.width=`100vw`,t.style.height=`100vh`,t.style.backgroundColor=`rgba(0,0,0,0.85)`,t.style.zIndex=`999999`,t.style.display=`flex`,t.style.justifyContent=`center`,t.style.alignItems=`center`;let n=document.createElement(`img`);n.src=e,n.style.maxWidth=`90%`,n.style.maxHeight=`90%`,n.style.borderRadius=`8px`,n.style.boxShadow=`0 10px 25px rgba(0,0,0,0.5)`,n.style.transition=`transform 0.1s ease`,n.style.cursor=`zoom-in`;let r=1;t.addEventListener(`wheel`,e=>{e.preventDefault(),r+=e.deltaY*-.005,r=Math.min(Math.max(1,r),5);let t=n.getBoundingClientRect(),i=(e.clientX-t.left)/t.width*100,a=(e.clientY-t.top)/t.height*100;r===1?(n.style.transformOrigin=`center center`,n.style.cursor=`zoom-in`):e.deltaY<0&&(n.style.transformOrigin=`${i}% ${a}%`,n.style.cursor=`zoom-out`),n.style.transform=`scale(${r})`}),t.onclick=e=>{r>1?(r=1,n.style.transform=`scale(1)`,n.style.cursor=`zoom-in`):t.remove()},t.appendChild(n),document.body.appendChild(t)},window.openGallery=function(e,t){let n=JSON.parse(decodeURIComponent(e)),r=t,i=document.createElement(`div`);i.style.position=`fixed`,i.style.top=`0`,i.style.left=`0`,i.style.width=`100vw`,i.style.height=`100vh`,i.style.backgroundColor=`rgba(0,0,0,0.9)`,i.style.zIndex=`999999`,i.style.display=`flex`,i.style.justifyContent=`center`,i.style.alignItems=`center`;let a=document.createElement(`button`);a.innerHTML=`<i class="fa-solid fa-xmark"></i>`,a.style.position=`absolute`,a.style.top=`20px`,a.style.right=`20px`,a.style.background=`none`,a.style.border=`none`,a.style.color=`white`,a.style.fontSize=`2rem`,a.style.cursor=`pointer`,a.onclick=()=>i.remove(),i.appendChild(a);let o=document.createElement(`div`);o.style.position=`relative`,o.style.width=`80%`,o.style.height=`80%`,o.style.display=`flex`,o.style.flexDirection=`column`,o.style.justifyContent=`center`,o.style.alignItems=`center`;let s=document.createElement(`img`);s.style.maxWidth=`100%`,s.style.maxHeight=`90%`,s.style.objectFit=`contain`,s.style.borderRadius=`8px`,s.style.boxShadow=`0 10px 25px rgba(0,0,0,0.5)`,s.style.transition=`transform 0.1s ease`,s.style.cursor=`zoom-in`,o.appendChild(s);let c=document.createElement(`div`);c.style.color=`white`,c.style.marginTop=`15px`,c.style.fontSize=`1.1rem`,c.style.textAlign=`center`,o.appendChild(c),i.appendChild(o);let l=1;o.addEventListener(`wheel`,e=>{e.preventDefault(),l+=e.deltaY*-.005,l=Math.min(Math.max(1,l),5);let t=s.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*100,r=(e.clientY-t.top)/t.height*100;l===1?(s.style.transformOrigin=`center center`,s.style.cursor=`zoom-in`):e.deltaY<0&&(s.style.transformOrigin=`${n}% ${r}%`,s.style.cursor=`zoom-out`),s.style.transform=`scale(${l})`}),o.onclick=e=>{l>1&&(l=1,s.style.transform=`scale(1)`,s.style.cursor=`zoom-in`)};let u=document.createElement(`button`);u.innerHTML=`<i class="fa-solid fa-chevron-left"></i>`,u.style.position=`absolute`,u.style.left=`5%`,u.style.top=`50%`,u.style.transform=`translateY(-50%)`,u.style.background=`rgba(255,255,255,0.2)`,u.style.border=`none`,u.style.color=`white`,u.style.fontSize=`2rem`,u.style.width=`60px`,u.style.height=`60px`,u.style.borderRadius=`50%`,u.style.cursor=`pointer`,u.style.display=`flex`,u.style.justifyContent=`center`,u.style.alignItems=`center`,u.onclick=e=>{e.stopPropagation(),l=1,s.style.transform=`scale(1)`,r>0&&(r--,f())},i.appendChild(u);let d=document.createElement(`button`);d.innerHTML=`<i class="fa-solid fa-chevron-right"></i>`,d.style.position=`absolute`,d.style.right=`5%`,d.style.top=`50%`,d.style.transform=`translateY(-50%)`,d.style.background=`rgba(255,255,255,0.2)`,d.style.border=`none`,d.style.color=`white`,d.style.fontSize=`2rem`,d.style.width=`60px`,d.style.height=`60px`,d.style.borderRadius=`50%`,d.style.cursor=`pointer`,d.style.display=`flex`,d.style.justifyContent=`center`,d.style.alignItems=`center`,d.onclick=e=>{e.stopPropagation(),l=1,s.style.transform=`scale(1)`,r<n.length-1&&(r++,f())},i.appendChild(d);let f=()=>{s.src=n[r].src,c.innerHTML=n[r].alt||``,u.style.display=r>0?`flex`:`none`,d.style.display=r<n.length-1?`flex`:`none`};i.onclick=e=>{(e.target===i||e.target===o)&&i.remove()};let p=e=>{if(!document.body.contains(i)){document.removeEventListener(`keydown`,p);return}e.key===`Escape`&&i.remove(),e.key===`ArrowLeft`&&r>0&&(r--,f()),e.key===`ArrowRight`&&r<n.length-1&&(r++,f())};document.addEventListener(`keydown`,p),f(),document.body.appendChild(i)},window.startTPSTimer=function(e,t){if(e.timerInterval)return;e.originalHTML=e.innerHTML;let n=t;e.innerHTML=`<i class="fa-regular fa-clock"></i> `+n+`s`,e.style.background=`#ef4444`,e.timerInterval=setInterval(()=>{n--,n<=0?(clearInterval(e.timerInterval),e.timerInterval=null,e.innerHTML=`<i class="fa-regular fa-bell"></i> Time!`,setTimeout(()=>{e.innerHTML=e.originalHTML,e.style.background=`#10b981`},4e3)):e.innerHTML=`<i class="fa-regular fa-clock"></i> `+n+`s`},1e3)},window.openTeacherGuideModal=function(){if(document.getElementById(`teacherGuideModal`))return;document.body.insertAdjacentHTML(`beforeend`,`
    <div id="teacherGuideModal" class="modal-overlay no-print" style="display: flex; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; opacity: 0; transition: opacity 0.3s ease;" onclick="if(event.target === this) this.remove()">
      <div class="modal-content" style="background: white; border-radius: 12px; padding: 40px; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; color: #1e293b; position: relative; font-family: 'Outfit', sans-serif;">
        <button onclick="this.closest('.modal-overlay').remove()" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: #64748b; font-size: 18pt; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
        
        <h2 style="font-family: 'Playfair Display', serif; color: #4f46e5; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; font-size: 2rem;">
          <i class="fa-solid fa-chalkboard-user"></i> Teacher & Tour Guide Instructions
        </h2>
        
        <p style="font-size: 1.1rem; line-height: 1.6;">Welcome to the Meoncross Battlefield Tour App! This app is designed with a "Dual Interface" to keep pupils engaged while giving you, the teacher, all the information you need.</p>
        
        <h3 style="color: #334155; margin-top: 30px;"><i class="fa-solid fa-mobile-screen"></i> 1. The Pupil View vs. Teacher View</h3>
        <p style="font-size: 1.05rem; line-height: 1.6;">By default, the app is in <strong>Pupil Mode</strong>. They will see the timeline, photos, and interactive maps. However, they do NOT see the historical script or the answers to questions.</p>
        <p style="font-size: 1.05rem; line-height: 1.6;">As a teacher, you have access to the <strong>Tour Guide Script</strong>. On any day's page, click the blue button with the megaphone icon at the top. This opens your script, complete with timelines, key facts, and historical sources to read out loud to the pupils.</p>

        <h3 style="color: #334155; margin-top: 30px;"><i class="fa-solid fa-location-dot"></i> 2. Geo-Fenced "Missions" (Padlocks)</h3>
        <p style="font-size: 1.05rem; line-height: 1.6;">To prevent pupils from just scrolling through the entire trip while bored on the coach, many historical sites are <strong>Geo-Fenced</strong>. You will see a <i class="fa-solid fa-lock"></i> padlock icon next to these sites.</p>
        <p style="font-size: 1.05rem; line-height: 1.6;"><strong>How it works:</strong> When the pupils physically step off the coach and enter the boundaries of the cemetery or memorial, the app uses their phone's GPS to automatically unlock the site. This reveals a specific interactive "Mission" they must complete there (e.g., finding a specific grave, using their compass to find the direction of a gas attack).</p>
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 10px; border-radius: 4px;">
          <strong>Teacher's Fail-Safe:</strong> If a pupil's GPS is broken or offline, they can manually unlock their mission task. To do this, simply instruct the pupil to <strong>tap the padlock icon 4 times in quick succession</strong>. This will act as a secret override.
        </div>

        <h3 style="color: #334155; margin-top: 30px;"><i class="fa-solid fa-users"></i> 3. The Oral Storytelling Task (Tyne Cot & Langemarck)</h3>
        <p style="font-size: 1.05rem; line-height: 1.6;">At massive cemeteries like Tyne Cot, pupils can easily be overwhelmed by the numbers. To build empathy, the app assigns each pupil one specific, well-documented soldier to find (e.g., a Victoria Cross winner or a local Stubbington hero).</p>
        <p style="font-size: 1.05rem; line-height: 1.6;"><strong>Your Role:</strong> Let the pupils spread out to find their assigned graves and read the biography on their phones. At the end of the visit, gather them together and ask them to orally tell the rest of the group the story of "their" soldier.</p>
        
        <div style="margin-top: 40px; text-align: center;">
          <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()" style="background: #4f46e5; color: white; padding: 10px 30px; font-size: 1.1rem; border-radius: 8px; border: none; cursor: pointer;">Got it!</button>
        </div>
      </div>
    </div>
    `);let e=document.getElementById(`teacherGuideModal`);e.offsetWidth,e.style.opacity=`1`},window.unlockMission=function(e,t){let n=e.closest(`.geo-fence-container`);if(e&&!e.classList.contains(`geo-btn-loading`)&&!e.closest(`h4`)){e.innerHTML,e.innerHTML=`<i class="fa-solid fa-spinner fa-spin"></i> Acquiring Signal...`,e.classList.add(`geo-btn-loading`),e.style.pointerEvents=`none`,setTimeout(()=>window.unlockMission(e,t),1500);return}let r=``;if(t===`brooding_soldier`)r=`
        <div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h4 style="color: #059669; margin: 0 0 10px 0; font-family: 'Playfair Display', serif; font-size: 1.4rem;"><i class="fa-solid fa-unlock"></i> Mission Unlocked: The Direction of the Gas</h4>
          <p style="font-size: 1.05rem; color: #334155;"><strong>Task:</strong> Open your phone's compass app. Stand at the base of the Canadian memorial and turn until you are facing the exact direction the German gas attack came from (North-East).</p>
          <div style="background: #ecfdf5; padding: 15px; border-left: 4px solid #10b981; margin: 15px 0; border-radius: 0 4px 4px 0;">
            <em style="color: #065f46;">"Gas! GAS! Quick, boys!—An ecstasy of fumbling..."</em><br><small style="color: #047857;">- Wilfred Owen</small>
          </div>
          <p style="color: #b91c1c; font-weight: bold; margin-bottom: 5px;"><i class="fa-solid fa-brain"></i> Learn these 3 facts by heart before getting back on the coach:</p>
          <ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.5;">
            <li>Chlorine gas severely damaged the respiratory system, causing victims to suffocate.</li>
            <li>The earliest defense was holding cotton pads soaked in urine over the mouth (ammonia neutralized chlorine).</li>
            <li>The memorial shows a soldier in a 'reverse arms' position, signifying mourning, not victory.</li>
          </ul>
        </div>
      `;else if(t===`tyne_cot`){let e=window.currentUnitData?.missions_database?.tyne_cot_soldiers;e&&e.length>0?(e[Math.floor(Math.random()*e.length)],r=`
           <div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
             <h4 style="color: #059669; margin: 0 0 15px 0; font-family: 'Playfair Display', serif; font-size: 1.4rem;"><i class="fa-solid fa-unlock"></i> Mission Unlocked: Tell Their Story</h4>
             <div style="background: #f8fafc; padding: 20px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #3b82f6;">
               <h3 style="margin: 0 0 5px 0; color: #1e293b; font-size: 1.3rem;"></h3>
               <p style="margin: 0 0 5px 0; color: #475569;"><strong>Regiment:</strong> </p>
               <p style="margin: 0 0 15px 0; color: #ef4444; font-weight: bold; font-size: 1.1rem;"><i class="fa-solid fa-map-pin"></i> <strong>Location:</strong> </p>
               <p style="margin: 0; font-size: 1rem; line-height: 1.6; color: #334155;"></p>
             </div>
             <div style="background: #fff1f2; padding: 15px; border-radius: 6px; border: 1px solid #fecdd3;">
               <p style="margin: 0; color: #be123c; font-weight: bold; font-size: 1.05rem;"><i class="fa-solid fa-person-chalkboard"></i> Task: Find this exact grave or panel. At the end of the visit, you will be asked to orally tell the rest of your group about this soldier.</p>
             </div>
           </div>
         `):r=`<p>Error loading soldier database.</p>`}else if(t===`langemarck`){let e=window.currentUnitData?.missions_database?.langemarck_soldiers;e&&e.length>0?(e[Math.floor(Math.random()*e.length)],r=`
           <div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
             <h4 style="color: #059669; margin: 0 0 15px 0; font-family: 'Playfair Display', serif; font-size: 1.4rem;"><i class="fa-solid fa-unlock"></i> Mission Unlocked: The Individuals</h4>
             <div style="background: #f8fafc; padding: 20px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #1e293b;">
               <h3 style="margin: 0 0 5px 0; color: #1e293b; font-size: 1.3rem;"></h3>
               <p style="margin: 0 0 5px 0; color: #475569;"><strong>Regiment:</strong> </p>
               <p style="margin: 0 0 15px 0; color: #ef4444; font-weight: bold; font-size: 1.1rem;"><i class="fa-solid fa-map-pin"></i> <strong>Location:</strong> </p>
               <p style="margin: 0; font-size: 1rem; line-height: 1.6; color: #334155;"></p>
             </div>
             <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
               <p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-magnifying-glass"></i> Task: Look at the names on the bronze oak panels. Remember that every German soldier in the mass grave had a story and family similar to the one above.</p>
             </div>
           </div>
         `):r=`<p>Error loading soldier database.</p>`}else t===`menin_gate`&&(r=`
          <div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h4 style="color: #059669; margin: 0 0 15px 0; font-family: 'Playfair Display', serif; font-size: 1.4rem;"><i class="fa-solid fa-unlock"></i> Mission Unlocked: Local Hero & The Empire</h4>
            
            <div style="margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">
              <h4 style="margin: 0 0 10px 0; color: #1e293b;"><i class="fa-solid fa-magnifying-glass-location" style="color: #3b82f6;"></i> Task 1: Find the Local Hero</h4>
              
              <div style="background: #f8fafc; padding: 20px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #3b82f6;">
                <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 1.3rem;">Private T. J. Franklin</h3>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6; color: #334155;">
                  <strong>Service Number:</strong> 8560<br>
                  <strong>Regiment:</strong> 1st Battalion, The Hampshire Regiment<br>
                  <strong>Born:</strong> Alverstoke, Hampshire, in about 1893.<br><br>
                  <strong>Local Connection:</strong> He was the son of George Franklin (an Army Pensioner and farm labourer) and Mary Ann Jane Franklin. The family lived at Chark Cottage in Stubbington, and later moved to Meadow Cottage, Chark, Lee-on-the-Solent.<br><br>
                  <strong>Military Service & Fate:</strong> Enlisted at Gosport. He was deployed to the Western Front in August 1914. He was killed in action on <strong>29th April 1915</strong> during the Second Battle of Ypres. His battalion was holding an exposed section of the line on the Frezenberg Ridge to cover an Allied withdrawal, enduring intense German shelling and the first ever military poison gas attacks.
                </p>
              </div>
              <p style="margin: 0; color: #b91c1c; font-weight: bold;"><i class="fa-solid fa-person-chalkboard"></i> Action: The Menin Gate has 54,000 names. Locate the specific panel for Private T. J. Franklin.</p>
            </div>
            
            <div>
              <h4 style="margin: 0 0 5px 0; color: #1e293b;"><i class="fa-solid fa-monument" style="color: #f59e0b;"></i> Task 2: The Indian Forces Memorial</h4>
              <p style="margin: 0; color: #475569;">Once you have found his name, walk out of the gate and up onto the grassy ramparts. Locate the <strong>Indian Forces Memorial</strong>. 130,000 troops from the Indian subcontinent served in Flanders. Take a moment to read the inscription before the Last Post begins at 8:00 PM.</p>
            </div>
          </div>
        `);r&&(n.style.border=`none`,n.style.background=`transparent`,n.style.padding=`0`,n.style.boxShadow=`none`,n.innerHTML=r)},window.handleSecretUnlock=function(e,t){let n=Date.now(),r=e.dataset.lastClick?parseInt(e.dataset.lastClick):0,i=e.dataset.clicks?parseInt(e.dataset.clicks):0;n-r>1500?i=1:i++,e.dataset.lastClick=n,e.dataset.clicks=i,i>=4&&window.unlockMission(e,t)};function E(e,t,n){if(!t||!Array.isArray(t)||t.length===0){e.innerHTML=`<p style="text-align: center; color: #64748b; font-size: 1.1rem; padding: 40px;">No timeline events found for this unit.</p>`;return}window.openTimelineLesson||(window.openTimelineLesson=function(e){if(window.db&&window.currentUnitId&&window.db[window.currentUnitId]){let t=window.db[window.currentUnitId].data;if(t&&t.lessons){let n=t.lessons.find(t=>t.id===e);n&&window.dispatchEvent(new CustomEvent(`renderLessonEvent`,{detail:n}))}}});let r=t.length>0&&t[0].events&&Array.isArray(t[0].events),i=new Set;r?t.forEach(e=>{e.events.forEach(e=>{e.theme&&i.add(e.theme)})}):t.forEach(e=>{e.theme&&i.add(e.theme)});let a=`
    <style>
        .timeline-filters {
            text-align: center;
            margin: 20px 0 30px 0;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }
        .timeline-filter-btn {
            background: white;
            border: 2px solid #cbd5e1;
            color: #475569;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .timeline-filter-btn:hover {
            border-color: var(--primary);
            color: var(--primary);
        }
        .timeline-filter-btn.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        .timeline-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px 10px;
            position: relative;
        }
        .timeline-container::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
            width: 4px;
            background: #cbd5e1;
            border-radius: 4px;
        }
        .timeline-group-title {
            /* position: sticky; removed to allow CSS control */
            top: -1px;
            margin: 30px 0 20px 0;
            padding: 10px 20px;
            background: var(--primary);
            color: white;
            border-radius: 8px;
            font-size: 1.25rem;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 100;
        }
        .timeline-event {
            position: relative;
            margin-bottom: 25px;
            padding-left: 60px;
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        }
        .timeline-event::before {
            content: '';
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            background: var(--accent-red);
            border: 4px solid white;
            border-radius: 50%;
            z-index: 2;
            box-shadow: 0 0 0 2px #cbd5e1;
        }
        .timeline-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .timeline-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);
            border-color: #cbd5e1;
        }
        .timeline-date {
            font-weight: 700;
            color: var(--primary);
            font-size: 1.1rem;
            margin-bottom: 5px;
        }
        .timeline-title {
            font-weight: 600;
            font-size: 1.05rem;
            color: #1e293b;
            margin-bottom: 8px;
        }
        .timeline-desc {
            color: #475569;
            font-size: 0.95rem;
            line-height: 1.5;
            margin: 0;
        }
        .timeline-category {
            display: inline-block;
            background: #e0f2fe;
            color: #0369a1;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 10px;
        }
        .timeline-kt {
            display: inline-block;
            background: #f1f5f9;
            color: #64748b;
            padding: 3px 6px;
            border-radius: 4px;
            font-size: 0.7rem;
            font-weight: 500;
            margin-bottom: 8px;
            border: 1px solid #e2e8f0;
        }
        .timeline-image-wrapper {
            float: right;
            margin: 0 0 10px 15px;
            text-align: center;
            max-width: 150px;
        }
        .timeline-image {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #e2e8f0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .timeline-image-caption {
            font-size: 0.8rem;
            color: #64748b;
            margin-top: 5px;
            font-weight: 500;
        }
        /* Clearfix for the floated image */
        .timeline-card::after {
            content: "";
            display: table;
            clear: both;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
    </style>
    `;i.size>0&&(a+=`
        <div class="timeline-filters">
            <button class="timeline-filter-btn active" data-theme="all">All</button>
            ${Array.from(i).map(e=>`<button class="timeline-filter-btn" data-theme="${e}">${e}</button>`).join(``)}
        </div>
        `),a+=`
    <div class="timeline-container" id="timeline-container-main">
    `;let o=0;if(r?t.forEach(e=>{let t=e.lesson_banner_id,r=t&&n&&n.lessons?n.lessons.find(e=>e.id===t):null;r?a+=`
                <div class="timeline-lesson-banner sticky-lesson-header" style="z-index: 100; background: linear-gradient(135deg, #1e3a8a, #312e81); padding: 15px 20px; border-radius: 8px; margin: 40px 0 25px 0; display: flex; justify-content: space-between; align-items: center; color: white; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid #a5b4fc;">
                    <div style="font-size: 1.15rem; font-weight: 600;"><i class="fa-solid fa-book-open" style="color: #fde047; margin-right: 12px;"></i> ${r.title||e.title}</div>
                    <button class="btn btn-primary" style="background: #10b981; border: none; padding: 6px 14px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px;" onclick="window.openTimelineLesson('${r.id}')"><i class="fa-solid fa-circle-play"></i> Jump to Lesson</button>
                </div>
                `:a+=`<div class="timeline-group-title">${e.title}</div>`,e.events.forEach(e=>{a+=`
                <div class="timeline-event" data-theme="${e.theme||``}" style="animation-delay: ${o}s">
                    <div class="timeline-card">
                        ${e.key_topic?`<div class="timeline-kt">${e.key_topic}</div>`:``}
                        ${e.image?`
                        <div class="timeline-image-wrapper">
                            <img src="${e.image}" class="timeline-image" alt="${e.image_caption||e.title||e.text||`Timeline Image`}">
                            ${e.image_caption?`<div class="timeline-image-caption">${e.image_caption}</div>`:``}
                        </div>
                        `:``}
                        ${e.date?`<div class="timeline-date">${e.date}</div>`:``}
                        <p class="timeline-desc">${e.text}</p>
                        ${e.category?`<div class="timeline-category">${e.category}</div>`:``}
                    </div>
                </div>
                `,o+=.05})}):t.forEach(e=>{if(e.lesson_banner_id&&n&&n.lessons){let t=n.lessons.find(t=>t.id===e.lesson_banner_id);t&&(a+=`
                    <div class="timeline-lesson-banner sticky-lesson-header" style="background: linear-gradient(135deg, #1e3a8a, #312e81); padding: 15px 20px; border-radius: 8px; margin: 40px 0 25px 0; display: flex; justify-content: space-between; align-items: center; color: white; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid #a5b4fc; z-index: 100;">
                        <div style="font-size: 1.15rem; font-weight: 600;"><i class="fa-solid fa-book-open" style="color: #fde047; margin-right: 12px;"></i> ${t.title}</div>
                        <button class="btn btn-primary" style="background: #10b981; border: none; padding: 6px 14px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px;" onclick="window.openTimelineLesson('${t.id}')"><i class="fa-solid fa-circle-play"></i> Jump to Lesson</button>
                    </div>
                    `)}a+=`
            <div class="timeline-event" data-theme="${e.theme||``}" style="animation-delay: ${o}s">
                <div class="timeline-card">
                    ${e.key_topic?`<div class="timeline-kt">${e.key_topic}</div>`:``}
                    ${e.image?`
                    <div class="timeline-image-wrapper">
                        <img src="${e.image}" class="timeline-image" alt="${e.image_caption||e.title||e.text||`Timeline Image`}">
                        ${e.image_caption?`<div class="timeline-image-caption">${e.image_caption}</div>`:``}
                    </div>
                    `:``}
                    ${e.date?`<div class="timeline-date">${e.date}</div>`:``}
                    ${e.title?`<div class="timeline-title">${e.title}</div>`:``}
                    ${e.description?`<p class="timeline-desc">${e.description}</p>`:``}
                    ${e.text?`<p class="timeline-desc">${e.text}</p>`:``}
                    ${e.category?`<div class="timeline-category">${e.category}</div>`:``}
                </div>
            </div>
            `,o+=.05}),a+=`</div>`,e.innerHTML=a,i.size>0){let t=e.querySelectorAll(`.timeline-filter-btn`),n=e.querySelectorAll(`.timeline-event`);t.forEach(e=>{e.addEventListener(`click`,()=>{t.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let r=e.dataset.theme;n.forEach(e=>{r===`all`||e.dataset.theme===r?(e.style.display=`block`,e.style.animation=`none`,e.offsetHeight,e.style.animation=null):e.style.display=`none`})})})}}function D(e,t){e.innerHTML=`
    <div style="max-width: 1000px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 4px solid #8b5cf6;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #4c1d95; margin-top: 0; margin-bottom: 10px;"><i class="fa-solid fa-spell-check"></i> Terminology Match</h1>
        <p style="font-size: 1.2rem; color: #475569;">Select a topic and drag the historical terms to their correct definitions.</p>
      </div>

      <div style="margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: flex-end; gap: 15px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <label style="display: block; font-weight: 700; margin-bottom: 10px; color: #334155; font-size: 1.1rem;"><i class="fa-solid fa-list-ul"></i> Select Topic:</label>
          <select id="term-select" class="epz-select" style="width: 100%; padding: 14px; border-radius: 10px; border: 2px solid #cbd5e1; font-size: 1.15rem; background: #ffffff; color: #1e293b; cursor: pointer;">
            <optgroup label="Lesson Glossaries">
              ${t.map(e=>`<option value="${e.id}">${e.title}</option>`).join(``)}
            </optgroup>
          </select>
        </div>
        <button id="btn-focus-term" class="main-btn" style="background: #4c1d95; color: white; padding: 14px 20px; height: 55px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px; border: none; cursor: pointer; white-space: nowrap;">
          <i class="fa-solid fa-expand"></i> Focus Mode
        </button>
      </div>

      <div style="display: grid; grid-template-columns: 300px 1fr; gap: 30px; align-items: start;" id="match-layout">
        
        <!-- Word Bank (Left) -->
        <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; border: 2px dashed #94a3b8; min-height: 400px; display: flex; flex-direction: column; gap: 10px;" id="word-bank">
          <h3 style="margin-top: 0; text-align: center; color: #334155;"><i class="fa-solid fa-layer-group"></i> Word Bank</h3>
          <!-- Draggable terms go here -->
        </div>

        <!-- Definitions (Right) -->
        <div id="definitions-container" style="display: flex; flex-direction: column; gap: 15px;">
          <!-- Drop zones and definitions go here -->
        </div>

      </div>

      <div style="text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: 40px;">
        <div id="term-feedback" style="font-size: 1.4rem; font-weight: bold; min-height: 30px;"></div>
        <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
          <button id="btn-check-terms" class="main-btn epz-btn" style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 14px 28px; font-size: 1.2rem; border: none; border-radius: 10px; font-weight: 600;"><i class="fa-solid fa-check-double"></i> Check Matches</button>
          <button id="btn-reset-terms" class="main-btn epz-btn" style="background: #f1f5f9; color: #475569; padding: 14px 28px; font-size: 1.2rem; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600;"><i class="fa-solid fa-arrow-rotate-left"></i> Reset Board</button>
        </div>
      </div>
    </div>
  `;let n=e.querySelector(`#term-select`),r=e.querySelector(`#word-bank`),i=e.querySelector(`#definitions-container`),a=e.querySelector(`#btn-check-terms`),o=e.querySelector(`#btn-reset-terms`),s=e.querySelector(`#term-feedback`),c=e.querySelector(`#btn-focus-term`);c&&c.addEventListener(`click`,()=>{document.body.classList.toggle(`focus-mode`),document.body.classList.contains(`focus-mode`)?c.innerHTML=`<i class="fa-solid fa-compress"></i> Exit Focus`:c.innerHTML=`<i class="fa-solid fa-expand"></i> Focus Mode`});let l=null,u=[],d=[];function f(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function p(e){l=t.find(t=>t.id===e),l&&(u=f(l.terms),d=f(l.terms),s.innerHTML=``,m())}function m(){r.innerHTML=`<h3 style="margin-top: 0; text-align: center; color: #334155; width: 100%;"><i class="fa-solid fa-layer-group"></i> Word Bank</h3>`,i.innerHTML=``,u.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`term-card`,n.draggable=!0,n.dataset.term=e.term,n.innerHTML=e.term,n.style.background=`#ffffff`,n.style.border=`2px solid #8b5cf6`,n.style.borderRadius=`8px`,n.style.padding=`12px 15px`,n.style.fontSize=`1.1rem`,n.style.fontWeight=`bold`,n.style.color=`#4c1d95`,n.style.cursor=`grab`,n.style.textAlign=`center`,n.style.boxShadow=`0 2px 4px rgba(0,0,0,0.05)`,n.style.transition=`all 0.2s`,n.style.userSelect=`none`,n.addEventListener(`dragstart`,g),n.addEventListener(`dragend`,_),r.appendChild(n)}),r.addEventListener(`dragover`,v),r.addEventListener(`drop`,S),d.forEach((e,t)=>{let n=document.createElement(`div`);n.style.display=`flex`,n.style.gap=`15px`,n.style.alignItems=`stretch`,n.style.background=`#ffffff`,n.style.border=`1px solid #cbd5e1`,n.style.borderRadius=`10px`,n.style.padding=`15px`,n.style.boxShadow=`0 2px 4px rgba(0,0,0,0.05)`;let r=document.createElement(`div`);r.className=`term-dropzone`,r.dataset.correctTerm=e.term,r.style.width=`200px`,r.style.minHeight=`50px`,r.style.border=`2px dashed #cbd5e1`,r.style.borderRadius=`8px`,r.style.background=`#f8fafc`,r.style.display=`flex`,r.style.alignItems=`center`,r.style.justifyContent=`center`,r.style.transition=`all 0.2s`,r.addEventListener(`dragover`,v),r.addEventListener(`dragenter`,y),r.addEventListener(`dragleave`,b),r.addEventListener(`drop`,x);let a=document.createElement(`div`);a.style.flex=`1`,a.style.fontSize=`1.1rem`,a.style.color=`#334155`,a.style.display=`flex`,a.style.alignItems=`center`,a.innerHTML=e.definition,n.appendChild(r),n.appendChild(a),i.appendChild(n)})}let h=null;function g(e){this.style.opacity=`0.4`,h=this,e.dataTransfer.effectAllowed=`move`,e.dataTransfer.setData(`term`,this.dataset.term)}function _(e){this.style.opacity=`1`,document.querySelectorAll(`.term-dropzone`).forEach(e=>{e.style.borderColor=`#cbd5e1`,e.style.background=`#f8fafc`})}function v(e){return e.preventDefault(),e.dataTransfer.dropEffect=`move`,!1}function y(e){this.classList.contains(`term-dropzone`)&&!this.querySelector(`.term-card`)&&(this.style.borderColor=`#8b5cf6`,this.style.background=`#f5f3ff`)}function b(e){this.classList.contains(`term-dropzone`)&&(this.style.borderColor=`#cbd5e1`,this.style.background=`#f8fafc`)}function x(e){if(e.stopPropagation(),this.querySelector(`.term-card`)){let e=this.querySelector(`.term-card`),t=h.parentNode;this.appendChild(h),t.appendChild(e)}else this.appendChild(h);return this.style.borderColor=`#cbd5e1`,this.style.background=`#f8fafc`,!1}function S(e){return e.stopPropagation(),h.parentNode!==r&&r.appendChild(h),!1}if(a.addEventListener(`click`,()=>{let t=0,n=e.querySelectorAll(`.term-dropzone`),i=!0;n.forEach(e=>{let n=e.querySelector(`.term-card`);if(!n){i=!1;return}n.dataset.term===e.dataset.correctTerm?(t++,n.style.borderColor=`#10b981`,n.style.background=`#d1fae5`,n.style.color=`#065f46`,n.draggable=!1,n.style.cursor=`default`,e.style.borderColor=`#10b981`):(n.style.borderColor=`#ef4444`,n.style.background=`#fee2e2`,n.style.color=`#991b1b`,setTimeout(()=>{n.style.borderColor=`#8b5cf6`,n.style.background=`#ffffff`,n.style.color=`#4c1d95`,r.appendChild(n)},800))}),t===d.length?(s.style.color=`#10b981`,s.innerHTML=`🎉 Perfect! You matched all the terms correctly! 🎉`,window.confetti&&window.confetti({particleCount:150,spread:80,origin:{y:.6}})):i?(s.style.color=`#ef4444`,s.innerHTML=`Some matches are incorrect. Try again!`):(s.style.color=`#f59e0b`,s.innerHTML=`Match all the remaining terms to check your score!`)}),o.addEventListener(`click`,()=>{l&&p(l.id)}),n.addEventListener(`change`,e=>{p(e.target.value)}),p(t[0].id),window.innerWidth<768){let t=e.querySelector(`#match-layout`);t&&(t.style.gridTemplateColumns=`1fr`)}}window.openGeographyModal=function(e){if(!window.locationsDataGlobal||!window.locationsDataGlobal[e])return;let t=window.locationsDataGlobal[e],n=document.getElementById(`geo-modal`);n||(n=document.createElement(`div`),n.id=`geo-modal`,n.style.position=`fixed`,n.style.top=`0`,n.style.left=`0`,n.style.width=`100vw`,n.style.height=`100vh`,n.style.backgroundColor=`rgba(0, 0, 0, 0.8)`,n.style.zIndex=`999999`,n.style.display=`flex`,n.style.alignItems=`center`,n.style.justifyContent=`center`,n.style.padding=`20px`,n.style.boxSizing=`border-box`,n.onclick=e=>{e.target===n&&(n.style.display=`none`,n.innerHTML=``)},document.body.appendChild(n));let r=t.mapQuery||t.name,i=`https://maps.google.com/maps?q=${encodeURIComponent(r)}&t=&z=13&ie=UTF8&iwloc=&output=embed`,a=`
    <div style="flex: 0 0 350px; background: #f8fafc; padding: 25px; border-left: 1px solid #cbd5e1; overflow-y: auto; display: flex; flex-direction: column; gap: 25px;">
  `;t.description&&(a+=`
      <div>
        <h2 style="margin-top: 0; color: #0f172a; font-family: var(--font-heading, sans-serif); border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px; font-size: 1.3rem;">About</h2>
        <p style="color: #334155; font-size: 0.95rem; line-height: 1.6; margin: 0;">${t.description}</p>
      </div>
    `),t.timeline&&Array.isArray(t.timeline)&&t.timeline.length>0&&(a+=`
      <div>
        <h2 style="margin-top: 0; color: #0f172a; font-family: var(--font-heading, sans-serif); border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px; font-size: 1.3rem;">Key Events</h2>
        <ul style="list-style: none; padding: 0; margin: 0; position: relative; border-left: 3px solid #3b82f6; margin-left: 10px;">
    `,t.timeline.forEach((e,t)=>{let n=e.split(` - `),r=n.length>1?n[0]:``,i=n.length>1?n.slice(1).join(` - `):e;a+=`
        <li style="position: relative; margin-bottom: 20px; padding-left: 20px;">
          <div style="position: absolute; left: -8px; top: 5px; width: 13px; height: 13px; border-radius: 50%; background: #3b82f6; border: 3px solid #f8fafc;"></div>
          ${r?`<div style="font-weight: bold; color: #1d4ed8; font-size: 0.95rem; margin-bottom: 4px;">${r}</div>`:``}
          <div style="color: #334155; font-size: 0.9rem; line-height: 1.5;">${i}</div>
        </li>
      `}),a+=`
        </ul>
      </div>
    `),a+=`</div>`,n.innerHTML=`
    <div style="background: white; border-radius: 12px; width: 100%; max-width: 1200px; height: 80vh; max-height: 800px; display: flex; flex-direction: column; overflow: hidden; position: relative; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
      
      <!-- Header -->
      <div style="padding: 15px 25px; background: #0f172a; color: white; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="margin: 0; font-size: 1.4rem;">${t.name}</h2>
          <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">${t.region||``} ${t.coordinates?`| ${t.coordinates}`:``}</div>
        </div>
        <button onclick="document.getElementById('geo-modal').style.display='none'; document.getElementById('geo-modal').innerHTML='';" style="background: none; border: none; color: white; font-size: 2rem; cursor: pointer; padding: 0 10px; line-height: 1;">&times;</button>
      </div>
      
      <!-- Body -->
      <div style="display: flex; flex: 1; overflow: hidden; flex-direction: row;">
        <!-- Left: Map -->
        <div style="flex: 1; background: #e2e8f0; position: relative;">
          <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            style="border:0; display:block;"
            src="${i}" 
            allowfullscreen>
          </iframe>
        </div>
        
        <!-- Right: Timeline / Info -->
        ${a}
      </div>

    </div>
  `,n.style.display=`flex`};function O(e,t){let n=``;(e.image||e.image_url)&&(n=`
      <div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
        <img src="${e.image_url?e.image_url:typeof y==`function`?y(e.image):e.image}" loading="lazy" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.parentElement.style.display='none'">
      </div>
    `);let r=``;e.description?r=`<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;">${e.description}</div>`:e.significance&&(r=`<div style="margin: 0; color: var(--text-main); font-size: 0.95rem; line-height: 1.5;"><strong>Significance:</strong> ${e.significance}`,e.achievements&&Array.isArray(e.achievements)&&e.achievements.length>0&&(r+=`<br><br><strong>Achievements:</strong><ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>${e.achievements.join(`</li><li>`)}</li></ul>`),r+=`</div>`);let i=e.coordinates?`<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: -10px; margin-bottom: 10px;">${e.coordinates}</p>`:``;return`
    <div class="location-card" onclick="window.openGeographyModal(${t})" style="height: 100%; background: var(--bg-card, rgba(255, 255, 255, 0.05)); border: 1px solid var(--border-glass); border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 20px rgba(0,0,0,0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
      ${n}
      <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
        <h3 style="margin: 0 0 5px 0; color: var(--primary); font-family: var(--font-heading);">${e.name}</h3>
        ${i}
        <p style="margin: 0 0 15px 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${e.region||``}</p>
        ${r}
        <div style="text-align: center; margin-top: auto; padding-top: 15px; font-size: 0.85rem; color: #10b981; font-weight: bold;"><i class="fas fa-map-marked-alt" style="margin-right: 5px;"></i> View Interactive Map</div>
      </div>
    </div>
  `}function k(e,t){if(!t||t.length===0)return;window.locationsDataGlobal=t;let n=document.createElement(`div`);n.className=`key-individuals-wrapper fade-in`,n.style.padding=`20px`,n.style.maxWidth=`1200px`,n.style.margin=`0 auto`;let r=document.createElement(`div`);r.style.textAlign=`center`,r.style.marginBottom=`40px`,r.innerHTML=`
    <h1 style="font-family: var(--font-heading); color: var(--primary); margin-bottom: 10px; font-size: 2.5rem;">Geographical Locations</h1>
    <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Explore the key geographical locations and understand their significance.</p>
  `,n.appendChild(r);let i=!1;t.length>0&&t[0].group&&(i=!0);let a={"Key Topic 1":{title:`Key Topic 1: The Weimar Republic (1918-29)`,image:`images/weimar_kt1_cover.jpg`,gradient:`linear-gradient(135deg, #1e3a8a, #3b82f6)`,border:`#3b82f6`,enquiry:`To what extent did the Weimar Republic recover from its early crises?`},"Key Topic 2":{title:`Key Topic 2: Hitler's Rise to Power, 1919-33`,image:`images/weimar_kt2_cover.jpg`,gradient:`linear-gradient(135deg, #7f1d1d, #dc2626)`,border:`#dc2626`,enquiry:`How did a tiny obscure political group transform?`},"Key Topic 3":{title:`Key Topic 3: Nazi Control and Dictatorship`,image:`images/weimar_kt3_cover.jpg`,gradient:`linear-gradient(135deg, #4b5563, #1f2937)`,border:`#1f2937`,enquiry:`From chains to absolute control`},"Key Topic 4":{title:`Key Topic 4: Life in Nazi Germany, 1933-39`,image:`images/weimar_kt4_cover.jpg`,gradient:`linear-gradient(135deg, #4d7c0f, #65a30d)`,border:`#65a30d`,enquiry:`Did life improve under the Nazis?`}};if(i){let e=``,r=``,i=!0;t.forEach((t,n)=>{if(t.group!==e){i||(r+=`</div>`),i=!1,e=t.group;let n=a[e];if(n){let e=typeof y==`function`?y(`/`+n.image):`/`+n.image;r+=`
            <div style="margin-top: 40px; margin-bottom: 25px;">
              <div class="premium-banner" style="position: relative; overflow: hidden; border-radius: 12px; padding: 25px 30px; margin: 0; min-height: 140px; box-shadow: 0 10px 25px -10px rgba(0,0,0,0.4); display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
                <div class="premium-banner-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('${e}'); background-position: center; background-size: cover; z-index: 1; filter: brightness(0.9);"></div>
                <div class="premium-banner-overlay-1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%); z-index: 2;"></div>
                <div class="premium-banner-overlay-2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.45; mix-blend-mode: multiply; z-index: 3; background: ${n.gradient};"></div>
                <div class="premium-banner-glow" style="position: absolute; bottom: -50px; right: -50px; width: 300px; height: 300px; filter: blur(40px); z-index: 3; opacity: 0.6; border-radius: 50%; background: radial-gradient(circle, ${n.border} 0%, transparent 70%);"></div>
                <div class="premium-banner-content" style="position: relative; z-index: 4; padding-left: 20px; border-left: 6px solid ${n.border};">
                  <h3 class="premium-banner-title" style="margin: 0; color: #ffffff; font-size: 2rem; font-weight: 700; font-family: 'Playfair Display', serif; text-shadow: 0px 4px 12px rgba(0,0,0,0.8);">${n.title}</h3>
                  <p class="premium-banner-enquiry" style="margin: 8px 0 0 0; color: #f8fafc; font-size: 1.05rem; font-style: italic; max-width: 800px; font-weight: 300; text-shadow: 0px 2px 8px rgba(0,0,0,0.8);">${n.enquiry}</p>
                </div>
              </div>
            </div>
          `}else r+=`
            <h2 style="margin-top: 40px; margin-bottom: 20px; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 10px;">
              ${e}
            </h2>
          `;r+=`<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; align-items: stretch;">`}r+=O(t,n)}),i||(r+=`</div>`),n.insertAdjacentHTML(`beforeend`,r)}else{let e=document.createElement(`div`);e.style.display=`grid`,e.style.gridTemplateColumns=`repeat(auto-fill, minmax(280px, 1fr))`,e.style.gap=`25px`,e.style.alignItems=`stretch`;let r=``;t.forEach((e,t)=>{r+=O(e,t)}),e.innerHTML=r,n.appendChild(e)}e.appendChild(n)}console.log(`ROUTER RUNNING`);var A=new URLSearchParams(window.location.search).get(`id`);window.currentUnitId=A,A?fetch(`/data/${A}.json?v=${Date.now()}`).then(e=>e.ok?e:fetch(`/public/data/${A}.json?v=${Date.now()}`)).then(e=>{if(!e.ok)throw Error(`Unit not found`);return e.json()}).then(e=>{let t={};t[A]=e,window.db=t;let n=t[A].data||{};if(n.title){document.title=n.title;let e=document.querySelector(`.header-title-container h1`);e&&(e.textContent=n.title)}b(n);{let e=document.getElementById(`sidebar-nav-container`);if(e){if(n.timeline){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-timeline" style="margin-right: 8px;"></i> Timeline`,t.href=`#`,t.onclick=e=>{if(e.preventDefault(),e.isTrusted!==!1){let e=new URL(window.location);e.searchParams.set(`tab`,`timeline`),history.pushState({customTab:`timeline`},``,e)}document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let r=document.getElementById(`content-area`);r.innerHTML=``,E(r,n.timeline,n),r&&r.scrollTo({top:0,behavior:`smooth`})},e.appendChild(t)}if(n.terminology){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-spell-check" style="margin-right: 8px;"></i> Terminology Match`,t.href=`#`,t.onclick=e=>{if(e.preventDefault(),e.isTrusted!==!1){let e=new URL(window.location);e.searchParams.set(`tab`,`terminology`),history.pushState({customTab:`terminology`},``,e)}document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let r=document.getElementById(`content-area`);r.innerHTML=``,D(r,n.terminology),r&&r.scrollTo({top:0,behavior:`smooth`})},e.appendChild(t)}let r=t[A].data&&t[A].data.key_individuals||t[A].biographies;if(r){let t=r.filter(e=>!e.group||e.group===`Historical Figures`||e.group!==`Historians`);if(t.length>0){let n=document.createElement(`a`);n.className=`lesson-link`,n.innerHTML=`<i class="fa-solid fa-users" style="margin-right: 8px;"></i> Historical Individuals`,n.href=`#`,n.onclick=e=>{if(e.preventDefault(),e.isTrusted!==!1){let e=new URL(window.location);e.searchParams.set(`tab`,`historical_individuals`),history.pushState({customTab:`historical_individuals`},``,e)}document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`);let r=document.getElementById(`content-area`);r.innerHTML=``,o(r,t,`Historical Individuals`,`Profiles of the major historical figures who shaped these events.`),r&&r.scrollTo({top:0,behavior:`smooth`})},e.appendChild(n)}let n=r.filter(e=>e.group===`Historians`);if(n.length>0){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-book-open-reader" style="margin-right: 8px;"></i> Historians`,t.href=`#`,t.onclick=e=>{if(e.preventDefault(),e.isTrusted!==!1){let e=new URL(window.location);e.searchParams.set(`tab`,`historians`),history.pushState({customTab:`historians`},``,e)}document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let r=document.getElementById(`content-area`);r.innerHTML=``,o(r,n,`Historians`,`Academic perspectives and historical interpretations.`),r&&r.scrollTo({top:0,behavior:`smooth`})},e.appendChild(t)}}let i=t[A].data&&t[A].data.geographical_locations;if(i){let t=document.createElement(`a`);t.className=`lesson-link`,t.innerHTML=`<i class="fa-solid fa-earth-americas" style="margin-right: 8px;"></i> Geographical Locations`,t.href=`#`,t.onclick=e=>{if(e.preventDefault(),e.isTrusted!==!1){let e=new URL(window.location);e.searchParams.set(`tab`,`geographical_locations`),history.pushState({customTab:`geographical_locations`},``,e)}document.querySelectorAll(`.lesson-link`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let n=document.getElementById(`content-area`);n.innerHTML=``,k(n,i),n&&n.scrollTo({top:0,behavior:`smooth`})},e.appendChild(t)}if(n.type!==`trip`){let t=(e,t,n,r,i=!1)=>{let a=document.createElement(`a`);return a.className=`lesson-link`+(i?` sub-link`:``),i&&(a.style.paddingLeft=`2rem`,a.style.fontSize=`0.9em`,a.style.borderLeft=`2px solid var(--gold)`,a.style.background=`rgba(0,0,0,0.02)`,a.style.marginBottom=`2px`),a.innerHTML=`<div style="display:flex; flex-direction:column;"><div><i class="fa-solid ${t}" style="margin-right: 8px;"></i> ${e}</div><div style="font-size: 0.75em; font-weight: normal; margin-top: 4px; opacity: 0.8; line-height: 1.2;">${n}</div></div>`,a.href=r,a.target=`_blank`,a},r=(r,i,a,o)=>{let s=document.createElement(`div`),c=document.createElement(`a`);c.className=`lesson-link`,c.innerHTML=`<div style="display:flex; flex-direction:column; width:100%;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div><i class="fa-solid ${i}" style="margin-right: 8px;"></i> ${r}</div>
              <i class="fa-solid fa-chevron-down" style="font-size:0.8em; opacity:0.6;"></i>
            </div>
            <div style="font-size: 0.75em; font-weight: normal; margin-top: 4px; opacity: 0.8; line-height: 1.2;">${a}</div>
          </div>`,c.href=`#`;let l=document.createElement(`div`);l.style.display=`none`,l.style.flexDirection=`column`,c.onclick=e=>{e.preventDefault(),l.style.display=l.style.display===`none`?`flex`:`none`;let t=c.querySelector(`.fa-chevron-down, .fa-chevron-up`);t&&(t.className=l.style.display===`none`?`fa-solid fa-chevron-down`:`fa-solid fa-chevron-up`)},n.workbooks.forEach(e=>{let n=e.id||e.name,r=`/pdfs/`+A+`_`+o+`_`+n+`.pdf`,i=t(e.title,`fa-file-pdf`,``,r,!0);i.querySelector(`div > div:nth-child(2)`).style.display=`none`,l.appendChild(i)}),s.appendChild(c),s.appendChild(l),e.appendChild(s)};n.workbooks&&n.workbooks.length>0?(r(`Textbook PDFs`,`fa-book-open`,`Reading material only`,`textbook`),r(`Guided Workbook PDFs`,`fa-pencil`,`Reading + Writing tasks`,`workbook`),r(`Pupil Workbook PDFs`,`fa-user-pen`,`Writing tasks only`,`pupil_workbook`)):(e.appendChild(t(`Textbook PDF`,`fa-book-open`,`Reading material only`,`/pdfs/`+A+`_textbook.pdf`)),e.appendChild(t(`Guided Workbook PDF`,`fa-pencil`,`Reading + Writing tasks`,`/pdfs/`+A+`_workbook.pdf`)),e.appendChild(t(`Pupil Workbook PDF`,`fa-user-pen`,`Writing tasks only`,`/pdfs/`+A+`_pupil_workbook.pdf`)))}}}if(n.type===`trip`){let e=document.createElement(`style`);e.innerHTML=`
      :root {
        --primary: #7f1d1d !important;
        --secondary: #991b1b !important;
        --accent: #dc2626 !important;
        --gold: #d4af37 !important;
        --light-bg: #fdfaf6 !important;
      }
      body {
        background-color: #faf8f5 !important;
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.15' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E") !important;
      }
      h1, h2, h3, h4, .hero-title {
        font-family: 'Playfair Display', serif !important;
      }
      .lesson-banner { border-bottom: 5px solid var(--primary) !important; }
    `,document.head.appendChild(e)}setTimeout(()=>{let e=document.getElementById(`page-curtain`);e&&e.classList.add(`hidden`)},100)}).catch(e=>{console.error(`Error loading unit:`,e),document.body.innerHTML=`<div style="padding: 40px; text-align: center;"><h1 style="color: #ef4444;">Unit Error</h1><p>Sorry, an error occurred while loading this unit.</p><pre style="text-align: left; background: #fee2e2; padding: 15px; border-radius: 6px; color: #991b1b; max-width: 800px; margin: 20px auto; overflow: auto;">${e.stack||e.message||e}</pre><br><a href="/" style="padding: 10px 20px; background: #002855; color: white; text-decoration: none; border-radius: 6px;">Return to Dashboard</a></div>`}):document.body.innerHTML=`<h1>Unit not found</h1><p>Please return to the <a href="/">Dashboard</a>.</p>`,window.navigateBack=function(){let e=document.getElementById(`page-curtain`);e&&e.classList.remove(`hidden`),setTimeout(()=>{window.location.href=`/`},350)},setTimeout(()=>{let e=document.getElementById(`unit-sidebar-toggle-btn`),t=document.getElementById(`sidebar`);if(e&&t){let n=document.querySelector(`.sidebar-overlay`);n||(n=document.createElement(`div`),n.className=`sidebar-overlay`,document.body.appendChild(n));let r=()=>{t.classList.toggle(`mobile-open`),n.classList.toggle(`active`)};e.addEventListener(`click`,r),n.addEventListener(`click`,r),t.addEventListener(`click`,e=>{window.innerWidth<=768&&e.target.closest(`a`)&&(t.classList.remove(`mobile-open`),n.classList.remove(`active`))})}},100);export{y as t};