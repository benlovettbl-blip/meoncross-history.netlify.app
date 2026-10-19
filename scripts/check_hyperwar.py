import urllib.request, re
url = 'https://www.ibiblio.org/hyperwar/UN/UK/UK-Defence-UK/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
    maps = re.findall(r'href=["\']([^"\']*(?:map|Map|\.jpg|\.png|\.gif)[^"\']*)["\']', html)
    print('Maps found:')
    for m in set(maps):
        print(' ', m)
except Exception as e:
    print('Error:', e)
