import{a as e,o as t,r as n,t as r}from"./index-DOrdZvYB.js";var i={mode:null,score:0,streak:0,questionIndex:0,totalQuestions:10,currentQuestion:null,riddleCluesRevealed:1,answered:!1,cluedoCases:[{id:`kingdavid`,title:`Case #1946-KD: The King David Hotel Bombing`,brief:`A devastating blast has ripped through the British administrative and military headquarters in Jerusalem, killing 91 people. Deduce the Architect, Decisive Tactic, and Location of this militant attack designed to force the British out of Palestine.`,suspects:[{name:`Menachem Begin`,description:`Leader of the militant Zionist group, the Irgun.`},{name:`David Ben-Gurion`,description:`Chairman of the Jewish Agency, moderate Zionist.`},{name:`Ernest Bevin`,description:`British Foreign Secretary managing the Mandate.`},{name:`Haj Amin al-Husseini`,description:`Grand Mufti of Jerusalem, leading Palestinian nationalist.`}],tactics:[{desc:`Placing explosives inside milk churns in the basement kitchen`,id:`explosives`},{desc:`Organizing a general strike and armed revolt across Palestine`,id:`strike`},{desc:`Intercepting British communications using codes and spies`,id:`spies`},{desc:`Assassinating high-ranking British officials on the streets`,id:`assassinate`}],locations:[{name:`King David Hotel (Jerusalem)`,id:`kingdavid`},{name:`The British Embassy (London)`,id:`embassy`},{name:`Deir Yassin Village (Jerusalem)`,id:`deiryassin`}],correct:{suspect:`Menachem Begin`,tactic:`explosives`,location:`kingdavid`},evidence:[{label:`Irgun Order`,text:`Disguised as Arab workers, our fighters entered the basement of the hotel carrying milk cans packed with gelignite. Set the timers for 30 minutes.`},{label:`British Intelligence Report`,text:`At 12:37 PM, a massive explosion demolished the southern wing of the King David Hotel in Jerusalem. This is the headquarters of the British Secretariat.`},{label:`Begin's Statement`,text:`The Irgun took responsibility. We sent three warnings to evacuate, but the British refused to leave. The blow was aimed at the heart of their administration.`}],resolution:`Correct! Under the direction of Menachem Begin, the militant Irgun group smuggled explosives hidden in milk churns into the basement of the King David Hotel in Jerusalem on 22 July 1946. The blast killed 91 people, shattered British administrative control, and became a crucial factor in the British decision to withdraw from Palestine and hand the Mandate to the United Nations.`},{id:`suez`,title:`Case #1956-SC: The Suez Canal Nationalisation`,brief:`The Middle East is on the brink of war. Following the US and British withdrawal of funding for the Aswan High Dam, the President of Egypt has taken a dramatic unilateral step that challenges Western imperial power. Deduce the Architect, Decisive Tactic, and Location that triggered this international showdown.`,suspects:[{name:`Gamal Abdel Nasser`,description:`President of Egypt, advocate of Pan-Arabism.`},{name:`Anthony Eden`,description:`British Prime Minister determined to maintain Suez control.`},{name:`David Ben-Gurion`,description:`Prime Minister of Israel seeking to open blockaded waterways.`},{name:`Moshe Dayan`,description:`IDF Chief of Staff who executed the Sinai invasion.`}],tactics:[{desc:`Nationalising the Suez Canal Company to fund the Aswan Dam`,id:`nationalise`},{desc:`Launching a surprise paratrooper drop in the Sinai Peninsula`,id:`paratroop`},{desc:`Signing the tripartite Sevres secret agreement with France and Israel`,id:`sevres`},{desc:`Imposing an international oil embargo on Western nations`,id:`oil`}],locations:[{name:`Port Said (Suez Canal)`,id:`portsaid`},{name:`Cairo (Egypt)`,id:`cairo`},{name:`Sèvres (France)`,id:`sevres_loc`}],correct:{suspect:`Gamal Abdel Nasser`,tactic:`nationalise`,location:`portsaid`},evidence:[{label:`Nasser's Speech in Alexandria`,text:`The Suez Canal belongs to Egypt! Today, I announce that we have nationalized the Canal Company. We will use its transit fees to build the Aswan Dam ourselves.`},{label:`Anglo-French Joint Memo`,text:`Nasser's seizure of the Suez Canal at Port Said is a direct threat to global shipping and oil supplies. We must prepare for joint military action to reclaim it.`},{label:`Shipping Log`,text:`Egyptian forces have taken command of the Suez Canal offices in Port Said. All toll fees are now paid to the nationalized Egyptian authority.`}],resolution:`Correct! Egyptian President Gamal Abdel Nasser nationalised the Suez Canal Company at Port Said in July 1956. This bold move was a direct response to Western funding cuts for the Aswan Dam. It provoked a secret military alliance between Britain, France, and Israel (culminating in the Suez Crisis), but ultimately established Nasser as the undisputed hero of Arab nationalism when pressure from the US forced the invaders to withdraw.`},{id:`yomkippur`,title:`Case #1973-YK: The Yom Kippur Surprise Crossing`,brief:`Israeli forces holding the Bar Lev Line along the Suez Canal have been caught completely off guard. Under the cover of a major religious holiday, Egyptian forces have bridged the canal and established a bridgehead. Deduce the Architect, Decisive Tactic, and Location of this surprise breakthrough.`,suspects:[{name:`Anwar Sadat`,description:`President of Egypt who succeeded Gamal Abdel Nasser.`},{name:`Golda Meir`,description:`Prime Minister of Israel who faced intense public criticism.`},{name:`Hafez al-Assad`,description:`President of Syria and ally of Egypt.`},{name:`Moshe Dayan`,description:`Minister of Defence of Israel during the war.`}],tactics:[{desc:`Executing a surprise crossing during Yom Kippur using high-pressure water cannons`,id:`surprise`},{desc:`Launching a pre-emptive airstrike to destroy the Israeli Air Force`,id:`airstrike`},{desc:`Deploying Merkava tanks across the Sinai desert`,id:`tanks`},{desc:`Signing a ceasefire agreement mediated by Henry Kissinger`,id:`ceasefire`}],locations:[{name:`The Suez Canal (Sinai Peninsula)`,id:`suezcanal`},{name:`Golan Heights (Syrian Border)`,id:`golan`},{name:`Tel Aviv (Israel)`,id:`telaviv`}],correct:{suspect:`Anwar Sadat`,tactic:`surprise`,location:`suezcanal`},evidence:[{label:`Egyptian Military Log`,text:`Operation Badr is a success. Under cover of Yom Kippur, our forces crossed the Suez Canal and breached the sand walls using high-pressure water hoses.`},{label:`Sadat's Directive`,text:`We do not expect to defeat Israel completely, but we must break the political deadlock. A surprise offensive across the Canal will force negotiations.`},{label:`IDF Despatch`,text:`Egyptian infantry are crossing the Canal in rubber dinghies. The Bar Lev fortifications are being bypassed and overrun. Send reinforcements.`}],resolution:`Correct! Egyptian President Anwar Sadat launched a surprise crossing of the Suez Canal on 6 October 1973, Yom Kippur, the holiest day in the Jewish calendar. By using water cannons to wash away the massive Israeli sand ramparts of the Bar Lev Line, Egypt established a foothold in the occupied Sinai. Although Israel militarily recovered later in the war, Sadat's strategic success broke the political stalemate and paved the way for the Camp David Accords.`}],currentCluedoCaseIndex:0,cluedoDeductions:0,cluedoAccusationHistory:[]};function a(){let e=document.getElementById(`individuals-game-play-area`);e&&o(e)}function o(e){e.innerHTML=`
    <div style="text-align: center; max-width: 700px; margin: 0 auto; padding: 20px 0;">
      <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--text-main); margin-bottom: 8px;">
        \u{1F575}\uFE0F\u200D\u2642\uFE0F Historical Witness Trivia
      </h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 30px;">
        Test your knowledge of the 26 key individuals from the GCSE syllabus. Select a mode below to begin:
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <!-- Mode 1: Who Am I? -->
        <div class="lobby-card" onclick="window.startTriviaMode('riddles')" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">\u{1F50D}</div>
          <h4 style="margin: 0 0 6px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.1rem;">"Who Am I?" Riddle Solver</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; flex-grow: 1; margin: 0 0 16px 0;">
            Guess the historical witness by unlocking clues sequentially. The fewer clues you reveal, the more points you earn!
          </p>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase;">
            \u{1F3C6} High Score: ${localStorage.getItem(`hs_trivia_riddles`)||0} pts
          </div>
        </div>

        <!-- Mode 2: Quick Recall -->
        <div class="lobby-card" onclick="window.startTriviaMode('recall')" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">\u{1F3B4}</div>
          <h4 style="margin: 0 0 6px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.1rem;">Quick Recall Challenge</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; flex-grow: 1; margin: 0 0 16px 0;">
            Rapid-fire multiple choice based on the 26 core syllabus recall questions. Direct syllabus testing.
          </p>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase;">
            \u{1F3C6} High Score: ${localStorage.getItem(`hs_trivia_recall`)||0}/10
          </div>
        </div>

        <!-- Mode 3: Historical Cluedo -->
        <div class="lobby-card" onclick="window.startTriviaMode('cluedo')" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: left; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">\u{1F575}\uFE0F\u200D\u2642\uFE0F</div>
          <h4 style="margin: 0 0 6px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.1rem;">Historical Cluedo (Deduction)</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; flex-grow: 1; margin: 0 0 16px 0;">
            Analyze evidence briefs and deduce the correct combination of Architect, Tactic, and Location behind major turning points.
          </p>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase;">
            \u{1F3C6} Completed: ${localStorage.getItem(`hs_trivia_cluedo`)||0}/${i.cluedoCases.length} Cases
          </div>
        </div>
      </div>

      <p style="font-size: 0.8rem; color: var(--text-muted);">
        \u{1F4A1} Interactive recall games support retrieval practice, preparing you for 4, 12, and 16-mark essay significance questions.
      </p>
    </div>
  `,e.querySelectorAll(`.lobby-card`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{e.style.transform=`translateY(-3px)`,e.style.borderColor=`var(--accent)`,e.style.boxShadow=`var(--accent-glow)`}),e.addEventListener(`mouseleave`,()=>{e.style.transform=`translateY(0)`,e.style.borderColor=`var(--border-glass)`,e.style.boxShadow=`none`})})}window.startTriviaMode=function(t){e.play(`click`),i.mode=t,i.score=0,i.streak=0,i.questionIndex=0,i.answered=!1,t===`cluedo`?(i.currentCluedoCaseIndex=0,u()):s()},window.exitIndividualsGame=function(){e.play(`click`);let t=document.getElementById(`individuals-game-play-area`);t&&o(t)};function s(){if(i.questionIndex++,i.answered=!1,i.questionIndex>i.totalQuestions){l();return}let e=r,n=e[Math.floor(Math.random()*e.length)],a=t[n.key],o,s;if(i.mode===`recall`){o=n.answer;let e=[],t=r.filter(e=>e.key!==n.key);for(;e.length<3&&t.length>0;){let r=Math.floor(Math.random()*t.length),i=t.splice(r,1)[0];i.answer&&!e.includes(i.answer)&&i.answer!==n.answer&&e.push(i.answer)}s=[o,...e].sort(()=>Math.random()-.5),i.currentQuestion={target:n,bio:a,options:s,correct:o,displayCorrect:o}}else{o=a;let e=[],c=r.filter(e=>e.key!==n.key);for(;e.length<3&&c.length>0;){let n=Math.floor(Math.random()*c.length),r=t[c.splice(n,1)[0].key];r&&!e.some(e=>e.name===r.name)&&e.push(r)}s=[o,...e].sort(()=>Math.random()-.5),i.currentQuestion={target:n,bio:a,options:s,correct:o,displayCorrect:o.name}}i.riddleCluesRevealed=1,c()}function c(){let e=document.getElementById(`individuals-game-play-area`);if(!e)return;let t=``,n=`Question ${i.questionIndex} of ${i.totalQuestions}`;if(i.mode===`riddles`){n=`Riddle ${i.questionIndex} of ${i.totalQuestions}`;let e=[`<strong>Role & Significance:</strong> ${i.currentQuestion.bio.role}`,`<strong>Historical Context:</strong> ${i.currentQuestion.bio.bio}`,`<strong>Signature Statement/Quote:</strong> "${i.currentQuestion.target.quote||`GCSE Key Individual`}"`],r=``;for(let t=0;t<3;t++)i.riddleCluesRevealed>t?r+=`
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 6px; padding: 12px 16px; font-size: 0.9rem; line-height: 1.4; color: var(--text-main); margin-bottom: 12px; animation: fadeIn 0.3s ease-out; text-align: left;">
            <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent); font-weight: 700; display: block; margin-bottom: 4px;">Clue ${t+1}</span>
            ${e[t]}
          </div>
        `:r+=`
          <div style="background: rgba(0, 0, 0, 0.2); border: 1px dashed var(--border-glass); border-radius: 6px; padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px; user-select: none;">
            <i class="fa-solid fa-lock" style="margin-right: 6px;"></i> Clue ${t+1} is locked
          </div>
        `;let a=i.riddleCluesRevealed===1?`Unlock Clue 2 (Value: 5 pts)`:`Unlock Clue 3 (Value: 2 pts)`;t=`
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Figure Clues</span>
          ${i.riddleCluesRevealed<3&&!i.answered?`
            <button onclick="window.revealRiddleClue()" style="background: rgba(var(--primary-rgb), 0.15); border: 1px solid var(--primary); color: var(--primary); padding: 6px 12px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; outline: none;">
              <i class="fa-solid fa-unlock-keyhole"></i> ${a}
            </button>
          `:``}
        </div>
        ${r}
      </div>
    `}else i.mode===`recall`&&(t=`
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; margin-bottom: 24px; box-shadow: var(--shadow-sm); text-align: left;">
        <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent); font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px;">Recall Question</div>
        <p style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin: 0; line-height: 1.45;">
          ${i.currentQuestion.target.question}
        </p>
      </div>
    `);let r=``;i.currentQuestion.options.forEach((e,t)=>{let n=String.fromCharCode(65+t),a=i.mode===`recall`?e:e.name,o=a.replace(/'/g,`\\'`);r+=`
      <button class="trivia-option-btn" onclick="window.submitTriviaAnswer('${o}', this)" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 6px; padding: 16px; text-align: left; color: var(--text-main); font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box; outline: none;">
        <span style="width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: var(--text-muted); font-weight: 700; flex-shrink: 0;">${n}</span>
        <span class="option-text" style="flex-grow: 1;">${a}</span>
      </button>
    `}),e.innerHTML=`
    <div style="max-width: 650px; margin: 0 auto; animation: fadeIn 0.2s ease-out;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <button onclick="window.exitIndividualsGame()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; outline: none; padding: 4px 0;">
          <i class="fa-solid fa-arrow-left"></i> Exit Game
        </button>
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">${n}</span>
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent);">Score: ${i.score} ${i.mode===`riddles`?`pts`:``}</span>
      </div>

      ${t}

      <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px;" class="options-grid">
        ${r}
      </div>

      <!-- Explanation Reveal panel, initially hidden -->
      <div id="trivia-feedback-panel" style="display: none; animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); margin-top: 24px; background: rgba(var(--primary-rgb), 0.04); border: 1px solid var(--border-glass); border-radius: 8px; padding: 20px; text-align: left;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
          <div class="feedback-img-wrapper" style="width: 64px; height: 64px; border-radius: 50%; border: 2px solid var(--accent); overflow: hidden; background: var(--gradient-hero); display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0;">
            <img id="feedback-portrait" src="" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <span id="feedback-fallback" style="display: none; font-size: 1.3rem; font-weight: 800; color: #fff;"></span>
          </div>
          <div>
            <h4 id="feedback-name" style="margin: 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.15rem;"></h4>
            <span id="feedback-role" style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent); font-weight: 700; letter-spacing: 0.5px;"></span>
          </div>
        </div>
        <p id="feedback-bio" style="font-size: 0.88rem; line-height: 1.5; color: var(--text-muted); margin: 0 0 16px 0;"></p>
        <button id="btn-next-question" onclick="window.loadNextTriviaQuestion()" style="background: var(--primary); border: none; color: #fff; padding: 10px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; margin-left: auto; outline: none;">
          Next Question <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `,e.querySelectorAll(`.trivia-option-btn`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{if(i.answered)return;e.style.borderColor=`var(--primary)`,e.style.background=`rgba(59, 130, 246, 0.05)`;let t=e.querySelector(`span`);t.style.borderColor=`var(--primary)`,t.style.color=`var(--primary)`}),e.addEventListener(`mouseleave`,()=>{if(i.answered)return;e.style.borderColor=`var(--border-glass)`,e.style.background=`var(--bg-card)`;let t=e.querySelector(`span`);t.style.borderColor=`var(--border-glass)`,t.style.color=`var(--text-muted)`})})}window.revealRiddleClue=function(){i.riddleCluesRevealed>=3||(e.play(`click`),i.riddleCluesRevealed++,c())},window.submitTriviaAnswer=function(t,r){if(i.answered)return;i.answered=!0;let a=i.currentQuestion.displayCorrect,o=t===a;if(document.getElementById(`individuals-game-play-area`).querySelectorAll(`.trivia-option-btn`).forEach(e=>{if(e.style.cursor=`default`,e.querySelector(`.option-text`).textContent===a){e.style.borderColor=`#10b981`,e.style.background=`rgba(16, 185, 129, 0.1)`;let t=e.querySelector(`span`);t.style.background=`#10b981`,t.style.borderColor=`#10b981`,t.style.color=`#fff`}else if(e===r){e.style.borderColor=`#ef4444`,e.style.background=`rgba(239, 68, 68, 0.1)`;let t=e.querySelector(`span`);t.style.background=`#ef4444`,t.style.borderColor=`#ef4444`,t.style.color=`#fff`}}),o){if(e.play(`success`),i.streak++,i.mode===`riddles`){let e=i.riddleCluesRevealed===1?10:i.riddleCluesRevealed===2?5:2;i.score+=e}else i.score++;i.streak>=3&&n.spawn()}else e.play(`fail`),i.streak=0;let s=document.getElementById(`trivia-feedback-panel`),c=document.getElementById(`feedback-name`),l=document.getElementById(`feedback-role`),u=document.getElementById(`feedback-bio`),d=document.getElementById(`feedback-portrait`),f=document.getElementById(`feedback-fallback`),p=i.currentQuestion.bio;c.textContent=p.name,l.textContent=p.role,u.textContent=p.bio,p.image?(d.src=p.image,d.style.display=`block`,d.onerror=function(){this.style.display=`none`,f.style.display=`flex`},f.style.display=`none`):(d.style.display=`none`,f.style.display=`flex`);let m=p.name.replace(/Jr\.|Chief Justice|General|Dr\./gi,``).trim().split(/\s+/).filter(e=>e.length>0),h=``;m.length>=3?h=(m[0][0]+m[1][0]+m[2][0]).toUpperCase():m.length===2?h=(m[0][0]+m[1][0]).toUpperCase():m.length===1&&(h=m[0].substring(0,2).toUpperCase()),f.textContent=h.substring(0,3),s.style.display=`block`},window.loadNextTriviaQuestion=function(){e.play(`click`),s()};function l(){let e=document.getElementById(`individuals-game-play-area`);if(!e)return;let t=`hs_trivia_riddles`;i.mode===`recall`&&(t=`hs_trivia_recall`);let r=parseInt(localStorage.getItem(t)||0),a=i.score>r;a&&localStorage.setItem(t,i.score),n.spawn();let o=`${i.score} out of ${i.totalQuestions}`;i.mode===`riddles`&&(o=`${i.score} Points`),e.innerHTML=`
    <div style="text-align: center; max-width: 500px; margin: 40px auto; padding: 20px; background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; box-shadow: var(--shadow-md); animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
      <div style="font-size: 3rem; margin-bottom: 16px;">\u{1F3C6}</div>
      <h3 style="font-family: var(--font-heading); color: var(--text-main); font-size: 1.4rem; margin-bottom: 8px;">Game Completed!</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
        You've completed the challenge. Excellent retrieval practice!
      </p>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 6px; padding: 16px; margin-bottom: 24px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent); font-weight: 700; display: block; margin-bottom: 6px;">Your Final Score</span>
        <strong style="font-size: 2rem; color: var(--text-main); font-family: var(--font-heading);">${o}</strong>
        ${a?`
          <div style="color: #10b981; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-top: 8px; animation: bounce 1s infinite;">
            ✨ New High Score! ✨
          </div>
        `:``}
      </div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button onclick="window.startTriviaMode('${i.mode}')" style="background: var(--primary); border: none; color: #fff; padding: 12px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; outline: none;">
          <i class="fa-solid fa-arrow-rotate-right"></i> Play Again
        </button>
        <button onclick="window.exitIndividualsGame()" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); color: var(--text-main); padding: 12px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; outline: none;">
          Back to Lobby
        </button>
      </div>
    </div>
  `}function u(){i.cluedoDeductions=0,i.cluedoAccusationHistory=[],i.answered=!1,d()}function d(){let e=document.getElementById(`individuals-game-play-area`);if(!e)return;let t=i.cluedoCases[i.currentCluedoCaseIndex],n=`<option value="" disabled selected>-- Select Suspect (Architect) --</option>`;t.suspects.forEach(e=>{n+=`<option value="${e.name}">${e.name} (${e.description})</option>`});let r=`<option value="" disabled selected>-- Select Tactic (Weapon) --</option>`;t.tactics.forEach(e=>{r+=`<option value="${e.id}">${e.desc}</option>`});let a=`<option value="" disabled selected>-- Select Location (Room) --</option>`;t.locations.forEach(e=>{a+=`<option value="${e.id}">${e.name}</option>`});let o=``;t.evidence.forEach((e,t)=>{o+=`
      <div class="evidence-clue-card" onclick="this.querySelector('.evidence-text').style.display='block'; this.style.borderColor='var(--primary)'; AudioEngine.play('click');" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 6px; padding: 14px; cursor: pointer; transition: all 0.2s; text-align: left; box-sizing: border-box;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 0.72rem; font-weight: 700; color: var(--accent); text-transform: uppercase;">\u{1F4C2} Evidence File #${t+1} (${e.label})</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-folder-open"></i> Open</span>
        </div>
        <p class="evidence-text" style="display: none; font-size: 0.85rem; line-height: 1.5; color: var(--text-main); margin: 8px 0 0 0; font-style: italic;">
          "${e.text}"
        </p>
      </div>
    `});let s=``;i.cluedoAccusationHistory.length>0&&(s=`
      <div style="margin-top: 24px; border-top: 1px solid var(--border-glass); padding-top: 16px; text-align: left;">
        <h5 style="margin: 0 0 10px 0; font-family: var(--font-heading); color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;">Investigation log:</h5>
        <div style="max-height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 8px;">
          ${i.cluedoAccusationHistory.map((e,t)=>`
            <div style="background: rgba(0, 0, 0, 0.15); border-left: 3px solid ${e.isCorrect?`#10b981`:`#ef4444`}; padding: 8px 12px; border-radius: 4px; font-size: 0.82rem; line-height: 1.4;">
              <span style="font-weight: 700; color: var(--text-muted);">Accusation #${i.cluedoAccusationHistory.length-t}:</span>
              I accused <strong style="color: var(--text-main);">${e.suspect}</strong> in <strong style="color: var(--text-main);">${e.location}</strong> with <strong style="color: var(--text-main);">${e.tactic}</strong>.
              <div style="margin-top: 4px; font-weight: 700; color: ${e.isCorrect?`#10b981`:`var(--accent)`};">${e.feedback}</div>
            </div>
          `).join(``)}
        </div>
      </div>
    `),e.innerHTML=`
    <div style="max-width: 700px; margin: 0 auto; animation: fadeIn 0.2s ease-out;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <button onclick="window.exitIndividualsGame()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; outline: none;">
          <i class="fa-solid fa-arrow-left"></i> Exit to Lobby
        </button>
        <span style="font-size: 0.9rem; font-weight: 700; color: var(--accent); font-family: var(--font-heading);">${t.title}</span>
        <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">Case ${i.currentCluedoCaseIndex+1} of ${i.cluedoCases.length}</span>
      </div>

      <!-- Case Brief Panel -->
      <div style="background: rgba(var(--primary-rgb), 0.03); border: 1px solid var(--border-glass); border-radius: 8px; padding: 20px; margin-bottom: 24px; text-align: left; box-shadow: var(--shadow-sm);">
        <h4 style="margin: 0 0 8px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.05rem; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-circle-info" style="color: var(--primary);"></i> Case Mission File
        </h4>
        <p style="font-size: 0.88rem; line-height: 1.5; color: var(--text-muted); margin: 0;">
          ${t.brief}
        </p>
      </div>

      <!-- Evidence Board -->
      <div style="margin-bottom: 24px; text-align: left;">
        <h4 style="margin: 0 0 10px 0; font-family: var(--font-heading); color: var(--text-main); font-size: 0.95rem;">
          \u{1F5FA}\uFE0F Evidence Board (Click file folders to open)
        </h4>
        <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
          ${o}
        </div>
      </div>

      <!-- Deduction Form -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 24px; box-shadow: var(--shadow-sm);">
        <h4 style="margin: 0 0 16px 0; font-family: var(--font-heading); color: var(--accent); font-size: 1rem; text-align: left; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-pen-nib"></i> Formulate Your Accusation
        </h4>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <!-- Select Suspect -->
          <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
            <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">1. Architect (Suspect)</label>
            <select id="cluedo-suspect-select" style="padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 4px; color: var(--text-main); outline: none; cursor: pointer; font-size: 0.9rem;">
              ${n}
            </select>
          </div>

          <!-- Select Tactic -->
          <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
            <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">2. Decisive Tactic (Weapon)</label>
            <select id="cluedo-tactic-select" style="padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 4px; color: var(--text-main); outline: none; cursor: pointer; font-size: 0.9rem;">
              ${r}
            </select>
          </div>

          <!-- Select Location -->
          <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
            <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">3. Flashpoint Location (Room)</label>
            <select id="cluedo-location-select" style="padding: 10px 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 4px; color: var(--text-main); outline: none; cursor: pointer; font-size: 0.9rem;">
              ${a}
            </select>
          </div>

          <!-- Accuse Button -->
          <button id="btn-submit-accusation" onclick="window.submitCluedoAccusation()" style="background: var(--primary); border: none; color: #fff; padding: 12px; border-radius: 4px; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; outline: none; font-size: 0.95rem;">
            <i class="fa-solid fa-gavel"></i> Accuse & Deduce
          </button>
        </div>

        ${s}

        <!-- Case Resolution Panel, initially hidden -->
        <div id="cluedo-resolution-panel" style="display: none; border-top: 2px dashed #10b981; padding-top: 20px; margin-top: 24px; text-align: left; animation: fadeIn 0.3s ease-out;">
          <h4 style="color: #10b981; font-family: var(--font-heading); font-size: 1.15rem; margin: 0 0 10px 0; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-circle-check"></i> Case Decisively Solved!
          </h4>
          <p id="cluedo-resolution-text" style="font-size: 0.9rem; line-height: 1.5; color: var(--text-muted); margin: 0 0 16px 0;"></p>
          <button id="btn-next-case" onclick="window.nextCluedoCase()" style="background: var(--primary); border: none; color: #fff; padding: 10px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; margin-left: auto; outline: none;">
            Next Case <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `,e.querySelectorAll(`.evidence-clue-card`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{e.style.borderColor!==`var(--primary)`&&(e.style.borderColor=`rgba(255,255,255,0.1)`),e.style.background=`rgba(255,255,255,0.02)`}),e.addEventListener(`mouseleave`,()=>{e.style.borderColor!==`var(--primary)`&&(e.style.borderColor=`var(--border-glass)`),e.style.background=`var(--bg-card)`})})}window.submitCluedoAccusation=function(){if(i.answered)return;let t=i.cluedoCases[i.currentCluedoCaseIndex],r=document.getElementById(`cluedo-suspect-select`),a=document.getElementById(`cluedo-tactic-select`),o=document.getElementById(`cluedo-location-select`);if(!r.value||!a.value||!o.value){alert(`Please select a value for Suspect, Tactic, and Location before making an accusation!`);return}let s=r.value,c=a.value,l=o.value,u=t.tactics.find(e=>e.id===c).desc,f=t.locations.find(e=>e.id===l).name;i.cluedoDeductions++;let p=s===t.correct.suspect,m=c===t.correct.tactic,h=l===t.correct.location,g=p&&m&&h,_=``;if(g)_=`Deduction matches case records perfectly!`;else{let e=[];p||e.push(`Architect`),m||e.push(`Tactic`),h||e.push(`Location`),_=e.length===3?`❌ All elements are incorrect. The clues point elsewhere.`:e.length===2?`\u26A0\uFE0F 1 element correct. Check your ${e.join(` and `)}.`:`\u26A0\uFE0F 2 elements correct. Check your ${e[0]}.`}if(i.cluedoAccusationHistory.unshift({suspect:s,tactic:u,location:f,feedback:_,isCorrect:g}),g){i.answered=!0,e.play(`success`),n.spawn();let r=document.getElementById(`btn-submit-accusation`);r.style.display=`none`;let a=document.getElementById(`cluedo-resolution-panel`),o=document.getElementById(`cluedo-resolution-text`);o.textContent=t.resolution,a.style.display=`block`,setTimeout(()=>{a.scrollIntoView({behavior:`smooth`,block:`end`})},100)}else e.play(`fail`),d()},window.nextCluedoCase=function(){e.play(`click`),i.currentCluedoCaseIndex++,i.currentCluedoCaseIndex>=i.cluedoCases.length?f():u()};function f(){let e=document.getElementById(`individuals-game-play-area`);e&&(localStorage.setItem(`hs_trivia_cluedo`,i.cluedoCases.length),n.spawn(),e.innerHTML=`
    <div style="text-align: center; max-width: 500px; margin: 40px auto; padding: 30px; background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; box-shadow: var(--shadow-md); animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
      <div style="font-size: 3.5rem; margin-bottom: 16px; animation: bounce 1.5s infinite;">\u{1F50D}\u{1F575}\uFE0F\u200D\u2642\uFE0F</div>
      <h3 style="font-family: var(--font-heading); color: var(--text-main); font-size: 1.4rem; margin-bottom: 8px;">Deduction Campaign Completed!</h3>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
        Outstanding detective work! You solved all ${i.cluedoCases.length} turning point case files decisively.
      </p>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 6px; padding: 16px; margin-bottom: 24px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent); font-weight: 700; display: block; margin-bottom: 6px;">Status Achieved</span>
        <strong style="font-size: 1.5rem; color: #10b981; font-family: var(--font-heading);">Master Historical Investigator</strong>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button onclick="window.startTriviaMode('cluedo')" style="background: var(--primary); border: none; color: #fff; padding: 12px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; outline: none;">
          <i class="fa-solid fa-arrow-rotate-right"></i> Play Again
        </button>
        <button onclick="window.exitIndividualsGame()" style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass); color: var(--text-main); padding: 12px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; outline: none;">
          Back to Lobby
        </button>
      </div>
    </div>
  `)}export{a as initIndividualsGame};