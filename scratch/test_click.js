const fs = require('fs');

const code = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/src/vertical_timeline.js', 'utf-8');

const mockWindow = {
    db: {
        'cme_new': {
            data: {
                lessons: [ { id: 'lesson_1', title: 'Test Lesson' } ]
            }
        }
    },
    currentUnitId: 'cme_new',
    dispatchEvent: function(e) {
        console.log('DISPATCHED EVENT:', e.type, e.detail);
    },
    scrollTo: function(opts) {
        console.log('SCROLLED:', opts);
    }
};

global.window = mockWindow;

// Extract just the openTimelineLesson function definition
const funcMatch = code.match(/window\.openTimelineLesson = function\(lessonId\) \{[\s\S]*?\};\n/);
if (funcMatch) {
    eval(funcMatch[0]);
    console.log('Function defined. Calling it...');
    window.openTimelineLesson('lesson_1');
    
    setTimeout(() => {
        console.log('Done waiting for scroll.');
    }, 100);
} else {
    console.log('Could not find function definition.');
}
