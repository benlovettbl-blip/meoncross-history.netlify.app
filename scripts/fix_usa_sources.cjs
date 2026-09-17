const fs = require('fs');

// Fix Mock 2
let m2 = fs.readFileSync('public/units/usa/usa_mock_2.html', 'utf8');
m2 = m2.replace(
  /<div class="source-box">\s*<div class="provenance">Source B: A front-page newspaper photograph[\s\S]*?<\/div>\s*<div class="source-content">\[A photograph depicting President Lyndon B\. Johnson[\s\S]*?<\/div>\s*<\/div>/,
  `<div class="source-box">
      <div class="provenance">Source B: From President Lyndon B. Johnson's address to the American people upon signing the Civil Rights Act, 2 July 1964.</div>
      <div class="source-content">"This Civil Rights Act is a challenge to all of us to go to work in our communities and our states, in our homes and in our churches, to eliminate the last vestiges of injustice and discrimination. Its purpose is not to punish. Its purpose is not to divide, but to end division. We believe that all persons are created equal. Yet many are denied equal treatment. Those who are equal before God shall now also be equal in the polling booths, in the classrooms, in the factories, and in hotels, restaurants, movie theaters, and other places that provide service to the public."</div>
    </div>`,
);
fs.writeFileSync('public/units/usa/usa_mock_2.html', m2, 'utf8');

// Fix Mock 3
let m3 = fs.readFileSync('public/units/usa/usa_mock_3.html', 'utf8');
m3 = m3.replace(
  /<div class="source-box">\s*<div class="provenance">Source A: From a photograph of demonstrators during the March on Washington[\s\S]*?<\/div>\s*<div class="source-content">\[A photograph depicting a large, racially integrated gathering[\s\S]*?<\/div>\s*<\/div>/,
  `<div class="source-box">
      <div class="provenance">Source A: From a report in The New York Times, 29 August 1963, describing the March on Washington for Jobs and Freedom.</div>
      <div class="source-content">"More than 200,000 Americans, black and white, gathered peacefully in the shadow of the Lincoln Memorial today. They walked arm in arm down Constitution Avenue, singing freedom songs and carrying banners demanding equal rights, integrated schools, and decent jobs. The massive gathering was completely disciplined and orderly, uniting religious leaders, labor unionists, students, and citizens from every corner of the country in a single unified appeal to Congress and the nation."</div>
    </div>`,
);
fs.writeFileSync('public/units/usa/usa_mock_3.html', m3, 'utf8');

// Fix Mock 6
let m6 = fs.readFileSync('public/units/usa/usa_mock_6.html', 'utf8');
m6 = m6.replace(
  /<div class="source-box">\s*<div class="provenance">Source B: A photograph from the March on Washington[\s\S]*?<\/div>\s*<div class="source-content">\[A photograph capturing Dr\. Martin Luther King Jr\. waving[\s\S]*?<\/div>\s*<\/div>/,
  `<div class="source-box">
      <div class="provenance">Source B: From Dr Martin Luther King Jr.'s 'I Have a Dream' speech, delivered at the Lincoln Memorial during the March on Washington, 28 August 1963.</div>
      <div class="source-content">"I say to you today, my friends, that even though we face the difficulties of today and tomorrow, I still have a dream. It is a dream deeply rooted in the American dream. I have a dream that one day this nation will rise up and live out the true meaning of its creed: 'We hold these truths to be self-evident, that all men are created equal.' I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character."</div>
    </div>`,
);
fs.writeFileSync('public/units/usa/usa_mock_6.html', m6, 'utf8');

// Fix Mock 7
let m7 = fs.readFileSync('public/units/usa/usa_mock_7.html', 'utf8');
m7 = m7.replace(
  /<div class="source-box">\s*<div class="provenance">Source A: A photograph depicting logistics transportation along the Ho Chi Minh Trail[\s\S]*?<\/div>\s*<div class="source-content">\[A photograph showing supply carriers navigating a narrow jungle path[\s\S]*?<\/div>\s*<\/div>/,
  `<div class="source-box">
      <div class="provenance">Source A: From an American military intelligence report on communist logistics in South Vietnam, 1965.</div>
      <div class="source-content">"The flow of communist troops and war supplies along the Ho Chi Minh Trail has escalated sharply over the past year. Porters and supply convoys move under dense double-canopy jungle that completely conceals them from our reconnaissance aircraft. They transport mortars, ammunition, and medical supplies using reinforced bicycles and pack animals, moving through Laos directly into South Vietnam. Despite thousands of air strikes, the supply route remains unbroken."</div>
    </div>`,
);
fs.writeFileSync('public/units/usa/usa_mock_7.html', m7, 'utf8');

console.log('Successfully replaced bracketed sources in mocks 2, 3, 6, 7!');
