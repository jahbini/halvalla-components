riot.tag("rg-card",
     '<div class="c-card  {\'u-\' + opts.card.shadow}"> '+
     '<img class="o-image" riot-src="{opts.card.header.image}" if="{opts.card.header.image && (opts.card.header.text || opts.card.header.subhead)}">'+
     ' <header class="c-card__header" if="{opts.card.header.text || opts.card.header.subhead}">' +
     '<h2 class="c-heading c-heading--small"><rg-html content="{opts.card.header.text}"></rg-html>' +
     '<div class="c-heading__sub"><rg-html content="{opts.card.header.subhead}"></rg-html></div>' +
     '</h2>' +
     '</header>' +
     '<div class="c-card__item c-card__item{\'--\'+opts.card.header.style}" if="{opts.card.header.divider && opts.card.header.text}"></div>'+
     '  <div class"c-card__body">'+
     '<div class="rg-card-content">'+
     '   <rg-html content="<p class=\'c-paragraph\'>{opts.card.text}</p>" if="{opts.card.text}"></rg-html>'+
     '   <yield>'+
     '</div>'+
     '</div>'+
     '<div class="c-card__item c-card__item{\'--\'+opts.card.footer.style}" if="{opts.card.footer.divider && (opts.card.footer.text || (opts.card.footer.items.length > 0))}"></div>'+
     '<footer class="c-card__footer {\'c-card__footer--block\':opts.card.footer.block}" if="{(opts.card.footer.items.length > 0) || opts.card.footer.text}">' +
     '<p class="c-text--quiet"><rg-html content="{opts.card.footer.text}" if="{opts.card.footer.text}"></rg-html></p>' +
     '<div class="c-input-group"> <button each="{button in opts.card.footer.items}" class="c-button c-button--block {\'c-button--active\':button.active}'+
     ' {\'c-button--\'+button.style}" '+
     'disabled="{button.disabled}" onclick="{btnclicked}">{button.text}</button>' +
     ' </div>'+
     '</footer>'+
     '</div>',
     ".rg-card-content {margin: 0.8em}","",
     function (opts){
       var self = this ;

       if (!opts.card) opts.card = {header: {}, footer: {items: []}};

      if (this.root._innerHTML) opts.card.contents = toMarkdown(this.root._innerHTML) ;
       if (opts.card.header.text) opts.card.header.text = toMarkdown(opts.card.header.text) ;
       if (opts.card.header.subhead) opts.card.header.subhead = toMarkdown(opts.card.header.subhead) ;
       if (opts.card.footer.text) opts.card.footer.text = toMarkdown(opts.card.footer.text) ;
       if (opts.card.text) opts.card.text = toMarkdown(opts.card.text) ;

       if (opts.header) opts.card.header.text = toMarkdown(opts.header) ;
       if (opts.subhead) opts.card.header.subhead = toMarkdown(opts.subhead) ;
       if (opts.image) opts.card.header.image = opts.image ;
       if (opts.footer) opts.card.footer.text = toMarkdown(opts.footer) ;
       if (opts.block) opts.card.footer.block = toBoolean(opts.block) ;
       if (opts.divider) opts.card.footer.divider = toBoolean(opts.divider) ;
       if (opts.divider) opts.card.header.divider = toBoolean(opts.divider) ;
       if (opts.text) opts.card.text = toMarkdown(opts.text) ;
       if (opts.shadow) opts.card.shadow = opts.shadow ;

       //TODO Need to figure out how to pass arrays from the declaration...
       if (opts.buttons)
          opts.card.footer.items = opts.buttons ;

       btnclicked = function(e) {
           selbtn = e.item.button ;

           btn = {
               text: selbtn.text
           };

           self.trigger("button-clicked", btn);
       }
     });


