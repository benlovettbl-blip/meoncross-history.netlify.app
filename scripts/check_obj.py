import urllib.request, re
url = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9151053/figure/fig02/?report=objectonly'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')
imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
for img in imgs:
    print('ObjectOnly Img:', img)
links = re.findall(r'href=["\']([^"\']+)["\']', html)
for l in links:
    if any(ext in l.lower() for ext in ['.jpg', '.png', '.gif', '.tif', 'image']):
        print('Link:', l)
