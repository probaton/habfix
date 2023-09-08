async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  return tab;
}

async function fixHabitica() {
  const tab = await getCurrentTab();
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['fixHabitica.js']
    });
  } catch (e) {
    throw new Error('Failed to fix Habitica, are you sure the current tab is Habitica.com?', e);
  }
}

document.getElementById('fix-habitica').addEventListener('click', fixHabitica);;
