from PIL import Image, ImageDraw, ImageFont

# 1. Load original card and crop the pure archival photo
orig = Image.open('units/ks2_ww2/assets/het_law_card_school_ban_1938.png')
# Extract photo (X: 107 to 447, Y: 137 to 369)
photo = orig.crop((107, 137, 447, 369))
photo.save('units/ks2_ww2/assets/jewish_schoolchildren_berlin_schultuete_1930s.jpg', quality=95)
photo.save('public/units/ks2_ww2/assets/jewish_schoolchildren_berlin_schultuete_1930s.jpg', quality=95)
print('Extracted pure photo:', photo.size)

# 2. Build bespoke archival decree card (640 x 640)
card_w, card_h = 640, 640
card = Image.new('RGB', (card_w, card_h), '#ffffff')
draw = ImageDraw.Draw(card)

# Outer border
draw.rectangle([(0, 0), (card_w-1, card_h-1)], outline='#cbd5e1', width=2)

# Top header strip
font_tag = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 13)
font_title = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 20)
font_sub = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 13)
font_cap = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 12)
font_foot = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 12)
font_foot_sub = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 11)

# Tag pill
tag_text = 'HISTORICAL NOTICE • 15 NOVEMBER 1938'
tag_bbox = draw.textbbox((0, 0), tag_text, font=font_tag)
tag_w = tag_bbox[2] - tag_bbox[0]
pill_x1 = (card_w - tag_w) // 2 - 12
pill_x2 = pill_x1 + tag_w + 24
draw.rounded_rectangle([(pill_x1, 16), (pill_x2, 40)], radius=4, fill='#eff6ff', outline='#93c5fd', width=1)
draw.text(((card_w - tag_w) // 2, 21), tag_text, font=font_tag, fill='#1e40af')

# Decree Title (2 lines)
line1 = '"Jewish pupils are forbidden to attend'
line2 = 'German state schools."'
b1 = draw.textbbox((0, 0), line1, font=font_title)
b2 = draw.textbbox((0, 0), line2, font=font_title)
draw.text(((card_w - (b1[2]-b1[0])) // 2, 54), line1, font=font_title, fill='#0f172a')
draw.text(((card_w - (b2[2]-b2[0])) // 2, 80), line2, font=font_title, fill='#0f172a')

# Subtitle
sub_text = 'Reich Ministry of Education Decree • Berlin (15 November 1938)'
b_sub = draw.textbbox((0, 0), sub_text, font=font_sub)
draw.text(((card_w - (b_sub[2]-b_sub[0])) // 2, 114), sub_text, font=font_sub, fill='#64748b')

# Thin divider
draw.line([(40, 138), (card_w - 40, 138)], fill='#e2e8f0', width=1)

# Resize photo nicely to fit width ~480px (original aspect ratio 340:232 = 1.465)
new_pw = 480
new_ph = int(new_pw * (232 / 340))
photo_resized = photo.resize((new_pw, new_ph), Image.Resampling.LANCZOS)

# Paste photo centered
px = (card_w - new_pw) // 2
py = 152
# Photo border
draw.rectangle([(px - 2, py - 2), (px + new_pw + 1, py + new_ph + 1)], outline='#94a3b8', width=1)
card.paste(photo_resized, (px, py))

# Archival Caption under photo
cap_text = 'Pre-war Jewish schoolchildren holding traditional first-day school cones (Schultüten) in Berlin.'
b_cap = draw.textbbox((0, 0), cap_text, font=font_cap)
draw.text(((card_w - (b_cap[2]-b_cap[0])) // 2, py + new_ph + 10), cap_text, font=font_cap, fill='#475569')

# Bottom Strip
foot_y = 560
draw.rectangle([(0, foot_y), (card_w, card_h)], fill='#1e293b')
foot1 = 'THE HISTORY REVISION HUB • ARCHIVAL EVIDENCE SERIES'
b_f1 = draw.textbbox((0, 0), foot1, font=font_foot)
draw.text(((card_w - (b_f1[2]-b_f1[0])) // 2, foot_y + 16), foot1, font=font_foot, fill='#f8fafc')

foot2 = 'Documentary Evidence: Anti-Jewish School Exclusion Legislation (1933–1939)'
b_f2 = draw.textbbox((0, 0), foot2, font=font_foot_sub)
draw.text(((card_w - (b_f2[2]-b_f2[0])) // 2, foot_y + 40), foot2, font=font_foot_sub, fill='#94a3b8')

# Save to all asset locations
card.save('units/ks2_ww2/assets/school_ban_decree_november_1938.png', quality=95)
card.save('public/units/ks2_ww2/assets/school_ban_decree_november_1938.png', quality=95)
# Also overwrite het_law_card_school_ban_1938.png so existing references instantly show the clean card
card.save('units/ks2_ww2/assets/het_law_card_school_ban_1938.png', quality=95)
card.save('public/units/ks2_ww2/assets/het_law_card_school_ban_1938.png', quality=95)
card.save('units/ks2_ww2/worksheets/het_law_card_school_ban_1938.png', quality=95)
card.save('public/units/ks2_ww2/worksheets/het_law_card_school_ban_1938.png', quality=95)

print('Successfully generated bespoke archival notice card: 640x640')
