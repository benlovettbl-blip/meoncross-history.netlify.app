import"./modulepreload-polyfill-Dezn_h7o.js";/* empty css              */import{t as e}from"./preload-helper-CZgWQFsJ.js";var t={auth:{clientId:`00000000-0000-0000-0000-000000000000`,authority:`https://login.microsoftonline.com/your-school-tenant-id`,redirectUri:window.location.origin,postLogoutRedirectUri:window.location.origin},cache:{cacheLocation:`localStorage`,storeAuthStateInCookie:!0}};function n(){console.log(`Initializing Microsoft SSO configuration with tenant...`,t.auth.authority);let e=localStorage.getItem(`user_profile`);(!e||e.includes(`Meoncross`))&&r(`Admin`)}function r(e){let t={username:`student@history-app.local`,name:`Mr Lovett's History Hub Student`,yearGroup:e,tenant:`history-app.local`};return localStorage.setItem(`user_profile`,JSON.stringify(t)),t}function i(){let e=localStorage.getItem(`user_profile`);return e?JSON.parse(e):null}var a={currentView:`dashboard`,selectedUnitId:null,selectedSubtopicId:null,studyLevel:`mastery`,activeUnitData:{metadata:{},subtopics:[],timelineEvents:[],quizData:[]},mastery:{},bookmarks:[],dailyXp:0,lastActiveDate:null,theme:`primary`,soundEnabled:!0,userProfile:null};function o(){try{let e=localStorage.getItem(`history_mastery`);e&&(a.mastery=JSON.parse(e));let t=localStorage.getItem(`history_bookmarks`);t&&(a.bookmarks=JSON.parse(t));let n=localStorage.getItem(`history_theme`);n&&(a.theme=n,document.documentElement.setAttribute(`data-theme`,n));let r=localStorage.getItem(`history_xp`);r&&(a.dailyXp=parseInt(r,10))}catch(e){console.error(`Error loading data from localStorage:`,e)}}function s(){try{localStorage.setItem(`history_mastery`,JSON.stringify(a.mastery)),localStorage.setItem(`history_bookmarks`,JSON.stringify(a.bookmarks)),localStorage.setItem(`history_theme`,a.theme),localStorage.setItem(`history_xp`,a.dailyXp.toString())}catch(e){console.error(`LocalStorage save error:`,e)}}function c(e,t){a.mastery||={};let n=a.mastery[e],r=Date.now();if(n||={status:`new`,timestamp:r,leitnerBox:1,nextReview:0},t){let e=n.leitnerBox||1,t=Math.min(5,e+1);n.leitnerBox=t,n.nextReview=r+{1:14400*1e3,2:1440*60*1e3,3:4320*60*1e3,4:10080*60*1e3,5:336*60*60*1e3}[t],n.status=t===5?`mastered`:`secured`,n.timestamp=r,a.dailyXp+=10}else n.leitnerBox=1,n.nextReview=r,n.status=`new`,n.timestamp=r;a.mastery[e]=n,s()}function l(e){let t=a.bookmarks.indexOf(e);t===-1?a.bookmarks.push(e):a.bookmarks.splice(t,1),s()}function u(e,t){let n=e.split(/\n## /),r=n[0].match(/^---\s*\n([\s\S]*?)\n---\s*\n/),i={id:t,title:`Unknown Unit`,year_group:`KS3`,unlocked_for:[]};r&&(r[1].split(`
`).forEach(e=>{let t=e.split(`:`);if(t.length>=2){let e=t[0].trim(),n=t.slice(1).join(`:`).trim();if(e===`unlocked_for`)try{i[e]=JSON.parse(n)}catch{i[e]=n.split(`,`).map(e=>e.trim())}else i[e]=n.replace(/^['"]|['"]$/g,``)}}),n[0]=n[0].replace(/^---\s*\n[\s\S]*?\n---\s*\n/,``));let a=[],o=[],s=[];for(let e=1;e<n.length;e++){let r=n[e].split(`
`),i=r[0].trim(),c=[],l=`${t}_sub_${e}`,u=`content`,d={text:``,words:[]},f=[],p=[],m=null;for(let e=1;e<r.length;e++){let t=r[e].trim();if(t){if(t.startsWith(`### Fill-in-the-Blanks`)){u=`fitb`;continue}else if(t.startsWith(`### Vocabulary`)){u=`vocab`;continue}else if(t.startsWith(`### True or False`)){u=`tf`;continue}else if(t.startsWith(`### Retrieval Questions`)){u=`retrieval`;continue}else if(t.startsWith(`### Timeline`)){u=`timeline`;continue}if(u===`content`)c.push(r[e]);else if(u===`fitb`)t.startsWith(`Text:`)?d.text=t.substring(5).trim():t.startsWith(`Words:`)&&(d.words=t.substring(6).split(`,`).map(e=>e.trim()));else if(u===`vocab`){let e=t.match(/^-\s*\*\*(.*?)\*\*:\s*(.*)/);e&&f.push({term:e[1].trim(),def:e[2].trim()})}else if(u===`tf`){let e=t.match(/^-\s*(.*)\((True|False)\)/i);e&&p.push({text:e[1].trim(),ans:e[2].trim()})}else if(u===`retrieval`)t.startsWith(`- **Question**:`)?(m&&s.push(m),m={id:`q_${l}_${s.length+1}`,question:t.substring(15).trim(),answer:``,explanation:``,distractors:[]}):m&&t.startsWith(`- **Answer**:`)?m.answer=t.substring(13).trim():m&&t.startsWith(`- **Distractor**:`)?m.distractors.push(t.substring(17).trim()):m&&t.startsWith(`- **Explanation**:`)&&(m.explanation=t.substring(18).trim());else if(u===`timeline`){let e=t.match(/^-\s*\*\*(.*?)\*\*:\s*(.*)/);e&&o.push({year:e[1].trim(),text:e[2].trim(),subtopicId:l})}}}m&&s.push(m),a.push({id:l,title:i,content:c.join(`
`),part1:d,part2:f,part3:p})}return{metadata:i,subtopics:a,timelineEvents:o,quizData:s}}var d=[{id:`water_and_sanitation`,title:`Water and Sanitation Through Time`,category:`Key Stage 3`,yearGroup:`Year 7`,desc:`Exploring sanitation development from prehistoric roundhouses to Roman conduits.`},{id:`norman_conquest`,title:`The Norman Conquest (1066)`,category:`Key Stage 3`,yearGroup:`Year 7`,desc:`Enquiry into the succession crisis, battles of 1066, and Norman control.`},{id:`change_1450_1750`,title:`Change from 1450-1750`,category:`Key Stage 3`,yearGroup:`Year 8`,desc:`Exploring the Renaissance, Reformation, Civil War, and Scientific Revolution.`},{id:`great_war`,title:`The Great War: Causes & Outbreak`,category:`Key Stage 3`,yearGroup:`Year 9`,desc:`New format: Accessible interactive digital app with built-in scaffolds and printable workbooks.`},{id:`great_war_part2`,title:`The Great War: Experience & Aftermath (Part 2)`,category:`Key Stage 3`,yearGroup:`Year 9`,desc:`Enquiry into trench warfare, the global impact, and the flawed peace of the Treaty of Versailles.`},{id:`gcse_usa_1954_1975`,title:`GCSE: USA (1954-1975)`,category:`Edexcel GCSE`,yearGroup:`GCSE`,desc:`Conflict at home and abroad: Civil Rights Movement and Vietnam War.`},{id:`gcse_middle_east_1945_1995`,title:`GCSE: Conflict in the Middle East`,category:`Edexcel GCSE`,yearGroup:`GCSE`,desc:`The birth of Israel, Suez Crisis, Six-Day War, Yom Kippur War, and peace process.`},{id:`gcse_elizabethan_england`,title:`GCSE: Early Elizabethan England (1558-1588)`,category:`Edexcel GCSE`,yearGroup:`GCSE`,desc:`Queen, government, religion, challenges at home/abroad, and Elizabethan society.`}];function f(){let e=document.getElementById(`main-content`),t=i(),n=a.allQuestions?a.allQuestions.length:0,r=0,o=0,s={1:0,2:0,3:0,4:0,5:0};a.mastery&&Object.values(a.mastery).forEach(e=>{e.status===`mastered`?r++:e.status===`secured`&&o++;let t=e.leitnerBox||1;s[t]!==void 0&&s[t]++});let c=`
    <!-- Onboarding Banner -->
    <div class="dashboard-hero">
      <div class="hero-text">
        <h2>Welcome back, ${t?t.name:`Student`}!</h2>
        <p>Current Year Group assignment: <strong>${t?t.yearGroup:`None`}</strong></p>
      </div>
      <div class="hero-actions">
        <button class="btn btn-primary" onclick="window.switchView('profile')">
          <i class="fa-solid fa-user-gear"></i> Manage Profile
        </button>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-title">Daily XP</span>
        <span class="stat-val"><i class="fa-solid fa-fire text-primary"></i> ${a.dailyXp}</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Mastery Level</span>
        <span class="stat-val"><i class="fa-solid fa-graduation-cap text-success"></i> ${r}</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Secured Questions</span>
        <span class="stat-val"><i class="fa-solid fa-shield-halved text-info"></i> ${o}</span>
      </div>
    </div>

    <!-- Leitner Box spaced repetition distribution -->
    <div class="card leitner-card">
      <h3><i class="fa-solid fa-brain"></i> Memory Spaced Repetition Distribution</h3>
      <div class="leitner-distribution">
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 1 (New)</span>
          <div class="bar-container"><div class="bar-fill bg-danger" style="width: ${n?s[1]/n*100:0}%"></div></div>
          <span class="bar-count">${s[1]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 2 (Learning)</span>
          <div class="bar-container"><div class="bar-fill bg-warning" style="width: ${n?s[2]/n*100:0}%"></div></div>
          <span class="bar-count">${s[2]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 3 (Securing)</span>
          <div class="bar-container"><div class="bar-fill bg-info" style="width: ${n?s[3]/n*100:0}%"></div></div>
          <span class="bar-count">${s[3]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 4 (Retained)</span>
          <div class="bar-container"><div class="bar-fill bg-primary" style="width: ${n?s[4]/n*100:0}%"></div></div>
          <span class="bar-count">${s[4]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 5 (Mastered)</span>
          <div class="bar-container"><div class="bar-fill bg-success" style="width: ${n?s[5]/n*100:0}%"></div></div>
          <span class="bar-count">${s[5]}</span>
        </div>
      </div>
    </div>

    <!-- Historical Content Modules -->
    <h3 class="section-title">Historical Study Enquiries</h3>
    <div class="modules-grid">
  `,l={water_and_sanitation:{icon:`fa-faucet-drip`,color:`#3b82f6`,bg:`rgba(59, 130, 246, 0.1)`},norman_conquest:{icon:`fa-shield-halved`,color:`#ef4444`,bg:`rgba(239, 68, 68, 0.1)`},change_1450_1750:{icon:`fa-flask`,color:`#10b981`,bg:`rgba(16, 185, 129, 0.1)`},great_war:{icon:`fa-helmet-safety`,color:`#b45309`,bg:`rgba(180, 83, 9, 0.1)`},great_war_part2:{icon:`fa-globe`,color:`#0369a1`,bg:`rgba(3, 105, 161, 0.1)`},great_war_v2:{icon:`fa-star`,color:`#eab308`,bg:`rgba(234, 179, 8, 0.1)`},gcse_usa_1954_1975:{icon:`fa-monument`,color:`#8b5cf6`,bg:`rgba(139, 92, 246, 0.1)`},gcse_middle_east_1945_1995:{icon:`fa-dove`,color:`#0d9488`,bg:`rgba(13, 148, 136, 0.1)`},gcse_elizabethan_england:{icon:`fa-crown`,color:`#f59e0b`,bg:`rgba(245, 158, 11, 0.1)`}};d.forEach(e=>{let t=l[e.id]||{icon:`fa-book-open`,color:`var(--primary)`,bg:`var(--border-glass)`};c+=`
      <div class="module-card ">
        <div>
          <div class="module-header" style="margin-bottom: 12px;">
            <span class="category-badge">${e.category}</span>
            <span class="year-badge">${e.yearGroup}</span>
          </div>
          <div style="display: flex; gap: 14px; align-items: flex-start;">
            <div style="font-size: 1.3rem; color: ${t.color}; background: ${t.bg}; padding: 10px; border-radius: var(--border-radius-sm); display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.05);">
              <i class="fa-solid ${t.icon}"></i>
            </div>
            <div style="flex-grow: 1; min-width: 0;">
              <h4 style="margin: 0 0 6px 0; font-size: 1.1rem; font-weight: 700; line-height: 1.3;">${e.title}</h4>
              <p style="margin: 0; font-size: 0.85rem; line-height: 1.45; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${e.desc}</p>
            </div>
          </div>
        </div>
        
        ${`
          <div class="module-actions" style="margin-top: 14px;">
            ${e.id.startsWith(`gcse_`)||e.id===`water_and_sanitation`||e.id===`great_war`||e.id===`great_war_part2`||e.id===`great_war_v2`||e.id===`norman_conquest`||e.id===`change_1450_1750`?`
              <button class="btn btn-sm btn-primary w-full" onclick="window.launchSubApp('${e.id}')">
                <i class="fa-solid fa-circle-play"></i> Launch Study App
              </button>
            `:`
              <button class="btn btn-sm btn-primary" onclick="window.switchView('interactive', '${e.id}')">
                <i class="fa-solid fa-gamepad"></i> Interactive Study
              </button>
              <button class="btn btn-sm btn-secondary" onclick="window.switchView('timeline', '${e.id}')">
                <i class="fa-solid fa-timeline"></i> Timeline
              </button>
              <button class="btn btn-sm btn-outline" onclick="window.switchView('booklet', '${e.id}')">
                <i class="fa-solid fa-print"></i> PDF/A4 Booklet
              </button>
            `}
          </div>
        `}
      </div>
    `}),c+=`</div>`,e.innerHTML=c}function p(){let e=document.getElementById(`main-content`),t=i();e.innerHTML=`
    <div class="card max-w-md mx-auto">
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
  `}window.updateProfileYearGroup=function(e){r(e),f()},window.launchSubApp=function(e){e===`gcse_usa_1954_1975`?window.location.href=`/usa/`:e===`gcse_middle_east_1945_1995`?window.location.href=`/cme/`:e===`gcse_elizabethan_england`?window.location.href=`/eee/`:e===`water_and_sanitation`?window.location.href=`/water_and_sanitation/`:e===`great_war`||e===`great_war_v2`?window.location.href=`/great_war/`:e===`great_war_part2`?window.location.href=`/great_war_part2/`:e===`norman_conquest`?window.location.href=`/norman_conquest/`:e===`change_1450_1750`&&(window.location.href=`/change_1450_1750/`)};function m(){let e=document.getElementById(`main-content`),t=a.activeUnitData;if(!t||!t.quizData||t.quizData.length===0){e.innerHTML=`
      <div class="card text-center">
        <p>No quiz questions available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;return}let n=t.quizData,r=n[Math.floor(Math.random()*n.length)],i=[r.answer,...r.distractors].sort(()=>Math.random()-.5);e.innerHTML=`
    <div class="card max-w-lg mx-auto quiz-container">
      <div class="quiz-header">
        <span class="quiz-badge">Interactive Recall Quiz</span>
        <button class="btn btn-outline btn-sm" onclick="window.toggleBookmarkQuestion('${r.id}')">
          <i class="${a.bookmarks.includes(r.id)?`fa-solid`:`fa-regular`} fa-bookmark"></i>
        </button>
      </div>
      <h3 class="quiz-question">${r.question}</h3>
      <div class="quiz-options">
        ${i.map(e=>`
          <button class="btn btn-block btn-quiz-opt" onclick="window.submitQuizAnswer('${r.id}', '${e.replace(/'/g,`\\'`)}', this)">
            ${e}
          </button>
        `).join(``)}
      </div>
      <div id="quiz-feedback" class="quiz-feedback hidden"></div>
      <div style="margin-top: 24px; display: flex; justify-content: space-between;">
        <button class="btn btn-secondary" onclick="window.switchView('dashboard')">Exit Quiz</button>
        <button class="btn btn-primary" onclick="window.switchView('interactive', '${a.selectedUnitId}')">Next Question &rarr;</button>
      </div>
    </div>
  `}window.toggleBookmarkQuestion=function(e){l(e),m()},window.submitQuizAnswer=function(e,t,n){let r=a.activeUnitData.quizData.find(t=>t.id===e);if(!r)return;let i=t===r.answer;c(e,i),document.querySelectorAll(`.btn-quiz-opt`).forEach(e=>{e.disabled=!0,e.innerText.trim()===r.answer?e.classList.add(`btn-success`):e===n&&!i&&e.classList.add(`btn-danger`)});let o=document.getElementById(`quiz-feedback`);o.innerHTML=`
    <strong>${i?`✅ Correct Answer!`:`❌ Incorrect.`}</strong>
    <p>${r.explanation}</p>
  `,o.classList.remove(`hidden`)};function h(){let e=document.getElementById(`main-content`),t=a.activeUnitData.timelineEvents;if(!t||t.length===0){e.innerHTML=`
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
  `}function g(){let e=document.getElementById(`main-content`),t=a.activeUnitData;e.innerHTML=`
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
  `}window.printBooklet=function(){window.print()};async function _(){let t=document.getElementById(`main-content`),n=a.selectedUnitId||`gcse_usa_1954_1975`,r=[];if(n===`gcse_middle_east_1945_1995`?r=(await e(()=>import(`./decisions_data-BFH7icKd.js`),[])).DECISIONS_DATA:n===`gcse_usa_1954_1975`&&(r=(await e(()=>import(`./decisions_data-D-RDO2nC.js`),[])).DECISIONS_DATA),r.length===0){t.innerHTML=`
      <div class="card text-center">
        <h3><i class="fa-solid fa-phone-volume"></i> Decision Simulator</h3>
        <p>No decision scenarios available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;return}window.playDecisionsScenario=function(e){let i=r.find(t=>t.id===e);i&&(t.innerHTML=`
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 1: Initial Response</span>
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('decisions', '${n}')">
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
    `)},window.playDecisionsPhase2=function(e,i){let a=r.find(t=>t.id===e);if(!a)return;let o=i===`A`?a.phase1.choiceA:a.phase1.choiceB;t.innerHTML=`
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 2: The Fallout</span>
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('decisions', '${n}')">
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
    `},window.playDecisionsPhase3=function(e,i,a){let o=r.find(t=>t.id===e);if(!o)return;let s=i===`A`?o.phase1.choiceA:o.phase1.choiceB,c=a===`1`?s.choice1:s.choice2;t.innerHTML=`
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 3: The Verdict</span>
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('decisions', '${n}')">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${o.title}</h2>
        
        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px; border-left: 4px solid ${c.isHistorical?`var(--primary)`:`var(--accent)`};">
          <h4 style="margin-bottom: 8px;">${c.isHistorical?`🏆 Historical Path Followed`:`⚠️ Deviated from History`}</h4>
          ${c.verdict}
        </div>

        <div style="display: flex; justify-content: space-between;">
          <button class="btn btn-secondary" onclick="window.switchView('decisions', '${n}')">Another Scenario</button>
          <button class="btn btn-primary" onclick="window.switchView('dashboard')">Exit Simulator</button>
        </div>
      </div>
    `},t.innerHTML=`
    <div class="card">
      <h3 style="margin-bottom: 8px;"><i class="fa-solid fa-phone-volume text-primary"></i> Decision-Making Simulation</h3>
      <p class="text-muted" style="margin-bottom: 24px;">Put yourself in the shoes of historical figures facing critical turning points.</p>
      
      <div class="modules-grid">
        ${r.map(e=>`
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
  `}async function v(){let t=document.getElementById(`main-content`),n=a.selectedUnitId||`gcse_usa_1954_1975`,r=[];if(n===`gcse_middle_east_1945_1995`)r=(await e(()=>import(`./taboo_data-V1qOJ1AB.js`),[])).TABOO_CARDS;else if(n===`gcse_usa_1954_1975`){let t=await e(()=>import(`./taboo_data-SF72libF.js`),[]);Object.keys(t.TABOO_CARDS).forEach(e=>{t.TABOO_CARDS[e].forEach(t=>{r.push({id:`taboo_usa_${t.target.replace(/\s+/g,`_`)}`,topic:e,target:t.target.toUpperCase(),taboo:t.taboo,hint:`Recall this key ${e} from the GCSE USA History course.`})})})}else if(n===`gcse_elizabethan_england`){let t=(await e(()=>import(`./data-DEvEzKOh.js`),[])).timelineData,n=1;t.forEach(e=>{e.events.forEach(t=>{if(t.subtitle&&t.text){let i=t.subtitle.toUpperCase(),a=[...t.names||[],...t.stats||[]].slice(0,5).map(e=>e.replace(/\(.*?\)/g,``).trim()).filter(Boolean),o=t.text.split(`.`)[0]+`.`;a.length>=2&&r.push({id:`taboo_eee_${n++}`,topic:e.title,target:i,taboo:a,hint:o})}})})}if(r.length===0){t.innerHTML=`
      <div class="card text-center">
        <h3><i class="fa-solid fa-tags"></i> Taboo Recall</h3>
        <p>No Taboo recall cards available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;return}window.showTabooCard=function(e){let n=r[e];t.innerHTML=`
      <div class="card max-w-md mx-auto text-center" style="display: flex; flex-direction: column; gap: 20px; border: 2px solid var(--primary); padding: 32px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">${n.topic}</span>
        
        <div style="background-color: var(--bg-app); border: 2px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 24px; box-shadow: var(--shadow-sm);">
          <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); letter-spacing: 0.5px;">${n.target}</h2>
        </div>

        <div style="border-top: 1px solid var(--border-glass); border-bottom: 1px solid var(--border-glass); padding: 18px 0;">
          <h4 style="text-transform: uppercase; font-size: 0.85rem; color: var(--accent); margin-bottom: 12px; letter-spacing: 1px;">Forbidden Taboo Words:</h4>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${n.taboo.map(e=>`<span style="font-size: 1.1rem; font-weight: 700; text-decoration: line-through; opacity: 0.85;">${e}</span>`).join(``)}
          </div>
        </div>

        <div id="taboo-hint-box" style="display: none; background-color: var(--bg-app); padding: 12px; border-radius: var(--border-radius-sm); font-size: 0.85rem; text-align: left;">
          <strong>Context Hint:</strong> ${n.hint}
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn btn-outline" id="btn-show-hint" onclick="document.getElementById('taboo-hint-box').style.display='block'; this.style.display='none';">Show Context Hint</button>
          <div style="display: flex; gap: 10px; justify-content: center; margin-top: 10px;">
            <button class="btn btn-secondary" onclick="window.switchView('dashboard')">Exit Game</button>
            <button class="btn btn-primary" onclick="window.showRandomTabooCard()">Next Card &rarr;</button>
          </div>
        </div>
      </div>
    `},window.showRandomTabooCard=function(){let e=Math.floor(Math.random()*r.length);window.showTabooCard(e)},window.showRandomTabooCard()}async function y(){let e=document.getElementById(`main-content`),t=a.selectedUnitId||`gcse_usa_1954_1975`,n=a.activeUnitData;if(!n||!n.subtopics||n.subtopics.length===0){e.innerHTML=`
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
      <p class="text-muted" style="margin-bottom: 24px;">Read through the core steps, historical sources, and examiner tips for each lesson before testing yourself.</p>
      
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
  `}async function b(e,t=null){a.currentView=e;let n=document.getElementById(`header-back-btn`);n&&(e===`dashboard`?n.style.display=`none`:n.style.display=`flex`);let r=document.getElementById(`header-breadcrumbs`);if(r)if(e===`dashboard`)r.style.display=`none`;else{let t=e.toUpperCase();e===`interactive`&&(t=`Interactive Quiz`),e===`timeline`&&(t=`Chronological Timeline`),e===`booklet`&&(t=`Printable A4 Booklet`),e===`profile`&&(t=`Student Profile`),r.innerHTML=`
        <span onclick="window.switchView('dashboard')" style="cursor: pointer; text-decoration: underline; color: var(--primary);">Dashboard</span>
        <span style="opacity: 0.5;"> / </span>
        <span>${t}</span>
      `,r.style.display=`inline-block`}document.querySelectorAll(`.sidebar-nav .nav-item`).forEach(e=>{e.classList.remove(`active`)});let i=document.getElementById(`nav-${e}`);i&&i.classList.add(`active`),e===`dashboard`?f():e===`profile`?p():e===`interactive`?(t&&await x(t),m()):e===`timeline`?(t&&await x(t),h()):e===`booklet`?(t&&await x(t),g()):e===`decisions`?(t&&await x(t),_()):e===`taboo`?(t&&await x(t),v()):e===`lessons`&&(t&&await x(t),y())}async function x(e){if(a.selectedUnitId===e&&a.activeUnitData.subtopics.length>0)return;a.selectedUnitId=e;let t=e.startsWith(`gcse_`)?`content/gcse/${e}.md`:`content/ks3/${e}.md`;try{let n=await fetch(t);if(!n.ok)throw Error(`Failed to load ${t}`);a.activeUnitData=u(await n.text(),e),a.allQuestions||=[],a.activeUnitData.quizData.forEach(e=>{a.allQuestions.some(t=>t.id===e.id)||a.allQuestions.push(e)});let r=document.getElementById(`nav-decisions`),i=document.getElementById(`nav-taboo`),o=document.getElementById(`nav-lessons`);r&&i&&o&&(e.startsWith(`gcse_`)?(e===`gcse_elizabethan_england`?r.style.display=`none`:r.style.display=`flex`,i.style.display=`flex`,o.style.display=`flex`,r.onclick=()=>b(`decisions`,e),i.onclick=()=>b(`taboo`,e),o.onclick=()=>b(`lessons`,e)):(r.style.display=`none`,i.style.display=`none`,o.style.display=`none`))}catch(t){console.error(`Error loading unit:`,t),alert(`Could not load unit: ${e}. Please ensure the content file exists.`)}}function S(){let e=document.getElementById(`header-back-btn`);e&&e.addEventListener(`click`,e=>{e.preventDefault(),b(`dashboard`)});let t=document.getElementById(`nav-dashboard`);t&&t.addEventListener(`click`,()=>b(`dashboard`));let n=document.getElementById(`nav-profile`);n&&n.addEventListener(`click`,()=>b(`profile`)),document.querySelectorAll(`.theme-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-theme`);a.theme=t,document.documentElement.setAttribute(`data-theme`,t),localStorage.setItem(`history_theme`,t),document.querySelectorAll(`.theme-btn`).forEach(e=>e.classList.remove(`active`)),e.currentTarget.classList.add(`active`)})});let r=document.getElementById(`sidebar-toggle-btn`),i=document.getElementById(`app-sidebar`);r&&i&&r.addEventListener(`click`,()=>{i.classList.toggle(`open`)})}window.addEventListener(`DOMContentLoaded`,()=>{window.switchView=b,window.state=a,n(),o(),S();let e=a.theme||`desert`,t=document.querySelector(`.theme-btn[data-theme="${e}"]`);t&&t.classList.add(`active`),b(`dashboard`)});