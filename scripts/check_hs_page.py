import urllib.request, re
url = 'https://www.historyskills.com/classroom/year-10/wwii-british-home-front/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    for i in imgs:
        print('Image:', i)
except Exception as e:
    print('Error:', e)
