import urllib.request
import urllib.parse
import json
import time

def fetch_exact_image(file_name, out_path):
    headers = {'User-Agent': 'MeoncrossHistoryApp/1.0 (test4@test.com)'}
    
    try:
        # Now get the url
        img_req_url = f"https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=File:{urllib.parse.quote(file_name)}&format=json"
        req2 = urllib.request.Request(img_req_url, headers=headers)
        
        response2 = urllib.request.urlopen(req2)
        data2 = json.loads(response2.read().decode('utf-8'))
        
        pages = data2.get('query', {}).get('pages', {})
        page_id = list(pages.keys())[0]
        
        if page_id == "-1":
            print(f"No image info for {file_name}")
            return
            
        img_url = pages[page_id]['imageinfo'][0]['url']
        print(f"Downloading {img_url} to {out_path}...")
        
        req3 = urllib.request.Request(img_url, headers=headers)
        img_data = urllib.request.urlopen(req3).read()
        
        with open(out_path, 'wb') as f:
            f.write(img_data)
            
        print("Success!\n")
        time.sleep(1) # prevent rate limit
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fetch_exact_image('Alsace Lorraine departments evolution map-en.svg', 'great_war/assets/alsace_lorraine_simple_map.svg')
    fetch_exact_image('Sir J. Harington, Diagram of the water-closet Wellcome M0012969.jpg', 'water_and_sanitation/assets/harington_toilet.jpg')
    fetch_exact_image('Snow-cholera-map-1.jpg', 'water_and_sanitation/assets/snow_cholera_map.jpg')
    fetch_exact_image('London Sewage system being built in 1860.jpg', 'water_and_sanitation/assets/bazalgette_sewer.jpg')
