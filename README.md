# HTML Encryptor

## Description
HTML Encryptor is a simple JavaScript tool designed to encrypt the content of HTML files to protect them from being scraped by web crawlers. The tool applies a Caesar cipher to text within specific tags (e.g., `<h1>` and `<p>`), making the raw HTML unreadable. However, the encrypted content is dynamically decrypted at runtime in the browser, ensuring it displays normally for users while still being protected from web scrapers.

## Features
- Encrypts text inside `<h1>`, `<h2>`, `<p>`, and similar tags.
- Adds a decryption script to the HTML file for runtime decryption in the browser.
- Prevents web scrapers from directly accessing the raw content.
- Easy to use with customizable file paths.

## Installation
1. Ensure Node.js is installed on your system.
2. Clone this repository or download the code.
3. Run `npm install` to ensure dependencies are set up.

## Usage
1. Prepare an HTML file (e.g., `input.html`) with the content you want to encrypt.
2. Update the paths in the `processHTML` function call at the bottom of `html_encryptor.js`:
   ```javascript
   const inputPath = path.join(__dirname, 'input.html');
   const outputPath = path.join(__dirname, 'output.html');
   ```
3. Run the tool:
   ```bash
   npm start
   ```
4. The encrypted HTML file will be saved as `output.html`.

## Example
### Input (`input.html`):
```html
<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a test paragraph.</p>
</body>
</html>
```

### Output (`output.html`):
```html
<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
</head>
<body>
    <h1>Ifmmp Xpsme</h1>
    <p>Uijt jt b uftu qbsbhsbqi.</p>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach(el => {
                el.textContent = el.textContent.replace(/[a-zA-Z]/g, char => {
                    const base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
                    return String.fromCharCode(((char.charCodeAt(0) - base - 1 + 26) % 26) + base);
                });
            });
        });
    </script>
</body>
</html>
```

When viewed in a browser, the content will appear as:
```
Hello World
This is a test paragraph.
```

## Contributing
Feel free to fork this repository and submit pull requests for any features, enhancements, or bug fixes.

## License
This project is licensed under the MIT License.
