import sys, re, pymupdf

sys.stdout.reconfigure(encoding='utf-8')

# 1. Load official textbooks text
doc1 = pymupdf.open('G:/My Drive/TEXTBOOKS/Revise Edexcel GCSE (9-1) History Early Elizabethan England Revision Guide and Workbook.pdf')
doc2 = pymupdf.open('G:/My Drive/TEXTBOOKS/Edexcel 9-1 GCSE - Early Elizabethan England.pdf')

text1 = ""
for page in doc1:
    text1 += page.get_text() + "\n"

text2 = ""
for page in doc2:
    text2 += page.get_text() + "\n"

full_official_text = (text1 + "\n" + text2).lower()

print(f"Total official corpus loaded: {len(full_official_text)} characters")

# Function to check if term or concept is in official textbooks
def check_term(term):
    clean = term.strip().lower()
    return clean in full_official_text

# 2. Load twopage script
with open('scripts/render_eee_twopage_workbook.cjs', 'r', encoding='utf-8') as f:
    twopage_code = f.read()

# 3. Load master script to inspect Cornell cues
with open('scripts/build_eee_master_script.cjs', 'r', encoding='utf-8') as f:
    master_builder_code = f.read()

# Extract milestones
milestones_raw = re.findall(r"title:\s*['\"]([^'\"]+)['\"].*?text:\s*['\"]([^'\"]+)['\"]", twopage_code, re.DOTALL)
print("\n=== AUDITING MILESTONES ===")
for title, text in milestones_raw[:25]:
    # Check if key words are in textbook
    print(f"\nMilestone: {title}")
    words = [w for w in re.findall(r'\b[A-Za-z]{4,}\b', title) if w.lower() not in ['key', 'topic', 'part', 'the', 'and', 'with', 'from']]
    absent = [w for w in words if not check_term(w)]
    if absent:
        print(f"  ⚠️ Potential off-spec words in title: {absent}")
    else:
        print("  ✓ Title words grounded in textbooks")

# Extract vocabulary terms
vocab_pairs = re.findall(r"vocabTermA:\s*['\"]([^'\"]+)['\"].*?vocabTermB:\s*['\"]([^'\"]+)['\"]", twopage_code, re.DOTALL)
print("\n=== AUDITING VOCABULARY PAIRS ===")
for a, b in vocab_pairs:
    in_a = check_term(a)
    in_b = check_term(b)
    status_a = "✓ In Textbook" if in_a else "❌ NOT in textbook"
    status_b = "✓ In Textbook" if in_b else "❌ NOT in textbook"
    print(f"• {a} ({status_a}) vs {b} ({status_b})")

# Let's check glossary in Doc 1 & Doc 2
print("\n=== OFFICIAL GLOSSARY TERMS IN TEXTBOOK (Doc 2) ===")
# Search for Glossary in doc2
for i, page in enumerate(doc2):
    t = page.get_text()
    if 'Glossary' in t:
        print(f"Glossary on page {i+1}:")
        print(t[:1200])
