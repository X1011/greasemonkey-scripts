// ==UserScript==
// @name          bash.org
// @namespace     http://home.earthlink.net/~x1011/
// @description   
// @include       http://www.bash.org/?latest
// ==/UserScript==

function addcss(css) {
	style = document.createElement('style')
	style.type = 'text/css'
	style.innerHTML = css
	document.getElementsByTagName('head')[0].appendChild(style)
}

addcss('\
	a.qa:not([onclick]) {font-weight:bold; font-size:16px; padding:0px 5px 0px 5px; border:solid 1px #CCCCCC}\
	a.qa:not([onclick]):hover {background-color:#888888}\
')
window.addEventListener('load', function() {
	document.body.innerHTML = document.body.innerHTML.replace("\\'", "'")
}, false)