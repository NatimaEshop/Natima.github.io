let contentLoaded = false;
document.addEventListener("DOMContentLoaded", function (event) {
	if (!contentLoaded) {
		$("body").show();
		contentLoaded = true;
	}
});

setTimeout(() => {
	if (!contentLoaded) {
		$(".in-index").show();
		contentLoaded = true;
	}
}, 300);
