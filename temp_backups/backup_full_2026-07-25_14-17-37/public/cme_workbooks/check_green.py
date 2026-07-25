from PIL import Image

img = Image.open("C:/Users/fives/.gemini/antigravity/brain/6afc17fc-c4f8-4208-91bb-00957afe130a/character_sheet_green_1780839852314.png")
print("Format:", img.format)
print("Size:", img.size)
print("Mode:", img.mode)

# Sample a few pixels to see the green values
width, height = img.size
pixels = img.convert('RGB')
colors = {}
for y in range(0, height, 10):
    for x in range(0, width, 10):
        r, g, b = pixels.getpixel((x, y))
        # bucket color
        color_key = (r // 16, g // 16, b // 16)
        colors[color_key] = colors.get(color_key, 0) + 1

# Print the most common colors
sorted_colors = sorted(colors.items(), key=lambda item: item[1], reverse=True)
print("Most common bucketed colors:")
for key, count in sorted_colors[:10]:
    print(f"  Color {tuple(c * 16 for c in key)}: {count}")
