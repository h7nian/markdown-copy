# Changelog

All notable changes to the Markdown Copy extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-03

### 🎉 Initial Release

The first public release of Markdown Copy - a privacy-first Chrome extension for converting webpage content to clean Markdown format.

### ✨ Added

#### Core Features
- **Selection to Markdown Conversion** - Convert any selected webpage content to clean Markdown format
- **Multiple Entry Points**:
  - Right-click context menu: "Copy as Markdown"
  - Keyboard shortcut: `Alt+M` (customizable in `chrome://extensions/shortcuts`)
  - Extension popup button: "Copy Selection as Markdown"
  
#### Markdown Support
- **Standard Elements**:
  - Headings (H1-H6) with ATX style (`#`)
  - Paragraphs with intelligent line break handling
  - Bold (`**text**`) and italic (`*text*`) formatting
  - Links with proper formatting `[text](url)`
  - Images with alt text `![alt](url)`
  - Ordered and unordered lists
  - Blockquotes
  - Horizontal rules
  - Inline code with backticks
  
- **GitHub Flavored Markdown (GFM)**:
  - Tables with column alignment
  - Task lists (`- [ ]` and `- [x]`)
  - Strikethrough text (`~~text~~`)
  - Code blocks with language detection from `class="language-xxx"` attributes
  
#### User Settings (Configurable via Popup)
- **Show notification after copying** - Display toast message on successful copy
- **Auto-extract article content** - When no selection is made, use Mozilla Readability to extract main article content
- **Line break style** - Choose between:
  - Soft wrap: Preserve original line breaks
  - One line per paragraph: Convert each paragraph to a single line
  
#### Privacy & Performance
- **100% Local Processing** - All HTML to Markdown conversion happens locally
- **No Network Requests** - Zero external API calls or data transmission
- **No Data Collection** - No analytics, tracking, or telemetry
- **Minimal Permissions** - Only essential permissions requested:
  - `activeTab` - Access current page content
  - `contextMenus` - Add right-click menu option
  - `storage` - Save user preferences locally
  - `clipboardWrite` - Write Markdown to clipboard
  - `notifications` - Show toast messages (optional)
  
#### Technical Implementation
- **Manifest V3** - Modern Chrome extension architecture
- **Content Scripts** - Injected only when needed for webpage interaction
- **Service Worker** - Background script for menu and command handling
- **Local Dependencies**:
  - Turndown 7.1.2 - HTML to Markdown conversion
  - Turndown Plugin GFM 1.0.2 - GitHub Flavored Markdown support
  - Mozilla Readability 0.5.0 - Article content extraction
  
#### User Experience
- **Toast Notifications** - Non-intrusive success/error messages
- **Clipboard Fallback** - Automatic fallback to `execCommand` if Clipboard API fails
- **Smart Selection Detection** - Handles multiple ranges and complex selections
- **Clean UI** - Modern, intuitive popup interface with toggle switches
- **Responsive Design** - Works on all screen sizes

### 🔧 Technical Details

#### Performance
- Converts 50,000+ character selections in < 2 seconds
- Minimal memory footprint
- No impact on page load times

#### Compatibility
- Chrome 88+ (Manifest V3 requirement)
- Works on all websites (subject to CSP restrictions)
- Compatible with light and dark themes
- Supports multiple languages (UI in English)

#### Known Limitations
- Cross-origin iframes: Cannot access content in iframes from different domains (browser security restriction)
- Shadow DOM: Limited support for heavily encapsulated web components
- Dynamic content: Content loaded after page load may require page refresh
- CSP-strict sites: Works correctly as all scripts are externally loaded

### 📝 Files Included

```
markdown-copy/
├── manifest.json           # Extension configuration
├── background.js          # Service worker for menu/commands
├── content.js            # Main conversion logic
├── popup/
│   ├── popup.html        # Settings interface
│   ├── popup.js          # Settings logic
│   └── popup.css         # Modern UI styles
├── vendor/
│   ├── turndown.js       # HTML to Markdown converter
│   ├── turndown-plugin-gfm.js  # GFM plugin
│   └── readability.js    # Article extraction
├── icons/
│   ├── 16.png           # Toolbar icon
│   ├── 32.png           # Various sizes
│   ├── 48.png           # for different contexts
│   └── 128.png          # Store listing
├── LICENSE              # MIT License
└── README.md           # Documentation
```

### 🎯 Target Users

This release is designed for:
- **Researchers** - Copy academic papers and citations
- **Developers** - Extract documentation and code samples
- **Writers** - Convert web articles for editing
- **Students** - Save notes and study materials
- **Content Creators** - Prepare content in Markdown format

### 🙏 Acknowledgments

- [Turndown](https://github.com/mixmark-io/turndown) by Dom Christie - HTML to Markdown conversion
- [Turndown Plugin GFM](https://github.com/mixmark-io/turndown-plugin-gfm) - GitHub Flavored Markdown support
- [Mozilla Readability](https://github.com/mozilla/readability) - Article extraction algorithm

---

## [Unreleased]

### Planned for v1.1.0 (2-3 weeks)

- [ ] **Preview Modal** - Preview Markdown before copying with edit capability
- [ ] **Enhanced Tables** - Improved column alignment and formatting
- [ ] **Site Templates** - Pre-configured rules for popular sites (Medium, Wikipedia, GitHub)
- [ ] **Citation Extraction** - Automatically extract and append citation metadata
- [ ] **Export to File** - Save Markdown directly as .md file using `chrome.downloads`
- [ ] **Improved Toast** - Action buttons (Copy again / Download / Close)

### Planned for v1.3.0 (1-2 months)

- [ ] **Cross-origin iframe Support** - Aggregate content from accessible iframes
- [ ] **Shadow DOM Support** - Better handling of web components
- [ ] **Custom Rules Editor** - User-defined CSS selectors to ignore/preserve
- [ ] **Settings Import/Export** - Backup and restore configuration as JSON
- [ ] **Diagnostics Panel** - Detailed error messages and troubleshooting info
- [ ] **Multiple Format Export** - Support for other Markdown flavors

### Ideas for Future Versions

- [ ] Batch conversion of multiple selections
- [ ] Markdown template system
- [ ] Browser sync for settings (optional)
- [ ] Safari and Firefox versions
- [ ] Advanced formatting options (footnotes, citations, etc.)
- [ ] Integration with note-taking apps
- [ ] Custom keyboard shortcuts for different actions

---

## Version History Summary

| Version | Date | Status | Highlights |
|---------|------|--------|------------|
| 1.0.0 | 2025-11-03 | 🟢 Released | Initial release with core features |
| 1.1.0 | TBD | 📋 Planned | Preview, templates, enhanced features |
| 1.3.0 | TBD | 💡 Proposed | Advanced features, custom rules |

---

## Reporting Issues

Found a bug or have a feature request?

- **Bug Reports**: [GitHub Issues](https://github.com/yourusername/markdown-copy/issues/new?template=bug_report.md)
- **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/markdown-copy/discussions/new?category=ideas)
- **Security Issues**: Please email directly (see README for contact info)

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Stay Updated

- 🌟 Star the [GitHub repository](https://github.com/yourusername/markdown-copy)
- 📧 Watch releases for updates
- 💬 Join discussions for feature planning
- 🐦 Follow development updates on Twitter

---

**Thank you for using Markdown Copy!** 🙏

