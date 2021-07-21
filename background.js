chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(tab.url, tab.url == 'https://habitica.com/', changeInfo.status, tab.active);
  if (changeInfo.status == 'complete' && tab.active && tab.url == 'https://habitica.com/') {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['fixHabitica.js']
    });
  }
});
