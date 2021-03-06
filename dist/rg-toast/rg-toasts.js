riot.tag2('rg-toasts', '<div if="{opts.toasts.isvisible}" class="toasts {\'toasts--\' + opts.toasts.position}"> <div each="{opts.toasts.toasts}" class="toast {\'toast--\' + type}" if="{isvisible}" onclick="{parent.toastClicked}"> {text} </div> </div>', '', '', function(opts) {
'use strict';

var _this = this;

this.toastClicked = function (e) {
	var toast = e.item;
	window.clearTimeout(toast.timer);
	toast.isvisible = false;
	_this.trigger('select', toast);
};

var _uid = 1;
var uid = function uid() {
	return _uid++;
};

this.on('update', function () {
	if (!opts.toasts || !Array.isArray(opts.toasts.toasts)) return;
	opts.toasts.position = opts.toasts.position || 'bottomright';
	opts.toasts.toasts.forEach(function (toast) {
		if (typeof toast.isvisible == 'undefined') toast.isvisible = true;
		toast.id = toast.id || uid();
		if (!toast.timer && !toast.sticky) {
			toast.startTimer = function () {
				toast.timer = window.setTimeout(function () {
					toast.isvisible = false;
					_this.trigger('close', toast);
					_this.update();
				}, toast.timeout || 6000);
			};
			toast.startTimer();
		}
	});
	opts.toasts.isvisible = opts.toasts.toasts.filter(function (toast) {
		return toast.isvisible;
	}).length > 0;
});
});
