const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../units/trip_ypres/data.js');
let content = fs.readFileSync(dataFile, 'utf8');

// 1. Add objective to day_1 teacher_notes
const objectiveTarget = `        objectives: [`;
const newObjective = `        objectives: [
          {
            objective:
              "Understand how frontline battlefield cemeteries formed, why hundreds of thousands became 'the missing', and how Sir Fabian Ware, Sir Edwin Lutyens, and the IWGC established the radical egalitarian design of the Commonwealth War Graves headstone.",
            primer:
              "Before pupils enter Essex Farm (the tour's first cemetery), gather them by the perimeter wall. Have them compare the pristine Portland headstones with archival evidence of frontline wooden crosses and churning artillery mud. Unpack the revolutionary democratic decision by Fabian Ware and Edwin Lutyens: that whether an aristocrat officer or a working-class teenager like Valentine Strudwick, every soldier receives an identical Portland stone with no repatriations allowed, and Kipling's universal words 'Known unto God'.",
            question:
              "Why did the Imperial War Graves Commission insist on completely identical headstones and ban wealthy families from repatriating their sons' bodies, and what does this reveal about post-war Britain's attitude towards equality in death?",
          },`;

if (!content.includes('Understand how frontline battlefield cemeteries formed')) {
  content = content.replace(objectiveTarget, newObjective);
  console.log('✅ Injected objective into teacher_notes');
}

// 2. Add new narrative block before Essex Farm block
const essexFarmBlockTarget = `        {
          type: 'narrative',
          theme_heading: 'Essex Farm & The Advanced Dressing Station',`;

