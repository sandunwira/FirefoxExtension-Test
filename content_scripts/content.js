document.addEventListener('click', function (e) {
	e.preventDefault();
	browser.runtime.sendMessage({
		x: e.clientX,
		y: e.clientY
	});
}, false);