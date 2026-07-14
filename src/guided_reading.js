export function initGuidedReadingTask(container, guidedReadingData, globalState) {
  const currentLessonIndex = globalState ? globalState.currentLessonIndex : 0;
  
  // Find the guided reading data for the current lesson, or use the first one if not found
  let readingData = guidedReadingData.find(d => d.lesson_index === currentLessonIndex);
  if (!readingData && guidedReadingData.length > 0) {
    readingData = guidedReadingData[0];
  }

  if (!readingData) {
    container.innerHTML = `<div style="padding: 2rem; text-align: center; color: #64748b;">No guided reading extract available for this lesson.</div>`;
    return;
  }

  container.innerHTML = `
    <div class="guided-reading-container" style="background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; margin-top: 20px;">
      
      <!-- Header: Image, Title, Author, and Questions -->
      <div style="display: flex; gap: 30px; align-items: flex-start; margin-bottom: 30px; flex-wrap: wrap;">
        <img src="${readingData.cover_image}" alt="Book Cover" style="width: 150px; height: auto; border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        
        <div style="flex: 1; min-width: 300px;">
          <h2 style="margin: 0 0 10px 0; color: #1e293b; font-size: 2rem; font-family: 'Playfair Display', serif;">${readingData.book_title}</h2>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 1.2rem; color: #475569;"><i class="fa-solid fa-pen-nib"></i> ${readingData.author}</span>
            <button class="btn btn-secondary" onclick="document.getElementById('author-context-${readingData.lesson_index}').classList.toggle('visible')" style="padding: 4px 10px; font-size: 0.85rem; background: #f8fafc; color: #3b82f6; border: 1px solid #bfdbfe;">
              <i class="fa-solid fa-circle-info"></i> Author Context
            </button>
          </div>
          <div style="margin-bottom: 20px;">
            ${readingData.is_adapted !== undefined ? (readingData.is_adapted 
              ? `<div style="display: inline-block; padding: 4px 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; font-size: 0.85rem; color: #b45309; font-style: italic;"><i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b;"></i> Historical Adaptation: Rewritten for the classroom based on themes from the original work.</div>`
              : `<div style="display: inline-block; padding: 4px 10px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; font-size: 0.85rem; color: #047857; font-style: italic;"><i class="fa-solid fa-book-open-reader" style="color: #10b981;"></i> Original Source: An exact, word-for-word extract from the public domain text.</div>`
            ) : ''}
          </div>

          <div id="author-context-${readingData.lesson_index}" style="display: none; margin-bottom: 20px; padding: 15px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 0 6px 6px 0; font-size: 0.95rem; color: #1e3a8a;">
            ${readingData.author_context}
          </div>

          <div style="margin-bottom: 20px;">
            <button class="btn btn-primary" onclick="const a = document.getElementById('audio-${readingData.lesson_index}'); if(a.paused){a.play(); this.innerHTML='<i class=\\\'fa-solid fa-pause\\\'></i> Pause Reading';}else{a.pause(); this.innerHTML='<i class=\\\'fa-solid fa-play\\\'></i> Play Audio Reading';}" style="display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px;">
              <i class="fa-solid fa-play"></i> Play Audio Reading
            </button>
            <audio id="audio-${readingData.lesson_index}" src="${readingData.audio_file}" onended="this.previousElementSibling.innerHTML='<i class=\\\'fa-solid fa-play\\\'></i> Play Audio Reading';"></audio>
          </div>
          
          <!-- Think-Pair-Share Section -->
          <div style="background: #fdf2f8; padding: 25px; border-radius: 8px; border: 1px solid #fbcfe8; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #be185d;">
              <i class="fa-solid fa-users" style="font-size: 1.5rem;"></i>
              <h3 style="margin: 0; font-size: 1.4rem; font-weight: 700;">Think-Pair-Share</h3>
            </div>
            <p style="color: #831843; font-size: 1.15rem; font-weight: 600; line-height: 1.5; margin: 0;">
              ${readingData.hinge_question ? readingData.hinge_question : "Discuss the main argument the author makes in this extract. Do you agree?"}
            </p>
            <div style="display: flex; gap: 15px; margin-top: 20px; font-size: 0.95rem; color: #9d174d;">
              <div style="flex: 1; background: rgba(255,255,255,0.6); padding: 10px; border-radius: 6px; text-align: center;"><i class="fa-regular fa-lightbulb"></i> 1 min Think</div>
              <div style="flex: 1; background: rgba(255,255,255,0.6); padding: 10px; border-radius: 6px; text-align: center;"><i class="fa-solid fa-user-group"></i> 2 min Pair</div>
              <div style="flex: 1; background: rgba(255,255,255,0.6); padding: 10px; border-radius: 6px; text-align: center;"><i class="fa-solid fa-bullhorn"></i> 2 min Share</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Extract Text -->
      <div class="reading-extract-container" style="position: relative;">
        <div class="reading-extract" style="font-family: 'Playfair Display', serif; font-size: 1.25rem; line-height: 1.8; color: #1e293b; padding: 30px; background: #fafafa; border-radius: 8px; border: 1px solid #e2e8f0; max-height: 600px; overflow-y: auto;">
          ${readingData.extract.split(/\n+/).map(p => `<p style="margin-bottom: 1.5rem;">${p}</p>`).join('')}
        </div>
        <div style="position: absolute; bottom: 1px; left: 1px; right: 1px; height: 50px; background: linear-gradient(transparent, #fafafa); pointer-events: none; border-radius: 0 0 8px 8px;"></div>
      </div>
      
    </div>
  `;

  // Add a quick style block for the toggle
  const style = document.createElement('style');
  style.innerHTML = `
    #author-context-${readingData.lesson_index}.visible {
      display: block !important;
    }
    @media (max-width: 900px) {
      .guided-reading-container {
        flex-direction: column;
      }
    }
  `;
  container.appendChild(style);
}
