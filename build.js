/**
 * Build Script for Growith Landing Page
 * Minifies CSS and JS for production
 */

const fs = require('fs');
const path = require('path');

// Simple CSS minification
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*{\s*/g, '{') // Remove space around {
        .replace(/\s*}\s*/g, '}') // Remove space around }
        .replace(/\s*;\s*/g, ';') // Remove space around ;
        .replace(/\s*:\s*/g, ':') // Remove space around :
        .replace(/\s*,\s*/g, ',') // Remove space around ,
        .trim();
}

// Simple JS minification
function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\/\/.*/g, '') // Remove single-line comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*([=+\-*/%&|^~!<>?:;,{}()])\s*/g, '$1') // Remove space around operators
        .trim();
}

// Build function
function build() {
    console.log('\x1b[36m%s\x1b[0m', '🔨 Building Growith for production...');
    console.log('');

    // Create dist folder
    const distPath = path.join(__dirname, 'dist');
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }

    // Minify CSS
    try {
        const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
        const minifiedCSS = minifyCSS(cssContent);
        fs.writeFileSync(path.join(distPath, 'styles.min.css'), minifiedCSS);
        console.log('\x1b[32m✓\x1b[0m', 'CSS minified: styles.min.css');
    } catch (err) {
        console.error('Error minifying CSS:', err.message);
    }

    // Minify JS
    try {
        const jsContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
        const minifiedJS = minifyJS(jsContent);
        fs.writeFileSync(path.join(distPath, 'script.min.js'), minifiedJS);
        console.log('\x1b[32m✓\x1b[0m', 'JS minified: script.min.js');
    } catch (err) {
        console.error('Error minifying JS:', err.message);
    }

    // Minify admin CSS
    try {
        const adminCssContent = fs.readFileSync(path.join(__dirname, 'admin.css'), 'utf8');
        const minifiedAdminCSS = minifyCSS(adminCssContent);
        fs.writeFileSync(path.join(distPath, 'admin.min.css'), minifiedAdminCSS);
        console.log('\x1b[32m✓\x1b[0m', 'Admin CSS minified: admin.min.css');
    } catch (err) {
        console.error('Error minifying admin CSS:', err.message);
    }

    // Minify admin JS
    try {
        const adminJsContent = fs.readFileSync(path.join(__dirname, 'admin.js'), 'utf8');
        const minifiedAdminJS = minifyJS(adminJsContent);
        fs.writeFileSync(path.join(distPath, 'admin.min.js'), minifiedAdminJS);
        console.log('\x1b[32m✓\x1b[0m', 'Admin JS minified: admin.min.js');
    } catch (err) {
        console.error('Error minifying admin JS:', err.message);
    }

    // Copy HTML files
    ['index.html', 'admin.html'].forEach(file => {
        try {
            const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
            fs.writeFileSync(path.join(distPath, file), content);
            console.log('\x1b[32m✓\x1b[0m', `${file} copied`);
        } catch (err) {
            console.error(`Error copying ${file}:`, err.message);
        }
    });

    // Copy other assets
    ['.firebaserc', 'firebase.json', 'render.yaml'].forEach(file => {
        try {
            if (fs.existsSync(path.join(__dirname, file))) {
                fs.copyFileSync(path.join(__dirname, file), path.join(distPath, file));
            }
        } catch (err) {
            console.error(`Error copying ${file}:`, err.message);
        }
    });

    console.log('');
    console.log('\x1b[32m%s\x1b[0m', '✨ Build complete! Files in /dist folder');
    console.log('');
}

// Run build
build();
