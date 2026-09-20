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
        "unit": "medieval_england",
        "unit_name": "Medieval England (1066–1485)",
        "default_lesson": 0,
        "default_topic": "The Norman Conquest & Battle of Hastings",
        "notes": "Pupils should work in their printed Medieval England workbooks or on school Chromebooks."
    },
    "Set 7YHi": {
        "year": "Year 7",
        "room": "17",
        "unit": "medieval_england",
        "unit_name": "Medieval England (1066–1485)",
        "default_lesson": 0,
        "default_topic": "The Norman Conquest & Battle of Hastings",
        "notes": "Pupils should work in their printed Medieval England workbooks or on school Chromebooks."
    },
    "Set 8xHi": {
        "year": "Year 8",
        "room": "11",
        "unit": "industrialisation_and_empire",
        "unit_name": "Industrialisation, Empire, and Power (1750–1900)",
        "default_lesson": 0,
        "default_topic": "The Agricultural Revolution & Origins of Industry",
        "notes": "Pupils have workbooks in the classroom cupboard. Zero-noise individual study."
    },
    "Set 8yHi": {
        "year": "Year 8",
        "room": "11",
        "unit": "industrialisation_and_empire",
        "unit_name": "Industrialisation, Empire, and Power (1750–1900)",
        "default_lesson": 0,
        "default_topic": "The Agricultural Revolution & Origins of Industry",
        "notes": "Pupils have workbooks in the classroom cupboard. Zero-noise individual study."
    },
    "Set 9xHi": {
        "year": "Year 9",
        "room": "19",
        "unit": "great_war",
        "unit_name": "The Great War (1914–1919)",
        "default_lesson": 0,
        "default_topic": "The Long-Term Causes of the First World War (MAIN)",
        "notes": "High expectations for written evidence and causal connectives."
    },
    "Set 9yHi": {
        "year": "Year 9",
        "room": "20",
        "unit": "great_war",
        "unit_name": "The Great War (1914–1919)",
        "default_lesson": 0,
        "default_topic": "The Long-Term Causes of the First World War (MAIN)",
        "notes": "High expectations for written evidence and causal connectives."
    },
    "Set 10aHiB": {
        "year": "Year 10",
        "room": "7",
        "unit": "edexcel_medicine",
        "unit_name": "Edexcel GCSE Paper 1: Medicine Through Time",
        "default_lesson": 0,
        "default_topic": "Medieval Ideas on Cause of Disease (Hippocrates & Galen)",
        "notes": "GCSE cohort. Pupils must complete the Do Now, Guided Masterclass, and 8-Question Digital Retrieval Quiz."
    },
    "Set 11aHiC": {
        "year": "Year 11",
        "room": "5",
        "unit": "weimar_nazi_germany",
        "unit_name": "Edexcel GCSE Paper 3: Weimar and Nazi Germany (1918–1939)",
        "default_lesson": 0,
        "default_topic": "The Legacy of the First World War & The Weimar Constitution",
        "notes": "Year 11 GCSE exam group. Silent independent revision and exam practice."
    },
    "Set 11aHiD": {
        "year": "Year 11",
        "room": "7",
        "unit": "weimar_nazi_germany",
        "unit_name": "Edexcel GCSE Paper 3: Weimar and Nazi Germany (1918–1939)",
        "default_lesson": 0,
        "default_topic": "The Legacy of the First World War & The Weimar Constitution",
        "notes": "Year 11 GCSE exam group. Silent independent revision and exam practice."
    }
}

HUB_BASE_URL = "https://the-history-revision-hub.netlify.app"

def load_timetable():
    if not os.path.exists(TIMETABLE_FILE):
        return None
    with open(TIMETABLE_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_cover_plan(week, day, overrides=None, target_date=None, period_filter=None):
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
    
    plan = {
        "week": week,
        "day": day,
        "date_str": date_str,
        "date_tag": date_tag,
        "tutor_group": "Warrior 2",
        "tutor_times": "AM (08:45–09:10) & PM Mobile Collection (15:50–15:55)",
        "duties": day_duties,
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
            "notes": "Pupils complete independent study."
        })
        
        # Check overrides
        class_override = overrides.get(set_name, {})
        unit_id = class_override.get("unit", set_info["unit"])
        lesson_idx = class_override.get("lesson", set_info["default_lesson"])
        topic_name = class_override.get("topic", set_info["default_topic"])
        custom_instructions = class_override.get("instructions", None)
        
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
            "live_url": live_app_url,
            "quiz_url": quiz_url,
            "teacher_notes": set_info["notes"],
            "custom_instructions": custom_instructions
        })
        
    return plan

