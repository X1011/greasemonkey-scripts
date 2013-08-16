// 2005-10-06
// ==UserScript==
// @name          DriverHeaven image direct link
// @namespace     http://home.earthlink.net/~x1011/
// @description   Rewrites image links to go directly to the image.
// @include       http://www.driverheaven.net/reviews/*
// @include       http://www.driverheaven.net/articles/*
// @include       http://www.driverheaven.net/guides/*
// ==/UserScript==

(function() {

links = document.evaluate('//a[starts-with(@onmousedown, "popImage(\'") and @href="javascript:;"]',
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

for (i=0; link=links.snapshotItem(i); i++) {
	link.href = link.getAttribute('onmousedown').substring(10, link.getAttribute('onmousedown').indexOf("'", 10))
	link.removeAttribute('onmousedown')
}

})();