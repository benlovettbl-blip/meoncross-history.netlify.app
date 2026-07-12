from PIL import Image

img = Image.open("C:/Users/fives/.gemini/antigravity/brain/6afc17fc-c4f8-4208-91bb-00957afe130a/character_sheet_green_1780839852314.png")
width, height = img.size
pixels = img.convert('RGB')

# We want to find the min and max X and Y for all non-green pixels.
# Let's define green as g > 150 and r < 100 and b < 100
min_x, min_y = width, height
max_x, max_y = 0, 0

for y in range(height):
    for x in range(width):
        r, g, b = pixels.getpixel((x, y))
        is_green = g > 180 and r < 100 and b < 100
        if not is_green:
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

print(f"Bounding box of character: min_x={min_x}, min_y={min_y}, max_x={max_x}, max_y={max_y}")
print(f"Width: {max_x - min_x}, Height: {max_y - min_y}")
