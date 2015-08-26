// Page elements
$wrapper = $("#wrapper");
$namesPanel = $("#namesPanel");
$resetBtn = $("#reset-btn");
$clickArea = $("#click-area");
$optionsBtn = $("#options-btn");
$optionsPanel = $("#optionsPanel");
$optionsForm = $("#options-form");
$optionsBrowserChk = $(".browser-compatibility-checks");
$options_names = $("#names");
$options_removeAfterHit = $("#removeAfterHit");
$options_stopOnDemand = $("#stopOnDemand");
$options_lightTheme = $("#lightTheme");
$options_readOutNames = $("#readOutNames");
$options_optionCancel = $("#optionCancel");
$options_optionClear = $("#optionClear");

// Application Settings
var optionsDefault = {
	names: "",
	removeAfterHit: true,
	stopOnDemand: false,
	lightTheme: false,
	readOutNames: false
};
if ( Modernizr.localstorage ) {
	if ( typeof window.localStorage.names !== "string" ) window.localStorage.names = optionsDefault.names;
	if ( typeof window.localStorage.removeAfterHit !== "string" ) window.localStorage.removeAfterHit = optionsDefault.removeAfterHit ? "1" : "";
	if ( typeof window.localStorage.stopOnDemand !== "string" ) window.localStorage.stopOnDemand = optionsDefault.stopOnDemand ? "1" : "";
	if ( typeof window.localStorage.lightTheme !== "string" ) window.localStorage.lightTheme = optionsDefault.lightTheme ? "1" : "";
	if ( typeof window.localStorage.readOutNames !== "string" ) window.localStorage.readOutNames = optionsDefault.readOutNames ? "1" : "";
	if ( typeof window.localStorage.nameRemovedIndexes !== "string" ) window.localStorage.nameRemovedIndexes = "";
	var names = window.localStorage.names,
		removeAfterHit = !!window.localStorage.removeAfterHit,
		stopOnDemand = !!window.localStorage.stopOnDemand,
		lightTheme = !!window.localStorage.lightTheme,
		readOutNames = !!window.localStorage.readOutNames,
		nameRemovedIndexes = window.localStorage.nameRemovedIndexes.split(',');
} else {
	var names = "",
		removeAfterHit = optionsDefault.removeAfterHit,
		stopOnDemand = optionsDefault.stopOnDemand,
		lightTheme = optionsDefault.lightTheme,
		readOutNames = optionsDefault.readOutNames,
		nameRemovedIndexes = [];
}

// Temporary Variables
var nameCount, running = false, keeprunning = true, daemon;

// Load Themes
function _loadTheme(themeUrl) {
	if (document.createStyleSheet) {
		document.createStyleSheet(themeUrl);
	} else {
		var themeCss = document.createElement("link");
		themeCss.rel = "stylesheet"; themeCss.href = themeUrl;
		document.head.appendChild(themeCss);
	}
}
setTimeout(function() {
	if (lightTheme) _loadTheme("styles/light.css");
}, 1000);

// Browser Compatibility Check
(function() {
	var features = {
		localstorage: "本地保存设置",
		applicationcache: "离线使用",
		boxshadow: "发光与阴影",
		cssgradients: "渐变颜色效果",
		csstransitions: "过渡动画效果",
		csstransforms: "2D 变换效果",
		csstransforms3d: "3D 变换效果"
	};
	for (feature in features) {
		$("<div />").attr("class", Modernizr[feature] ? "pass" : "fail").text( features[feature] ).appendTo( $optionsBrowserChk );
	}

	$("<div />").attr("class", window.speechSynthesis ? "pass" : "fail").text("朗读中奖者名字").appendTo( $optionsBrowserChk );
})();

// Names Panel init
function namesPanelInit(clearState) {
	running = false; keeprunning = false;
	$(".name").remove();
	var namesTemp = names.replace(/[\s\,、，]+/g, '，').split('，');
	nameTemp = _cleanArray("", namesTemp);
	nameCount = namesTemp.length;
	if (clearState) {
		nameRemovedIndexes = [];
		if ( Modernizr.localstorage ) {
			window.localStorage.nameRemovedIndexes = "";
		}
	}
	for (var i = 0; i < nameCount; i++) {
		var name = namesTemp[i];
		var nameDiv = $('<div class="name">' + name + '</div>');
		var nameDivSize = _calcNameSize(nameCount, name.length);
		nameDiv.css({'width':nameDivSize[0], 'height':nameDivSize[1], 'line-height':nameDivSize[1], 'font-size':nameDivSize[2]});
		nameDiv.appendTo( $namesPanel );
		if (nameRemovedIndexes.indexOf(i.toString()) !== -1) nameDiv.addClass("removed");
	}
	if (nameCount < 2) $optionsBtn.addClass("glow");
	else $optionsBtn.removeClass("glow");
}

// Options Panel init
function optionsPanelInit() {
	$options_names.val( names );
	$options_removeAfterHit.prop("checked", removeAfterHit);
	$options_stopOnDemand.prop("checked", stopOnDemand);
	$options_lightTheme.prop("checked", lightTheme);
	$options_readOutNames.prop("checked", readOutNames);
	$(".fancyChkbox").each(function() {
		var $thisChkbox = $(this).children("input[type=checkbox]");
		if ( $thisChkbox.prop("checked") ) {
			$(this).addClass("on");
		} else {
			$(this).removeClass("on");
		}
	});
}

