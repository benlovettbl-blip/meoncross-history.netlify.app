function e(e,t){let n=`
    <div class="welcome-banner" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
      <div>
        <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Print & PDF Hub</h1>
        <p class="welcome-subtitle" style="color: #e0f2fe; font-size: 1.15rem; margin: 0;">Download or print reading materials and workbooks for this unit.</p>
      </div>
    </div>
  `,r=(e,t,n,r,i)=>{let a=`
      <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          <i class="fa-solid ${t}" style="font-size: 1.5rem; color: ${r};"></i>
          <div>
            <h2 style="color: #0f172a; margin: 0;">${e}</h2>
            <p style="color: #64748b; font-size: 0.95rem; margin: 5px 0 0 0;">${n}</p>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">
    `;return i.forEach(e=>{a+=`
        <div class="homepage-lesson-card" style="background: #f8fafc; border: 2px dashed ${r}; border-radius: 8px; padding: 25px 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" onclick="window.open('${e.url}', '_blank')" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#f8fafc'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
           <i class="fa-solid ${t}" style="font-size: 2.5rem; color: ${r}; margin-bottom: 15px;"></i>
           <h3 style="margin: 0; color: #334155; font-size: 1.1rem;">${e.title}</h3>
        </div>
      `}),a+=`
        </div>
      </div>
    `,a},i=(e,t)=>{let n=t===`full`?e:`${e}_${t}`;return window.currentUnitId?`/pdfs/${window.currentUnitId}_${n}.pdf`:`/pdfs/unknown_${n}.pdf`},a=e=>{let t=e===`full`?`pupil_workbook.html`:`pupil_workbook_${e}.html`;return window.currentUnitId?`/units/${window.currentUnitId}/${t}`:t};if(t.timeline&&t.timeline.length>0){let e=[{title:`Full Unit Timeline`,url:window.currentUnitId?`/pdfs/${window.currentUnitId}_timeline.pdf`:`/pdfs/unknown_timeline.pdf`}];n+=r(`Printable Timelines`,`fa-clock-rotate-left`,`A chronological overview of all key events in this unit, formatted for easy printing and revision.`,`#14b8a6`,e)}if(t.workbooks&&t.workbooks.length>0){t.workbooks[0].name;let e=t.workbooks.map(e=>({title:e.title||e.name,url:i(`textbook`,e.name||e.id)}));if(n+=r(`Textbook PDFs`,`fa-book-open`,`Reading material only (no blank writing lines or tasks). Perfect for reading on a screen or printing as a class set of reading books.`,`#3b82f6`,e),window.currentUnitId!==`weimar_nazi_germany`&&window.currentUnitId!==`cme_new`){let e=t.workbooks.map(e=>({title:e.title||e.name,url:i(`workbook`,e.name||e.id)}));n+=r(`Guided Workbook PDFs`,`fa-pencil`,`Reading + Writing tasks. Contains all narrative text alongside the writing spaces and tasks.`,`#8b5cf6`,e)}let o=t.workbooks.map(e=>({title:e.title||e.name,url:i(`pupil_workbook`,e.name||e.id)}));if(n+=r(`Pupil Workbook PDFs`,`fa-user-pen`,`Writing tasks only. Contains just the questions and blank spaces (assumes the student already has access to the Textbook).`,`#f59e0b`,o),window.currentUnitId!==`weimar_nazi_germany`&&window.currentUnitId!==`cme_new`){let e=t.workbooks.map(e=>({title:e.title||e.name,url:a(e.name||e.id)}));n+=r(`Interactive Web Workbooks`,`fa-laptop-code`,`Designed for laptops and Chromebooks. Click to open and type your answers directly onto the screen.`,`#10b981`,e)}let s=t.workbooks.map(e=>({title:e.title||e.name,url:window.currentUnitId?`/pdfs/${window.currentUnitId}_mastery_pack_${e.name||e.id}.pdf`:`/pdfs/unknown_mastery_pack_${e.name||e.id}.pdf`}));if(n+=r(`Mastery Pack PDFs`,`fa-shield-halved`,`Comprehensive revision and mastery tasks designed to test deep knowledge retrieval.`,`#d32f2f`,s),window.currentUnitId!==`weimar_nazi_germany`&&window.currentUnitId!==`cme_new`){let e=t.workbooks.map(e=>({title:e.title||e.name,url:window.currentUnitId?`/units/${window.currentUnitId}/mastery_pack_${e.name||e.id}.html`:`mastery_pack_${e.name||e.id}.html`}));n+=r(`Interactive Web Mastery Packs`,`fa-laptop-file`,`Designed for laptops and Chromebooks. Click to open and type your answers directly onto the screen.`,`#e11d48`,e)}}e.innerHTML=n}export{e as renderWorkbooksZone};