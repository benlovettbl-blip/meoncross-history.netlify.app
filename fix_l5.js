const fs = require('fs');
let l5 = JSON.parse(fs.readFileSync('l5_backup.json', 'utf8'));

// 1. Fix Equiano Block
l5.narrative_blocks.forEach(b => {
  if (b.title === "Voices of Resistance: Equiano's Testimony") {
    // Replace the three hardcoded "Source G"s with generic placeholders that our re-letter script will catch
    b.text = b.text.replace('<strong>Source G: Olaudah Equiano Recounts', '<strong>Source [X]: Olaudah Equiano Recounts');
    b.text = b.text.replace('<strong>Source G: Equiano Describes', '<strong>Source [Y]: Equiano Describes');
    b.text = b.text.replace('<strong>Source G: A Jamaican Overseer’s Diary', '<strong>Source [Z]: A Jamaican Overseer’s Diary');
    
    // Update the tasks
    b.tasks[0].question = "Inferring Motive (Source [Y]): Why did jumping overboard represent a powerful act of resistance for enslaved Africans, even though it resulted in death?";
    b.tasks[1].question = "Cross-Referencing Utility: How does Source [Z] confirm that \"day-to-day\" resistance was real and effective, even when reported by a hostile white overseer?";
    b.tasks[1].model_answer = "Source [Z] shows the overseer constantly suspecting sabotage ('done maliciously', 'poisoned with nightshade root'). Even though Thistlewood is hostile, his diary proves that enslaved people were successfully delaying work and causing economic damage while maintaining plausible deniability ('deny all knowledge').";
    b.tasks[2].question = "Evaluating Significance (Equiano's Portrait & Source [X]): Why was Equiano’s autobiography so historically revolutionary when published in London in 1789?";
  }
  
  if (b.title === "Case Study: The Underground Railroad") {
    // Replace with Stono Rebellion
    b.title = "Case Study: The Stono Rebellion (1739)";
    b.image = "/images/stono_rebellion.jpg";
    b.image_alt = "Map of the Stono Rebellion route (1739)";
    b.image_context = "Observe the location of South Carolina relative to Spanish Florida. The Spanish deliberately promised freedom to any enslaved person who could escape British territory and reach St. Augustine, weaponizing the enslaved population against their British imperial rivals. **Hinge Question:** Why did geopolitical rivalries between European empires sometimes create small windows of opportunity for enslaved people?";
    b.text = "While hidden, day-to-day resistance was constant, sometimes it exploded into outright war. In September 1739, a literate enslaved man named Jemmy led a coordinated armed uprising in South Carolina known as the Stono Rebellion. The rebels seized weapons, marched under banners that read 'Liberty!', and beat drums to rally others as they marched south toward Spanish Florida, where they were promised freedom. Although the rebellion was eventually crushed by the brutal South Carolina militia, it terrified the planter class. It proved that enslaved Africans could organize militarily and were actively fighting for their freedom, leading the panicked British colonists to pass the draconian 1740 Negro Act, which severely restricted enslaved people's ability to assemble, grow their own food, or learn to read.";
    b.image_caption = "A map showing the geography of the Stono Rebellion. Enslaved rebels marched south from the Stono River in South Carolina, aiming for the Spanish territory of Florida where they were promised emancipation.";
    b.tasks = [
      {
        "type": "comprehension",
        "question": "What was the immediate goal of the rebels during the Stono Rebellion?",
        "model_answer": "Their immediate goal was to march south to Spanish Florida, where the Spanish authorities had promised them freedom."
      },
      {
        "type": "comprehension",
        "question": "How did the rebels organize and communicate their uprising?",
        "model_answer": "They organized militarily, seized weapons, marched under banners reading 'Liberty!', and used drums to communicate and rally others to their cause."
      },
      {
        "type": "comprehension",
        "question": "Why did the Stono Rebellion terrify the British planter class?",
        "model_answer": "It proved that enslaved Africans were not passive and were fully capable of organizing coordinated, armed military resistance against their enslavers."
      },
      {
        "type": "comprehension",
        "question": "What was the long-term consequence of the rebellion for enslaved people in South Carolina?",
        "model_answer": "The panicked planters passed the brutal 1740 Negro Act, which heavily restricted the rights of enslaved people to assemble, earn money, or learn to read, in order to prevent future uprisings."
      }
    ];
  }
});

fs.writeFileSync('l5_fixed.json', JSON.stringify(l5, null, 2));
console.log('Fixed l5 successfully!');
