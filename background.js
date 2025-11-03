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

// Helper function to inject content scripts and retry message
async function injectAndRetry(tabId, message, retryCount = 0) {
  const MAX_RETRIES = 2;
  
  try {
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
    
    console.log("Content scripts injected successfully");
    
    // Wait a bit longer for scripts to initialize
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Retry sending the message
    try {
      await chrome.tabs.sendMessage(tabId, message);
      console.log("Message sent successfully after injection");
      return true;
    } catch (retryErr) {
      console.error(`Retry ${retryCount + 1} failed:`, retryErr);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Attempting retry ${retryCount + 2}...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return injectAndRetry(tabId, message, retryCount + 1);
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
  } catch (injectErr) {
    console.error("Failed to inject content script:", injectErr);
    
    // Check if it's a restricted page
    const tab = await chrome.tabs.get(tabId);
    if (tab && !isValidUrl(tab.url)) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/128.png',
        title: 'Markdown Copy',
        message: 'Cannot copy from this page (restricted by browser).',
        priority: 2
      });
    }
    
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
  
  try {
    // Try to send message to content script
    await chrome.tabs.sendMessage(tab.id, message);
    console.log("Message sent successfully (context menu)");
  } catch (err) {
    console.error("Failed to send message to content script:", err);
    console.log("Attempting to inject content scripts...");
    
    // If content script is not loaded, inject and retry
    await injectAndRetry(tab.id, message);
  }
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
    
    try {
      // Try to send message to content script
      await chrome.tabs.sendMessage(tab.id, message);
      console.log("Message sent successfully (keyboard shortcut)");
    } catch (err) {
      console.error("Failed to send message to content script:", err);
      console.log("Attempting to inject content scripts...");
      
      // If content script is not loaded, inject and retry
      await injectAndRetry(tab.id, message);
    }
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
      
      try {
        // Try to send message to content script
        await chrome.tabs.sendMessage(tab.id, msg);
        console.log("Message sent successfully (popup)");
        sendResponse({ success: true });
      } catch (err) {
        console.error("Failed to send message to content script:", err);
        console.log("Attempting to inject content scripts...");
        
        // If content script is not loaded, inject and retry
        const result = await injectAndRetry(tab.id, msg);
        sendResponse({ success: result });
      }
    })();
    return true; // Keep message channel open for async response
  }
});

