/*kategorie na mobil*/
$(".filters-unveil-button-wrapper").append("<div class='raditPodle'><span>Řadit dle</span></div>");
$(".raditPodle").on("click tap touchstart", function () {
	$(".category-header").toggleClass("active");
});

document.addEventListener("ShoptetPageSortingChanged", filterMobileRearange);
document.addEventListener("ShoptetPageFilterValueChange", filterMobileRearange);
document.addEventListener("ShoptetPageFiltersCleared", filterMobileRearange);
document.addEventListener("ShoptetPagePriceFilterChange", filterMobileRearange);

function filterMobileRearange() {
	if (!matchesMedia768) {
	}
}

if ($(".availability-label").text().indexOf("Momen") > -1) {
	$(".availability-label").addClass("red");
}
