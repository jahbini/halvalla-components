var RG2_VERSION = "3.6.2" ;
var RG2_INIT = false ;
var RG2_BASE = Date.now() ;
var RG2_CONFETTI = "rg-confetti" ;  //TODO Leave as is... rg-confetti.js needs this name, besides there can only be one! :-P
var RG2_CONFETTI_MSG ;    //TODO Used to pass text to rg-confetti.js, yes, yes, very hacky. Will fix later.

var RG2_MKDN_RENDER ;

var RG_DATE_CDN_MOMENTJS = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js";
var RG_CODE_CDN_ACEJS = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.0/ace.js";

//var RG_CHART_CDN_CHARTJS = "https://cdn.jsdelivr.net/chart.js/1.0.2/Chart.min.js" ;
var RG_CHART_CDN_CHARTJS = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js";
var RG_CREDIT_CARD_PAYMENT_FONTS = "https://cdnjs.cloudflare.com/ajax/libs/paymentfont/1.1.2/css/paymentfont.min.css";

  var RG_MARKDOWN_CDN_MARKDOWN = "https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.0/markdown-it.min.js";


  // ----------------------------------------

function RGVersion() {
  return RG2_VERSION ;
}

  // ----------------------------------------
function loadCSS(file, callback, error) {
    var _file = file ;
    var loaded = document.querySelector('link[href="'+file+'"]') ;

    if (loaded) {
      loaded.onload = callback ;
      loaded.onreadystatechange = callback;
      return
    }

    var css = document.createElement("script");
    css.type = "text/css";
    css.rel = "stylesheet";
    css.href = file;
    script.onload = callback ;
    loaded.onreadystatechange = callback;

    if (error) {
       css.onerror = error ;
       }
    else {
       css.onerror = function(e) {
              console.error("CSS File '" + _file + "' not found :-(");
              };
       }

    document.head.appendChild(css);
}   //eof: loadCSS


// ----------------------------------------
function loadJS(file, callback, error, type) {
    var _file = file ;
    var loaded = document.querySelector('script[src="'+file+'"]') ;

    if (loaded) {
      loaded.onload = callback ;
      loaded.onreadystatechange = callback;
      return
    }

    var script = document.createElement("script");

    script.type = (typeof type ==="string" ? type : "application/javascript") ;

    script.src = file;
    script.async = false ;
    script.defer = false ;
    script.onload = callback ;

    if (error) {
       script.onerror = error ;
       }
    else {
       script.onerror = function(e) {
              console.error("Script File '" + _file + "' not found :-(");
              };
       }

    script.onreadystatechange = callback;

    document.body.appendChild(script);
}   // eof: loadJS


// ----------------------------------------
function isBoolean(bool) {
    if (bool) {

      if (typeof bool === "number") {
         bool = Number(bool);

            if (bool === 1)
                return true;
            else
                return false;
        }

        if (typeof bool === "string") {
           bool = bool.toLowerCase() ;

          if (bool === "true" || bool === "false")
              if (bool === "true")
                  return true;
              else
                  return false;

          if (bool === "yes" || bool === "no")
              if (bool === "yes")
                  return true;
              else
                  return false;

            if (bool === "on" || bool === "off")
                if (bool === "on")
                    return true;
                else
                    return false;

        } else if (typeof bool === "boolean")
            return true;
    } else
        return false;

}   // eof: isBoolean

// ----------------------------------------

function toBoolean(bool) {

   if (bool)
      return isBoolean(bool) ;
   else
      return undefined;

}   // eof: toBoolean


// ----------------------------------------

function toNumber(num) {
    if (num) {

      if (typeof num === "number" || typeof num === "string")
         return Number(num) ;

    }
 else
   return NaN ;

 } ;

// ----------------------------------------
function stripParas (text) {
  if (text) {
     text = text.replace(/<\/?p[^>]*>/g, '') ;
   }
return text ;
}


// ----------------------------------------
function toMarkdown (content, renderCallback) {
  var markdownOK = !(typeof markdownit === "undefined");
  RG2_MKDN_RENDER = (markdownOK ? markdownit({html: true, linkify: true, typographer: true}) : undefined ) ;
  var _content = content ;


  var callbackMkdn = function callbackMkdn() {
      markdownOK = !(typeof markdownit === "undefined");

      if (!RG2_MKDN_RENDER && markdownOK && _content) {
          RG2_MKDN_RENDER = markdownit({
              html: true,
              linkify: true,
              typographer: true
          });

          if (markdownOK) {
             rendered = RG2_MKDN_RENDER.render(_content) ;

             rendered = stripParas(rendered) ;

             if (renderCallback)
                renderCallback(rendered) ;

             return rendered ;
             }

      }
  }   // eof: toMarkdown::callbackMkdn

  if ( ! markdownOK)
     loadJS(RG_MARKDOWN_CDN_MARKDOWN, callbackMkdn);
  else {
     rendered = RG2_MKDN_RENDER.render(_content) ;

     if (renderCallback)
        renderCallback(rendered) ;

     return stripParas(rendered) ;
     }
}    // eof: toMarkdown

// ----------------------------------------
function RiotGearInit() {
    if (RG2_INIT === true)
       return ;

    var localCB = function (text) {
    console.log(text) ;
    RG2_INIT = true ;
    }

 toMarkdown("**RG2** [" + RG2_VERSION + "] started", localCB) ;
}   // eof: RiotGearInit



document.addEventListener("DOMContentLoaded", function(event) {
  RiotGearInit() ;
});
