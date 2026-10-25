const fs = require('fs');
const content = fs.readFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/efc3adb5-b930-4aa0-8eff-b383b1c606ab/.system_generated/steps/2202/content.md', 'utf8');

const match = content.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
if (match) {
  const json = JSON.parse(match[1]);
  const pageProps = json.props.pageProps;
  console.log('Keys in pageProps:', Object.keys(pageProps));
  const story = pageProps.story || pageProps.data || pageProps;
  console.log('Story keys:', Object.keys(story));
  
  // Find all objects with image or caption or title
  function searchObjects(obj, depth = 0) {
    if (!obj || depth > 8) return;
    if (typeof obj === 'object') {
      if (obj.caption || obj.image || obj.alt || obj.title) {
        console.log('Found media item:', {
          title: obj.title,
          caption: obj.caption,
          alt: obj.alt,
          url: obj.image?.url || obj.url
        });
      }
      for (const k of Object.keys(obj)) {
        searchObjects(obj[k], depth + 1);
      }
    }
  }
  searchObjects(story);
}
