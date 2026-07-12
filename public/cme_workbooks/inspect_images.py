from PIL import Image

def inspect(name, path):
    try:
        img = Image.open(path)
        print(f"=== {name} ===")
        print(f"Format: {img.format}")
        print(f"Size: {img.size}")
        print(f"Mode: {img.mode}")
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            # Check if there are any transparent pixels (alpha < 255)
            # We can sample a few pixels or load data
            alpha = img.convert('RGBA').split()[-1]
            extrema = alpha.getextrema()
            print(f"Alpha channel range: {extrema}")
            # Count pixels with alpha < 255
            non_opaque = sum(1 for p in alpha.getdata() if p < 255)
            print(f"Non-opaque pixels count: {non_opaque} / {len(alpha.getdata())}")
        else:
            print("No transparency channel")
    except Exception as e:
        print(f"Error inspecting {name}: {e}")

inspect("User Girl Crop", "C:/Users/fives/.gemini/antigravity/brain/6afc17fc-c4f8-4208-91bb-00957afe130a/media__1780839566599.png")
inspect("Generated Girl Walk", "C:/Users/fives/.gemini/antigravity/brain/6afc17fc-c4f8-4208-91bb-00957afe130a/character_sheet_girl_1780839600547.png")
