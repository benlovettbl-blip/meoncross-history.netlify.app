import os
import sys
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

width = 1600
height = 1100
image = Image.new('RGB', (width, height), '#f8fafc')
draw = ImageDraw.Draw(image)

# Colors
navy = '#0f172a'
blue = '#1e3a8a'
light_blue = '#eff6ff'
border_blue = '#3b82f6'
green = '#065f46'
light_green = '#ecfdf5'
border_green = '#10b981'
slate = '#334155'
light_slate = '#f1f5f9'
border_slate = '#64748b'
red = '#991b1b'
light_red = '#fef2f2'
border_red = '#ef4444'
gold = '#92400e'
light_gold = '#fffbeb'
border_gold = '#f59e0b'

# Fonts
def get_font(size, bold=False):
    font_paths = [
        "C:\\Windows\\Fonts\\arialbd.ttf" if bold else "C:\\Windows\\Fonts\\arial.ttf",
        "C:\\Windows\\Fonts\\calibrib.ttf" if bold else "C:\\Windows\\Fonts\\calibri.ttf",
        "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf",
    ]
    for p in font_paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

title_font = get_font(38, bold=True)
subtitle_font = get_font(20, bold=False)
box_title_font = get_font(22, bold=True)
badge_font = get_font(15, bold=True)
text_font = get_font(16, bold=False)
arrow_font = get_font(15, bold=True)

# Outer decorative border
draw.rectangle([(20, 20), (width - 20, height - 20)], outline='#cbd5e1', width=3)
draw.rectangle([(26, 26), (width - 26, height - 26)], outline='#e2e8f0', width=1)

