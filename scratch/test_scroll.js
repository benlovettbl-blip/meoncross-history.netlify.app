const fs = require('fs');

async function testRender() {
    const js = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/src/vertical_timeline.js', 'utf-8');
    const hasScroll = js.includes('window.scrollTo');
    console.log('vertical_timeline has scrollTo:', hasScroll);
}

testRender();
