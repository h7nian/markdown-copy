# Screenshot Creation Guide

This guide explains how to create professional screenshots for the Chrome Web Store listing.

## Requirements

### Technical Specifications
- **Minimum Resolution:** 1280x800 pixels
- **Maximum Resolution:** 2560x1600 pixels (or 3840x2400 for Retina)
- **Aspect Ratio:** 16:10 preferred (but 16:9 also acceptable)
- **Format:** PNG (preferred) or JPEG
- **File Size:** Maximum 5MB per screenshot
- **Quantity:** Minimum 1, maximum 5 (recommend 5-6)

### Content Requirements
- Show actual extension functionality
- Use high-quality, readable text
- Avoid any personal information
- Include clear captions
- Professional appearance
- Light or neutral backgrounds work best

## Screenshot List

### Screenshot 1: Main Demo (Primary)
**Priority: REQUIRED**

**What to Show:**
- A webpage with some interesting content (Wikipedia article recommended)
- Selected text highlighted
- Extension icon in toolbar (maybe with indicator)
- Toast notification showing "✓ Markdown copied to clipboard"

**Suggested Setup:**
1. Open Wikipedia article (e.g., "Markdown" or "Open Source")
2. Select a paragraph with headings, links, and lists
3. Trigger the extension
4. Capture the moment with toast visible

**Caption:**
"Convert any webpage selection to clean Markdown with one click"

**Notes:**
- This is the FIRST screenshot users will see
- Make it compelling and clear
- Show the value proposition immediately

---

### Screenshot 2: Context Menu
**Priority: REQUIRED**

**What to Show:**
- Selected text on a webpage
- Right-click context menu open
- "Copy as Markdown" option highlighted

**Suggested Setup:**
1. Select text on an article or documentation page
2. Right-click to open context menu
3. Hover over "Copy as Markdown" option
4. Take screenshot

**Caption:**
"Right-click context menu integration for quick access"

**Notes:**
- Shows the most common usage method
- Makes it clear how to use the extension
- Should be very intuitive

---

### Screenshot 3: Extension Popup
**Priority: REQUIRED**

**What to Show:**
- Extension popup fully visible
- All settings clearly shown:
  - Notification toggle
  - Article extraction toggle
  - Line break dropdown
  - Keyboard shortcut info
  - "Copy Selection as Markdown" button

**Suggested Setup:**
1. Click extension icon in toolbar
2. Ensure popup is fully expanded
3. Settings should be in a readable state
4. Take screenshot of just the popup (crop tightly)

**Caption:**
"Customizable settings for notifications, article extraction, and line breaks"

**Notes:**
- Show the beautiful UI you created
- Demonstrate configurability
- Users should see it's simple to use

---

### Screenshot 4: GFM Tables
**Priority: HIGH

**What to Show:**
- Left side: Webpage with a nicely formatted table
- Right side: VS Code or text editor showing the Markdown table
- OR: Just the markdown table output in a code block

**Suggested Setup:**
1. Find a webpage with a good table (Wikipedia, GitHub docs)
2. Select the table
3. Copy as Markdown
4. Paste into VS Code or markdown editor
5. Take split-screen screenshot OR show before/after

**Caption:**
"Perfect table conversion with GitHub Flavored Markdown support"

**Notes:**
- Tables are a killer feature
- Show that alignment is preserved
- Demonstrate GFM capability

---

### Screenshot 5: Code Blocks
**Priority: HIGH**

**What to Show:**
- Webpage with a code block (with language class if possible)
- The resulting Markdown with proper fenced code block
- Language tag visible (```python, ```javascript, etc.)

