import urllib.request
import urllib.parse
import json
import time

headers = {'User-Agent': 'GCSE History Hub/1.0 (educational; contact@historyhub.local)'}

searches = [
    ('hotel_dieu_hospital.jpg', 'Salle des malades de l\'Hotel-Dieu de Paris'),
    ('hotel_dieu_hospital.jpg', 'Livre de vie active Hotel-Dieu'),
    ('pare_artificial_limbs.jpg', 'Artificial hand 16th century Wellcome L0012015'),
    ('pare_artificial_limbs.jpg', 'Pare artificial limb Wellcome'),
    ('lister_carbolic_spray.jpg', 'Carbolic spray in use during an operation Wellcome'),
    ('ww1_shrapnel_xray.jpg', 'X-ray compound fracture femur Wellcome'),
    ('casualty_clearing_station_ww1.jpg', 'Casualty Clearing Station 1916 IWM'),
    ('ramc_chain_of_evacuation.jpg', 'Chain of evacuation Western Front RAMC'),
    ('gillies_tubed_pedicle.jpg', 'Harold Gillies Queen\'s Hospital Sidcup')
]

for target, term in searches:
    time.sleep(1.0)
    url = f'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(term)}&gsrlimit=3&prop=pageimages&pithumbsize=600&format=json'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        if 'query' in data and 'pages' in data['query']:
            for p in data['query']['pages'].values():
                if 'thumbnail' in p:
                    title = p.get('title')
                    src = p['thumbnail']['source']
                    print(f'{target} -> {title}: {src}')
    except Exception as e:
        print('Error:', e)
