import fs from 'fs';

let data = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');

// Replace the Edelweiss Pirates visual source with the White Rose / Sophie Scholl source
data = data.replace(
    '"title": "Source B: A photograph of Edelweiss Pirates members Jean Jülich and Gertrud Koch."',
    '"title": "Source B: A Gestapo photograph of Sophie Scholl taken after her capture, 18 February 1943."'
);

data = data.replace(
    '"source": "/images/edelweiss_pirates_graffiti.jpg?v=4"',
    '"source": "/images/sophie_scholl_gestapo.jpg"'
);

data = data.replace(
    '"caption": "Members of the Edelweiss Pirates youth group."',
    '"caption": "Sophie Scholl was a core member of the White Rose youth resistance group."'
);

data = data.replace(
    '"provenance_clue": "This photograph shows young people who opposed the strict conformity of the Hitler Youth. Why might they have chosen to rebel in this way?"',
    '"provenance_clue": "This photograph was taken by the Gestapo (secret police) following her arrest for distributing anti-Nazi leaflets. What does her capture suggest about the dangers of resisting the Nazi regime?"'
);

fs.writeFileSync('weimar_nazi_germany/data.js', data);
console.log("Updated lesson 3.4");