const newNarrativeBlock = `        {
          type: 'narrative',
          theme_heading: 'Before the First Cemetery: How War Graves Formed & The Anatomy of a CWGC Headstone',
          text: \`<div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #0284c7; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 12px; display: inline-block; margin-bottom: 8px;">Essential Field Context · Stop 1 Preparation</span>
  <h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 1.35rem; font-family: 'Playfair Display', serif;">The Evolution of War Graves: From Battlefield Chaos to Radical Equality</h3>
  <p style="margin: 0; color: #334155; font-size: 0.95rem; line-height: 1.65;">
    As your coach arrives at Essex Farm—the very first Commonwealth cemetery on our pilgrimage—you will look out upon silent, immaculate rows of brilliant white Portland stone. But during the Great War, this peaceful sanctuary did not exist. To truly understand what you are seeing, you must first understand how cemeteries formed amidst the mud, why over half of our soldiers have no known grave, and why the shape of every single British headstone was designed as an instrument of total social equality.
  </p>
</div>

<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;">
    <div style="flex: 1; min-width: 280px;">
      <h4 style="margin: 0 0 12px 0; color: #7f1d1d; font-size: 1.2rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-cross" style="color: #991b1b;"></i> 1. The Chaos of Frontline Burials &amp; The Tragedy of "The Missing"
      </h4>
      <p style="color: #334155; font-size: 0.93rem; line-height: 1.65; margin-bottom: 12px;">
        During active combat, dignified burial was nearly impossible. When soldiers fell in the trenches or out in No Man's Land, comrades or pioneer burial parties worked by night in suffocating darkness under sniper fire and mortar flares. Shallow graves were scooped out of trench parapets, shell craters, or roadside verges.
      </p>
      <ul style="color: #334155; font-size: 0.92rem; line-height: 1.65; margin: 0 0 14px 0; padding-left: 20px;">
        <li><strong>Identity Discs:</strong> Every British Tommy wore two vulcanised fibre tags around his neck: a red octagonal disc and a green circular disc. When a soldier died, the red disc was snapped off and sent back to the War Office to confirm the death; the green disc was left on the body for future identification.</li>
        <li><strong>Makeshift Wooden Crosses:</strong> Graves were marked with crude crosses fashioned from ammunition boxes, ration crates, or barbed wire pickets. Names and battalion numbers were scrawled in indelible pencil or stamped onto thin zinc strips.</li>
        <li><strong>The Churn of Artillery:</strong> Over <strong>one billion artillery shells</strong> were fired across the Western Front. High-explosive barrages continuously pounded and churned the same ground for four years. Shellfire repeatedly blasted temporary cemeteries to splinters, obliterated wooden crosses, and swallowed remains into bottomless liquid clay. This explains why <strong>over 54,000 men on the Menin Gate and 34,000 at Tyne Cot have no known grave</strong>.</li>
        <li><strong>The Post-War Search:</strong> Between 1919 and 1921, special military "Exhumation &amp; Concentration Companies" systematically swept the Salient on foot, using wire probes to locate isolated graves and re-inter the fallen into permanent concentration cemeteries.</li>
      </ul>
    </div>
    <div style="flex: 0 0 320px; max-width: 100%; text-align: center;">
      <img src="/images/ww1_wooden_crosses.jpg" alt="Temporary WW1 wooden crosses in mud" style="width: 100%; height: auto; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 3px 8px rgba(0,0,0,0.15);" />
      <small style="display: block; margin-top: 8px; color: #64748b; font-size: 0.8rem; line-height: 1.35; text-align: left;">
        <strong>Archival Primary Source:</strong> Temporary wooden crosses marking graves of the 8th South Staffordshire Regiment beside a waterlogged shell crater in France (National Library of Scotland archival collection). Notice the crude cross for Pte F.W. Dicken, standing precariously in the mud.
      </small>
    </div>
  </div>
</div>

<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;">
    <div style="flex: 0 0 320px; max-width: 100%; text-align: center;">
      <img src="/images/fabian_ware.jpg" alt="Sir Fabian Ware with King George V at Tyne Cot 1922" style="width: 100%; height: auto; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 3px 8px rgba(0,0,0,0.15);" />
      <small style="display: block; margin-top: 8px; color: #64748b; font-size: 0.8rem; line-height: 1.35; text-align: left;">
        <strong>Archival Primary Source:</strong> Sir Fabian Ware (left, holding papers and walking stick) showing King George V around battlefield wooden crosses during the historic 1922 Royal Pilgrimage to Tyne Cot Cemetery.
      </small>
    </div>
    <div style="flex: 1; min-width: 280px;">
      <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 1.2rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-scale-balanced" style="color: #0284c7;"></i> 2. Sir Fabian Ware &amp; The Radical Philosophy of "Equality in Death"
      </h4>
      <p style="color: #334155; font-size: 0.93rem; line-height: 1.65; margin-bottom: 12px;">
        In 1914, 45-year-old <strong>Fabian Ware</strong> was too old to enlist as a combat soldier. Instead, he took command of a mobile British Red Cross ambulance unit. Appalled that thousands of men were dying and being buried without any official record, Ware began cataloguing every grave he could find. In 1917, King George V granted a Royal Charter founding the <strong>Imperial War Graves Commission (IWGC)</strong>, with Ware as Vice-Chairman.
      </p>
      <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px; border-radius: 4px; margin-bottom: 12px;">
        <strong style="color: #166534; font-size: 0.95rem;">The Three Revolutionary Principles:</strong>
        <ol style="margin: 6px 0 0 0; padding-left: 20px; color: #1e293b; font-size: 0.9rem; line-height: 1.6;">
          <li><strong>Absolute Equality in Death:</strong> Regardless of rank, title, social class, wealth, or religion, every fallen soldier would receive the exact same headstone, of identical size, stone, and dignity. A Brigadier-General stands shoulder-to-shoulder with a 15-year-old Private.</li>
          <li><strong>Strict Ban on Repatriation:</strong> Wealthy aristocrats fiercely demanded the right to exhume their sons and transport them back to family crypts in England. Ware and Parliament refused. Repatriation was banned so that the wealthy could not purchase a privilege impossible for the poor. All men who fought together would lie together forever.</li>
          <li><strong>Universal Commemoration:</strong> Every missing soldier whose body was lost or unidentifiable must have their name carved forever upon a permanent stone memorial.</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;">
    <div style="flex: 1; min-width: 280px;">
      <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 1.2rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-compass-drafting" style="color: #d97706;"></i> 3. The Master Architects &amp; Literary Giants
      </h4>
      <p style="color: #334155; font-size: 0.93rem; line-height: 1.65; margin-bottom: 12px;">
        To turn Ware's vision into permanent stone, the Commission recruited Britain's greatest artistic and architectural minds:
      </p>
      <ul style="color: #334155; font-size: 0.92rem; line-height: 1.65; margin: 0; padding-left: 20px;">
        <li><strong>Sir Edwin Lutyens (Lead Architect):</strong> Designed the elegant curved silhouette of the standard war headstone, carefully proportioned to create rhythmic, unified vistas across rolling cemetery turf. Lutyens also designed the secular, universal <strong>Stone of Remembrance</strong> ("The Great War Stone") placed in larger cemeteries—a massive Portland monolith designed with subtle optical curves (entasis) to appear perfectly straight to the human eye, honouring men of all faiths or none.</li>
        <li><strong>Sir Reginald Blomfield:</strong> Designed the soaring <strong>Cross of Sacrifice</strong>—a gleaming Portland stone Latin cross bearing a downward-pointing bronze crusader sword, present in every cemetery with more than 40 graves. Blomfield was also the master architect of the <strong>Menin Gate Memorial</strong>.</li>
        <li><strong>Rudyard Kipling (Literary Advisor):</strong> The world-famous author lost his only son, 18-year-old Lieutenant John Kipling, at the Battle of Loos in 1915 (his body was never found during Kipling's lifetime). Channelling a nation's heartbreak, Kipling personally chose the defining words carved into the stone:
          <div style="margin: 8px 0; font-family: 'Georgia', serif; font-style: italic; color: #1e293b; background: #f8fafc; padding: 10px 14px; border-radius: 4px; border-left: 3px solid #64748b;">
            • "KNOWN UNTO GOD" (for every unidentified headstone)<br>
            • "THEIR NAME LIVETH FOR EVERMORE" (carved into every Stone of Remembrance)<br>
            • "A SOLDIER OF THE GREAT WAR" (at the top of unknown graves)
          </div>
        </li>
      </ul>
    </div>
    <div style="flex: 0 0 240px; max-width: 100%; text-align: center;">
      <img src="/images/edwin_lutyens.jpg" alt="Sir Edwin Lutyens" style="width: 100%; height: auto; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 3px 8px rgba(0,0,0,0.15);" />
      <small style="display: block; margin-top: 8px; color: #64748b; font-size: 0.8rem; line-height: 1.35; text-align: left;">
        <strong>Sir Edwin Lutyens (1869–1944):</strong> Principal Architect to the IWGC. He insisted on the curved Portland stone headstone and designed the non-denominational Stone of Remembrance.
      </small>
    </div>
  </div>
</div>

<div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <h4 style="margin: 0 0 16px 0; color: #0f172a; font-size: 1.25rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 8px;">
    <i class="fa-solid fa-monument" style="color: #475569;"></i> 4. Interactive Field Guide: Anatomy of a British Commonwealth Headstone
  </h4>
  <p style="color: #334155; font-size: 0.95rem; line-height: 1.65; margin-bottom: 18px;">
    Every standard Commonwealth War Graves headstone is carved from white <strong>Portland limestone</strong>, measuring precisely <strong>2 feet 6 inches (76 cm) tall</strong>, <strong>1 foot 3 inches (38 cm) wide</strong>, and <strong>3 inches (7.5 cm) thick</strong>. When you stand in front of any headstone today, observe how it is structured into four distinct vertical zones:
  </p>

  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; margin-bottom: 20px;">
    <div style="flex: 0 0 260px; max-width: 100%; text-align: center; background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
      <img src="/images/cwgc_stonecarver.jpg" alt="Stonemason carving headstone in 1920s" style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 8px;" />
      <small style="color: #64748b; font-size: 0.78rem; line-height: 1.3; display: block; text-align: left;">
        <strong>Hand-Crafted Honour (1920s):</strong> A Graves Registration Unit stonemason hand-carving a regimental crest into Portland limestone. In the early years, each crest required up to a week of meticulous chisel work.
      </small>
    </div>

    <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 12px;">
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #d97706; padding: 12px 16px; border-radius: 4px;">
        <strong style="color: #b45309; font-size: 0.95rem;">Zone 1: Regimental Crest / National Badge</strong>
        <p style="margin: 4px 0 0 0; color: #334155; font-size: 0.88rem; line-height: 1.5;">
          Carved into the curved arch at the very top. Represents the soldier's regiment, naval division, flying corps, or Dominion nation (e.g., the Hampshire Regiment rose, Royal Artillery gun, or Canadian Maple Leaf).
        </p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 4px;">
        <strong style="color: #1d4ed8; font-size: 0.95rem;">Zone 2: Service Particulars &amp; Identity</strong>
        <p style="margin: 4px 0 0 0; color: #334155; font-size: 0.88rem; line-height: 1.5;">
          Service number, rank, initials, full surname, and any gallantry decorations (e.g., VC, MM, MC). Beneath this appears the soldier's unit, followed by the exact date of death and age (e.g., <em>"5414 Private V. J. Strudwick · 8th Bn. Rifle Brigade · 14th January 1916 · Age 15"</em>).
        </p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #16a34a; padding: 12px 16px; border-radius: 4px;">
        <strong style="color: #15803d; font-size: 0.95rem;">Zone 3: Religious or Personal Emblem</strong>
        <p style="margin: 4px 0 0 0; color: #334155; font-size: 0.88rem; line-height: 1.5;">
          Carved in the center of the stone. A Christian Latin cross, Star of David, Islamic crescent, or Hindu/Sikh text. Families could request this space be left blank if the soldier was non-religious.
        </p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #7c3aed; padding: 12px 16px; border-radius: 4px;">
        <strong style="color: #6d28d9; font-size: 0.95rem;">Zone 4: Personal Family Inscription (Base)</strong>
        <p style="margin: 4px 0 0 0; color: #334155; font-size: 0.88rem; line-height: 1.5;">
          A personal epitaph of up to 66 characters chosen by grieving parents or widows. Although the Commission initially asked for 3.5 pence per letter to offset costs, Ware ensured all fees were waived for impoverished working-class families.
        </p>
      </div>
    </div>

    <div style="flex: 0 0 240px; max-width: 100%; text-align: center; background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
      <img src="/images/cwgc_headstone_essex_farm.jpg" alt="A Soldier of the Great War headstone at Essex Farm" style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 8px;" />
      <small style="color: #64748b; font-size: 0.78rem; line-height: 1.3; display: block; text-align: left;">
        <strong>The Unknown Warrior:</strong> Photographed directly at Essex Farm Cemetery. Where a body could not be identified, Kipling's words stand forever: <em>"A Soldier of the Great War · Known unto God"</em>.
      </small>
    </div>
  </div>

  <div style="background: #f1f5f9; border-radius: 6px; padding: 14px 18px; border: 1px dashed #94a3b8;">
    <strong style="color: #0f172a; font-size: 0.92rem;"><i class="fa-solid fa-magnifying-glass" style="color: #2563eb; margin-right: 6px;"></i> Field Challenge for Pupils:</strong>
    <span style="color: #334155; font-size: 0.88rem; line-height: 1.5;">
      As you walk into Essex Farm, choose three adjacent headstones. Check if you can find an officer and a private. Notice that despite differences in military rank in life, their stone monuments in death are millimeter-identical.
    </span>
  </div>
</div>\`,
        },
        {
          type: 'narrative',
          theme_heading: 'Essex Farm & The Advanced Dressing Station',`;

