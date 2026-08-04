import fs from 'fs';

const cssAppend = `
/* --- GARBAGE PAIL GAMIFICATION STYLES --- */

/* Card Binder Grid */
.card-binder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  padding: 24px 0;
}

/* Individual Card Container */
.gpk-card-container {
  position: relative;
  width: 100%;
  aspect-ratio: 2.5 / 3.5;
  border-radius: 12px;
  perspective: 1000px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gpk-card-container:hover {
  transform: translateY(-8px) scale(1.05);
  z-index: 10;
}

/* Locked Card Silhouette */
.gpk-card-locked {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
  transition: all 0.3s;
}

.gpk-card-locked i {
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 16px;
}

.gpk-card-locked .locked-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-main);
  font-style: italic;
  line-height: 1.4;
}

.gpk-card-container:hover .gpk-card-locked {
  border-color: rgba(255, 255, 255, 0.3);
}
.gpk-card-container:hover .gpk-card-locked i {
  color: rgba(255, 255, 255, 0.4);
}

/* Unlocked Card Image */
.gpk-card-unlocked {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
  overflow: hidden;
}

/* Holographic Foil Overlay Effect */
.gpk-card-unlocked::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    115deg,
    transparent 20%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.1) 40%,
    transparent 50%
  );
  background-size: 200% 200%;
  mix-blend-mode: color-dodge;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.gpk-card-container:hover .gpk-card-unlocked::after {
  opacity: 1;
  animation: holoSweep 2.5s ease-in-out infinite;
}

@keyframes holoSweep {
  0% { background-position: 200% 50%; }
  100% { background-position: -100% 50%; }
}

/* Pack Opening Overlay */
.pack-opening-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.pack-opening-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.pack-opening-title {
  font-family: var(--font-heading);
  font-size: 3rem;
  color: #ffb703;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 40px;
  text-shadow: 0 0 20px rgba(255, 183, 3, 0.5);
  animation: titlePulse 1.5s ease-in-out infinite alternate;
}

@keyframes titlePulse {
  0% { transform: scale(1); text-shadow: 0 0 20px rgba(255, 183, 3, 0.5); }
  100% { transform: scale(1.05); text-shadow: 0 0 40px rgba(255, 183, 3, 0.8), 0 0 10px #ffb703; }
}

.pack-opening-card-wrapper {
  width: 300px;
  height: 420px;
  position: relative;
  perspective: 1000px;
  transform: translateY(50px) scale(0.8) rotateY(-180deg);
  opacity: 0;
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
}

.pack-opening-overlay.active .pack-opening-card-wrapper {
  transform: translateY(0) scale(1) rotateY(0deg);
  opacity: 1;
}

.pack-opening-card-wrapper .gpk-card-unlocked {
  box-shadow: 0 0 50px rgba(255, 183, 3, 0.6), 0 0 0 2px rgba(255,255,255,0.5) inset;
}

.pack-opening-card-wrapper .gpk-card-unlocked::after {
  opacity: 1;
  animation: holoSweep 2s ease-in-out infinite;
}

.btn-collect-card {
  margin-top: 40px;
  background: var(--primary);
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 800;
  font-family: var(--font-heading);
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  transition-delay: 1.5s; /* Wait for card spin */
}

.pack-opening-overlay.active .btn-collect-card {
  opacity: 1;
  transform: translateY(0);
}

.btn-collect-card:hover {
  background: var(--primary-glow);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 20px rgba(6, 182, 212, 0.4);
}
`;

fs.appendFileSync('style.css', cssAppend);
console.log("Appended CSS successfully.");
