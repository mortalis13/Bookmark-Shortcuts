
function getActiveTab() {
  return browser.tabs.query({}).then(tabs => {
    return tabs.find(tab => tab.active);
  });
}

function getOption(key, default_value) {
  return browser.storage.local.get(key).then(res => res[key] || default_value);
}
