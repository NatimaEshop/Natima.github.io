/*problikávání*/
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

/*kategorie*/
document.addEventListener("DOMContentLoaded", function (event) {
	if ($(".category-top").length >= 1) {
		$(".category-top").insertBefore(".content-wrapper-in");

		let filter = $(".filters-wrapper");
		$("#filters-default-position").append(filter);
	}
});
