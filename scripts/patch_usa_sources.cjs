const fs = require("fs");

const l15SourceBReplacement = `        {
          "id": "source_b_operation_homecoming_pows_1973",
          "letter": "B",
          "title": "Source B: Operation Homecoming: Celebrations Aboard C-141 Transport Aircraft Returning US Prisoners of War from Hanoi (12 February 1973)",
          "src": "/units/usa/assets/sources/operation-homecoming-pows-1973.jpg",
          "source": "/units/usa/assets/sources/operation-homecoming-pows-1973.jpg",
          "image": "/units/usa/assets/sources/operation-homecoming-pows-1973.jpg",
          "caption": "American prisoners of war cheer jubilantly aboard a US Air Force C-141 Starlifter departing Hanoi following their release under the terms of the Paris Peace Accords (Operation Homecoming, 12 February 1973).",
          "desc": "Operation Homecoming: Celebrations Aboard C-141 Transport Aircraft Returning US Prisoners of War from Hanoi (12 February 1973), US National Archives and Records Administration (NARA) / US Air Force.",
          "provenance": "US Air Force Official Photographic Staff, US National Archives and Records Administration (NARA) (NARA ARC 6408204 / Defense Visual Information Center DF-ST-99-04239), 12 February 1973.",
          "citation": "US National Archives and Records Administration (NARA), NARA ARC 6408204 / US Air Force.",
          "hinge_question": "Why did the return of 591 American prisoners of war represent the primary political deliverable of the Paris Peace Accords for President Nixon, despite leaving North Vietnamese troops in South Vietnam?",
          "source_context": "American prisoners of war cheer jubilantly aboard a US Air Force C-141 Starlifter departing Hanoi following their release under the terms of the Paris Peace Accords (Operation Homecoming, 12 February 1973). **Hinge Question:** Why did the return of 591 American prisoners of war represent the primary political deliverable of the Paris Peace Accords for President Nixon, despite leaving North Vietnamese troops in South Vietnam?",
          "context": "American prisoners of war cheer jubilantly aboard a US Air Force C-141 Starlifter departing Hanoi following their release under the terms of the Paris Peace Accords (Operation Homecoming, 12 February 1973).",
          "utility_enquiry": {
            "question": "How useful is Source B for an enquiry into the terms and domestic political impact of the American military exit from Vietnam in 1973?",
            "content_inferences": "Documents the physical liberation of American military captives from North Vietnamese prisons, demonstrating the immense psychological relief and domestic celebration that accompanied the final withdrawal of US military forces.",
            "provenance_evaluation": "Official US Air Force photograph preserved in the National Archives (NARA). First-tier military photographic record.",
            "context_limitations": "Highlights the emotional return of American servicemen but conceals the perilous geopolitical reality left behind: over 150,000 North Vietnamese PAVN regular troops remained entrenched inside South Vietnam, leaving Saigon fatally vulnerable."
          },
          "discussion_ideas": [
            "Source Content Analysis: How clearly does this source illustrate the methods, pressures, and tensions of KT 4.3?",
            "Provenance & Reliability: Given that this source originates from US National Archives and Records Administration (NARA) / US Air Force created by US Air Force Official Photographic Staff, what strengths and limitations does it have for an enquiry into this period?"
          ]
        },`;

