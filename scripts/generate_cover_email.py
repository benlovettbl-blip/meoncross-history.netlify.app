import os
import sys
import json
import argparse
import urllib.parse
from datetime import datetime, date, timedelta

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TIMETABLE_FILE = os.path.join(ROOT_DIR, "scripts", "timetable_data.json")
EMAILS_DIR = r"G:\My Drive\AAMX\Dep File\Emails"
LOCAL_COVER_DIR = os.path.join(ROOT_DIR, "admin_internal", "cover_emails")

# Default unit & lesson mapping per set
DEFAULT_SET_MAPPING = {
    "Set 7XHi": {
        "year": "Year 7",
        "room": "18",
        "unit": "water_and_sanitation",
        "unit_name": "KS3: Water & Sanitation Through Time",
        "default_lesson": 1,
        "default_topic": "Why did public health decline during the Middle Ages?",
        "resource": "workbooks",
        "shelf": True,
        "collection": "collect",
        "notes": "Pupils should work in their printed Water & Sanitation workbooks."
    },
    "Set 7YHi": {
        "year": "Year 7",
        "room": "17",
        "unit": "water_and_sanitation",
        "unit_name": "KS3: Water & Sanitation Through Time",
        "default_lesson": 1,
        "default_topic": "Why did public health decline during the Middle Ages?",
        "resource": "workbooks",
        "shelf": True,
        "collection": "collect",
        "notes": "Pupils should work in their printed Water & Sanitation workbooks."
    },
    "Set 8xHi": {
        "year": "Year 8",
        "room": "11",
        "unit": "industrialisation_and_empire",
        "unit_name": "KS3: Industrialisation, Empire & Power (1750–1900)",
        "default_lesson": 0,
        "default_topic": "The Agricultural Revolution & Origins of Industry",
        "resource": "workbooks",
        "shelf": True,
        "collection": "collect",
        "notes": "Pupils have workbooks in the classroom cupboard. Zero-noise individual study."
    },
    "Set 8yHi": {
        "year": "Year 8",
        "room": "11",
        "unit": "industrialisation_and_empire",
        "unit_name": "KS3: Industrialisation, Empire & Power (1750–1900)",
        "default_lesson": 0,
        "default_topic": "The Agricultural Revolution & Origins of Industry",
        "resource": "workbooks",
        "shelf": True,
        "collection": "collect",
        "notes": "Pupils have workbooks in the classroom cupboard. Zero-noise individual study."
    },
    "Set 9xHi": {
        "year": "Year 9",
        "room": "19",
        "unit": "great_war",
        "unit_name": "KS3: Causes of the Great War",
        "default_lesson": 2,
        "default_topic": "To what extent did the 'Scramble for Africa' increase tension in Europe?",
        "resource": "workbooks",
        "shelf": True,
        "collection": "collect",
        "notes": "High expectations for written evidence and causal connectives."
    },
    "Set 9yHi": {
        "year": "Year 9",
        "room": "20",
        "unit": "great_war",
        "unit_name": "KS3: Causes of the Great War",
        "default_lesson": 2,
        "default_topic": "To what extent did the 'Scramble for Africa' increase tension in Europe?",
        "resource": "workbooks",
        "shelf": True,
        "collection": "collect",
        "notes": "High expectations for written evidence and causal connectives."
    },
    "Set 10aHiB": {
        "year": "Year 10",
        "room": "7",
        "unit": "cme_new",
        "unit_name": "Paper 2: Conflict in the Middle East (1945–1995)",
        "default_lesson": 2,
        "default_topic": "KT 1.2: The Aftermath of the 1948–49 War & The Palestinian Refugee Crisis",
        "resource": "workbooks",
        "shelf": False,
        "collection": "folders",
        "notes": "Pupils should work in their printed physical workbooks."
    },
    "Set 11aHiC": {
        "year": "Year 11",
        "room": "5",
        "unit": "edexcel_medicine",
        "unit_name": "Paper 1: Medicine Through Time (1250–present)",
        "default_lesson": 5,
        "default_topic": "KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society (c1500–c1700)",
        "resource": "workbooks",
        "shelf": True,
        "collection": "folders",
        "notes": "Year 11 GCSE exam group. Silent independent revision and exam practice."
    },
    "Set 11aHiD": {
        "year": "Year 11",
        "room": "7",
        "unit": "edexcel_medicine",
        "unit_name": "Paper 1: Medicine Through Time (1250–present)",
        "default_lesson": 5,
        "default_topic": "KT2.1: The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society (c1500–c1700)",
        "resource": "laptops",
        "shelf": False,
        "collection": "folders",
        "notes": "Year 11 GCSE exam group. Pupils use laptops as textbooks."
    }
}

