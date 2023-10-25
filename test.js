const orderNextStepButton = $(".next-step");
const oderCartItems = $(".cart-items");
const orderCheckoutBox = $(".checkout-box");
const orderConsentsFirst = $(".consents-first");
const orderCoBoxAdditional = $(".co-box.co-box-additional");
const orderCompanyShopping = $(".company-shopping");
const orderConsents = $(".consents");

if (document.body.classList.contains("in-krok-2")) {
	oderCartItems.last().removeClass("cart-items").addClass("order-recapitulation");
	orderCheckoutBox.appendTo(".order-summary-inner");
	orderConsentsFirst.appendTo(".order-summary-inner");
	orderNextStepButton.appendTo(".order-summary-inner");
	$("<div class='summary-background'></div>").appendTo(".order-summary-inner");
	$("<div class='rekapitulace-background'></div>").appendTo(".order-summary-inner");
	orderCoBoxAdditional.appendTo(".co-contact-information");
	orderCompanyShopping.insertAfter(".co-billing-address > fieldset");
	orderConsents.appendTo(".next-step");

	document.addEventListener("ShoptetDataLayerUpdated", function () {
		oderCartItems.last().removeClass("cart-items").addClass("order-recapitulation");
		orderCheckoutBox.appendTo(".order-summary-inner");
		orderConsentsFirst.appendTo(".order-summary-inner");
		orderNextStepButton.appendTo(".order-summary-inner");
		$("<div class='summary-background'></div>").appendTo(".order-summary-inner");
		$("<div class='rekapitulace-background'></div>").appendTo(".order-summary-inner");
		orderConsents.appendTo(".next-step");
	});
}
