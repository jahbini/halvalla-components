<rg-html>

    <span class="rg-html"></span>
    <script>
          /* istanbul ignore next */
          if (!opts.html) opts.html = {} ;

          if (!opts.html.content) opts.html.content = this.root._innerHTML ;

          if (!opts.content && this.root._innerHTML) opts.html.content = this.root._innerHTML ;

          if (opts.content) opts.html.content = opts.content ;

          this.root.innerHTML = (typeof opts.html.content === "undefined" ? "" : opts.html.content) ;
    </script>
</rg-html>
