function storeThis(element) {
	// Reimplement
}

var facebookContent = document.getElementById("contentArea")
if (facebookContent != null) {
		facebookContent.addEventListener("DOMSubtreeModified", function (){
			var testElements = document.getElementsByClassName("fbUserPost");
			if (testElements != null && testElements.length > 0 ) {
                chrome.runtime.sendMessage({ refresh: true }, function (response) {
                    if (response && response.length > 0) {
                        for (f = 0; f < response.length; f++) {
                            for (i = 0; i < testElements.length; i++) {
                                // get the current filter elements
                                if ((testElements[i].innerText.toLowerCase().indexOf(response[f]) > -1) && (testElements[i].parentElement.parentElement.className.indexOf('bolsominated') === -1)) {
                                    elem = testElements[i].parentElement.parentElement;
                                    elem.classList.add("bolsominated");
                                    elem.style.display = 'none';
                                    storeThis(elem);
                                }
                            }
                        }
                    }
                });
			}
		}, false);
}
