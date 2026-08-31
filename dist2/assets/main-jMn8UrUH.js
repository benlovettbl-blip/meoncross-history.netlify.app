import{a as e,i as t,n,o as r,t as i}from"./preload-helper-BA9YgAzt.js";var a={auth:{clientId:`00000000-0000-0000-0000-000000000000`,authority:`https://login.microsoftonline.com/your-school-tenant-id`,redirectUri:window.location.origin,postLogoutRedirectUri:window.location.origin},cache:{cacheLocation:`localStorage`,storeAuthStateInCookie:!0}};function o(){console.log(`Initializing Microsoft SSO configuration with tenant...`,a.auth.authority);let e=localStorage.getItem(`user_profile`);(!e||e.includes(`Meoncross`))&&s(`Admin`)}function s(e){let t={username:`student@history-app.local`,name:`Student`,yearGroup:e,tenant:`history-app.local`};return localStorage.setItem(`user_profile`,JSON.stringify(t)),t}function c(){let e=localStorage.getItem(`user_profile`);return e?JSON.parse(e):null}function l(){return window.db?Object.keys(window.db).map(e=>({id:e,...window.db[e].data})):[]}function u(){let e=document.getElementById(`main-content`),t=document.getElementById(`content-area`);t&&(t.style.paddingTop=`2rem`);let n=c();r.allQuestions&&r.allQuestions.length;let i=0,a=0,o={1:0,2:0,3:0,4:0,5:0};r.mastery&&Object.values(r.mastery).forEach(e=>{e.status===`mastered`?i++:e.status===`secured`&&a++;let t=e.leitnerBox||1;o[t]!==void 0&&o[t]++});let s=document.querySelector(`.header-right`);s&&(s.style.flex=`1`,s.style.display=`flex`,s.style.justifyContent=`space-between`,s.style.alignItems=`center`,s.innerHTML=`
      <div style="font-size: 1.35rem; font-family: 'Playfair Display', serif; font-weight: 800; color: #1e3a8a; display: flex; align-items: center; gap: 12px; margin-left: 20px;">
        <i class="fa-solid fa-graduation-cap" style="color: #3b82f6;"></i>
        Mr Lovett's History Hub
      </div>
      <div style="display: flex; gap: 8px; align-items: center; font-size: 0.85rem; flex-wrap: wrap; justify-content: flex-end;">
        <span style="font-weight: 600; color: #334155; margin-right: 5px;">Welcome back, ${n?n.name:`Student`}</span>
        <span style="background: #fef3c7; color: #d97706; padding: 3px 8px; border-radius: 6px; font-weight: 700; border: 1px solid #fde68a;"><i class="fa-solid fa-fire"></i> ${r.dailyXp} XP</span>
        <span style="background: #dcfce7; color: #166534; padding: 3px 8px; border-radius: 6px; font-weight: 700; border: 1px solid #bbf7d0;"><i class="fa-solid fa-graduation-cap"></i> ${i} Mastered</span>
        <span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 6px; font-weight: 700; border: 1px solid #bae6fd;"><i class="fa-solid fa-shield-halved"></i> ${a} Secured</span>
      </div>
    `);let u=`
  `,d=l(),f=[`water_and_sanitation`,`medieval_england`,`early_modern_world`,`industrialisation_and_empire`,`australia`,`great_war`,`great_war_part2`,`second_world_war`,`the_shoah`,`cold_war`,`post_war_britain`],p=d.filter(e=>f.includes(e.id)).sort((e,t)=>f.indexOf(e.id)-f.indexOf(t.id)),m=[`edexcel_medicine`,`eee`,`cme_new`,`weimar_nazi_germany`],h=d.filter(e=>m.includes(e.id)).sort((e,t)=>m.indexOf(e.id)-m.indexOf(t.id)),g=[`trip_ypres`],_=d.filter(e=>g.includes(e.id)).sort((e,t)=>g.indexOf(e.id)-g.indexOf(t.id)),v=(e,t)=>{e.icon,e.color,e.bg;let n=e.title||e.id,r=e.desc||e.enquiry||`Historical enquiry.`;e.category,e.yearGroup;let i=e.homepage_background||e.cover_image||``,a=n,o=e.enquiry_question||r;(n.includes(`KS3:`)||e.enquiry_question)&&(a=e.enquiry_question||r,o=n);let s=e.id===`edexcel_medicine`||e.id===`eee`?`center 10%`:`center`,c=[`second_world_war`,`the_shoah`,`cold_war`,`post_war_britain`].includes(e.id)?`<div style="position: absolute; top: 10px; right: 10px; background: #fef08a; color: #854d0e; border: 1px solid #eab308; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; z-index: 10; box-shadow: 0 2px 5px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 5px;"><i class="fa-solid fa-person-digging"></i> Under Construction</div>`:``;u+=`
      <div class="module-card " style="animation-delay: ${t*.1}s; cursor: pointer; position: relative;" onclick="if(true) { window.launchSubApp('${e.id}'); } else { window.launchSubApp('${e.id}'); }">
        ${c}
        ${i?`<div class="module-card-img" style="background-image: url('${i}'); background-position: ${s}; background-size: cover;"></div>`:`<div class="module-card-img" style="background: var(--primary);"></div>`}
        <div style="position: relative; z-index: 2; padding: 0; flex-grow: 1; display: flex; flex-direction: column;">
          <div class="module-header" style="margin-bottom: 8px;">
          </div>
          <div style="display: flex; gap: 14px; align-items: flex-start; flex-grow: 1;">
            <div style="flex-grow: 1; min-width: 0;">
              <h4 style="margin: 0 0 4px 0; font-size: 0.95rem; font-weight: 600; line-height: 1.25; color: inherit; font-family: 'Playfair Display', serif;">${a}</h4>
              <p style="margin: 0; font-size: 0.8rem; line-height: 1.4; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; opacity: 0.9;">${o}</p>
            </div>
          </div>
        </div>
        
        <div class="module-actions" style="margin-top: auto; padding: 0; position: relative; z-index: 2;">
          <button class="btn btn-sm btn-primary w-full" onclick="window.launchSubApp('${e.id}')">
            <i class="fa-solid fa-circle-play"></i> Launch Study App
          </button>
        </div>
      </div>
    `};_.length>0&&_.forEach((e,t)=>{let n=e.homepage_background||e.cover_image||`images/stubbington_memorial.jpg`;u+=`
        <div class="featured-trip-banner" style="display: flex; flex-wrap: wrap; width: 100%; margin-top: 2.5rem; margin-bottom: 2.5rem; background: var(--bg-card, #ffffff); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid var(--border-glass, #e2e8f0); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="flex: 2; min-width: 300px; padding: 40px 50px; display: flex; flex-direction: column; justify-content: center;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 2.4rem; color: var(--primary, #1e3a8a); margin: 0 0 12px 0; line-height: 1.2;">Featured Battlefield Tour: Ypres & The Salient</h2>
            <p style="font-size: 1.1rem; color: var(--text-secondary, #475569); margin: 0 0 25px 0; max-width: 90%; line-height: 1.6;">
              ${e.desc||e.enquiry_question||e.enquiry||`Join us on our historical expedition to the Western Front. Explore the trenches, honor the fallen, and understand the realities of WW1.`}
            </p>
            <div style="display: flex; gap: 15px; margin-bottom: 30px; flex-wrap: wrap;">
              <span style="background: rgba(59, 130, 246, 0.1); color: #2563eb; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;"><i class="fa-solid fa-calendar-days"></i> 1st-4th Oct 2026</span>
              <span style="background: rgba(16, 185, 129, 0.1); color: #059669; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;"><i class="fa-solid fa-map-location-dot"></i> Itinerary</span>
              <span style="background: rgba(245, 158, 11, 0.1); color: #d97706; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;"><i class="fa-solid fa-suitcase-rolling"></i> Prep Pack</span>
              <span style="background: rgba(139, 92, 246, 0.1); color: #7c3aed; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;"><i class="fa-solid fa-book-open-reader"></i> Site Guide</span>
            </div>
            <div>
              <button class="btn btn-primary" style="padding: 14px 28px; font-size: 1.15rem; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3); border-radius: 8px; font-weight: 600; cursor: pointer; border: none; background: #2563eb; color: white; transition: background 0.2s;" onclick="window.launchSubApp('${e.id}')" onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
                <i class="fa-solid fa-compass" style="margin-right: 8px;"></i> Launch Tour App
              </button>
            </div>
          </div>
          <div style="flex: 1; min-width: 300px; min-height: 350px; background-image: url('${n}'); background-position: center; background-size: cover; border-left: 4px solid var(--primary, #1e3a8a);"></div>
        </div>
      `}),p.length>0&&(u+=`
      <h3 class="section-title">Key Stage 3</h3>
      <div class="modules-grid" style="margin-bottom: 2rem;">
    `,p.forEach(v),u+=`</div>`),h.length>0&&(u+=`
      <h3 class="section-title">GCSE (Years 10 & 11)</h3>
      <div class="modules-grid">
    `,h.forEach(v),u+=`
      <div class="module-card" style="animation-delay: 0.5s; cursor: pointer;" onclick="window.open('https://edexcelgcsehistoryusa.netlify.app/', '_blank')">
        <div class="module-card-img" style="background-image: url('/images/mlk_washington.jpg'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); font-size: 4rem;">
            <i class="fa-solid fa-flag-usa"></i>
        </div>
        <div style="position: relative; z-index: 2; padding: 0; flex-grow: 1; display: flex; flex-direction: column;">
          <div class="module-header" style="margin-bottom: 8px;">
          </div>
          <div style="display: flex; gap: 14px; align-items: flex-start; flex-grow: 1;">
            <div style="flex-grow: 1; min-width: 0;">
              <h4 style="margin: 0 0 4px 0; font-size: 0.95rem; font-weight: 600; line-height: 1.25; color: inherit; font-family: 'Playfair Display', serif;">USA 1954–75 (Legacy App)</h4>
              <p style="margin: 0; font-size: 0.8rem; line-height: 1.4; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; opacity: 0.9;">Conflict at Home and Abroad (Legacy access for current Year 11s)</p>
            </div>
          </div>
        </div>
        
        <div class="module-actions" style="margin-top: auto; padding: 0; position: relative; z-index: 2;">
          <button class="btn btn-sm btn-primary w-full">
            <i class="fa-solid fa-external-link-alt"></i> Open Legacy App
          </button>
        </div>
      </div>
    `,u+=`</div>`),e.innerHTML=u}function d(){let e=document.getElementById(`main-content`),t=c(),n=r.allQuestions?r.allQuestions.length:0,i={1:0,2:0,3:0,4:0,5:0};r.mastery&&Object.values(r.mastery).forEach(e=>{let t=e.leitnerBox||1;i[t]!==void 0&&i[t]++}),e.innerHTML=`
    <div class="card max-w-md mx-auto" style="margin-bottom: 2rem;">
      <h3><i class="fa-solid fa-user-circle"></i> Microsoft SSO Student Profile</h3>
      <p class="text-muted">Simulated tenant environment: <strong>history-app.local</strong></p>
      
      <div class="profile-details">
        <div class="form-group">
          <label>Microsoft Account Email</label>
          <input type="text" class="form-control" value="${t?t.username:``}" disabled />
        </div>
        <div class="form-group">
          <label>Display Name</label>
          <input type="text" class="form-control" value="${t?t.name:``}" disabled />
        </div>
        <div class="form-group">
          <label>Assigned Year Group unit authorization</label>
          <select id="profile-year-group" class="form-control" onchange="window.updateProfileYearGroup(this.value)">
            <option value="Year 7" ${t&&t.yearGroup===`Year 7`?`selected`:``}>Year 7 (Norman Conquest)</option>
            <option value="Year 8" ${t&&t.yearGroup===`Year 8`?`selected`:``}>Year 8 (Changes 1450-1750)</option>
            <option value="Year 9" ${t&&t.yearGroup===`Year 9`?`selected`:``}>Year 9 (Great War)</option>
            <option value="GCSE" ${t&&t.yearGroup===`GCSE`?`selected`:``}>GCSE (USA 1954-1975)</option>
            <option value="Admin" ${t&&t.yearGroup===`Admin`?`selected`:``}>Admin (Unlock All Modules)</option>
          </select>
        </div>
      </div>
      
      <div style="margin-top: 24px;">
        <button class="btn btn-secondary w-full" onclick="window.switchView('dashboard')">Save and Return</button>
      </div>
    </div>

    <!-- Leitner Box spaced repetition distribution -->
    <div class="card leitner-card max-w-md mx-auto">
      <h3><i class="fa-solid fa-brain"></i> Memory Spaced Repetition Distribution</h3>
      <div class="leitner-distribution">
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 1 (New)</span>
          <div class="bar-container"><div class="bar-fill bg-danger" style="width: ${n?i[1]/n*100:0}%"></div></div>
          <span class="bar-count">${i[1]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 2 (Learning)</span>
          <div class="bar-container"><div class="bar-fill bg-warning" style="width: ${n?i[2]/n*100:0}%"></div></div>
          <span class="bar-count">${i[2]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 3 (Securing)</span>
          <div class="bar-container"><div class="bar-fill bg-info" style="width: ${n?i[3]/n*100:0}%"></div></div>
          <span class="bar-count">${i[3]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 4 (Retained)</span>
          <div class="bar-container"><div class="bar-fill bg-primary" style="width: ${n?i[4]/n*100:0}%"></div></div>
          <span class="bar-count">${i[4]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 5 (Mastered)</span>
          <div class="bar-container"><div class="bar-fill bg-success" style="width: ${n?i[5]/n*100:0}%"></div></div>
          <span class="bar-count">${i[5]}</span>
        </div>
      </div>
    </div>
  `}window.updateProfileYearGroup=function(e){s(e),u()},window.launchSubApp=function(e){let t=document.getElementById(`page-curtain`);t&&t.classList.remove(`hidden`),setTimeout(()=>{if(e===`gcse_middle_east_1945_1995`){window.location.href=`/cme/`;return}if(e===`gcse_usa_1954_1975`){window.location.href=`/usa/`;return}let t=e;e===`gcse_middle_east_1945_1995_new`&&(t=`cme_new`),e===`gcse_elizabethan_england`&&(t=`eee`),e===`great_war_v2`&&(t=`great_war`),window.location.href=`/unit?id=${t}`},350)};function f(){let e=document.getElementById(`main-content`),t=r.activeUnitData;if(!t||!t.quizData||t.quizData.length===0){e.innerHTML=`
      <div class="card text-center">
        <p>No quiz questions available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;return}let n=t.quizData,i=n[Math.floor(Math.random()*n.length)],a=[i.answer,...i.distractors].sort(()=>Math.random()-.5);e.innerHTML=`
    <div class="card max-w-lg mx-auto quiz-container">
      <div class="quiz-header">
        <span class="quiz-badge">Interactive Recall Quiz</span>
        <button class="btn btn-outline btn-sm" onclick="window.toggleBookmarkQuestion('${i.id}')">
          <i class="${r.bookmarks.includes(i.id)?`fa-solid`:`fa-regular`} fa-bookmark"></i>
        </button>
      </div>
      <h3 class="quiz-question">${i.question}</h3>
      <div class="quiz-options">
        ${a.map(e=>`
          <button class="btn btn-block btn-quiz-opt" onclick="window.submitQuizAnswer('${i.id}', '${e.replace(/'/g,`\\'`)}', this)">
            ${e}
          </button>
        `).join(``)}
      </div>
      <div id="quiz-feedback" class="quiz-feedback hidden"></div>
      <div style="margin-top: 24px; display: flex; justify-content: space-between;">
        <button class="btn btn-secondary" onclick="window.switchView('dashboard')">Exit Quiz</button>
        <button class="btn btn-primary" onclick="window.switchView('interactive', '${r.selectedUnitId}')">Next Question &rarr;</button>
      </div>
    </div>
  `}window.toggleBookmarkQuestion=function(e){t(e),f()},window.submitQuizAnswer=function(t,n,i){let a=r.activeUnitData.quizData.find(e=>e.id===t);if(!a)return;let o=n===a.answer;e(t,o),document.querySelectorAll(`.btn-quiz-opt`).forEach(e=>{e.disabled=!0,e.innerText.trim()===a.answer?e.classList.add(`btn-success`):e===i&&!o&&e.classList.add(`btn-danger`)});let s=document.getElementById(`quiz-feedback`);s.innerHTML=`
    <strong>${o?`✅ Correct Answer!`:`❌ Incorrect.`}</strong>
    <p>${a.explanation}</p>
  `,s.classList.remove(`hidden`)};function p(){let e=document.getElementById(`main-content`),t=r.activeUnitData.timelineEvents;if(!t||t.length===0){e.innerHTML=`
      <div class="card text-center">
        <h3><i class="fa-solid fa-timeline"></i> Timeline</h3>
        <p>No historical events listed in this module's timeline.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;return}e.innerHTML=`
    <div class="card">
      <h3 style="margin-bottom: 24px;"><i class="fa-solid fa-timeline text-primary"></i> Interactive Chronology Timeline</h3>
      <div class="timeline-wrapper">
        ${[...t].sort((e,t)=>parseInt(e.year,10)-parseInt(t.year,10)).map((e,t)=>`
          <div class="timeline-item ${t%2==0?`left`:`right`}">
            <div class="timeline-badge">${e.year}</div>
            <div class="timeline-panel">
              <h4>${e.year}</h4>
              <p>${e.text}</p>
            </div>
          </div>
        `).join(``)}
      </div>
    </div>
  `}function m(){let e=document.getElementById(`main-content`),t=r.activeUnitData;e.innerHTML=`
    <div class="no-print" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h3>Workbook & Booklet Preview</h3>
        <p class="text-muted">Printable A4 classroom layout generated dynamically from master Markdown files.</p>
      </div>
      <button class="btn btn-primary" onclick="window.printBooklet()">
        <i class="fa-solid fa-print"></i> Print / Save as PDF
      </button>
    </div>

    <!-- Printable A4 Wrapper -->
    <div class="print-booklet-a4" id="booklet-a4-content">
      <div class="booklet-header">
        <span class="school-title">MR LOVETT'S HISTORY HUB</span>
        <span class="unit-title">${t.metadata.title}</span>
      </div>
      
      <h1 class="booklet-main-title">${t.metadata.title}</h1>
      <p class="booklet-subtitle">Classroom Recall Study Pack — target: ${t.metadata.year_group}</p>
      
      <hr />

      ${t.subtopics.map(e=>`
        <div class="booklet-section">
          <h2>${e.title}</h2>
          <div class="booklet-body-text">
            ${e.content.replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`).replace(/\n/g,`<br />`)}
          </div>
          
          ${e.part2.length>0?`
            <div class="booklet-vocab-block">
              <h3>Vocabulary & Key Terms</h3>
              <table class="booklet-table">
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Definition</th>
                  </tr>
                </thead>
                <tbody>
                  ${e.part2.map(e=>`
                    <tr>
                      <td><strong>${e.term}</strong></td>
                      <td>${e.def}</td>
                    </tr>
                  `).join(``)}
                </tbody>
              </table>
            </div>
          `:``}
          
          ${e.part3.length>0?`
            <div class="booklet-tf-block">
              <h3>Core recall Statements (True / False)</h3>
              <ul>
                ${e.part3.map(e=>`
                  <li>[ &nbsp; &nbsp; ] &nbsp; ${e.text} </li>
                `).join(``)}
              </ul>
            </div>
          `:``}
        </div>
      `).join(``)}
    </div>
  `}window.printBooklet=function(){window.print()};async function h(){let e=document.getElementById(`main-content`),t=r.selectedUnitId||`gcse_usa_1954_1975`,n=[];if(t===`gcse_middle_east_1945_1995`?n=(await i(()=>import(`./decisions_data-BFH7icKd.js`),[])).DECISIONS_DATA:t===`gcse_usa_1954_1975`&&(n=(await i(()=>import(`./decisions_data-D-RDO2nC.js`),[])).DECISIONS_DATA),n.length===0){e.innerHTML=`
      <div class="card text-center">
        <h3><i class="fa-solid fa-phone-volume"></i> Decision Simulator</h3>
        <p>No decision scenarios available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;return}window.playDecisionsScenario=function(r){let i=n.find(e=>e.id===r);i&&(e.innerHTML=`
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 1: Initial Response</span>
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('decisions', '${t}')">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${i.title}</h2>
        <div style="font-size: 0.9rem; margin-bottom: 14px; font-weight: 600; opacity: 0.8;">Active Role: ${i.role}</div>

        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px;">
          <strong>THE CRISIS:</strong><br />
          ${i.crisis}
        </div>

        <div class="quiz-options">
          <button class="btn btn-block btn-quiz-opt" onclick="window.playDecisionsPhase2('${i.id}', 'A')">
            <strong>Choice A:</strong> ${i.phase1.choiceA.text}
          </button>
          <button class="btn btn-block btn-quiz-opt" onclick="window.playDecisionsPhase2('${i.id}', 'B')">
            <strong>Choice B:</strong> ${i.phase1.choiceB.text}
          </button>
        </div>
      </div>
    `)},window.playDecisionsPhase2=function(r,i){let a=n.find(e=>e.id===r);if(!a)return;let o=i===`A`?a.phase1.choiceA:a.phase1.choiceB;e.innerHTML=`
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 2: The Fallout</span>
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('decisions', '${t}')">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${a.title}</h2>
        
        <div style="border: 1px solid var(--border-glass); padding: 12px; border-radius: var(--border-radius-sm); font-size: 0.9rem; color: var(--text-muted);">
          <strong>Your Choice:</strong> ${o.text}
        </div>

        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px; border-left: 4px solid var(--accent);">
          <strong>THE FALLOUT:</strong><br />
          ${o.fallout}
        </div>

        <div class="quiz-options">
          <button class="btn btn-block btn-quiz-opt" onclick="window.playDecisionsPhase3('${a.id}', '${i}', '1')">
            <strong>Choice ${i}1:</strong> ${o.choice1.text}
          </button>
          <button class="btn btn-block btn-quiz-opt" onclick="window.playDecisionsPhase3('${a.id}', '${i}', '2')">
            <strong>Choice ${i}2:</strong> ${o.choice2.text}
          </button>
        </div>
      </div>
    `},window.playDecisionsPhase3=function(r,i,a){let o=n.find(e=>e.id===r);if(!o)return;let s=i===`A`?o.phase1.choiceA:o.phase1.choiceB,c=a===`1`?s.choice1:s.choice2;e.innerHTML=`
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 3: The Verdict</span>
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('decisions', '${t}')">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${o.title}</h2>
        
        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px; border-left: 4px solid ${c.isHistorical?`var(--primary)`:`var(--accent)`};">
          <h4 style="margin-bottom: 8px;">${c.isHistorical?`🏆 Historical Path Followed`:`⚠️ Deviated from History`}</h4>
          ${c.verdict}
        </div>

        <div style="display: flex; justify-content: space-between;">
          <button class="btn btn-secondary" onclick="window.switchView('decisions', '${t}')">Another Scenario</button>
          <button class="btn btn-primary" onclick="window.switchView('dashboard')">Exit Simulator</button>
        </div>
      </div>
    `},e.innerHTML=`
    <div class="card">
      <h3 style="margin-bottom: 8px;"><i class="fa-solid fa-phone-volume text-primary"></i> Decision-Making Simulation</h3>
      <p class="text-muted" style="margin-bottom: 24px;">Put yourself in the shoes of historical figures facing critical turning points.</p>
      
      <div class="modules-grid">
        ${n.map(e=>`
          <div class="module-card">
            <div class="module-header">
              <span class="category-badge">${e.series}</span>
              <i class="${e.icon}" style="color: var(--primary);"></i>
            </div>
            <h4>${e.title}</h4>
            <p style="font-size: 0.85rem;"><strong>Role:</strong> ${e.role}</p>
            <button class="btn btn-sm btn-primary w-full" onclick="window.playDecisionsScenario('${e.id}')">
              Start Simulation
            </button>
          </div>
        `).join(``)}
      </div>
    </div>
  `}async function g(){let e=document.getElementById(`main-content`),t=window.currentUnitId||r.selectedUnitId||`cme_new`,n=[];if(t===`cme_new`||t===`gcse_middle_east_1945_1995`){let e=await i(()=>import(`./taboo_data-SF72libF.js`),[]);Object.keys(e.TABOO_CARDS).forEach(r=>{e.TABOO_CARDS[r].forEach(e=>{n.push({id:`taboo_${t}_${e.target.replace(/\s+/g,`_`)}`,topic:r,target:e.target.toUpperCase(),taboo:e.taboo,hint:`Recall this key ${r} from the course.`})})})}else if(t===`eee`||t===`gcse_elizabethan_england`){let e=(await i(()=>import(`./data-DEvEzKOh.js`),[])).timelineData,t=1;e.forEach(e=>{e.events.forEach(r=>{if(r.subtitle&&r.text){let i=r.subtitle.toUpperCase(),a=[...r.names||[],...r.stats||[]].slice(0,5).map(e=>e.replace(/\(.*?\)/g,``).trim()).filter(Boolean),o=r.text.split(`.`)[0]+`.`;a.length>=2&&n.push({id:`taboo_eee_${t++}`,topic:e.title,target:i,taboo:a,hint:o})}})})}if(n.length===0){e.innerHTML=`
      <div class="card text-center">
        <h3><i class="fa-solid fa-tags"></i> Taboo Recall</h3>
        <p>No Taboo recall cards available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;return}window.showTabooCard=function(t){let r=n[t];e.innerHTML=`
      <div class="card max-w-md mx-auto text-center" style="display: flex; flex-direction: column; gap: 20px; border: 2px solid var(--primary); padding: 32px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">${r.topic}</span>
        
        <div style="background-color: var(--bg-app); border: 2px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 24px; box-shadow: var(--shadow-sm);">
          <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); letter-spacing: 0.5px;">${r.target}</h2>
        </div>

        <div style="border-top: 1px solid var(--border-glass); border-bottom: 1px solid var(--border-glass); padding: 18px 0;">
          <h4 style="text-transform: uppercase; font-size: 0.85rem; color: var(--accent); margin-bottom: 12px; letter-spacing: 1px;">Forbidden Taboo Words:</h4>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${r.taboo.map(e=>`<span style="font-size: 1.1rem; font-weight: 700; text-decoration: line-through; opacity: 0.85;">${e}</span>`).join(``)}
          </div>
        </div>

        <div id="taboo-hint-box" style="display: none; background-color: var(--bg-app); padding: 12px; border-radius: var(--border-radius-sm); font-size: 0.85rem; text-align: left;">
          <strong>Context Hint:</strong> ${r.hint}
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn btn-outline" id="btn-show-hint" onclick="document.getElementById('taboo-hint-box').style.display='block'; this.style.display='none';">Show Context Hint</button>
          <div style="display: flex; gap: 10px; justify-content: center; margin-top: 10px;">
            <button class="btn btn-secondary" onclick="window.switchView('dashboard')">Exit Game</button>
            <button class="btn btn-primary" onclick="window.showRandomTabooCard()">Next Card &rarr;</button>
          </div>
        </div>
      </div>
    `},window.showRandomTabooCard=function(){let e=Math.floor(Math.random()*n.length);window.showTabooCard(e)},window.showRandomTabooCard()}async function _(){let e=document.getElementById(`main-content`),t=r.selectedUnitId||`gcse_usa_1954_1975`,n=r.activeUnitData;if(!n||!n.subtopics||n.subtopics.length===0){e.innerHTML=`
      <div class="card text-center">
        <h3><i class="fa-solid fa-book-open"></i> Lessons Study Guide</h3>
        <p>No lessons available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;return}window.viewLessonDetail=function(r){let i=n.subtopics[r],a=i.content.split(`
`).map(e=>{let t=e.trim();return t?t.startsWith(`- **`)&&t.includes(`**:`)?t.replace(/^-\s*\*\*(.*?)\*\*:\s*(.*)/,`<p style="margin: 8px 0; padding-left: 20px;"><strong>&bull; $1</strong>: $2</p>`):t.startsWith(`- `)?`<p style="margin: 6px 0; padding-left: 20px;">&bull; ${t.substring(2)}</p>`:t.startsWith(`### `)?`<h4 style="font-size: 1.15rem; font-weight: 700; color: var(--secondary); margin: 24px 0 12px 0; border-bottom: 1px solid var(--border-glass); padding-bottom: 6px;">${t.substring(4)}</h4>`:t.includes(`<span class="tip-icon">`)?``:t.includes(`**Examiner Tip:**`)?`<div style="background-color: var(--bg-app); border-left: 4px solid var(--accent); padding: 14px; border-radius: var(--border-radius-sm); margin: 18px 0;">
          <strong>💡 Examiner Tip:</strong> ${t.replace(`**Examiner Tip:**`,``).replace(/\*\*/g,``).trim()}
        </div>`:t.includes(`📝 Source `)?`<div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); border-top: 3px solid var(--primary); padding: 16px; border-radius: var(--border-radius-sm); margin: 20px 0; font-family: Georgia, serif;">
          <strong style="display: block; margin-bottom: 8px; color: var(--primary); font-family: var(--font-heading);">${t.replace(/[\*#_]/g,``)}</strong>`:t.startsWith(`"`)&&t.endsWith(`"`)?`<p style="font-style: italic; margin: 0; line-height: 1.5; color: var(--text-muted);">${t.replace(/"/g,``)}</p></div>`:`<p style="line-height: 1.6; margin: 12px 0;">${t.replace(/\*\*/g,`<strong>`).replace(/\*\*/g,`</strong>`)}</p>`:``}).join(`
`);e.innerHTML=`
      <div class="card max-w-2xl mx-auto" style="animation: fadeInUp 0.3s ease-out;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 16px; margin-bottom: 20px;">
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('lessons', '${t}')">
            <i class="fa-solid fa-arrow-left"></i> Lessons Menu
          </button>
          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--primary);">${n.title}</span>
        </div>

        <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px; line-height: 1.3;">${i.title}</h2>
        
        <div class="lesson-content-body" style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6;">
          ${a}
        </div>

        <div style="border-top: 1px solid var(--border-glass); padding-top: 20px; margin-top: 30px; display: flex; justify-content: space-between; gap: 12px;">
          ${r>0?`<button class="btn btn-secondary" onclick="window.viewLessonDetail(${r-1})">&larr; Previous Lesson</button>`:`<span></span>`}
          ${r<n.subtopics.length-1?`<button class="btn btn-primary" onclick="window.viewLessonDetail(${r+1})">Next Lesson &rarr;</button>`:`<button class="btn btn-primary" onclick="window.switchView('interactive', '${t}')">Take Lesson Quiz &rarr;</button>`}
        </div>
      </div>
    `},e.innerHTML=`
    <div class="card" style="animation: fadeInUp 0.3s ease-out;">
      <h3 style="margin-bottom: 8px;"><i class="fa-solid fa-book-open text-primary"></i> ${n.title} - Study Guide</h3>
      <p class="text-muted" style="margin-bottom: 24px;">Read through the core steps, historical sources, and historian's tips for each lesson before testing yourself.</p>
      
      <div class="modules-grid">
        ${n.subtopics.map((e,t)=>{let n=e.content.split(`
`).find(e=>e.trim().length>30&&!e.includes(`#`)&&!e.includes(`*`)&&!e.includes(`<`))||`Study this historical topic.`;return`
            <div class="module-card" style="cursor: pointer;" onclick="window.viewLessonDetail(${t})">
              <div class="module-header">
                <span class="category-badge">Lesson ${t+1}</span>
                <i class="fa-solid fa-book-open" style="color: var(--primary);"></i>
              </div>
              <h4 style="margin: 10px 0;">${e.title}</h4>
              <p style="font-size: 0.85rem; line-height: 1.4; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${n}
              </p>
              <button class="btn btn-sm btn-primary w-full" style="margin-top: 12px;">
                Read Lesson
              </button>
            </div>
          `}).join(``)}
      </div>
    </div>
  `}function v(e,t){let n=e.split(/\n## /),r=n[0].match(/^---\s*\n([\s\S]*?)\n---\s*\n/),i={id:t,title:`Unknown Unit`,year_group:`KS3`,unlocked_for:[]};r&&(r[1].split(`
`).forEach(e=>{let t=e.split(`:`);if(t.length>=2){let e=t[0].trim(),n=t.slice(1).join(`:`).trim();if(e===`unlocked_for`)try{i[e]=JSON.parse(n)}catch{i[e]=n.split(`,`).map(e=>e.trim())}else i[e]=n.replace(/^['"]|['"]$/g,``)}}),n[0]=n[0].replace(/^---\s*\n[\s\S]*?\n---\s*\n/,``));let a=[],o=[],s=[];for(let e=1;e<n.length;e++){let r=n[e].split(`
`),i=r[0].trim(),c=[],l=`${t}_sub_${e}`,u=`content`,d={text:``,words:[]},f=[],p=[],m=null;for(let e=1;e<r.length;e++){let t=r[e].trim();if(t){if(t.startsWith(`### Fill-in-the-Blanks`)){u=`fitb`;continue}else if(t.startsWith(`### Vocabulary`)){u=`vocab`;continue}else if(t.startsWith(`### True or False`)){u=`tf`;continue}else if(t.startsWith(`### Retrieval Questions`)){u=`retrieval`;continue}else if(t.startsWith(`### Timeline`)){u=`timeline`;continue}if(u===`content`)c.push(r[e]);else if(u===`fitb`)t.startsWith(`Text:`)?d.text=t.substring(5).trim():t.startsWith(`Words:`)&&(d.words=t.substring(6).split(`,`).map(e=>e.trim()));else if(u===`vocab`){let e=t.match(/^-\s*\*\*(.*?)\*\*:\s*(.*)/);e&&f.push({term:e[1].trim(),def:e[2].trim()})}else if(u===`tf`){let e=t.match(/^-\s*(.*)\((True|False)\)/i);e&&p.push({text:e[1].trim(),ans:e[2].trim()})}else if(u===`retrieval`)t.startsWith(`- **Question**:`)?(m&&s.push(m),m={id:`q_${l}_${s.length+1}`,question:t.substring(15).trim(),answer:``,explanation:``,distractors:[]}):m&&t.startsWith(`- **Answer**:`)?m.answer=t.substring(13).trim():m&&t.startsWith(`- **Distractor**:`)?m.distractors.push(t.substring(17).trim()):m&&t.startsWith(`- **Explanation**:`)&&(m.explanation=t.substring(18).trim());else if(u===`timeline`){let e=t.match(/^-\s*\*\*(.*?)\*\*:\s*(.*)/);e&&o.push({year:e[1].trim(),text:e[2].trim(),subtopicId:l})}}}m&&s.push(m),a.push({id:l,title:i,content:c.join(`
`),part1:d,part2:f,part3:p})}return{metadata:i,subtopics:a,timelineEvents:o,quizData:s}}async function y(e,t=null,n=!1){if(r.currentView=e,!n){let n=new URL(window.location);n.searchParams.set(`view`,e),t?n.searchParams.set(`unit`,t):n.searchParams.delete(`unit`),window.history.pushState({view:e,unit:t},``,n)}let i=document.getElementById(`header-back-btn`);i&&(e===`dashboard`?i.style.display=`none`:i.style.display=`flex`);let a=document.querySelector(`.header-right`);a&&e!==`dashboard`&&(a.innerHTML=`<span class="school-tag"><i class="fa-solid fa-award"></i> Mr Lovett's History Hub</span>`,a.style.flex=``,a.style.display=``,a.style.justifyContent=``,a.style.alignItems=``);let o=document.getElementById(`header-breadcrumbs`);if(o)if(e===`dashboard`)o.style.display=`none`;else{let t=e.toUpperCase();e===`interactive`&&(t=`Interactive Quiz`),e===`timeline`&&(t=`Chronological Timeline`),e===`booklet`&&(t=`Printable A4 Booklet`),e===`profile`&&(t=`Student Profile`),o.innerHTML=`
        <span onclick="window.switchView('dashboard')" style="cursor: pointer; text-decoration: underline; color: var(--primary);">Dashboard</span>
        <span style="opacity: 0.5;"> / </span>
        <span>${t}</span>
      `,o.style.display=`inline-block`}document.querySelectorAll(`.sidebar-nav .nav-item`).forEach(e=>{e.classList.remove(`active`)});let s=document.getElementById(`nav-${e}`);s&&s.classList.add(`active`),e===`dashboard`?u():e===`profile`?d():e===`interactive`?(t&&await b(t),f()):e===`timeline`?(t&&await b(t),p()):e===`booklet`?(t&&await b(t),m()):e===`decisions`?(t&&await b(t),h()):e===`taboo`?(t&&await b(t),g()):e===`lessons`&&(t&&await b(t),_())}async function b(e){if(r.selectedUnitId===e&&r.activeUnitData.subtopics.length>0)return;r.selectedUnitId=e;let t=e.startsWith(`gcse_`)?`content/gcse/${e}.md`:`content/ks3/${e}.md`;try{let n=await fetch(t);if(!n.ok)throw Error(`Failed to load ${t}`);r.activeUnitData=v(await n.text(),e),r.allQuestions||=[],r.activeUnitData.quizData.forEach(e=>{r.allQuestions.some(t=>t.id===e.id)||r.allQuestions.push(e)});let i=document.getElementById(`nav-decisions`),a=document.getElementById(`nav-taboo`),o=document.getElementById(`nav-lessons`);i&&a&&o&&(e.startsWith(`gcse_`)?(e===`gcse_elizabethan_england`?i.style.display=`none`:i.style.display=`flex`,a.style.display=`flex`,o.style.display=`flex`,i.onclick=()=>y(`decisions`,e),a.onclick=()=>y(`taboo`,e),o.onclick=()=>y(`lessons`,e)):(i.style.display=`none`,a.style.display=`none`,o.style.display=`none`))}catch(t){console.error(`Error loading unit:`,t),alert(`Could not load unit: ${e}. Please ensure the content file exists.`)}}function x(){let e=document.getElementById(`header-back-btn`);e&&e.addEventListener(`click`,e=>{e.preventDefault(),y(`dashboard`)});let t=document.getElementById(`nav-dashboard`);t&&t.addEventListener(`click`,()=>y(`dashboard`));let n=document.getElementById(`nav-profile`);n&&n.addEventListener(`click`,()=>y(`profile`)),document.querySelectorAll(`.theme-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-theme`);r.theme=t,document.documentElement.setAttribute(`data-theme`,t),localStorage.setItem(`history_theme`,t),document.querySelectorAll(`.theme-btn`).forEach(e=>e.classList.remove(`active`)),e.currentTarget.classList.add(`active`)})});let i=document.getElementById(`sidebar-toggle-btn`),a=document.getElementById(`app-sidebar`);if(i&&a){let e=document.querySelector(`.sidebar-overlay`);e||(e=document.createElement(`div`),e.className=`sidebar-overlay`,document.body.appendChild(e));let t=()=>{a.classList.toggle(`mobile-open`),e.classList.toggle(`active`)};i.addEventListener(`click`,t),e.addEventListener(`click`,t),document.querySelectorAll(`.nav-item`).forEach(t=>{t.addEventListener(`click`,()=>{window.innerWidth<=768&&(a.classList.remove(`mobile-open`),e.classList.remove(`active`))})})}let o=document.getElementById(`sidebar-unit-links`);if(o){o.innerHTML=``;let e=l(),t=[`water_and_sanitation`,`change_1450_1750`,`great_war`],n=e.filter(e=>e&&e.title&&typeof e.title==`string`&&e.title.includes(`KS3:`)).sort((e,n)=>{let r=t.indexOf(e.id),i=t.indexOf(n.id);return r===-1&&(r=999),i===-1&&(i=999),r-i}),r=[`edexcel_medicine`,`cme_new`,`weimar_nazi_germany`,`eee`],i=e.filter(e=>e&&e.title&&typeof e.title==`string`&&!e.title.includes(`KS3:`)&&![`trip_ypres`].includes(e.id)).sort((e,t)=>{let n=r.indexOf(e.id),i=r.indexOf(t.id);return n===-1&&(n=999),i===-1&&(i=999),n-i}),a=[`trip_ypres`],s=e.filter(e=>a.includes(e.id)).sort((e,t)=>{let n=a.indexOf(e.id),r=a.indexOf(t.id);return n===-1&&(n=999),r===-1&&(r=999),n-r}),c=(e,t,n=!1)=>{if(t.length===0)return;let r=document.createElement(`div`);r.innerHTML=`<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); font-weight: 600; display: flex; align-items: center; justify-content: space-between;"><span style="flex-grow: 1;">${e}</span><i class="fa-solid fa-chevron-${n?`up`:`down`}" style="transition: transform 0.2s; font-size: 0.7rem;"></i></span>`,r.style.margin=`10px 16px 8px`,r.style.cursor=`pointer`;let i=document.createElement(`div`);i.style.display=n?`block`:`none`,i.style.transition=`all 0.3s ease`,r.addEventListener(`click`,()=>{let e=i.style.display===`block`;i.style.display=e?`none`:`block`;let t=r.querySelector(`i`);e?(t.classList.remove(`fa-chevron-up`),t.classList.add(`fa-chevron-down`)):(t.classList.remove(`fa-chevron-down`),t.classList.add(`fa-chevron-up`))}),o.appendChild(r),o.appendChild(i),t.forEach(e=>{let t=document.createElement(`div`);t.className=`nav-item`,t.style.cursor=`pointer`,t.style.display=`flex`,t.style.alignItems=`center`,t.style.gap=`8px`,t.style.padding=`8px 16px`,t.style.borderRadius=`6px`,t.style.margin=`0 8px 4px 8px`,t.style.color=`rgba(255,255,255,0.85)`,t.addEventListener(`mouseenter`,()=>{t.style.background=`rgba(255,255,255,0.1)`,t.style.color=`#fff`}),t.addEventListener(`mouseleave`,()=>{t.style.background=`transparent`,t.style.color=`rgba(255,255,255,0.85)`}),t.innerHTML=`<i class="fa-solid ${e.id===`great_war`||e.id===`great_war_part2`?`fa-helmet-safety`:`fa-book`}" style="opacity: 0.7; width: 20px; text-align: center;"></i> <span style="font-size: 0.85rem; line-height: 1.2;">${e.title||`Untitled Unit`}</span>`,t.addEventListener(`click`,()=>{window.launchSubApp&&window.launchSubApp(e.id)}),i.appendChild(t)})};c(`School Trips & Tours`,s,!0),c(`Key Stage 3`,n,!0),c(`Key Stage 4`,i,!1)}}function S(){if(document.getElementById(`langemarckModal`))return;let e=document.createElement(`div`);e.id=`langemarckModal`,e.style.position=`fixed`,e.style.top=`0`,e.style.left=`0`,e.style.width=`100vw`,e.style.height=`100vh`,e.style.backgroundColor=`rgba(20, 24, 22, 0.95)`,e.style.zIndex=`999999`,e.style.display=`flex`,e.style.justifyContent=`center`,e.style.alignItems=`center`,e.style.fontFamily=`'Inter', sans-serif`,e.style.opacity=`0`,e.style.transition=`opacity 0.3s ease`,e.style.backdropFilter=`blur(10px)`,e.onclick=t=>{t.target===e&&C()};let t=document.createElement(`div`);t.style.backgroundColor=`#1e2420`,t.style.border=`1px solid #3b473e`,t.style.borderRadius=`12px`,t.style.padding=`30px`,t.style.width=`90%`,t.style.maxWidth=`700px`,t.style.maxHeight=`90vh`,t.style.overflowY=`auto`,t.style.color=`#e2e8f0`,t.style.position=`relative`,t.style.boxShadow=`0 20px 40px rgba(0,0,0,0.6)`;let n=document.createElement(`button`);n.innerHTML=`<i class="fa-solid fa-xmark"></i>`,n.style.position=`absolute`,n.style.top=`20px`,n.style.right=`20px`,n.style.background=`transparent`,n.style.border=`none`,n.style.color=`#94a3b8`,n.style.fontSize=`1.5rem`,n.style.cursor=`pointer`,n.onclick=C;let r=document.createElement(`div`);r.style.textAlign=`center`,r.style.marginBottom=`25px`,r.innerHTML=`
    <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #f8fafc; margin: 0 0 10px 0;">Langemarck Student Myth</h2>
    <p style="color: #94a3b8; font-size: 1rem; margin: 0;">Uncovering the reality behind the propaganda</p>
  `;let i=document.createElement(`div`);i.style.display=`flex`,i.style.flexDirection=`column`,i.style.gap=`15px`,i.style.marginBottom=`30px`;let a=document.createElement(`div`);a.style.display=`flex`,a.style.background=`#151917`,a.style.borderRadius=`8px`,a.style.overflow=`hidden`;let o=document.createElement(`button`);o.innerText=`The Myth`,o.style.flex=`1`,o.style.padding=`12px`,o.style.border=`none`,o.style.background=`#2f3e36`,o.style.color=`white`,o.style.fontWeight=`bold`,o.style.cursor=`pointer`,o.style.transition=`background 0.2s`;let s=document.createElement(`button`);s.innerText=`The Reality`,s.style.flex=`1`,s.style.padding=`12px`,s.style.border=`none`,s.style.background=`#151917`,s.style.color=`#64748b`,s.style.fontWeight=`bold`,s.style.cursor=`pointer`,s.style.transition=`background 0.2s`,a.appendChild(o),a.appendChild(s),i.appendChild(a);let c=document.createElement(`div`);c.style.padding=`20px`,c.style.background=`#252c28`,c.style.border=`1px solid #3b473e`,c.style.borderRadius=`8px`,c.style.minHeight=`150px`,c.style.display=`flex`,c.style.flexDirection=`column`,c.style.justifyContent=`center`;let l=`
    <h3 style="color: #cbd5e1; margin: 0 0 10px 0;"><i class="fa-solid fa-flag" style="margin-right: 8px;"></i>The Heroic Propaganda</h3>
    <p style="margin: 0; line-height: 1.6; color: #cbd5e1;">The German High Command claimed that thousands of young, patriotic student volunteers advanced fearlessly on enemy lines singing "Deutschland über alles". They were portrayed as the ultimate heroes who joyfully gave their lives for the Fatherland.</p>
  `;c.innerHTML=l,i.appendChild(c),o.onclick=()=>{o.style.background=`#2f3e36`,o.style.color=`white`,s.style.background=`#151917`,s.style.color=`#64748b`,c.innerHTML=l},s.onclick=()=>{s.style.background=`#3f2020`,s.style.color=`white`,o.style.background=`#151917`,o.style.color=`#64748b`,c.innerHTML=`
    <h3 style="color: #fecaca; margin: 0 0 10px 0;"><i class="fa-solid fa-skull" style="margin-right: 8px;"></i>The Tragic Reality</h3>
    <p style="margin: 0; line-height: 1.6; color: #fecaca;">These volunteers were woefully untrained and poorly equipped. Instead of a glorious charge, they were marched blindly into devastating British machine-gun fire. Thousands were slaughtered needlessly in what became known as the "Massacre of the Innocents of Ypres".</p>
  `};let u=[{name:`Leutnant Werner Voss`,background:`WWI Fighter Ace & Pour le Mérite winner.`,story:`Killed in an epic dogfight against seven British SE5s. Because his grave was lost, he is commemorated on the bronze panels and lies somewhere among the 24,000+ men in the mass grave.`},{name:`The Student Volunteers`,background:`Over 3,000 poorly trained young volunteers.`,story:`Died in the First Battle of Ypres (1914). They form the core of the 'Langemarck Myth', which heavily ties the site to the 'Studentenfriedhof' (Student Cemetery) propaganda narrative.`},{name:`Ptes. Albert Carlill & Leonard Lockley`,background:`British Teenage POWs.`,story:`They died in late 1918 and were originally buried near German graves. During the 1956 cemetery consolidation, their remains couldn't be separated, so they rest permanently in the German mass grave.`},{name:`Oberst (Colonel) Julius von List`,background:`Adolf Hitler's First Regimental Commander.`,story:`List commanded the Bavarian 16th Reserve Infantry Regiment, in which a young Adolf Hitler served as a dispatch runner. Killed at Gheluvelt in October 1914, his remains were later moved to the Langemarck Kameradengrab (mass grave).`},{name:`The 7,977 'Unknowns'`,background:`Unidentified German Soldiers.`,story:`Of the nearly 25,000 men buried in the Kameradengrab (mass grave) at the cemetery entrance, 7,977 remain completely unidentified. Their presence stands as a haunting testament to the mechanized scale of slaughter on the Western Front.`}],d=document.createElement(`div`);d.style.display=`grid`,d.style.gridTemplateColumns=`repeat(auto-fill, minmax(280px, 1fr))`,d.style.gap=`20px`,d.style.marginTop=`40px`,d.style.marginBottom=`30px`,u.forEach((e,t)=>{let n=document.createElement(`div`);n.style.perspective=`1000px`,n.style.height=`320px`,n.style.cursor=`pointer`;let r=document.createElement(`div`);r.style.position=`relative`,r.style.width=`100%`,r.style.height=`100%`,r.style.textAlign=`center`,r.style.transition=`transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)`,r.style.transformStyle=`preserve-3d`,n.onclick=()=>{r.style.transform=r.style.transform===`rotateY(180deg)`?``:`rotateY(180deg)`};let i=document.createElement(`div`);i.style.position=`absolute`,i.style.width=`100%`,i.style.height=`100%`,i.style.backfaceVisibility=`hidden`,i.style.background=`#2d333b`,i.style.border=`1px solid #343a40`,i.style.borderRadius=`8px`,i.style.padding=`20px`,i.style.display=`flex`,i.style.flexDirection=`column`,i.style.justifyContent=`center`,i.style.boxShadow=`0 10px 15px rgba(0,0,0,0.5)`,i.innerHTML=`<div style="position:absolute;top:0;left:0;right:0;height:6px;background:#4a5c40;border-top-left-radius:8px;border-top-right-radius:8px;"></div>
      <h3 style="font-family:'Playfair Display',serif;font-size:1.3rem;color:#f8f9fa;margin-bottom:10px;">${e.name}</h3>
      <p style="color:#adb5bd;font-size:0.95rem;line-height:1.5;">${e.background}</p>
      <div style="position:absolute;bottom:15px;width:100%;text-align:center;font-size:0.75rem;color:#adb5bd;opacity:0.6;text-transform:uppercase;">Tap to reveal</div>`;let a=document.createElement(`div`);a.style.position=`absolute`,a.style.width=`100%`,a.style.height=`100%`,a.style.backfaceVisibility=`hidden`,a.style.background=`#2b3a32`,a.style.border=`1px solid #343a40`,a.style.borderRadius=`8px`,a.style.padding=`20px`,a.style.display=`flex`,a.style.flexDirection=`column`,a.style.justifyContent=`center`,a.style.transform=`rotateY(180deg)`,a.style.boxShadow=`0 10px 15px rgba(0,0,0,0.5)`,a.innerHTML=`<p style="color:#f8f9fa;font-size:0.95rem;line-height:1.6;text-align:left;">${e.story}</p>
      <div style="position:absolute;bottom:15px;width:100%;text-align:center;font-size:0.75rem;color:#adb5bd;opacity:0.6;text-transform:uppercase;">Tap to close</div>`,r.appendChild(i),r.appendChild(a),n.appendChild(r),d.appendChild(n)}),t.appendChild(d);let f=document.createElement(`div`);f.style.background=`#151917`,f.style.padding=`20px`,f.style.borderRadius=`8px`;let p=document.createElement(`label`);p.innerText=`How did propaganda change the memory of these soldiers?`,p.style.display=`block`,p.style.marginBottom=`12px`,p.style.color=`#e2e8f0`,p.style.fontWeight=`600`;let m=document.createElement(`textarea`);m.id=`langemarckReflectionText`,m.style.width=`100%`,m.style.minHeight=`100px`,m.style.padding=`12px`,m.style.borderRadius=`6px`,m.style.border=`1px solid #4a5568`,m.style.background=`#2d3748`,m.style.color=`white`,m.style.fontFamily=`inherit`,m.style.resize=`vertical`,m.style.marginBottom=`15px`,m.placeholder=`Type your reflection here...`;let h=localStorage.getItem(`langemarck_reflection`);h&&(m.value=h);let g=document.createElement(`button`);g.innerHTML=`<i class="fa-solid fa-floppy-disk" style="margin-right: 8px;"></i>Save Reflection`,g.style.background=`#4a5d23`,g.style.color=`white`,g.style.border=`none`,g.style.padding=`10px 20px`,g.style.borderRadius=`6px`,g.style.cursor=`pointer`,g.style.fontWeight=`bold`,g.style.transition=`background 0.2s`,g.style.width=`100%`,g.onmouseover=()=>g.style.background=`#5a702a`,g.onmouseout=()=>g.style.background=`#4a5d23`;let _=document.createElement(`div`);_.style.color=`#86efac`,_.style.fontSize=`0.9rem`,_.style.marginTop=`10px`,_.style.textAlign=`center`,_.style.minHeight=`20px`,g.onclick=()=>{localStorage.setItem(`langemarck_reflection`,m.value),_.innerText=`Reflection saved to device.`,setTimeout(()=>_.innerText=``,3e3)},f.appendChild(p),f.appendChild(m),f.appendChild(g),f.appendChild(_),t.appendChild(n),t.appendChild(r),t.appendChild(i),t.appendChild(f),e.appendChild(t),document.body.appendChild(e),requestAnimationFrame(()=>{e.style.opacity=`1`})}window.openLangemarckMythModal=S;function C(){let e=document.getElementById(`langemarckModal`);e&&(e.style.opacity=`0`,setTimeout(()=>e.remove(),300))}window.addEventListener(`DOMContentLoaded`,async()=>{window.switchView=y,window.state=r,o(),n();try{let e=await fetch(`/database.json?v=${Date.now()}`);window.db=await e.json()}catch(e){console.error(`Failed to load database.json:`,e),window.db={}}x();let e=r.theme||`desert`,t=document.querySelector(`.theme-btn[data-theme="${e}"]`);t&&t.classList.add(`active`);let i=new URLSearchParams(window.location.search);y(i.get(`view`)||`dashboard`,i.get(`unit`),!0),window.addEventListener(`popstate`,e=>{e.state&&e.state.view?y(e.state.view,e.state.unit,!0):y(`dashboard`,null,!0)}),setTimeout(()=>{let e=document.getElementById(`page-curtain`);e&&e.classList.add(`hidden`)},100)});