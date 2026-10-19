import urllib.request
import re

url = 'https://www.cambridge.org/core/journals/epidemiology-and-infection/article/operation-pied-piper-a-geographical-reappraisal-of-the-impact-of-wartime-evacuation-on-scarlet-fever-and-diphtheria-rates-in-england-and-wales-19391945/4D8FA059639598DC5E385D65A2C189DC'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
        for img in imgs:
            if 'fig' in img.lower() or 'image' in img.lower() or 'large' in img.lower():
                print('CUP Image:', img)
except Exception as e:
    print('Error:', e)
