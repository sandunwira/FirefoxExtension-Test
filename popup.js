document.addEventListener('DOMContentLoaded', function () {
	browser.runtime.sendMessage({ greeting: "getColor" }, function (response) {
		document.getElementById('color').textContent = response.color;
	});
});