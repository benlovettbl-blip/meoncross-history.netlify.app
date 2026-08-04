import fs from 'fs';

const css = `
/* GAMIFICATION ROADMAP STYLES */
.roadmap-node {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 3px solid var(--border-glass);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.roadmap-node.locked {
  background: var(--bg-sidebar);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
}

.roadmap-node.unlocked {
  border-color: var(--primary);
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.4);
  background-size: cover;
  background-position: center;
}

.roadmap-node.unlocked:hover {
  transform: scale(1.15) translateY(-5px);
  box-shadow: 0 0 25px rgba(37, 99, 235, 0.6);
  z-index: 20;
}

.roadmap-node .lock-icon {
  font-size: 1.5rem;
  opacity: 0.5;
}

.roadmap-node .node-label {
  position: absolute;
  bottom: -25px;
  width: 120px;
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
  pointer-events: none;
}

.roadmap-node.unlocked .node-label {
  color: var(--accent);
}

.roadmap-path-line {
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 4;
  fill: none;
  transition: stroke 1s ease;
}

.roadmap-path-line.active {
  stroke: var(--primary);
  filter: drop-shadow(0 0 8px var(--primary));
  animation: dash 20s linear infinite;
  stroke-dasharray: 10, 10;
}

@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}
`;

fs.appendFileSync('style.css', css);
console.log("Appended roadmap CSS.");
