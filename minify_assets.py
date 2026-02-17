import re
import os

def minify_css(content):
    # Remove comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Remove extra whitespace
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r'\s*([{:;,])\s*', r'\1', content)
    content = re.sub(r';}', '}', content)
    return content.strip()

def minify_js(content):
    # Simple JS minification (removes comments and extra whitespace)
    # Remove single line comments
    content = re.sub(r'//.*', '', content)
    # Remove multi-line comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Remove extra whitespace
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r'\s*([=+\-*/{}();,<>])\s*', r'\1', content)
    return content.strip()

def process_files(directory):
    for filename in ['styles.css', 'script.js', 'hero-animation.js']:
        filepath = os.path.join(directory, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if filename.endswith('.css'):
                minified = minify_css(content)
            else:
                minified = minify_js(content)
                
            new_filename = filename.replace('.css', '.min.css').replace('.js', '.min.js')
            new_filepath = os.path.join(directory, new_filename)
            
            with open(new_filepath, 'w', encoding='utf-8') as f:
                f.write(minified)
                
            print(f"Minified {filename}: {os.path.getsize(filepath)} -> {os.path.getsize(new_filepath)} bytes")

if __name__ == "__main__":
    process_files('d:\\MyPortfolio')
