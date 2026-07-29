import { generateBulkWorkbookHtml } from './src/lessons.js';

async function test() {
  const html = await generateBulkWorkbookHtml('study', 'comfortable', false);
  const warCount = (html.match(/Key Events of a War/g) || []).length;
  console.log(`Found ${warCount} instances of 'Key Events of a War' in bulk HTML.`);
}

test();
