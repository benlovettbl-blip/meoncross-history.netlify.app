export function renderThematicMatrix(contentArea, unitData) {
  contentArea.innerHTML = '';
  
  // Create Header
  const header = document.createElement('div');
  header.className = 'phase-card';
  header.style.textAlign = 'center';
  header.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)';
  header.style.color = 'white';
  header.innerHTML = `
    <h2 style="font-size: 2rem; margin-bottom: 10px; font-family: 'Playfair Display', serif;"><i class="fa-solid fa-timeline"></i> The Thematic Matrix</h2>
    <p style="font-size: 1.1rem; opacity: 0.9; max-width: 800px; margin: 0 auto;">
      Shatter the chronological silos! Use this matrix to track Change and Continuity across 800 years of medical history. Select a theme to compare it side-by-side across all time periods.
    </p>
  `;
  contentArea.appendChild(header);

  const themes = [
    {
      id: 'causes',
      title: 'Ideas about Cause of Disease',
      icon: 'fa-virus',
      keywords: ['cause', 'understanding']
    },
    {
      id: 'treatment',
      title: 'Prevention & Treatment',
      icon: 'fa-staff-snake',
      keywords: ['prevent', 'treat', 'surgery', 'hospital', 'illness', 'wounds']
    },
    {
      id: 'case_studies',
      title: 'Key Individuals & Case Studies',
      icon: 'fa-user-doctor',
      keywords: ['respond', 'significant', 'discoveries', 'penicillin']
    },
    {
      id: 'western_front',
      title: 'The Western Front (Context)',
      icon: 'fa-helmet-battle',
      keywords: ['western front', 'trench', 'ramc', 'fany', 'evacuation']
    }
  ];

  // Group lessons by theme and period
  // We'll figure out the period from the prefix (KT1, KT2, etc.)
  const periods = [
    { prefix: 'KT1', name: 'Medieval (c1250-c1500)' },
    { prefix: 'KT2', name: 'Renaissance (c1500-c1700)' },
    { prefix: 'KT3', name: '18th & 19th C (c1700-c1900)' },
    { prefix: 'KT4', name: 'Modern (c1900-present)' }
  ];

  const matrixContainer = document.createElement('div');
  matrixContainer.style.display = 'grid';
  matrixContainer.style.gridTemplateColumns = '250px repeat(4, 1fr)';
  matrixContainer.style.gap = '15px';
  matrixContainer.style.overflowX = 'auto';
  matrixContainer.style.paddingBottom = '20px';
  
  // Top Header Row (Periods)
  matrixContainer.innerHTML = `
    <div style="background: transparent;"></div>
    ${periods.map(p => `
      <div style="background: #0f172a; color: white; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; font-size: 1.1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        ${p.name}
      </div>
    `).join('')}
  `;

  themes.forEach(theme => {
    // Theme Row Header
    const themeHeader = document.createElement('div');
    themeHeader.style.background = '#1e293b';
    themeHeader.style.color = 'white';
    themeHeader.style.padding = '20px';
    themeHeader.style.borderRadius = '8px';
    themeHeader.style.display = 'flex';
    themeHeader.style.flexDirection = 'column';
    themeHeader.style.justifyContent = 'center';
    themeHeader.style.alignItems = 'center';
    themeHeader.style.textAlign = 'center';
    themeHeader.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
    themeHeader.style.cursor = 'pointer';
    themeHeader.style.transition = 'transform 0.2s';
    themeHeader.onmouseover = () => themeHeader.style.transform = 'scale(1.02)';
    themeHeader.onmouseout = () => themeHeader.style.transform = 'scale(1)';
    themeHeader.innerHTML = `
      <i class="fa-solid ${theme.icon}" style="font-size: 2rem; margin-bottom: 10px; color: #38bdf8;"></i>
      <div style="font-weight: bold; font-size: 1.1rem;">${theme.title}</div>
      <div style="font-size: 0.8rem; margin-top: 10px; color: #94a3b8;"><i class="fa-solid fa-play"></i> Compare Theme</div>
    `;
    themeHeader.onclick = () => renderThemeComparison(theme, periods, unitData, contentArea);
    matrixContainer.appendChild(themeHeader);

    // Cells for each period
    periods.forEach(period => {
      const cell = document.createElement('div');
      cell.style.background = '#f8fafc';
      cell.style.border = '1.5px solid #cbd5e1';
      cell.style.borderRadius = '8px';
      cell.style.padding = '15px';
      cell.style.display = 'flex';
      cell.style.flexDirection = 'column';
      cell.style.gap = '10px';

      // Find lessons matching this theme and period
      const matchingLessons = unitData.lessons.filter(l => {
        const isPeriod = l.title.startsWith(period.prefix);
        const isTheme = theme.keywords.some(k => l.title.toLowerCase().includes(k));
        return isPeriod && isTheme;
      });

      if (matchingLessons.length > 0) {
        matchingLessons.forEach(l => {
          const btn = document.createElement('button');
          btn.className = 'btn-secondary';
          btn.style.width = '100%';
          btn.style.textAlign = 'left';
          btn.style.padding = '10px';
          btn.style.fontSize = '0.9rem';
          btn.style.border = '1px solid #94a3b8';
          btn.style.borderRadius = '6px';
          btn.style.cursor = 'pointer';
          btn.style.background = '#ffffff';
          btn.innerHTML = `<i class="fa-solid fa-file-lines" style="color: #3b82f6; margin-right: 5px;"></i> ${l.title.replace(period.prefix + '.', '').replace(period.prefix + ':', '').trim()}`;
          btn.onclick = () => {
             // Let's fire a custom event to render this specific lesson in the main app
             const event = new CustomEvent('renderLessonEvent', { detail: l });
             window.dispatchEvent(event);
          };
          cell.appendChild(btn);
        });
      } else {
        cell.innerHTML = `<div style="color: #94a3b8; font-style: italic; text-align: center; margin-top: 20px;">No specific lesson</div>`;
      }
      matrixContainer.appendChild(cell);
    });
  });

  contentArea.appendChild(matrixContainer);
}

