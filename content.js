// Content Script for Markdown Copy Extension
// Handles selection capture, HTML to Markdown conversion, and clipboard operations

(function () {
  'use strict';

  // Default settings
  const defaultSettings = {
    notify: true,
    autoReadability: true,
    lineBreaks: "soft" // "soft" or "one-per-paragraph"
  };

  /**
   * Load settings from chrome.storage
   */
  function getSettings() {
    return new Promise((resolve) => {
      chrome.storage.local.get(defaultSettings, (res) => resolve(res));
    });
  }

  /**
   * Convert a Range to HTML string
   */
  function selectionRangeToHTML(range) {
    const container = document.createElement("div");
    container.appendChild(range.cloneContents());
    return container.innerHTML;
  }

  /**
   * Get HTML string from current selection
   */
  function getSelectionHTML() {
    const selection = window.getSelection && window.getSelection();
    if (!selection || selection.rangeCount === 0) return "";
    
    const range = selection.getRangeAt(0);
    if (range.collapsed) return "";
    
    return selectionRangeToHTML(range);
  }

  /**
   * Extract main article content using Readability
   */
  function extractMainArticleHTML() {
    try {
      // Clone document to avoid modifying the current page
      const docClone = document.cloneNode(true);
      const reader = new Readability(docClone);
      const article = reader.parse();
      
      if (article && article.content) {
        return article.content; // HTML string
      }
    } catch (e) {
      console.warn("Readability extraction failed:", e);
    }
    return "";
  }

  /**
   * Create and configure Turndown instance based on settings
   */
  function makeTurndownInstance(settings) {
    // Initialize Turndown with basic options
    const td = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      emDelimiter: "*"
    });

    // Add GFM plugin for tables, task lists, and strikethrough
    if (typeof turndownPluginGfm !== "undefined") {
      td.use(turndownPluginGfm.gfm);
    }

    // Custom rule for line breaks
    if (settings.lineBreaks === "one-per-paragraph") {
      td.addRule("singleLineParagraph", {
        filter: "p",
        replacement: function (content) {
          return content.trim() ? content.trim() + "\n" : "";
        }
      });
    }

    // Enhanced code block rule with language detection
    td.addRule("fencedCodeWithLang", {
      filter: function (node) {
        return (
          node.nodeName === "PRE" &&
          node.firstElementChild &&
          node.firstElementChild.nodeName === "CODE"
        );
      },
      replacement: function (content, node) {
        const code = node.firstElementChild;
        const className = code.getAttribute("class") || "";
        const lang = (className.match(/language-([a-z0-9+-]+)/i) || [])[1] || "";
        const inner = code.textContent || "";
        return "\n```" + lang + "\n" + inner.replace(/\n$/, "") + "\n```\n";
      }
    });

    // Enhanced image rule with alt fallback to title
    td.addRule("imageAltFallback", {
      filter: "img",
      replacement: function (content, node) {
        const src = node.getAttribute("src") || "";
        let alt = node.getAttribute("alt") || node.getAttribute("title") || "";
        alt = alt.replace(/\]/g, "\\]");
        return src ? `![${alt}](${src})` : "";
      }
    });

    return td;
  }

  /**
   * Copy text to clipboard
   */
  async function copyToClipboard(text) {
    try {
      // Modern clipboard API
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Fallback for older browsers using execCommand
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        return false;
      }
    }
  }

  /**
   * Show a toast notification
   */
  function showToast(message, duration = 1800) {
    const el = document.createElement("div");
    el.textContent = message;
    Object.assign(el.style, {
      position: "fixed",
      zIndex: "2147483647",
      bottom: "24px",
      right: "24px",
      background: "rgba(0, 0, 0, 0.85)",
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      maxWidth: "40vw",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
      transition: "opacity 0.3s ease-in-out",
      opacity: "0"
    });
    
    document.body.appendChild(el);
    
    // Fade in
    requestAnimationFrame(() => {
      el.style.opacity = "1";
    });
    
    // Fade out and remove
    setTimeout(() => {
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  /**
   * Main function to handle markdown copy operation
   */
  async function handleCopy() {
    try {
      const settings = await getSettings();
      let html = getSelectionHTML();

      // If no selection, try to extract article content if enabled
      if (!html && settings.autoReadability) {
        html = extractMainArticleHTML();
      }

      // If still no content, show error message
      if (!html) {
        if (settings.notify) {
          showToast("⚠️ No selection found. Please select text or enable article extraction.");
        }
        return;
      }

      // Create Turndown instance with user settings
      const td = makeTurndownInstance(settings);

      // Wrap HTML in a container for consistent conversion
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;

      // Convert to Markdown
      const markdown = td.turndown(wrapper);

      // Copy to clipboard
      const success = await copyToClipboard(markdown);

      // Show notification if enabled
      if (settings.notify) {
        showToast(
          success 
            ? "✓ Markdown copied to clipboard!" 
            : "✗ Failed to copy to clipboard"
        );
      }
    } catch (error) {
      console.error("Error in handleCopy:", error);
      showToast("✗ Error: " + error.message);
    }
  }

  // Listen for messages from background script or popup
  chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
    if (msg && msg.type === "COPY_MARKDOWN") {
      handleCopy();
    }
  });

  console.log("Markdown Copy content script loaded");
})();