// Options Save
function optionsSave() {
	if ( Modernizr.localstorage ) {
		window.localStorage.names = $options_names.val();
		window.localStorage.removeAfterHit = $options_removeAfterHit.prop("checked") ? "1" : "";
		window.localStorage.stopOnDemand = $options_stopOnDemand.prop("checked") ? "1" : "";
		window.localStorage.lightTheme = $options_lightTheme.prop("checked") ? "1" : "";
		window.localStorage.readOutNames = $options_readOutNames.prop("checked") ? "1" : "";
	}
	names = $options_names.val();
	removeAfterHit = $options_removeAfterHit.prop("checked");
	stopOnDemand = $options_stopOnDemand.prop("checked");
	lightTheme = $options_lightTheme.prop("checked");
	readOutNames = $options_readOutNames.prop("checked");
}

// Options Clear
function optionsClear() {
	if ( !confirm("确实要清除所有设置吗？") ) return;
	$options_names.val( optionsDefault.names );
	$options_removeAfterHit.prop("checked", optionsDefault.removeAfterHit);
	$options_stopOnDemand.prop("checked", optionsDefault.stopOnDemand);
	$options_lightTheme.prop("checked", optionsDefault.lightTheme);
	$options_readOutNames.prop("checked", optionsDefault.readOutNames);
	optionsSave();
	optionsPanelInit();
}

// Name size responses to screen size
function _calcNameSize(nameCount, nameCharsCount) {
	if (nameCharsCount < 3) nameCharsCount = 3;
	var magicDivide = Math.ceil( Math.sqrt(nameCount) );
	var nameWidth = $(window).width() / magicDivide;
	var nameHeight = $(window).height() / magicDivide;
	var nameFontSize = Math.min(nameWidth * 0.8 / nameCharsCount, nameHeight * 0.8);

	return [nameWidth+'px', nameHeight+'px', nameFontSize+'px'];
}

function _getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _cleanArray(deleteValue, array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == deleteValue) {
			array.splice(i, 1);
			i--;
		}
	}
	return array;
}

function _gotoName() {
	if (stopOnDemand && !keeprunning) {
		clearInterval(daemon);
		_hitName();
		return;
	}
	var idx = _getRandomInt(0, nameCount - nameRemovedIndexes.length - 1);
	$(".name").removeClass('on');
	$(".name:not(.removed)").eq(idx).addClass('on');
}

function _chgName(interval, duration) {
	if ( interval >= duration || keeprunning == false ) {
		_hitName();
		return true;
	}
	daemon = setInterval(_gotoName, interval);
	if (!stopOnDemand) {
		setTimeout(function() {
			clearInterval(daemon);
			_chgName(interval * 4, duration);
		}, duration);
	}
}

function _hitName() {
	var hit = $(".name.on");
	if (!hit) {
		_gotoName();
		hit = $(".name.on");
	}
	var hitOffset = hit.offset();
	var viewportMiddleX = $(window).width() / 2;
	var viewportMiddleY = $(window).height() / 2;
	var moveX = (viewportMiddleX - hitOffset.left - hit.width() / 2) / 5;
	var moveY = (viewportMiddleY - hitOffset.top - hit.height() / 2) / 5;
	var transform = 'scale(5) translate('+moveX+'px, '+moveY+'px)';
	hit.css({
		'-moz-transform': transform,
		'-webkit-transform': transform,
		'-ms-transform': transform,
		'-o-transform': transform,
		'transform': transform
	});
	if (readOutNames && window.speechSynthesis) {
		var u = new SpeechSynthesisUtterance( hit.text() );
		u.lang = 'zh-CN';
		window.speechSynthesis.speak(u);
	}
	if (removeAfterHit) {
		nameRemovedIndexes.push( $(".name").index(hit) );
		if ( Modernizr.localstorage ) {
			window.localStorage.nameRemovedIndexes = nameRemovedIndexes.join(',');
		}
	}
	running = false;
}

function newRound(e) {
	if ( $wrapper.hasClass("flip") ) return false;
	if (e.type == 'keyup' && [13, 32].indexOf(e.keyCode) == -1) return false;
	if (running) {
		if (stopOnDemand) keeprunning = false;
		return false;
	}
	var nameHit = $(".name.on");
	if (nameHit.length) {
		nameHit.removeClass('on').css({
			'-moz-transform':'none',
			'-webkit-transform':'none',
			'-ms-transform':'none',
			'-o-transform':'none',
			'transform':'none'
		});
		if (removeAfterHit) {
			nameHit.addClass('removed');
		}
		return false;
	}
	if (nameRemovedIndexes.length >= nameCount) return false;
	running = true; keeprunning = true;
	_chgName(100, 3000);
}

$(function() {
	$(window).resize(function() {
		$(".name").each(function () {
			var $this = $(this);
			var nameDivSize = _calcNameSize(nameCount, $this.text().length);
			$this.css({'width':nameDivSize[0], 'height':nameDivSize[1], 'line-height':nameDivSize[1], 'font-size':nameDivSize[2]});
		});
	});
	$clickArea.click(newRound);
	$("body").bind('keyup', newRound);
	$resetBtn.click(function() {
		if ( running || !confirm("确实要复位吗？") ) return;
		namesPanelInit(true);
	});
	$optionsBtn.click(function() {
		$wrapper.addClass("flip");
	});
	$(".fancyChkbox").click(function() {
		var $thisChkbox = $(this).children("input[type=checkbox]");
		if ( $thisChkbox.prop("checked") ) {
			$thisChkbox.prop("checked", false);
			$(this).removeClass("on");
		} else {
			$thisChkbox.prop("checked", true);
			$(this).addClass("on");
		}
	});
	$optionsForm.submit(function(e) {
		e.stopPropagation();
		optionsSave();
		namesPanelInit(true);
		$wrapper.removeClass("flip");
	});
	$options_optionCancel.click(function() {
		optionsPanelInit();
		$wrapper.removeClass("flip");
	});
	$options_optionClear.click(function() {
		optionsClear();
		namesPanelInit(true);
	});

	// Call inits
	namesPanelInit();
	optionsPanelInit();
});