**Suggested Setup:**
1. Find documentation page with syntax-highlighted code
2. Select the code block
3. Convert to Markdown
4. Paste into editor showing ```language fence
5. Split-screen or before/after view

**Caption:**
"Automatic language detection for code blocks"

**Notes:**
- Important for developer audience
- Shows attention to detail
- Highlights language detection feature

---

### Screenshot 6: Before/After Comparison
**Priority: MEDIUM**

**What to Show:**
- Left: Complex HTML webpage (rich content with mixed elements)
- Right: Clean Markdown output in editor
- OR: Vertical split showing transformation

**Suggested Setup:**
1. Select complex content (headings + paragraphs + lists + links)
2. Show the messy web view on left
3. Show clean Markdown on right
4. Consider adding annotations/arrows

**Caption:**
"Transform complex HTML into clean, readable Markdown"

**Notes:**
- Shows the value of cleaning up web content
- Demonstrates comprehensive element support
- Good for users who want to see actual output

---

## Alternative Screenshots (Choose based on audience)

### A. Academic Use Case
- Research paper page (ArXiv, PubMed)
- Copying abstract or methods section
- Paste into Obsidian or academic note app

### B. Article Extraction (No Selection)
- Full article page
- NO selection visible
- Show toast: "Article extracted and copied as Markdown"
- Demonstrate the Readability feature

### C. Obsidian/Notion Integration
- Browser on left showing source webpage
- Obsidian/Notion on right showing pasted content
- Perfect formatting preserved

### D. Multi-element Demo
- Content with ALL markdown elements:
  - Headings (multiple levels)
  - Bold and italic
  - Links
  - Images
  - Lists (nested)
  - Code blocks
  - Tables
  - Blockquotes

## Tools for Creating Screenshots

### Recommended Tools

**macOS:**
- Built-in Screenshot (`Cmd+Shift+4` for selection)
- CleanShot X (paid, highly recommended)
- Skitch (free, for annotations)

**Windows:**
- Snipping Tool (built-in)
- Greenshot (free, open source)
- ShareX (free, powerful)

**Linux:**
- Flameshot (recommended)
- GNOME Screenshot
- Spectacle (KDE)

**Cross-platform:**
- Browser DevTools (for precise sizing)
- Figma/Sketch (for mockups)
- OBS Studio (for GIF recording)

### Post-Processing

**Image Editing:**
1. Crop to focus on important areas
2. Ensure text is readable (increase size if needed)
3. Add subtle drop shadows for depth
4. Optimize file size (use TinyPNG or similar)

**Annotations (Optional):**
- Add arrows to highlight key features
- Circle important UI elements
- Add text callouts for clarity
- Use consistent color scheme

## Creating a Demo GIF/Video

### Requirements
- **Duration:** 10-15 seconds
- **File Size:** < 5MB for GIF, < 50MB for video
- **Resolution:** 1280x720 minimum
- **Format:** GIF or MP4
- **Frame Rate:** 30 fps minimum

### Demo Script (15 seconds)
```
0:00 - Show webpage with interesting content
0:02 - Select a paragraph (smooth mouse movement)
0:04 - Right-click → "Copy as Markdown"
0:06 - Toast appears: "✓ Markdown copied"
0:08 - Switch to VS Code/editor
0:10 - Paste content (Cmd+V / Ctrl+V)
0:12 - Show formatted Markdown result
0:15 - Fade out with extension name/logo
```

### Recording Tools

**Screen Recording:**
- macOS: QuickTime Player (built-in)
- Windows: Xbox Game Bar (built-in)
- Linux: SimpleScreenRecorder
- Cross-platform: OBS Studio

**GIF Creation:**
- LICEcap (free, simple)
- GIPHY Capture (free, Mac)
- ScreenToGif (free, Windows)
- ezgif.com (online converter)

**Video Editing:**
- DaVinci Resolve (free)
- iMovie (Mac)
- Kdenlive (Linux)
- OpenShot (cross-platform)

## Test Pages for Screenshots

### Good Sources
1. **Wikipedia** - Clean, well-structured content
2. **GitHub Documentation** - Code blocks, tables
3. **MDN Web Docs** - Technical content
4. **Medium Articles** - Reading-focused layouts
5. **Stack Overflow** - Q&A format

### Create Your Own Test Page
```html
<!DOCTYPE html>
<html>
<head>
  <title>Markdown Copy Demo</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 50px auto; }
    code { background: #f4f4f4; padding: 2px 6px; }
    table { border-collapse: collapse; margin: 20px 0; }
    td, th { border: 1px solid #ddd; padding: 8px; }
  </style>
</head>
<body>
  <h1>Markdown Elements Demo</h1>
  
  <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
  
  <h2>Lists</h2>
  <ul>
    <li>First item</li>
    <li>Second item with <a href="#">a link</a></li>
    <li>Third item</li>
  </ul>
  
  <h2>Code Block</h2>
  <pre><code class="language-python">
def hello_world():
    print("Hello, World!")
  </code></pre>
  
  <h2>Table</h2>
  <table>
    <tr><th>Feature</th><th>Status</th></tr>
    <tr><td>Headings</td><td>✓</td></tr>
    <tr><td>Tables</td><td>✓</td></tr>
    <tr><td>Code</td><td>✓</td></tr>
  </table>
  
  <blockquote>
    <p>This is a blockquote with important information.</p>
  </blockquote>
</body>
</html>
```

Save this as `demo.html` and open in browser for consistent screenshots.

## Optimization Checklist

Before uploading to Chrome Web Store:

- [ ] All screenshots are 1280x800 or larger
- [ ] File sizes are under 5MB each
- [ ] Images are PNG format
- [ ] Text is clearly readable
- [ ] No personal information visible
- [ ] No browser history or bookmarks showing
- [ ] Consistent style across all screenshots
- [ ] Captions are prepared
- [ ] Screenshots are numbered/ordered logically
- [ ] Compressed with TinyPNG or similar

## Caption Best Practices

### Do:
- ✅ Be concise (1-2 sentences)
- ✅ Highlight the key benefit
- ✅ Use action words
- ✅ Match what's shown in image

### Don't:
- ❌ Make claims you can't show
- ❌ Use excessive punctuation!!!
- ❌ Write paragraphs
- ❌ Include pricing info

## Examples of Good Screenshot Sets

Study these extensions for inspiration:
- Grammarly
- Honey
- LastPass
- Notion Web Clipper
- Evernote Web Clipper

Note their:
- Clean, professional appearance
- Clear demonstration of value
- Consistent branding
- Effective captions

## Final Checklist

Before submission:

- [ ] Created 5-6 high-quality screenshots
- [ ] All screenshots follow technical requirements
- [ ] Captions are written for each
- [ ] Optional: Created demo GIF/video
- [ ] Screenshots show all major features
- [ ] Images optimized for file size
- [ ] No sensitive information visible
- [ ] Screenshots reviewed for typos/errors
- [ ] Consistent visual style
- [ ] Ready to upload to Chrome Web Store

---

**Good screenshots can increase installation rates by 30-50%. Take your time to make them great!**

