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
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) return;
  
  // Send message to content script to perform the conversion
  chrome.tabs.sendMessage(tab.id, { 
    type: "COPY_MARKDOWN", 
    source: "contextMenu" 
  }).catch(err => {
    console.error("Failed to send message to content script:", err);
  });
});

// Handle keyboard shortcut commands
chrome.commands.onCommand.addListener((command) => {
  if (command === "copy_markdown") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || !tab.id) return;
      
      // Send message to content script to perform the conversion
      chrome.tabs.sendMessage(tab.id, { 
        type: "COPY_MARKDOWN", 
        source: "command" 
      }).catch(err => {
        console.error("Failed to send message to content script:", err);
      });
    });
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "COPY_FROM_POPUP") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || !tab.id) {
        sendResponse({ success: false, error: "No active tab" });
        return;
      }
      
      chrome.tabs.sendMessage(tab.id, { 
        type: "COPY_MARKDOWN", 
        source: "popup" 
      }).catch(err => {
        console.error("Failed to send message to content script:", err);
      });
    });
    return true; // Keep message channel open for async response
  }
});

