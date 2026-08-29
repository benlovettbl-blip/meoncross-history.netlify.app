const fs = require('fs');
let data = fs.readFileSync('src/core_app.js', 'utf8');

const replacement = `navContainer.appendChild(homeLink);

    // Trip Days Sidebar Tabs
    if (unitData.type === 'trip') {
      const days = [];
      unitData.lessons.forEach((lesson, index) => {
        if (lesson.id && lesson.id.startsWith('day_')) days.push({ lesson, index });
      });
      days.forEach(d => {
        const dayLink = document.createElement('a');
        dayLink.className = 'lesson-link';
        dayLink.innerHTML = '<i class="fa-solid fa-map-location-dot" style="margin-right: 8px;"></i> ' + (d.lesson.title.split(':')[0] || d.lesson.title);
        dayLink.href = '#';
        dayLink.onclick = (e) => {
          e.preventDefault();
          document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
          dayLink.classList.add('active');
          window.renderLessonByIndex(d.index);
        };
        navContainer.appendChild(dayLink);
      });
    }

    // The Fallen / Local Heroes Sidebar Accordion (Trips only)
    if (unitData.type === 'trip') {`;

data = data.replace(/navContainer\.appendChild\(homeLink\);[\s\S]*?\/\/ The Fallen \/ Local Heroes Sidebar Accordion \(Trips only\)[\s\S]*?if \(unitData\.type === 'trip'\) \{/, replacement);

fs.writeFileSync('src/core_app.js', data);
console.log('Successfully inserted day tabs into sidebar!');
