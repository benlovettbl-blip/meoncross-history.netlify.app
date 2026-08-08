const fs = require('fs');
const path = require('path');

const mappings = [
  {
    unit: 'industrialisation_and_empire',
    lessonIndex: 3, // 4th lesson: How was the British Empire built and sustained?
    videos: [
      { url: 'https://www.youtube.com/watch?v=1VIe42pAhuA&t=22s', title: 'Birth of Empire: The East India Company' },
      { url: 'https://www.youtube.com/watch?v=oNWTXaOotEA&t=43s', title: 'How did the British gain control of India?' }
    ]
  },
  {
    unit: 'early_modern_world',
    lessonIndex: 4, // 5th lesson: What were the mechanics of the Transatlantic Slave Trade?
    videos: [
      { url: 'https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-profit-and-loss-west-india-docks-and-the-sugar-economy/', title: 'Profit and Loss: West India Docks and the Sugar Economy' },
      { url: 'https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-profit-and-loss-first-slave-society-in-barbados/', title: 'Profit and Loss: First Slave Society in Barbados' },
      { url: 'https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-profit-and-loss-slave-plantation-system/', title: 'Profit and Loss: Slave Plantation System' },
      { url: 'https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-profit-and-loss-implements-of-torture/', title: 'Profit and Loss: Implements of Torture' },
      { url: 'https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-the-price-of-freedom-the-legacies-of-slavery/', title: 'The Price of Freedom: The Legacies of Slavery' },
      { url: 'https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-the-price-of-freedom-where-did-the-slavery-compensation-money-end-up/', title: 'Where Did the Slavery Compensation Money End Up?' },
      { url: 'https://www.youtube.com/watch?v=IpgD2ehtMmM', title: 'How Barbados became the first slave society' },
      { url: 'https://www.youtube.com/watch?v=k7OQjNRsrvI', title: 'David Harewood Learns Horrifying Details of Barbados Slave Code' }
    ]
  },
  {
    unit: 'early_modern_world',
    lessonIndex: 5, // 6th lesson: How did enslaved Africans resist the Transatlantic Slave Trade?
    videos: [
      { url: 'https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-the-price-of-freedom-slave-owner-propaganda-tactics/', title: 'Slave Owner Propaganda Tactics' },
      { url: 'https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-the-price-of-freedom-slave-owner-compensation-arguments/', title: 'Slave Owner Compensation Arguments' },
      { url: 'https://www.youtube.com/watch?v=ITtNDpkW26c&t=38s', title: 'Abolitionism and why it was opposed' }
    ]
  }
];

mappings.forEach(mapping => {
  const dataJsPath = path.join(process.cwd(), 'public', 'units', mapping.unit, 'data.js');
  if (fs.existsSync(dataJsPath)) {
    let raw = fs.readFileSync(dataJsPath, 'utf8');
    const match = raw.match(/export const unitData = ([\s\S]+);/);
    if (match) {
      let data = eval('(' + match[1] + ')');
      
      const lesson = data.lessons[mapping.lessonIndex];
      if (!lesson.video) {
        lesson.video = [];
      }
      
      mapping.videos.forEach(v => {
        if (!lesson.video.some(existing => existing.url === v.url)) {
          lesson.video.push(v);
        }
      });
      
      const newDataStr = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
      fs.writeFileSync(dataJsPath, newDataStr, 'utf8');
      
      const srcPath = path.join(process.cwd(), mapping.unit, 'data.js');
      if (fs.existsSync(srcPath)) {
          fs.writeFileSync(srcPath, newDataStr, 'utf8');
      }
      
      console.log(`Injected ${mapping.videos.length} videos into ${mapping.unit} Lesson ${mapping.lessonIndex}`);
    }
  }
});
