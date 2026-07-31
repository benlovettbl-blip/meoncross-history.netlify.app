const fs = require('fs');

const cmeDataPath = './public/data/cme_new.json';
const cmeData = JSON.parse(fs.readFileSync(cmeDataPath, 'utf8'));

// Inject timeline for Lesson 1 of cme_new
const cmeLesson1 = cmeData.data.lessons.find(l => l.id === 'lesson_1');
if (cmeLesson1) {
  cmeLesson1.do_now = {
    type: 'timeline',
    events: [
      { year: "1917", title: "Balfour Declaration", detail: "Britain promises a national home for the Jewish people." },
      { year: "1920-1947", title: "British Mandate", detail: "Britain governs Palestine under League of Nations." },
      { year: "1936-1939", title: "Arab Revolt", detail: "Violent uprising against British rule and Jewish immigration." },
      { year: "1939", title: "White Paper", detail: "Britain restricts Jewish immigration to Palestine." },
      { year: "1945", title: "Post-WWII Crisis", detail: "Holocaust survivors seek refuge; Jewish Insurgency begins." }
    ],
    prediction_question: "Predict: Based on these events, why did the British finally decide to give up the mandate in 1947?"
  };
}
fs.writeFileSync(cmeDataPath, JSON.stringify(cmeData, null, 2), 'utf8');

const wsDataPath = './public/data/water_and_sanitation.json';
const wsData = JSON.parse(fs.readFileSync(wsDataPath, 'utf8'));

// Inject timeline for Lesson 1 of water_and_sanitation
const wsLesson1 = wsData.data.lessons.find(l => l.id === 'lesson_1');
if (wsLesson1) {
  wsLesson1.do_now = {
    type: 'timeline',
    events: [
      { year: "1750", title: "Rural Britain", detail: "Most of the population lives and works in the countryside." },
      { year: "1780s", title: "First Factories", detail: "Steam-powered textile mills begin mass production." },
      { year: "1800-1850", title: "Rapid Urbanisation", detail: "Millions migrate to industrial towns looking for work." },
      { year: "1831", title: "First Cholera Epidemic", detail: "Cholera arrives in Britain, killing thousands." },
      { year: "1842", title: "Chadwick's Report", detail: "Edwin Chadwick publishes his damning report on sanitary conditions." }
    ],
    prediction_question: "Predict: Why do you think disease spread so quickly in the newly built industrial towns?"
  };
}
fs.writeFileSync(wsDataPath, JSON.stringify(wsData, null, 2), 'utf8');

console.log("Successfully injected do_now timelines!");
