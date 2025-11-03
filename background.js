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

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab || !tab.id) return;
  
  try {
    // Try to send message to content script
    await chrome.tabs.sendMessage(tab.id, { 
      type: "COPY_MARKDOWN", 
      source: "contextMenu" 
    });
  } catch (err) {
    console.error("Failed to send message to content script:", err);
    
    // If content script is not loaded, try to inject it
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: [
          "vendor/turndown.js",
          "vendor/turndown-plugin-gfm.js",
          "vendor/readability.js",
          "content.js"
        ]
      });
      
      // Retry sending message after injection
      setTimeout(async () => {
        try {
          await chrome.tabs.sendMessage(tab.id, { 
            type: "COPY_MARKDOWN", 
            source: "contextMenu" 
          });
        } catch (retryErr) {
          console.error("Retry failed:", retryErr);
        }
      }, 500);
    } catch (injectErr) {
      console.error("Failed to inject content script:", injectErr);
    }
  }
});

// Handle keyboard shortcut commands
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "copy_markdown") {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    if (!tab || !tab.id) return;
    
    try {
      // Try to send message to content script
      await chrome.tabs.sendMessage(tab.id, { 
        type: "COPY_MARKDOWN", 
        source: "command" 
      });
    } catch (err) {
      console.error("Failed to send message to content script:", err);
      
      // If content script is not loaded, try to inject it
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id, allFrames: true },
          files: [
            "vendor/turndown.js",
            "vendor/turndown-plugin-gfm.js",
            "vendor/readability.js",
            "content.js"
          ]
        });
        
        // Retry sending message after injection
        setTimeout(async () => {
          try {
            await chrome.tabs.sendMessage(tab.id, { 
              type: "COPY_MARKDOWN", 
              source: "command" 
            });
          } catch (retryErr) {
            console.error("Retry failed:", retryErr);
          }
        }, 500);
      } catch (injectErr) {
        console.error("Failed to inject content script:", injectErr);
      }
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
      
      try {
        await chrome.tabs.sendMessage(tab.id, { 
          type: "COPY_MARKDOWN", 
          source: "popup" 
        });
        sendResponse({ success: true });
      } catch (err) {
        console.error("Failed to send message to content script:", err);
        
        // If content script is not loaded, try to inject it
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            files: [
              "vendor/turndown.js",
              "vendor/turndown-plugin-gfm.js",
              "vendor/readability.js",
              "content.js"
            ]
          });
          
          // Retry sending message after injection
          setTimeout(async () => {
            try {
              await chrome.tabs.sendMessage(tab.id, { 
                type: "COPY_MARKDOWN", 
                source: "popup" 
              });
              sendResponse({ success: true });
            } catch (retryErr) {
              console.error("Retry failed:", retryErr);
              sendResponse({ success: false, error: retryErr.message });
            }
          }, 500);
        } catch (injectErr) {
          console.error("Failed to inject content script:", injectErr);
          sendResponse({ success: false, error: injectErr.message });
        }
      }
    })();
    return true; // Keep message channel open for async response
  }
});

