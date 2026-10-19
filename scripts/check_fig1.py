import urllib.request, re
url = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9151053/figure/fig01/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')
imgs = re.findall(r'https://cdn\.ncbi\.nlm\.nih\.gov/pmc/blobs/[^\s"\'\)]+', html)
print('Blobs:', imgs)
# caption
cap = re.search(r'<div class="caption"[^>]*>([\s\S]*?)</div>', html)
if cap:
    print('Caption:', cap.group(1)[:300])
