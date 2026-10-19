import urllib.request
import re

url = 'https://www.networkrail.co.uk/stories/operation-pied-piper/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
        for img in imgs:
            print('NetworkRail Img:', img)
except Exception as e:
    print('Error:', e)
