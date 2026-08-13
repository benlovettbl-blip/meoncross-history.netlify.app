const fs = require('fs');

let file = 'great_war_part2/data.js';
let content = fs.readFileSync(file, 'utf8');

let dbText = content.replace('export const unitData = ', '').trim();
if (dbText.endsWith(';')) dbText = dbText.slice(0, -1);

let db;
try {
    db = eval('(' + dbText + ')');
} catch (e) {
    console.error('Eval failed', e);
    process.exit(1);
}

const captions = {
    // Lesson 0
    "Map of European Alliances in 1914": "A map of the European Alliance System in 1914, dividing the continent into two heavily armed camps: the Triple Entente (Britain, France, Russia) and the Triple Alliance (Germany, Austria-Hungary, Italy). These mutual defense treaties acted as tripwires, ensuring any local conflict would drag all of Europe into war.",
    "Portrait of Gavrilo Princip": "A photograph of Gavrilo Princip, the 19-year-old Serbian nationalist and member of the Black Hand secret society. On June 28, 1914, his assassination of Archduke Franz Ferdinand in Sarajevo provided the 'spark' that ignited the First World War.",
    "'Women of Britain Say GO!' Recruitment Poster": "The famous 'Women of Britain Say GO!' propaganda poster, published in 1915. It emotionally manipulated men into volunteering by implying that their mothers, sisters, and wives expected them to fight, leveraging peer pressure and traditional masculinity.",
    "Jessie Pope": "A photograph of Jessie Pope, a popular pro-war poet and journalist whose aggressively patriotic verses shamed young men into enlisting. Her simplistic, jingoistic poetry was later fiercely criticized by frontline soldiers like Wilfred Owen.",
    
    // Lesson 1
    "Soldiers in a flooded trench during the Battle of Passchendaele": "British soldiers standing knee-deep in a flooded trench during the Battle of Passchendaele (1917). The horrific mud not only caused trench foot but was so deep and thick that exhausted men and pack animals frequently drowned in it.",
    "Aerial reconnaissance photograph of a zig-zag trench system": "An aerial reconnaissance photograph showing the complex, zig-zag pattern of a frontline trench system. Trenches were deliberately dug in this pattern so that if an enemy soldier jumped in, they could not fire their weapon straight down the entire line.",
    "Soldiers standing waist-deep in a flooded trench": "Soldiers standing waist-deep in freezing, stagnant water in a frontline trench. These appalling conditions led to rampant diseases like trench foot, while the constant presence of corpses attracted swarms of black rats and lice.",
    "Wilfred Owen": "A portrait of Wilfred Owen, one of the greatest war poets in the English language. Having fought and suffered shell shock on the Western Front, his gritty, realistic poetry shattered the romantic illusions of war promoted by writers like Jessie Pope.",

    // Lesson 2
    "British Indian Army soldiers on the Western Front": "British Indian Army soldiers serving on the Western Front in late 1914. Over 1.5 million men from the Indian subcontinent fought for the British Empire, providing crucial manpower that prevented the British lines from collapsing under the early German advance.",
    "Soldiers of the British West Indies Regiment": "Soldiers of the British West Indies Regiment (BWIR) in camp. Over 15,000 volunteers from the Caribbean served. Despite their eagerness to fight, systemic racism meant they were frequently barred from combat roles and forced into grueling manual labor under heavy fire.",
    "Men of the Chinese Labour Corps": "Members of the Chinese Labour Corps (CLC) clearing battlefield debris. Facing severe manpower shortages, Britain recruited over 140,000 Chinese workers for highly dangerous manual labor. They were paid a fraction of white soldiers' wages and deliberately excluded from victory parades.",
    "Soldiers of the British Indian Army on the Western Front": "Another view of British Indian Army soldiers deployed to the European theater. Their presence thousands of miles from home serves as undeniable proof that this was a truly global conflict, not just a 'European' civil war.",

    // Lesson 3
    "Women of Britain Say Go! propaganda poster": "The 'Women of Britain Say GO!' propaganda poster (1915). Before conscription was introduced in 1916, the government relied entirely on voluntary enlistment, using emotional blackmail and the powerful influence of women to shame men into joining the army.",
    "Painting of female Munitionettes working in a factory": "A vivid painting depicting 'Munitionettes' working in a massive British armaments factory. With millions of men fighting overseas, the government relied on over 900,000 women to manufacture the vital artillery shells needed for the war effort, a key element of 'Total War'.",
    "The Shot at Dawn Memorial at the National Memorial Arboretum": "The 'Shot at Dawn' Memorial, commemorating the 306 British and Commonwealth soldiers executed by firing squad for cowardice or desertion. Modern historians recognize that many of these men were actually suffering from severe, undiagnosed shell shock (PTSD).",
    "Female munitions workers producing artillery shells": "Female munitions workers ('Canary Girls') producing highly explosive artillery shells. Handling toxic TNT powder turned their skin yellow and hair green, and carried the constant, terrifying risk of massive factory explosions.",

    // Lesson 4
    "The Big Four leaders at the Versailles Peace Conference": "The 'Big Four' leaders (David Lloyd George of Britain, Vittorio Orlando of Italy, Georges Clemenceau of France, and Woodrow Wilson of the USA) at the Versailles Peace Conference in 1919. They held the fate of a defeated Germany in their hands.",
    "Political cartoon about the Treaty of Versailles": "A famous 1919 political cartoon showing the 'Big Four' leaders leaving the Versailles conference. A child labeled '1940 Class' is weeping, symbolizing the tragic foresight that the harsh terms of the treaty would inevitably spark another world war when that child grew up.",
    "German political cartoon reacting to the Treaty of Versailles": "A German political cartoon reflecting the intense national anger over the Treaty of Versailles. It depicts Germany as a victim being marched to the guillotine by vengeful Allied leaders, perfectly capturing the German view of the treaty as an unfair 'Diktat' (dictated peace).",

    // Lesson 5
    "The wooden Stubbington War Memorial on the village green": "The wooden Stubbington War Memorial, uniquely designed as a shelter over the village pump in 1922. It bears the names of 67 local men who died, serving as a powerful, everyday reminder of the devastating human cost inflicted on tight-knit local communities.",
    "A bronze 'Dead Man's Penny' memorial plaque given to families of the fallen": "A bronze memorial plaque, tragically nicknamed the 'Dead Man's Penny', which was sent to the families of every British soldier killed in the Great War. For many grieving parents, like the father of Nita Madeline King, this and a simple scroll were the only physical return they received for their child's sacrifice.",

    // Lesson 6
    "Painting of women working in a munitions factory": "A painting capturing the immense scale of female labor in British munitions factories. This unprecedented entry of women into heavy industry shattered Victorian gender norms and played a critical role in the passing of the Representation of the People Act 1918, which finally granted some women the right to vote."
};

