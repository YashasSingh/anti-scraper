// Import required modules
const fs = require('fs');
const path = require('path');

// Function to shift letters by one position (Caesar cipher)
function encryptText(text) {
    return text.replace(/[a-zA-Z]/g, (char) => {
        const base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        return String.fromCharCode(((char.charCodeAt(0) - base + 1) % 26) + base);
    });
}

// Function to process the HTML file
function processHTML(inputFile, outputFile) {
    // Read the input HTML file
    const htmlContent = fs.readFileSync(inputFile, 'utf8');

    // Encrypt content inside <h1>, <h2>, and <p> tags
    const encryptedContent = htmlContent.replace(/<(h[1-6]|p)>(.*?)<\/\1>/g, (match, tag, text) => {
        const encryptedText = encryptText(text);
        return `<${tag}>${encryptedText}</${tag}>`;
    });

    // Add a decryption script to the HTML
    const decryptionScript = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach(el => {
                el.textContent = el.textContent.replace(/[a-zA-Z]/g, char => {
                    const base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
                    return String.fromCharCode(((char.charCodeAt(0) - base - 1 + 26) % 26) + base);
                });
            });
        });
    </script>`;

    // Inject the decryption script before the closing </body> tag
    const finalContent = encryptedContent.replace(/<\/body>/, `${decryptionScript}\n</body>`);

    // Write the output to the specified file
    fs.writeFileSync(outputFile, finalContent, 'utf8');

    console.log(`Processed HTML saved to ${outputFile}`);
}