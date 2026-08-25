fetch('https://edexcelgcsehistorycme.netlify.app')
  .then(res => res.text())
  .then(html => {
    const scripts = html.match(/src="[^"]*app\.js[^"]*"/gi);
    const styles = html.match(/href="[^"]*style\.css[^"]*"/gi);
    console.log('Scripts:', scripts);
    console.log('Styles:', styles);
  })
  .catch(err => console.error(err));