const contexts = {
    0: "The visual sources in this lesson (such as the map of alliances and the recruitment posters) highlight the two phases of the outbreak: the geopolitical trap of the alliance system, and the psychological manipulation of the British public. The propaganda posters in particular reveal how the government ruthlessly leveraged gender roles and peer pressure to feed the war machine. **Hinge Question:** Look closely at the 'Women of Britain Say GO!' poster; why was emotional blackmail considered more effective than simply ordering men to fight in 1914?",
    1: "The visual sources in this lesson (photographs of flooded trenches and portraits of war poets) provide a stark, undeniable contrast to the romanticized propaganda of 1914. They offer raw, objective evidence of the horrifying conditions of industrialized warfare and the physical degradation of the soldiers. **Hinge Question:** Look at the photograph of the flooded trench; how does this environment completely contradict the promises made by recruiters and poets like Jessie Pope?",
    2: "The visual sources in this lesson (photographs of the British Indian Army, the BWIR, and the Chinese Labour Corps) serve as undeniable, photographic proof of the massive contribution of non-white imperial subjects to the Allied victory. They challenge the traditional Eurocentric narrative by highlighting that without the manpower and sacrifice of the global empire, the British army would likely have collapsed. **Hinge Question:** Look at the photograph of the Chinese Labour Corps; why do you think these men were deliberately excluded from the post-war victory parades in London?",
    3: "The visual sources in this lesson highlight the concept of 'Total War' on the home front. Images of 'Munitionettes' demonstrate how women were mobilized into dangerous industrial roles, shattering traditional gender norms, while the 'Shot at Dawn' memorial forces us to confront the brutal military discipline imposed on traumatized soldiers. **Hinge Question:** Look at the painting of the Munitionettes; how does this image prove that the First World War was won in the factories just as much as in the trenches?",
    4: "The visual sources in this lesson (photographs of the Big Four and contemporary political cartoons) capture the tense, vengeful atmosphere of the Paris Peace Conference. The cartoons are particularly valuable as they reveal contemporary awareness—even in 1919—that the extreme harshness of the treaty might guarantee a future conflict. **Hinge Question:** Look at the German political cartoon showing the guillotine; how does this source help explain why the German public overwhelmingly supported the dismantling of the Treaty of Versailles in the 1930s?",
    5: "The visual sources in this lesson (the Stubbington War Memorial and the 'Dead Man's Penny') localize the staggering statistics of the Great War. They transform abstract casualty figures into tangible, community-level grief, demonstrating how the trauma of the 'Lost Generation' was permanently physically embedded into the landscape of everyday British villages. **Hinge Question:** Look at the Stubbington War Memorial; why was it deliberately built over the village pump, the center of daily community life?",
    6: "The visual sources in this assessment review the core themes of the unit, from the empowerment and exploitation of women in munitions factories to the enduring legacy of the conflict. **Hinge Question:** How does the image of women in munitions factories summarize the dramatic societal shifts caused by Total War?"
};

let modified = false;

db.lessons.forEach((l, i) => {
    // Update image alts
    if (l.narrative_blocks) {
        l.narrative_blocks.forEach(nb => {
            if (nb.image && nb.image_alt) {
                let current = nb.image_alt.trim();
                if (captions[current]) {
                    nb.image_alt = captions[current];
                    modified = true;
                }
            }
        });
    }

    // Add source_context to teacher_notes
    if (contexts[i]) {
        if (!l.teacher_notes) l.teacher_notes = {};
        l.teacher_notes.source_context = contexts[i];
        modified = true;
    }
});

if (modified) {
    let newContent = 'export const unitData = ' + JSON.stringify(db, null, 4) + ';\n';
    fs.writeFileSync(file, newContent);
    console.log("Updated great_war_part2/data.js with rich captions and source contexts!");
}
