
import { initializeApp } from '../src/core_app.js';

fetch('/database.json').then(r => r.json()).then(db => {
  const pathParts = window.location.pathname.split('/').filter(p => p);
  let unitId = pathParts[pathParts.length - 1] === 'index.html' ? pathParts[pathParts.length - 2] : pathParts[pathParts.length - 1];
  if (!unitId || !db[unitId]) unitId = 'great_war_part2'; // default to folder name
  
  const unitData = db[unitId].data || {};

  initializeApp(unitData);

});
