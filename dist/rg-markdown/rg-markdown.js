riot.tag2('rg-markdown', '', '', '', function(opts) {
'use strict';

if (commonmark) {
	undefined.reader = new commonmark.Parser();
	undefined.writer = new commonmark.HtmlRenderer();
}

undefined.on('update', function () {
	if (!opts.markdown) opts.markdown = {};
	if (opts.markdown.content) {
		undefined.root.innerHTML = undefined.writer.render(undefined.reader.parse(opts.markdown.content));
	} else if (opts.markdown.url) {
		(function () {
			var req = new XMLHttpRequest();
			req.onload = function (resp) {
				undefined.root.innerHTML = undefined.writer.render(undefined.reader.parse(req.responseText));
				undefined.trigger('loaded');
			};
			req.open('get', opts.markdown.url, true);
			req.send();
			undefined.trigger('loading');
		})();
	}
});
});
