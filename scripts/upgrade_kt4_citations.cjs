const fs = require('fs');
const path = require('path');

const dataJsPath = path.resolve(__dirname, '../units/edexcel_medicine/data.js');

console.log('Reading data.js...');
let content = fs.readFileSync(dataJsPath, 'utf8');

// ============================================================================
// STEP 1: EMBED KT4 SOURCES INTO NARRATIVE BLOCKS (Lessons 4.1 to 4.5)
// ============================================================================

// Lesson 4.1: Franklin Photograph 51 (Act 2) and Watson/Crick Model (Act 3)
const l41_act2_target = `<span class=\"para-ref\">[2.1]</span> In January 1951, physical chemist Rosalind Franklin joined King’s College London, bringing world-class expertise in X-ray crystallography—a demanding technique whereby high-energy X-ray beams were diffracted through crystallized biological fibers onto photographic film. Working alongside PhD student Raymond Gosling in a damp, subterranean basement laboratory, Franklin perfected a micro-camera setup, exposing calf thymus DNA to 62 continuous hours of radiation under controlled humidity. In May 1952, Franklin captured "Photograph 51," a stark, razor-sharp diffraction image displaying an unmistakable dark X-shaped cross of reflections that mathematically proved DNA formed a double-stranded helical cylinder.`;

const l41_act2_replacement = `<span class=\"para-ref\">[2.1]</span> In January 1951, physical chemist Rosalind Franklin joined King’s College London, bringing world-class expertise in X-ray crystallography—a demanding technique whereby high-energy X-ray beams were diffracted through crystallized biological fibers onto photographic film. Working alongside PhD student Raymond Gosling in a damp, subterranean basement laboratory, Franklin perfected a micro-camera setup, exposing calf thymus DNA to 62 continuous hours of radiation under controlled humidity. In May 1952, Franklin captured "Photograph 51" (<span class=\"archival-meta-tag\">Source A</span>), a stark, razor-sharp diffraction image displaying an unmistakable dark X-shaped cross of reflections that mathematically proved DNA formed a double-stranded helical cylinder.`;

if (content.includes(l41_act2_target)) {
  content = content.replace(l41_act2_target, l41_act2_replacement);
  console.log('✅ Updated Lesson 4.1 Act 2 text with Source A citation.');
}

const l41_act3_target = `In March 1953, they completed a magnificent three-dimensional model revealing that DNA was a "double helix"`;
const l41_act3_replacement = `In March 1953, they completed a magnificent three-dimensional model (<span class=\"archival-meta-tag\">Source B</span>) revealing that DNA was a "double helix"`;

if (content.includes(l41_act3_target)) {
  content = content.replace(l41_act3_target, l41_act3_replacement);
  console.log('✅ Updated Lesson 4.1 Act 3 text with Source B citation.');
}

// Lesson 4.2: Röntgen X-Ray (Act 2) and CT Scanner (Act 3)
const l42_act2_target = `The developed plate revealed an astounding, eerie spectacle: the living skeletal architecture of Bertha’s fingers`;
const l42_act2_replacement = `The developed plate revealed an astounding, eerie spectacle (<span class=\"archival-meta-tag\">Source A</span>): the living skeletal architecture of Bertha’s fingers`;

if (content.includes(l42_act2_target)) {
  content = content.replace(l42_act2_target, l42_act2_replacement);
  console.log('✅ Updated Lesson 4.2 Act 2 text with Source A citation.');
}

const l42_act3_target = `In October 1971, Hounsfield installed his prototype clinical CT scanner at Atkinson Morley Hospital in Wimbledon, London.`;
const l42_act3_replacement = `In October 1971, Hounsfield installed his prototype clinical CT scanner (<span class=\"archival-meta-tag\">Source B</span>) at Atkinson Morley Hospital in Wimbledon, London.`;

if (content.includes(l42_act3_target)) {
  content = content.replace(l42_act3_target, l42_act3_replacement);
  console.log('✅ Updated Lesson 4.2 Act 3 text with Source B citation.');
}

// Lesson 4.3: Ehrlich Lab (Act 2) and NHS Leaflet (Act 3)
const l43_act2_target = `Branded as **Salvarsan 606**, it became humanity’s first synthetic chemical "magic bullet"`;
const l43_act2_replacement = `Branded as **Salvarsan 606** (<span class=\"archival-meta-tag\">Source A</span>), it became humanity’s first synthetic chemical "magic bullet"`;

if (content.includes(l43_act2_target)) {
  content = content.replace(l43_act2_target, l43_act2_replacement);
  console.log('✅ Updated Lesson 4.3 Act 2 text with Source A citation.');
}

const l43_act3_target = `Bevan formally enacted a monumental social principle: comprehensive healthcare`;
const l43_act3_replacement = `Bevan distributed a nationwide leaflet (<span class=\"archival-meta-tag\">Source B</span>) enacting a monumental social principle: comprehensive healthcare`;

if (content.includes(l43_act3_target)) {
  content = content.replace(l43_act3_target, l43_act3_replacement);
  console.log('✅ Updated Lesson 4.3 Act 3 text with Source B citation.');
}

// Lesson 4.4: Fleming Plate (Act 2) and Industrial Penicillin (Act 3)
const l44_act2_target = `Fleming noted with astonishment that surrounding the invasive mold colony was a clear, transparent "halo"`;
const l44_act2_replacement = `Fleming noted with astonishment that surrounding the invasive mold colony (<span class=\"archival-meta-tag\">Source A</span>) was a clear, transparent "halo"`;

if (content.includes(l44_act2_target)) {
  content = content.replace(l44_act2_target, l44_act2_replacement);
  console.log('✅ Updated Lesson 4.4 Act 2 text with Source A citation.');
}

const l44_act3_target = `The breakthrough arrived in Peoria, Illinois, where scientists discovered that steeping mold in corn steep liquor inside 10,000-gallon deep-tank industrial fermentation vats`;
const l44_act3_replacement = `The breakthrough arrived in Peoria, Illinois, where specialized industrial culture apparatus (<span class=\"archival-meta-tag\">Source B</span>) and deep-tank fermentation vats`;

if (content.includes(l44_act3_target)) {
  content = content.replace(l44_act3_target, l44_act3_replacement);
  console.log('✅ Updated Lesson 4.4 Act 3 text with Source B citation.');
}

// Lesson 4.5: Cigarette Ad (Act 2) and Plain Packaging (Act 3)
const l45_act2_target = `Tobacco corporations spent millions on deceptive print advertisements claiming "more doctors smoke Camels"`;
const l45_act2_replacement = `Tobacco corporations spent millions on deceptive print advertisements (<span class=\"archival-meta-tag\">Source A</span>) claiming "more doctors smoke Camels"`;

if (content.includes(l45_act2_target)) {
  content = content.replace(l45_act2_target, l45_act2_replacement);
  console.log('✅ Updated Lesson 4.5 Act 2 text with Source A citation.');
}

const l45_act3_target = `In May 2016, Britain enforced standardized plain packaging: all tobacco products were stripped of logos and brand colors`;
const l45_act3_replacement = `In May 2016, Britain enforced standardized plain packaging (<span class=\"archival-meta-tag\">Source B</span>): all tobacco products were stripped of logos and brand colors`;

if (content.includes(l45_act3_target)) {
  content = content.replace(l45_act3_target, l45_act3_replacement);
  console.log('✅ Updated Lesson 4.5 Act 3 text with Source B citation.');
}

// Now write updated content back
fs.writeFileSync(dataJsPath, content, 'utf8');
console.log('Step 1 complete: KT4 citations injected.');
