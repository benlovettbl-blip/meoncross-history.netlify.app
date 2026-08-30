export const examTimers = {};

export function toggleExamTimer(cardId, defaultMinutes) {
  const container = document.getElementById('timer-container-' + cardId);
  if (!container) return;
  if (container.style.display === 'none') {
    container.style.display = 'flex';
    if (!examTimers[cardId]) {
      examTimers[cardId] = {
        totalSeconds: defaultMinutes * 60,
        remainingSeconds: defaultMinutes * 60,
        interval: null,
        isRunning: false
      };
      updateTimerDisplay(cardId);
    }
  } else {
    container.style.display = 'none';
  }
}

export function adjustExamTimer(cardId, minutesChange) {
  const timer = examTimers[cardId];
  if (!timer || timer.isRunning) return;
  
  const newSeconds = timer.totalSeconds + (minutesChange * 60);
  if (newSeconds >= 60) {
    timer.totalSeconds = newSeconds;
    timer.remainingSeconds = newSeconds;
    updateTimerDisplay(cardId);
  }
}

export function startExamTimer(cardId) {
  const timer = examTimers[cardId];
  if (!timer) return;
  
  const btn = document.getElementById('timer-start-btn-' + cardId);
  if (!btn) return;
  
  if (timer.isRunning) {
    // Pause
    clearInterval(timer.interval);
    timer.isRunning = false;
    btn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
    btn.style.background = '#f59e0b';
    btn.onmouseout = function() { this.style.background='#f59e0b' };
    btn.onmouseover = function() { this.style.background='#d97706' };
  } else {
    // Start
    timer.isRunning = true;
    btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
    btn.style.background = '#f59e0b';
    btn.onmouseout = function() { this.style.background='#f59e0b' };
    btn.onmouseover = function() { this.style.background='#d97706' };
    
    timer.interval = setInterval(() => {
      if (timer.remainingSeconds > 0) {
        timer.remainingSeconds--;
        updateTimerDisplay(cardId);
      } else {
        clearInterval(timer.interval);
        timer.isRunning = false;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Time Up!';
        btn.style.background = '#ef4444';
        btn.onmouseout = function() { this.style.background='#ef4444' };
        btn.onmouseover = function() { this.style.background='#dc2626' };
      }
    }, 1000);
  }
}

export function resetExamTimer(cardId) {
  const timer = examTimers[cardId];
  if (!timer) return;
  
  clearInterval(timer.interval);
  timer.remainingSeconds = timer.totalSeconds;
  timer.isRunning = false;
  
  const btn = document.getElementById('timer-start-btn-' + cardId);
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
    btn.style.background = '#10b981';
    btn.onmouseout = function() { this.style.background='#10b981' };
    btn.onmouseover = function() { this.style.background='#059669' };
  }
  
  updateTimerDisplay(cardId);
}

function updateTimerDisplay(cardId) {
  const timer = examTimers[cardId];
  if (!timer) return;
  
  const m = Math.floor(timer.remainingSeconds / 60);
  const s = timer.remainingSeconds % 60;
  
  const display = document.getElementById('timer-display-' + cardId);
  if (display) {
    display.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    if (timer.remainingSeconds <= 60 && timer.remainingSeconds > 0) {
      display.style.color = '#dc2626';
    } else {
      display.style.color = '#1e3a8a';
    }
  }
  
  const progress = document.getElementById('timer-progress-' + cardId);
  if (progress) {
    const percentage = (timer.remainingSeconds / timer.totalSeconds) * 100;
    progress.style.width = percentage + '%';
    if (percentage < 20) {
      progress.style.background = '#ef4444';
    } else if (percentage < 50) {
      progress.style.background = '#f59e0b';
    } else {
      progress.style.background = '#3b82f6';
    }
  }
}

// Bind to window for backward compatibility while refactoring HTML onClick attributes
window.toggleExamTimer = toggleExamTimer;
window.adjustExamTimer = adjustExamTimer;
window.startExamTimer = startExamTimer;
window.resetExamTimer = resetExamTimer;
