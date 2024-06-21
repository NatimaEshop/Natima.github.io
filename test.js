/*if (document.querySelector("body.in-krok-1")) {
	$("#order-shipping-methods").append(
		'<div id="showAllShippingMethods" class="showAllOrder">Zobrazit všechny možnosti</div>'
	);
	$("#order-billing-methods").append(
		'<div id="showAllBillingMethods" class="showAllOrder">Zobrazit všechny možnosti</div>'
	);

	let radioWrappersShipping = $("#order-shipping-methods .radio-wrapper");
	let radioWrappersBilling = $("#order-billing-methods .radio-wrapper");

	radioWrappersShipping.on("mousedown", function () {
		console.log("click");
		let eventFunction = function () {
			$("#order-shipping-methods").addClass("selected");

			radioWrappersShipping.each(function () {
				if (!$(this).hasClass("active")) {
					$(this).css("overflow", "hidden");
					$(this).animate({ height: "0px", opacity: 0 }, 300);
				}
			});
		};

		document.addEventListener("ShoptetBillingMethodUpdated", eventFunction, { once: true });
		setTimeout(function () {
			document.removeEventListener("ShoptetBillingMethodUpdated", eventFunction);
		}, 500);
	});

	radioWrappersBilling.on("mousedown", function () {
		let eventFunction = function () {
			$("#order-billing-methods").addClass("selected");

			radioWrappersBilling.each(function () {
				if (!$(this).hasClass("active")) {
					$(this).css("overflow", "hidden");
					$(this).animate({ height: "0px", opacity: 0 }, 300);
				}
			});
		};

		document.addEventListener("ShoptetBillingMethodUpdated", eventFunction, { once: true });
		setTimeout(function () {
			document.removeEventListener("ShoptetBillingMethodUpdated", eventFunction);
		}, 500);
	});

	$("#showAllShippingMethods").on("click", function () {
		$("#order-shipping-methods").removeClass("selected");
		radioWrappersShipping.each(function (index) {
			$(this).css({
				overflow: "",
				height: "auto",
				opacity: 1,
			});
		});
	});

	$("#showAllBillingMethods").on("click", function () {
		$("#order-billing-methods").removeClass("selected");
		radioWrappersBilling.each(function (index) {
			$(this).css({
				overflow: "",
				height: "auto",
				opacity: 1,
			});
		});
	});
}
	*/
