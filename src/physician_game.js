export async function initPhysicianGame(container, task) {
  container.innerHTML = `
    <div style="background: #1e293b; color: white; padding: 20px; border-radius: 8px; text-align: center; font-family: 'Playfair Display', serif; border: 4px solid #475569;">
      <h3 style="color: #10b981; font-size: 1.8rem; margin-top: 0;"><i class="fa-solid fa-staff-snake"></i> The Plague Doctor</h3>
      <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #cbd5e1;">Loading patients...</p>
    </div>
  `;

  try {
    const patients = [
      {
        name: "William the Blacksmith",
        symptoms: "High fever, shivering, and large, painful black swellings (buboes) in his armpits and groin.",
        type: "Bubonic Plague",
        cures: [
          { name: "Bleeding with leeches", death: true, explanation: "You bled him to balance his Humours, but he was already weak. The loss of blood killed him faster." },
          { name: "Lancing the buboes", death: true, explanation: "You cut open the swellings to let the poison out, but the wound became infected with bacteria and he died of sepsis." },
          { name: "Applying a dried frog poultice", death: true, explanation: "You placed a dried toad on the buboes to 'draw out the poison'. It did absolutely nothing, and he died three days later." }
        ]
      },
      {
        name: "Agnes the Weaver",
        symptoms: "Coughing up blood, severe chest pain, and struggling to breathe.",
        type: "Pneumonic Plague",
        cures: [
          { name: "Smelling a sweet posy of flowers", death: true, explanation: "You told her to carry sweet-smelling flowers to block the 'Miasma' (bad air). She died the next day, and since it was pneumonic plague, she probably infected you by coughing on you!" },
          { name: "Drinking a mixture of vinegar and crushed emeralds", death: true, explanation: "A very expensive cure! But sadly, crushed emeralds do not kill the Yersinia pestis bacteria. She died in agony." },
          { name: "Praying and flagellation (whipping)", death: true, explanation: "You told her the plague was a punishment from God. She whipped herself to show repentance, but she still died of respiratory failure." }
        ]
      },
      {
        name: "John the Priest",
        symptoms: "His fingers and toes have turned completely black. He has a high fever and is vomiting constantly.",
        type: "Septicemic Plague",
        cures: [
          { name: "Bathing in urine", death: true, explanation: "You prescribed a bath in urine to balance the humours. Not only was it disgusting, but the bacteria had already poisoned his blood. He died within 24 hours." },
          { name: "Eating a diet of only dry bread", death: true, explanation: "You thought rich food was causing an imbalance of blood. Starving him didn't cure the septicemia. He died." },
          { name: "Tying a live chicken to him", death: true, explanation: "You tied a live chicken to his chest hoping the disease would transfer to the bird. The bird lived, but John died." }
        ]
      },
      {
        name: "Little Thomas",
        symptoms: "A runny nose, a mild cough, and he says he feels a bit tired.",
        type: "The Common Cold",
        cures: [
          { name: "Rest and chicken soup", death: false, explanation: "Excellent! He just had a common cold. He recovered perfectly after a few days of rest." },
          { name: "Bleeding with leeches", death: true, explanation: "You bled a child for a minor cold! He was already small and the blood loss killed him. You are a terrible physician!" },
          { name: "Trepanning (drilling a hole in his skull)", death: true, explanation: "You drilled a hole in his head to let the 'evil spirits' out. The shock and infection killed him instantly." }
        ]
      }
    ];

    let currentPatient = null;

    const renderIdle = () => {
      container.innerHTML = `
        <div style="background: #1e293b; color: white; padding: 25px; border-radius: 8px; text-align: center; font-family: 'Playfair Display', serif; border: 4px solid #475569; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
          <h3 style="color: #10b981; font-size: 2rem; margin-top: 0; margin-bottom: 10px;"><i class="fa-solid fa-staff-snake"></i> The Plague Doctor</h3>
          <p style="font-family: 'Inter', sans-serif; font-size: 1.1rem; color: #e2e8f0; margin-bottom: 25px;">Welcome to 1348. You are a medieval physician. Patients are lining up outside your door with terrifying symptoms. Can you cure them using your knowledge of the Four Humours and Miasma?</p>
          <button id="btn-next" style="background: #10b981; color: white; border: none; padding: 12px 24px; font-size: 1.2rem; font-weight: bold; border-radius: 6px; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-door-open"></i> See the First Patient</button>
        </div>
      `;
      document.getElementById('btn-next').onclick = pickPatient;
    };

    const pickPatient = () => {
      currentPatient = patients[Math.floor(Math.random() * patients.length)];
      renderConsultation();
    };

    const renderConsultation = () => {
      container.innerHTML = `
        <div style="background: #f8fafc; color: #0f172a; padding: 0; border-radius: 8px; border: 4px solid #0f766e; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
          <div style="background: #0f766e; color: white; padding: 15px; text-align: center; font-family: 'Playfair Display', serif;">
            <h3 style="margin: 0; font-size: 1.8rem; color: #a7f3d0;">Consultation</h3>
          </div>
          <div style="padding: 20px; font-family: 'Inter', sans-serif; text-align: center;">
            <div style="font-size: 1.8rem; font-weight: 800; margin-bottom: 20px; color: #115e59;">${currentPatient.name}</div>
            
            <div style="background: #fee2e2; border: 2px dashed #ef4444; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
              <div style="font-weight: bold; color: #991b1b; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px;">Symptoms</div>
              <div style="font-size: 1.3rem; font-weight: 600; color: #7f1d1d; margin-top: 5px;">"${currentPatient.symptoms}"</div>
            </div>
            
            <h4 style="font-size: 1.3rem; margin-bottom: 15px; font-family: 'Playfair Display', serif;">How will you treat them, Doctor?</h4>
            <div style="display: flex; flex-direction: column; gap: 10px; max-width: 500px; margin: 0 auto;">
              ${currentPatient.cures.map((cure, idx) => `
                <button class="cure-btn" data-idx="${idx}" style="background: #334155; color: white; border: none; padding: 12px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold; transition: background 0.2s;">
                  ${cure.name}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      
      document.querySelectorAll('.cure-btn').forEach(btn => {
        btn.onmouseover = () => { btn.style.background = '#475569'; };
        btn.onmouseout = () => { btn.style.background = '#334155'; };
        btn.onclick = () => renderOutcome(btn.getAttribute('data-idx'));
      });
    };

    const renderOutcome = (cureIdx) => {
      const selectedCure = currentPatient.cures[cureIdx];
      
      container.innerHTML = `
        <div style="background: #f8fafc; color: #0f172a; padding: 0; border-radius: 8px; border: 4px solid #334155; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
           <div style="background: #1e293b; color: white; padding: 15px; text-align: center; font-family: 'Playfair Display', serif;">
            <h3 style="margin: 0; font-size: 1.8rem; color: ${selectedCure.death ? '#ef4444' : '#10b981'};">The Outcome</h3>
          </div>
          <div style="padding: 20px; font-family: 'Inter', sans-serif; text-align: center;">
            <div style="font-size: 1.8rem; font-weight: 800; margin-bottom: 15px; color: ${selectedCure.death ? '#b91c1c' : '#059669'}; text-transform: uppercase;">
              ${selectedCure.death ? 'THE PATIENT DIED 💀' : 'THE PATIENT LIVED! 🎉'}
            </div>
            
            <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 10px; color: #334155;">
              Actual Diagnosis: <span style="color: #b91c1c;">${currentPatient.type}</span>
            </p>
            
            <p style="font-size: 1.1rem; max-width: 600px; margin: 0 auto 20px; line-height: 1.6; background: #e2e8f0; padding: 15px; border-radius: 6px;">
              ${selectedCure.explanation}
            </p>
            
            <button id="btn-again" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; font-weight: bold;"><i class="fa-solid fa-rotate-right"></i> Next Patient</button>
          </div>
        </div>
      `;
      
      document.getElementById('btn-again').onclick = pickPatient;
    };

    renderIdle();

  } catch (err) {
    container.innerHTML = `<div style="padding: 20px; color: red;">Error loading game: ${err.message}</div>`;
  }
}
