const fs = require('fs');

const gwBios = [
  {
    "name": "Kaiser Wilhelm II",
    "role": "Emperor of Germany",
    "lifespan": "1859 – 1941",
    "achievements": [
      "Pursued aggressive 'Weltpolitik' to expand German global influence.",
      "Expanded the German Imperial Navy, sparking an arms race with Britain.",
      "Offered the 'Blank Cheque' to Austria-Hungary in 1914."
    ],
    "significance": "His erratic diplomacy, aggressive militarism, and refusal to compromise repeatedly destabilized European politics, creating the conditions that led to the outbreak of the First World War."
  },
  {
    "name": "Tsar Nicholas II",
    "role": "Emperor of Russia",
    "lifespan": "1868 – 1918",
    "achievements": [
      "Led the rapid industrialisation of the Russian Empire.",
      "Formed an alliance with France to counter the Triple Alliance.",
      "Ordered the mobilization of the Russian army in July 1914."
    ],
    "significance": "As an absolute monarch determined to protect fellow Slavs in Serbia, his decision to prematurely mobilize the massive Russian army forced Germany into declaring war."
  },
  {
    "name": "Gavrilo Princip",
    "role": "Bosnian Serb Nationalist",
    "lifespan": "1894 – 1918",
    "achievements": [
      "Joined the secret nationalist society 'Young Bosnia'.",
      "Conspired with the Black Hand to assassinate Archduke Franz Ferdinand.",
      "Fired the fatal shots in Sarajevo on June 28, 1914."
    ],
    "significance": "Driven by intense nationalism and the desire to free Bosnia from Austro-Hungarian rule, his assassination of the heir to the throne was the direct spark that ignited the July Crisis and World War I."
  },
  {
    "name": "Count Leopold Berchtold",
    "role": "Austro-Hungarian Foreign Minister",
    "lifespan": "1863 – 1942",
    "achievements": [
      "Drafted the severe July Ultimatum presented to Serbia.",
      "Convinced Emperor Franz Joseph to declare war on Serbia.",
      "Secured Germany's unconditional support (the 'Blank Cheque')."
    ],
    "significance": "He deliberately engineered a localized war with Serbia to crush Pan-Slavism, stubbornly ignoring diplomatic solutions and plunging the major powers into a global conflict."
  },
  {
    "name": "Alfred von Schlieffen",
    "role": "German Field Marshal",
    "lifespan": "1833 – 1913",
    "achievements": [
      "Chief of the Imperial German General Staff (1891–1906).",
      "Authored the famous 'Schlieffen Plan' for a two-front war.",
      "Prioritized military strategy over diplomatic consequences."
    ],
    "significance": "His inflexible war plan, which required the immediate invasion of neutral Belgium to swiftly defeat France, forced Germany to widen the conflict and guaranteed British entry into the war."
  }
];

const wasBios = [
  {
    "name": "John Snow",
    "role": "Physician and Epidemiologist",
    "lifespan": "1813 – 1858",
    "achievements": [
      "Traced the 1854 Broad Street cholera outbreak to a contaminated water pump.",
      "Pioneered the use of data mapping in epidemiology.",
      "Challenged the prevailing 'miasma' theory of disease."
    ],
    "significance": "By proving that cholera was a waterborne disease, he laid the foundations for modern epidemiology and demonstrated the critical need for clean drinking water to protect public health."
  },
  {
    "name": "Edwin Chadwick",
    "role": "Social Reformer",
    "lifespan": "1800 – 1890",
    "achievements": [
      "Authored the groundbreaking 1842 report on the Sanitary Condition of the Labouring Population.",
      "Architect of the 1848 Public Health Act.",
      "Campaigned tirelessly for state-funded drainage and sanitation systems."
    ],
    "significance": "Despite his abrasive personality and belief in the flawed miasma theory, his relentless campaign forced the British government to take responsibility for the health and living conditions of the urban poor."
  },
  {
    "name": "Joseph Bazalgette",
    "role": "Chief Engineer of London's Metropolitan Board of Works",
    "lifespan": "1819 – 1891",
    "achievements": [
      "Designed and constructed London's monumental sewer network.",
      "Built the Victoria, Albert, and Chelsea Embankments along the Thames.",
      "Eliminated the 'Great Stink' of 1858."
    ],
    "significance": "His visionary engineering masterpiece transformed London's sanitation, drastically reduced cholera outbreaks, and established a blueprint for modern urban infrastructure across the globe."
  },
  {
    "name": "Louis Pasteur",
    "role": "Microbiologist and Chemist",
    "lifespan": "1822 – 1895",
    "achievements": [
      "Published the Germ Theory of Disease in 1861.",
      "Developed the process of pasteurization to kill harmful microbes.",
      "Created vaccines for anthrax and rabies."
    ],
    "significance": "His groundbreaking scientific proof that microscopic organisms caused disease fundamentally revolutionized medicine, finally replacing the miasma theory and accelerating global sanitation efforts."
  },
  {
    "name": "Charles Dickens",
    "role": "Novelist and Social Critic",
    "lifespan": "1812 – 1870",
    "achievements": [
      "Authored iconic novels such as Oliver Twist and Bleak House.",
      "Vividly exposed the squalor and poverty of industrial London.",
      "Campaigned for social reform through his journalism."
    ],
    "significance": "His immense popularity and emotive storytelling forced middle and upper-class Victorians to confront the horrific realities of urban slums, generating powerful public pressure for sanitary reform."
  }
];

fs.writeFileSync('great_war/biographies.json', JSON.stringify(gwBios, null, 2), 'utf8');
fs.writeFileSync('water_and_sanitation/biographies.json', JSON.stringify(wasBios, null, 2), 'utf8');
console.log('Biographies generated successfully.');
