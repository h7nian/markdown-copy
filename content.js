// Content Script for Markdown Copy Extension
// Handles selection capture, HTML to Markdown conversion, and clipboard operations

(function () {
  'use strict';

  // Prevent multiple initialization - use a more robust check
  if (window.top.__markdownCopyInitialized) {
    console.log('Markdown Copy already initialized, skipping duplicate load');
    return;
  }
  window.top.__markdownCopyInitialized = true;
  window.__markdownCopyInitialized = true;

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
   * Enable text selection on the page (bypass copy restrictions)
   */
  function enableSelection() {
    // 1. Remove CSS that prevents selection
    const style = document.createElement('style');
    style.id = 'markdown-copy-enable-selection';
    style.textContent = `
      * {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
        -webkit-touch-callout: default !important;
        pointer-events: auto !important;
      }
      body {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
        pointer-events: auto !important;
      }
      html {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;
    
    // Only add if not already present
    if (!document.getElementById('markdown-copy-enable-selection')) {
      document.head.appendChild(style);
      
      // Remove after a longer delay for better compatibility
      setTimeout(() => {
        const elem = document.getElementById('markdown-copy-enable-selection');
        if (elem) elem.remove();
      }, 10000);
    }
    
    // 2. Remove event listeners that block copy/selection
    const events = ['copy', 'cut', 'contextmenu', 'selectstart', 'mousedown', 'mouseup', 'keydown', 'keyup', 'dragstart'];
    
    // Remove inline event handlers from multiple targets
    const targets = [document, document.body, document.documentElement];
    targets.forEach(target => {
      if (target) {
        target.oncopy = null;
        target.oncut = null;
        target.onselectstart = null;
        target.oncontextmenu = null;
        target.onmousedown = null;
        target.onmouseup = null;
        target.ondragstart = null;
        target.onkeydown = null;
        target.onkeyup = null;
      }
    });
    
    // Remove event listeners from common blocking elements
    const blockingElements = document.querySelectorAll('[oncopy], [oncut], [onselectstart], [oncontextmenu], [ondragstart]');
    blockingElements.forEach(el => {
      el.oncopy = null;
      el.oncut = null;
      el.onselectstart = null;
      el.oncontextmenu = null;
      el.ondragstart = null;
      el.onmousedown = null;
      el.onmouseup = null;
    });
    
    // 3. Override common anti-copy functions
    try {
      // Protect getSelection
      if (window.getSelection) {
        const originalGetSelection = window.getSelection;
        window.getSelection = function() {
          return originalGetSelection.call(window);
        };
      }
      
      // Override addEventListener to prevent new copy blockers
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        // Allow our extension's listeners but block copy-prevention listeners
        if (['copy', 'cut', 'selectstart', 'contextmenu'].includes(type)) {
          // Check if this is likely a blocking listener
          const listenerStr = listener.toString();
          if (listenerStr.includes('preventDefault') || 
              listenerStr.includes('return false') ||
              listenerStr.includes('stopPropagation')) {
            console.log('Blocked copy-prevention listener for:', type);
            return; // Don't add the blocking listener
          }
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    } catch (e) {
      console.log('Could not override functions:', e);
    }
    
    // 4. Force enable text selection using attributes
    try {
      document.body.setAttribute('unselectable', 'off');
      document.body.setAttribute('onselectstart', 'return true;');
      document.documentElement.setAttribute('unselectable', 'off');
    } catch (e) {
      console.log('Could not set attributes:', e);
    }
  }

  /**
   * Force select element and get its HTML (for heavily restricted sites)
   */
  function forceSelectAndExtract() {
    try {
      // Try to find the main content area (including CSDN-specific selectors)
      const contentSelectors = [
        // CSDN specific - try multiple variations
        '#content_views',
        'div#content_views',
        '#article_content',
        '.blog-content-box',
        'article.blog-content-box',
        '.markdown_views',
        '.htmledit_views',
        // CSDN main box
        '#mainBox article',
        '#mainBox main',
        // Generic but common
        'article[id*="content"]',
        'article[class*="content"]',
        'div[class*="article-content"]',
        'div[id*="article"]',
        '[role="main"]',
        'article',
        'main article',
        'main',
        '.article-content',
        '.content',
        '#content',
        '.markdown-body',
        '.post-content',
        '.entry-content',
        '.main-content'
      ];
      
      let contentElement = null;
      let foundSelector = '';
      
      // Try each selector
      for (const selector of contentSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          // Check if element has substantial text content (>200 chars)
          const textContent = element.textContent || '';
          if (textContent.trim().length > 200) {
            contentElement = element;
            foundSelector = selector;
            console.log(`Found content element: "${selector}" with ${textContent.trim().length} characters`);
            break;
          }
        }
      }
      
      // If still not found, find the largest text-containing element
      if (!contentElement) {
        console.log('No selector matched, searching for largest text container...');
        
        const candidates = document.querySelectorAll('article, main, div[class*="content"], div[id*="content"], section');
        let maxLength = 0;
        
        for (const candidate of candidates) {
          // Skip elements that are likely ads or navigation
          const className = (candidate.className || '').toLowerCase();
          const id = (candidate.id || '').toLowerCase();
          
          if (className.includes('ad') || className.includes('banner') ||
              className.includes('nav') || className.includes('header') ||
              className.includes('footer') || className.includes('sidebar') ||
              className.includes('comment') ||
              id.includes('ad') || id.includes('nav') || id.includes('header') ||
              id.includes('footer') || id.includes('sidebar')) {
            continue;
          }
          
          const textLength = (candidate.textContent || '').trim().length;
          if (textLength > maxLength && textLength > 500) {
            maxLength = textLength;
            contentElement = candidate;
            foundSelector = `largest-container(${textLength} chars)`;
          }
        }
        
        if (contentElement) {
          console.log(`Using ${foundSelector}`);
        }
      }
      
      if (!contentElement) {
        console.log('Still no content found, using body as last resort');
        contentElement = document.body;
        foundSelector = 'body(fallback)';
      }
      
      // Create a range that selects the content
      const range = document.createRange();
      range.selectNodeContents(contentElement);
      
      // Force the selection
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      
      console.log(`Forced selection applied on: ${foundSelector}`);
      
      // Extract HTML
      const html = selectionRangeToHTML(range);
      
      // Clear the selection after extraction
      setTimeout(() => {
        try {
          selection.removeAllRanges();
        } catch (e) {
          // Ignore errors when clearing selection
        }
      }, 100);
      
      return html;
    } catch (e) {
      console.error('Force select failed:', e);
      return "";
    }
  }

  /**
   * Get HTML string from current selection
   */
  function getSelectionHTML() {
    // Try to enable selection first (bypass restrictions)
    enableSelection();
    
    let selection = window.getSelection && window.getSelection();
    
    // Check if user has made a valid selection
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (!range.collapsed) {
        // User has selected something, use that
        const selectedText = selection.toString().trim();
        if (selectedText.length > 10) {  // Meaningful selection (>10 chars)
          console.log(`Using user selection (${selectedText.length} chars)`);
          return selectionRangeToHTML(range);
        }
      }
    }
    
    // No valid user selection, try to force select main content
    console.log('No valid selection detected, attempting force select...');
    
    // Try to force select the main content
    const forcedHTML = forceSelectAndExtract();
    if (forcedHTML) {
      return forcedHTML;
    }
    
    return "";
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

    // Wikipedia math formula support - must come before general image rule
    td.addRule("wikipediaMath", {
      filter: function (node) {
        // Wikipedia wraps math in specific elements
        if (node.nodeName === "SPAN") {
          const className = node.getAttribute("class") || "";
          return className.includes("mwe-math-element") || 
                 className.includes("mw-inlineMath") ||
                 className.includes("mw-displayMath");
        }
        return false;
      },
      replacement: function (content, node) {
        // Try to get LaTeX from img alt attribute (Wikipedia's approach)
        const img = node.querySelector("img.mwe-math-fallback-image-inline, img.mwe-math-fallback-image-display");
        if (img) {
          let latex = img.getAttribute("alt") || "";
          
          if (latex) {
            // Clean up Wikipedia's LaTeX wrapping
            // Remove {\displaystyle ...} or {\textstyle ...} wrapper
            latex = latex.replace(/^\{\\displaystyle\s+/, "").replace(/\}$/, "");
            latex = latex.replace(/^\{\\textstyle\s+/, "").replace(/\}$/, "");
            
            // Trim whitespace
            latex = latex.trim();
            
            if (!latex) return "";
            
            // Determine if display or inline based on class
            const isDisplay = node.className.includes("displayMath") || 
                            img.className.includes("display");
            
            return isDisplay ? `$$\n${latex}\n$$` : `$${latex}$`;
          }
        }
        
        // Fallback: if no img found, skip this element (the img rule will handle it)
        return "";
      }
    });

    // Enhanced image rule with alt fallback to title
    td.addRule("imageAltFallback", {
      filter: "img",
      replacement: function (content, node) {
        const src = node.getAttribute("src") || "";
        let alt = node.getAttribute("alt") || node.getAttribute("title") || "";
        
        // Skip math formula images (Wikipedia and similar sites)
        // These are rendered versions of LaTeX and should be ignored
        if (alt.includes("\\displaystyle") || 
            alt.includes("\\textstyle") ||
            alt.startsWith("{\\displaystyle") ||
            alt.includes("\\operatorname") ||
            src.includes("/math/render/") ||
            src.includes("wikimedia.org/api/rest_v1/media/math/")) {
          return ""; // Skip this image, LaTeX is handled by wikipediaMath rule
        }
        
        alt = alt.replace(/\]/g, "\\]");
        return src ? `![${alt}](${src})` : "";
      }
    });

    // Math formula support - MathJax inline formulas
    td.addRule("mathJaxInline", {
      filter: function (node) {
        // MathJax inline: span.mjx-math, span.MathJax, etc.
        if (node.nodeName === "SPAN" || node.nodeName === "SCRIPT") {
          const className = node.getAttribute("class") || "";
          const type = node.getAttribute("type") || "";
          return (
            className.includes("mjx-math") ||
            className.includes("MathJax") ||
            type === "math/tex" ||
            type === "math/asciimath"
          );
        }
        return false;
      },
      replacement: function (content, node) {
        // Try to get LaTeX from various attributes
        const latex = 
          node.getAttribute("data-latex") ||
          node.getAttribute("data-formula") ||
          node.getAttribute("data-math") ||
          node.textContent;
        
        if (!latex) return content;
        
        // Clean up LaTeX string
        let formula = latex.trim();
        
        // Check if already wrapped in $ or $$
        if (formula.startsWith("$") && formula.endsWith("$")) {
          return formula;
        }
        
        // Check if it's a display formula (multiline or contains \\)
        const isDisplay = formula.includes("\\\\") || formula.includes("\\begin");
        
        // Wrap in appropriate delimiters
        return isDisplay ? `$$${formula}$$` : `$${formula}$`;
      }
    });

    // Math formula support - KaTeX formulas
    td.addRule("katexFormula", {
      filter: function (node) {
        const className = node.getAttribute("class") || "";
        return (
          className.includes("katex") ||
          className.includes("katex-display") ||
          className.includes("katex-html")
        );
      },
      replacement: function (content, node) {
        // Look for annotation tag that contains LaTeX
        const annotation = node.querySelector("annotation, .katex-mathml annotation");
        if (annotation) {
          const latex = annotation.textContent.trim();
          const isDisplay = node.classList.contains("katex-display");
          return isDisplay ? `$$\n${latex}\n$$` : `$${latex}$`;
        }
        
        // Fallback: try to get from data attributes
        const latex = 
          node.getAttribute("data-latex") ||
          node.getAttribute("data-formula");
        
        if (latex) {
          const isDisplay = node.classList.contains("katex-display");
          return isDisplay ? `$$\n${latex}\n$$` : `$${latex}$`;
        }
        
        // Last resort: return content
        return content;
      }
    });

    // Math formula support - MathML to LaTeX (basic conversion)
    td.addRule("mathMLFormula", {
      filter: "math",
      replacement: function (content, node) {
        // Try to get annotation (LaTeX) from MathML
        const annotation = node.querySelector("annotation[encoding='application/x-tex']");
        if (annotation) {
          const latex = annotation.textContent.trim();
          const display = node.getAttribute("display") === "block";
          return display ? `$$\n${latex}\n$$` : `$${latex}$`;
        }
        
        // Try alternative annotation encoding
        const altAnnotation = node.querySelector("annotation");
        if (altAnnotation) {
          const latex = altAnnotation.textContent.trim();
          const display = node.getAttribute("display") === "block";
          return display ? `$$\n${latex}\n$$` : `$${latex}$`;
        }
        
        // Basic MathML to LaTeX conversion for simple cases
        const mtext = node.textContent.trim();
        if (mtext) {
          const display = node.getAttribute("display") === "block";
          return display ? `$$\n${mtext}\n$$` : `$${mtext}$`;
        }
        
        return content;
      }
    });

    // Math formula support - LaTeX in script tags
    td.addRule("latexScriptTag", {
      filter: function (node) {
        if (node.nodeName !== "SCRIPT") return false;
        const type = node.getAttribute("type") || "";
        return (
          type === "math/tex" ||
          type === "math/tex; mode=display" ||
          type === "math/asciimath"
        );
      },
      replacement: function (content, node) {
        const type = node.getAttribute("type") || "";
        const latex = node.textContent.trim();
        
        if (!latex) return "";
        
        // Check if display mode
        const isDisplay = type.includes("mode=display");
        
        return isDisplay ? `$$\n${latex}\n$$` : `$${latex}$`;
      }
    });

    // Math formula support - ChatGPT/Claude style formulas
    td.addRule("chatGPTMath", {
      filter: function (node) {
        // Check for ChatGPT/Claude math spans
        if (node.nodeName === "SPAN") {
          const className = node.getAttribute("class") || "";
          const dataLang = node.getAttribute("data-language") || "";
          return dataLang === "math" || className.includes("math-inline") || className.includes("math-display");
        }
        return false;
      },
      replacement: function (content, node) {
        const className = node.getAttribute("class") || "";
        const latex = node.textContent.trim();
        
        if (!latex) return content;
        
        // Remove any wrapper if already present
        let formula = latex;
        if (formula.startsWith("$") && formula.endsWith("$")) {
          return formula;
        }
        if (formula.startsWith("\\(") && formula.endsWith("\\)")) {
          formula = formula.slice(2, -2);
          return `$${formula}$`;
        }
        if (formula.startsWith("\\[") && formula.endsWith("\\]")) {
          formula = formula.slice(2, -2);
          return `$$\n${formula}\n$$`;
        }
        
        const isDisplay = className.includes("display");
        return isDisplay ? `$$\n${formula}\n$$` : `$${formula}$`;
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
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg && msg.type === "PING") {
      // Respond to ping immediately to confirm content script is loaded
      sendResponse({ status: "ready" });
      // No return true - this is a synchronous response
      return false;
    }
    
    if (msg && msg.type === "COPY_MARKDOWN") {
      // Handle copy asynchronously to allow clipboard operations to complete
      (async () => {
        try {
          await handleCopy();
          sendResponse({ status: "ok" });
        } catch (error) {
          sendResponse({ status: "error", message: error.message });
        }
      })();
      return true; // Keep channel open for async response
    }
    
    return false;
  });

  console.log("Markdown Copy content script loaded");
})();