function renderThemeComparison(theme, periods, unitData, contentArea) {
  contentArea.innerHTML = '';
  
  const backBtn = document.createElement('button');
  backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back to Matrix';
  backBtn.style.padding = '10px 20px';
  backBtn.style.background = '#0f172a';
  backBtn.style.color = 'white';
  backBtn.style.border = 'none';
  backBtn.style.borderRadius = '6px';
  backBtn.style.cursor = 'pointer';
  backBtn.style.marginBottom = '20px';
  backBtn.onclick = () => renderThematicMatrix(contentArea, unitData);
  contentArea.appendChild(backBtn);

  const header = document.createElement('div');
  header.className = 'phase-card';
  header.style.textAlign = 'center';
  header.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
  header.style.color = 'white';
  header.innerHTML = `
    <h2 style="font-size: 2rem; margin-bottom: 5px;"><i class="fa-solid ${theme.icon}"></i> ${theme.title}</h2>
    <p>Compare how this theme changed and continued across 800 years.</p>
  `;
  contentArea.appendChild(header);

  const comparisonContainer = document.createElement('div');
  comparisonContainer.style.display = 'grid';
  comparisonContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
  comparisonContainer.style.gap = '20px';

  periods.forEach(period => {
    const periodCol = document.createElement('div');
    periodCol.style.background = '#f8fafc';
    periodCol.style.border = '2px solid #cbd5e1';
    periodCol.style.borderRadius = '8px';
    periodCol.style.overflow = 'hidden';
    
    periodCol.innerHTML = `
      <div style="background: #1e293b; color: white; padding: 15px; text-align: center; font-weight: bold; font-size: 1.1rem;">
        ${period.name}
      </div>
      <div style="padding: 15px;" id="col-${period.prefix}">
      </div>
    `;
    comparisonContainer.appendChild(periodCol);

    const colContent = periodCol.querySelector(`#col-${period.prefix}`);
    
    const matchingLessons = unitData.lessons.filter(l => {
      return l.title.startsWith(period.prefix) && theme.keywords.some(k => l.title.toLowerCase().includes(k));
    });

    if (matchingLessons.length > 0) {
      matchingLessons.forEach(l => {
        const lessonDiv = document.createElement('div');
        lessonDiv.style.marginBottom = '20px';
        lessonDiv.innerHTML = `<h4 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">${l.title.split(':')[1] ? l.title.split(':')[1].trim() : l.title}</h4>`;
        
        if (l.narrative_blocks) {
            l.narrative_blocks.forEach(block => {
                if (block.text && !block.text.includes('[Key Individual')) {
                    // Truncate text for summary view, replacing newlines with spaces
                    let summaryText = block.text.replace(/\n+/g, ' ');
                    if (summaryText.length > 150) {
                        let truncated = summaryText.substring(0, 150);
                        let lastSpace = truncated.lastIndexOf(' ');
                        if (lastSpace > 0) truncated = truncated.substring(0, lastSpace);
                        summaryText = truncated + '...';
                    }
                    // Bold the subtitle if any
                    summaryText = summaryText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    
                    lessonDiv.innerHTML += `
                        <div style="background: #ffffff; border-left: 3px solid #38bdf8; padding: 10px; margin-bottom: 10px; font-size: 0.9rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            ${summaryText}
                        </div>
                    `;
                }
            });
        }
        colContent.appendChild(lessonDiv);
      });
    } else {
      colContent.innerHTML = `<div style="color: #94a3b8; font-style: italic; text-align: center;">No specific data for this period</div>`;
    }
  });

  contentArea.appendChild(comparisonContainer);
}
