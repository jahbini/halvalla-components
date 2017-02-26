riot.tag("rg-accordion",
    '<div class="c-card c-card--accordion" each="{item, index in opts.accordion.panels}">' +
    '     <input type="checkbox" ref="accordion-ref{index}" id="accordion-{index}" onclick="{notify}">' +
    '     <label class="c-card__item" for="accordion-{index}">{item.title}</label>' +
    '     <div class="c-accordion-content c-card__item"><rg-markdown content="{item.content}"></rg-markdown></div>' +
    '</div>', '.c-accordion-content {padding-left: 2em;}',
    function() {
      var _this = this ;

      this.notify = function (e) {
          not = {index: e.item.index,
                 title: e.item.item.title,
                 open: e.target.checked} ;
         _this.trigger("notify", not) ;
      } ;

    });
