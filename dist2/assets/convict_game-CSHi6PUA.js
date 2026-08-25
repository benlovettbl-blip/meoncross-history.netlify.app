async function e(e){e.innerHTML=`
    <div style="background: #1e293b; color: white; padding: 20px; border-radius: 8px; text-align: center; font-family: 'Playfair Display', serif; border: 4px solid #475569;">
      <h3 style="color: #facc15; font-size: 1.8rem; margin-top: 0;"><i class="fa-solid fa-gavel"></i> Old Bailey Justice</h3>
      <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #cbd5e1;">Loading court records...</p>
    </div>
  `;try{let t=(await(await fetch(`/assets/first_fleet_database.txt`)).text()).split(`
`),n=[];for(let e of t){let t=e.split(`	`);if(t.length>15){let e=parseInt(t[0]),r=t[3]?t[3].trim():``;t[5]&&t[5].trim();let i=t[6]?t[6].trim():``,a=t[8]?t[8].trim():``,o=t[10]?t[10].trim():``,s=t[11]?t[11].trim():``,c=t[13]?t[13].trim():``,l=t[15]?t[15].trim():`No trade recorded`;e&&r&&i&&c&&o&&n.push({age:e,crime:r,firstName:i,lastName:c,sentence:o,ship:s,trade:l,notes:a})}}let r=null,i=()=>{e.innerHTML=`
        <div style="background: #1e293b; color: white; padding: 25px; border-radius: 8px; text-align: center; font-family: 'Playfair Display', serif; border: 4px solid #475569; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
          <h3 style="color: #facc15; font-size: 2rem; margin-top: 0; margin-bottom: 10px;"><i class="fa-solid fa-scale-balanced"></i> Old Bailey Justice</h3>
          <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #e2e8f0; margin-bottom: 25px;">Welcome to the Old Bailey, London's Central Criminal Court in the 1780s. You are the judge. Will you show mercy, or is it the rope?</p>
          <button id="btn-next" style="background: #facc15; color: #1e293b; border: none; padding: 12px 24px; font-size: 1.2rem; font-weight: bold; border-radius: 6px; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-gavel"></i> Bring in the First Prisoner</button>
        </div>
      `,document.getElementById(`btn-next`).onclick=a},a=()=>{r=n[Math.floor(Math.random()*n.length)],o()},o=()=>{e.innerHTML=`
        <div style="background: #f8fafc; color: #0f172a; padding: 0; border-radius: 8px; border: 4px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
          <div style="background: #334155; color: white; padding: 15px; text-align: center; font-family: 'Playfair Display', serif;">
            <h3 style="margin: 0; font-size: 1.8rem; color: #facc15;">The Accused</h3>
          </div>
          <div style="padding: 20px; font-family: 'Inter', sans-serif; text-align: center;">
            <div style="font-size: 1.8rem; font-weight: 800; margin-bottom: 10px; color: #b91c1c;">${r.firstName} ${r.lastName}</div>
            <div style="font-size: 1.2rem; margin-bottom: 5px;"><strong>Age:</strong> ${r.age}</div>
            <div style="font-size: 1.2rem; margin-bottom: 20px;"><strong>Trade:</strong> ${r.trade}</div>
            <div style="background: #fee2e2; border: 2px dashed #ef4444; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
              <div style="font-weight: bold; color: #991b1b; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px;">Crime Committed</div>
              <div style="font-size: 1.4rem; font-weight: 600; color: #7f1d1d; margin-top: 5px;">"${r.crime}"</div>
            </div>
            
            <h4 style="font-size: 1.3rem; margin-bottom: 15px; font-family: 'Playfair Display', serif;">What is your verdict, Judge?</h4>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <button class="judge-btn" data-guess="prison" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold;">1 Month Prison</button>
              <button class="judge-btn" data-guess="transport" style="background: #d97706; color: white; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold;">7 Years Transportation</button>
              <button class="judge-btn" data-guess="death" style="background: #111827; color: white; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold;">Death by Hanging</button>
            </div>
          </div>
        </div>
      `,document.querySelectorAll(`.judge-btn`).forEach(e=>{e.onclick=()=>s()})},s=()=>{let t=r.sentence.toLowerCase().includes(`death`);e.innerHTML=`
        <div style="background: #f8fafc; color: #0f172a; padding: 0; border-radius: 8px; border: 4px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
           <div style="background: #1e293b; color: white; padding: 15px; text-align: center; font-family: 'Playfair Display', serif;">
            <h3 style="margin: 0; font-size: 1.8rem; color: #facc15;">The Real Historical Verdict</h3>
          </div>
          <div style="padding: 20px; font-family: 'Inter', sans-serif; text-align: center;">
            <div style="font-size: 1.6rem; font-weight: 800; margin-bottom: 15px; color: ${t?`#b91c1c`:`#b45309`}; text-transform: uppercase;">
              ${r.sentence}
            </div>
            
            <p style="font-size: 1.1rem; max-width: 600px; margin: 0 auto 20px; line-height: 1.6;">
              In the 18th century, the 'Bloody Code' meant that even minor crimes like "${r.crime}" were brutally punished. 
              ${t?`Although sentenced to death, their sentence was later commuted (reduced) to transportation.`:`Prisons were full, so transportation was the primary severe punishment.`}
            </p>
            
            <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 15px; text-align: left; margin-bottom: 25px;">
              <strong>Ship:</strong> ${r.ship||`Unknown`}<br>
              ${r.notes?`<strong style="display:block; margin-top:8px;">Database Notes:</strong> <span style="font-style:italic;">${r.notes}</span>`:``}
            </div>
            
            <button id="btn-again" style="background: #334155; color: white; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold;"><i class="fa-solid fa-rotate-right"></i> Try Another Case</button>
          </div>
        </div>
      `,document.getElementById(`btn-again`).onclick=a};n.length>0?i():e.innerHTML=`<div style="padding: 20px; color: red;">Failed to parse database.</div>`}catch(t){e.innerHTML=`<div style="padding: 20px; color: red;">Error loading game: ${t.message}</div>`}}export{e as initConvictGame};