# Header Masthead
draw.rectangle([(30, 30), (width - 30, 120)], fill='#0f172a')
draw.text((width // 2, 52), "THE RAMC CHAIN OF EVACUATION (1914–1918)", font=title_font, fill='#ffffff', anchor='mm')
draw.text((width // 2, 92), "BRITISH EXPEDITIONARY FORCE • OPERATIONAL STAGES OF BATTLEFIELD MEDICAL TRIAGE & TRANSPORT", font=subtitle_font, fill='#93c5fd', anchor='mm')

# 5 Stages Cards Layout
stages = [
    {
        "num": "STAGE 1",
        "title": "REGIMENTAL AID POST (RAP)",
        "distance": "Distance: 100–300 yards behind front line",
        "location": "Location: Dugouts, communication trenches, ruined cellars",
        "personnel": "Personnel: Regimental Medical Officer (RMO), 16 Battalion Stretcher Bearers",
        "functions": [
            "• Immediate battlefield triage & sorting of wounded men",
            "• Hemorrhage control using tourniquets & wound dressings",
            "• Routine preventative antitetanic serum (ATS) injection",
            "• Pain relief administration (morphine) & color tagging"
        ],
        "transport": "Stretcher Bearers / Hand Litter\n(Agonizing carry across mud & shellfire)",
        "bg": light_red, "border": border_red, "title_color": red
    },
    {
        "num": "STAGE 2",
        "title": "DRESSING STATIONS (ADS & MDS)",
        "distance": "Distance: ADS: 1,000 yards; MDS: 1–2 miles back",
        "location": "Location: Tented camps, concrete bunkers, farm buildings",
        "personnel": "Personnel: RAMC Field Ambulance (10 Medical Officers, 224 men)",
        "functions": [
            "• Re-inspection of bandages & alignment of splints",
            "• Treatment of acute surgical shock with warmth & hot beef tea",
            "• Emergency Thomas Splint application for femur fractures",
            "• Organization of motor ambulance convoys to rearward CCS"
        ],
        "transport": "Motor Ambulance Convoys / FANY\n(Choked rutted roads, unlit night driving)",
        "bg": light_gold, "border": border_gold, "title_color": gold
    },
    {
        "num": "STAGE 3",
        "title": "CASUALTY CLEARING STATION (CCS)",
        "distance": "Distance: 7–12 miles behind lines (railheads)",
        "location": "Location: Large wooden huts & marquees (500–1,000+ beds)",
        "personnel": "Personnel: Specialist surgeons, QAIMNS nurses, anesthetists",
        "functions": [
            "• URGENT LIFE-SAVING SURGERY: Within 'golden 12 hours'",
            "• Deep debridement & Carrel-Dakin wound irrigation",
            "• Mobile X-ray localization of deeply embedded shrapnel",
            "• Stored citrated blood transfusions for hemorrhagic shock"
        ],
        "transport": "Ambulance Trains & Canal Barges\n(Smooth vibration-free transport for chests/heads)",
        "bg": light_blue, "border": border_blue, "title_color": blue
    },
    {
        "num": "STAGE 4",
        "title": "BASE HOSPITALS (GENERAL HOSPITALS)",
        "distance": "Distance: Coastal ports (Boulogne, Calais, Le Havre, Rouen)",
        "location": "Location: Converted civilian hotels, casinos, large complexes",
        "personnel": "Personnel: Senior consulting surgeons, VAD volunteers, nurses",
        "functions": [
            "• Prolonged post-operative recovery & infection monitoring",
            "• Dedicated specialized wards: Chest wounds, amputations, gas",
            "• Secondary delayed wound closure after antisepsis",
            "• Evacuation triage: Fit for duty vs. return to 'Blighty'"
        ],
        "transport": "Hospital Ships (HMHS Britannic, Asturias)\n(Cross-Channel voyage under Red Cross convention)",
        "bg": light_green, "border": border_green, "title_color": green
    },
    {
        "num": "STAGE 5",
        "title": "SPECIALIST HOSPITALS ('BLIGHTY')",
        "distance": "Distance: United Kingdom (Home Military Hospitals)",
        "location": "Location: Dedicated national rehabilitation institutions",
        "personnel": "Personnel: Pioneer specialists (Harold Gillies, Robert Jones)",
        "functions": [
            "• Queen's Hospital, Sidcup: Reconstructive plastic surgery",
            "• Orthopedic centers: Rehabilitation & prosthetic limb fitting",
            "• Craiglockhart / Netley: Treatment for severe shellshock",
            "• Long-term convalescence depots & civilian reintegration"
        ],
        "transport": "Civilian Reintegration\n(Pensions, convalescence, or discharge)",
        "bg": light_slate, "border": border_slate, "title_color": slate
    }
]

box_width = 280
box_height = 800
gap = 25
start_x = 55
y_top = 160

for i, s in enumerate(stages):
    x = start_x + i * (box_width + gap)
    
    # Draw Stage Box
    draw.rounded_rectangle([(x, y_top), (x + box_width, y_top + box_height)], radius=8, fill=s["bg"], outline=s["border"], width=3)
    
    # Stage header pill
    draw.rounded_rectangle([(x + 12, y_top + 12), (x + box_width - 12, y_top + 45)], radius=4, fill=s["border"])
    draw.text((x + box_width // 2, y_top + 28), s["num"], font=badge_font, fill='#ffffff', anchor='mm')
    
    # Stage title
    lines = s["title"].split(' ')
    if len(lines) > 2:
        t_line1 = ' '.join(lines[:2])
        t_line2 = ' '.join(lines[2:])
        draw.text((x + box_width // 2, y_top + 65), t_line1, font=box_title_font, fill=s["title_color"], anchor='mm')
        draw.text((x + box_width // 2, y_top + 92), t_line2, font=box_title_font, fill=s["title_color"], anchor='mm')
        curr_y = y_top + 115
    else:
        draw.text((x + box_width // 2, y_top + 75), s["title"], font=box_title_font, fill=s["title_color"], anchor='mm')
        curr_y = y_top + 105
        
    draw.line([(x + 15, curr_y), (x + box_width - 15, curr_y)], fill='#cbd5e1', width=1)
    curr_y += 15
    
    # Distance & Location meta
    draw.text((x + 15, curr_y), s["distance"], font=get_font(13, bold=True), fill='#1e293b')
    curr_y += 24
    draw.text((x + 15, curr_y), s["location"], font=get_font(13, bold=False), fill='#475569')
    curr_y += 24
    draw.text((x + 15, curr_y), s["personnel"], font=get_font(13, bold=False), fill='#475569')
    curr_y += 32
    
    # Divider
    draw.line([(x + 15, curr_y), (x + box_width - 15, curr_y)], fill='#cbd5e1', width=1)
    curr_y += 15
    
    # Functions
    draw.text((x + 15, curr_y), "PRIMARY MEDICAL FUNCTIONS:", font=get_font(13, bold=True), fill=s["title_color"])
    curr_y += 24
    for fn in s["functions"]:
        # wrap function line if too long
        words = fn.split(' ')
        l1, l2 = "", ""
        for w in words:
            if len(l1 + " " + w) < 28:
                l1 += (" " if l1 else "") + w
            else:
                l2 += (" " if l2 else "") + w
        draw.text((x + 15, curr_y), l1, font=text_font, fill='#1e293b')
        curr_y += 22
        if l2:
            draw.text((x + 25, curr_y), l2, font=text_font, fill='#1e293b')
            curr_y += 22
        curr_y += 4
        
    # Transport connector at bottom
    t_box_y = y_top + box_height - 130
    draw.rounded_rectangle([(x + 10, t_box_y), (x + box_width - 10, y_top + box_height - 15)], radius=6, fill='#ffffff', outline='#94a3b8', width=1)
    draw.text((x + box_width // 2, t_box_y + 16), "TRANSIT TO NEXT STAGE:", font=get_font(12, bold=True), fill='#64748b', anchor='mm')
    t_lines = s["transport"].split('\n')
    draw.text((x + box_width // 2, t_box_y + 45), t_lines[0], font=get_font(13, bold=True), fill='#0f172a', anchor='mm')
    if len(t_lines) > 1:
        draw.text((x + box_width // 2, t_box_y + 75), t_lines[1], font=get_font(12, bold=False), fill='#64748b', anchor='mm')
        
    # Draw arrow between boxes
    if i < 4:
        arrow_x = x + box_width + 4
        arrow_y = y_top + box_height // 2
        draw.polygon([(arrow_x, arrow_y - 8), (arrow_x + 14, arrow_y), (arrow_x, arrow_y + 8)], fill='#3b82f6')

# Footer
draw.text((width // 2, height - 45), "ARCHIVAL SCHEMATIC • THE HISTORY REVISION HUB • GCSE REPROGRAPHIC STANDARD (EDEXCEL PAPER 1 SECTION A)", font=get_font(14, bold=True), fill='#64748b', anchor='mm')

output_path = 'public/images/ramc_chain_of_evacuation.jpg'
image.save(output_path, 'JPEG', quality=95)
print(f"[OK] Generated authentic RAMC Chain of Evacuation Diagram: {output_path} ({os.path.getsize(output_path):,} bytes)")
