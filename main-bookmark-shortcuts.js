
browser.commands.onCommand.addListener(command => openBookmark(command));

// ----------------------------------------------------

var TOOLBAR_ID = 'toolbar_____';

async function openBookmark(commandId) {
  switch(commandId) {
    case 'open-bookmark-1':
      openBookmarkByIndex(1, false);
      break;
    case 'open-bookmark-2':
      openBookmarkByIndex(2, false);
      break;
    case 'open-bookmark-3':
      openBookmarkByIndex(3, false);
      break;
    case 'open-bookmark-4':
      openBookmarkByIndex(4, false);
      break;
    case 'open-bookmark-5':
      openBookmarkByIndex(5, false);
      break;
    case 'open-bookmark-6':
      openBookmarkByIndex(6, false);
      break;
    case 'open-bookmark-7':
      openBookmarkByIndex(7, false);
      break;
    case 'open-bookmark-8':
      openBookmarkByIndex(8, false);
      break;
    case 'open-bookmark-9':
      openBookmarkByIndex(9, false);
      break;
    case 'open-bookmark-10':
      openBookmarkByIndex(10, false);
      break;
      
    case 'open-bookmark-new-1':
      openBookmarkByIndex(1, true);
      break;
    case 'open-bookmark-new-2':
      openBookmarkByIndex(2, true);
      break;
    case 'open-bookmark-new-3':
      openBookmarkByIndex(3, true);
      break;
    case 'open-bookmark-new-4':
      openBookmarkByIndex(4, true);
      break;
    case 'open-bookmark-new-5':
      openBookmarkByIndex(5, true);
      break;
    case 'open-bookmark-new-6':
      openBookmarkByIndex(6, true);
      break;
    case 'open-bookmark-new-7':
      openBookmarkByIndex(7, true);
      break;
    case 'open-bookmark-new-8':
      openBookmarkByIndex(8, true);
      break;
    case 'open-bookmark-new-9':
      openBookmarkByIndex(9, true);
      break;
    case 'open-bookmark-new-10':
      openBookmarkByIndex(10, true);
      break;
  }
}

async function openBookmarkByIndex(index, new_tab) {
  var bookmarks = await browser.bookmarks.getChildren(TOOLBAR_ID);
  
  if (bookmarks.length) {
    var bm = bookmarks[index-1];
    if (bm) {
      if (bm.url) {
        if (new_tab === true) {
          browser.tabs.create({url: bm.url});
        }
        else {
          browser.tabs.update({url: bm.url});
        }
      }
      else {
        // folder
      }
    }
  }
}
