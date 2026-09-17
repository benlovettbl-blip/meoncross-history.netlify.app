import urllib.request
import os

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

urls = [
    ('public/images/hotel_dieu_hospital.jpg', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Int%C3%A9rieur_de_l%27ancien_H%C3%B4tel-Dieu%2C_PH3161.jpg'),
    ('public/images/pare_artificial_limbs.jpg', 'https://upload.wikimedia.org/wikipedia/commons/1/11/Ambroise_Pare%3B_prosthetics%2C_mechanical_arm_Wellcome_L0043497.jpg')
]

for dest, url in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            with open(dest, 'wb') as f:
                f.write(content)
        print(f'Saved {dest}: {os.path.getsize(dest)} bytes')
    except Exception as e:
        print(f'Failed {dest}: {e}')
