import urllib.request
import re

req = urllib.request.Request(
    'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9151053/figure/fig02/',
    headers={'User-Agent': 'Mozilla/5.0'}
)
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
        for img in imgs:
            print('Image:', img)
        # Also check for large image link
        links = re.findall(r'href=["\']([^"\']+\.(?:jpg|jpeg|png|gif))["\']', html)
        for l in links:
            print('Link to image:', l)
except Exception as e:
    print('Error:', e)