if (!content.includes('Before the First Cemetery: How War Graves Formed')) {
  content = content.replace(essexFarmBlockTarget, newNarrativeBlock);
  console.log('✅ Injected narrative block for war graves and headstone anatomy');
}

// 3. Add coach briefing to tour_guide_script
const tourGuideTarget = `      tour_guide_script: [
        {
          type: 'narrative',
          theme_heading: '1:00 PM – Departing Calais: Entering the Salient',`;

const newTourGuideScript = `      tour_guide_script: [
        {
          type: 'narrative',
          theme_heading: '1:00 PM – Departing Calais: Entering the Salient',
          text: '"Right everyone, look out your windows. In an hour, this flat farmland will transform into the most heavily contested patch of earth in British military history: the Ypres Salient. A \\'salient\\' is a bulge in the frontline, surrounded by enemy guns on three sides. If Ypres fell, the German army could march straight to the French ports supplying our war effort. Over half a million men died defending a strip of mud barely ten miles wide. As we cross into Belgium, imagine looking out at these quiet fields in 1917: no trees, no grass, just a landscape chewed into toxic mud and shell craters. We are retracing the exact steps taken by ordinary teenagers and men a century ago."<br><br><strong>Teacher Points:</strong><ul><li>The Salient was deadly because German artillery fired from elevated ridges on three sides, meaning there was no true "safe rear area."</li><li>Artillery fire caused roughly 60% of all combat wounds, leading to severe shrapnel injuries and terrifying psychological conditions like shell shock.</li><li>The mud in the Salient was famously lethal; men, horses, and equipment frequently drowned in waterlogged shell craters during the Passchendaele offensive.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"I am no longer an artist interested and curious, I am a messenger who will bring back word from the men who are fighting to those who want the war to go on for ever. Feeble, inarticulate, will be my message, but it will have a bitter truth... It is unspeakable, godless, hopeless."</em><br>— <strong>Paul Nash</strong>, British War Artist, in a letter to his wife describing the shattered landscape of the Ypres Salient (1917).</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '2:15 PM – Coach Approach: How War Graves Formed & The Portland Headstone',
          text: '"Before we step off the coach at Essex Farm, our very first cemetery, take a look out at the landscape. Over the next three days, you are going to see thousands of gleaming white Portland stone headstones standing in perfect military rows. But this is not how they looked during the war. During the fighting, bodies were buried in haste under darkness, marked only by crude wooden crosses with paper or zinc tags. Shellfire repeatedly blasted these graves into mud—which is why half of the boys who died here have no known grave.\\n\\nNotice the headstones when we walk in. Every single one is exactly the same shape and size: 76 centimeters tall, curved at the top, carved from Portland limestone. A famous architect named Sir Edwin Lutyens designed that curved shape. And the man who founded the War Graves Commission, Sir Fabian Ware, fought a fierce battle in Parliament to ensure that a millionaire aristocrat and a fifteen-year-old schoolboy like Valentine Strudwick were buried under the exact same stone. No private monuments were allowed, and families were banned from bringing bodies home. In death, all soldiers were declared equal. Keep your eyes open for the four parts of every stone: the regimental badge at the top, the soldier\\'s details, the cross in the middle, and the heartbreaking message chosen by the parents at the bottom."<br><br><strong>Teacher Points:</strong><ul><li>Remind pupils that the red vulcanised fibre identity disc was removed for casualty reporting, while the green disc was left on the body.</li><li>Point out the difference between the bright Portland stone of British cemeteries and the dark basalt architecture of German cemeteries like Langemarck.</li><li>Highlight Kipling\\'s role: having lost his own son John at Loos with no known grave, he chose the words "Known unto God" and "Their Name Liveth For Evermore".</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"The impression made by the commission\\'s cemeteries is one of extraordinary dignity and peace... There is no distinction between the grave of the officer and that of the private soldier; they lie side by side in the soil they defended."</em><br>— <strong>Sir Fabian Ware</strong>, Founder of the Imperial War Graves Commission.</blockquote>',
        },`;

