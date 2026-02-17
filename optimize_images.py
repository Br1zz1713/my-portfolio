import os
from PIL import Image

def optimize_images(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                filepath = os.path.join(root, file)
                filename, ext = os.path.splitext(file)
                webp_path = os.path.join(root, f"{filename}.webp")
                
                try:
                    with Image.open(filepath) as img:
                        img.save(webp_path, 'WEBP', quality=80)
                        print(f"Converted {file} to {filename}.webp")
                        
                        # Compare sizes
                        original_size = os.path.getsize(filepath)
                        new_size = os.path.getsize(webp_path)
                        print(f"Size check: {original_size} -> {new_size} bytes (Saved {original_size - new_size} bytes)")
                        
                except Exception as e:
                    print(f"Failed to convert {file}: {e}")

if __name__ == "__main__":
    optimize_images('d:\\MyPortfolio\\images')
