fetch('https://edexcelgcsehistorycme.netlify.app')
  .then(res => {
    console.log('Status:', res.status);
    for (let [key, val] of res.headers.entries()) {
      console.log(`${key}: ${val}`);
    }
  })
  .catch(err => console.error(err));
