/*faq*/
if (document.querySelector(".contact-faq")) {
	$(".contact-faq-question > p").on("click", function () {
		$(this).parent().toggleClass("active");
	});
}

/*kosik 1*/
if (document.querySelector("body.in-krok-1")) {
	$(".checkout-box").appendTo(".co-basic-information");
	const minWidth992 = window.matchMedia("(min-width: 992px)");
	if (minWidth992) {
		$(".next-step").appendTo(".order-summary-inner");
		$("<div class='summary-background'></div>").appendTo(".order-summary-inner");
		$("<div class='rekapitulace-background'></div>").appendTo(".order-summary-inner");
	}
}
