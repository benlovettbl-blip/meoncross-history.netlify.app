function e(e,t){e.innerHTML=`<div style="padding: 40px; text-align: center;"><i class="fa-solid fa-spinner fa-spin fa-3x" style="color: #3b82f6;"></i><p style="margin-top: 15px; color: #64748b; font-size: 1.1rem;">Loading Specification...</p></div>`,fetch(t).then(e=>e.json()).then(t=>{let n=e=>e?e.replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`):``,r=`
        <style>
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
        <div style="max-width: 900px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); padding: 40px; margin-bottom: 40px; animation: slideUpFade 0.5s ease forwards;">
          <h1 style="color: #1e3a8a; font-size: 2.2rem; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
            <i class="fa-solid fa-list-check" style="color: #3b82f6; margin-right: 15px;"></i>
            ${t.title||`Specification`}
          </h1>
          ${t.subtitle?`<p style="font-size: 1.2rem; color: #64748b; margin-bottom: 30px; font-weight: 500;">${t.subtitle}</p>`:``}
      `;t.sections&&t.sections.forEach(e=>{r+=`
            <div style="margin-bottom: 40px;">
              <h2 style="color: #0f172a; font-size: 1.7rem; background: #f8fafc; padding: 18px 20px; border-radius: 8px; border-left: 5px solid #3b82f6; margin-bottom: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                ${e.title}
              </h2>
          `,e.topics&&e.topics.forEach(t=>{r+=`
                <div style="margin-bottom: 30px; margin-left: 15px;">
                  <h3 style="color: #1e293b; font-size: 1.35rem; margin-bottom: 15px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; display: inline-block;">
                    ${t.title}
                  </h3>
                  <ul style="list-style-type: none; padding-left: 0; margin-top: 15px;">
              `,t.points&&t.points.forEach((i,a)=>{let o=`spec-item-${e.id}-${t.title.replace(/[^a-zA-Z0-9]/g,``)}-${a}`;r+=`
                    <li style="position: relative; padding-left: 70px; margin-bottom: 20px; font-size: 1.05rem; color: #334155; line-height: 1.6; display: flex; align-items: flex-start; gap: 15px;">
                      
                      <!-- RAG Selector -->
                      <div style="position: absolute; left: 0; top: 2px; display: flex; flex-direction: column; gap: 4px; background: #f1f5f9; padding: 4px; border-radius: 6px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);">
                         <div style="display: flex; gap: 4px;">
                           <button onclick="window.setSpecRag('${o}', 'red')" id="btn-red-${o}" style="width: 14px; height: 14px; border-radius: 50%; border: none; background: #ef4444; cursor: pointer; opacity: 0.3; transition: opacity 0.2s;"></button>
                           <button onclick="window.setSpecRag('${o}', 'amber')" id="btn-amber-${o}" style="width: 14px; height: 14px; border-radius: 50%; border: none; background: #f59e0b; cursor: pointer; opacity: 0.3; transition: opacity 0.2s;"></button>
                           <button onclick="window.setSpecRag('${o}', 'green')" id="btn-green-${o}" style="width: 14px; height: 14px; border-radius: 50%; border: none; background: #10b981; cursor: pointer; opacity: 0.3; transition: opacity 0.2s;"></button>
                         </div>
                      </div>

                      <div style="flex: 1;">
                        ${n(i)}
                      </div>
                    </li>
                  `}),r+=`
                  </ul>
                </div>
              `}),r+=`</div>`}),r+=`</div>`,e.innerHTML=r;let i=`spec_rag_${window.currentUnitId||`unknown_unit`}`,a={};try{let e=localStorage.getItem(i);e&&(a=JSON.parse(e))}catch(e){console.error(`Could not load RAG state`,e)}Object.keys(a).forEach(e=>{let t=a[e],n=document.getElementById(`btn-${t}-${e}`);n&&(n.style.opacity=`1`)}),window.setSpecRag=function(e,t){[`red`,`amber`,`green`].forEach(t=>{let n=document.getElementById(`btn-${t}-${e}`);n&&(n.style.opacity=`0.3`)});let n=document.getElementById(`btn-${t}-${e}`);n&&(n.style.opacity=`1`),a[e]=t;try{localStorage.setItem(i,JSON.stringify(a))}catch(e){console.error(`Could not save RAG state`,e)}}}).catch(t=>{console.error(`Error loading specification:`,t),e.innerHTML=`<div style="padding: 40px; text-align: center; color: #ef4444;"><i class="fa-solid fa-triangle-exclamation fa-3x" style="margin-bottom: 15px;"></i><p style="font-size: 1.2rem;">Failed to load the specification data.</p></div>`})}export{e as initSpecViewer};