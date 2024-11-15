function getElementByXpath(xpath, parent) {
  parent = parent || document;
  return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function pruneNavBar() {
  navItems = document.querySelectorAll('li.topbar-item');
  for (let itemCount = navItems.length; itemCount > 6; itemCount--) {
    navItems[itemCount - 1].remove();
  }
}

function removeRewards() {
  const rewardColumn = document.querySelector('.reward');
  if (!rewardColumn) {
    return console.info('HabFix: Rewards column not found');
  }

  rewardColumn.remove();
  const cols = document.querySelectorAll('div.tasks-column');
  for (let i = 0; i < cols.length; i++) {
    cols[i].style.flex = '0 0 33%';
    cols[i].style['max-width'] = '33%';
    cols[i].style.padding = '0px 4px 0px 4px';
  }
}

function removeSearchBar() {
  const searchBar = document.querySelector('div.row.tasks-navigation');
  if (!searchBar) {
    return console.info('HabFix: Search bar not found');
  }
  searchBar.remove();
}

function removeFooter() {
  const footer = document.querySelector('footer');
  if (!footer) {
    return console.info('HabFix: Footer not found');
  }
  footer.remove();
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
  } else {
    console.info('HabFix: To-do text area not found');
  }
}

function removeNegativeHabitButtons() {
  [...document.querySelectorAll('.type_habit')].forEach(removeNegativeHabitButton);
}

function removeNegativeHabitButton(habitElement) {
  const negativeHabitButton = habitElement.querySelector('.right-control');
  if (negativeHabitButton) {
    negativeHabitButton.remove();
    const contentElement = habitElement.querySelector('.task-content');
    if (contentElement) {
      contentElement.style['border-top-right-radius'] = '4px';
      contentElement.style['border-bottom-right-radius'] = '4px';
    }
  }
}

function focusToDoTextAreaOnFocus() {
  focusToDoTextArea();
  addEventListener('focus', focusToDoTextArea);
  document.querySelectorAll('.quick-add-tip').forEach(tip => tip.remove());
}

function fixHabitica() {
  const interval = setInterval(() => {
    try {
      focusToDoTextAreaOnFocus();
      pruneNavBar();
      removeRewards();
      removeSearchBar();
      removeFooter();
      moveMarie();
      removeNegativeHabitButtons();
    } finally {
      clearInterval(interval);
    }
  }, 200);
}

fixHabitica();