if (!content.includes('2:15 PM – Coach Approach: How War Graves Formed')) {
  content = content.replace(tourGuideTarget, newTourGuideScript);
  console.log('✅ Injected coach briefing into tour_guide_script');
}

// 4. Update tasks in day_1
const tasksTarget = `      tasks: [
        "Field Observation at Essex Farm: Step inside the damp concrete Advanced Dressing Station dugout where Canadian surgeon John McCrae treated hundreds of bleeding casualties and penned 'In Flanders Fields'. Notice how narrow the doorways and bunk recesses are.",`;

const newTasks = `      tasks: [
        "Headstone Deciphering at Essex Farm: Choose any Portland stone headstone in the cemetery. Identify and document its four distinct zones: (1) Regimental badge/crest, (2) Service particulars (rank, name, number, regiment, date of death and age), (3) Religious emblem, and (4) Personal family inscription at the base (if present). Notice the curved top designed by Sir Edwin Lutyens—compare an officer's stone with a private's stone to observe 'Equality in Death'.",
        "Field Observation at Essex Farm: Step inside the damp concrete Advanced Dressing Station dugout where Canadian surgeon John McCrae treated hundreds of bleeding casualties and penned 'In Flanders Fields'. Notice how narrow the doorways and bunk recesses are.",`;

if (!content.includes('Headstone Deciphering at Essex Farm')) {
  content = content.replace(tasksTarget, newTasks);
  console.log('✅ Injected headstone deciphering task into tasks array');
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log('🚀 Done updating units/trip_ypres/data.js');
