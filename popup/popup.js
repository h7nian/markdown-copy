// Popup script for Markdown Copy extension
// Handles settings management and user interactions

'use strict';

// Helper function for getting elements
const $ = (id) => document.getElementById(id);

// Default settings
const defaultSettings = {
  notify: true,
  autoReadability: true,
  lineBreaks: "soft"
};

/**
 * Load settings from chrome.storage
 */
async function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(defaultSettings, (res) => {
      resolve(res);
    });
  });
}

/**
 * Save partial settings to chrome.storage
 */
async function saveSettings(partial) {
  return new Promise((resolve) => {
    chrome.storage.local.set(partial, () => {
      console.log("Settings saved:", partial);
      resolve();
    });
  });
}

/**
 * Initialize popup when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load current settings
    const settings = await loadSettings();
    
    // Populate UI with current settings
    $("notify").checked = settings.notify;
    $("autoReadability").checked = settings.autoReadability;
    $("lineBreaks").value = settings.lineBreaks;

    // Add event listeners for settings changes
    $("notify").addEventListener("change", (e) => {
      saveSettings({ notify: e.target.checked });
    });

    $("autoReadability").addEventListener("change", (e) => {
      saveSettings({ autoReadability: e.target.checked });
    });

    $("lineBreaks").addEventListener("change", (e) => {
      saveSettings({ lineBreaks: e.target.value });
    });

    // Handle "Copy Now" button click
    $("copyNow").addEventListener("click", async () => {
      try {
        // Query the active tab
        const tabs = await chrome.tabs.query({ 
          active: true, 
          currentWindow: true 
        });
        
        if (!tabs[0]) {
          console.error("No active tab found");
          return;
        }

        // Send message to content script
        chrome.tabs.sendMessage(tabs[0].id, { 
          type: "COPY_MARKDOWN", 
          source: "popup" 
        }).catch(err => {
          console.error("Failed to send message:", err);
          
          // Show error if content script is not loaded
          showTemporaryMessage("Please refresh the page and try again");
        });

        // Close popup after triggering copy
        // Commented out to keep popup open for testing
        // window.close();
        
      } catch (error) {
        console.error("Error in copyNow handler:", error);
        showTemporaryMessage("Error: " + error.message);
      }
    });

  } catch (error) {
    console.error("Error initializing popup:", error);
  }
});

/**
 * Show a temporary message in the popup
 */
function showTemporaryMessage(message) {
  const button = $("copyNow");
  const originalText = button.innerHTML;
  
  button.innerHTML = message;
  button.disabled = true;
  button.style.opacity = "0.7";
  
  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;
    button.style.opacity = "1";
  }, 2000);
}

