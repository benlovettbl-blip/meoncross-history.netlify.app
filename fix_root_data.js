const fs = require('fs');
const file = 'industrialisation_and_empire/data.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/"content": "While ordinary/g, '"text": "While ordinary');
content = content.replace(/"content": "The spark that ignited/g, '"text": "The spark that ignited');
content = content.replace(/"content": "However, modern historians/g, '"text": "However, modern historians');
content = content.replace(/"content": "The outbreak of violence/g, '"text": "The outbreak of violence');
content = content.replace(/"content": "The British reprisal/g, '"text": "The British reprisal');
content = content.replace(/"content": "The immediate consequence/g, '"text": "The immediate consequence');
content = content.replace(/"content": "Building massive ironworks/g, '"text": "Building massive ironworks');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed root data.js!');
