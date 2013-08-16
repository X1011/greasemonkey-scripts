// ==UserScript==
// @name          Bemanistyle download
// @namespace     http://home.earthlink.net/~x1011/
// @description   
// @include       http://www.bemanistyle.com/sims/simfile.php?id=*
// ==/UserScript==

(function() {

function download(event) {
    GM_xmlhttpRequest({method: 'GET',
        url: this.href,
        onload: function(response) {
            var text = response.responseText
            var startPos = text.indexOf('http://www.bemanistyle.com/download/')
            
            window.location = text.substring(startPos, text.indexOf('"', startPos))
        }
    })
    //event.preventDefault()
    this.href = ''
}

var link = document.evaluate('//a[starts-with(@href, "download.php?id=")]',
    document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue

link.addEventListener('click', download, false)

})();