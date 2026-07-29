import sys
from gtts import gTTS
import os

def generate_audio(text_path, out_path):
    with open(text_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    if not text.strip():
        print(f"Skipping {out_path} as text is empty.")
        return
        
    print(f"Generating TTS for {out_path}...")
    tts = gTTS(text=text, lang='en-uk')
    tts.save(out_path)
    print(f"Saved {out_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python generate_tts.py <text_file_path> <output_mp3_path>")
        sys.exit(1)
        
    text_path = sys.argv[1]
    out_path = sys.argv[2]
    generate_audio(text_path, out_path)
