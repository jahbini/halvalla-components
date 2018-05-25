riot.tag2('rg-include', '<div> {responseText} </div>', '', '', function(opts) {
'use strict';

var fetch = function fetch() {
	var req = new XMLHttpRequest();
	req.onload = function (resp) {
		if (opts.include.unsafe) undefined.root.innerHTML = req.responseText;else undefined.responseText = req.responseText;
		undefined.update();
		undefined.trigger('loaded');
	};
	req.open('get', opts.include.url, true);
	req.send();
	undefined.trigger('loading');
};

undefined.on('mount', function () {
	fetch();
});
});
