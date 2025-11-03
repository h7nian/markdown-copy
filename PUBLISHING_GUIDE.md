# Publishing Guide - Markdown Copy Extension

This guide covers the complete process for publishing the Markdown Copy extension to the Chrome Web Store and GitHub.

## Table of Contents
1. [Pre-Publishing Checklist](#pre-publishing-checklist)
2. [Chrome Web Store Publishing](#chrome-web-store-publishing)
3. [GitHub Repository Setup](#github-repository-setup)
4. [Post-Publishing Steps](#post-publishing-steps)

---

## Pre-Publishing Checklist

### ✅ Code Quality
- [ ] All features working as expected
- [ ] No console errors in normal operation
- [ ] Tested on multiple websites (Wikipedia, Medium, GitHub, ArXiv, etc.)
- [ ] Performance test: 50k+ character selection converts in <2s
- [ ] Clipboard fallback (execCommand) works when clipboard API fails
- [ ] All permissions are minimal and justified

### ✅ Files & Assets
- [ ] `manifest.json` - Version number correct, all fields complete
- [ ] All icon sizes present (16x16, 32x32, 48x48, 128x128)
- [ ] README.md - Comprehensive and up-to-date
- [ ] LICENSE file included
- [ ] CHANGELOG.md created
- [ ] Privacy policy documented

### ✅ Testing Matrix
Test on:
- [ ] Windows Chrome (latest)
- [ ] macOS Chrome (latest)
- [ ] Linux Chrome (latest)
- [ ] Light and dark mode websites
- [ ] CSP-strict websites
- [ ] Long articles (10,000+ words)
- [ ] Complex layouts (tables, code blocks, nested lists)

---

## Chrome Web Store Publishing

### Step 1: Developer Account Setup

1. **Register Chrome Web Store Developer Account**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Sign in with your Google account
   - Pay one-time $5 registration fee
   - Complete account verification

### Step 2: Prepare Store Listing Materials

#### A. Store Listing Text

**Extension Name (45 characters max)**
```
Markdown Copy - Web to Markdown
```

**Short Description (132 characters max - English)**
```
Copy selected web content as clean Markdown. 100% local, no network requests. GFM tables, code blocks, privacy-first.
```

**Short Description (132 characters max - Chinese)**
```
一键复制网页内容为 Markdown。纯本地、零网络请求。支持 GFM 表格、代码块，隐私优先。
```

**Detailed Description (English)**
```markdown
Convert any webpage content to clean Markdown format with a single click. Perfect for researchers, writers, developers, and anyone who works with Markdown.

🎯 KEY FEATURES

• Smart Selection - Right-click any selected text to convert to Markdown
• Keyboard Shortcut - Quick access with Alt+M (customizable)
• Article Extraction - Auto-extract main content when nothing is selected
• GFM Support - Tables, task lists, code blocks with language detection
• Privacy First - 100% local processing, no data collection, no network requests
• Lightweight - Instant conversion with minimal resource usage
• Customizable - Configure line breaks and notification preferences

📝 SUPPORTED MARKDOWN ELEMENTS

• Headings (H1-H6)
• Paragraphs with smart line breaks
• Bold and italic text
• Links and images with alt text
• Lists (ordered and unordered)
• Code blocks with language detection
• Inline code
• Blockquotes
• Tables with alignment
• Horizontal rules
• Task lists
• Strikethrough

🔒 PRIVACY & SECURITY

✓ 100% Local Processing - All conversions happen on your device
✓ No Data Collection - We don't collect, store, or transmit any data
✓ No External APIs - No network requests to third-party services
✓ No Tracking - No analytics or telemetry
✓ Minimal Permissions - Only what's needed for core functionality

📖 HOW TO USE

Method 1: Context Menu
1. Select text on any webpage
2. Right-click → "Copy as Markdown"
3. Paste anywhere

Method 2: Keyboard Shortcut
1. Select text on any webpage
2. Press Alt+M
3. Paste the Markdown

Method 3: Extension Button
1. Select text on any webpage
2. Click the extension icon
3. Click "Copy Selection as Markdown"

⚙️ SETTINGS

• Show notification after copying
• Auto-extract article when no selection
• Line break style (soft wrap or one per paragraph)
• Customize keyboard shortcut

🎓 PERFECT FOR

• Researchers - Copy academic papers to Obsidian/Notion
• Developers - Copy documentation to README files
• Writers - Convert web content to clean Markdown
• Students - Save lecture notes and articles
• Content Creators - Prepare content for publishing

💡 COMING SOON (v1.1)

• Preview before copying
• Site-specific templates
• Enhanced table alignment
• Export to .md file
• Custom rules editor
```

**Detailed Description (Chinese)**
```markdown
一键将任意网页内容转换为干净的 Markdown 格式。专为科研人员、写作者、开发者及 Markdown 用户设计。

🎯 核心功能

• 智能选区 - 右键选中文本即可转换为 Markdown
• 快捷键 - Alt+M 快速访问（可自定义）
• 正文提取 - 无选区时自动提取主要内容
• GFM 支持 - 表格、任务列表、带语言标识的代码块
• 隐私优先 - 100% 本地处理，无数据收集，无网络请求
• 轻量级 - 即时转换，最小资源占用
• 可定制 - 配置换行方式和通知偏好

📝 支持的 Markdown 元素

• 标题（H1-H6）
• 段落与智能换行
• 粗体和斜体
• 链接和图片（含 alt 文本）
• 列表（有序和无序）
• 代码块（含语言识别）
• 行内代码
• 引用块
• 表格（含对齐）
• 水平线
• 任务列表
• 删除线

🔒 隐私与安全

✓ 100% 本地处理 - 所有转换在本地完成
✓ 无数据收集 - 不收集、存储或传输任何数据
✓ 无外部 API - 不向第三方服务发送请求
✓ 无追踪 - 无分析或遥测
✓ 最小权限 - 仅请求核心功能所需权限

📖 使用方法

方法一：右键菜单
1. 在网页上选中文本
2. 右键 → "Copy as Markdown"
3. 粘贴到任意位置

方法二：快捷键
1. 在网页上选中文本
2. 按 Alt+M
3. 粘贴 Markdown 内容

方法三：扩展按钮
1. 在网页上选中文本
2. 点击扩展图标
3. 点击"复制为 Markdown"

⚙️ 设置选项

• 复制后显示通知
• 无选区时自动提取正文
• 换行样式（软换行或每段一行）
• 自定义快捷键

🎓 适用场景

• 科研人员 - 复制论文到 Obsidian/Notion
• 开发者 - 复制文档到 README 文件
• 写作者 - 转换网页内容为 Markdown
• 学生 - 保存课堂笔记和文章
• 内容创作者 - 准备发布内容

💡 即将推出（v1.1）

• 复制前预览
• 站点特定模板
• 增强表格对齐
• 导出为 .md 文件
• 自定义规则编辑器
```

**Category**
```
Productivity
```

**Language**
```
English (United States)
Chinese (Simplified)
```

**Keywords/Tags** (separate by commas, max 20)
```
markdown, copy, web clipper, converter, GFM, tables, code blocks, privacy, local, offline, selection, article extraction, turndown, readability, academic, research, note taking
```

#### B. Screenshots (1280x800 or 1920x1080)

You need to create 5-6 high-quality screenshots showing:

1. **Main Demo** - Selecting text and copying as Markdown
2. **Context Menu** - Right-click menu option
3. **Extension Popup** - Settings interface
4. **GFM Tables** - Table conversion example
5. **Code Blocks** - Code block with language detection
6. **Before/After** - Side-by-side comparison (web content vs Markdown output)

**Screenshot Specifications:**
- Minimum: 1280x800
- Maximum: 2560x1600 (or 3840x2400 for Retina)
- Format: PNG or JPEG
- File size: < 5MB each
- Add captions to highlight features

#### C. Promotional Images (Optional but Recommended)

**Small Promotional Tile** (440x280 pixels)
- Branding image for search results
- PNG or JPEG
- Show app icon + key feature

**Marquee Promotional Tile** (1400x560 pixels)
- Featured placement (if selected by Google)
- PNG or JPEG
- Professional design with key value proposition

#### D. Video (Optional but Highly Recommended)

- YouTube video demonstrating the extension
- 30-90 seconds
- Show: install → select text → copy → paste result
- Include voiceover or captions

### Step 3: Create ZIP Package

1. **Clean the directory:**
```bash
# Remove development files
rm -f generate_icons.py icon_template.svg
rm -f PUBLISHING_GUIDE.md
```

2. **Verify file structure:**
```
markdown-copy/
├── manifest.json
├── background.js
├── content.js
├── popup/
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── vendor/
│   ├── turndown.js
│   ├── turndown-plugin-gfm.js
│   └── readability.js
├── icons/
│   ├── 16.png
│   ├── 32.png
│   ├── 48.png
│   └── 128.png
├── LICENSE
└── README.md
```

3. **Create ZIP file:**
```bash
cd "/Users/zhan9381/Desktop/Git Repo/Markdown Copy"
zip -r markdown-copy-v1.0.0.zip . -x "*.git*" "*.DS_Store" "node_modules/*" "*.md" "store/*" "*.py" "*.svg"
```

### Step 4: Submit to Chrome Web Store

1. **Go to Developer Dashboard**
   - Navigate to https://chrome.google.com/webstore/devconsole
   - Click "New Item"

2. **Upload ZIP**
   - Upload your `markdown-copy-v1.0.0.zip`
   - Wait for automatic checks to complete

3. **Fill Store Listing**
   - Product Details: Name, Summary, Description
   - Graphic Assets: Icons, Screenshots, Promotional images
   - Privacy: Complete privacy practices section
   - Category: Productivity
   - Language: English + Chinese

4. **Privacy Practices** (Important!)
```
Single purpose description:
Convert selected webpage content to Markdown format locally.

Permission justifications:
- activeTab: Access current page content for conversion
- contextMenus: Add right-click menu option
- storage: Save user preferences locally
- clipboardWrite: Copy Markdown to clipboard
- notifications: Show success/error messages (optional)
- host_permissions: Access page content on all websites

Data usage:
☑ This extension does NOT collect or transmit any user data
☑ All processing is done locally on user's device
☑ No external network requests
☑ No analytics or tracking
```

5. **Distribution**
   - Visibility: Public
   - Regions: All regions (or select specific)
   - Pricing: Free

6. **Submit for Review**
   - Review all information
   - Click "Submit for Review"
   - Typical review time: 1-3 business days

### Step 5: Review Process

**What Google Reviews:**
- Code security and quality
- Permission usage justification
- Privacy policy compliance
- Functionality matches description
- No malicious code

**Common Rejection Reasons:**
- Excessive permissions
- Missing privacy policy
- Misleading descriptions
- Code obfuscation
- Broken functionality

**If Rejected:**
- Read rejection email carefully
- Fix all mentioned issues
- Resubmit with changes explained

---

## GitHub Repository Setup

### Step 1: Create Repository

1. **Create new repository on GitHub**
```
Repository name: markdown-copy
Description: Convert webpage content to clean Markdown. Privacy-first Chrome extension.
Visibility: Public
License: MIT
```

2. **Initialize local git** (if not already done)
```bash
cd "/Users/zhan9381/Desktop/Git Repo/Markdown Copy"
git init
git add .
git commit -m "Initial release v1.0.0"
git branch -M main
git remote add origin https://github.com/yourusername/markdown-copy.git
git push -u origin main
```

### Step 2: Create Release

1. **Tag the release**
```bash
git tag -a v1.0.0 -m "Version 1.0.0 - Initial Release"
git push origin v1.0.0
```

2. **Create GitHub Release**
   - Go to repository → Releases → "Draft a new release"
   - Tag: v1.0.0
   - Title: "Version 1.0.0 - Initial Release"
   - Description: Copy from CHANGELOG.md
   - Attach: `markdown-copy-v1.0.0.zip`
   - Click "Publish release"

### Step 3: Setup Repository

1. **Add Topics** (for discoverability)
```
chrome-extension, markdown, web-clipper, privacy, turndown, 
readability, gfm, productivity, offline, local-first
```

2. **Create Issues Templates**
   - Bug report template
   - Feature request template

3. **Add GitHub Actions** (Optional)
   - Automated testing
   - Release automation

4. **Update README badges**
   - Add Chrome Web Store link
   - Add version badge
   - Add license badge
   - Add download count badge (after published)

### Step 4: Documentation Website (Optional)

Create a GitHub Pages site:

1. Create `docs/` directory
2. Add `index.html` with:
   - Feature overview
   - Installation instructions
   - Usage examples
   - FAQ
   - Privacy policy
3. Enable GitHub Pages in repository settings

Example structure:
```
docs/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── demo.gif
    └── screenshots/
```

---

## Post-Publishing Steps

### Immediate Actions

1. **Monitor Reviews**
   - Check Chrome Web Store reviews daily
   - Respond to user feedback
   - Address bugs quickly

2. **Share the Extension**
   - Social media announcement
   - Product Hunt launch
   - Reddit communities (r/chrome, r/markdown)
   - Hacker News Show HN
   - Twitter/X announcement

3. **Track Metrics**
   - Installation count
   - User reviews and ratings
   - Bug reports
   - Feature requests

### Marketing Checklist

**Week 1:**
- [ ] Launch announcement on social media
- [ ] Post on Product Hunt
- [ ] Share in relevant subreddits
- [ ] Email to beta testers (if any)
- [ ] Update personal website/portfolio

**Week 2:**
- [ ] Write blog post about development process
- [ ] Submit to extension galleries/lists
- [ ] Reach out to tech bloggers
- [ ] Answer questions on Stack Overflow

**Ongoing:**
- [ ] Monthly feature updates
- [ ] Respond to all reviews
- [ ] Maintain GitHub issues
- [ ] Build community

### Long-term Maintenance

**Monthly:**
- Review and respond to user feedback
- Plan next version features
- Update documentation
- Check for dependency updates

**Quarterly:**
- Major feature release
- Performance improvements
- Security audit
- Update screenshots/promotional materials

**Yearly:**
- Comprehensive refactoring
- API updates (Chrome extensions)
- Redesign if needed

---

## Troubleshooting

### Common Issues During Publishing

**Issue: "Permission Warning"**
- Solution: Justify all permissions in manifest
- Remove unnecessary permissions
- Use `activeTab` instead of broad host permissions when possible

**Issue: "Privacy Policy Missing"**
- Solution: Add detailed privacy section in store listing
- Create separate PRIVACY.md file
- Link to privacy policy in extension

**Issue: "Functionality Broken"**
- Solution: Test in fresh Chrome profile
- Clear extension cache
- Check console for errors

**Issue: "Rejected for Misleading Content"**
- Solution: Ensure screenshots match actual functionality
- Don't overpromise features
- Update description to be accurate

---

## Resources

### Official Documentation
- [Chrome Web Store Developer Documentation](https://developer.chrome.com/docs/webstore/)
- [Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Publishing Policies](https://developer.chrome.com/docs/webstore/program-policies/)

### Useful Tools
- [Extension Source Viewer](https://chrome.google.com/webstore/detail/chrome-extension-source-v/jifpbeccnghkjeaalbbjmodiffmgedin) - Review other extensions
- [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli) - Build tools
- [Web Store Upload Tool](https://github.com/DrewML/chrome-webstore-upload-cli) - Automate uploads

### Communities
- [r/chrome](https://reddit.com/r/chrome)
- [r/chromeextensions](https://reddit.com/r/chromeextensions)
- [Chromium Extensions Google Group](https://groups.google.com/a/chromium.org/g/chromium-extensions)

---

## Version Roadmap

### v1.0.0 (Current - MVP)
✅ Selection to Markdown conversion
✅ Context menu + keyboard shortcut + popup
✅ GFM support (tables, task lists, code blocks)
✅ Article extraction (optional)
✅ Privacy-first design

### v1.1.0 (Planned - 2-3 weeks)
🔲 Preview modal before copying
🔲 Enhanced table alignment
🔲 Site-specific templates
🔲 Citation metadata extraction
🔲 Export to .md file

### v1.3.0 (Planned - 1-2 months)
🔲 Cross-origin iframe support
🔲 Shadow DOM support
🔲 Custom rules editor
🔲 Import/export settings
🔲 Failure diagnostics panel

---

## Support & Contact

**Bug Reports:** [GitHub Issues](https://github.com/yourusername/markdown-copy/issues)
**Feature Requests:** [GitHub Discussions](https://github.com/yourusername/markdown-copy/discussions)
**Email:** your.email@example.com

---

**Good luck with your launch! 🚀**

