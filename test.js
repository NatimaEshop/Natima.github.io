if (document.body.classList.contains("admin-logged")) {
	if (document.body.classList.contains("ordering-process")) {
		let editedNatiosPackaging = false;
		document.addEventListener("ShoptetDOMCartContentLoaded", function () {
			natiosGiftPackaging();
		});
		document.addEventListener("DOMContentLoaded", function () {
			natiosGiftPackaging();
		});
		function natiosGiftPackaging() {
			let hasNatiosGiftPackaging = false;
			let hasOmega = false;
			let hasCalcium = false;
			let hasProbiotic = false;

			let natiosAmountOfGiftProducts = 0;
			let natiosAmountOfGiftBoxes = 1;
			getAllNatiosGiftPackagingProducts();
			console.log("...................................");
			console.log("natiosAmountOfGiftProducts:");
			console.log(natiosAmountOfGiftProducts);

			if (natiosAmountOfGiftProducts < 2) {
				return;
			}

			let giftPackagingDivHTML = `
		<div class="gift-packaging">
	<div class="gift-packaging-agree">
		<div class="gift-packaging-checkbox">
			<input type="checkbox" id="giftPackagingInput" name="giftPackagingInput" value="true">
			<label for="giftPackagingInput"><span>V košíku máte doplňky stravy NATIOS. Chcete přidat také dárkovou
					krabičku?</span></label>
			<div class="gift-packaging-image"><img
					src="https://cdn.myshoptet.com/usr/www.natima.cz/user/shop/big/12028_natios-darkova-krabicka.jpg?6729fc0a"
					alt="Natios krabička" width="1024" height="768" loading="lazy"></div>
			<div class="packaging-price"><span>39</span>,- Kč / ks</div>
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
						id="produkty-sklonovani-zvoleno"> NATIOS produktů</span>.
				</div>
			</div>
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
				`;

			$(giftPackagingDivHTML).insertAfter($(".discount-coupon"));

			let giftPackaging = $(".gift-packaging");

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
						$("#selected-amount-of-gift-packaging-products").text(natiosAmountOfGiftBoxes * 2);

						if (natiosAmountOfGiftProducts > 4) {
							$("#produkty-sklonovani-maximum").text("produktů");
						} else if (natiosAmountOfGiftProducts == 1) {
							$("#produkty-sklonovani-maximum").text("produkt");
						} else {
							$("#produkty-sklonovani-maximum").text("produkty");
						}

						if (natiosAmountOfGiftBoxes * 2 > 4) {
							$("#produkty-sklonovani-zvoleno").text("produktů");
						} else {
							$("#produkty-sklonovani-zvoleno").text("produkty");
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

/*--------------------------------------------*/
/*--------------------------------------------*/

/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/
/*--------------------------------------------*/

if (document.body.classList.contains("xadmin-logged")) {
	if (document.body.classList.contains("ordering-process")) {
		let editedNatiosPackaging = false;
		document.addEventListener("ShoptetDOMCartContentLoaded", function () {
			natiosGiftPackaging();
		});
		document.addEventListener("DOMContentLoaded", function () {
			natiosGiftPackaging();
		});
		function natiosGiftPackaging() {
			let giftPackagingDiv =
				'<div class="gift-packaging"><div class="gift-packaging-agree"><div class="gift-packaging-checkbox"><input type="checkbox" id="giftPackagingInput" name="giftPackagingInput" value="true"><label for="giftPackagingInput"><span>Přeji si dárkově zabilit doplňky NATIOS.</span><span>39,-Kč</span></label></div><span id="gift-packaging-edit">Upravit</span></div></div>';
			let giftPackagingModalDiv =
				'<div id="gift-packaging-modal" class="display-none"><div class="gift-packaging-modal-content"><div class="gift-packaging-modal-header"><h2>Dárkové balení doplňků NATIOS</h2><div class="gift-packaging-modal-close"></div></div><div class="gift-packaging-modal-body"><p>Do dárkové krabičky NATIOS lze vložit 2 produkty. Zvolte prosím, které 2 produkty chcete do krabičkyvložit.</p><div id="gift-packaging-options"></div><div id="gift-packaging-chosen-combinations"></div><div class="gift-packaging-confirm-wrapper"><div id="gift-packaging-confirm" class="btn"><span>Potvrdit balíčky</span></div></div></div></div></div>';

			$(giftPackagingDiv).insertAfter($(".discount-coupon"));
			$("body").append(giftPackagingModalDiv);
			let giftPackagingDivSelector = $(".gift-packaging");
			let giftPackagingModal = $("#gift-packaging-modal");
			let giftOptionsContainer = $("#gift-packaging-options");
			let chosenCombinationsContainer = $("#gift-packaging-chosen-combinations");
			let packageId = "";

			let natiosLocalStorage = JSON.parse(localStorage.getItem("natiosProducts"));
			console.log("natiosLocalStorage:");
			console.log(natiosLocalStorage);

			let natiosProducts = [];
			getAllNatiosGiftPackagingProducts();
			checkIfRemoveGiftPackaging();

			$("#giftPackagingInput").on("change", function () {
				if (this.checked) {
					giftPackagingModal.removeClass("display-none");
					addGiftPackagingProductOptions();
					addSelectedOptionsToChosenCombinations();
					giftPackagingDivSelector.addClass("active");
				} else {
					giftPackagingModal.addClass("display-none");
					giftPackagingDivSelector.removeClass("active");
					natiosProducts = [];
					removeGiftPackagingFromLocalStorage();
					removeAllGiftPackagingFromCart();
				}
			});

			$(".gift-packaging-modal-close").on("click", function () {
				giftPackagingModal.addClass("display-none");
				let giftPackagingPriceId = $("tr.removeable[data-micro-sku='NATDK-1'] .p-total input[name='priceId']").attr(
					"value"
				);
				if (!giftPackagingPriceId) {
					$("#giftPackagingInput").prop("checked", false);
					giftPackagingDivSelector.removeClass("active");
				}
			});

			$("#gift-packaging-edit").on("click", function () {
				giftPackagingModal.removeClass("display-none");
				addGiftPackagingProductOptions();
				addSelectedOptionsToChosenCombinations();
			});

			$("#gift-packaging-confirm").on("click", function () {
				giftPackagingModal.addClass("display-none");
				giftPackagingDivSelector.addClass("active");

				saveGiftPackagingProducts();
				updateAmountOfGiftPackagingInCart();
			});

			function getAllNatiosGiftPackagingProducts() {
				$(".removeable").each(function () {
					let pName = $(this).find(".p-name .main-link").text();
					pName = pName.trim();
					pName = pName.replace(/\n/g, "");
					if (pName.includes("NATIOS"))
						if (pName.includes("kapsl") || pName.includes("tablet")) {
							let quantity = $(this).find(".quantity input").val();
							let image = $(this).find(".cart-p-image img").attr("src");

							//for each quantity create an object and push it to natiosProducts array
							for (let i = 0; i < quantity; i++) {
								natiosProducts.push({
									name: pName,
									image: image,
									selected: false,
									currentlySelected: false,
									packageId: "",
								});
							}
						}
				});
				console.log("natiosProducts:");
				console.log(natiosProducts);
			}

			function addGiftPackagingProductOptions() {
				giftOptionsContainer.empty(); // Clear any existing options
				natiosProducts.forEach((product) => {
					if (!product.selected) {
						const productDiv = `
                <div class="gift-product-option">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                </div>
            `;
						giftOptionsContainer.append(productDiv);
					}
					if (product.selected) {
						const productDiv = `
                <div class="gift-product-option display-none">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                </div>
            `;
						giftOptionsContainer.append(productDiv);
					}
				});

				//for each gift-product-option add click event that on click or touch will toggle class selected
				$(".gift-product-option").on("click", function () {
					$(this).toggleClass("selected");

					let order = $(this).index();
					natiosProducts[order].currentlySelected = !natiosProducts[order].currentlySelected;

					console.log("Order: " + order);
					console.log("natiosProducts:");
					console.log(natiosProducts);

					if (natiosProducts.filter((product) => product.currentlySelected).length == 2) {
						packageId = makePackageId(7);
						natiosProducts
							.filter((product) => product.currentlySelected)
							.forEach((product) => {
								product.selected = true;
								product.packageId = packageId;
							});

						addSelectedOptionsToChosenCombinations();

						$(".gift-product-option").removeClass("selected");
						natiosProducts.forEach((product) => {
							product.currentlySelected = false;
						});

						addGiftPackagingProductOptions();
					}
				});
			}

			function makePackageId(length) {
				let result = "";
				const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				const charactersLength = characters.length;
				let counter = 0;
				while (counter < length) {
					result += characters.charAt(Math.floor(Math.random() * charactersLength));
					counter += 1;
				}
				return result;
			}

			function addSelectedOptionsToChosenCombinations() {
				chosenCombinationsContainer.empty(); // Clear any existing options

				natiosProducts.forEach((product) => {
					if (product.selected) {
						let currentPackageId = product.packageId;
						//create a div with packageIdDiv value and class gift-package-combination
						//if packageIdDiv with currentPackageId does not exist create it
						if ($(`.gift-package-combination[currentPackageId="${currentPackageId}"]`).length == 0) {
							let packageIdDiv = `<div class="gift-package-combination" currentPackageId="${currentPackageId}"><div class="remove-combination"></div></div>`;
							chosenCombinationsContainer.append(packageIdDiv);
						}

						const productDiv = `
                <div class="gift-product-combination">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                </div>
            `;
						$(`.gift-package-combination[currentPackageId="${currentPackageId}"]`).append(productDiv);
					}
				});

				$(".remove-combination").on("click", function () {
					let currentPackageId = $(this).parent().attr("currentPackageId");
					natiosProducts.forEach((product) => {
						if (product.packageId == currentPackageId) {
							product.selected = false;
							product.packageId = "";
						}
					});
					addSelectedOptionsToChosenCombinations();
					addGiftPackagingProductOptions();
				});
			}

			function saveGiftPackagingProducts() {
				//save natiosProducts to localStorage
				localStorage.setItem("natiosProducts", JSON.stringify(natiosProducts));

				natiosLocalStorage = JSON.parse(localStorage.getItem("natiosProducts"));
				console.log("natiosLocalStorage:");
				console.log(natiosLocalStorage);
			}

			function checkIfRemoveGiftPackaging() {
				let natiosProductsNames = natiosProducts.map((product) => product.name);
				let natiosLocalStorageNames = [];

				if (natiosLocalStorage) {
					natiosLocalStorageNames = natiosLocalStorage.map((product) => product.name);
				}

				console.log("natiosProductsNames:");
				console.log(natiosProductsNames);
				console.log("natiosLocalStorageNames:");
				console.log(natiosLocalStorageNames);

				if (arraysEqual(natiosProductsNames, natiosLocalStorageNames)) {
					console.log("natiosProducts and natiosLocalStorage are equal");
					natiosProducts = natiosLocalStorage;

					giftPackagingDivSelector.addClass("active");
					$("#giftPackagingInput").prop("checked", true);

					return;
				}
				console.log("natiosProducts and natiosLocalStorage are not equal");
				removeGiftPackagingFromLocalStorage();
				removeAllGiftPackagingFromCart();
				giftPackagingDivSelector.removeClass("active");
				$("#giftPackagingInput").prop("checked", false);
				/*porovnani arrayu*/
				function arraysEqual(arr1, arr2) {
					if (arr1.length !== arr2.length) return false;
					for (let i = 0; i < arr1.length; i++) {
						if (arr1[i] !== arr2[i]) return false;
					}
					return true;
				}
			}

			function removeGiftPackagingFromLocalStorage() {
				localStorage.removeItem("natiosProducts");
				console.log("natiosProducts removed from localStorage");
			}

			function removeAllGiftPackagingFromCart() {
				let giftPackagingItemId = $("tr.removeable[data-micro-sku='NATDK-1'] .p-total input[name='itemId']").attr(
					"value"
				);

				if (giftPackagingItemId) {
					shoptet.cartShared.removeFromCart({ itemId: giftPackagingItemId });
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

				let numberOfPackages = 0;
				natiosProducts.forEach((product) => {
					if (product.selected) {
						numberOfPackages += 1;
					}
				});
				numberOfPackages = numberOfPackages / 2;

				if (!giftPackagingItemId) {
					shoptet.cartShared.addToCart({ productCode: "NATDK-1", amount: numberOfPackages });
				} else if (giftPackagingItemId) {
					if (numberOfPackages === 0) {
						shoptet.cartShared.removeFromCart({ itemId: giftPackagingItemId });
					} else {
						shoptet.cartShared.updateQuantityInCart({
							itemId: giftPackagingItemId,
							priceId: giftPackagingPriceId,
							amount: numberOfPackages,
						});
					}
				}
				console.log("------------------------------------------");
				console.log("Natios products:");
				console.log(natiosProducts);
				console.log("numberOfPackages:");
				console.log(numberOfPackages);
				console.log("------------------------------------------");
			}
		}
	}
}
