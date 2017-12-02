
/* ******************************************* ui build *********************************************** */

function loadIntoWindow(window){
  try{
    var docName=window.location.pathname.split("/").pop()
    if(docName!="browser.xul") return
    setShortFunctions(window)                     //jQuery-like syntax
    addKeyboardShortcuts(window)
  }
  catch(e){}
}

function unloadFromWindow(window){
  if(!window) return
  removeKeyboardShortcuts(window)
  clearUserPrefs()
}

function changeModifier(window){
  if(!window) return
  removeKeyboardShortcuts(window)
  addKeyboardShortcuts(window)
}

/* ***************************************** load functions ******************************************** */

function eachWindow(callback){
  let enumerator=Services.wm.getEnumerator("navigator:browser")
  while (enumerator.hasMoreElements()){
    let win=enumerator.getNext()
    if (win.document.readyState==="complete") callback(win)
    else runOnLoad(win, callback)
  }
}

function windowWatcher (subject, topic){
  if (topic==="domwindowopened")
    runOnLoad(subject, loadIntoWindow)
}

function runOnLoad (window, callback){
  window.addEventListener("load", function(){
    window.removeEventListener("load", arguments.callee, false)
    callback(window)
  }, false)
}
