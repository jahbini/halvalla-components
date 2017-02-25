riot.tag("rg-chart",
    "<canvas></canvas>",
    'rg-chart,[riot-tag="rg-chart"],[data-is="rg-chart"]{ display: inline-block; width: 100%; }', "",
    function(opts) {

        var _this = this;
        var dependencyOK = false ;

        var callback = function callback(){
          dependencyOK = true ;
          _this.update() ;
        }

        if (typeof Chart === "undefined")
           loadJS(rg_chart_cdn_chartjs, callback) ;
        else
           dependencyOK = true ;


        this.on("mount", function() {
             if (dependencyOK)
                drawChart();
           });


        this.on("update", function() {
          if (dependencyOK)
             drawChart();
        });

        this.on("loaded", function(c) {
            _this.on("unmount", function() {
                c.destroy()
            })
        });

        var drawChart = function drawChart() {

            if (!Chart.defaults.global.responsive)
               Chart.defaults.global.responsive = true;

            if (!opts.chart) opts.chart = {};
            var ctx = _this.root.querySelector("canvas").getContext("2d");
            var chart = new Chart(ctx, {type: _this.opts.chart.type, data: _this.opts.chart.data, options: _this.opts.chart.options});

            _this.trigger("loaded", chart)
        }
    });
