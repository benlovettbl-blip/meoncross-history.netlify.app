import urllib.request, re
url = 'https://www.ibiblio.org/hyperwar/UN/UK/UK-Defence-UK/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')

# find lines with DefenseOfUk
lines = html.splitlines()
for l in lines:
    if 'DefenseOfUk' in l or 'DefenseOfUK' in l:
        clean = re.sub(r'<[^>]+>', ' ', l).strip()
        img = re.search(r'img/DefenseOfU[kK]-[0-9]+\.jpg', l)
        img_name = img.group(0) if img else ''
        print(f'{img_name:25}: {clean}')
