riot.tag2('rg-bubble', '<div class="context"> <div class="bubble bubble--top" if="{isvisible}"> {opts.bubble.text} </div> <div class="content" onmouseover="{showBubble}" onmouseout="{hideBubble}" onclick="{toggleBubble}"> <yield></yield> </div> </div>', 'rg-bubble .context,[data-is="rg-bubble"] .context,rg-bubble .content,[data-is="rg-bubble"] .content{ display: inline-block; position: relative; } rg-bubble .bubble,[data-is="rg-bubble"] .bubble{ position: absolute; top: -70px; left: 50%; transform: translate3d(-50%, 0, 0); }', '', function(opts) {
"use strict";

undefined.showBubble = function () {
	clearTimeout(undefined._timer);
	undefined.isvisible = true;
};

undefined.hideBubble = function () {
	undefined._timer = setTimeout(function () {
		undefined.isvisible = false;
		undefined.update();
	}, 1000);
};

undefined.toggleBubble = function () {
	undefined.isvisible = !undefined.isvisible;
};
});
