import fs from 'fs';

const dataPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let dataContent = fs.readFileSync(dataPath, 'utf8');

const targetStr = `          "text": "The final vote was 33 in favor, 13 against, and 10 abstentions. Under Resolution 181, the Jewish population (which owned less than 10% of the land and made up only one-third of the population) was allocated 55% of Palestine, including the fertile coastal plains. The Arab majority was allocated just 45% of the land, much of it mountainous and fragmented. While the Zionist leadership accepted the plan with joy, Arab leaders and the Arab League rejected it, declaring that they would fight to prevent the partition of their homeland. The passage of Resolution 181 acted as the catalyst for immediate violence. In December 1947, Britain announced that it would formally terminate its Mandate and withdraw all forces on 15 May 1948. For the remaining five months, British troops stood aside and refused to intervene, leaving Palestine to slide into a bloody, chaotic civil war between Jewish and Arab communities.",
          "level_4": "The final vote was 33 in favor, 13 against, and 10 abstentions. For the remaining five months, British troops stood aside and refused to intervene, leaving Palestine to slide into a bloody, chaotic civil war between Jewish and Arab communities.",
          "tasks": []
        },`;

const replacementStr = `          "text": "The final vote was 33 in favor, 13 against, and 10 abstentions. Under Resolution 181, the Jewish population (which owned less than 10% of the land and made up only one-third of the population) was allocated 55% of Palestine, including the fertile coastal plains. The Arab majority was allocated just 45% of the land, much of it mountainous and fragmented. While the Zionist leadership accepted the plan with joy, Arab leaders and the Arab League rejected it, declaring that they would fight to prevent the partition of their homeland. The passage of Resolution 181 acted as the catalyst for immediate violence. In December 1947, Britain announced that it would formally terminate its Mandate and withdraw all forces on 15 May 1948. For the remaining five months, British troops stood aside and refused to intervene, leaving Palestine to slide into a bloody, chaotic civil war between Jewish and Arab communities.",
          "level_4": "The final vote was 33 in favor, 13 against, and 10 abstentions. For the remaining five months, British troops stood aside and refused to intervene, leaving Palestine to slide into a bloody, chaotic civil war between Jewish and Arab communities.",
          "tasks": []
        },
        {
          "type": "interactive_map",
          "maps": [
            {
              "id": "map-1947",
              "year": "1947",
              "label": "UN Partition Plan",
              "src": "assets/palestine_1947_map.png",
              "caption": "Under UN Resolution 181, Palestine is split. The Jewish state receives 55% of the land. Jerusalem is an international zone."
            },
            {
              "id": "map-1949",
              "year": "1949",
              "label": "Armistice Borders",
              "src": "assets/palestine_1949_map.png",
              "caption": "Following Israel's victory in the 1948 war, they expand their territory from 55% to 79%. The West Bank is held by Jordan, and Gaza by Egypt."
            },
            {
              "id": "map-1967",
              "year": "1967",
              "label": "Post-Six Day War",
              "src": "assets/palestine_1967_map.png",
              "caption": "In 1967, Israel launches a pre-emptive strike and captures the Sinai Peninsula, Gaza Strip, West Bank, and Golan Heights."
            }
          ]
        },`;

if (dataContent.includes(targetStr) && !dataContent.includes('"type": "interactive_map"')) {
  dataContent = dataContent.replace(targetStr, replacementStr);
  fs.writeFileSync(dataPath, dataContent, 'utf8');
  console.log("Injected interactive_map into data.js");
} else {
  console.log("Could not find target or already injected.");
}
