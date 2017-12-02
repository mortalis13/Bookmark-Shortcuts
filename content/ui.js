
/* ***************************************** ui change *******************************************/

var historyService = Cc["@mozilla.org/browser/nav-history-service;1"].getService(Ci.nsINavHistoryService);
var bookmarksService = Cc["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Ci.nsINavBookmarksService);

const bmNodeType = {
  TYPE_URI: Ci.nsINavHistoryResultNode.RESULT_TYPE_URI,
  TYPE_FOLDER: Ci.nsINavHistoryResultNode.RESULT_TYPE_FOLDER,
  TYPE_SEPARATOR: Ci.nsINavHistoryResultNode.RESULT_TYPE_SEPARATOR,
}

function addKeyboardShortcuts(w){
  var $=w.$,alert=w.alert
  $.init(w.document)

  var keyset=$("<keyset>")
  if(keyset){
    keyset.attr("id","bookmarksKeyset")
    var sameTabModifier=pref(prefs["sameTabModifier"])
    if(sameTabModifier===null) sameTabModifier="alt"
    
    for(var i=0;i<10;i++){
      var skey=(i<9)?i+1:0                  // alt-1,2,3,..., alt-0
      var key = $("<key>")
      if(key){
        key.attr("id", keyProps.id+skey);
        key.attr("modifiers", sameTabModifier);
        key.attr("key", String(skey));
        key.attr("bookmark", String(skey));
        key.attr("oncommand", "void(0)")
        key.bind("command",goBookmark)
        keyset.append(key);
      }
    }
    
    var newTabModifier=pref(prefs["newTabModifier"])
    if(newTabModifier===null) sameTabModifier="control os"
    
    for(var i=0;i<10;i++){
      var skey=(i<9)?i+1:0                  // win-1,2,3,..., win-0
      var key = $("<key>")
      if(key){
        key.attr("id", keyProps.id+"NewTab"+skey);
        key.attr("modifiers", newTabModifier);
        key.attr("key", String(skey));
        key.attr("bookmark", String(skey));
        key.attr("newTab", "true");
        key.attr("oncommand", "void(0)")
        key.bind("command",goBookmark)
        keyset.append(key);
      }
    }   
    w.document.documentElement.append(keyset)
  }
}

function goBookmark(e){
  var window = e.target.ownerDocument.defaultView
  
  var options = historyService.getNewQueryOptions();
  var query = historyService.getNewQuery();
  var toolbarFolder = bookmarksService.toolbarFolder;             // =2 - bookmarks toolbar (not bookmarks menu)
  query.setFolders([toolbarFolder], 1);
  var result = historyService.executeQuery(query, options);
  
  var rootNode = result.root;                                     // result (all bookmarks in the folder)
  rootNode.containerOpen=true;
  
  var bNumber = e.target.attr("bookmark")-1                   // number of bm in the list
  if(bNumber == -1) bNumber = 9                               // if last (10th) bm (alt-0)
  
  
  var itemsCount=0
  for (var i = 0; i < rootNode.childCount; i ++) {
    var node = rootNode.getChild(i);
    var type = node.type
    
    if( type != bmNodeType.TYPE_URI && type != bmNodeType.TYPE_FOLDER )
      continue;
      
    if( (itemsCount++) == bNumber ){
      if(type == bmNodeType.TYPE_URI)                                     // url-bookmark
      {
        var url = node.uri
        var dest = e.target.attr("newTab") ? "tab":"current"
        window.openUILinkIn(url, dest, null, null, null)
      }
      else if(type == bmNodeType.TYPE_FOLDER)                             // folder-bookmark
      {
        var scrollbox = window.document.getElementById("PlacesToolbarItems")
        if(scrollbox && scrollbox.clientWidth && scrollbox.clientHeight)          // if the bookmark toolbar is hidden (from a session start or during a session)
        {
          var items = scrollbox.childNodes
          if(items && items.length){                              // ?            // this should always be true if the scrollbox is visible, but don't know if its unnecessary now...
            var item = items[i]
            var menu = item.childNodes[0]
            menu.openPopup(item, 'after_start', 0, 0, false, false)               // open the folder which is the popup menu
          }
        }
        else{
          // console.log('no-2')
        }
      }

      break;
    }
  }
  
  rootNode.containerOpen=false;
}

function removeKeyboardShortcuts(w){
  var $=w.$
  $.init(w.document)
  var keyset=$("bookmarksKeyset")
  if(keyset){
    keyset.remove()
  }
}
