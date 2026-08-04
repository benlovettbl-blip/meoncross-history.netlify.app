import fs from 'fs';

let data = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');

data = data.replace(
    '"title": "Source B: A photograph of Paul von Hindenburg and Adolf Hitler on the day Hitler was appointed Chancellor, 30 January 1933."', 
    '"title": "Source B: A photograph of Adolf Hitler bowing to President Paul von Hindenburg at the Day of Potsdam, 21 March 1933."'
);

data = data.replace(
    '"caption": "President Hindenburg and the newly appointed Chancellor Adolf Hitler."', 
    '"caption": "Hitler ceremonially greeting Hindenburg shortly after becoming Chancellor."'
);

data = data.replace(
    '"provenance_clue": "Look closely at the body language between the two men. Hindenburg despised Hitler. How useful is this photograph for showing the uneasy alliance that brought Hitler to power?"', 
    '"provenance_clue": "Look closely at the body language between the two men. Hitler is bowing to show deep respect. How useful is this photograph as a piece of propaganda designed to reassure conservative Germans?"'
);

fs.writeFileSync('weimar_nazi_germany/data.js', data);
console.log("Updated lesson 2.4");
