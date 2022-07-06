function getElementByXpath(xpath, parent) {
  parent = parent || document;
  return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function pruneNavBar() {
  navItems = document.querySelectorAll('li.topbar-item');
  for (let itemCount = navItems.length; itemCount > 7; itemCount--) {
    navItems[itemCount - 1].remove();
  }
}

function removeRewards() {
  document.querySelector('.reward').remove();
  const cols = document.querySelectorAll('div.tasks-column');
  for (let i = 0; i < cols.length; i++) {
    cols[i].style.flex = '0 0 33%';
    cols[i].style['max-width'] = '33%';
  }
}

function moveMarie() {
  const memberBar = document.querySelector('.party-members');
  const marie = getElementByXpath('//div[contains(@class, "member-details")][.//span[text() = "MarenaVarena"]]', memberBar);
  if (memberBar && marie) {
    memberBar.appendChild(marie);
  }
}

function focusToDoTextArea() {
  const toDoTextArea = document.querySelector('.todo textarea.quick-add');
  if (toDoTextArea) {
    toDoTextArea.focus();
  }
}

function focusToDoTextAreaOnFocus() {
  focusToDoTextArea();
  addEventListener('focus', () => {
    focusToDoTextArea();
  });
}

function fixHabitica() {
  const interval = setInterval(() => {
    try {
      focusToDoTextAreaOnFocus();
      pruneNavBar();
      removeRewards();
      moveMarie();
    } finally {
      clearInterval(interval);
    }
  }, 200);
}

fixHabitica();
