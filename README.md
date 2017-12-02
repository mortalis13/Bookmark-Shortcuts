## Bookmark Shortcuts [Firefox Addon]

This addon adds shortcuts for bookmarks in the Bookmarks Toolbar:

- Alt + 1..9 to open first 9 bookmarks in the same tab
- Alt + 0 opens the 10th bookmark
- Ctrl + OS + 1..9, 0 to open first 10 bookmarks in a new tab

These are default shortcuts. It is also possible to change default modifiers (control keys) to open bookmarks in the same tab or in the new tab. The options window lets choose between the following keys:

- Alt
- Control (for Linux OS)
- OS key - Win key in Windows
- Control + Alt
- Command + Alt (for Mac OS)
- Control + OS
- Alt + OS

Main addon features:

- allows to open bookmarks with visible or hidden Bookmarks Toolbar
- when bookmarks position is changed opens bookmarks from the correct positions
- (version 1.1.0) shortcuts open folders only if the Toolbar is visible

---

For **Firefox 57+** you should install the addon in the **Nightly** version of the browser. Before installation the browser needs to be configured to allow unsigned legacy addons. 

See this **tutorial** for details on how to use legacy addons in Firefox Nightly edition: [Install Legacy Addons in Firefox Nightly 57+](http://pcadvice.co.nf/blog/install-legacy-addons-in-firefox-57).

In short the steps are the following:

- install Nightly edition and create a new Firefox profile for it if you want
- enable legacy addons setting `about:config?filter=extensions.legacy.enabled` preference to `true`
- enable unsigned addons setting `about:config?filter=xpinstall.signatures.required` preference to `false`
- disable multiprocess mode if the addon gives errors setting `about:config?filter=browser.tabs.remote.autostart` to `false`
