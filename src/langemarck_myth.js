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
