function e(e,t){t.items.length,e.innerHTML=`
    <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); font-family: 'Inter', sans-serif;">
      <h3 style="color: #1e293b; margin-top: 0; font-size: 1.25rem;">${t.text||`Map the items onto the spectrum`}</h3>
      <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 20px;">Drag the historical realities from the bank and drop them onto the spectrum below to plan your argument.</p>
      
      <!-- Item Bank -->
      <div id="sm-item-bank" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 30px; min-height: 80px; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">
        ${t.items.map(e=>`
          <div class="sm-draggable" draggable="true" data-id="${e.id}" style="background: white; border: 2px solid #3b82f6; color: #1e3a8a; padding: 8px 12px; border-radius: 6px; cursor: grab; font-weight: bold; font-size: 0.9rem; box-shadow: 0 2px 4px rgba(59,130,246,0.1); max-width: 200px; text-align: center;">
            ${e.title}
            ${e.desc?`<div style="font-size: 0.75rem; font-weight: normal; color: #64748b; margin-top: 4px;">${e.desc}</div>`:``}
          </div>
        `).join(``)}
      </div>

      <!-- Spectrum Area -->
      <div style="position: relative; margin-top: 40px; margin-bottom: 40px; padding: 20px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold; color: #475569;">
          <div style="color: #b45309;"><i class="fa-solid fa-backward-step"></i> ${t.labels&&t.labels[0]?t.labels[0]:`Traditional`}</div>
          <div style="color: #047857;">${t.labels&&t.labels[1]?t.labels[1]:`Modern`} <i class="fa-solid fa-forward-step"></i></div>
        </div>
        
        <!-- The Track -->
        <div id="sm-track" style="height: 12px; background: linear-gradient(90deg, #fef3c7 0%, #e2e8f0 50%, #d1fae5 100%); border-radius: 10px; position: relative; border: 1px solid #cbd5e1;">
          <!-- Dropzones overlaid on track -->
          <div style="display: flex; position: absolute; top: -40px; left: 0; width: 100%; height: 100px;">
            ${[0,1,2,3,4].map(e=>`
              <div class="sm-dropzone" data-zone="${e}" style="flex: 1; border-right: 1px dashed rgba(203,213,225,0.4); display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 25px;"></div>
            `).join(``)}
          </div>
        </div>
      </div>

      <!-- Generate Button -->
      <div id="sm-generate-container" style="text-align: center; margin-top: 50px; display: none;">
        <button id="sm-generate-btn" style="background: #3b82f6; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(59,130,246,0.3); transition: all 0.2s;"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate Essay Structure</button>
      </div>

      <!-- Result Scaffold -->
      <div id="sm-result" style="display: none; margin-top: 20px; padding: 20px; border-top: 2px dashed #e2e8f0;">
        ${t.model||``}
      </div>
    </div>
  `;let n=e.querySelectorAll(`.sm-draggable`),r=e.querySelectorAll(`.sm-dropzone`),i=e.querySelector(`#sm-item-bank`);n.forEach(e=>{e.addEventListener(`dragstart`,t=>{e.classList.add(`dragging`),e.style.opacity=`0.5`,t.dataTransfer.setData(`text/plain`,e.dataset.id)}),e.addEventListener(`dragend`,()=>{e.classList.remove(`dragging`),e.style.opacity=`1`})}),[...r,i].forEach(t=>{t.addEventListener(`dragover`,e=>{e.preventDefault(),t.style.background=t.id===`sm-item-bank`?`#f1f5f9`:`rgba(241, 245, 249, 0.5)`}),t.addEventListener(`dragleave`,()=>{t.style.background=`transparent`}),t.addEventListener(`drop`,n=>{n.preventDefault(),t.style.background=`transparent`;let r=n.dataTransfer.getData(`text/plain`),i=e.querySelector(`[data-id="${r}"]`);i&&(t.appendChild(i),t.id===`sm-item-bank`?(i.style.transform=`scale(1)`,i.style.margin=`0`):(i.style.transform=`scale(0.85)`,i.style.margin=`5px 0`),a())})});function a(){let t=i.querySelectorAll(`.sm-draggable`).length,n=e.querySelector(`#sm-generate-container`);t===0?n.style.display=`block`:n.style.display=`none`}e.querySelector(`#sm-generate-btn`).addEventListener(`click`,()=>{let t=e.querySelector(`#sm-result`);t.style.display=`block`,t.scrollIntoView({behavior:`smooth`,block:`nearest`})})}export{e as initSpectrumMapper};