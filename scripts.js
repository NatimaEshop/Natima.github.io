let dostupnostiVKosiku = $("td.p-availability .availability-label");
let nazvyVKosiku = $("td.p-name");
dostupnostiVKosiku.each(function (i) {
	this.appendTo(nazvyVKosiku[i]);
});

if (document.querySelector("body.in-kosik")) {
	rearangeSummary();
	function rearangeSummary() {
		$(".delivery-time").appendTo(".summary-wrapper");
		$(".cart-summary").appendTo(".summary-wrapper");
	}
	document.addEventListener("ShoptetDOMCartContentLoaded", function () {
		console.log("test");
	});
}
