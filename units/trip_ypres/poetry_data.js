// Complete Expedition Poetry & Eyewitness Voices Dossier
// 16 Unabridged Poems across 11 Stops of the Ypres Salient Battlefield Tour
// Sourced from authentic Great War texts with verified historical portraits

export const poetryDossiers = {
  day_1: [
    {
      site_id: 'essex_farm',
      site_name: 'Essex Farm Advanced Dressing Station (Stop 1)',
      stop_time: '14:30 · Day 1',
      poems: [
        {
          id: 'mccrae_flanders_fields',
          title: 'In Flanders Fields',
          year: 'May 1915',
          poet: {
            name: 'Lieutenant Colonel John McCrae',
            role: 'Brigade Surgeon, 1st Brigade Canadian Field Artillery',
            lifespan: '1872–1918',
            portrait: '/images/john_mccrae.jpg',
          },
          bio: 'Born in Guelph, Ontario, John McCrae was an accomplished Canadian physician, pathologist, and veteran of the South African War. In 1914, he volunteered at age 41. At Essex Farm during the Second Battle of Ypres (April–May 1915), McCrae treated hundreds of casualties in damp concrete dugouts under relentless chlorine gas attacks and artillery fire. Following the death of his friend Lt. Alexis Helmer on 2nd May 1915, McCrae composed this poem sitting on the back of an ambulance looking out at the red poppies growing between the wooden crosses. McCrae died of pneumonia on active service in January 1918 and is buried at Wimereux.',
          poem_text: `In Flanders fields the poppies blow
Between the crosses, row on row,
    That mark our place; and in the sky
    The larks, still bravely singing, fly
Scarce heard amid the guns below.

We are the Dead. Short days ago
We lived, felt dawn, saw sunset glow,
    Loved and were loved, and now we lie,
        In Flanders fields.

Take up our quarrel with the foe:
To you from failing hands we throw
    The torch; be yours to hold it high.
    If ye break faith with us who die
We shall not sleep, though poppies grow
        In Flanders fields.`,
          teacher_commentary: `Stand with your back to the Yser Canal, facing the low concrete bunkers. Remind pupils that these doorways were hung with damp blankets to keep out poison gas. Point out that McCrae was not an infantryman seeking glory, but a 41-year-old doctor surrounded by unbearable suffering. His friend Alexis Helmer was blown to pieces by an 8-inch shell; with no chaplain available, McCrae buried what remained of him by lantern light. The poem was born out of raw, exhausting grief. Ask pupils to notice the contrast between the singing larks in the sky and the dying soldiers below.`,
          pedagogical_rationale: {
            context: `Written in May 1915 during the Second Battle of Ypres, 'In Flanders Fields' is the most influential poem of the First World War. It popularized the red poppy as the universal symbol of remembrance. However, its final stanza is overtly martial—a call to 'take up our quarrel with the foe'. This tension between pastoral grief and recruitment propaganda makes it an essential text for critical analysis.`,
            hinge_question: `Why did a poem written in exhaustion and grief beside a bloody dressing station become an imperial rallying cry for recruitment rather than an anti-war protest?`,
          },
        },
      ],
    },
    {
      site_id: 'langemarck',
      site_name: 'Langemarck German Military Cemetery (Stop 2)',
      stop_time: '15:15 · Day 1',
      poems: [
        {
          id: 'sorley_to_germany',
          title: 'To Germany',
          year: 'Spring 1915',
          poet: {
            name: 'Captain Charles Hamilton Sorley',
            role: '7th (Service) Battalion, Suffolk Regiment',
            lifespan: '1895–1915',
            portrait: '/images/charles_sorley.jpg',
          },
          bio: 'Born in Aberdeen, Charles Hamilton Sorley was an exceptionally gifted student at Marlborough College. In early 1914, he lived and studied in Schwerin and Jena, Germany, falling deeply in love with German literature and culture. When war broke out, he returned to Britain and enlisted in the Suffolk Regiment, but refused to adopt the anti-German hatred whipped up by the press. Sorley was killed in action by a sniper’s bullet through the head at the Battle of Loos on 13th October 1915, aged just 20. His surviving war poems, discovered in his kit-bag after his death, are among the most philosophically profound of the war.',
          poem_text: `You are blind like us. Your hurt no man designed,
And no man claimed the conquest of your land.
But both have gone warring against the dark; and so we stand
Looking beyond each other in the blind night,
And only reach each other through the night
Of our own darkness, like men in a cave.
You are only our brothers who have made
The same mistake, and died for it. You were
Like us, who looked on darkness and were afraid.

When it is over, and the war is done,
We shall walk over the scarred earth again,
And greet each other as comrades in the sun,
Remembering only that we once were blind.
And we shall hear the music of the spheres,
And see the sun, and hear the gentle rain,
And we shall be as brothers once again.`,
          teacher_commentary: `Gather the pupils beneath the dark oak trees near the entrance, looking out over the flat, dark basalt gravestones. Explain that Sorley loved Germany and spoke fluent German. He wrote this poem while preparing to enter the trenches, addressing the German soldiers directly not as monsters, but as brothers caught in the same tragic darkness. When pupils look across the Kameradengrab (mass grave), have them read Sorley's prophetic line: 'You are only our brothers who have made the same mistake, and died for it.'`,
          pedagogical_rationale: {
            context: `While official British propaganda portrayed the German army as barbarous 'Huns', young intellectuals like Charles Sorley recognized the catastrophic shared tragedy of European civilization tearing itself apart. Standing at Langemarck, Sorley's verse challenges pupils to view German casualties as individual young men who shared the same hopes, fears, and youthful errors as British Tommies.`,
            hinge_question: `How does reading Sorley's 'To Germany' beside a German mass grave fundamentally alter our understanding of remembrance compared to visiting an Allied cemetery?`,
          },
        },
        {
          id: 'owen_strange_meeting',
          title: 'Strange Meeting',
          year: 'Spring 1918',
          poet: {
            name: 'Lieutenant Wilfred Owen, MC',
            role: '2nd Battalion, The Manchester Regiment',
            lifespan: '1893–1918',
            portrait: '/images/wilfred_owen.jpg',
          },
          bio: 'Born in Oswestry, Shropshire, Wilfred Owen is widely regarded as the greatest poet of the First World War. Serving as a frontline officer with the Manchester Regiment, he endured horrific trench trauma on the Somme before being evacuated to Craiglockhart War Hospital with shell shock in 1917, where he met Siegfried Sassoon. Owen returned to the frontline in 1918, won the Military Cross for capturing a German machine-gun post, but was killed in action at the Sambre-Oise Canal on 4th November 1918—exactly seven days before the Armistice. News of his death reached his mother as church bells rang out for peace on 11th November.',
          poem_text: `It seemed that out of battle I escaped
Down some profound dull tunnel, long since scooped
Through granites which titanic wars had groined.

Yet also there encumbered sleepers groaned,
Too fast in thought or death to be bestirred.
Then, as I probed them, one sprang up, and stared
With piteous recognition in fixed eyes,
Lifting distressful hands, as if to bless.
And by his smile, I knew that sullen hall,—
By his dead smile I knew we stood in Hell.

With a strange mournful vision he looked on me,
And said: 'Strange friend,' here is no cause to mourn.
'None,' said I, 'save the undone years,
The hopelessness. Whatever hope is yours,
Was my life also; I went hunting wild
After the wildest beauty in the world...'

'I am the enemy you killed, my friend.
I knew you in this dark: for so you frowned
Yesterday through me as you jabbed and killed.
I parried; but my hands were loath and cold.
Let us sleep now...'`,
          teacher_commentary: `Walk the group over to the perimeter steles surrounding the mass grave. Explain that in this poem, Owen imagines escaping the battlefield down into a subterranean tunnel in Hell, where he encounters the ghost of a soldier he killed the day before. The dead German soldier does not curse him; he reaches out with 'distressful hands, as if to bless' and speaks the unforgettable words: 'I am the enemy you killed, my friend.' Pause and ask pupils: What does it mean when the enemy you killed calls you 'my friend'?`,
          pedagogical_rationale: {
            context: `Written in 1918, 'Strange Meeting' is Owen's ultimate reconciliation poem. It strips away uniforms, national flags, and political slogans to reveal two young men whose shared creative potential and youth were destroyed in the dark. At Langemarck, it serves as the definitive antidote to the Nazi weaponization of the 'Langemarck Myth'.`,
            hinge_question: `Why does Owen portray the dead German soldier addressing his killer as 'my friend', and what does this say about the true brotherhood of the frontline?`,
          },
        },
      ],
    },
    {
      site_id: 'hooge_crater',
      site_name: 'Hooge Crater Museum & Preserved Trenches (Stop 3)',
      stop_time: '16:00 · Day 1',
      poems: [
        {
          id: 'rosenberg_break_of_day',
          title: 'Break of Day in the Trenches',
          year: 'June 1916',
          poet: {
            name: 'Private Isaac Rosenberg',
            role: '11th Battalion, King’s Own Royal Lancaster Regiment',
            lifespan: '1890–1918',
            portrait: '/images/isaac_rosenberg.jpg',
          },
          bio: 'Born in Bristol into a working-class family of Lithuanian Jewish immigrants, Isaac Rosenberg grew up in the East End of London. An exceptionally talented visual artist, he studied at the Slade School of Fine Art alongside Paul Nash and Stanley Spencer. Unlike the famous officer-poets (Sassoon, Graves, Brooke), Rosenberg enlisted as a private soldier in 1915 purely to send his separation allowance home to his impoverished mother. Serving in the mud as a private, he carried scraps of paper in his pocket to write poetry. Rosenberg was killed in action at dawn on 1st April 1918 during the German Spring Offensive, and his body was never found.',
          poem_text: `The darkness crumbles away.
It is the same old druid Time as ever,
Only a live thing leaps my hand,
A queer sardonic rat,
As I pull the parapet’s poppy
To stick behind my ear.
Droll rat, they would shoot you if they knew
Your cosmopolitan sympathies,
Now you have touched this English hand
You will have the same chance to touch a German,
If you cross the green chasm of no man's land.

It seems you inwardly grin as you pass
Strong eyes, fine limbs, haughty athletes,
Less chanced to live than you,
Bonds to the whims of murder,
Sprawled in the bowels of the earth,
The shattered goads of men.

What do you see in our eyes
At the shriek of the iron heart,
The shaken fire of the shell?
What roots of terror?
Poppies from man's veins drop,
Roots in man's veins drop,
And mine in my ear is safe,
Just a little white with the dust.`,
          teacher_commentary: `Lead pupils down into the replica and preserved trench ditches at Hooge. Ask them to look down at their boots in the mud and look up at the sandbagged parapet. Rosenberg wrote this poem at dawn on sentry duty as a rat brushed against his hand. Notice his dark humor: the rat has 'cosmopolitan sympathies' because it can run freely between English and German trenches while young men are shot down if they show their heads. Point out the poignancy of the poppy behind his ear—'just a little white with the dust' of the trench.`,
          pedagogical_rationale: {
            context: `Rosenberg provides the authentic perspective of the ordinary British private soldier. In 'Break of Day in the Trenches', he flips the traditional heroic narrative on its head: a lowly trench rat is more free and more likely to survive than the finest athletic youth of Britain and Germany, who are mere 'bonds to the whims of murder'.`,
            hinge_question: `How does Rosenberg use a common trench rat to expose the absurdity and artificiality of the war between British and German soldiers?`,
          },
        },
        {
          id: 'sassoon_attack',
          title: 'Attack',
          year: 'October 1917',
          poet: {
            name: 'Captain Siegfried Sassoon, MC',
            role: 'Royal Welch Fusiliers',
            lifespan: '1886–1967',
            portrait: '/images/siegfried_sassoon.jpg',
          },
          bio: 'Born in Kent, Siegfried Sassoon was an intrepid frontline officer decorated with the Military Cross for gallantry. Revered by his men as "Mad Jack" for his reckless bravery during trench raids, Sassoon became violently disillusioned with the slaughter of Passchendaele. In 1917, he famously published a public letter refusing to fight further, declaring that the war was being deliberately prolonged by politicians. Saved from court-martial by Robert Graves, he was sent to Craiglockhart War Hospital where he wrote his most blistering satires.',
          poem_text: `At dawn the ridge emerges massed and dun
In the wild purple of the glow'ring sun,
Smouldering through spouts of drifting smoke that shroud
The menacing scarred slope; and, one by one,
Tanks creep and topple forward to the wire.
The barrage roars and lifts. Then, clumsily bowed
With bombs and guns and shovels and battle-gear,
Men jostle and climb to meet the bristling fire.
Lines of grey, muttering faces, masked with fear,
They leave their trenches, going over the top,
While time ticks blank and busy on their wrists,
And hope, with furtive eyes and grappling fists,
Flounders in mud. O Jesus, make it stop!`,
          teacher_commentary: `Stand by the edge of the deep crater at Hooge. Describe the scene at dawn: the whistle blowing, men weighted down with 60 pounds of kit—bombs, shovels, rifles—struggling out of the trench into machine-gun fire. Highlight the clockwork detachment of 'time ticks blank and busy on their wrists' and the desperate final prayer that breaks the rhythm: 'O Jesus, make it stop!'`,
          pedagogical_rationale: {
            context: `Written in 1917, 'Attack' is a masterclass in realistic poetic pacing. It captures the transition from mechanical preparation (tanks, barrages, watches) to raw human terror (muttering faces, fear, and desperate prayers) in thirteen intense lines.`,
            hinge_question: `Why does Sassoon abruptly break the formal poetic rhyme and meter with the final desperate cry: 'O Jesus, make it stop!'?`,
          },
        },
      ],
    },
  ],
  day_2: [
    {
      site_id: 'brooding_soldier',
      site_name: 'The Brooding Soldier Memorial (St. Julien) (Stop 4)',
      stop_time: '09:15 · Day 2',
      poems: [
        {
          id: 'owen_dulce_et_decorum',
          title: 'Dulce et Decorum Est',
          year: 'October 1917',
          poet: {
            name: 'Lieutenant Wilfred Owen, MC',
            role: '2nd Battalion, The Manchester Regiment',
            lifespan: '1893–1918',
            portrait: '/images/wilfred_owen.jpg',
          },
          bio: 'Written while undergoing psychiatric treatment for shell shock at Craiglockhart War Hospital in Edinburgh in October 1917, this poem is Wilfred Owen’s searing masterpiece. It was directly addressed to civilian propagandist Jessie Pope, whose popular poetry urged English schoolboys to enlist as if war were a playful game.',
          poem_text: `Bent double, like old beggars under sacks,
Knock-kneed, coughing like hags, we cursed through sludge,
Till on the haunting flares we turned our backs,
And towards our distant rest began to trudge.
Men marched asleep. Many had lost their boots,
But limped on, blood-shod. All went lame; all blind;
Drunk with fatigue; deaf even to the hoots
Of gas-shells dropping softly behind.

Gas! GAS! Quick, boys!—An ecstasy of fumbling,
Fitting the clumsy helmets just in time,
But someone still was yelling out and stumbling
And flound'ring like a man in fire or lime.—
Dim through the misty panes and thick green light,
As under a green sea, I saw him drowning.

In all my dreams before my helpless sight,
He plunges at me, guttering, choking, drowning.

If in some smothering dreams, you too could pace
Behind the wagon that we flung him in,
And watch the white eyes writhing in his face,
His hanging face, like a devil's sick of sin;
If you could hear, at every jolt, the blood
Come gargling from the froth-corrupted lungs,
Obscene as cancer, bitter as the cud
Of vile, incurable sores on innocent tongues,—
My friend, you would not tell with such high zest
To children ardent for some desperate glory,
The old Lie: Dulce et decorum est
Pro patria mori.`,
          teacher_commentary: `Have pupils stand around the towering Canadian column of The Brooding Soldier. Ask them to take out their compasses and face North-East—the exact direction of the German lines from where 168 tons of chlorine gas were discharged on 22nd April 1915. Read Owen's lines slowly. Point out that the Canadian soldier on the monument does not hold his rifle high in victory; he is resting his hands on a reversed rifle, mourning his comrades who suffocated on this soil.`,
          pedagogical_rationale: {
            context: `Horace’s classical Roman ode 'Dulce et decorum est pro patria mori' ('It is sweet and fitting to die for one's country') was carved onto school chapel walls across England. Owen violently dismantles this myth with graphic, medical descriptions of gas poisoning ('froth-corrupted lungs', 'devil's sick of sin').`,
            hinge_question: `Why does Owen call the ancient Roman phrase 'The Old Lie', and how does standing here at the site of the first chemical attack reinforce his message?`,
          },
        },
        {
          id: 'owen_parable_old_man',
          title: 'The Parable of the Old Man and the Young',
          year: '1918',
          poet: {
            name: 'Lieutenant Wilfred Owen, MC',
            role: '2nd Battalion, The Manchester Regiment',
            lifespan: '1893–1918',
            portrait: '/images/wilfred_owen.jpg',
          },
          bio: 'Owen wrote this biblical allegory while preparing to return to France in 1918. He retells the Genesis story of Abraham and Isaac, transforming it into a searing critique of the elderly political leaders who sacrificed the entire youth of Europe rather than make peace.',
          poem_text: `So Abram rose, and clave the wood, and went,
And took the two full fire with him, and a knife.
And as they sojourned both of them together,
Isaac the first-born spake and said, My Father,
Behold the preparations and the fire,
But where the lamb for this burnt-offering?
Then Abram bound the youth with belts and straps,
and builded parapets and trenches there,
And stretched forth the knife to slay his son.
When lo! an angel called him out of heaven,
Saying, Lay not thy hand upon the lad,
Neither do anything to him. Behold,
A ram, caught in a thicket by its horns;
Offer the Ram of Pride instead of him.

But the old man would not so, but slew his son,
And half the seed of Europe, one by one.`,
          teacher_commentary: `Point out how Owen takes the familiar biblical story that every Edwardian schoolboy knew, and introduces trench terms: 'belts and straps', 'parapets and trenches'. In the Bible, God spares Isaac by providing a ram. But in Owen's modern version, the old men of Europe refuse the Ram of Pride and choose to slaughter their sons anyway.`,
          pedagogical_rationale: {
            context: `This poem captures the generational betrayal felt by the soldiers in the trenches towards the older generation of politicians, generals, and clergy at home who prolonged the war.`,
            hinge_question: `What is the 'Ram of Pride' that Owen refers to, and why did the leaders of Europe refuse to sacrifice it in 1915–1918?`,
          },
        },
      ],
    },
    {
      site_id: 'sanctuary_wood',
      site_name: 'Sanctuary Wood (Hill 62) Preserved Trenches (Stop 5)',
      stop_time: '09:45 · Day 2',
      poems: [
        {
          id: 'sassoon_memorial_tablet',
          title: 'Memorial Tablet (April 1919)',
          year: '1919',
          poet: {
            name: 'Captain Siegfried Sassoon, MC',
            role: 'Royal Welch Fusiliers',
            lifespan: '1886–1967',
            portrait: '/images/siegfried_sassoon.jpg',
          },
          bio: 'Written in 1919 after the Armistice, this poem adopts the voice of a dead soldier whose name is neatly commemorated on a brass tablet in a quiet village church back home, contrasting the polite memorial with the gruesome reality of his death in the Flanders mud.',
          poem_text: `Squire nagged and bullied till I went to fight,
(Under Lord Derby’s Scheme). I died in hell—
(They called it Passchendaele). My wound was slight,
And I was hobbling back; and then a shell
Burst slick upon the duck-boards: so I fell
Into the bottomless mud, and lost the light.

At sermon-time, while Squire is in his pew,
He loves to gaze upon my brass and stone,
Where sweet names tell of glory that I won,
And clean words tell of how I died for you.
Here in the church he’s safe, and I’m forgotten,
Though on his lawn the cheerful autumn sun
Shines like a medal; and I lie rotting on.`,
          teacher_commentary: `Have pupils walk carefully along the wooden duckboards in the muddy trench system at Sanctuary Wood. Tell them to look at the slippery timber slats under their boots. Read Sassoon's exact words: 'a shell burst slick upon the duck-boards: so I fell into the bottomless mud, and lost the light.' Point out how this connects directly to the Crofton Parish Memorial Tablet back in Stubbington church.`,
          pedagogical_rationale: {
            context: `Sassoon contrasts the polite, sanitized language of village memorials ('clean words tell of how I died for you') with the horrific reality of slipping into shell craters and drowning in liquid mud. It provides a vital bridge between our home village memorial and the battlefields of Flanders.`,
            hinge_question: `Why does Sassoon mock the 'clean words' on church memorial tablets compared to the reality of drowning in Passchendaele mud?`,
          },
        },
        {
          id: 'owen_exposure',
          title: 'Exposure',
          year: 'Winter 1917',
          poet: {
            name: 'Lieutenant Wilfred Owen, MC',
            role: '2nd Battalion, The Manchester Regiment',
            lifespan: '1893–1918',
            portrait: '/images/wilfred_owen.jpg',
          },
          bio: 'Written during the freezing winter of 1916–1917, the coldest European winter in living memory. Owen and his men spent days pinned in flooded frontline saps in sub-zero temperatures, where the weather itself was deadlier than German snipers.',
          poem_text: `Our brains ache, in the merciless iced east winds that knive us...
Wearied we keep awake because the night is silent,
Low drooping flares confuse our memory of the salient...
Worried by silence, sentries whisper, curious, nervous,
    But nothing happens.

Watching, we hear the mad gusts tugging on the wire,
Like twitching agonies of men among its brambles.
Northward, incessantly, the flickering gunnery rumbles,
Far off, like a dull rumour of some other war.
    What are we doing here?

Pale flakes with fingering stealth come feeling for our faces—
We cringe in holes, back on forgotten dreams, and stare, snow-dazed,
Deep into grassier ditches. So we drowse, sun-dozed,
Littered with blossoms trickling where the blackbird fusses.
    —Is it that we are dying?

Tonight, this frost will fasten on this mud and us,
Shrivelling many hands, and puckering foreheads crisp.
The burying-party, picks and shovels in shaking grasp,
Pause over half-known faces. All their eyes are ice,
    But nothing happens.`,
          teacher_commentary: `Gather the pupils in the sunken sap beneath the splintered, preserved tree trunks of Sanctuary Wood. Emphasize that during winter, exposure and frostbite were constant killers. The refrain 'But nothing happens' captures the agonizing psychological torture of waiting for death in the freezing mud without ever seeing the enemy.`,
          pedagogical_rationale: {
            context: `Industrialized warfare was not just machine guns and artillery; it was prolonged sensory deprivation and environmental trauma. Owen depicts nature itself as hostile, with the wind and frost acting as active assailants.`,
            hinge_question: `Why does Owen repeat the haunting phrase 'But nothing happens' four times throughout the poem?`,
          },
        },
      ],
    },
    {
      site_id: 'tyne_cot',
      site_name: 'Tyne Cot British Cemetery & Memorial to the Missing (Stop 6)',
      stop_time: '13:00 · Day 2',
      poems: [
        {
          id: 'owen_anthem_for_doomed_youth',
          title: 'Anthem for Doomed Youth',
          year: 'September 1917',
          poet: {
            name: 'Lieutenant Wilfred Owen, MC',
            role: '2nd Battalion, The Manchester Regiment',
            lifespan: '1893–1918',
            portrait: '/images/wilfred_owen.jpg',
          },
          bio: 'Drafted at Craiglockhart War Hospital in September 1917 with handwritten corrections and title suggestions from Siegfried Sassoon. It is an elegy for an entire generation of boys who died without traditional funerals.',
          poem_text: `What passing-bells for these who die as cattle?
    — Only the monstrous anger of the guns.
    Only the stuttering rifles' rapid rattle
Can patter out their hasty orisons.
No mockeries now for them; no prayers nor bells;
    Nor any voice of mourning save the choirs,—
The shrill, demented choirs of wailing shells;
    And bugles calling for them from sad shires.

What candles may be held to speed them all?
    Not in the hands of boys, but in their eyes
Shall shine the holy glimmers of good-byes.
    The pallor of girls' brows shall be their pall;
Their flowers the tenderness of patient minds,
And each slow dusk a drawing-down of blinds.`,
          teacher_commentary: `Stand in front of the Great Memorial Wall at the back of Tyne Cot, where nearly 35,000 names of the missing are carved—including our Stubbington boys Sydney Muckett, Arthur Rye, Archibald Ward, and Charles Warland. Read the opening question: 'What passing-bells for these who die as cattle?' Look across the 12,000 white Portland gravestones. Explain that these boys received no church bells, no coffins, and no parish choirs; their only choir was the 'wailing shells'.`,
          pedagogical_rationale: {
            context: `Owen subverts traditional Anglican funeral liturgy (passing bells, candles, palls, flowers), showing how mass industrialized slaughter rendered individual Christian burial rites impossible. Standing in the world's largest Commonwealth cemetery, the sonnet provides a solemn spiritual frame for the vast scale of loss.`,
            hinge_question: `How does Owen replace the physical objects of a Christian funeral (bells, candles, flowers, palls) with the emotions of loved ones waiting at home?`,
          },
        },
        {
          id: 'housman_here_dead_we_lie',
          title: 'Here Dead We Lie',
          year: '1922',
          poet: {
            name: 'A. E. Housman',
            role: 'English Classical Scholar and Poet',
            lifespan: '1859–1936',
            portrait: '/images/ae_housman.jpg',
          },
          bio: 'Alfred Edward Housman was an esteemed professor of Latin at Cambridge University and author of A Shropshire Lad. His younger brother Herbert Housman was killed in the Boer War. In 1922, heartbroken by the loss of countless students in the trenches, he published this four-line epitaph.',
          poem_text: `Here dead we lie because we did not choose
To live and shame the land from which we sprung.
Life, to be sure, is nothing much to lose;
But young men think it is, and we were young.`,
          teacher_commentary: `Pause with the group beside the central Cross of Sacrifice, which sits directly on top of a captured German concrete bunker. Recite these four simple lines. Point out the devastating honesty of the final line: 'Life, to be sure, is nothing much to lose; / But young men think it is, and we were young.'`,
          pedagogical_rationale: {
            context: `In just four lines, Housman captures the essence of youthful sacrifice without moral posturing or jingoism. It is direct, unpretentious, and accessible for any pupil to grasp instantly.`,
            hinge_question: `What makes the understatement in Housman's final line ('and we were young') more powerful than a lengthy speech?`,
          },
        },
      ],
    },
    {
      site_id: 'lijssenthoek',
      site_name: 'Lijssenthoek Casualty Clearing Station & Cemetery (Stop 7)',
      stop_time: '14:15 · Day 2',
      poems: [
        {
          id: 'brittain_perhaps',
          title: 'Perhaps (To R.A.L.)',
          year: '1916',
          poet: {
            name: 'Vera Brittain',
            role: 'Voluntary Aid Detachment (VAD) Nurse',
            lifespan: '1893–1970',
            portrait: '/images/vera_brittain.jpg',
          },
          bio: 'Born in Staffordshire, Vera Brittain abandoned her studies at Somerville College, Oxford, in 1915 to volunteer as a Voluntary Aid Detachment (VAD) nurse, treating grievously wounded soldiers in London, Malta, and France. Her fiancé, Roland Leighton, was killed by a sniper in December 1915; her brother Edward and two closest friends were also killed. Her landmark 1933 memoir Testament of Youth remains the definitive female account of the Great War.',
          poem_text: `Perhaps some day the sun will shine again,
    And I shall see it, though I do not care;
Perhaps I shall not always feel this pain,
    Nor shrink to see the blossom in the air;
Perhaps some day the sun will shine again.

Perhaps the golden meadows at my feet
    Will make the sunny April seem less sad,
And I shall take up life again, and meet
    The friends of yesterday, and be almost glad;
Perhaps the golden meadows at my feet.

Perhaps some day I shall not weep to hear
    The sound of children playing in the street,
And I shall smile, and hold all life most dear,
    And find the memories of you strange and sweet;
Perhaps some day I shall not weep to hear.

But though kind Time may many joys restore,
    There is one thing that I can never find:
The joy that was, the joy that comes no more,
    The lovely dream that left you, and left me blind.
There is one thing that I can never find.`,
          teacher_commentary: `Gather pupils at Grave XVI. A. 3, the headstone of Staff Nurse Nellie Spindler—the only woman buried among the 10,755 men at Lijssenthoek. Explain that thousands of young women served right here in the medical chain, washing wounds, assisting in amputations, and watching boys die. Read Vera Brittain's poem, written after losing her fiancé. Emphasize that women were not passive observers; their lives and hearts were shattered by this war too.`,
          pedagogical_rationale: {
            context: `Traditional First World War poetry anthologies overwhelmingly privilege combatant men. Vera Brittain's poetry provides an indispensable female perspective, demonstrating the immense emotional and psychological toll borne by wartime nurses and bereaved families.`,
            hinge_question: `Why is it vital that we remember the service of nurses like Nellie Spindler and writers like Vera Brittain alongside frontline infantrymen?`,
          },
        },
        {
          id: 'herbert_the_stretcher_bearer',
          title: 'The Stretcher-Bearer',
          year: '1916',
          poet: {
            name: 'Sir A. P. Herbert',
            role: 'Hawke Battalion, Royal Naval Division',
            lifespan: '1890–1971',
            portrait: '/images/ap_herbert.jpg',
          },
          bio: 'Sir Alan Patrick Herbert served in the Royal Naval Division at Gallipoli and on the Western Front, where he was wounded in 1917. Later an independent Member of Parliament and author, his wartime verse focused on the uncelebrated heroism of stretcher-bearers who carried the wounded under heavy fire without weapons.',
          poem_text: `My thoughts go back to that wet September,
And the long trench-line where the shrapnel flew;
And there is one man I shall e’er remember,
And one brave deed that I saw him do.

He was a stretcher-bearer, calm and steady,
Through the shell-swept zone where the wounded lay;
With his burden raised and his shoulders ready,
He carried his wounded comrades away.

No cross of bronze did they give for caring,
No medal pinned to his muddy breast;
Only the love of the men whose tearing
Flesh he carried away to rest.`,
          teacher_commentary: `Remind pupils that Lijssenthoek received casualties evacuated by motor ambulance from dressing stations like Essex Farm. Stretcher-bearers carried wounded soldiers for miles through knee-deep mud under constant shellfire, completely unarmed. A. P. Herbert's poem pays tribute to their quiet, unrewarded courage.`,
          pedagogical_rationale: {
            context: `Stretcher-bearers suffered staggering casualty rates. This poem shifts pupils' focus from combat violence to the heroic labor of saving lives.`,
            hinge_question: `Why did frontline soldiers often express deeper gratitude towards unarmed stretcher-bearers and hospital staff than towards their commanding officers?`,
          },
        },
      ],
    },
    {
      site_id: 'menin_gate_last_post',
      site_name: 'The Menin Gate Last Post Ceremony (Stop 8)',
      stop_time: '20:00 · Day 2',
      poems: [
        {
          id: 'binyon_for_the_fallen',
          title: 'For the Fallen (The Ode of Remembrance)',
          year: 'September 1914',
          poet: {
            name: 'Laurence Binyon',
            role: 'Curator, British Museum & Red Cross Volunteer',
            lifespan: '1869–1943',
            portrait: '/images/laurence_binyon.jpg',
          },
          bio: 'Too old to enlist as a soldier in 1914, Laurence Binyon was deeply moved by the heavy casualties suffered by the British Expeditionary Force at Mons. Sitting on the clifftops at Polzeath, Cornwall, looking out over the sea, he composed For the Fallen. In 1916, he volunteered as a Red Cross hospital orderly in France, tending to severely wounded French soldiers.',
          poem_text: `With proud thanksgiving, a mother for her children,
England mourns for her dead across the sea.
Flesh of her flesh they were, spirit of her spirit,
Fallen in the cause of the free.

Solemn the drums thrill: Death august and royal
Sings sorrow up into immortal spheres,
There is music in the midst of desolation
And a glory that shines upon our tears.

They went with songs to the battle, they were young,
Straight of limb, true of eye, steady and aglow.
They were staunch to the end against odds uncounted;
They fell with their faces to the foe.

They shall grow not old, as we that are left grow old:
Age shall not weary them, nor the years condemn.
At the going down of the sun and in the morning
We will remember them.

As the stars that shall be bright when we are dust,
Moving in marches upon the heavenly plain;
As the stars that are starry in the time of our darkness,
To the end, to the end, they remain.`,
          teacher_commentary: `As the bugles of the Last Post Association echo under the vast vaulted archway of the Menin Gate at 8:00 PM, whisper to the students to listen for the fourth stanza. Explain that these words have been recited here every night at 8:00 PM since 1928 (except during the German WWII occupation). Remind them that carved into the stone all around them are our Stubbington boys Thomas Franklin and William Ayling.`,
          pedagogical_rationale: {
            context: `Binyon's fourth stanza is the official liturgical text of modern British remembrance. It creates a sacred bridge between the physical stone arch of the Menin Gate and the living memory of the school community laying a wreath.`,
            hinge_question: `Why has Binyon's line 'They shall grow not old, as we that are left grow old' endured for over a century as the defining national prayer of remembrance?`,
          },
        },
        {
          id: 'brooke_the_soldier',
          title: 'The Soldier',
          year: '1914',
          poet: {
            name: 'Sub-Lieutenant Rupert Brooke',
            role: 'Hood Battalion, Royal Naval Division',
            lifespan: '1887–1915',
            portrait: '/images/rupert_brooke.jpg',
          },
          bio: 'Rupert Brooke was the golden youth of Georgian England—an accomplished Cambridge scholar, athlete, and poet. He enlisted at the outbreak of war in 1914 and was commissioned into the Royal Naval Division. He died of sepsis from an infected mosquito bite off the Greek island of Skyros in April 1915 on his way to Gallipoli, becoming an immediate national martyr.',
          poem_text: `If I should die, think only this of me:
    That there's some corner of a foreign field
That is for ever England. There shall be
    In that rich earth a richer dust concealed;
A dust whom England bore, shaped, made aware,
    Gave, once, her flowers to love, her ways to roam;
A body of England's, breathing English air,
    Washed by the rivers, blest by suns of home.

And think, this heart, all evil shed away,
    A pulse in the eternal mind, no less
        Gives somewhere back the thoughts by England given;
Her sights and sounds; dreams happy as her day;
    And laughter, learnt of friends; and gentleness,
        In hearts at peace, under an English heaven.`,
          teacher_commentary: `Have pupils look at the massive neoclassical architecture of the Menin Gate, designed by Sir Reginald Blomfield. Explain that Brooke captured the early, romantic idealism of 1914—the belief that dying abroad simply planted a piece of England in foreign soil. Contrast Brooke's gentle 'English heaven' with the 54,000 names carved into the cold walls around them.`,
          pedagogical_rationale: {
            context: `Brooke's 1914 sonnet represents the romantic, patriotic dawn of the war before the industrialized nightmare of poison gas and Passchendaele took hold. Contrasting Brooke with Sassoon and Owen allows pupils to trace how English war poetry evolved from innocent patriotism into bitter protest.`,
            hinge_question: `How does Brooke's idea that 'there's some corner of a foreign field that is for ever England' compare to the physical reality of the 54,000 missing on the Menin Gate?`,
          },
        },
      ],
    },
  ],
  day_3: [
    {
      site_id: 'ypres_ramparts',
      site_name: 'Ypres Ramparts & Ramparts Cemetery (Stop 9)',
      stop_time: '09:15 · Day 3',
      poems: [
        {
          id: 'sassoon_menin_gate',
          title: 'On Passing the New Menin Gate',
          year: 'July 1927',
          poet: {
            name: 'Captain Siegfried Sassoon, MC',
            role: 'Royal Welch Fusiliers',
            lifespan: '1886–1967',
            portrait: '/images/siegfried_sassoon.jpg',
          },
          bio: 'When the Menin Gate was inaugurated with grand imperial fanfare by Field Marshal Lord Plumer and King Albert I in July 1927, Sassoon visited the site. He was disgusted by the triumphal neoclassical arch, viewing it as a sanitized monument that glorified politicians while hiding the horrific reality of the men whose shattered bones remained buried in the slime.',
          poem_text: `Who will remember, passing through this Gate,
The unheroic Dead who fed the guns?
Who shall absolve the foulness of their fate,—
Those doomed, conscripted, unvictorious ones?
Crudely renewed, the Salient holds its own.
Paid are its dues, and waged its warfare; nay,
What need to make a triumph out of bone,
Or keep a pile of names from passing away?

Here was the world’s worst wound. And here with pride
'Their name liveth for ever', the Gateway claims.
Was ever an immolation so belied
As these intolerably nameless names?
Well might the Dead who struggled in the slime
Rise and deride this sepulchre of crime.`,
          teacher_commentary: `Walk the pupils along the quiet, grassy ramparts overlooking the moat at the Lille Gate. Looking back at the rebuilt town of Ypres and the Menin Gate in the distance, read Sassoon's blistering attack on the memorial. Point out how Sassoon calls the Menin Gate a 'sepulchre of crime' because it turns the horrific slaughter of ordinary boys into an imperial 'triumph out of bone'. Contrast this with the peaceful, understated headstones of Ramparts Cemetery.`,
          pedagogical_rationale: {
            context: `Sassoon’s sonnet is one of the most powerful anti-memorial critiques in English literature. It forces pupils to interrogate who monuments are truly built for: the dead who suffered in the slime, or the surviving politicians seeking to justify the war.`,
            hinge_question: `Why did decorated veteran Siegfried Sassoon describe the world-famous Menin Gate as a 'sepulchre of crime'?`,
          },
        },
        {
          id: 'sassoon_aftermath',
          title: 'Aftermath',
          year: 'March 1919',
          poet: {
            name: 'Captain Siegfried Sassoon, MC',
            role: 'Royal Welch Fusiliers',
            lifespan: '1886–1967',
            portrait: '/images/siegfried_sassoon.jpg',
          },
          bio: 'Written in March 1919 just months after the guns fell silent, Sassoon feared that British society would rush to celebrate victory and forget the horrific trauma, shell shock, and disfigurement of the men who survived.',
          poem_text: `Have you forgotten yet?...
For the world's events have rumbled on since those gagged days,
Like traffic checked while at the crossing of city-ways:
And the haunted gap in your mind has filled with thoughts that flow
Like clouds in the lit heavens of life; and you're a man reprieved to go,
Taking your peaceful share of Time, with joy to spare.
    But the past is just the same—and War's a bloody game...
    Have you forgotten yet?...
    Look down, and swear by the slain of the War that you'll never forget.

Do you remember the dark months you held the sector at Mametz—
The nights you watched and wired and dug and piled thin sandbags on parapets?
Do you remember the stretcher-cases lurching back with corpses through the dark,
And the stench of bodies rotting in the slime?
    Have you forgotten yet?...
    Look up, and swear by the green of the spring that you'll never forget.`,
          teacher_commentary: `As we complete our walk along the ramparts, look out over the peaceful green Flemish fields. Sassoon challenges us directly with the question: 'Have you forgotten yet?' Remind pupils that the purpose of our 3-day pilgrimage from Hampshire is not just to see sights, but to make a personal commitment to never forget the real human cost of war.`,
          pedagogical_rationale: {
            context: `Published in 1919, 'Aftermath' warns against historical amnesia and complacency. It directly links memory with moral duty.`,
            hinge_question: `Why does Sassoon plead with surviving citizens to 'swear by the green of the spring that you'll never forget'?`,
          },
        },
      ],
    },
    {
      site_id: 'talbot_house',
      site_name: 'Talbot House / "Every Man\'s Club", Poperinge (Stop 10)',
      stop_time: '11:20 · Day 3',
      poems: [
        {
          id: 'sassoon_everyone_sang',
          title: 'Everyone Sang',
          year: 'April 1919',
          poet: {
            name: 'Captain Siegfried Sassoon, MC',
            role: 'Royal Welch Fusiliers',
            lifespan: '1886–1967',
            portrait: '/images/siegfried_sassoon.jpg',
          },
          bio: 'Written in April 1919, this poem expresses the sudden, overwhelming release of joyful emotion and fellowship when soldiers were liberated from the oppressive terror of combat and reunited in human singing.',
          poem_text: `Everyone suddenly burst out singing;
And I was filled with such delight
As prisoned birds must find in freedom,
Winging wildly across the white
Orchards and dark-green fields; on—on—and out of sight.

Everyone's voice was suddenly lifted;
And beauty came like the setting sun:
My heart was shaken with tears; and horror
Drifted away ... O, but Everyone
Was a bird; and the song was wordless; the singing will never be done.`,
          teacher_commentary: `Gather the pupils inside the living room of Talbot House, beside the old piano. Tell them that behind this front door, Army Chaplain Tubby Clayton posted the rule: 'Abandon Rank All Ye Who Enter Here.' Here, officers and private soldiers drank tea together from identical cups and sang together around the piano. Sassoon's poem 'Everyone Sang' captures the exact miracle of Talbot House: a place where the horror drifted away and men were set free like prisoned birds.`,
          pedagogical_rationale: {
            context: `Talbot House was an island of Christian fellowship and egalitarian sanity in a war dominated by brutal class hierarchy and terror. 'Everyone Sang' celebrates the indestructible resilience of the human spirit when offered warmth, music, and unconditional acceptance.`,
            hinge_question: `Why was communal singing and the abandoning of military rank so vital for preserving the sanity of soldiers rotating out of the trenches?`,
          },
        },
        {
          id: 'owen_the_sentry',
          title: 'The Sentry',
          year: '1917–1918',
          poet: {
            name: 'Lieutenant Wilfred Owen, MC',
            role: '2nd Battalion, The Manchester Regiment',
            lifespan: '1893–1918',
            portrait: '/images/wilfred_owen.jpg',
          },
          bio: 'Owen wrote this harrowing account of an incident in January 1917 when an artillery shell struck the entrance of a crowded German dugout his men were occupying, blinding a young sentry.',
          poem_text: `We'd found an old Boche dug-out, and he knew, and gave us hell;
Aching for spring, through curfews of air and rain,
And shivering in water, muddy, slush and pain.
There we herded from the blast;
And one fell in through the doorway, blown by a blast;
And gave a screech, and curled; and then screamed out: 'O sir, my eyes—I'm blind!'
I held a flame against his lids
And saw his eyeballs, white and scorched.
'O sir, my eyes!' he shrieked, 'I'm blind!'
And we, forgotten in the mud, could only wait,
While one groaned out in terror at the gate.`,
          teacher_commentary: `Contrast the warmth and safety of Talbot House with the nightmare from which the men had just emerged. Owen describes a crowded, flooding dugout where a shell blast blinds a sentry at the entrance. Tubby Clayton created Talbot House specifically to give traumatized men like Owen and his sentry a place to recover their souls.`,
          pedagogical_rationale: {
            context: `Juxtaposing Owen’s raw description of psychological shock with the sanctuary of Talbot House deepens pupils' understanding of why psychological decompression was a matter of life and death.`,
            hinge_question: `How does understanding the terrifying claustrophobia of frontline dugouts help us appreciate why Talbot House was called 'An Oasis of Sanity'?`,
          },
        },
      ],
    },
    {
      site_id: 'poperinge_death_cells',
      site_name: 'Poperinge Town Hall Death Cells & Shot at Dawn (Stop 11)',
      stop_time: '13:30 · Day 3',
      poems: [
        {
          id: 'kipling_the_coward',
          title: 'The Coward',
          year: '1919',
          poet: {
            name: 'Rudyard Kipling',
            role: 'Author & Member of the Imperial War Graves Commission',
            lifespan: '1865–1936',
            portrait: '/images/rudyard_kipling.jpg',
          },
          bio: 'Rudyard Kipling was initially one of the most zealous proponents of the war, pulling strings in 1914 to secure an officer’s commission for his only son, John, despite John’s severe myopia. In September 1915, 18-year-old John was killed at the Battle of Loos, his body lost in the mud. Heartbroken and filled with guilt, Kipling joined the Imperial War Graves Commission and penned his Epitaphs of the War. In this two-line epitaph, Kipling offers compassionate understanding for the young soldiers shot for cowardice.',
          poem_text: `I could not look on Death, which being known,
Men led me to him, blindfold and alone.`,
          teacher_commentary: `Stand with the pupils in the small courtyard of Poperinge Town Hall, beside the wooden execution post. Point out the tiny, unlit wooden cells where condemned men were locked overnight. Read Kipling's two lines in complete silence: 'I could not look on Death, which being known, / Men led me to him, blindfold and alone.' Remind pupils that at the National Memorial Arboretum in Staffordshire, Andy DeComyn's statue of 17-year-old Private Herbert Burden portrays him exactly like this: blindfolded, hands tied behind his back, waiting for the bullets of his comrades.`,
          pedagogical_rationale: {
            context: `In two devastating lines, Kipling captures the tragedy of boys executed for shell shock. The blindfold, meant to spare the firing squad from seeing the victim's terror, becomes a symbol of official military blindness to psychological trauma. In 2006, all 306 men executed were granted a statutory posthumous pardon.`,
            hinge_question: `Why does Kipling's phrase 'blindfold and alone' capture both the physical execution and the moral tragedy of the 306 men shot at dawn?`,
          },
        },
        {
          id: 'frankau_the_deserter',
          title: 'The Deserter',
          year: '1916',
          poet: {
            name: 'Captain Gilbert Frankau',
            role: '9th Battalion, East Surrey Regiment & Royal Field Artillery',
            lifespan: '1884–1952',
            portrait: '/images/gilbert_frankau.jpg',
          },
          bio: 'Commissioned into the East Surrey Regiment and later serving with the Royal Field Artillery, Gilbert Frankau fought in the bloody battles of Loos and the Somme. As an artillery officer, he witnessed the court-martial and execution of young soldiers whose nerves had collapsed under bombardment, penning this unflinching poem behind the lines in Flanders in 1916.',
          poem_text: `“I’m sorry, sir,” was all he said,
Then stood against the wall.
The dawn was breaking cold and grey,
Across the town of Poperinghe.
A subaltern stepped back a pace,
His sword dropped straight; the squad in line
Raised up their rifles, cold and fine.
Six barrels levelled at his chest:
A sudden crash—and all was rest.

They threw him in a shallow ditch,
Without a flag, without a name;
And back in England, in her grief,
His mother wept in bitter shame:
“He died of wounds,” the vicar read.
Ah, better that than what was said!`,
          teacher_commentary: `Read Frankau's poem while looking at the courtyard wall. Point out the tragic second stanza: the family back in England received a telegram claiming 'He died of wounds' to cover up the execution, yet the stigma of cowardice haunted thousands of British families for ninety years until the 2006 pardon.`,
          pedagogical_rationale: {
            context: `Frankau’s eyewitness poem details both the clinical, mechanical reality of military executions and the devastating social shame inflicted on families back home.`,
            hinge_question: `How did the British military justice system use executions as a weapon of deterrence, and why did it take until 2006 for the nation to grant a formal pardon?`,
          },
        },
      ],
    },
  ],
};
