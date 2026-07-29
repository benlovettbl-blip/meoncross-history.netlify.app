const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const unitId = process.argv[2];

if (!unitId) {
    console.error('❌ Please provide a unit ID (e.g. npm run build-unit weimar_nazi_germany)');
    process.exit(1);
}

const unitDir = path.join(__dirname, '..', 'public', 'units', unitId);

console.log(`\n🚀 Initializing Master Compiler for Unit: [${unitId}]...`);

// 1. Scaffold Directory
if (!fs.existsSync(unitDir)) {
    fs.mkdirSync(unitDir, { recursive: true });
    console.log(`✅ Created directory: ${unitDir}`);
}

// 2. Scaffold data.js template
const dataJsPath = path.join(unitDir, 'data.js');
if (!fs.existsSync(dataJsPath)) {
    const template = `export const unitData = {
  title: '${unitId.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}',
  category: 'History',
  yearGroup: 'All',
  desc: 'A new historical enquiry.',
  icon: 'fa-book-open',
  color: '#3b82f6',
  bg: 'rgba(59, 130, 246, 0.1)',
  narrative_blocks: [],
  timeline: [],
  key_individuals: [],
  terminology: [],
  quiz: []
};
`;
    fs.writeFileSync(dataJsPath, template);
    console.log(`✅ Scaffolded fresh data.js template for ${unitId}`);
} else {
    console.log(`ℹ️ data.js already exists for ${unitId}, skipping template generation.`);
}

// 3. Rebuild Database
console.log('\n🔄 Rebuilding global database.json...');
try {
    execSync('node build_database.cjs', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log(`✅ Database rebuilt. [${unitId}] is now officially registered in the app!`);
} catch (err) {
    console.error('❌ Failed to rebuild database:', err.message);
    process.exit(1);
}

console.log(`\n🎉 Workflow Complete!`);
console.log(`\nNext Steps:`);
console.log(`1. Add your raw narrative text to public/units/${unitId}/data.js`);
console.log(`2. If you want AI to generate quizzes and flashcards, run the auto-quiz-generator skill on the file.`);
console.log(`3. Refresh your app dashboard to see the new unit dynamically loaded!\n`);
