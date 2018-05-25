riot.tag2('rg-raw', '<span></span>', '', '', function(opts) {
'use strict';

undefined.on('mount update', function () {
	this.root.innerHTML = opts.content || '';
});
});
