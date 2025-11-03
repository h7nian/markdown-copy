# Markdown Copy

> Convert any webpage content to clean Markdown with a single click

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)](https://chrome.google.com/webstore)

A powerful, privacy-friendly Chrome extension that converts selected webpage content into clean Markdown format. Perfect for researchers, writers, developers, and anyone who works with Markdown.

## ✨ Features

- **🎯 Smart Selection** - Right-click any selected text to convert it to Markdown
- **⌨️ Keyboard Shortcut** - Quick access with `Alt+M` (customizable)
- **📄 Article Extraction** - Automatically extract main article content when nothing is selected
- **🧮 Math Formula Support** - Automatically detect and convert mathematical formulas:
  - MathJax (inline and display formulas)
  - KaTeX (LaTeX extraction from annotations)
  - MathML (converts to LaTeX format)
  - ChatGPT/Claude math expressions
  - Outputs standard `$...$` or `$$...$$` format
- **🎨 GFM Support** - Full GitHub Flavored Markdown support including:
  - Tables with proper formatting
  - Task lists (`- [ ]` and `- [x]`)
  - Code blocks with language detection
  - Strikethrough text
- **🔒 Privacy First** - 100% local processing, no data collection, no external API calls
- **⚡ Fast & Lightweight** - Instant conversion with minimal resource usage
- **🎛️ Customizable** - Configure line break style and notification preferences
- **🌐 Universal Compatibility** - Works on complex sites including ChatGPT, Wikipedia, and more

## 📸 Screenshots

### Extension Popup
The clean, intuitive settings interface allows you to customize the extension behavior:
- Toggle notifications
- Enable/disable article extraction
- Choose line break style

### Context Menu
Simply select any text on a webpage and right-click to access "Copy as Markdown"

### Keyboard Shortcut
Press `Alt+M` (or your custom shortcut) to instantly convert and copy

## 🚀 Installation

### From Chrome Web Store (Recommended)
_Coming soon - Extension under review_

### From Source (Development)
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/markdown-copy.git
   cd markdown-copy
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top right)

4. Click "Load unpacked" and select the extension directory

5. The Markdown Copy icon should appear in your extensions toolbar

## 📖 Usage

### Method 1: Context Menu
1. Select any text on a webpage
2. Right-click and choose "Copy as Markdown"
3. Paste anywhere you need Markdown format

### Method 2: Keyboard Shortcut
1. Select any text on a webpage
2. Press `Alt+M` (or your custom shortcut)
3. Paste the converted Markdown

### Method 3: Extension Popup
1. Select any text on a webpage
2. Click the Markdown Copy icon in the toolbar
3. Click "Copy Selection as Markdown"

### Article Extraction (No Selection)
When you don't select any text, the extension can automatically extract the main article content:
1. Enable "Auto-extract article content" in settings
2. Use any method above without selecting text
3. The extension will intelligently extract and convert the main article

## ⚙️ Settings

Access settings by clicking the extension icon:

- **Show notification after copying** - Display a toast message when Markdown is copied
- **Auto-extract article content** - Extract main article when no text is selected
- **Line break style** - Choose between soft wrap or one line per paragraph

Customize the keyboard shortcut at `chrome://extensions/shortcuts`

## 🛠️ Technical Details

### Architecture
- **Manifest V3** - Modern Chrome extension architecture
- **Content Scripts** - For webpage interaction and HTML extraction
- **Service Worker** - Background processing and message handling
- **Local Storage** - For saving user preferences

### Dependencies
All libraries are bundled locally (no CDN dependencies):
- [Turndown](https://github.com/mixmark-io/turndown) - HTML to Markdown conversion
- [Turndown Plugin GFM](https://github.com/mixmark-io/turndown-plugin-gfm) - GitHub Flavored Markdown support
- [Readability](https://github.com/mozilla/readability) - Article content extraction

### Supported Markdown Elements
- **Headings** (H1-H6)
- **Paragraphs** with smart line breaks
- **Bold** and *italic* text
- **Links** with proper formatting
- **Images** with alt text
- **Lists** (ordered and unordered)
- **Code blocks** with language detection
- **Inline code**
- **Blockquotes**
- **Tables** with alignment
- **Horizontal rules**
- **Task lists**
- **Strikethrough**
- **Math formulas** (MathJax, KaTeX, MathML, ChatGPT)

## 🔒 Privacy & Security

- ✅ **100% Local Processing** - All conversions happen on your device
- ✅ **No Data Collection** - We don't collect, store, or transmit any user data
- ✅ **No External APIs** - No network requests to third-party services
- ✅ **No Tracking** - No analytics or telemetry
- ✅ **Open Source** - Full transparency, inspect the code yourself

### Permissions Explained
- `activeTab` - Access the current tab's content (only when you trigger the extension)
- `contextMenus` - Add right-click menu option
- `storage` - Save your preferences locally
- `clipboardWrite` - Copy Markdown to clipboard
- `notifications` - Show success/error messages (optional)

## 🐛 Known Limitations

- **Cross-origin iframes** - Content inside iframes from different domains cannot be accessed due to browser security restrictions
- **Shadow DOM** - Some heavily encapsulated components may not be fully accessible
- **Dynamic content** - Content that loads after page load may not be captured (refresh the page first)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Clone the repository
2. Make your changes
3. Test locally using "Load unpacked" in Chrome
4. Submit a pull request

### Roadmap (v1.1+)
- [ ] Export to .md file (save directly)
- [ ] Custom rules for specific websites
- [ ] Markdown preview before copying
- [ ] Support for more Markdown flavors
- [ ] Safari and Firefox versions

## 📝 Changelog

### Version 1.0.3 (Latest)
- 🔧 **Improved Error Handling** - Better content script injection with 3x retry logic
- 🔧 Extended wait time (800ms) for script initialization
- 🛡️ URL validation to detect restricted pages (chrome://, edge://, etc.)
- 📢 User-friendly error notifications
- 🧹 Code refactoring with helper functions

### Version 1.0.2
- 🧮 **Math Formula Support** - Auto-detect and convert MathJax, KaTeX, MathML formulas
- 🧮 ChatGPT/Claude math expressions support
- 🧮 Clean LaTeX output (`$...$`, `$$...$$`)

### Version 1.0.1
- 🔧 Fixed: Copy issues on complex sites (ChatGPT, etc.)
- 🔧 Fixed: iframe content support with `all_frames: true`
- 🔧 Enhanced: Dynamic content script injection with retry logic

### Version 1.0.0 (Initial Release)
- ✨ Right-click context menu integration
- ✨ Keyboard shortcut support (Alt+M)
- ✨ Article extraction with Readability
- ✨ GFM support (tables, task lists, code blocks)
- ✨ Customizable settings
- ✨ Privacy-focused design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

- [Turndown](https://github.com/mixmark-io/turndown) by Dom Christie
- [Readability](https://github.com/mozilla/readability) by Mozilla
- Inspired by the need for better web-to-Markdown workflows

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/markdown-copy/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/markdown-copy/discussions)

## ⭐ Show Your Support

If you find this extension helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with others

---

**Made with ❤️ for the Markdown community**

