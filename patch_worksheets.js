const fs = require('fs');
const path = require('path');

const folders = fs.readdirSync(__dirname).filter(f => fs.statSync(f).isDirectory());
const files = folders.map(f => [
  path.join(f, 'generate_worksheets.js'),
  path.join(f, 'generate_answer_key.js')
]).flat().filter(f => fs.existsSync(f));



files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let originalContent = content;

  // 1. Fix source image paths
  // Looks for things like `../water_and_sanitation/${source.src}` and replaces with `..${source.src}`
  content = content.replace(/\`\.\.\/[a-zA-Z0-9_]+\/\$\{([^\}]+)\}\`/g, '\`..${$1}\`');

  // 2. Fix hardcoded cover images
  // Replace <img src="assets/roman_latrine.jpg" ...> with <img src="..${unitData.cover_image}" ...>
  // Note: the exact html string varies, so let's match `<img src="assets/[^"]+"` and replace with `<img src="..${unitData.cover_image}"`
  content = content.replace(/<img\s+src="assets\/[^"]+"/g, '<img src="..${unitData.cover_image}"');

  // 3. Handle task.text fallback and block.image in narrative blocks
  const blockRenderTarget = /\<p class="narrative-block"[^\>]*\>\$\{block\.text\}\<\/p\>/;
  if (blockRenderTarget.test(content) && !content.includes('block.image')) {
    const replacement = `
      \${block.image ? \`<img src="..\${block.image.startsWith('/assets') ? block.image : '/assets/' + block.image}" style="max-width:100%; max-height: 250px; display:block; margin: 15px auto; border-radius: 6px; border: 1px solid #ccc;">\` : ''}
      <p class="narrative-block" id="para-\${bIdx+1}">\${block.text}</p>
    `;
    content = content.replace(blockRenderTarget, replacement.trim());
  }

  content = content.replace(/\$\{task\.text\}/g, '${task.text || task.question}');

  // 4. Fix GCSE Task sources logic (prevent crash if sources is undefined)
  content = content.replace(/if\s*\(\s*lesson\.gcse_task\s*\)\s*\{([\s\S]*?)let\s+srcA\s*=\s*lesson\.gcse_task\.sources\[0\]\.src/g, 'if (lesson.gcse_task && lesson.gcse_task.sources && lesson.gcse_task.sources[0] && lesson.gcse_task.sources[0].src) { $1 let srcA = lesson.gcse_task.sources[0].src');
  
  // Undo my bad regex from earlier if it exists
  content = content.replace(/if \(lesson\.gcse_task && lesson\.gcse_task\.sources && lesson\.gcse_task\.sources\[0\]\) \{/g, 'if (lesson.gcse_task && lesson.gcse_task.sources && lesson.gcse_task.sources[0] && lesson.gcse_task.sources[0].src) {');

  if (content !== originalContent) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Patched', f);
  } else {
    console.log('No changes needed for', f);
  }
});
