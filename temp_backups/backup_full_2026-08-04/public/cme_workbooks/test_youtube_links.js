const https = require('https');

const videos = [
  { topic: 'subtopic_1_1', url: 'https://www.youtube.com/watch?v=2yBolHdMejM' },
  { topic: 'subtopic_1_2', url: 'https://www.youtube.com/watch?v=wjysy7ONisA' },
  { topic: 'subtopic_1_3', url: 'https://www.youtube.com/watch?v=s5R-P_YhVbA' },
  { topic: 'subtopic_2_1', url: 'https://www.youtube.com/watch?v=n74s5-9lS38' },
  { topic: 'subtopic_2_2', url: 'https://www.youtube.com/watch?v=D3K9VJ6dhNQ' },
  { topic: 'subtopic_2_3', url: 'https://www.youtube.com/watch?v=nN4M6k531e4' },
  { topic: 'subtopic_3_1', url: 'https://www.youtube.com/watch?v=QxqHStC9hMI' },
  { topic: 'subtopic_3_2', url: 'https://www.youtube.com/watch?v=kYJdJ-X0kLo' },
  { topic: 'subtopic_3_3', url: 'https://www.youtube.com/watch?v=N1TXC9eQcJ4' }
];

function checkVideo(video) {
  return new Promise((resolve) => {
    // For YouTube, checking the oembed endpoint is a very reliable way to see if a video is valid and public!
    const videoId = video.url.split('v=')[1];
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    
    https.get(oembedUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            console.log(`OK [${video.topic}]: "${json.title}" by ${json.author_name} (URL: ${video.url})`);
          } catch (e) {
            console.log(`PARSE ERROR [${video.topic}]: ${video.url}`);
          }
        } else {
          console.log(`FAILED [${video.topic}] Status ${res.statusCode}: ${video.url}`);
        }
        resolve();
      });
    }).on('error', (err) => {
      console.log(`ERROR [${video.topic}]: ${video.url} (${err.message})`);
      resolve();
    });
  });
}

async function run() {
  console.log("Checking YouTube links...");
  for (const video of videos) {
    await checkVideo(video);
    await new Promise(resolve => setTimeout(resolve, 500)); // Be nice
  }
}

run();
