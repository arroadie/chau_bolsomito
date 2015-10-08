function storeThis(element) {

	var id = Date.now() + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(2);

	chrome.storage.local.set({id: element}, function() {
		chrome.runtime.sendMessage("CHANGE!");
        });
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // read `newIconPath` from request and read `tab.id` from sender
    chrome.storage.local.get(null, function(stored) {
		elem.style.display = 'block';
		});
});

document.getElementById("contentArea").addEventListener("DOMSubtreeModified", function (){

	var testElements = document.getElementsByClassName("userContentWrapper");

	Array.prototype.filter.call(testElements, function(testElement){
		if (testElement.innerText.indexOf('bolsomit') > -1 ) {
			elem = testElement.parentElement.parentElement
			elem.style.display = 'none';
			storeThis(elem);
	    }
	});
}, false);
