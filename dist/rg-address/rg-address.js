    riot.tag("rg-address",
        '<address class="c-address">'+
        '  <span class="c-address__heading">{opts.address.recipient}</span>'+
        '  <div each="{addr in opts.address.lines}">'+
        '     <span class="{\'c-address--road\':addr.road} {\'c-address--district\':addr.district} {\'c-address--town\':addr.town} {\'c-address--code\':addr.code} {\'c-address--state\':addr.state} {\'c-address--country\':addr.country}">{addr.line}<br></span>'+
        '  </div>'+
        '</address>',
        '',
        function() {
          var _this = this ;

        });
