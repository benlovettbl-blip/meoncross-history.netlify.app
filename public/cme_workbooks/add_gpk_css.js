const fs = require('fs');
const path = require('path');

const cssToAppend = `

/* ========================================================= */
/* GPK 3D FLIPPABLE CARDS                                  */
/* ========================================================= */

.gpk-flippable {
  perspective: 1000px;
}

.gpk-flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
}

.gpk-flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.gpk-flip-card-front, .gpk-flip-card-back {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
}

.gpk-flip-card-front {
  /* Front relies on existing .gpk-card-unlocked and .gpk-card-locked styles */
}

.gpk-flip-card-back {
  background: url('https://www.transparenttextures.com/patterns/cardboard.png'), #d7c5a3;
  color: #2b1f13;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3);
  border: 4px solid #fff;
  border-radius: 12px;
}

/* Back Content Layout */
.gpk-back-content {
  display: flex;
  flex-direction: column;
  padding: 12px;
  height: 100%;
}

.gpk-back-content.locked {
  justify-content: center;
  align-items: center;
}

.gpk-back-header {
  text-align: center;
  border-bottom: 2px solid rgba(0,0,0,0.2);
  padding-bottom: 8px;
  margin-bottom: 12px;
}

.gpk-back-header h4 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: #a82e2e;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  line-height: 1.1;
  text-shadow: 1px 1px 0px rgba(255,255,255,0.5);
}

.gpk-bio {
  font-size: 0.85rem;
  font-family: 'Kalam', cursive;
  line-height: 1.3;
  color: #3e2c1c;
  flex-grow: 1;
  text-align: center;
}

.gpk-stats-box {
  background: rgba(255,255,255,0.4);
  border: 2px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 8px;
  font-size: 0.75rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
}

.gpk-stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  align-items: center;
}

.gpk-stat-row:last-child {
  margin-bottom: 0;
}

.stat-label {
  text-transform: uppercase;
  color: #555;
  width: 45%;
}

.stat-value {
  width: 50%;
  background: #bbb;
  height: 12px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  text-align: right;
  line-height: 12px;
  color: #fff;
  text-shadow: 1px 1px 0 #000;
  padding-right: 4px;
}

.stat-bar {
  position: absolute;
  top: 0; left: 0; height: 100%;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  z-index: -1;
}

/* ========================================================= */
/* FOIL PACK OPENING ANIMATION                             */
/* ========================================================= */

.pack-opening-container {
  position: relative;
  width: 300px; height: 420px;
  perspective: 1000px;
}

.foil-pack {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, silver, #e0e0e0, white, silver);
  border-radius: 10px;
  box-shadow: inset 0 0 20px rgba(255,255,255,0.8), 0 20px 50px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: opacity 0.5s ease;
  cursor: pointer;
  animation: floatPack 3s ease-in-out infinite alternate;
}

.foil-pack:hover {
  filter: brightness(1.1);
  transform: scale(1.05);
}

@keyframes floatPack {
  0% { transform: translateY(0) rotate(-2deg); }
  100% { transform: translateY(-20px) rotate(2deg); }
}

.foil-pack-body {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.foil-pack-body::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%; width: 200%; height: 200%;
  background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%);
  animation: foilGlare 4s infinite linear;
  pointer-events: none;
}

@keyframes foilGlare {
  0% { transform: translate(-50%, -50%); }
  100% { transform: translate(50%, 50%); }
}

.foil-pack-logo {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  color: #d11141;
  text-align: center;
  line-height: 1;
  text-shadow: 2px 2px 0px white, -1px -1px 0px white, 0px 0px 10px rgba(0,0,0,0.5);
  transform: rotate(-10deg);
}

.foil-pack-top-crimp, .foil-pack-bottom-crimp {
  height: 25px;
  background: repeating-linear-gradient(90deg, #999, #999 2px, #ccc 2px, #ccc 4px);
  border-top: 1px solid white;
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
.foil-pack-top-crimp { border-radius: 10px 10px 0 0; }
.foil-pack-bottom-crimp { border-radius: 0 0 10px 10px; }

/* Tear Animation */
.foil-pack.tearing {
  animation: tearPack 1s forwards;
  pointer-events: none;
}

@keyframes tearPack {
  0% { transform: scale(1); filter: brightness(1.5); }
  40% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1.2) translateY(100vh) rotate(20deg); opacity: 0; }
}

/* Revealed Card */
.revealed-card-container {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  transform: scale(0.5) translateY(100px) rotateY(180deg);
  opacity: 0;
  z-index: 40;
  transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.revealed-card-container.popped {
  transform: scale(1.2) translateY(0) rotateY(0deg);
  opacity: 1;
  z-index: 60;
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
}

.pack-confetti {
  position: absolute;
  width: 10px; height: 10px;
  background: red;
  animation: confettiFall 2s ease-out forwards;
}

@keyframes confettiFall {
  0% { transform: translateY(0) rotate(0); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
`;

const stylePath = path.join(__dirname, '../style.css');
fs.appendFileSync(stylePath, cssToAppend);
console.log('Appended CSS to style.css');
