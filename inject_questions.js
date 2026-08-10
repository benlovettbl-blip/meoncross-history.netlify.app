const fs = require('fs');

let code = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');

// Replace 1
code = code.replace(
  /"Source B shows the reality of global trade in Canton, where European merchants were restricted and tightly controlled by the Chinese Emperor, challenging the myth of European dominance."/g,
  '"Source B shows the reality of global trade in Canton, where European merchants were restricted and tightly controlled by the Chinese Emperor, challenging the myth of European dominance.<br><br><strong>Discussion Point:</strong> Why might European monarchs have been frustrated by the tight controls in Canton?"'
);

// Replace 2
code = code.replace(
  /"Source C illustrates the fall of Constantinople in 1453 to the powerful Ottoman Empire, an event that deeply shocked Christian Europe and blocked their traditional trade routes to the East."/g,
  '"Source C illustrates the fall of Constantinople in 1453 to the powerful Ottoman Empire, an event that deeply shocked Christian Europe and blocked their traditional trade routes to the East.<br><br><strong>Discussion Point:</strong> How might the Ottoman control of Constantinople have forced Europe to look for new sea routes?"'
);

// Replace 3
code = code.replace(
  /"Source D reveals the highly advanced metallurgical skills of the Benin Empire in West Africa, producing magnificent bronzes that rivalled or surpassed European art of the same period."/g,
  '"Source D reveals the highly advanced metallurgical skills of the Benin Empire in West Africa, producing magnificent bronzes that rivalled or surpassed European art of the same period.<br><br><strong>Discussion Point:</strong> Why do you think European historians in the past often ignored or downplayed the advanced skills of African empires?"'
);

// Replace 4
code = code.replace(
  /"Source E, a detail from the Catalan Atlas, highlights the staggering wealth of Mansa Musa and the Mali Empire, drawing desperate European merchants towards West African gold."/g,
  '"Source E, a detail from the Catalan Atlas, highlights the staggering wealth of Mansa Musa and the Mali Empire, drawing desperate European merchants towards West African gold.<br><br><strong>Discussion Point:</strong> How did the image of Mansa Musa\'s wealth change Europe\'s relationship with West Africa?"'
);

// Replace 5
code = code.replace(
  /passing strict laws to criminalize it\.<\/p>\\n<\/details>"/g,
  'passing strict laws to criminalize it.</p>\\n<p><strong>Discussion Point:</strong> How does this form of resistance challenge the idea that enslaved people were powerless?</p>\\n</details>"'
);

fs.writeFileSync('public/units/early_modern_world/data.js', code);
console.log('Discussion questions injected successfully!');
