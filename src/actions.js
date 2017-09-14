chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.blacklist) {
    var words = [request.content];
    chrome.storage.sync.get("blacklist", function(items) {
      if(items) {
        if(items.blacklist) {
          if(items.blacklist.words) {
            if(items.blacklist.words.length > 0) {
              if(items.blacklist.words.indexOf(request.content) < 0) {
                words = Array.prototype.concat(items.blacklist.words, words);
              }
            } else {
              words = Array.prototype.concat(items.blacklist.words, words);
            }
          }
        } else {
          items.blacklist = {};
          items.blacklist.words = words;
        }
      }
      items.blacklist.words = words;
      chrome.storage.sync.set(items);
      sendResponse({blacklist: words});
    });
  } else if(request.refresh) {
      chrome.storage.sync.get("blacklist", function(items) {
        if(items && items.blacklist) {
          sendResponse(items.blacklist.words);
        }
    });
  } else if (request.delete) {
      chrome.storage.sync.get("blacklist", function(items){
          if(items && items.blacklist) {
              if(items.blacklist.words.includes(request.content)) {
                  items.blacklist.words = items.blacklist.words.filter(function(el){ return el !== request.content})
              }
              chrome.storage.sync.set(items);
              sendResponse(items.blacklist.words);
          }
      })
  }else {
    chrome.browserAction.setIcon({
        path: "icon2.png",
        tabId: sender.tab.id
    });
  }
  return true;
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({active: true}, function(tabs) {
		chrome.tabs.sendMessage(tab.id, "show_back", null);
	});
});
