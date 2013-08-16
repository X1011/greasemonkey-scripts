// 2006-03-11
// ==UserScript==
// @name          Slashdot: Expand Threaded Comments
// @namespace     http://home.earthlink.net/~x1011/
// @description   Displays a threaded comment on the same page when you click on it.
// @include       http://*slashdot.org/article.pl*
// @include       http://*slashdot.org/*.shtml*
// @include       http://*slashdot.org/comments.pl*
// @include       http://*slashdot.org/pollBooth.pl*
// ==/UserScript==

(function() {

var li = new Array()

function expand(event) {
	var url = 'http://' +
		this.host +
		'/comments.pl?sid=' +
		this.search.substring(5, this.search.indexOf('&')) + //story id
		'&cid=' +
		this.hash.slice(1) //comment id
	
	GM_xmlhttpRequest({method: 'GET',
		url: url,
		onload: function(response) {
			var text = response.responseText
			var oldLi = li[this.url]
			var newLi = document.createElement('li')
			
			newLi.className = 'comment'
			newLi.innerHTML = text.substring(text.indexOf('<div class="commentTop">'),
				text.indexOf('<div class="comment_footer">'))
			
			if (oldLi.lastChild.tagName == 'UL') {
				newLi.appendChild(oldLi.lastChild) //add child comments
			}
			oldLi.parentNode.replaceChild(newLi, oldLi)
			
			if (newLi.lastChild.tagName == 'UL') {
				links = document.evaluate('.//li/a[contains(@href, "slashdot.org/comments.pl?sid=")]',
					newLi.lastChild, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
				for (i=0; link=links.snapshotItem(i); i++) {
					link.addEventListener('click', expand, false)
				}
			}
		},
		onerror: function() {
			li.removeChild(li.firstChild)
			li.innerHTML = '<b style="color:red">Error</b> ' + li.innerHTML
			li.childNodes[2].addEventListener('click', expand, false)
		}
	})
	
 	li[url] = this.parentNode

	if (this.parentNode.firstChild != this)
		this.parentNode.removeChild(this.parentNode.firstChild) //remove error message
	this.parentNode.innerHTML = '<b style="color:blue">Loading...</b> ' + this.parentNode.innerHTML
	
	event.preventDefault()
}

links = document.evaluate('//li[not(@class)]/a[contains(@href, "slashdot.org/comments.pl?sid=")]',
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

for (i=0; link=links.snapshotItem(i); i++) {
	link.addEventListener('click', expand, false)
}

})();