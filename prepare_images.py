"""Resize selected wedding photos and save as base64 text files."""
import base64
import io
import os
from PIL import Image

WEDDING_DIR = r"D:\Desktop\WorkSpace\WorkSpace\00.Kefico-work\wedding"
OUTPUT_DIR = os.path.join(WEDDING_DIR, "b64")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Selected 6 photos with labels
SELECTED = {
    "hero": "KakaoTalk_20260310_154509840_03.jpg",       # outdoor veil, romantic
    "with_dog": "KakaoTalk_20260310_154509840_01.jpg",    # with dog, cute
    "staircase": "KakaoTalk_20260310_154509840_05.jpg",   # staircase, elegant
    "under_veil": "KakaoTalk_20260310_154509840_12.jpg",  # under veil, intimate
    "formal": "KakaoTalk_20260310_154509840_15.jpg",      # formal seated
    "garden": "KakaoTalk_20260310_154509840_20.jpg",      # outdoor garden, joyful
}

MAX_WIDTH = 800
MAX_HEIGHT = 1000
QUALITY = 65

for label, filename in SELECTED.items():
    filepath = os.path.join(WEDDING_DIR, filename)
    img = Image.open(filepath)
    
    # Resize maintaining aspect ratio
    img.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.LANCZOS)
    
    # Convert to RGB if needed (for JPEG)
    if img.mode != "RGB":
        img = img.convert("RGB")
    
    # Save to buffer as JPEG
    buffer = io.BytesIO()
    img.save(buffer, format="JPEG", quality=QUALITY, optimize=True)
    buffer.seek(0)
    
    # Encode to base64
    b64_str = base64.b64encode(buffer.read()).decode("ascii")
    
    # Save base64 to file
    out_path = os.path.join(OUTPUT_DIR, f"{label}.b64.txt")
    with open(out_path, "w") as f:
        f.write(b64_str)
    
    size_kb = len(b64_str) / 1024
    print(f"[OK] {label}: {img.size[0]}x{img.size[1]} -> {size_kb:.1f} KB (base64)")

print("\nAll done!")
