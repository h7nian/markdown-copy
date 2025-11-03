# Privacy Policy for Markdown Copy

**Last Updated: November 3, 2025**

## Overview

Markdown Copy is a browser extension that converts webpage content to Markdown format. We are committed to protecting your privacy and being transparent about our practices.

**The short version: We collect NO data. Period.**

## Data Collection

### What We Collect
**Absolutely nothing.**

Markdown Copy does not collect, store, transmit, or share any personal information, usage data, or any other form of user data.

### What We DON'T Collect
- ❌ Personal information (name, email, etc.)
- ❌ Browsing history
- ❌ Webpage content you convert
- ❌ Search queries
- ❌ Location data
- ❌ IP addresses
- ❌ Device information
- ❌ Usage statistics
- ❌ Analytics data
- ❌ Crash reports
- ❌ Any form of identifiers

## How the Extension Works

### Local Processing Only
1. When you select text on a webpage and trigger the extension (via context menu, keyboard shortcut, or button)
2. The extension reads the selected HTML content from the current page
3. Conversion from HTML to Markdown happens **entirely on your device**
4. The resulting Markdown is copied to your clipboard
5. **No data leaves your device at any point**

### User Settings
The only data stored by this extension is your preferences:
- Notification preferences (on/off)
- Article extraction setting (on/off)
- Line break style preference (soft/one-per-paragraph)

These settings are stored **locally on your device** using Chrome's `storage.local` API. They are never transmitted to any server, and they remain on your device unless you uninstall the extension.

## Network Requests

**Markdown Copy makes ZERO network requests.**

- ✅ No connections to external servers
- ✅ No API calls to remote services
- ✅ No data transmission of any kind
- ✅ No communication with third parties
- ✅ No tracking pixels or beacons
- ✅ Works completely offline

All required libraries (Turndown, Turndown Plugin GFM, Mozilla Readability) are bundled with the extension and loaded locally.

## Third-Party Services

**We use NO third-party services:**
- No analytics (Google Analytics, etc.)
- No crash reporting (Sentry, etc.)
- No A/B testing platforms
- No advertising networks
- No CDNs (all libraries are bundled)
- No remote fonts or assets

## Permissions Explained

The extension requests the following Chrome permissions. Here's why each is necessary:

### `activeTab`
**Purpose:** Access the content of the currently active tab

**Usage:** When you trigger the extension, we need to read the selected text and HTML structure from the current webpage to convert it to Markdown.

**Privacy:** This permission only grants access when YOU actively trigger the extension. We cannot read tab content at any other time.

### `contextMenus`
**Purpose:** Add "Copy as Markdown" to the right-click menu

**Usage:** Creates the context menu option that appears when you right-click on a webpage.

**Privacy:** This permission does not grant access to any user data.

### `storage`
**Purpose:** Save user preferences locally

**Usage:** Store your settings (notifications, line breaks, article extraction) on your device using Chrome's local storage API.

**Privacy:** Data is stored locally on your device only. It is never synchronized or transmitted.

### `clipboardWrite`
**Purpose:** Copy Markdown to clipboard

**Usage:** After conversion, write the resulting Markdown text to your system clipboard so you can paste it elsewhere.

**Privacy:** We only write the converted Markdown that YOU explicitly requested. We never read from your clipboard.

### `notifications` (optional)
**Purpose:** Display toast messages

**Usage:** Show brief success or error messages after conversion (e.g., "Copied Markdown to clipboard").

**Privacy:** These are purely local UI notifications and contain no personal data.

### `host_permissions: <all_urls>`
**Purpose:** Access webpage content on any site

**Usage:** Users may want to convert content from any website, so we request broad host permissions. However, we ONLY access content when YOU explicitly trigger the conversion.

**Privacy:** Despite having broad permissions, we:
- Only read content when you trigger the extension
- Process all content locally
- Never transmit any content to external servers
- Don't track which websites you visit

## Data Security

Since we collect no data, there is no data to secure, transmit, or potentially breach.

However, we follow security best practices:
- ✅ Use Manifest V3 (modern Chrome extension architecture)
- ✅ Request minimal necessary permissions
- ✅ No code obfuscation (code is readable and auditable)
- ✅ All dependencies are bundled and verified
- ✅ No remote code execution
- ✅ No eval() or unsafe practices

## Children's Privacy

Markdown Copy does not collect any information from anyone, including children under 13. The extension is safe for users of all ages.

## Open Source

Markdown Copy is open source. You can:
- View the complete source code on GitHub
- Audit the code yourself
- Verify that we don't collect any data
- Contribute improvements or report issues

**GitHub Repository:** [https://github.com/yourusername/markdown-copy](https://github.com/yourusername/markdown-copy)

## Changes to This Policy

If we ever change our privacy practices (which would only happen if we add new features that require different data handling), we will:
1. Update this privacy policy
2. Update the "Last Updated" date at the top
3. Notify users through the Chrome Web Store update description
4. Require explicit user consent for any new data collection

However, we are committed to our privacy-first approach and have no plans to collect user data.

## Your Rights

Since we don't collect any data, there is:
- No data to access
- No data to delete
- No data to export
- No data to correct

Your settings are stored locally on your device. You can:
- View them in the extension popup
- Change them at any time
- Reset them by reinstalling the extension
- Delete them by uninstalling the extension

## Compliance

### GDPR (European Union)
Markdown Copy is fully GDPR compliant because:
- We don't collect personal data
- No data processing occurs
- No data is transferred
- Users' rights are inherently protected

### CCPA (California)
Markdown Copy complies with CCPA because:
- We don't sell personal information (we don't have any)
- We don't share personal information with third parties
- We don't collect personal information

### Other Privacy Laws
Since we collect no data, we inherently comply with privacy regulations worldwide.

## Contact Us

If you have questions about this privacy policy or our practices:

- **GitHub Issues:** [https://github.com/yourusername/markdown-copy/issues](https://github.com/yourusername/markdown-copy/issues)
- **GitHub Discussions:** [https://github.com/yourusername/markdown-copy/discussions](https://github.com/yourusername/markdown-copy/discussions)
- **Email:** your.email@example.com

## Transparency Report

### Data Requests
We have received **zero** requests for user data because we have no user data to provide.

### Third-Party Disclosure
We have disclosed user data to third parties **zero** times because we have no user data.

### Security Incidents
We have had **zero** security incidents involving user data because we collect no user data.

## Summary

To summarize our privacy policy in the simplest terms:

| What We Collect | What We Do With It |
|----------------|-------------------|
| Nothing | Nothing |

**Markdown Copy is privacy-first by design. Your data stays on your device, always.**

---

**Trust is earned through transparency. Thank you for trusting Markdown Copy.**

---

## Acknowledgments

Our privacy-first approach is inspired by:
- [Mozilla's Privacy Principles](https://www.mozilla.org/privacy/principles/)
- [Privacy by Design Framework](https://www.ipc.on.ca/wp-content/uploads/Resources/7foundationalprinciples.pdf)
- The broader privacy-focused software community

---

## Version History

**v1.0 (November 3, 2025)**
- Initial privacy policy
- Confirmed zero data collection
- Documented all permissions and their usage

