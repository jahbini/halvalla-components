riot.tag2('rg-html', '<span class="rg-html"></span>', '', '', function(opts) {
/* istanbul ignore next */
"use strict";

debugger;
if (!opts.html) opts.html = {};

if (!opts.html.content) opts.html.content = undefined.root._innerHTML;

if (!opts.content && undefined.root._innerHTML) opts.html.content = undefined.root._innerHTML;

if (opts.content) opts.html.content = opts.content;

undefined.root.innerHTML = typeof opts.html.content === "undefined" ? "" : opts.html.content;
});
