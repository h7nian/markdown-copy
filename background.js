// Background Service Worker for Markdown Copy Extension
// Handles context menu creation and command shortcuts

// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-as-markdown",
    title: "Copy as Markdown",
    contexts: ["selection", "page"] // Show when text is selected or on any page
  });
  
  console.log("Markdown Copy extension installed successfully");
});

// Helper function to check if a URL is supported
function isValidUrl(url) {
  if (!url) return false;
  // Block chrome:// pages, extension pages, and other restricted URLs
  const blockedProtocols = ['chrome:', 'chrome-extension:', 'edge:', 'about:', 'view-source:'];
  return !blockedProtocols.some(protocol => url.startsWith(protocol));
}

// Helper function to check if content script is ready
async function pingContentScript(tabId, maxAttempts = 5) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await chrome.tabs.sendMessage(tabId, { type: "PING" });
      if (response && response.status === "ready") {
        console.log(`Content script ready (attempt ${i + 1})`);
        return true;
      }
    } catch (err) {
      console.log(`Ping attempt ${i + 1} failed:`, err.message);
      if (i < maxAttempts - 1) {
        // Wait progressively longer: 200ms, 400ms, 600ms, 800ms, 1000ms
        await new Promise(resolve => setTimeout(resolve, 200 * (i + 1)));
      }
    }
  }
  return false;
}

// Helper function to inject content scripts and retry message
async function injectAndRetry(tabId, message, retryCount = 0) {
  const MAX_RETRIES = 3;
  
  try {
    console.log(`Injecting content scripts (attempt ${retryCount + 1})...`);
    
    // Inject all required scripts
    await chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: [
        "vendor/turndown.js",
        "vendor/turndown-plugin-gfm.js",
        "vendor/readability.js",
        "content.js"
      ]
    });
    
    console.log("Content scripts injected, checking if ready...");
    
    // Wait for content script to be fully loaded and ready
    const isReady = await pingContentScript(tabId);
    
    if (!isReady) {
      throw new Error("Content script not responding to ping");
    }
    
    // Now send the actual message
    try {
      await chrome.tabs.sendMessage(tabId, message);
      console.log("Message sent successfully after injection");
      return true;
    } catch (sendErr) {
      console.error(`Send message failed:`, sendErr);
      throw sendErr;
    }
    
  } catch (err) {
    console.error(`Injection attempt ${retryCount + 1} failed:`, err);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying injection (${retryCount + 2}/${MAX_RETRIES + 1})...`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return injectAndRetry(tabId, message, retryCount + 1);
    }
    
    // All retries failed
    console.error("All injection attempts failed");
    
    // Check if it's a restricted page
    try {
      const tab = await chrome.tabs.get(tabId);
      if (tab && !isValidUrl(tab.url)) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/128.png',
          title: 'Markdown Copy',
          message: 'Cannot copy from this page (restricted by browser).',
          priority: 2
        });
        return false;
      }
    } catch (tabErr) {
      console.error("Failed to get tab info:", tabErr);
    }
    
    // Show user-friendly error notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/128.png',
      title: 'Markdown Copy',
      message: 'Failed to copy. Please refresh the page and try again.',
      priority: 2
    });
    
    return false;
  }
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab || !tab.id) return;
  
  // Check if URL is valid
  if (!isValidUrl(tab.url)) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/128.png',
      title: 'Markdown Copy',
      message: 'Cannot copy from this page (restricted by browser).',
      priority: 2
    });
    return;
  }
  
  const message = { type: "COPY_MARKDOWN", source: "contextMenu" };
  
  // First, check if content script is already loaded
  const isReady = await pingContentScript(tab.id, 2); // Quick 2-attempt ping
  
  if (isReady) {
    // Content script is ready, send message directly
    try {
      await chrome.tabs.sendMessage(tab.id, message);
      console.log("Message sent successfully (context menu)");
      return;
    } catch (err) {
      console.error("Send failed despite ping success:", err);
    }
  }
  
  // Content script not ready or send failed, inject and retry
  console.log("Content script not ready, injecting...");
  await injectAndRetry(tab.id, message);
});

// Handle keyboard shortcut commands
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "copy_markdown") {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    if (!tab || !tab.id) return;
    
    // Check if URL is valid
    if (!isValidUrl(tab.url)) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/128.png',
        title: 'Markdown Copy',
        message: 'Cannot copy from this page (restricted by browser).',
        priority: 2
      });
      return;
    }
    
    const message = { type: "COPY_MARKDOWN", source: "command" };
    
    // First, check if content script is already loaded
    const isReady = await pingContentScript(tab.id, 2); // Quick 2-attempt ping
    
    if (isReady) {
      // Content script is ready, send message directly
      try {
        await chrome.tabs.sendMessage(tab.id, message);
        console.log("Message sent successfully (keyboard shortcut)");
        return;
      } catch (err) {
        console.error("Send failed despite ping success:", err);
      }
    }
    
    // Content script not ready or send failed, inject and retry
    console.log("Content script not ready, injecting...");
    await injectAndRetry(tab.id, message);
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "COPY_FROM_POPUP") {
    (async () => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const tab = tabs[0];
      
      if (!tab || !tab.id) {
        sendResponse({ success: false, error: "No active tab" });
        return;
      }
      
      // Check if URL is valid
      if (!isValidUrl(tab.url)) {
        sendResponse({ success: false, error: "Cannot copy from this page (restricted by browser)" });
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/128.png',
          title: 'Markdown Copy',
          message: 'Cannot copy from this page (restricted by browser).',
          priority: 2
        });
        return;
      }
      
      const msg = { type: "COPY_MARKDOWN", source: "popup" };
      
      // First, check if content script is already loaded
      const isReady = await pingContentScript(tab.id, 2); // Quick 2-attempt ping
      
      if (isReady) {
        // Content script is ready, send message directly
        try {
          await chrome.tabs.sendMessage(tab.id, msg);
          console.log("Message sent successfully (popup)");
          sendResponse({ success: true });
          return;
        } catch (err) {
          console.error("Send failed despite ping success:", err);
        }
      }
      
      // Content script not ready or send failed, inject and retry
      console.log("Content script not ready, injecting...");
      const result = await injectAndRetry(tab.id, msg);
      sendResponse({ success: result });
    })();
    return true; // Keep message channel open for async response
  }
});

