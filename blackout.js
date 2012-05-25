var blackout = (function () {
	
	var _$window = $(window),
		_timer,
		_$wrapper,
		_blacker = {},
		BLACK_OUT_DELAY = 3000,
		SHORTCUT_KEYCODE = 192;
	
	_$window
		.bind('load mousedown mousemove keydown scroll resize', resetBlackOutTimer)
		.keyup(function (e) {
			if (e.ctrlKey && e.keyCode === SHORTCUT_KEYCODE) {
				blackOut();
			}
		});
	
	function resetBlackOutTimer() {
		clearTimeout(_timer);
		_timer = setTimeout(blackOut, BLACK_OUT_DELAY);
	}
	
	function blackOut() {
		console.log(isNotCurrentTab() || isAlreadyBlacked())
		if (isNotCurrentTab() || isAlreadyBlacked()) {
			return;
		}
		
		createWrapper();
		runBlackerMethod( _$wrapper[0], _$window.width(), _$window.height() );
	}
	
	function isNotCurrentTab() {
		// TODO 현재 탭인지 여부를 리턴
		return false;
	}
	
	function isAlreadyBlacked() {
		return !!_$wrapper;
	}
	
	function createWrapper() {
		_$wrapper = $('<div>')
				.css({
					'position': 'fixed',
					'left': 0,
					'top': 0,
					'margin': 0,
					'padding': 0,
					'width': '100%',
					'height': '100%',
					'overflow': 'hidden'
				})
				.click(function (e) {
					$(this).remove();
					_$wrapper = null;
				})		
				.appendTo(document.body);
	}
	
	function runBlackerMethod(elWrapper, wWrapper, hWrapper) {
		if (typeof _blacker.blackOut === 'function') {
			_blacker.blackOut(elWrapper, wWrapper, hWrapper);
		}
	}
	
	return {
		blacker: function () {
			_blacker = {};
			return _blacker;
		}
	};
	
}());