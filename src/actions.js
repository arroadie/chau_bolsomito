chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // read `newIconPath` from request and read `tab.id` from sender
    chrome.browserAction.setIcon({
        path: "icon2.png",
        tabId: sender.tab.id
    });
    }
);

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({active: true}, function(tabs) {
		chrome.tabs.sendMessage(tab.id, "show_back", null);
	});
});