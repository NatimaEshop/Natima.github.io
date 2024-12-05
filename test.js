function cycleActiveClass() {
	let spans = $(".top-lista .add-texts span");
	let currentIndex = spans.index($(".top-lista .add-texts span.active"));

	spans.removeClass("active");
	let nextIndex = (currentIndex + 1) % spans.length;
	spans.eq(nextIndex).addClass("active");
}

// Initially add the active class to the first span
$(".top-lista .add-texts span").first().addClass("active");
$(".top-lista-car").addClass("active");

// Get .main-text width and set it as its min-width
setTimeout(function () {
	let mainTextWidth = $(".main-text").width();
	$(".main-text").css("min-width", mainTextWidth);
}, 1);

// Cycle the active class every 6 seconds
let cycleInterval = setInterval(cycleActiveClass, 6000);

// Restart the cycle on window resize
$(window).resize(function () {
	$(".top-lista-car").removeClass("active");
	$(".top-lista .add-texts span").removeClass("active");

	//timeout 3ms
	setTimeout(function () {
		clearInterval(cycleInterval);
		$(".top-lista-car").addClass("active");
		$(".top-lista .add-texts span").first().addClass("active");
		$(".main-text").css("min-width", "auto");
		mainTextWidth = $(".main-text").width();
		$(".main-text").css("min-width", mainTextWidth);
		cycleInterval = setInterval(cycleActiveClass, 6000);
	}, 1);
});
