riot.tag2('rg-tabs', '<div class="tabs {\'tabs--\' + opts.tabs.type}"> <div class="tabs__headings"> <div each="{opts.tabs.tabs}" class="tab-heading {\'tab-heading--active\': active, \'tab-heading--disabled\': disabled}" onclick="{parent.open}"> {heading} </div> </div> <div each="{opts.tabs.tabs}" class="tabs__tab {\'tabs__tab--active\': active}"> <div if="{text}"> {text} </div> <div if="{include}"> {include.responseText} </div> </div> </div>', '', '', function(opts) {
'use strict';

var fetch = function fetch(tab) {
	var req = new XMLHttpRequest();
	req.onload = function (resp) {
		var activeTab = undefined.root.querySelector('.tabs__tab--active');
		if (activeTab) activeTab.innerHTML = req.responseText;
		undefined.trigger('loaded', tab);
	};
	req.open('get', tab.include, true);
	req.send();
	undefined.trigger('loading', tab);
};

undefined.open = function (e) {
	var tab = e.item;
	if (!tab.disabled && !tab.active) {
		opts.tabs.tabs.forEach(function (tab) {
			tab.active = false;
		});
		undefined.trigger('open', tab);
		tab.active = true;
	}
};

undefined.on('update', function () {
	if (!opts.tabs) opts.tabs = {};
	if (!Array.isArray(opts.tabs.tabs)) return;
	opts.tabs.tabs.forEach(function (tab) {
		if (!tab.disabled && tab.active && tab.include) {
			fetch(tab);
		}
	});
});
});
