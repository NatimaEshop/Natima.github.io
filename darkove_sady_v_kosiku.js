/*BEZ BALICKU MAGNESII*/
if (document.body.classList.contains("admin-logged")) {
	if (document.body.classList.contains("ordering-process")) {
		document.addEventListener("ShoptetDOMCartContentLoaded", function () {
			natiosGiftPackaging();
		});
		document.addEventListener("DOMContentLoaded", function () {
			natiosGiftPackaging();
		});

		function natiosGiftPackaging() {
			let editedNatiosPackaging = false;
			let hasNatiosGiftPackaging = false;
			let hasOmega = false;
			let hasCalcium = false;
			let hasProbiotic = false;

			let natiosAmountOfGiftProducts = 0;
			let natiosAmountOfGiftBoxes = 1;

			getAllNatiosGiftPackagingProducts();

			if (natiosAmountOfGiftProducts < 2) {
				return;
			}

			let giftPackagingDivHTML = `
				<div class="gift-packaging universal">
	<div class="gift-packaging-agree">
		<div class="gift-packaging-checkbox">
			<input type="checkbox" id="giftPackagingInput" name="giftPackagingInput" value="true">
			<label for="giftPackagingInput"><span>V košíku máte doplňky stravy <b>NATIOS</b>. Chcete přidat také
					<b>dárkovou
						krabičku?</b></span>
				<span class="gift-cena">Cena dárkové krabičky: 50,- Kč / ks</span></label>
			<div class="gift-packaging-image"><img
					src="https://www.natima.cz/user/documents/upload/gallery/Natima_darkova krabicka_nahled.png"
					alt="Natios krabička" width="600" height="550" loading="lazy"></div>
			<div id="packaging-poznamky">

				<span>Krabička je určena na 2 doplňky stravy značky Natios.</span>
				<div class="display-none" id="calcium-gift"><b>Pozor:</b> NATIOS Calcium se kvůli většího balení do
					dárkové krabičky nevleze.</div>
				<div class="display-none" id="omega-gift"><b>Pozor:</b> NATIOS Omega-3 se kvůli většího balení do
					dárkové krabičky nevleze.</div>
				<div class="display-none" id="probiotic-gift"><b>Pozor:</b> NATIOS Probiotika se kvůli většího balení do
					dárkové krabičky nevlezou.</div>
				<div class="display-none" id="maximum-gift">
					<b>Pozor:</b> Z vaší objednávky lze do dárkové krabičky vložit pouze <b><span
							id="maximum-product-amount-gift">XXX</span></b> <span
						id="produkty-sklonovani-maximum">produktů</span>. Pro naplnění <span
						id="selected-amount-of-gift-packaging">XXX</span> dárkových krabiček můžete nakoupit ještě <span
						id="selected-amount-of-gift-packaging-products">XXX</span> <span
						id="produkty-sklonovani-zvoleno">NATIOS doplňků</span>.
				</div>
			</div>
			<div class="gift-select-quantity">
				<span id="gift-quantity" class="quantity">
					<span class="increase-tooltip js-increase-tooltip" data-trigger="manual" data-container="body"
						data-original-title="Není možné zakoupit více než 9999 ks." aria-hidden="true" role="tooltip"
						data-testid="tooltip"></span>
					<span class="decrease-tooltip js-decrease-tooltip" data-trigger="manual" data-container="body"
						data-original-title="Minimální množství, které lze zakoupit, je 1 ks." aria-hidden="true"
						role="tooltip" data-testid="tooltip"></span>
					<input type="number" name="amount" value="1" class="amount" autocomplete="off" data-decimals="0"
						data-max="9999" data-min="1" step="any" min="1" max="9999" data-testid="cartAmount"
						aria-label="Množství">
					<span class="increase" aria-label="Zvýšit množství" tabindex="0" role="button"
						data-testid="increase"></span>
					<span class="decrease" aria-label="Snížit množství" tabindex="0" role="button"
						data-testid="decrease"></span>
				</span>

			</div>
		</div>
	</div>
</div>
				`;

			$(giftPackagingDivHTML).insertAfter($(".discount-coupon"));

			let giftPackaging = $(".gift-packaging.universal");

			$("#giftPackagingInput").on("change", function () {
				if (this.checked) {
					natiosAmountOfGiftBoxes = 1;
					giftPackaging.addClass("active");
					updateAmountOfGiftPackagingInCart();
				} else {
					giftPackaging.removeClass("active");
					removeAllGiftPackagingFromCart();
				}
			});

			if ($("tr.removeable[data-micro-sku='NATDK-1']").length > 0) {
				hasNatiosGiftPackaging = true;
				natiosAmountOfGiftBoxes = $("tr.removeable[data-micro-sku='NATDK-1'] .quantity input").val();
				giftPackaging.addClass("active");
				$("#giftPackagingInput").prop("checked", true);
				$("#gift-quantity input").val(natiosAmountOfGiftBoxes);
			}

			$("#gift-quantity input").on("change", function () {
				natiosAmountOfGiftBoxes = $(this).val();
				updateAmountOfGiftPackagingInCart();
			});

			if (hasNatiosGiftPackaging) {
				giftProductsWarnings();
				maximumGiftPackaging();
			}

			function getAllNatiosGiftPackagingProducts() {
				$(".removeable").each(function () {
					let pName = $(this).find(".p-name .main-link").text();
					if (pName.includes("NATIOS")) {
						if (pName.includes("kapsl") || pName.includes("tablet")) {
							if ($(this).attr("data-micro-sku") == "NAT1168") {
								hasOmega = true;
							} else if ($(this).attr("data-micro-sku") == "NAT1540") {
								hasCalcium = true;
							} else if ($(this).attr("data-micro-sku") == "NAT1694") {
								hasProbiotic = true;
							} else {
								let quantity = $(this).find(".quantity input").val();
								//for each quantity create an object and push it to natiosProducts array
								for (let i = 0; i < quantity; i++) {
									natiosAmountOfGiftProducts += 1;
								}
							}
						}
					}
				});
			}

			function removeAllGiftPackagingFromCart() {
				let giftPackagingItemId = $("tr.removeable[data-micro-sku='NATDK-1'] .p-total input[name='itemId']").attr(
					"value"
				);
				if (giftPackagingItemId) {
					shoptet.cartShared.removeFromCart({ itemId: giftPackagingItemId });
					hasNatiosGiftPackaging = false;
				}
			}

			function updateAmountOfGiftPackagingInCart() {
				if (editedNatiosPackaging) {
					return;
				}
				editedNatiosPackaging = true;
				document.addEventListener(
					"ShoptetDOMCartContentLoaded",
					function () {
						editedNatiosPackaging = false;
					},
					{ once: true }
				);

				let giftPackagingItemId = $("tr.removeable[data-micro-sku='NATDK-1'] .p-total input[name='itemId']").attr(
					"value"
				);
				let giftPackagingPriceId = $("tr.removeable[data-micro-sku='NATDK-1'] .p-total input[name='priceId']").attr(
					"value"
				);

				if (!giftPackagingItemId) {
					shoptet.cartShared.addToCart({ productCode: "NATDK-1", amount: natiosAmountOfGiftBoxes });
					return;
				}
				shoptet.cartShared.updateQuantityInCart({
					itemId: giftPackagingItemId,
					priceId: giftPackagingPriceId,
					amount: natiosAmountOfGiftBoxes,
				});
			}
			function maximumGiftPackaging() {
				if (hasNatiosGiftPackaging) {
					if (natiosAmountOfGiftBoxes * 2 > natiosAmountOfGiftProducts) {
						$("#maximum-gift").removeClass("display-none");
						$("#maximum-product-amount-gift").text(natiosAmountOfGiftProducts);
						$("#selected-amount-of-gift-packaging").text(natiosAmountOfGiftBoxes);
						$("#selected-amount-of-gift-packaging-products").text(
							natiosAmountOfGiftBoxes * 2 - natiosAmountOfGiftProducts
						);

						if (natiosAmountOfGiftProducts > 4) {
							$("#produkty-sklonovani-maximum").text("produktů");
						} else if (natiosAmountOfGiftProducts == 1) {
							$("#produkty-sklonovani-maximum").text("produkt");
						} else {
							$("#produkty-sklonovani-maximum").text("produkty");
						}

						if (natiosAmountOfGiftBoxes * 2 - natiosAmountOfGiftProducts > 4) {
							$("#produkty-sklonovani-zvoleno").text("NATIOS doplňků");
						} else if (natiosAmountOfGiftBoxes * 2 - natiosAmountOfGiftProducts == 1) {
							$("#produkty-sklonovani-zvoleno").text("NATIOS doplněk");
						} else {
							$("#produkty-sklonovani-zvoleno").text("NATIOS doplňky");
						}
					}
				}
			}

			function giftProductsWarnings() {
				if (hasNatiosGiftPackaging) {
					if (hasOmega) {
						$("#omega-gift").removeClass("display-none");
					}
					if (hasCalcium) {
						$("#calcium-gift").removeClass("display-none");
					}
					if (hasProbiotic) {
						$("#probiotic-gift").removeClass("display-none");
					}
				}
			}
		}
	}
}
/*S BALÍČKEM MAGNESII*/
/*if (document.body.classList.contains("admin-logged")) {
	if (document.body.classList.contains("ordering-process")) {
		let editedNatiosPackaging = false;
		document.addEventListener("ShoptetDOMCartContentLoaded", function () {
			natiosGiftPackaging();
			natiosGiftPackagingMagnesium();
		});
		document.addEventListener("DOMContentLoaded", function () {
			natiosGiftPackaging();
			natiosGiftPackagingMagnesium();
		});

		function natiosGiftPackagingMagnesium() {
			let natiosMalateAmount = 0;
			let natiosBisglycinateAmount = 0;
			let magnesiumGiftPackagingAmount = 0;

			$(".removeable").each(function () {
				if ($(this).attr("data-micro-sku") == "NAT0406") {
					natiosMalateAmount = $(this).find(".quantity input").val();
				}
				if ($(this).attr("data-micro-sku") == "NAT0147") {
					natiosBisglycinateAmount = $(this).find(".quantity input").val();
				}
				if ($(this).attr("data-micro-sku") == "NATBAL13") {
					magnesiumGiftPackagingAmount = $(this).find(".quantity input").val();
				}
			});

			if (natiosMalateAmount < 1 || natiosBisglycinateAmount < 1) {
				if (!sessionStorage.getItem("changedMagnesiumForBoxes")) {
					{
						return;
					}
				}
			}
			if (sessionStorage.getItem("changedMagnesiumForBoxes")) {
				if (magnesiumGiftPackagingAmount < 1) {
					if (natiosMalateAmount < 1 || natiosBisglycinateAmount < 1) {
						return;
					}
				}
			}
			$("body").addClass("has-magnesium-gift-packaging");

			let malateGiftPackagingItemId = $("tr.removeable[data-micro-sku='NAT0406'] .p-total input[name='itemId']").attr(
				"value"
			);
			let malateGiftPackagingPriceId = $("tr.removeable[data-micro-sku='NAT0406'] .p-total input[name='priceId']").attr(
				"value"
			);

			let bisglycinateGiftPackagingItemId = $(
				"tr.removeable[data-micro-sku='NAT0147'] .p-total input[name='itemId']"
			).attr("value");
			let bisglycinateGiftPackagingPriceId = $(
				"tr.removeable[data-micro-sku='NAT0147'] .p-total input[name='priceId']"
			).attr("value");

			let magnesiumGiftPackagingCode = "NATBAL13";

			let giftPackagingDivHTML = `
<div class="gift-packaging magnesium">
	<div class="gift-packaging-agree">
		<div class="gift-packaging-checkbox">
			<input type="checkbox" id="magnesium-giftPackagingInput" name="giftPackagingInput" value="true">
			<label for="magnesium-giftPackagingInput"><span>V košíku máte kombinaci NATIOS Magnesium Malate a
					Bisglycinate. Chcete tyto produkty obdržet v dárkové krabičce
					ZDARMA?</span></label>
			<div class="gift-packaging-image"><img
					src="https://www.natima.cz/user/documents/upload/gallery/Natima_darkova magnesium-krabicka_nahled.png"
					alt="Natios Magnesium krabička" width="600" height="550" loading="lazy"></div>
		</div>
	</div>
</div>

				`;
			$(giftPackagingDivHTML).insertAfter($(".discount-coupon"));

			if (sessionStorage.getItem("changedMagnesiumForBoxes")) {
				if (magnesiumGiftPackagingAmount > 0) {
					$("#magnesium-giftPackagingInput").prop("checked", true);
				}
			}

			$("#magnesium-giftPackagingInput").on("change", function () {
				if (this.checked) {
					changeMagnesiumForBoxes();
					sessionStorage.setItem("changedMagnesiumForBoxes", true);
				} else {
					changeBoxesForMagnesium();
				}

				function changeMagnesiumForBoxes() {
					if (natiosMalateAmount >= natiosBisglycinateAmount) {
						magnesiumGiftPackagingAmount = natiosBisglycinateAmount;
					} else {
						magnesiumGiftPackagingAmount = natiosMalateAmount;
					}
					console.log("--------------------------");
					console.log("--------------------------");
					console.log("--------------------------");
					console.log("Natios malate " + natiosMalateAmount);
					console.log("Natios bisglycinate " + natiosBisglycinateAmount);
					console.log("Magnesium gift packaging " + magnesiumGiftPackagingAmount);
					console.log("--------------------------");
					console.log("--------------------------");
					console.log("--------------------------");

					//remove malate
					if (natiosMalateAmount === magnesiumGiftPackagingAmount) {
						shoptet.cartShared.removeFromCart({ itemId: malateGiftPackagingItemId });
					} else {
						shoptet.cartShared.updateQuantityInCart({
							itemId: malateGiftPackagingItemId,
							priceId: malateGiftPackagingPriceId,
							amount: natiosMalateAmount - magnesiumGiftPackagingAmount,
						});
					}

					//remove bisglycinate
					if (natiosBisglycinateAmount === magnesiumGiftPackagingAmount) {
						shoptet.cartShared.removeFromCart({ itemId: bisglycinateGiftPackagingItemId });
					} else {
						shoptet.cartShared.updateQuantityInCart({
							itemId: bisglycinateGiftPackagingItemId,
							priceId: bisglycinateGiftPackagingPriceId,
							amount: natiosBisglycinateAmount - magnesiumGiftPackagingAmount,
						});
					}

					//add balicek
					if (magnesiumGiftPackagingAmount > 0) {
						shoptet.cartShared.addToCart({
							productCode: magnesiumGiftPackagingCode,
							amount: magnesiumGiftPackagingAmount,
						});
					}
				}

				function changeBoxesForMagnesium() {
					let magnesiumGiftPackagingItemId = $(
						"tr.removeable[data-micro-sku='NATBAL13'] .p-total input[name='itemId']"
					).attr("value");

					//remove boxes

					shoptet.cartShared.removeFromCart({ itemId: magnesiumGiftPackagingItemId });

					//add malate

					shoptet.cartShared.addToCart({ productCode: "NAT0406", amount: magnesiumGiftPackagingAmount });

					//add bisglycinate
					shoptet.cartShared.addToCart({ productCode: "NAT0147", amount: magnesiumGiftPackagingAmount });
				}
			});
		}






		function natiosGiftPackaging() {
			let hasNatiosGiftPackaging = false;
			let hasOmega = false;
			let hasCalcium = false;
			let hasProbiotic = false;

			let natiosAmountOfGiftProducts = 0;
			let natiosAmountOfGiftBoxes = 1;

			let natiosMagnesiumMalateAmountCheck = 0;
			let natiosMagnesiumBisglycinateAmountCheck = 0;
			let natiosProductsWOMagnesiums = 0;
			let totalMagnesiumAmountCheck = 0;
			getAllNatiosGiftPackagingProducts();

			if (natiosAmountOfGiftProducts < 2) {
				return;
			}

			if (totalMagnesiumAmountCheck >= 1) {
				if (
					natiosMagnesiumMalateAmountCheck - natiosMagnesiumBisglycinateAmountCheck + natiosProductsWOMagnesiums >=
					2
				) {
				} else if (
					natiosMagnesiumBisglycinateAmountCheck - natiosMagnesiumMalateAmountCheck + natiosProductsWOMagnesiums >=
					2
				) {
				} else {
					return;
				}
			}

			let giftPackagingDivHTML = `
				<div class="gift-packaging universal">
	<div class="gift-packaging-agree">
		<div class="gift-packaging-checkbox">
			<input type="checkbox" id="giftPackagingInput" name="giftPackagingInput" value="true">
			<label for="giftPackagingInput"><span>V košíku máte doplňky stravy <b>NATIOS</b>. Chcete přidat také
					<b>dárkovou
						krabičku?</b></span></label>
			<div class="gift-packaging-image"><img
					src="https://www.natima.cz/user/documents/upload/gallery/Natima_darkova krabicka_nahled.png"
					alt="Natios krabička" width="600" height="550" loading="lazy"></div>
			<div id="packaging-poznamky">
				<span>Cena dárkové krabičky: 50,- Kč / ks</span>
				<span>Krabička je určena na 2 doplňky stravy značky Natios.</span>
				<div class="display-none" id="calcium-gift"><b>Pozor:</b> NATIOS Calcium se kvůli většího balení do
					dárkové krabičky nevleze.</div>
				<div class="display-none" id="omega-gift"><b>Pozor:</b> NATIOS Omega-3 se kvůli většího balení do
					dárkové krabičky nevleze.</div>
				<div class="display-none" id="probiotic-gift"><b>Pozor:</b> NATIOS Probiotika se kvůli většího balení do
					dárkové krabičky nevlezou.</div>
				<div class="display-none" id="maximum-gift">
					<b>Pozor:</b> Z vaší objednávky lze do dárkové krabičky vložit pouze <b><span
							id="maximum-product-amount-gift">XXX</span></b> <span
						id="produkty-sklonovani-maximum">produktů</span>. Pro naplnění <span
						id="selected-amount-of-gift-packaging">XXX</span> dárkových krabiček můžete nakoupit ještě <span
						id="selected-amount-of-gift-packaging-products">XXX</span> <span
						id="produkty-sklonovani-zvoleno">NATIOS doplňků</span>.
				</div>
			</div>
			<div class="gift-select-quantity">
				<span id="gift-quantity" class="quantity">
					<span class="increase-tooltip js-increase-tooltip" data-trigger="manual" data-container="body"
						data-original-title="Není možné zakoupit více než 9999 ks." aria-hidden="true" role="tooltip"
						data-testid="tooltip"></span>
					<span class="decrease-tooltip js-decrease-tooltip" data-trigger="manual" data-container="body"
						data-original-title="Minimální množství, které lze zakoupit, je 1 ks." aria-hidden="true"
						role="tooltip" data-testid="tooltip"></span>
					<input type="number" name="amount" value="1" class="amount" autocomplete="off" data-decimals="0"
						data-max="9999" data-min="1" step="any" min="1" max="9999" data-testid="cartAmount"
						aria-label="Množství">
					<span class="increase" aria-label="Zvýšit množství" tabindex="0" role="button"
						data-testid="increase"></span>
					<span class="decrease" aria-label="Snížit množství" tabindex="0" role="button"
						data-testid="decrease"></span>
				</span>

			</div>
		</div>
	</div>
</div>
				`;

			$(giftPackagingDivHTML).insertAfter($(".discount-coupon"));

			let giftPackaging = $(".gift-packaging.universal");

			$("#giftPackagingInput").on("change", function () {
				if (this.checked) {
					natiosAmountOfGiftBoxes = 1;
					giftPackaging.addClass("active");
					updateAmountOfGiftPackagingInCart();
				} else {
					giftPackaging.removeClass("active");
					removeAllGiftPackagingFromCart();
				}
			});

			if ($("tr.removeable[data-micro-sku='NATDK-1']").length > 0) {
				hasNatiosGiftPackaging = true;
				natiosAmountOfGiftBoxes = $("tr.removeable[data-micro-sku='NATDK-1'] .quantity input").val();
				giftPackaging.addClass("active");
				$("#giftPackagingInput").prop("checked", true);
				$("#gift-quantity input").val(natiosAmountOfGiftBoxes);
			}

			$("#gift-quantity input").on("change", function () {
				natiosAmountOfGiftBoxes = $(this).val();
				updateAmountOfGiftPackagingInCart();
			});

			if (hasNatiosGiftPackaging) {
				giftProductsWarnings();
				maximumGiftPackaging();
			}

			function getAllNatiosGiftPackagingProducts() {
				$(".removeable").each(function () {
					if ($(this).attr("data-micro-sku") == "NAT0406") {
						natiosMagnesiumMalateAmountCheck = $(this).find(".quantity input").val();
					}
					if ($(this).attr("data-micro-sku") == "NAT0147") {
						natiosMagnesiumBisglycinateAmountCheck = $(this).find(".quantity input").val();
					}
					let pName = $(this).find(".p-name .main-link").text();
					if (pName.includes("NATIOS")) {
						if (pName.includes("kapsl") || pName.includes("tablet")) {
							if ($(this).attr("data-micro-sku") == "NAT1168") {
								hasOmega = true;
							} else if ($(this).attr("data-micro-sku") == "NAT1540") {
								hasCalcium = true;
							} else if ($(this).attr("data-micro-sku") == "NAT1694") {
								hasProbiotic = true;
							} else {
								let quantity = $(this).find(".quantity input").val();
								//for each quantity create an object and push it to natiosProducts array
								for (let i = 0; i < quantity; i++) {
									natiosAmountOfGiftProducts += 1;
								}
							}
						}
					}
					natiosProductsWOMagnesiums =
						natiosAmountOfGiftProducts - natiosMagnesiumMalateAmountCheck - natiosMagnesiumBisglycinateAmountCheck;
					totalMagnesiumAmountCheck = natiosMagnesiumMalateAmountCheck + natiosMagnesiumBisglycinateAmountCheck;
				});
			}

			function removeAllGiftPackagingFromCart() {
				let giftPackagingItemId = $("tr.removeable[data-micro-sku='NATDK-1'] .p-total input[name='itemId']").attr(
					"value"
				);
				if (giftPackagingItemId) {
					shoptet.cartShared.removeFromCart({ itemId: giftPackagingItemId });
					hasNatiosGiftPackaging = false;
				}
			}

			function updateAmountOfGiftPackagingInCart() {
				if (editedNatiosPackaging) {
					return;
				}
				editedNatiosPackaging = true;
				document.addEventListener(
					"ShoptetDOMCartContentLoaded",
					function () {
						editedNatiosPackaging = false;
					},
					{ once: true }
				);

				let giftPackagingItemId = $("tr.removeable[data-micro-sku='NATDK-1'] .p-total input[name='itemId']").attr(
					"value"
				);
				let giftPackagingPriceId = $("tr.removeable[data-micro-sku='NATDK-1'] .p-total input[name='priceId']").attr(
					"value"
				);

				if (!giftPackagingItemId) {
					shoptet.cartShared.addToCart({ productCode: "NATDK-1", amount: natiosAmountOfGiftBoxes });
					return;
				}
				shoptet.cartShared.updateQuantityInCart({
					itemId: giftPackagingItemId,
					priceId: giftPackagingPriceId,
					amount: natiosAmountOfGiftBoxes,
				});
			}
			function maximumGiftPackaging() {
				if (hasNatiosGiftPackaging) {
					if (natiosAmountOfGiftBoxes * 2 > natiosAmountOfGiftProducts) {
						$("#maximum-gift").removeClass("display-none");
						$("#maximum-product-amount-gift").text(natiosAmountOfGiftProducts);
						$("#selected-amount-of-gift-packaging").text(natiosAmountOfGiftBoxes);
						$("#selected-amount-of-gift-packaging-products").text(
							natiosAmountOfGiftBoxes * 2 - natiosAmountOfGiftProducts
						);

						if (natiosAmountOfGiftProducts > 4) {
							$("#produkty-sklonovani-maximum").text("produktů");
						} else if (natiosAmountOfGiftProducts == 1) {
							$("#produkty-sklonovani-maximum").text("produkt");
						} else {
							$("#produkty-sklonovani-maximum").text("produkty");
						}

						if (natiosAmountOfGiftBoxes * 2 - natiosAmountOfGiftProducts > 4) {
							$("#produkty-sklonovani-zvoleno").text("NATIOS doplňků");
						} else if (natiosAmountOfGiftBoxes * 2 - natiosAmountOfGiftProducts == 1) {
							$("#produkty-sklonovani-zvoleno").text("NATIOS doplněk");
						} else {
							$("#produkty-sklonovani-zvoleno").text("NATIOS doplňky");
						}
					}
				}
			}

			function giftProductsWarnings() {
				if (hasNatiosGiftPackaging) {
					if (hasOmega) {
						$("#omega-gift").removeClass("display-none");
					}
					if (hasCalcium) {
						$("#calcium-gift").removeClass("display-none");
					}
					if (hasProbiotic) {
						$("#probiotic-gift").removeClass("display-none");
					}
				}
			}
		}
	}
}
*/
