chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete' && tab.active && tab.url == 'https://habitica.com/') {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['fixHabitica.js']
    });
  }
});
