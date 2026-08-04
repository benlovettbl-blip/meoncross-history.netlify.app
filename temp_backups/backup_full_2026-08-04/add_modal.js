const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

if (!code.includes('window.openModal = function(src)')) {
  const modalCode = `
  window.openModal = function(src) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0,0,0,0.85)';
    modal.style.zIndex = '999999';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.cursor = 'zoom-out';
    modal.onclick = () => modal.remove();
    
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    
    modal.appendChild(img);
    document.body.appendChild(modal);
  };
  `;
  code = code + '\n\n' + modalCode;
  fs.writeFileSync('src/core_app.js', code, 'utf8');
  console.log('Added modal code');
}
