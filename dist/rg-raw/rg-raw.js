riot.tag2('rg-raw', '<span></span>', '', '', function(opts) {
'use strict';

this.on('mount update', function () {
	this.root.innerHTML = opts.content || '';
});
});
