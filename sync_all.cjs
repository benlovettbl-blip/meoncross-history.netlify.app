const { execSync } = require('child_process');

const units = [
  'water_and_sanitation',
  'australia',
  'great_war',
  'medieval_england',
  'early_modern_world',
  'industrialisation_and_empire',
  'post_war_britain'
];

try {
  for (const unit of units) {
    console.log(`\n--- Syncing unit: ${unit} ---`);
    console.log(`Running extract_units.cjs...`);
    execSync(`node scripts/extract_units.cjs ${unit}`, { stdio: 'inherit' });
    
    console.log(`Running build_database.cjs...`);
    execSync(`node scripts/build_database.cjs`, { stdio: 'inherit' });
    
    console.log(`Running generate_tracker_v2.mjs...`);
    execSync(`node scripts/generate_tracker_v2.mjs`, { stdio: 'inherit' });
    
    console.log(`Running export_pdfs.cjs...`);
    execSync(`node scripts/export_pdfs.cjs ${unit}`, { stdio: 'inherit' });
  }
  console.log('\nAll units synced successfully!');
} catch (error) {
  console.error('Error during sync:', error);
  process.exit(1);
}