const l16SourcesReplacement = `      "sources": [
        {
          "id": "source_a_cu_chi_tunnel_rats_1967",
          "letter": "A",
          "title": "Source A: Subterranean Guerrilla Warfare: US Engineer 'Tunnel Rat' Exploring Viet Cong Complex (1967)",
          "src": "/units/usa/assets/sources/cu-chi-tunnel-rats-1967.jpg",
          "source": "/units/usa/assets/sources/cu-chi-tunnel-rats-1967.jpg",
          "image": "/units/usa/assets/sources/cu-chi-tunnel-rats-1967.jpg",
          "caption": "A US Army engineer 'tunnel rat' armed with a flashlight and pistol prepares to descend into an underground Viet Cong tunnel complex during Operation Cedar Falls in 1967.",
          "desc": "Subterranean Guerrilla Warfare: US Engineer 'Tunnel Rat' Exploring Viet Cong Complex (1967), US National Archives and Records Administration (NARA) / US Army.",
          "provenance": "US Army Signal Corps Photographic Agency, US National Archives and Records Administration (NARA) (NARA Record Group 111 / SC 635874), 24 January 1967.",
          "citation": "US National Archives and Records Administration (NARA), NARA RG 111 / SC 635874.",
          "hinge_question": "Why did subterranean tunnel networks like Cu Chi render immense American air power and heavy artillery largely ineffective throughout the war?",
          "source_context": "A US Army engineer 'tunnel rat' armed with a flashlight and pistol prepares to descend into an underground Viet Cong tunnel complex during Operation Cedar Falls in 1967. **Hinge Question:** Why did subterranean tunnel networks like Cu Chi render immense American air power and heavy artillery largely ineffective throughout the war?",
          "context": "A US Army engineer 'tunnel rat' armed with a flashlight and pistol prepares to descend into an underground Viet Cong tunnel complex during Operation Cedar Falls in 1967.",
          "utility_enquiry": {
            "question": "How useful is Source A for an enquiry into the guerrilla tactics and resilience of communist forces that defeated American conventional military power?",
            "content_inferences": "Demonstrates the extreme hazards of subterranean counter-insurgency warfare and reveals how the Viet Cong utilized sophisticated underground supply, hospital, and command networks to survive massive US aerial bombardment.",
            "provenance_evaluation": "Official US Army photographic record created on the front line during Operation Cedar Falls, preserved in the National Archives (NARA).",
            "context_limitations": "Shows a single American soldier attempting to clear an entrance; cannot depict the hundreds of miles of multi-level tunnels, booby traps, and ventilation systems that protected whole regiments underground."
          },
          "discussion_ideas": [
            "Source Content Analysis: How clearly does this source illustrate the methods, pressures, and tensions of KT 4.4?",
            "Provenance & Reliability: Given that this source originates from US National Archives and Records Administration (NARA) created by US Army Signal Corps Photographic Agency, what strengths and limitations does it have for an enquiry into this period?"
          ]
        },
        {
          "id": "source_b_hamburger_hill_101st_airborne_1969",
          "letter": "B",
          "title": "Source B: Battle of Hamburger Hill: Exhausted Troops of the 101st Airborne Division (May 1969)",
          "src": "/units/usa/assets/sources/hamburger-hill-101st-airborne-1969.jpg",
          "source": "/units/usa/assets/sources/hamburger-hill-101st-airborne-1969.jpg",
          "image": "/units/usa/assets/sources/hamburger-hill-101st-airborne-1969.jpg",
          "caption": "Exhausted American paratroopers of the 101st Airborne Division resting amongst shattered jungle foliage on Dong Ap Bia (Hill 937 / 'Hamburger Hill') following ten days of bloody, futile assaults in May 1969.",
          "desc": "Battle of Hamburger Hill: Exhausted Troops of the 101st Airborne Division (May 1969), US National Archives and Records Administration (NARA) / US Army.",
          "provenance": "SP4 James F. Kaelin (US Army Official Combat Photographer), US National Archives and Records Administration (NARA) (NARA RG 111 / 101st Airborne Division Records), 20 May 1969.",
          "citation": "US National Archives and Records Administration (NARA), NARA RG 111 / SP4 James F. Kaelin.",
          "hinge_question": "Why did the abandonment of Hamburger Hill just days after losing 72 American lives trigger outrage in Congress and hasten Nixon's decision to withdraw US ground troops?",
          "source_context": "Exhausted American paratroopers of the 101st Airborne Division resting amongst shattered jungle foliage on Dong Ap Bia (Hill 937 / 'Hamburger Hill') following ten days of bloody, futile assaults in May 1969. **Hinge Question:** Why did the abandonment of Hamburger Hill just days after losing 72 American lives trigger outrage in Congress and hasten Nixon's decision to withdraw US ground troops?",
          "context": "Exhausted American paratroopers of the 101st Airborne Division resting amongst shattered jungle foliage on Dong Ap Bia (Hill 937 / 'Hamburger Hill') following ten days of bloody, futile assaults in May 1969.",
          "utility_enquiry": {
            "question": "How useful is Source B for an enquiry into the crisis of morale and the failure of American attrition warfare in Vietnam?",
            "content_inferences": "Captures the sheer combat fatigue, psychological toll, and devastating human cost borne by American frontline infantry engaged in brutal hill assaults that were abandoned almost immediately after capture.",
            "provenance_evaluation": "Combat photograph taken by Army specialist James Kaelin on the summit of Hill 937 during the battle; direct, authentic primary evidence.",
            "context_limitations": "Focuses on the immediate combat environment of a single battle; does not reveal the nationwide political scandal Hamburger Hill caused in Washington or the resulting military shift away from major offensive operations."
          },
          "discussion_ideas": [
            "Source Content Analysis: How clearly does this source illustrate the methods, pressures, and tensions of KT 4.4?",
            "Provenance & Reliability: Given that this source originates from US National Archives and Records Administration (NARA) created by SP4 James F. Kaelin (US Army Official Combat Photographer), what strengths and limitations does it have for an enquiry into this period?"
          ]
        },
        {
          "id": "source_c_draft_card_burning_nyc_1967",
          "letter": "C",
          "title": "Source C: Anti-War Demonstrators Burning Conscription Draft Cards in New York City (15 April 1967)",
          "src": "/units/usa/assets/sources/draft-card-burning-nyc-1967.jpg",
          "source": "/units/usa/assets/sources/draft-card-burning-nyc-1967.jpg",
          "image": "/units/usa/assets/sources/draft-card-burning-nyc-1967.jpg",
          "caption": "Young American anti-war demonstrators openly burning their Selective Service draft registration cards in Central Park, New York City, defying federal criminal penalties to protest military conscription for the Vietnam War (15 April 1967).",
          "desc": "Anti-War Demonstrators Burning Conscription Draft Cards in New York City (15 April 1967), National Archives and Records Administration (NARA) / Universal Newsreel Collection.",
          "provenance": "Universal Newsreel Archive / National Archives and Records Administration (NARA) (NARA Collection 200-UN-40-32), 15 April 1967.",
          "citation": "National Archives and Records Administration (NARA), NARA Collection 200-UN-40-32.",
          "hinge_question": "Why did open resistance to the draft and the burning of conscription cards demonstrate a collapse in the domestic political legitimacy of the Vietnam War?",
          "source_context": "Young American anti-war demonstrators openly burning their Selective Service draft registration cards in Central Park, New York City, defying federal criminal penalties to protest military conscription for the Vietnam War (15 April 1967). **Hinge Question:** Why did open resistance to the draft and the burning of conscription cards demonstrate a collapse in the domestic political legitimacy of the Vietnam War?",
          "context": "Young American anti-war demonstrators openly burning their Selective Service draft registration cards in Central Park, New York City, defying federal criminal penalties to protest military conscription for the Vietnam War (15 April 1967).",
          "utility_enquiry": {
            "question": "How useful is Source C for an enquiry into domestic opposition and civil disobedience as causes of the American withdrawal from Vietnam?",
            "content_inferences": "Provides direct primary evidence of young Americans willingly committing federal felonies to protest conscription and war policy, revealing how the anti-war movement escalated from peaceful petitions to radical mass resistance.",
            "provenance_evaluation": "Authentic 1967 newsreel still preserved in the National Archives (NARA). Contemporary public documentary record.",
            "context_limitations": "Shows young radical protestors in New York; does not represent the 'Silent Majority' of older working-class Americans who initially supported the war or despised draft resistance."
          },
          "discussion_ideas": [
            "Source Content Analysis: How clearly does this source illustrate the methods, pressures, and tensions of KT 4.4?",
            "Provenance & Reliability: Given that this source originates from National Archives and Records Administration (NARA) created by Universal Newsreel Archive, what strengths and limitations does it have for an enquiry into this period?"
          ]
        }
      ],`;

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  
  // Replace L15 Source B
  const s15Search = content.match(/        \{\s*"id":\s*"source_b_paris_peace_accords_signing"[\s\S]*?        \},/);
  if (!s15Search) {
    console.error("Could not find L15 Source B in", filePath);
    return false;
  }
  content = content.replace(s15Search[0], l15SourceBReplacement);
  console.log("Replaced L15 Source B in", filePath);

  // Replace L16 Sources
  const l16Idx = content.indexOf("KT 4.4: What were the main reasons why the US failed");
  const postL16 = content.slice(l16Idx);
  const s16Search = postL16.match(/      "sources":\s*\[[\s\S]*?      \],/);
  if (!s16Search) {
    console.error("Could not find L16 sources in", filePath);
    return false;
  }
  content = content.slice(0, l16Idx) + postL16.replace(s16Search[0], l16SourcesReplacement);
  console.log("Replaced L16 Sources in", filePath);

  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

patchFile("units/usa/data.js");
patchFile("public/units/usa/data.js");
