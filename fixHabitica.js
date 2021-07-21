function getElementByXpath(xpath, parent) {
  parent = parent || document;
  return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function removeLastNavItem() {
  navItems = document.querySelectorAll('li.topbar-item.droppable');
  if (navItems) {
    navItems[navItems.length - 1].remove();
  }
}

function removeRewards() {
  document.querySelector('.reward').remove();
  var cols = document.querySelectorAll('div.tasks-column');
  for (var i = 0; i < cols.length; i++) {
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

function fixHabitica() {
  const interval = setInterval(() => {
    try {
      removeLastNavItem();
      removeRewards();
      moveMarie();
    } finally {
      clearInterval(interval);
    }
  }, 200);
}

fixHabitica();
