const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('great_war/index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const unitData = {
  title: "The Great War: Causes & Outbreak",
  lessons: []
};

let currentLesson = null;
let currentLessonNum = 0;

const pages = document.querySelectorAll('.page, .page-landscape');

pages.forEach(page => {
  const lessonTitleEl = page.querySelector('.lesson-title');
  if (lessonTitleEl) {
    const titleText = lessonTitleEl.textContent.trim();
    const lessonMatch = titleText.match(/Lesson\s+(\d+)/i);
    
    if (lessonMatch) {
      const lessonNum = parseInt(lessonMatch[1], 10);
      if (lessonNum !== currentLessonNum) {
        if (currentLesson) {
          unitData.lessons.push(currentLesson);
        }
        currentLessonNum = lessonNum;
        currentLesson = {
          id: `lesson_${lessonNum}`,
          title: titleText,
          narrative: [],
          sources: [],
          tasks: [],
          vocab: [],
          extended: null
        };
      }
    }
  }

  if (!currentLesson) return;

  const narratives = page.querySelectorAll('.narrative-col');
  narratives.forEach(p => {
    currentLesson.narrative.push(p.innerHTML.trim());
  });

  const imageBoxes = page.querySelectorAll('.image-plate-box');
  imageBoxes.forEach(box => {
    const titleEl = box.querySelector('.image-plate-title');
    const imgEl = box.querySelector('img');
    const captionEl = box.querySelector('.image-caption-explanation');
    
    currentLesson.sources.push({
      title: titleEl ? titleEl.textContent.trim() : "",
      src: imgEl ? imgEl.getAttribute('src') : "",
      caption: captionEl ? captionEl.innerHTML.trim() : ""
    });
  });

  const mapContainers = page.querySelectorAll('.map-container');
  mapContainers.forEach(container => {
    const imgs = container.querySelectorAll('img');
    imgs.forEach(img => {
      let title = "";
      if (img.previousElementSibling && img.previousElementSibling.tagName !== 'IMG') {
        title = img.previousElementSibling.textContent.trim();
      }
      currentLesson.sources.push({
        title: title,
        src: img.getAttribute('src'),
        caption: ""
      });
    });
  });

  const vocabItems = page.querySelectorAll('.vocab-item');
  vocabItems.forEach(item => {
    const strong = item.querySelector('strong');
    let term = strong ? strong.textContent.replace(':', '').trim() : "";
    let def = item.textContent.replace(term + ':', '').trim();
    if (term) {
      currentLesson.vocab.push({ term, definition: def });
    }
  });

  const questions = page.querySelectorAll('.task-question');
  questions.forEach(q => {
    currentLesson.tasks.push({
      type: "question",
      text: q.textContent.trim()
    });
  });

  if (page.querySelector('.fa-graduation-cap')) {
    const extendedP = page.querySelectorAll('p[style*="font-size: 8.5pt"]'); 
    if (extendedP.length > 0) {
      currentLesson.extended = {
        title: "Extended Scholarship",
        paragraphs: Array.from(extendedP).map(p => p.innerHTML.trim())
      };
    } else {
        // Fallback for extended paragraphs if style wasn't matched
        const paragraphs = Array.from(page.querySelectorAll('p')).slice(1);
        currentLesson.extended = {
            title: "Extended Scholarship",
            paragraphs: paragraphs.map(p => p.innerHTML.trim())
        };
    }
  }
});

if (currentLesson) {
  unitData.lessons.push(currentLesson);
}

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync('great_war_v2/data.js', jsContent);
console.log("Data extracted to great_war_v2/data.js");
