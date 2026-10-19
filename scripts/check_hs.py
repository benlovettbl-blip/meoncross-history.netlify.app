import urllib.request
import re

url = 'https://www.historyskills.com/classroom/year-10-history/operation-pied-piper/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
        for img in imgs:
            print('Img:', img)
except Exception as e:
    print('Error:', e)
