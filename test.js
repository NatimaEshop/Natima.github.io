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
