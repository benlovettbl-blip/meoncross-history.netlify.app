import urllib.request
import urllib.parse
import json
import time
import os

headers = {'User-Agent': 'GCSE History Hub/1.0 (educational; contact@historyhub.local)'}

queries = [
    ('hotel_dieu_hospital.jpg', 'Salle des malades de l\'Hôtel-Dieu de Paris'),
    ('pare_artificial_limbs.jpg', 'Ambroise Paré artificial limb Wellcome'),
    ('culpeper_herbal.jpg', 'The English physitian enlarged'),
    ('bill_of_mortality_1665.jpg', 'London Bills of Mortality 1665'),
    ('pasteur_swan_neck.jpg', 'Swan neck flask'),
    ('lister_carbolic_spray.jpg', 'Carbolic spray Lister'),
    ('trench_foot_clinical.jpg', 'Trench foot World War I'),
    ('brodie_helmet_shrapnel.jpg', 'Brodie helmet Imperial War Museum'),
    ('ww1_shrapnel_xray.jpg', 'World War I X-ray shrapnel'),
    ('casualty_clearing_station_ww1.jpg', 'Casualty Clearing Station Somme'),
    ('ramc_canal_barge.jpg', 'Ambulance barge World War I'),
    ('robertson_blood_depot_1917.jpg', 'Blood transfusion World War I 1917'),
    ('gillies_tubed_pedicle.jpg', 'Harold Gillies plastic surgery Queen\'s Hospital Sidcup')
]

for filename, q in queries:
    dest = os.path.join('public', 'images', filename)
    time.sleep(1.2)
    search_url = f'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrlimit=3&prop=pageimages&pithumbsize=600&format=json'
    req = urllib.request.Request(search_url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        thumb = None
        if 'query' in data and 'pages' in data['query']:
            for p in data['query']['pages'].values():
                if 'thumbnail' in p:
                    thumb = p['thumbnail']['source']
                    title = p.get('title')
                    print(f'{filename} found from {title}: {thumb}')
                    break
        if thumb:
            time.sleep(1.0)
            img_req = urllib.request.Request(thumb, headers=headers)
            with urllib.request.urlopen(img_req) as resp, open(dest, 'wb') as out_f:
                out_f.write(resp.read())
            print(f'Saved {dest} ({os.path.getsize(dest)} bytes)')
        else:
            print(f'No thumbnail found for {q}')
    except Exception as e:
        print(f'Error for {filename}: {e}')
