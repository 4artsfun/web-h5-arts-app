var me = {}

if(window && !window.$mescrollRenderInit){
	window.$mescrollRenderInit = true


	window.addEventListener('touchstart', function(e){
		if (me.disabled()) return;
		me.startPoint = me.getPoint(e);
	}, {passive: true})


	window.addEventListener('touchmove', function(e){
		if (me.disabled()) return;
		if (me.getScrollTop() > 0) return;

		var curPoint = me.getPoint(e);
		var moveY = curPoint.y - me.startPoint.y;
		if (moveY > 0) {
			if (!me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || (me.isUpScrolling && me.isUpBoth))) {

				var el = e.target;
				var isMescrollTouch = false;
				while (el && el.tagName && el.tagName !== 'UNI-PAGE-BODY' && el.tagName != "BODY") {
					var cls = el.classList;
					if (cls && cls.contains('mescroll-render-touch')) {
						isMescrollTouch = true
						break;
					}
					el = el.parentNode;
				}
				if (isMescrollTouch && e.cancelable && !e.defaultPrevented) e.preventDefault();
			}
		}
	}, {passive: false})
}

me.getScrollTop = function() {
	return me.scrollTop || document.documentElement.scrollTop || document.body.scrollTop || 0
}

me.disabled = function(){
	return !me.optDown || !me.optDown.use || me.optDown.native
}

me.getPoint = function(e) {
	if (!e) {
		return {x: 0,y: 0}
	}
	if (e.touches && e.touches[0]) {
		return {x: e.touches[0].pageX,y: e.touches[0].pageY}
	} else if (e.changedTouches && e.changedTouches[0]) {
		return {x: e.changedTouches[0].pageX,y: e.changedTouches[0].pageY}
	} else {
		return {x: e.clientX,y: e.clientY}
	}
}

function propObserver(wxsProp) {
	me.optDown = wxsProp.optDown
	me.scrollTop = wxsProp.scrollTop
	me.isDownScrolling = wxsProp.isDownScrolling
	me.isUpScrolling = wxsProp.isUpScrolling
	me.isUpBoth = wxsProp.isUpBoth
}

const renderBiz = {
	data() {
		return {
			propObserver: propObserver,
		}
	}
}

export default renderBiz;
