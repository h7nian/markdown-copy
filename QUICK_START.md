# Quick Start Guide - Markdown Copy Extension

Get up and running with the Markdown Copy extension in 5 minutes!

## 🚀 For Users

### Installation (from source - during development)

1. **Download or clone the extension**
   ```bash
   cd ~/Desktop
   git clone https://github.com/yourusername/markdown-copy.git
   ```

2. **Open Chrome Extensions page**
   - Open Chrome and go to `chrome://extensions/`
   - Or click the puzzle icon → "Manage Extensions"

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the top right corner

4. **Load the extension**
   - Click "Load unpacked"
   - Select the `markdown-copy` folder
   - The extension icon should appear in your toolbar

5. **Pin the extension (optional)**
   - Click the puzzle icon in the toolbar
   - Find "Markdown Copy"
   - Click the pin icon to keep it visible

### Basic Usage

#### Method 1: Right-Click Menu (Recommended)
1. Go to any webpage
2. Select some text
3. Right-click on the selection
4. Click "Copy as Markdown"
5. Paste anywhere!

#### Method 2: Keyboard Shortcut (Fastest)
1. Go to any webpage
2. Select some text
3. Press `Alt+M` (or `Option+M` on Mac)
4. Paste anywhere!

#### Method 3: Extension Button
1. Go to any webpage
2. Select some text
3. Click the Markdown Copy icon in the toolbar
4. Click "Copy Selection as Markdown"
5. Paste anywhere!

### Configure Settings

Click the extension icon to access settings:

- **Show notification after copying** - Toggle success messages on/off
- **Auto-extract article** - When nothing is selected, extract the main article content
- **Line break style** - Choose how paragraphs are formatted

### Customize Keyboard Shortcut

1. Go to `chrome://extensions/shortcuts`
2. Find "Markdown Copy"
3. Click the pencil icon next to "Copy selection as Markdown"
4. Press your preferred key combination
5. Click "OK"

### Test the Extension

1. Open the included `test-page.html` in your browser
2. Try selecting different sections:
   - Headings and paragraphs
   - Lists (ordered/unordered)
   - Code blocks
   - Tables
   - Mixed content
3. Convert and paste into a Markdown editor to verify

---

## 🛠️ For Developers

### Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/markdown-copy.git
   cd markdown-copy
   ```

2. **Review the structure**
   ```
   markdown-copy/
   ├── manifest.json      # Extension config
   ├── background.js      # Service worker
   ├── content.js         # Main logic
   ├── popup/             # Settings UI
   ├── vendor/            # Dependencies
   └── icons/             # Extension icons
   ```

3. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project folder

### Making Changes

#### Modify Content Script (content.js)
- Make your changes
- Go to `chrome://extensions/`
- Click the refresh icon on the Markdown Copy card
- Reload any open webpages to see changes

#### Modify Background Script (background.js)
- Make your changes
- Go to `chrome://extensions/`
- Click the refresh icon on the Markdown Copy card
- Changes take effect immediately

#### Modify Popup (popup/*)
- Make your changes
- Close and reopen the popup to see changes
- No need to reload the extension

### Debugging

#### Content Script
1. Open any webpage
2. Press `F12` to open DevTools
3. Go to the "Console" tab
4. Trigger the extension
5. Check for errors or logs

#### Background Script
1. Go to `chrome://extensions/`
2. Find "Markdown Copy"
3. Click "service worker" (blue link)
4. DevTools opens with background script console
5. Check for errors or logs

#### Popup
1. Right-click the extension icon
2. Select "Inspect popup"
3. DevTools opens for the popup
4. Check console for errors

### Common Development Tasks

#### Update Dependencies
```bash
cd vendor/

# Update Turndown
curl -sL https://unpkg.com/turndown@7.1.2/dist/turndown.js -o turndown.js

# Update Turndown GFM Plugin
curl -sL https://unpkg.com/turndown-plugin-gfm@1.0.2/dist/turndown-plugin-gfm.js -o turndown-plugin-gfm.js

# Update Readability
curl -sL https://unpkg.com/@mozilla/readability@0.5.0/Readability.js -o readability.js
```

#### Create New Icons
Edit the SVG in `icon_template.svg` or use the Python script:
```bash
python3 generate_icons.py
```

#### Package for Distribution
```bash
# Clean build
zip -r markdown-copy-v1.0.0.zip . \
  -x "*.git*" "*.DS_Store" "*.md" \
  "store/*" "*.py" "*.svg" "test-page.html"
```

### Testing Checklist

