from PIL import Image, ImageDraw, ImageFont

img_path = r'C:\Users\fives\.gemini\antigravity-ide\brain\e7ef5e95-188d-421a-92d5-7160b553ca08\pasteur_swan_neck_v2_1792160165274.jpg'
out_path = r'C:\Users\fives\.gemini\antigravity-ide\brain\e7ef5e95-188d-421a-92d5-7160b553ca08\pasteur_swan_neck_perfect.jpg'

img = Image.open(img_path).convert('RGB')
draw = ImageDraw.Draw(img)

# Clear the old top title bar (y: 10 to 74) with pure white
draw.rectangle([(10, 10), (1190, 74)], fill=(255, 255, 255))

# Load clean Windows fonts
try:
    font_title = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 30)
    font_sub = ImageFont.truetype(r'C:\Windows\Fonts\ariali.ttf', 17)
except Exception as e:
    print('Font error:', e)
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()

title_text = "Louis Pasteur’s 1861 Swan-Neck Flask Experiment"
sub_text = "Disproving Spontaneous Generation & Establishing the Germ Theory of Disease"

bbox_title = draw.textbbox((0, 0), title_text, font=font_title)
w_title = bbox_title[2] - bbox_title[0]
x_title = (1200 - w_title) // 2

bbox_sub = draw.textbbox((0, 0), sub_text, font=font_sub)
w_sub = bbox_sub[2] - bbox_sub[0]
x_sub = (1200 - w_sub) // 2

draw.text((x_title, 16), title_text, fill=(15, 23, 42), font=font_title)
draw.text((x_sub, 51), sub_text, fill=(71, 85, 105), font=font_sub)

img.save(out_path, quality=95)
print('Successfully saved pasteur_swan_neck_perfect.jpg')
