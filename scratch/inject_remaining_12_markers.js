const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const startIndex = fileContent.indexOf('{');
const endIndex = fileContent.lastIndexOf('}');
const jsonStr = fileContent.substring(startIndex, endIndex + 1);

const data = eval('(' + jsonStr + ')');

const Q1 = `<strong>Grade 9 Model Answer (12 marks):</strong><br><br><p style="margin-bottom: 1.5rem;">The primary reason why the communication of medical ideas was transformed during the Renaissance was the combination of <strong>the printing press</strong> and the establishment of scientific institutions like <strong>the Royal Society</strong>, which bypassed Church censorship and prioritized empirical proof over ancient authority. Prior to this period, medical texts had to be laboriously copied by hand by monastic scribes, meaning books were highly expensive, prone to copying errors, and strictly monitored by the Catholic Church to prevent challenges to Galen’s classical pre-eminence. The introduction of Gutenberg’s <strong>printing press</strong> (c.1440) shattered this technological bottleneck, allowing pioneering anatomists like Andreas Vesalius to mass-produce identical copies of <em>De Humani Corporis Fabrica</em> (1543) and enabling William Harvey to rapidly distribute his proof of blood circulation in 1628 across Europe before the Church could suppress them.</p><p style="margin-bottom: 1.5rem;"><strong>This technological breakthrough was further accelerated in 1660</strong> by the founding of <strong>the Royal Society</strong> in London, which promoted the motto <em>“Nullius in verba”</em> (take nobody’s word for it) and actively encouraged empirical scientific experimentation. By publishing the world’s first scientific journal, <em>Philosophical Transactions</em> (1665), the Society created an open, standardized network where scientists and physicians could rapidly share, debate, and peer-review new biological observations—such as Antony van Leeuwenhoek’s discovery of microscopic bacteria ("animalcules").</p><p style="margin-bottom: 1.5rem;"><strong>Consequently</strong>, these dual communication engines meant that medical ideas were no longer locked in monastic libraries or restricted to regional guilds; instead, they became part of an international, evidence-based scientific community. <strong>As a result</strong>, while daily clinical treatments for the general public remained largely unchanged, the rapid and uncensored dissemination of ideas successfully undermined classical dogma, laying the essential intellectual foundations for the later germ-based breakthroughs of the nineteenth century.</p>`;

const Q2 = `<strong>Grade 9 Model Answer (12 marks):</strong><br><br><p style="margin-bottom: 1.5rem;">The rapid and unprecedented progress in disease prevention after 1900 was driven by the British government’s complete abandonment of its traditional nineteenth-century "laissez-faire" policy in favor of active, compulsory state intervention, as demonstrated by the launching of <strong>national vaccination campaigns</strong> and the passing of the <strong>Clean Air Acts</strong>. In the mid-twentieth century, the government recognized that it had an institutional duty to safeguard the physical health of its citizens, a shift that was heavily accelerated by the creation of the <strong>National Health Service (NHS) in 1948</strong>. This state-directed approach first succeeded on a national scale in <strong>1942</strong> when the government launched the first-ever free <strong>national immunisation campaign against diphtheria</strong>, which successfully reduced child mortality from the disease from 3,000 cases a year to virtually zero. The success of this administrative model enabled the state to systematically introduce subsequent national programs against polio (1956), tetanus (1961), measles (1968), and the MMR vaccine (1988), effectively eradicating highly infectious epidemics that had plagued Britain for centuries.</p><p style="margin-bottom: 1.5rem;">Concurrently, the state used its legislative power to tackle environmental and lifestyle-related causes of chronic illness. Following the catastrophic <strong>Great Smog of London in 1952</strong>, which killed thousands of vulnerable citizens, the government passed the landmark <strong>Clean Air Acts of 1956 and 1968</strong> to legally ban coal smoke and regulate urban air pollution, immediately reducing chronic respiratory diseases.</p><p style="margin-bottom: 1.5rem;"><strong>Consequently</strong>, this transition from optional local public health measures to compulsory national legislation meant that the state could actively control both its citizens' environment and biology. <strong>This led directly to</strong> a preventative revolution where the focus of medicine shifted from costly bedside hospital cures to proactive, state-funded prevention, causing the average life expectancy of British citizens to nearly double over the course of the century.</p>`;

// Update lesson_2_1
let l2_1 = data.lessons.find(l => l.id === "lesson_2_1");
if (l2_1 && l2_1.extended) {
    l2_1.extended.model = Q1;
}

// Update lesson_4_3
let l4_3 = data.lessons.find(l => l.id === "lesson_4_3");
if (l4_3 && l4_3.extended) {
    l4_3.extended.model = Q2;
}

const newJsonStr = JSON.stringify(data, null, 2);
const newContent = fileContent.substring(0, startIndex) + newJsonStr + fileContent.substring(endIndex + 1);

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully injected the remaining 12-mark essays.');
