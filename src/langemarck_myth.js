export function openLangemarckMythModal() {
  if (document.getElementById('langemarckModal')) return;

  const modal = document.createElement('div');
  modal.id = 'langemarckModal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(20, 24, 22, 0.95)'; // dark somber green/grey
  modal.style.zIndex = '999999';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.fontFamily = "'Inter', sans-serif";
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.3s ease';
  modal.style.backdropFilter = 'blur(10px)';

  modal.onclick = (e) => {
    if (e.target === modal) closeLangemarckModal();
  };

  const content = document.createElement('div');
  content.style.backgroundColor = '#1e2420'; // dark oak green
  content.style.border = '1px solid #3b473e';
  content.style.borderRadius = '12px';
  content.style.padding = '30px';
  content.style.width = '90%';
  content.style.maxWidth = '700px';
  content.style.maxHeight = '90vh';
  content.style.overflowY = 'auto';
  content.style.color = '#e2e8f0';
  content.style.position = 'relative';
  content.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)';

  // Close Button
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '20px';
  closeBtn.style.right = '20px';
  closeBtn.style.background = 'transparent';
  closeBtn.style.border = 'none';
  closeBtn.style.color = '#94a3b8';
  closeBtn.style.fontSize = '1.5rem';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = closeLangemarckModal;
  
  // Header
  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.marginBottom = '25px';
  header.innerHTML = `
    <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #f8fafc; margin: 0 0 10px 0;">Langemarck Student Myth</h2>
    <p style="color: #94a3b8; font-size: 1rem; margin: 0;">Uncovering the reality behind the propaganda</p>
  `;

  // Comparison Container
  const comparisonContainer = document.createElement('div');
  comparisonContainer.style.display = 'flex';
  comparisonContainer.style.flexDirection = 'column';
  comparisonContainer.style.gap = '15px';
  comparisonContainer.style.marginBottom = '30px';
  
  // Tab Controls
  const tabControls = document.createElement('div');
  tabControls.style.display = 'flex';
  tabControls.style.background = '#151917';
  tabControls.style.borderRadius = '8px';
  tabControls.style.overflow = 'hidden';
  
  const mythBtn = document.createElement('button');
  mythBtn.innerText = 'The Myth';
  mythBtn.style.flex = '1';
  mythBtn.style.padding = '12px';
  mythBtn.style.border = 'none';
  mythBtn.style.background = '#2f3e36';
  mythBtn.style.color = 'white';
  mythBtn.style.fontWeight = 'bold';
  mythBtn.style.cursor = 'pointer';
  mythBtn.style.transition = 'background 0.2s';
  
  const realityBtn = document.createElement('button');
  realityBtn.innerText = 'The Reality';
  realityBtn.style.flex = '1';
  realityBtn.style.padding = '12px';
  realityBtn.style.border = 'none';
  realityBtn.style.background = '#151917';
  realityBtn.style.color = '#64748b';
  realityBtn.style.fontWeight = 'bold';
  realityBtn.style.cursor = 'pointer';
  realityBtn.style.transition = 'background 0.2s';

  tabControls.appendChild(mythBtn);
  tabControls.appendChild(realityBtn);
  comparisonContainer.appendChild(tabControls);

  const displayArea = document.createElement('div');
  displayArea.style.padding = '20px';
  displayArea.style.background = '#252c28';
  displayArea.style.border = '1px solid #3b473e';
  displayArea.style.borderRadius = '8px';
  displayArea.style.minHeight = '150px';
  displayArea.style.display = 'flex';
  displayArea.style.flexDirection = 'column';
  displayArea.style.justifyContent = 'center';
  
  const mythHTML = `
    <h3 style="color: #cbd5e1; margin: 0 0 10px 0;"><i class="fa-solid fa-flag" style="margin-right: 8px;"></i>The Heroic Propaganda</h3>
    <p style="margin: 0; line-height: 1.6; color: #cbd5e1;">The German High Command claimed that thousands of young, patriotic student volunteers advanced fearlessly on enemy lines singing "Deutschland über alles". They were portrayed as the ultimate heroes who joyfully gave their lives for the Fatherland.</p>
  `;
  
  const realityHTML = `
    <h3 style="color: #fecaca; margin: 0 0 10px 0;"><i class="fa-solid fa-skull" style="margin-right: 8px;"></i>The Tragic Reality</h3>
    <p style="margin: 0; line-height: 1.6; color: #fecaca;">These volunteers were woefully untrained and poorly equipped. Instead of a glorious charge, they were marched blindly into devastating British machine-gun fire. Thousands were slaughtered needlessly in what became known as the "Massacre of the Innocents of Ypres".</p>
  `;
  
  displayArea.innerHTML = mythHTML;
  comparisonContainer.appendChild(displayArea);
  
  mythBtn.onclick = () => {
    mythBtn.style.background = '#2f3e36';
    mythBtn.style.color = 'white';
    realityBtn.style.background = '#151917';
    realityBtn.style.color = '#64748b';
    displayArea.innerHTML = mythHTML;
  };
  
  realityBtn.onclick = () => {
    realityBtn.style.background = '#3f2020';
    realityBtn.style.color = 'white';
    mythBtn.style.background = '#151917';
    mythBtn.style.color = '#64748b';
    displayArea.innerHTML = realityHTML;
  };

  
  const profilesData = [
    {
      "name": "Leutnant Werner Voss",
      "background": "WWI Fighter Ace & Pour le Mérite winner.",
      "story": "Killed in an epic dogfight against seven British SE5s. Because his grave was lost, he is commemorated on the bronze panels and lies somewhere among the 24,000+ men in the mass grave."
    },
    {
      "name": "The Student Volunteers",
      "background": "Over 3,000 poorly trained young volunteers.",
      "story": "Died in the First Battle of Ypres (1914). They form the core of the 'Langemarck Myth', which heavily ties the site to the 'Studentenfriedhof' (Student Cemetery) propaganda narrative."
    },
    {
      "name": "Ptes. Albert Carlill & Leonard Lockley",
      "background": "British Teenage POWs.",
      "story": "They died in late 1918 and were originally buried near German graves. During the 1956 cemetery consolidation, their remains couldn't be separated, so they rest permanently in the German mass grave."
    },
    {
      "name": "Oberst (Colonel) Julius von List",
      "background": "Adolf Hitler's First Regimental Commander.",
      "story": "List commanded the Bavarian 16th Reserve Infantry Regiment, in which a young Adolf Hitler served as a dispatch runner. Killed at Gheluvelt in October 1914, his remains were later moved to the Langemarck Kameradengrab (mass grave)."
    },
    {
      "name": "The 7,977 'Unknowns'",
      "background": "Unidentified German Soldiers.",
      "story": "Of the nearly 25,000 men buried in the Kameradengrab (mass grave) at the cemetery entrance, 7,977 remain completely unidentified. Their presence stands as a haunting testament to the mechanized scale of slaughter on the Western Front."
    }
  ];

  const galleryGrid = document.createElement('div');
  galleryGrid.style.display = 'grid';
  galleryGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
  galleryGrid.style.gap = '20px';
  galleryGrid.style.marginTop = '40px';
  galleryGrid.style.marginBottom = '30px';

  profilesData.forEach((profile, index) => {
    const card = document.createElement('div');
    card.style.perspective = '1000px';
    card.style.height = '320px';
    card.style.cursor = 'pointer';

    const inner = document.createElement('div');
    inner.style.position = 'relative';
    inner.style.width = '100%';
    inner.style.height = '100%';
    inner.style.textAlign = 'center';
    inner.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)';
    inner.style.transformStyle = 'preserve-3d';

    card.onclick = () => {
      inner.style.transform = inner.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
    };

    const front = document.createElement('div');
    front.style.position = 'absolute';
    front.style.width = '100%';
    front.style.height = '100%';
    front.style.backfaceVisibility = 'hidden';
    front.style.background = '#2d333b';
    front.style.border = '1px solid #343a40';
    front.style.borderRadius = '8px';
    front.style.padding = '20px';
    front.style.display = 'flex';
    front.style.flexDirection = 'column';
    front.style.justifyContent = 'center';
    front.style.boxShadow = '0 10px 15px rgba(0,0,0,0.5)';
    front.innerHTML = `<div style="position:absolute;top:0;left:0;right:0;height:6px;background:#4a5c40;border-top-left-radius:8px;border-top-right-radius:8px;"></div>
      <h3 style="font-family:'Playfair Display',serif;font-size:1.3rem;color:#f8f9fa;margin-bottom:10px;">${profile.name}</h3>
      <p style="color:#adb5bd;font-size:0.95rem;line-height:1.5;">${profile.background}</p>
      <div style="position:absolute;bottom:15px;width:100%;text-align:center;font-size:0.75rem;color:#adb5bd;opacity:0.6;text-transform:uppercase;">Tap to reveal</div>`;

    const back = document.createElement('div');
    back.style.position = 'absolute';
    back.style.width = '100%';
    back.style.height = '100%';
    back.style.backfaceVisibility = 'hidden';
    back.style.background = '#2b3a32';
    back.style.border = '1px solid #343a40';
    back.style.borderRadius = '8px';
    back.style.padding = '20px';
    back.style.display = 'flex';
    back.style.flexDirection = 'column';
    back.style.justifyContent = 'center';
    back.style.transform = 'rotateY(180deg)';
    back.style.boxShadow = '0 10px 15px rgba(0,0,0,0.5)';
    back.innerHTML = `<p style="color:#f8f9fa;font-size:0.95rem;line-height:1.6;text-align:left;">${profile.story}</p>
      <div style="position:absolute;bottom:15px;width:100%;text-align:center;font-size:0.75rem;color:#adb5bd;opacity:0.6;text-transform:uppercase;">Tap to close</div>`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    galleryGrid.appendChild(card);
  });
  
  content.appendChild(galleryGrid);

  // Reflection Form
  const formContainer = document.createElement('div');
  formContainer.style.background = '#151917';
  formContainer.style.padding = '20px';
  formContainer.style.borderRadius = '8px';
  
  const formLabel = document.createElement('label');
  formLabel.innerText = "How did propaganda change the memory of these soldiers?";
  formLabel.style.display = 'block';
  formLabel.style.marginBottom = '12px';
  formLabel.style.color = '#e2e8f0';
  formLabel.style.fontWeight = '600';
  
  const textArea = document.createElement('textarea');
  textArea.id = 'langemarckReflectionText';
  textArea.style.width = '100%';
  textArea.style.minHeight = '100px';
  textArea.style.padding = '12px';
  textArea.style.borderRadius = '6px';
  textArea.style.border = '1px solid #4a5568';
  textArea.style.background = '#2d3748';
  textArea.style.color = 'white';
  textArea.style.fontFamily = 'inherit';
  textArea.style.resize = 'vertical';
  textArea.style.marginBottom = '15px';
  textArea.placeholder = "Type your reflection here...";
  
  // Load saved data
  const savedData = localStorage.getItem('langemarck_reflection');
  if (savedData) {
    textArea.value = savedData;
  }
  
  const saveBtn = document.createElement('button');
  saveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk" style="margin-right: 8px;"></i>Save Reflection';
  saveBtn.style.background = '#4a5d23';
  saveBtn.style.color = 'white';
  saveBtn.style.border = 'none';
  saveBtn.style.padding = '10px 20px';
  saveBtn.style.borderRadius = '6px';
  saveBtn.style.cursor = 'pointer';
  saveBtn.style.fontWeight = 'bold';
  saveBtn.style.transition = 'background 0.2s';
  saveBtn.style.width = '100%';
  
  saveBtn.onmouseover = () => saveBtn.style.background = '#5a702a';
  saveBtn.onmouseout = () => saveBtn.style.background = '#4a5d23';
  
  const statusMsg = document.createElement('div');
  statusMsg.style.color = '#86efac';
  statusMsg.style.fontSize = '0.9rem';
  statusMsg.style.marginTop = '10px';
  statusMsg.style.textAlign = 'center';
  statusMsg.style.minHeight = '20px';
  
  saveBtn.onclick = () => {
    localStorage.setItem('langemarck_reflection', textArea.value);
    statusMsg.innerText = 'Reflection saved to device.';
    setTimeout(() => statusMsg.innerText = '', 3000);
  };

  formContainer.appendChild(formLabel);
  formContainer.appendChild(textArea);
  formContainer.appendChild(saveBtn);
  formContainer.appendChild(statusMsg);

  content.appendChild(closeBtn);
  content.appendChild(header);
  content.appendChild(comparisonContainer);
  content.appendChild(formContainer);
  modal.appendChild(content);

  document.body.appendChild(modal);

  // Animate in
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
  });
}

window.openLangemarckMythModal = openLangemarckMythModal;

function closeLangemarckModal() {
  const modal = document.getElementById('langemarckModal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  }
}
