riot.tag2('rg-unsplash', '<img riot-src="https://unsplash.it/{opts.unsplash.greyscale}{opts.unsplash.width}/{opts.unsplash.height}/?{options}">', '', '', function(opts) {
'use strict';

undefined.on('update', function () {
	undefined.options = '';
	if (!opts.unsplash) opts.unsplash = {};
	opts.unsplash.width = opts.unsplash.width || 450;
	opts.unsplash.height = opts.unsplash.height || 250;
	if (opts.unsplash.greyscale) opts.unsplash.greyscale = 'g/';
	if (opts.unsplash.random) undefined.options += 'random&';
	if (opts.unsplash.blur) undefined.options += 'blur&';
	if (opts.unsplash.image) undefined.options += 'image=' + opts.unsplash.image + '&';
	if (typeof opts.unsplash.gravity !== 'undefined') undefined.options += 'gravity=' + opts.unsplash.gravity;
});
});
