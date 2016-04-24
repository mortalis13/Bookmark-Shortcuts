
const {classes: Cc, interfaces: Ci, utils: Cu}=Components

Cu.import("resource://gre/modules/Services.jsm")

/* ******************************************* vars *********************************************** */

var prefsPrefix="extensions.bookmark_shortcuts_qwe."
const keyProps={
	id:"key_Bookmark-"
}

var self=this,prefs={}
const prefNames=["firstRun","installReason","uninstallReason","startupReason","shutdownReason","sameTabModifier","newTabModifier"]
for(var p of prefNames) prefs[p]=prefsPrefix+p

const reasons=["","APP_STARTUP","APP_SHUTDOWN","ADDON_ENABLE","ADDON_DISABLE","ADDON_INSTALL","ADDON_UNINSTALL","ADDON_UPGRADE","ADDON_DOWNGRADE"]

/* ***************************************** main functions ************************************************* */

function install(data,reason){ 
}

function startup(data,reason){
  if(reason==ADDON_INSTALL || reason==ADDON_ENABLE) 
    include(data, "content/prefs.js")
  include(data, "content/lib.js")
  include(data, "content/ui.js")
  include(data, "content/main.js")
  
  eachWindow(loadIntoWindow)                            //ui building function
  Services.ww.registerNotification(windowWatcher)
  
  Services.prefs.addObserver(prefs["sameTabModifier"], prefObserver, false)         // options prefs change listener
  Services.prefs.addObserver(prefs["newTabModifier"], prefObserver, false)
}

function shutdown(data,reason){
  Services.prefs.removeObserver(prefs["sameTabModifier"],prefObserver,false)
	if(reason==ADDON_DISABLE){
		Services.ww.unregisterNotification(windowWatcher)
		eachWindow(unloadFromWindow)												//ui destroying function
	}
}

/* ****************************************** add functions ************************************************ */

function include(data, path){                          //load scripts
  Services.scriptloader.loadSubScript(data.resourceURI.spec + path, self)
}

function pref(name,value){														//get/set prefs
	if(value===undefined){
		switch(Services.prefs.getPrefType(name)){
			case 0:return null
			case 32:return Services.prefs.getCharPref(name)
			case 64:return Services.prefs.getIntPref(name)
			case 128:return Services.prefs.getBoolPref(name)
		}
	}
	if(value==="") Services.prefs.clearUserPref(name)
	else{
		switch(typeof value){
			case "boolean":Services.prefs.setBoolPref(name,value);return
			case "number":Services.prefs.setIntPref(name,value);return
			default:Services.prefs.setCharPref(name,value)
		}
	}
}

var prefObserver={                                          // prefs observer handle
  observe: function(aSubject, aTopic, aData){
    eachWindow(changeModifier)
  }
}