HUB_BASE_URL = "https://the-history-revision-hub.netlify.app"

def load_timetable():
    if not os.path.exists(TIMETABLE_FILE):
        return None
    with open(TIMETABLE_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_cover_plan(week, day, overrides=None, target_date=None, period_filter=None, is_tomorrow=False, when_word=None, general_note="All cover set on VLE; please allow pupils to use laptops as textbooks only."):
    overrides = overrides or {}
    tt = load_timetable()
    if not tt or week not in tt or day not in tt[week]:
        return None

    schedule = tt[week][day]
    day_duties = tt.get("duties", {}).get(day, [])
    
    parsed_filter = None
    if period_filter:
        if isinstance(period_filter, str):
            parsed_filter = [p.strip().lower().replace("period", "").strip() for p in period_filter.split(",") if p.strip()]
        elif isinstance(period_filter, (list, tuple)):
            parsed_filter = [str(p).strip().lower().replace("period", "").strip() for p in period_filter]
    
    if target_date is not None:
        date_str = target_date.strftime("%d %B %Y")
        date_tag = target_date.strftime("%Y-%m-%d")
    else:
        date_str = datetime.now().strftime("%d %B %Y")
        date_tag = datetime.now().strftime("%Y-%m-%d")
        
    resolved_when = when_word or ("tomorrow" if is_tomorrow else "today")
    
    plan = {
        "week": week,
        "day": day,
        "date_str": date_str,
        "date_tag": date_tag,
        "when_word": resolved_when,
        "tutor_group": "Warrior 2",
        "tutor_times": "AM (08:45–09:10) & PM Mobile Collection (15:50–15:55)",
        "duties": day_duties,
        "general_note": general_note,
        "periods": []
    }
    
    for item in schedule:
        raw = item["raw"]
        period = item["period"]
        p_num = period.lower().replace("period", "").strip()
        if parsed_filter and p_num not in parsed_filter and period.lower() not in parsed_filter:
            continue
        time_slot = item["time"]
        item_type = item.get("type", "lesson")
        
        if item_type == "hub":
            plan["periods"].append({
                "period": period,
                "time": time_slot,
                "type": "hub",
                "title": "Hub Supervision",
                "notes": "SUPERVISION ONLY — NO COVER WORK TO SET. A cover teacher is required for student supervision only; no subject teaching or history work is needed."
            })
            continue
            
        if item_type == "club":
            plan["periods"].append({
                "period": period,
                "time": time_slot,
                "type": "club",
                "title": "Chess Club",
                "notes": "Chess sets are located in the classroom cupboard. Pupils should be paired up for quiet chess games."
            })
            continue
            
        # Parse Class / Set
        lines = [l.strip() for l in raw.split('\n') if l.strip()]
        set_name = lines[0] if lines else "History Class"
        room = ""
        for line in lines:
            if line.startswith("(") and line.endswith(")"):
                room = line.strip("()")
                
        set_info = DEFAULT_SET_MAPPING.get(set_name, {
            "year": "History Group",
            "room": room or "History Room",
            "unit": "edexcel_medicine",
            "unit_name": "History Study",
            "default_lesson": 0,
            "default_topic": "Key Historical Enquiry",
            "resource": "workbooks",
            "shelf": True,
            "collection": "collect",
            "notes": "Pupils complete independent study."
        })
        
        # Check overrides
        class_override = overrides.get(set_name, {})
        unit_id = class_override.get("unit", set_info["unit"])
        lesson_idx = class_override.get("lesson", set_info["default_lesson"])
        topic_name = class_override.get("topic", set_info["default_topic"])
        custom_instructions = class_override.get("instructions", None)
        res_mode = class_override.get("resource", set_info.get("resource", "workbooks"))
        shelf = class_override.get("shelf", set_info.get("shelf", True))
        col = class_override.get("collection", set_info.get("collection", "collect"))
        
        live_app_url = f"{HUB_BASE_URL}/?unit={unit_id}&lesson={lesson_idx}"
        quiz_url = f"{HUB_BASE_URL}/?unit={unit_id}&lesson={lesson_idx}&quiz=true"
        
        plan["periods"].append({
            "period": period,
            "time": time_slot,
            "type": "lesson",
            "set_name": set_name,
            "year": set_info["year"],
            "room": room or set_info["room"],
            "unit_id": unit_id,
            "unit_name": set_info["unit_name"],
            "lesson_idx": lesson_idx,
            "topic_name": topic_name,
            "resource": res_mode,
            "shelf": shelf,
            "collection": col,
            "live_url": live_app_url,
            "quiz_url": quiz_url,
            "teacher_notes": set_info["notes"],
            "custom_instructions": custom_instructions
        })
        
    return plan

def render_email_text(plan, recipient=None, sender=None):
    recip = recipient.strip() if recipient and recipient.strip() else "Paul"
    send = sender.strip() if sender and sender.strip() else "Ben"
    lines = []
    lines.append(f"Dear {recip},")
    when_word = plan.get("when_word", "today")
    lines.append(f"Please find below the cover for {when_word}, {plan['day']}, {plan['date_str']} ({plan['week']}).")
    lines.append(f"Tutor AM / PM {plan.get('tutor_group', 'Warrior 2')}")
    
    if plan.get("duties"):
        duty_strs = [f"{d['time']} ({d['duty']})" for d in plan["duties"]]
        duties_line = f"Duties: {'; '.join(duty_strs)}"
    else:
        duties_line = "Duties: none"

    gen_note = plan.get("general_note")
    if gen_note:
        lines.append(f"{duties_line} {gen_note.strip()}")
    else:
        lines.append(duties_line)

    for p in plan["periods"]:
        if p["type"] == "hub":
            lines.append(f"{p['period'].upper()} ({p['time']}) — HUB SUPERVISION")
            lines.append("SUPERVISION ONLY — NO COVER WORK TO SET")
            continue
            
        if p["type"] == "club":
            lines.append(f"{p['period'].upper()} ({p['time']}) — {p['title'].upper()}")
            lines.append("SUPERVISION ONLY — NO COVER WORK TO SET")
            continue
            
        # Lesson
        lines.append(f"▶ {p['period'].upper()} ({p['time']}) — {p['set_name']}")
        lines.append(f"Topic: {p['topic_name']} ({p['unit_name']}) [{p['live_url']}]")

        res = p.get("resource", "workbooks")
        shelf = p.get("shelf", True)
        col = p.get("collection", "collect")

        if res == "laptops" or res == "none":
            pass
        elif res == "paper":
            lines.append("Resources: Paper only — pupils complete all work on lined A4 paper.")
        else:
            if shelf:
                lines.append("Resources: Printed physical workbooks — please hand out from classroom shelf and ensure all are returned to shelf at end.")
            else:
                lines.append("Resources: Pupils should work in their printed physical workbooks.")

        if col == "folders":
            lines.append("Work Collection: Pupils keep completed work in their books/folders for next lesson.")
        elif col == "digital":
            lines.append("Work Collection: Pupils submit work digitally via Google Classroom / VLE.")
        else:
            lines.append("Work Collection: Please collect all pupil work at the end of the period.")

    lines.append("Early Finishers: Pupils should navigate to the Revision Zone flashcards or Living Timeline challenge on the platform.")
    lines.append("Thanks")
    lines.append(send)
    
    return "\n".join(lines)

def save_cover_package(plan, recipient=None, sender=None):
    body_text = render_email_text(plan, recipient, sender)
    subject = f"COVER: History - {plan['day']}, {plan['date_str']} ({plan['week']})"
    
    os.makedirs(LOCAL_COVER_DIR, exist_ok=True)
    if os.path.exists(EMAILS_DIR):
        os.makedirs(EMAILS_DIR, exist_ok=True)
        
    date_tag = plan.get("date_tag", datetime.now().strftime("%Y-%m-%d"))
    base_name = f"Cover_History_{date_tag}_{plan['week'].replace(' ', '_')}_{plan['day']}"
    
    local_txt = os.path.join(LOCAL_COVER_DIR, f"{base_name}.txt")
    with open(local_txt, 'w', encoding='utf-8') as f:
        f.write(body_text)
        
    local_eml = os.path.join(LOCAL_COVER_DIR, f"{base_name}.eml")
    eml_to = recipient.strip() if recipient and recipient.strip() else "Cover Manager / SLT"
    eml_content = f"""From: The History Department <history@hub.local>
To: {eml_to}
Subject: {subject}
Date: {datetime.now().strftime("%a, %d %b %Y %H:%M:%S +0100")}
MIME-Version: 1.0
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: 8bit

{body_text}
"""
    with open(local_eml, 'w', encoding='utf-8') as f:
        f.write(eml_content)
        
    if os.path.exists(EMAILS_DIR):
        g_txt = os.path.join(EMAILS_DIR, f"{base_name}.txt")
        g_eml = os.path.join(EMAILS_DIR, f"{base_name}.eml")
        with open(g_txt, 'w', encoding='utf-8') as f:
            f.write(body_text)
        with open(g_eml, 'w', encoding='utf-8') as f:
            f.write(eml_content)
            
    # HTML Launcher
    encoded_subj = urllib.parse.quote(subject)
    encoded_body = urllib.parse.quote(body_text)
    mailto_link = f"mailto:?subject={encoded_subj}&body={encoded_body}"
    gmail_link = f"https://mail.google.com/mail/?view=cm&fs=1&su={encoded_subj}&body={encoded_body}"
    outlook_link = f"https://outlook.office.com/mail/deeplink/compose?subject={encoded_subj}&body={encoded_body}"
    
    html_launcher = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{subject}</title>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; padding: 24px; margin: 0; }}
    .container {{ max-width: 820px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.08); padding: 32px; border: 1px solid #e2e8f0; }}
    h1 {{ font-size: 1.45rem; color: #1e3a8a; margin-top: 0; }}
    .actions {{ display: flex; gap: 12px; margin: 20px 0; flex-wrap: wrap; }}
    .btn {{ background: #2563eb; color: #ffffff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; text-decoration: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-size: 0.95rem; }}
    .btn:hover {{ background: #1d4ed8; }}
    .btn-secondary {{ background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }}
    .btn-secondary:hover {{ background: #e2e8f0; }}
    pre {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; white-space: pre-wrap; font-size: 0.95rem; line-height: 1.55; color: #1e293b; font-family: Consolas, monospace; }}
  </style>
</head>
<body>
  <div class="container">
    <h1>📋 {subject}</h1>
    <p style="color: #64748b; font-size: 0.9rem;">Confidential departmental emergency cover draft. Stored 100% locally on your machine.</p>
    <div class="actions">
      <button class="btn" onclick="navigator.clipboard.writeText(document.getElementById('email-content').innerText); alert('Email text copied to clipboard!');">📋 Copy Email Text</button>
      <a class="btn btn-secondary" href="{mailto_link}">✉️ Open in Default Mail Client</a>
      <a class="btn btn-secondary" href="{outlook_link}" target="_blank">📧 Open in Outlook Web</a>
      <a class="btn btn-secondary" href="{gmail_link}" target="_blank">✉️ Open in Gmail</a>
    </div>
    <pre id="email-content">{body_text}</pre>
  </div>
</body>
</html>
"""
    local_html = os.path.join(LOCAL_COVER_DIR, f"{base_name}.html")
    with open(local_html, 'w', encoding='utf-8') as f:
        f.write(html_launcher)
    if os.path.exists(EMAILS_DIR):
        g_html = os.path.join(EMAILS_DIR, f"{base_name}.html")
        with open(g_html, 'w', encoding='utf-8') as f:
            f.write(html_launcher)
            
    return {
        "subject": subject,
        "txt_path": local_txt,
        "eml_path": local_eml,
        "html_path": local_html,
        "gdrive_path": os.path.join(EMAILS_DIR, f"{base_name}.html") if os.path.exists(EMAILS_DIR) else None,
        "body_text": body_text
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate History Cover Email")
    parser.add_argument("--week", choices=["Week A", "Week B"], default="Week A", help="Week A or Week B")
    parser.add_argument("--day", choices=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], default=None, help="Day of the week")
    parser.add_argument("--tomorrow", action="store_true", help="Generate cover for tomorrow")
    parser.add_argument("--when", choices=["today", "tomorrow"], default=None, help="Force 'today' or 'tomorrow' phrasing")
    parser.add_argument("--date", default=None, help="Specific date e.g. '22 September 2026' or '2026-09-22'")
    parser.add_argument("--periods", default=None, help="Comma-separated periods to include e.g. '1,3' or '3'")
    parser.add_argument("--recipient", default="Paul", help="Recipient name (defaults to 'Paul')")
    parser.add_argument("--sender", default="Ben", help="Sender name (defaults to 'Ben')")
    parser.add_argument("--general-note", default="All cover set on VLE; please allow pupils to use laptops as textbooks only.", help="General instructions appended to duties line")
    args = parser.parse_args()
    
    target_date = None
    is_tomorrow = bool(args.tomorrow)
    if args.tomorrow:
        target_date = datetime.now() + timedelta(days=1)
        if not args.day:
            args.day = target_date.strftime("%A")
    elif args.date:
        for fmt in ("%Y-%m-%d", "%d %B %Y", "%d/%m/%Y", "%d-%m-%Y"):
            try:
                target_date = datetime.strptime(args.date, fmt)
                break
            except ValueError:
                pass
        if target_date and not args.day:
            args.day = target_date.strftime("%A")
            
    if args.day and not target_date:
        days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        today = datetime.now()
        today_idx = today.weekday()
        if args.day in days_of_week:
            target_idx = days_of_week.index(args.day)
            delta = (target_idx - today_idx) % 7
            target_date = today + timedelta(days=delta)
            if delta == 1:
                is_tomorrow = True
                
    if not args.day:
        args.day = datetime.now().strftime("%A")
        if args.day in ["Saturday", "Sunday"]:
            args.day = "Monday"
            # Default to next Monday if run on weekend
            days_ahead = 1 if args.day == "Sunday" else 2
            target_date = datetime.now() + timedelta(days=days_ahead)
            
    plan = generate_cover_plan(args.week, args.day, target_date=target_date, period_filter=args.periods, is_tomorrow=is_tomorrow, when_word=args.when, general_note=args.general_note)
    if not plan:
        print(f"Error: Could not find timetable for {args.week} {args.day}")
        sys.exit(1)
        
    pkg = save_cover_package(plan, args.recipient, args.sender)
    print("=" * 65)
    print(f"✅ Cover Package Generated for {args.week} {args.day} ({plan['date_str']})!")
    print(f"Subject: {pkg['subject']}")
    print(f"Local HTML Launcher: {pkg['html_path']}")
    if pkg['gdrive_path']:
        print(f"Google Drive Path:   {pkg['gdrive_path']}")
    print("=" * 65)
    print("\nEMAIL PREVIEW:\n")
    print(pkg["body_text"])
