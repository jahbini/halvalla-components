riot.tag2('rg-select', '<input type="{opts.select.filter ? \'search\' : \'text\'}" name="selectfield" class="field" placeholder="{opts.select.placeholder}" onkeydown="{navigate}" oninput="{filterOptions}" onfocus="{open}" readonly="{!opts.select.filter}"> <ul class="menu menu--high" if="{opts.select.isvisible}"> <li each="{options}" no-reorder onclick="{parent.select}" class="menu__item {\'menu__item--active\': selected, \'menu__item--disabled\': disabled, \'menu__item--hover\': active}"> {text} </li> </ul>', 'rg-select .menu,[data-is="rg-select"] .menu{ position: absolute; }', '', function(opts) {
/* istanbul ignore next */
'use strict';

if (!opts.select) opts.select = { options: [] };

var handleClickOutside = function handleClickOutside(e) {
	if (!undefined.root.contains(e.target)) undefined.close();
	undefined.update();
};

var applyFieldText = function applyFieldText() {
	for (var i = 0; i < opts.select.options.length; i++) {
		var item = opts.select.options[i];
		if (item.selected) {
			undefined.selectfield.value = item.text;
			break;
		}
	}
};

undefined.filterOptions = function () {
	undefined.options = opts.select.options;
	if (opts.select.filter) undefined.options = undefined.options.filter(function (option) {
		var attr = option[opts.select.filter];
		return attr && attr.toLowerCase().indexOf(undefined.selectfield.value.toLowerCase()) > -1;
	});
	undefined.trigger('filter', undefined.selectfield.value);
};

function getWindowDimensions() {
	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
	    y = w.innerHeight || e.clientHeight || g.clientHeight;
	return { width: x, height: y };
}

var positionDropdown = function positionDropdown() {
	var w = getWindowDimensions();
	var m = undefined.root.querySelector('.menu');
	if (!m) return;
	if (!opts.select.isvisible) {
		// Reset position
		m.style.marginTop = '';
		m.style.marginLeft = '';
		return;
	}
	var pos = m.getBoundingClientRect();
	if (w.width < pos.left + pos.width) {
		// menu is off the right hand of the page
		m.style.marginLeft = w.width - (pos.left + pos.width) - 20 + 'px';
	}
	if (pos.left < 0) {
		// menu is off the right hand of the page
		m.style.marginLeft = '20px';
	}
	if (w.height < pos.top + pos.height) {
		// Popup is off the bottom of the page
		m.style.marginTop = w.height - (pos.top + pos.height) - 20 + 'px';
	}
};

undefined.navigate = function (e) {
	if ([13, 38, 40].indexOf(e.keyCode) > -1 && !opts.select.isvisible) {
		e.preventDefault();
		undefined.open();
		return true;
	}
	var length = undefined.options.length;
	if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
		// Get the currently selected item
		var activeIndex = null;
		for (var i = 0; i < length; i++) {
			var item = undefined.options[i];
			if (item.active) {
				activeIndex = i;
				break;
			}
		}

		// We're leaving this item
		if (activeIndex != null) undefined.options[activeIndex].active = false;

		if (e.keyCode == 38) {
			// Move the active state to the next item lower down the index
			if (activeIndex == null || activeIndex == 0) undefined.options[length - 1].active = true;else undefined.options[activeIndex - 1].active = true;
		} else if (e.keyCode == 40) {
			// Move the active state to the next item higher up the index
			if (activeIndex == null || activeIndex == length - 1) undefined.options[0].active = true;else undefined.options[activeIndex + 1].active = true;
		} else if (e.keyCode == 13 && activeIndex != null) {
			undefined.select({
				item: undefined.options[activeIndex]
			});
		}
	}
	return true;
};

undefined.open = function () {
	opts.select.isvisible = true;
	undefined.trigger('open');
};

undefined.close = function () {
	if (opts.select.isvisible) {
		opts.select.isvisible = false;
		undefined.trigger('close');
	}
};

undefined.select = function (e) {
	opts.select.options.forEach(function (i) {
		return i.selected = false;
	});
	e.item.selected = true;
	applyFieldText();
	undefined.filterOptions();
	opts.select.isvisible = false;
	undefined.trigger('select', e.item);
};

undefined.on('mount', function () {
	applyFieldText();
	undefined.filterOptions();
	document.addEventListener('click', handleClickOutside);
	undefined.update();
});

undefined.on('update', function () {
	if (!opts.select.filter) applyFieldText();
	positionDropdown();
});

undefined.on('unmount', function () {
	document.removeEventListener('click', handleClickOutside);
});
});
