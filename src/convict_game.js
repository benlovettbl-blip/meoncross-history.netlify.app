export async function initConvictGame(container) {
  container.innerHTML = `
    <div style="background: #1e293b; color: white; padding: 20px; border-radius: 8px; text-align: center; font-family: 'Playfair Display', serif; border: 4px solid #475569;">
      <h3 style="color: #facc15; font-size: 1.8rem; margin-top: 0;"><i class="fa-solid fa-gavel"></i> Old Bailey Justice</h3>
      <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #cbd5e1;">Loading court records...</p>
    </div>
  `;

  try {
    const response = await fetch('/assets/first_fleet_database.txt');
    const text = await response.text();
    const lines = text.split('\n');
    
    // Parse valid convicts
    const convicts = [];
    for (const line of lines) {
      const parts = line.split('\t');
      if (parts.length > 15) {
        const age = parseInt(parts[0]);
        const crime = parts[3] ? parts[3].trim() : '';
        const gender = parts[5] ? parts[5].trim() : '';
        const firstName = parts[6] ? parts[6].trim() : '';
        const notes = parts[8] ? parts[8].trim() : '';
        const sentence = parts[10] ? parts[10].trim() : '';
        const ship = parts[11] ? parts[11].trim() : '';
        const lastName = parts[13] ? parts[13].trim() : '';
        const trade = parts[15] ? parts[15].trim() : 'No trade recorded';

        if (age && crime && firstName && lastName && sentence) {
          convicts.push({ age, crime, firstName, lastName, sentence, ship, trade, notes });
        }
      }
    }

    let currentConvict = null;

    const renderIdle = () => {
      container.innerHTML = `
        <div style="background: #1e293b; color: white; padding: 25px; border-radius: 8px; text-align: center; font-family: 'Playfair Display', serif; border: 4px solid #475569; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
          <h3 style="color: #facc15; font-size: 2rem; margin-top: 0; margin-bottom: 10px;"><i class="fa-solid fa-scale-balanced"></i> Old Bailey Justice</h3>
          <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #e2e8f0; margin-bottom: 25px;">Welcome to the Old Bailey, London's Central Criminal Court in the 1780s. You are the judge. Will you show mercy, or is it the rope?</p>
          <button id="btn-next" style="background: #facc15; color: #1e293b; border: none; padding: 12px 24px; font-size: 1.2rem; font-weight: bold; border-radius: 6px; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-gavel"></i> Bring in the First Prisoner</button>
        </div>
      `;
      document.getElementById('btn-next').onclick = pickConvict;
    };

    const pickConvict = () => {
      currentConvict = convicts[Math.floor(Math.random() * convicts.length)];
      renderTrial();
    };

    const renderTrial = () => {
      container.innerHTML = `
        <div style="background: #f8fafc; color: #0f172a; padding: 0; border-radius: 8px; border: 4px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
          <div style="background: #334155; color: white; padding: 15px; text-align: center; font-family: 'Playfair Display', serif;">
            <h3 style="margin: 0; font-size: 1.8rem; color: #facc15;">The Accused</h3>
          </div>
          <div style="padding: 20px; font-family: 'Inter', sans-serif; text-align: center;">
            <div style="font-size: 1.8rem; font-weight: 800; margin-bottom: 10px; color: #b91c1c;">${currentConvict.firstName} ${currentConvict.lastName}</div>
            <div style="font-size: 1.2rem; margin-bottom: 5px;"><strong>Age:</strong> ${currentConvict.age}</div>
            <div style="font-size: 1.2rem; margin-bottom: 20px;"><strong>Trade:</strong> ${currentConvict.trade}</div>
            <div style="background: #fee2e2; border: 2px dashed #ef4444; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
              <div style="font-weight: bold; color: #991b1b; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px;">Crime Committed</div>
              <div style="font-size: 1.4rem; font-weight: 600; color: #7f1d1d; margin-top: 5px;">"${currentConvict.crime}"</div>
            </div>
            
            <h4 style="font-size: 1.3rem; margin-bottom: 15px; font-family: 'Playfair Display', serif;">What is your verdict, Judge?</h4>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <button class="judge-btn" data-guess="prison" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold;">1 Month Prison</button>
              <button class="judge-btn" data-guess="transport" style="background: #d97706; color: white; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold;">7 Years Transportation</button>
              <button class="judge-btn" data-guess="death" style="background: #111827; color: white; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold;">Death by Hanging</button>
            </div>
          </div>
        </div>
      `;
      
      document.querySelectorAll('.judge-btn').forEach(btn => {
        btn.onclick = () => renderReveal();
      });
    };

    const renderReveal = () => {
      let isDeath = currentConvict.sentence.toLowerCase().includes('death');
      
      container.innerHTML = `
        <div style="background: #f8fafc; color: #0f172a; padding: 0; border-radius: 8px; border: 4px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
           <div style="background: #1e293b; color: white; padding: 15px; text-align: center; font-family: 'Playfair Display', serif;">
            <h3 style="margin: 0; font-size: 1.8rem; color: #facc15;">The Real Historical Verdict</h3>
          </div>
          <div style="padding: 20px; font-family: 'Inter', sans-serif; text-align: center;">
            <div style="font-size: 1.6rem; font-weight: 800; margin-bottom: 15px; color: ${isDeath ? '#b91c1c' : '#b45309'}; text-transform: uppercase;">
              ${currentConvict.sentence}
            </div>
            
            <p style="font-size: 1.1rem; max-width: 600px; margin: 0 auto 20px; line-height: 1.6;">
              In the 18th century, the 'Bloody Code' meant that even minor crimes like "${currentConvict.crime}" were brutally punished. 
              ${isDeath ? "Although sentenced to death, their sentence was later commuted (reduced) to transportation." : "Prisons were full, so transportation was the primary severe punishment."}
            </p>
            
            <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 15px; text-align: left; margin-bottom: 25px;">
              <strong>Ship:</strong> ${currentConvict.ship || 'Unknown'}<br>
              ${currentConvict.notes ? `<strong style="display:block; margin-top:8px;">Database Notes:</strong> <span style="font-style:italic;">${currentConvict.notes}</span>` : ''}
            </div>
            
            <button id="btn-again" style="background: #334155; color: white; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold;"><i class="fa-solid fa-rotate-right"></i> Try Another Case</button>
          </div>
        </div>
      `;
      
      document.getElementById('btn-again').onclick = pickConvict;
    };

    if (convicts.length > 0) {
      renderIdle();
    } else {
      container.innerHTML = `<div style="padding: 20px; color: red;">Failed to parse database.</div>`;
    }

  } catch (err) {
    container.innerHTML = `<div style="padding: 20px; color: red;">Error loading game: ${err.message}</div>`;
  }
}
