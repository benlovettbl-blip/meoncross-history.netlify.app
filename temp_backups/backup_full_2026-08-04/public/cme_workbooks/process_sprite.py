from PIL import Image

def process_sprite():
    # Load the image
    img = Image.open("C:/Users/fives/.gemini/antigravity/brain/6afc17fc-c4f8-4208-91bb-00957afe130a/character_sheet_green_1780839852314.png")
    img = img.convert("RGBA")
    width, height = img.size
    
    # Process pixels
    data = img.getdata()
    new_data = []
    
    # Chroma-key threshold
    # Pure green is (0, 240, 0)
    for item in data:
        r, g, b, a = item
        # If green is dominant, make it transparent
        if g > 130 and g > r * 1.25 and g > b * 1.25:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append((r, g, b, 255))
            
    img.putdata(new_data)
    
    # Calculate bounding box of non-transparent pixels
    bbox = img.getbbox()
    if not bbox:
        print("Error: No character found in image!")
        return
        
    min_x, min_y, max_x, max_y = bbox
    print(f"Calculated bounding box: {bbox}")
    
    # Crop to character bounds
    cropped = img.crop((min_x, min_y, max_x, max_y))
    c_w, c_h = cropped.size
    
    # Divide into 4 horizontal frames
    frame_w = c_w / 4
    
    # Create final sprite sheet
    final_sheet = Image.new("RGBA", (256, 128), (0, 0, 0, 0))
    
    for i in range(4):
        # Calculate sub-coordinates
        x0 = int(i * frame_w)
        y0 = 0
        x1 = int((i + 1) * frame_w)
        y1 = c_h
        
        frame_crop = cropped.crop((x0, y0, x1, y1))
        # Resize to 64x128
        resized_frame = frame_crop.resize((64, 128), Image.Resampling.LANCZOS)
        # Paste into final sheet
        final_sheet.paste(resized_frame, (i * 64, 0))
        
    # Save the output
    final_sheet.save("public/character_sheet.png", "PNG")
    print("Successfully processed and saved public/character_sheet.png")

if __name__ == "__main__":
    process_sprite()
