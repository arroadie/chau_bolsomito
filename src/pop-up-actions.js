var currentBlacklist = []

document.addEventListener("DOMContentLoaded", function() {
  var links = document.getElementsByClassName("navigator");
  for(i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      var option = this.getAttribute("ref");
      var links = document.getElementsByTagName("a");
      for(i = 0; i < links.length; i++) {
        if(links[i].classList.contains("active")) {
          links[i].classList.remove("active");
        }
      }
      this.childNodes[0].classList.add("active");
      document.getElementById("options").classList.add("invisible");
      document.getElementById("filtered").classList.add("invisible");
      document.getElementById(option).classList.remove("invisible");
    })
  }

  document.getElementById("blacklist-button").addEventListener('click', function(){
      var input = document.getElementById("blacklist-word");
      chrome.runtime.sendMessage({blacklist: true, content: input.value}, function(res) {
        if(res && res.blacklist) {
          updateBlacklist(res.blacklist);
          input.value = null;
        }
      });
  });

  document.getElementsByTagName("a")[1].addEventListener('click', function() {
    var filtered = document.getElementById("filtered-content");
    if(!filtered.hidden) {
      chrome.runtime.sendMessage({refresh: true}, function(response) {
        if(response) {
            updateBlacklist(response);
        }
      });  
    }
  });
});

function updateBlacklist(content) {
  var blacklisted = document.getElementById("filtered-content");
  while(blacklisted.firstChild) {
    blacklisted.removeChild(blacklisted.firstChild);
  }
  for(i=0; i < content.length; i++) {
    addBlacklistedToList(blacklisted, content[i])
  }
}

function addBlacklistedToList(list, element) {
    var htmlElement = document.createElement("li");
    var removeMe = document.createElement("button", {ref:element, class: "remove-blacklist-term"});
    removeMe.innerText = "X";
    removeMe.addEventListener('click', function(){
      chrome.runtime.sendMessage({delete: true, content: this.parentElement.innerText.replace("X", "")}, function(response){
          if(response) {
            updateBlacklist(response);
          }
      });
    })
    htmlElement.innerText = element;
    htmlElement.appendChild(removeMe);
    list.appendChild(htmlElement);
}
