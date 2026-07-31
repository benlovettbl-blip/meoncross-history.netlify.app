const fs = require('fs');

let content = fs.readFileSync('water_and_sanitation/data.js', 'utf8');

// We need to parse data.js, modify the specific blocks, and write it back.
// Since data.js exports the object using ESM syntax, we will do a regex replacement or JSON parse.
const jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// 1. Expand Fishbourne Roman Palace
const fishbourne = data.lessons[0].narrative_blocks.find(b => b.title === 'Local Link: Fishbourne Roman Palace');
if (fishbourne) {
  fishbourne.text = "Just down the road from Fareham near Chichester, Fishbourne Roman Palace is the largest residential Roman building found in Britain. Originally built in the 1st century AD, likely as a reward for the local British client-king Togidubnus, the palace was a marvel of Roman engineering. It featured incredibly well-preserved remains of a Roman bathhouse and a sophisticated hypocaust (underfloor heating) system that pumped hot air beneath the luxurious mosaic floors. It is a perfect local example of the extreme luxury sanitation that elite Romans enjoyed, which you can actually visit today. <br><br><a href='https://sussexpast.co.uk/attraction/fishbourne-roman-palace/' target='_blank' style='color: #1a73e8; text-decoration: underline; font-size: 0.9em; display: inline-flex; align-items: center; gap: 5px;'><i class='fas fa-external-link-alt'></i> Visit the official Fishbourne Roman Palace website</a>";
  fishbourne.image = "water_local_fishbourne.jpg";
}

// 2. Expand Titchfield Abbey
const titchfield = data.lessons[1].narrative_blocks.find(b => b.title === 'Local Link: Titchfield Abbey');
if (titchfield) {
  titchfield.text = "Located right in Fareham, this Premonstratensian abbey relied on the River Meon. Like most monasteries, it had highly advanced water management for the time, including fresh water piped in for washing (the lavatorium) and a reredorter (latrine block) cleverly positioned over a running stream to carry waste away. The impressive stone ruins and medieval floor tiles are still visible today. <br><br><a href='https://www.english-heritage.org.uk/visit/places/titchfield-abbey/' target='_blank' style='color: #1a73e8; text-decoration: underline; font-size: 0.9em; display: inline-flex; align-items: center; gap: 5px;'><i class='fas fa-external-link-alt'></i> Visit the official English Heritage Titchfield Abbey website</a>";
  titchfield.image = "water_local_titchfield.jpg";
}

// 3. Expand Tudor Portsmouth
const southsea = data.lessons[2].narrative_blocks.find(b => b.title === 'Local Link: Tudor Portsmouth & Southsea Castle');
if (southsea) {
  southsea.text = "As Portsmouth grew into a vital naval hub under Henry VIII, the cramped, walled town became notoriously filthy, relying entirely on overflowing cesspits and open gutters. You can contrast this with the dedicated (though basic) latrine chutes built into the walls of nearby Southsea Castle for soldiers. The famous 'Cowdray Engraving' (shown here) is an authentic historical source depicting the devastating sinking of Henry VIII's flagship, the Mary Rose, right off the coast of Southsea Castle in 1545. <br><br><a href='https://maryrose.org/' target='_blank' style='color: #1a73e8; text-decoration: underline; font-size: 0.9em; display: inline-flex; align-items: center; gap: 5px;'><i class='fas fa-external-link-alt'></i> Visit the official Mary Rose Museum website</a>";
  southsea.image = "water_local_southsea.jpg";
}

// 4. Expand Cholera
const cholera = data.lessons[3].narrative_blocks.find(b => b.title === 'Local Link: The 1849 Portsmouth Cholera Epidemic');
if (cholera) {
  cholera.text = "As the Industrial Revolution caused Portsea's population to explode around the dockyard, overcrowding led to severe sanitation crises. In the summer of 1849, a devastating cholera outbreak hit Portsmouth, killing over 800 people. Primary sources from the time, such as Robert Rawlinson's 1850 sanitary report, detailed horrific scenes of open sewers running directly into the streets and drinking wells contaminated by overflowing cesspits. It perfectly mirrors the national crisis and the deadly consequences of the Miasma theory. <br><br><a href='https://www.welcometoportsmouth.co.uk/portsmouth%20cholera%20memorial.html' target='_blank' style='color: #1a73e8; text-decoration: underline; font-size: 0.9em; display: inline-flex; align-items: center; gap: 5px;'><i class='fas fa-external-link-alt'></i> View the Portsmouth Cholera Memorial details</a>";
  cholera.image = "water_local_cholera.jpg";
}

// 5. Expand Eastney
const eastney = data.lessons[4].narrative_blocks.find(b => b.title === 'Local Link: Eastney Beam Engine House');
if (eastney) {
  eastney.text = "This is Portsmouth's direct equivalent to Joseph Bazalgette's London sewers! Built in 1887 by Sir Frederick Bramwell, these massive Victorian steam-powered beam engines were constructed to pump Portsmouth's raw sewage out to sea at Langstone Harbour. The ornate cast-iron machinery, housed in a grand Victorian brick pump house, finally cleaned up the city's streets and eliminated cholera locally. <br><br><a href='https://www.portsmouthwater.co.uk/about-us/eastney-beam-engine-house/' target='_blank' style='color: #1a73e8; text-decoration: underline; font-size: 0.9em; display: inline-flex; align-items: center; gap: 5px;'><i class='fas fa-external-link-alt'></i> Visit the Eastney Engine House website</a>";
  eastney.image = "water_local_eastney.jpg";
}

fs.writeFileSync('water_and_sanitation/data.js', 'export const unitData = ' + JSON.stringify(data, null, 2) + ';');
console.log('Successfully expanded local blocks in data.js');
