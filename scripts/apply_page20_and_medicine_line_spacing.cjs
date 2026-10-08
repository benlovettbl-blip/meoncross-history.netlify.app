/**
 * scripts/apply_page20_and_medicine_line_spacing.cjs
 *
 * Implements:
 * 1. Medicine Workbook Line Spacing Standard:
 *    - .task-line: height: 7.8mm; border-bottom: 1.2px solid #000000;
 *    - .task-line-dotted: height: 7.4mm; border-bottom: 1.2px dotted #000000;
 *    - .ruled-lines-block: display: flex; flex-direction: column; gap: 0;
 * 2. Feature Page (Pages 5, 9, 13, 17):
 *    - Standardizes Q1(a), Q1(b), Q1(c) to 4 lines of .task-line (7.8mm) each
 *    - Removes inline height: 6.8mm overrides
 * 3. Spine Page (Pages 4, 8, 12, 16):
 *    - Updates ruled lines border from 1.5px to 1.2px solid #000000
 * 4. Page 20 Complete 4-Section Thematic Study Blueprints:
 *    - Eliminates the gaping voids in KT1, KT2, KT3 Page 20
 *    - Fully populates each unit with 4 high-yield conceptual reference sections
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'render_eee_twopage_workbook.cjs');
let code = fs.readFileSync(targetFile, 'utf8');

// 1. Update <style> line definitions
code = code.replace(
  `    .task-line {
      border-bottom: 1.5px solid #000000;
      height: 7.0mm;
      margin: 0;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 6.0mm;
      margin: 0;
      box-sizing: border-box;
    }`,
  `    .task-line {
      border-bottom: 1.2px solid #000000;
      height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #000000;
      height: 7.4mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .ruled-lines-block {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 1px 0;
    }`,
);

// 2. Feature Page: 4 lines of 7.8mm per question
const oldFeatureLinesBlock = `          <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
            <div class="task-line" style="height: 6.8mm;"></div>
          </div>`;

const newFeatureLinesBlock = `          <div style="display: flex; flex-direction: column; justify-content: space-between; margin-top: 1px;">
            <div class="task-line"></div>
            <div class="task-line"></div>
            <div class="task-line"></div>
            <div class="task-line"></div>
          </div>`;

code = code.split(oldFeatureLinesBlock).join(newFeatureLinesBlock);

// 3. Spine Page ruling: 1.2px solid #000000
code = code.replace(
  `              <!-- Exact 6 Ruled Lines (Preserving live 1.5px solid #000000 ruling) -->
              <div style="flex: 1; display: flex; flex-direction: column;">
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.5px solid #000000; box-sizing: border-box;"></div>
              </div>`,
  `              <!-- Exact 6 Ruled Lines (Matching Medicine 1.2px solid #000000 ruling) -->
              <div style="flex: 1; display: flex; flex-direction: column;">
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
                <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              </div>`,
);

// 4. KT1 Page 20
const newKt1Page20 = `      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 10.5pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          Thematic Study Blueprint &bull; Key Topic 1: Queen, Government &amp; Religion, 1558–69
        </h2>
      </div>
      
      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0; gap: 3px;">
        <!-- Section 1: Government Anatomy -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            1. Anatomy of Elizabethan Government: Power, Patronage &amp; Prerogative
          </strong>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">👑 The Monarch (Queen Elizabeth I):</strong>
              Ruled by Divine Right. Held Royal Prerogative: foreign policy, war, marriage, religion. Could summon and dismiss Parliament at will.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">🏛️ The Privy Council (Led by William Cecil):</strong>
              Approx. 19 trusted senior advisors who met daily. Managed government expenditure, state security, military logistics, and royal policy.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">⚖️ Parliament (Lords &amp; Commons):</strong>
              Met only 10 times in 44 years. Primary power: voting extraordinary taxation (subsidies) and passing statute laws. Free speech was restricted.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">🛡️ Local Government (Lords Lieutenant &amp; JPs):</strong>
              Lords Lieutenant commanded county militias. Unpaid JPs (gentry) enforced laws locally: collected taxes, regulated wages, punished vagrants.
            </div>
          </div>
        </div>

        <!-- Section 2: The Religious Settlement Spectrum -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            2. The Religious Spectrum: Radical Puritans vs Elizabeth’s Via Media vs Roman Catholics
          </strong>
          <div style="display: grid; grid-template-columns: 1fr 1.25fr 1fr; gap: 5px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1px solid #000000; padding: 3px 4px; border-radius: 2px; background: #ffffff;">
              <strong style="font-size: 7.5pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px; text-align: center;">
                PURITAN REFORMERS
              </strong>
              &bull; <strong>Doctrine:</strong> Strict Calvinism; predestination.<br>
              &bull; <strong>Governance:</strong> Presbytery committees (no bishops).<br>
              &bull; <strong>Worship:</strong> Plain sermons, no vestments (surplices), no crucifixes or organs.<br>
              &bull; <strong>Controversies:</strong> 1566 Vestments Crisis (37 suspended); Crucifix Controversy.
            </div>
            <div style="border: 1.5px solid #000000; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong style="font-size: 7.5pt; color: #000000; display: block; border-bottom: 1.2px solid #000000; padding-bottom: 1px; margin-bottom: 2px; text-align: center;">
                ELIZABETH’S VIA MEDIA (1559)
              </strong>
              &bull; <strong>Act of Supremacy:</strong> Elizabeth = Supreme Governor.<br>
              &bull; <strong>Act of Uniformity:</strong> Mandated 1559 Common Prayer Book.<br>
              &bull; <strong>Compromise:</strong> Ambiguous Communion wording; traditional clergy vestments &amp; hymns kept.<br>
              &bull; <strong>Enforcement:</strong> 1s recusancy fine for missing church; 1559 Royal Injunctions (English Bible in parishes).
            </div>
            <div style="border: 1px solid #000000; padding: 3px 4px; border-radius: 2px; background: #ffffff;">
              <strong style="font-size: 7.5pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px; text-align: center;">
                ROMAN CATHOLIC CHURCH
              </strong>
              &bull; <strong>Authority:</strong> The Pope in Rome = Supreme Head.<br>
              &bull; <strong>Doctrine:</strong> 7 Sacraments; Latin Mass; Transubstantiation (bread/wine = real Christ).<br>
              &bull; <strong>Ritual:</strong> Latin liturgy, stained glass, crucifixes, incense, holy water, saint relics.<br>
              &bull; <strong>Resistance:</strong> Recusancy in Northern counties; secret household Latin Masses.
            </div>
          </div>
        </div>

        <!-- Section 3: Foreign Threats & Strategic Dilemmas (1558) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            3. Foreign Threats &amp; Strategic Security Dilemmas in 1558
          </strong>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">🇫🇷 France &amp; Calais:</strong>
              England lost Calais in Jan 1558 (Treaty of Cateau-Cambrésis). France was at peace with Spain, freeing French forces to threaten England.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland &amp; Auld Alliance:</strong>
              Mary of Guise ruled Scotland with French troops stationed on border. Mary Stuart claimed English throne; French arms could invade north.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">🇪🇸 Spain &amp; Philip II:</strong>
              Philip II was ex-king consort (married Mary I). Wanted alliance against France, proposed marriage to Elizabeth, but was staunchly Catholic.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">🤝 Treaty of Edinburgh (1560):</strong>
              Scottish Protestant lords rebelled against French rule; Elizabeth sent fleet to Leith; Treaty secured French withdrawal from Scotland.
            </div>
          </div>
        </div>

        <!-- Section 4: Monarchical Legitimacy, Succession & Crown Finances -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            4. Monarchical Challenges: Legitimacy, Marriage Dilemmas &amp; Crown Finances
          </strong>
          <div style="display: grid; grid-template-columns: 1.1fr 1fr 1fr; gap: 5px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">💍 Marriage &amp; Succession Crisis:</strong>
              Parliament pressured Elizabeth to marry and produce Protestant heir. Foreign suitors (Philip II, Archduke Charles) risked foreign domination; English nobles (Dudley) caused factional jealousy.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">👑 Legitimacy &amp; Gender Dilemma:</strong>
              Catholics considered Henry VIII’s marriage to Anne Boleyn illegal, declaring Elizabeth illegitimate. 16th-century society believed female rule was "unnatural" and inherently weak.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">💰 Crown Finances &amp; Debt:</strong>
              Inherited £300,000 debt from Mary I. Sold Crown lands and cut court costs under William Cecil; reformed debased coinage to restore Antwerp credit rating.
            </div>
          </div>
        </div>
      </div>`;

// 5. KT2 Page 20
const newKt2Page20 = `      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 10.5pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          Thematic Study Blueprint &bull; Key Topic 2: Challenges at Home &amp; Abroad, 1569–88
        </h2>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0; gap: 3px;">
        <!-- Section 1: Armada Strategic Route -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            1. The Strategic Route of the Spanish Armada: Plymouth to Gravelines &amp; The Atlantic Retreat
          </strong>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>① The Channel (July 1588):</strong> 130 Spanish ships in defensive crescent sail past Plymouth and Isle of Wight. English culverins fire from standoff range with minor damage.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>② Calais Roads (7 Aug):</strong> Armada anchors awaiting Parma. Midnight English fireships cause panic; Spanish cut anchor cables and break defensive formation.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>③ Gravelines (8 Aug):</strong> Close-range artillery battle. Nimble English race-built galleons batter scattered Spanish ships with rapid culverin broadsides; 5 galleons sunk.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>④ The Retreat (Aug–Sept):</strong> South-westerly gales drive Armada around Scotland and Ireland. Lacking anchors, over 40 ships wreck on Atlantic rocky coasts.
            </div>
          </div>
        </div>

        <!-- Section 2: Naval Architecture Comparison -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            2. Naval Architecture: Hawkins’ Race-Built Galleons vs Spanish Imperial Carracks
          </strong>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1.2px solid #000000; padding: 3px 5px; border-radius: 2px; background: #ffffff;">
              <strong style="font-size: 7.5pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                🇬🇧 English Race-Built Galleon (*Revenge*, *Ark Royal*)
              </strong>
              &bull; <strong>Design:</strong> John Hawkins removed high forecastles; streamlined hull for speed and sailing close to wind.<br>
              &bull; <strong>Artillery:</strong> Long-range bronze <strong>culverins</strong> on 4-wheel truck carriages for rapid reloading inside ship.<br>
              &bull; <strong>Gunnery Doctrine:</strong> Stand-off artillery duels; pummel enemy rigging and hull lines, refusing hand-to-hand boarding.
            </div>
            <div style="border: 1.2px solid #000000; padding: 3px 5px; border-radius: 2px; background: #ffffff;">
              <strong style="font-size: 7.5pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                🇪🇸 Spanish Imperial Galleon / Carrack (*San Martín*)
              </strong>
              &bull; <strong>Design:</strong> High wooden forecastles/sterncastles designed as floating infantry castles for boarding.<br>
              &bull; <strong>Artillery:</strong> Heavy short-range cannon on unwieldy 2-wheel carriages; gunners had to climb outside hulls to reload.<br>
              &bull; <strong>Tactical Goal:</strong> Close range, grapple enemy ships, and unleash veteran infantry in boarding combat.
            </div>
          </div>
        </div>

        <!-- Section 3: The Catholic Plots Matrix (1569–87) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            3. The Catholic Plots Matrix: Conspirators, Foreign Backing &amp; Walsingham’s Counter-Espionage
          </strong>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>1569 Northern Earls:</strong> Northumberland &amp; Westmorland marched south with Catholic banners to restore Catholic Mass. Quashed by royal army; 450 rebels executed.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>1571 Ridolfi Plot:</strong> Italian banker Ridolfi plotted with Duke of Norfolk, Philip II, and Pope to murder Elizabeth. Cecil uncovered plot; Norfolk beheaded June 1572.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>1583 Throckmorton:</strong> French Duke of Guise planned invasion with Spanish funding. Walsingham’s spies uncovered papers; Throckmorton executed; Bond of Association (1584).
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>1586 Babington Plot:</strong> Anthony Babington sent coded beer-barrel letters to Mary Stuart agreeing to regicide. Phelippes cracked cipher; Mary executed Feb 1587.
            </div>
          </div>
        </div>

        <!-- Section 4: Anglo-Spanish Escalation & The Netherlands Crisis -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            4. The Road to War: Commercial Rivalry, The Netherlands &amp; Drake’s Raids (1572–87)
          </strong>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">🏴‍☠️ Privateering &amp; Silver Raids:</strong>
              Drake raided Nombre de Dios (1572) and captured £140,000 in silver from the *Cacafuego* (1579). Elizabeth knighted Drake on *Golden Hind* in 1581, enraging Philip II.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">🇳🇱 Treaty of Nonsuch (1585):</strong>
              After 1584 Treaty of Joinville (France/Spain) and William the Silent’s murder, Elizabeth signed Nonsuch, sending Dudley and 7,400 troops to aid Dutch Protestants.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">⚓ Cadiz Raid (April 1587):</strong>
              Drake sailed into Cadiz harbour, destroyed 30 Spanish ships and burned seasoned barrel staves ("singeing the King of Spain’s beard"), delaying the Armada invasion by a year.
            </div>
          </div>
        </div>
      </div>`;

// 6. KT3 Page 20
const newKt3Page20 = `      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 10.5pt; color: #000000; text-transform: uppercase; font-weight: 800;">
          Thematic Study Blueprint &bull; Key Topic 3: Elizabethan Society &amp; Exploration, 1558–88
        </h2>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0; gap: 3px;">
        <!-- Section 1: Anatomy of an Elizabethan Playhouse -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            1. Anatomy of an Elizabethan Playhouse: The Globe &amp; The Swan (Bankside)
          </strong>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong>① The Heavens &amp; Roof:</strong> Painted canopy ceiling supported by pillars; housed trapdoors, winches, ropes, and cannons for special sound effects.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong>② The Pit / Yard:</strong> Unroofed open standing space around thrust stage; held up to 1,000 "groundlings" who paid 1 penny to watch in all weathers.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong>③ Galleries &amp; Lords’ Rooms:</strong> Three tiers of covered wooden seats (2–3d); Lords’ Rooms above stage cost 6d for aristocrats to be seen by the audience.
            </div>
          </div>
        </div>

        <!-- Section 2: Global Exploration & Colonisation -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            2. Elizabethan Global Exploration: Drake’s Circumnavigation &amp; The Virginia Colonies
          </strong>
          <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1.2px solid #000000; padding: 3px 5px; border-radius: 2px; background: #ffffff;">
              <strong style="font-size: 7.5pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                🧭 Drake’s Global Track (1577–1580)
              </strong>
              &bull; <strong>Route:</strong> Plymouth &rarr; Cape Horn &rarr; Pacific Coast raids &rarr; Nova Albion (California) &rarr; Moluccas &rarr; Plymouth.<br>
              &bull; <strong>Key Outcomes:</strong> First English circumnavigation; challenged Spanish monopoly in Pacific; trade pact with Sultan of Ternate; returned with £140,000 treasure.
            </div>
            <div style="border: 1.2px solid #000000; padding: 3px 5px; border-radius: 2px; background: #ffffff;">
              <strong style="font-size: 7.5pt; color: #000000; display: block; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                🌲 Raleigh’s Virginia Colonies (1585–1587)
              </strong>
              &bull; <strong>1585 First Colony:</strong> Ralph Lane + 107 soldiers on Roanoke Island. *Tiger* flooded food seeds; alienated Chief Wingina; rescued by Drake in 1586.<br>
              &bull; <strong>1587 Lost Colony:</strong> John White + 118 settlers. White delayed by Armada; returned in 1590 to find colony vanished with only "CROATOAN" post remaining.
            </div>
          </div>
        </div>

        <!-- Section 3: Poverty, Vagrancy & The Poor Laws -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            3. Poverty, Vagrancy &amp; The Evolution of Elizabethan Poor Relief
          </strong>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">🌾 Causes of Poverty:</strong>
              &bull; Population growth: 3m to 4.2m created food shortages and rent inflation.<br>
              &bull; Enclosure: Arable farmland converted into sheep pasture; labourers lost jobs.<br>
              &bull; Bad harvests: 1590s famines drove desperate rural poor to towns.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">⚖️ Impotent vs Sturdy Poor:</strong>
              &bull; <strong>Impotent (Deserving):</strong> Sick, elderly, disabled, orphans unable to work; received parish poor relief.<br>
              &bull; <strong>Sturdy (Idle):</strong> Able-bodied vagrants seen as criminal threats (e.g. counterfeit cranks, clapper dudgeons); harshly punished.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 5px; border-radius: 2px; background: #f8fafc;">
              <strong style="color: #000000; display: block;">📜 The Poor Acts (1572 &amp; 1576):</strong>
              &bull; <strong>1572 Vagabonds Act:</strong> Whipped and burned through ear; compulsory poor rate tax.<br>
              &bull; <strong>1576 Poor Act:</strong> JPs provided wool/hemp for work; created Bridewell workhouses (Houses of Correction).
            </div>
          </div>
        </div>

        <!-- Section 4: The Educational Revolution -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 3px;">
            4. The Elizabethan Educational Revolution &amp; Social Class Barriers
          </strong>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; font-family: 'Inter', sans-serif; font-size: 7.1pt; line-height: 1.18;">
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>Petty Schools:</strong> Taught reading, writing, and arithmetic to young boys aged 4–7 in teachers' private homes using hornbooks.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>Grammar Schools:</strong> Over 70 founded under Elizabeth. Fee-paying secondary schools for middle-class boys aged 7–14; intensive Latin, Greek, rhetoric.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>Universities:</strong> Oxford &amp; Cambridge; taught theology, medicine, law, geometry. Expanded to train clergy, diplomats, and statesmen.
            </div>
            <div style="border: 1px solid #cbd5e1; padding: 3px 4px; border-radius: 2px; background: #f8fafc;">
              <strong>Gender &amp; Class:</strong> Noble girls taught at home in needlework, French, music; working-class girls received zero formal schooling; laboured from age 7.
            </div>
          </div>
        </div>
      </div>`;

// Replace the old Page 20 switch block in render_eee_twopage_workbook.cjs
const oldPage20Regex =
  /if \(ktId === 'KT1'\) \{\s*page12Content = `[\s\S]*?`\s*;\s*\} else if \(ktId === 'KT2'\) \{\s*page12Content = `[\s\S]*?`\s*;\s*\} else \{\s*page12Content = `[\s\S]*?`\s*;\s*\}/;

const newPage20Block = `if (ktId === 'KT1') {
    page12Content = \`${newKt1Page20}\`;
  } else if (ktId === 'KT2') {
    page12Content = \`${newKt2Page20}\`;
  } else {
    page12Content = \`${newKt3Page20}\`;
  }`;

code = code.replace(oldPage20Regex, newPage20Block);

fs.writeFileSync(targetFile, code, 'utf8');
console.log(
  '✅ Applied Medicine line spacing & full Page 20 Blueprints to scripts/render_eee_twopage_workbook.cjs',
);
