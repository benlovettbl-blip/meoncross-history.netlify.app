const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Load base data
const DATA = require('./cme_unified_textbook_data.cjs');

// High-fidelity historical calibration phrases for each enquiry block:
// Designed to supply exact disciplinary depth (historical consequences, strategic military mechanics, diplomatic context)
const HISTORICAL_CALIBRATIONS = {
  // Enquiry 01 (pp. 4–5):
  // Page 4 needs slight trim (-10 words).
  // Page 5 needs slight trim (-10 words).

  // Enquiry 02 (pp. 6–7):
  // Page 6 needs ~10w
  2.1: ' The resulting humanitarian crisis exposed Britain to severe international criticism and moral isolation across the globe.',
  // Page 7 needs ~20w
  2.3: ' Communal militias mobilized across every contested quarter as the mandate unraveled into widespread lawlessness and bloodshed.',
  2.4: ' The 1949 armistice lines consolidated Israeli statehood while leaving regional Arab-Israeli tensions permanently unresolved.',

  // Enquiry 03 (pp. 8–9):
  // Page 8 needs ~30w
  3.1: ' Generations of displaced families preserved their village oral histories, maintaining the memory of their lost ancestral lands.',
  3.2: ' The swift military reprisals deepened regional bitterness, transforming the armistice borders into active frontline combat zones.',
  // Page 9 needs ~35w
  3.3: ' By transforming immigration into an engine of nation-building, Israel dramatically expanded its agricultural and industrial workforce.',
  3.4: ' Reprisal operations commanded by Sharon cemented a doctrine of disproportionate deterrence that became central to IDF strategic doctrine.',

  // Enquiry 04 (pp. 10–11):
  // Page 10 needs ~35w
  4.1: ' The Czech arms shipment shattered Western military dominance, demonstrating the growing geopolitical reach of the Soviet Union.',
  4.2: ' Nasser’s charismatic oratory rallied millions across the Arab world, positioning Cairo as the epicentre of anti-imperial resistance.',
  // Page 11 needs slight trim (-10w)

  // Enquiry 05 (pp. 12–13):
  // Page 12 needs ~12w
  5.1: ' The water disputes demonstrated that ecological resources were inseparable from national sovereignty and military security in the arid Middle East.',
  // Page 13 needs ~35w
  5.3: ' Syrian artillery bombardments maintained relentless psychological and economic pressure on northern Israeli agricultural communities.',
  5.4: ' The expulsion of UN peacekeepers eliminated the diplomatic buffer, leaving Egyptian and Israeli armies confronting each other directly across the frontier.',

  // Enquiry 06 (pp. 14–15):
  // Page 14 needs ~20w
  6.1: ' Rabin’s strategic masterstroke achieved absolute air supremacy within hours, sealing the fate of the entire land campaign before it began.',
  // Page 15 needs ~30w
  6.3: ' Syrian defenses on the Golan plateau crumbled under combined Israeli armor and close air support, securing the northern approaches.',
  6.4: ' The capture of the holy sites aroused fervent religious messianism inside Israel while inflicting profound psychological trauma on the Arab world.',

  // Enquiry 07 (pp. 16–17):
  // Page 16 needs ~40w
  7.1: ' Military rule established extensive administrative controls, identity permits, and security checkpoints that reshaped daily Palestinian life under occupation.',
  7.2: ' Religious nationalist movements viewed the newly acquired territories as liberated biblical heritage rather than negotiable bargaining chips.',
  // Page 17 needs ~40w
  7.3: ' Resolution 242’s linguistic ambiguity allowed both sides to interpret its withdrawal clauses to suit their conflicting territorial ambitions.',
  7.4: ' The Khartoum summit cemented a posture of collective defiance that obstructed diplomatic compromise for the next decade.',

  // Enquiry 08 (pp. 18–19):
  // Page 18 needs ~25w
  8.1: ' Fatah’s active armed resistance provided a potent symbol of independent Palestinian agency free from Arab state manipulation.',
  8.2: ' The skyjackings forced international governments to confront the reality that the Palestinian national question could no longer be ignored.',
  // Page 19 needs ~25w
  8.3: ' The massacre irrevocably altered international aviation and event security, inaugurating a grim era of global counter-terrorism operations.',
  8.4: ' Arafat’s speech established the PLO as an indispensable participant in any future comprehensive peace architecture.',

  // Enquiry 09 (pp. 20–21):
  // Page 20 needs ~40w
  9.1: ' Sadat recognized that prolonged military stalemate was economically unsustainable and strategically disastrous for Egyptian sovereignty.',
  9.2: ' The audacious water-cannon assault shattered Israel’s formidable sand ramparts, achieving complete surprise along the entire length of the canal.',
  // Page 21: ALREADY OPTIMAL

  // Enquiry 10 (pp. 22–23):
  // Page 22 needs ~25w
  10.1: ' Kissinger’s pragmatic bilateral approach established the precedent that peace could be negotiated incrementally through direct American mediation.',
  10.2: ' Sadat’s courageous presence in Jerusalem permanently disarmed the psychological barrier that had made dialogue unthinkable for three decades.',
  // Page 23 needs ~50w
  10.3: ' Carter’s relentless personal persistence saved the negotiations from collapse on multiple occasions, binding both nations to a historic compromise.',
  10.4: ' Despite the intense regional ostracism, the treaty eliminated the existential threat of a multi-front assault on Israel for generations.',

  // Enquiry 11 (pp. 24–25):
  // Page 24 needs ~18w
  11.1: ' The expanding military operation alienated international allies and deepened bitter domestic political divisions within Israeli society.',
  // Page 25 needs ~35w
  11.3: ' The decentralized nature of the civil uprising rendered conventional Israeli military superiority ineffective against widespread popular rebellion.',
  11.4: ' Hamas presented an uncompromising religious vision of total liberation that challenged the secular PLO’s diplomatic monopoly.',

  // Enquiry 12 (pp. 26–27):
  // Page 26: ALREADY OPTIMAL
  // Page 27 needs ~18w
  12.3: ' The Jordan peace accord demonstrated that pragmatic territorial and resource agreements could foster genuine regional cooperation.',
  12.4: ' The tragic murder of Rabin silenced the most credible champion of peace, leaving the region vulnerable to renewed cycles of confrontation.',
};

console.log('Historical calibration phrases prepared.');
