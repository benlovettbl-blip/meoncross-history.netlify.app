import codecs
import os
try:
    dir_path = os.path.dirname(os.path.abspath(__file__))
    with codecs.open(os.path.join(dir_path, 'consequence_dump.txt'), 'r', 'utf-16le') as f:
        text = f.read()
    with open(os.path.join(dir_path, 'consequence_dump_utf8.txt'), 'w', encoding='utf-8') as f:
        f.write(text)
    print("Python Conversion successful. Length of text:", len(text))
except Exception as e:
    print("Error:", e)
