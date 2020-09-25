
function saveOptions(e) {
  browser.storage.local.set({
    folder_name: document.querySelector("#folder-name").value
  });
  document.querySelector("#message").innerHTML = 'Options saved';
  e.preventDefault();
}

function restoreOptions() {
  var storageItem = browser.storage.local.get('folder_name');
  storageItem.then(res => {
    document.querySelector("#folder-name").value = res.folder_name || '';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#options-form").addEventListener("submit", saveOptions);
