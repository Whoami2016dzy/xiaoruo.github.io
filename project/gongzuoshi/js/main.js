/**
 * [mouseHover description]
 * @return {[type]} [description]
 */
function mouseHover() {
	$("a.nav-bgd").hover(
		function() {
			$(this).stop()
				.animate({
					"background-color": "#4CD9C0",
					"color": "#fff"
				}, 400);
		},
		function() {
			$(this).stop()
				.animate({
					"background-color": "#42566E",
					"color": "#4CD9C0"
				}, 400);
		});
	$(".search-right :submit").hover(
		function() {
			$(this).stop()
				.animate({
					"background-color": "#fff",
					"color": "#3D4F67"
				}, 400);
		},
		function() {
			$(this).stop()
				.animate({
					"background-color": "#8DB4C5",
					"color": "#fff"
				}, 400);
		});
	$("#nav-new a.nav-bgd").hover(
		function() {
			$(this).stop()
				.animate({
					"background-color": "#4CD9C0",
					"color": "#fff"
				}, 400);
		},
		function() {
			$(this).stop()
				.animate({
					"background-color": "#fff",
					"color": "#4CD9C0"
				}, 400);
		});
	$("#relation").hover(
		function() {
			$(this).stop()
				.animate({
					"background-color": "#fff",
					"color": "#7191A8",
				}, 400);
		},
		function() {
			$(this).stop()
				.animate({
					"background-color": "#7191A8",
					"color": "#fff"
				}, 400);
		});
	$("#introduce a.join").hover(
		function() {
			$(this).stop()
				.animate({
					"background-color": "#4CD9C0",
					"color": "#fff",
				}, 400);
		},
		function() {
			$(this).stop()
				.animate({
					"background-color": "#fff",
					"color": "#4CD9C0"
				}, 400);
		});
}
/**
 * [backTop description]
 * @return {[type]} [description]
 */
function backTop() {
	$(window).scroll(function() {
		var scrollValue = $(window).scrollTop();
		scrollValue > 100 ? $('.backtop').fadeIn() : $('.backtop').fadeOut();
	});
	$('.backtop').click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 600);
	});
}

function showNav() {
	$(window).scroll(function() {
		var scrollValue = $(window).scrollTop();
		scrollValue > 600 ? $("#nav-new").fadeIn() : $("#nav-new").fadeOut();
	});
}
/**
 * [skip description]
 * @return {[type]} [description]
 */
function skip() {
	$('a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top - 80;
				$('html,body').animate({
						scrollTop: targetOffset
					},
					1000);
				return false;
			}
		}
	});
}
/**
 * [onLoads description]
 * @return {[type]} [description]
 */
function onLoads() {
	$(window).scroll(function() {
		if (checkScrollSlide) {
			$.getJSON('dataInt.json', function(data) {
				$.each(data, function(key, value) {
					console.log(value);
				})
			})
		}
	})
}
/**
 * [checkScrollSlide description]
 * @return {[type]} [description]
 * @author [author]
 */
function checkScrollSlide() {
	var scrollTop = $(window).scrollTop();
	var totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
	return (($(document).height()) <= totalheight) ? true : false;
}

function showShade() {
	var screenWidth = $(window).width(); //当前窗口宽度
	var screenHeight = $(window).height(); //当前窗口高度
	$("#relation").click(function() {
		$("#shade").css({
			"height": screenHeight
		});
		$("#shade").fadeIn();
		document.documentElement.style.overflow = "hidden";
	})
	$("#close").click(function() {
		$("#shade").fadeOut();
		document.documentElement.style.overflow = "visible";
	})
}

function changeColor() {
	$(".notice-main ul li :odd").css({
		"background-color": "#95B6C7",
		"color": "#fff"
	});
	$(".notice-main ul li :even").css({
		"background-color": "color",
		"color": "#95B6C7"
	});
}

function validate() {
	$("form :input").blur(function() {
		var $parent = $(this).parent();
		$parent.prev(".formtips").remove();
		if ($(this).is('#problem') || $(this).is('#suggest')) {
			if (this.value == "") {
				var errorMsg = "不能为空呦~";
				$parent.before('<span class="formtips onError">' + errorMsg + '</span>');
			} else {
				var okMsg = '正确啦~';
				$parent.before('<span class = "formtips onSuccess">' + okMsg + '</span>');
			}
		}
	})
	$("form :submit").click(function() {
		$("form :input").trigger('blur');
		var numError = $('form .onError').length;
		if (numError > 0) {
			return false;
		}
	});
}