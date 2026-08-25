function e(e,t){let n=t.items,r=[...n].sort(()=>Math.random()-.5);e.innerHTML=`
    <div style="background: #ffffff; padding: 25px; border-radius: 12px; border: 2px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: var(--navy);"><i class="fa-solid fa-timeline"></i> ${t.title}</h3>
      <p style="color: #475569; font-size: 1.05rem;">${t.instruction}</p>
      
      <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px;">
        
        <!-- Dropzones -->
        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 10px;" id="timeline-dropzones">
          ${n.map((e,t)=>`
            <div style="display: flex; align-items: center; gap: 15px;">
              <div style="font-weight: bold; color: #64748b; font-size: 1.2rem; width: 30px; text-align: center;">${t+1}</div>
              <div class="dd-dropzone" data-index="${t}" style="flex: 1; background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 8px; min-height: 60px; padding: 10px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                <span style="color: #94a3b8; font-style: italic;">Drop event here</span>
              </div>
            </div>
          `).join(``)}
        </div>

        <!-- Draggables Bank -->
        <div style="flex: 1; min-width: 300px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;" id="timeline-bank">
          <h4 style="margin-top: 0; text-align: center; color: #334155;">Events Bank</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;" id="timeline-draggable-container">
            ${r.map(e=>`
              <div class="dd-draggable" draggable="true" data-id="${e.id}" style="background: white; border: 2px solid #3b82f6; border-radius: 6px; padding: 12px; cursor: grab; font-weight: 500; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <i class="fa-solid fa-grip-vertical" style="color: #94a3b8; margin-right: 8px;"></i> ${e.text}
              </div>
            `).join(``)}
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 25px;">
        <button id="btn-check-timeline" class="btn btn-primary" style="padding: 12px 24px; font-size: 1.1rem; border-radius: 8px; background: #10b981; border: none;"><i class="fa-solid fa-check"></i> Check Timeline</button>
        <button id="btn-reset-timeline" class="btn btn-secondary" style="padding: 12px 24px; font-size: 1.1rem; border-radius: 8px; margin-left: 10px;"><i class="fa-solid fa-rotate-left"></i> Reset</button>
      </div>
      
      <div id="timeline-feedback" style="margin-top: 20px; text-align: center; font-size: 1.2rem; font-weight: bold; min-height: 30px;"></div>
    </div>
  `;let i=null,a=e.querySelectorAll(`.dd-draggable`),o=e.querySelectorAll(`.dd-dropzone`),s=e.querySelector(`#timeline-draggable-container`);a.forEach(e=>{e.addEventListener(`dragstart`,t=>{i=e,e.style.opacity=`0.5`,t.dataTransfer.effectAllowed=`move`,t.dataTransfer.setData(`text/plain`,e.dataset.id)}),e.addEventListener(`dragend`,()=>{e.style.opacity=`1`,i=null})}),o.forEach(e=>{e.addEventListener(`dragover`,t=>{t.preventDefault(),t.dataTransfer.dropEffect=`move`,e.style.borderColor=`#3b82f6`,e.style.background=`#eff6ff`}),e.addEventListener(`dragleave`,()=>{e.style.borderColor=`#cbd5e1`,e.style.background=`#f1f5f9`}),e.addEventListener(`drop`,t=>{if(t.preventDefault(),e.style.borderColor=`#cbd5e1`,e.style.background=`#f1f5f9`,i){let t=e.querySelector(`.dd-draggable`);t&&s.appendChild(t),e.innerHTML=``,e.appendChild(i)}})}),s.addEventListener(`dragover`,e=>{e.preventDefault()}),s.addEventListener(`drop`,e=>{e.preventDefault(),i&&s.appendChild(i)});let c=e.querySelector(`#btn-check-timeline`),l=e.querySelector(`#btn-reset-timeline`),u=e.querySelector(`#timeline-feedback`);c.addEventListener(`click`,()=>{let e=!0,r=!0;o.forEach((t,i)=>{let a=t.querySelector(`.dd-draggable`);if(!a)r=!1,e=!1,t.style.borderColor=`#ef4444`;else{let r=n[i].id;a.dataset.id===r?(t.style.borderColor=`#22c55e`,t.style.background=`#f0fdf4`):(e=!1,t.style.borderColor=`#ef4444`,t.style.background=`#fef2f2`)}}),e?(u.style.color=`#10b981`,u.innerHTML=`<i class="fa-solid fa-circle-check"></i> Excellent! Chronological order is correct. ${t.secret_code?`Secret Code: <span style="background: #fbbf24; padding: 4px 8px; border-radius: 4px; color: #78350f;">`+t.secret_code+`</span>`:``}`):r?(u.style.color=`#ef4444`,u.innerHTML=`<i class="fa-solid fa-circle-xmark"></i> Some events are out of order. Try again!`):(u.style.color=`#f59e0b`,u.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i> Please place an event in every slot.`)}),l.addEventListener(`click`,()=>{o.forEach(e=>{e.innerHTML=`<span style="color: #94a3b8; font-style: italic;">Drop event here</span>`,e.style.borderColor=`#cbd5e1`,e.style.background=`#f1f5f9`}),r=[...n].sort(()=>Math.random()-.5),s.innerHTML=r.map(e=>`
      <div class="dd-draggable" draggable="true" data-id="${e.id}" style="background: white; border: 2px solid #3b82f6; border-radius: 6px; padding: 12px; cursor: grab; font-weight: 500; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <i class="fa-solid fa-grip-vertical" style="color: #94a3b8; margin-right: 8px;"></i> ${e.text}
      </div>
    `).join(``),e.querySelectorAll(`.dd-draggable`).forEach(e=>{e.addEventListener(`dragstart`,t=>{i=e,e.style.opacity=`0.5`,t.dataTransfer.effectAllowed=`move`,t.dataTransfer.setData(`text/plain`,e.dataset.id)}),e.addEventListener(`dragend`,()=>{e.style.opacity=`1`,i=null})}),u.innerHTML=``})}export{e as initDragDropTimeline};