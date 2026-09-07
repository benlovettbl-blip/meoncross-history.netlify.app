const fs = require('fs');
const path = require('path');

const files = [path.resolve('units/cme_new/data.js'), path.resolve('public/units/cme_new/data.js')];

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update teacher_notes.source_context in Lesson 2
  const oldSourceContext = `        source_context:
          'The sources in this lesson are highly emotive. The King David Hotel bombing (Source A) illustrates the extreme tactics used by militant Zionist groups (Irgun) against British rule, highlighting the chaotic breakdown of the Mandate. Meanwhile, the SS Exodus image (Source 2) is a powerful piece of historical optics—the plight of Holocaust survivors being turned away by the British generated immense global sympathy for the Zionist cause and heavily influenced the UN Partition Plan. **Hinge Question:** How do these two sources demonstrate the competing pressures faced by the British in Palestine?',`;

  const newSourceContext = `        source_context:
          'The sources in this lesson are extraordinarily potent and emotive. The King David Hotel bombing (Source A) illustrates the urban guerrilla sabotage targeting British civil administration, while the graphic photograph of the Sergeants Affair (Source B) shows the hanging of Sergeants Clifford Martin and Mervyn Paice in July 1947, an atrocity that sparked anti-Jewish rioting in Liverpool and London and convinced Clement Attlee’s cabinet that British lives could no longer be sacrificed to police Palestine. Meanwhile, the SS Exodus (Source C) captures the disastrous optical failure of turning Holocaust survivors away to DP camps, destroying Britain’s moral standing in America. **Hinge Question:** Between the domestic fury caused by the hanged sergeants and the international condemnation caused by the SS Exodus, which factor did more to compel Britain’s final decision to surrender the Mandate to the United Nations?',`;

  if (content.includes(oldSourceContext)) {
    content = content.replace(oldSourceContext, newSourceContext);
    console.log(`Updated source_context in ${filePath}`);
  } else {
    console.warn(`Could not find oldSourceContext in ${filePath}`);
  }

  // 2. Update narrative block 5 in Lesson 2
  const oldBlock5 = `          source: {
            title: 'Source B: The King David Hotel Bombing (July 1946)',
            src: '/assets/cme_new_king_david_ruins.png',
            caption:
              'The collapsed wing of the King David Hotel, housing the British Secretariat and Military Command.',
            question:
              'Source Detective: Why was this attack a decisive turning point in Britain’s willingness to remain in Palestine?',
          },`;

  const newBlock5 = `          source: {
            title: 'Source B: The Sergeants Affair (July 1947)',
            src: '/images/cme_sergeants_affair_1947.jpg',
            caption:
              'Primary Photograph: British Army Intelligence Corps sergeants Clifford Martin and Mervyn Paice, hanged by the Irgun in a eucalyptus grove near Netanya on 31 July 1947. The bodies were booby-trapped with a mine in retaliation for British executions of Irgun militants.',
            source_context:
              'In July 1947, following the execution of three Irgun members at Acre Prison, the Irgun carried out its threat to execute two kidnapped British intelligence sergeants (Clifford Martin, 21, and Mervyn Paice, 20) and booby-trapped their bodies in a eucalyptus grove near Netanya. When British troops discovered the hanging bodies, a booby-trap bomb exploded, severely injuring a British officer. The shocking photograph was published across the British press, igniting anti-Jewish riots in Liverpool, London, and Manchester, and shattering any remaining British public tolerance for policing the Mandate. **Hinge Question:** Why did the visual shock of the hanged sergeants create more immediate political pressure on the British government to withdraw than the larger loss of life at the King David Hotel?',
            provenance_clue:
              'Consider the audience and public impact in Britain: this graphic image was published on front pages across the UK during postwar rationing and austerity, transforming a distant colonial policing operation into an unbearable domestic crisis that forced Prime Minister Attlee to abandon Palestine.',
            question:
              'Source Detective: Study Source B. Why did the execution and public display of the two British sergeants create such overwhelming political pressure on Clement Attlee’s government to surrender the Mandate?',
            model_answer:
              'Source B was decisive because the graphic visual evidence of British conscripts being abducted, executed, and booby-trapped by Zionist insurgents destroyed domestic support for the Mandate. After the immense sacrifices of the Second World War, the British public and press refused to endure young soldiers dying in a brutal colonial quagmire. The resulting anti-Jewish riots across British cities and fierce political backlash in Parliament convinced Prime Minister Attlee and Foreign Secretary Bevin that Palestine was completely ungovernable, precipitating the decision to surrender the Mandate to the United Nations.',
          },`;

  if (content.includes(oldBlock5)) {
    content = content.replace(oldBlock5, newBlock5);
    console.log(`Updated block 5 source in ${filePath}`);
  } else {
    console.warn(`Could not find oldBlock5 in ${filePath}`);
  }

  // 3. Update paragraph 5 text and task in Lesson 2
  const oldP5Text = `          text: "**The King David Hotel Bombing (July 1946):** At 12:37 PM, a colossal explosion ripped through the building, causing the entire six-story southern wing to collapse into rubble. The attack killed 91 people—including 41 Arabs, 28 British officials, 17 Jews, and several other nationalities. The vast majority of the victims were innocent civilians. The sheer scale of the carnage shocked the British public and drew fierce international condemnation, driving a permanent wedge between the moderate Haganah (who condemned the attack) and the militant Irgun. By early 1947, Britain was buckling under the financial and human cost of policing the Mandate, requiring over 100,000 troops to maintain a fragile grip on order. The boiling point of British public tolerance was reached in July 1947 during the 'Sergeants Affair'. In retaliation for the British execution of three Irgun militants, the Irgun kidnapped two young British intelligence sergeants. Despite desperate pleas from their families and a massive manhunt, the Irgun hanged both men and suspended their booby-trapped bodies in an olive grove.",`;

  const newP5Text = `          text: "**The King David Hotel Bombing (July 1946) & The Sergeants Affair (July 1947):** At 12:37 PM on 22 July 1946, a colossal explosion ripped through the King David Hotel in Jerusalem, causing the entire six-story southern wing to collapse into rubble. The attack killed 91 people—including 41 Arabs, 28 British officials, 17 Jews, and several other nationalities. The vast majority of the victims were innocent civilians. The sheer scale of the carnage shocked the British public, drove a wedge between the moderate Haganah and the militant Irgun, and required over 100,000 British troops to enforce martial law. However, the boiling point of British public tolerance was reached in July 1947 during the 'Sergeants Affair'. In retaliation for the British execution of three Irgun prisoners at Acre Prison, Menachem Begin’s Irgun abducted two young British Army Intelligence Corps non-commissioned officers, Sergeants Clifford Martin (21) and Mervyn Paice (20). Despite desperate family appeals and extensive military searches, the Irgun hanged both men and suspended their booby-trapped bodies from eucalyptus trees near Netanya. When British forces discovered the corpses, an anti-personnel mine detonated, severely wounding a British officer. The graphic photograph of the hanging soldiers was splashed across British front pages, triggering anti-Jewish riots in Liverpool, London, and Manchester, and shattering any remaining political will in London to maintain the Mandate.",`;

  if (content.includes(oldP5Text)) {
    content = content.replace(oldP5Text, newP5Text);
    console.log(`Updated P5 text in ${filePath}`);
  }

  // 4. Update Lesson 2 sources array
  const oldSources = `      title: 'KT 1.1: The End of the British Mandate and the Creation of Israel, 1945–1949',
      video: {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/14-israel-and-the-arab-states-twentieth-century-history/',
        title: 'Twentieth Century History: Israel and the Arab States',
        duration: '20 mins 7 secs',
        viewing_task:
          'As you watch the programme, note down three ways in which the creation of the State of Israel in 1948 changed the political geography of the Middle East.',
        model_answer:
          'The creation of Israel fundamentally changed the Middle East by establishing a sovereign Jewish state in Palestine, triggering the First Arab-Israeli War, redrawing borders as Israel expanded its territory, and causing the permanent displacement of over 700,000 Palestinian Arabs (the Nakba).',
      },
      extra_videos: [`;

  // Check if sources: [] can be populated in Lesson 2
  const oldEmptySources = `      sources: [],
      vocab: [`;

  const newPopulatedSources = `      sources: [
        {
          id: 'cme_king_david_hotel_1946',
          title: 'Source A: The Ruins of the King David Hotel, Jerusalem (July 1946)',
          date: '22 July 1946',
          image: '/assets/cme_new_king_david_ruins.png',
          caption: 'The south-west wing of the King David Hotel collapsed after the Irgun bomb detonation, killing 91 British, Arab, and Jewish personnel.',
          source_context: 'The King David Hotel housed the central Secretariat of the Government of Palestine and the Headquarters of the British Forces in Palestine. The Irgun disguised explosives inside milk churns in the basement.',
          question: 'What does Source A reveal about the vulnerability of British authority in Palestine by July 1946?',
          model_answer: 'Source A reveals that British authority was deeply vulnerable, as even its fortified central administrative and military command headquarters could be successfully infiltrated and destroyed in broad daylight by Zionist insurgents.'
        },
        {
          id: 'cme_sergeants_affair_1947',
          title: 'Source B: The Sergeants Affair, Netanya (July 1947)',
          date: '31 July 1947',
          image: '/images/cme_sergeants_affair_1947.jpg',
          caption: 'British Army Intelligence Corps sergeants Clifford Martin and Mervyn Paice hanged by the Irgun in a eucalyptus grove near Netanya.',
          source_context: 'Abducted as hostages to prevent the British execution of three Irgun fighters, the two British sergeants were hanged and one body was booby-trapped with an anti-personnel mine. The photo caused national outrage in Britain. **Hinge Question:** Why was this photograph more politically damaging to British morale than the King David Hotel bombing?',
          provenance_clue: 'Front-page publication in UK newspapers provoked anti-Jewish riots across British cities and led to overwhelming demands in Parliament to abandon the Mandate.',
          question: 'Study Source B. Why did this photograph decisively convince the British public and government that Britain must leave Palestine?',
          model_answer: 'The graphic photograph proved that British conscripts were being killed and mutilated in an impossible peacekeeping role. War-weary Britons refused to lose more lives after WWII, sparking anti-Jewish riots and forcing Attlee to announce withdrawal.'
        },
        {
          id: 'cme_exodus_haifa_1947',
          title: 'Source C: The SS Exodus Intercepted off Palestine (July 1947)',
          date: '18 July 1947',
          image: '/units/cme_new/assets/cme_exodus.jpeg',
          caption: 'The SS Exodus carrying 4,500 Holocaust survivors intercepted by the Royal Navy and returned to displaced persons camps in Germany.',
          source_context: 'The British decision to forcibly return Holocaust survivors to camps in Germany was an international public relations disaster that destroyed British diplomatic standing in the US and swayed the UN Partition vote.',
          question: 'How did Source C damage Great Britain’s international standing during the UN debate on Palestine?',
          model_answer: 'Source C severely damaged British standing because forcing Holocaust survivors back into European detention camps appeared callous and cruel, alienating US public opinion and creating irresistible sympathy for a sovereign Jewish state.'
        }
      ],
      vocab: [`;

  if (content.includes(oldEmptySources)) {
    content = content.replace(oldEmptySources, newPopulatedSources);
    console.log(`Populated sources array in ${filePath}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Done updating data.js with Sergeants Affair photograph and sources!');
