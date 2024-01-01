let lastColor = 'rgb(0,0,0)'; // default color

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.greeting === "getColor") {
		sendResponse({ color: lastColor });
	} else {
		browser.tabs.captureVisibleTab().then(function (dataUrl) {
			var img = new Image();
			img.onload = function () {
				var canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, img.width, img.height);
				var data = ctx.getImageData(request.x, request.y, 1, 1).data;
				var r = data[0];
				var g = data[1];
				var b = data[2];
				lastColor = 'rgb(' + r + ',' + g + ',' + b + ')';
				browser.browserAction.setBadgeText({ text: ' ' });
				browser.browserAction.setBadgeBackgroundColor({ color: lastColor });
			};
			img.src = dataUrl;
		});
	}
});