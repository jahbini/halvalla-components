riot.tag2('rg-pagination', '<div class="pagination"> <div class="pagination__controls pagination__controls--backward"> <button class="pagination__control" disabled="{opts.pagination.page <= 1}" onclick="{first}">«</button> <button class="pagination__control" disabled="{opts.pagination.page <= 1}" onclick="{back}">‹</button> </div> <div class="pagination__controls"> <span class="pagination__ellipsis" if="{opts.pagination.page > 2}">&hellip;</span> <button class="pagination__page" onclick="{back}" if="{opts.pagination.page > 1}">{opts.pagination.page - 1}</button> <button class="pagination__page pagination__page--current">{opts.pagination.page}</button> <button class="pagination__page" onclick="{forward}" if="{opts.pagination.page < opts.pagination.pages}">{opts.pagination.page + 1}</button> <span class="pagination__ellipsis" if="{opts.pagination.page < opts.pagination.pages - 1}">&hellip;</span> </div> <div class="pagination__controls pagination__controls--forward"> <button class="pagination__control" disabled="{opts.pagination.page >= opts.pagination.pages}" onclick="{forward}">›</button> <button class="pagination__control" disabled="{opts.pagination.page >= opts.pagination.pages}" onclick="{last}">»</button> </div> </div>', '', '', function(opts) {
'use strict';

undefined.on('update', function () {
  if (!opts.pagination) opts.pagination = {
    pages: 1,
    page: 1
  };
});

undefined.on('page', function () {
  var btns = undefined.root.querySelectorAll('button');
  for (var i = 0; i < btns.length; i++) {
    btns[i].blur();
  }
});

undefined.forward = function () {
  opts.pagination.page++;
  undefined.trigger('page', opts.pagination.page);
};

undefined.back = function () {
  opts.pagination.page--;
  undefined.trigger('page', opts.pagination.page);
};

undefined.first = function () {
  opts.pagination.page = 1;
  undefined.trigger('page', opts.pagination.page);
};

undefined.last = function () {
  opts.pagination.page = opts.pagination.pages;
  undefined.trigger('page', opts.pagination.page);
};
});
