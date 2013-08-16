// 2006-05-29
// ==UserScript==
// @name          G4 video download link
// @namespace     http://home.earthlink.net/~x1011/
// @description   Adds links to download .flv/.swf files of the videos on g4tv.com.
// @include       http://www.g4tv.com/videos/index.html
// @include       http://www.g4tv.com/*/videos/index.html
// ==/UserScript==

(function() {

function get(event) {
	GM_xmlhttpRequest({method: 'GET',
		url: 'http://www.g4tv.com/xml/BroadbandPlayerService.asmx/GetRelatedVideos?excludedVideoKeys=0&videoKey=' + this.id,
		onload: function(response) {
			var text = response.responseText
			document.location = text.substring(text.indexOf('<FilePath>') + 10, text.indexOf('</FilePath>'))
		}
	})
	event.preventDefault()
}

GM_addStyle('.download {color:#002299 !important}')

links = document.evaluate('//span/a[starts-with(@id, "ctl00_objContentPlaceholder_grdSearchResults_ctl")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

for (i = 0; link = links.snapshotItem(i); i++) {
	var newLink = document.createElement('a')
	newLink.id = link.href.substring(link.href.indexOf("'") + 1, link.href.lastIndexOf("'"))
	newLink.className = 'download'
	newLink.innerHTML = '[download]'
	newLink.href = '#'
	newLink.addEventListener('click', get, false)
	link.parentNode.insertBefore(newLink, link.nextSibling)
	link.parentNode.insertBefore(document.createTextNode(' '), newLink)
}

})();
