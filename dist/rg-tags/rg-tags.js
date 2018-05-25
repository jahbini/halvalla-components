riot.tag2('rg-tags', '<div class="tags"> <span class="tags__container"> <button each="{opts.tags.tags}" onclick="{removeTag}" type="button" class="button button--primary tag"> {text} <span class="tag__close">×</span> </button> </span> <div class="tags__field-container"> <input type="{opts.tags.filter ? \'search\' : \'text\'}" name="selectfield" class="field" placeholder="{opts.tags.placeholder}" onkeydown="{navigate}" oninput="{filterOptions}" onfocus="{open}" readonly="{!opts.tags.filter}"> <ul class="menu menu--high" if="{opts.tags.isvisible}"> <li each="{options}" no-reorder onclick="{parent.select}" class="menu__item {\'menu__item--active\': selected, \'menu__item--disabled\': disabled, \'menu__item--hover\': active}"> {text} </li> </ul> </div> </div>', 'rg-tags .menu,[data-is="rg-tags"] .menu{ position: absolute; }', '', function(opts) {
/* istanbul ignore next */
'use strict';

if (!opts.tags) opts.tags = { options: [], tags: [] };
if (!opts.tags.options) opts.tags.options = [];
if (!opts.tags.tags) opts.tags.tags = [];

var handleClickOutside = function handleClickOutside(e) {
	if (!undefined.root.contains(e.target)) undefined.close();
	undefined.update();
};

var applyFieldText = function applyFieldText() {
	undefined.selectfield.value = '';
	for (var i = 0; i < opts.tags.options.length; i++) {
		var item = opts.tags.options[i];
		item.selected = false;
	}
};

undefined.filterOptions = function () {
	undefined.options = opts.tags.options;
	if (opts.tags.filter) undefined.options = undefined.options.filter(function (option) {
		var attr = option[opts.tags.filter];
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
	if (!opts.tags.isvisible) {
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
	if ([13, 38, 40].indexOf(e.keyCode) > -1 && !opts.tags.isvisible) {
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
	opts.tags.isvisible = true;
	undefined.trigger('open');
};

undefined.close = function () {
	if (opts.tags.isvisible) {
		opts.tags.isvisible = false;
		undefined.trigger('close');
	}
};

undefined.select = function (e) {
	opts.tags.options.forEach(function (i) {
		return i.selected = false;
	});
	e.item.selected = true;
	undefined.addTag(e.item);
	applyFieldText();
	undefined.filterOptions();
	undefined.trigger('select', e.item);
};

undefined.addTag = function (item) {
	if (opts.tags.tags.indexOf(item) == -1) {
		opts.tags.tags.push(item);
	}
};

undefined.removeTag = function (e) {
	opts.tags.tags = opts.tags.tags.filter(function (tag) {
		if (tag._id != e.item._id) return tag;
	});
};

undefined.on('mount', function () {
	applyFieldText();
	undefined.filterOptions();
	document.addEventListener('click', handleClickOutside);
	undefined.update();
});

undefined.on('update', function () {
	opts.tags.options.forEach(function (item) {
		item._id = item._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
	});
	opts.tags.tags.forEach(function (tag) {
		tag._id = tag._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36);
	});

	if (!opts.tags.filter) applyFieldText();
	positionDropdown();
});

undefined.on('unmount', function () {
	document.removeEventListener('click', handleClickOutside);
});
});