def render_email_text(plan, recipient=None):
    lines = []
    if recipient and recipient.strip():
        lines.append(f"Dear {recipient.strip()},")
    else:
        lines.append("Dear ,")
    lines.append(f"Please find below the emergency cover schedule and lesson plans for today, {plan['day']}, {plan['date_str']} ({plan['week']}).")
    lines.append(f"Tutor AM / PM {plan.get('tutor_group', 'Warrior 2')}")
    
    if plan.get("duties"):
        duty_strs = [f"{d['time']} ({d['duty']})" for d in plan["duties"]]
        lines.append(f"Duties: {'; '.join(duty_strs)}")
    else:
        lines.append("Duties: none")

    for p in plan["periods"]:
        if p["type"] == "hub":
            lines.append(f"{p['period'].upper()} ({p['time']}) — HUB SUPERVISION")
            lines.append("SUPERVISION ONLY — NO COVER WORK TO SET:")
            continue
            
        if p["type"] == "club":
            lines.append(f"{p['period'].upper()} ({p['time']}) — {p['title'].upper()}")
            lines.append("SUPERVISION ONLY — NO COVER WORK TO SET:")
            continue
            
        # Lesson
        lines.append(f"▶ {p['period'].upper()} ({p['time']}) — {p['set_name']}")
        lines.append(f"Topic: {p['topic_name']} ({p['unit_name']}) [{p['live_url']}]({p['live_url']})")

    lines.append("Early Finishers: Pupils should navigate to the Revision Zone flashcards or Living Timeline challenge on the platform.")
    lines.append("Kind regards,")
    lines.append("The History Department")
    
    return "\n".join(lines)

def save_cover_package(plan, recipient=None):
    body_text = render_email_text(plan, recipient)
    subject = f"EMERGENCY COVER: History - {plan['day']}, {plan['date_str']} ({plan['week']})"
    
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
    parser = argparse.ArgumentParser(description="Generate Emergency History Cover Email")
    parser.add_argument("--week", choices=["Week A", "Week B"], default="Week A", help="Week A or Week B")
    parser.add_argument("--day", choices=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], default=None, help="Day of the week")
    parser.add_argument("--tomorrow", action="store_true", help="Generate cover for tomorrow")
    parser.add_argument("--date", default=None, help="Specific date e.g. '21 September 2026' or '2026-09-21'")
    parser.add_argument("--periods", default=None, help="Comma-separated periods to include e.g. '1,3' or '3'")
    parser.add_argument("--recipient", default="", help="Recipient name (defaults to 'Dear ,')")
    args = parser.parse_args()
    
    target_date = None
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
            
    if not args.day:
        args.day = datetime.now().strftime("%A")
        if args.day in ["Saturday", "Sunday"]:
            args.day = "Monday"
            # Default to next Monday if run on weekend
            days_ahead = 1 if args.day == "Sunday" else 2
            target_date = datetime.now() + timedelta(days=days_ahead)
            
    plan = generate_cover_plan(args.week, args.day, target_date=target_date, period_filter=args.periods)
    if not plan:
        print(f"Error: Could not find timetable for {args.week} {args.day}")
        sys.exit(1)
        
    pkg = save_cover_package(plan, args.recipient)
    print("=" * 65)
    print(f"✅ Emergency Cover Package Generated for {args.week} {args.day} ({plan['date_str']})!")
    print(f"Subject: {pkg['subject']}")
    print(f"Local HTML Launcher: {pkg['html_path']}")
    if pkg['gdrive_path']:
        print(f"Google Drive Path:   {pkg['gdrive_path']}")
    print("=" * 65)
    print("\nEMAIL PREVIEW:\n")
    print(pkg["body_text"])