Before committing:
- [ ] Test all three entry points (menu, keyboard, button)
- [ ] Test with various content types
- [ ] Test settings persistence
- [ ] Check browser console for errors
- [ ] Verify no network requests (DevTools Network tab)
- [ ] Test on multiple websites

---

## 📚 Quick Reference

### Key Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `manifest.json` | Extension configuration | Add permissions, change version |
| `background.js` | Service worker | Modify menu or commands |
| `content.js` | Conversion logic | Change Markdown output |
| `popup/popup.js` | Settings logic | Add new settings |
| `popup/popup.html` | Settings UI | Change interface |
| `popup/popup.css` | Popup styles | Modify appearance |

### Useful Chrome URLs

- **Extensions:** `chrome://extensions/`
- **Shortcuts:** `chrome://extensions/shortcuts`
- **Storage:** `chrome://extensions/` → Developer mode → Storage
- **Service Worker:** `chrome://extensions/` → Service worker link

### Keyboard Shortcuts (Development)

- **Reload Extension:** Go to extensions page, click refresh
- **Open DevTools:** `F12` or `Cmd+Option+I` (Mac)
- **Inspect Popup:** Right-click icon → "Inspect popup"
- **Console:** `Cmd+Option+J` (Mac) / `Ctrl+Shift+J` (Windows)

---

## 🔧 Troubleshooting

### Extension not working?

**Check installation:**
```
1. Go to chrome://extensions/
2. Find "Markdown Copy"
3. Ensure it's enabled (toggle is blue)
4. Check for error messages
```

**Reload extension:**
```
1. Go to chrome://extensions/
2. Click the refresh icon on the Markdown Copy card
3. Reload the webpage you're testing on
```

### Keyboard shortcut not working?

**Verify assignment:**
```
1. Go to chrome://extensions/shortcuts
2. Find "Markdown Copy"
3. Ensure a shortcut is assigned
4. Try a different key combination if it conflicts
```

### Toast not showing?

**Check settings:**
```
1. Click the extension icon
2. Ensure "Show notification after copying" is enabled
3. Try converting again
```

### Content not copying?

**Check selection:**
```
1. Ensure you've selected text on the page
2. The selection must not be empty
3. Try selecting again
```

**Check permissions:**
```
1. Go to chrome://extensions/
2. Click "Details" on Markdown Copy
3. Ensure "Site access" is set to "On all sites"
```

### "No selection" message?

**Two options:**
```
Option 1: Select text before triggering
Option 2: Enable "Auto-extract article" in settings
```

---

## 🎓 Learning Resources

### Understanding the Code

**Start here:**
1. Read `manifest.json` - understand structure
2. Read `content.js` - see conversion logic
3. Read `background.js` - understand message passing
4. Read `popup/popup.js` - see settings management

**Key concepts:**
- [Chrome Extension Architecture](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
- [Service Workers](https://developer.chrome.com/docs/extensions/mv3/service_workers/)
- [Message Passing](https://developer.chrome.com/docs/extensions/mv3/messaging/)

### External Dependencies

- [Turndown Documentation](https://github.com/mixmark-io/turndown)
- [Turndown GFM Plugin](https://github.com/mixmark-io/turndown-plugin-gfm)
- [Mozilla Readability](https://github.com/mozilla/readability)
- [Markdown Spec](https://daringfireball.net/projects/markdown/syntax)
- [GFM Spec](https://github.github.com/gfm/)

---

## 📞 Getting Help

**Documentation:**
- README.md - Full project documentation
- CHANGELOG.md - Version history and roadmap
- PRIVACY.md - Privacy policy details
- PUBLISHING_GUIDE.md - Store submission guide

**Community:**
- GitHub Issues - Bug reports
- GitHub Discussions - Questions and ideas
- Chrome Web Store Reviews - User feedback

---

## ✅ Next Steps

### For Users:
1. ✅ Install the extension
2. ✅ Test on the test page
3. ✅ Try on real websites
4. ✅ Configure your preferences
5. ⭐ Leave a review if you like it!

### For Developers:
1. ✅ Review the code structure
2. ✅ Make your first change
3. ✅ Test thoroughly
4. ✅ Submit a pull request
5. 🤝 Join the community!

### For Publishers:
1. ✅ Review PROJECT_SUMMARY.md
2. ✅ Create screenshots (see SCREENSHOT_GUIDE.md)
3. ✅ Package the extension
4. ✅ Submit to Chrome Web Store
5. 🚀 Launch!

---

**Happy Markdown converting! 🎉**

