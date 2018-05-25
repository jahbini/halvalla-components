riot.tag2('rg-map', '<div class="rg-map"></div>', 'rg-map .rg-map,[data-is="rg-map"] .rg-map{ margin: 0; padding: 0; width: 100%; height: 100%; } rg-map .rg-map img,[data-is="rg-map"] .rg-map img{ max-width: inherit; }', '', function(opts) {
'use strict';

window.rg = window.rg || {};
window.rg.gmap = riot.observable({
	initialize: function initialize() {
		window.rg.gmap.trigger('initialize');
	}
});

undefined.on('mount', function () {
	if (!opts.map) opts.map = {
		center: {
			lat: 53.806,
			lng: -1.535
		},
		zoom: 7
	};

	/* istanbul ignore next */
	rg.gmap.on('initialize', function () {
		opts.map.mapObj = new google.maps.Map(undefined.root.querySelector('.rg-map'), opts.map);
		undefined.trigger('loaded', opts.map.mapObj);
	});

	if (!document.getElementById('gmap_script')) {
		var script = document.createElement('script');
		script.setAttribute('id', 'gmap_script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?callback=window.rg.gmap.initialize';
		document.body.appendChild(script);
	}
});
});
