import urllib.request
import os

req1 = urllib.request.Request(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Henry_A._Kissinger%2C_U.S._Secretary_of_State%2C_1973-1977.jpg/500px-Henry_A._Kissinger%2C_U.S._Secretary_of_State%2C_1973-1977.jpg',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
)
with urllib.request.urlopen(req1) as response:
    data = response.read()
    with open('./public/units/cme_new/assets/henry_kissinger.jpg', 'wb') as f:
        f.write(data)

req2 = urllib.request.Request(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Theodor_Herzl_%283x4_cropped%29.jpg/500px-Theodor_Herzl_%283x4_cropped%29.jpg',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
)
with urllib.request.urlopen(req2) as response:
    data = response.read()
    with open('./public/units/cme_new/assets/theodor_herzl.jpg', 'wb') as f:
        f.write(data)

req3 = urllib.request.Request(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Benjamin_Netanyahu%2C_February_2023.jpg/500px-Benjamin_Netanyahu%2C_February_2023.jpg',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
)
with urllib.request.urlopen(req3) as response:
    data = response.read()
    with open('./public/units/cme_new/assets/benjamin_netanyahu.jpg', 'wb') as f:
        f.write(data)

print("Images downloaded successfully.")
