riot.tag2('rg-alerts', '<div class="alerts"> <div each="{opts.alerts}" class="alerts__alert {\'alerts__alert--\' + type}" if="{isvisible}" onclick="{select}"> <button class="button button--close" if="{dismissable != false}" onclick="{parent.dismiss}"> &times; </button> {text} </div> </div>', '', '', function(opts) {
'use strict';

undefined.on('update', function () {
	if (!opts.alerts) return;
	opts.alerts.forEach(function (alert) {
		if (typeof alert.isvisible === 'undefined') alert.isvisible = true;
		if (alert.timeout) {
			alert.startTimer = function () {
				alert.timer = setTimeout(function () {
					undefined.dismiss({
						item: alert
					});
				}, alert.timeout);
			};
			alert.startTimer();
		}
	});
});

undefined.dismiss = function (e) {
	var alert = e.item;
	alert.isvisible = false;
	clearTimeout(alert.timer);
	undefined.trigger('dismiss', alert);
	undefined.update();
};

undefined.select = function (e) {
	var alert = e.item;
	if (alert.onclick) alert.onclick(alert);
	undefined.trigger('select', alert);
};
});
