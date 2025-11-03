# Troubleshooting Guide

## Common Issues and Solutions

### ❌ Extension doesn't work on certain websites (ChatGPT, etc.)

**Problem:** Right-click menu appears but nothing happens when clicked, or keyboard shortcut doesn't work.

**Cause:** Content script failed to inject on the page due to:
- Dynamic page loading (SPA websites)
- Strict Content Security Policy (CSP)
- Complex iframe structures

**Solution (v1.0.1+):** 
The extension now automatically retries script injection if it fails. Simply:
1. Refresh the page
2. Try the extension again
3. If still not working, reload the extension in `chrome://extensions/`

**Manual workaround:**
1. Go to `chrome://extensions/`
2. Find "Markdown Copy"
3. Click the refresh icon
4. Reload the webpage
5. Try again

---

### ❌ No context menu appears

**Problem:** Right-click doesn't show "Copy as Markdown" option.

**Solutions:**
1. **Check if text is selected:** The menu only appears when text is selected
2. **Reload the extension:**
   - Go to `chrome://extensions/`
   - Click refresh on "Markdown Copy"
3. **Check extension is enabled:**
   - Ensure toggle is blue/on

---

### ❌ Keyboard shortcut doesn't work

**Problem:** Pressing `Alt+M` does nothing.

**Solutions:**
1. **Check shortcut configuration:**
   - Go to `chrome://extensions/shortcuts`
   - Find "Markdown Copy"
   - Verify shortcut is set to `Alt+M`
   - Change if it conflicts with another extension

2. **Try on a different page:**
   - Some pages block keyboard shortcuts
   - Test on a simple webpage like Wikipedia

---

### ❌ Copied content is empty or incorrect

**Problem:** Clipboard contains nothing or wrong content after conversion.

**Solutions:**
1. **Ensure text is selected** before triggering
2. **Check clipboard permissions:**
   - Extension needs clipboard access
   - Try refreshing the page
3. **Try different content:**
   - Some complex layouts may not convert well
   - Test with simple text first

---

### ❌ Toast notification doesn't appear

**Problem:** No confirmation message after copying.

**Solutions:**
1. **Check settings:**
   - Click extension icon
   - Ensure "Show notification after copying" is enabled
2. **Check if conversion actually worked:**
   - Try pasting even without notification
   - Notification might be blocked by page

---

### ❌ Extension popup doesn't open

**Problem:** Clicking extension icon does nothing.

**Solutions:**
1. **Reload extension:**
   - `chrome://extensions/` → Refresh
2. **Check for errors:**
   - Right-click extension icon
   - Inspect popup
   - Look for console errors
3. **Reinstall if needed:**
   - Remove extension
   - Reload from unpacked folder

---

## Website-Specific Issues

### ChatGPT / OpenAI websites

**Known issues:**
- Complex SPA structure
- Multiple iframes
- Dynamic content loading

**Solution:**
- Extension now auto-retries injection (v1.0.1+)
- Wait for page to fully load before using
- If still fails, refresh page and try again

### Google Docs

**Issue:** May not work in edit mode

**Workaround:**
- Switch to "Suggesting" or "Viewing" mode
- Or copy from preview mode

### GitHub

**Issue:** Works but may miss syntax highlighting

**Note:** This is expected - GitHub's syntax highlighting is CSS-based and won't be preserved

---

## Debugging Steps

### 1. Check Console Errors

**For content script:**
1. Open webpage where extension fails
2. Press `F12` to open DevTools
3. Go to Console tab
4. Try using the extension
5. Look for errors starting with "Markdown Copy" or content script errors

**For background script:**
1. Go to `chrome://extensions/`
2. Find "Markdown Copy"
3. Click "service worker" (blue link)
4. Console opens
5. Try using the extension
6. Check for errors

### 2. Verify Installation

```bash
# Check all files are present
cd "/path/to/Markdown Copy"
ls -la

# Should include:
# - manifest.json
# - background.js
# - content.js
# - popup/
# - vendor/
# - icons/
```

### 3. Test on Simple Page

Create a test HTML file:

```html
<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
  <h1>Test Heading</h1>
  <p>Test paragraph with <strong>bold</strong> and <em>italic</em>.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</body>
</html>
```

If it works here but not on other sites, the issue is site-specific.

---

## Still Having Issues?

### Report a Bug

1. **Check existing issues:**
   - Visit: https://github.com/h7nian/markdown-copy/issues
   - Search for your problem

2. **Create new issue with:**
   - Chrome version
   - Extension version
   - Website URL where it fails
   - Steps to reproduce
   - Console errors (if any)
   - Screenshots

### Get Help

- **GitHub Discussions:** https://github.com/h7nian/markdown-copy/discussions
- **Issues:** https://github.com/h7nian/markdown-copy/issues

---

## Recent Fixes

### v1.0.1 (Current)
- ✅ Fixed content script injection on dynamic websites
- ✅ Added automatic retry mechanism
- ✅ Improved support for ChatGPT and similar SPA websites
- ✅ Better error handling and logging

### v1.0.0 (Initial Release)
- Basic functionality
- Known issues with some modern websites

---

## Tips for Best Results

1. **Wait for page to fully load** before using extension
2. **Select clear, well-structured content** when possible
3. **Avoid selecting across multiple iframes** (may not work)
4. **For large selections**, give it a few seconds to process
5. **Check the output** after pasting - manual cleanup may be needed for complex layouts

---

**Last Updated:** November 3, 2025  
**Version:** 1.0.1

